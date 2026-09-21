// EXPORTS: SEAFOODS
// 水产（鱼类 / 虾蟹贝类 / 藻类），每 100g 生重/可食部参考值
import type { IFood } from './types';

export const SEAFOODS: IFood[] = [
  // ---- 鱼类 ----
  { id: 'salmon', name: '三文鱼（生）', cat: 'seafood', kcal: 208, protein: 20, fat: 13, carb: 0, fiber: 0, sodium: 59, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '钾'], note: '富含欧米伽3' },
  { id: 'tuna-canned', name: '金枪鱼（水浸罐头）', cat: 'seafood', kcal: 132, protein: 28, fat: 1, carb: 0, fiber: 0, sodium: 320, vitFat: ['D'], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒'], note: '嘌呤中等' },
  { id: 'cod', name: '鳕鱼', cat: 'seafood', kcal: 82, protein: 18, fat: 0.7, carb: 0, fiber: 0, sodium: 55, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '磷'] },
  { id: 'sea-bass', name: '鲈鱼', cat: 'seafood', kcal: 105, protein: 20, fat: 2.5, carb: 0, fiber: 0, sodium: 60, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '钾'] },
  { id: 'hairtail', name: '带鱼', cat: 'seafood', kcal: 127, protein: 18, fat: 5, carb: 0, fiber: 0, sodium: 150, vitFat: ['D'], vitWater: ['B3', 'B12'], minerals: ['硒'], note: '嘌呤中等' },
  { id: 'pomfret', name: '鲳鱼', cat: 'seafood', kcal: 140, protein: 18, fat: 7, carb: 0, fiber: 0, sodium: 70, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'yellow-croaker', name: '黄花鱼', cat: 'seafood', kcal: 97, protein: 18, fat: 2, carb: 0.8, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'crucian', name: '鲫鱼', cat: 'seafood', kcal: 108, protein: 18, fat: 3.5, carb: 0.8, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12'], minerals: ['硒'], note: '嘌呤中等' },
  { id: 'grass-carp', name: '草鱼', cat: 'seafood', kcal: 113, protein: 17, fat: 4.5, carb: 0, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'mackerel', name: '鲭鱼', cat: 'seafood', kcal: 205, protein: 19, fat: 14, carb: 0, fiber: 0, sodium: 90, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '嘌呤中等' },
  { id: 'sardine', name: '沙丁鱼（罐头）', cat: 'seafood', kcal: 208, protein: 25, fat: 11, carb: 0, fiber: 0, sodium: 305, vitFat: ['D'], vitWater: ['B12'], minerals: ['钙', '硒'], note: '嘌呤较高，高尿酸者少吃' },
  { id: 'eel', name: '鳗鱼', cat: 'seafood', kcal: 184, protein: 20, fat: 11, carb: 0, fiber: 0, sodium: 55, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['硒'], note: '嘌呤较高' },

  // ---- 虾蟹贝类 ----
  { id: 'shrimp', name: '基围虾（生）', cat: 'seafood', kcal: 99, protein: 18, fat: 0.8, carb: 2, fiber: 0, sodium: 165, vitFat: [], vitWater: ['B12'], minerals: ['硒', '碘'], note: '嘌呤中等，痛风敏感者控制频率' },
  { id: 'lobster', name: '龙虾', cat: 'seafood', kcal: 89, protein: 19, fat: 1, carb: 0.5, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B12'], minerals: ['硒', '锌'] },
  { id: 'crab', name: '螃蟹', cat: 'seafood', kcal: 87, protein: 18, fat: 1.3, carb: 1, fiber: 0, sodium: 260, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'], note: '嘌呤中等' },
  { id: 'oyster', name: '生蚝（鲜）', cat: 'seafood', kcal: 73, protein: 9, fat: 2.3, carb: 4.5, fiber: 0, sodium: 106, vitFat: ['D'], vitWater: ['B12'], minerals: ['锌', '硒'], note: '嘌呤高，痛风急性期禁食' },
  { id: 'scallop', name: '扇贝', cat: 'seafood', kcal: 88, protein: 17, fat: 1.5, carb: 2.6, fiber: 0, sodium: 180, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'], note: '嘌呤较高' },
  { id: 'clam', name: '蛤蜊', cat: 'seafood', kcal: 74, protein: 13, fat: 1, carb: 2.6, fiber: 0, sodium: 120, vitFat: [], vitWater: ['B12'], minerals: ['铁', '硒'], note: '嘌呤较高' },
  { id: 'squid', name: '鱿鱼', cat: 'seafood', kcal: 92, protein: 16, fat: 1.4, carb: 3, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B12'], minerals: ['硒', '磷'], note: '嘌呤较高，胆固醇高' },
  { id: 'octopus', name: '章鱼', cat: 'seafood', kcal: 82, protein: 15, fat: 1, carb: 2, fiber: 0, sodium: 230, vitFat: [], vitWater: ['B12'], minerals: ['铁', '硒'] },
  { id: 'sea-cucumber', name: '海参（水发）', cat: 'seafood', kcal: 78, protein: 16, fat: 0.5, carb: 2.5, fiber: 0, sodium: 500, vitFat: [], vitWater: [], minerals: ['钙'], note: '嘌呤低，低脂高蛋白' },
  { id: 'kelp', name: '海带（鲜）', cat: 'seafood', kcal: 43, protein: 1.7, fat: 0.6, carb: 9.6, fiber: 3, sodium: 107, vitFat: ['K'], vitWater: ['叶酸'], minerals: ['碘', '钙'], note: '碘含量高，甲亢者控制' },
];
