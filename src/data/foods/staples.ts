// EXPORTS: STAPLES
// 主食（米面 / 薯类 / 杂粮），每 100g 参考值（标注干湿）
import type { IFood } from './types';

export const STAPLES: IFood[] = [
  { id: 'rice-cooked', name: '米饭（熟）', cat: 'staple', kcal: 116, protein: 2.6, fat: 0.3, carb: 25.9, fiber: 0.3, sodium: 2, vitFat: [], vitWater: ['B1'], minerals: [] },
  { id: 'brown-rice-cooked', name: '糙米饭（熟）', cat: 'staple', kcal: 112, protein: 2.6, fat: 0.9, carb: 24, fiber: 1.8, sodium: 5, vitFat: ['E'], vitWater: ['B1', 'B3'], minerals: ['镁'] },
  { id: 'congee', name: '白粥', cat: 'staple', kcal: 46, protein: 1.1, fat: 0.2, carb: 9.9, fiber: 0.1, sodium: 2, vitFat: [], vitWater: ['B1'], minerals: [] },
  { id: 'steamed-bun', name: '馒头', cat: 'staple', kcal: 223, protein: 7, fat: 1, carb: 47, fiber: 1.3, sodium: 150, vitFat: [], vitWater: ['B1'], minerals: [] },
  { id: 'whole-wheat-bread', name: '全麦面包', cat: 'staple', kcal: 247, protein: 13, fat: 4, carb: 41, fiber: 7, sodium: 380, vitFat: ['E'], vitWater: ['B1', 'B3'], minerals: ['镁'] },
  { id: 'white-bread', name: '白面包', cat: 'staple', kcal: 265, protein: 9, fat: 3.2, carb: 49, fiber: 2.7, sodium: 490, vitFat: [], vitWater: ['B1'], minerals: [] },
  { id: 'oatmeal-dry', name: '燕麦片（干）', cat: 'staple', kcal: 389, protein: 13, fat: 7, carb: 66, fiber: 10, sodium: 6, vitFat: ['E'], vitWater: ['B1'], minerals: ['镁', '锌'] },
  { id: 'buckwheat-dry', name: '荞麦面（干）', cat: 'staple', kcal: 340, protein: 13, fat: 3, carb: 71, fiber: 6, sodium: 8, vitFat: [], vitWater: ['B1', 'B2'], minerals: ['镁', '钾'] },
  { id: 'pasta-dry', name: '意面（干）', cat: 'staple', kcal: 350, protein: 12, fat: 1.5, carb: 71, fiber: 3, sodium: 6, vitFat: [], vitWater: ['B1'], minerals: [] },
  { id: 'rice-noodle-dry', name: '米粉（干）', cat: 'staple', kcal: 346, protein: 1.5, fat: 0.4, carb: 85, fiber: 0.5, sodium: 20, vitFat: [], vitWater: [], minerals: [] },
  { id: 'sweet-potato', name: '红薯（生）', cat: 'staple', kcal: 86, protein: 1.6, fat: 0.1, carb: 20, fiber: 3, sodium: 55, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'purple-potato', name: '紫薯（生）', cat: 'staple', kcal: 106, protein: 1.8, fat: 0.2, carb: 25, fiber: 3.3, sodium: 48, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '富含花青素' },
  { id: 'potato', name: '土豆（生）', cat: 'staple', kcal: 77, protein: 2, fat: 0.1, carb: 17, fiber: 2, sodium: 6, vitFat: [], vitWater: ['B6', 'C'], minerals: ['钾'] },
  { id: 'yam', name: '山药', cat: 'staple', kcal: 57, protein: 1.9, fat: 0.2, carb: 12.4, fiber: 1.6, sodium: 18, vitFat: [], vitWater: ['B6', 'C'], minerals: ['钾'] },
  { id: 'corn-fresh', name: '玉米（鲜）', cat: 'staple', kcal: 112, protein: 4, fat: 1.2, carb: 22, fiber: 2.9, sodium: 15, vitFat: ['A'], vitWater: ['B1', 'B3'], minerals: ['镁'] },
  { id: 'pumpkin', name: '南瓜', cat: 'staple', kcal: 26, protein: 1, fat: 0.1, carb: 6.5, fiber: 0.5, sodium: 1, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
];
