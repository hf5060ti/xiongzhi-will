// EXPORTS: DailyTargets, getDailyTargets
// 全站唯一饮食目标计算入口：按身体数据实时算出每日热量与三大营养素目标。
// 复用 body-math.ts 的既有纯函数（LBM / Katch BMR / TDEE / TEF / 蛋白质），
// 与「身体数据页」同一批公式、同一份 BodyProfile、同一阶段策略，口径天然一致。
// 说明：仅读取 localStorage（loadBodyProfile / loadDietId / loadWeightKg），不写盘、无副作用。

import {
  ACTIVITY_FACTORS,
  calcBmr,
  calcLbm,
  calcProtein,
  round1,
  tdee,
  tefPct,
  PHASE_LABEL,
  type Phase,
} from '@/lib/body-math';
import { DIETS } from '@/data/diets';
import { loadBodyProfile, loadDietId, loadWeightKg } from '@/lib/store';

export interface DailyTargets {
  /** 进度条与三大宏量计算所用热量 = 目标区间下限 */
  kcal: number;
  /** 热量目标区间下限（kcal/天） */
  kcalMin: number;
  /** 热量目标区间上限（kcal/天） */
  kcalMax: number;
  /** 区间文案，如 `3288–3488`（维持期即单一数值） */
  kcalRangeText: string;
  protein: number;
  fat: number;
  carb: number;
  /** 区间所围绕的锚点：含 TEF 的 TDEE（兜底链路为 0） */
  tdeeWithTef: number;
  source: 'profile' | 'fallback';
  /** 供 UI 展示的目标来源说明文案 */
  basis: string;
}

/**
 * 阶段热量调整区间（kcal/天），锚点统一为「含 TEF 的 TDEE」：
 * 增肌 +300~500 / 减脂 −500~−300 / 维持 不做调整。
 */
const PHASE_RANGE: Record<Phase, [number, number]> = {
  bulk: [300, 500],
  cut: [-500, -300],
  maintain: [0, 0],
};

/** 兜底链路的体重系数：增肌 35 / 维持 30 / 减脂 25 kcal per kg */
const FALLBACK_RATIO: Record<Phase, number> = { bulk: 35, maintain: 30, cut: 25 };

/** 无饮食方案时的兜底宏量比例（均衡方案） */
const FALLBACK_MACRO = { carb: 40, protein: 30, fat: 30 };

const PHASES: Phase[] = ['bulk', 'cut', 'maintain'];

function toPhase(v: string): Phase {
  return PHASES.includes(v as Phase) ? (v as Phase) : 'bulk';
}

function roundTo(n: number, step: number): number {
  return Math.round(n / step) * step;
}

/** 解析当前饮食方案的宏量比例（查不到方案时回退均衡比例 + TEF 10%） */
function resolveDiet() {
  const diet = DIETS.find((d) => d.id === loadDietId());
  if (diet) return { macro: diet.macro, name: diet.name, tef: tefPct(diet.macro) };
  return { macro: FALLBACK_MACRO, name: '均衡（默认）', tef: 10 };
}

/** 由总热量 + 蛋白质克数反推脂肪 / 碳水克数（macro 为供能百分比） */
function splitMacro(
  kcal: number,
  proteinG: number,
  macro: { carb: number; protein: number; fat: number },
) {
  const fat = (kcal * macro.fat) / 100 / 9;
  const carb = Math.max(0, (kcal - proteinG * 4 - fat * 9) / 4);
  return {
    kcal: roundTo(kcal, 10),
    protein: Math.round(proteinG),
    fat: Math.round(fat),
    carb: Math.round(carb),
  };
}

const NO_WEIGHT_BASIS =
  '还没填身体数据：先填写体重与体脂率，这里会自动算出你的每日热量与三大营养素目标。';

export function getDailyTargets(): DailyTargets {
  const profile = loadBodyProfile();
  const phase = toPhase(profile.phase);
  const { macro, name, tef } = resolveDiet();

  // 体重：身体数据页档案优先，为空时回退全站快捷体重（轻盈计划会同步过来）
  const profileWeight = parseFloat(profile.weightKg);
  const weight = Number.isFinite(profileWeight) && profileWeight > 0 ? profileWeight : loadWeightKg();
  const bodyFat = parseFloat(profile.bodyFatPct);
  const hasLbm = weight > 0 && Number.isFinite(bodyFat) && bodyFat > 0 && bodyFat < 100;

  // ---------- 兜底链路：LBM 不可算 ----------
  if (!hasLbm) {
    if (!(weight > 0)) {
      return {
        kcal: 0,
        kcalMin: 0,
        kcalMax: 0,
        kcalRangeText: '0',
        protein: 0,
        fat: 0,
        carb: 0,
        tdeeWithTef: 0,
        source: 'fallback',
        basis: NO_WEIGHT_BASIS,
      };
    }
    const ratio = FALLBACK_RATIO[phase];
    const t = splitMacro(weight * ratio, weight * 2.0, macro);
    return {
      ...t,
      kcalMin: t.kcal,
      kcalMax: t.kcal,
      kcalRangeText: `${t.kcal}`,
      tdeeWithTef: 0,
      source: 'fallback',
      basis: `当前为体重粗估（${weight}kg × ${ratio}，${PHASE_LABEL[phase]}）：补全体脂率即可切换为 Katch TDEE 精确口径，并按 ${PHASE_LABEL[phase]} ±300~500 kcal 区间给出目标。`,
    };
  }

  // ---------- 主链路：与身体数据页同公式 ----------
  const lbm = calcLbm(weight, bodyFat);
  const age = parseFloat(profile.age);
  const heightCm = parseFloat(profile.heightCm);
  const bmr = calcBmr({
    sex: profile.sex === 'female' ? 'female' : 'male',
    age: Number.isFinite(age) && age > 0 ? age : 0,
    heightCm: Number.isFinite(heightCm) && heightCm > 0 ? heightCm : 0,
    weightKg: weight,
    lbmKg: lbm,
  });
  const activity = ACTIVITY_FACTORS.find((a) => a.id === profile.activity) ?? ACTIVITY_FACTORS[2];
  // 统一锚点：含 TEF 的 TDEE（身体数据页与营养页共用这一基数）
  const tdeeWithTef = tdee(bmr.katch, activity.value) * (1 + tef / 100);
  const [lo, hi] = PHASE_RANGE[phase];
  const kcalMinRaw = tdeeWithTef + lo;
  const kcalMaxRaw = tdeeWithTef + hi;
  const proteinRes = calcProtein(lbm, phase);
  // 进度条与三大宏量一律按目标区间下限计算
  const t = splitMacro(kcalMinRaw, proteinRes.target, macro);
  const anchorRounded = Math.round(tdeeWithTef);
  // 维持期不做调整：区间上下限即含 TEF 的 TDEE 本身
  const kcalMin = phase === 'maintain' ? anchorRounded : roundTo(kcalMinRaw, 10);
  const kcalMax = phase === 'maintain' ? anchorRounded : roundTo(kcalMaxRaw, 10);
  const rangeText = phase === 'maintain' ? `${kcalMin}` : `${kcalMin}–${kcalMax}`;

  const adjText =
    phase === 'maintain'
      ? `${PHASE_LABEL[phase]}不额外调整`
      : `${PHASE_LABEL[phase]} ${lo > 0 ? '+' : '−'}${Math.abs(lo)}~${Math.abs(hi)} kcal`;

  return {
    ...t,
    kcal: kcalMin,
    kcalMin,
    kcalMax,
    kcalRangeText: rangeText,
    tdeeWithTef: anchorRounded,
    source: 'profile',
    basis:
      `已按身体数据实时计算：瘦体重 ${round1(lbm)}kg → Katch BMR ${Math.round(bmr.katch)} kcal` +
      ` × 活动系数 ${activity.value}（${activity.label}）× 食物热效应 +${round1(tef)}% = TDEE ${Math.round(tdeeWithTef)} kcal，${adjText}；` +
      `目标区间 ${rangeText} kcal（进度条与三大宏量按下限 ${kcalMin} kcal 计）；` +
      `蛋白质按瘦体重 ${round1(lbm)}kg × ${proteinRes.perKgLbm}，碳水/脂肪按「${name}」宏量比例拆分。`,
  };
}
