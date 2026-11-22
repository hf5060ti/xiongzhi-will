// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: FoodCategory, IFood, FOOD_CATEGORIES, FatComposition
// 食物营养库类型定义：13 大分类，营养字段统一为每 100g 生重/可食部参考值
export type FoodCategory =
  | 'meat'
  | 'seafood'
  | 'dairy'
  | 'staple'
  | 'legume'
  | 'veg'
  | 'fruit'
  | 'nuts'
  | 'snack'
  | 'cooked' // 家常菜 / 熟食
  | 'cuisine' // 各国菜系（印尼 / 西班牙 / 墨西哥 / 法国 / 意大利）
  | 'condiment' // 酱料 / 调味
  | 'drink'; // 饮料（每 100ml 参考值）

/** 脂肪构成：饱和 / 单不饱和 / 多不饱和 / 反式，单位 g/100g（与 fat 同口径） */
export interface FatComposition {
  sat: number; // 饱和脂肪
  mono: number; // 单不饱和脂肪酸
  poly: number; // 多不饱和脂肪酸
  trans: number; // 反式脂肪
}

export interface IFood {
  id: string;
  name: string;
  cat: FoodCategory;
  kcal: number; // 每 100g 千卡
  protein: number; // g
  fat: number; // g
  carb: number; // g
  fiber: number; // g
  sodium: number; // mg
  vitFat: string[]; // 脂溶性维生素 A/D/E/K
  vitWater: string[]; // 水溶性维生素 B 族/C/叶酸等
  minerals?: string[]; // 主要矿物质
  phytochem?: string[]; // 植物化学物 / 活性成分（如花青素、番茄红素、萝卜硫素）
  note?: string; // 嘌呤等特别提醒
  /** 蛋白质类型：'collagen' = 以胶原蛋白/明胶为主的不完全蛋白（脆骨、筋膜、肌腱、蹄筋）。
   *  用于吸收提示：需搭配完全蛋白与维生素 C，不能单独计入增肌蛋白目标。 */
  proteinProfile?: 'collagen';
  /** 脂肪构成（饱和/单不饱和/多不饱和/反式），单位 g/100g。
   *  缺省时由 getFatComposition() 按食物类别推导典型参考值。 */
  fatComp?: FatComposition;
}

export const FOOD_CATEGORIES: { id: FoodCategory; label: string }[] = [
  { id: 'meat', label: '肉' },
  { id: 'seafood', label: '水产' },
  { id: 'dairy', label: '蛋奶' },
  { id: 'staple', label: '主食' },
  { id: 'legume', label: '豆类' },
  { id: 'veg', label: '蔬菜' },
  { id: 'fruit', label: '水果' },
  { id: 'nuts', label: '坚果油脂' },
  { id: 'snack', label: '零食加工' },
  { id: 'cooked', label: '家常菜熟食' },
  { id: 'cuisine', label: '各国菜系' },
  { id: 'condiment', label: '酱料调味' },
  { id: 'drink', label: '饮料' },
];
