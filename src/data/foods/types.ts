// EXPORTS: FoodCategory, IFood, FOOD_CATEGORIES
// 食物营养库类型定义：9 大分类，营养字段统一为每 100g 生重/可食部参考值
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
  | 'condiment'; // 酱料 / 调味

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
  { id: 'condiment', label: '酱料调味' },
];
