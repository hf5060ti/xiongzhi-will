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
];
