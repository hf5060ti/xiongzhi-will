// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: FRUITS
// 水果（常见 / 浆果与特色果），每 100g 可食部参考值
import type { IFood } from './types';

export const FRUITS: IFood[] = [
  // ---- 常见 ----
  { id: 'banana', name: '香蕉', cat: 'fruit', kcal: 89, protein: 1.1, fat: 0.3, carb: 23, fiber: 2.6, sodium: 1, vitFat: [], vitWater: ['B6', 'C'], minerals: ['钾'], note: '训练前后补碳好选择' },
  { id: 'apple', name: '苹果', cat: 'fruit', kcal: 52, protein: 0.3, fat: 0.2, carb: 14, fiber: 2.4, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'orange', name: '橙子', cat: 'fruit', kcal: 47, protein: 0.9, fat: 0.1, carb: 12, fiber: 2.4, sodium: 0, vitFat: [], vitWater: ['C', '叶酸'], minerals: ['钾'] },
  { id: 'kiwi', name: '猕猴桃', cat: 'fruit', kcal: 61, protein: 1.1, fat: 0.5, carb: 15, fiber: 3, sodium: 3, vitFat: ['E', 'K'], vitWater: ['C'], minerals: ['钾'], note: '维C含量高' },
  { id: 'strawberry', name: '草莓', cat: 'fruit', kcal: 32, protein: 0.7, fat: 0.3, carb: 7.7, fiber: 2, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['锰'] },
  { id: 'blueberry', name: '蓝莓', cat: 'fruit', kcal: 57, protein: 0.7, fat: 0.3, carb: 14.5, fiber: 2.4, sodium: 1, vitFat: ['K'], vitWater: ['C'], minerals: ['锰'], phytochem: ['花青素（花色苷）：强抗氧化、改善血管内皮、研究提示有助于认知功能', '紫檀芪：白藜芦醇类似物'], note: '花青素丰富，抗氧化' },
  { id: 'grape', name: '葡萄', cat: 'fruit', kcal: 69, protein: 0.7, fat: 0.2, carb: 18, fiber: 0.9, sodium: 2, vitFat: ['K'], vitWater: ['C'], minerals: ['钾'], phytochem: ['白藜芦醇（红葡萄皮）：抗氧化、保护心血管', '原花青素：抗氧化'] },
  { id: 'watermelon', name: '西瓜', cat: 'fruit', kcal: 30, protein: 0.6, fat: 0.2, carb: 7.6, fiber: 0.4, sodium: 1, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['瓜氨酸（果肉含量突出）：可在体内转化为精氨酸，促进一氧化氮合成、改善血管血流', '精氨酸（瓜子中含量高）：条件必需氨基酸，对男性生殖健康友好'], note: '低热量高水分，训练后补水补碳；瓜氨酸/精氨酸组合被研究提示对男性血管与生殖功能友好；血糖高者注意份量' },
  { id: 'pear', name: '梨', cat: 'fruit', kcal: 57, protein: 0.4, fat: 0.1, carb: 15, fiber: 3.1, sodium: 1, vitFat: ['K'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'peach', name: '桃', cat: 'fruit', kcal: 39, protein: 0.9, fat: 0.3, carb: 9.5, fiber: 1.5, sodium: 0, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'mango', name: '芒果', cat: 'fruit', kcal: 60, protein: 0.8, fat: 0.4, carb: 15, fiber: 1.6, sodium: 1, vitFat: ['A'], vitWater: ['C', '叶酸'], minerals: ['钾'] },
  { id: 'pineapple', name: '菠萝', cat: 'fruit', kcal: 50, protein: 0.5, fat: 0.1, carb: 13, fiber: 1.4, sodium: 1, vitFat: [], vitWater: ['C', 'B6'], minerals: ['锰'] },
  { id: 'cherry', name: '樱桃', cat: 'fruit', kcal: 63, protein: 1.1, fat: 0.2, carb: 16, fiber: 2.1, sodium: 0, vitFat: ['K'], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素：抗炎、研究提示可缓解运动后肌肉酸痛', '褪黑素：助眠'], note: '富含花青素' },
  { id: 'pomelo', name: '柚子', cat: 'fruit', kcal: 42, protein: 0.8, fat: 0.2, carb: 9.6, fiber: 1, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'pomegranate', name: '石榴', cat: 'fruit', kcal: 83, protein: 1.7, fat: 1.2, carb: 19, fiber: 4, sodium: 3, vitFat: ['K'], vitWater: ['C', '叶酸'], minerals: ['钾'], phytochem: ['安石榴苷：强效抗氧化，研究提示改善血流、保护前列腺', '鞣花酸：抗氧化、抗炎'] },

  // ---- 浆果与特色 ----
  { id: 'avocado', name: '牛油果', cat: 'fruit', kcal: 160, protein: 2, fat: 15, carb: 9, fiber: 7, sodium: 7, vitFat: ['E', 'K'], vitWater: ['B5', 'B6', 'C'], minerals: ['钾'], phytochem: ['谷胱甘肽：肝脏抗氧化底物', '植物甾醇：辅助降胆固醇'], note: '优质脂肪来源，热量较高' },
  { id: 'mulberry', name: '桑葚', cat: 'fruit', kcal: 43, protein: 1.4, fat: 0.4, carb: 9.8, fiber: 1.7, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['铁'], phytochem: ['花青素：抗氧化、护眼', '白藜芦醇：心血管保护'], note: '花青素丰富' },
  { id: 'goji-berry', name: '枸杞（干）', cat: 'fruit', kcal: 349, protein: 14, fat: 0.4, carb: 77, fiber: 13, sodium: 25, vitFat: ['A'], vitWater: ['C', 'B1'], minerals: ['铁', '锌'], phytochem: ['玉米黄质：护眼黄斑', '枸杞多糖：免疫调节'], note: '干品热量密度高，少量食用' },
  { id: 'cranberry', name: '蔓越莓', cat: 'fruit', kcal: 46, protein: 0.4, fat: 0.1, carb: 12, fiber: 4.6, sodium: 2, vitFat: ['K'], vitWater: ['C'], minerals: ['锰'], phytochem: ['原花青素（A型）：抑制大肠杆菌黏附泌尿道，预防尿路感染'], note: '原花青素丰富' },
  { id: 'raspberry', name: '树莓', cat: 'fruit', kcal: 52, protein: 1.2, fat: 0.7, carb: 12, fiber: 6.5, sodium: 1, vitFat: ['K', 'E'], vitWater: ['C'], minerals: ['锰'], phytochem: ['鞣花单宁：抗氧化、抗癌研究', '覆盆子酮：研究提示辅助脂代谢'], note: '低糖高纤维' },
  { id: 'blackberry', name: '黑莓', cat: 'fruit', kcal: 43, protein: 1.4, fat: 0.5, carb: 10, fiber: 5.3, sodium: 1, vitFat: ['K', 'E'], vitWater: ['C'], minerals: ['锰'], phytochem: ['花青素：抗氧化', '鞣花酸：抗炎'] },
  { id: 'acai-pulp', name: '巴西莓（果泥）', cat: 'fruit', kcal: 70, protein: 0.7, fat: 4.5, carb: 6.7, fiber: 3, sodium: 8, vitFat: ['E'], vitWater: [], minerals: ['钾'], phytochem: ['花青素（飞燕草素）：抗氧化能力在浆果中名列前茅', '植物甾醇：辅助降胆固醇'], note: '花青素抗氧化极强，冷冻果泥常见' },
  { id: 'sea-buckthorn', name: '沙棘果', cat: 'fruit', kcal: 82, protein: 1.4, fat: 5.4, carb: 8, fiber: 4, sodium: 2, vitFat: ['A', 'E', 'K'], vitWater: ['C'], minerals: ['钾', '钙'], phytochem: ['维C：含量约为橙子 10 倍', '沙棘黄酮：抗炎、保护血管', 'ω-7（棕榈油酸）：皮肤黏膜修复'], note: '维C含量约为橙子10倍，类黄酮丰富' },
  { id: 'prune-dry', name: '西梅（干）', cat: 'fruit', kcal: 240, protein: 2.2, fat: 0.4, carb: 64, fiber: 7, sodium: 2, vitFat: ['K', 'A'], vitWater: ['B6'], minerals: ['钾'], note: '干品高糖，润肠通便' },
  { id: 'fig', name: '无花果（鲜）', cat: 'fruit', kcal: 74, protein: 0.8, fat: 0.3, carb: 19, fiber: 2.9, sodium: 1, vitFat: ['K'], vitWater: ['B6'], minerals: ['钾', '钙', '镁'], note: '可溶性纤维丰富、助肠道，钾钙镁均衡；果糖与天然糖偏高，控量' },
  { id: 'fig-dry', name: '无花果（干）', cat: 'fruit', kcal: 249, protein: 3.3, fat: 0.9, carb: 63.9, fiber: 9.8, sodium: 10, vitFat: ['K'], vitWater: ['B6'], minerals: ['钾', '钙', '镁', '铁'], note: '干品糖与纤维双高，当零食或代糖，注意份量' },
  { id: 'lychee', name: '荔枝', cat: 'fruit', kcal: 66, protein: 0.8, fat: 0.4, carb: 16.5, fiber: 1.3, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '高糖，控制份量' },
  { id: 'coconut-meat', name: '椰肉', cat: 'fruit', kcal: 354, protein: 3.3, fat: 33, carb: 15, fiber: 9, sodium: 20, vitFat: ['E'], vitWater: ['B6'], minerals: ['钾'], note: '高脂高热量，少量' },
  { id: 'coconut-oil', name: '椰子油', cat: 'fruit', kcal: 862, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 0, vitFat: ['E', 'K'], vitWater: [], minerals: [], note: '纯脂肪（1g≈9kcal），中链甘油三酯（MCT）占比高，生酮/高脂饮食可选；但饱和脂肪为主，心血管敏感者适量' },
  { id: 'monk-fruit', name: '罗汉果（干果）', cat: 'fruit', kcal: 60, protein: 0.8, fat: 0.3, carb: 15, fiber: 2.5, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['罗汉果甜苷：天然甜味剂（甜度约为蔗糖 200-300 倍，几乎不被吸收、零热量），强抗氧化、护喉润肺'], note: '泡水天然代糖，健身控糖人群友好；市售罗汉果代糖饮品注意配料是否掺其他糖；脾胃虚寒者少量' },

  // ---- 公开食物成分数据扩充（26 条）：每 100g 参考值 ----
  { id: 'grapefruit', name: '西柚', cat: 'fruit', kcal: 33, protein: 0.8, fat: 0.1, carb: 8.4, fiber: 1.1, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'lemon', name: '柠檬', cat: 'fruit', kcal: 37, protein: 1.1, fat: 1.2, carb: 6.2, fiber: 1.3, sodium: 1, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'tangerine', name: '橘子', cat: 'fruit', kcal: 44, protein: 0.8, fat: 0.1, carb: 11.5, fiber: 0.6, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'kumquat', name: '金桔', cat: 'fruit', kcal: 55, protein: 1, fat: 0.2, carb: 13.7, fiber: 4.4, sodium: 3, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'jujube-fresh', name: '鲜枣', cat: 'fruit', kcal: 125, protein: 1.1, fat: 0.3, carb: 30.5, fiber: 1.9, sodium: 1.2, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '维C含量极高' },
  { id: 'jujube-dry', name: '红枣（干）', cat: 'fruit', kcal: 276, protein: 3.2, fat: 0.5, carb: 67.8, fiber: 6.2, sodium: 6, vitFat: [], vitWater: ['C'], minerals: ['钾', '铁'], note: '高糖，少量食用' },
  { id: 'persimmon', name: '柿子', cat: 'fruit', kcal: 74, protein: 0.4, fat: 0.1, carb: 18.5, fiber: 1.4, sodium: 1, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '空腹不宜多食' },
  { id: 'papaya', name: '木瓜', cat: 'fruit', kcal: 30, protein: 0.4, fat: 0.1, carb: 7, fiber: 0.8, sodium: 8, vitFat: ['A'], vitWater: ['C', '叶酸'], minerals: ['钾'], note: '含木瓜蛋白酶' },
  { id: 'dragon-fruit', name: '火龙果', cat: 'fruit', kcal: 55, protein: 1.1, fat: 0.2, carb: 13.3, fiber: 1.6, sodium: 2, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '含甜菜红素与低聚糖' },
  { id: 'durian', name: '榴莲', cat: 'fruit', kcal: 150, protein: 2.6, fat: 3.3, carb: 28.3, fiber: 1.7, sodium: 3, vitFat: [], vitWater: ['C', 'B1'], minerals: ['钾'], note: '高糖高脂' },
  { id: 'longan-dry', name: '桂圆（干）', cat: 'fruit', kcal: 313, protein: 5, fat: 0.2, carb: 71.5, fiber: 2, sodium: 10, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '高糖' },
  { id: 'carambola', name: '杨桃', cat: 'fruit', kcal: 31, protein: 0.6, fat: 0.2, carb: 7.4, fiber: 1.2, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '肾病患者慎食' },
  { id: 'loquat', name: '枇杷', cat: 'fruit', kcal: 41, protein: 0.8, fat: 0.2, carb: 9.3, fiber: 0.8, sodium: 4, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'melon-hami', name: '哈密瓜', cat: 'fruit', kcal: 34, protein: 0.5, fat: 0.1, carb: 7.9, fiber: 0.2, sodium: 27, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'cantaloupe', name: '香瓜', cat: 'fruit', kcal: 26, protein: 0.4, fat: 0.1, carb: 6.2, fiber: 0.4, sodium: 35, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'nectarine', name: '油桃', cat: 'fruit', kcal: 44, protein: 1.1, fat: 0.3, carb: 10.6, fiber: 1.7, sodium: 0, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'plum', name: '李子', cat: 'fruit', kcal: 38, protein: 0.7, fat: 0.2, carb: 8.7, fiber: 1.3, sodium: 2, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'apricot', name: '杏', cat: 'fruit', kcal: 38, protein: 0.9, fat: 0.1, carb: 9.1, fiber: 1.3, sodium: 2, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'] },
  { id: 'passion-fruit', name: '百香果', cat: 'fruit', kcal: 97, protein: 2.2, fat: 0.7, carb: 23, fiber: 10.4, sodium: 28, vitFat: ['A'], vitWater: ['C'], minerals: ['钾', '铁'] },
  { id: 'sugarcane', name: '甘蔗', cat: 'fruit', kcal: 64, protein: 0.4, fat: 0.1, carb: 16, fiber: 0.6, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '以蔗糖为主' },
  { id: 'jackfruit', name: '菠萝蜜', cat: 'fruit', kcal: 105, protein: 1.7, fat: 0.3, carb: 25, fiber: 2.6, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'rambutan', name: '红毛丹', cat: 'fruit', kcal: 82, protein: 0.7, fat: 0.2, carb: 20, fiber: 1, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'mangosteen', name: '山竹', cat: 'fruit', kcal: 72, protein: 0.7, fat: 0.6, carb: 17.5, fiber: 1.5, sodium: 4, vitFat: [], vitWater: ['C'], minerals: ['钾'] },
  { id: 'guava', name: '番石榴', cat: 'fruit', kcal: 51, protein: 1.1, fat: 0.4, carb: 14.2, fiber: 5.9, sodium: 3, vitFat: ['A'], vitWater: ['C', '叶酸'], minerals: ['钾'] },
  { id: 'raisin', name: '葡萄干', cat: 'fruit', kcal: 344, protein: 2.5, fat: 0.4, carb: 83.4, fiber: 2.5, sodium: 19, vitFat: ['K'], vitWater: ['B1'], minerals: ['钾', '铁'], note: '高糖，注意份量' },
  { id: 'dried-apricot', name: '杏干', cat: 'fruit', kcal: 320, protein: 3.5, fat: 0.4, carb: 75, fiber: 7, sodium: 15, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '高糖' },

  // ---- 水果扩充（更多品种） ----
  { id: 'wax-apple', name: '莲雾', cat: 'fruit', kcal: 34, protein: 0.6, fat: 0.2, carb: 8.4, fiber: 1.2, sodium: 20, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '水分高、低热量，清热解渴' },
  { id: 'soursop', name: '释迦（番荔枝）', cat: 'fruit', kcal: 105, protein: 1.6, fat: 0.3, carb: 26, fiber: 3.3, sodium: 4, vitFat: ['C'], vitWater: ['B6', 'C'], minerals: ['钾', '镁'], note: '甜度高，血糖高者适量' },
  { id: 'yellow-peach', name: '黄桃', cat: 'fruit', kcal: 45, protein: 0.8, fat: 0.2, carb: 11, fiber: 1.2, sodium: 5, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '罐头黄桃含糖浆，鲜食更佳' },
  { id: 'waxberry', name: '杨梅', cat: 'fruit', kcal: 30, protein: 0.8, fat: 0.2, carb: 6.7, fiber: 1, sodium: 2, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素'], note: '花青素抗炎；核可食部分少' },
  { id: 'hawthorn', name: '山楂', cat: 'fruit', kcal: 95, protein: 0.7, fat: 0.2, carb: 22, fiber: 2, sodium: 10, vitFat: ['A'], vitWater: ['C'], minerals: ['钾', '铁'], note: '有机酸促消化；孕妇及胃酸多者慎食' },
  { id: 'bayberry-dry', name: '杨梅干', cat: 'fruit', kcal: 300, protein: 2, fat: 0.3, carb: 72, fiber: 3, sodium: 40, vitFat: [], vitWater: [], minerals: ['钾'], note: '加糖腌制，高糖' },
  { id: 'red-jujube-fresh', name: '冬枣', cat: 'fruit', kcal: 105, protein: 1, fat: 0.2, carb: 27, fiber: 2, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '维C含量极高，鲜枣中之王' },
  { id: 'plum-green', name: '青梅', cat: 'fruit', kcal: 30, protein: 0.5, fat: 0.1, carb: 7, fiber: 1.5, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '酸度高，多用于腌渍' },
  { id: 'olive-fruit', name: '橄榄（青果）', cat: 'fruit', kcal: 115, protein: 1.1, fat: 11, carb: 7, fiber: 3, sodium: 10, vitFat: ['E', 'K'], vitWater: ['C'], minerals: ['钙', '铁'], note: '钙含量高，初嚼苦涩回甘' },
  { id: 'ginkgo', name: '白果（银杏果）', cat: 'fruit', kcal: 180, protein: 4, fat: 1.3, carb: 38, fiber: 1.5, sodium: 2, vitFat: [], vitWater: ['B1', 'B2'], minerals: ['钾', '磷'], note: '含银杏酸，成人每日不超过 5-10 颗，不可生食' },
  { id: 'acai-powder', name: '巴西莓粉', cat: 'fruit', kcal: 530, protein: 10, fat: 33, carb: 60, fiber: 35, sodium: 10, vitFat: ['E'], vitWater: [], minerals: ['钾'], phytochem: ['花青素（飞燕草素）：抗氧化', '植物甾醇'], note: '冷冻干燥粉，每日 5-10g 拌碗/冲水；碳水多为纤维，市售加糖款需看配料表' },

  // ---- 干果补充（用户点名） ----
  { id: 'date-medjool', name: '椰枣（干）', cat: 'fruit', kcal: 277, protein: 1.8, fat: 0.2, carb: 75, fiber: 6.7, sodium: 1, vitFat: [], vitWater: ['B6'], minerals: ['钾', '镁'], note: '天然高糖干果，训练前后快速补糖可用；含钾丰富，控糖人群注意份量' },

  // ---- 用户点名补充 ----
  { id: 'shanzha', name: '山楂（鲜）', cat: 'fruit', kcal: 102, protein: 0.5, fat: 0.2, carb: 25, fiber: 3, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['山楂酸', '山楂黄酮', '果胶'], note: '鲜山楂维C约53mg/100g，黄酮助消化、辅助降血脂；味极酸，多做糖葫芦/果丹皮/蜜饯，加工后糖飙升；脾胃弱者空腹少食' },
];