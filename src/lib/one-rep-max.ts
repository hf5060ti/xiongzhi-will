// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 1RM（一次最大重量）估算：三公式对照。
// 说明：都是经验公式，次数越多误差越大；超过 10 次的组不要拿来估算 1RM。

export type OneRmFormulaId = 'epley' | 'brzycki' | 'lombardi';

export interface OneRmFormula {
  id: OneRmFormulaId;
  label: string;
  formula: string;
  note: string;
  calc: (weightKg: number, reps: number) => number;
}

/** 次数超过这个值，公式误差快速放大（页面会提示） */
export const REPS_ACCURACY_LIMIT = 10;

export const ONE_RM_FORMULAS: OneRmFormula[] = [
  {
    id: 'epley',
    label: 'Epley',
    formula: '1RM = w × (1 + 次数 ÷ 30)',
    note: '最常用，1–8 次最准；本站判级统一以此为准（与身体数据页、训练记录口径一致）',
    calc: (w, r) => w * (1 + r / 30),
  },
  {
    id: 'brzycki',
    label: 'Brzycki',
    formula: '1RM = w × 36 ÷ (37 − 次数)',
    note: '低次数偏保守，次数接近 37 时会失真',
    calc: (w, r) => (w * 36) / (37 - r),
  },
  {
    id: 'lombardi',
    label: 'Lombardi',
    formula: '1RM = w × 次数^0.10',
    note: '高次数时比 Epley 更保守',
    calc: (w, r) => w * Math.pow(r, 0.1),
  },
];

/** 按公式估算 1RM，保留一位小数 */
export function estimate1rm(weightKg: number, reps: number, formula: OneRmFormulaId = 'epley'): number {
  const f = ONE_RM_FORMULAS.find((x) => x.id === formula) ?? ONE_RM_FORMULAS[0];
  const w = Number.isFinite(weightKg) ? weightKg : 0;
  const r = Math.max(1, Math.round(Number.isFinite(reps) ? reps : 1));
  if (w <= 0) return 0;
  // Brzycki 在 reps 接近 37 时发散，先卡住
  const safeR = Math.min(r, 36);
  const v = f.calc(w, safeR);
  return Number.isFinite(v) ? Math.round(v * 10) / 10 : 0;
}

/** 三公式一起算，便于页面对照展示 */
export function estimateAll(weightKg: number, reps: number): Record<OneRmFormulaId, number> {
  return {
    epley: estimate1rm(weightKg, reps, 'epley'),
    brzycki: estimate1rm(weightKg, reps, 'brzycki'),
    lombardi: estimate1rm(weightKg, reps, 'lombardi'),
  };
}

/** 次数是否超出可靠区间 */
export function isRepsUnreliable(reps: number): boolean {
  return Number.isFinite(reps) && reps > REPS_ACCURACY_LIMIT;
}
