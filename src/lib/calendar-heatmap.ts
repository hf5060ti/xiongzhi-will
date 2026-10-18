// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 训练记录 → 年度日历热力图数据（GitHub 风格网格：列=周，行=周一~周日）。
// 借鉴 openGym 的「年度训练日历」思路，全部用本站自己的数据与算法实现（不复制任何 AGPL 代码）。
// 日期口径与训练记录一致：本地日期字符串 YYYY-MM-DD（避免 UTC 偏移导致跨日偏差）。
import type { TrainingLog } from '@/lib/store';

export interface DayStat {
  /** 当日累计容量（重量 × 次数；纯自重/时长组不计） */
  volume: number;
  /** 当日累计组数（自重/时长组也计入，是热度的主口径） */
  sets: number;
  /** 当日训练记录条数 */
  sessions: number;
  /** 当日训练日标签（去重，如 推/拉/腿） */
  dayLabels: string[];
}

export interface CalendarDay {
  /** YYYY-MM-DD */
  dateIso: string;
  /** 是否属于当前查看的年份（网格首尾周会用邻年日期补齐） */
  inYear: boolean;
  /** 0=周一 … 6=周日 */
  weekday: number;
  stat: DayStat | null;
  isToday: boolean;
  isFuture: boolean;
}

export interface CalendarWeek {
  /** 恒为 7 天，按周一→周日排列 */
  days: CalendarDay[];
}

export interface CalendarSummary {
  year: number;
  /** 年内有训练记录的天数 */
  activeDays: number;
  /** 年内训练记录条数 */
  totalSessions: number;
  /** 年内累计容量 */
  totalVolume: number;
  /** 年内累计组数 */
  totalSets: number;
  /** 年内最长连续训练天数 */
  longestStreak: number;
  /** 连续到今天（昨天练过也算存活）的训练天数，跨年边界计入 */
  currentStreak: number;
  /** 年内单日容量最高的一天 */
  busiestDay: { dateIso: string; volume: number } | null;
}

export interface CalendarResult {
  weeks: CalendarWeek[];
  summary: CalendarSummary;
}

const pad2 = (n: number) => String(n).padStart(2, '0');

/** Date → 本地 YYYY-MM-DD */
export function localIso(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

/** 解析本地日期字符串为本地零点 Date */
function parseIso(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

/** 日期字符串加减天数 */
export function shiftIso(iso: string, deltaDays: number): string {
  const d = parseIso(iso);
  d.setDate(d.getDate() + deltaDays);
  return localIso(d);
}

function gapBetween(aIso: string, bIso: string): number {
  return Math.round((parseIso(bIso).getTime() - parseIso(aIso).getTime()) / 86_400_000);
}

/** 周一=0 的星期索引 */
function mondayWeekday(d: Date): number {
  return (d.getDay() + 6) % 7;
}

/** 把训练记录按日期聚合：同日多条累加；纯自重/时长组只计组数不计容量。 */
export function buildDayMap(logs: TrainingLog[]): Map<string, DayStat> {
  const map = new Map<string, DayStat>();
  for (const log of logs) {
    const iso = log.date;
    let st = map.get(iso);
    if (!st) {
      st = { volume: 0, sets: 0, sessions: 0, dayLabels: [] };
      map.set(iso, st);
    }
    st.sessions += 1;
    if (log.dayLabel && !st.dayLabels.includes(log.dayLabel)) st.dayLabels.push(log.dayLabel);
    for (const ex of log.exercises) {
      for (const set of ex.sets) {
        st.sets += 1;
        st.volume += (set.weightKg ?? 0) * (set.reps ?? 0);
      }
    }
  }
  return map;
}

/** 5 档热度：0=未训练，1-4 按占年内最高值的比例分档（GitHub 风格四分位）。 */
export function heatLevel(value: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (value <= 0 || max <= 0) return 0;
  const r = value / max;
  if (r <= 0.25) return 1;
  if (r <= 0.5) return 2;
  if (r <= 0.75) return 3;
  return 4;
}

/** 年内最长连续训练天数 + 连续至今的训练天数 */
function computeStreaks(
  dateIsos: Set<string>,
  year: number,
  todayIso: string,
): { longest: number; current: number } {
  const yearDates = [...dateIsos].filter((d) => d.startsWith(`${year}-`)).sort();
  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const d of yearDates) {
    run = prev && gapBetween(prev, d) === 1 ? run + 1 : 1;
    if (run > longest) longest = run;
    prev = d;
  }

  // 当前连续：今天练过从今天往前数；今天没练但昨天练过，从昨天往前数（连续记录仍「存活」）
  let current = 0;
  const start = dateIsos.has(todayIso) ? todayIso : shiftIso(todayIso, -1);
  if (dateIsos.has(start)) {
    let cursor = start;
    while (dateIsos.has(cursor)) {
      current += 1;
      cursor = shiftIso(cursor, -1);
    }
  }
  return { longest, current };
}

/** 生成某年（周一开头、周日结尾补齐）的日历网格 + 年度汇总。 */
export function buildCalendar(logs: TrainingLog[], year: number, now: Date = new Date()): CalendarResult {
  const dayMap = buildDayMap(logs);
  const todayIso = localIso(now);

  const jan1 = new Date(year, 0, 1);
  const dec31 = new Date(year, 11, 31);
  const start = new Date(year, 0, 1 - mondayWeekday(jan1));
  const end = new Date(year, 11, 31 + (6 - mondayWeekday(dec31)));

  // 先收集年内有训练的日子，算热度基准与汇总
  let activeDays = 0;
  let totalSessions = 0;
  let totalVolume = 0;
  let totalSets = 0;
  let maxSets = 0;
  let maxVolume = 0;
  let busiestDay: CalendarSummary['busiestDay'] = null;
  for (let d = new Date(jan1); d <= dec31; d.setDate(d.getDate() + 1)) {
    const st = dayMap.get(localIso(d));
    if (!st) continue;
    activeDays += 1;
    totalSessions += st.sessions;
    totalVolume += st.volume;
    totalSets += st.sets;
    if (st.sets > maxSets) maxSets = st.sets;
    if (st.volume > maxVolume) maxVolume = st.volume;
    if (st.volume > 0 && (!busiestDay || st.volume > busiestDay.volume)) {
      busiestDay = { dateIso: localIso(d), volume: st.volume };
    }
  }

  const { longest, current } = computeStreaks(new Set(dayMap.keys()), year, todayIso);

  const weeks: CalendarWeek[] = [];
  let week: CalendarDay[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const iso = localIso(d);
    const st = dayMap.get(iso) ?? null;
    week.push({
      dateIso: iso,
      inYear: d.getFullYear() === year,
      weekday: mondayWeekday(d),
      stat: st,
      isToday: iso === todayIso,
      isFuture: iso > todayIso,
    });
    if (week.length === 7) {
      weeks.push({ days: week });
      week = [];
    }
  }

  return {
    weeks,
    summary: {
      year,
      activeDays,
      totalSessions,
      totalVolume,
      totalSets,
      longestStreak: longest,
      currentStreak: current,
      busiestDay,
    },
  };
}

/** 每周列顶部的月份标签：该周包含某月 1–7 日且与上周月份不同，则打标签（GitHub 风格）。 */
export function weekMonthMarks(weeks: CalendarWeek[]): (string | null)[] {
  const marks: (string | null)[] = [];
  let lastMonth = -1;
  for (const w of weeks) {
    let label: string | null = null;
    for (const day of w.days) {
      if (!day.inYear) continue;
      const month = Number(day.dateIso.slice(5, 7));
      const dayOfMonth = Number(day.dateIso.slice(8, 10));
      if (dayOfMonth <= 7 && month !== lastMonth) {
        label = `${month}月`;
        lastMonth = month;
        break;
      }
    }
    marks.push(label);
  }
  return marks;
}
