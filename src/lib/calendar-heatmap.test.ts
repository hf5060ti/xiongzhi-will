// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, it, expect } from 'vitest';
import {
  buildCalendar,
  buildDayMap,
  heatLevel,
  localIso,
  shiftIso,
  weekMonthMarks,
} from './calendar-heatmap';
import type { TrainingLog } from '@/lib/store';

const NOW = new Date(2026, 5, 15); // 2026-06-15 本地

// 2026 年数据：1 月 2 天 + 6 月 5 天连续（06-10 同日两条）；另含 2025 年旧数据应被过滤
const LOGS: TrainingLog[] = [
  { date: '2026-01-01', exercises: [{ name: '深蹲', sets: [{ weightKg: 100, reps: 5 }] }] }, // 500 / 1
  { date: '2026-01-02', exercises: [{ name: '硬拉', sets: [{ weightKg: 120, reps: 5 }] }] }, // 600 / 1
  {
    date: '2026-06-10',
    dayLabel: '推',
    exercises: [{ name: '卧推', sets: [{ weightKg: 60, reps: 8 }, { weightKg: 60, reps: 8 }] }],
  }, // 960 / 2
  { date: '2026-06-10', dayLabel: '推', exercises: [{ name: '三头', sets: [{ weightKg: 20, reps: 12 }] }] }, // 240 / 1
  {
    date: '2026-06-11',
    dayLabel: '拉',
    exercises: [{ name: '引体向上', sets: [{ reps: 10 }, { reps: 8 }] }],
  }, // 自重：0 / 2
  {
    date: '2026-06-12',
    dayLabel: '腿',
    exercises: [{ name: '深蹲', sets: [{ weightKg: 100, reps: 5 }, { weightKg: 100, reps: 5 }] }],
  }, // 1000 / 2
  { date: '2026-06-13', dayLabel: '推', exercises: [{ name: '卧推', sets: [{ weightKg: 70, reps: 5 }] }] }, // 350 / 1
  { date: '2026-06-14', dayLabel: '拉', exercises: [{ name: '划船', sets: [{ weightKg: 60, reps: 10 }] }] }, // 600 / 1
  { date: '2025-06-10', exercises: [{ name: '旧年', sets: [{ weightKg: 999, reps: 99 }] }] }, // 应排除
];

describe('localIso / shiftIso', () => {
  it('本地日期序列化', () => {
    expect(localIso(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(localIso(new Date(2026, 11, 31))).toBe('2026-12-31');
  });

  it('跨月 / 闰年加减天数', () => {
    expect(shiftIso('2026-03-01', -1)).toBe('2026-02-28');
    expect(shiftIso('2024-03-01', -1)).toBe('2024-02-29'); // 闰年
    expect(shiftIso('2026-12-31', 1)).toBe('2027-01-01');
    expect(shiftIso('2026-01-01', -1)).toBe('2025-12-31');
  });
});

describe('buildDayMap', () => {
  it('同日多条累加容量/组数/记录数，训练日标签去重', () => {
    const map = buildDayMap(LOGS);
    const d = map.get('2026-06-10')!;
    expect(d.volume).toBe(960 + 240);
    expect(d.sets).toBe(3);
    expect(d.sessions).toBe(2);
    expect(d.dayLabels).toEqual(['推']);
  });

  it('纯自重组计组数不计容量', () => {
    const d = buildDayMap(LOGS).get('2026-06-11')!;
    expect(d.volume).toBe(0);
    expect(d.sets).toBe(2);
  });

  it('空输入返回空 Map', () => {
    expect(buildDayMap([]).size).toBe(0);
  });
});

describe('heatLevel', () => {
  it('5 档分界', () => {
    expect(heatLevel(0, 100)).toBe(0);
    expect(heatLevel(10, 100)).toBe(1); // 10% < 25%
    expect(heatLevel(25, 100)).toBe(1); // =25%
    expect(heatLevel(26, 100)).toBe(2); // >25%
    expect(heatLevel(50, 100)).toBe(2); // =50%
    expect(heatLevel(51, 100)).toBe(3);
    expect(heatLevel(75, 100)).toBe(3); // =75%
    expect(heatLevel(76, 100)).toBe(4);
    expect(heatLevel(100, 100)).toBe(4);
  });

  it('max<=0 时任何值都判 0 档', () => {
    expect(heatLevel(50, 0)).toBe(0);
    expect(heatLevel(0, 0)).toBe(0);
  });
});

describe('buildCalendar 网格结构', () => {
  const { weeks } = buildCalendar(LOGS, 2026, NOW);

  it('2026-01-01 是周四，首列以周一 2025-12-29 开头', () => {
    expect(weeks.length).toBe(53); // 365 + 3 前补 + 3 后补 = 371 = 53 周
    expect(weeks[0].days).toHaveLength(7);
    expect(weeks[0].days[0].dateIso).toBe('2025-12-29');
    expect(weeks[0].days[0].inYear).toBe(false);
    expect(weeks[0].days[3].dateIso).toBe('2026-01-01');
    expect(weeks[0].days[3].inYear).toBe(true);
    expect(weeks[52].days[6].dateIso).toBe('2027-01-03');
  });

  it('闰年 2024：含 02-29，周一开头无前补', () => {
    const r = buildCalendar([], 2024, NOW);
    expect(r.weeks[0].days[0].dateIso).toBe('2024-01-01');
    expect(r.weeks[0].days[0].inYear).toBe(true);
    expect(r.weeks.some((w) => w.days.some((d) => d.dateIso === '2024-02-29' && d.inYear))).toBe(true);
  });

  it('2023-01-01 是周日，首列前补 6 天', () => {
    const r = buildCalendar([], 2023, NOW);
    expect(r.weeks[0].days[0].dateIso).toBe('2022-12-26');
  });

  it('isToday / isFuture 标记', () => {
    const flat = weeks.flatMap((w) => w.days);
    expect(flat.find((d) => d.dateIso === '2026-06-15')!.isToday).toBe(true);
    expect(flat.find((d) => d.dateIso === '2026-06-15')!.isFuture).toBe(false);
    expect(flat.find((d) => d.dateIso === '2026-06-16')!.isFuture).toBe(true);
    expect(flat.find((d) => d.dateIso === '2026-06-14')!.isFuture).toBe(false);
    expect(flat.filter((d) => d.isToday)).toHaveLength(1);
  });

  it('stat 挂到对应日期格子上', () => {
    const flat = weeks.flatMap((w) => w.days);
    expect(flat.find((d) => d.dateIso === '2026-06-10')!.stat!.volume).toBe(1200);
    expect(flat.find((d) => d.dateIso === '2026-01-01')!.stat!.sets).toBe(1);
    expect(flat.find((d) => d.dateIso === '2026-01-03')!.stat).toBeNull();
    expect(flat.find((d) => d.dateIso === '2025-12-30')!.stat).toBeNull(); // 邻年无数据
  });
});

describe('buildCalendar 年度汇总', () => {
  it('按年过滤：只统计 2026 年', () => {
    const { summary } = buildCalendar(LOGS, 2026, NOW);
    expect(summary.year).toBe(2026);
    expect(summary.activeDays).toBe(7);
    expect(summary.totalSessions).toBe(8);
    expect(summary.totalVolume).toBe(500 + 600 + 1200 + 0 + 1000 + 350 + 600);
    expect(summary.totalSets).toBe(11);
    expect(summary.busiestDay).toEqual({ dateIso: '2026-06-10', volume: 1200 });
  });

  it('连续天数：年内最长 5 天，当前连续（昨天为止）5 天', () => {
    const { summary } = buildCalendar(LOGS, 2026, NOW);
    expect(summary.longestStreak).toBe(5); // 06-10 ~ 06-14
    expect(summary.currentStreak).toBe(5); // 今天 06-15 没练，昨天 06-14 练过 → 从 14 往前数
  });

  it('当前连续：今天练过则含今天', () => {
    const { summary } = buildCalendar(LOGS, 2026, new Date(2026, 5, 12)); // now = 06-12
    expect(summary.currentStreak).toBe(3); // 06-10 ~ 06-12
  });

  it('当前连续：今天与昨天都没练则为 0', () => {
    const { summary } = buildCalendar(LOGS, 2026, new Date(2026, 5, 16)); // now = 06-16
    expect(summary.currentStreak).toBe(0);
  });

  it('空数据：网格完整、汇总全零、最高日为 null', () => {
    const { weeks, summary } = buildCalendar([], 2026, NOW);
    expect(weeks.length).toBe(53);
    expect(summary.activeDays).toBe(0);
    expect(summary.totalVolume).toBe(0);
    expect(summary.totalSets).toBe(0);
    expect(summary.totalSessions).toBe(0);
    expect(summary.longestStreak).toBe(0);
    expect(summary.currentStreak).toBe(0);
    expect(summary.busiestDay).toBeNull();
  });
});

describe('weekMonthMarks', () => {
  it('首列标 1 月，之后在新月 1–7 日所在周打标', () => {
    const { weeks } = buildCalendar(LOGS, 2026, NOW);
    const marks = weekMonthMarks(weeks);
    expect(marks).toHaveLength(53);
    expect(marks[0]).toBe('1月');
    expect(marks[1]).toBeNull(); // 1 月第 2 周
    expect(marks).toContain('2月'); // 2026-02-01 是周日，落在 1/26–2/1 那周
    expect(marks).toContain('12月');
    // 月份标签不应重复
    const months = marks.filter(Boolean).map((m) => Number(m!.replace('月', '')));
    expect(months).toEqual([...months].sort((a, b) => a - b));
    expect(new Set(months).size).toBe(months.length);
  });

  it('空数据也产出 12 个月份标签', () => {
    const { weeks } = buildCalendar([], 2026, NOW);
    const months = weekMonthMarks(weeks).filter(Boolean);
    expect(months).toHaveLength(12);
  });
});
