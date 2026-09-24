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

  // ---- 公开食物成分数据扩充（30 条）：每 100g 参考值 ----
  { id: 'beef-shank-braised', name: '酱牛肉', cat: 'meat', kcal: 246, protein: 31.4, fat: 11.9, carb: 3.2, fiber: 0, sodium: 869, vitFat: ['A'], vitWater: ['B12', 'B2'], minerals: ['铁', '锌', '硒'], note: '卤制含盐较高' },
  { id: 'beef-mince', name: '牛肉馅（瘦，生）', cat: 'meat', kcal: 143, protein: 20, fat: 6.5, carb: 0.5, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'beef-heart', name: '牛心（熟）', cat: 'meat', kcal: 165, protein: 26, fat: 5, carb: 0, fiber: 0, sodium: 60, vitFat: ['A'], vitWater: ['B12', 'B2'], minerals: ['铁', '锌', '硒'] },
  { id: 'beef-tripe', name: '牛肚', cat: 'meat', kcal: 72, protein: 14.5, fat: 1.6, carb: 1.6, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'] },
  { id: 'beef-tendon', name: '牛蹄筋（熟）', cat: 'meat', kcal: 151, protein: 34.1, fat: 0.5, carb: 2.6, fiber: 0, sodium: 60, vitFat: [], vitWater: [], minerals: ['锌'], note: '胶原蛋白为主' },
  { id: 'beef-jerky', name: '牛肉干', cat: 'meat', kcal: 550, protein: 45.6, fat: 40, carb: 1.9, fiber: 0, sodium: 2000, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '加工肉制品，高钠高脂' },
  { id: 'pork-mince', name: '猪肉馅（三肥七瘦，生）', cat: 'meat', kcal: 260, protein: 16, fat: 20, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌', '铁'] },
  { id: 'pork-tenderloin-cooked', name: '猪里脊（熟）', cat: 'meat', kcal: 190, protein: 29, fat: 7, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌', '硒'] },
  { id: 'pork-loin-chop', name: '猪大排', cat: 'meat', kcal: 264, protein: 18.3, fat: 20.4, carb: 1.5, fiber: 0, sodium: 62, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌', '铁'] },
  { id: 'pork-hock', name: '猪蹄', cat: 'meat', kcal: 260, protein: 22.6, fat: 18.8, carb: 0, fiber: 0, sodium: 101, vitFat: [], vitWater: [], minerals: ['锌'], note: '胶原蛋白为主，非优质蛋白' },
  { id: 'pork-ear', name: '猪耳', cat: 'meat', kcal: 190, protein: 22.5, fat: 12.5, carb: 0, fiber: 0, sodium: 58, vitFat: [], vitWater: [], minerals: ['锌'] },
  { id: 'pork-blood', name: '猪血', cat: 'meat', kcal: 55, protein: 12.2, fat: 0.3, carb: 0.9, fiber: 0, sodium: 56, vitFat: [], vitWater: ['B12'], minerals: ['铁'], note: '血红素铁含量高' },
  { id: 'pork-heart', name: '猪心', cat: 'meat', kcal: 119, protein: 16.6, fat: 5.3, carb: 1.1, fiber: 0, sodium: 71, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['锌', '硒'] },
  { id: 'pork-tongue', name: '猪舌', cat: 'meat', kcal: 225, protein: 15.7, fat: 18.1, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['锌', '铁'] },
  { id: 'bacon', name: '培根', cat: 'meat', kcal: 460, protein: 20, fat: 42, carb: 1.5, fiber: 0, sodium: 1500, vitFat: ['D'], vitWater: ['B1', 'B12'], minerals: ['锌', '硒'], note: '加工肉制品，高钠' },
  { id: 'ham', name: '火腿（熟）', cat: 'meat', kcal: 330, protein: 16, fat: 28, carb: 2, fiber: 0, sodium: 900, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌'], note: '加工肉制品，高钠' },
  { id: 'sausage', name: '香肠', cat: 'meat', kcal: 508, protein: 24.1, fat: 40.7, carb: 11.2, fiber: 0, sodium: 2309, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌'], note: '加工肉制品，高钠' },
  { id: 'chicken-tender', name: '鸡里脊（生）', cat: 'meat', kcal: 110, protein: 23, fat: 1.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['硒', '锌'] },
  { id: 'chicken-drumstick', name: '鸡小腿（去皮，生）', cat: 'meat', kcal: 145, protein: 19, fat: 7, carb: 0, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['锌', '硒'] },
  { id: 'chicken-breast-cooked', name: '鸡胸肉（熟）', cat: 'meat', kcal: 165, protein: 31, fat: 3.6, carb: 0, fiber: 0, sodium: 74, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['硒', '锌'] },
  { id: 'chicken-feet', name: '鸡爪', cat: 'meat', kcal: 254, protein: 23.9, fat: 16.4, carb: 2.7, fiber: 0, sodium: 170, vitFat: [], vitWater: [], minerals: ['锌'], note: '胶原蛋白为主' },
  { id: 'chicken-heart', name: '鸡心', cat: 'meat', kcal: 172, protein: 15.9, fat: 11.8, carb: 0.6, fiber: 0, sodium: 125, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['锌', '铁'] },
  { id: 'chicken-gizzard', name: '鸡胗', cat: 'meat', kcal: 118, protein: 19.2, fat: 2.8, carb: 4, fiber: 0, sodium: 75, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'duck-whole', name: '鸭肉（带皮）', cat: 'meat', kcal: 240, protein: 15.5, fat: 19.7, carb: 0.2, fiber: 0, sodium: 69, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['铁', '锌'] },
  { id: 'duck-liver', name: '鸭肝', cat: 'meat', kcal: 128, protein: 17.1, fat: 4.8, carb: 6.2, fiber: 0, sodium: 98, vitFat: ['A'], vitWater: ['B12', 'B2'], minerals: ['铁', '锌'] },
  { id: 'turkey-leg', name: '火鸡腿', cat: 'meat', kcal: 145, protein: 20, fat: 6.5, carb: 0, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['锌', '硒'] },
  { id: 'chicken-breast-smoked', name: '烟熏鸡胸', cat: 'meat', kcal: 110, protein: 20, fat: 3, carb: 1, fiber: 0, sodium: 800, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['硒'], note: '加工肉制品，高钠' },
  { id: 'oxtail', name: '牛尾', cat: 'meat', kcal: 250, protein: 19, fat: 19, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'rabbit', name: '兔肉', cat: 'meat', kcal: 102, protein: 19.7, fat: 2.2, carb: 0.9, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '高蛋白低脂' },
  { id: 'venison', name: '鹿肉', cat: 'meat', kcal: 120, protein: 22, fat: 3, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
];
