// EXPORTS: 三餐方案生成（饮食方案化）
// 输入：身体数据 + 阶段 + 饮食方案 → 每日目标 → 一日三餐 + 加餐的碳蛋脂分配 → 每餐食材搭配与克数
// 口径与 body-math / NutritionPage 完全一致：Katch-McArdle BMR × 活动系数 × (1+TEF)
// 每餐方案原则：蛋白质按目标给足（蛋白来源定量），脂肪按目标给足（油/坚果定量），
// 蔬菜固定 200g，剩余热量全部由主食吸收（热量精确对齐餐目标，碳水为弹性项）。
import type { Sex, Phase, TrainLevel } from './body-math';
import { calcBmr, calcLbm, calcProtein, tdee, tefPct, ACTIVITY_FACTORS } from './body-math';
import { DIETS } from '@/data/diets';

export interface MealPlanInput {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  bodyFatPct: number;
  level: TrainLevel;
  activity: string; // ACTIVITY_FACTORS 的 id
  phase: Phase;
  dietId: string;
}

export interface DailyTargets {
  calories: number; // 目标热量（含阶段调整）
  proteinG: number;
  carbG: number;
  fatG: number;
  tdee: number; // 基础 TDEE（含 TEF）
}

export interface MealOptionItem {
  kind: 'staple' | 'protein' | 'veg' | 'fat';
  name: string;
  grams: number;
  note?: string;
}

export interface MealOption {
  title: string;
  items: MealOptionItem[];
  kcal: number; // 该方案估算热量（≈餐目标）
}

export interface PlannedMeal {
  slot: string;
  pct: number; // 占总热量比例
  calories: number;
  proteinG: number;
  carbG: number; // 方案A/B 主食折算碳水的均值（说明用）
  fatG: number;
  options: MealOption[];
}

export interface MealPlanResult {
  daily: DailyTargets;
  meals: PlannedMeal[];
  dietName: string;
  warn?: string;
}

const MEAL_SPLIT = [
  { slot: '早餐', pct: 0.25 },
  { slot: '午餐', pct: 0.3 },
  { slot: '晚餐', pct: 0.3 },
  { slot: '加餐', pct: 0.15 },
];

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function pickDiet(id: string) {
  return DIETS.find((d) => d.id === id) ?? DIETS[0];
}

/** 每日目标：Katch BMR × 活动系数 × (1+TEF) → 阶段调整热量 → 碳蛋脂分配 */
export function buildDailyTargets(input: MealPlanInput, macroOverride?: { carb: number; protein: number; fat: number }): DailyTargets {
  const lbm = calcLbm(input.weightKg, input.bodyFatPct);
  const bmr = calcBmr({
    sex: input.sex,
    age: input.age,
    heightCm: input.heightCm,
    weightKg: input.weightKg,
    lbmKg: lbm,
  });
  const factor = ACTIVITY_FACTORS.find((a) => a.id === input.activity)?.value ?? 1.55;
  const diet = pickDiet(input.dietId);
  const macro = macroOverride ?? diet.macro;
  const baseTdee = tdee(bmr.katch, factor) * (1 + tefPct(diet.macro) / 100);

  let adjust = 0;
  if (input.phase === 'bulk') adjust = 400;
  else if (input.phase === 'cut') adjust = -400;
  const calories = Math.round(baseTdee + adjust);

  const proteinG = Math.round(calcProtein(lbm, input.phase).target);

  const restKcal = calories - proteinG * 4;
  const carbKcal = (restKcal * macro.carb) / (macro.carb + macro.fat);
  const fatKcal = restKcal - carbKcal;
  return {
    calories,
    proteinG,
    carbG: Math.round(carbKcal / 4),
    fatG: Math.round(fatKcal / 9),
    tdee: Math.round(baseTdee),
  };
}

// 每 100g 食材（与食物库 FOODS 对齐）
const ING = {
  rice: { name: '米饭（熟）', kcal: 116, carb: 25.9 },
  brownRice: { name: '糙米饭（熟）', kcal: 112, carb: 24 },
  oat: { name: '燕麦片（干）', kcal: 389, carb: 66 },
  sweetPotato: { name: '红薯（熟）', kcal: 90, carb: 21 },
  chicken: { name: '鸡胸肉（熟）', kcal: 165, protein: 31, fat: 3.6 },
  beef: { name: '牛里脊（生）', kcal: 107, protein: 21, fat: 2.5 },
  fish: { name: '清蒸鱼', kcal: 130, protein: 20, fat: 5 },
  egg: { name: '鸡蛋（水煮）', kcal: 155, protein: 12.6, fat: 10.6 },
  milk: { name: '全脂牛奶', kcal: 61, protein: 3.3, fat: 3.4 },
  yogurt: { name: '原味酸奶', kcal: 63, protein: 3.2, fat: 3.1 },
  tofu: { name: '豆腐', kcal: 82, protein: 8.1, fat: 3.7 },
  oliveOil: { name: '橄榄油', kcal: 900, fat: 100 },
  nuts: { name: '混合坚果', kcal: 580, protein: 15, fat: 49 },
  avocado: { name: '牛油果', kcal: 160, fat: 15, carb: 7.4 },
  veg: { name: '西兰花 + 菠菜', kcal: 30 }, // 每 100g
};

interface OptionBuilder {
  title: string;
  protein: { name: string; kcal: number; protein: number; fat: number; share: number }; // 主蛋白
  extra?: { name: string; kcal: number; protein: number; fat: number; share: number }; // 次级蛋白
  staple?: { name: string; kcal: number; carb: number }; // 主食（生酮时省略）
  veg: { name: string };
  fat: { name: string; kcal: number; fat: number };
}

function buildOption(meal: { calories: number; proteinG: number; fatG: number }, b: OptionBuilder): MealOption {
  const items: MealOptionItem[] = [];
  const push = (kind: MealOptionItem['kind'], name: string, grams: number, note?: string) => {
    if (!(Number.isFinite(grams) && grams > 0.4)) return;
    items.push({ kind, name, grams: round1(grams), note });
  };

  // 1) 蛋白质：主蛋白 + 次级蛋白按份额给足
  const mainG = (meal.proteinG * b.protein.share) / (b.protein.protein / 100);
  let proteinKcal = (mainG / 100) * b.protein.kcal;
  push('protein', b.protein.name, mainG, '优质蛋白');
  let extraG = 0;
  if (b.extra) {
    extraG = (meal.proteinG * b.extra.share) / (b.extra.protein / 100);
    proteinKcal += (extraG / 100) * b.extra.kcal;
    push('protein', b.extra.name, extraG);
  }

  // 2) 蔬菜固定 200g
  const vegKcal = 2 * ING.veg.kcal;
  push('veg', b.veg.name, 200, '膳食纤维 + 维生素');

  // 3) 脂肪：目标给足（生酮时脂肪 = 剩余热量，见下方）
  const fatG = meal.fatG / (b.fat.fat / 100);
  const fatKcal = (fatG / 100) * b.fat.kcal;
  push('fat', b.fat.name, fatG, '优质脂肪，烹饪/拌菜用');

  // 4) 主食 = 剩余热量（精确对齐餐目标；生酮无主食，脂肪补足剩余）
  if (b.staple) {
    const rest = meal.calories - proteinKcal - vegKcal - fatKcal;
    const stapleG = rest / (b.staple.kcal / 100);
    if (stapleG > 0.4) push('staple', b.staple.name, stapleG, '主食，餐餐打底');
  } else {
    // 生酮：无主食，剩余热量由脂肪来源补足
    const rest = meal.calories - proteinKcal - vegKcal;
    const extraFatG = rest / (b.fat.kcal / 100);
    if (extraFatG > 0.4) push('fat', b.fat.name, extraFatG, '补足剩余热量（生酮）');
  }

  return { title: b.title, items, kcal: Math.round(meal.calories) };
}

/** 加餐：固定常见组合 */
function buildSnack(items: MealOptionItem[]): MealOption {
  return { title: items.map((i) => i.name.replace(/（.*）/g, '')).join(' + '), items, kcal: 0 };
}

function snackKcal(items: MealOptionItem[]): number {
  // 每 100g kcal 近似（与食物库对齐）
  const kcalOf: Record<string, number> = {
    '混合坚果': 580, '无糖酸奶': 63, '全脂牛奶': 61, '燕麦片（干）': 389, '牛油果': 160,
    '鸡蛋（水煮）': 155, '原味酸奶': 63, '香蕉': 93,
  };
  return Math.round(items.reduce((s, i) => s + (kcalOf[i.name] ?? 100) * (i.grams / 100), 0));
}

/** 四餐分配 + 每餐 2 个可选方案；macroOverride 用于碳循环休息日（低碳口径） */
export function buildMealPlan(input: MealPlanInput, macroOverride?: { carb: number; protein: number; fat: number }): MealPlanResult {
  const daily = buildDailyTargets(input, macroOverride);
  const diet = pickDiet(input.dietId);
  const keto = diet.id === 'keto';
  const lowCarb = diet.id === 'carb-cycle' || !!macroOverride;
  const isCut = input.phase === 'cut';

  const meals: PlannedMeal[] = MEAL_SPLIT.map(({ slot, pct }) => {
    const calories = Math.round(daily.calories * pct);
    const proteinG = Math.round(daily.proteinG * pct);
    const fatG = Math.max(0, Math.round((calories - proteinG * 4 - daily.carbG * pct * 4) / 9));
    const meal = { calories, proteinG, fatG };

    // 主餐（早餐/午餐/晚餐）
    const optionA: OptionBuilder = keto
      ? {
          title: '方案A · 鸡蛋 + 牛肉（生酮）',
          protein: { ...ING.egg, share: 0.6 },
          extra: { ...ING.beef, share: 0.4 },
          veg: { name: '深绿叶菜（菠菜/羽衣甘蓝）' },
          fat: { name: ING.oliveOil.name, kcal: ING.oliveOil.kcal, fat: ING.oliveOil.fat },
        }
      : {
          title: '方案A · 鸡胸 + 米饭',
          protein: { ...ING.chicken, share: 0.85 },
          extra: { ...ING.egg, share: 0.15 },
          staple: ING.rice,
          veg: { name: ING.veg.name },
          fat: { name: ING.oliveOil.name, kcal: ING.oliveOil.kcal, fat: ING.oliveOil.fat },
        };

    const optionB: OptionBuilder = keto
      ? {
          title: '方案B · 牛油果 + 鸡蛋（生酮）',
          protein: { ...ING.egg, share: 0.7 },
          extra: { ...ING.tofu, share: 0.3 },
          veg: { name: '紫包菜 + 胡萝卜' },
          fat: { name: ING.avocado.name, kcal: ING.avocado.kcal, fat: ING.avocado.fat },
        }
      : lowCarb
        ? {
            title: '方案B · 鱼 + 红薯（训练日）',
            protein: { ...ING.fish, share: 0.8 },
            extra: { ...ING.beef, share: 0.2 },
            staple: ING.sweetPotato,
            veg: { name: '番茄 + 黄瓜' },
            fat: { name: ING.nuts.name, kcal: ING.nuts.kcal, fat: ING.nuts.fat },
          }
        : {
            title: '方案B · 牛肉 + 糙米饭',
            protein: { ...ING.beef, share: 0.7 },
            extra: { ...ING.egg, share: 0.3 },
            staple: ING.brownRice,
            veg: { name: '紫包菜 + 胡萝卜' },
            fat: { name: ING.nuts.name, kcal: ING.nuts.kcal, fat: ING.nuts.fat },
          };

    // 加餐：固定常见组合（不按目标倒推，避免牛奶过量）
    const snackA = keto ? buildSnack([
      { kind: 'fat', name: '混合坚果', grams: 30, note: '补优质脂肪' },
      { kind: 'protein', name: '无糖酸奶', grams: 200, note: '蛋白 + 益生菌' },
    ]) : buildSnack([
      { kind: 'protein', name: '全脂牛奶', grams: 250, note: '蛋白 + 钙' },
      { kind: 'staple', name: '燕麦片（干）', grams: 40, note: '慢碳 + 纤维' },
      { kind: 'fat', name: '混合坚果', grams: 15, note: '优质脂肪' },
    ]);
    const snackB = keto ? buildSnack([
      { kind: 'fat', name: '牛油果', grams: 100, note: '健康脂肪' },
      { kind: 'protein', name: '鸡蛋（水煮）', grams: 50, note: '蛋白 + 脂溶性维生素' },
    ]) : buildSnack([
      { kind: 'protein', name: '原味酸奶', grams: 200, note: '蛋白 + 益生菌' },
      { kind: 'staple', name: '香蕉', grams: 120, note: '训练前后补糖原' },
      { kind: 'fat', name: '混合坚果', grams: 15, note: '优质脂肪' },
    ]);

    const isSnack = slot === '加餐';
    const options = isSnack
      ? [{ ...snackA, kcal: snackKcal(snackA.items) }, { ...snackB, kcal: snackKcal(snackB.items) }]
      : [buildOption(meal, optionA), buildOption(meal, optionB)];

    // 碳水展示：主食折算碳水（生酮≈0）
    const carbsOf = (opt: MealOption) => {
      if (keto) return 3;
      return opt.items
        .filter((i) => i.kind === 'staple')
        .reduce((s, i) => s + Math.round((i.grams / 100) * (i.name === '燕麦片（干）' ? 66 : i.name === '香蕉' ? 23 : i.name === '红薯（熟）' ? 21 : i.name === '糙米饭（熟）' ? 24 : 25.9)), 0);
    };

    return {
      slot,
      pct: Math.round(pct * 100),
      calories,
      proteinG,
      carbG: Math.round((carbsOf(options[0]) + carbsOf(options[1])) / 2),
      fatG,
      options,
    };
  });

  const warn =
    keto
      ? '生酮首周可能有乏力、犯困的适应期：补盐补水，电解质（钠钾镁）比普通方案更重要；力量表现短期可能略降。'
      : lowCarb && input.phase === 'cut'
        ? '碳循环：训练日高碳（米饭/红薯为主），休息日低碳（蔬菜 + 蛋 + 少量粗粮）；蛋白质两日都不降，避免连续两天高碳。'
        : isCut
          ? '减脂期蛋白质已按瘦体重 2.2–2.3g/kg 算足，蔬菜尽量吃够；热量不够时优先砍主食/脂肪，别砍蛋白。'
          : undefined;

  return { daily, meals, dietName: diet.name, warn };
}

// 供 UI 引用的方案说明（吸收率提示，沿用 diets.ts absorbNote）
export function dietAbsorbNote(dietId: string): string {
  return pickDiet(dietId).absorbNote;
}

// ---- 一周菜单 ----
// 按分化推演 7 天训练日 / 休息日（周一~周日，true = 训练日）
export const ROUTINE_PATTERNS: Record<string, boolean[]> = {
  'full-body': [true, true, false, true, true, false, false], // 二分化：练2休1
  'push-pull-legs': [true, true, true, false, true, true, false], // 三分化：练3休1
  'ppl-upper-lower': [true, true, false, true, true, false, true], // 四分化
  'upper-lower': [true, true, false, true, true, false, true], // 四分化
  'bro-split': [true, true, true, true, true, false, false], // 五分化：练5休2
};

export interface WeekDayPlan {
  label: string; // 周一
  isTrainDay: boolean;
  dietName: string; // 该日实际饮食方案名
  plan: MealPlanResult;
}

export const WEEK_DAY_LABELS = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

/** 碳循环休息日：碳水压到 25% 左右（用户口径），蛋白质克数恒定不降 */
export const REST_DAY_MACRO = { carb: 25, protein: 35, fat: 40 };

/** 一周菜单：每天复用 buildMealPlan；碳循环的休息日自动切「低碳日」口径 */
export function buildWeekPlan(input: MealPlanInput, splitId?: string): WeekDayPlan[] {
  const pattern = ROUTINE_PATTERNS[splitId ?? 'push-pull-legs'] ?? ROUTINE_PATTERNS['push-pull-legs'];
  return WEEK_DAY_LABELS.map((label, i) => {
    const isTrainDay = pattern[i] ?? true;
    let dietId = input.dietId;
    let dietName = pickDiet(dietId).name;
    let macro: typeof REST_DAY_MACRO | undefined;
    if (input.dietId === 'carb-cycle' && !isTrainDay) {
      dietId = 'moderate';
      dietName = '低碳日（碳水≈25%，蛋白不降）';
      macro = REST_DAY_MACRO;
    }
    const plan = buildMealPlan({ ...input, dietId }, macro);
    return { label, isTrainDay, dietName, plan };
  });
}
