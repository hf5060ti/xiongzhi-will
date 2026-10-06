// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: DAIRY
// 蛋奶（蛋类 / 奶类 / 奶酪 / 黄油），每 100g 参考值
import type { IFood } from './types';

export const DAIRY: IFood[] = [
  // ---- 蛋类 ----
  { id: 'egg', name: '鸡蛋（全蛋）', cat: 'dairy', kcal: 144, protein: 13.3, fat: 8.8, carb: 2.8, fiber: 0, sodium: 142, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['硒'] },
  { id: 'egg-white', name: '蛋清', cat: 'dairy', kcal: 60, protein: 11, fat: 0.2, carb: 1, fiber: 0, sodium: 166, vitFat: [], vitWater: ['B2'], minerals: ['钾'] },
  { id: 'egg-yolk', name: '蛋黄', cat: 'dairy', kcal: 322, protein: 16, fat: 27, carb: 3.6, fiber: 0, sodium: 48, vitFat: ['A', 'D', 'E', 'K'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['铁', '磷'], note: '胆固醇高，每天1-2个没问题' },
  { id: 'quail-egg', name: '鹌鹑蛋', cat: 'dairy', kcal: 158, protein: 13, fat: 11, carb: 0.4, fiber: 0, sodium: 106, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['硒'] },
  { id: 'duck-egg', name: '鸭蛋', cat: 'dairy', kcal: 185, protein: 13, fat: 14, carb: 0.3, fiber: 0, sodium: 106, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['硒'] },
  { id: 'goose-egg', name: '鹅蛋', cat: 'dairy', kcal: 196, protein: 13.6, fat: 14.8, carb: 1.4, fiber: 0, sodium: 130, vitFat: ['A', 'D', 'E'], vitWater: ['B2', 'B12'], minerals: ['硒', '磷'], note: '个头大（约150g/个），脂肪略高于鸡蛋，蛋白质相近' },
  { id: 'ostrich-egg', name: '鸵鸟蛋', cat: 'dairy', kcal: 145, protein: 13, fat: 10, carb: 0.7, fiber: 0, sodium: 120, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['硒', '磷'], note: '一个约1.4kg≈20多个鸡蛋；脂肪低于鸭蛋，胆固醇低于鸡蛋' },

  // ---- 奶类 ----
  { id: 'milk-whole', name: '牛奶（全脂）', cat: 'dairy', kcal: 66, protein: 3.2, fat: 3.6, carb: 4.9, fiber: 0, sodium: 37, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'milk-lowfat', name: '牛奶（低脂）', cat: 'dairy', kcal: 46, protein: 3.4, fat: 1.5, carb: 4.8, fiber: 0, sodium: 44, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'milk-skim', name: '脱脂牛奶', cat: 'dairy', kcal: 34, protein: 3.4, fat: 0.1, carb: 5, fiber: 0, sodium: 42, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'yogurt-plain', name: '酸奶（无糖）', cat: 'dairy', kcal: 70, protein: 4.5, fat: 3, carb: 5, fiber: 0, sodium: 45, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'greek-yogurt', name: '希腊酸奶（无糖）', cat: 'dairy', kcal: 97, protein: 9, fat: 5, carb: 4, fiber: 0, sodium: 36, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '过滤浓缩，蛋白密度约为普通酸奶 2 倍，饱腹感强；⚠ 不同品牌浓度/脂肪差异大，以包装营养表为准' },
  { id: 'yogurt-skim', name: '脱脂酸奶（无糖）', cat: 'dairy', kcal: 56, protein: 5.2, fat: 0.2, carb: 5.4, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '零脂肪高钙，蛋白接近普通全脂酸奶而热量减半；部分品牌会加糖，选购看配料表，乳糖不耐者留意' },

  // ---- 奶酪 / 黄油 ----
  { id: 'cream-cheese', name: '奶油奶酪', cat: 'dairy', kcal: 342, protein: 6, fat: 34, carb: 4, fiber: 0, sodium: 330, vitFat: ['A'], vitWater: ['B2'], minerals: ['钙'] },
  { id: 'butter', name: '黄油', cat: 'dairy', kcal: 717, protein: 0.9, fat: 81, carb: 0.1, fiber: 0, sodium: 11, vitFat: ['A', 'D', 'E', 'K'], vitWater: [], minerals: [], note: '纯脂肪，1g 约 7kcal' },

  // ---- 公开食物成分数据扩充（19 条）：每 100g 参考值 ----
  { id: 'milk-powder', name: '全脂奶粉', cat: 'dairy', kcal: 478, protein: 20, fat: 21.2, carb: 51.7, fiber: 0, sodium: 260, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'] },
  { id: 'milk-powder-skim', name: '脱脂奶粉', cat: 'dairy', kcal: 360, protein: 36, fat: 1, carb: 52, fiber: 0, sodium: 400, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'] },
  { id: 'condensed-milk', name: '炼乳', cat: 'dairy', kcal: 320, protein: 8, fat: 8.7, carb: 55.4, fiber: 0, sodium: 130, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '加糖浓缩，游离糖高' },
  { id: 'yogurt-fruit', name: '果味酸奶', cat: 'dairy', kcal: 105, protein: 3, fat: 2.5, carb: 17, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '含添加糖' },
  { id: 'yogurt-skyr', name: '冰岛酸奶（脱脂）', cat: 'dairy', kcal: 60, protein: 11, fat: 0.2, carb: 4, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'kefir', name: '开菲尔', cat: 'dairy', kcal: 55, protein: 3.3, fat: 3, carb: 4, fiber: 0, sodium: 40, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'] },
  { id: 'milk-goat', name: '山羊奶', cat: 'dairy', kcal: 71, protein: 3.6, fat: 4.1, carb: 4.5, fiber: 0, sodium: 50, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'] },
  { id: 'milk-powder-goat-skim', name: '脱脂羊奶粉', cat: 'dairy', kcal: 355, protein: 36, fat: 1, carb: 52, fiber: 0, sodium: 380, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'], note: '冲泡按包装比例；蛋白密度高，适合增肌加餐' },
  { id: 'cream-heavy', name: '淡奶油', cat: 'dairy', kcal: 340, protein: 2.1, fat: 36.1, carb: 2.8, fiber: 0, sodium: 38, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'] },
  { id: 'sour-cream', name: '酸奶油', cat: 'dairy', kcal: 198, protein: 2.4, fat: 19.4, carb: 4.6, fiber: 0, sodium: 50, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'cheese-goat', name: '羊奶酪（山羊奶酪）', cat: 'dairy', kcal: 364, protein: 21.6, fat: 30, carb: 2.5, fiber: 0, sodium: 700, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙', '磷'], note: '羊奶凝乳，蛋白更易消化，中链脂肪稍高；高钠适量' },
  { id: 'cheese-horse', name: '马奶酪（马奶干酪）', cat: 'dairy', kcal: 300, protein: 18, fat: 24, carb: 3, fiber: 0, sodium: 400, vitFat: ['A'], vitWater: ['B12', 'C'], minerals: ['钙'], note: '马奶蛋白含量低、难凝乳，市售极少见；常见的是发酵马奶制品（如马奶酒），此条目为工艺近似参考' },
  { id: 'cheese-mascarpone', name: '马斯卡彭奶酪', cat: 'dairy', kcal: 429, protein: 4, fat: 44, carb: 3, fiber: 0, sodium: 100, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'] },
  { id: 'egg-boiled', name: '水煮蛋', cat: 'dairy', kcal: 155, protein: 12.6, fat: 10.6, carb: 1.1, fiber: 0, sodium: 124, vitFat: ['A', 'D', 'E'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['硒', '磷'], note: '蛋白质吸收率最高的做法' },
  { id: 'egg-fried', name: '煎蛋', cat: 'dairy', kcal: 200, protein: 13.5, fat: 15, carb: 0.8, fiber: 0, sodium: 210, vitFat: ['A', 'D', 'E'], vitWater: ['B2', 'B12'], minerals: ['硒'], note: '含额外用油' },
  { id: 'egg-scrambled', name: '炒蛋', cat: 'dairy', kcal: 210, protein: 13.8, fat: 16.4, carb: 1.5, fiber: 0, sodium: 220, vitFat: ['A', 'D', 'E'], vitWater: ['B2', 'B12'], minerals: ['硒'], note: '含额外用油' },
  { id: 'egg-salted', name: '咸鸭蛋', cat: 'dairy', kcal: 190, protein: 12.7, fat: 12.7, carb: 6.3, fiber: 0, sodium: 2706, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '硒'], note: '高钠' },
  // ---- 少数民族特色奶制品 ----
  { id: 'milk-buffalo', name: '水牛奶', cat: 'dairy', kcal: 95, protein: 3.8, fat: 7.5, carb: 5, fiber: 0, sodium: 55, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'], note: '脂肪与蛋白比牛奶高，口感更浓，钙约 118mg/100g' },
  { id: 'milk-yak', name: '牦牛奶', cat: 'dairy', kcal: 92, protein: 3.6, fat: 6.8, carb: 4.6, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '高海拔牦牛产，脂肪与蛋白高于荷斯坦牛' },
  { id: 'butter-yak', name: '酥油（牦牛黄油）', cat: 'dairy', kcal: 780, protein: 0.8, fat: 86, carb: 1.5, fiber: 0, sodium: 12, vitFat: ['A', 'D', 'E', 'K'], vitWater: [], minerals: [], note: '牦牛奶提炼的黄油，纯脂肪，1g 约 7.8kcal，高海拔主食热量来源' },
  { id: 'ghee', name: '澄清黄油（酥油）', cat: 'dairy', kcal: 900, protein: 0.3, fat: 100, carb: 0, fiber: 0, sodium: 0, vitFat: ['A', 'E', 'K'], vitWater: [], minerals: [], note: '去除乳蛋白与水分的纯脂肪，耐高温，1g 约 9kcal' },

  // ---- 乳制品扩充（民族特色） ----
  { id: 'milk-horse', name: '马奶', cat: 'dairy', kcal: 50, protein: 2.1, fat: 1.9, carb: 6.3, fiber: 0, sodium: 40, vitFat: ['A'], vitWater: ['B2', 'B12', 'C'], minerals: ['钙', '磷'], note: '蒙古草原特色，乳糖较高' },
  { id: 'koumiss', name: '马奶酒（酸马奶）', cat: 'dairy', kcal: 45, protein: 2, fat: 1.5, carb: 5, fiber: 0, sodium: 30, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '发酵马奶微含酒精，草原待客饮' },
  { id: 'milk-camel', name: '骆驼奶', cat: 'dairy', kcal: 70, protein: 3.5, fat: 3.2, carb: 4.9, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2', 'C'], minerals: ['钙'], note: '蛋白结构与牛奶不同，更接近母乳' },
  { id: 'milk-sheep', name: '绵羊奶', cat: 'dairy', kcal: 100, protein: 5.6, fat: 7, carb: 5.4, fiber: 0, sodium: 50, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '脂肪蛋白双高，奶酪原料' },
  { id: 'milk-powder-goat', name: '山羊奶粉', cat: 'dairy', kcal: 490, protein: 23, fat: 25, carb: 48, fiber: 0, sodium: 380, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '易消化，乳糖不耐者尝试' },
  { id: 'cream-dry', name: '奶皮子', cat: 'dairy', kcal: 620, protein: 8, fat: 55, carb: 20, fiber: 0, sodium: 60, vitFat: ['A', 'D', 'E', 'K'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '蒙古奶皮，奶油浓缩，热量密度高' },
  { id: 'milk-curd-dry', name: '奶豆腐（干）', cat: 'dairy', kcal: 330, protein: 25, fat: 20, carb: 12, fiber: 0, sodium: 120, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'], note: '蒙古奶酪凝块，高蛋白高钙，偏咸' },
  { id: 'milk-sour-dry', name: '酸奶疙瘩', cat: 'dairy', kcal: 350, protein: 28, fat: 22, carb: 8, fiber: 0, sodium: 300, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '新疆发酵奶疙瘩，浓缩蛋白，极咸' },

  // ---- 乳糖不耐友好（用户点名） ----
  { id: 'milk-lactose-free', name: '无乳糖牛奶', cat: 'dairy', kcal: 47, protein: 3.3, fat: 1.6, carb: 4.8, fiber: 0, sodium: 45, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '乳糖已酶解为葡萄糖+半乳糖，乳糖不耐者补钙补蛋白的友好选择；与原奶热量接近' },
  { id: 'yogurt-plant', name: '植物酸奶', cat: 'dairy', kcal: 45, protein: 2, fat: 1.5, carb: 6, fiber: 0.5, sodium: 40, vitFat: [], vitWater: ['B2'], minerals: ['钙'], note: '豆/椰/燕麦基发酵，蛋白低于动物酸奶；选高蛋白、低糖、强化钙款更佳' },

  // ---- 用户点名补充 ----
  { id: 'ice-cream', name: '冰淇淋（奶油味）', cat: 'dairy', kcal: 207, protein: 3.5, fat: 11, carb: 24, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'], note: '全脂奶油+糖，热量主要来自添加糖与饱和脂肪；减脂期偶尔解馋，一支雪糕约70g=145kcal' },
  { id: 'mozzarella-shred', name: '马苏里拉芝士碎', cat: 'dairy', kcal: 280, protein: 28, fat: 17, carb: 3.5, fiber: 0, sodium: 620, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '披萨/焗饭用；蛋白高脂肪适中，但钠高；一把20g约56kcal，拉丝效果核心' },
  { id: 'tofu-milk', name: '奶豆腐（蒙古族传统）', cat: 'dairy', kcal: 350, protein: 35, fat: 18, carb: 8, fiber: 0, sodium: 150, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'], note: '蒙古族传统奶制食品；牛奶脱脂后熬制凝固，类似硬质奶酪；蛋白质极高（约35g/100g），钙丰富；口感酸甜微咸，可直接吃或泡奶茶；与酸奶疙瘩类似但水分稍高；增肌期便携高蛋白零食，一次约30g=105kcal' },

  // ---- 蛋白粉类（运动补剂，参考市面平均值） ----
  // ⚠ 以下数据为市面常见产品平均值，不同品牌差异大，具体以包装营养表为准
  { id: 'protein-whey', name: '乳清蛋白粉（浓缩）', cat: 'dairy', kcal: 380, protein: 75, fat: 8, carb: 10, fiber: 0, sodium: 200, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '最常见的补剂；快速吸收，练后加餐首选；一勺约30g=114kcal、22.5g蛋白；不同品牌蛋白含量70-80%不等' },
  { id: 'protein-whey-isolate', name: '分离乳清蛋白粉', cat: 'dairy', kcal: 370, protein: 90, fat: 3, carb: 4, fiber: 0, sodium: 180, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '过滤去除大部分乳糖与脂肪；蛋白含量高（约90%），乳糖不耐者友好；价格比浓缩乳清高' },
  { id: 'protein-egg', name: '鸡蛋蛋白粉', cat: 'dairy', kcal: 385, protein: 80, fat: 5, carb: 8, fiber: 0, sodium: 220, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['硒'], note: '蛋清粉喷雾干燥；生物价（BV）极高，氨基酸谱完美；但口感略腥，价格偏高' },
  { id: 'protein-casein', name: '酪蛋白粉', cat: 'dairy', kcal: 365, protein: 75, fat: 6, carb: 12, fiber: 0, sodium: 190, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '缓释蛋白，睡前喝防止夜间肌肉分解；浓稠管饱，适合代餐；吸收慢（4-6小时）' },
  { id: 'protein-yeast-hydrolyzed', name: '水解酵母蛋白粉', cat: 'dairy', kcal: 340, protein: 55, fat: 5, carb: 30, fiber: 5, sodium: 300, vitFat: [], vitWater: ['B族维生素'], minerals: ['锌', '硒'], note: '植物蛋白来源（酵母提取物）；含天然B族维生素与谷胱甘肽；蛋白含量中等（约55%），氨基酸谱不如动物蛋白完整；素食者友好' },
  { id: 'protein-yeast-isolate', name: '分离酵母蛋白粉', cat: 'dairy', kcal: 360, protein: 65, fat: 3, carb: 20, fiber: 4, sodium: 280, vitFat: [], vitWater: ['B族维生素'], minerals: ['锌', '硒'], note: '酵母蛋白提纯版；蛋白含量更高（约65%），去除部分碳水与核酸；仍含B族维生素；素食/乳糖不耐者可选' },
  { id: 'protein-bovine-hydrolyzed', name: '牛肉水解蛋白粉', cat: 'dairy', kcal: 390, protein: 80, fat: 5, carb: 8, fiber: 0, sodium: 250, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '⚠ 争议较大：牛肉蛋白的氨基酸吸收效率与乳清相比并无明显优势，且价格高；更推荐直接吃瘦牛肉（牛腩/牛里脊）；此条目仅作补充来源参考，不推荐常规使用' },
  { id: 'protein-beef', name: '牛肉蛋白粉（浓缩）', cat: 'dairy', kcal: 385, protein: 75, fat: 8, carb: 8, fiber: 0, sodium: 240, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '与水解版类似，但吸收稍慢；含肌酸与支链氨基酸；同样推荐直接吃牛肉而非喝粉' },
  { id: 'protein-milk', name: '牛乳蛋白粉（浓缩）', cat: 'dairy', kcal: 375, protein: 70, fat: 7, carb: 12, fiber: 0, sodium: 200, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '牛奶蛋白浓缩（乳清+酪蛋白混合）；缓释与快吸兼有；性价比介于乳清与酪蛋白之间' },
  { id: 'protein-soy', name: '大豆蛋白粉', cat: 'dairy', kcal: 350, protein: 65, fat: 6, carb: 20, fiber: 5, sodium: 250, vitFat: [], vitWater: ['B族'], minerals: ['铁', '钙'], note: '植物蛋白代表；异黄酮含量高（雌激素样作用）；氨基酸谱不如动物蛋白完整；素食者首选' },
  { id: 'protein-soy-isolate', name: '分离大豆蛋白粉', cat: 'dairy', kcal: 365, protein: 85, fat: 3, carb: 8, fiber: 2, sodium: 230, vitFat: [], vitWater: ['B族'], minerals: ['铁', '钙'], note: '大豆蛋白提纯版；蛋白含量高（约85%），去除大部分碳水与脂肪；仍含异黄酮；乳糖不耐者友好' },

  // ---- 奶酪大全（用户点名）----
  { id: 'cheese-cheddar', name: '车打奶酪（切达）', cat: 'dairy', kcal: 403, protein: 25, fat: 33, carb: 1.3, fiber: 0, sodium: 621, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '最常见的硬质奶酪；汉堡/三明治/零食；钠极高（一片20g=124mg钠）；减脂期控制量' },
  { id: 'cheese-parmesan', name: '帕玛森奶酪（干酪）', cat: 'dairy', kcal: 431, protein: 38, fat: 29, carb: 3.2, fiber: 0, sodium: 1600, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '最硬的奶酪，擦丝撒意面；蛋白极高（38g/100g）但钠爆炸（1600mg）；一次5g就够味' },
  { id: 'cheese-brie', name: '布里奶酪（软质）', cat: 'dairy', kcal: 334, protein: 20, fat: 28, carb: 0.5, fiber: 0, sodium: 629, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '白霉软酪，法国传统；口感绵密像奶油；配面包/红酒；脂肪比车打略低但钠同样高' },
  { id: 'cheese-blue', name: '蓝纹奶酪', cat: 'dairy', kcal: 353, protein: 21, fat: 29, carb: 2.3, fiber: 0, sodium: 1390, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '蓝纹霉菌发酵，味道浓烈；丹麦蓝/洛克福/斯蒂尔顿；钠极高（1390mg）；爱者极爱，恨者极恨' },
  { id: 'cheese-feta', name: '羊奶酪（菲达）', cat: 'dairy', kcal: 264, protein: 14, fat: 21, carb: 4.1, fiber: 0, sodium: 1116, vitFat: ['A'], vitWater: ['B12'], minerals: ['钙'], note: '希腊传统羊奶酪；沙拉/意面；羊奶做的比牛奶奶酪脂肪略低；钠极高' },
  { id: 'cheese-cream', name: '奶油奶酪（芝士蛋糕用）', cat: 'dairy', kcal: 342, protein: 6, fat: 34, carb: 4, fiber: 0, sodium: 321, vitFat: ['A'], vitWater: ['B2'], minerals: ['钙'], note: '奶油芝士蛋糕/抹贝果；蛋白极低脂肪极高；减脂期绝对避开' },
  { id: 'cheese-mozzarella', name: '马苏里拉奶酪（鲜）', cat: 'dairy', kcal: 280, protein: 28, fat: 17, carb: 3.5, fiber: 0, sodium: 620, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '水牛/牛奶做的鲜奶酪；沙拉/卡普里沙拉；蛋白高（28g），是奶酪里相对适合增肌的' },
  { id: 'cheese-gouda', name: '高达奶酪（荷兰）', cat: 'dairy', kcal: 356, protein: 25, fat: 27, carb: 2.2, fiber: 0, sodium: 819, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '荷兰传统黄奶酪；温和不冲，配面包；蛋白高脂肪高钠高' },
  { id: 'cheese-swiss', name: '埃曼塔奶酪（瑞士）', cat: 'dairy', kcal: 380, protein: 27, fat: 29, carb: 1.5, fiber: 0, sodium: 490, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '大孔奶酪；钠在奶酪里算低的（490mg）；儿童奶酪棒常用' },
  { id: 'cheese-ricotta', name: '瑞可塔奶酪（乳清）', cat: 'dairy', kcal: 174, protein: 11, fat: 13, carb: 3, fiber: 0, sodium: 84, vitFat: ['A'], vitWater: ['B12'], minerals: ['钙'], note: '乳清做的鲜奶酪；奶酪里热量最低（174kcal）；钠极低（84mg）；意式奶酪馅/沙拉；减脂期友好的奶酪选择' },
  { id: 'cheese-cottage', name: '茅屋奶酪（ cottage cheese）', cat: 'dairy', kcal: 98, protein: 11, fat: 4.3, carb: 3.4, fiber: 0, sodium: 364, vitFat: ['A'], vitWater: ['B12'], minerals: ['钙'], note: '奶酪里热量最低（98kcal/100g）；增肌减脂期经典；配水果/全麦面包；蛋白高（11g）；钠中等' },
  { id: 'cheese-shred-mix', name: '混合芝士碎（披萨用）', cat: 'dairy', kcal: 300, protein: 22, fat: 23, carb: 3, fiber: 0, sodium: 700, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '马苏里拉+车打混合拉丝；披萨/焗饭；一把30g=90kcal；钠高' },

  // ---- 希腊酸奶 & 脱脂酸奶 ----
  { id: 'yogurt-greek-full', name: '希腊酸奶（全脂）', cat: 'dairy', kcal: 97, protein: 9, fat: 5, carb: 3.6, fiber: 0, sodium: 36, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '过滤乳清的浓稠酸奶；蛋白质是普通酸奶的2倍；全脂版脂肪5g；配水果/坚果当早餐' },
  { id: 'yogurt-greek-skim', name: '希腊酸奶（脱脂）', cat: 'dairy', kcal: 59, protein: 10, fat: 0.4, carb: 3.6, fiber: 0, sodium: 36, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '脱脂希腊酸奶；高蛋白（10g）低脂（0.4g）；增肌减脂期神器；配蓝莓/奇亚籽' },
  { id: 'yogurt-plain-skim', name: '原味脱脂酸奶', cat: 'dairy', kcal: 45, protein: 4, fat: 0.2, carb: 7, fiber: 0, sodium: 50, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '普通脱脂酸奶；蛋白比希腊酸奶低；便宜易得；选无糖原味，别买风味酸奶（糖爆炸）' },

  // ---- 奶类补充 ----
  { id: 'milk-sheep-skim', name: '脱脂绵羊奶', cat: 'dairy', kcal: 50, protein: 4, fat: 1, carb: 6, fiber: 0, sodium: 50, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '绵羊奶脱脂版；脂肪降低但蛋白钙保留；羊奶脂肪球小，更好消化' },
  { id: 'milk-goat-full', name: '全脂山羊奶', cat: 'dairy', kcal: 69, protein: 3.5, fat: 4.1, carb: 4.5, fiber: 0, sodium: 38, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '羊奶脂肪球比牛奶小1/3，乳糖结构略有不同；乳糖轻度不耐者可尝试；膻味来自辛酸/癸酸' },
  { id: 'milk-goat-skim', name: '脱脂山羊奶', cat: 'dairy', kcal: 40, protein: 3.5, fat: 0.5, carb: 4.5, fiber: 0, sodium: 38, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '脱脂山羊奶；低脂版；适合需要控制脂肪又想试羊奶的人' },
  { id: 'milk-camel-full', name: '全脂骆驼奶', cat: 'dairy', kcal: 70, protein: 3.5, fat: 3.2, carb: 4.9, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2', 'C'], minerals: ['钙', '铁'], note: '驼奶含铁量比牛奶高10倍；胰岛素样蛋白含量高（传统说法对糖尿病友好，证据有限）；价格贵' },
];