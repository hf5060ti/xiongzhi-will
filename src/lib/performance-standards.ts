// 运动能力追踪 · 等级标准与判级函数（力量 / 耐力 / 运动能力）
// 数据来源：fitnesscalcs.com《How Strong Should You Be?》Bodyweight Ratio Standards（男女五级）、
//           Strength Level（杠铃弯举倍数）、Speediance《Strength Standards》（俯卧撑/引体/平板）、
//           高校《国家学生体质健康标准》公示版（立定跳远 / 50 米 / 1000 米）。
// 说明：力量项以「估算 1RM ÷ 体重」判定；耐力与运动能力项以原始数值判定，方向区分越大越好 / 越小越好。

export type MetricDirection = 'higher' | 'lower';
export type Sex = 'male' | 'female';

// ---------- 等级配色（tier 0 = 未达首档） ----------
export const GRADE_COLORS = ['#8A8F98', '#7D93B8', '#8CAF6A', '#C9A05C', '#D28E4A', '#A93A32'];
export const TIER_START_LABEL = '起步';

export interface GradeResult {
  tier: number;            // -1 = 未录入；0 = 未达首档；1..n = 第 n 档
  label: string;
  nextLabel: string | null;
  gap: number | null;      // 距下一档的差值（正数，单位同输入）
  color: string;
}

export function tierColor(tier: number): string {
  return GRADE_COLORS[Math.max(0, Math.min(tier, GRADE_COLORS.length - 1))];
}

/** 通用判级：thresholds 为各档门槛（升序），higher = 数值越大越好 */
export function judgeThresholds(
  value: number | null | undefined,
  thresholds: number[],
  labels: string[],
  direction: MetricDirection = 'higher',
  startLabel: string = TIER_START_LABEL,
): GradeResult {
  if (value == null || !Number.isFinite(value)) {
    return { tier: -1, label: '未录入', nextLabel: null, gap: null, color: GRADE_COLORS[0] };
  }
  let tier = 0;
  for (const t of thresholds) {
    const pass = direction === 'higher' ? value >= t : value <= t;
    if (pass) tier += 1;
    else break;
  }
  const nextIdx = tier;
  if (nextIdx < thresholds.length) {
    const gap = Math.round(Math.abs(thresholds[nextIdx] - value) * 10) / 10;
    return { tier, label: labels[nextIdx - 1] ?? startLabel, nextLabel: labels[nextIdx], gap, color: tierColor(tier) };
  }
  return { tier, label: labels[tier - 1] ?? startLabel, nextLabel: null, gap: null, color: tierColor(tier) };
}

/** 档位进度（0–100），用于板块得分与进度条 */
export function tierProgress(tier: number, totalLevels: number): number {
  if (tier < 0) return 0;
  return Math.round((Math.min(tier, totalLevels) / totalLevels) * 100);
}

/** 一组档位取中位（板块当前等级） */
export function medianTier(tiers: number[]): number | null {
  const valid = tiers.filter((t) => t >= 0).sort((a, b) => a - b);
  if (valid.length === 0) return null;
  const mid = Math.floor(valid.length / 2);
  return valid.length % 2 === 1 ? valid[mid] : Math.round((valid[mid - 1] + valid[mid]) / 2);
}

// ---------- 综合能力评级 ----------
export const OVERALL_BANDS: { min: number; label: string }[] = [
  { min: 90, label: '精英' },
  { min: 75, label: '优秀' },
  { min: 58, label: '良好' },
  { min: 40, label: '合格' },
  { min: 20, label: '入门' },
  { min: 0, label: '起步' },
];

export const OVERALL_WEIGHTS = { strength: 0.5, endurance: 0.3, athletic: 0.2 } as const;

export interface OverallResult {
  score: number | null;
  label: string;
  color: string;
}

/** 三板块加权（力量 50% / 耐力 30% / 运动能力 20%），缺板块按剩余权重归一化 */
export function overallRating(scores: { strength: number | null; endurance: number | null; athletic: number | null }): OverallResult {
  let total = 0;
  let weightSum = 0;
  for (const key of ['strength', 'endurance', 'athletic'] as const) {
    const s = scores[key];
    if (s == null) continue;
    total += s * OVERALL_WEIGHTS[key];
    weightSum += OVERALL_WEIGHTS[key];
  }
  if (weightSum === 0) return { score: null, label: '未录入', color: GRADE_COLORS[0] };
  const score = Math.round(total / weightSum);
  const band = OVERALL_BANDS.find((b) => score >= b.min) ?? OVERALL_BANDS[OVERALL_BANDS.length - 1];
  const idx = OVERALL_BANDS.indexOf(band);
  return { score, label: band.label, color: GRADE_COLORS[Math.max(0, GRADE_COLORS.length - 1 - idx)] };
}

// ---------- 力量：5 大核心动作 ----------
export const LIFTS = [
  { key: 'squat', label: '深蹲', chart: 'var(--chart-1)' },
  { key: 'bench', label: '卧推', chart: 'var(--chart-2)' },
  { key: 'deadlift', label: '硬拉', chart: 'var(--chart-3)' },
  { key: 'ohp', label: '站姿推举', chart: 'var(--chart-4)' },
  { key: 'curl', label: '杠铃弯举', chart: 'var(--chart-5)' },
] as const;

export type LiftKey = (typeof LIFTS)[number]['key'];

/**
 * 档位术语（三板块统一中文口径：入门 / 进阶 / 熟练 / 优秀 / 精英）：
 * 中文主档名 + 英文副标（副标仅作对照展示，判级仍按门槛数值）。
 * 「起步」为未达首档，见 TIER_START_LABEL。
 */
export const STRENGTH_LEVELS = ['入门 Beginner', '进阶 Novice', '熟练 Intermediate', '优秀 Advanced', '精英 Elite'];

/** 各动作五档门槛（1RM ÷ 体重） */
export const LIFT_STANDARDS: Record<LiftKey, Record<Sex, number[]>> = {
  squat: { male: [0.75, 1.15, 1.5, 2.0, 2.5], female: [0.5, 0.85, 1.15, 1.6, 2.0] },
  bench: { male: [0.5, 0.85, 1.15, 1.5, 1.85], female: [0.25, 0.5, 0.75, 1.0, 1.25] },
  deadlift: { male: [1.0, 1.4, 1.85, 2.35, 2.75], female: [0.75, 1.1, 1.4, 1.85, 2.25] },
  ohp: { male: [0.35, 0.55, 0.75, 1.0, 1.25], female: [0.2, 0.35, 0.5, 0.7, 0.9] },
  curl: { male: [0.25, 0.4, 0.6, 0.8, 1.05], female: [0.15, 0.25, 0.4, 0.55, 0.7] },
};

export function liftLabel(key: LiftKey): string {
  return LIFTS.find((l) => l.key === key)?.label ?? key;
}

export function liftChartColor(key: LiftKey): string {
  return LIFTS.find((l) => l.key === key)?.chart ?? 'var(--chart-1)';
}

/** Epley 公式估算 1RM */
export function estimate1RM(weightKg: number, reps: number): number {
  const r = Math.max(1, Math.round(reps));
  return Math.round(weightKg * (1 + r / 30) * 10) / 10;
}

// ---------- 耐力 / 运动能力：指标定义 ----------
export interface MetricDef {
  key: string;
  label: string;
  unit: string;
  direction: MetricDirection;
  levels: string[];                        // 档位名（从低到高）
  thresholds: Record<Sex, number[]>;
  isTime?: boolean;                        // 数值以「分′秒″」录入/展示
  maleOnly?: boolean;                      // 档位依据男生标准（女性暂沿用同一表）
  hint?: string;
}

export const ENDURANCE_LEVELS = ['入门 Decent', '进阶 Good', '熟练 Optimal', '优秀 Advanced', '精英 Athlete'];
// 运动能力沿用国标四项档位（无英文副标），术语与力量 / 耐力保持同一套中文
export const ATHLETIC_LEVELS = ['入门', '进阶', '熟练', '优秀'];

export const ENDURANCE_METRICS: MetricDef[] = [
  {
    key: 'pushup',
    label: '俯卧撑',
    unit: '次',
    direction: 'higher',
    levels: ENDURANCE_LEVELS,
    thresholds: { male: [10, 25, 35, 50, 60], female: [5, 10, 18, 30, 40] },
    hint: '标准俯卧撑，全程胸口贴近地面，连续做到力竭，不塌腰不撅臀。',
  },
  {
    key: 'pullup',
    label: '引体向上',
    unit: '次',
    direction: 'higher',
    levels: ENDURANCE_LEVELS,
    thresholds: { male: [3, 8, 12, 15, 20], female: [1, 3, 5, 8, 12] },
    hint: '正握、下巴过杠为一次，下放到手臂基本伸直，禁止借力摆荡。',
  },
  {
    key: 'plank',
    label: '平板支撑',
    unit: '秒',
    direction: 'higher',
    levels: ENDURANCE_LEVELS,
    thresholds: { male: [60, 120, 180, 240, 300], female: [45, 90, 135, 180, 225] },
    isTime: true,
    hint: '肘撑，头肩髋踝一条直线，塌腰或撅臀即停表。',
  },
];

export const ATHLETIC_METRICS: MetricDef[] = [
  {
    key: 'longjump',
    label: '立定跳远',
    unit: 'cm',
    direction: 'higher',
    levels: ATHLETIC_LEVELS,
    thresholds: { male: [200, 230, 250, 260], female: [145, 165, 180, 194] },
    hint: '原地双脚起跳，取最近落地点，测三次取最好成绩。',
  },
  {
    key: 'sprint50',
    label: '50 米跑',
    unit: '秒',
    direction: 'lower',
    levels: ATHLETIC_LEVELS,
    thresholds: { male: [9.5, 8.5, 7.5, 6.9], female: [10.7, 9.7, 8.5, 7.7] },
    isTime: true,
    hint: '站立式起跑，计时从起跑到躯干过终点线，顺风成绩不算数。',
  },
  {
    key: 'run1000',
    label: '1000 米跑',
    unit: '秒',
    direction: 'lower',
    levels: ATHLETIC_LEVELS,
    thresholds: {
      male: [290, 259, 223, 207],   // 4′50″ / 4′19″ / 3′43″ / 3′27″
      female: [290, 259, 223, 207], // 依据国标男生标准（女性同表参考）
    },
    isTime: true,
    maleOnly: true,
    hint: '依据《国家学生体质健康标准》男生 1000 米档位；女性暂沿用同一档位表作参考。',
  },
];

export const METRIC_GROUPS: { section: 'endurance' | 'athletic'; metrics: MetricDef[] }[] = [
  { section: 'endurance', metrics: ENDURANCE_METRICS },
  { section: 'athletic', metrics: ATHLETIC_METRICS },
];

export function metricDefOf(metrics: MetricDef[], key: string): MetricDef | undefined {
  return metrics.find((m) => m.key === key);
}

// ---------- 时间输入 / 展示 ----------
/** 解析「4:50」「4′50″」「90」等输入为秒 */
export function parseDurationInput(raw: string): number | null {
  const text = String(raw ?? '')
    .trim()
    .replace(/["″]/g, '')
    .replace(/[′'’]/g, ':')
    .replace(/\s+/g, '');
  if (!text) return null;
  if (text.includes(':')) {
    const [m, s] = text.split(':');
    const mm = Number(m);
    const ss = Number(s);
    if (!Number.isFinite(mm) || !Number.isFinite(ss)) return null;
    return Math.round(mm * 60 + ss);
  }
  const n = Number(text);
  return Number.isFinite(n) ? Math.round(n) : null;
}

/** 秒 → 4′50″ / 45″ */
export function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  if (total < 60) return `${total}″`;
  return `${Math.floor(total / 60)}′${String(total % 60).padStart(2, '0')}″`;
}

export function formatMetricValue(metric: MetricDef, value: number): string {
  if (metric.isTime) return formatDuration(value);
  const isCm = metric.unit === 'cm';
  return `${isCm ? value : Math.round(value * 10) / 10} ${metric.unit}`;
}

/** 距下一档的差值文案（区分越大越好 / 越小越好） */
export function gapText(metric: MetricDef, grade: GradeResult): string | null {
  if (grade.gap == null || !grade.nextLabel) return null;
  let gap: string;
  if (metric.isTime) {
    gap = grade.gap < 60 ? `${Math.round(grade.gap * 10) / 10}″` : formatDuration(grade.gap);
  } else if (metric.unit === '次') {
    gap = `${Math.round(grade.gap)} 次`;
  } else {
    gap = `${Math.round(grade.gap * 10) / 10} ${metric.unit}`;
  }
  return metric.direction === 'lower' ? `再快 ${gap} 进入 ${grade.nextLabel}` : `再 +${gap} 进入 ${grade.nextLabel}`;
}

export function liftGapText(gapKg: number | null, nextLabel: string | null): string | null {
  if (gapKg == null || !nextLabel) return null;
  return `再 +${gapKg} kg 进入 ${nextLabel}`;
}

// ---------- 档内进度：当前档位区间内的完成度 ----------
export interface TierLevelProgress {
  pct: number;       // 0–100：在当前档区间内已完成的比例
  from: number;      // 区间下界（原始数值；力量项为体重倍数）
  to: number;        // 区间上界
  fromLabel: string; // 区间下界对应档位名
  toLabel: string;   // 目标档位名
  isTop: boolean;    // 已达最高档，无更高区间
}

/**
 * 档内进度：value 在「当前档门槛 → 下一档门槛」区间内的位置。
 * 例：卧推（男标）门槛 1.50 → 1.85 倍数，实测倍数 1.67，则该区间已完成约 49%。
 * 未达首档时区间为「起步 → 首档」（越小越好的项目按距离首档线折算）。
 * 已达最高档返回 isTop=true（pct=100）；未录入返回 null。
 */
export function tierLevelProgress(
  value: number | null | undefined,
  thresholds: number[],
  labels: string[],
  direction: MetricDirection = 'higher',
): TierLevelProgress | null {
  if (value == null || !Number.isFinite(value) || thresholds.length === 0) return null;
  const pct = (n: number) => Math.max(0, Math.min(100, Math.round(n * 100)));
  let tier = 0;
  for (const t of thresholds) {
    const pass = direction === 'higher' ? value >= t : value <= t;
    if (pass) tier += 1;
    else break;
  }
  const topIdx = thresholds.length - 1;
  if (tier > topIdx) {
    const topLabel = labels[topIdx] ?? TIER_START_LABEL;
    return { pct: 100, from: thresholds[topIdx], to: thresholds[topIdx], fromLabel: topLabel, toLabel: topLabel, isTop: true };
  }
  const to = thresholds[tier];
  const toLabel = labels[tier] ?? TIER_START_LABEL;
  if (tier === 0) {
    const from = direction === 'higher' ? 0 : to;
    return {
      pct: direction === 'higher' ? pct(value / to) : pct((to - value) / to),
      from,
      to,
      fromLabel: TIER_START_LABEL,
      toLabel,
      isTop: false,
    };
  }
  const from = thresholds[tier - 1];
  const span = Math.abs(from - to) || 1;
  return {
    pct: direction === 'higher' ? pct((value - from) / span) : pct((from - value) / span),
    from,
    to,
    fromLabel: labels[tier - 1] ?? TIER_START_LABEL,
    toLabel,
    isTop: false,
  };
}

// ---------- 档位依据（页面「档位依据」折叠区，折算项已显式标注） ----------
export interface StandardSourceNote {
  section: 'strength' | 'endurance' | 'athletic';
  title: string;
  source: string;      // 档位表出处
  levels: string;      // 档位档数说明
  derived: string[];   // 折算 / 沿用口径（凡非原始实测值均须列出）
}

export const STANDARD_SOURCES: StandardSourceNote[] = [
  {
    section: 'strength',
    title: '力量 · 深蹲 / 卧推 / 硬拉 / 站姿推举 / 杠铃弯举',
    source: 'fitnesscalcs.com《How Strong Should You Be?》Bodyweight Ratio Standards（男女各五档）；杠铃弯举参照 Strength Level 倍数表。',
    levels: `五档：${STRENGTH_LEVELS.join(' / ')}`,
    derived: [
      '折算项：1RM 由「重量 ×（1 + 次数 ÷ 30）」Epley 公式估算，不是实测极限，次数越多偏差越大（建议填 1–8 次的组）。',
      '折算项：判级用「估算 1RM ÷ 记录当时的体重快照」得到的体重倍数，由体重折算而来；历史倍数与档位不随体重变化漂移。',
      '折算项：无体重快照的旧记录按当前体重折算，卡片会标注「按当前体重」。',
      '口径统一：身体数据页「1RM 最大筋力换算」与训练记录均采用同一 Epley 公式（重量 ×（1 + 次数 ÷ 30）），经典百分比表仅用于列出各次数的建议训练重量，不再参与判级；由训练记录写入的条目会保留写入当时的 1RM 与体重倍数快照。',
    ],
  },
  {
    section: 'endurance',
    title: '耐力 · 俯卧撑 / 引体向上 / 平板支撑',
    source: 'Speediance《Strength Standards》俯卧撑、引体向上、平板支撑标准表（男女分列）。',
    levels: `五档：${ENDURANCE_LEVELS.join(' / ')}`,
    derived: [
      '折算项：用时类项目统一按秒存储，录入支持 4:50、4′50″、纯秒数（如 90）三种写法，展示时折算为「分′秒″」。',
      '折算项：平板支撑门槛为 60 / 120 / 180 / 240 / 300 秒（女性 45 / 90 / 135 / 180 / 225 秒），判级按秒折算。',
      '方向：俯卧撑、引体、平板均为「越多 / 越久越好」。',
    ],
  },
  {
    section: 'athletic',
    title: '运动能力 · 立定跳远 / 50 米跑 / 1000 米跑',
    source: '教育部《国家学生体质健康标准》公示版（立定跳远、50 米跑、1000 米跑）档位。',
    levels: `四档：${ATHLETIC_LEVELS.join(' / ')}（国标为四项档位体系，无第五档）`,
    derived: [
      '折算项：50 米与 1000 米为「用时越短越好」，判级与档内进度按「越小越好」方向折算。',
      '折算项：1000 米沿用国标男生档位（4′50″ / 4′19″ / 3′43″ / 3′27″），女生暂按同一张表参考。',
      '折算项：立定跳远以 cm 计，取三次最好成绩；用时类按秒折算展示。',
    ],
  },
];
