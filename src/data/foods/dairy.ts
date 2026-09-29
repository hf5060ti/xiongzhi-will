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
  { id: 'cheese-cheddar', name: '奶酪（切达）', cat: 'dairy', kcal: 400, protein: 25, fat: 33, carb: 1.3, fiber: 0, sodium: 621, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '高钠高脂，适量' },
  { id: 'cheese-mozzarella', name: '马苏里拉奶酪', cat: 'dairy', kcal: 280, protein: 28, fat: 17, carb: 3, fiber: 0, sodium: 373, vitFat: ['A'], vitWater: ['B12'], minerals: ['钙'] },
  { id: 'cheese-parmesan', name: '帕玛森奶酪', cat: 'dairy', kcal: 431, protein: 38, fat: 29, carb: 4, fiber: 0, sodium: 1529, vitFat: ['A'], vitWater: ['B12'], minerals: ['钙'], note: '高钠，调味少量使用' },
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
  { id: 'milk-goat-skim', name: '脱脂羊奶', cat: 'dairy', kcal: 38, protein: 3.6, fat: 0.2, carb: 4.6, fiber: 0, sodium: 48, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'], note: '脂肪近乎为零，乳糖仍在，乳糖不耐者留意' },
  { id: 'milk-powder-goat-skim', name: '脱脂羊奶粉', cat: 'dairy', kcal: 355, protein: 36, fat: 1, carb: 52, fiber: 0, sodium: 380, vitFat: ['D'], vitWater: ['B2', 'B12'], minerals: ['钙', '磷'], note: '冲泡按包装比例；蛋白密度高，适合增肌加餐' },
  { id: 'cream-heavy', name: '淡奶油', cat: 'dairy', kcal: 340, protein: 2.1, fat: 36.1, carb: 2.8, fiber: 0, sodium: 38, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'] },
  { id: 'sour-cream', name: '酸奶油', cat: 'dairy', kcal: 198, protein: 2.4, fat: 19.4, carb: 4.6, fiber: 0, sodium: 50, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'cheese-swiss', name: '瑞士奶酪', cat: 'dairy', kcal: 393, protein: 27, fat: 31, carb: 1.5, fiber: 0, sodium: 190, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙', '磷'], note: '高钙' },
  { id: 'cheese-brie', name: '布里奶酪', cat: 'dairy', kcal: 334, protein: 21, fat: 28, carb: 0.5, fiber: 0, sodium: 630, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '高钠' },
  { id: 'cheese-ricotta', name: '里科塔奶酪', cat: 'dairy', kcal: 174, protein: 11.3, fat: 13, carb: 3, fiber: 0, sodium: 84, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙'] },
  { id: 'cheese-cottage', name: '农家干酪', cat: 'dairy', kcal: 98, protein: 11.1, fat: 4.3, carb: 3.4, fiber: 0, sodium: 364, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙'] },
  { id: 'cheese-blue', name: '蓝纹奶酪', cat: 'dairy', kcal: 353, protein: 21.4, fat: 28.7, carb: 2.3, fiber: 0, sodium: 1146, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙'], note: '高钠' },
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
];