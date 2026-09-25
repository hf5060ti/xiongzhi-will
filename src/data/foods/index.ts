// EXPORTS: FOODS
// 食物营养库汇总：9 大分类合并为单一 FOODS 数组
import type { IFood } from './types';
import { MEATS } from './meats';
import { SEAFOODS } from './seafood';
import { DAIRY } from './dairy';
import { STAPLES } from './staples';
import { LEGUMES } from './legumes';
import { VEGETABLES } from './vegetables';
import { FRUITS } from './fruits';
import { NUTS } from './nuts';
import { SNACKS } from './snacks';
import { COOKED } from './cooked';

export const FOODS: IFood[] = [
  ...MEATS,
  ...SEAFOODS,
  ...DAIRY,
  ...STAPLES,
  ...LEGUMES,
  ...VEGETABLES,
  ...FRUITS,
  ...NUTS,
  ...SNACKS,
  ...COOKED,
];

export type { FoodCategory, IFood } from './types';
export { FOOD_CATEGORIES } from './types';
// 常见份量锚点（1 个鸡蛋≈50g、1 碗米饭≈150g 等），用于按生活化份量折算克数
export type { FoodServing } from './servings';
export { SERVING_ANCHORS, getServings, fmtServing } from './servings';
