// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: CONDIMENTS
// 酱料 / 调味品 / 香料，每 100g 参考值（品牌差异大，以包装标签为准）
// 关键提醒：多数酱料钠含量极高（每 100g 数千 mg），健身水煮餐加一大勺酱可能直接钠超标；
// 发酵酱料嘌呤中等偏高，海鲜类酱（鱼露/虾酱/海鲜酱/蚝油）嘌呤中高。
import type { IFood } from './types';

export const CONDIMENTS: IFood[] = [
  // ---- 中式酱料 ----
  { id: 'soy-paste', name: '黄豆酱', cat: 'condiment', kcal: 133, protein: 9.7, fat: 1.8, carb: 22.6, fiber: 1.6, sodium: 4231, vitFat: [], vitWater: ['B1', 'B2', 'B3'], minerals: ['钾', '镁'], note: '发酵豆制品，高钠、嘌呤中等，每次 10g 内' },
  { id: 'douban-paste', name: '豆瓣酱（郫县）', cat: 'condiment', kcal: 178, protein: 13.6, fat: 10.6, carb: 10.4, fiber: 1.2, sodium: 6012, vitFat: [], vitWater: ['B2', 'B3', '叶酸'], minerals: ['钾'], phytochem: ['大豆异黄酮'], note: '发酵辣椒豆酱，极高钠，痛风者注意嘌呤' },
  { id: 'sweet-flour-paste', name: '甜面酱', cat: 'condiment', kcal: 136, protein: 5.5, fat: 0.3, carb: 30.5, fiber: 0.8, sodium: 2097, vitFat: [], vitWater: ['B1', 'B3'], minerals: ['钾'], note: '发酵面酱，糖与钠双高，配烤鸭少蘸' },
  { id: 'light-soy', name: '生抽酱油', cat: 'condiment', kcal: 63, protein: 9.1, fat: 0.2, carb: 5.6, fiber: 0, sodium: 5757, vitFat: [], vitWater: ['B2', 'B3'], minerals: ['钾'], note: '高钠，1 汤匙约 10g 含钠约 575mg' },
  { id: 'dark-soy', name: '老抽酱油', cat: 'condiment', kcal: 102, protein: 9.4, fat: 0.3, carb: 18.6, fiber: 0, sodium: 6100, vitFat: [], vitWater: ['B2', 'B3'], minerals: ['钾'], note: '含焦糖色，钠更高，上色用少量' },
  { id: 'oyster-sauce', name: '蚝油', cat: 'condiment', kcal: 114, protein: 4.5, fat: 0.3, carb: 22.6, fiber: 0, sodium: 4300, vitFat: [], vitWater: ['B12'], minerals: ['锌'], note: '贝类浓缩鲜味，嘌呤中高，痛风少用' },
  { id: 'chili-paste', name: '辣椒酱', cat: 'condiment', kcal: 105, protein: 4.2, fat: 1.5, carb: 20.5, fiber: 3, sodium: 2700, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], phytochem: ['辣椒素'], note: '辣椒素促代谢、增食欲；高钠' },
  { id: 'garlic-chili-paste', name: '蒜蓉辣酱', cat: 'condiment', kcal: 90, protein: 2.5, fat: 1, carb: 18, fiber: 2.5, sodium: 2400, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['辣椒素', '大蒜素'], note: '高钠，注意份量' },
  { id: 'sha-cha-sauce', name: '沙茶酱', cat: 'condiment', kcal: 415, protein: 18.5, fat: 32, carb: 14, fiber: 4, sodium: 3900, vitFat: ['E'], vitWater: ['B3'], minerals: ['锌', '硒'], note: '虾米/花生制，高脂高钠，嘌呤中高' },
  { id: 'hoisin-sauce', name: '海鲜酱', cat: 'condiment', kcal: 220, protein: 5, fat: 2.2, carb: 46, fiber: 1.5, sodium: 2900, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '甜味酱，糖钠双高，减肥少用' },
  { id: 'xo-sauce', name: 'XO 酱', cat: 'condiment', kcal: 480, protein: 20, fat: 40, carb: 12, fiber: 1, sodium: 3300, vitFat: ['E'], vitWater: ['B12'], minerals: ['锌'], note: '干贝虾米火腿制，高脂高钠高嘌呤，尝鲜少量' },
  { id: 'mushroom-sauce', name: '香菇酱', cat: 'condiment', kcal: 160, protein: 5, fat: 8, carb: 20, fiber: 3, sodium: 1500, vitFat: [], vitWater: ['B2', 'B3', 'D'], minerals: ['硒'], note: '菇类鲜味，嘌呤中等，热量中等' },
  { id: 'fermented-tofu', name: '豆腐乳（红方）', cat: 'condiment', kcal: 160, protein: 12, fat: 8, carb: 8.5, fiber: 0.6, sodium: 2500, vitFat: ['K'], vitWater: ['B2', 'B12'], minerals: ['钙', '镁'], note: '发酵豆制品，含 B12，高钠嘌呤中等' },
  { id: 'douchi', name: '豆豉', cat: 'condiment', kcal: 244, protein: 24, fat: 9, carb: 39, fiber: 5, sodium: 1900, vitFat: [], vitWater: ['B2', 'B3', 'B12'], minerals: ['铁'], note: '发酵黑豆，植物蛋白高，嘌呤中等偏高' },
  { id: 'fish-sauce', name: '鱼露', cat: 'condiment', kcal: 48, protein: 9.4, fat: 0.1, carb: 3.7, fiber: 0, sodium: 7310, vitFat: [], vitWater: ['B12'], minerals: ['钾'], note: '极高钠，嘌呤高，痛风禁用级' },

  // ---- 沙拉酱 / 西式调味 ----
  { id: 'mayo', name: '蛋黄酱（沙拉酱）', cat: 'condiment', kcal: 680, protein: 1.1, fat: 72, carb: 10.6, fiber: 0, sodium: 1100, vitFat: ['E', 'K'], vitWater: ['B2'], minerals: ['钠'], note: '高脂炸弹，1 汤匙约 100kcal' },
  { id: 'thousand-island', name: '千岛酱', cat: 'condiment', kcal: 330, protein: 1.2, fat: 32, carb: 10, fiber: 0.5, sodium: 700, vitFat: ['E', 'K'], vitWater: [], minerals: [], note: '酸甜高脂，拌沙拉换成油醋汁更省' },
  { id: 'vinaigrette', name: '油醋汁', cat: 'condiment', kcal: 120, protein: 0.2, fat: 11, carb: 5, fiber: 0, sodium: 350, vitFat: ['E', 'K'], vitWater: [], minerals: [], note: '橄榄油+醋，减脂沙拉首选，热量可控' },
  { id: 'teriyaki', name: '照烧汁', cat: 'condiment', kcal: 150, protein: 2, fat: 0.5, carb: 34, fiber: 0, sodium: 2200, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '糖+酱油，甜咸高钠，鸡胸少淋' },
  { id: 'ketchup', name: '番茄酱', cat: 'condiment', kcal: 81, protein: 1.8, fat: 0.2, carb: 18.8, fiber: 1.2, sodium: 890, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['番茄红素'], note: '番茄红素护前列腺抗氧化；含添加糖，选无糖款' },
  { id: 'yellow-mustard', name: '黄芥末', cat: 'condiment', kcal: 66, protein: 4.4, fat: 3.3, carb: 6, fiber: 4, sodium: 1100, vitFat: [], vitWater: ['B3'], minerals: ['硒'], phytochem: ['芥子苷：辛辣风味来源，发酵后生成异硫氰酸酯'], note: '低热量、嘌呤极低（调味用量可忽略）；含钠较高（每100g约1100mg），控盐人群少量；开胃解腻，配烤肉/热狗' },
  { id: 'wasabi', name: '山葵（青芥末）', cat: 'condiment', kcal: 292, protein: 6, fat: 3, carb: 55, fiber: 8, sodium: 30, vitFat: [], vitWater: ['C'], minerals: ['钾'], phytochem: ['异硫氰酸酯（刺激性冲味来源，抗微生物）', '山葵酚'], note: '生鱼片伴侣；嘌呤极低（调味用量可忽略）；市售"青芥末"多为辣根+色素仿制，真山葵贵且易氧化；冲味刺激鼻，肠胃敏感者少量' },

  // ---- 醋 ----
  { id: 'vinegar-chen', name: '陈醋', cat: 'condiment', kcal: 114, protein: 1.1, fat: 0.3, carb: 25.5, fiber: 0, sodium: 190, vitFat: [], vitWater: ['B1', 'B2'], minerals: ['钾'], note: '醋酸延缓胃排空，研究提示可稳血糖' },
  { id: 'vinegar-white', name: '白醋', cat: 'condiment', kcal: 30, protein: 0.1, fat: 0, carb: 6.8, fiber: 0, sodium: 30, vitFat: [], vitWater: [], minerals: [], note: '近零热量，拌菜/去腥' },
  { id: 'vinegar-rice', name: '米醋', cat: 'condiment', kcal: 59, protein: 1, fat: 0, carb: 12.5, fiber: 0, sodium: 90, vitFat: [], vitWater: ['B1'], minerals: ['钾'], note: '含米发酵，酸甜口' },
  { id: 'apple-vinegar', name: '苹果醋', cat: 'condiment', kcal: 21, protein: 0, fat: 0, carb: 1, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['钾'], note: '研究提示餐前稀释喝可略稳血糖；直接喝伤牙釉质' },

  // ---- 香辛料（干粉）----
  { id: 'chili-powder', name: '辣椒粉', cat: 'condiment', kcal: 282, protein: 14, fat: 14, carb: 49, fiber: 27, sodium: 50, vitFat: ['A', 'E', 'K'], vitWater: ['C', 'B6', '叶酸'], minerals: ['钾', '镁'], phytochem: ['辣椒素'], note: '富含维生素 A 与辣椒素，促代谢' },
  { id: 'black-pepper', name: '黑胡椒', cat: 'condiment', kcal: 251, protein: 10.4, fat: 3.3, carb: 64, fiber: 25, sodium: 20, vitFat: ['K'], vitWater: ['B3', 'B6'], minerals: ['镁', '锰', '铁'], phytochem: ['胡椒碱'], note: '胡椒碱研究提示可提升姜黄素等营养素吸收率' },
  { id: 'white-pepper', name: '白胡椒', cat: 'condiment', kcal: 296, protein: 10.4, fat: 2.1, carb: 69, fiber: 26, sodium: 20, vitFat: ['K'], vitWater: ['B3', 'B6'], minerals: ['镁'], phytochem: ['胡椒碱'], note: '去籽胡椒，辛辣略轻' },
  { id: 'sichuan-pepper', name: '花椒', cat: 'condiment', kcal: 258, protein: 6.7, fat: 8.9, carb: 66.5, fiber: 28, sodium: 40, vitFat: ['E', 'K'], vitWater: ['B1', 'B2'], minerals: ['钙', '镁'], phytochem: ['花椒麻素'], note: '麻感促唾液分泌助食欲，川菜灵魂' },
  { id: 'cumin', name: '孜然', cat: 'condiment', kcal: 375, protein: 17.8, fat: 22.3, carb: 44.2, fiber: 10.5, sodium: 168, vitFat: ['E', 'K'], vitWater: ['B3', 'B6'], minerals: ['铁', '钙', '镁'], phytochem: ['孜然醛'], note: '烤肉搭档，铁含量可观' },
  { id: 'fennel', name: '茴香籽', cat: 'condiment', kcal: 345, protein: 15.8, fat: 14.9, carb: 48, fiber: 40, sodium: 88, vitFat: ['E', 'K'], vitWater: ['B3'], minerals: ['钙', '镁', '铁'], phytochem: ['茴香脑'], note: '纤维极高，助消化' },
  { id: 'cinnamon', name: '肉桂', cat: 'condiment', kcal: 247, protein: 4, fat: 1.2, carb: 81, fiber: 53, sodium: 10, vitFat: ['E', 'K'], vitWater: ['B1', 'B3'], minerals: ['钙', '锰'], phytochem: ['肉桂醛'], note: '研究提示可改善胰岛素敏感性；每日 1-3g' },
  { id: 'five-spice', name: '五香粉', cat: 'condiment', kcal: 340, protein: 9, fat: 10, carb: 55, fiber: 20, sodium: 60, vitFat: ['E', 'K'], vitWater: ['B3'], minerals: ['钙', '铁'], phytochem: ['多种挥发性精油'], note: '八角桂皮花椒等混合，去腥增香' },
  { id: 'curry-powder', name: '咖喱粉', cat: 'condiment', kcal: 325, protein: 13, fat: 14, carb: 45, fiber: 23, sodium: 80, vitFat: ['E', 'K'], vitWater: ['B3', 'B6'], minerals: ['铁', '镁'], phytochem: ['姜黄素'], note: '姜黄素强抗炎抗氧化，配黑胡椒吸收更好' },
  { id: 'turmeric', name: '姜黄粉', cat: 'condiment', kcal: 354, protein: 7.8, fat: 3.3, carb: 65, fiber: 21, sodium: 38, vitFat: ['E', 'K'], vitWater: ['B3', 'B6'], minerals: ['铁', '锰'], phytochem: ['姜黄素'], note: '强抗炎；与黑胡椒同食吸收率显著提升' },
  { id: 'ginger-powder', name: '姜粉', cat: 'condiment', kcal: 346, protein: 9.9, fat: 5.8, carb: 71.6, fiber: 14, sodium: 30, vitFat: ['E', 'K'], vitWater: ['B6'], minerals: ['镁', '锰'], phytochem: ['姜辣素'], note: '姜辣素抗炎、促循环，训练后暖身' },
  { id: 'garlic-powder', name: '蒜粉', cat: 'condiment', kcal: 331, protein: 16.5, fat: 0.7, carb: 72, fiber: 9, sodium: 60, vitFat: ['E', 'K'], vitWater: ['B1', 'B6', 'C'], minerals: ['钙', '镁'], phytochem: ['大蒜素'], note: '大蒜素扩血管、抗炎；水煮餐撒蒜粉提味神器' },
  { id: 'onion-powder', name: '洋葱粉', cat: 'condiment', kcal: 340, protein: 9.6, fat: 1.1, carb: 75, fiber: 8, sodium: 80, vitFat: ['E', 'K'], vitWater: ['B6'], minerals: ['钾'], phytochem: ['槲皮素'], note: '槲皮素抗氧化抗炎' },
  { id: 'star-anise', name: '八角', cat: 'condiment', kcal: 337, protein: 17.6, fat: 15.9, carb: 50, fiber: 15, sodium: 60, vitFat: ['A'], vitWater: ['B3'], minerals: ['钙', '铁', '锰'], phytochem: ['茴香脑'], note: '炖肉提香，卤料主料' },
  { id: 'bay-leaf', name: '香叶', cat: 'condiment', kcal: 313, protein: 7.6, fat: 8.4, carb: 75, fiber: 26, sodium: 23, vitFat: ['A', 'E', 'K'], vitWater: ['B6'], minerals: ['钙', '铁'], phytochem: ['芳樟醇'], note: '炖煮去腥，少量' },
  { id: 'rosemary', name: '迷迭香', cat: 'condiment', kcal: 331, protein: 4.9, fat: 15.2, carb: 64, fiber: 42, sodium: 50, vitFat: ['A', 'E', 'K'], vitWater: ['B6'], minerals: ['钙', '铁'], phytochem: ['鼠尾草酸'], note: '抗氧化强，烤肉牛排经典搭配' },
  { id: 'basil', name: '罗勒', cat: 'condiment', kcal: 233, protein: 3.2, fat: 4.1, carb: 45, fiber: 40, sodium: 30, vitFat: ['A', 'E', 'K'], vitWater: ['C', 'B6'], minerals: ['钙', '铁'], phytochem: ['芳香精油'], note: '香草类低热量提味' },

  // ---- 调味盐糖 / 味精 ----
  { id: 'msg', name: '味精', cat: 'condiment', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 28000, vitFat: [], vitWater: [], minerals: ['钠'], note: '谷氨酸钠，0 热量但钠极高；不直接升嘌呤' },
  { id: 'chicken-essence', name: '鸡精', cat: 'condiment', kcal: 268, protein: 10, fat: 1.5, carb: 40, fiber: 0, sodium: 20000, vitFat: [], vitWater: ['B3'], minerals: ['钠'], note: '味精+盐+鸡粉，极高钠，一小勺约 5g 含钠 1000mg' },
  { id: 'salt', name: '食盐', cat: 'condiment', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 39000, vitFat: [], vitWater: [], minerals: ['钠'], note: 'WHO 建议成人每日钠 <2000mg（约 5g 盐）；力量训练出汗多可适当补' },
  { id: 'honey', name: '蜂蜜', cat: 'condiment', kcal: 321, protein: 0.4, fat: 0, carb: 80, fiber: 0.2, sodium: 4, vitFat: [], vitWater: ['B2', 'B3', 'C'], minerals: ['钾'], phytochem: ['多酚类'], note: '天然糖，训练前后补糖原可用，量控制' },
  { id: 'chili-oil', name: '辣椒油', cat: 'condiment', kcal: 900, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 300, vitFat: ['E', 'K'], vitWater: [], minerals: [], phytochem: ['辣椒素'], note: '纯脂肪，1 汤匙约 130kcal，拌菜滴几滴' },
  { id: 'sichuan-oil', name: '花椒油', cat: 'condiment', kcal: 900, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 50, vitFat: ['E', 'K'], vitWater: [], minerals: [], phytochem: ['花椒麻素'], note: '纯脂肪，提麻不增辣，少量' },

  // ---- 酱料扩充（避开 nuts.ts 已收录的花生酱/芝麻酱/各类植物油） ----
  { id: 'korean-chili-paste', name: '韩式辣酱', cat: 'condiment', kcal: 215, protein: 6.5, fat: 2, carb: 45, fiber: 3, sodium: 2600, vitFat: ['A'], vitWater: ['B2', 'C'], minerals: ['钾'], phytochem: ['辣椒素'], note: '辣椒发酵酱，甜辣口；高钠高糖，适量' },
  { id: 'bbq-sauce', name: '烧烤酱', cat: 'condiment', kcal: 175, protein: 1.2, fat: 0.5, carb: 41, fiber: 0.5, sodium: 1800, vitFat: [], vitWater: [], minerals: ['钾'], note: '糖+番茄+醋+香料，含糖高，刷肉提味' },
  { id: 'sweet-chili-sauce', name: '甜辣酱', cat: 'condiment', kcal: 200, protein: 1, fat: 0.5, carb: 48, fiber: 0.5, sodium: 1400, vitFat: [], vitWater: [], minerals: ['钾'], note: '泰式甜辣，蘸鸡翅/炸物，糖高' },
  { id: 'plum-sauce', name: '酸梅酱', cat: 'condiment', kcal: 230, protein: 1, fat: 0.3, carb: 57, fiber: 1, sodium: 800, vitFat: [], vitWater: [], minerals: ['钾'], note: '梅子发酵，酸甜解腻，烤鸭蘸酱' },
  { id: 'tabasco', name: '塔巴斯科辣酱', cat: 'condiment', kcal: 12, protein: 0.5, fat: 0.1, carb: 1.2, fiber: 0.3, sodium: 1300, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['辣椒素'], note: '近零热量，辣度清晰；高钠但用量少' },
  { id: 'worcestershire', name: '伍斯特酱', cat: 'condiment', kcal: 90, protein: 1.5, fat: 0.1, carb: 20, fiber: 0.3, sodium: 950, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '发酵调味汁，牛排/罗宋汤提鲜，含糖' },
  { id: 'curry-paste', name: '咖喱酱（湿）', cat: 'condiment', kcal: 260, protein: 6, fat: 16, carb: 25, fiber: 4, sodium: 2100, vitFat: ['A', 'K'], vitWater: ['B3', 'B6'], minerals: ['铁', '镁'], phytochem: ['姜黄素', '香茅醛'], note: '泰式咖喱底料，油脂+香辛料，辣度可选' },
  { id: 'satay-sauce', name: '沙嗲酱', cat: 'condiment', kcal: 450, protein: 14, fat: 35, carb: 22, fiber: 3, sodium: 1600, vitFat: ['E'], vitWater: ['B3'], minerals: ['锌'], note: '花生+椰浆+香料，高脂高钠，蘸串烧' },
  { id: 'olive-oil', name: '橄榄油', cat: 'condiment', kcal: 884, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 0, vitFat: ['E', 'K'], vitWater: [], minerals: [], phytochem: ['橄榄多酚'], note: '单不饱和脂肪为主，抗炎；烟点低，凉拌/低温烹饪佳' },
  { id: 'duck-fat', name: '鸭油', cat: 'condiment', kcal: 900, protein: 0, fat: 100, carb: 0, fiber: 0, sodium: 5, vitFat: ['D'], vitWater: [], minerals: [], note: '烤鸭油，饱和脂肪高；偶尔煎土豆香气足' },

  // ---- 酱料扩充二（其他地域/风味） ----
  { id: 'shrimp-paste', name: '虾酱', cat: 'condiment', kcal: 95, protein: 15, fat: 2, carb: 3, fiber: 0, sodium: 5800, vitFat: [], vitWater: ['B12'], minerals: ['钙', '铁'], note: '虾发酵酱，极高钠，嘌呤高，痛风慎用；蘸黄瓜/蒸蛋' },
  { id: 'sour-chili', name: '糟辣椒（贵州）', cat: 'condiment', kcal: 80, protein: 2, fat: 2, carb: 14, fiber: 3, sodium: 1800, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['辣椒素'], note: '鲜辣椒发酵，酸辣开胃，炒菜下饭' },
  { id: 'chive-flower-paste', name: '腌韭菜花（草原）', cat: 'condiment', kcal: 60, protein: 3, fat: 1, carb: 10, fiber: 4, sodium: 2600, vitFat: [], vitWater: ['C', 'K'], minerals: ['钾', '铁'], note: '草原蘸羊肉的经典佐料，极高钠，少量' },
  { id: 'hotpot-base', name: '火锅底料（牛油）', cat: 'condiment', kcal: 620, protein: 3, fat: 62, carb: 12, fiber: 2, sodium: 3900, vitFat: ['A', 'E', 'K'], vitWater: [], minerals: ['钾'], phytochem: ['辣椒素', '花椒麻素'], note: '牛油+香料，高脂极高钠，一包底料超标家常便饭' },
  { id: 'osmanthus-sauce', name: '桂花酱', cat: 'condiment', kcal: 280, protein: 0.5, fat: 0.2, carb: 68, fiber: 1, sodium: 20, vitFat: [], vitWater: [], minerals: ['钾'], note: '桂花+糖渍，甜品/山药蘸酱，高糖' },

  // ---- 中式复合香辛料（用户点名） ----
  { id: 'thirteen-spices', name: '十三香', cat: 'condiment', kcal: 300, protein: 10, fat: 8, carb: 52, fiber: 20, sodium: 30, vitFat: ['E', 'K'], vitWater: ['B1', 'B3'], minerals: ['铁', '钙', '镁'], phytochem: ['花椒麻素', '茴香脑', '肉桂醛'], note: '花椒/八角/桂皮/丁香/小茴香等混合磨粉；用量少提香去腥，钠不高但风味浓，控盐人群友好' },

  // ---- 无糖版酱料 + 提鲜类（用户点名） ----
  { id: 'mayo-sugar-free', name: '蛋黄酱（无糖/低糖版）', cat: 'condiment', kcal: 620, protein: 1.2, fat: 66, carb: 3, fiber: 0, sodium: 820, vitFat: ['E', 'K'], vitWater: [], minerals: ['钠'], note: '无添加糖蛋黄酱（代糖调味），热量仍以脂肪为主，1 汤匙约 90kcal；减脂期也需控量，选配料表无蔗糖款' },
  { id: 'ketchup-sugar-free', name: '番茄酱（无糖版）', cat: 'condiment', kcal: 40, protein: 1.5, fat: 0.2, carb: 8, fiber: 1, sodium: 850, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['番茄红素：抗氧化、护前列腺'], note: '无添加糖，甜味来自番茄天然糖；与有糖版（约81kcal）相比碳水减半，仍是高钠，蘸食适量' },
  { id: 'pesto', name: '青酱（罗勒青酱）', cat: 'condiment', kcal: 480, protein: 7, fat: 48, carb: 8, fiber: 2, sodium: 700, vitFat: ['A', 'E', 'K'], vitWater: ['B2', '叶酸'], minerals: ['钙', '镁'], phytochem: ['罗勒芳香精油', '橄榄多酚'], note: '罗勒+松子+帕玛森芝士+橄榄油+蒜，单不饱和脂肪优质但热量高，1 汤匙约 70kcal；配意面/鸡肉用少量' },
  { id: 'katsuobushi', name: '木鱼花（柴鱼片）', cat: 'condiment', kcal: 340, protein: 66, fat: 3, carb: 0, fiber: 0, sodium: 300, vitFat: ['D'], vitWater: ['B3', 'B12'], minerals: ['钾', '硒'], note: '鲣鱼烟熏干制后刨成薄片，日式高汤/章鱼烧/冷奴豆腐提鲜；干鱼制品嘌呤很高，痛风者慎用' },

  // ---- 用户点名补充 ----
  { id: 'yan-huanggua', name: '腌黄瓜（酱黄瓜）', cat: 'condiment', kcal: 15, protein: 0.5, fat: 0.1, carb: 3, fiber: 0.5, sodium: 800, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '低卡但钠高，100g钠约占成人一日40%；配粥/馒头爽口，一顿30-50g即可；别当蔬菜大碗吃' },

  // ---- 用户点名补充 ----
  { id: 'clove', name: '丁香（干花蕾）', cat: 'condiment', kcal: 274, protein: 6, fat: 13, carb: 27, fiber: 17.7, sodium: 270, vitFat: [], vitWater: ['C'], minerals: ['锰', '钾'], phytochem: ['丁香油酚（eugenol）'], note: '每次仅用1-2粒（<1g），热量可忽略；丁香油酚有抗菌麻醉作用；炖肉/卤味/圣诞热红酒；丁香油外用可止牙痛但不可吞服；孕妇大量摄入可能刺激子宫' },

  // ---- 用户点名补充：糖类 ----
  { id: 'bingtang-white', name: '冰糖（单晶白冰糖）', cat: 'condiment', kcal: 397, protein: 0, fat: 0, carb: 99.9, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], phytochem: [], note: '纯度接近白砂糖，本质就是结晶糖；一颗约5g=20kcal；炖雪梨/银耳/红烧肉放几颗；不存在"降火/润肺"功效，只是糖' },
  { id: 'bingtang-yellow', name: '黄冰糖（多晶老冰糖）', cat: 'condiment', kcal: 390, protein: 0, fat: 0, carb: 97, fiber: 0, sodium: 15, vitFat: [], vitWater: [], minerals: ['微量钙/铁'], phytochem: [], note: '未完全脱色，含少量矿物质和焦糖风味；比白冰糖颜色深、风味厚；热量与白砂糖几乎一样，"更健康"是误区；一颗约10g=39kcal；控糖者等量替换白糖，别因为黄就多放' },
];