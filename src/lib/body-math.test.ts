// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import {
  calcBmr,
  calcFatLossCeiling,
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

  it('TEF 按三大宏量加权（蛋白 25–30，取中值 27.5）', () => {
    expect(tefPct({ carb: 50, protein: 30, fat: 20 })).toBeCloseTo((50 * 7.5 + 30 * 27.5 + 20 * 3) / 100, 5);
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

describe('脂肪分解上限（体脂率决定）', () => {
  it('70kg / 体脂 25% → 体脂 17.5kg、上限约 1225 kcal ≈ 159 g/天', () => {
    const r = calcFatLossCeiling(70, 25);
    expect(r.fatMassKg).toBe(17.5);
    expect(r.kcalPerDay).toBe(1225);
    expect(r.fatGPerDay).toBe(159);
    expect(r.fatKgPerDay).toBeCloseTo(0.159, 3);
  });

  it('体脂率越高上限越高（同体重）', () => {
    const low = calcFatLossCeiling(80, 15);
    const high = calcFatLossCeiling(80, 30);
    expect(high.kcalPerDay).toBeGreaterThan(low.kcalPerDay);
    expect(high.fatGPerDay).toBeCloseTo(low.fatGPerDay * 2, -1);
  });

  it('每周上限 = 每日 ×7，且体脂率越高每周可降百分点越大', () => {
    const r = calcFatLossCeiling(70, 25);
    expect(r.weeklyKg).toBeCloseTo(r.fatKgPerDay * 7, 2);
    expect(r.pctPerWeek).toBeGreaterThan(0);
    expect(calcFatLossCeiling(70, 30).pctPerWeek).toBeGreaterThan(r.pctPerWeek);
  });

  it('边界：无体重/体脂 0 或 ≥100 → 全 0，不产生 NaN', () => {
    for (const [w, f] of [[0, 25], [70, 0], [70, 100], [NaN, 25], [70, NaN]]) {
      const r = calcFatLossCeiling(w, f);
      expect(r.kcalPerDay).toBe(0);
      expect(r.fatGPerDay).toBe(0);
      expect(Number.isNaN(r.weeklyKg)).toBe(false);
    }
  });
});
