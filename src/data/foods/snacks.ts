// EXPORTS: SNACKS
// 零食加工 / 运动补剂，每 100g 参考值
import type { IFood } from './types';

export const SNACKS: IFood[] = [
  { id: 'potato-chips', name: '薯片', cat: 'snack', kcal: 536, protein: 7, fat: 35, carb: 53, fiber: 4.3, sodium: 530, vitFat: [], vitWater: [], minerals: [], note: '加工食品，高钠高脂' },
  { id: 'instant-noodle', name: '方便面（干）', cat: 'snack', kcal: 473, protein: 9, fat: 21, carb: 62, fiber: 2, sodium: 1900, vitFat: [], vitWater: [], minerals: [], note: '高钠，料包少放' },
  { id: 'dark-chocolate', name: '黑巧克力（70%）', cat: 'snack', kcal: 598, protein: 8, fat: 43, carb: 46, fiber: 11, sodium: 20, vitFat: ['E', 'K'], vitWater: [], minerals: ['镁', '铁'], note: '高热量，控制份量' },
  { id: 'whey-protein', name: '乳清蛋白粉', cat: 'snack', kcal: 400, protein: 80, fat: 6, carb: 8, fiber: 0, sodium: 260, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '每勺约30g，含24g蛋白' },
  { id: 'casein-protein', name: '酪蛋白粉', cat: 'snack', kcal: 380, protein: 70, fat: 5, carb: 10, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '缓释蛋白，适合睡前' },
  { id: 'energy-bar', name: '能量棒（通用）', cat: 'snack', kcal: 400, protein: 10, fat: 15, carb: 60, fiber: 3, sodium: 150, vitFat: [], vitWater: [], minerals: [], note: '高糖，训练中途应急' },
  { id: 'protein-bar', name: '蛋白棒', cat: 'snack', kcal: 380, protein: 30, fat: 14, carb: 40, fiber: 5, sodium: 180, vitFat: [], vitWater: [], minerals: [], note: '高蛋白，注意糖分' },
  { id: 'protein-cookie', name: '蛋白曲奇', cat: 'snack', kcal: 450, protein: 20, fat: 20, carb: 50, fiber: 4, sodium: 200, vitFat: [], vitWater: [], minerals: [] },
  { id: 'cracker-whole-wheat', name: '全麦苏打饼干', cat: 'snack', kcal: 420, protein: 10, fat: 15, carb: 65, fiber: 5, sodium: 480, vitFat: [], vitWater: [], minerals: [] },
  { id: 'sports-drink', name: '运动饮料（每100ml）', cat: 'snack', kcal: 25, protein: 0, fat: 0, carb: 6.2, fiber: 0, sodium: 45, vitFat: [], vitWater: [], minerals: ['钠', '钾'], note: '含糖，长时间训练时补充' },
  { id: 'beetroot-powder', name: '甜菜根粉', cat: 'snack', kcal: 378, protein: 12, fat: 1.5, carb: 78, fiber: 20, sodium: 200, vitFat: ['K'], vitWater: ['叶酸', 'C'], minerals: ['钾', '铁'], note: '硝酸盐高度浓缩，扩张血管、提升耐力；训练前 1–2 勺冲水（每日 5–10g）' },
];
