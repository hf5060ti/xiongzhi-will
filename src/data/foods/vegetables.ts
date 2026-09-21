// EXPORTS: VEGETABLES
// 蔬菜（叶菜 / 十字花科 / 根茎 / 菌菇 / 瓜茄 / 葱姜蒜），每 100g 生重参考值
import type { IFood } from './types';

export const VEGETABLES: IFood[] = [
  // ---- 叶菜 ----
  { id: 'spinach', name: '菠菜（生）', cat: 'veg', kcal: 23, protein: 2.9, fat: 0.4, carb: 3.6, fiber: 2.2, sodium: 79, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['铁', '镁'], phytochem: ['叶黄素 / 玉米黄质：过滤蓝光、保护视网膜', '硝酸盐：辅助血管舒张'], note: '草酸高，焯水后吃' },
  { id: 'bok-choy', name: '小白菜', cat: 'veg', kcal: 15, protein: 1.5, fat: 0.3, carb: 2.4, fiber: 1.2, sodium: 42, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙'] },
  { id: 'lettuce', name: '生菜', cat: 'veg', kcal: 15, protein: 1.4, fat: 0.2, carb: 2.9, fiber: 1.3, sodium: 28, vitFat: ['A', 'K'], vitWater: ['叶酸'], minerals: ['钾'] },
  { id: 'leaf-lettuce', name: '油麦菜', cat: 'veg', kcal: 15, protein: 1.4, fat: 0.4, carb: 2.1, fiber: 1.4, sodium: 80, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钙'] },
  { id: 'celery', name: '芹菜', cat: 'veg', kcal: 16, protein: 0.7, fat: 0.2, carb: 3, fiber: 1.6, sodium: 80, vitFat: ['K'], vitWater: [], minerals: ['钾'] },
  { id: 'chinese-chives', name: '韭菜', cat: 'veg', kcal: 25, protein: 2.4, fat: 0.4, carb: 4.5, fiber: 2.1, sodium: 8, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['铁'] },
  { id: 'water-spinach', name: '空心菜', cat: 'veg', kcal: 19, protein: 2.5, fat: 0.3, carb: 3.1, fiber: 1.7, sodium: 95, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '镁'] },
  { id: 'amaranth', name: '苋菜', cat: 'veg', kcal: 25, protein: 2.8, fat: 0.4, carb: 4.5, fiber: 2.2, sodium: 32, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '铁'] },
  { id: 'kale', name: '羽衣甘蓝', cat: 'veg', kcal: 49, protein: 4.3, fat: 0.9, carb: 8.8, fiber: 3.6, sodium: 38, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '镁'] },
  { id: 'chinese-kale', name: '芥蓝', cat: 'veg', kcal: 22, protein: 2.7, fat: 0.3, carb: 3.8, fiber: 1.9, sodium: 50, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙'] },
  { id: 'garland', name: '茼蒿', cat: 'veg', kcal: 21, protein: 1.9, fat: 0.3, carb: 3.9, fiber: 1.9, sodium: 60, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾'] },
  { id: 'baby-cabbage', name: '娃娃菜', cat: 'veg', kcal: 16, protein: 1.4, fat: 0.2, carb: 2.8, fiber: 1.2, sodium: 60, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾'] },

  // ---- 十字花科 ----
  { id: 'broccoli', name: '西兰花（生）', cat: 'veg', kcal: 34, protein: 2.8, fat: 0.4, carb: 6.6, fiber: 2.6, sodium: 33, vitFat: ['K'], vitWater: ['C', '叶酸'], minerals: ['钙'], phytochem: ['萝卜硫素：II 相解毒酶诱导剂，抗氧化抗癌研究热门', '吲哚-3-甲醇：调节雌激素代谢', '类黄酮：抗氧化'], note: '增肌期首选蔬菜；蒸/微波优于水煮，减少萝卜硫素流失' },
  { id: 'cauliflower', name: '菜花', cat: 'veg', kcal: 25, protein: 1.9, fat: 0.3, carb: 5, fiber: 2, sodium: 30, vitFat: ['K'], vitWater: ['C', '叶酸'], minerals: ['钾'], phytochem: ['萝卜硫素（含量略低于西兰花）'] },
  { id: 'purple-cabbage', name: '紫包菜（生）', cat: 'veg', kcal: 31, protein: 1.4, fat: 0.2, carb: 7, fiber: 2.5, sodium: 27, vitFat: ['K'], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素：强抗氧化、抗炎、保护血管内皮', '吲哚-3-甲醇：十字花科共有的植物化学物', '维 C：水溶性，建议生食或短炒并配水'], note: '富含花青素，水溶性营养为主' },
  { id: 'cabbage', name: '卷心菜', cat: 'veg', kcal: 25, protein: 1.3, fat: 0.1, carb: 5.8, fiber: 2.5, sodium: 18, vitFat: ['K'], vitWater: ['C', '叶酸'], minerals: ['钾'] },
  { id: 'napa-cabbage', name: '大白菜', cat: 'veg', kcal: 20, protein: 1.2, fat: 0.2, carb: 4.3, fiber: 1.6, sodium: 65, vitFat: ['K'], vitWater: ['C', '叶酸'], minerals: ['钾'] },
  { id: 'mustard-green', name: '芥菜', cat: 'veg', kcal: 27, protein: 2.8, fat: 0.3, carb: 4.5, fiber: 2.4, sodium: 50, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙'] },
  { id: 'arugula', name: '芝麻菜', cat: 'veg', kcal: 25, protein: 2.6, fat: 0.7, carb: 3.7, fiber: 1.6, sodium: 27, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙'] },
  { id: 'radish-leaves', name: '萝卜缨', cat: 'veg', kcal: 28, protein: 2.6, fat: 0.4, carb: 4.9, fiber: 2.2, sodium: 60, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '铁'] },

  // ---- 根茎 ----
  { id: 'carrot', name: '胡萝卜（生）', cat: 'veg', kcal: 41, protein: 0.9, fat: 0.2, carb: 10, fiber: 2.8, sodium: 69, vitFat: ['A', 'K'], vitWater: ['B6'], minerals: ['钾'], phytochem: ['β-胡萝卜素：在体内转维 A，护眼、皮肤黏膜健康', 'α-胡萝卜素 / 叶黄素：抗氧化'], note: 'β-胡萝卜素需脂肪同食吸收（同餐 1–2g 油）' },
  { id: 'white-radish', name: '白萝卜', cat: 'veg', kcal: 18, protein: 0.7, fat: 0.1, carb: 4.1, fiber: 1.6, sodium: 21, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'lotus-root', name: '莲藕', cat: 'veg', kcal: 73, protein: 1.9, fat: 0.2, carb: 16.4, fiber: 1.6, sodium: 40, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'burdock', name: '牛蒡', cat: 'veg', kcal: 72, protein: 1.8, fat: 0.2, carb: 17.5, fiber: 3.3, sodium: 5, vitFat: [], vitWater: ['C', 'B6'], minerals: ['钾'], note: '膳食纤维丰富' },
  { id: 'asparagus', name: '芦笋', cat: 'veg', kcal: 20, protein: 2.2, fat: 0.1, carb: 3.9, fiber: 2.1, sodium: 2, vitFat: ['K'], vitWater: ['叶酸'], minerals: ['钾'] },
  { id: 'bamboo-shoot', name: '竹笋', cat: 'veg', kcal: 23, protein: 2.6, fat: 0.3, carb: 3.6, fiber: 2.3, sodium: 4, vitFat: [], vitWater: ['B6'], minerals: ['钾'] },

  // ---- 菌菇 ----
  { id: 'shiitake', name: '香菇（鲜）', cat: 'veg', kcal: 26, protein: 2.2, fat: 0.3, carb: 5.2, fiber: 2.5, sodium: 3, vitFat: ['D'], vitWater: ['B2', 'B3'], minerals: ['硒'] },
  { id: 'white-mushroom', name: '蘑菇（鲜）', cat: 'veg', kcal: 22, protein: 3.1, fat: 0.3, carb: 3.3, fiber: 1, sodium: 9, vitFat: ['D'], vitWater: ['B2', 'B3'], minerals: ['硒'] },
  { id: 'enoki', name: '金针菇', cat: 'veg', kcal: 32, protein: 2.4, fat: 0.4, carb: 6, fiber: 2.7, sodium: 3, vitFat: [], vitWater: ['B3'], minerals: ['钾'] },
  { id: 'king-oyster', name: '杏鲍菇', cat: 'veg', kcal: 35, protein: 1.8, fat: 0.1, carb: 8, fiber: 2.4, sodium: 4, vitFat: ['D'], vitWater: ['B3'], minerals: ['钾'] },
  { id: 'black-fungus', name: '木耳（水发）', cat: 'veg', kcal: 27, protein: 1.5, fat: 0.2, carb: 6, fiber: 2.6, sodium: 9, vitFat: ['D'], vitWater: [], minerals: ['铁'], note: '水发后热量低，富含胶质' },
  { id: 'white-fungus', name: '银耳（水发）', cat: 'veg', kcal: 25, protein: 1, fat: 0.1, carb: 6.4, fiber: 2.4, sodium: 8, vitFat: [], vitWater: [], minerals: ['钾'] },

  // ---- 瓜茄 ----
  { id: 'tomato', name: '番茄（生）', cat: 'veg', kcal: 18, protein: 0.9, fat: 0.2, carb: 3.9, fiber: 1.2, sodium: 5, vitFat: ['K'], vitWater: ['C'], minerals: ['钾'], phytochem: ['番茄红素：抗氧化、研究提示对男性前列腺健康有益，也有助于皮肤抗紫外线损伤', 'β-胡萝卜素 / 叶黄素：护眼', '谷胱甘肽：肝脏解毒底物'], note: '番茄红素加热+油脂吸收更好（番茄炒蛋优于生吃）' },
  { id: 'cucumber', name: '黄瓜', cat: 'veg', kcal: 15, protein: 0.65, fat: 0.1, carb: 3.6, fiber: 0.5, sodium: 2, vitFat: ['K'], vitWater: [], minerals: ['钾'] },
  { id: 'eggplant', name: '茄子', cat: 'veg', kcal: 25, protein: 1, fat: 0.2, carb: 6, fiber: 3, sodium: 2, vitFat: [], vitWater: ['B6'], minerals: ['钾'], note: '吸油，清蒸或烤更佳' },
  { id: 'green-pepper', name: '青椒', cat: 'veg', kcal: 20, protein: 1, fat: 0.2, carb: 4.6, fiber: 1.7, sodium: 3, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'bell-pepper-red', name: '彩椒（红）', cat: 'veg', kcal: 31, protein: 1, fat: 0.3, carb: 6, fiber: 2.1, sodium: 4, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['辣椒红素：类胡萝卜素抗氧化', '维 C：含量远超柑橘，生吃保留最好'], note: '维C含量极高' },
  { id: 'zucchini', name: '西葫芦', cat: 'veg', kcal: 17, protein: 1.2, fat: 0.3, carb: 3.1, fiber: 1, sodium: 8, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'wax-gourd', name: '冬瓜', cat: 'veg', kcal: 13, protein: 0.4, fat: 0.2, carb: 3, fiber: 1.1, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'bitter-melon', name: '苦瓜', cat: 'veg', kcal: 19, protein: 1, fat: 0.1, carb: 4.3, fiber: 1.6, sodium: 4, vitFat: [], vitWater: ['C'], minerals: ['钾'] },

  // ---- 葱姜蒜 ----
  { id: 'onion', name: '洋葱', cat: 'veg', kcal: 40, protein: 1.1, fat: 0.1, carb: 9, fiber: 1.7, sodium: 4, vitFat: [], vitWater: ['B6', 'C'], minerals: ['钾'], phytochem: ['槲皮素：类黄酮，抗过敏、抗炎、改善血管内皮', '含硫化合物：洋葱素，研究提示辅助调节血脂'] },
  { id: 'garlic', name: '大蒜', cat: 'veg', kcal: 149, protein: 6.4, fat: 0.5, carb: 33, fiber: 2.1, sodium: 17, vitFat: [], vitWater: ['B6', 'C'], minerals: ['硒'], phytochem: ['大蒜素（Allicin）：切开静置 10 分钟再加热活性最强，抗菌、辅助降血压', '含硫化合物：辅助调节血脂、血小板聚集'] },
  { id: 'ginger', name: '姜', cat: 'veg', kcal: 80, protein: 1.8, fat: 0.8, carb: 18, fiber: 2, sodium: 13, vitFat: [], vitWater: ['B6'], minerals: ['钾'], phytochem: ['姜辣素（Gingerol）：抗炎、缓解运动后肌肉酸痛、促消化'] },
  { id: 'scallion', name: '葱', cat: 'veg', kcal: 33, protein: 1.8, fat: 0.3, carb: 7.3, fiber: 2.6, sodium: 16, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'beetroot', name: '甜菜根（生）', cat: 'veg', kcal: 43, protein: 1.6, fat: 0.2, carb: 9.6, fiber: 2.8, sodium: 78, vitFat: ['K'], vitWater: ['叶酸'], minerals: ['钾', '铁'], phytochem: ['硝酸盐：在体内转亚硝酸盐→一氧化氮，扩张血管、降低血压、提升高强度运动耐力', '甜菜红素：强抗氧化、抗炎'], note: '富含硝酸盐，扩张血管、提升训练耐力（浓缩成粉效果更强）' },
];
