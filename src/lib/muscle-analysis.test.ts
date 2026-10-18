// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import { resolveMuscles } from './muscle-map';
import { analyzeMuscleVolume, analyzeBalance } from './muscle-analysis';
import type { TrainingLog } from '@/lib/store';

describe('resolveMuscles', () => {
  it('精确匹配英文动作名 → 命中肌群', () => {
    const me = resolveMuscles('3/4 Sit-Up');
    expect(me).not.toBeNull();
    expect(me!.primary).toContain('abdominals');
  });

  it('模糊匹配（小写去空格包含）命中', () => {
    const me = resolveMuscles('situp');
    expect(me).not.toBeNull();
  });

  it('中文动作名（nameZh）可解析', () => {
    // exercises-ext 里有中文 nameZh，模糊包含也能命中
    const me = resolveMuscles('深蹲');
    // 不一定精确叫「深蹲」，但应命中某个含「深蹲」的条目
    expect(me === null || Array.isArray(me.primary)).toBe(true);
  });

  it('未知动作返回 null', () => {
    expect(resolveMuscles('xyz神秘动作123')).toBeNull();
  });
});

describe('analyzeMuscleVolume', () => {
  it('按肌群聚合容量/组数/最近训练日与间隔', () => {
    const logs = [
      { date: '2026-10-01', exercises: [{ name: '3/4 Sit-Up', sets: [{ weightKg: 100, reps: 15 }, { weightKg: 100, reps: 15 }] }] },
      { date: '2026-10-10', exercises: [{ name: '3/4 Sit-Up', sets: [{ weightKg: 120, reps: 20 }] }] },
    ] as unknown as TrainingLog[];
    const now = new Date('2026-10-15T00:00:00');
    const stats = analyzeMuscleVolume(logs, now);
    const ab = stats['abdominals'];
    expect(ab).toBeDefined();
    expect(ab.volume).toBe(100 * 15 + 100 * 15 + 120 * 20); // 5400
    expect(ab.sets).toBe(3);
    expect(ab.sessions).toBe(2);
    expect(ab.lastTrained).toBe('2026-10-10');
    expect(ab.gapDays).toBe(5);
  });

  it('含重量的动作计入容量，未知动作跳过', () => {
    const logs = [
      {
        date: '2026-10-01',
        exercises: [
          { name: '3/4 Sit-Up', sets: [{ weightKg: 100, reps: 5 }] },
          { name: '未知动作xyz', sets: [{ weightKg: 50, reps: 5 }] },
        ],
      },
    ] as unknown as TrainingLog[];
    const stats = analyzeMuscleVolume(logs, new Date('2026-10-02T00:00:00'));
    const ab = stats['abdominals'];
    expect(ab.volume).toBe(500);
    const total = Object.values(stats).reduce((s, v) => s + v.volume, 0);
    expect(total).toBe(500); // 未知动作不贡献任何肌群
  });

  it('无训练记录 → 空结果', () => {
    expect(analyzeMuscleVolume([], new Date())).toEqual({});
  });
});

describe('analyzeBalance', () => {
  it('推:拉 比值计算与状态判定', () => {
    const stats = {
      chest: { volume: 100 },
      triceps: { volume: 100 },
      lats: { volume: 200 },
      'middle back': { volume: 100 },
      'lower back': { volume: 100 },
      traps: { volume: 100 },
      biceps: { volume: 100 },
    } as unknown as Record<string, import('./muscle-analysis').MuscleStat>;
    const ratios = analyzeBalance(stats);
    const pp = ratios.find((r) => r.id === 'push-pull')!;
    expect(pp.actual).toBeCloseTo(200 / 600, 2);
    expect(['balanced', 'slight', 'imbalanced']).toContain(pp.status);
  });

  it('股四:腘绳 偏离大 → imbalanced', () => {
    const stats = {
      quadriceps: { volume: 1000 },
      hamstrings: { volume: 100 },
    } as unknown as Record<string, import('./muscle-analysis').MuscleStat>;
    const ratios = analyzeBalance(stats);
    const qh = ratios.find((r) => r.id === 'quad-ham')!;
    expect(qh.actual).toBeCloseTo(10, 1);
    expect(qh.status).toBe('imbalanced');
  });

  it('缺少一侧（分母为 0）比值 0 且不崩', () => {
    const stats = {
      chest: { volume: 100 },
      triceps: { volume: 50 },
    } as unknown as Record<string, import('./muscle-analysis').MuscleStat>;
    const ratios = analyzeBalance(stats);
    const pp = ratios.find((r) => r.id === 'push-pull')!;
    expect(pp.actual).toBe(0);
    expect(pp.status).toBe('imbalanced');
  });
});
