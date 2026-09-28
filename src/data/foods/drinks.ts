// EXPORTS: DRINKS
// 饮料（碳酸/茶饮/果汁/能量运动/乳饮料），每 100ml 参考值
// ⚠ 数据为市面常见品牌公开营养成分表的平均参考值，不同品牌、批次、杯型差异较大，以产品包装营养成分表为准
import type { IFood } from './types';

export const DRINKS: IFood[] = [
  // ---- 碳酸饮料 ----
  { id: 'coke-classic', name: '可口可乐（经典）', cat: 'drink', kcal: 43, protein: 0, fat: 0, carb: 10.6, fiber: 0, sodium: 4, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；一罐 330ml ≈ 142kcal，纯游离糖空热量' },
  { id: 'pepsi-classic', name: '百事可乐（经典）', cat: 'drink', kcal: 43, protein: 0, fat: 0, carb: 10.9, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；一罐 330ml ≈ 142kcal' },
  { id: 'coke-cherry', name: '樱桃味可口可乐', cat: 'drink', kcal: 45, protein: 0, fat: 0, carb: 11.2, fiber: 0, sodium: 4, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；比经典款略高' },
  { id: 'coke-vanilla', name: '香草味可口可乐', cat: 'drink', kcal: 44, protein: 0, fat: 0, carb: 11, fiber: 0, sodium: 4, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'sprite-classic', name: '雪碧（柠檬味）', cat: 'drink', kcal: 40, protein: 0, fat: 0, carb: 10, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；330ml 罐 ≈ 132kcal' },
  { id: 'sprite-zero', name: '雪碧（无糖）', cat: 'drink', kcal: 0.3, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 12, vitFat: [], vitWater: [], minerals: [], note: '无糖代糖，每 100ml；近乎零热量' },
  { id: 'fanta-orange', name: '芬达（橙味）', cat: 'drink', kcal: 46, protein: 0, fat: 0, carb: 11.5, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；果味汽水' },
  { id: 'fanta-grape', name: '芬达（葡萄味）', cat: 'drink', kcal: 45, protein: 0, fat: 0, carb: 11.2, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'mirinda-orange', name: '美年达（橙味）', cat: 'drink', kcal: 46, protein: 0, fat: 0, carb: 11.5, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'mirinda-apple', name: '美年达（青苹果味）', cat: 'drink', kcal: 44, protein: 0, fat: 0, carb: 11, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'seven-up', name: '七喜（柠檬味）', cat: 'drink', kcal: 40, protein: 0, fat: 0, carb: 10, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'arbuck-ice', name: '北冰洋（桔汁汽水）', cat: 'drink', kcal: 45, protein: 0, fat: 0, carb: 11.3, fiber: 0, sodium: 15, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；国产老牌汽水' },
  { id: 'jianlibao', name: '健力宝（经典）', cat: 'drink', kcal: 42, protein: 0, fat: 0, carb: 10.5, fiber: 0, sodium: 20, vitFat: [], vitWater: [], minerals: ['钠'], note: '含糖+电解质，每 100ml；国产老牌运动风味饮料' },
  { id: 'coke-zero', name: '可口可乐（零度无糖）', cat: 'drink', kcal: 0.2, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: [], note: '无糖代糖，每 100ml；近乎零热量，仍有咖啡因约 9mg/100ml' },
  { id: 'genki-white-peach', name: '元气森林（白桃味气泡水）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 0, vitFat: [], vitWater: [], minerals: [], note: '无糖无热量气泡水，每 100ml；代糖调味，口感清爽' },
  { id: 'genki-calamansi', name: '元气森林（卡曼橘味气泡水）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 0, vitFat: [], vitWater: [], minerals: [], note: '无糖无热量气泡水，每 100ml' },

  // ---- 茶饮料 ----
  { id: 'ice-black-tea', name: '冰红茶（含糖）', cat: 'drink', kcal: 35, protein: 0, fat: 0, carb: 8.8, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], phytochem: ['茶多酚：少量抗氧化'], note: '含糖，每 100ml；500ml 瓶 ≈ 175kcal，主要来自糖' },
  { id: 'ice-black-tea-zero', name: '冰红茶（无糖）', cat: 'drink', kcal: 1, protein: 0, fat: 0, carb: 0.3, fiber: 0, sodium: 15, vitFat: [], vitWater: [], minerals: [], phytochem: ['茶多酚：少量抗氧化'], note: '无糖，每 100ml；近乎零热量' },
  { id: 'green-tea-bottle', name: '绿茶（瓶装含糖）', cat: 'drink', kcal: 30, protein: 0, fat: 0, carb: 7.5, fiber: 0, sodium: 8, vitFat: [], vitWater: [], minerals: [], phytochem: ['儿茶素（EGCG）：抗氧化'], note: '含糖，每 100ml；选无糖版热量归零' },
  { id: 'green-tea-zero', name: '绿茶（瓶装无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: [], phytochem: ['儿茶素（EGCG）：抗氧化'], note: '无糖，每 100ml；日常代替含糖饮料首选' },
  { id: 'jasmine-tea-sweet', name: '茉莉花茶（含糖）', cat: 'drink', kcal: 30, protein: 0, fat: 0, carb: 7.5, fiber: 0, sodium: 8, vitFat: [], vitWater: [], minerals: [], phytochem: ['茉莉花茶多酚：抗氧化'], note: '含糖，每 100ml' },
  { id: 'jasmine-tea-zero', name: '茉莉花茶（无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: [], phytochem: ['茉莉花茶多酚：抗氧化'], note: '无糖，每 100ml' },
  { id: 'oolong-tea-zero', name: '乌龙茶（无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: [], phytochem: ['茶多酚：抗氧化'], note: '无糖，每 100ml；解腻刮油感来自茶多酚' },
  { id: 'oriental-leaf-tea', name: '东方树叶（茉莉花茶/无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], phytochem: ['茶多酚：抗氧化'], note: '无糖原叶茶，每 100ml；零热量' },
  { id: 'vita-lemon-tea', name: '维他柠檬茶', cat: 'drink', kcal: 40, protein: 0, fat: 0, carb: 10, fiber: 0, sodium: 15, vitFat: [], vitWater: ['C'], minerals: [], note: '含糖，每 100ml；"维他命水"+茶，糖分不低' },
  { id: 'sour-plum-drink', name: '酸梅汤（瓶装）', cat: 'drink', kcal: 35, protein: 0, fat: 0, carb: 8.7, fiber: 0, sodium: 20, vitFat: [], vitWater: [], minerals: ['钾'], note: '含糖，每 100ml；传统饮品，糖分来自冰糖/白砂糖' },
  { id: 'herbal-tea-wong', name: '凉茶（王老吉/加多宝）', cat: 'drink', kcal: 35, protein: 0, fat: 0, carb: 8.7, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], phytochem: ['仙草/菊花等草本：清凉感'], note: '含糖，每 100ml；"降火"主要靠补水+草本，含糖不低' },
  { id: 'honey-grapefruit-tea', name: '蜂蜜柚子茶（瓶装）', cat: 'drink', kcal: 50, protein: 0.1, fat: 0, carb: 12.5, fiber: 0, sodium: 15, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '含糖，每 100ml；蜂蜜+柚皮糖渍，糖分偏高，一小杯也别当水喝' },
  { id: 'jasmine-honey-tea', name: '康师傅茉莉蜜茶', cat: 'drink', kcal: 42, protein: 0, fat: 0, carb: 10.5, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], phytochem: ['茉莉茶多酚：抗氧化'], note: '含糖，每 100ml；比茉莉花茶甜，糖分更高' },
  { id: 'tea-pai-peach', name: '茶π（蜜桃乌龙茶）', cat: 'drink', kcal: 42, protein: 0, fat: 0, carb: 10.5, fiber: 0, sodium: 15, vitFat: [], vitWater: [], minerals: [], phytochem: ['茶多酚：抗氧化'], note: '含糖果味茶，每 100ml；乌龙茶底+桃汁风味' },
  { id: 'tea-pai-lemon', name: '茶π（柠檬红茶）', cat: 'drink', kcal: 40, protein: 0, fat: 0, carb: 10, fiber: 0, sodium: 15, vitFat: [], vitWater: [], minerals: [], phytochem: ['茶多酚：抗氧化'], note: '含糖果味茶，每 100ml' },
  { id: 'oriental-leaf-black', name: '东方树叶（红茶/无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], phytochem: ['茶多酚：抗氧化'], note: '无糖原叶茶，每 100ml；零热量' },
  { id: 'oriental-leaf-puer', name: '东方树叶（青柑普洱/无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], phytochem: ['普洱茶多酚：抗氧化，陈皮：理气'], note: '无糖原叶茶，每 100ml；零热量，青柑陈皮风味' },

  // ---- 果汁饮料 ----
  { id: 'minute-maid-orange', name: '美汁源果粒橙', cat: 'drink', kcal: 46, protein: 0.3, fat: 0, carb: 11.5, fiber: 0.3, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '含糖，每 100ml；果汁含量约 30%，含果肉纤维少' },
  { id: 'tang-zer', name: '鲜橙多（果汁饮料）', cat: 'drink', kcal: 45, protein: 0.2, fat: 0, carb: 11, fiber: 0.2, sodium: 10, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '含糖，每 100ml' },
  { id: 'c100', name: '水溶C100（柠檬味）', cat: 'drink', kcal: 45, protein: 0, fat: 0, carb: 11, fiber: 0, sodium: 10, vitFat: [], vitWater: ['C'], minerals: [], note: '含糖+维生素C，每 100ml；一瓶 445ml ≈ 200kcal' },
  { id: 'mango-juice', name: '芒果汁', cat: 'drink', kcal: 55, protein: 0.3, fat: 0.1, carb: 13, fiber: 0.5, sodium: 5, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '含糖，每 100ml；果味浓，热量略高于橙汁' },
  { id: 'peach-juice', name: '桃汁', cat: 'drink', kcal: 50, protein: 0.2, fat: 0, carb: 12.5, fiber: 0.3, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '含糖，每 100ml' },
  { id: 'grape-juice', name: '葡萄汁', cat: 'drink', kcal: 60, protein: 0.3, fat: 0, carb: 15, fiber: 0.3, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '含糖，每 100ml；升糖较快' },
  { id: 'hawthorn-drink', name: '山楂汁（瓶装）', cat: 'drink', kcal: 45, protein: 0.2, fat: 0, carb: 11.2, fiber: 0.3, sodium: 10, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '含糖，每 100ml' },
  { id: 'coconut-drink', name: '椰汁（椰树风味）', cat: 'drink', kcal: 70, protein: 0.3, fat: 3.5, carb: 8, fiber: 0, sodium: 15, vitFat: ['E'], vitWater: [], minerals: ['钾'], note: '每 100ml；椰肉榨浆，脂肪来自椰肉，非椰子水（椰子水约 19kcal）' },
  { id: 'special-forces-coconut', name: '特种兵（生榨椰子汁）', cat: 'drink', kcal: 75, protein: 0.4, fat: 4.5, carb: 8.5, fiber: 0, sodium: 20, vitFat: ['E'], vitWater: [], minerals: ['钾'], note: '每 100ml；生榨椰肉浆，脂肪来自椰肉，热量高于椰子水；"特种兵"为椰汁品牌名' },

  // ---- 能量饮料 / 运动饮料 ----
  { id: 'monster-classic', name: '魔爪（Monster 黑罐原味）', cat: 'drink', kcal: 47, protein: 0.3, fat: 0, carb: 11.7, fiber: 0, sodium: 100, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['钠', '钾'], note: '含糖+咖啡因约 32mg/100ml+牛磺酸，每 100ml；一罐 355ml ≈ 167kcal；提神但别当水喝，晚练影响睡眠' },
  { id: 'monster-zero', name: '魔爪（白罐 Ultra 无糖）', cat: 'drink', kcal: 10, protein: 0.3, fat: 0, carb: 2, fiber: 0, sodium: 120, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['钠', '钾'], note: '白罐 Ultra White 无糖代糖，咖啡因与原味相当约 30mg/100ml，每 100ml；注意咖啡因总量' },
  { id: 'monster-orange', name: '魔爪（橙味 Ultra Sunrise）', cat: 'drink', kcal: 10, protein: 0.3, fat: 0, carb: 2, fiber: 0, sodium: 120, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['钠', '钾'], note: '橙子味无糖款，咖啡因约 30mg/100ml，每 100ml；想要橙味又不想摄入糖可选' },
  { id: 'monster-mango', name: '魔爪（芒果味 Mango Loco）', cat: 'drink', kcal: 45, protein: 0.3, fat: 0, carb: 11, fiber: 0, sodium: 100, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['钠', '钾'], note: '含糖果汁风味款，咖啡因约 30mg/100ml，每 100ml；比原味热量略低一点仍是含糖能量饮料' },
  { id: 'monster-ultra-violet', name: '魔爪（紫罐 Ultra Violet）', cat: 'drink', kcal: 10, protein: 0.3, fat: 0, carb: 2, fiber: 0, sodium: 120, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['钠', '钾'], note: '葡萄莓果味无糖款，咖啡因约 30mg/100ml，每 100ml' },
  { id: 'monster-ultra-paradise', name: '魔爪（绿罐 Ultra Paradise）', cat: 'drink', kcal: 10, protein: 0.3, fat: 0, carb: 2, fiber: 0, sodium: 120, vitFat: [], vitWater: ['B3', 'B6', 'B12'], minerals: ['钠', '钾'], note: '热带水果味无糖款，咖啡因约 30mg/100ml，每 100ml' },
  { id: 'redbull-classic', name: '红牛（金罐经典）', cat: 'drink', kcal: 45, protein: 0.4, fat: 0, carb: 11.3, fiber: 0, sodium: 40, vitFat: [], vitWater: ['B3', 'B5', 'B6', 'B12'], minerals: ['钠'], note: '含糖+咖啡因约 32mg/100ml，每 100ml；一罐 250ml ≈ 113kcal' },
  { id: 'redbull-blue', name: '红牛（蓝罐蓝莓味）', cat: 'drink', kcal: 45, protein: 0.4, fat: 0, carb: 11.3, fiber: 0, sodium: 40, vitFat: [], vitWater: ['B3', 'B5', 'B6', 'B12'], minerals: ['钠'], note: '蓝罐 Blue Edition 蓝莓味，含糖+咖啡因约 32mg/100ml，每 100ml' },
  { id: 'redbull-sugarfree', name: '红牛（无糖银罐）', cat: 'drink', kcal: 2, protein: 0.4, fat: 0, carb: 0.4, fiber: 0, sodium: 40, vitFat: [], vitWater: ['B3', 'B5', 'B6', 'B12'], minerals: ['钠'], note: '无糖款，咖啡因约 32mg/100ml 与原味相当，每 100ml；提神不减咖啡因' },
  { id: 'dongpeng-te', name: '东鹏特饮', cat: 'drink', kcal: 40, protein: 0.3, fat: 0, carb: 10, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['钠'], note: '含糖+咖啡因，每 100ml；500ml 瓶 ≈ 200kcal' },
  { id: 'lehur', name: '乐虎（能量饮料）', cat: 'drink', kcal: 45, protein: 0.3, fat: 0, carb: 11, fiber: 0, sodium: 50, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['钠'], note: '含糖+咖啡因，每 100ml' },
  { id: 'zhanshen-energy', name: '战马（能量饮料）', cat: 'drink', kcal: 40, protein: 0.3, fat: 0, carb: 10, fiber: 0, sodium: 45, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['钠'], note: '含糖+咖啡因，每 100ml' },
  { id: 'mizone', name: '脉动（青柠味）', cat: 'drink', kcal: 25, protein: 0, fat: 0, carb: 6, fiber: 0, sodium: 20, vitFat: [], vitWater: ['B3', 'B6', 'C'], minerals: [], note: '含糖维生素水，每 100ml；600ml 瓶 ≈ 150kcal' },
  { id: 'scream-sports', name: '尖叫（蓝瓶电解质）', cat: 'drink', kcal: 25, protein: 0, fat: 0, carb: 6, fiber: 0, sodium: 30, vitFat: [], vitWater: [], minerals: ['钠', '钾'], note: '含糖+电解质，每 100ml；大量出汗时补充尚可' },
  { id: 'gatorade', name: '佳得乐（蓝莓味）', cat: 'drink', kcal: 25, protein: 0, fat: 0, carb: 6.2, fiber: 0, sodium: 45, vitFat: [], vitWater: [], minerals: ['钠', '钾'], note: '运动饮料，含糖+电解质，每 100ml；长时耐力训练中途补水用' },
  { id: 'pocari-sweat', name: '宝矿力水特', cat: 'drink', kcal: 25, protein: 0, fat: 0, carb: 6.2, fiber: 0, sodium: 49, vitFat: [], vitWater: [], minerals: ['钠', '钾', '钙', '镁'], note: '等渗电解质饮料，每 100ml；发烧腹泻、大汗后补水补电解质经典选择' },
  { id: 'alien-electrolyte', name: '外星人（电解质水/白桃味）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 20, vitFat: [], vitWater: [], minerals: ['钠', '钾', '锌'], note: '无糖电解质水，每 100ml；代糖调味，大汗/桑拿/运动后补电解质可选' },

  // ---- 乳味饮料 / 其他 ----
  { id: 'wangzai-milk', name: '旺仔牛奶（复原乳）', cat: 'drink', kcal: 85, protein: 2.4, fat: 3, carb: 12, fiber: 0, sodium: 70, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '每 100ml；复原乳+糖，含糖不低，别当纯奶喝' },
  { id: 'nutri-express', name: '营养快线（原味）', cat: 'drink', kcal: 75, protein: 1, fat: 1, carb: 16, fiber: 0, sodium: 60, vitFat: [], vitWater: ['B2'], minerals: ['钙'], note: '含糖乳饮料，每 100ml；蛋白质含量低，主要是糖水+奶味' },
  { id: 'ad-calcium-milk', name: 'AD钙奶', cat: 'drink', kcal: 70, protein: 1, fat: 1.2, carb: 14, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'], note: '含糖乳饮料，每 100ml；维生素 A/D 强化，糖分不低' },
  { id: 'soy-yogurt-drink', name: '养乐多（低糖）', cat: 'drink', kcal: 40, protein: 1, fat: 0.3, carb: 9, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: ['钙'], note: '乳酸菌饮料，每 100ml；原味约 65kcal，低糖约 40kcal' },
  { id: 'coffee-bottle-sweet', name: '瓶装咖啡（含糖拿铁）', cat: 'drink', kcal: 55, protein: 1.2, fat: 1.5, carb: 9, fiber: 0, sodium: 40, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '含糖+奶，每 100ml；一瓶 300ml ≈ 165kcal' },
  { id: 'six-walnut', name: '六个核桃（核桃乳）', cat: 'drink', kcal: 60, protein: 0.6, fat: 1.8, carb: 10, fiber: 0, sodium: 40, vitFat: ['E'], vitWater: [], minerals: ['钙', '钾'], note: '含糖植物蛋白饮料，每 100ml；核桃含量有限，糖分不低' },
  { id: 'lulu-almond', name: '露露杏仁露', cat: 'drink', kcal: 45, protein: 0.8, fat: 1.5, carb: 6.5, fiber: 0, sodium: 30, vitFat: ['E'], vitWater: [], minerals: ['钙'], note: '含糖植物蛋白饮料，每 100ml；杏仁风味' },
  { id: 'vitasoy-original', name: '维他奶（原味豆奶）', cat: 'drink', kcal: 45, protein: 1.6, fat: 1.1, carb: 6.5, fiber: 0, sodium: 30, vitFat: ['E'], vitWater: ['B2'], minerals: ['钙'], note: '含糖豆奶，每 100ml；植物蛋白饮料里蛋白质算高的' },
];
