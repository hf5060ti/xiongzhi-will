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
];

export type { FoodCategory, IFood } from './types';
export { FOOD_CATEGORIES } from './types';
