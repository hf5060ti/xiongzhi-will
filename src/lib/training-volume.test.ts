// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import {
  buildVolumeReport,
  fatigueLevelOf,
  mondayOf,
  sundayOf,
  weeklyVolumes,
  MUSCLE_SET_RANGE,
  type WeeklyVolumeOptions,
} from './training-volume';
import type { TrainingLog } from './store';

const log = (date: string, exercises: TrainingLog['exercises']): TrainingLog => ({
  date,
  exercises,
});

const set = (reps: number, weightKg?: number) => ({ reps, weightKg });

/** 2026-01-05 是周一 */
const resolve = (name: string) => (name === '卧推' ? ['chest'] : name === '深蹲' ? ['quadriceps'] : []);

describe('mondayOf / sundayOf', () => {
  it('周一返回自身', () => {
    expect(mondayOf('2026-01-05')).toBe('2026-01-05');
  });
  it('周日归到上一个周一', () => {
    expect(mondayOf('2026-01-11')).toBe('2026-01-05');
  });
  it('周三归到同周一', () => {
    expect(mondayOf('2026-01-07')).toBe('2026-01-05');
  });
  it('sundayOf 返回该周周日', () => {
    expect(sundayOf('2026-01-05')).toBe('2026-01-11');
  });
});

describe('weeklyVolumes', () => {
  const opts: WeeklyVolumeOptions = { weeks: 3, endWeek: '2026-01-19', resolveMuscles: resolve };

  it('按周汇总组数、吨位与高强度组', () => {
    const logs = [
      log('2026-01-19', [
        { name: '卧推', sets: [set(5, 60), set(10, 50)] },
        { name: '深蹲', sets: [set(8, 80)] },
      ]),
    ];
    const w = weeklyVolumes(logs, opts);
    const last = w[w.length - 1];
    expect(last.weekStart).toBe('2026-01-19');
    expect(last.sessions).toBe(1);
    expect(last.totalSets).toBe(3);
    expect(last.hardSets).toBe(1); // 只有 5 次那组算高强度
    expect(last.volumeKg).toBe(60 * 5 + 50 * 10 + 80 * 8);
  });

  it('按肌群统计组数', () => {
    const logs = [
      log('2026-01-19', [
        { name: '卧推', sets: [set(10, 50), set(10, 50)] },
        { name: '深蹲', sets: [set(8, 80)] },
      ]),
    ];
    const last = weeklyVolumes(logs, opts).at(-1)!;
    expect(last.byMuscle).toEqual([
      { muscle: 'chest', sets: 2 },
      { muscle: 'quadriceps', sets: 1 },
    ]);
  });

  it('无次数不计入组数', () => {
    const logs = [log('2026-01-19', [{ name: '卧推', sets: [{}] }])];
    expect(weeklyVolumes(logs, opts).at(-1)!.totalSets).toBe(0);
  });

  it('周不足时会补空周', () => {
    const w = weeklyVolumes([], opts);
    expect(w).toHaveLength(3);
    expect(w.map((x) => x.weekStart)).toEqual(['2026-01-05', '2026-01-12', '2026-01-19']);
    expect(w.every((x) => x.totalSets === 0)).toBe(true);
  });

  it('不传 resolveMuscles 时只统计总量', () => {
    const logs = [log('2026-01-19', [{ name: '卧推', sets: [set(10, 50)] }])];
    const last = weeklyVolumes(logs, { weeks: 1, endWeek: '2026-01-19' }).at(-1)!;
    expect(last.totalSets).toBe(1);
    expect(last.byMuscle).toEqual([]);
  });
});

describe('fatigueLevelOf', () => {
  it('按阈值分档', () => {
    expect(fatigueLevelOf(20)).toBe('low');
    expect(fatigueLevelOf(45)).toBe('moderate');
    expect(fatigueLevelOf(65)).toBe('high');
    expect(fatigueLevelOf(90)).toBe('veryHigh');
  });
});

describe('buildVolumeReport', () => {
  const opts = (endWeek: string): WeeklyVolumeOptions => ({
    weeks: 5,
    endWeek,
    resolveMuscles: resolve,
  });

  it('空日志时给出低疲劳与加量建议', () => {
    const r = buildVolumeReport([], opts('2026-02-02'));
    expect(r.recentSets).toBe(0);
    expect(r.baselineSets).toBe(0);
    expect(r.fatigueLevel).toBe('low');
    expect(r.adviceTitle).toContain('余量');
  });

  it('本周容量突然 +50% 且高强度组多 → 触发减载建议', () => {
    const logs: TrainingLog[] = [];
    // 前 3 周每周 10 组
    for (const d of ['2026-01-12', '2026-01-19', '2026-01-26']) {
      logs.push(
        log(d, [
          { name: '卧推', sets: Array.from({ length: 10 }, () => set(10, 50)) },
        ]),
      );
    }
    // 本周 20 组，且 10 组是 ≤5 次的大重量
    logs.push(
      log('2026-02-02', [
        {
          name: '卧推',
          sets: [
            ...Array.from({ length: 10 }, () => set(4, 80)),
            ...Array.from({ length: 10 }, () => set(10, 50)),
          ],
        },
      ]),
    );
    const r = buildVolumeReport(logs, opts('2026-02-02'));
    expect(r.baselineSets).toBe(10);
    expect(r.recentSets).toBe(20);
    expect(r.fatigue).toBeGreaterThanOrEqual(75);
    expect(r.fatigueLevel).toBe('veryHigh');
    expect(r.adviceTitle).toContain('减载');
  });

  it('容量平稳时状态正常', () => {
    const logs: TrainingLog[] = [];
    for (const d of ['2026-01-26', '2026-02-02']) {
      logs.push(
        log(d, [{ name: '卧推', sets: Array.from({ length: 10 }, () => set(10, 50)) }]),
      );
    }
    const r = buildVolumeReport(logs, opts('2026-02-02'));
    expect(r.fatigueLevel).toBe('moderate');
    expect(r.adviceTitle).toContain('推进');
  });

  it('肌群诊断按阈值分档', () => {
    const logs = [
      log('2026-02-02', [
        { name: '卧推', sets: Array.from({ length: 25 }, () => set(10, 50)) }, // 过量
        { name: '深蹲', sets: Array.from({ length: 2 }, () => set(10, 60)) }, // 不足
      ]),
    ];
    const r = buildVolumeReport(logs, opts('2026-02-02'));
    const chest = r.muscleFlags.find((m) => m.muscle === 'chest')!;
    const quad = r.muscleFlags.find((m) => m.muscle === 'quadriceps')!;
    expect(chest.status).toBe('high');
    expect(quad.status).toBe('low');
    expect(r.adviceDetails.join()).toContain('组数偏多');
    expect(MUSCLE_SET_RANGE.high).toBe(22);
  });
});
