// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: VEGETABLES
// 蔬菜（叶菜 / 十字花科 / 根茎 / 菌菇 / 瓜茄 / 葱姜蒜），每 100g 生重参考值
import type { IFood } from './types';

export const VEGETABLES: IFood[] = [
  // ---- 叶菜 ----
  { id: 'spinach', name: '菠菜（生）', cat: 'veg', kcal: 23, protein: 2.9, fat: 0.4, carb: 3.6, fiber: 2.2, sodium: 79, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['铁', '镁'], phytochem: ['叶黄素 / 玉米黄质：过滤蓝光、保护视网膜', '硝酸盐：辅助血管舒张'], note: '草酸高，焯水后吃' },
  { id: 'bok-choy', name: '上海青（小白菜/青江菜）', cat: 'veg', kcal: 15, protein: 1.5, fat: 0.3, carb: 2.4, fiber: 1.2, sodium: 42, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙'], note: '即青梗小白菜，焯水快炒皆可；维生素A/K 脂溶性，同餐配少量油吸收更好' },
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
  { id: 'asparagus', name: '芦笋', cat: 'veg', kcal: 20, protein: 2.2, fat: 0.1, carb: 3.9, fiber: 2.1, sodium: 2, vitFat: ['K'], vitWater: ['叶酸'], minerals: ['钾'], phytochem: ['天门冬酰胺（鲜味来源）', '谷胱甘肽：抗氧化'], note: '低热量高叶酸；嘌呤中等（约 50mg/100g，属中嘌呤菜），痛风急性期少吃' },
  { id: 'bamboo-shoot', name: '竹笋（春笋/冬笋）', cat: 'veg', kcal: 23, protein: 2.6, fat: 0.3, carb: 3.6, fiber: 2.3, sodium: 4, vitFat: [], vitWater: ['B6'], minerals: ['钾'], phytochem: ['膳食纤维（木质素/半纤维素）', '酪氨酸（鲜味前体）'], note: '低嘌呤（<30mg/100g，痛风友好，卫健委 2024 食养指南归入低嘌呤）；粗纤维丰富、饱腹感强；含草酸与微量氰苷，焯水 5–10 分钟去涩去毒后再烹饪；肠胃敏感者焯后吃' },

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

  // ---- 公开食物成分数据扩充（54 条）：每 100g 参考值 ----
  { id: 'water-bamboo', name: '茭白', cat: 'veg', kcal: 23, protein: 1.2, fat: 0.2, carb: 4.4, fiber: 1.9, sodium: 6, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'stem-lettuce', name: '莴笋', cat: 'veg', kcal: 15, protein: 1, fat: 0.1, carb: 2.8, fiber: 0.6, sodium: 36, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'chayote', name: '佛手瓜', cat: 'veg', kcal: 17, protein: 1.2, fat: 0.1, carb: 3.4, fiber: 1.2, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'loofah', name: '丝瓜', cat: 'veg', kcal: 20, protein: 1, fat: 0.2, carb: 4.2, fiber: 0.6, sodium: 3.7, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'okra', name: '秋葵', cat: 'veg', kcal: 37, protein: 2, fat: 0.1, carb: 7.5, fiber: 3.9, sodium: 9, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '镁', '钾'], phytochem: ['黏液多糖（果胶/黏蛋白）：可溶性纤维，延缓餐后血糖上升', '类黄酮：抗氧化'], note: '低嘌呤；黏液是可溶性纤维，对血糖友好；焯水后黏液保留更多' },
  { id: 'cherry-tomato', name: '圣女果', cat: 'veg', kcal: 25, protein: 1, fat: 0.2, carb: 5.8, fiber: 1.5, sodium: 5, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'green-bean', name: '四季豆', cat: 'veg', kcal: 31, protein: 2, fat: 0.4, carb: 5.7, fiber: 1.5, sodium: 8.6, vitFat: [], vitWater: ['B1', 'C'], minerals: ['钾'], note: '必须彻底加热后食用' },
  { id: 'long-bean', name: '豇豆', cat: 'veg', kcal: 34, protein: 2.9, fat: 0.3, carb: 6.7, fiber: 2.3, sodium: 4.6, vitFat: [], vitWater: ['B1', 'C'], minerals: ['钾'] },
  { id: 'snow-pea', name: '荷兰豆', cat: 'veg', kcal: 30, protein: 2.5, fat: 0.3, carb: 4.9, fiber: 1.4, sodium: 8, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'soybean-sprout', name: '黄豆芽', cat: 'veg', kcal: 44, protein: 4.5, fat: 1.6, carb: 4.5, fiber: 1.5, sodium: 7.2, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'mung-bean-sprout', name: '绿豆芽', cat: 'veg', kcal: 18, protein: 2.1, fat: 0.1, carb: 2.9, fiber: 0.8, sodium: 4.4, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'garlic-sprout', name: '蒜苗', cat: 'veg', kcal: 37, protein: 2.1, fat: 0.4, carb: 8, fiber: 1.8, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'garlic-sprout-arrow', name: '蒜薹', cat: 'veg', kcal: 61, protein: 2, fat: 0.1, carb: 15.4, fiber: 2.5, sodium: 3.8, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'leek-yellow', name: '韭黄', cat: 'veg', kcal: 22, protein: 1.9, fat: 0.2, carb: 4, fiber: 1.2, sodium: 5, vitFat: [], vitWater: ['C'], minerals: [] },
  { id: 'coriander', name: '香菜', cat: 'veg', kcal: 33, protein: 1.8, fat: 0.4, carb: 6.9, fiber: 1.2, sodium: 48, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾', '钙'] },
  { id: 'fennel', name: '茴香', cat: 'veg', kcal: 24, protein: 2.5, fat: 0.4, carb: 4.2, fiber: 1.6, sodium: 186, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钙', '钾'] },
  { id: 'bottle-gourd', name: '葫芦', cat: 'veg', kcal: 14, protein: 0.7, fat: 0.1, carb: 3.2, fiber: 0.8, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'brussels-sprouts', name: '抱子甘蓝', cat: 'veg', kcal: 43, protein: 3.4, fat: 0.3, carb: 9, fiber: 3.8, sodium: 25, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾', '钙'] },
  { id: 'rape', name: '油菜', cat: 'veg', kcal: 25, protein: 1.8, fat: 0.5, carb: 3.8, fiber: 1.1, sodium: 55.8, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '钾'] },
  { id: 'shepherd-purse', name: '荠菜', cat: 'veg', kcal: 27, protein: 2.9, fat: 0.4, carb: 4.7, fiber: 1.7, sodium: 31.6, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钙', '钾'] },
  { id: 'pea-shoot', name: '豌豆苗', cat: 'veg', kcal: 34, protein: 4.9, fat: 0.8, carb: 4.4, fiber: 1.9, sodium: 18, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾', '镁'] },
  { id: 'sweet-potato-leaf', name: '红薯叶', cat: 'veg', kcal: 30, protein: 2.8, fat: 0.4, carb: 5, fiber: 2.5, sodium: 10, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '钾'] },
  { id: 'choy-sum', name: '菜心', cat: 'veg', kcal: 24, protein: 2.2, fat: 0.4, carb: 3.2, fiber: 1.6, sodium: 60, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '钾'] },
  { id: 'malabar-spinach', name: '木耳菜', cat: 'veg', kcal: 24, protein: 1.7, fat: 0.3, carb: 3.5, fiber: 1.4, sodium: 40, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钙', '钾'] },
  { id: 'purslane', name: '马齿苋', cat: 'veg', kcal: 28, protein: 2.3, fat: 0.5, carb: 4.9, fiber: 2.3, sodium: 46, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['镁', '钾'], note: '含植物性 ω-3 脂肪酸' },
  { id: 'dandelion-leaf', name: '蒲公英叶', cat: 'veg', kcal: 35, protein: 2.7, fat: 0.6, carb: 6, fiber: 2.5, sodium: 76, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钙', '钾'] },
  { id: 'endive', name: '苦菊', cat: 'veg', kcal: 17, protein: 1.5, fat: 0.3, carb: 3, fiber: 1.5, sodium: 20, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'turnip', name: '芜菁', cat: 'veg', kcal: 34, protein: 1.3, fat: 0.2, carb: 7.7, fiber: 1.4, sodium: 30, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'kohlrabi', name: '苤蓝', cat: 'veg', kcal: 30, protein: 1.5, fat: 0.2, carb: 6.4, fiber: 1.6, sodium: 30, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'artichoke', name: '洋蓟', cat: 'veg', kcal: 47, protein: 3.3, fat: 0.2, carb: 10.5, fiber: 5.4, sodium: 94, vitFat: ['K'], vitWater: ['C', '叶酸'], minerals: ['镁', '钾'] },
  { id: 'oyster-mushroom', name: '平菇', cat: 'veg', kcal: 20, protein: 1.9, fat: 0.3, carb: 4.6, fiber: 2.3, sodium: 8, vitFat: [], vitWater: ['B1', 'B3'], minerals: ['钾', '锌'] },
  { id: 'straw-mushroom', name: '草菇', cat: 'veg', kcal: 23, protein: 2.7, fat: 0.2, carb: 4.3, fiber: 1.6, sodium: 73, vitFat: [], vitWater: ['B2'], minerals: ['钾'] },
  { id: 'shimeji', name: '蟹味菇', cat: 'veg', kcal: 22, protein: 2.5, fat: 0.3, carb: 4, fiber: 2, sodium: 5, vitFat: [], vitWater: ['B1', 'B3'], minerals: ['钾', '锌'] },
  { id: 'shiitake-dry', name: '香菇（干）', cat: 'veg', kcal: 274, protein: 20, fat: 1.2, carb: 61.7, fiber: 31.6, sodium: 11, vitFat: ['D'], vitWater: ['B1', 'B3'], minerals: ['硒', '钾'] },
  { id: 'button-mushroom-fresh', name: '口蘑（鲜）', cat: 'veg', kcal: 44, protein: 3.6, fat: 0.5, carb: 9.6, fiber: 3.1, sodium: 6, vitFat: [], vitWater: ['B1', 'B3'], minerals: ['钾', '硒'] },
  { id: 'tea-tree-mushroom-dry', name: '茶树菇（干）', cat: 'veg', kcal: 309, protein: 23.1, fat: 2.6, carb: 56.1, fiber: 15.4, sodium: 26, vitFat: ['D'], vitWater: ['B1', 'B3'], minerals: ['钾', '铁'] },
  { id: 'agaric-dry', name: '黑木耳（干）', cat: 'veg', kcal: 205, protein: 12.1, fat: 1.5, carb: 65.6, fiber: 29.9, sodium: 48, vitFat: ['K'], vitWater: ['B1', 'B2'], minerals: ['铁', '钙'], note: '干品需泡发后食用' },
  { id: 'water-chestnut', name: '荸荠', cat: 'veg', kcal: 61, protein: 1.2, fat: 0.2, carb: 14.2, fiber: 1.1, sodium: 15.7, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'lily-bulb', name: '百合（鲜）', cat: 'veg', kcal: 162, protein: 3.2, fat: 0.1, carb: 38.8, fiber: 1.7, sodium: 6.7, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'water-caltrop', name: '菱角', cat: 'veg', kcal: 98, protein: 3.6, fat: 0.5, carb: 24, fiber: 1.7, sodium: 3.6, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'winter-shoot', name: '冬笋', cat: 'veg', kcal: 40, protein: 4.1, fat: 0.1, carb: 6.5, fiber: 0.8, sodium: 0.4, vitFat: [], vitWater: ['B1', 'B3'], minerals: ['钾'] },
  { id: 'toon-sprout', name: '香椿', cat: 'veg', kcal: 47, protein: 1.7, fat: 0.4, carb: 10.9, fiber: 1.8, sodium: 4.6, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], note: '亚硝酸盐较高，建议焯水后食用' },
  { id: 'pickled-mustard', name: '榨菜', cat: 'veg', kcal: 29, protein: 2.2, fat: 0.3, carb: 6.5, fiber: 2.1, sodium: 4252, vitFat: [], vitWater: [], minerals: ['钾'], note: '高钠，控盐人群慎用' },
  { id: 'radish-heart', name: '心里美萝卜', cat: 'veg', kcal: 26, protein: 0.9, fat: 0.1, carb: 5.5, fiber: 1, sodium: 50, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'radish-purple', name: '紫萝卜（紫皮/紫肉）', cat: 'veg', kcal: 22, protein: 0.8, fat: 0.1, carb: 4.8, fiber: 1.5, sodium: 45, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素：抗氧化、抗炎'], note: '与心里美萝卜相近但果肉为紫红色，可生食/凉拌' },
  { id: 'radish-green', name: '青萝卜', cat: 'veg', kcal: 29, protein: 1.3, fat: 0.2, carb: 6.6, fiber: 1.2, sodium: 60, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'radish-cherry', name: '樱桃萝卜', cat: 'veg', kcal: 20, protein: 0.9, fat: 0.1, carb: 4, fiber: 1, sodium: 40, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'bell-pepper-yellow', name: '彩椒（黄）', cat: 'veg', kcal: 26, protein: 1, fat: 0.2, carb: 6, fiber: 1.7, sodium: 5, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'chili-red', name: '红尖椒', cat: 'veg', kcal: 32, protein: 1.3, fat: 0.4, carb: 6, fiber: 2.1, sodium: 9, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '含辣椒素，胃部敏感者慎食' },
  { id: 'onion-red', name: '紫洋葱', cat: 'veg', kcal: 40, protein: 1.1, fat: 0.2, carb: 9.3, fiber: 1.7, sodium: 4, vitFat: ['A'], vitWater: ['C', 'B6'], minerals: ['钾', '硒'] },
  { id: 'tomato-cooked', name: '番茄（熟/炖）', cat: 'veg', kcal: 17, protein: 0.9, fat: 0.2, carb: 3.5, fiber: 1, sodium: 25, vitFat: ['K'], vitWater: ['C'], minerals: ['钾'], note: '加热后番茄红素更易吸收' },
  { id: 'broccoli-cooked', name: '西兰花（熟）', cat: 'veg', kcal: 35, protein: 2.4, fat: 0.4, carb: 7.2, fiber: 3.3, sodium: 40, vitFat: ['K'], vitWater: ['C', '叶酸'], minerals: ['钾'] },
  { id: 'spinach-cooked', name: '菠菜（熟）', cat: 'veg', kcal: 23, protein: 3, fat: 0.3, carb: 3.6, fiber: 2.2, sodium: 70, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['镁', '铁', '钾'] },
  { id: 'carrot-cooked', name: '胡萝卜（熟）', cat: 'veg', kcal: 35, protein: 0.8, fat: 0.2, carb: 8.2, fiber: 2.8, sodium: 60, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'pickled-cabbage', name: '酸白菜', cat: 'veg', kcal: 21, protein: 1, fat: 0.2, carb: 4, fiber: 1.2, sodium: 750, vitFat: [], vitWater: ['C'], minerals: [], note: '高钠，注意控盐' },

  // ---- 蔬菜扩充（稀有/特色叶菜） ----
  { id: 'ice-plant', name: '冰菜', cat: 'veg', kcal: 15, protein: 1, fat: 0.2, carb: 2.5, fiber: 1, sodium: 60, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], note: '表面盐囊泡自带咸味，凉拌口感脆' },
  { id: 'perilla', name: '紫苏叶', cat: 'veg', kcal: 30, protein: 3, fat: 0.5, carb: 5, fiber: 2, sodium: 3, vitFat: ['A', 'K'], vitWater: ['C', 'B2'], minerals: ['钙', '铁'], phytochem: ['紫苏醛', '花青素'], note: '生鱼片伴侣；紫苏醛抑菌，花青素抗炎' },
  { id: 'fish-mint', name: '鱼腥草（折耳根）', cat: 'veg', kcal: 20, protein: 2, fat: 0.3, carb: 3, fiber: 1.5, sodium: 40, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['鱼腥草素'], note: '云贵特色；鱼腥草素有抑菌作用，性寒' },
  { id: 'wolfberry-leaf', name: '枸杞叶', cat: 'veg', kcal: 35, protein: 4, fat: 0.5, carb: 5, fiber: 1.5, sodium: 30, vitFat: ['A'], vitWater: ['C', 'B2'], minerals: ['钙', '铁'], note: '枸杞叶猪肝汤经典；叶酸丰富' },
  { id: 'celtuce-leaf', name: '莴笋叶', cat: 'veg', kcal: 22, protein: 1.5, fat: 0.2, carb: 4, fiber: 1.5, sodium: 40, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾', '钙'], note: '莴笋叶比茎营养更高，别扔' },
  { id: 'chinese-leek-flower', name: '韭花', cat: 'veg', kcal: 35, protein: 2.5, fat: 0.4, carb: 6, fiber: 2, sodium: 20, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], note: '韭花酱佐餐经典' },
  { id: 'baby-corn', name: '玉米笋', cat: 'veg', kcal: 26, protein: 1.9, fat: 0.2, carb: 5.8, fiber: 1.6, sodium: 5, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '嫩玉米幼穗，低卡脆甜' },
  { id: 'taro-stem', name: '芋荷（芋梗）', cat: 'veg', kcal: 30, protein: 1, fat: 0.2, carb: 6, fiber: 1.2, sodium: 20, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '客家酸芋荷开胃' },

  // ---- 蔬菜扩充二（功能标注 / 更多品种） ----
  { id: 'beetroot-powder', name: '甜菜根粉', cat: 'veg', kcal: 350, protein: 12, fat: 0.5, carb: 75, fiber: 20, sodium: 280, vitFat: [], vitWater: ['C', '叶酸'], minerals: ['钾', '铁'], phytochem: ['硝酸盐：体内转一氧化氮，扩张血管、提升血流与运动耐力', '甜菜红素：抗氧化'], note: '浓缩硝酸盐粉，训练前 30-60 分钟 5-10g 冲水，提升泵感与耐力' },
  { id: 'rapeseed-bud', name: '红菜苔', cat: 'veg', kcal: 32, protein: 2, fat: 0.4, carb: 5, fiber: 1.6, sodium: 30, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钙', '铁'], note: '湖北冬令菜，腊肉同炒经典' },
  { id: 'mustard-tuber', name: '芥菜头（芥菜疙瘩）', cat: 'veg', kcal: 27, protein: 1.5, fat: 0.2, carb: 5, fiber: 1.5, sodium: 40, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], note: '常腌制成咸菜，鲜食脆爽' },
  { id: 'nori-seaweed', name: '紫菜（干）', cat: 'veg', kcal: 250, protein: 26, fat: 1.1, carb: 44, fiber: 21, sodium: 360, vitFat: ['A', 'K'], vitWater: ['B12（争议）', 'C'], minerals: ['碘', '铁', '钙'], note: '碘极高，甲亢/桥本患者遵医嘱；含天然谷氨酸提鲜' },
  { id: 'kelp', name: '海带（鲜）', cat: 'veg', kcal: 43, protein: 1.8, fat: 0.2, carb: 9, fiber: 2.7, sodium: 100, vitFat: ['K'], vitWater: ['B2'], minerals: ['碘', '钙', '镁'], note: '碘与褐藻胶丰富，甲状腺疾病遵医嘱' },
  { id: 'kale-powder', name: '羽衣甘蓝粉', cat: 'veg', kcal: 350, protein: 28, fat: 4, carb: 50, fiber: 25, sodium: 200, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '铁'], phytochem: ['硫代葡萄糖苷：十字花科抗氧化与护肝成分'], note: '浓缩蔬菜粉，每日 5-10g 冲水/拌酸奶补绿叶菜；不能替代新鲜蔬菜' },

  // ---- 腌菜/咸菜/藻类苗（用户点名，数据均可查证） ----
  { id: 'salted-vegetable', name: '咸菜（腌雪里蕻/盐渍菜）', cat: 'veg', kcal: 25, protein: 2, fat: 0.3, carb: 4.5, fiber: 1.5, sodium: 4300, vitFat: [], vitWater: [], minerals: ['钾'], note: '高钠！腌渍菜，维生素损失大，当调味佐餐少量用；控盐/高血压者慎食' },
  { id: 'suan-cai', name: '酸菜（渍白菜）', cat: 'veg', kcal: 15, protein: 1.2, fat: 0.2, carb: 2.8, fiber: 1.2, sodium: 700, vitFat: [], vitWater: ['C（部分流失）'], minerals: ['钾'], note: '乳酸发酵菜，钠偏高；东北酸菜炖菜经典；亚硝酸盐在腌制初期偏高，腌透后再食' },
  { id: 'pao-cai', name: '泡菜（四川泡菜/韩式泡菜）', cat: 'veg', kcal: 25, protein: 1.5, fat: 0.3, carb: 5, fiber: 1.5, sodium: 900, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['乳酸菌代谢物：发酵益生，促进肠道菌群'], note: '发酵菜，钠偏高；含益生菌但腌制期亚硝酸盐先升后降，泡透再食更稳妥' },
  { id: 'meigan-cai', name: '梅干菜（霉干菜）', cat: 'veg', kcal: 250, protein: 18, fat: 1.5, carb: 40, fiber: 20, sodium: 3500, vitFat: [], vitWater: [], minerals: ['钾', '铁'], note: '芥菜/雪里蕻腌晒而成，干品高纤维高钠，用前泡水去盐；梅菜扣肉经典' },
  { id: 'kelp-sprout', name: '海带苗（嫩海带/裙带苗）', cat: 'veg', kcal: 45, protein: 1.8, fat: 0.3, carb: 8, fiber: 3.5, sodium: 700, vitFat: ['K'], vitWater: ['B2'], minerals: ['碘', '钙', '镁'], note: '比老海带更嫩滑，凉拌/煮汤；碘高，甲状腺疾病遵医嘱；市售多为盐渍，用前漂洗去盐' },

  // ---- 豆荚类蔬菜（用户点名） ----
  { id: 'hyacinth-bean-pod', name: '扁豆荚（鲜嫩荚）', cat: 'veg', kcal: 37, protein: 2.8, fat: 0.4, carb: 6.5, fiber: 2.2, sodium: 5, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾', '镁'], note: '嫩扁豆荚当蔬菜，干扁豆粒另列（豆类分类）；⚠ 生荚含凝集素/皂苷，必须彻底烧熟煮透后食用' },

  // ---- 用户点名补充 ----
  { id: 'kale', name: '羽衣甘蓝', cat: 'veg', kcal: 49, protein: 4.3, fat: 0.9, carb: 9, fiber: 4.1, sodium: 50, vitFat: ['A', 'K'], vitWater: ['C', 'B2', '叶酸'], minerals: ['钙', '钾', '镁'], phytochem: ['萝卜硫素', '叶黄素', '花青素'], note: '每100g钙约150mg、维C约120mg，密度极高；生食较硬，建议焯水或做沙拉轻揉；超级食物代表' },

  // ---- 用户点名补充 ----
  { id: 'garlic', name: '大蒜（生）', cat: 'veg', kcal: 149, protein: 6.4, fat: 0.5, carb: 33, fiber: 2.1, sodium: 17, vitFat: [], vitWater: ['C', 'B6'], minerals: ['锰', '硒'], phytochem: ['大蒜素（allicin）', '硫化物'], note: '大蒜素切碎放置10分钟后活性最高，高温久煮损失；日常2-3瓣约10g即可；空腹生食刺激胃，胃炎者熟吃' },

  // ---- 用户点名补充 ----
  { id: 'yuxingcao', name: '鱼腥草/折耳根（嫩茎叶）', cat: 'veg', kcal: 37, protein: 2, fat: 0.4, carb: 6, fiber: 1.2, sodium: 9, vitFat: [], vitWater: ['C', 'B2'], minerals: ['钾', '钙'], phytochem: ['鱼腥草素（癸酰乙醛）', '槲皮素'], note: '西南地区特色，味道两极分化；鱼腥草素有抗菌抗炎作用，但对光热不稳定；凉拌/蘸水/炒腊肉；体虚/孕妇少食；口服注射液有过敏史者慎食' },

  // ---- 用户点名补充：菌菇 / 瓜类 ----
  { id: 'monkey-head', name: '猴头菇（鲜）', cat: 'veg', kcal: 41, protein: 4, fat: 0.2, carb: 6, fiber: 3, sodium: 5, vitFat: [], vitWater: ['B族'], minerals: ['钾', '锌'], phytochem: ['猴头菇多糖', '猴头菌素（hericenones）'], note: '养胃食养常用，但"治胃病"证据有限；干品泡发后炖汤；猴头菌素在动物实验中促神经生长因子，但人体证据不足；对菌类过敏者慎食' },
  { id: 'matsutake-jps', name: '姬松茸（巴西蘑菇，鲜）', cat: 'veg', kcal: 30, protein: 3.5, fat: 0.4, carb: 4.5, fiber: 2.5, sodium: 5, vitFat: [], vitWater: ['B族'], minerals: ['钾', '硒'], phytochem: ['姬松茸多糖（beta-葡聚糖）'], note: '常被宣传"抗癌/提高免疫"，主要证据来自动物实验与体外研究，不能替代药物；炖汤/煲汤；干品浓缩约10倍热量' },
  { id: 'morel', name: '羊肚菌（鲜）', cat: 'veg', kcal: 30, protein: 3.1, fat: 0.4, carb: 5, fiber: 2.8, sodium: 20, vitFat: ['D'], vitWater: ['B2', 'B3'], minerals: ['铁', '铜', '锌'], phytochem: [], note: '珍贵野生/半人工食用菌，香气浓；必须彻底煮熟（生食含微量溶血物质）；干品约290kcal/100g；野生采集需专业辨认，误食有毒蘑菇风险极高' },
  { id: 'bitter-melon', name: '苦瓜', cat: 'veg', kcal: 19, protein: 1, fat: 0.2, carb: 4, fiber: 1.4, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['苦瓜苷', '胰岛素样肽'], note: '极低卡，苦瓜苷在研究中有辅助降糖作用，但不能替代降糖药；脾胃虚寒者少食；清炒/炒蛋/酿肉；孕期大量食用可能刺激子宫' },

  // ---- 用户点名补充 ----
  { id: 'eggplant-purple', name: '紫皮茄子', cat: 'veg', kcal: 25, protein: 1, fat: 0.2, carb: 5.5, fiber: 1.3, sodium: 4, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素（紫皮）', '茄碱（微量，集中在籽和老皮）'], note: '茄子像海绵特别吸油，红烧/油焖一份脂肪可达15-20g；清蒸/烤/少油拌最友好；老茄子/籽发褐茄碱略多，一次别吃大量生茄子；带皮吃花青素' },
  { id: 'eggplant-green', name: '青茄子（绿皮）', cat: 'veg', kcal: 23, protein: 1.1, fat: 0.2, carb: 5, fiber: 1.2, sodium: 4, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: [], note: '东北/华北常见，肉质比紫茄更松软、籽少；同样吸油；凉拌/清蒸/茄盒；热量与紫茄接近' },
  { id: 'dandelion-root', name: '蒲公英根（干，泡茶）', cat: 'veg', kcal: 378, protein: 5, fat: 2, carb: 80, fiber: 30, sodium: 100, vitFat: [], vitWater: ['B族'], minerals: ['钾'], phytochem: ['蒲公英苦素', '菊粉（inulin，益生元）'], note: '干根每次5-10g冲泡，茶汤几乎0kcal；传统认为利尿助消化，但人体证据有限；菊粉可能胀气/腹泻，第一次从少量开始；胃食管反流/低血压/服用利尿剂者慎饮；孕妇忌' },

  // ---- 用户点名补充 ----
  { id: 'tomato-white', name: '白番茄（白果番茄）', cat: 'veg', kcal: 18, protein: 0.9, fat: 0.2, carb: 3.9, fiber: 1.2, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['白番茄红素（无色类胡萝卜素）', '八氢番茄红素'], note: '白番茄红素呈无色，常被宣传"美白/抗光老化"，证据有限；热量与普通番茄接近；口感偏淡、籽少；别把美白功效神化' },
  { id: 'cucumber-fruit', name: '水果黄瓜（无刺小黄瓜）', cat: 'veg', kcal: 15, protein: 0.6, fat: 0.1, carb: 3.6, fiber: 0.5, sodium: 2, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['黄瓜酶'], note: '比大黄瓜皮薄、籽少、味淡、可当水果啃；95%是水，几乎可无限量；一次吃多胃寒者易胀气；沙拉/蘸酱/打汁' },
  { id: 'cucumber', name: '黄瓜（普通大黄瓜）', cat: 'veg', kcal: 15, protein: 0.7, fat: 0.1, carb: 3.6, fiber: 0.5, sodium: 5, vitFat: [], vitWater: ['K', 'C'], minerals: ['钾'], phytochem: ['黄瓜酶', '葫芦素（皮上略苦）'], note: '极低卡，96%水；皮略苦处含葫芦素，有轻微催吐性，发苦严重别硬吃；凉拌/拍黄瓜；维生素K高，服华法林等抗凝药者保持摄入量稳定别一次暴吃' },

  // ---- 药食同源食材（仅食物参考，不提供任何医疗建议；本站只针对健身营养） ----
  // ⚠️ 以下食材均为国家药食同源目录中的常见食物，可作为汤料/茶饮/粥料使用。
  // 本站不诊断、不治疗、不替代任何药物；如有疾病请遵医嘱。
  { id: 'goji', name: '枸杞子（干）', cat: 'veg', kcal: 258, protein: 13.8, fat: 1.5, carb: 64, fiber: 16.9, sodium: 30, vitFat: ['A'], vitWater: ['C', 'B2'], minerals: ['铁', '锌', '硒'], phytochem: ['玉米黄质', '枸杞多糖', '甜菜碱'], note: '【食物参考】传统汤料/泡水；玉米黄质有益视网膜，但"明目/壮阳"被过度营销；多糖在动物实验中有免疫调节作用，人体证据有限；一次10-20g（约20-50kcal），高糖高纤维，腹泻者少食；不替代药物' },
  { id: 'jujube', name: '红枣/大枣（干）', cat: 'veg', kcal: 287, protein: 3.2, fat: 0.5, carb: 73, fiber: 6.2, sodium: 6, vitFat: [], vitWater: ['C', 'B族'], minerals: ['铁', '钾'], phytochem: ['环磷酸腺苷（cAMP）', '三萜类'], note: '【食物参考】高糖干果，3-5颗约30g=86kcal；铁含量在植物里算高但吸收率低，不能替代补铁药；糖尿病注意量；不替代药物' },
  { id: 'longan', name: '桂圆/龙眼肉（干）', cat: 'veg', kcal: 313, protein: 4.6, fat: 1, carb: 66, fiber: 2, sodium: 4, vitFat: [], vitWater: ['C', 'B2'], minerals: ['铁', '钾'], phytochem: ['腺苷', '多酚'], note: '【食物参考】高糖干果，传统汤料；一次5-10g约30-60kcal；"安神"证据有限；湿热/腹胀者少食；不替代药物' },
  { id: 'lotus-seed', name: '莲子（干）', cat: 'veg', kcal: 350, protein: 17.2, fat: 2, carb: 67, fiber: 3, sodium: 5, vitFat: [], vitWater: ['B族'], minerals: ['钾', '磷', '锰'], phytochem: ['莲心碱（胚芽，苦）'], note: '【食物参考】高淀粉高蛋白汤料；煮粥/银耳莲子羹；去芯后不苦；一次20-30g；便秘者少食；不替代药物' },
  { id: 'tremella', name: '银耳（干）', cat: 'veg', kcal: 261, protein: 10, fat: 1.4, carb: 67, fiber: 30.4, sodium: 82, vitFat: [], vitWater: ['D'], minerals: ['钾', '磷', '硒'], phytochem: ['银耳多糖（植物胶）'], note: '【食物参考】泡发后约90%是水，一碗银耳羹约50-80kcal；膳食纤维极高；"胶原蛋白美容"是误区——植物胶不补人胶原；痛风/出血倾向者慎用；不替代药物' },
  { id: 'poria', name: '茯苓（干，打粉/煲汤）', cat: 'veg', kcal: 250, protein: 1.5, fat: 0.5, carb: 85, fiber: 80, sodium: 10, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['茯苓多糖（pachyman）'], note: '【食物参考】多孔菌科真菌，传统汤料/打粉煮粥；本身几乎无营养，主要是多糖纤维；"祛湿"概念中医说法，现代医学证据有限；一次10-15g打粉；阴虚口干者不宜大量；不替代药物' },
  { id: 'euryale', name: '芡实（干）', cat: 'veg', kcal: 353, protein: 8.5, fat: 0.3, carb: 79, fiber: 0.9, sodium: 5, vitFat: [], vitWater: ['B族'], minerals: ['钾', '磷'], phytochem: [], note: '【食物参考】睡莲科种子，高淀粉；煮粥/四神汤；比莲子难消化，便秘/腹胀者少食；一次15-20g；不替代药物' },
  { id: 'kudzu', name: '葛根（干，打粉/煲汤）', cat: 'veg', kcal: 153, protein: 1.5, fat: 0.2, carb: 36, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['异黄酮（葛根素）', '大豆苷元'], note: '【食物参考】葛根粉冲调后类似藕粉；异黄酮在动物实验中有血管舒张作用，但"丰胸/解酒/降压"被过度营销；孕妇/雌激素相关疾病（乳腺/子宫）慎用；不替代药物' },
  { id: 'yam', name: '山药（鲜，淮山）', cat: 'veg', kcal: 57, protein: 1.9, fat: 0.2, carb: 12.4, fiber: 0.8, sodium: 18, vitFat: [], vitWater: ['C', 'B族'], minerals: ['钾', '锰'], phytochem: ['山药多糖', '薯蓣皂苷（微量）', '尿囊素（黏液）'], note: '【食物参考】鲜山药当主食吃，替代部分米饭；黏液蛋白好消化，肠胃弱者友好；去皮时黏液可能刺痒（戴手套）；"健脾"中医概念，现代医学证据有限；不替代药物' },
  { id: 'coix', name: '薏苡仁/薏米（干）', cat: 'veg', kcal: 361, protein: 12.8, fat: 3.3, carb: 71, fiber: 2, sodium: 3, vitFat: [], vitWater: ['B族'], minerals: ['钾', '镁', '锌'], phytochem: ['薏苡素', '薏苡酯'], note: '【食物参考】高淀粉杂粮，煮粥/红豆薏米水；性寒，孕妇忌（传统认为可能兴奋子宫）；便秘/津枯者少食；"祛湿"中医概念；一次20-30g；不替代药物' },
  { id: 'adzuki', name: '赤小豆（干）', cat: 'veg', kcal: 324, protein: 20.2, fat: 0.6, carb: 63, fiber: 7.7, sodium: 2, vitFat: [], vitWater: ['B族', '叶酸'], minerals: ['铁', '钾', '镁'], phytochem: ['皂苷', '花青素（皮）'], note: '【食物参考】比普通红豆更细长，利水中医说法；高蛋白高纤维；红豆薏米水常被宣传减肥，实际本身热量不低，只是低GI；煮粥需泡4小时；痛风适量（嘌呤中高）；不替代药物' },
  { id: 'lily-bulb', name: '百合（干）', cat: 'veg', kcal: 346, protein: 6.7, fat: 0.5, carb: 80, fiber: 1.7, sodium: 20, vitFat: [], vitWater: ['C', 'B族'], minerals: ['钾', '钙'], phytochem: ['百合苷', '秋水仙碱（鲜品微量）'], note: '【食物参考】干百合煮粥/银耳羹；"润肺安神"中医概念；鲜品含秋水仙碱，必须煮熟；一次5-10g；风寒咳嗽者不宜；不替代药物' },
  { id: 'tangerine-peel', name: '陈皮（干橘皮）', cat: 'veg', kcal: 278, protein: 8, fat: 1.4, carb: 65, fiber: 20, sodium: 10, vitFat: [], vitWater: ['B族'], minerals: ['钾'], phytochem: ['橙皮苷', '柠檬烯', '川陈皮素'], note: '【食物参考】泡水/煲汤/卤味；一次3-5g（茶汤约5kcal）；橙皮素在研究中有抗氧化作用；"化痰理气"中医说法；气虚/燥咳者不宜；不替代药物' },
  { id: 'hawthorn', name: '山楂（干/鲜）', cat: 'veg', kcal: 95, protein: 0.5, fat: 0.6, carb: 25, fiber: 3.1, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['山楂酸', '黄酮（牡荆素）', '有机酸'], note: '【食物参考】鲜山楂极酸，干品泡水/糖葫芦；有机酸促消化，但空腹大量吃可能伤胃；"降血脂"研究多为提取物，不是吃几颗山楂就能；孕妇/胃溃疡/低血压者慎；不替代药物' },
  { id: 'monk-fruit', name: '罗汉果（干）', cat: 'veg', kcal: 350, protein: 8, fat: 0.5, carb: 85, fiber: 30, sodium: 20, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['罗汉果甜苷（mogroside）'], note: '【食物参考】零卡天然甜味剂来源；一次1/4-1/2个泡水，茶汤约0kcal；甜苷不升血糖，糖尿病友好；但"润肺止咳"中医说法证据有限；肠胃敏感者可能腹泻；不替代药物' },
  { id: 'cassia-seed', name: '决明子（干，泡茶）', cat: 'veg', kcal: 350, protein: 17, fat: 2, carb: 60, fiber: 20, sodium: 10, vitFat: ['A'], vitWater: ['B族'], minerals: ['铁', '锌'], phytochem: ['大黄酚', '决明素', '蒽醌类'], note: '【食物参考】茶汤约0kcal；传统"明目/通便"；蒽醌类长期大量用可能导致结肠黑变/依赖；一次5-10g，别长期天天喝；孕妇忌；不替代药物' },
  { id: 'chrysanthemum', name: '菊花（干，泡茶）', cat: 'veg', kcal: 280, protein: 6, fat: 5, carb: 60, fiber: 20, sodium: 20, vitFat: [], vitWater: ['B族'], minerals: ['钾'], phytochem: ['黄酮（木犀草素）', '挥发油'], note: '【食物参考】茶汤约0kcal；杭白菊/胎菊常见；"清肝明目"中医说法，现代证据有限；过敏体质（蒿属花粉）可能皮疹；脾胃虚寒者不宜冷饮；不替代药物' },
  { id: 'honey', name: '蜂蜜', cat: 'veg', kcal: 304, protein: 0.3, fat: 0, carb: 82, fiber: 0.2, sodium: 4, vitFat: [], vitWater: ['C（微量）'], minerals: ['钾', '镁', '锌'], phytochem: ['多酚', '过氧化氢（微量抗菌）'], note: '【食物参考】单糖为主，GI约58，一勺15g=46kcal；1岁以下婴儿禁用（肉毒杆菌芽孢风险）；"润喉/止咳"有少量证据，但不能替代药物；糖尿病人控制量；不替代药物' },
  { id: 'black-sesame', name: '黑芝麻（炒）', cat: 'veg', kcal: 559, protein: 19.1, fat: 46.1, carb: 24, fiber: 14, sodium: 8, vitFat: ['E'], vitWater: ['B族'], minerals: ['钙', '铁', '锌', '硒'], phytochem: ['芝麻木脂素（芝麻素）', '植物甾醇', '黑色素'], note: '【食物参考】钙铁锌极高但植酸影响吸收，打粉后更好；一次10g约56kcal；"黑发"被过度营销——黑色素和头发颜色无直接关系；热量高脂肪高，别当零嘴大量吃；不替代药物' },
  { id: 'walnut', name: '核桃仁（干）', cat: 'veg', kcal: 654, protein: 15.2, fat: 65.2, carb: 14, fiber: 6.7, sodium: 2, vitFat: ['E'], vitWater: ['B族'], minerals: ['镁', '钾', '锌'], phytochem: ['α-亚麻酸（ALA，欧米伽3植物型）', '多酚'], note: '【食物参考】欧米伽3植物来源，但ALA转化为EPA/DHA效率低；一次2-3个约10g=65kcal；"补脑"主要因形态联想和欧米伽3，证据中等；别一次吃半斤（热量爆炸）；不替代药物' },
  { id: 'almond', name: '甜杏仁（干）', cat: 'veg', kcal: 578, protein: 21.2, fat: 50.6, carb: 20, fiber: 12.5, sodium: 1, vitFat: ['E'], vitWater: ['B2'], minerals: ['钙', '镁', '锌'], phytochem: ['维生素E', '植物甾醇'], note: '【食物参考】维E和钙极高；一次10g约58kcal；苦杏仁含氰苷不可生食/大量；"润肺"中医说法；不替代药物' },
  { id: 'ginkgo-nut', name: '白果/银杏果（熟）', cat: 'veg', kcal: 182, protein: 4.3, fat: 1.7, carb: 38, fiber: 0.2, sodium: 2, vitFat: [], vitWater: ['C', 'B族'], minerals: ['钾'], phytochem: ['银杏酸（皮）', '4-prime-O-甲基吡哆醇（毒）'], note: '【食物参考】【安全警告】必须彻底煮熟，去芯去衣；成人一次不超过10粒，儿童不超过5粒；生食/大量可致抽搐/过敏；"抗衰老"被过度营销；不替代药物' },
  { id: 'smoked-plum', name: '乌梅（干）', cat: 'veg', kcal: 219, protein: 6, fat: 2, carb: 50, fiber: 30, sodium: 40, vitFat: [], vitWater: ['C'], minerals: ['钾', '钙'], phytochem: ['柠檬酸', '苹果酸', '苦杏仁苷'], note: '【食物参考】酸梅汤原料；高纤维高酸；一次3-5颗泡水；胃酸过多/胃溃疡/牙敏感者慎；"生津"中医说法；不替代药物' },
  { id: 'mulberry', name: '桑葚（干）', cat: 'veg', kcal: 274, protein: 2.4, fat: 0.4, carb: 65, fiber: 30, sodium: 10, vitFat: [], vitWater: ['C'], minerals: ['铁', '钙', '硒'], phytochem: ['花青素', '白藜芦醇', '芦丁'], note: '【食物参考】花青素高；但干品高糖高纤维，一次10g约27kcal；鲜品约49kcal/100g；"补血/黑发"被过度营销——铁是非血红素铁，吸收差；腹泻者少食；不替代药物' },
  { id: 'schisandra', name: '五味子（干，泡茶）', cat: 'veg', kcal: 300, protein: 5, fat: 3, carb: 70, fiber: 30, sodium: 10, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['木脂素（五味子素）', '挥发油'], note: '【食物参考】茶汤约5kcal；"五味入五脏"中医说法；木脂素在肝损伤动物模型中有保护作用，但不是保肝药；一次2-5g；孕妇/胃酸过多/血压异常者慎；不替代药物' },
  { id: 'licorice', name: '甘草（干，泡茶/调味）', cat: 'veg', kcal: 280, protein: 4, fat: 0, carb: 70, fiber: 30, sodium: 100, vitFat: [], vitWater: ['B族'], minerals: ['钾'], phytochem: ['甘草酸（glycyrrhizin）', '甘草次酸'], note: '【食物参考】【安全警告】甘草酸长期/大量可致假性醛固酮增多症——高血压、低血钾、水肿；一次1-3g，连续不超过2周；高血压/肾病/孕妇/正在服利尿剂/降压药者忌；不替代药物' },
  { id: 'ginger', name: '生姜（鲜）', cat: 'veg', kcal: 46, protein: 1.8, fat: 0.8, carb: 10, fiber: 2.7, sodium: 14, vitFat: [], vitWater: ['C', 'B族'], minerals: ['钾', '锰'], phytochem: ['姜辣素（gingerol）', '姜烯酚'], note: '【食物参考】姜辣素有一定止吐/促循证据，晕车/孕早期恶心可含姜糖；但不能替代止吐药；一次3-5g；阴虚火旺/胃溃疡/睡前少用；不替代药物' },
  { id: 'red-pepper-dried', name: '干辣椒', cat: 'veg', kcal: 328, protein: 15, fat: 12, carb: 60, fiber: 30, sodium: 30, vitFat: [], vitWater: ['C（干品少）', 'B族'], minerals: ['钾', '铁'], phytochem: ['辣椒素（capsaicin）'], note: '【食物参考】辣椒素在研究中轻微促代谢/提食欲，但"燃脂"效果很有限，不能靠吃辣减肥；一次1-5g；胃炎/痔疮/痔疮急性期少用；不替代药物' },
  { id: 'suantai', name: '蒜苔/蒜薹', cat: 'veg', kcal: 66, protein: 2, fat: 0.4, carb: 15, fiber: 2.5, sodium: 4, vitFat: [], vitWater: ['C', 'B6'], minerals: ['钾'], phytochem: ['大蒜素（allicin，切开后生成）', '槲皮素'], note: '大蒜的花茎，蒜味比大蒜温和；炒腊肉/炒肉；纤维与维B6不错；炒前先切段拍一下让大蒜素生成；熟吃后刺激性降低，胃敏感者可吃；别炒太黄，营养流失' },

  // ---- 更多叶菜/根茎补充 ----
  { id: 'chinese-leek-green', name: '青蒜（蒜苗）', cat: 'veg', kcal: 37, protein: 2.1, fat: 0.4, carb: 8, fiber: 1.7, sodium: 8, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['大蒜素'], note: '大蒜幼苗；蒜味比大蒜温和；炒回锅肉/炒腊肉；冬季常见' },
  { id: 'scallion-green', name: '小葱（香葱）', cat: 'veg', kcal: 30, protein: 1.7, fat: 0.3, carb: 6.5, fiber: 1.3, sodium: 5, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['大蒜素'], note: '调味用，一次几根；葱花/葱油；热量可忽略' },
  { id: 'cilantro-leaf', name: '香菜（芫荽）', cat: 'veg', kcal: 31, protein: 1.8, fat: 0.4, carb: 5.4, fiber: 1.2, sodium: 48, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾', '钙'], phytochem: ['挥发油'], note: '两极分化：爱的爱死恨的恨（基因决定OR6A2嗅觉受体）；提味用，一次几根；别当菜吃' },
  { id: 'celery-stem', name: '西芹', cat: 'veg', kcal: 16, protein: 0.7, fat: 0.2, carb: 3, fiber: 1.6, sodium: 80, vitFat: ['K'], vitWater: [], minerals: ['钾'], note: '比本地芹菜更粗更脆；榨汁/炒；钠在蔬菜中偏高但可忽略' },
  { id: 'asparagus-lettuce', name: '莴笋（茎用莴苣）', cat: 'veg', kcal: 15, protein: 1, fat: 0.1, carb: 2.8, fiber: 0.6, sodium: 36, vitFat: ['A'], vitWater: ['C', '叶酸'], minerals: ['钾'], note: '茎和叶都能吃；叶比茎营养好很多；凉拌/清炒；超低热量减脂友好' },
  { id: 'choy-sum', name: '菜心（菜薹）', cat: 'veg', kcal: 24, protein: 2.8, fat: 0.5, carb: 3.8, fiber: 1.2, sodium: 33, vitFat: ['A'], vitWater: ['C', 'B2'], minerals: ['钙'], note: '广东菜心；白灼最好吃；火锅/清炒；南方春冬常见' },
  { id: 'red-radish', name: '红心萝卜（水萝卜）', cat: 'veg', kcal: 23, protein: 1, fat: 0.2, carb: 5.5, fiber: 1.6, sodium: 50, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素'], note: '心里美萝卜；心里美是品种不是特效；凉拌/糖醋；粉粉的很脆' },
  { id: 'purple-carrot', name: '紫胡萝卜', cat: 'veg', kcal: 35, protein: 1, fat: 0.2, carb: 8, fiber: 3, sodium: 60, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素', 'β-胡萝卜素'], note: '比橙胡萝卜多花青素；β-胡萝卜素需要油脂帮助吸收；别吃太多变橙人' },
  { id: 'fruit-cucumber', name: '水果黄瓜（无刺小黄瓜）', cat: 'veg', kcal: 15, protein: 0.8, fat: 0.2, carb: 2.9, fiber: 0.5, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '小黄瓜/荷兰黄瓜；当零食吃；减脂期嘴馋救星；95%是水' },
  { id: 'purple-eggplant', name: '紫皮茄子', cat: 'veg', kcal: 23, protein: 1.1, fat: 0.2, carb: 4.9, fiber: 1.3, sodium: 5, vitFat: [], vitWater: ['C', 'B族'], minerals: ['钾'], phytochem: ['花青素（皮）', '茄碱（未熟）'], note: '【注意】茄子吸油如海绵，红烧/油焖后热量翻10倍；烤/蒸/凉拌少油才健康；老茄子籽多茄碱高' },
  { id: 'green-eggplant', name: '青茄子（绿皮）', cat: 'veg', kcal: 20, protein: 1, fat: 0.1, carb: 4.5, fiber: 1.2, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '比紫茄子更嫩更不吸油；北方常见；炒/烧' },
  { id: 'white-tomato', name: '白番茄', cat: 'veg', kcal: 18, protein: 0.9, fat: 0.2, carb: 3.9, fiber: 1.2, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['八氢番茄红素（无色类胡萝卜素）'], note: '稀有品种；不含番茄红素；口感偏淡偏甜；抗氧化研究中' },
  { id: 'zucchini-summer', name: '西葫芦（角瓜）', cat: 'veg', kcal: 19, protein: 1.2, fat: 0.2, carb: 3.8, fiber: 1.1, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '擦丝做饼/清炒；别炒太软；热量极低' },
  { id: 'pumpkin-winter', name: '南瓜（倭瓜）', cat: 'veg', kcal: 23, protein: 0.7, fat: 0.1, carb: 5.3, fiber: 0.8, sodium: 1, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['β-胡萝卜素'], note: 'GI不低（约75），糖尿病人别当菜狂吃；蒸/煮粥；老南瓜更甜更面' },
  { id: 'loofah-sponge', name: '丝瓜', cat: 'veg', kcal: 20, protein: 1, fat: 0.2, carb: 4.2, fiber: 0.6, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '夏天清热；炒/蛋花汤；发黑就老了别吃' },
  { id: 'bitter-melon-balsam', name: '苦瓜', cat: 'veg', kcal: 19, protein: 1, fat: 0.1, carb: 4.2, fiber: 1.4, sodium: 2, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['苦瓜苷'], note: '【注意】"降血糖"是提取物研究，吃苦瓜不能代替降糖药；脾胃虚寒/孕妇慎；切薄片盐腌去苦' },
  { id: 'wax-gourd-ash', name: '冬瓜', cat: 'veg', kcal: 12, protein: 0.4, fat: 0.2, carb: 2.6, fiber: 0.7, sodium: 2, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '利尿消肿是经验说；虾仁烧冬瓜；超低热量减脂期吃' },

  // ---- 更多菌菇 ----
  { id: 'oyster-mushroom', name: '平菇', cat: 'veg', kcal: 24, protein: 1.9, fat: 0.3, carb: 4.6, fiber: 2.3, sodium: 4, vitFat: ['D'], vitWater: ['B族'], minerals: ['钾'], note: '最平价的蘑菇；炒/汤；撕小朵别切，撕的更入味' },
  { id: 'tea-tree-mushroom-dry', name: '茶树菇（干）', cat: 'veg', kcal: 270, protein: 23, fat: 2.6, carb: 57, fiber: 14, sodium: 5, vitFat: ['D'], vitWater: ['B族'], minerals: ['铁', '钾'], note: '干品热量高但泡发后低；煲老鸭汤；嚼劲好；必须煮熟，没熟的可能中毒' },
  { id: 'straw-mushroom-caogu', name: '草菇', cat: 'veg', kcal: 27, protein: 2.7, fat: 0.2, carb: 4.3, fiber: 1.6, sodium: 70, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '爆炒/粤菜；维生素C在蘑菇中少见；钠略高' },
  { id: 'beech-mushroom', name: '蟹味菇（真姬菇）', cat: 'veg', kcal: 20, protein: 2.8, fat: 0.4, carb: 3.2, fiber: 1.9, sodium: 4, vitFat: ['D'], vitWater: ['B族'], minerals: ['钾'], note: '小朵带蟹香味；火锅/炒；白玉菇是白色版本' },
  { id: 'matsutake-pine', name: '松茸（鲜）', cat: 'veg', kcal: 24, protein: 1.9, fat: 0.4, carb: 4.5, fiber: 1.4, sodium: 5, vitFat: ['D'], vitWater: ['B族'], minerals: ['钾', '硒'], phytochem: ['松茸多糖', '松茸醇'], note: '高端货；贵；烤/刺身；味道就是松树味；普通人不必追贵价菌' },
  { id: 'porcini-bolete', name: '牛肝菌（干）', cat: 'veg', kcal: 250, protein: 28, fat: 4, carb: 53, fiber: 20, sodium: 30, vitFat: [], vitWater: ['B族'], minerals: ['铁', '钾'], phytochem: ['多糖'], note: '干品；意面/炖肉；香；别采野蘑菇，每年都有人吃毒蘑菇躺板板' },
  { id: 'morel-mushroom', name: '羊肚菌（干）', cat: 'veg', kcal: 295, protein: 28, fat: 3.5, carb: 55, fiber: 30, sodium: 20, vitFat: ['D'], vitWater: ['B族'], minerals: ['铁', '锌'], note: '菌中皇后；贵；煲汤；价格被炒起来的' },
  { id: 'lion-mane-mushroom', name: '猴头菇（干）', cat: 'veg', kcal: 230, protein: 26, fat: 2.5, carb: 45, fiber: 30, sodium: 10, vitFat: ['D'], vitWater: ['B族'], minerals: ['铁'], phytochem: ['猴头菇多糖', '猴头菌素'], note: '【食物参考】养胃是传统说法；现代研究关注神经生长因子，但"吃了变聪明"证据不足；煲汤/做菜；干货要泡发' },
  { id: 'portobello', name: '口蘑（白蘑菇）', cat: 'veg', kcal: 22, protein: 3.1, fat: 0.3, carb: 3.3, fiber: 1, sodium: 9, vitFat: ['D'], vitWater: ['B2', 'B3'], minerals: ['硒'], note: '最常见的蘑菇；煎/烤/汤；本身鲜味浓；别煮太久会缩' },

  // ---- 更多海藻类 ----
  { id: 'kelp-fresh', name: '海带（鲜）', cat: 'veg', kcal: 13, protein: 1.2, fat: 0.1, carb: 3, fiber: 1.3, sodium: 107, vitFat: [], vitWater: ['C'], minerals: ['碘', '钙', '钾'], phytochem: ['褐藻多糖'], note: '【注意】碘极高，甲状腺疾病患者别大量吃；拌/炖；干品300kcal泡发后极轻' },
  { id: 'kelp-sprout-young', name: '海带苗（嫩海带）', cat: 'veg', kcal: 15, protein: 1.5, fat: 0.2, carb: 3, fiber: 1, sodium: 120, vitFat: [], vitWater: [], minerals: ['碘', '钙'], note: '海带的嫩尖；火锅/凉拌；比老海带嫩很多' },
  { id: 'laver-dried', name: '紫菜（干）', cat: 'veg', kcal: 250, protein: 26, fat: 1.1, carb: 44, fiber: 21, sodium: 710, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['碘', '铁', '钙'], phytochem: ['藻胆蛋白'], note: '干品；汤/包饭；B12在植物中罕见（但也可能是类似物）；钠高，少放' },
  { id: 'wakame-sea', name: '裙带菜（干）', cat: 'veg', kcal: 200, protein: 15, fat: 2, carb: 40, fiber: 30, sodium: 500, vitFat: ['A'], vitWater: ['K'], minerals: ['碘', '钙', '镁'], phytochem: ['褐藻多糖'], note: '味噌汤里的绿色菜；泡发很快；比海带嫩；碘高，甲状腺注意' },
  { id: 'agar-agar', name: '石花菜（海冻菜）', cat: 'veg', kcal: 20, protein: 0.5, fat: 0, carb: 5, fiber: 5, sodium: 100, vitFat: [], vitWater: [], minerals: ['碘'], note: '做凉粉的原料；脆脆的；凉拌；几乎全是纤维' },
  { id: 'sea-grape-caviar', name: '海葡萄', cat: 'veg', kcal: 70, protein: 2, fat: 0.5, carb: 15, fiber: 5, sodium: 300, vitFat: [], vitWater: ['C'], minerals: ['碘', '钙'], note: '热带海藻；咬爆珠口感；日料；贵；像绿色鱼子酱' },
];