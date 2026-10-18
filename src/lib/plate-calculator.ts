// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 杠铃片计算器：给定目标总重与杠铃杆重，算出每侧需要上哪些片。
// 算法是公共知识（非任何项目独有实现）：每侧重 = (目标总重 − 杆重) ÷ 2，再用标准片库从大到小贪心凑。

/** 标准奥林匹克杠铃片（每侧常用的一套，单位 kg） */
export const STANDARD_PLATE_SET = [25, 20, 15, 10, 5, 2.5, 1.25];

export interface PlateResult {
  /** 一侧（单侧）杠铃片重量列表，左右对称 */
  perSide: number[];
  /** 单侧片重之和 */
  perSideTotal: number;
  /** 杠铃杆自重 */
  barKg: number;
  /** 目标总重 */
  targetKg: number;
  /** 实际可凑出的总重 = 杆重 + 单侧片重 × 2 */
  actualKg: number;
  /** 是否精确达到目标 */
  exact: boolean;
  /** 实际与目标的差值（kg），正=偏重，负=偏轻 */
  diffKg: number;
}

/**
 * 计算杠铃片组合。
 * @param targetKg 想蹲 / 推 / 拉的总重量（含杆）
 * @param barKg    杠铃杆自重（男杆 20 / 女杆 15 / 空手 0），默认 20
 * @param plates   可用片库（kg），默认标准七档
 */
export function computePlates(
  targetKg: number,
  barKg = 20,
  plates: number[] = STANDARD_PLATE_SET,
): PlateResult {
  const sorted = [...plates].sort((a, b) => b - a);
  const t = Number.isFinite(targetKg) ? Math.max(0, targetKg) : 0;
  const bar = Number.isFinite(barKg) ? Math.max(0, barKg) : 20;

  const perSideTarget = (t - bar) / 2;
  const perSide: number[] = [];
  let remaining = perSideTarget;

  if (remaining > 0) {
    for (const p of sorted) {
      // 默认每侧片源充足：尽量多放该档片；浮点误差用 1e-9 容忍
      while (remaining >= p - 1e-9) {
        perSide.push(p);
        remaining = Math.round((remaining - p) * 100) / 100;
        if (remaining < 1e-9) break;
      }
      if (remaining < 1e-9) break;
    }
  }

  const perSideTotal = Math.round(perSide.reduce((s, x) => s + x, 0) * 100) / 100;
  const actualKg = Math.round((bar + perSideTotal * 2) * 100) / 100;
  const exact = Math.abs(actualKg - t) < 0.01;
  const diffKg = Math.round((actualKg - t) * 100) / 100;

  return { perSide, perSideTotal, barKg: bar, targetKg: t, actualKg, exact, diffKg };
}
