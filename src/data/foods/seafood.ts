// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: SEAFOODS
// 水产（鱼类 / 虾蟹贝类 / 藻类），每 100g 生重/可食部参考值
import type { IFood } from './types';

export const SEAFOODS: IFood[] = [
  // ---- 鱼类 ----
  { id: 'salmon', name: '三文鱼（生）', cat: 'seafood', kcal: 208, protein: 20, fat: 13, carb: 0, fiber: 0, sodium: 59, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '钾'], note: '富含欧米伽3' },
  { id: 'tuna-canned', name: '金枪鱼（水浸罐头）', cat: 'seafood', kcal: 132, protein: 28, fat: 1, carb: 0, fiber: 0, sodium: 320, vitFat: ['D'], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒'], note: '嘌呤中等' },
  { id: 'cod', name: '鳕鱼', cat: 'seafood', kcal: 82, protein: 18, fat: 0.7, carb: 0, fiber: 0, sodium: 55, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '磷'] },
  { id: 'sea-bass', name: '鲈鱼', cat: 'seafood', kcal: 105, protein: 20, fat: 2.5, carb: 0, fiber: 0, sodium: 60, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '钾'] },
  { id: 'hairtail', name: '带鱼', cat: 'seafood', kcal: 127, protein: 18, fat: 5, carb: 0, fiber: 0, sodium: 150, vitFat: ['D'], vitWater: ['B3', 'B12'], minerals: ['硒'], note: '嘌呤中等' },
  { id: 'pomfret', name: '鲳鱼', cat: 'seafood', kcal: 140, protein: 18, fat: 7, carb: 0, fiber: 0, sodium: 70, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'yellow-croaker', name: '黄花鱼', cat: 'seafood', kcal: 97, protein: 18, fat: 2, carb: 0.8, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'crucian', name: '鲫鱼', cat: 'seafood', kcal: 108, protein: 18, fat: 3.5, carb: 0.8, fiber: 0, sodium: 55, vitFat: [], vitWater: ['B12'], minerals: ['硒'], note: '嘌呤中等' },
  { id: 'grass-carp', name: '草鱼', cat: 'seafood', kcal: 113, protein: 17, fat: 4.5, carb: 0, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'mackerel', name: '鲭鱼', cat: 'seafood', kcal: 205, protein: 19, fat: 14, carb: 0, fiber: 0, sodium: 90, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '嘌呤中等' },
  { id: 'sardine', name: '沙丁鱼（罐头）', cat: 'seafood', kcal: 208, protein: 25, fat: 11, carb: 0, fiber: 0, sodium: 305, vitFat: ['D'], vitWater: ['B12'], minerals: ['钙', '硒'], note: '嘌呤较高，高尿酸者少吃' },
  { id: 'eel', name: '鳗鱼', cat: 'seafood', kcal: 184, protein: 20, fat: 11, carb: 0, fiber: 0, sodium: 55, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['硒'], note: '嘌呤较高' },

  // ---- 虾蟹贝类 ----
  { id: 'shrimp', name: '基围虾（生）', cat: 'seafood', kcal: 99, protein: 18, fat: 0.8, carb: 2, fiber: 0, sodium: 165, vitFat: [], vitWater: ['B12'], minerals: ['硒', '碘'], note: '嘌呤中等，痛风敏感者控制频率' },
  { id: 'lobster', name: '龙虾', cat: 'seafood', kcal: 89, protein: 19, fat: 1, carb: 0.5, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B12'], minerals: ['硒', '锌'] },
  { id: 'crab', name: '螃蟹', cat: 'seafood', kcal: 87, protein: 18, fat: 1.3, carb: 1, fiber: 0, sodium: 260, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'], note: '嘌呤中等' },
  { id: 'oyster', name: '生蚝（鲜）', cat: 'seafood', kcal: 73, protein: 9, fat: 2.3, carb: 4.5, fiber: 0, sodium: 106, vitFat: ['D'], vitWater: ['B12'], minerals: ['锌', '硒'], note: '嘌呤高，痛风急性期禁食' },
  { id: 'scallop', name: '扇贝', cat: 'seafood', kcal: 88, protein: 17, fat: 1.5, carb: 2.6, fiber: 0, sodium: 180, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'], note: '嘌呤较高' },
  { id: 'clam', name: '蛤蜊', cat: 'seafood', kcal: 74, protein: 13, fat: 1, carb: 2.6, fiber: 0, sodium: 120, vitFat: [], vitWater: ['B12'], minerals: ['铁', '硒'], note: '嘌呤较高' },
  { id: 'squid', name: '鱿鱼', cat: 'seafood', kcal: 92, protein: 16, fat: 1.4, carb: 3, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B12'], minerals: ['硒', '磷'], note: '嘌呤较高，胆固醇高' },
  { id: 'octopus', name: '章鱼', cat: 'seafood', kcal: 82, protein: 15, fat: 1, carb: 2, fiber: 0, sodium: 230, vitFat: [], vitWater: ['B12'], minerals: ['铁', '硒'] },
  { id: 'sea-cucumber', name: '海参（水发）', cat: 'seafood', kcal: 78, protein: 16, fat: 0.5, carb: 2.5, fiber: 0, sodium: 500, vitFat: [], vitWater: [], minerals: ['钙'], note: '蛋白质以胶原蛋白等非必需氨基酸为主，并非优质必需氨基酸蛋白；另有海参皂苷/黏多糖，嘌呤低' },
  { id: 'kelp', name: '海带（鲜）', cat: 'seafood', kcal: 43, protein: 1.7, fat: 0.6, carb: 9.6, fiber: 3, sodium: 107, vitFat: ['K'], vitWater: ['叶酸'], minerals: ['碘', '钙'], note: '碘含量高，甲亢者控制' },

  // ---- 公开食物成分数据扩充（30 条）：每 100g 参考值 ----
  { id: 'tuna-fresh', name: '金枪鱼（生）', cat: 'seafood', kcal: 110, protein: 23.3, fat: 1.3, carb: 0, fiber: 0, sodium: 45, vitFat: ['D'], vitWater: ['B12', 'B3'], minerals: ['硒'] },
  { id: 'trout', name: '鳟鱼', cat: 'seafood', kcal: 119, protein: 20, fat: 4, carb: 0, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'herring', name: '鲱鱼', cat: 'seafood', kcal: 158, protein: 18, fat: 9, carb: 0, fiber: 0, sodium: 90, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'seabream', name: '鲷鱼', cat: 'seafood', kcal: 105, protein: 19, fat: 3, carb: 0, fiber: 0, sodium: 60, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'flounder', name: '比目鱼', cat: 'seafood', kcal: 90, protein: 18, fat: 2, carb: 0, fiber: 0, sodium: 80, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'snakehead', name: '黑鱼', cat: 'seafood', kcal: 85, protein: 18.5, fat: 1.2, carb: 0, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'catfish', name: '鲶鱼', cat: 'seafood', kcal: 146, protein: 14.4, fat: 9.6, carb: 0.5, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'tilapia', name: '罗非鱼', cat: 'seafood', kcal: 98, protein: 20, fat: 2, carb: 0, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'salmon-smoked', name: '烟熏三文鱼', cat: 'seafood', kcal: 117, protein: 18.3, fat: 4.3, carb: 0, fiber: 0, sodium: 700, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '高钠' },
  { id: 'shrimp-dried', name: '虾皮（干）', cat: 'seafood', kcal: 153, protein: 30.7, fat: 2.2, carb: 2.5, fiber: 0, sodium: 5058, vitFat: ['D'], vitWater: ['B12'], minerals: ['钙', '碘'], note: '高钙但高钠' },
  { id: 'prawn', name: '对虾（生）', cat: 'seafood', kcal: 90, protein: 18, fat: 1, carb: 0, fiber: 0, sodium: 110, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '碘'] },
  { id: 'mantis-shrimp', name: '皮皮虾', cat: 'seafood', kcal: 86, protein: 20.6, fat: 0.7, carb: 0, fiber: 0, sodium: 150, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'crab-meat', name: '蟹肉（熟）', cat: 'seafood', kcal: 97, protein: 19.4, fat: 1.5, carb: 0, fiber: 0, sodium: 395, vitFat: ['D'], vitWater: ['B12'], minerals: ['锌', '硒'] },
  { id: 'abalone', name: '鲍鱼', cat: 'seafood', kcal: 84, protein: 15.1, fat: 1, carb: 3.4, fiber: 0, sodium: 200, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '碘'] },
  { id: 'mussel', name: '淡菜（青口）', cat: 'seafood', kcal: 90, protein: 11.9, fat: 2.5, carb: 4.7, fiber: 0, sodium: 300, vitFat: ['D'], vitWater: ['B12'], minerals: ['铁', '硒'] },
  { id: 'razor-clam', name: '蛏子', cat: 'seafood', kcal: 40, protein: 7.3, fat: 0.3, carb: 2.1, fiber: 0, sodium: 130, vitFat: ['D'], vitWater: ['B12'], minerals: ['铁', '锌'] },
  { id: 'fish-roe', name: '鱼子', cat: 'seafood', kcal: 151, protein: 20.6, fat: 8.1, carb: 2.4, fiber: 0, sodium: 200, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'freshwater-shrimp', name: '河虾', cat: 'seafood', kcal: 87, protein: 16.4, fat: 2.4, carb: 0, fiber: 0, sodium: 133, vitFat: ['D'], vitWater: ['B12'], minerals: ['钙', '硒'] },
  { id: 'crayfish', name: '小龙虾', cat: 'seafood', kcal: 93, protein: 18.9, fat: 1.1, carb: 0, fiber: 0, sodium: 190, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '锌'] },
  { id: 'nori-dry', name: '紫菜（干）', cat: 'seafood', kcal: 207, protein: 26.7, fat: 1.1, carb: 44.1, fiber: 21.6, sodium: 710, vitFat: ['K'], vitWater: ['B12', 'B2'], minerals: ['碘', '铁', '钙'], note: '碘含量高，甲状腺疾病患者注意' },
  { id: 'sea-snail', name: '海螺', cat: 'seafood', kcal: 60, protein: 13, fat: 0.5, carb: 0.5, fiber: 0, sodium: 200, vitFat: ['D'], vitWater: ['B12'], minerals: ['锌', '硒'] },
  { id: 'scallop-dried', name: '干贝', cat: 'seafood', kcal: 264, protein: 55.6, fat: 2.4, carb: 5.1, fiber: 0, sodium: 2000, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '锌'], note: '高钠' },
  { id: 'jellyfish', name: '海蜇', cat: 'seafood', kcal: 33, protein: 3.7, fat: 0.3, carb: 3.8, fiber: 0, sodium: 325, vitFat: [], vitWater: [], minerals: ['碘'], note: '常为盐渍品，含钠高' },
  { id: 'kelp-dry', name: '海带（干）', cat: 'seafood', kcal: 77, protein: 1.8, fat: 0.1, carb: 17.3, fiber: 6.1, sodium: 327, vitFat: ['K'], vitWater: ['B1'], minerals: ['碘', '钙'] },
  { id: 'wakame', name: '裙带菜（鲜）', cat: 'seafood', kcal: 25, protein: 1.9, fat: 0.2, carb: 4, fiber: 3.6, sodium: 6, vitFat: ['K'], vitWater: ['B1'], minerals: ['碘', '钙'] },
  { id: 'salmon-roe', name: '三文鱼籽', cat: 'seafood', kcal: 250, protein: 22, fat: 16, carb: 4, fiber: 0, sodium: 1500, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '高钠' },
  { id: 'tuna-tinned-oil', name: '金枪鱼（油浸罐头）', cat: 'seafood', kcal: 200, protein: 22, fat: 12, carb: 0, fiber: 0, sodium: 400, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '油浸热量高于水浸' },
  { id: 'sea-urchin', name: '海胆', cat: 'seafood', kcal: 120, protein: 13, fat: 7, carb: 2, fiber: 0, sodium: 200, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'] },
  { id: 'fish-ball', name: '鱼丸', cat: 'seafood', kcal: 100, protein: 10, fat: 3, carb: 8, fiber: 0, sodium: 500, vitFat: [], vitWater: [], minerals: ['硒'], note: '加工制品，含淀粉与钠' },
  { id: 'anchovy', name: '凤尾鱼（罐头）', cat: 'seafood', kcal: 210, protein: 20, fat: 10, carb: 0, fiber: 0, sodium: 3000, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '高钠' },

  // ---- 用户点名扩充 ----
  { id: 'saury', name: '秋刀鱼', cat: 'seafood', kcal: 258, protein: 21, fat: 17, carb: 0, fiber: 0, sodium: 150, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '钾'], phytochem: ['ω-3（EPA/DHA）：脂肪含量较高，护心血管'], note: '烤秋刀鱼经典；脂肪较高，减脂期控量' },
  { id: 'ark-shell', name: '北极贝', cat: 'seafood', kcal: 77, protein: 14, fat: 1.5, carb: 2, fiber: 0, sodium: 350, vitFat: [], vitWater: ['B12'], minerals: ['铁', '硒'], note: '刺身常见，嘌呤中等；务必选正规冷链' },
  { id: 'crab-roe', name: '蟹黄（蟹膏）', cat: 'seafood', kcal: 240, protein: 12, fat: 18, carb: 5, fiber: 0, sodium: 500, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['锌', '硒'], note: '高胆固醇高嘌呤，痛风急性期禁食；尝鲜即可' },
  { id: 'sturgeon-farmed', name: '鲟鱼（合法养殖）', cat: 'seafood', kcal: 120, protein: 18, fat: 5, carb: 0, fiber: 0, sodium: 60, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '磷'], note: '⚠ 仅采用合法养殖渠道；野生鲟鱼为国家重点保护动物，严禁捕捞、交易、食用' },

  // ---- 鱼类扩充（点名品种 + 金枪鱼分种分部位） ----
  { id: 'grouper', name: '石斑鱼', cat: 'seafood', kcal: 92, protein: 19, fat: 1.3, carb: 0, fiber: 0, sodium: 55, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '低脂高蛋白，肉质细嫩少刺，清蒸/煲汤经典；市售以养殖为主' },
  { id: 'chum-salmon', name: '大马哈鱼（秋鲑）', cat: 'seafood', kcal: 120, protein: 20, fat: 5, carb: 0, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '钾'], note: '太平洋鲑（东北称大马哈鱼），肉色淡橙、比三文鱼瘦；洄游产卵期肉质变差，市售多为冷冻分割' },
  { id: 'tuna-yellowfin', name: '黄鳍金枪鱼（生）', cat: 'seafood', kcal: 110, protein: 24, fat: 1.5, carb: 0, fiber: 0, sodium: 40, vitFat: ['D'], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒'], note: '全球产量最大的金枪鱼，赤身肉瘦红润，刺身/罐头主力；部分渔场存在兼捕争议，选可持续认证渠道更稳妥' },
  { id: 'tuna-bluefin', name: '蓝鳍金枪鱼（生，整体均值）', cat: 'seafood', kcal: 150, protein: 22, fat: 7, carb: 0, fiber: 0, sodium: 45, vitFat: ['D'], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒'], note: '最肥美金枪鱼（大腹呈雪花纹），顶级刺身食材；⚠ 部分种群因过度捕捞受国际保护/配额限制，务必选择合法合规渠道，遵守当地法规' },
  { id: 'tuna-akami', name: '金枪鱼赤身（瘦部）', cat: 'seafood', kcal: 105, protein: 25, fat: 1.2, carb: 0, fiber: 0, sodium: 40, vitFat: ['D'], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒'], note: '金枪鱼背脊瘦肉部位，低脂高蛋白，肉色深红、风味浓郁' },
  { id: 'tuna-chutoro', name: '金枪鱼中腹', cat: 'seafood', kcal: 170, protein: 21, fat: 10, carb: 0, fiber: 0, sodium: 45, vitFat: ['D'], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒'], note: '腹肉中层，脂肪适中、口感与风味平衡，性价比高的刺身部位' },
  { id: 'tuna-otoro', name: '金枪鱼大腹（Toro）', cat: 'seafood', kcal: 290, protein: 17, fat: 25, carb: 0, fiber: 0, sodium: 45, vitFat: ['D'], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒'], note: '腹肉最肥部位（蓝鳍大腹最名贵）；饱和脂肪、胆固醇与嘌呤均高，痛风急性期/高血脂者注意' },

  // ---- 鱼糜制品（用户点名） ----
  { id: 'crab-stick', name: '蟹柳（仿蟹肉棒）', cat: 'seafood', kcal: 110, protein: 9, fat: 2.5, carb: 12, fiber: 0.5, sodium: 600, vitFat: [], vitWater: ['B12'], minerals: ['钠', '磷'], note: '鱼糜+淀粉+蟹味调味制成，非真蟹肉；蛋白中等、钠偏高，火锅/沙拉配料可以，别当海鲜蛋白主力；选淀粉含量低、纯鱼糜比例高的款' },

  // ---- 小众水产（用户点名） ----
  { id: 'sea-star', name: '海星（食用生殖腺）', cat: 'seafood', kcal: 110, protein: 10, fat: 6, carb: 3, fiber: 0, sodium: 300, vitFat: ['D'], vitWater: ['B12'], minerals: ['锌', '硒'], note: '可食部分为生殖腺（海星黄），口感似海胆；嘌呤较高，蟹黄类高胆固醇；务必正规来源并彻底熟制，赤潮期/来源不明禁食' },
  { id: 'swimming-crab', name: '梭子蟹', cat: 'seafood', kcal: 95, protein: 18, fat: 2, carb: 0.5, fiber: 0, sodium: 300, vitFat: ['D'], vitWater: ['B12'], minerals: ['锌', '硒'], note: '我国沿海经济蟹类（三疣梭子蟹），清蒸/葱姜炒经典；蟹肉低脂高蛋白，蟹黄胆固醇高；嘌呤较高，痛风者少食；死蟹易产生组胺，务必鲜活烹饪' },

  // ---- 用户点名补充 ----
  { id: 'fish-skin-dried', name: '即食烤鱼皮（咸蛋黄/原味）', cat: 'seafood', kcal: 520, protein: 25, fat: 40, carb: 15, fiber: 0, sodium: 800, vitFat: ['D'], vitWater: ['B12'], minerals: ['钙', '磷'], note: '鱼皮经油炸/烘烤，脂肪与钠极高，下酒零食；胶原蛋白丰富但为不完全蛋白；当零食少量，别当高蛋白来源' },

  // ---- 用户点名补充 ----
  { id: 'yu-doufu', name: '鱼豆腐（油炸鱼糜）', cat: 'seafood', kcal: 150, protein: 10, fat: 8, carb: 10, fiber: 0, sodium: 600, vitFat: [], vitWater: ['B12'], minerals: ['钙'], note: '鱼糜+大豆蛋白油炸，火锅/关东煮常见；看着像鱼其实吸油多；一串约30g=45kcal，10串=450kcal' },
  { id: 'yu-mi', name: '鱼糜（鱼丸原料）', cat: 'seafood', kcal: 110, protein: 12, fat: 1, carb: 10, fiber: 0, sodium: 800, vitFat: [], vitWater: ['B12'], minerals: ['硒'], note: '海鱼去皮去骨擂成泥，加淀粉/水/盐；本身低卡高蛋，但钠高；是鱼丸/蟹棒/竹轮的原料' },
  { id: 'yuwan', name: '鱼丸（熟）', cat: 'seafood', kcal: 100, protein: 10, fat: 3, carb: 8, fiber: 0, sodium: 700, vitFat: [], vitWater: ['B12'], minerals: ['硒'], note: '火锅/汤粉常见；选配料表前几位是鱼糜而非鱼糜制品+淀粉；不建议当纯海鲜蛋白，淀粉占比高' },
  { id: 'niuwa', name: '牛蛙肉（去头去皮熟）', cat: 'seafood', kcal: 81, protein: 16, fat: 0.3, carb: 0, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'], phytochem: [], note: '极低脂高蛋白，比鸡胸还瘦；但泡椒/干锅/水煮做法脂肪飙升；1只可食部约100g；必须彻底煮熟（寄生虫风险）' },
  { id: 'xiaolongxia', name: '小龙虾（熟去壳净肉）', cat: 'seafood', kcal: 90, protein: 18, fat: 1, carb: 1, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒', '铜'], note: '净肉极低脂高蛋白；但麻辣/十三香汤汁钠油极高，热量主要来自汤汁配面条；一餐剥1斤虾约200g净肉=180kcal；尿酸高者适量（嘌呤中高）；务必煮熟煮透' },

  // ---- 用户点名补充：淡水鱼 / 贝类 / 泥鳅 ----
  { id: 'catfish', name: '鲶鱼（淡水，熟）', cat: 'seafood', kcal: 146, protein: 17, fat: 8, carb: 0, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '磷'], note: '无鳞刺少，肉质细嫩；脂肪比一般淡水鱼高，适合红烧/蒜焖；鱼油以饱和脂肪为主，减脂期别多吃' },
  { id: 'carp', name: '鲤鱼（淡水，熟）', cat: 'seafood', kcal: 109, protein: 18, fat: 4, carb: 0, fiber: 0, sodium: 53, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '淡水鱼代表，刺多；红烧/糖醋/鲤鱼焙面；鲤鱼卵（鱼籽）胆固醇高；孕妇/术后少量' },
  { id: 'snakehead', name: '黑鱼/乌鳢（淡水，熟）', cat: 'seafood', kcal: 85, protein: 18, fat: 1.2, carb: 0, fiber: 0, sodium: 52, vitFat: [], vitWater: ['B12'], minerals: ['硒', '铁'], note: '低脂高蛋白，肉紧实刺少；术后/产妇常用黑鱼汤促进恢复；清炖/酸菜鱼片；一条约1kg出肉约600g' },
  { id: 'silver-carp', name: '白鲢（淡水，熟）', cat: 'seafood', kcal: 104, protein: 17, fat: 3, carb: 0, fiber: 0, sodium: 60, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '滤食性淡水鱼，小刺极多；价格便宜；适合红烧/鱼丸/鱼头汤；土腥味重，需用料酒/姜/紫苏去腥' },
  { id: 'bighead-carp', name: '鳙鱼/花鲢/胖头鱼（淡水）', cat: 'seafood', kcal: 100, protein: 15, fat: 3, carb: 0, fiber: 0, sodium: 61, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '剁椒鱼头/鱼头泡饼的主角，鱼头大而肉厚；鱼脸胶质多；鱼头约占体重1/3；土腥味比白鲢轻' },
  { id: 'huajia', name: '花甲/花蛤（熟去壳）', cat: 'seafood', kcal: 45, protein: 7, fat: 0.8, carb: 2, fiber: 0, sodium: 300, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌', '硒'], note: '极低卡高蛋白高锌；夜市辣炒/蒜蓉粉丝蒸；吐沙需盐水养2小时；痛风急性期少吃（嘌呤中高）' },
  { id: 'black-clam', name: '黑口贝/紫石房蛤（熟）', cat: 'seafood', kcal: 60, protein: 10, fat: 1, carb: 2, fiber: 0, sodium: 280, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌', '硒'], note: '北方沿海常见，肉质紧实；碳烤/蒜蓉蒸；与花蛤类似但个大肉厚；必须鲜活，死贝不可食用' },
  { id: 'loach', name: '泥鳅（熟）', cat: 'seafood', kcal: 96, protein: 18, fat: 2, carb: 0, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B12'], minerals: ['钙', '铁', '磷'], phytochem: [], note: '小型淡水鱼，钙铁含量在鱼类里偏高；北方"泥鳅钻豆腐"/干炸；必须彻底煮熟（棘颚口线虫风险）；儿童补钙可适量' },

  // ---- 用户点名补充：养殖水产 / 争议食材 ----
  { id: 'huangshan', name: '黄鳝（熟）', cat: 'seafood', kcal: 83, protein: 18, fat: 1.4, carb: 0, fiber: 0, sodium: 70, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['铁', '磷', '硒'], phytochem: [], note: '低脂高蛋白，铁含量在淡水鱼里偏高；江浙响油鳝糊/红烧；【重要】野生/生食黄鳝可能携带颚口线虫，必须彻底煮熟（中心温度70℃以上），绝对不要"响油"带血三分熟；孕妇/儿童尤其要煮透；现杀现烹，死鳝体内组胺快速升高，死亡超过半天不要吃' },
  { id: 'sea-bream', name: '鲷鱼/真鲷/加吉鱼（熟）', cat: 'seafood', kcal: 100, protein: 20, fat: 2.5, carb: 0, fiber: 0, sodium: 70, vitFat: ['D'], vitWater: ['B12', 'B6'], minerals: ['硒', '钾', '磷'], note: '海鱼代表，肉质白嫩细腻，刺少肉厚；日式刺身/清蒸/盐烤；低脂高蛋白，欧米伽3含量中等；一条约1-2kg，出肉率高；适合健身期优质蛋白来源；嘌呤中等，痛风急性期适量' },

  // ---- 用户点名补充 ----
  { id: 'fish-roe', name: '鱼籽（鲑鱼/鳕鱼籽，熟）', cat: 'seafood', kcal: 140, protein: 22, fat: 6, carb: 1, fiber: 0, sodium: 1500, vitFat: ['A', 'D', 'E'], vitWater: ['B12', '叶酸'], minerals: ['锌', '硒', '磷'], phytochem: ['DHA', 'EPA（磷脂型）'], note: '【高钠高胆固醇】鱼籽是营养密度炸弹：DHA/EPA、维A/D、B12、锌都高；但钠极高（1500mg/100g）、胆固醇也高；一次10-30g足够；痛风/高尿酸者注意嘌呤高；鱼子酱/鲑鱼籽/飞鱼籽都在此列' },
  { id: 'squid', name: '鱿鱼（熟）', cat: 'seafood', kcal: 92, protein: 18, fat: 1.4, carb: 3, fiber: 0, sodium: 130, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒', '铜'], phytochem: ['牛磺酸'], note: '低脂高蛋白，牛磺酸高；烤鱿鱼/白灼/鱿鱼丝；干鱿鱼丝钠极高（约2000mg/100g），当零食别多吃；胆固醇含量近年研究表明对血胆固醇影响有限，不必过度担心；必须煮熟，半生鱿鱼有副溶血性弧菌风险' },
  { id: 'octopus', name: '章鱼/八爪鱼（熟）', cat: 'seafood', kcal: 82, protein: 15, fat: 1, carb: 2, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒', '钾'], phytochem: ['牛磺酸'], note: '比鱿鱼更瘦，脂肪仅1g；日式刺身/白灼/章鱼小丸子；口感脆韧；必须彻底煮熟（活章鱼吞咽有窒息风险，韩国活吃传统危险）；嘌呤中等' },
  { id: 'swimming-crab', name: '梭子蟹（熟，可食部）', cat: 'seafood', kcal: 95, protein: 18, fat: 2, carb: 0, fiber: 0, sodium: 300, vitFat: ['A'], vitWater: ['B12'], minerals: ['锌', '硒', '钙'], phytochem: ['虾青素'], note: '海蟹代表，肉白鲜甜；一只约200g可食部=190kcal；蟹黄/蟹膏脂肪高（另算）；性寒，配姜醋；必须鲜活蒸煮，死蟹组胺中毒风险高；痛风/高尿酸急性期禁食' },
  { id: 'crab-roe', name: '蟹黄/蟹膏（熟）', cat: 'seafood', kcal: 240, protein: 12, fat: 20, carb: 5, fiber: 0, sodium: 400, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['锌', '硒', '胆固醇极高'], phytochem: ['虾青素', '磷脂'], note: '【高脂高胆固醇】蟹黄是蟹的肝胰腺/性腺，脂肪20g/100g，胆固醇极高；一次10-20g调味即可；蟹粉豆腐/蟹黄面主要热量来自它；减脂期浅尝；痛风禁食' },
  { id: 'australian-lobster', name: '澳洲龙虾/澳龙（熟，可食部）', cat: 'seafood', kcal: 90, protein: 20, fat: 1, carb: 0, fiber: 0, sodium: 200, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒', '镁'], phytochem: ['虾青素'], note: '高端海产，肉厚弹牙；脂肪极低、蛋白高；一只约1kg可食部约200g=180kcal；刺身/焗烤/芝士焗；嘌呤中高，痛风适量；价格贵但营养与普通虾/龙虾接近，不必神化' },

  // ---- 常见海鱼大全（用户点名）----
  { id: 'salmon-fillet', name: '三文鱼（大西洋鲑，生）', cat: 'seafood', kcal: 208, protein: 20, fat: 13, carb: 0, fiber: 0, sodium: 50, vitFat: ['D', 'A'], vitWater: ['B12', 'B6'], minerals: ['硒', '钾'], phytochem: ['DHA', 'EPA', '虾青素'], note: 'Omega-3之王（DHA+EPA约2.3g/100g）；刺身/煎烤；脂肪比一般海鱼高但都是好脂肪；一块约150g=312kcal；养殖鲑鱼脂肪更高，野生偏瘦' },
  { id: 'cod', name: '鳕鱼（大西洋鳕，熟）', cat: 'seafood', kcal: 82, protein: 18, fat: 0.7, carb: 0, fiber: 0, sodium: 55, vitFat: ['D'], vitWater: ['B12', 'B6'], minerals: ['硒', '磷'], note: '低脂高蛋白标杆，脂肪不到1g；经典"宝宝辅食鱼"；肉白蒜瓣状；香煎/蒸/做鱼饼；注意市场上很多"鳕鱼"其实是油鱼（蛇鲭），吃了会腹泻，认准正宗大西洋鳕/太平洋鳕' },
  { id: 'saury', name: '秋刀鱼（熟）', cat: 'seafood', kcal: 250, protein: 20, fat: 18, carb: 0, fiber: 0, sodium: 120, vitFat: ['D'], vitWater: ['B12', 'B2'], minerals: ['硒', '钾'], phytochem: ['DHA', 'EPA'], note: '日式盐烤秋刀鱼；脂肪高但Omega-3丰富；一条约120g=300kcal；内脏苦，挤柠檬汁解腥；价格便宜，营养密度高' },
  { id: 'sea-bass', name: '鲈鱼（海鲈，熟）', cat: 'seafood', kcal: 105, protein: 19, fat: 3, carb: 0, fiber: 0, sodium: 60, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '刺少肉嫩，清蒸经典；脂肪低；一条约500g出肉约300g；产后/术后常用鲈鱼汤；淡水鲈鱼脂肪略高' },
  { id: 'hairtail', name: '带鱼（熟）', cat: 'seafood', kcal: 127, protein: 18, fat: 5, carb: 0, fiber: 0, sodium: 150, vitFat: ['D'], vitWater: ['B12', 'B2'], minerals: ['硒', '磷'], note: '我国沿海经济鱼类，红烧/干煎/清蒸；银鳞（带鱼油）别刮，那是好脂肪；冷冻带鱼最常见，新鲜带鱼油脂更丰富；嘌呤中等' },
  { id: 'yellow-croaker', name: '大黄鱼（熟）', cat: 'seafood', kcal: 97, protein: 17, fat: 2.5, carb: 0, fiber: 0, sodium: 70, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '东海四大海产之首；野生大黄鱼天价（几万一条），市售基本养殖；肉质细嫩蒜瓣状；清蒸/雪菜大汤黄鱼；高蛋白低脂' },
  { id: 'grass-carp', name: '草鱼（熟）', cat: 'seafood', kcal: 113, protein: 16, fat: 5.5, carb: 0, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B12'], minerals: ['硒', '磷'], note: '四大家鱼之一；酸菜鱼/水煮鱼主角；小刺多；养殖草鱼脂肪比野生高；鱼片现切现煮防寄生虫（肝吸虫）' },
  { id: 'sardine', name: '沙丁鱼（熟）', cat: 'seafood', kcal: 208, protein: 25, fat: 11, carb: 0, fiber: 0, sodium: 500, vitFat: ['D', 'B12'], vitWater: ['B2', 'B12'], minerals: ['钙（连骨吃）', '硒'], phytochem: ['DHA', 'EPA'], note: 'Omega-3性价比之王，便宜且营养密；罐头沙丁鱼连骨吃补钙；钠高（罐头盐水/油浸）；一条约30g=62kcal' },
  { id: 'trout', name: '鳟鱼（虹鳟，熟）', cat: 'seafood', kcal: 140, protein: 20, fat: 6, carb: 0, fiber: 0, sodium: 50, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], phytochem: ['DHA', 'EPA'], note: '三文鱼的平价替代，同属鲑科；养殖虹鳟淡水养，刺身有寄生虫风险（肝吸虫/阔节裂头绦虫），建议熟食；香煎/烤' },
  { id: 'herring', name: '鲱鱼（熟）', cat: 'seafood', kcal: 158, protein: 18, fat: 9, carb: 0, fiber: 0, sodium: 80, vitFat: ['D', 'B12'], vitWater: ['B12'], minerals: ['硒'], phytochem: ['DHA', 'EPA'], note: '北欧传统，鲱鱼罐头（臭到极端）；腌鲱鱼/烟熏；Omega-3丰富；罐头钠高' },
  { id: 'anchovy', name: '凤尾鱼/鳀鱼（熟）', cat: 'seafood', kcal: 131, protein: 20, fat: 5, carb: 0, fiber: 0, sodium: 1100, vitFat: ['D'], vitWater: ['B12'], minerals: ['钙'], phytochem: ['DHA', 'EPA'], note: '披萨/意面的咸味小银鱼；盐渍/油浸，钠极高（1100mg）；几条就够味；Omega-3高' },
  { id: 'eel', name: '鳗鱼（河鳗/白鳝，熟）', cat: 'seafood', kcal: 180, protein: 18, fat: 10, carb: 0, fiber: 0, sodium: 70, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['硒'], phytochem: ['DHA', 'EPA'], note: '蒲烧鳗鱼饭；脂肪高但维A极高；河鳗脂肪比海鳗高；一份鳗鱼饭（约150g鳗）=270kcal+米饭；嘌呤高，痛风适量' },
  { id: 'flatfish', name: '比目鱼/鲽鱼（熟）', cat: 'seafood', kcal: 90, protein: 18, fat: 1.5, carb: 0, fiber: 0, sodium: 70, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '扁扁的海鱼，鲽/鲆/鳎都算；肉白细刺少；香煎/蒸；低脂高蛋白；多宝鱼（大菱鲆）是养殖比目鱼' },

  // ---- 贝类/海参/生蚝 ----
  { id: 'sea-cucumber', name: '海参（刺参，水发熟）', cat: 'seafood', kcal: 60, protein: 13, fat: 0.1, carb: 0, fiber: 0, sodium: 500, vitFat: [], vitWater: ['B12'], minerals: ['海参多糖', '锌', '硒'], phytochem: ['海参皂苷', '硫酸软骨素'], note: '【非必需氨基酸】海参胶原蛋白为主，氨基酸组成不完整（缺色氨酸/蛋氨酸），蛋白质量远不如鸡蛋/牛肉；"海参大补"是营销，性价比极低；价格贵但营养被高估；钠高（水发）；痛风者嘌呤高注意' },
  { id: 'oyster', name: '生蚝/牡蛎（熟）', cat: 'seafood', kcal: 73, protein: 8, fat: 2, carb: 4, fiber: 0, sodium: 300, vitFat: ['B12'], vitWater: ['B12', '锌'], minerals: ['锌（极高）', '铁', '硒', '铜'], phytochem: ['牛磺酸'], note: '锌含量食物之王（约50mg/100g，日需求3倍）；蒜蓉烤/刺身；壮阳功效证据弱但锌确实高；嘌呤高，痛风急性期禁食；必须鲜活，死生蚝诺如/弧菌风险极高' },
  { id: 'scallop', name: '扇贝（熟去壳）', cat: 'seafood', kcal: 70, protein: 12, fat: 0.5, carb: 5, fiber: 0, sodium: 300, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒'], note: '蒜蓉粉丝蒸扇贝；低脂高蛋白；扇贝柱（干贝）是干货；嘌呤中高；死贝不要吃' },
  { id: 'arctic-surf-clam', name: '北极贝（熟）', cat: 'seafood', kcal: 60, protein: 12, fat: 0.5, carb: 2, fiber: 0, sodium: 250, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '日式刺身常见，红色性感；远洋深海捕捞，金属污染风险低；低脂高蛋白；解冻即食，别久煮变老' },
];
