// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: DRINKS
// 饮料（碳酸/茶饮/果汁/能量运动/乳饮料），每 100ml 参考值
// ⚠ 数据为市面常见品牌公开营养成分表的平均参考值，不同品牌、批次、杯型差异较大，以产品包装营养成分表为准
import type { IFood } from './types';

export const DRINKS: IFood[] = [
  // ---- 碳酸饮料 ----
  { id: 'coke-classic', name: '可口可乐（经典）', cat: 'drink', kcal: 43, protein: 0, fat: 0, carb: 10.6, fiber: 0, sodium: 4, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；一罐 330ml ≈ 142kcal，纯游离糖空热量' },
  { id: 'coke-cherry', name: '樱桃味可口可乐', cat: 'drink', kcal: 45, protein: 0, fat: 0, carb: 11.2, fiber: 0, sodium: 4, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；比经典款略高' },
  { id: 'coke-vanilla', name: '香草味可口可乐', cat: 'drink', kcal: 44, protein: 0, fat: 0, carb: 11, fiber: 0, sodium: 4, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
  { id: 'sprite-classic', name: '雪碧（柠檬味）', cat: 'drink', kcal: 40, protein: 0, fat: 0, carb: 10, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml；330ml 罐 ≈ 132kcal' },
  { id: 'sprite-zero', name: '雪碧（无糖）', cat: 'drink', kcal: 0.3, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 12, vitFat: [], vitWater: [], minerals: [], note: '无糖代糖，每 100ml；近乎零热量' },
  { id: 'fanta-grape', name: '芬达（葡萄味）', cat: 'drink', kcal: 45, protein: 0, fat: 0, carb: 11.2, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '含糖，每 100ml' },
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

  // ---- 用户点名补充 ----
  { id: 'sea-buckthorn-juice', name: '沙棘果汁（含糖市售）', cat: 'drink', kcal: 50, protein: 0.5, fat: 0.1, carb: 12, fiber: 0.2, sodium: 10, vitFat: ['A', 'E'], vitWater: ['C'], minerals: ['钾'], phytochem: ['沙棘黄酮', 'Omega-7', '类胡萝卜素'], note: '维C与黄酮密度高，但市售款多加糖；选100%原浆/低糖款更佳；原浆极酸，需兑水或蜂蜜' },

  // ---- 用户点名补充 ----
  { id: 'lao-zao', name: '醪糟（酒酿/甜米酒）', cat: 'drink', kcal: 91, protein: 3, fat: 0.1, carb: 18, fiber: 0.2, sodium: 10, vitFat: [], vitWater: ['B族'], minerals: [], phytochem: ['根霉糖化酶'], note: '糯米+酒曲发酵，含微量酒精（约1-2%），煮开后大部分挥发；产妇/经期常食但别大量；开车/服药者慎饮；一碗约200g=182kcal' },
  { id: 'chidou-niangzao', name: '赤豆酒酿', cat: 'drink', kcal: 90, protein: 3.5, fat: 0.2, carb: 18, fiber: 1.5, sodium: 15, vitFat: [], vitWater: ['B族'], minerals: ['铁'], note: '醪糟+红豆沙，比纯醪糟多一点铁与纤维；糖与钠看店家配方；夏天冷饮常见，一碗约300g=270kcal' },

  // ---- 用户点名补充：散装茶叶（冲泡后每100ml） ----
  { id: 'tea-puer', name: '普洱茶（熟普，冲泡）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['茶多酚', '茶褐素', '儿茶素'], note: '熟普渥堆发酵，茶汤醇厚；零热量；常被宣传刮油减脂，证据有限，不能替代饮食控制；空腹/失眠/贫血/孕期少饮；服药前后1小时别喝（鞣酸影响铁吸收）' },
  { id: 'tea-dahongpao', name: '大红袍（武夷岩茶，冲泡）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['茶多酚', '岩茶香气物质', '咖啡因'], note: '半发酵乌龙，焙火香；零热量；咖啡因中等，下午4点后喝易失眠；胃寒者岩茶比绿茶友好；别配大量肉鱼一次暴饮，鞣酸影响消化' },

  // ---- 用户点名：市售酸奶/乳饮料 ----
  { id: 'yoshan', name: '优酸乳（原味乳饮料）', cat: 'drink', kcal: 47, protein: 1.5, fat: 1.2, carb: 8, fiber: 0, sodium: 40, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'], note: '【注意】是"乳饮料"不是纯酸奶——水+奶+糖+添加剂，蛋白仅1.5g/100ml，远低于纯酸奶（≥2.9g）；一盒250ml约118kcal；想补蛋白别靠它' },
  { id: 'chunzhen', name: '纯甄酸牛奶（原味）', cat: 'drink', kcal: 95, protein: 3.1, fat: 3.5, carb: 12, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '纯酸奶（发酵乳），蛋白3.1g/100ml，比乳饮料高；一杯200g约190kcal；看配料表选"生牛乳+菌种"，少香精/果胶；减脂期选无蔗糖款' },
  { id: 'anmuxi-original', name: '安慕希希腊风味酸奶（原味）', cat: 'drink', kcal: 95, protein: 3.1, fat: 3.5, carb: 12, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '希腊风味浓酸奶，蛋白与纯甄接近；一杯200g约190kcal；增肌后加餐可；减脂期看碳水（12g/100ml偏高），可选0蔗糖款' },
  { id: 'anmuxi-strawberry', name: '安慕希草莓味酸奶', cat: 'drink', kcal: 98, protein: 3.0, fat: 3.3, carb: 13, fiber: 0.3, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2', 'C'], minerals: ['钙'], note: '加草莓果酱/香精，碳水比原味略高；一杯200g约196kcal；果味款糖更多，减脂期选原味' },
  { id: 'anmuxi-blueberry', name: '安慕希蓝莓味酸奶', cat: 'drink', kcal: 96, protein: 3.0, fat: 3.3, carb: 12.5, fiber: 0.2, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2'], minerals: ['钙'], phytochem: ['蓝莓花青素（少量）'], note: '蓝莓果味，与草莓款接近；一杯200g约192kcal；花青素主要来自果酱，别当抗氧化神药' },
  { id: 'anmuxi-sugarfree', name: '安慕希无蔗糖酸奶', cat: 'drink', kcal: 60, protein: 3.1, fat: 3.5, carb: 6, fiber: 0, sodium: 60, vitFat: ['A', 'D'], vitWater: ['B2', 'B12'], minerals: ['钙'], note: '用代糖（赤藓糖醇/甜菊糖苷）替代蔗糖，碳水从12g降到6g；一杯200g约120kcal；减脂/控糖优选；但仍有脂肪与蛋白，别当水喝' },

  // ---- 碳酸饮料（用户点名）----
  { id: 'cola-classic', name: '可口可乐（经典含糖）', cat: 'drink', kcal: 42, protein: 0, fat: 0, carb: 10.6, fiber: 0, sodium: 5, vitFat: [], vitWater: ['B族少量'], minerals: [], note: '每100ml约42kcal；一罐330ml≈139kcal（约35g糖=7块方糖）；液体糖，减脂期绝对避开；无糖款见下' },
  { id: 'cola-zero', name: '零度可乐（无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 8, vitFat: [], vitWater: [], minerals: [], note: '零糖零卡，用阿斯巴甜/安赛蜜代糖；解渴解馋可以，但代糖长期影响肠道菌群/胰岛素敏感性证据仍在研究；别当水喝' },
  { id: 'pepsi-classic', name: '百事可乐（经典含糖）', cat: 'drink', kcal: 41, protein: 0, fat: 0, carb: 10.6, fiber: 0, sodium: 7, vitFat: [], vitWater: [], minerals: [], note: '与可口可乐热量接近；一罐330ml≈135kcal；糖含量几乎一样' },
  { id: 'pepsi-max', name: '百事极度（无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '百事无糖款；与零度类似' },
  { id: 'sprite', name: '雪碧（柠檬味碳酸）', cat: 'drink', kcal: 41, protein: 0, fat: 0, carb: 10.6, fiber: 0, sodium: 9, vitFat: [], vitWater: ['维C（少量添加）'], minerals: [], note: '柠檬味汽水；一罐330ml≈135kcal；糖与可乐接近；柠檬味主要来自香精' },
  { id: 'mirinda-orange', name: '美年达（橙味碳酸）', cat: 'drink', kcal: 43, protein: 0, fat: 0, carb: 11, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '橙味汽水；一罐330ml≈142kcal；比可乐略甜' },
  { id: 'fanta-orange', name: '芬达（橙味碳酸）', cat: 'drink', kcal: 44, protein: 0, fat: 0, carb: 11, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '可口可乐公司橙味汽水；与美年达类似；一罐330ml≈145kcal' },
  { id: 'tropic-orange', name: '果粒橙（橙汁饮料）', cat: 'drink', kcal: 45, protein: 0, fat: 0.1, carb: 11, fiber: 0.1, sodium: 8, vitFat: [], vitWater: ['C（强化）'], minerals: ['钾'], note: '含橙肉颗粒；但仍是"饮料"不是纯果汁——水+糖+橙汁+香精；一瓶450ml≈203kcal；想喝橙汁直接吃橙子' },

  // ---- 冰红茶/茶饮 ----
  { id: 'iced-tea-lemon', name: '冰红茶（柠檬味含糖）', cat: 'drink', kcal: 38, protein: 0, fat: 0, carb: 9.5, fiber: 0, sodium: 10, vitFat: [], vitWater: ['B族'], minerals: [], note: '康师傅/统一经典；每100ml约38kcal；一瓶500ml≈190kcal（约47g糖）；"茶味"主要是香精+糖' },
  { id: 'east-leaf-green', name: '东方树叶（绿茶，无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['茶多酚', '儿茶素', '咖啡因'], note: '无糖纯茶，零卡；农夫山泉出品；茶多酚保留完整；比含糖茶饮健康得多；咖啡因中等，下午喝可能影响睡眠' },
  { id: 'east-leaf-oolong', name: '东方树叶（乌龙茶，无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['茶多酚', '茶多糖', '咖啡因'], note: '无糖乌龙；半发酵茶，回甘；零卡解腻；"刮油"证据有限，但解腻是真的' },
  { id: 'east-leaf-jasmine', name: '东方树叶（茉莉花茶，无糖）', cat: 'drink', kcal: 0, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['钾'], phytochem: ['茶多酚', '茉莉花香气'], note: '无糖茉莉绿茶；香气清新；零卡；咖啡因比乌龙略低' },
  { id: 'honey-yuzu', name: '蜂蜜柚子茶（市售冲调）', cat: 'drink', kcal: 50, protein: 0, fat: 0, carb: 12, fiber: 0.5, sodium: 10, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '柚子蜜+水冲调；每100ml约50kcal；蜂蜜含糖量高，别当健康饮品；一杯300ml≈150kcal' },

  // ---- 椰汁/植物蛋白饮料 ----
  { id: 'special-forces-coconut', name: '特种兵椰子汁', cat: 'drink', kcal: 55, protein: 0.5, fat: 3.5, carb: 6, fiber: 0.3, sodium: 20, vitFat: ['A'], vitWater: [], minerals: ['钾'], note: '椰肉榨汁+水+糖；脂肪来自椰肉（饱和脂肪为主）；一瓶500ml≈275kcal；椰树/特种兵类似；别当健康饮品' },
  { id: 'coconut-water', name: '椰子水（纯，非椰奶）', cat: 'drink', kcal: 19, protein: 0.2, fat: 0.2, carb: 3.7, fiber: 0.5, sodium: 105, vitFat: [], vitWater: ['C'], minerals: ['钾（极高）', '钠', '镁'], phytochem: [], note: '天然等渗电解质饮料；钾含量极高（约250mg/100ml），比香蕉还高；运动后补水补电解质；低糖低卡；注意：椰子水≠椰奶（椰奶是椰肉榨的，脂肪高）' },

  // ---- 奶茶/果茶（参考蜜雪冰城）----
  { id: 'mixue-lemon-water', name: '柠檬水（蜜雪冰城标准）', cat: 'drink', kcal: 25, protein: 0, fat: 0, carb: 6, fiber: 0.2, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '蜜雪冰城招牌；一杯中杯约25kcal（少冰半糖）；柠檬水是奶茶店最低卡选择；选无糖/少糖' },
  { id: 'mixue-milk-tea', name: '奶茶（蜜雪冰城原味）', cat: 'drink', kcal: 80, protein: 1, fat: 2.5, carb: 13, fiber: 0, sodium: 30, vitFat: [], vitWater: [], minerals: [], note: '奶精+茶+糖；中杯约300ml≈240kcal；奶精（植脂末）含反式脂肪；减脂期尽量避开；想喝奶盖/珍珠再加100-150kcal' },
  { id: 'milk-tea-bubble', name: '珍珠奶茶（常规）', cat: 'drink', kcal: 90, protein: 1.5, fat: 2.5, carb: 16, fiber: 0.2, sodium: 35, vitFat: [], vitWater: [], minerals: [], note: '奶茶+珍珠（木薯粉圆）；一杯500ml≈450kcal；珍珠本身是淀粉，没营养但吸糖水；一杯=一顿饭的热量；减脂期偶尔解馋' },

  // ---- 酒类（用户点名，标注危害）----
  { id: 'alcohol-baijiu', name: '白酒（52度，每100ml）', cat: 'drink', kcal: 310, protein: 0, fat: 0, carb: 0, fiber: 0, sodium: 0, vitFat: [], vitWater: ['B族（极少量）'], minerals: [], note: '【酒精危害】1g酒精=7kcal；白酒几乎全是空热量；长期饮酒伤肝、升血压、增加癌症风险（WHO一类致癌物）；中国居民膳食指南建议男性一天酒精不超25g（约白酒50ml），女性不超15g；喝多了训练效果归零（酒精抑制蛋白合成24-48小时）' },
  { id: 'alcohol-zhiyuan', name: '中国劲酒（35度，每100ml）', cat: 'drink', kcal: 200, protein: 0, fat: 0, carb: 5, fiber: 0, sodium: 10, vitFat: [], vitWater: [], minerals: [], note: '【酒精+中药酒】35度露酒；每瓶125ml约250kcal；"补肾壮阳"功效证据不足；本质是酒精+糖+中药提取物；不是保健品，别当养生喝；过量伤肝' },
  { id: 'alcohol-beer', name: '啤酒（普通，每100ml）', cat: 'drink', kcal: 43, protein: 0.5, fat: 0, carb: 3.5, fiber: 0, sodium: 5, vitFat: [], vitWater: ['B族'], minerals: ['硅'], note: '【啤酒肚】一罐500ml≈215kcal；液体面包；长期喝啤酒+下酒菜=热量爆炸；啤酒本身酒精不高，但量大；痛风注意嘌呤高（啤酒嘌呤在酒类里最高）' },
  { id: 'alcohol-wine-red', name: '红酒（干红，每100ml）', cat: 'drink', kcal: 85, protein: 0.1, fat: 0, carb: 2.5, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: ['锰'], phytochem: ['白藜芦醇（极少量）'], note: '【红酒养生骗局】"红酒软化血管"证据极弱，白藜芦醇含量要喝几百瓶才够；一杯150ml≈128kcal；还是酒精，喝多了一样伤肝；别因为"健康"多喝' },
];