// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import { REPS_ACCURACY_LIMIT, estimate1rm, estimateAll, isRepsUnreliable } from './one-rep-max';

describe('estimate1rm', () => {
  it('Epley：100kg × 5 次 = 116.7kg', () => {
    expect(estimate1rm(100, 5)).toBe(116.7);
  });

  it('Epley：1 次 = 重量 × 1.0333', () => {
    expect(estimate1rm(100, 1)).toBe(103.3);
  });

  it('Brzycki：100kg × 5 次 = 112.5kg', () => {
    expect(estimate1rm(100, 5, 'brzycki')).toBe(112.5);
  });

  it('Lombardi：100kg × 5 次 ≈ 117.5kg', () => {
    expect(estimate1rm(100, 5, 'lombardi')).toBeCloseTo(117.5, 1);
  });

  it('重量为 0 或非法值 → 0', () => {
    expect(estimate1rm(0, 5)).toBe(0);
    expect(estimate1rm(Number.NaN, 5)).toBe(0);
  });

  it('次数为 0 / 小数时按 ≥1 次处理', () => {
    expect(estimate1rm(100, 0)).toBe(estimate1rm(100, 1));
    expect(estimate1rm(100, 2.4)).toBe(estimate1rm(100, 2));
  });

  it('Brzycki 在次数极大时不发散（内部夹到 36 次）', () => {
    expect(Number.isFinite(estimate1rm(100, 100, 'brzycki'))).toBe(true);
    expect(estimate1rm(100, 100, 'brzycki')).toBe(estimate1rm(100, 36, 'brzycki'));
  });
});

describe('estimateAll', () => {
  it('一次返回三个公式的结果', () => {
    const all = estimateAll(100, 5);
    expect(Object.keys(all).sort()).toEqual(['brzycki', 'epley', 'lombardi']);
    expect(all.epley).toBe(116.7);
    expect(all.brzycki).toBe(112.5);
  });

  it('次数越多，公式之间差异越大', () => {
    const low = estimateAll(100, 3);
    const high = estimateAll(100, 12);
    const spread = (x: typeof low) => Math.max(...Object.values(x)) - Math.min(...Object.values(x));
    expect(spread(high)).toBeGreaterThan(spread(low));
  });
});

describe('isRepsUnreliable', () => {
  it('超过 10 次判定为不可靠', () => {
    expect(isRepsUnreliable(REPS_ACCURACY_LIMIT)).toBe(false);
    expect(isRepsUnreliable(REPS_ACCURACY_LIMIT + 1)).toBe(true);
  });
});
