// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
//
// 力量等级标准（38 项动作）：输入性别 / 年龄 / 体重 + 动作 + 重量×次数，
// 估算 1RM 后按「1RM ÷ 体重」判级，输出五档等级与星级。
//
// 数据来源与口径（务必与页面展示保持一致）：
//   1. 五大核心动作（深蹲 / 卧推 / 硬拉 / 站姿推举 / 杠铃弯举）沿用本站既有的
//      src/lib/performance-standards.ts 档位，其出处为 fitnesscalcs.com
//      《How Strong Should You Be?》Bodyweight Ratio Standards（男女各五档）。
//   2. 其余动作没有同等公信力的公开原始表，本站以核心动作为锚点，按部位相对强度
//      （如前蹲 ≈ 深蹲 0.85、上斜卧推 ≈ 卧推 0.85）折算成五档门槛，属**估算值**。
//   3. 女性档位由男性档位按部位系数折算（下肢 0.72 / 上肢与肩臂 0.60 / 举重 0.65 /
//      自重负重 0.55 / 固定器械 0.68），同样属估算。
//   4. 年龄系数用于放宽年长者的达标门槛（40 岁后每档 ×0.95→0.70 递减），
//      参考力量随年龄下降的一般规律，属**估算**。
//   5. 本页面只借鉴「输入性别/年龄/体重/动作/重量×次数 → 输出等级星级」这一通用功能形态，
//      未使用任何第三方站点的文案或数据表，数据由本站整理并标注折算口径。
// 免责：所有数值为一般人群参考，不是比赛分级标准，也不构成训练或医疗建议。

export type LiftGroup = 'barbell' | 'bodyweight' | 'olympic' | 'dumbbell' | 'machine';

export const LIFT_GROUPS: { id: LiftGroup; label: string }[] = [
  { id: 'barbell', label: '杠铃' },
  { id: 'olympic', label: '举重' },
  { id: 'dumbbell', label: '哑铃' },
  { id: 'machine', label: '固定器械' },
  { id: 'bodyweight', label: '自重（按附加负重）' },
];

/** 五档等级：名称 + 星级（与页面展示一致） */
export const STRENGTH_TIERS = [
  { label: '入门', stars: '★' },
  { label: '进阶', stars: '★★' },
  { label: '熟练', stars: '★★★' },
  { label: '优秀', stars: '★★★★' },
  { label: '精英', stars: '★★★★★' },
] as const;

export const TIER_UNRANKED = '起步';

export interface AgeGroup {
  id: string;
  label: string;
  /** 门槛放宽系数：年龄越大门槛越低（同等成绩越容易达标） */
  factor: number;
}

/** 年龄组（系数作用于门槛，属估算） */
export const AGE_GROUPS: AgeGroup[] = [
  { id: '14-17', label: '14-17 岁', factor: 0.9 },
  { id: '18-23', label: '18-23 岁', factor: 0.96 },
  { id: '24-39', label: '24-39 岁', factor: 1 },
  { id: '40-49', label: '40-49 岁', factor: 0.95 },
  { id: '50-59', label: '50-59 岁', factor: 0.88 },
  { id: '60-69', label: '60-69 岁', factor: 0.8 },
  { id: '70-79', label: '70-79 岁', factor: 0.7 },
];

export interface LiftStandardDef {
  key: string;
  label: string;
  group: LiftGroup;
  /** 男性五档门槛（1RM ÷ 体重） */
  male: number[];
  /** 女性由男性按此系数折算 */
  femaleFactor: number;
  /** 需要额外说明口径（如自重动作按附加负重） */
  note?: string;
}

/** 38 项动作的力量标准（男性五档为体重倍数；女性按系数折算） */
export const LIFT_STANDARDS: LiftStandardDef[] = [
  // ── 杠铃 ──
  { key: 'squat', label: '深蹲', group: 'barbell', male: [0.75, 1.15, 1.5, 2.0, 2.5], femaleFactor: 0.72 },
  { key: 'bench', label: '卧推', group: 'barbell', male: [0.5, 0.85, 1.15, 1.5, 1.85], femaleFactor: 0.6 },
  { key: 'deadlift', label: '硬拉', group: 'barbell', male: [1.0, 1.4, 1.85, 2.35, 2.75], femaleFactor: 0.78 },
  { key: 'ohp', label: '肩上举（站姿推举）', group: 'barbell', male: [0.35, 0.55, 0.75, 1.0, 1.25], femaleFactor: 0.6 },
  { key: 'front_squat', label: '前蹲', group: 'barbell', male: [0.65, 0.95, 1.25, 1.7, 2.1], femaleFactor: 0.72 },
  { key: 'barbell_row', label: '杠铃划船', group: 'barbell', male: [0.6, 0.9, 1.15, 1.45, 1.75], femaleFactor: 0.6 },
  { key: 'incline_bench', label: '上斜卧推', group: 'barbell', male: [0.45, 0.75, 1.0, 1.3, 1.6], femaleFactor: 0.6 },
  { key: 'decline_bench', label: '下斜卧推', group: 'barbell', male: [0.5, 0.9, 1.2, 1.55, 1.9], femaleFactor: 0.6 },
  { key: 'rdl', label: '罗马尼亚硬拉', group: 'barbell', male: [0.65, 0.95, 1.25, 1.6, 1.9], femaleFactor: 0.78 },
  { key: 'trap_bar_deadlift', label: '六角杠硬拉', group: 'barbell', male: [1.05, 1.45, 1.9, 2.4, 2.8], femaleFactor: 0.78 },
  { key: 'hip_thrust', label: '臀举', group: 'barbell', male: [1.0, 1.4, 1.8, 2.2, 2.6], femaleFactor: 0.78 },
  { key: 'barbell_curl', label: '杠铃弯举', group: 'barbell', male: [0.25, 0.4, 0.6, 0.8, 1.05], femaleFactor: 0.6 },
  { key: 'shrug', label: '杠铃耸肩', group: 'barbell', male: [0.7, 1.0, 1.3, 1.6, 1.9], femaleFactor: 0.6 },
  { key: 'upright_row', label: '杠铃直立划船', group: 'barbell', male: [0.35, 0.5, 0.65, 0.85, 1.05], femaleFactor: 0.6 },
  { key: 'good_morning', label: '早安体前屈', group: 'barbell', male: [0.35, 0.5, 0.7, 0.9, 1.1], femaleFactor: 0.72 },
  { key: 'wrist_curl', label: '杠铃腕弯举', group: 'barbell', male: [0.15, 0.25, 0.35, 0.45, 0.55], femaleFactor: 0.6 },

  // ── 举重 ──
  { key: 'snatch', label: '抓举', group: 'olympic', male: [0.35, 0.55, 0.75, 0.95, 1.15], femaleFactor: 0.65 },
  { key: 'power_clean', label: '高翻', group: 'olympic', male: [0.5, 0.75, 1.0, 1.25, 1.5], femaleFactor: 0.65 },
  { key: 'clean_and_jerk', label: '挺举', group: 'olympic', male: [0.45, 0.7, 0.95, 1.2, 1.45], femaleFactor: 0.65 },
  { key: 'clean_and_press', label: '提铃上举', group: 'olympic', male: [0.4, 0.6, 0.8, 1.0, 1.2], femaleFactor: 0.65 },
  { key: 'push_press', label: '借力举', group: 'olympic', male: [0.45, 0.65, 0.85, 1.05, 1.3], femaleFactor: 0.65 },

  // ── 哑铃（按两侧合计重量）──
  { key: 'db_bench', label: '哑铃卧推', group: 'dumbbell', male: [0.4, 0.7, 0.95, 1.2, 1.5], femaleFactor: 0.6, note: '按两侧哑铃合计重量' },
  { key: 'db_shoulder_press', label: '哑铃肩上举', group: 'dumbbell', male: [0.3, 0.47, 0.64, 0.85, 1.05], femaleFactor: 0.6, note: '按两侧合计重量' },
  { key: 'db_row', label: '哑铃划船', group: 'dumbbell', male: [0.3, 0.45, 0.6, 0.75, 0.9], femaleFactor: 0.6, note: '按单侧重量' },
  { key: 'db_curl', label: '哑铃弯举', group: 'dumbbell', male: [0.2, 0.32, 0.48, 0.64, 0.85], femaleFactor: 0.6, note: '按两侧合计重量' },
  { key: 'db_shrug', label: '哑铃耸肩', group: 'dumbbell', male: [0.5, 0.75, 1.0, 1.25, 1.5], femaleFactor: 0.6, note: '按两侧合计重量' },
  { key: 'db_lateral_raise', label: '哑铃侧平举', group: 'dumbbell', male: [0.08, 0.13, 0.18, 0.25, 0.32], femaleFactor: 0.6, note: '按两侧合计重量' },
  { key: 'db_front_raise', label: '哑铃前平举', group: 'dumbbell', male: [0.1, 0.16, 0.22, 0.3, 0.38], femaleFactor: 0.6, note: '按两侧合计重量' },
  {
    key: 'farmer_walk',
    label: '农夫行走',
    group: 'dumbbell',
    male: [0.5, 0.75, 1.0, 1.3, 1.6],
    femaleFactor: 0.65,
    note: '按两侧合计重量（不含自身体重）；填你能提着走完目标距离的重量，次数填 1',
  },

  // ── 固定器械 ──
  { key: 'leg_press', label: '腿举', group: 'machine', male: [1.4, 2.0, 2.7, 3.5, 4.3], femaleFactor: 0.68 },
  { key: 'horizontal_leg_press', label: '水平腿举', group: 'machine', male: [1.2, 1.8, 2.4, 3.0, 3.7], femaleFactor: 0.68 },
  { key: 'lat_pulldown', label: '高位下拉', group: 'machine', male: [0.6, 0.85, 1.1, 1.35, 1.6], femaleFactor: 0.68 },
  { key: 'leg_extension', label: '坐姿腿屈伸', group: 'machine', male: [0.35, 0.5, 0.7, 0.85, 1.0], femaleFactor: 0.68 },
  { key: 'seated_leg_curl', label: '坐姿腿弯举', group: 'machine', male: [0.3, 0.45, 0.6, 0.75, 0.9], femaleFactor: 0.68 },
  { key: 'lying_leg_curl', label: '俯身腿弯举', group: 'machine', male: [0.25, 0.4, 0.55, 0.7, 0.85], femaleFactor: 0.68 },

  // ── 自重（按附加负重计算，不含自身体重）──
  { key: 'pull_up', label: '引体向上', group: 'bodyweight', male: [0.0, 0.1, 0.25, 0.4, 0.55], femaleFactor: 0.55, note: '填附加负重（腰带挂片 / 握哑铃），不加负重填 0' },
  { key: 'chin_up', label: '正手引体向上', group: 'bodyweight', male: [0.0, 0.08, 0.2, 0.35, 0.5], femaleFactor: 0.55, note: '同上，只填附加负重' },
  { key: 'dip', label: '双杠臂屈伸', group: 'bodyweight', male: [0.05, 0.2, 0.35, 0.5, 0.7], femaleFactor: 0.55, note: '同上，只填附加负重' },
  { key: 'push_up', label: '俯卧撑', group: 'bodyweight', male: [0.0, 0.1, 0.25, 0.4, 0.55], femaleFactor: 0.55, note: '同上，背上加重物时填附加重量' },
];

export type Sex = 'male' | 'female';

/** 取动作定义 */
export function liftDefOf(key: string): LiftStandardDef | undefined {
  return LIFT_STANDARDS.find((l) => l.key === key);
}

/** 五档门槛（体重倍数）：男性直接取值，女性按部位系数折算 */
export function ratioThresholds(def: LiftStandardDef, sex: Sex): number[] {
  if (sex === 'male') return def.male;
  return def.male.map((v) => Math.round(v * def.femaleFactor * 100) / 100);
}

/** 五档门槛换算成绝对重量（kg）：倍数 × 体重 × 年龄系数 */
export function weightThresholds(def: LiftStandardDef, sex: Sex, bodyweightKg: number, ageFactor: number): number[] {
  const bw = bodyweightKg > 0 ? bodyweightKg : 0;
  return ratioThresholds(def, sex).map((r) => Math.round(r * bw * ageFactor * 10) / 10);
}

export interface StrengthResult {
  /** 0 = 未达首档；1..5 = 对应档位 */
  tier: number;
  label: string;
  stars: string;
  /** 1RM ÷ 体重 */
  ratio: number;
  /** 五档的绝对重量门槛（kg） */
  thresholdsKg: number[];
  rows: { label: string; stars: string; kg: number; passed: boolean; current: boolean }[];
  nextLabel: string | null;
  /** 距下一档还差多少 kg（已达标最高档为 null） */
  gapKg: number | null;
  /** 当前档区间内的完成度 0–100 */
  withinPct: number;
}

/** 判级：oneRmKg 已由 1RM 公式估算得出（判级统一用 Epley，与站内其它页面口径一致） */
export function judgeStrength(
  def: LiftStandardDef,
  sex: Sex,
  ageFactor: number,
  bodyweightKg: number,
  oneRmKg: number,
): StrengthResult | null {
  const bw = bodyweightKg;
  if (!(bw > 0) || !(oneRmKg > 0) || !Number.isFinite(oneRmKg)) return null;

  const kg = weightThresholds(def, sex, bw, ageFactor);
  let tier = 0;
  for (const t of kg) {
    if (oneRmKg >= t) tier += 1;
    else break;
  }

  const ratio = Math.round((oneRmKg / bw) * 100) / 100;
  const rows = STRENGTH_TIERS.map((t, i) => ({
    label: t.label,
    stars: t.stars,
    kg: kg[i],
    passed: oneRmKg >= kg[i],
    current: tier === i + 1,
  }));

  const nextIdx = tier; // 下一档下标
  const gapKg = nextIdx < kg.length ? Math.round((kg[nextIdx] - oneRmKg) * 10) / 10 : null;

  // 档内进度：当前档门槛 → 下一档门槛
  let withinPct = 0;
  if (tier === 0) {
    withinPct = kg[0] > 0 ? Math.max(0, Math.min(100, Math.round((oneRmKg / kg[0]) * 100))) : 0;
  } else if (tier >= kg.length) {
    withinPct = 100;
  } else {
    const from = kg[tier - 1];
    const to = kg[tier];
    const span = to - from || 1;
    withinPct = Math.max(0, Math.min(100, Math.round(((oneRmKg - from) / span) * 100)));
  }

  const cur = tier > 0 ? STRENGTH_TIERS[tier - 1] : null;
  return {
    tier,
    label: cur ? cur.label : TIER_UNRANKED,
    stars: cur ? cur.stars : '',
    ratio,
    thresholdsKg: kg,
    rows,
    nextLabel: nextIdx < STRENGTH_TIERS.length ? STRENGTH_TIERS[nextIdx].label : null,
    gapKg: gapKg != null ? Math.max(0, gapKg) : null,
    withinPct,
  };
}
