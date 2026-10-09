// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import {
  calcBmr,
  calcLbm,
  calcProtein,
  estimateOneRm,
  ffmiLbmMax,
  round1,
  tdee,
  tefPct,
} from './body-math';
import { estimate1rm } from './one-rep-max';
import { estimate1RM } from './performance-standards';

const BASE = { age: 30, heightCm: 175, weightKg: 70, lbmKg: 56 };

describe('瘦体重与蛋白质', () => {
  it('calcLbm：80kg / 体脂 20% → 64kg', () => {
    expect(calcLbm(80, 20)).toBe(64);
  });

  it('减脂期蛋白质按瘦体重 × 2.3', () => {
    const r = calcProtein(60, 'cut');
    expect(r.target).toBeCloseTo(138, 5);
    expect(r.perKgLbm).toBe(2.3);
    expect(r.range[0]).toBeLessThan(r.target);
    expect(r.range[1]).toBeGreaterThan(r.target);
  });

  it('减脂期 > 增肌期 > 维持期', () => {
    const cut = calcProtein(60, 'cut').target;
    const bulk = calcProtein(60, 'bulk').target;
    const maintain = calcProtein(60, 'maintain').target;
    expect(cut).toBeGreaterThan(bulk);
    expect(bulk).toBeGreaterThan(maintain);
  });
});

describe('BMR / TDEE', () => {
  it('Mifflin（男）：70kg / 175cm / 30 岁 → 1648.75', () => {
    expect(calcBmr({ ...BASE, sex: 'male' }).mifflin).toBeCloseTo(1648.75, 2);
  });

  it('女性 Mifflin 比男性低 166', () => {
    const male = calcBmr({ ...BASE, sex: 'male' }).mifflin;
    const female = calcBmr({ ...BASE, sex: 'female' }).mifflin;
    expect(male - female).toBeCloseTo(166, 5);
  });

  it('Katch-McArdle 只取决于瘦体重', () => {
    expect(calcBmr({ ...BASE, sex: 'male' }).katch).toBeCloseTo(370 + 21.6 * 56, 5);
  });

  it('六个公式都在合理区间（1200–2200）', () => {
    const b = calcBmr({ ...BASE, sex: 'male' });
    for (const v of Object.values(b)) {
      expect(v).toBeGreaterThan(1200);
      expect(v).toBeLessThan(2200);
    }
  });

  it('TDEE = BMR × 活动系数', () => {
    expect(tdee(1600, 1.55)).toBeCloseTo(2480, 5);
  });

  it('TEF 按三大宏量加权', () => {
    expect(tefPct({ carb: 50, protein: 30, fat: 20 })).toBeCloseTo((50 * 7.5 + 30 * 22.5 + 20 * 3) / 100, 5);
  });
});

describe('1RM 口径统一（防止页面之间算法漂移）', () => {
  it('body-math、performance-standards、one-rep-max 三处 Epley 结果完全一致', () => {
    const cases: [number, number][] = [
      [100, 5],
      [60, 1],
      [80, 8],
      [120, 3],
    ];
    for (const [w, r] of cases) {
      const expected = estimate1rm(w, r, 'epley');
      expect(estimateOneRm(w, r), `body-math ${w}×${r}`).toBe(expected);
      expect(estimate1RM(w, r), `performance-standards ${w}×${r}`).toBe(expected);
    }
  });

  it('都按 ≥1 次处理（0 次不会出现除零或负增长）', () => {
    expect(estimateOneRm(100, 0)).toBe(estimate1rm(100, 1, 'epley'));
    expect(estimate1RM(100, 0)).toBe(estimate1rm(100, 1, 'epley'));
  });
});

describe('其它', () => {
  it('FFMI 上限 = 25 × 身高(m)²（男），女性更低', () => {
    expect(ffmiLbmMax('male', 180)).toBeCloseTo(25 * 1.8 * 1.8, 5);
    expect(ffmiLbmMax('female', 180)).toBeLessThan(ffmiLbmMax('male', 180));
  });

  it('round1 保留一位小数', () => {
    expect(round1(1.234)).toBe(1.2);
    expect(round1(1.25)).toBe(1.3);
  });
});
