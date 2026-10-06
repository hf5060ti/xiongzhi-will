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
  { id: 'lamb-chops', name: '羊排', cat: 'meat', kcal: 299, protein: 17, fat: 25, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['锌'], note: '脂肪较高' },
  { id: 'lamb-shoulder', name: '羊肩肉', cat: 'meat', kcal: 270, protein: 17, fat: 22, carb: 0, fiber: 0, sodium: 66, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'] },

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
  { id: 'pork-blood', name: '猪血', cat: 'meat', kcal: 55, protein: 12.2, fat: 0.3, carb: 0.9, fiber: 0, sodium: 56, vitFat: [], vitWater: ['B12'], minerals: ['铁', '硒'], note: '优点：蛋白质约12.2g/100g与鸡蛋相当，低脂低热量，血红素铁含量高（约8.7mg/100g）且吸收率远超植物铁；缺点：铁含量低于鸭血（30.5mg），动物血整体嘌呤中高，痛风/高尿酸者适量；凉拌/韭菜炒/毛血旺，必须彻底煮熟防寄生虫' },
  { id: 'pork-heart', name: '猪心', cat: 'meat', kcal: 119, protein: 16.6, fat: 5.3, carb: 1.1, fiber: 0, sodium: 71, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['锌', '硒'] },
  { id: 'pork-tongue', name: '猪舌', cat: 'meat', kcal: 225, protein: 15.7, fat: 18.1, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['锌', '铁'] },
  { id: 'bacon', name: '培根', cat: 'meat', kcal: 460, protein: 20, fat: 42, carb: 1.5, fiber: 0, sodium: 1500, vitFat: ['D'], vitWater: ['B1', 'B12'], minerals: ['锌', '硒'], note: '加工肉制品，高钠' },
  { id: 'ham', name: '火腿（熟）', cat: 'meat', kcal: 330, protein: 16, fat: 28, carb: 2, fiber: 0, sodium: 900, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌'], note: '加工肉制品，高钠' },
  { id: 'sausage', name: '香肠', cat: 'meat', kcal: 508, protein: 24.1, fat: 40.7, carb: 11.2, fiber: 0, sodium: 2309, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌'], note: '加工肉制品，高钠' },
  { id: 'chicken-tender', name: '鸡里脊（生）', cat: 'meat', kcal: 110, protein: 23, fat: 1.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['硒', '锌'] },
  { id: 'chicken-drumstick', name: '鸡小腿（去皮，生）', cat: 'meat', kcal: 145, protein: 19, fat: 7, carb: 0, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['锌', '硒'] },
  { id: 'chicken-breast-cooked', name: '鸡胸肉（熟）', cat: 'meat', kcal: 165, protein: 31, fat: 3.6, carb: 0, fiber: 0, sodium: 74, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['硒', '锌'] },
  { id: 'chicken-heart', name: '鸡心', cat: 'meat', kcal: 172, protein: 15.9, fat: 11.8, carb: 0.6, fiber: 0, sodium: 125, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['锌', '铁'] },
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
  { id: 'camel-meat', name: '骆驼肉', cat: 'meat', kcal: 128, protein: 21, fat: 4.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '沙漠地区高蛋白肉，肉质类似牛肉' },
  { id: 'ostrich-meat', name: '鸵鸟肉', cat: 'meat', kcal: 110, protein: 22, fat: 1.8, carb: 0, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '极低脂高蛋白，红肉外观白肉性质' },
  { id: 'wild-boar', name: '野猪肉', cat: 'meat', kcal: 143, protein: 20, fat: 6, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌'], note: '瘦肉比例高，肉质紧实' },
  { id: 'frog-meat', name: '牛蛙', cat: 'meat', kcal: 78, protein: 18, fat: 0.9, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12'], minerals: ['锌', '钾'], note: '高蛋白低脂，蛙腿肉细嫩，嘌呤中等' },
  { id: 'silk-worm', name: '蚕蛹', cat: 'meat', kcal: 230, protein: 18, fat: 15, carb: 6, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'], note: '昆虫蛋白，蛋白质量高，嘌呤高，过敏者慎食' },
  { id: 'duck-blood', name: '鸭血', cat: 'meat', kcal: 55, protein: 13, fat: 0.4, carb: 0.2, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁（血红素铁）', '硒'], note: '补铁冠军：铁含量约30.5mg/100g为常见动物血最高，血红素铁吸收率25%~30%，低脂低热量高蛋白；缺点：动物血整体嘌呤中高，痛风/高尿酸者适量；火锅/鸭血粉丝汤/毛血旺主角，必须彻底煮熟' },

  // ---- 胶质蛋白类（健身人群高频） ----
  { id: 'pork-skin', name: '猪皮', cat: 'meat', kcal: 340, protein: 27, fat: 24, carb: 0.5, fiber: 0, sodium: 80, vitFat: [], vitWater: [], minerals: ['锌'], note: '胶原蛋白为主，脂肪不低；煮皮冻可去脂' },
  { id: 'fish-maw', name: '花胶（鱼肚/鱼鳔）', cat: 'meat', kcal: 339, protein: 84, fat: 0.2, carb: 2, fiber: 0, sodium: 55, vitFat: [], vitWater: [], minerals: ['钙', '磷', '铁'], note: '干品蛋白质极高但以胶原蛋白为主；泡发炖汤，痛风者注意嘌呤' },

  // ---- 牛部位细分（内脏/骨髓） ----
  { id: 'beef-lung', name: '牛肺（熟）', cat: 'meat', kcal: 95, protein: 16, fat: 3, carb: 1, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['铁', '锌'], note: '口感绵软，焯水去腥；嘌呤中高，清洗须充分' },
  { id: 'beef-kidney', name: '牛肾（牛腰，熟）', cat: 'meat', kcal: 99, protein: 15.5, fat: 3, carb: 1.2, fiber: 0, sodium: 130, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['铁', '锌', '硒'], note: '臊味重需反复浸泡去味；嘌呤高，痛风者少食' },
  { id: 'beef-brain', name: '牛脑', cat: 'meat', kcal: 147, protein: 10.5, fat: 11, carb: 1, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B12'], minerals: ['锌', '磷'], note: '胆固醇极高，高血脂/心脑血管问题者不宜；嘌呤极高，偶尔尝鲜' },
  { id: 'beef-bone-marrow', name: '牛骨髓', cat: 'meat', kcal: 400, protein: 7, fat: 41, carb: 0, fiber: 0, sodium: 90, vitFat: [], vitWater: [], minerals: ['钙', '磷'], note: '几乎全为脂肪，烤骨髓/炖汤增香可以，热量高别当蛋白质来源' },

  // ---- 牦牛部位 ----

  // ---- 马部位细分 ----
  { id: 'horse-liver', name: '马肝（熟）', cat: 'meat', kcal: 125, protein: 19, fat: 4, carb: 4, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '超级食物：维生素A/B族/铁含量极高；但维生素A易超标，建议每周1~2次，单次不超过40g（熟重），孕妇遵医嘱；嘌呤偏高' },
  { id: 'horse-lung', name: '马肺（熟）', cat: 'meat', kcal: 92, protein: 16, fat: 2.8, carb: 1, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['铁'], note: '类似牛肺口感；嘌呤中高，清洗须充分' },
  { id: 'horse-kidney', name: '马肾（熟）', cat: 'meat', kcal: 97, protein: 15, fat: 3.2, carb: 1, fiber: 0, sodium: 120, vitFat: ['A'], vitWater: ['B12'], minerals: ['铁', '锌', '硒'], note: '臊味重需反复浸泡去味；嘌呤高，痛风者少食' },

  // ---- 鹿部位 ----
  { id: 'venison-liver', name: '鹿肝（熟）', cat: 'meat', kcal: 130, protein: 19, fat: 4, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '超级食物：维生素A/B族/铁含量极高；但维生素A易超标，建议每周1~2次，单次不超过40g（熟重），孕妇遵医嘱；嘌呤偏高' },
  { id: 'venison-heart', name: '鹿心（熟）', cat: 'meat', kcal: 108, protein: 17, fat: 3.5, carb: 1, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '高蛋白低脂，肉质细嫩；充分烹熟' },

  // ---- 驴部位细分（含驴皮/阿胶原料） ----
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
  { id: 'kangaroo-tenderloin', name: '袋鼠里脊/菲力（生）', cat: 'meat', kcal: 105, protein: 23, fat: 1.8, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '⚠ 合法性因国家/地区而异，遵守当地法律法规；本站仅标注营养含量。最嫩部位，低温慢煎或火锅片' },
  { id: 'kangaroo-tail', name: '袋鼠尾（带骨）', cat: 'meat', kcal: 140, protein: 20, fat: 6, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '⚠ 合法性因国家/地区而异，遵守当地法律法规；本站仅标注营养含量。炖汤/慢煮出胶质，骨肉同食' },
  { id: 'kangaroo-liver', name: '袋鼠肝（熟）', cat: 'meat', kcal: 128, protein: 19, fat: 4, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '⚠ 合法性因国家/地区而异，遵守当地法律法规；本站仅标注营养含量。超级食物：维生素A/B族/铁含量极高，但维生素A易超标，建议每周1~2次、单次≤40g（熟重），孕妇遵医嘱；嘌呤偏高' },

  // ---- 鳄鱼部位（仅人工养殖） ----
  { id: 'crocodile-tenderloin', name: '鳄鱼里脊/菲力（养殖，生）', cat: 'meat', kcal: 110, protein: 24, fat: 1.8, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '⚠ 必须为人工养殖；野生鳄鱼严禁捕杀食用；遵守当地法律法规，本站不支持偷抓偷猎等违法活动。最嫩部位，快煎/涮片' },
  { id: 'crocodile-tail', name: '鳄鱼尾（养殖，生）', cat: 'meat', kcal: 120, protein: 20, fat: 4.5, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '⚠ 必须为人工养殖；野生鳄鱼严禁捕杀食用；遵守当地法律法规，本站不支持偷抓偷猎等违法活动。尾部胶质与瘦肉兼具，炖汤/焖烧' },
  { id: 'crocodile-paw', name: '鳄鱼掌（养殖，熟）', cat: 'meat', kcal: 180, protein: 22, fat: 8, carb: 1, fiber: 0, sodium: 90, vitFat: [], vitWater: ['B12'], minerals: ['锌', '钙'], note: '⚠ 必须为人工养殖；野生鳄鱼严禁捕杀食用；遵守当地法律法规，本站不支持偷抓偷猎等违法活动。胶质丰富类似禽掌，炖汤滋补口感' },
  { id: 'crocodile-liver', name: '鳄鱼肝（养殖，熟）', cat: 'meat', kcal: 130, protein: 19, fat: 4.5, carb: 3, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '铜'], note: '⚠ 必须为人工养殖；野生鳄鱼严禁捕杀食用；遵守当地法律法规，本站不支持偷抓偷猎等违法活动。超级食物：维生素A/B族/铁含量极高，但维生素A易超标，建议每周1~2次、单次≤40g（熟重），孕妇遵医嘱；嘌呤偏高' },

  // ---- 牛排部位（健身人常吃，脂肪差异大） ----
  { id: 'beef-sirloin', name: '西冷牛排（生）', cat: 'meat', kcal: 206, protein: 23, fat: 12, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌', '硒'], note: '牛外脊带边脂肪，性价比高；煎烤配西兰花/芦笋经典，边油可剪掉降脂' },
  { id: 'beef-filet', name: '菲力牛排（生）', cat: 'meat', kcal: 155, protein: 24, fat: 6, carb: 0, fiber: 0, sodium: 52, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌', '硒'], note: '牛里脊最嫩部位、脂肪最低，减脂期牛排首选；价格最高，口感软嫩' },
  { id: 'beef-ribeye', name: '眼肉牛排（生）', cat: 'meat', kcal: 270, protein: 22, fat: 20, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'], note: '肋眼雪花脂肪最高、风味最足，热量炸弹级别；增肌期可吃，减脂期少选' },

  // ---- 用户点名补充：禽畜杂件/脆骨 ----
  { id: 'chicken-gizzard', name: '鸡胗（鸡胃）', cat: 'meat', kcal: 118, protein: 19, fat: 2.8, carb: 3, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B3'], minerals: ['铁', '锌'], note: '低脂高蛋白，卤味下酒；口感韧，需切花刀熟透；嘌呤中等' },
  { id: 'chicken-feet', name: '鸡爪（生）', cat: 'meat', kcal: 254, protein: 24, fat: 16, carb: 0.1, fiber: 0, sodium: 70, vitFat: [], vitWater: [], minerals: ['钙'], phytochem: ['胶原蛋白'], note: '胶原蛋白丰富但为不完全蛋白，吃猪蹄/鸡爪补胶原并不能直接补到脸上；卤/泡凤爪钠高' },
  { id: 'duck-feet', name: '鸭掌（生）', cat: 'meat', kcal: 150, protein: 19, fat: 8, carb: 0.2, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B3'], minerals: ['钙'], note: '皮骨多、肉少，胶原蛋白丰富；泡椒鸭掌钠高；卤味适量' },
  { id: 'beef-cartilage', name: '牛脆骨（牛软骨）', cat: 'meat', kcal: 200, protein: 20, fat: 13, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['钙'], phytochem: ['硫酸软骨素'], note: '牛胸/关节软骨，烧烤/卤；钙与软骨素丰富，但难嚼；油炸后热量飙升' },

  // ---- 用户点名补充 ----
  { id: 'rousong', name: '肉松（猪肉松平均值）', cat: 'meat', kcal: 396, protein: 30, fat: 25, carb: 10, fiber: 0, sodium: 1500, vitFat: [], vitWater: ['B1'], minerals: ['铁', '锌'], note: '瘦肉经煮炒烘干，蛋白高但脂肪与钠也高（市售款常加油糖）；1小袋约15g=60kcal；配粥/面包点缀，别当纯肉吃；儿童款钠高' },
  { id: 'yang-tourou', name: '酱羊头肉（熟）', cat: 'meat', kcal: 200, protein: 25, fat: 10, carb: 1, fiber: 0, sodium: 800, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '羊脸/舌/脑混合，卤制后钠高；肉冻/凉拌常见；羊脑胆固醇高，一次少尝；下酒菜，配大量蔬菜平衡钠' },
  { id: 'niu-tourou', name: '酱牛头肉（熟）', cat: 'meat', kcal: 230, protein: 20, fat: 16, carb: 1, fiber: 0, sodium: 750, vitFat: [], vitWater: ['B12'], minerals: ['锌', '铁'], note: '牛头皮/脸肉，胶质多脂肪高；凉拌/火锅；比纯牛腱脂肪高约3倍；一顿50-80g切片' },
  { id: 'dog-meat', name: '狗肉（瘦，参考值）', cat: 'meat', kcal: 110, protein: 20, fat: 3, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], phytochem: [], note: '【本网站立场】本网站反对任何形式的食用狗肉，以下数据仅为营养参考，不代表鼓励。食用狗肉在我国多数地区已被立法禁止或社会广泛抵制，江苏部分地区历史上俗称"香肉"，属地方性争议饮食。请遵守当地法律法规与公序良俗，尊重伴侣动物。；【争议声明】狗肉在部分地区（如江苏沛县/徐州、延边）有食用传统，但在全球范围内动物保护争议极大。本站仅作营养数据参考，不鼓励也不反对；强烈建议选择合法养殖、经过检疫的肉用犬；爱狗人士请跳过此项' },

  // ---- 用户点名补充 ----
  { id: 'baiqie-ji', name: '白切鸡（带皮）', cat: 'meat', kcal: 200, protein: 20, fat: 13, carb: 0, fiber: 0, sodium: 60, vitFat: ['A'], vitWater: ['B12'], minerals: ['铁', '锌'], note: '粤菜代表，水煮后蘸姜葱蓉；皮是脂肪主要来源，去皮约160kcal/100g；1/4只约200g=400kcal' },
  { id: 'yanshui-ya', name: '盐水鸭（南京特产）', cat: 'meat', kcal: 250, protein: 20, fat: 18, carb: 0, fiber: 0, sodium: 1200, vitFat: ['A'], vitWater: ['B12'], minerals: ['铁'], note: '南京/淮扬名菜，鸭皮脂肪厚、腌制后钠高（约1200mg/100g）；一次50-80g切片；下酒配粥，别就着咸汤喝' },
  { id: 'niu-xiong', name: '牛胸肉（Brisket，生）', cat: 'meat', kcal: 300, protein: 17, fat: 25, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12', 'B3'], minerals: ['铁', '锌'], note: '肥瘦相间、筋膜多，适合低温慢炖/烟熏/卤制；烤牛胸（BBQ Brisket）是美式烧烤代表；生肉脂肪约25%，慢炖后筋膜化口；减脂期不如选牛腱/里脊' },

  // ---- 用户点名补充：争议食材 ----
  { id: 'lizard', name: '蜥蜴肉（参考值，仅作营养参考）', cat: 'meat', kcal: 120, protein: 20, fat: 3, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], phytochem: [], note: '【重要声明】本网站不支持任何违法乱纪、捕食野生保护动物或食用野味的行为。蜥蜴在世界部分地区（如部分东南亚、拉美）有合法食用传统，但我国野生蜥蜴多属"三有"保护动物，私自捕捉/食用涉嫌违法。以下数据仅为营养学参考：人工养殖、合法渠道、彻底煮熟后蛋白质约20g/100g、脂肪极低。任何情况下请遵守当地法律法规，尊重生态保护。' },

  // ---- 用户点名补充：火锅/卤味杂碎 ----
  { id: 'niuxue-xiangchang', name: '牛血香肠（东北/贵州风味）', cat: 'meat', kcal: 180, protein: 15, fat: 12, carb: 3, fiber: 0, sodium: 900, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '牛血+肉+淀粉灌制，高铁高蛋白；但钠与脂肪不低；切片煎/涮火锅；一根约80g=144kcal；高血脂/高血压者适量' },
  { id: 'ya-chang', name: '鸭肠（熟，火锅）', cat: 'meat', kcal: 129, protein: 14, fat: 7, carb: 1, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '火锅经典，"七上八下"涮15秒；脆嫩；胆固醇偏高；一份约100g；蘸料别太多油碟' },
  { id: 'ji-chang', name: '鸡肠（熟）', cat: 'meat', kcal: 96, protein: 14, fat: 4, carb: 1, fiber: 0, sodium: 150, vitFat: [], vitWater: ['B12'], minerals: ['铁'], note: '卤味/干锅/冒菜常见；脂肪比鸭肠低；清洗要彻底；胆固醇偏高，一次50-80g' },
  { id: 'ya-xue', name: '鸭血（熟）', cat: 'meat', kcal: 55, protein: 12, fat: 0.4, carb: 1, fiber: 0, sodium: 180, vitFat: [], vitWater: ['B12'], minerals: ['铁（血红素铁）', '硒'], note: '毛血旺/鸭血粉丝汤/火锅主角；高铁低脂，吸收率高，补铁优选；一盒约300g；痛风/高尿酸者适量（嘌呤中高）；必须彻底煮熟' },

  // ---- 血制品补充：羊血 / 鸡血 ----
  { id: 'lamb-blood', name: '羊血', cat: 'meat', kcal: 57, protein: 6.8, fat: 0.2, carb: 6.9, fiber: 0, sodium: 443, vitFat: [], vitWater: ['B1', 'B2'], minerals: ['铁', '硒', '锌'], note: '优点：铁含量约18.3mg/100g，血红素铁易吸收，低脂低热量；缺点：蛋白质（6.8g/100g）低于猪血鸭血，钠偏高（约443mg/100g）高血压者控量；动物血整体嘌呤中高，痛风/高尿酸者适量；韭菜炒羊血/羊血粉丝经典，必须彻底煮熟' },
  { id: 'chicken-blood', name: '鸡血', cat: 'meat', kcal: 49, protein: 7.8, fat: 0.2, carb: 4.1, fiber: 0, sodium: 208, vitFat: ['A'], vitWater: ['B1', 'B2', '烟酸'], minerals: ['铁', '硒', '磷'], note: '优点：铁含量约25mg/100g仅次于鸭血，低脂低热量（49kcal/100g）；缺点：蛋白质偏低（7.8g/100g），胆固醇较高（约170mg/100g）高血脂者适量；嘌呤偏高，痛风/高尿酸者少吃；鸭血粉丝汤/血豆腐/火锅，必须彻底煮熟' },

  { id: 'snake', name: '蛇肉（参考值，仅限合法人工养殖）', cat: 'meat', kcal: 90, protein: 18, fat: 1.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], phytochem: [], note: '【重要法律与生态声明】本网站不支持任何违法狩猎、捕食野生保护动物或食用野味的行为。野生蛇类在我国多为国家重点保护或"三有"保护动物，私自捕捉/交易/食用涉嫌违法犯罪。以下数据仅作营养学参考：仅限人工养殖、合法渠道、彻底煮熟后（防裂头蚴/绦虫）的食用蛇种（如人工养殖乌梢蛇、水律蛇），蛋白质约18g/100g、脂肪极低。任何情况下请自觉遵守当地法律法规，尊重生态保护。' },

  // ---- 用户点名补充 ----
  { id: 'quail', name: '鹌鹑（熟）', cat: 'meat', kcal: 120, protein: 20, fat: 4, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌', '硒'], note: '一只约100g可食部=120kcal；比鸡肉瘦，蛋白密度高；卤/烤/炖汤；胆固醇略高，一次1-2只；"动物人参"是营销说法，营养与鸡肉接近' },
  { id: 'pigeon', name: '鸽子（熟，乳鸽）', cat: 'meat', kcal: 150, protein: 19, fat: 7, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '一只乳鸽约200g=300kcal；比鹌鹑肥，脂肪略高；粤式脆皮乳鸽/炖汤；"补气血"中医说法，现代医学证据有限；术后恢复常食，但与鸡肉比无特殊优势' },

  // ---- 用户点名：鹿肉与羊肉各部位 ----
  { id: 'deer-leg', name: '鹿肉（腿肉，熟）', cat: 'meat', kcal: 120, protein: 25, fat: 2.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁（血红素铁）', '锌', '磷'], phytochem: ['共轭亚油酸（CLA）'], note: '【合法养殖】野生鹿多为保护动物，以下仅限合法人工养殖鹿种（如梅花鹿、马鹿养殖）。鹿肉是所有常见肉里脂肪最低、蛋白最高的之一；CLA含量比牛肉高；口感比牛肉粗、略柴，适合慢炖/卤/做鹿肉干；嘌呤中高，痛风适量' },
  { id: 'lamb-leg', name: '羊腿肉（熟）', cat: 'meat', kcal: 200, protein: 26, fat: 10, carb: 0, fiber: 0, sodium: 70, vitFat: ['B12'], vitWater: ['B族'], minerals: ['铁', '锌'], note: '羊肉代表部位，烤羊腿/清炖；脂肪比牛肉高但瘦肉多；膻味来自支链脂肪酸，去膻靠焯水/萝卜/花椒；冬季温补；嘌呤中高' },
  { id: 'lamb-chop', name: '羊排/羊肋排（熟）', cat: 'meat', kcal: 290, protein: 20, fat: 23, carb: 0, fiber: 0, sodium: 70, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '脂肪层厚，烤羊排/孜然羊肉；一根排约150g=435kcal；脂肪是腿肉两倍；健身期偶尔解馋，别当日常蛋白' },
  { id: 'lamb-belly', name: '羊腩/羊五花肉（熟）', cat: 'meat', kcal: 320, protein: 18, fat: 28, carb: 0, fiber: 0, sodium: 75, vitFat: [], vitWater: ['B12'], minerals: ['铁'], note: '肥瘦相间，红焖/涮火锅；脂肪最高部位；一份100g=320kcal；减脂期避开' },
  { id: 'lamb-heart', name: '羊心（熟）', cat: 'meat', kcal: 120, protein: 18, fat: 5, carb: 1, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B12', 'CoQ10'], minerals: ['铁', '锌', '硒'], phytochem: ['辅酶Q10'], note: '内脏里CoQ10和铁密度高；卤/炒/烤；胆固醇偏高，一次50-80g；"以心补心"是中医取象比类，别当真' },
  { id: 'lamb-liver', name: '羊肝（熟）', cat: 'meat', kcal: 130, protein: 18, fat: 5, carb: 2, fiber: 0, sodium: 100, vitFat: ['A（极高）', 'B12', 'D'], vitWater: ['B2', '叶酸', '铁'], minerals: ['铁（血红素铁极高）', '锌', '硒'], phytochem: [], note: '【维生素A警告】羊肝维A极高，一次别超40g，一周1-2次足够；长期大量可致维A中毒（颅压高/脱发/肝损）；补铁补叶酸经典；孕妇别大量吃（维A致畸风险）；必须彻底煮熟防弓形虫' },
  { id: 'lamb-tripe', name: '羊肚（熟）', cat: 'meat', kcal: 100, protein: 15, fat: 4, carb: 1, fiber: 0, sodium: 90, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '羊杂汤/爆肚；纤维感强、蛋白高脂肪低；清洗要彻底（翻肚/面粉搓）；胆固醇中等' },
  { id: 'lamb-trotter', name: '羊蹄（熟）', cat: 'meat', kcal: 200, protein: 15, fat: 15, carb: 0, fiber: 0, sodium: 80, vitFat: [], vitWater: [], minerals: ['钙', '胶原蛋白'], note: '主要是皮、筋、骨胶原；"补胶原"不能直接补到皮肤，吃下去拆成氨基酸；一份100g=200kcal；骨髓脂肪高' },

  // ---- 牦牛肉（高原特色，藏族传统食材）----
  { id: 'yak-meat', name: '牦牛肉（瘦，生）', cat: 'meat', kcal: 110, protein: 22, fat: 2.5, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12', '铁'], minerals: ['铁（血红素铁极高）', '锌', '硒'], phytochem: ['共轭亚油酸（CLA）', 'Omega-3'], note: '高原散养牦牛肉，脂肪比普通黄牛更低，蛋白更高；CLA和Omega-3含量是谷饲牛肉的3-5倍；口感偏粗、纤维紧，适合卤/炖/风干；藏族传统食材；嘌呤中等' },
  { id: 'yak-liver', name: '牦牛肝（熟）', cat: 'meat', kcal: 130, protein: 20, fat: 4, carb: 3, fiber: 0, sodium: 85, vitFat: ['A（极高）'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁（极高）', '铜', '锌'], note: '【维生素A警告】牦牛肝维A极高，一次别超40g，一周1-2次；高原动物肝脏重金属富集风险略高，适量；补铁补叶酸效果极强' },
  { id: 'yak-heart', name: '牦牛心（熟）', cat: 'meat', kcal: 150, protein: 25, fat: 4, carb: 0, fiber: 0, sodium: 65, vitFat: [], vitWater: ['B12', 'CoQ10'], minerals: ['铁', '锌', '硒'], phytochem: ['辅酶Q10'], note: '高原动物心脏，CoQ10密度高；卤/炒；胆固醇偏高，一次50-80g' },

  // ---- 马肉（欧洲/中亚传统食材，国内小众）----
  { id: 'horse-meat', name: '马肉（瘦，生）', cat: 'meat', kcal: 120, protein: 21, fat: 3.5, carb: 0, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B12', '铁'], minerals: ['铁', '锌', '磷'], phytochem: ['共轭亚油酸（CLA）'], note: '马肉是高蛋白低脂肉类，脂肪比牛肉低30%；欧洲（法/意/德）和中亚传统食材；国内非主流，多为马肉干/马肉肠；口感偏甜、纤维细；嘌呤中等' },
  { id: 'horse-heart', name: '马心（熟）', cat: 'meat', kcal: 145, protein: 24, fat: 4, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12', 'CoQ10'], minerals: ['铁', '锌', '硒'], phytochem: ['辅酶Q10'], note: '心脏类内脏，CoQ10和铁密度高；小众食材，国内少见' },

  // ---- 驴肉（华北传统食材，"天上龙肉地上驴肉"）----
  { id: 'donkey-meat', name: '驴肉（瘦，熟）', cat: 'meat', kcal: 120, protein: 21, fat: 3.5, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12', '铁'], minerals: ['铁', '锌', '磷'], phytochem: [], note: '华北传统食材（保定驴肉火烧）；"天上龙肉，地上驴肉"；高蛋白低脂，脂肪比牛肉还低；口感细嫩、味道鲜；驴火经典搭配；嘌呤中等' },
  { id: 'donkey-hide', name: '驴皮（熬胶原料）', cat: 'meat', kcal: 350, protein: 80, fat: 1, carb: 0, fiber: 0, sodium: 30, vitFat: [], vitWater: [], minerals: ['钙', '胶原蛋白'], note: '阿胶的原料；主要是胶原蛋白，氨基酸组成不完整（缺色氨酸）；"补胶原"不能直接补皮肤，吃下去拆成氨基酸；不推荐作为日常蛋白来源' },

  // ---- 争议/特殊肉类（法律声明）----
  { id: 'kangaroo-meat', name: '袋鼠肉（熟）', cat: 'meat', kcal: 100, protein: 23, fat: 2, carb: 0, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B12', '铁'], minerals: ['铁', '锌', '硒'], phytochem: ['共轭亚油酸（CLA）'], note: '【法律声明】袋鼠肉在澳大利亚是合法狩猎/食用的（袋鼠是害兽，政府鼓励捕杀），但在其他国家/地区可能受保护或禁止进口。本站仅作营养数据参考，不鼓励任何违法捕猎；袋鼠肉是所有红肉里脂肪最低的之一，CLA含量极高' },
  { id: 'crocodile-meat', name: '鳄鱼肉（人工养殖，熟）', cat: 'meat', kcal: 110, protein: 22, fat: 2.5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌', '磷'], note: '【法律声明】仅限合法人工养殖鳄鱼；野生鳄鱼多为保护动物（如扬子鳄是国家一级保护动物），严禁猎捕。本站坚决反对偷猎和非法野生动物贸易；鳄鱼肉高蛋白低脂，口感类似鸡肉+鱼肉混合' },
  { id: 'snake-meat', name: '蛇肉（人工养殖，熟）', cat: 'meat', kcal: 95, protein: 20, fat: 1.5, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '【法律声明】仅限合法人工养殖蛇类；野生蛇类多为"三有"保护动物，严禁私自捕捉食用。本站反对非法野生动物交易；蛇肉高蛋白低脂，两广传统食材；注意彻底煮熟防寄生虫（曼氏裂头蚴）' },
  { id: 'lizard-meat', name: '蜥蜴肉（部分地区合法）', cat: 'meat', kcal: 110, protein: 21, fat: 3, carb: 0, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '【法律声明】蜥蜴在世界部分地区是合法食用的（如一些热带国家），但在多数地区野生蜥蜴受保护。本站仅作营养数据参考，不支持任何违法捕猎野生动物的行为；爬行动物肉普遍高蛋白低脂' },

  // ---- 猪肉/鸡肉细分部位 ----
  { id: 'wild-boar-meat', name: '野猪肉（合法狩猎，熟）', cat: 'meat', kcal: 130, protein: 20, fat: 5, carb: 0, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['铁', '锌'], note: '【法律声明】仅限合法狩猎的野猪（部分地区野猪成灾，政府鼓励捕猎）；野猪肉脂肪比家猪低一半，瘦肉更紧、味道更浓；必须彻底煮熟防非洲猪瘟和寄生虫' },
  { id: 'chicken-frame', name: '鸡架', cat: 'meat', kcal: 180, protein: 15, fat: 13, carb: 0, fiber: 0, sodium: 80, vitFat: [], vitWater: ['B12'], minerals: ['钙', '磷'], note: '主要是骨头+皮+少量肉；沈阳鸡架文化；蛋白不高（啃个味道），钙和骨髓脂肪；一份100g=180kcal；减脂期别当蛋白来源' },
  { id: 'chicken-cartilage', name: '鸡脆骨/掌中宝', cat: 'meat', kcal: 200, protein: 15, fat: 15, carb: 0, fiber: 0, sodium: 90, vitFat: [], vitWater: [], minerals: ['钙', '磷'], note: '鸡爪掌中间的脆骨；烤/炸/椒盐；主要是软骨组织，钙含量高但蛋白不高；"补钙"效果有限，吃下去拆成氨基酸和钙盐' },
  { id: 'chicken-skin', name: '鸡皮（熟）', cat: 'meat', kcal: 450, protein: 15, fat: 45, carb: 0, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: [], minerals: [], note: '纯脂肪+皮；一份100g=450kcal；减脂期绝对避开；烤鸡的油大部分来自鸡皮；要低脂就去皮吃' },
  { id: 'duck-web', name: '鸭掌', cat: 'meat', kcal: 150, protein: 18, fat: 8, carb: 0, fiber: 0, sodium: 100, vitFat: [], vitWater: ['B12'], minerals: ['钙', '胶原蛋白'], note: '主要是皮、筋、骨；卤鸭掌/泡椒鸭掌；胶原蛋白为主，蛋白质量不高；啃个味道还行，别当蛋白来源' },
  { id: 'lamb-cartilage', name: '羊脆骨', cat: 'meat', kcal: 130, protein: 17, fat: 6, carb: 0, fiber: 0, sodium: 75, vitFat: [], vitWater: [], minerals: ['钙', '磷'], note: '羊胸/关节处的脆骨；烤羊脆骨；口感脆，补钙是噱头，主要是解馋' },
];
