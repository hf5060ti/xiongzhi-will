// EXPORTS: NUTS
// 坚果 / 种子 / 油脂，每 100g 参考值
import type { IFood } from './types';

export const NUTS: IFood[] = [
  // ---- 坚果 ----
  { id: 'walnut', name: '核桃', cat: 'nuts', kcal: 654, protein: 15, fat: 65, carb: 14, fiber: 7, sodium: 2, vitFat: ['E'], vitWater: ['B1', 'B6'], minerals: ['镁'], note: '欧米伽3丰富，每日一小把' },
  { id: 'almond', name: '巴旦木（杏仁）', cat: 'nuts', kcal: 579, protein: 21, fat: 50, carb: 22, fiber: 12.5, sodium: 1, vitFat: ['E'], vitWater: ['B2'], minerals: ['镁', '钙'] },
  { id: 'cashew', name: '腰果', cat: 'nuts', kcal: 553, protein: 18, fat: 44, carb: 30, fiber: 3.3, sodium: 12, vitFat: ['E', 'K'], vitWater: ['B6', '叶酸'], minerals: ['镁', '锌'] },
  { id: 'hazelnut', name: '榛子', cat: 'nuts', kcal: 628, protein: 15, fat: 61, carb: 17, fiber: 9.7, sodium: 0, vitFat: ['E'], vitWater: ['B1', 'B6'], minerals: ['镁'] },
  { id: 'pistachio', name: '开心果', cat: 'nuts', kcal: 562, protein: 20, fat: 45, carb: 28, fiber: 10, sodium: 1, vitFat: ['E', 'K'], vitWater: ['B6'], minerals: ['钾', '镁'] },
  { id: 'macadamia', name: '夏威夷果', cat: 'nuts', kcal: 718, protein: 8, fat: 76, carb: 14, fiber: 8.6, sodium: 5, vitFat: ['E'], vitWater: ['B1'], minerals: ['锰'], note: '高脂高热量，少量' },
  { id: 'brazil-nut', name: '巴西坚果', cat: 'nuts', kcal: 659, protein: 14, fat: 66, carb: 12, fiber: 7.5, sodium: 3, vitFat: ['E'], vitWater: ['B1'], minerals: ['硒'], note: '硒含量极高，每天1-2颗即可' },
  { id: 'peanut', name: '花生', cat: 'nuts', kcal: 567, protein: 26, fat: 49, carb: 16, fiber: 8.5, sodium: 18, vitFat: ['E'], vitWater: ['B3', '叶酸'], minerals: ['镁'], note: '蛋白质在坚果中较高' },
  { id: 'pecan', name: '碧根果', cat: 'nuts', kcal: 691, protein: 9, fat: 72, carb: 14, fiber: 9.6, sodium: 0, vitFat: ['E', 'K'], vitWater: ['B1'], minerals: ['锰'] },
  { id: 'pine-nut', name: '松子', cat: 'nuts', kcal: 673, protein: 14, fat: 68, carb: 13, fiber: 3.7, sodium: 3, vitFat: ['E', 'K'], vitWater: ['B1'], minerals: ['镁'] },
  { id: 'chestnut', name: '栗子', cat: 'nuts', kcal: 213, protein: 2.4, fat: 1.3, carb: 45.5, fiber: 8.1, sodium: 3, vitFat: [], vitWater: ['B1', 'C'], minerals: ['钾'], note: '淀粉类坚果，接近主食' },

  // ---- 种子 ----
  { id: 'pumpkin-seed', name: '南瓜籽', cat: 'nuts', kcal: 559, protein: 30, fat: 49, carb: 11, fiber: 6, sodium: 7, vitFat: ['E', 'K'], vitWater: ['B3', '叶酸'], minerals: ['锌', '镁'] },
  { id: 'sunflower-seed', name: '葵花籽', cat: 'nuts', kcal: 584, protein: 21, fat: 51, carb: 20, fiber: 8.6, sodium: 9, vitFat: ['E'], vitWater: ['B1', 'B6', '叶酸'], minerals: ['镁', '硒'] },
  { id: 'chia-seed', name: '奇亚籽', cat: 'nuts', kcal: 486, protein: 17, fat: 31, carb: 42, fiber: 34, sodium: 16, vitFat: ['E', 'K'], vitWater: ['B1', 'B3'], minerals: ['钙', '镁', '磷'], note: '膳食纤维极高，泡水膨胀' },
  { id: 'flaxseed', name: '亚麻籽', cat: 'nuts', kcal: 534, protein: 18, fat: 42, carb: 29, fiber: 27, sodium: 30, vitFat: ['E', 'K'], vitWater: ['B1'], minerals: ['镁'], note: '富含欧米伽3，需研磨吸收' },
  { id: 'sesame', name: '白芝麻', cat: 'nuts', kcal: 573, protein: 18, fat: 50, carb: 23, fiber: 12, sodium: 11, vitFat: ['E', 'K'], vitWater: ['B1', '叶酸'], minerals: ['钙', '镁'] },
  { id: 'hemp-seed', name: '火麻仁', cat: 'nuts', kcal: 553, protein: 32, fat: 49, carb: 9, fiber: 4, sodium: 5, vitFat: ['E'], vitWater: ['B1', 'B3'], minerals: ['镁'], note: '植物蛋白含量高' },

  // ---- 油脂 ----
  { id: 'olive-oil', name: '橄榄油', cat: 'nuts', kcal: 884, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 2, vitFat: ['E', 'K'], vitWater: [], minerals: [], note: '1 汤匙约 10g，120kcal' },
  { id: 'flaxseed-oil', name: '亚麻籽油', cat: 'nuts', kcal: 884, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 0, vitFat: ['E', 'K'], vitWater: [], minerals: [], note: '欧米伽3丰富，不宜高温' },
  { id: 'coconut-oil', name: '椰子油', cat: 'nuts', kcal: 862, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 0, vitFat: ['K'], vitWater: [], minerals: [], note: '饱和脂肪为主，适量' },
  { id: 'peanut-oil', name: '花生油', cat: 'nuts', kcal: 884, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 0, vitFat: ['E', 'K'], vitWater: [], minerals: [] },
  { id: 'grape-seed-oil', name: '葡萄籽油', cat: 'nuts', kcal: 884, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 0, vitFat: ['E', 'K'], vitWater: [], minerals: [], note: '烟点高，适合高温烹饪' },
];
