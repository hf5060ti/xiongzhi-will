// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: COOKED
// 家常菜 / 熟食营养库：每 100g 熟重参考值（中国食物成分表常见熟菜估算）
// 注意：熟食营养受做法、调料、加水多少影响，数值为常见做法估算，仅供参考
import type { IFood } from './types';

export const COOKED: IFood[] = [
  // ============ 米饭 / 炒饭类 ============
  { id: 'dish-fried-rice-egg', name: '蛋炒饭', cat: 'cooked', kcal: 168, protein: 6, fat: 6, carb: 23, fiber: 0.6, sodium: 320, vitFat: ['A'], vitWater: ['B1', 'B2'], minerals: ['磷'], phytochem: ['卵磷脂（蛋黄）'], note: '高碳，练后补充能量快；油量决定热量' },
  { id: 'dish-fried-rice-yangzhou', name: '扬州炒饭', cat: 'cooked', kcal: 185, protein: 7, fat: 6.5, carb: 25, fiber: 1, sodium: 400, vitFat: ['A'], vitWater: ['B1', 'B2'], minerals: ['磷', '锌'], note: '含火腿/虾仁/鸡蛋，蛋白更高；外卖版本油盐重' },
  { id: 'dish-fried-rice-beef', name: '牛肉炒饭', cat: 'cooked', kcal: 195, protein: 8, fat: 7, carb: 25, fiber: 0.8, sodium: 380, vitFat: ['A'], vitWater: ['B1', 'B3', 'B12'], minerals: ['铁', '锌'], note: '牛肉提供优质蛋白+铁，适合增肌；控制用油' },
  { id: 'dish-fried-rice-shrimp', name: '虾仁炒饭', cat: 'cooked', kcal: 175, protein: 9, fat: 5.5, carb: 24, fiber: 0.7, sodium: 420, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['硒', '磷'], note: '虾仁低脂高蛋白；嘌呤中等' },
  { id: 'dish-rice-bowl', name: '白米饭（熟）', cat: 'cooked', kcal: 116, protein: 2.6, fat: 0.3, carb: 25.9, fiber: 0.3, sodium: 2, vitFat: [], vitWater: ['B1'], minerals: [], note: '练前练后碳水主力；精白米升糖快' },
  { id: 'dish-rice-mixed', name: '杂粮饭', cat: 'cooked', kcal: 130, protein: 4, fat: 1.2, carb: 27, fiber: 3.5, sodium: 3, vitFat: [], vitWater: ['B1', 'B2', '烟酸'], minerals: ['镁', '钾'], note: '糙米/燕麦/豆类混合，饱腹感强、升糖慢' },

  // ============ 面食类 ============
  { id: 'dish-noodle-yangchun', name: '阳春面（汤）', cat: 'cooked', kcal: 110, protein: 3.5, fat: 2, carb: 20, fiber: 0.5, sodium: 480, vitFat: [], vitWater: ['B1'], minerals: [], note: '清汤素面，热量低但营养单一，需配菜配蛋' },
  { id: 'dish-noodle-tomato-egg', name: '西红柿鸡蛋面', cat: 'cooked', kcal: 128, protein: 5.5, fat: 3.5, carb: 20, fiber: 0.8, sodium: 520, vitFat: ['A'], vitWater: ['B1', 'C'], minerals: ['钾'], phytochem: ['番茄红素'], note: '番茄红素有助前列腺健康；家常均衡一碗' },
  { id: 'dish-noodle-zhajiang', name: '炸酱面', cat: 'cooked', kcal: 185, protein: 7, fat: 7, carb: 24, fiber: 1.2, sodium: 900, vitFat: [], vitWater: ['B1'], minerals: ['钾'], note: '酱料高钠，注意整体盐摄入' },
  { id: 'dish-noodle-beef', name: '牛肉面', cat: 'cooked', kcal: 150, protein: 9, fat: 4.5, carb: 20, fiber: 0.8, sodium: 620, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌'], note: '牛肉+面，碳水和蛋白兼备；汤底油盐重' },
  { id: 'dish-noodle-oil', name: '油泼面', cat: 'cooked', kcal: 230, protein: 6, fat: 10, carb: 30, fiber: 0.9, sodium: 580, vitFat: ['A'], vitWater: ['B1'], minerals: [], note: '油泼辣子增加热量，减脂期少放油' },
  { id: 'dish-dumpling-pork-cabbage', name: '猪肉白菜饺子', cat: 'cooked', kcal: 235, protein: 9, fat: 9, carb: 29, fiber: 1, sodium: 450, vitFat: [], vitWater: ['B1', 'B2'], minerals: ['锌'], note: '每只约 20g；自制减脂可加大白菜减肉馅' },
  { id: 'dish-dumpling-chive-egg', name: '韭菜鸡蛋饺子', cat: 'cooked', kcal: 210, protein: 7, fat: 8, carb: 28, fiber: 1.2, sodium: 420, vitFat: ['A'], vitWater: ['B1', 'B2'], minerals: ['钾'], note: '植物蛋白+蛋黄蛋白互补，素食优选' },
  { id: 'dish-wonton', name: '馄饨（汤）', cat: 'cooked', kcal: 155, protein: 7, fat: 4.5, carb: 22, fiber: 0.6, sodium: 550, vitFat: [], vitWater: ['B1'], minerals: ['磷'], note: '带汤带馅，整体营养均衡；皮多肉少' },
  { id: 'dish-baozi-pork', name: '猪肉大葱包子', cat: 'cooked', kcal: 240, protein: 8, fat: 9, carb: 30, fiber: 1, sodium: 480, vitFat: [], vitWater: ['B1'], minerals: ['锌'], note: '一个约 80g；发面好消化' },
  { id: 'dish-baozi-veg', name: '素菜包子', cat: 'cooked', kcal: 200, protein: 5, fat: 4, carb: 35, fiber: 1.5, sodium: 420, vitFat: [], vitWater: ['B1'], minerals: ['钾'], note: '热量低于肉包，但蛋白少，建议配豆浆/蛋' },
  { id: 'dish-steamed-bun', name: '馒头', cat: 'cooked', kcal: 223, protein: 7, fat: 1.1, carb: 47, fiber: 1.3, sodium: 165, vitFat: [], vitWater: ['B1'], minerals: [], note: '一个约 100g；高碳低脂，练后补充可选' },

  // ============ 蛋类熟食 ============
  { id: 'dish-steamed-egg', name: '蒸蛋羹', cat: 'cooked', kcal: 95, protein: 7.5, fat: 6.5, carb: 1.5, fiber: 0, sodium: 180, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['磷', '硒'], note: '好吸收，适合练后/消化弱时；蛋水比例 1:1.5' },
  { id: 'dish-tea-egg', name: '茶叶蛋', cat: 'cooked', kcal: 145, protein: 12, fat: 10, carb: 1.5, fiber: 0, sodium: 420, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['硒', '磷'], note: '卤制入味但钠偏高；蛋白优质，蛋黄有胆固醇适量吃' },
  { id: 'dish-marinated-egg', name: '卤蛋', cat: 'cooked', kcal: 150, protein: 12, fat: 10, carb: 1.5, fiber: 0, sodium: 400, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['硒'], note: '高蛋白便携加餐；注意钠' },
  { id: 'dish-century-egg', name: '皮蛋（松花蛋）', cat: 'cooked', kcal: 171, protein: 14, fat: 10.7, carb: 4.5, fiber: 0, sodium: 542, vitFat: ['A'], vitWater: ['B2', 'B12'], minerals: ['硒'], note: '加工含铅风险已低但钠高；配姜醋好消化' },

  // ============ 牛肉类熟食 ============
  { id: 'dish-braised-beef', name: '酱牛肉', cat: 'cooked', kcal: 246, protein: 31.4, fat: 11.9, carb: 3.2, fiber: 0, sodium: 869, vitFat: ['A'], vitWater: ['B12', 'B2'], minerals: ['铁', '锌', '硒'], note: '高蛋白增肌硬菜；卤制含盐高，减脂期切薄少量' },
  { id: 'dish-beef-potato', name: '土豆炖牛肉', cat: 'cooked', kcal: 152, protein: 10, fat: 6, carb: 15, fiber: 1.2, sodium: 480, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁', '锌', '钾'], note: '土豆吸汤汁，碳水+蛋白一体；汤泡饭热量高' },
  { id: 'dish-beef-tomato', name: '西红柿炖牛腩', cat: 'cooked', kcal: 160, protein: 11, fat: 8, carb: 8, fiber: 1, sodium: 460, vitFat: ['A'], vitWater: ['B12', 'C'], minerals: ['铁'], phytochem: ['番茄红素'], note: '番茄红素脂溶性，炖煮更易吸收；牛腩脂肪中等' },
  { id: 'dish-beef-pepper', name: '青椒炒牛肉', cat: 'cooked', kcal: 165, protein: 14, fat: 8, carb: 5, fiber: 1, sodium: 500, vitFat: [], vitWater: ['B3', 'B12', 'C'], minerals: ['铁', '锌'], note: '青椒维C促铁吸收；快手高蛋白家常菜' },

  // ============ 猪肉类熟食 ============
  { id: 'dish-braised-pork', name: '红烧肉', cat: 'cooked', kcal: 478, protein: 9, fat: 44, carb: 7, fiber: 0, sodium: 480, vitFat: [], vitWater: ['B1'], minerals: ['锌'], note: '高脂高热量，偶尔解馋；增肌期也少碰' },
  { id: 'dish-braised-ribs', name: '红烧排骨', cat: 'cooked', kcal: 320, protein: 17, fat: 24, carb: 8, fiber: 0.2, sodium: 520, vitFat: [], vitWater: ['B1', 'B6'], minerals: ['锌'], note: '含糖色和油脂，热量不低；每次几块即可' },
  { id: 'dish-pork-yuxiang', name: '鱼香肉丝', cat: 'cooked', kcal: 180, protein: 8, fat: 12, carb: 10, fiber: 1, sodium: 600, vitFat: [], vitWater: ['B1'], minerals: ['锌', '钾'], note: '鱼香汁糖油重，配米饭易超热量；可少油少糖做法' },
  { id: 'dish-pork-green-pepper', name: '青椒肉丝', cat: 'cooked', kcal: 140, protein: 9, fat: 8, carb: 5, fiber: 0.8, sodium: 480, vitFat: [], vitWater: ['B1', 'C'], minerals: ['钾'], note: '家常下饭；青椒维C丰富' },
  { id: 'dish-pork-muxu', name: '木须肉', cat: 'cooked', kcal: 150, protein: 9, fat: 9, carb: 6, fiber: 0.8, sodium: 460, vitFat: ['A'], vitWater: ['B1', 'B2'], minerals: ['锌', '铁'], note: '木耳+蛋+肉，食材多样营养均衡' },
  { id: 'dish-pork-twice-cooked', name: '回锅肉', cat: 'cooked', kcal: 290, protein: 10, fat: 24, carb: 6, fiber: 0.8, sodium: 520, vitFat: [], vitWater: ['B1'], minerals: ['锌'], note: '五花肉爆炒，脂肪高；减脂期慎选' },
  { id: 'dish-pork-sweet-sour', name: '糖醋里脊', cat: 'cooked', kcal: 260, protein: 12, fat: 14, carb: 22, fiber: 0.3, sodium: 420, vitFat: [], vitWater: ['B1'], minerals: ['锌'], note: '挂糊油炸再裹糖醋汁，热量高；偶吃' },
  { id: 'dish-pork-shredded-jingjiang', name: '京酱肉丝', cat: 'cooked', kcal: 200, protein: 11, fat: 12, carb: 12, fiber: 0.6, sodium: 680, vitFat: [], vitWater: ['B1'], minerals: ['锌'], note: '甜面酱高钠，豆腐皮卷着吃可减碳水' },

  // ============ 鸡肉类熟食 ============
  { id: 'dish-braised-chicken-leg', name: '卤鸡腿', cat: 'cooked', kcal: 178, protein: 20, fat: 10, carb: 1.5, fiber: 0, sodium: 620, vitFat: ['A'], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒', '磷'], note: '去皮吃蛋白更高脂肪更低；卤汁含盐' },
  { id: 'dish-chicken-kungpao', name: '宫保鸡丁', cat: 'cooked', kcal: 190, protein: 13, fat: 11, carb: 9, fiber: 0.8, sodium: 540, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['硒'], note: '花生米油脂高；可减花生米加黄瓜丁' },
  { id: 'dish-chicken-poached', name: '白切鸡', cat: 'cooked', kcal: 160, protein: 19, fat: 9, carb: 0.5, fiber: 0, sodium: 320, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒'], note: '带皮脂肪中等，去皮更瘦；蘸料少放' },
  { id: 'dish-chicken-mushroom', name: '香菇炖鸡', cat: 'cooked', kcal: 165, protein: 15, fat: 9, carb: 4, fiber: 0.8, sodium: 380, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['硒', '钾'], phytochem: ['香菇多糖'], note: '香菇多糖助免疫；炖汤撇去浮油更清爽' },
  { id: 'dish-chicken-grilled-breast', name: '香煎鸡胸', cat: 'cooked', kcal: 160, protein: 28, fat: 5, carb: 1, fiber: 0, sodium: 300, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['硒', '磷'], note: '低脂高蛋白天花板；腌制少油少盐更健康' },

  // ============ 羊肉类熟食 ============
  { id: 'dish-lamb-cumin', name: '孜然羊肉', cat: 'cooked', kcal: 220, protein: 15, fat: 16, carb: 3, fiber: 0.5, sodium: 460, vitFat: [], vitWater: ['B12'], minerals: ['铁', '锌'], note: '羊肉温补、富铁；脂肪中等，配菜多放洋葱' },
  { id: 'dish-lamb-scallion', name: '葱爆羊肉', cat: 'cooked', kcal: 200, protein: 15, fat: 14, carb: 2, fiber: 0.5, sodium: 440, vitFat: [], vitWater: ['B12'], minerals: ['铁'], note: '大葱辛香开胃；羊肉嘌呤中等' },

  // ============ 水产熟食 ============
  { id: 'dish-steamed-fish', name: '清蒸鱼（鲈鱼/鲳鱼）', cat: 'cooked', kcal: 112, protein: 19, fat: 3.5, carb: 0.5, fiber: 0, sodium: 350, vitFat: ['D'], vitWater: ['B6', 'B12'], minerals: ['硒', '碘'], note: '低脂优质蛋白，最推荐的鱼做法；蒸鱼豉油含盐' },
  { id: 'dish-fish-braised', name: '红烧鱼（草鱼/鲤鱼）', cat: 'cooked', kcal: 150, protein: 18, fat: 7, carb: 3, fiber: 0, sodium: 520, vitFat: ['D'], vitWater: ['B6', 'B12'], minerals: ['硒'], note: '家常烧法油糖略高；鱼嘌呤中等' },
  { id: 'dish-shrimp-boiled', name: '白灼虾', cat: 'cooked', kcal: 100, protein: 20, fat: 1.5, carb: 0.5, fiber: 0, sodium: 280, vitFat: [], vitWater: ['B12'], minerals: ['硒', '碘', '锌'], note: '高蛋白低脂低卡；虾嘌呤较高，痛风慎食' },
  { id: 'dish-crab-steamed', name: '清蒸大闸蟹', cat: 'cooked', kcal: 103, protein: 17.5, fat: 2.6, carb: 2.5, fiber: 0, sodium: 300, vitFat: [], vitWater: ['B12'], minerals: ['锌', '硒', '铜'], note: '每只约 100g 可食部；蟹黄胆固醇高，嘌呤高' },

  // ============ 豆制品熟食 ============
  { id: 'dish-tofu-mapo', name: '麻婆豆腐', cat: 'cooked', kcal: 130, protein: 9, fat: 8, carb: 5, fiber: 0.8, sodium: 650, vitFat: [], vitWater: ['B2', '叶酸'], minerals: ['钙', '镁'], note: '豆腐优质植物蛋白；花椒麻辣开胃，勾芡控量' },
  { id: 'dish-tofu-home', name: '家常豆腐', cat: 'cooked', kcal: 150, protein: 9, fat: 9, carb: 6, fiber: 0.8, sodium: 550, vitFat: [], vitWater: ['B2', '叶酸'], minerals: ['钙'], note: '豆腐煎制吸油多；可改蒸/炖减少用油' },
  { id: 'dish-tofu-fried', name: '香煎豆腐', cat: 'cooked', kcal: 170, protein: 9, fat: 10, carb: 6, fiber: 0.7, sodium: 500, vitFat: [], vitWater: ['B2'], minerals: ['钙'], note: '外酥里嫩；油多热量高，减脂期少吃' },
  { id: 'dish-tofu-skin-salad', name: '凉拌豆腐丝', cat: 'cooked', kcal: 140, protein: 12, fat: 8, carb: 4, fiber: 0.5, sodium: 480, vitFat: [], vitWater: ['B2'], minerals: ['钙'], note: '豆制品高蛋白；拌菜少放香油' },
  { id: 'dish-edamame-boiled', name: '盐水毛豆', cat: 'cooked', kcal: 131, protein: 12, fat: 5, carb: 10, fiber: 4, sodium: 350, vitFat: [], vitWater: ['B1', '叶酸'], minerals: ['钾', '镁', '铁'], note: '植物蛋白+膳食纤维，夜宵啤酒搭档；嘌呤中高' },
  { id: 'dish-peanut-boiled', name: '水煮花生', cat: 'cooked', kcal: 280, protein: 13, fat: 22, carb: 12, fiber: 5, sodium: 300, vitFat: ['E'], vitWater: ['B1', '烟酸'], minerals: ['镁', '锌'], note: '优质脂肪+蛋白；热量密度高，一把即止' },

  // ============ 蔬菜类熟食 ============
  { id: 'dish-broccoli-garlic', name: '蒜蓉西兰花', cat: 'cooked', kcal: 62, protein: 4, fat: 3, carb: 5, fiber: 3, sodium: 260, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙', '钾'], phytochem: ['萝卜硫素'], note: '萝卜硫素抗炎抗氧化；维C丰富，焯水别太久' },
  { id: 'dish-veggie-lettuce', name: '蒜蓉油麦菜', cat: 'cooked', kcal: 55, protein: 2, fat: 3.5, carb: 4, fiber: 2, sodium: 280, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '绿叶菜补钾，助恢复；清炒少油' },
  { id: 'dish-potato-sour-spicy', name: '酸辣土豆丝', cat: 'cooked', kcal: 120, protein: 2, fat: 5, carb: 17, fiber: 1.2, sodium: 450, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '土豆算主食不算菜，配米饭会碳水双倍' },
  { id: 'dish-greenbean-dry', name: '干煸四季豆', cat: 'cooked', kcal: 150, protein: 3, fat: 11, carb: 9, fiber: 2, sodium: 480, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '油炸煸炒吸油多；减脂改清炒' },
  { id: 'dish-disanxian', name: '地三鲜（茄子土豆青椒）', cat: 'cooked', kcal: 160, protein: 2.5, fat: 11, carb: 14, fiber: 2, sodium: 420, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '过油三步，蔬菜变高热量；少油版才好' },
  { id: 'dish-cucumber-smashed', name: '拍黄瓜', cat: 'cooked', kcal: 40, protein: 1, fat: 2.5, carb: 4, fiber: 0.8, sodium: 380, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '低卡开胃；凉拌汁少放糖和盐' },
  { id: 'dish-woodear-mixed', name: '凉拌木耳', cat: 'cooked', kcal: 60, protein: 2, fat: 3, carb: 8, fiber: 5, sodium: 300, vitFat: [], vitWater: ['B2'], minerals: ['铁', '钾'], phytochem: ['木耳多糖'], note: '木耳多糖助清肠；泡发现拌现吃防变质' },
  { id: 'dish-spinach-mixed', name: '凉拌菠菜', cat: 'cooked', kcal: 50, protein: 3, fat: 2.5, carb: 4, fiber: 2, sodium: 320, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['铁', '镁'], note: '菠菜焯水去草酸再拌；维K促凝血' },
  { id: 'dish-eggplant-garlic', name: '蒜蓉蒸茄子', cat: 'cooked', kcal: 55, protein: 1.5, fat: 3, carb: 6, fiber: 2, sodium: 260, vitFat: [], vitWater: ['C', 'B2'], minerals: ['钾'], phytochem: ['花青素（茄皮）'], note: '蒸比烧茄子低油；茄皮花青素抗炎' },
  { id: 'dish-mushroom-stir', name: '香菇青菜', cat: 'cooked', kcal: 55, protein: 2.5, fat: 3, carb: 5, fiber: 2.5, sodium: 300, vitFat: [], vitWater: ['B2', 'C'], minerals: ['钾', '硒'], phytochem: ['香菇多糖'], note: '双倍膳食纤维，练后恢复蔬菜首选' },

  // ============ 汤羹类 ============
  { id: 'dish-soup-seaweed-egg', name: '紫菜蛋花汤', cat: 'cooked', kcal: 30, protein: 2.5, fat: 1.5, carb: 1.5, fiber: 0.3, sodium: 350, vitFat: ['A'], vitWater: ['B12', '碘'], minerals: ['碘'], note: '低卡补碘；加餐配饭好选择' },
  { id: 'dish-soup-tomato-egg', name: '西红柿蛋汤', cat: 'cooked', kcal: 35, protein: 2, fat: 2, carb: 3, fiber: 0.5, sodium: 300, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], phytochem: ['番茄红素'], note: '开胃低卡；先炒番茄再煮汤番茄红素更多' },
  { id: 'dish-soup-wintermelon-ribs', name: '冬瓜排骨汤', cat: 'cooked', kcal: 45, protein: 3, fat: 2.5, carb: 2, fiber: 0.5, sodium: 380, vitFat: [], vitWater: ['B1'], minerals: ['钾'], note: '冬瓜利水补钾；撇油喝汤更清淡' },
  { id: 'dish-soup-corn-ribs', name: '玉米排骨汤', cat: 'cooked', kcal: 65, protein: 4, fat: 3, carb: 6, fiber: 0.8, sodium: 360, vitFat: [], vitWater: ['B1'], minerals: ['钾', '磷'], note: '玉米提供碳水；汤鲜但嘌呤随炖煮溶出' },
  { id: 'dish-soup-chicken', name: '鸡汤（去油）', cat: 'cooked', kcal: 40, protein: 3, fat: 1.5, carb: 2, fiber: 0, sodium: 320, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '撇油后低脂；大病初愈可少量，遵医嘱' },
  { id: 'dish-soup-ribs-white-radish', name: '萝卜排骨汤', cat: 'cooked', kcal: 55, protein: 4, fat: 3, carb: 3, fiber: 0.6, sodium: 370, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '白萝卜助消化；汤内嘌呤中等' },

  // ============ 粥类 ============
  { id: 'dish-congee-plain', name: '白粥', cat: 'cooked', kcal: 46, protein: 1, fat: 0.2, carb: 10, fiber: 0.1, sodium: 2, vitFat: [], vitWater: ['B1'], minerals: [], note: '好消化但营养密度低；训练日当配餐别当正餐' },
  { id: 'dish-congee-preserved-egg', name: '皮蛋瘦肉粥', cat: 'cooked', kcal: 82, protein: 4, fat: 2.5, carb: 11, fiber: 0.2, sodium: 320, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['磷'], note: '咸鲜暖胃；钠不低，别加榨菜' },
  { id: 'dish-congee-millet', name: '小米粥', cat: 'cooked', kcal: 46, protein: 1.4, fat: 0.4, carb: 9, fiber: 0.5, sodium: 2, vitFat: [], vitWater: ['B1', 'B2'], minerals: ['钾', '镁'], note: '养胃温和；血糖指数不低，糖尿病人控制量' },
  { id: 'dish-congee-oat', name: '燕麦粥', cat: 'cooked', kcal: 68, protein: 2.5, fat: 1.3, carb: 12, fiber: 1.7, sodium: 3, vitFat: [], vitWater: ['B1'], minerals: ['镁'], note: 'β-葡聚糖降胆固醇、饱腹感强；选无糖原味' },

  // ============ 家常菜扩充（更多家常做法） ============
  { id: 'dish-meicai-kouro', name: '梅菜扣肉', cat: 'cooked', kcal: 300, protein: 14, fat: 26, carb: 4, fiber: 0.5, sodium: 520, vitFat: ['A'], vitWater: ['B1'], minerals: ['钾'], note: '五花肉高脂高盐，偶尔吃' },
  { id: 'dish-lion-head', name: '红烧狮子头', cat: 'cooked', kcal: 210, protein: 14, fat: 15, carb: 6, fiber: 0.3, sodium: 480, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['铁', '锌'], note: '肉馅肥瘦结合，高热量' },
  { id: 'dish-sweet-sour-ribs', name: '糖醋排骨', cat: 'cooked', kcal: 220, protein: 15, fat: 13, carb: 12, fiber: 0.2, sodium: 380, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['锌'], note: '糖醋汁含糖，控碳人群少吃' },
  { id: 'dish-tomato-egg-stir', name: '番茄炒蛋', cat: 'cooked', kcal: 120, protein: 6, fat: 9, carb: 5, fiber: 0.8, sodium: 320, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], phytochem: ['番茄红素：加热+油脂吸收更好'], note: '家常快手；少放油糖更健康' },
  { id: 'dish-chive-egg-stir', name: '韭菜炒蛋', cat: 'cooked', kcal: 130, protein: 7, fat: 10, carb: 3, fiber: 0.8, sodium: 300, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], note: '韭菜膳食纤维+蛋蛋白' },
  { id: 'dish-cabbage-vinegar', name: '醋溜白菜', cat: 'cooked', kcal: 45, protein: 1.5, fat: 2.5, carb: 5, fiber: 1.5, sodium: 260, vitFat: ['K'], vitWater: ['C'], minerals: ['钾'], note: '低卡，维C+膳食纤维' },
  { id: 'dish-cauliflower-drypot', name: '干锅花菜', cat: 'cooked', kcal: 90, protein: 3, fat: 6, carb: 7, fiber: 2, sodium: 450, vitFat: ['K'], vitWater: ['C'], minerals: ['钾'], note: '干锅油偏多，改清炒更减脂' },
  { id: 'dish-babycabbage-soup', name: '上汤娃娃菜', cat: 'cooked', kcal: 55, protein: 2, fat: 3, carb: 5, fiber: 1, sodium: 380, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], note: '皮蛋咸蛋黄汤底钠不低' },
  { id: 'dish-choysum-boiled', name: '白灼菜心', cat: 'cooked', kcal: 45, protein: 2.5, fat: 2.5, carb: 3, fiber: 1.5, sodium: 260, vitFat: ['A', 'K'], vitWater: ['C', '叶酸'], minerals: ['钙'], note: '高钙绿叶菜，白灼最清淡' },
  { id: 'dish-lettuce-oyster', name: '蚝油生菜', cat: 'cooked', kcal: 50, protein: 1.5, fat: 2.5, carb: 5, fiber: 1, sodium: 340, vitFat: ['A', 'K'], vitWater: ['C'], minerals: ['钾'], note: '蚝油含糖含盐，适量' },
  { id: 'dish-shrimp-oilbraise', name: '油焖大虾', cat: 'cooked', kcal: 130, protein: 17, fat: 6, carb: 2, fiber: 0, sodium: 420, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '碘', '锌'], note: '虾嘌呤较高，痛风慎食' },
  { id: 'dish-scallop-garlic', name: '蒜蓉粉丝蒸扇贝', cat: 'cooked', kcal: 110, protein: 10, fat: 3, carb: 10, fiber: 0.3, sodium: 380, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒', '锌'], note: '海鲜优质蛋白；粉丝算主食' },
  { id: 'dish-fish-head-chili', name: '剁椒鱼头', cat: 'cooked', kcal: 120, protein: 15, fat: 5, carb: 3, fiber: 0.5, sodium: 680, vitFat: ['D'], vitWater: ['B6', 'B12'], minerals: ['硒'], note: '剁椒高钠，下饭利器' },
  { id: 'dish-fish-boiled', name: '水煮鱼', cat: 'cooked', kcal: 180, protein: 16, fat: 12, carb: 3, fiber: 0.5, sodium: 650, vitFat: ['D'], vitWater: ['B6', 'B12'], minerals: ['硒'], note: '大量泼油，热量全在油里，减脂少吃' },
  { id: 'dish-fish-sourcai', name: '酸菜鱼', cat: 'cooked', kcal: 130, protein: 15, fat: 6, carb: 4, fiber: 0.8, sodium: 600, vitFat: ['D'], vitWater: ['B6', 'B12'], minerals: ['硒'], note: '酸菜钠高，汤别喝' },
  { id: 'dish-chicken-laziji', name: '辣子鸡', cat: 'cooked', kcal: 230, protein: 18, fat: 16, carb: 5, fiber: 0.5, sodium: 480, vitFat: ['A'], vitWater: ['B6'], minerals: ['锌'], note: '炸过再炒，油量大' },
  { id: 'dish-chicken-huangmen', name: '黄焖鸡', cat: 'cooked', kcal: 150, protein: 14, fat: 8, carb: 6, fiber: 0.5, sodium: 450, vitFat: ['A'], vitWater: ['B6'], minerals: ['钾'], note: '带皮鸡腿焖制，中等热量' },
  { id: 'dish-chicken-colafish', name: '可乐鸡翅', cat: 'cooked', kcal: 190, protein: 14, fat: 10, carb: 10, fiber: 0, sodium: 350, vitFat: ['A'], vitWater: ['B6'], minerals: ['锌'], note: '可乐含糖，糖+鸡皮热量高' },
  { id: 'dish-duck-beer', name: '啤酒鸭', cat: 'cooked', kcal: 160, protein: 14, fat: 10, carb: 4, fiber: 0.3, sodium: 420, vitFat: ['A'], vitWater: ['B12'], minerals: ['铁'], note: '鸭肉含铁，啤酒炖煮酒精多挥发' },
  { id: 'dish-pork-jiajiang', name: '酱骨架', cat: 'cooked', kcal: 230, protein: 18, fat: 16, carb: 3, fiber: 0, sodium: 500, vitFat: ['A'], vitWater: ['B1', 'B12'], minerals: ['锌'], note: '东北酱骨，啃骨肉蛋白质尚可' },

  // ================= 快餐连锁（用户点名） =================
  // 麦当劳：官网营养信息口径；肯德基/塔斯汀：品牌未公开官方营养数据，为第三方测评参考值，不同配方/门店有波动。

  // ---- 麦当劳单品 ----
  { id: 'mcd-mcspicy', name: '麦辣鸡腿汉堡（麦当劳）', cat: 'cooked', kcal: 485, protein: 24, fat: 24, carb: 42, fiber: 1.5, sodium: 1208, vitFat: [], vitWater: ['B3'], minerals: ['钾', '钙'], note: '麦当劳官网总热量 485 大卡；炸鸡排+沙拉酱，减脂可选去酱/去皮' },
  { id: 'mcd-bigmac', name: '巨无霸（麦当劳）', cat: 'cooked', kcal: 491, protein: 26, fat: 25, carb: 42, fiber: 2, sodium: 900, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['钙', '铁'], note: '麦当劳官网总热量 491 大卡；三层面包+双层牛肉，宏量为估算' },
  { id: 'mcd-grilled-chicken', name: '板烧鸡腿堡（麦当劳）', cat: 'cooked', kcal: 391, protein: 24, fat: 17, carb: 38, fiber: 2, sodium: 800, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '官网营养计算器口径约 391 大卡；非油炸鸡腿排，去掉酱更低，减脂期相对友好的堡' },
  { id: 'mcd-double-cheese', name: '双层吉士汉堡（麦当劳）', cat: 'cooked', kcal: 657, protein: 32, fat: 38, carb: 45, fiber: 1.5, sodium: 1200, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['钙', '铁'], note: '双层牛肉+双层芝士，热量炸弹级别；宏量为估算' },
  { id: 'mcd-nuggets4', name: '麦乐鸡（4块，麦当劳）', cat: 'cooked', kcal: 170, protein: 10, fat: 10, carb: 10, fiber: 0, sodium: 400, vitFat: [], vitWater: [], minerals: ['磷'], note: '约 170 大卡/4 块；蘸酱另计，甜酸酱/蒜蓉辣酱约 40-60 大卡' },
  { id: 'mcd-fries-m', name: '薯条（中份，麦当劳）', cat: 'cooked', kcal: 376, protein: 5.8, fat: 18, carb: 48, fiber: 3, sodium: 300, vitFat: [], vitWater: [], minerals: ['钾'], note: '约 376 大卡；油炸碳水，蘸酱另计，减脂选小份或去掉' },
  { id: 'mcd-coke-m', name: '可乐（中杯，含糖）', cat: 'cooked', kcal: 200, protein: 0, fat: 0, carb: 52, fiber: 0, sodium: 30, vitFat: [], vitWater: [], minerals: [], note: '中杯约 500ml，含糖约 52g 纯空热量；无糖可乐 0 大卡' },
  { id: 'mcd-coke-zero', name: '无糖可乐（中杯）', cat: 'cooked', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 40, vitFat: [], vitWater: [], minerals: [], note: '0 大卡，甜味剂代糖；个别研究提示代糖可能影响食欲调节，适量' },

  // ---- 麦当劳套餐（堡+中薯+中杯可乐，约） ----
  { id: 'mcd-set-mcspicy', name: '麦辣鸡腿堡套餐（麦当劳）', cat: 'cooked', kcal: 1061, protein: 30, fat: 42, carb: 142, fiber: 4.5, sodium: 1538, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '三件套约 1061 大卡（485+376+200）；换无糖可乐省 200，薯条换玉米杯再省约 250' },
  { id: 'mcd-set-bigmac', name: '巨无霸套餐（麦当劳）', cat: 'cooked', kcal: 1067, protein: 32, fat: 43, carb: 142, fiber: 5, sodium: 1230, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['钙'], note: '三件套约 1067 大卡（491+376+200）' },
  { id: 'mcd-set-grilled', name: '板烧鸡腿堡套餐（麦当劳）', cat: 'cooked', kcal: 967, protein: 30, fat: 35, carb: 138, fiber: 5, sodium: 1130, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '三件套约 967 大卡（391+376+200），麦当劳主推套餐中相对低卡的选择' },

  // ---- 肯德基（官方未公开营养表，第三方测评参考值） ----
  { id: 'kfc-zinger', name: '香辣鸡腿堡（肯德基）', cat: 'cooked', kcal: 513, protein: 26, fat: 24, carb: 48, fiber: 1.5, sodium: 1100, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '第三方测评约 513 大卡（各渠道 500-580）；炸鸡排+沙拉酱，减脂去酱热量明显下降' },
  { id: 'kfc-crispy', name: '劲脆鸡腿堡（肯德基）', cat: 'cooked', kcal: 590, protein: 30, fat: 30, carb: 50, fiber: 1.5, sodium: 1200, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '第三方测评约 590 大卡；比香辣堡更大更油，宏量为估算' },
  { id: 'kfc-orleans', name: '新奥尔良烤鸡腿堡（肯德基）', cat: 'cooked', kcal: 440, protein: 24, fat: 18, carb: 45, fiber: 1.5, sodium: 1000, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '第三方测评约 440 大卡；非油炸烤鸡腿排，酱汁含糖，肯德基相对友好的堡' },
  { id: 'kfc-original', name: '吮指原味鸡（1块，肯德基）', cat: 'cooked', kcal: 364, protein: 27, fat: 24, carb: 12, fiber: 0, sodium: 800, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '第三方测评约 364 大卡/块（带皮炸鸡）；去皮后明显降低' },
  { id: 'kfc-fries-m', name: '薯条（中份，肯德基）', cat: 'cooked', kcal: 328, protein: 4, fat: 16, carb: 43, fiber: 3, sodium: 300, vitFat: [], vitWater: [], minerals: ['钾'], note: '第三方测评约 328 大卡；油炸碳水' },
  { id: 'kfc-egg-tart', name: '葡式蛋挞（肯德基）', cat: 'cooked', kcal: 196, protein: 3.5, fat: 11, carb: 21, fiber: 0.3, sodium: 120, vitFat: [], vitWater: ['A', 'B2'], minerals: ['钙'], note: '约 196 大卡/个；酥皮+蛋奶馅，糖油混合物，下午茶控量' },
  { id: 'kfc-chicken-nuggets-m', name: '鸡米花（中份，肯德基）', cat: 'cooked', kcal: 355, protein: 18, fat: 20, carb: 25, fiber: 0.5, sodium: 900, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '第三方测评约 355 大卡；炸鸡块，蘸酱另计' },
  { id: 'kfc-roll', name: '老北京鸡肉卷（肯德基）', cat: 'cooked', kcal: 415, protein: 22, fat: 14, carb: 52, fiber: 2, sodium: 1000, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '第三方测评约 415 大卡；甜面酱+黄瓜+京葱，宏量为估算' },
  { id: 'kfc-set-zinger', name: '香辣鸡腿堡套餐（肯德基）', cat: 'cooked', kcal: 1041, protein: 30, fat: 40, carb: 143, fiber: 4.5, sodium: 1400, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '堡+中薯+中杯可乐约 1041 大卡（513+328+200），换无糖可乐/玉米沙拉可显著降低' },
  { id: 'kfc-set-orleans', name: '新奥尔良鸡腿堡套餐（肯德基）', cat: 'cooked', kcal: 968, protein: 28, fat: 34, carb: 138, fiber: 4.5, sodium: 1300, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '堡+中薯+中杯可乐约 968 大卡（440+328+200）' },

  // ---- 塔斯汀中国汉堡（品牌未公开官方营养数据，第三方测评参考，波动大） ----
  { id: 'tasti-spicy', name: '香辣鸡腿堡（塔斯汀）', cat: 'cooked', kcal: 411, protein: 22, fat: 20, carb: 42, fiber: 1.5, sodium: 900, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '第三方测评约 411 大卡（各渠道 410-510，配方/门店有差异）；手擀现烤饼皮是招牌，比普通面包胚略清爽' },
  { id: 'tasti-pineapple', name: '板烧凤梨堡（塔斯汀）', cat: 'cooked', kcal: 425, protein: 22, fat: 18, carb: 45, fiber: 1.5, sodium: 850, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '第三方测评约 425 大卡（425-540）；非油炸板烧鸡排+凤梨，多汁但凤梨多为罐头糖分高' },
  { id: 'tasti-beef', name: '多汁牛肉堡（塔斯汀）', cat: 'cooked', kcal: 491, protein: 25, fat: 24, carb: 48, fiber: 1.5, sodium: 950, vitFat: [], vitWater: ['B3', 'B12'], minerals: ['铁'], note: '第三方测评约 491 大卡（470-585）；牛肉饼，宏量为估算' },
  { id: 'tasti-bacon-egg', name: '培根煎蛋堡（塔斯汀）', cat: 'cooked', kcal: 410, protein: 24, fat: 20, carb: 40, fiber: 1.5, sodium: 1000, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '第三方测评约 410 大卡（410-590）；培根+煎蛋，钠偏高' },
  { id: 'tasti-pepper', name: '藤椒鸡腿堡（塔斯汀）', cat: 'cooked', kcal: 418, protein: 22, fat: 19, carb: 44, fiber: 1.5, sodium: 880, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '第三方测评约 418 大卡（418-525）；藤椒风味，宏量为估算' },
  { id: 'tasti-duck', name: '北京烤鸭堡（塔斯汀）', cat: 'cooked', kcal: 460, protein: 20, fat: 18, carb: 52, fiber: 1.5, sodium: 950, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '第三方测评约 460 大卡（420-550）；甜面酱+烤鸭片，碳水偏高' },

  // ---- 用户点名补充：中式早餐 / 地方小吃 / 熟食 ----
  { id: 'youtiao', name: '油条', cat: 'cooked', kcal: 388, protein: 7, fat: 18, carb: 51, fiber: 1, sodium: 600, vitFat: [], vitWater: ['B1'], minerals: ['钠'], note: '油炸面食，脂肪高且常含铝膨松剂；配豆浆当早餐偶尔吃，减脂期不建议' },
  { id: 'baozi-pork', name: '猪肉包子（1个约80g）', cat: 'cooked', kcal: 230, protein: 8, fat: 10, carb: 28, fiber: 1, sodium: 450, vitFat: [], vitWater: ['B1'], minerals: [], note: '面皮+猪肥瘦肉馅，脂肪主要来自馅；2个约160g=370kcal，配豆浆+鸡蛋平衡' },
  { id: 'shaomai', name: '猪肉糯米烧麦（1个约60g）', cat: 'cooked', kcal: 236, protein: 7, fat: 8, carb: 35, fiber: 1, sodium: 400, vitFat: [], vitWater: [], minerals: [], note: '糯米+肉丁，碳水为主；4个约240g=566kcal，主食份量' },
  { id: 'huainan-beef-soup', name: '淮南牛肉汤（每100g汤）', cat: 'cooked', kcal: 60, protein: 5, fat: 2, carb: 4, fiber: 0, sodium: 800, vitFat: [], vitWater: ['B12'], minerals: ['铁'], note: '安徽淮南名吃；汤本身低卡，但钠极高（一碗约2000mg）；配粉丝/千张后碳水飙升，少喝汤、多吃牛肉' },
  { id: 'taihe-banmian', name: '太和板面（每100g碗装）', cat: 'cooked', kcal: 150, protein: 5, fat: 4, carb: 24, fiber: 1, sodium: 900, vitFat: [], vitWater: ['B3'], minerals: [], note: '安徽太和牛肉板面；宽面+卤牛肉+辣椒油；一碗约500g=750kcal，油重钠重，少喝辣汤' },
  { id: 'gela-tiao', name: '格拉条（阜阳面食，每100g）', cat: 'cooked', kcal: 130, protein: 4, fat: 3, carb: 22, fiber: 1, sodium: 600, vitFat: [], vitWater: [], minerals: [], note: '阜阳特色绿豆面/荞麦面粗面条，拌芝麻酱/卤；比精细面稍好但钠不低；一碗约400g=520kcal' },
  { id: 'menzi', name: '焖子（地瓜淀粉，每100g）', cat: 'cooked', kcal: 100, protein: 0.5, fat: 5, carb: 14, fiber: 0.5, sodium: 400, vitFat: [], vitWater: [], minerals: [], note: '北方/东北地瓜淀粉煎制，煎后拌麻酱蒜汁；几乎纯淀粉，营养密度低，当小吃不当菜' },
  { id: 'roast-chicken', name: '秘制烤鸡（带皮去骨）', cat: 'cooked', kcal: 220, protein: 26, fat: 12, carb: 2, fiber: 0, sodium: 700, vitFat: ['A'], vitWater: ['B3', 'B6'], minerals: ['锌'], note: '烤鸡带皮蛋白高脂肪适中；市售蜜汁烤鸡含糖，钠高；去皮后约165kcal/100g' },
  { id: 'roast-duck-skin', name: '秘制烤鸭（带皮）', cat: 'cooked', kcal: 350, protein: 20, fat: 30, carb: 2, fiber: 0, sodium: 700, vitFat: ['A'], vitWater: ['B3'], minerals: ['铁'], note: '北京烤鸭皮脂肪极高，一口皮约30kcal；蛋白在瘦肉部分；薄饼+甜面酱后碳水叠加，2-3片鸭+1饼为宜' },
  { id: 'steam-noodle', name: '蒸面条（每100g碗装）', cat: 'cooked', kcal: 160, protein: 5, fat: 4, carb: 26, fiber: 1, sodium: 500, vitFat: [], vitWater: ['B1'], minerals: [], note: '河南蒸面条，拌豆角/五花肉蒸制；油肉裹在面上，一碗约400g=640kcal' },
  { id: 'boiled-fish', name: '水煮鱼（每100g带油汤）', cat: 'cooked', kcal: 120, protein: 12, fat: 7, carb: 3, fiber: 0.5, sodium: 800, vitFat: ['D'], vitWater: ['B12'], minerals: ['硒'], note: '鱼片本身低脂高蛋白，但表面浮油与辣椒红油极高；撇油后鱼肉约80kcal/100g；钠重，少喝汤' },

  // ---- 用户点名补充：家常菜 / 街头烤串小吃 ----
  { id: 'yuxiang-rousi', name: '鱼香肉丝', cat: 'cooked', kcal: 110, protein: 8, fat: 6, carb: 6, fiber: 1, sodium: 500, vitFat: [], vitWater: ['B2'], minerals: ['铁'], note: '猪肉丝+木耳+胡萝卜+泡椒鱼香汁；糖醋酸辣，市售/外卖款油糖偏高；一盘约300g=330kcal' },
  { id: 'gongbao-jiding', name: '宫保鸡丁', cat: 'cooked', kcal: 150, protein: 12, fat: 9, carb: 7, fiber: 1.5, sodium: 480, vitFat: [], vitWater: ['B3'], minerals: ['锌'], note: '鸡腿肉+花生+干辣椒+糖醋芡；花生带来脂肪与蛋白；一盒外卖约400g=600kcal，米饭另算' },
  { id: 'xiehuang-tangbao', name: '蟹黄汤包', cat: 'cooked', kcal: 220, protein: 10, fat: 12, carb: 18, fiber: 0.5, sodium: 600, vitFat: ['A', 'D'], vitWater: ['B12'], minerals: ['钙'], note: '靖江/镇江名点，汤包皮冻+蟹黄蟹肉；一笼约6只300g=660kcal，"先开窗后喝汤"；蟹黄胆固醇高，一次1-2只' },
  { id: 'fensi-jiaozi', name: '粉丝素饺子', cat: 'cooked', kcal: 200, protein: 6, fat: 8, carb: 26, fiber: 1.5, sodium: 450, vitFat: [], vitWater: [], minerals: [], note: '粉丝+韭菜+鸡蛋馅；粉丝几乎纯淀粉，蛋白低于肉饺；10只约250g=500kcal；蘸醋+蒜，少喝饺子汤（钠）' },
  { id: 'gunai-kaochang', name: '骨泥烤肠（夜市铁板肠）', cat: 'cooked', kcal: 280, protein: 12, fat: 22, carb: 8, fiber: 0, sodium: 800, vitFat: [], vitWater: ['B1'], minerals: ['磷'], note: '鸡皮/骨泥/淀粉+香精灌肠，脂肪与钠双高；一根约70g=196kcal；偶尔解馋，别当蛋白质来源' },
  { id: 'gurou-xianglian', name: '骨肉相连（烤串）', cat: 'cooked', kcal: 220, protein: 14, fat: 15, carb: 6, fiber: 0, sodium: 700, vitFat: [], vitWater: ['B3'], minerals: ['钙'], note: '鸡胸软骨+鸡腿肉串，腌制后油炸/烧烤；软骨补钙但脂肪不低；一串约40g=88kcal，5串440kcal' },
  { id: 'kao-mianjin', name: '烤面筋（刷辣酱）', cat: 'cooked', kcal: 180, protein: 25, fat: 5, carb: 8, fiber: 1, sodium: 900, vitFat: [], vitWater: [], minerals: ['钙'], note: '水洗面筋，植物蛋白含量高（约25g/100g）；刷油辣酱后钠高；一串约60g=108kcal，素食烤串里相对友好' },
  { id: 'kao-lengmian', name: '烤冷面（东北街头）', cat: 'cooked', kcal: 180, protein: 6, fat: 7, carb: 25, fiber: 1, sodium: 600, vitFat: [], vitWater: ['B2'], minerals: [], note: '冷面片+鸡蛋+香肠+洋葱+甜辣酱；一份约300g=540kcal；蛋加双份能补蛋白，肠换鸡柳更健康' },
  { id: 'choudoufu', name: '油炸臭豆腐（长沙/绍兴）', cat: 'cooked', kcal: 150, protein: 10, fat: 10, carb: 5, fiber: 0.5, sodium: 700, vitFat: [], vitWater: ['B2'], minerals: ['铁'], note: '发酵豆腐油炸，外酥内嫩；蛋白质在豆腐本身，但吸油多；一份10片约150g=225kcal；配蒜蓉辣椒酱钠高' },

  // ---- 用户点名补充 ----
  { id: 'baozi-beef', name: '牛肉包子（1个约100g）', cat: 'cooked', kcal: 230, protein: 9, fat: 8, carb: 30, fiber: 1, sodium: 480, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['铁', '锌'], note: '面皮+牛肉大葱馅，脂肪低于猪肉包；2个约200g=460kcal；配一碗豆浆/粥平衡' },
  { id: 'baozi-lamb', name: '羊肉包子（1个约100g）', cat: 'cooked', kcal: 240, protein: 8, fat: 10, carb: 30, fiber: 1, sodium: 500, vitFat: [], vitWater: ['B12'], minerals: ['锌', '铁'], note: '羊肉胡萝卜/大葱馅，膻味因人而异；脂肪略高于牛肉包；2个约480kcal，配生蒜/醋' },
];