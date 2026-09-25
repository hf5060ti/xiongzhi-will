// EXPORTS: 身体数据计算函数集（自然健身公式库）
// 全部按用户给定公式原样实现：瘦体重 / 蛋白质需求 / 肌肉量上限（5 公式）/
// BMR（6 公式）/ TDEE / 增肌速率（Alan Aragon）
// 约定：长度 cm、质量 kg、能量 kcal/天；估算误差 ±10–15%

export type Sex = 'male' | 'female';
export type TrainLevel = 'beginner' | 'intermediate' | 'advanced';
export type Phase = 'bulk' | 'cut' | 'maintain';

export interface BodyInput {
  sex: Sex;
  age: number; // 岁
  heightCm: number;
  weightKg: number;
  bodyFatPct: number; // 如 25 表示 25%
  wristCm: number; // Casey Butt 用，可 0=未填
  ankleCm: number; // Casey Butt 用，可 0=未填
  level: TrainLevel;
}

export const ACTIVITY_FACTORS = [
  { id: 'sedentary', label: '久坐', value: 1.2 },
  { id: 'light', label: '轻度活动', value: 1.375 },
  { id: 'moderate', label: '中度活动', value: 1.55 },
  { id: 'high', label: '高度活动', value: 1.725 },
  { id: 'extreme', label: '极高活动', value: 1.9 },
] as const;

// ---------- 瘦体重 ----------
export function calcLbm(weightKg: number, bodyFatPct: number): number {
  return weightKg * (1 - bodyFatPct / 100);
}

// ---------- 蛋白质需求（按阶段 × 瘦体重，用户基准：减脂 LBM×2.3） ----------
export interface ProteinResult {
  target: number; // 每日蛋白质克数（基准值）
  range: [number, number]; // 区间（g）
  perKgLbm: number; // 按瘦体重折算 g/kg
}

export function calcProtein(lbmKg: number, phase: Phase): ProteinResult {
  if (phase === 'cut') {
    return { target: lbmKg * 2.3, range: [lbmKg * 2.2, lbmKg * 2.6], perKgLbm: 2.3 };
  }
  if (phase === 'bulk') {
    return { target: lbmKg * 2.2, range: [lbmKg * 2.0, lbmKg * 2.4], perKgLbm: 2.2 };
  }
  return { target: lbmKg * 1.8, range: [lbmKg * 1.6, lbmKg * 2.0], perKgLbm: 1.8 };
}

// 各训练目标的蛋白质偏好（g/kg 总体重），用于目标联动提示
export const GOAL_PROTEIN: Record<string, { kg: string; note: string }> = {
  hypertrophy: { kg: '1.6–2.2', note: '容量训练恢复需求高，吃够上限附近更稳。' },
  armwrestling: { kg: '1.6–2.0', note: '前臂与支撑组织反复受压，蛋白质别低于 1.6。' },
  strongman: { kg: '1.6–2.2', note: '大重量对神经与结缔组织消耗大，按上限走。' },
  conditioning: { kg: '1.6–2.0', note: '力量 + 耐力 + 劳作三线并行，吃够 1.6 保力量，碳水供循环。' },
  calisthenics: { kg: '1.6–2.0', note: '自重增肌，按体重吃够，练技巧日可略降。' },
};

// ---------- 肌肉量上限（自然健身，男 FFMI 25 / 女 20–22 取 21） ----------
export function ffmiLbmMax(sex: Sex, heightCm: number): number {
  const ffmiMax = sex === 'male' ? 25 : 21;
  return ffmiMax * Math.pow(heightCm / 100, 2);
}

export function caseyButtLbmMax(heightCm: number, wristCm: number, ankleCm: number): number | null {
  if (!wristCm || !ankleCm) return null;
  return (
    0.070307 *
    Math.pow(heightCm, 1.5) *
    (Math.sqrt(wristCm) / 22.667 + Math.sqrt(ankleCm) / 17.0104)
  );
}

export function martinBerkhamWeightMax(heightCm: number): number {
  return heightCm - 100; // 对应 5–6% 体脂的总体重
}

export function builtLeanLbmMax(heightCm: number): number {
  return 0.8929 * heightCm - 86.18;
}

// ---------- BMR（6 公式） ----------
export interface BmrResults {
  mifflin: number;
  harris: number;
  katch: number; // 推荐（基于 LBM）
  cunningham: number; // 推荐（基于 LBM）
  fao: number;
  owen: number;
}

export function calcBmr(input: {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  lbmKg: number;
}): BmrResults {
  const { sex, age, heightCm, weightKg, lbmKg } = input;
  const mifflin =
    sex === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const harris =
    sex === 'male'
      ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
      : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  const katch = 370 + 21.6 * lbmKg;
  const cunningham = 500 + 22 * lbmKg;
  const fao =
    sex === 'male'
      ? age <= 30
        ? 15.3 * weightKg + 679
        : age <= 60
          ? 11.6 * weightKg + 879
          : 13.5 * weightKg + 487
      : age <= 30
        ? 14.7 * weightKg + 496
        : age <= 60
          ? 8.7 * weightKg + 829
          : 10.5 * weightKg + 596;
  const owen = sex === 'male' ? 879 + 10.2 * weightKg : 795 + 7.18 * weightKg;
  return { mifflin, harris, katch, cunningham, fao, owen };
}

// ---------- TDEE ----------
export function tdee(bmr: number, factor: number): number {
  return bmr * factor;
}

// ---------- 食物热效应 TEF（用户给定区间，取中值） ----------
// 蛋白 20–25%（取 22.5）/ 碳水 5–10%（取 7.5）/ 脂肪 1–5%（取 3）
// 按宏量供能百分比加权：macro 三项加起来应=100
export function tefPct(macro: { carb: number; protein: number; fat: number }): number {
  return (macro.carb * 7.5 + macro.protein * 22.5 + macro.fat * 3) / 100;
}

// ---------- 增肌速率（Alan Aragon，月增长） ----------
export function aragonGain(weightKg: number, level: TrainLevel): [number, number] {
  if (level === 'beginner') return [weightKg * 0.01, weightKg * 0.015];
  if (level === 'intermediate') return [weightKg * 0.005, weightKg * 0.01];
  return [weightKg * 0.0025, weightKg * 0.005];
}

// ---------- 1RM 最大筋力换算（用户给定百分比表） ----------
export const REP_PCT: Record<number, number> = {
  1: 1.0,
  2: 0.95,
  3: 0.925,
  4: 0.9,
  5: 0.875,
  6: 0.85,
  7: 0.825,
  8: 0.8,
  9: 0.775,
  10: 0.75,
  12: 0.7,
};

// 用「完成 n 次的重量」估算 1RM。
// 口径统一：与能力追踪判级 / 训练记录一致，采用 Epley 公式（1RM = 重量 ×（1 + 次数 ÷ 30）），
// 不再与百分比表并存两算；下方 REP_PCT 表仅用于列出「各次数的建议重量」作参考。
export function estimateOneRm(weightKg: number, reps: number): number {
  const r = Math.max(1, Math.round(reps));
  return Math.round(weightKg * (1 + r / 30) * 10) / 10;
}

// 已知 1RM，反推各次数对应的建议重量
export function plannedWeights(oneRmKg: number): { reps: number; weight: number; pct: number }[] {
  return Object.entries(REP_PCT).map(([n, pct]) => ({
    reps: Number(n),
    pct,
    weight: oneRmKg * pct,
  }));
}

export const LEVEL_LABEL: Record<TrainLevel, string> = {
  beginner: '初学者',
  intermediate: '中级者',
  advanced: '高级者',
};

export const PHASE_LABEL: Record<Phase, string> = {
  bulk: '增肌期',
  cut: '减脂期',
  maintain: '维持期',
};

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export function round0(n: number): number {
  return Math.round(n);
}

// ---------- 力量等级对照表（IPF 系数，按体重段 × 等级，单位：体重倍数） ----------
// 来源：男性 / 女性训练水平简表（用户提供）
// 每项 = [三项总重倍数, 深蹲倍数, 卧推倍数, 硬拉倍数]
export type StrengthLevel =
  | 'untrained'
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'elite'
  | 'master'
  | 'world';

export const STRENGTH_LEVEL_LABEL: Record<StrengthLevel, string> = {
  untrained: '未训练',
  beginner: '初学者',
  intermediate: '中级',
  advanced: '高级',
  elite: '精英级',
  master: '大师级',
  world: '世界级',
};

export interface StrengthRow {
  weightBand: string; // 如 "59–66 kg"
  level: StrengthLevel;
  total: number; // 三项总重 / 体重
  squat: number;
  bench: number;
  deadlift: number;
}

// 男性：体重段 59–66 / 74–83 / 93–120
export const MALE_STRENGTH_TABLE: StrengthRow[] = [
  { weightBand: '59–66 kg', level: 'untrained', total: 2.97, squat: 0.86, bench: 0.64, deadlift: 1.23 },
  { weightBand: '74–83 kg', level: 'untrained', total: 2.91, squat: 0.85, bench: 0.63, deadlift: 1.20 },
  { weightBand: '93–120 kg', level: 'untrained', total: 2.70, squat: 0.83, bench: 0.59, deadlift: 1.13 },
  { weightBand: '59–66 kg', level: 'beginner', total: 3.65, squat: 1.18, bench: 0.82, deadlift: 1.53 },
  { weightBand: '74–83 kg', level: 'beginner', total: 3.57, squat: 1.15, bench: 0.80, deadlift: 1.49 },
  { weightBand: '93–120 kg', level: 'beginner', total: 3.35, squat: 1.13, bench: 0.75, deadlift: 1.41 },
  { weightBand: '59–66 kg', level: 'intermediate', total: 4.98, squat: 1.68, bench: 1.15, deadlift: 2.06 },
  { weightBand: '74–83 kg', level: 'intermediate', total: 4.78, squat: 1.60, bench: 1.10, deadlift: 1.95 },
  { weightBand: '93–120 kg', level: 'intermediate', total: 4.46, squat: 1.53, bench: 1.04, deadlift: 1.84 },
  { weightBand: '59–66 kg', level: 'advanced', total: 6.03, squat: 2.10, bench: 1.45, deadlift: 2.45 },
  { weightBand: '74–83 kg', level: 'advanced', total: 5.76, squat: 1.99, bench: 1.39, deadlift: 2.31 },
  { weightBand: '93–120 kg', level: 'advanced', total: 5.41, squat: 1.88, bench: 1.29, deadlift: 2.17 },
  { weightBand: '59–66 kg', level: 'elite', total: 7.20, squat: 2.54, bench: 1.76, deadlift: 2.77 },
  { weightBand: '74–83 kg', level: 'elite', total: 6.90, squat: 2.41, bench: 1.69, deadlift: 2.88 },
  { weightBand: '93–120 kg', level: 'elite', total: 6.47, squat: 2.30, bench: 1.57, deadlift: 2.57 },
  { weightBand: '59–66 kg', level: 'master', total: 8.37, squat: 3.02, bench: 2.13, deadlift: 3.30 },
  { weightBand: '74–83 kg', level: 'master', total: 8.10, squat: 2.89, bench: 2.02, deadlift: 3.14 },
  { weightBand: '93–120 kg', level: 'master', total: 7.52, squat: 2.76, bench: 1.89, deadlift: 2.94 },
  { weightBand: '59–66 kg', level: 'world', total: 9.05, squat: 3.17, bench: 2.33, deadlift: 3.56 },
  { weightBand: '74–83 kg', level: 'world', total: 8.85, squat: 3.07, bench: 2.22, deadlift: 3.39 },
  { weightBand: '93–120 kg', level: 'world', total: 8.35, squat: 3.07, bench: 2.07, deadlift: 3.19 },
];

// 女性：体重段 47–52 / 57–63 / 72–84+
export const FEMALE_STRENGTH_TABLE: StrengthRow[] = [
  { weightBand: '47–52 kg', level: 'untrained', total: 2.41, squat: 0.73, bench: 0.52, deadlift: 1.01 },
  { weightBand: '57–63 kg', level: 'untrained', total: 2.27, squat: 0.70, bench: 0.50, deadlift: 0.96 },
  { weightBand: '72–84+ kg', level: 'untrained', total: 2.14, squat: 0.68, bench: 0.47, deadlift: 0.92 },
  { weightBand: '47–52 kg', level: 'beginner', total: 3.06, squat: 1.02, bench: 0.69, deadlift: 1.28 },
  { weightBand: '57–63 kg', level: 'beginner', total: 2.92, squat: 0.98, bench: 0.67, deadlift: 1.23 },
  { weightBand: '72–84+ kg', level: 'beginner', total: 2.78, squat: 0.93, bench: 0.64, deadlift: 1.17 },
  { weightBand: '47–52 kg', level: 'intermediate', total: 4.22, squat: 1.44, bench: 0.99, deadlift: 1.75 },
  { weightBand: '57–63 kg', level: 'intermediate', total: 4.07, squat: 1.42, bench: 0.95, deadlift: 1.67 },
  { weightBand: '72–84+ kg', level: 'intermediate', total: 3.88, squat: 1.36, bench: 0.90, deadlift: 1.58 },
  { weightBand: '47–52 kg', level: 'advanced', total: 5.20, squat: 1.81, bench: 1.24, deadlift: 2.11 },
  { weightBand: '57–63 kg', level: 'advanced', total: 5.05, squat: 1.77, bench: 1.19, deadlift: 2.03 },
  { weightBand: '72–84+ kg', level: 'advanced', total: 4.86, squat: 1.69, bench: 1.12, deadlift: 2.00 },
  { weightBand: '47–52 kg', level: 'elite', total: 6.22, squat: 2.19, bench: 1.52, deadlift: 2.47 },
  { weightBand: '57–63 kg', level: 'elite', total: 6.03, squat: 2.15, bench: 1.46, deadlift: 2.37 },
  { weightBand: '72–84+ kg', level: 'elite', total: 5.88, squat: 2.07, bench: 1.38, deadlift: 2.38 },
  { weightBand: '47–52 kg', level: 'master', total: 7.33, squat: 2.62, bench: 1.83, deadlift: 2.84 },
  { weightBand: '57–63 kg', level: 'master', total: 7.11, squat: 2.57, bench: 1.76, deadlift: 2.74 },
  { weightBand: '72–84+ kg', level: 'master', total: 6.94, squat: 2.47, bench: 1.65, deadlift: 2.76 },
  { weightBand: '47–52 kg', level: 'world', total: 7.98, squat: 2.87, bench: 2.00, deadlift: 3.07 },
  { weightBand: '57–63 kg', level: 'world', total: 7.77, squat: 2.81, bench: 1.92, deadlift: 2.97 },
  { weightBand: '72–84+ kg', level: 'world', total: 7.57, squat: 2.72, bench: 1.80, deadlift: 2.99 },
];

// 根据体重（kg）返回用户所在体重段标签
export function matchWeightBand(sex: Sex, weightKg: number): string | null {
  if (sex === 'male') {
    if (weightKg < 59) return '59–66 kg'; // 偏轻，归入最近档
    if (weightKg <= 66) return '59–66 kg';
    if (weightKg <= 83) return '74–83 kg';
    return '93–120 kg';
  }
  if (weightKg < 47) return '47–52 kg';
  if (weightKg <= 52) return '47–52 kg';
  if (weightKg <= 63) return '57–63 kg';
  return '72–84+ kg';
}

// ---------- 冷兵器训练热量消耗（kcal/h，按 70kg 参考体重） ----------
// 来源：用户给定 + MET 公式（MET × 3.5 × kg / 200 × 60 = MET × 1.05 × kg）
// 剑道 270 kcal/h（用户指定）；唐刀/武士刀/苗刀/长枪 200–600 kcal/h；重兵器按重量上浮
export interface WeaponRow {
  id: string;
  name: string;
  range: [number, number]; // kcal/h（70kg 参考）
  note?: string;
}
export const WEAPON_ROWS: WeaponRow[] = [
  { id: 'kendo', name: '剑道（竹剑）', range: [270, 350], note: '用户基准 270；激烈切返 / 比赛强度上浮到 350' },
  { id: 'taiji-sword', name: '太极剑 / 慢剑', range: [150, 250], note: '慢节奏、重形不重快，类似八段锦' },
  { id: 'short-staff', name: '短棍 / 短棍术', range: [250, 400], note: '1–2 尺短棍，单手为主' },
  { id: 'tang-sword', name: '唐刀 / 武士刀 / 苗刀（单手）', range: [300, 500], note: '用户给定 200–600 区间中位；素振次数多、强度大时靠近上限' },
  { id: 'spear', name: '长枪 / 大枪', range: [350, 600], note: '长兵器全身参与、步法多，强度高于单手刀' },
  { id: 'short-axe', name: '短柄斧 / 短柄锤', range: [300, 450], note: '1–2kg 短柄，模拟劈柴' },
  { id: 'long-axe', name: '长柄斧 / 长柄锤 / 关刀', range: [400, 600], note: '3–8kg 长柄，全身发力、心率高' },
  { id: 'fencing', name: '西方击剑', range: [350, 450], note: 'MET 6.0，70kg 约 420 kcal/h' },
];

// ---------- 卧推 1–10RM 重量查表（行=1RM，列=对应次数可推重量 kg） ----------
// 来源：用户提供卧推换算表（原图个别印刷错误已按相邻行规律修正）
export const BENCH_RM_ROWS: { oneRm: number; reps: number[] }[] = [
  { oneRm: 40, reps: [40, 37, 36, 35, 34, 33, 32, 31, 30, 29] },
  { oneRm: 50, reps: [50, 47, 46, 44, 43, 42, 40, 39, 38, 37] },
  { oneRm: 60, reps: [60, 56, 55, 53, 52, 50, 49, 47, 46, 44] },
  { oneRm: 70, reps: [70, 65, 64, 62, 60, 58, 57, 55, 53, 51] },
  { oneRm: 80, reps: [80, 75, 73, 71, 69, 67, 65, 63, 61, 59] },
  { oneRm: 90, reps: [90, 84, 82, 80, 77, 75, 73, 71, 68, 66] },
  { oneRm: 100, reps: [100, 94, 91, 88, 86, 84, 81, 78, 76, 74] },
  { oneRm: 110, reps: [110, 103, 100, 97, 95, 92, 89, 86, 84, 81] },
  { oneRm: 120, reps: [120, 112, 109, 106, 103, 100, 97, 94, 91, 88] },
  { oneRm: 130, reps: [130, 122, 118, 115, 112, 109, 105, 102, 99, 96] },
  { oneRm: 140, reps: [140, 131, 127, 124, 120, 117, 113, 110, 106, 105] },
  { oneRm: 150, reps: [150, 140, 136, 133, 129, 125, 122, 118, 114, 110] },
  { oneRm: 160, reps: [160, 150, 146, 142, 138, 134, 130, 126, 122, 118] },
  { oneRm: 170, reps: [170, 159, 155, 150, 146, 142, 138, 133, 129, 125] },
  { oneRm: 180, reps: [180, 168, 164, 159, 155, 150, 146, 141, 137, 132] },
  { oneRm: 190, reps: [190, 178, 173, 168, 163, 159, 154, 149, 144, 140] },
  { oneRm: 200, reps: [200, 187, 182, 177, 172, 167, 162, 157, 152, 147] },
  { oneRm: 210, reps: [210, 196, 191, 186, 181, 175, 170, 165, 160, 154] },
  { oneRm: 220, reps: [220, 206, 200, 195, 184, 178, 172, 167, 161, 156] },
  { oneRm: 230, reps: [230, 215, 209, 204, 198, 192, 186, 181, 175, 169] },
  { oneRm: 240, reps: [240, 224, 218, 212, 206, 200, 194, 188, 182, 176] },
  { oneRm: 250, reps: [250, 234, 228, 221, 215, 209, 202, 196, 190, 184] },
];
