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

  // ---- 用户点名补充 ----
  { id: 'raspberry', name: '树莓/覆盆子', cat: 'fruit', kcal: 53, protein: 1.2, fat: 0.7, carb: 11.9, fiber: 6.5, sodium: 1, vitFat: [], vitWater: ['C', 'K'], minerals: ['锰'], phytochem: ['花青素', '鞣花单宁', '覆盆子酮'], note: '纤维密度在常见水果里最高（约6.5g/100g），净碳水仅约5g；抗氧化密度高；新鲜易烂，冷冻款营养保留好；"覆盆子酮燃脂"证据极弱，别信减肥广告' },
  { id: 'bergamot', name: '佛手柑', cat: 'fruit', kcal: 49, protein: 1.3, fat: 0.4, carb: 13, fiber: 5, sodium: 6, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['佛手柑素（bergamottin）', '呋喃香豆素'], note: '【重要药物相互作用】佛手柑素与西柚呋喃香豆素类似，会抑制肝脏CYP3A4酶，与他汀类（阿托伐他汀等）、降压药、抗组胺药、部分抗抑郁药、抗凝药发生相互作用，可能导致血药浓度升高与副作用。服药期间慎饮伯爵茶/佛手柑茶；孕妇/哺乳期适量。' },
  { id: 'dangshan-pear', name: '砀山酥梨（安徽特产）', cat: 'fruit', kcal: 50, protein: 0.3, fat: 0.2, carb: 13, fiber: 3.1, sodium: 2, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['梨多酚'], note: '安徽砀山特产，皮薄汁多味甜；一个中等约250g可食部=125kcal；秋燥润肺常用，冰糖炖梨；果糖含量约7-8%，糖尿病人一次半个；梨籽含微量氰苷，别嚼碎吃' },

  // ---- 用户点名补充 ----
  { id: 'juzi', name: '橘子/蜜橘', cat: 'fruit', kcal: 53, protein: 0.8, fat: 0.2, carb: 13, fiber: 2.4, sodium: 1, vitFat: [], vitWater: ['C', 'B1'], minerals: ['钾'], phytochem: ['橙皮苷（hesperidin）', 'β-隐黄质'], note: '一个约100g=53kcal；橙皮苷有助血管健康；橘络（白色筋）别全撕，含黄酮；吃多皮肤发黄（胡萝卜素血症）停几天即退；空腹胃酸多者少食' },
  { id: 'chengzi', name: '橙子', cat: 'fruit', kcal: 47, protein: 0.9, fat: 0.1, carb: 12, fiber: 2.4, sodium: 0, vitFat: [], vitWater: ['C（约53mg/100g）', 'B9'], minerals: ['钾'], phytochem: ['橙皮苷', '叶酸'], note: '一个中等约150g可食部=70kcal；整吃比榨汁好，榨汁丢失纤维且血糖反应快；服药期间与西柚不同，橙子对CYP3A4影响很小；术后/感冒补维C常用' },
  { id: 'putao-qing', name: '提子/青葡萄（无核白）', cat: 'fruit', kcal: 69, protein: 0.7, fat: 0.2, carb: 18, fiber: 0.9, sodium: 2, vitFat: [], vitWater: ['C', 'K'], minerals: ['钾'], phytochem: ['白藜芦醇（主要在皮和籽）', '花青素（红皮）'], note: '一串约200g可食部=138kcal；含糖约16-18%，比橙子橘子高，一次别超一小碗（约150g）；白藜芦醇主要在皮，连皮吃；葡萄籽含多酚但整粒不消化，嚼碎才吸收；葡萄皮上白霜是天然酵母，正常现象' },

  // ---- 用户点名补充 ----
  { id: 'huang-tao', name: '黄桃', cat: 'fruit', kcal: 54, protein: 0.5, fat: 0.1, carb: 14, fiber: 1.3, sodium: 0, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['β-胡萝卜素（黄色）', '番茄红素（少量）'], note: '一个约150g=81kcal；果肉黄色来自β-胡萝卜素；罐头黄桃多半加糖 syrup，一罐约200g=160kcal，鲜吃优于罐头；过敏者（桃毛）削皮吃' },
  { id: 'mi-hou-tao', name: '猕猴桃', cat: 'fruit', kcal: 61, protein: 0.8, fat: 0.6, carb: 15, fiber: 3, sodium: 3, vitFat: [], vitWater: ['C（约62mg/100g）', 'K', '叶酸'], minerals: ['钾'], phytochem: ['猕猴桃碱（actinidin，蛋白酶）', '叶黄素'], note: '一个约80g=49kcal；维C密度高，一个就够一天需求；猕猴桃碱可嫩化肉类，但空腹吃可能刺激胃；服药者注意与华法林交互（维K）；过敏者口腔刺痒' },
  { id: 'shui-mi-tao', name: '水蜜桃', cat: 'fruit', kcal: 48, protein: 0.9, fat: 0.1, carb: 12, fiber: 1.3, sodium: 0, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素（红皮）'], note: '一个约150g=72kcal；多汁软甜，桃毛过敏者削皮；升糖指数约28，比西瓜低；别把桃罐头（加糖）当水果' },
  { id: 'xue-cheng', name: '血橙', cat: 'fruit', kcal: 47, protein: 0.9, fat: 0.1, carb: 12, fiber: 2.4, sodium: 0, vitFat: [], vitWater: ['C', '叶酸'], minerals: ['钾'], phytochem: ['花青素（天竺葵素，红色果肉）', '橙皮苷'], note: '一个约150g=70kcal；红色来自花青素（普通橙子没有），抗氧化更强；口感比普通橙略酸；冬季限定；维C与普通橙接近' },
  { id: 'xiang-jiao', name: '香蕉', cat: 'fruit', kcal: 89, protein: 1.1, fat: 0.3, carb: 23, fiber: 2.6, sodium: 1, vitFat: [], vitWater: ['B6', 'C', '叶酸'], minerals: ['钾（约358mg/100g）', '镁'], phytochem: ['多巴胺（果肉，少量）', '血清素前体（色氨酸）'], note: '一根约120g=107kcal；练后快碳+钾来源，防抽筋；青香蕉抗性淀粉多（助消化），熟香蕉糖高；"助眠"来自色氨酸但量有限；别空腹大量吃（鞣酸+镁）' },

  // ---- 用户点名补充 ----
  { id: 'ying-tao', name: '樱桃', cat: 'fruit', kcal: 63, protein: 1.1, fat: 0.2, carb: 16, fiber: 2.1, sodium: 0, vitFat: [], vitWater: ['C', 'A'], minerals: ['钾'], phytochem: ['花青素（红皮）', '褪黑素（天然）', '樱桃酸'], note: '一小碗约100g=63kcal；花青素密度高；研究提示樱桃酸有助缓解痛风发作（樱桃酸促尿酸排泄）；含天然褪黑素（量少）；别买糖渍樱桃罐头；核别嚼碎（苦杏仁苷）' },
  { id: 'lan-bao-shi', name: '蓝宝石葡萄/月光之泪', cat: 'fruit', kcal: 70, protein: 0.8, fat: 0.2, carb: 18, fiber: 1, sodium: 2, vitFat: [], vitWater: ['C', 'K'], minerals: ['钾'], phytochem: ['白藜芦醇（皮）', '花青素'], note: '长形无核葡萄品种，比普通提子更甜；一串约150g=105kcal；含糖约17-19%，比橘子高；一口一个容易吃多，一次别超一小碗；皮薄无籽连皮吃' },
  { id: 'hei-mei-ren', name: '黑美人西瓜', cat: 'fruit', kcal: 30, protein: 0.6, fat: 0.2, carb: 8, fiber: 0.4, sodium: 1, vitFat: [], vitWater: ['C', 'B6'], minerals: ['钾'], phytochem: ['番茄红素（红瓤）', '瓜氨酸'], note: '【精氨酸友好】西瓜瓜氨酸含量高，有助于血管舒张（运动前吃半块）；黑美人是常见品种，瓜皮深黑绿、瓜瓤深红；一块约300g=90kcal；升糖指数GI约72偏高，但GL低（水分大）；糖尿病人一次100-150g；别冰镇太狠伤胃' },

  // ---- 浆果与特色补充（用户点名） ----
  { id: 'snake-apple', name: '蛇果/红元帅', cat: 'fruit', kcal: 59, protein: 0.3, fat: 0.2, carb: 15, fiber: 2.3, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素（红皮）', '果胶'], note: '一个约200g=118kcal；比普通苹果更甜更软，水分稍少；果胶与花青素在皮上，连皮吃；放久发面（淀粉转化为糖后变软）；果汁不如脆苹果，鲜食最佳' },
  { id: 'lantern-fruit', name: '灯笼果/姑娘果', cat: 'fruit', kcal: 53, protein: 1.9, fat: 0.6, carb: 11.2, fiber: 4.9, sodium: 2, vitFat: [], vitWater: ['C', 'B2'], minerals: ['钾', '磷', '铁'], phytochem: ['酸浆苦素（Physalin）', '玉米黄质'], note: '东北特色小野果，外层薄苞叶像灯笼；味道酸甜微苦；维C与B2丰富；未成熟（青色）含生物碱，必须完全变黄才能吃；一小碗约100g=53kcal；鲜食或做果酱' },
  { id: 'black-currant', name: '黑加仑/黑醋栗', cat: 'fruit', kcal: 63, protein: 1.4, fat: 0.4, carb: 15.4, fiber: 4.8, sodium: 2, vitFat: [], vitWater: ['C（约181mg/100g，远高于橙子）', 'B5'], minerals: ['钾', '锰'], phytochem: ['花青素（飞燕草素）', '维生素C（极高）', 'γ-亚麻酸（种子油中）'], note: '维C密度约为橙子3倍（181mg/100g）；花青素抗氧化强；一小把约50g=32kcal；鲜果酸涩，常做果汁/果酱；市售黑加仑果汁多半加糖，看配料表' },
  { id: 'cranberry-dry', name: '蔓越莓干', cat: 'fruit', kcal: 308, protein: 0.2, fat: 1.7, carb: 82, fiber: 5, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['锰'], phytochem: ['A型原花青素（防尿路感染）'], note: '鲜蔓越莓极酸，市售干品几乎都加了大量蔗糖/苹果汁调和；一把约40g=123kcal；"防尿路感染"是鲜蔓越莓证据较强，干品加糖后功效打折扣；选无糖烘干款更佳' },
  { id: 'boysenberry', name: '博伊森莓/波森莓', cat: 'fruit', kcal: 50, protein: 1.1, fat: 0.3, carb: 12, fiber: 5.3, sodium: 1, vitFat: [], vitWater: ['C', 'K'], minerals: ['锰'], phytochem: ['花青素', '鞣花酸'], note: '黑莓/树莓/露莓杂交品种，比普通黑莓更大更甜；纤维密度高（约5.3g/100g）；鲜食或做派/果酱；国内较少见，冷冻款常见；一小碗约100g=50kcal' },
  { id: 'argenberry', name: '野樱莓/阿罗尼亚浆果', cat: 'fruit', kcal: 47, protein: 1.4, fat: 0.5, carb: 11.4, fiber: 5.3, sodium: 2, vitFat: [], vitWater: ['C', 'K'], minerals: ['锰'], phytochem: ['花青素（密度在常见浆果中名列前茅）', '原花青素', '鞣花酸'], note: '抗氧化密度极高（ORAC值在浆果中顶尖）；鲜食极涩（单宁重），国内多做果汁/冻干粉/提取物；一小把约50g=24kcal；研究提示对血压、血糖、炎症标志物有益；不是"神果"，日常蓝莓即可' },

  // ---- 更多水果补充 ----
  { id: 'raspberry-red', name: '红树莓/覆盆子', cat: 'fruit', kcal: 52, protein: 1.2, fat: 0.7, carb: 11.9, fiber: 6.5, sodium: 1, vitFat: ['K', 'E'], vitWater: ['C'], minerals: ['锰', '镁'], phytochem: ['鞣花单宁', '覆盆子酮'], note: '低糖高纤维；冷冻款常见；一小碗约100g=52kcal；比蓝莓更酸更涩' },
  { id: 'gooseberry', name: '醋栗/灯笼果', cat: 'fruit', kcal: 44, protein: 0.9, fat: 0.6, carb: 10.2, fiber: 4.3, sodium: 1, vitFat: [], vitWater: ['C'], minerals: ['铜', '锰'], phytochem: ['花青素（红皮）'], note: '欧洲常见小浆果；绿色款酸甜，红色款更甜；做果酱/派；国内较少见' },
  { id: 'elderberry', name: '接骨木莓', cat: 'fruit', kcal: 73, protein: 0.7, fat: 0.5, carb: 18.4, fiber: 7, sodium: 6, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['花青素（极高）', '黄酮类'], note: '【安全警告】鲜果和叶子有毒，必须煮熟；研究提示对感冒有轻微缩短病程作用；一小杯果汁约100g=73kcal；别生吃' },
  { id: 'mulberry-fresh', name: '鲜桑葚', cat: 'fruit', kcal: 49, protein: 1.7, fat: 0.4, carb: 11.4, fiber: 1.7, sodium: 3, vitFat: ['A'], vitWater: ['C'], minerals: ['铁', '钙'], phytochem: ['花青素', '白藜芦醇'], note: '紫桑葚染色力极强，吃了嘴手全紫；鲜吃或泡酒；干品高糖；一次别吃太多，可能拉深色便便（正常）' },
  { id: 'starfruit', name: '杨桃/阳桃', cat: 'fruit', kcal: 31, protein: 1, fat: 0.3, carb: 6.7, fiber: 2.8, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['草酸盐'], note: '【肾警告】含神经毒素和高草酸，肾功能不好/透析患者绝对不能吃；正常人少量；切片星星形状好看' },
  { id: 'rambutan', name: '红毛丹', cat: 'fruit', kcal: 82, protein: 0.7, fat: 0.2, carb: 20.9, fiber: 0.9, sodium: 11, vitFat: [], vitWater: ['C'], minerals: ['锰'], note: '东南亚热带水果；像长毛的荔枝；味道比荔枝淡；核不能吃（苦）' },
  { id: 'longan-fresh', name: '鲜桂圆/龙眼', cat: 'fruit', kcal: 60, protein: 1.3, fat: 0.1, carb: 15.1, fiber: 1.1, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '比荔枝更甜更暖；中医说"上火"；一小碗约100g=60kcal；干品热量高很多' },
  { id: 'durian', name: '榴莲', cat: 'fruit', kcal: 147, protein: 1.5, fat: 5.3, carb: 27.1, fiber: 3.8, sodium: 2, vitFat: [], vitWater: ['C'], minerals: ['钾', '锰'], phytochem: ['硫化物（臭味来源）'], note: '水果热量炸弹；脂肪和糖都高；一瓣约100g=147kcal；"水果之王"；吃完别喝酒（胀气）；痛风/高尿酸者慎（高嘌呤）' },
  { id: 'jackfruit', name: '菠萝蜜', cat: 'fruit', kcal: 95, protein: 1.7, fat: 0.6, carb: 23.6, fiber: 1.5, sodium: 3, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '热带大型水果；果肉黄色甜；种子煮熟能吃（像栗子）；比榴莲热量低但糖也不低' },
  { id: 'guava', name: '番石榴/芭乐', cat: 'fruit', kcal: 68, protein: 2.6, fat: 1, carb: 14.3, fiber: 5.4, sodium: 5, vitFat: [], vitWater: ['C（约228mg/100g，橙子3倍）'], minerals: ['钾'], phytochem: ['番茄红素（粉色果肉）'], note: '维C密度极高（约橙子3倍）；低糖高纤维；台湾常见；酸梅粉蘸着吃；籽多别嚼碎' },
  { id: 'passionfruit', name: '百香果/西番莲', cat: 'fruit', kcal: 97, protein: 2.2, fat: 0.7, carb: 23.4, fiber: 10.4, sodium: 28, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['多酚', '蒽醌类'], note: '高纤维（10g/100g）；泡茶/果汁；酸；籽咬不碎直接吞；一个约30g=29kcal' },
  { id: 'kiwi-gold', name: '黄金猕猴桃', cat: 'fruit', kcal: 63, protein: 1.1, fat: 0.3, carb: 15.2, fiber: 3, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '比绿心猕猴桃更甜少酸；维C更高；黄色果肉来自类胡萝卜素；别和牛奶一起吃（蛋白酶凝乳）' },
  { id: 'dragonfruit-red', name: '红心火龙果', cat: 'fruit', kcal: 50, protein: 1.1, fat: 0.4, carb: 13, fiber: 3, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['铁'], phytochem: ['甜菜红素（不是花青素，水溶性）'], note: '红心吃了便便/尿液变红是正常的（甜菜红素），别慌；白心更甜热量稍低；籽不消化；通便效果一般，别迷信' },
  { id: 'dragonfruit-white', name: '白心火龙果', cat: 'fruit', kcal: 51, protein: 1.1, fat: 0.4, carb: 13, fiber: 3, sodium: 3, vitFat: [], vitWater: ['C'], minerals: [], note: '比红心更甜；没有红心的色素；热量接近' },
  { id: 'hami-melon', name: '哈密瓜', cat: 'fruit', kcal: 34, protein: 0.8, fat: 0.2, carb: 8, fiber: 0.9, sodium: 11, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '新疆特产；甜；一块约200g=68kcal；升糖指数GI约70偏高，糖尿病人少量' },
  { id: 'cantaloupe', name: '甜瓜/香瓜', cat: 'fruit', kcal: 34, protein: 0.8, fat: 0.2, carb: 8.2, fiber: 0.9, sodium: 16, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '常见薄皮甜瓜；比哈密瓜更脆更小；夏天吃' },
  { id: 'persimmon-soft', name: '软柿子/火晶柿', cat: 'fruit', kcal: 74, protein: 0.6, fat: 0.2, carb: 18.5, fiber: 1.7, sodium: 1, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['鞣酸（未熟高）'], note: '空腹别吃未熟柿子（鞣酸+胃酸形成胃石）；软柿子甜脆柿涩；一次1个；别和螃蟹同吃（传统说法，实际是高蛋白+鞣酸影响消化）' },
  { id: 'pomegranate-seeds', name: '石榴籽', cat: 'fruit', kcal: 83, protein: 1.7, fat: 1.2, carb: 18.7, fiber: 4, sodium: 3, vitFat: ['K'], vitWater: ['C', '叶酸'], minerals: ['钾'], phytochem: ['安石榴苷（果皮高）', '花青素'], note: '吐籽还是嚼碎都行；嚼碎籽油更营养但硬；一碗约100g=83kcal；"抗氧化"主要在果皮，吃果肉效果有限' },
  { id: 'cherry-tomato', name: '圣女果/小番茄', cat: 'fruit', kcal: 22, protein: 1, fat: 0.2, carb: 4.8, fiber: 1.2, sodium: 9, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['番茄红素'], note: '当水果吃；比大番茄更甜；洗干净带皮吃；番茄红素加热更好吸收，生吃补维C' },
  { id: 'longan-dry', name: '桂圆干/龙眼干', cat: 'fruit', kcal: 313, protein: 4.6, fat: 1, carb: 65.9, fiber: 2, sodium: 4, vitFat: [], vitWater: ['C', 'B2'], minerals: ['铁', '钾'], phytochem: ['腺苷'], note: '高糖干果；泡茶/煲汤；一次5-10g；中医说"补气血"实际就是糖和铁（铁吸收率低）；湿热体质少吃' },
  { id: 'lychee-dry', name: '荔枝干', cat: 'fruit', kcal: 277, protein: 4.3, fat: 1.2, carb: 66, fiber: 1.5, sodium: 3, vitFat: [], vitWater: ['C（干品少）'], minerals: ['钾'], note: '高糖；晒干后更甜；煲汤；别一次吃太多' },
  { id: 'coconut-water', name: '椰子水', cat: 'fruit', kcal: 19, protein: 0.7, fat: 0.2, carb: 3.7, fiber: 1.1, sodium: 105, vitFat: [], vitWater: ['C'], minerals: ['钾', '镁'], note: '天然电解质水；比运动饮料低糖；100ml约19kcal；选100%纯椰子水，别买加了糖的"椰汁饮料"' },
  { id: 'coconut-milk', name: '椰奶/椰浆', cat: 'fruit', kcal: 230, protein: 2.3, fat: 24, carb: 5.5, fiber: 2.8, sodium: 15, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '高脂高热量；做咖喱/西米露；别当水喝；一罐400ml约920kcal；和椰子水完全两码事' },
];
