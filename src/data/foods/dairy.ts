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
];
