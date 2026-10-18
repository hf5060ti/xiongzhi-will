// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import { computePlates } from './plate-calculator';

describe('computePlates', () => {
  it('100kg / 男杆20 → 每侧 [25,15]，精确 100kg', () => {
    const r = computePlates(100, 20);
    expect(r.perSide).toEqual([25, 15]);
    expect(r.exact).toBe(true);
    expect(r.actualKg).toBe(100);
  });

  it('90kg → 每侧 [25,10]', () => {
    const r = computePlates(90, 20);
    expect(r.perSide).toEqual([25, 10]);
    expect(r.actualKg).toBe(90);
  });

  it('95kg → 每侧 [25,10,2.5]', () => {
    const r = computePlates(95, 20);
    expect(r.perSide).toEqual([25, 10, 2.5]);
    expect(r.actualKg).toBe(95);
  });

  it('60kg → 每侧 [20]', () => {
    expect(computePlates(60, 20).perSide).toEqual([20]);
  });

  it('45kg → 每侧 [10,2.5]', () => {
    expect(computePlates(45, 20).perSide).toEqual([10, 2.5]);
  });

  it('137.5kg → 每侧 [25,25,5,2.5,1.25]', () => {
    expect(computePlates(137.5, 20).perSide).toEqual([25, 25, 5, 2.5, 1.25]);
  });

  it('女杆 15kg：80kg → 每侧 [25,5,2.5]，精确 80kg', () => {
    const r = computePlates(80, 15);
    expect(r.perSide).toEqual([25, 5, 2.5]);
    expect(r.actualKg).toBe(80);
  });

  it('目标 ≤ 杆重：只上杆，实际最少就是杆重（diff 为正）', () => {
    const r = computePlates(15, 20);
    expect(r.perSide).toEqual([]);
    expect(r.exact).toBe(false);
    // 杆就 20kg，无法低于杆重，所以实际 20kg 比目标 15kg 重 5kg
    expect(r.diffKg).toBe(5);
  });

  it('非法 / 负数输入不崩，返回零杆结果', () => {
    const r = computePlates(Number.NaN, 20);
    expect(r.perSide).toEqual([]);
    expect(Number.isFinite(r.actualKg)).toBe(true);
  });
});
