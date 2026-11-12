// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: getFatComposition, type FatProfile
// 脂肪构成推导：优先用食物自带的 fatComp（精确值），否则按食物类别的典型脂肪酸构成推导。
// 注意：推导值是「按类别的典型参考值」（参考 USDA / 中国食物成分表常见范围），
// 非逐条检测值；不同品种、产地、烹饪差异可达 ±10–20%，仅作营养结构参考。
import type { IFood, FoodCategory, FatComposition } from '@/data/foods/types';

/** 脂肪酸构成比例（各类脂肪占总脂肪的百分比，四项合计约 100） */
export interface FatProfile {
  sat: number; // 饱和
  mono: number; // 单不饱和
  poly: number; // 多不饱和
  trans: number; // 反式
}

// 13 大类的典型脂肪酸构成比例（百分比）。油/坚果/鱼等大宗项在 override 里再单独校准。
const CATEGORY_PROFILE: Record<FoodCategory, FatProfile> = {
  // 红肉/禽肉混合：饱和偏高，含少量天然反式
  meat: { sat: 40, mono: 45, poly: 13, trans: 2 },
  // 水产：多不饱和（ω-3）突出
  seafood: { sat: 28, mono: 25, poly: 45, trans: 0 },
  // 蛋奶：乳制品饱和高
  dairy: { sat: 55, mono: 30, poly: 12, trans: 3 },
  // 主食（谷物）：脂肪少，以多不饱和为主
  staple: { sat: 18, mono: 22, poly: 60, trans: 0 },
  // 豆类：多不饱和为主
  legume: { sat: 15, mono: 20, poly: 65, trans: 0 },
  // 蔬菜：几乎全多不饱和
  veg: { sat: 15, mono: 15, poly: 70, trans: 0 },
  // 水果：几乎全多不饱和
  fruit: { sat: 10, mono: 15, poly: 75, trans: 0 },
  // 坚果油脂：单/多不饱和为主
  nuts: { sat: 12, mono: 55, poly: 33, trans: 0 },
  // 零食加工：常含较多饱和与少量反式
  snack: { sat: 40, mono: 40, poly: 15, trans: 5 },
  // 家常菜熟食：取决于用油，折中
  cooked: { sat: 35, mono: 45, poly: 18, trans: 2 },
  // 各国菜系：橄榄油 / 黄油 / 椰浆 / 奶酪 / 油炸混合，饱和略高于家常菜
  cuisine: { sat: 38, mono: 42, poly: 17, trans: 3 },
  // 酱料调味：多为植物油基底
  condiment: { sat: 22, mono: 55, poly: 20, trans: 3 },
  // 饮料：多数几乎无脂；含脂者近似乳制品
  drink: { sat: 55, mono: 30, poly: 12, trans: 3 },
};

// 常见高特征食材的单独校准（按名称/id 关键词），优先级高于类别默认。
function profileOverride(food: IFood): FatProfile | null {
  const n = `${food.name} ${food.id}`.toLowerCase();
  if (/橄榄油|牛油果油|橄榄|avocado oil|olive/.test(n)) return { sat: 14, mono: 73, poly: 11, trans: 0 };
  if (/椰子|椰浆|椰奶|coconut/.test(n)) return { sat: 87, mono: 6, poly: 2, trans: 0 };
  if (/亚麻|胡麻|flax|奇亚|chia/.test(n)) return { sat: 9, mono: 18, poly: 73, trans: 0 };
  if (/核桃|walnut/.test(n)) return { sat: 9, mono: 23, poly: 68, trans: 0 };
  if (/三文鱼|鲑|salmon|沙丁鱼|青花鱼|鲭|秋刀鱼|鱼油|藻油|鳀|anchovy/.test(n))
    return { sat: 20, mono: 25, poly: 53, trans: 0 };
  if (/黄油|butter/.test(n)) return { sat: 63, mono: 29, poly: 3, trans: 3 };
  if (/芝麻|sesame|香油|麻油/.test(n)) return { sat: 14, mono: 48, poly: 38, trans: 0 };
  if (/花生|peanut/.test(n)) return { sat: 17, mono: 47, poly: 36, trans: 0 };
  return null;
}

/**
 * 取食物的脂肪构成（g/100g）。
 * - 若 food.fatComp 已提供则直接用（精确值）。
 * - 否则按类别/关键词推导，并将比例缩放到总脂肪 food.fat（保证合计≈总脂肪）。
 * - 总脂肪为 0 时返回全 0。
 */
export function getFatComposition(food: IFood): FatComposition {
  const total = Math.max(0, food.fat);
  if (total <= 0) return { sat: 0, mono: 0, poly: 0, trans: 0 };

  if (
    food.fatComp &&
    [food.fatComp.sat, food.fatComp.mono, food.fatComp.poly, food.fatComp.trans].some((v) => v > 0)
  ) {
    return food.fatComp;
  }

  const p = profileOverride(food) ?? CATEGORY_PROFILE[food.cat];
  const scale = total / 100;
  return {
    sat: Math.round(p.sat * scale * 10) / 10,
    mono: Math.round(p.mono * scale * 10) / 10,
    poly: Math.round(p.poly * scale * 10) / 10,
    trans: Math.round(p.trans * scale * 10) / 10,
  };
}
