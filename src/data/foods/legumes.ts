// EXPORTS: LEGUMES
// 豆类与豆制品，每 100g 参考值（标注干/鲜/熟）
import type { IFood } from './types';

export const LEGUMES: IFood[] = [
  { id: 'soybean-dry', name: '黄豆（干）', cat: 'legume', kcal: 390, protein: 35, fat: 16, carb: 34, fiber: 15, sodium: 2, vitFat: ['E', 'K'], vitWater: ['B1', '叶酸'], minerals: ['钙', '镁', '铁'], note: '干豆，泡发后热量减半' },
  { id: 'black-bean-dry', name: '黑豆（干）', cat: 'legume', kcal: 341, protein: 21.6, fat: 1.4, carb: 62, fiber: 15, sodium: 5, vitFat: ['E'], vitWater: ['叶酸'], minerals: ['铁', '镁'] },
  { id: 'red-bean-dry', name: '红豆（干）', cat: 'legume', kcal: 324, protein: 20, fat: 0.6, carb: 63, fiber: 13, sodium: 4, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['钾'] },
  { id: 'mung-bean-dry', name: '绿豆（干）', cat: 'legume', kcal: 329, protein: 22, fat: 0.8, carb: 62, fiber: 16, sodium: 3, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['镁', '钾'] },
  { id: 'chickpea-dry', name: '鹰嘴豆（干）', cat: 'legume', kcal: 364, protein: 19, fat: 6, carb: 61, fiber: 17, sodium: 24, vitFat: ['E'], vitWater: ['B6', '叶酸'], minerals: ['铁', '镁'] },
  { id: 'lentil-dry', name: '扁豆（干）', cat: 'legume', kcal: 352, protein: 25, fat: 1.1, carb: 63, fiber: 11, sodium: 6, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁'] },
  { id: 'pea-dry', name: '豌豆（干）', cat: 'legume', kcal: 334, protein: 21, fat: 1.2, carb: 60, fiber: 14, sodium: 5, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁'] },
  { id: 'edamame', name: '毛豆（鲜）', cat: 'legume', kcal: 131, protein: 13, fat: 5.3, carb: 11, fiber: 5.2, sodium: 6, vitFat: ['K', 'E'], vitWater: ['叶酸', 'C'], minerals: ['镁', '钾'] },
  { id: 'tofu', name: '豆腐（普通）', cat: 'legume', kcal: 81, protein: 8, fat: 4.8, carb: 1.9, fiber: 0.4, sodium: 7, vitFat: ['E', 'K'], vitWater: ['叶酸'], minerals: ['钙'] },
  { id: 'tofu-firm', name: '老豆腐', cat: 'legume', kcal: 118, protein: 11, fat: 7, carb: 2.5, fiber: 0.5, sodium: 15, vitFat: ['E', 'K'], vitWater: ['叶酸'], minerals: ['钙'] },
  { id: 'tofu-silken', name: '内酯豆腐', cat: 'legume', kcal: 55, protein: 5, fat: 2.5, carb: 2, fiber: 0.2, sodium: 20, vitFat: ['E'], vitWater: [], minerals: ['钙'] },
  { id: 'tofu-dried', name: '豆腐干', cat: 'legume', kcal: 140, protein: 16, fat: 7, carb: 4, fiber: 0.8, sodium: 300, vitFat: ['E'], vitWater: ['叶酸'], minerals: ['钙'], note: '卤制豆干注意钠' },
  { id: 'soy-milk', name: '豆浆（无糖）', cat: 'legume', kcal: 31, protein: 3, fat: 1.6, carb: 1.5, fiber: 0.3, sodium: 3, vitFat: [], vitWater: ['叶酸'], minerals: ['钙'] },
  { id: 'yuba-dry', name: '腐竹（干）', cat: 'legume', kcal: 461, protein: 45, fat: 22, carb: 22, fiber: 1, sodium: 30, vitFat: ['E', 'K'], vitWater: ['叶酸'], minerals: ['钙', '镁'], note: '干品，泡发后热量约为1/3' },
  { id: 'natto', name: '纳豆', cat: 'legume', kcal: 212, protein: 18, fat: 11, carb: 14, fiber: 5, sodium: 7, vitFat: ['K'], vitWater: ['B2', '叶酸'], minerals: ['钙', '铁'], note: '维生素K2含量高' },
  { id: 'hummus', name: '鹰嘴豆泥', cat: 'legume', kcal: 166, protein: 7.9, fat: 9.6, carb: 14.3, fiber: 6, sodium: 380, vitFat: ['E'], vitWater: ['叶酸'], minerals: ['铁'] },

  // ---- 公开食物成分数据扩充（18 条）：每 100g 参考值 ----
  { id: 'soybean-cooked', name: '黄豆（熟）', cat: 'legume', kcal: 173, protein: 16.6, fat: 9, carb: 9.9, fiber: 6, sodium: 1, vitFat: ['K'], vitWater: ['B1', '叶酸'], minerals: ['铁', '镁'] },
  { id: 'black-bean-cooked', name: '黑豆（熟）', cat: 'legume', kcal: 132, protein: 8.9, fat: 0.5, carb: 23.7, fiber: 8.7, sodium: 2, vitFat: ['K'], vitWater: ['B1', '叶酸'], minerals: ['铁', '镁'] },
  { id: 'red-bean-cooked', name: '红豆（熟）', cat: 'legume', kcal: 128, protein: 7.5, fat: 0.5, carb: 24.7, fiber: 7.1, sodium: 3, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁', '钾'] },
  { id: 'kidney-bean-dry', name: '芸豆（干）', cat: 'legume', kcal: 315, protein: 23.4, fat: 1.4, carb: 57.2, fiber: 15.2, sodium: 5, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁', '钾'] },
  { id: 'white-bean-dry', name: '白芸豆（干）', cat: 'legume', kcal: 296, protein: 21, fat: 1.2, carb: 55, fiber: 13, sodium: 5, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁', '镁'] },
  { id: 'mung-bean-cooked', name: '绿豆（熟）', cat: 'legume', kcal: 105, protein: 7, fat: 0.4, carb: 19, fiber: 7.6, sodium: 2, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['钾', '镁'] },
  { id: 'green-pea-cooked', name: '青豌豆（熟）', cat: 'legume', kcal: 81, protein: 5.4, fat: 0.2, carb: 14.5, fiber: 5.1, sodium: 2, vitFat: ['A', 'K'], vitWater: ['C', '叶酸', 'B1'], minerals: ['铁', '钾'] },
  { id: 'fava-bean-fresh', name: '蚕豆（鲜）', cat: 'legume', kcal: 104, protein: 8.8, fat: 0.8, carb: 19.5, fiber: 3.1, sodium: 3, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['钾', '镁'] },
  { id: 'broad-bean-dry', name: '蚕豆（干）', cat: 'legume', kcal: 335, protein: 21.6, fat: 1, carb: 61.5, fiber: 10, sodium: 4, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁', '钾'] },
  { id: 'black-eyed-pea', name: '黑眼豆（干）', cat: 'legume', kcal: 336, protein: 23.5, fat: 1.6, carb: 60, fiber: 10.6, sodium: 6, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁', '钾'] },
  { id: 'soy-flour', name: '大豆粉（脱脂）', cat: 'legume', kcal: 350, protein: 50, fat: 3, carb: 35, fiber: 17, sodium: 20, vitFat: ['K'], vitWater: ['B1', '叶酸'], minerals: ['铁', '钙'] },
  { id: 'soymilk-dry', name: '豆浆粉', cat: 'legume', kcal: 420, protein: 20, fat: 15, carb: 55, fiber: 3, sodium: 50, vitFat: ['K'], vitWater: ['B1'], minerals: ['钙', '铁'] },
  { id: 'tempeh', name: '天贝', cat: 'legume', kcal: 193, protein: 19, fat: 11, carb: 9, fiber: 6, sodium: 9, vitFat: ['K'], vitWater: ['B2', 'B12'], minerals: ['铁', '镁', '钙'], note: '发酵豆制品，含维生素 B12' },
  { id: 'miso', name: '味噌', cat: 'legume', kcal: 198, protein: 12.8, fat: 6, carb: 25, fiber: 5.4, sodium: 3600, vitFat: ['K'], vitWater: ['B1', 'B2'], minerals: ['铁', '锌'], note: '高钠，控盐人群慎用' },
  { id: 'chickpea-cooked', name: '鹰嘴豆（熟）', cat: 'legume', kcal: 164, protein: 8.9, fat: 2.6, carb: 27.4, fiber: 7.6, sodium: 7, vitFat: ['K'], vitWater: ['B1', '叶酸'], minerals: ['铁', '镁'] },
  { id: 'lentil-cooked', name: '扁豆（熟）', cat: 'legume', kcal: 116, protein: 9, fat: 0.4, carb: 20.1, fiber: 7.9, sodium: 2, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁', '钾'] },
  { id: 'falafel', name: '炸鹰嘴豆丸', cat: 'legume', kcal: 333, protein: 13.3, fat: 17.8, carb: 31.8, fiber: 4.9, sodium: 294, vitFat: ['K'], vitWater: ['B1', '叶酸'], minerals: ['铁', '镁'], note: '油炸制品' },
  { id: 'bean-curd-frozen', name: '冻豆腐', cat: 'legume', kcal: 68, protein: 8.6, fat: 3.4, carb: 2, fiber: 1, sodium: 7, vitFat: [], vitWater: [], minerals: ['钙', '镁'] },
];
