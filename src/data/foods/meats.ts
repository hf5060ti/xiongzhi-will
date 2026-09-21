// EXPORTS: MEATS
// 肉类（牛肉 / 猪肉 / 羊肉 / 禽肉），每 100g 生重参考值
import type { IFood } from './types';

export const MEATS: IFood[] = [
  // ---- 牛肉 ----
  { id: 'beef-tenderloin', name: '牛里脊（生）', cat: 'meat', kcal: 107, protein: 21, fat: 2.5, carb: 0, fiber: 0, sodium: 48, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'], note: '瘦牛肉嘌呤中等' },
  { id: 'beef-shank', name: '牛腱（生）', cat: 'meat', kcal: 106, protein: 20, fat: 2, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'] },
  { id: 'beef-brisket', name: '牛腩（生）', cat: 'meat', kcal: 332, protein: 20, fat: 28, carb: 0, fiber: 0, sodium: 62, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '脂肪较高，控制份量' },
  { id: 'beef-chuck', name: '牛肩肉（生）', cat: 'meat', kcal: 291, protein: 19, fat: 23, carb: 0, fiber: 0, sodium: 68, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'] },
  { id: 'beef-rump', name: '牛霖 / 臀肉（生）', cat: 'meat', kcal: 152, protein: 21, fat: 7, carb: 0, fiber: 0, sodium: 56, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'] },
  { id: 'beef-tongue', name: '牛舌（生）', cat: 'meat', kcal: 224, protein: 16, fat: 16, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['锌'], note: '胆固醇较高，适量' },
  { id: 'beef-roll', name: '肥牛卷', cat: 'meat', kcal: 295, protein: 15, fat: 25, carb: 1, fiber: 0, sodium: 380, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '加工切片，注意钠' },
  { id: 'beef-liver', name: '牛肝（熟）', cat: 'meat', kcal: 135, protein: 20, fat: 3.5, carb: 4, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '嘌呤高、维生素A极高，每周一次即可' },

  // ---- 猪肉 ----
  { id: 'pork-tenderloin', name: '猪里脊（生）', cat: 'meat', kcal: 143, protein: 20, fat: 6.5, carb: 0, fiber: 0, sodium: 57, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'] },
  { id: 'pork-collar', name: '猪梅花肉', cat: 'meat', kcal: 273, protein: 17, fat: 22, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'] },
  { id: 'pork-belly', name: '猪五花', cat: 'meat', kcal: 508, protein: 9, fat: 54, carb: 0, fiber: 0, sodium: 40, vitFat: [], vitWater: ['B1'], minerals: ['锌'], note: '高脂，控制份量' },
  { id: 'pork-ribs', name: '猪排骨', cat: 'meat', kcal: 278, protein: 16, fat: 23, carb: 0, fiber: 0, sodium: 75, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'] },
  { id: 'pork-leg', name: '猪后腿', cat: 'meat', kcal: 148, protein: 20, fat: 7, carb: 0, fiber: 0, sodium: 58, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'] },
  { id: 'pork-liver', name: '猪肝（熟）', cat: 'meat', kcal: 143, protein: 20, fat: 4.5, carb: 3, fiber: 0, sodium: 70, vitFat: ['A'], vitWater: ['B1', 'B2', 'B12', '叶酸'], minerals: ['铁', '锌'], note: '嘌呤高、维生素A极高，适量' },
  { id: 'pork-kidney', name: '猪腰（生）', cat: 'meat', kcal: 110, protein: 16, fat: 5, carb: 0.8, fiber: 0, sodium: 138, vitFat: [], vitWater: ['B12'], minerals: ['铁', '硒'], note: '嘌呤较高' },

  // ---- 羊肉 ----
  { id: 'lamb-tenderloin', name: '羊里脊（生）', cat: 'meat', kcal: 123, protein: 20, fat: 4.5, carb: 0, fiber: 0, sodium: 65, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '嘌呤中等' },
  { id: 'lamb-leg', name: '羊腿肉', cat: 'meat', kcal: 135, protein: 19, fat: 6, carb: 0, fiber: 0, sodium: 72, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'lamb-chops', name: '羊排', cat: 'meat', kcal: 299, protein: 17, fat: 25, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['锌'], note: '脂肪较高' },
  { id: 'lamb-shoulder', name: '羊肩肉', cat: 'meat', kcal: 270, protein: 17, fat: 22, carb: 0, fiber: 0, sodium: 66, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'lamb-liver', name: '羊肝（熟）', cat: 'meat', kcal: 139, protein: 20, fat: 5, carb: 2, fiber: 0, sodium: 90, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '嘌呤高，适量' },

  // ---- 禽肉 ----
  { id: 'chicken-breast', name: '鸡胸肉（生）', cat: 'meat', kcal: 118, protein: 24, fat: 1.9, carb: 0, fiber: 0, sodium: 44, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒', '磷'] },
  { id: 'chicken-thigh', name: '鸡腿肉（去皮，生）', cat: 'meat', kcal: 121, protein: 19, fat: 4.5, carb: 0, fiber: 0, sodium: 73, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['硒'] },
  { id: 'chicken-wing', name: '鸡翅', cat: 'meat', kcal: 194, protein: 18, fat: 13, carb: 0, fiber: 0, sodium: 75, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['硒'] },
  { id: 'chicken-whole', name: '整鸡（带皮）', cat: 'meat', kcal: 215, protein: 18, fat: 15, carb: 0, fiber: 0, sodium: 65, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['硒'] },
  { id: 'chicken-liver', name: '鸡肝（熟）', cat: 'meat', kcal: 167, protein: 24, fat: 4.5, carb: 2, fiber: 0, sodium: 70, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '硒'], note: '嘌呤高、胆固醇高，适量' },
  { id: 'duck-breast', name: '鸭胸肉（去皮）', cat: 'meat', kcal: 118, protein: 21, fat: 3, carb: 0, fiber: 0, sodium: 65, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁'] },
  { id: 'duck-leg', name: '鸭腿', cat: 'meat', kcal: 200, protein: 20, fat: 13, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁'] },
  { id: 'turkey-breast', name: '火鸡胸', cat: 'meat', kcal: 111, protein: 24, fat: 1.5, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒', '磷'] },
  { id: 'goose', name: '鹅肉', cat: 'meat', kcal: 371, protein: 16, fat: 34, carb: 0, fiber: 0, sodium: 75, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁'], note: '高脂，适量' },
  { id: 'pigeon', name: '鸽子肉', cat: 'meat', kcal: 211, protein: 23, fat: 13, carb: 0, fiber: 0, sodium: 90, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'] },
];
