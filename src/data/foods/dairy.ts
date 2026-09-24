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

  // ---- 奶类 ----
  { id: 'milk-whole', name: '牛奶（全脂）', cat: 'dairy', kcal: 66, protein: 3.2, fat: 3.6, carb: 4.9, fiber: 0, sodium: 37, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'milk-lowfat', name: '牛奶（低脂）', cat: 'dairy', kcal: 46, protein: 3.4, fat: 1.5, carb: 4.8, fiber: 0, sodium: 44, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'milk-skim', name: '脱脂牛奶', cat: 'dairy', kcal: 34, protein: 3.4, fat: 0.1, carb: 5, fiber: 0, sodium: 42, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'yogurt-plain', name: '酸奶（无糖）', cat: 'dairy', kcal: 70, protein: 4.5, fat: 3, carb: 5, fiber: 0, sodium: 45, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'greek-yogurt', name: '希腊酸奶（无糖）', cat: 'dairy', kcal: 97, protein: 9, fat: 5, carb: 4, fiber: 0, sodium: 36, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['钙'] },

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
  { id: 'cream-heavy', name: '淡奶油', cat: 'dairy', kcal: 340, protein: 2.1, fat: 36.1, carb: 2.8, fiber: 0, sodium: 38, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'] },
  { id: 'sour-cream', name: '酸奶油', cat: 'dairy', kcal: 198, protein: 2.4, fat: 19.4, carb: 4.6, fiber: 0, sodium: 50, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'] },
  { id: 'cheese-swiss', name: '瑞士奶酪', cat: 'dairy', kcal: 393, protein: 27, fat: 31, carb: 1.5, fiber: 0, sodium: 190, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙', '磷'], note: '高钙' },
  { id: 'cheese-brie', name: '布里奶酪', cat: 'dairy', kcal: 334, protein: 21, fat: 28, carb: 0.5, fiber: 0, sodium: 630, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '高钠' },
  { id: 'cheese-ricotta', name: '里科塔奶酪', cat: 'dairy', kcal: 174, protein: 11.3, fat: 13, carb: 3, fiber: 0, sodium: 84, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙'] },
  { id: 'cheese-cottage', name: '农家干酪', cat: 'dairy', kcal: 98, protein: 11.1, fat: 4.3, carb: 3.4, fiber: 0, sodium: 364, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙'] },
  { id: 'cheese-blue', name: '蓝纹奶酪', cat: 'dairy', kcal: 353, protein: 21.4, fat: 28.7, carb: 2.3, fiber: 0, sodium: 1146, vitFat: ['A', 'D'], vitWater: ['B12', 'B2'], minerals: ['钙'], note: '高钠' },
  { id: 'cheese-mascarpone', name: '马斯卡彭奶酪', cat: 'dairy', kcal: 429, protein: 4, fat: 44, carb: 3, fiber: 0, sodium: 100, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'] },
  { id: 'egg-boiled', name: '水煮蛋', cat: 'dairy', kcal: 155, protein: 12.6, fat: 10.6, carb: 1.1, fiber: 0, sodium: 124, vitFat: ['A', 'D', 'E'], vitWater: ['B2', 'B12', '叶酸'], minerals: ['硒', '磷'], note: '蛋白质吸收率最高的做法' },
  { id: 'egg-fried', name: '煎蛋', cat: 'dairy', kcal: 200, protein: 13.5, fat: 15, carb: 0.8, fiber: 0, sodium: 210, vitFat: ['A', 'D', 'E'], vitWater: ['B2', 'B12'], minerals: ['硒'], note: '含额外用油' },
  { id: 'egg-scrambled', name: '炒蛋', cat: 'dairy', kcal: 210, protein: 13.8, fat: 16.4, carb: 1.5, fiber: 0, sodium: 220, vitFat: ['A', 'D', 'E'], vitWater: ['B2', 'B12'], minerals: ['硒'], note: '含额外用油' },
  { id: 'egg-salted', name: '咸鸭蛋', cat: 'dairy', kcal: 190, protein: 12.7, fat: 12.7, carb: 6.3, fiber: 0, sodium: 2706, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙', '硒'], note: '高钠' },
];
