// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import {
  buildDailyTargets,
  buildMealPlan,
  buildWeekPlan,
  round1,
  ROUTINE_PATTERNS,
  REST_DAY_MACRO,
  type MealPlanInput,
} from './meal-plan';

const base: MealPlanInput = {
  sex: 'male',
  age: 25,
  heightCm: 175,
  weightKg: 70,
  bodyFatPct: 15,
  level: 'intermediate',
  activity: 'moderate',
  phase: 'maintain',
  dietId: 'moderate',
};

describe('round1', () => {
  it('保留一位小数', () => {
    expect(round1(2.34)).toBe(2.3);
    expect(round1(2.35)).toBe(2.4);
    expect(round1(12.5)).toBe(12.5);
  });
});

describe('buildDailyTargets', () => {
  it('维持期返回正的热量与三大宏量', () => {
    const t = buildDailyTargets(base);
    expect(t.calories).toBeGreaterThan(0);
    expect(t.proteinG).toBeGreaterThan(0);
    expect(t.carbG).toBeGreaterThan(0);
    expect(t.fatG).toBeGreaterThan(0);
    expect(t.tdee).toBeGreaterThan(0);
  });

  it('增肌期热量高于维持期（约 +400）', () => {
    const maintain = buildDailyTargets(base).calories;
    const bulk = buildDailyTargets({ ...base, phase: 'bulk' }).calories;
    expect(bulk - maintain).toBe(400);
  });

  it('macroOverride 生效且返回有限值', () => {
    const t = buildDailyTargets(base, { carb: 10, protein: 40, fat: 50 });
    expect(Number.isFinite(t.calories)).toBe(true);
    expect(t.proteinG).toBeGreaterThan(0);
  });
});

describe('buildMealPlan', () => {
  it('四餐且热量占比合计 100%', () => {
    const plan = buildMealPlan(base);
    expect(plan.meals.length).toBe(4);
    const sum = plan.meals.reduce((s, m) => s + m.pct, 0);
    expect(sum).toBe(100);
  });

  it('生酮方案碳水极低（<=10g/餐）', () => {
    const plan = buildMealPlan({ ...base, dietId: 'keto' });
    expect(plan.meals.every((m) => m.carbG <= 10)).toBe(true);
  });

  it('减脂期带 warn 提示', () => {
    const plan = buildMealPlan({ ...base, phase: 'cut' });
    expect(plan.warn).toBeTruthy();
  });
});

describe('ROUTINE_PATTERNS / buildWeekPlan', () => {
  it('五种分化各 7 天', () => {
    for (const p of Object.values(ROUTINE_PATTERNS)) expect(p.length).toBe(7);
  });

  it('buildWeekPlan 返回 7 天且训练日数等于模式', () => {
    const week = buildWeekPlan(base, 'push-pull-legs');
    expect(week.length).toBe(7);
    const trainDays = week.filter((d) => d.isTrainDay).length;
    expect(trainDays).toBe(ROUTINE_PATTERNS['push-pull-legs'].filter(Boolean).length);
  });

  it('REST_DAY_MACRO 碳水约 25%', () => {
    expect(REST_DAY_MACRO.carb).toBe(25);
  });
});
