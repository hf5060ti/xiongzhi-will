// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
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
  { id: 'beef-liver', name: '牛肝（熟）', cat: 'meat', kcal: 135, protein: 20, fat: 3.5, carb: 4, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '超级食物：维生素A/B族/铁/铜/锌含量极高；但维生素A易超标，长期大量摄入有维生素A中毒风险。建议每周1~2次，单次不超过40g（熟重），个体差异大，孕妇尤其需遵医嘱；嘌呤偏高' },

  // ---- 猪肉 ----
  { id: 'pork-tenderloin', name: '猪里脊（生）', cat: 'meat', kcal: 143, protein: 20, fat: 6.5, carb: 0, fiber: 0, sodium: 57, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'] },
  { id: 'pork-collar', name: '猪梅花肉', cat: 'meat', kcal: 273, protein: 17, fat: 22, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'] },
  { id: 'pork-belly', name: '猪五花', cat: 'meat', kcal: 508, protein: 9, fat: 54, carb: 0, fiber: 0, sodium: 40, vitFat: [], vitWater: ['B1'], minerals: ['锌'], note: '高脂，控制份量' },
  { id: 'pork-ribs', name: '猪排骨', cat: 'meat', kcal: 278, protein: 16, fat: 23, carb: 0, fiber: 0, sodium: 75, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'] },
  { id: 'pork-leg', name: '猪后腿', cat: 'meat', kcal: 148, protein: 20, fat: 7, carb: 0, fiber: 0, sodium: 58, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'] },
  { id: 'pork-liver', name: '猪肝（熟）', cat: 'meat', kcal: 143, protein: 20, fat: 4.5, carb: 3, fiber: 0, sodium: 70, vitFat: ['A'], vitWater: ['B1', 'B2', 'B12', '叶酸'], minerals: ['铁', '锌'], note: '超级食物：维生素A/B族/铁/铜/锌含量极高；但维生素A易超标，长期大量摄入有维生素A中毒风险。建议每周1~2次，单次不超过40g（熟重），个体差异大，孕妇尤其需遵医嘱；嘌呤偏高' },
  { id: 'pork-kidney', name: '猪腰（生）', cat: 'meat', kcal: 110, protein: 16, fat: 5, carb: 0.8, fiber: 0, sodium: 138, vitFat: [], vitWater: ['B12'], minerals: ['铁', '硒'], note: '嘌呤较高' },

  // ---- 羊肉 ----
  { id: 'lamb-tenderloin', name: '羊里脊（生）', cat: 'meat', kcal: 123, protein: 20, fat: 4.5, carb: 0, fiber: 0, sodium: 65, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '嘌呤中等' },
  { id: 'lamb-leg', name: '羊腿肉', cat: 'meat', kcal: 135, protein: 19, fat: 6, carb: 0, fiber: 0, sodium: 72, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'lamb-chops', name: '羊排', cat: 'meat', kcal: 299, protein: 17, fat: 25, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['锌'], note: '脂肪较高' },
  { id: 'lamb-shoulder', name: '羊肩肉', cat: 'meat', kcal: 270, protein: 17, fat: 22, carb: 0, fiber: 0, sodium: 66, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'lamb-liver', name: '羊肝（熟）', cat: 'meat', kcal: 139, protein: 20, fat: 5, carb: 2, fiber: 0, sodium: 90, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '超级食物：维生素A/B族/铁/铜/锌含量极高；但维生素A易超标，长期大量摄入有维生素A中毒风险。建议每周1~2次，单次不超过40g（熟重），个体差异大，孕妇尤其需遵医嘱；嘌呤偏高' },

  // ---- 禽肉 ----
  { id: 'chicken-breast', name: '鸡胸肉（生）', cat: 'meat', kcal: 118, protein: 24, fat: 1.9, carb: 0, fiber: 0, sodium: 44, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒', '磷'] },
  { id: 'chicken-thigh', name: '鸡腿肉（去皮，生）', cat: 'meat', kcal: 121, protein: 19, fat: 4.5, carb: 0, fiber: 0, sodium: 73, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['硒'] },
  { id: 'chicken-wing', name: '鸡翅', cat: 'meat', kcal: 194, protein: 18, fat: 13, carb: 0, fiber: 0, sodium: 75, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['硒'] },
  { id: 'chicken-whole', name: '整鸡（带皮）', cat: 'meat', kcal: 215, protein: 18, fat: 15, carb: 0, fiber: 0, sodium: 65, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['硒'] },
  { id: 'chicken-liver', name: '鸡肝（熟）', cat: 'meat', kcal: 167, protein: 24, fat: 4.5, carb: 2, fiber: 0, sodium: 70, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '硒'], note: '超级食物：维生素A/B族/铁/铜/锌含量极高；但维生素A易超标，长期大量摄入有维生素A中毒风险。建议每周1~2次，单次不超过40g（熟重），个体差异大，孕妇尤其需遵医嘱；嘌呤偏高；胆固醇偏高' },
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
  { id: 'duck-liver', name: '鸭肝', cat: 'meat', kcal: 128, protein: 17.1, fat: 4.8, carb: 6.2, fiber: 0, sodium: 98, vitFat: ['A'], vitWater: ['B12', 'B2'], minerals: ['铁', '锌'], note: '超级食物：维生素A/B族/铁/铜/锌含量极高；但维生素A易超标，长期大量摄入有维生素A中毒风险。建议每周1~2次，单次不超过40g（熟重），个体差异大，孕妇尤其需遵医嘱；嘌呤偏高' },
  { id: 'turkey-leg', name: '火鸡腿', cat: 'meat', kcal: 145, protein: 20, fat: 6.5, carb: 0, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['锌', '硒'] },
  { id: 'chicken-breast-smoked', name: '烟熏鸡胸', cat: 'meat', kcal: 110, protein: 20, fat: 3, carb: 1, fiber: 0, sodium: 800, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['硒'], note: '加工肉制品，高钠' },
  { id: 'oxtail', name: '牛尾', cat: 'meat', kcal: 250, protein: 19, fat: 19, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'rabbit', name: '兔肉', cat: 'meat', kcal: 102, protein: 19.7, fat: 2.2, carb: 0.9, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '高蛋白低脂' },
  { id: 'venison', name: '鹿肉', cat: 'meat', kcal: 120, protein: 22, fat: 3, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },
  // ---- 细分牛肉（草饲 / 谷饲 / 和牛）与少数民族特色 ----
  { id: 'beef-grass-fed', name: '草饲牛肉（生）', cat: 'meat', kcal: 130, protein: 22, fat: 4, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'], note: '草饲脂肪更低，Omega-3 略高，肉质更紧' },
  { id: 'beef-grain-fed', name: '谷饲牛肉（生）', cat: 'meat', kcal: 198, protein: 19, fat: 13, carb: 0, fiber: 0, sodium: 58, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'], note: '谷饲大理石花纹多，脂肪更高更嫩' },
  { id: 'beef-wagyu', name: '和牛（生）', cat: 'meat', kcal: 480, protein: 12, fat: 48, carb: 0, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '高脂肪雪花肉，偶尔吃，份量控制' },
  { id: 'yak-beef', name: '牦牛肉（生）', cat: 'meat', kcal: 121, protein: 21, fat: 3.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'], note: '高海拔放养，高蛋白低脂，肉质偏紧实' },
  { id: 'yak-jerky', name: '牦牛肉干', cat: 'meat', kcal: 420, protein: 48, fat: 18, carb: 8, fiber: 0, sodium: 1500, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '风干制品，高钠，注意控盐' },

  // ---- 肉类扩充（特殊/民族肉） ----
  { id: 'horse-meat', name: '马肉', cat: 'meat', kcal: 133, protein: 21, fat: 4.6, carb: 0.5, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '高蛋白低脂，草原/中亚特色' },
  { id: 'donkey-meat', name: '驴肉', cat: 'meat', kcal: 113, protein: 21, fat: 3, carb: 0.4, fiber: 0, sodium: 46, vitFat: [], vitWater: ['B12'], minerals: ['铁'], note: '高蛋白低脂低胆固醇，驴肉火烧经典' },
  { id: 'camel-meat', name: '骆驼肉', cat: 'meat', kcal: 128, protein: 21, fat: 4.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '沙漠地区高蛋白肉，肉质类似牛肉' },
  { id: 'ostrich-meat', name: '鸵鸟肉', cat: 'meat', kcal: 110, protein: 22, fat: 1.8, carb: 0, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '极低脂高蛋白，红肉外观白肉性质' },
  { id: 'wild-boar', name: '野猪肉', cat: 'meat', kcal: 143, protein: 20, fat: 6, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌'], note: '瘦肉比例高，肉质紧实' },
  { id: 'frog-meat', name: '牛蛙', cat: 'meat', kcal: 78, protein: 18, fat: 0.9, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12'], minerals: ['锌', '钾'], note: '高蛋白低脂，蛙腿肉细嫩，嘌呤中等' },
  { id: 'silk-worm', name: '蚕蛹', cat: 'meat', kcal: 230, protein: 18, fat: 15, carb: 6, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'], note: '昆虫蛋白，蛋白质量高，嘌呤高，过敏者慎食' },
  { id: 'duck-blood', name: '鸭血', cat: 'meat', kcal: 55, protein: 13, fat: 0.4, carb: 0.2, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁'], note: '补铁冠军，铁含量高且易吸收' },

  // ---- 胶质蛋白类（健身人群高频） ----
  { id: 'pork-skin', name: '猪皮', cat: 'meat', kcal: 340, protein: 27, fat: 24, carb: 0.5, fiber: 0, sodium: 80, vitFat: [], vitWater: [], minerals: ['锌'], note: '胶原蛋白为主，脂肪不低；煮皮冻可去脂' },
  { id: 'fish-maw', name: '花胶（鱼肚/鱼鳔）', cat: 'meat', kcal: 339, protein: 84, fat: 0.2, carb: 2, fiber: 0, sodium: 55, vitFat: [], vitWater: [], minerals: ['钙', '磷', '铁'], note: '干品蛋白质极高但以胶原蛋白为主；泡发炖汤，痛风者注意嘌呤' },

  // ---- 牛部位细分（内脏/骨髓） ----
  { id: 'beef-lung', name: '牛肺（熟）', cat: 'meat', kcal: 95, protein: 16, fat: 3, carb: 1, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['铁', '锌'], note: '口感绵软，焯水去腥；嘌呤中高，清洗须充分' },
  { id: 'beef-kidney', name: '牛肾（牛腰，熟）', cat: 'meat', kcal: 99, protein: 15.5, fat: 3, carb: 1.2, fiber: 0, sodium: 130, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['铁', '锌', '硒'], note: '臊味重需反复浸泡去味；嘌呤高，痛风者少食' },
  { id: 'beef-brain', name: '牛脑', cat: 'meat', kcal: 147, protein: 10.5, fat: 11, carb: 1, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B12'], minerals: ['锌', '磷'], note: '胆固醇极高，高血脂/心脑血管问题者不宜；嘌呤极高，偶尔尝鲜' },
  { id: 'beef-bone-marrow', name: '牛骨髓', cat: 'meat', kcal: 400, protein: 7, fat: 41, carb: 0, fiber: 0, sodium: 90, vitFat: [], vitWater: [], minerals: ['钙', '磷'], note: '几乎全为脂肪，烤骨髓/炖汤增香可以，热量高别当蛋白质来源' },

  // ---- 牦牛部位 ----
  { id: 'yak-liver', name: '牦牛肝（熟）', cat: 'meat', kcal: 132, protein: 20, fat: 4, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '高原特色超级食物：维生素A/B族/铁含量极高；但维生素A易超标，建议每周1~2次，单次不超过40g（熟重），孕妇遵医嘱；嘌呤偏高' },

  // ---- 马部位细分 ----
  { id: 'horse-liver', name: '马肝（熟）', cat: 'meat', kcal: 125, protein: 19, fat: 4, carb: 4, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '超级食物：维生素A/B族/铁含量极高；但维生素A易超标，建议每周1~2次，单次不超过40g（熟重），孕妇遵医嘱；嘌呤偏高' },
  { id: 'horse-heart', name: '马心（熟）', cat: 'meat', kcal: 110, protein: 17, fat: 3.8, carb: 1, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12', 'B2'], minerals: ['铁', '锌'], note: '高蛋白低脂内脏，口感紧实；充分烹熟' },
  { id: 'horse-lung', name: '马肺（熟）', cat: 'meat', kcal: 92, protein: 16, fat: 2.8, carb: 1, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['铁'], note: '类似牛肺口感；嘌呤中高，清洗须充分' },
  { id: 'horse-kidney', name: '马肾（熟）', cat: 'meat', kcal: 97, protein: 15, fat: 3.2, carb: 1, fiber: 0, sodium: 120, vitFat: ['A'], vitWater: ['B12'], minerals: ['铁', '锌', '硒'], note: '臊味重需反复浸泡去味；嘌呤高，痛风者少食' },

  // ---- 鹿部位 ----
  { id: 'venison-liver', name: '鹿肝（熟）', cat: 'meat', kcal: 130, protein: 19, fat: 4, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '超级食物：维生素A/B族/铁含量极高；但维生素A易超标，建议每周1~2次，单次不超过40g（熟重），孕妇遵医嘱；嘌呤偏高' },
  { id: 'venison-heart', name: '鹿心（熟）', cat: 'meat', kcal: 108, protein: 17, fat: 3.5, carb: 1, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '高蛋白低脂，肉质细嫩；充分烹熟' },

  // ---- 驴部位细分（含驴皮/阿胶原料） ----
  { id: 'donkey-hide', name: '驴皮（干品/阿胶原料）', cat: 'meat', kcal: 360, protein: 85, fat: 0.5, carb: 2, fiber: 0, sodium: 90, vitFat: [], vitWater: [], minerals: ['钙', '磷'], note: '胶原蛋白为主（非优质必需氨基酸蛋白），是传统阿胶的原料；打成胶质后蛋白利用率一般，别当高蛋白食物' },
  { id: 'donkey-liver', name: '驴肝（熟）', cat: 'meat', kcal: 128, protein: 19, fat: 4, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '超级食物：维生素A/B族/铁含量极高；但维生素A易超标，建议每周1~2次，单次不超过40g（熟重），孕妇遵医嘱；嘌呤偏高' },
  { id: 'donkey-heart', name: '驴心（熟）', cat: 'meat', kcal: 105, protein: 16.5, fat: 3.6, carb: 1, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '高蛋白低脂，口感紧实有嚼劲；充分烹熟' },

  // ---- 猪部位细分（补全内脏/杂碎） ----
  { id: 'pork-stomach', name: '猪肚（熟）', cat: 'meat', kcal: 110, protein: 17, fat: 4.2, carb: 1, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌', '硒'], note: '高蛋白低脂内脏，白切/爆炒经典；胆固醇中等，清洗须充分' },
  { id: 'pork-intestine', name: '猪大肠（肥肠，熟）', cat: 'meat', kcal: 196, protein: 10, fat: 16, carb: 1, fiber: 0, sodium: 110, vitFat: [], vitWater: ['B12'], minerals: ['锌'], note: '高脂高胆固醇，卤煮/干煸肥肠香但热量高，减脂期少食' },
  { id: 'pork-brain', name: '猪脑', cat: 'meat', kcal: 131, protein: 10.5, fat: 9.3, carb: 1, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B12'], minerals: ['磷', '锌'], note: '胆固醇极高，高血脂/心脑血管问题者不宜；嘌呤极高，偶尔尝鲜' },
  { id: 'pork-lung', name: '猪肺（熟）', cat: 'meat', kcal: 85, protein: 12, fat: 3.5, carb: 1, fiber: 0, sodium: 75, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['铁'], note: '口感绵软，需彻底清洗烹透；嘌呤中高' },

  // ---- 野猪部位（仅合法养殖渠道） ----
  { id: 'wild-boar-leg', name: '野猪后腿/里脊（养殖，生）', cat: 'meat', kcal: 120, protein: 21, fat: 3.5, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌', '铁'], note: '⚠ 仅采用合法养殖渠道；比家猪更瘦、肉味更重，炖煮或腌制后更嫩' },
  { id: 'wild-boar-liver', name: '野猪肝（养殖，熟）', cat: 'meat', kcal: 130, protein: 19, fat: 4.5, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '⚠ 仅采用合法养殖渠道；超级食物：维生素A/B族/铁含量极高，但维生素A易超标，建议每周1~2次、单次≤40g（熟重），孕妇遵医嘱；嘌呤偏高' },

  // ---- 鹅部位细分 ----
  { id: 'goose-breast', name: '鹅胸肉（去皮）', cat: 'meat', kcal: 118, protein: 23, fat: 2.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '高蛋白低脂，肉质紧实，低温慢煮更嫩' },
  { id: 'goose-leg', name: '鹅腿（带皮）', cat: 'meat', kcal: 210, protein: 20, fat: 14, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '带皮脂肪高，烤鹅腿经典；去皮食用热量大减' },
  { id: 'goose-liver', name: '鹅肝（普通，熟）', cat: 'meat', kcal: 133, protein: 16, fat: 5, carb: 3, fiber: 0, sodium: 90, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜', '硒'], note: '普通鹅肝非填饲肥肝（肥肝 foie gras 脂肪超 40% 另计）；维A/铁极高，建议每周1~2次、单次≤40g（熟重），孕妇遵医嘱；嘌呤偏高' },
  { id: 'goose-wing', name: '鹅翅', cat: 'meat', kcal: 230, protein: 18, fat: 17, carb: 0.5, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['锌'], note: '皮多脂肪高，卤鹅翅佐餐佳；热量不低' },

  // ---- 鸽子部位 ----
  { id: 'pigeon-breast', name: '鸽胸肉（去皮）', cat: 'meat', kcal: 115, protein: 24, fat: 2, carb: 0, fiber: 0, sodium: 65, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '高蛋白低脂，鸽肉纤维细嫩易消化，炖汤/清蒸' },
  { id: 'pigeon-liver', name: '鸽肝（熟）', cat: 'meat', kcal: 130, protein: 17, fat: 4.5, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '超级食物：维生素A/B族/铁含量极高；但维生素A易超标，建议每周1~2次、单次≤40g（熟重），孕妇遵医嘱；嘌呤偏高' },

  // ---- 火鸡部位 ----
  { id: 'turkey-wing', name: '火鸡翅', cat: 'meat', kcal: 180, protein: 20, fat: 10, carb: 0, fiber: 0, sodium: 75, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['锌', '硒'], note: '感恩节烤火鸡翅经典，带皮脂肪偏高' },
  { id: 'turkey-liver', name: '火鸡肝（熟）', cat: 'meat', kcal: 130, protein: 18, fat: 4.5, carb: 3, fiber: 0, sodium: 85, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜', '硒'], note: '超级食物：维生素A/B族/铁含量极高；但维生素A易超标，建议每周1~2次、单次≤40g（熟重），孕妇遵医嘱；嘌呤偏高' },

  // ---- 袋鼠部位（合法性声明） ----
  { id: 'kangaroo-meat', name: '袋鼠肉（瘦肉，生）', cat: 'meat', kcal: 100, protein: 22, fat: 2, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌', '硒'], note: '⚠ 食用合法性因国家/地区而异，进口/出口各国有不同规定，务必遵守当地法律法规；本站仅标注营养含量，不代表任何立场。极低脂高蛋白，肉质偏瘦，久煮易柴，适合快煎' },
  { id: 'kangaroo-tenderloin', name: '袋鼠里脊/菲力（生）', cat: 'meat', kcal: 105, protein: 23, fat: 1.8, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '⚠ 合法性因国家/地区而异，遵守当地法律法规；本站仅标注营养含量。最嫩部位，低温慢煎或火锅片' },
  { id: 'kangaroo-tail', name: '袋鼠尾（带骨）', cat: 'meat', kcal: 140, protein: 20, fat: 6, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '⚠ 合法性因国家/地区而异，遵守当地法律法规；本站仅标注营养含量。炖汤/慢煮出胶质，骨肉同食' },
  { id: 'kangaroo-liver', name: '袋鼠肝（熟）', cat: 'meat', kcal: 128, protein: 19, fat: 4, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '⚠ 合法性因国家/地区而异，遵守当地法律法规；本站仅标注营养含量。超级食物：维生素A/B族/铁含量极高，但维生素A易超标，建议每周1~2次、单次≤40g（熟重），孕妇遵医嘱；嘌呤偏高' },

  // ---- 鳄鱼部位（仅人工养殖） ----
  { id: 'crocodile-meat', name: '鳄鱼肉（人工养殖，生）', cat: 'meat', kcal: 105, protein: 22, fat: 2.5, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌', '硒'], note: '⚠ 必须为人工养殖；野生鳄鱼属保护动物，严禁捕杀食用；请遵守当地法律法规，本站不支持偷抓偷猎等任何违法活动。高蛋白低脂、低饱和脂肪，肉质偏瘦，久煮易柴' },
  { id: 'crocodile-tenderloin', name: '鳄鱼里脊/菲力（养殖，生）', cat: 'meat', kcal: 110, protein: 24, fat: 1.8, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '⚠ 必须为人工养殖；野生鳄鱼严禁捕杀食用；遵守当地法律法规，本站不支持偷抓偷猎等违法活动。最嫩部位，快煎/涮片' },
  { id: 'crocodile-tail', name: '鳄鱼尾（养殖，生）', cat: 'meat', kcal: 120, protein: 20, fat: 4.5, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '⚠ 必须为人工养殖；野生鳄鱼严禁捕杀食用；遵守当地法律法规，本站不支持偷抓偷猎等违法活动。尾部胶质与瘦肉兼具，炖汤/焖烧' },
  { id: 'crocodile-paw', name: '鳄鱼掌（养殖，熟）', cat: 'meat', kcal: 180, protein: 22, fat: 8, carb: 1, fiber: 0, sodium: 90, vitFat: [], vitWater: ['B12'], minerals: ['锌', '钙'], note: '⚠ 必须为人工养殖；野生鳄鱼严禁捕杀食用；遵守当地法律法规，本站不支持偷抓偷猎等违法活动。胶质丰富类似禽掌，炖汤滋补口感' },
  { id: 'crocodile-liver', name: '鳄鱼肝（养殖，熟）', cat: 'meat', kcal: 130, protein: 19, fat: 4.5, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '⚠ 必须为人工养殖；野生鳄鱼严禁捕杀食用；遵守当地法律法规，本站不支持偷抓偷猎等违法活动。超级食物：维生素A/B族/铁含量极高，但维生素A易超标，建议每周1~2次、单次≤40g（熟重），孕妇遵医嘱；嘌呤偏高' },

  // ---- 牛排部位（健身人常吃，脂肪差异大） ----
  { id: 'beef-sirloin', name: '西冷牛排（生）', cat: 'meat', kcal: 206, protein: 23, fat: 12, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌', '硒'], note: '牛外脊带边脂肪，性价比高；煎烤配西兰花/芦笋经典，边油可剪掉降脂' },
  { id: 'beef-filet', name: '菲力牛排（生）', cat: 'meat', kcal: 155, protein: 24, fat: 6, carb: 0, fiber: 0, sodium: 52, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌', '硒'], note: '牛里脊最嫩部位、脂肪最低，减脂期牛排首选；价格最高，口感软嫩' },
  { id: 'beef-ribeye', name: '眼肉牛排（生）', cat: 'meat', kcal: 270, protein: 22, fat: 20, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'], note: '肋眼雪花脂肪最高、风味最足，热量炸弹级别；增肌期可吃，减脂期少选' },
];