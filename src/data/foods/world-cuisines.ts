// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: WORLD_CUISINES
// 各国菜系：印尼 / 西班牙 / 墨西哥 / 法国 / 意大利，每 100g 熟重参考值
//
// 估算口径（与「家常菜熟食」一致，但整体偏保守 / 偏高）：
// - 按餐厅与家庭「正常油量、正常糖盐」的常见做法估算，不按减油减糖版本；
// - 咖喱、椰浆、奶酪、黄油、油炸类按偏高一档取值，宁可高估也不低估；
// - 同一道菜不同店家差异可达 ±30%，真实数值以该店 / 该包装标注为准；
// - 本表仅作健身营养参考，不构成膳食处方或医疗建议。
import type { IFood } from './types';

export const WORLD_CUISINES: IFood[] = [
  // ============ 印尼菜（Indonesia）：椰浆 + 棕榈油 + 甜酱油，热量密度偏高 ============
  { id: 'idn-nasi-goreng', name: '印尼炒饭（Nasi Goreng）', cat: 'cuisine', kcal: 200, protein: 6, fat: 8, carb: 26, fiber: 1.2, sodium: 600, vitFat: ['A'], vitWater: ['B1', 'B3', 'B12'], minerals: ['磷', '铁'], note: '偏高估算：甜酱油+棕榈油炒制，1 盘约 350g≈700kcal；练后补碳可用，减脂期点半份' },
  { id: 'idn-mie-goreng', name: '印尼炒面（Mie Goreng）', cat: 'cuisine', kcal: 209, protein: 7, fat: 9, carb: 25, fiber: 1.5, sodium: 620, vitFat: ['A'], vitWater: ['B1', 'B3'], minerals: ['磷', '钠'], note: '偏高估算：方便面饼油炸过，碳水+油双高；加个蛋补蛋白更均衡' },
  { id: 'idn-rendang', name: '巴东牛肉（Rendang）', cat: 'cuisine', kcal: 255, protein: 15, fat: 19, carb: 6, fiber: 1.8, sodium: 520, vitFat: ['A'], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], phytochem: ['姜黄素'], note: '偏高估算：椰浆收干成酱，脂肪约占七成热量；蛋白质量高，减脂期控制在 100g 内' },
  { id: 'idn-satay', name: '沙嗲鸡肉串（配花生酱）', cat: 'cuisine', kcal: 225, protein: 19, fat: 13, carb: 8, fiber: 1.2, sodium: 480, vitFat: ['A'], vitWater: ['B3', 'B6'], minerals: ['磷', '镁'], note: '偏高估算：花生酱蘸料贡献大部分脂肪；一份 6 串约 180g，蛋白约 34g' },
  { id: 'idn-gado-gado', name: '加多加多（蔬菜花生沙拉）', cat: 'cuisine', kcal: 167, protein: 6, fat: 11, carb: 11, fiber: 3.2, sodium: 430, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾', '镁'], phytochem: ['植物固醇'], note: '偏高估算：蔬菜量足但花生酱汁热量高；要求酱汁另放可省 30% 热量' },
  { id: 'idn-soto-ayam', name: '印尼鸡汤（Soto Ayam）', cat: 'cuisine', kcal: 59, protein: 5, fat: 3, carb: 3, fiber: 0.6, sodium: 520, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['钾', '钠'], note: '偏高估算：本表里少见的低热量项；汤底含椰浆版本热量约翻倍' },
  { id: 'idn-nasi-kuning', name: '黄姜饭（Nasi Kuning）', cat: 'cuisine', kcal: 185, protein: 4, fat: 5, carb: 31, fiber: 1, sodium: 320, vitFat: [], vitWater: ['B1'], minerals: ['钾'], phytochem: ['姜黄素'], note: '偏高估算：椰浆蒸饭，比白米饭多约 60% 热量；当主食按 150g 计约 278kcal' },
  { id: 'idn-ayam-goreng', name: '印尼炸鸡（Ayam Goreng）', cat: 'cuisine', kcal: 275, protein: 21, fat: 19, carb: 5, fiber: 0.4, sodium: 560, vitFat: ['A'], vitWater: ['B3', 'B6'], minerals: ['磷', '锌'], note: '偏高估算：带皮油炸，脂肪接近 20g/100g；去皮可减约 6g 脂肪' },
  { id: 'idn-tempeh', name: '天贝（炸 Tempeh）', cat: 'cuisine', kcal: 252, protein: 16, fat: 16, carb: 11, fiber: 5, sodium: 300, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙', '镁', '铁'], phytochem: ['大豆异黄酮', '益生菌（发酵）'], note: '偏高估算：发酵大豆制品，植物蛋白密度高；油炸版热量偏高，清蒸版约 190kcal' },
  { id: 'idn-tahu-goreng', name: '印尼炸豆腐（Tahu Goreng）', cat: 'cuisine', kcal: 197, protein: 13, fat: 13, carb: 7, fiber: 1, sodium: 340, vitFat: [], vitWater: ['B1'], minerals: ['钙', '镁'], phytochem: ['大豆异黄酮'], note: '偏高估算：豆腐吸油明显；配参巴酱吃钠会明显上升' },
  { id: 'idn-bakso', name: '印尼牛肉丸（Bakso）', cat: 'cuisine', kcal: 138, protein: 10, fat: 6, carb: 11, fiber: 0.5, sodium: 700, vitFat: [], vitWater: ['B12'], minerals: ['钠', '磷'], note: '偏高估算：丸子里常掺淀粉，蛋白不如整块牛肉；汤底味精盐分高' },
  { id: 'idn-sambal', name: '参巴辣酱（Sambal）', cat: 'cuisine', kcal: 100, protein: 2, fat: 8, carb: 5, fiber: 2.5, sodium: 1800, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], phytochem: ['辣椒素'], note: '偏高估算：油炒辣椒酱，钠极高（每 100g 近 2g 盐）；一餐 15g 内为宜' },

  // ============ 西班牙菜（España）：橄榄油 + 火腿 + 海鲜 ============
  { id: 'esp-paella', name: '西班牙海鲜饭（Paella）', cat: 'cuisine', kcal: 182, protein: 9, fat: 6, carb: 23, fiber: 1, sodium: 560, vitFat: ['A'], vitWater: ['B3', 'B12'], minerals: ['硒', '磷'], phytochem: ['虾青素'], note: '偏高估算：藏红花+橄榄油，餐厅版油量偏大；一份 400g≈728kcal' },
  { id: 'esp-tortilla', name: '西班牙土豆蛋饼（Tortilla）', cat: 'cuisine', kcal: 188, protein: 8, fat: 12, carb: 12, fiber: 1.2, sodium: 380, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['磷', '钾'], note: '偏高估算：传统做法用大量橄榄油煎土豆；蛋白质量好，适合早餐' },
  { id: 'esp-jamon', name: '伊比利亚火腿（Jamón Ibérico）', cat: 'cuisine', kcal: 261, protein: 31, fat: 15, carb: 0.5, fiber: 0, sodium: 1200, vitFat: ['E'], vitWater: ['B1', 'B3', 'B12'], minerals: ['铁', '锌', '硒'], note: '偏高估算：风干火腿，蛋白极高但钠高（每 100g 约 3g 盐）；3–4 片约 30g 即可' },
  { id: 'esp-gazpacho', name: '西班牙冷汤（Gazpacho）', cat: 'cuisine', kcal: 47, protein: 1, fat: 2.5, carb: 5, fiber: 1.2, sodium: 300, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾'], phytochem: ['番茄红素'], note: '偏高估算：番茄+橄榄油打成的冷汤，热量低；注意市售瓶装常加糖' },
  { id: 'esp-gambas', name: '蒜香虾（Gambas al Ajillo）', cat: 'cuisine', kcal: 189, protein: 16, fat: 13, carb: 2, fiber: 0.3, sodium: 520, vitFat: [], vitWater: ['B12'], minerals: ['硒', '磷'], note: '偏高估算：橄榄油浸虾，油不要全吃；虾嘌呤中等，痛风期少吃' },
  { id: 'esp-croquetas', name: '西班牙炸丸子（Croquetas）', cat: 'cuisine', kcal: 291, protein: 8, fat: 19, carb: 22, fiber: 0.8, sodium: 540, vitFat: ['A'], vitWater: ['B2'], minerals: ['钙', '磷'], note: '偏高估算：白酱+面包糠油炸，一颗约 30g≈87kcal；当零食 2 颗封顶' },
  { id: 'esp-fabada', name: '西班牙白豆炖肉（Fabada）', cat: 'cuisine', kcal: 197, protein: 9, fat: 9, carb: 20, fiber: 5.5, sodium: 620, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁', '钾', '镁'], note: '偏高估算：白豆+血肠+腊肉，纤维高但同时高脂高钠；痛风者注意' },
  { id: 'esp-cochinillo', name: '西班牙烤乳猪（Cochinillo）', cat: 'cuisine', kcal: 310, protein: 23, fat: 24, carb: 0.5, fiber: 0, sodium: 420, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['锌', '铁'], note: '偏高估算：带皮烤，脂肪约 24g/100g；节日菜，按 150g 一份算约 465kcal' },
  { id: 'esp-churros', name: '西班牙油条（Churros）', cat: 'cuisine', kcal: 391, protein: 5, fat: 19, carb: 50, fiber: 1.5, sodium: 280, vitFat: ['E'], vitWater: [], minerals: ['钠'], note: '偏高估算：油炸面糊+糖，典型高糖高脂空热量；一根约 30g≈117kcal' },
  { id: 'esp-chorizo', name: '西班牙辣香肠（Chorizo）', cat: 'cuisine', kcal: 401, protein: 24, fat: 33, carb: 2, fiber: 0, sodium: 1250, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['锌', '铁'], note: '偏高估算：腌腊肠，脂肪与钠双高；切片 20g 约 80kcal，当调味用' },
  { id: 'esp-flan', name: '西班牙焦糖蛋奶（Flan）', cat: 'cuisine', kcal: 153, protein: 4, fat: 5, carb: 23, fiber: 0, sodium: 90, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '偏高估算：焦糖糖浆占糖量大头；一份 120g≈184kcal' },
  { id: 'esp-pollo-ajillo', name: '西班牙蒜香鸡（Pollo al Ajillo）', cat: 'cuisine', kcal: 214, protein: 19, fat: 14, carb: 2, fiber: 0.3, sodium: 460, vitFat: ['A'], vitWater: ['B3', 'B6'], minerals: ['磷', '锌'], note: '偏高估算：橄榄油+蒜+白葡萄酒焖，蛋白质量好；配菜别选炸薯块' },
  { id: 'esp-pan-tomate', name: '番茄面包（Pan con Tomate）', cat: 'cuisine', kcal: 197, protein: 5, fat: 5, carb: 33, fiber: 2, sodium: 420, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['番茄红素'], note: '偏高估算：白面包抹番茄+橄榄油，本质是精制碳水；当加餐 2 片约 80g' },
  { id: 'esp-pil-pil', name: '西班牙蒜油鳕鱼（Pil-Pil）', cat: 'cuisine', kcal: 176, protein: 15, fat: 12, carb: 2, fiber: 0.2, sodium: 480, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '磷'], note: '偏高估算：橄榄油乳化酱汁，油量决定热量；鳕鱼蛋白优质、脂肪极低' },

  // ============ 墨西哥菜（México）：玉米 + 豆类 + 芝士 + 牛油果 ============
  { id: 'mex-taco-beef', name: '墨西哥牛肉塔可（Taco）', cat: 'cuisine', kcal: 232, protein: 12, fat: 12, carb: 19, fiber: 3, sodium: 560, vitFat: ['A'], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '偏高估算：含玉米饼+牛肉+芝士+酸奶油；一个约 110g≈255kcal，吃 3 个是一餐量' },
  { id: 'mex-burrito', name: '墨西哥卷饼（Burrito）', cat: 'cuisine', kcal: 225, protein: 10, fat: 9, carb: 26, fiber: 4, sodium: 580, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['铁', '镁'], note: '偏高估算：大卷一个约 350g≈790kcal，接近一餐上限；要求少米饭少芝士可降 20%' },
  { id: 'mex-nachos', name: '墨西哥玉米片配芝士（Nachos）', cat: 'cuisine', kcal: 328, protein: 9, fat: 20, carb: 28, fiber: 3, sodium: 640, vitFat: ['A'], vitWater: ['B1'], minerals: ['钙', '磷'], note: '偏高估算：油炸玉米片+芝士酱，典型下酒高热量；一小份 100g 已 328kcal' },
  { id: 'mex-enchilada', name: '墨西哥辣酱卷（Enchilada）', cat: 'cuisine', kcal: 216, protein: 9, fat: 12, carb: 18, fiber: 3, sodium: 700, vitFat: ['A'], vitWater: ['B3'], minerals: ['钙', '铁'], note: '偏高估算：辣椒酱+芝士覆盖，钠偏高；一份 2 条约 300g≈648kcal' },
  { id: 'mex-tamales', name: '墨西哥玉米粽（Tamales）', cat: 'cuisine', kcal: 232, protein: 7, fat: 12, carb: 24, fiber: 3.5, sodium: 480, vitFat: ['A'], vitWater: ['B1'], minerals: ['镁', '磷'], note: '偏高估算：玉米面团裹猪油蒸制，脂肪不低；一个约 130g≈300kcal' },
  { id: 'mex-guacamole', name: '牛油果酱（Guacamole）', cat: 'cuisine', kcal: 175, protein: 2, fat: 15, carb: 8, fiber: 5.5, sodium: 380, vitFat: ['E', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾', '镁'], phytochem: ['叶黄素', '谷胱甘肽'], note: '偏高估算：脂肪以单不饱和为主，是「好脂肪」但热量仍高；2 汤匙约 30g≈53kcal' },
  { id: 'mex-chili', name: '墨西哥辣炖肉（Chili con Carne）', cat: 'cuisine', kcal: 165, protein: 12, fat: 9, carb: 9, fiber: 2.8, sodium: 560, vitFat: ['A'], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'], phytochem: ['辣椒素', '番茄红素'], note: '偏高估算：牛肉末+豆+番茄，蛋白与纤维兼顾；配白饭会再加 200kcal' },
  { id: 'mex-quesadilla', name: '墨西哥芝士薄饼（Quesadilla）', cat: 'cuisine', kcal: 301, protein: 13, fat: 17, carb: 24, fiber: 2, sodium: 620, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙', '磷'], note: '偏高估算：两张饼夹大量芝士煎制，脂肪偏高；加鸡胸可提高蛋白占比' },
  { id: 'mex-elote', name: '墨西哥烤玉米（Elote）', cat: 'cuisine', kcal: 189, protein: 5, fat: 9, carb: 22, fiber: 2.5, sodium: 340, vitFat: ['A'], vitWater: ['B1', 'C'], minerals: ['镁', '钾'], note: '偏高估算：抹蛋黄酱+芝士粉，热量比水煮玉米高一倍；一根约 180g≈340kcal' },
  { id: 'mex-ceviche', name: '墨西哥酸橘腌鱼（Ceviche）', cat: 'cuisine', kcal: 94, protein: 16, fat: 1.5, carb: 4, fiber: 0.8, sodium: 480, vitFat: [], vitWater: ['B12', 'C'], minerals: ['硒', '磷'], note: '偏高估算：本表低热量高蛋白项；生腌海鲜，肠胃敏感者慎食' },
  { id: 'mex-arroz-rojo', name: '墨西哥红米饭（Arroz Rojo）', cat: 'cuisine', kcal: 162, protein: 3.5, fat: 4, carb: 28, fiber: 0.8, sodium: 380, vitFat: ['A'], vitWater: ['B1'], minerals: ['钾'], phytochem: ['番茄红素'], note: '偏高估算：先用油炒米再煮，比白米饭多约 40% 热量；一份 150g≈243kcal' },
  { id: 'mex-refried-beans', name: '墨西哥豆泥（Refried Beans）', cat: 'cuisine', kcal: 140, protein: 6, fat: 4.5, carb: 19, fiber: 5.5, sodium: 460, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['铁', '镁', '钾'], note: '偏高估算：传统用猪油炒豆泥；纤维很高，饱腹感强，适合减脂期当主食配菜' },
  { id: 'mex-taco-pollo', name: '墨西哥鸡肉塔可（Taco de Pollo）', cat: 'cuisine', kcal: 205, protein: 13, fat: 9, carb: 18, fiber: 2.8, sodium: 520, vitFat: ['A'], vitWater: ['B3', 'B6'], minerals: ['磷', '硒'], note: '偏高估算：比牛肉版低约 30kcal；不加酸奶油与芝士可再降 40kcal' },

  // ============ 法国菜（France）：黄油 + 奶油 + 酥皮，热量密度最高的一档 ============
  { id: 'fra-onion-soup', name: '法式洋葱汤（Soupe à l’Oignon）', cat: 'cuisine', kcal: 80, protein: 4, fat: 4, carb: 7, fiber: 0.8, sodium: 620, vitFat: ['A'], vitWater: ['B2'], minerals: ['钙', '钾'], note: '偏高估算：不含芝士烤面包盖；加了芝士面包盖的一碗约 220kcal' },
  { id: 'fra-boeuf-bourguignon', name: '红酒炖牛肉（Bœuf Bourguignon）', cat: 'cuisine', kcal: 192, protein: 16, fat: 12, carb: 5, fiber: 0.8, sodium: 520, vitFat: ['A'], vitWater: ['B3', 'B6', 'B12'], minerals: ['铁', '锌'], note: '偏高估算：黄油煎+慢炖，脂肪主要来自黄油与牛肉脂肪；蛋白质量很好' },
  { id: 'fra-quiche', name: '洛林咸派（Quiche Lorraine）', cat: 'cuisine', kcal: 311, protein: 11, fat: 23, carb: 15, fiber: 0.6, sodium: 560, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'], note: '偏高估算：酥皮+奶油+培根，一块 120g≈373kcal；当正餐需配大量蔬菜' },
  { id: 'fra-escargots', name: '法式焗蜗牛（Escargots）', cat: 'cuisine', kcal: 186, protein: 12, fat: 14, carb: 3, fiber: 0, sodium: 480, vitFat: ['A'], vitWater: ['B12'], minerals: ['铁', '镁'], note: '偏高估算：热量几乎全部来自蒜香黄油；蜗牛本身高蛋白低脂，别把黄油吃干净' },
  { id: 'fra-confit-duck', name: '油封鸭腿（Confit de Canard）', cat: 'cuisine', kcal: 338, protein: 26, fat: 26, carb: 0, fiber: 0, sodium: 560, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['铁', '锌', '硒'], note: '偏高估算：鸭油慢煮，脂肪 26g/100g；一只腿约 200g，热量近 680kcal' },
  { id: 'fra-ratatouille', name: '普罗旺斯炖菜（Ratatouille）', cat: 'cuisine', kcal: 79, protein: 1.5, fat: 5, carb: 7, fiber: 2.5, sodium: 300, vitFat: ['A', 'E', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾'], phytochem: ['番茄红素', '花青素'], note: '偏高估算：橄榄油用量大；蔬菜种类多、纤维好，减脂期可当主力配菜' },
  { id: 'fra-croissant', name: '法式可颂（Croissant）', cat: 'cuisine', kcal: 423, protein: 8, fat: 23, carb: 46, fiber: 2, sodium: 480, vitFat: ['A'], vitWater: ['B1', 'B2'], minerals: ['钙'], note: '偏高估算：黄油开酥，一个 60g≈254kcal；当早餐要配蛋白（蛋/酸奶）' },
  { id: 'fra-baguette', name: '法式长棍（Baguette）', cat: 'cuisine', kcal: 274, protein: 9, fat: 1.5, carb: 56, fiber: 2.5, sodium: 600, vitFat: [], vitWater: ['B1', 'B3'], minerals: ['钾'], note: '偏高估算：精制小麦粉，升糖快；一段 60g≈164kcal，练前 1–2 小时吃合适' },
  { id: 'fra-gratin', name: '奶油焗土豆（Gratin Dauphinois）', cat: 'cuisine', kcal: 197, protein: 4, fat: 13, carb: 16, fiber: 1.2, sodium: 420, vitFat: ['A', 'D'], vitWater: ['B6', 'C'], minerals: ['钙', '钾'], note: '偏高估算：淡奶油+奶酪+土豆，碳水与脂肪叠加；一份 200g≈394kcal' },
  { id: 'fra-nicoise', name: '尼斯沙拉（Salade Niçoise）', cat: 'cuisine', kcal: 123, protein: 9, fat: 7, carb: 6, fiber: 2, sodium: 520, vitFat: ['A', 'D'], vitWater: ['B12', 'C'], minerals: ['硒', '钾'], note: '偏高估算：金枪鱼+蛋+橄榄+橄榄油；少放橄榄与油可降到 90kcal 上下' },
  { id: 'fra-creme-brulee', name: '法式焦糖布丁（Crème Brûlée）', cat: 'cuisine', kcal: 350, protein: 4, fat: 26, carb: 25, fiber: 0, sodium: 70, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '偏高估算：蛋黄+淡奶油+焦糖，一份 100g≈350kcal；减脂期不建议常吃' },
  { id: 'fra-coq-au-vin', name: '红酒炖鸡（Coq au Vin）', cat: 'cuisine', kcal: 174, protein: 17, fat: 10, carb: 4, fiber: 0.6, sodium: 500, vitFat: ['A'], vitWater: ['B3', 'B6', 'B12'], minerals: ['磷', '硒'], note: '偏高估算：带皮鸡腿+培根+黄油，蛋白高；去皮可减约 4g 脂肪' },
  { id: 'fra-croque', name: '法式火腿芝士三明治（Croque Monsieur）', cat: 'cuisine', kcal: 310, protein: 16, fat: 18, carb: 21, fiber: 1.2, sodium: 780, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙', '磷'], note: '偏高估算：白酱+格鲁耶尔芝士焗，钠很高；一份约 250g≈775kcal' },

  // ============ 意大利菜（Italia）：橄榄油 + 硬质小麦 + 奶酪 ============
  { id: 'ita-pizza-margherita', name: '玛格丽特披萨（Pizza Margherita）', cat: 'cuisine', kcal: 257, protein: 11, fat: 9, carb: 33, fiber: 2.2, sodium: 560, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['钙', '磷'], phytochem: ['番茄红素'], note: '偏高估算：一片约 100g≈257kcal；整张 8 片约 2000kcal，聚餐按 2–3 片控制' },
  { id: 'ita-bolognese', name: '意式肉酱面（Bolognese）', cat: 'cuisine', kcal: 170, protein: 8, fat: 6, carb: 21, fiber: 2, sodium: 480, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['铁', '锌'], phytochem: ['番茄红素'], note: '偏高估算：含牛肉末与帕玛森；一份 350g≈595kcal，蛋白约 28g' },
  { id: 'ita-carbonara', name: '奶油培根面（Carbonara）', cat: 'cuisine', kcal: 251, protein: 11, fat: 15, carb: 18, fiber: 1.5, sodium: 620, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['磷', '钙'], note: '偏高估算：蛋黄+芝士+猪颊肉，脂肪高；一份 300g≈753kcal，减脂期不推荐' },
  { id: 'ita-lasagna', name: '意式千层面（Lasagna）', cat: 'cuisine', kcal: 212, protein: 11, fat: 12, carb: 15, fiber: 1.8, sodium: 560, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙', '磷'], note: '偏高估算：多层白酱+肉酱+芝士；一块 250g≈530kcal' },
  { id: 'ita-risotto', name: '意式烩饭（Risotto）', cat: 'cuisine', kcal: 183, protein: 5, fat: 7, carb: 25, fiber: 1, sodium: 420, vitFat: ['A'], vitWater: ['B1'], minerals: ['钾'], note: '偏高估算：黄油+帕玛森收汁，碳水为主；一份 250g≈458kcal' },
  { id: 'ita-minestrone', name: '意式蔬菜汤（Minestrone）', cat: 'cuisine', kcal: 60, protein: 2.5, fat: 2, carb: 8, fiber: 2.8, sodium: 460, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钾', '镁'], phytochem: ['番茄红素', '类胡萝卜素'], note: '偏高估算：本表低热量高纤维项；含豆类与意面，一碗 300g≈180kcal' },
  { id: 'ita-bruschetta', name: '意式烤面包（Bruschetta）', cat: 'cuisine', kcal: 215, protein: 5, fat: 7, carb: 33, fiber: 2.2, sodium: 420, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['番茄红素'], note: '偏高估算：面包淋橄榄油+番茄；一块 60g≈129kcal，注意不是「清淡前菜」' },
  { id: 'ita-prosciutto', name: '帕尔玛火腿（Prosciutto）', cat: 'cuisine', kcal: 271, protein: 27, fat: 18, carb: 0.3, fiber: 0, sodium: 1300, vitFat: ['E'], vitWater: ['B1', 'B12'], minerals: ['铁', '锌', '硒'], note: '偏高估算：风干生火腿，蛋白高但钠极高；2–3 片约 30g 即可，不必额外加盐' },
  { id: 'ita-tiramisu', name: '提拉米苏（Tiramisù）', cat: 'cuisine', kcal: 304, protein: 5, fat: 20, carb: 26, fiber: 0.8, sodium: 90, vitFat: ['A'], vitWater: ['B2'], minerals: ['钙'], note: '偏高估算：马斯卡彭+糖+咖啡酒，含少量酒精与咖啡因；一份 100g≈304kcal' },
  { id: 'ita-salsiccia', name: '意式香肠（Salsiccia）', cat: 'cuisine', kcal: 340, protein: 20, fat: 28, carb: 2, fiber: 0, sodium: 1100, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['锌', '铁'], note: '偏高估算：猪肉肠脂肪约 28g/100g，钠高；一根约 100g≈340kcal' },
  { id: 'ita-polpette', name: '意式肉丸（Polpette）', cat: 'cuisine', kcal: 245, protein: 15, fat: 17, carb: 8, fiber: 0.6, sodium: 560, vitFat: ['A'], vitWater: ['B12'], minerals: ['铁', '锌'], note: '偏高估算：牛肉末+面包糠+帕玛森，通常再煎炸；一颗约 50g≈123kcal' },
  { id: 'ita-gelato', name: '意式冰淇淋（Gelato）', cat: 'cuisine', kcal: 205, protein: 4, fat: 9, carb: 27, fiber: 0.3, sodium: 80, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'], note: '偏高估算：脂肪低于美式冰淇淋但糖更高；一球 60g≈123kcal' },
  { id: 'ita-pesto-pasta', name: '青酱意面（Pesto）', cat: 'cuisine', kcal: 242, protein: 7, fat: 14, carb: 22, fiber: 2, sodium: 480, vitFat: ['A', 'E', 'K'], vitWater: ['B2'], minerals: ['钙', '镁'], phytochem: ['叶绿素', '松油烯'], note: '偏高估算：罗勒+松子+帕玛森+大量橄榄油，脂肪 14g/100g；一份 250g≈605kcal' },
];
