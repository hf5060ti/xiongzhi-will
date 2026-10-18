// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 周训练容量与疲劳评估
 *
 * 解决的问题：
 *   · 「我这一周练了多少组」—— 训练日志是按次记录的，缺少周维度汇总；
 *   · 「哪个部位练多了 / 练少了」—— 需要按肌群统计有效组数；
 *   · 「该不该安排减载周」—— 连续高容量后没有主动减载，是平台期与伤病的主要来源。
 *
 * 参考区间（肌肥大通用经验值，非医疗建议）：
 *   单个肌群每周 10–20 组为常见有效区间；低于 6 组刺激不足，
 *   持续高于 22 组且伴随表现下降时通常提示需要减载。
 *
 * 纯逻辑、无副作用，便于单测。
 */

import type { TrainingLog, TrainingSet } from './store';

/** 单个肌群一周的有效组数 */
export interface MuscleVolume {
  muscle: string;
  sets: number;
}

/** 一周（周一 ~ 周日）的训练汇总 */
export interface WeeklyVolume {
  /** 周一，YYYY-MM-DD */
  weekStart: string;
  /** 周日，YYYY-MM-DD */
  weekEnd: string;
  /** 该周训练次数 */
  sessions: number;
  /** 有效组数（有次数的组） */
  totalSets: number;
  /** 总吨位 kg（组 × 次数 × 重量） */
  volumeKg: number;
  /** 高强度组数（次数 ≤5，接近力竭的大重量组） */
  hardSets: number;
  /** 按组数降序的肌群分布 */
  byMuscle: MuscleVolume[];
}

export type FatigueLevel = 'low' | 'moderate' | 'high' | 'veryHigh';

/** 肌群覆盖诊断：以最近一周为准 */
export interface MuscleFlag {
  muscle: string;
  sets: number;
  /** low = 不足，ok = 合理区间，high = 偏多 */
  status: 'low' | 'ok' | 'high';
}

export interface VolumeReport {
  /** 按时间升序的最近若干周；不足的周会用空周补齐，便于看趋势 */
  weeks: WeeklyVolume[];
  /** 疲劳分 0–100 */
  fatigue: number;
  fatigueLevel: FatigueLevel;
  /** 建议标题 */
  adviceTitle: string;
  /** 建议明细 */
  adviceDetails: string[];
  /** 最近一周的肌群诊断（按组数降序） */
  muscleFlags: MuscleFlag[];
  /** 最近一周总组数 */
  recentSets: number;
  /** 前若干周的平均组数（基线） */
  baselineSets: number;
}

/** 每肌群每周的合理组数区间 */
export const MUSCLE_SET_RANGE = { low: 6, high: 22 } as const;

/** 取某日期所在周的周一（YYYY-MM-DD） */
export function mondayOf(date: string): string {
  const d = new Date(`${date}T00:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  const day = d.getDay(); // 0=周日
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return toISODate(d);
}

/** 周一所在周的周日 */
export function sundayOf(monday: string): string {
  const d = new Date(`${monday}T00:00:00`);
  d.setDate(d.getDate() + 6);
  return toISODate(d);
}

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function isCountedSet(s: TrainingSet): boolean {
  return typeof s.reps === 'number' && s.reps > 0;
}

export interface WeeklyVolumeOptions {
  /** 统计多少周，默认 8 */
  weeks?: number;
  /** 结束周（含），默认今天所在周 */
  endWeek?: string;
  /**
   * 把动作解析成肌群。由调用方传入（页面侧用动作库的 primaryMuscles 映射）。
   * 不传时只统计总量，byMuscle 为空。
   */
  resolveMuscles?: (name: string, exerciseId?: string) => string[];
}

/** 按周汇总训练日志 */
export function weeklyVolumes(
  logs: readonly TrainingLog[],
  options: WeeklyVolumeOptions = {},
): WeeklyVolume[] {
  const weeks = options.weeks ?? 8;
  const endWeek = options.endWeek ?? mondayOf(toISODate(new Date()));
  const resolve = options.resolveMuscles;

  // 1) 生成连续的周骨架（周一）
  const mondays: string[] = [];
  const cursor = new Date(`${endWeek}T00:00:00`);
  for (let i = weeks - 1; i >= 0; i--) {
    const d = new Date(cursor);
    d.setDate(d.getDate() - i * 7);
    mondays.push(toISODate(d));
  }

  const buckets = new Map<string, WeeklyVolume>();
  for (const m of mondays) {
    buckets.set(m, {
      weekStart: m,
      weekEnd: sundayOf(m),
      sessions: 0,
      totalSets: 0,
      volumeKg: 0,
      hardSets: 0,
      byMuscle: [],
    });
  }

  // 2) 把日志灌进对应周
  const muscleSets = new Map<string, Map<string, number>>(); // weekStart -> muscle -> sets
  for (const log of logs) {
    const wk = mondayOf(log.date);
    const bucket = buckets.get(wk);
    if (!bucket) continue;
    bucket.sessions += 1;
    for (const ex of log.exercises || []) {
      const muscles = resolve ? resolve(ex.name, ex.exerciseId) : [];
      for (const set of ex.sets || []) {
        if (!isCountedSet(set)) continue;
        bucket.totalSets += 1;
        if (set.reps != null && set.reps <= 5) bucket.hardSets += 1;
        if (set.weightKg != null && set.reps != null) {
          bucket.volumeKg += set.weightKg * set.reps;
        }
        if (muscles.length > 0) {
          let m = muscleSets.get(wk);
          if (!m) {
            m = new Map();
            muscleSets.set(wk, m);
          }
          for (const mu of muscles) {
            m.set(mu, (m.get(mu) ?? 0) + 1);
          }
        }
      }
    }
  }

  // 3) 汇总肌群分布
  for (const [wk, m] of muscleSets) {
    const bucket = buckets.get(wk);
    if (!bucket) continue;
    bucket.byMuscle = [...m.entries()]
      .map(([muscle, sets]) => ({ muscle, sets }))
      .sort((a, b) => b.sets - a.sets);
  }

  return mondays.map((m) => buckets.get(m)!);
}

export function fatigueLevelOf(score: number): FatigueLevel {
  if (score >= 75) return 'veryHigh';
  if (score >= 60) return 'high';
  if (score >= 40) return 'moderate';
  return 'low';
}

/** 生成完整的容量 / 疲劳报告 */
export function buildVolumeReport(
  logs: readonly TrainingLog[],
  options: WeeklyVolumeOptions = {},
): VolumeReport {
  const weeks = weeklyVolumes(logs, options);
  const recent = weeks[weeks.length - 1];
  const prior = weeks.slice(0, -1).filter((w) => w.totalSets > 0);
  const baselineSets =
    prior.length > 0
      ? Math.round(prior.reduce((s, w) => s + w.totalSets, 0) / prior.length)
      : 0;

  // —— 疲劳分 ——
  let score = 50;

  // 1) 本周相对基线的容量变化：突然加量是最直接的疲劳来源
  const ratio = baselineSets > 0 ? recent.totalSets / baselineSets : 0;
  if (ratio >= 1.3) score += 20;
  else if (ratio >= 1.15) score += 10;
  else if (ratio > 0 && ratio <= 0.8) score -= 10;

  // 2) 高强度组（≤5 次）占比：大重量对神经与关节的消耗远大于中高次数
  const hardRatio = recent.totalSets > 0 ? recent.hardSets / recent.totalSets : 0;
  if (hardRatio >= 0.35) score += 12;
  else if (hardRatio >= 0.2) score += 6;

  // 3) 连续 4 周以上每周都在练（没有任何一周接近休息）
  let streak = 0;
  for (let i = weeks.length - 1; i >= 0; i--) {
    if (weeks[i].totalSets > 0) streak += 1;
    else break;
  }
  if (streak >= 4) score += 10;

  // 4) 单个肌群周组数过高
  const overreached = recent.byMuscle.filter((m) => m.sets > MUSCLE_SET_RANGE.high);
  if (overreached.length > 0) score += 10;

  // 5) 本周根本没练 → 不存在疲劳，直接归零（否则基础分 50 会被误判成「状态正常」）
  if (recent.totalSets === 0) score = 0;

  score = Math.max(0, Math.min(100, Math.round(score)));
  const fatigueLevel = fatigueLevelOf(score);

  // —— 建议 ——
  let adviceTitle: string;
  const adviceDetails: string[] = [];
  if (fatigueLevel === 'veryHigh') {
    adviceTitle = '建议本周安排减载';
    adviceDetails.push('容量降到平时的 50–60%，重量降 10%，只保留动作熟练度。');
    adviceDetails.push('训练次数减 1 次，把省下的时间给睡眠与进食。');
    adviceDetails.push('减载不是退步：一周后回到原强度通常会明显更轻松。');
  } else if (fatigueLevel === 'high') {
    adviceTitle = '留意恢复，别再加量';
    adviceDetails.push('本周维持现有容量，先不要把组数或重量往上加。');
    adviceDetails.push('优先补齐睡眠（7–9 小时）与蛋白质摄入。');
    adviceDetails.push('若下周表现仍下滑，直接转为减载周。');
  } else if (fatigueLevel === 'moderate') {
    adviceTitle = '状态正常，按计划推进';
    adviceDetails.push('可以按原计划小幅加重或加组。');
    adviceDetails.push('每 6–10 周主动安排一次减载，比等到扛不住再减更有效。');
  } else {
    adviceTitle = '恢复余量充足';
    adviceDetails.push('当前容量偏低或刚减载完，有空间加量。');
    adviceDetails.push('建议先加组数再加重量，单周组数增幅控制在 20% 以内。');
  }

  if (overreached.length > 0) {
    adviceDetails.push(
      `以下肌群本周组数偏多（> ${MUSCLE_SET_RANGE.high} 组）：${overreached
        .map((m) => m.muscle)
        .join('、')}，下周适当下调。`,
    );
  }

  const muscleFlags: MuscleFlag[] = recent.byMuscle
    .map((m) => ({
      muscle: m.muscle,
      sets: m.sets,
      status:
        m.sets > MUSCLE_SET_RANGE.high
          ? ('high' as const)
          : m.sets < MUSCLE_SET_RANGE.low
            ? ('low' as const)
            : ('ok' as const),
    }))
    .sort((a, b) => b.sets - a.sets);

  return {
    weeks,
    fatigue: score,
    fatigueLevel,
    adviceTitle,
    adviceDetails,
    muscleFlags,
    recentSets: recent.totalSets,
    baselineSets,
  };
}
