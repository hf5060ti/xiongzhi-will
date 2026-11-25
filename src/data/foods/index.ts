// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: FOODS
// 食物营养库汇总：13 大分类合并为单一 FOODS 数组
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
import { WORLD_CUISINES } from './world-cuisines';
import { CONDIMENTS } from './condiments';
import { DRINKS } from './drinks';
import { CONNECTIVE_TISSUE_FOODS } from './connective-tissue';
import { CHAIN_STORE_FOODS } from './chain-stores';

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
  ...WORLD_CUISINES,
  ...CONDIMENTS,
  ...DRINKS,
  ...CONNECTIVE_TISSUE_FOODS,
  ...CHAIN_STORE_FOODS,
];

export type { FoodCategory, IFood } from './types';
export { FOOD_CATEGORIES } from './types';
// 常见份量锚点（1 个鸡蛋≈50g、1 碗米饭≈150g 等），用于按生活化份量折算克数
export type { FoodServing } from './servings';
export { SERVING_ANCHORS, getServings, fmtServing } from './servings';
