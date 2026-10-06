// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: SNACKS
// 零食加工 / 运动补剂，每 100g 参考值
import type { IFood } from './types';

export const SNACKS: IFood[] = [
  { id: 'potato-chips', name: '薯片', cat: 'snack', kcal: 536, protein: 7, fat: 35, carb: 53, fiber: 4.3, sodium: 530, vitFat: [], vitWater: [], minerals: [], note: '加工食品，高钠高脂' },
  { id: 'instant-noodle', name: '方便面（干）', cat: 'snack', kcal: 473, protein: 9, fat: 21, carb: 62, fiber: 2, sodium: 1900, vitFat: [], vitWater: [], minerals: [], note: '高钠，料包少放' },
  { id: 'dark-chocolate', name: '黑巧克力（70%）', cat: 'snack', kcal: 598, protein: 8, fat: 43, carb: 46, fiber: 11, sodium: 20, vitFat: ['E', 'K'], vitWater: [], minerals: ['镁', '铁'], note: '高热量，控制份量' },
  { id: 'whey-protein', name: '乳清蛋白粉', cat: 'snack', kcal: 400, protein: 80, fat: 6, carb: 8, fiber: 0, sodium: 260, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '每勺约30g含24g蛋白；⚠ 各品牌配方不同，此为典型参考值，以产品包装营养成分表为准' },
  { id: 'casein-protein', name: '酪蛋白粉', cat: 'snack', kcal: 380, protein: 70, fat: 5, carb: 10, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '缓释蛋白，适合睡前' },
  { id: 'energy-bar', name: '能量棒（通用）', cat: 'snack', kcal: 400, protein: 10, fat: 15, carb: 60, fiber: 3, sodium: 150, vitFat: [], vitWater: [], minerals: [], note: '高糖，训练中途应急' },
  { id: 'protein-bar', name: '蛋白棒', cat: 'snack', kcal: 380, protein: 30, fat: 14, carb: 40, fiber: 5, sodium: 180, vitFat: [], vitWater: [], minerals: [], note: '高蛋白，注意糖分' },
  { id: 'protein-cookie', name: '蛋白曲奇', cat: 'snack', kcal: 450, protein: 20, fat: 20, carb: 50, fiber: 4, sodium: 200, vitFat: [], vitWater: [], minerals: [] },
  { id: 'cracker-whole-wheat', name: '全麦苏打饼干', cat: 'snack', kcal: 420, protein: 10, fat: 15, carb: 65, fiber: 5, sodium: 480, vitFat: [], vitWater: [], minerals: [] },
  { id: 'sports-drink', name: '运动饮料（每100ml）', cat: 'snack', kcal: 25, protein: 0, fat: 0, carb: 6.2, fiber: 0, sodium: 45, vitFat: [], vitWater: [], minerals: ['钠', '钾'], note: '含糖，长时间训练时补充' },
  { id: 'beetroot-powder', name: '甜菜根粉', cat: 'snack', kcal: 378, protein: 12, fat: 1.5, carb: 78, fiber: 20, sodium: 200, vitFat: ['K'], vitWater: ['叶酸', 'C'], minerals: ['钾', '铁'], note: '硝酸盐高度浓缩，扩张血管、提升耐力；训练前 1–2 勺冲水（每日 5–10g）' },

  // ---- 公开食物成分数据扩充（56 条）：每 100g 参考值 ----
  { id: 'popcorn', name: '爆米花（无油）', cat: 'snack', kcal: 387, protein: 12, fat: 4.5, carb: 78, fiber: 15, sodium: 8, vitFat: ['E'], vitWater: ['B3'], minerals: ['镁'] },
  { id: 'popcorn-butter', name: '奶油爆米花', cat: 'snack', kcal: 500, protein: 9, fat: 28, carb: 58, fiber: 9, sodium: 500, vitFat: ['E'], vitWater: ['B3'], minerals: ['镁'], note: '高脂高钠' },
  { id: 'cola', name: '可乐', cat: 'snack', kcal: 43, protein: 0, fat: 0, carb: 10.6, fiber: 0, sodium: 4, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'cola-zero', name: '零度可乐', cat: 'snack', kcal: 0.3, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '无糖，每 100ml' },
  { id: 'soda-lemon', name: '柠檬汽水', cat: 'snack', kcal: 40, protein: 0, fat: 0, carb: 10, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'energy-drink', name: '能量饮料', cat: 'snack', kcal: 45, protein: 0.4, fat: 0, carb: 11, fiber: 0, sodium: 40, vitFat: [], vitWater: ['B3', 'B6'], minerals: [], note: '含咖啡因，每 100ml' },
  { id: 'vitamin-water', name: '维他命水', cat: 'snack', kcal: 25, protein: 0, fat: 0, carb: 6, fiber: 0, sodium: 20, vitFat: [], vitWater: ['C', 'B6'], minerals: [], note: '每 100ml' },
  { id: 'orange-juice', name: '橙汁（100%）', cat: 'snack', kcal: 45, protein: 0.7, fat: 0.2, carb: 10.4, fiber: 0.2, sodium: 1, vitFat: [], vitWater: ['C', '叶酸'], minerals: ['钾'], note: '每 100ml' },
  { id: 'apple-juice', name: '苹果汁（100%）', cat: 'snack', kcal: 46, protein: 0.1, fat: 0.1, carb: 11.3, fiber: 0.2, sodium: 4, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '每 100ml' },
  { id: 'vegetable-juice', name: '蔬菜汁', cat: 'snack', kcal: 20, protein: 0.8, fat: 0.1, carb: 4, fiber: 0.8, sodium: 60, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '每 100ml' },
  { id: 'coconut-water', name: '椰子水', cat: 'snack', kcal: 19, protein: 0.7, fat: 0.2, carb: 3.7, fiber: 1.1, sodium: 105, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '天然电解质，每 100ml' },
  { id: 'milk-tea', name: '奶茶（含糖）', cat: 'snack', kcal: 90, protein: 1, fat: 2.5, carb: 15, fiber: 0, sodium: 50, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'bubble-tea', name: '珍珠奶茶', cat: 'snack', kcal: 110, protein: 1.2, fat: 3, carb: 19, fiber: 0, sodium: 60, vitFat: [], vitWater: [], minerals: [], note: '含糖与木薯珍珠，每 100ml' },
  { id: 'coffee-black', name: '黑咖啡', cat: 'snack', kcal: 2, protein: 0.2, fat: 0, carb: 0, fiber: 0, sodium: 2, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '几乎无热量，每 100ml' },
  { id: 'latte', name: '拿铁（全脂）', cat: 'snack', kcal: 55, protein: 3, fat: 3, carb: 4.5, fiber: 0, sodium: 40, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '每 100ml' },
  { id: 'ice-cream', name: '冰淇淋（香草）', cat: 'snack', kcal: 207, protein: 3.5, fat: 11, carb: 24, fiber: 0, sodium: 80, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '含糖' },
  { id: 'cake-sponge', name: '蛋糕（海绵）', cat: 'snack', kcal: 350, protein: 7, fat: 15, carb: 48, fiber: 1, sodium: 300, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'], note: '含糖与油脂' },
  { id: 'cheesecake', name: '芝士蛋糕', cat: 'snack', kcal: 321, protein: 5.5, fat: 22.5, carb: 25, fiber: 0.5, sodium: 300, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'cookie-butter', name: '曲奇饼干', cat: 'snack', kcal: 546, protein: 6, fat: 31.6, carb: 59.1, fiber: 1.4, sodium: 300, vitFat: ['A', 'E'], vitWater: ['B1'], minerals: ['钙'], note: '可能含反式脂肪' },
  { id: 'cracker-soda', name: '苏打饼干', cat: 'snack', kcal: 408, protein: 8.4, fat: 7.7, carb: 76.2, fiber: 0.2, sodium: 312, vitFat: [], vitWater: ['B1'], minerals: ['钙'] },
  { id: 'wafer', name: '威化饼干', cat: 'snack', kcal: 500, protein: 6, fat: 25, carb: 64, fiber: 1, sodium: 300, vitFat: ['A', 'E'], vitWater: [], minerals: [] },
  { id: 'milk-chocolate', name: '牛奶巧克力', cat: 'snack', kcal: 535, protein: 7.7, fat: 29.7, carb: 59.4, fiber: 3.4, sodium: 79, vitFat: ['A', 'E'], vitWater: [], minerals: ['钙', '镁'], note: '含糖高' },
  { id: 'white-chocolate', name: '白巧克力', cat: 'snack', kcal: 539, protein: 5.9, fat: 32.1, carb: 59.2, fiber: 0.2, sodium: 90, vitFat: ['A', 'E'], vitWater: [], minerals: ['钙'], note: '含糖高' },
  { id: 'nutella', name: '巧克力榛子酱', cat: 'snack', kcal: 539, protein: 6.3, fat: 30.9, carb: 57.9, fiber: 5.4, sodium: 41, vitFat: ['E'], vitWater: [], minerals: ['镁'], note: '含糖与棕榈油' },
  { id: 'chips-corn', name: '玉米片（调味）', cat: 'snack', kcal: 500, protein: 7, fat: 25, carb: 63, fiber: 4, sodium: 600, vitFat: ['E'], vitWater: [], minerals: ['镁'], note: '高脂高钠' },
  { id: 'ramen-cup', name: '杯面', cat: 'snack', kcal: 450, protein: 9, fat: 18, carb: 62, fiber: 2.5, sodium: 1800, vitFat: [], vitWater: ['B1'], minerals: ['铁'], note: '高钠' },
  { id: 'hamburger', name: '汉堡（牛肉）', cat: 'snack', kcal: 250, protein: 12, fat: 12, carb: 26, fiber: 1.5, sodium: 500, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '快餐组合，含钠较高' },
  { id: 'fried-chicken', name: '炸鸡（带皮）', cat: 'snack', kcal: 290, protein: 22, fat: 19, carb: 9, fiber: 0.5, sodium: 700, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['锌', '硒'], note: '油炸，高脂高钠' },
  { id: 'french-fries', name: '薯条', cat: 'snack', kcal: 312, protein: 3.4, fat: 15, carb: 41, fiber: 3.8, sodium: 210, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '油炸，高钠' },
  { id: 'pizza', name: '披萨', cat: 'snack', kcal: 266, protein: 11, fat: 10, carb: 33, fiber: 2, sodium: 600, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '含钠较高' },
  { id: 'hotdog', name: '热狗', cat: 'snack', kcal: 290, protein: 10, fat: 26, carb: 4, fiber: 0, sodium: 800, vitFat: ['A'], vitWater: ['B12'], minerals: ['锌'], note: '加工肉制品，高钠' },
  { id: 'pretzel', name: '椒盐卷饼', cat: 'snack', kcal: 380, protein: 10, fat: 3, carb: 80, fiber: 3, sodium: 1200, vitFat: [], vitWater: ['B1'], minerals: ['铁'], note: '高钠' },
  { id: 'rice-cracker', name: '米饼', cat: 'snack', kcal: 380, protein: 6, fat: 2, carb: 82, fiber: 1, sodium: 500, vitFat: [], vitWater: ['B1'], minerals: [] },
  { id: 'granola', name: '格兰诺拉麦片', cat: 'snack', kcal: 470, protein: 10, fat: 18, carb: 66, fiber: 7, sodium: 200, vitFat: ['E'], vitWater: ['B1', 'B3'], minerals: ['镁', '铁'], note: '常见添加糖与油脂' },
  { id: 'cereal-bar', name: '麦片棒', cat: 'snack', kcal: 400, protein: 6, fat: 14, carb: 65, fiber: 4, sodium: 250, vitFat: ['E'], vitWater: ['B1'], minerals: ['镁'] },
  { id: 'energy-gel', name: '能量胶', cat: 'snack', kcal: 250, protein: 0, fat: 0, carb: 62, fiber: 0, sodium: 50, vitFat: [], vitWater: [], minerals: [], note: '耐力运动补给，含游离糖' },
  { id: 'whey-isolate', name: '分离乳清蛋白粉', cat: 'snack', kcal: 390, protein: 90, fat: 1, carb: 2, fiber: 0.5, sodium: 300, vitFat: [], vitWater: [], minerals: ['钙'], note: '每 100g 粉蛋白含量高、乳糖低；⚠ 各品牌配方不同，此为典型参考值，以产品包装营养成分表为准' },
  { id: 'mass-gainer', name: '增肌粉', cat: 'snack', kcal: 400, protein: 25, fat: 5, carb: 65, fiber: 2, sodium: 300, vitFat: [], vitWater: [], minerals: ['钙'], note: '含大量麦芽糊精' },
  { id: 'pea-protein', name: '豌豆蛋白粉', cat: 'snack', kcal: 380, protein: 80, fat: 5, carb: 5, fiber: 5, sodium: 800, vitFat: [], vitWater: [], minerals: ['铁'], note: '植物蛋白来源' },
  { id: 'creatine', name: '肌酸（一水）', cat: 'snack', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 0, vitFat: [], vitWater: [], minerals: [], note: '训练补剂本身不提供热量；每日3-5g；⚠ 各品牌纯度/辅料不同，此为典型参考值，以产品包装为准' },
  { id: 'honey', name: '蜂蜜', cat: 'snack', kcal: 321, protein: 0.4, fat: 0, carb: 79.5, fiber: 0, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '游离糖，仍需计入碳水' },
  { id: 'maple-syrup', name: '枫糖浆', cat: 'snack', kcal: 260, protein: 0, fat: 0, carb: 67, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: ['钙', '钾'], note: '游离糖' },
  { id: 'sugar-white', name: '白砂糖', cat: 'snack', kcal: 400, protein: 0, fat: 0, carb: 99.9, fiber: 0, sodium: 1, vitFat: [], vitWater: [], minerals: [], note: '纯游离糖' },
  { id: 'jam', name: '果酱', cat: 'snack', kcal: 250, protein: 0.5, fat: 0.1, carb: 62, fiber: 1, sodium: 30, vitFat: [], vitWater: ['C'], minerals: [], note: '含糖高' },
  { id: 'soy-sauce', name: '酱油', cat: 'snack', kcal: 63, protein: 5.6, fat: 0.1, carb: 10.1, fiber: 0.2, sodium: 5757, vitFat: [], vitWater: [], minerals: ['钾'], note: '高钠，每 100ml' },
  { id: 'oyster-sauce', name: '蚝油', cat: 'snack', kcal: 114, protein: 1.2, fat: 0.2, carb: 26, fiber: 0, sodium: 4000, vitFat: [], vitWater: [], minerals: ['锌'], note: '高钠，每 100ml' },
  { id: 'tomato-ketchup', name: '番茄酱', cat: 'snack', kcal: 81, protein: 1.7, fat: 0.2, carb: 19, fiber: 1.2, sodium: 1100, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '高钠，含糖' },
  { id: 'chili-sauce', name: '辣椒酱', cat: 'snack', kcal: 130, protein: 3, fat: 8, carb: 12, fiber: 2, sodium: 3000, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '高钠' },
  { id: 'salad-dressing', name: '沙拉酱', cat: 'snack', kcal: 700, protein: 1, fat: 75, carb: 3, fiber: 0, sodium: 600, vitFat: ['E', 'K'], vitWater: [], minerals: [], note: '高脂' },
  { id: 'yogurt-drink', name: '乳酸菌饮料', cat: 'snack', kcal: 65, protein: 1, fat: 0.5, carb: 15, fiber: 0, sodium: 40, vitFat: [], vitWater: [], minerals: ['钙'], note: '含糖，每 100ml' },
  { id: 'oat-milk', name: '燕麦奶', cat: 'snack', kcal: 45, protein: 1, fat: 1.5, carb: 7, fiber: 0.6, sodium: 50, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '常见强化钙与 B12，每 100ml' },
  { id: 'almond-milk', name: '杏仁奶', cat: 'snack', kcal: 25, protein: 0.6, fat: 1.1, carb: 3, fiber: 0.3, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['钙'], note: '每 100ml' },
  { id: 'soy-drink-sweet', name: '甜豆奶', cat: 'snack', kcal: 45, protein: 2.6, fat: 1.6, carb: 4.2, fiber: 0.4, sodium: 40, vitFat: [], vitWater: ['B1'], minerals: ['钙'], note: '每 100ml' },

  // ---- 训练补给类（用户点名扩充） ----
  { id: 'salt-tab', name: '电解质盐丸', cat: 'snack', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 210, vitFat: [], vitWater: [], minerals: ['钠', '钾', '镁'], note: '每粒约钠90-120mg+钾镁；耐力运动每小时1粒随水吞服；⚠ 各品牌含量不同，以包装为准' },
  { id: 'electrolyte-powder', name: '电解质粉（无糖）', cat: 'snack', kcal: 5, protein: 0, fat: 0, carb: 1, fiber: 0, sodium: 200, vitFat: [], vitWater: [], minerals: ['钠', '钾', '镁'], note: '无糖电解质冲剂，兑约500ml水；高强度训练、桑拿、大量出汗时防抽筋；各品牌配比不同以包装为准' },
  { id: 'glucose', name: '葡萄糖', cat: 'snack', kcal: 400, protein: 0, fat: 0, carb: 100, fiber: 0, sodium: 0, vitFat: [], vitWater: [], minerals: [], note: '单糖，吸收最快；练后/低血糖时快速补糖，属游离糖，日常控量' },
  { id: 'maltodextrin', name: '麦芽糊精', cat: 'snack', kcal: 400, protein: 0, fat: 0, carb: 95, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '快速碳水，血糖指数高；增肌粉/运动饮料常用成分，练后补糖原可用' },
  { id: 'matcha-powder', name: '抹茶粉', cat: 'snack', kcal: 300, protein: 25, fat: 5, carb: 40, fiber: 25, sodium: 10, vitFat: ['K'], vitWater: ['B2'], minerals: ['钾', '镁'], phytochem: ['儿茶素（EGCG）：强抗氧化、辅助燃脂', '咖啡因：提神'], note: '咖啡因+EGCG组合，训练前1-2g冲水/拌酸奶；选纯抹茶粉，勿买加糖奶茶款' },
  { id: 'green-tea', name: '绿茶（冲泡液）', cat: 'snack', kcal: 1, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 2, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['儿茶素（EGCG）：抗氧化', '咖啡因：少量提神'], note: '每100ml冲泡液，几乎零热量；日常代替含糖饮料' },
  { id: 'cocoa-powder', name: '生可可粉（Cacao，无糖）', cat: 'snack', kcal: 350, protein: 20, fat: 13, carb: 45, fiber: 30, sodium: 20, vitFat: ['E'], vitWater: [], minerals: ['镁', '铁'], phytochem: ['黄烷醇：护血管、改善血流'], note: '选无糖纯可可粉，与香蕉/蛋白粉拌食；天然苦味，勿混入植脂末' },
  { id: 'spirulina', name: '螺旋藻（粉）', cat: 'snack', kcal: 290, protein: 57, fat: 3, carb: 24, fiber: 4, sodium: 600, vitFat: ['A', 'E'], vitWater: ['B1', 'B2', 'B12'], minerals: ['铁', '碘'], phytochem: ['藻蓝蛋白：强抗氧化、抗炎'], note: '植物性高蛋白+微量营养素密集；植物性B12人体利用率有限，不能替代动物源；碘高，甲亢者注意' },
  { id: 'chlorella', name: '小球藻（片）', cat: 'snack', kcal: 350, protein: 50, fat: 5, carb: 20, fiber: 10, sodium: 90, vitFat: ['A', 'E'], vitWater: ['B1', 'B2', '叶酸'], minerals: ['铁', '镁', '锌'], phytochem: ['叶绿素：帮助排毒代谢（传统认知）', 'CGF（小球藻生长因子）'], note: '细胞壁较硬，选破壁产品利于吸收；每日5-10g，随餐服用' },
  { id: 'glutamine-powder', name: '谷氨酰胺粉（每5g）', cat: 'snack', kcal: 20, protein: 4.9, fat: 0, carb: 0, fiber: 0, sodium: 2, vitFat: [], vitWater: [], minerals: [], note: '数据为每 5g 份：能量 83kJ、蛋白质等同物 4.9g、谷氨酰胺 3.9g、肽类 1g；常练后或睡前 5g 温水冲服；⚠ 各品牌配方不同，此为参考值，以产品包装营养表为准' },
  { id: 'energy-gummy', name: '能量软糖', cat: 'snack', kcal: 320, protein: 0, fat: 0, carb: 80, fiber: 0, sodium: 50, vitFat: [], vitWater: [], minerals: ['钠'], note: '耐力运动途中快速补糖，含游离糖，按需食用' },

  // ---- 酒精类（危害+热量标注，用户点名） ----
  { id: 'alcohol-pure', name: '酒精（纯乙醇）', cat: 'snack', kcal: 710, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 0, vitFat: [], vitWater: [], minerals: [], note: '1g 乙醇约 7kcal（每 100g≈127ml）；纯空热量几乎无营养。⚠ 过量饮酒伤肝（脂肪肝/肝硬化）、升血压与尿酸、抑制肌肉蛋白合成与深睡眠，健身大忌；驾车、服药期间绝对禁酒' },
  { id: 'beer', name: '啤酒（4%vol，100ml）', cat: 'snack', kcal: 43, protein: 0.4, fat: 0, carb: 3.5, fiber: 0, sodium: 5, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '低酒精度也有空热量，一瓶 500ml≈215kcal；⚠ 过量饮酒危害：伤肝、升尿酸（啤酒嘌呤+酒精双重）、干扰睡眠与睾酮，痛风者尤其注意' },
  { id: 'baijiu', name: '白酒（52度，100ml）', cat: 'snack', kcal: 290, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 0, vitFat: [], vitWater: [], minerals: [], note: '按酒精度估算（52%vol），一两（50ml）≈145kcal；高度酒热量密度极高。⚠ 烈性酒伤胃黏膜与肝脏，空腹勿饮，饮酒后禁驾驶' },
  { id: 'red-wine', name: '红酒（12%vol，100ml）', cat: 'snack', kcal: 80, protein: 0.1, fat: 0, carb: 2.5, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['白藜芦醇：抗氧化（含量极微）'], note: '含微量白藜芦醇，但酒精危害远超微量益处，勿以此为由饮酒；孕期绝对禁酒' },
  { id: 'huangjiu', name: '黄酒（15%vol，100ml）', cat: 'snack', kcal: 95, protein: 1.5, fat: 0, carb: 5, fiber: 0, sodium: 5, vitFat: [], vitWater: ['B1', 'B2'], minerals: ['钾'], note: '含糖与氨基酸，热量高于红酒；⚠ 药膳/料酒用途外，作饮品过量同样伤肝' },
  { id: 'jingjiu', name: '中国劲酒（经典瓶 125ml）', cat: 'snack', kcal: 240, protein: 0, fat: 0, carb: 12, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: [], note: '35%vol，含糖与中药浸出物；一瓶（125ml）约 240kcal，258ml/520ml 规格按比例估算。⚠ 药酒也是酒，不含治病功效，过量同样伤肝；服药期间、驾车前禁饮' },

  // ---- 常见饮品热量（参考蜜雪冰城，用户点名） ----
  { id: 'milk-tea-bubble', name: '珍珠奶茶（蜜雪冰城中杯 500ml）', cat: 'snack', kcal: 350, protein: 3, fat: 10, carb: 60, fiber: 0.5, sodium: 80, vitFat: [], vitWater: [], minerals: ['钙'], note: '参考蜜雪冰城常见杯型+默认全糖；实际随甜度/加料大幅浮动（少糖-30%、换椰果/无珍珠更低）。一杯≈一碗米饭热量，主要为游离糖，健身减脂期慎选' },
  { id: 'lemonade', name: '柠檬水（蜜雪冰城中杯 500ml）', cat: 'snack', kcal: 140, protein: 0, fat: 0, carb: 34, fiber: 0, sodium: 30, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '参考蜜雪冰城默认糖度；选少糖/无糖版本更低，含游离糖仍计入碳水，训练后补糖可选' },

  // ---- 健身补剂补档（鱼油/维D3/瓜氨酸） + 便携蛋白 ----
  { id: 'fish-oil', name: '鱼油（Omega-3）', cat: 'snack', kcal: 900, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 0, vitFat: ['A', 'D'], vitWater: [], minerals: ['硒'], note: '典型胶囊每粒1g含EPA约180mg/DHA约120mg、约9kcal；抗炎、护关节心血管、辅助睡眠与情绪。⚠ 各品牌浓度差异大，以包装为准；高剂量服前咨询（抗凝药物者尤其）' },
  { id: 'vitamin-d3', name: '维生素D3（补剂）', cat: 'snack', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 0, vitFat: ['D'], vitWater: [], minerals: ['钙'], note: '每粒典型1000-2000IU（25-50μg），脂溶性维生素本身无热量（软胶囊油载体约1-2kcal/粒）；晒不到太阳的健身者普遍建议补充，与钙同补助骨健康。⚠ 脂溶性不可过量，长期超量有中毒风险，各品牌以包装为准' },
  { id: 'citrulline-powder', name: '瓜氨酸粉（L-瓜氨酸）', cat: 'snack', kcal: 250, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 0, vitFat: [], vitWater: [], minerals: [], note: '游离氨基酸粉（不计入蛋白质），训练前30-60分钟3-6g冲水；体内转精氨酸促一氧化氮、提升泵感与耐力，与甜菜根粉（硝酸盐）作用协同。⚠ 各品牌纯度不同，以产品包装营养表为准' },

  // ---- 蛋白粉大类（市面平均参考值，用户点名；不标注任何品牌） ----
  { id: 'yeast-protein', name: '酵母蛋白粉', cat: 'snack', kcal: 380, protein: 70, fat: 2, carb: 15, fiber: 3, sodium: 250, vitFat: [], vitWater: ['B1', 'B2', 'B3', 'B6', '叶酸'], minerals: ['锌', '硒'], note: '酵母提取蛋白质，植物性，B族维生素丰富；⚠ 各品牌配方不同，此为市面平均参考值，以产品包装营养成分表为准' },
  { id: 'soy-protein', name: '大豆蛋白粉（浓缩）', cat: 'snack', kcal: 375, protein: 70, fat: 6, carb: 15, fiber: 5, sodium: 300, vitFat: [], vitWater: ['叶酸', 'B1'], minerals: ['铁', '钙', '镁'], phytochem: ['大豆异黄酮：植物雌激素样作用（对多数人安全性好，乳腺/前列腺病史者遵医嘱）'], note: '植物蛋白，含全部必需氨基酸（蛋氨酸偏低，可配谷物互补）；⚠ 各品牌配方不同，此为市面平均参考值，以产品包装营养成分表为准' },
  { id: 'soy-protein-isolate', name: '大豆分离蛋白粉', cat: 'snack', kcal: 370, protein: 85, fat: 1, carb: 5, fiber: 2, sodium: 400, vitFat: [], vitWater: [], minerals: ['铁', '钙'], note: '纯度更高的植物蛋白，碳水/脂肪更低，乳糖不耐者友好；⚠ 各品牌配方不同，此为市面平均参考值，以产品包装营养成分表为准' },
  { id: 'beef-protein', name: '牛肉蛋白粉', cat: 'snack', kcal: 400, protein: 88, fat: 2, carb: 2, fiber: 0, sodium: 350, vitFat: [], vitWater: ['B12', 'B3', 'B6'], minerals: ['铁', '锌'], note: '动物蛋白，天然含肌酸与BCAA，口感带牛肉味；⚠ 各品牌配方不同，此为市面平均参考值，以产品包装营养成分表为准' },
  { id: 'hydrolyzed-protein', name: '水解蛋白粉（水解乳清）', cat: 'snack', kcal: 390, protein: 85, fat: 2, carb: 3, fiber: 0, sodium: 400, vitFat: [], vitWater: [], minerals: ['钙'], note: '预水解小分子肽，吸收快、乳糖极低，价格较高；⚠ 各品牌配方不同，此为市面平均参考值，以产品包装营养成分表为准' },
  { id: 'milk-protein', name: '牛乳蛋白粉（乳清+酪蛋白复合）', cat: 'snack', kcal: 390, protein: 80, fat: 5, carb: 6, fiber: 0, sodium: 250, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '参考市面牛乳蛋白粉平均数据（不标注任何品牌），乳清+酪蛋白混合、吸收快慢兼备；⚠ 各品牌配方不同，此为典型参考值，以产品包装营养成分表为准' },

  // ---- 枣制品（用户点名；红枣干已在水果库） ----
  { id: 'candied-jujube', name: '蜜枣（糖渍）', cat: 'snack', kcal: 321, protein: 1.1, fat: 0.2, carb: 79, fiber: 1.6, sodium: 30, vitFat: [], vitWater: ['C'], minerals: ['钾', '铁'], note: '糖渍加工，糖分高，当甜味剂少量食用；控糖人群慎选' },
  { id: 'jujube-cake', name: '枣糕', cat: 'snack', kcal: 300, protein: 6, fat: 10, carb: 48, fiber: 2, sodium: 250, vitFat: [], vitWater: ['B1'], minerals: ['铁', '钾'], note: '红枣发糕类面点，含糖与油脂，当主食或加餐少量' },

  // ---- 用户点名补充：方便面 ----
  { id: 'instant-fried', name: '方便面（油炸款，干面块）', cat: 'snack', kcal: 472, protein: 9, fat: 21, carb: 60, fiber: 2, sodium: 1200, vitFat: [], vitWater: ['B1'], minerals: ['钠'], note: '面饼经油炸，脂肪约20%；调料包钠约1500-2000mg，建议只放一半料包、加蛋加菜平衡；偶尔应急，不建议当健身主食' },
  { id: 'instant-nonfried', name: '方便面（非油炸款，干面块）', cat: 'snack', kcal: 380, protein: 9, fat: 6, carb: 75, fiber: 2, sodium: 1000, vitFat: [], vitWater: ['B1'], minerals: ['钠'], note: '热风干燥，脂肪比油炸款低约70%；但钠仍高，依旧少放料包；荞麦面/乌冬干面同类' },

  // ---- 用户点名补充：零食/街头炸物 ----
  { id: 'tanghulu', name: '糖葫芦（山楂裹冰糖）', cat: 'snack', kcal: 159, protein: 0.5, fat: 0.2, carb: 40, fiber: 1, sodium: 3, vitFat: [], vitWater: ['C'], minerals: [], phytochem: ['山楂黄酮'], note: '糖衣约占一半重量，本质是裹糖水果；一串约100g=159kcal，主要是添加糖；蓝莓/葡萄/草莓款同理' },
  { id: 'soda-cracker-sugarfree', name: '苏打饼干（无糖）', cat: 'snack', kcal: 408, protein: 9, fat: 9, carb: 76, fiber: 3, sodium: 600, vitFat: [], vitWater: ['B1'], minerals: ['钠'], note: '发酵饼干，脂肪低于曲奇；但钠不低，"无糖"不等于低卡；胃酸多时2片应急可以，别当健康零食囤' },
  { id: 'soda-cracker-sugared', name: '苏打饼干（含糖甜味款）', cat: 'snack', kcal: 430, protein: 8, fat: 12, carb: 72, fiber: 2, sodium: 500, vitFat: [], vitWater: ['B1'], minerals: [], note: '奶盐/甜味苏打，糖油比原味多；配料表前几位常有精炼植物油与白砂糖' },
  { id: 'oreo', name: '奥利奥（原味夹心）', cat: 'snack', kcal: 484, protein: 5, fat: 20, carb: 70, fiber: 1.5, sodium: 400, vitFat: [], vitWater: ['B2'], minerals: ['铁'], note: '可可饼干+糖脂夹心；2片约29g=140kcal，几乎全是精制碳水+添加脂肪；"轻甜/薄脆"款热量接近' },
  { id: 'latiao', name: '辣条（面筋制品）', cat: 'snack', kcal: 450, protein: 10, fat: 25, carb: 45, fiber: 2, sodium: 2000, vitFat: [], vitWater: [], minerals: ['钠'], note: '高油高盐高钠代表，一包100g钠常超NRV的100%；偶尔解馋，吃完当天多喝水、别再吃咸的；儿童/高血压者少食' },
  { id: 'zhima-ye', name: '炸芝麻叶（皖北传统小吃）', cat: 'snack', kcal: 450, protein: 8, fat: 25, carb: 45, fiber: 3, sodium: 300, vitFat: [], vitWater: [], minerals: ['钙'], phytochem: ['芝麻素'], note: '皖北特产，嫩芝麻叶裹薄面糊油炸，形似树叶、薄脆如纸；下酒/茶点；油脂偏高，一把约30g=135kcal' },

  // ---- 用户点名补充 ----

  // ---- 用户点名补充：节令糕点 ----
  { id: 'yuebing-wuren', name: '五仁月饼（传统广式）', cat: 'snack', kcal: 416, protein: 8, fat: 16, carb: 60, fiber: 3, sodium: 280, vitFat: ['E'], vitWater: ['B1'], minerals: ['镁', '锌'], phytochem: ['坚果不饱和脂肪酸'], note: '一个约100g=416kcal，相当于2碗米饭；糖油混合，一天最多1/4个（约25g）配茶；坚果款比莲蓉/豆沙款多一点蛋白' },
  { id: 'yuebing-bingpi', name: '冰皮月饼', cat: 'snack', kcal: 250, protein: 5, fat: 8, carb: 40, fiber: 1, sodium: 150, vitFat: [], vitWater: ['B2'], minerals: ['钙'], note: '不烘烤、糯米冰皮，比传统月饼低约40%热量；但冷藏后糯米更难消化，一次1个（约60g）' },
  { id: 'yuebing-liulian', name: '榴莲月饼', cat: 'snack', kcal: 350, protein: 6, fat: 15, carb: 45, fiber: 2, sodium: 180, vitFat: [], vitWater: ['C', 'B6'], minerals: ['钾'], phytochem: ['榴莲酯类香气'], note: '榴莲本身高脂高糖，月饼馅再加油糖；一个约80g=280kcal；糖尿病/肥胖者浅尝' },
  { id: 'yuebing-lvdousha', name: '绿豆沙月饼', cat: 'snack', kcal: 380, protein: 6, fat: 12, carb: 60, fiber: 2, sodium: 200, vitFat: [], vitWater: ['B1'], minerals: ['钾'], phytochem: ['绿豆黄酮'], note: '绿豆沙加油加糖炒馅，虽叫绿豆但糖脂高；一个约100g=380kcal；选低糖/无蔗糖款' },
  { id: 'danhuang-su', name: '蛋黄酥', cat: 'snack', kcal: 450, protein: 8, fat: 20, carb: 60, fiber: 1.5, sodium: 260, vitFat: ['A'], vitWater: ['B2'], minerals: ['铁'], note: '酥皮+红豆沙+咸蛋黄，一个约60g=270kcal；脂肪主要来自酥皮黄油；配黑咖啡解腻' },
  { id: 'liulian-su', name: '榴莲酥', cat: 'snack', kcal: 420, protein: 6, fat: 18, carb: 58, fiber: 1.5, sodium: 200, vitFat: [], vitWater: ['C', 'B6'], minerals: ['钾'], note: '起酥皮+榴莲馅烘烤，一个约50g=210kcal；油炸/烘烤款脂肪略不同' },
  { id: 'lvdou-gao', name: '绿豆糕', cat: 'snack', kcal: 350, protein: 10, fat: 12, carb: 50, fiber: 2, sodium: 120, vitFat: [], vitWater: ['B1'], minerals: ['钾', '镁'], phytochem: ['绿豆黄酮'], note: '绿豆+糖+油脂蒸/压制；传统北派vs苏派差异大，苏派油更大；一块约50g=175kcal，配绿茶' },

  // ---- 用户点名补充 ----
  { id: 'zhu-roufu', name: '猪肉脯', cat: 'snack', kcal: 380, protein: 30, fat: 10, carb: 35, fiber: 0, sodium: 1500, vitFat: [], vitWater: ['B1'], minerals: ['铁', '锌'], note: '瘦肉经糖腌烘烤，蛋白高但糖与钠双高（约1500mg/100g）；一小包约30g=114kcal；追剧零食建议一次1-2小包，别整袋吃' },

  // ---- 用户点名补充：补剂 ----
  { id: 'weight-gainer', name: '增肌粉/增重粉（Weight Gainer，参考平均值）', cat: 'snack', kcal: 380, protein: 15, fat: 5, carb: 75, fiber: 2, sodium: 200, vitFat: [], vitWater: ['B族'], minerals: ['钙', '镁', '锌'], phytochem: [], note: '【重要】配方以高碳水（70-80%）+少量蛋白+益生菌为主，每份一勺（约100g干粉）380kcal，冲水后约600ml；更适合天生瘦、吃不下饭、训练量大的"瘦难长"人群；本就体脂偏高者喝了只会长肚子不长肌；参考市面常见产品平均值，具体品牌差异大，别当神药；训练后或加餐时用，别替代正餐' },

  // ---- 用户点名：常见市售零食 ----
  { id: 'babao-zhou', name: '八宝粥（罐装，含糖款）', cat: 'snack', kcal: 83, protein: 2.5, fat: 1.5, carb: 15, fiber: 1, sodium: 60, vitFat: [], vitWater: ['B1'], minerals: ['钾', '铁'], phytochem: ['豆类多酚'], note: '一罐360g约300kcal；配料=水+糯米+红豆+绿豆+花生+桂圆+糖；无糖款约70kcal/100g；练后应急碳水来源，但蛋白偏低；看配料表选"无添加蔗糖"款' },
  { id: 'wangzai-mantou', name: '旺仔小馒头', cat: 'snack', kcal: 380, protein: 8, fat: 8, carb: 70, fiber: 1, sodium: 200, vitFat: [], vitWater: ['B1'], minerals: ['钙'], note: '马铃薯粉+奶粉+糖烘烤，一口一个；一小袋30g约114kcal；儿童零食钠糖不低；别当健康食品' },
  { id: 'wahaha-biscuit', name: '娃哈哈夹心饼干', cat: 'snack', kcal: 450, protein: 6, fat: 18, carb: 65, fiber: 1, sodium: 300, vitFat: [], vitWater: [], minerals: [], note: '酥性饼干+糖油夹心，一包约100g=450kcal；与苏打饼干完全不同；看包装背面营养表，糖排在前几位的少买' },
  { id: 'chip-original', name: '薯片（原味，马铃薯切制油炸）', cat: 'snack', kcal: 536, protein: 7, fat: 35, carb: 53, fiber: 4, sodium: 530, vitFat: [], vitWater: ['C（少量）'], minerals: ['钾'], note: '100g=536kcal，一包70g约375kcal；脂肪主要来自棕榈油；选烘焙款（约470kcal）或小包装；别边刷手机边整袋吃' },
  { id: 'chip-tomato', name: '薯片（番茄味）', cat: 'snack', kcal: 510, protein: 6, fat: 28, carb: 62, fiber: 3, sodium: 750, vitFat: [], vitWater: [], minerals: [], note: '番茄粉+糖+盐调味，钠比原味更高（约750mg/100g）；一包70g约357kcal；注意钠摄入' },
  { id: 'chip-cucumber', name: '薯片（黄瓜/青柠味）', cat: 'snack', kcal: 490, protein: 6, fat: 25, carb: 62, fiber: 3, sodium: 650, vitFat: [], vitWater: [], minerals: [], note: '口味清爽但钠仍高；一包70g约343kcal；别因"黄瓜味"就觉得健康' },
  { id: 'shuidou-gao', name: '豌豆黄/豌豆脆', cat: 'snack', kcal: 380, protein: 12, fat: 5, carb: 70, fiber: 5, sodium: 300, vitFat: [], vitWater: ['B族'], minerals: ['钾', '铁'], phytochem: ['豌豆凝集素（煮熟破坏）'], note: '豌豆制品，比薯片蛋白高、脂肪低；但调味款盐糖仍高；一小包30g约114kcal' },

  // ---- 用户点名：市售零食 ----
  { id: 'wang-wang-snow', name: '旺旺雪饼', cat: 'snack', kcal: 480, protein: 6, fat: 20, carb: 70, fiber: 1, sodium: 300, vitFat: [], vitWater: ['B1'], minerals: ['铁'], note: '米饼表面糖霜+烘烤，一包54g约260kcal；比薯片脂肪略低但糖高；一片约15g=72kcal，别一次半包' },
  { id: 'wang-wang-mi', name: '旺旺仙贝/米饼', cat: 'snack', kcal: 450, protein: 6, fat: 18, carb: 68, fiber: 1, sodium: 400, vitFat: [], vitWater: ['B1'], minerals: [], note: '米饼+酱油调味，钠比雪饼高；一包约48g=216kcal；"米饼"听着健康，实际油盐糖不低' },
  { id: 'daliyuan-bread', name: '达利园小面包', cat: 'snack', kcal: 380, protein: 8, fat: 12, carb: 58, fiber: 1, sodium: 300, vitFat: [], vitWater: ['B1'], minerals: [], note: '软面包+奶油夹心，一个约30g=114kcal；早餐应急但糖油不低；看配料表前几位是小麦粉、植物油、白砂糖' },
  { id: 'haoliyou-pie', name: '好丽友派', cat: 'snack', kcal: 430, protein: 5, fat: 16, carb: 68, fiber: 1, sodium: 180, vitFat: [], vitWater: [], minerals: [], note: '蛋糕+巧克力涂层+棉花糖夹心，一个约28g=120kcal；脂肪与糖双高；当加餐别整盒吃' },
  { id: 'snickers', name: '士力架', cat: 'snack', kcal: 480, protein: 9, fat: 22, carb: 60, fiber: 2, sodium: 200, vitFat: [], vitWater: [], minerals: ['镁'], phytochem: ['可可多酚'], note: '花生+焦糖+牛轧糖+巧克力，一条51g约245kcal；"横扫饥饿"是营销，实际是高糖高脂应急能量棒；运动前1小时可半条，日常别当零食；减脂期慎入' },
  { id: 'quail-egg', name: '鹌鹑蛋（卤/熟）', cat: 'snack', kcal: 160, protein: 13, fat: 11, carb: 2, fiber: 0, sodium: 500, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['铁', '硒'], note: '1颗约10g=16kcal，10颗=160kcal；卤味款钠高（500mg/100g）；比鸡蛋小但营养密度接近，胆固醇含量与鸡蛋相当；3-5颗当加餐合适' },
  { id: 'beef-jerky', name: '牛肉干', cat: 'snack', kcal: 350, protein: 45, fat: 10, carb: 15, fiber: 0, sodium: 2000, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '【高蛋白但高钠】蛋白密度极高（45g/100g），是健身加餐好选择；但钠约2000mg/100g（一天上限2300mg），一次20-30g足够；选原味/风干款，别选蜜汁/沙嗲（糖更高）；一小包50g=175kcal' },
  { id: 'chicken-jerky', name: '鸡胸肉干', cat: 'snack', kcal: 300, protein: 50, fat: 3, carb: 15, fiber: 0, sodium: 1800, vitFat: [], vitWater: ['B6', 'B12'], minerals: ['锌'], note: '比牛肉干脂肪更低（3g vs 10g），蛋白更高；但口感更柴；钠仍高（1800mg/100g）；一次20-30g；看配料表选无添加蔗糖款；别整袋当饭吃' },
  { id: 'mao-er-ger-snack', name: '猫耳朵（零食）', cat: 'snack', kcal: 520, protein: 7, fat: 28, carb: 60, fiber: 1, sodium: 500, vitFat: [], vitWater: [], minerals: [], note: '【注意区分】这是零食版猫耳朵（油炸面制品，形似猫耳），不是山西面食猫耳朵；常见麻辣/牛排/蟹黄味；一小包60g=312kcal；油糖盐三高，追剧别停不下来' },
  { id: 'mahua', name: '麻花（油炸面食）', cat: 'snack', kcal: 480, protein: 9, fat: 22, carb: 62, fiber: 1, sodium: 400, vitFat: [], vitWater: ['B1'], minerals: [], note: '中国传统小吃，精制面粉搓成8字形油炸；天津大麻花/山西麻花/湖北麻花各有风味；一根约80g=384kcal；脂肪高但比薯片略低；甜/咸口味都有；配茶解腻；减脂期偶尔解馋' },
];