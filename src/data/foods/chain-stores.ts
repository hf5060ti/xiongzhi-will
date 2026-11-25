// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: CHAIN_STORE_FOODS
// 连锁餐饮扩充库（用户点名：蜜雪冰城 / 沪上阿姨 / 正新鸡排 / 肯德基 / 华莱士）
//
// ⚠ 口径：与全库一致，kcal / 蛋白 / 脂肪 / 碳水 / 纤维 / 钠 均为「每 100g 可食部」或「每 100ml」参考值；
//   整份热量请用 servings.ts 的份量锚点折算（如「中杯 500ml ≈ 每100ml 热量 × 5」）。
// ⚠ 来源：品牌大多未公开完整官方营养表，以下为公开测评/成分查询平台的估算值，非官方数据：
//   - 蜜雪冰城：xiaolin.fun/drinkzen/mixue、menusmixue.com、百度健康测评（每杯热量÷杯量换算）
//   - 沪上阿姨：百度健康全系列测评、nckfhsm.com 单品页（每杯热量÷杯量换算）
//   - 正新鸡排：百度健康测评、苹果绿养生网（每份热量÷可食部克数换算）
//   - 肯德基：中国疾病预防控制中心营养与健康所食物成分查询平台 nlc.chinanutri.cn（每100g）、
//     百度百科「肯德基香辣鸡翅」（每100g）、TOPick 转载 KFC 官方营养标签（每100g）、howtoeat.cn（薯条每100g）
//   - 华莱士：百度健康测评、公开测评汇总（每份热量÷可食部克数换算）
// ⚠ 不确定性：不同门店配方、杯型、糖度、加料差异大，误差通常 ±20~30%；
//   实际以门店/包装营养标签或实测为准。本站仅作健身记录参考，数值为估算而非实测。
//   新增条目均使用独立 id 前缀，不与既有食物条目冲突；英文名未匹配时回退中文。
import type { IFood } from './types';

export const CHAIN_STORE_FOODS: IFood[] = [
  // ================= 蜜雪冰城（饮品按每 100ml，甜品按每 100g） =================
  { id: 'mx-fresh-lemon-water', name: '冰鲜柠檬水（蜜雪冰城，每100ml）', cat: 'drink', kcal: 22, protein: 0.1, fat: 0, carb: 5.5, fiber: 0.1, sodium: 3, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '公开测评：中杯约 80-124kcal/500ml；按每100ml估算。糖度影响极大，选无糖/少糖更低；低卡首选' },
  { id: 'mx-bubble-milk-tea', name: '珍珠奶茶（蜜雪冰城，每100ml）', cat: 'drink', kcal: 68, protein: 1, fat: 2.5, carb: 10, fiber: 0.2, sodium: 25, vitFat: [], vitWater: [], minerals: ['钙'], note: '公开测评：中杯约 340kcal/500ml；含植脂末与珍珠。珍珠为木薯淀粉，少糖/去珍珠可显著降卡' },
  { id: 'mx-brown-sugar-boba', name: '黑糖珍珠奶茶（蜜雪冰城，每100ml）', cat: 'drink', kcal: 83, protein: 1, fat: 2.6, carb: 14, fiber: 0.2, sodium: 30, vitFat: [], vitWater: [], minerals: ['钙'], note: '公开测评：中杯约 413-480kcal/500ml；黑糖糖浆+珍珠，为蜜雪奶茶线最高卡之一' },
  { id: 'mx-red-bean-milk-tea', name: '红豆奶茶（蜜雪冰城，每100ml）', cat: 'drink', kcal: 68, protein: 1.5, fat: 2.2, carb: 11, fiber: 0.3, sodium: 25, vitFat: [], vitWater: [], minerals: ['钾'], note: '公开测评：中杯约 339kcal/500ml；红豆提供少量纤维但糖分不低' },
  { id: 'mx-jasmine-milk-green', name: '茉莉奶绿（蜜雪冰城，每100ml）', cat: 'drink', kcal: 37, protein: 0.8, fat: 1.2, carb: 6, fiber: 0, sodium: 20, vitFat: [], vitWater: [], minerals: [], note: '公开测评：中杯约 183kcal/500ml；比珍珠奶茶低卡，奶茶群里较清爽的选择' },
  { id: 'mx-cheese-green-tea', name: '芝士奶盖绿茶（蜜雪冰城，每100ml）', cat: 'drink', kcal: 58, protein: 1.2, fat: 3, carb: 6.5, fiber: 0, sodium: 45, vitFat: [], vitWater: [], minerals: ['钠'], note: '公开测评：中杯约 290kcal/500ml；奶盖脂肪与钠偏高，喝前搅拌会混入茶底' },
  { id: 'mx-mango-pomelo', name: '杨枝甘露（蜜雪冰城，每100ml）', cat: 'drink', kcal: 78, protein: 0.8, fat: 2.5, carb: 13, fiber: 0.3, sodium: 20, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '公开测评：中杯约 355-420kcal/500ml；芒果+椰奶+西米，糖脂双高，属甜品级饮品' },
  { id: 'mx-passionfruit-tea', name: '满杯百果香（蜜雪冰城，每100ml）', cat: 'drink', kcal: 43, protein: 0.2, fat: 0, carb: 11, fiber: 0.3, sodium: 5, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '公开测评：中杯约 214kcal/500ml；果茶中热量偏低，维C来自百香果/柠檬' },
  { id: 'mx-fresh-orange', name: '棒打鲜橙（蜜雪冰城，每100ml）', cat: 'drink', kcal: 36, protein: 0.2, fat: 0, carb: 9, fiber: 0.2, sodium: 4, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '公开测评：中杯约 90-178kcal/500ml；鲜橙果茶，糖度可选，低卡档位友好' },
  { id: 'mx-peach-four-seasons', name: '蜜桃四季春（蜜雪冰城，每100ml）', cat: 'drink', kcal: 43, protein: 0.1, fat: 0, carb: 11, fiber: 0.1, sodium: 5, vitFat: [], vitWater: [], minerals: [], note: '公开测评：中杯约 180-214kcal/500ml；果茶类，选少糖可降约三成' },
  { id: 'mx-lemon-black-tea', name: '柠檬红茶（蜜雪冰城，每100ml）', cat: 'drink', kcal: 39, protein: 0.1, fat: 0, carb: 10, fiber: 0.1, sodium: 5, vitFat: [], vitWater: [], minerals: [], note: '公开测评：中杯约 194kcal/500ml；柠檬+红茶+糖，无糖版本显著更低' },
  { id: 'mx-americano', name: '美式咖啡（蜜雪冰城，每100ml）', cat: 'drink', kcal: 3, protein: 0.2, fat: 0, carb: 0.5, fiber: 0, sodium: 2, vitFat: [], vitWater: [], minerals: ['钾'], note: '公开测评：约 5-16kcal/杯；近乎零卡，咖啡因提神，减脂期优选' },
  { id: 'mx-snow-top-coffee', name: '雪顶咖啡（蜜雪冰城，每100ml）', cat: 'drink', kcal: 75, protein: 1.2, fat: 3.5, carb: 9, fiber: 0, sodium: 35, vitFat: [], vitWater: [], minerals: [], note: '公开测评：中杯约 375-398kcal/杯；咖啡+冰淇淋雪顶，糖脂叠加' },
  { id: 'mx-strawberry-shake', name: '草莓摇摇奶昔（蜜雪冰城，每100ml）', cat: 'drink', kcal: 58, protein: 1.5, fat: 2, carb: 9, fiber: 0.1, sodium: 30, vitFat: [], vitWater: [], minerals: ['钙'], note: '公开测评：中杯约 290-390kcal/杯；奶昔糖脂双高，偶尔解馋' },
  { id: 'mx-mega-cone', name: '摩天脆脆冰淇淋（蜜雪冰城，每100g）', cat: 'snack', kcal: 390, protein: 4, fat: 14, carb: 60, fiber: 0, sodium: 80, vitFat: ['A'], vitWater: [], minerals: ['钙'], note: '公开测评：约 195-200kcal/支（约50g）；甜筒+冰淇淋，纯糖油点心' },
  { id: 'mx-oreo-sundae', name: '奥利奥圣代（蜜雪冰城，每100g）', cat: 'snack', kcal: 208, protein: 4, fat: 8, carb: 32, fiber: 0.3, sodium: 70, vitFat: ['A'], vitWater: [], minerals: ['钙'], note: '公开测评：约 370-415kcal/杯（约200g）；饼干碎+冰淇淋，热量炸弹' },
  { id: 'mx-brown-sugar-sundae', name: '黑糖珍珠大圣代（蜜雪冰城，每100g）', cat: 'snack', kcal: 210, protein: 3.5, fat: 8, carb: 33, fiber: 0.2, sodium: 75, vitFat: ['A'], vitWater: [], minerals: ['钙'], note: '公开测评：约 380-420kcal/杯（约200g）；黑糖浆+珍珠+冰淇淋' },

  // ================= 沪上阿姨（饮品按每 100ml，大杯口径约 660ml） =================
  { id: 'hs-blood-rice-milk-tea', name: '血糯米奶茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 48, protein: 1, fat: 1.5, carb: 8, fiber: 0.2, sodium: 25, vitFat: [], vitWater: [], minerals: ['铁', '钾'], note: '公开测评：中杯约 240kcal、大杯全糖约 554kcal；血糯米提供碳水与少量矿物质，甜度影响大' },
  { id: 'hs-mango-pomelo-classic', name: '杨枝甘露经典版（沪上阿姨，每100ml）', cat: 'drink', kcal: 71, protein: 0.8, fat: 2.5, carb: 12, fiber: 0.3, sodium: 20, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '公开测评：大杯全糖约 466kcal/660ml；芒果+椰奶+西米，甜品级饮品' },
  { id: 'hs-mango-pomelo-light', name: '杨枝甘露清爽版（沪上阿姨，每100ml）', cat: 'drink', kcal: 68, protein: 0.8, fat: 2.2, carb: 11.5, fiber: 0.3, sodium: 20, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '公开测评：大杯全糖约 447kcal/660ml；比经典版略低，仍是高糖饮品' },
  { id: 'hs-taro-boba-milk-tea', name: '厚芋泥啵啵奶茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 93, protein: 1.5, fat: 3.5, carb: 15, fiber: 0.4, sodium: 35, vitFat: [], vitWater: [], minerals: ['钾'], note: '公开测评：大杯全糖约 613kcal/660ml；芋泥+啵啵，为全系列最高卡之一' },
  { id: 'hs-strawberry-daifuku', name: '超嗲草莓大福（沪上阿姨，每100ml）', cat: 'drink', kcal: 78, protein: 1.2, fat: 2.5, carb: 13, fiber: 0.2, sodium: 30, vitFat: [], vitWater: ['C'], minerals: [], note: '公开测评：大杯全糖约 514kcal/660ml；麻薯+草莓，糖油双高' },
  { id: 'hs-taro-ball-milk-tea', name: '芋圆奶茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 75, protein: 1.2, fat: 2.5, carb: 12, fiber: 0.2, sodium: 30, vitFat: [], vitWater: [], minerals: [], note: '公开测评：大杯全糖约 496kcal/660ml；芋圆为淀粉制品，碳水为主' },
  { id: 'hs-red-bean-milk-tea', name: '红豆奶茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 79, protein: 1.5, fat: 2.2, carb: 13, fiber: 0.3, sodium: 28, vitFat: [], vitWater: [], minerals: ['钾'], note: '公开测评：大杯全糖约 522kcal/660ml；红豆含少量纤维但糖分不低' },
  { id: 'hs-coconut-jelly-milk-tea', name: '椰果奶茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 62, protein: 0.8, fat: 2, carb: 10, fiber: 0.1, sodium: 25, vitFat: [], vitWater: [], minerals: [], note: '公开测评：不同渠道 412-612kcal/杯差异大；椰果主要是糖水浸渍纤维，取中位估算' },
  { id: 'hs-light-milk-tea', name: '清爽奶茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 40, protein: 0.8, fat: 1.2, carb: 7, fiber: 0, sodium: 20, vitFat: [], vitWater: [], minerals: [], note: '公开测评：约 198kcal/中杯；无加料奶茶，同品牌里较低卡' },
  { id: 'hs-oreo-milk-tea', name: '奥利奥奶茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 104, protein: 1.5, fat: 4.5, carb: 15, fiber: 0.2, sodium: 45, vitFat: [], vitWater: [], minerals: [], note: '公开测评：大杯全糖约 687kcal/660ml；饼干碎+奶茶，全系列最高卡' },
  { id: 'hs-coconut-herb-jelly', name: '生椰烧仙草（沪上阿姨，每100ml）', cat: 'drink', kcal: 62, protein: 1, fat: 2, carb: 10, fiber: 0.3, sodium: 30, vitFat: [], vitWater: [], minerals: [], note: '公开测评：约 408kcal/大杯；椰奶+仙草，仙草本身低卡，热量来自糖与椰奶' },
  { id: 'hs-passionfruit-tea', name: '满杯百香果（沪上阿姨，每100ml）', cat: 'drink', kcal: 63, protein: 0.3, fat: 0, carb: 16, fiber: 0.3, sodium: 8, vitFat: [], vitWater: ['C'], minerals: ['钾'], note: '公开测评：约 313kcal/大杯；果茶糖分不低，少糖更优' },
  { id: 'hs-green-grape-lemon', name: '仙仙青提柠檬（沪上阿姨，每100ml）', cat: 'drink', kcal: 21, protein: 0.1, fat: 0, carb: 5.5, fiber: 0.1, sodium: 5, vitFat: [], vitWater: ['C'], minerals: [], note: '公开测评：约 105kcal/大杯；果茶里低卡档，适合减脂期解馋' },
  { id: 'hs-duck-light-tea', name: '鸭香轻乳茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 45, protein: 1.2, fat: 1.5, carb: 7, fiber: 0, sodium: 25, vitFat: [], vitWater: [], minerals: [], note: '公开测评：约 225kcal/大杯；轻乳茶线比传统奶茶低脂' },
  { id: 'hs-jasmine-light-tea', name: '茉莉轻乳茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 43, protein: 1.2, fat: 1.4, carb: 6.5, fiber: 0, sodium: 25, vitFat: [], vitWater: [], minerals: [], note: '公开测评：约 215kcal/大杯；轻乳茶，茶香为主' },
  { id: 'hs-mango-yogurt', name: '芒果多肉酸奶（沪上阿姨，每100ml）', cat: 'drink', kcal: 68, protein: 2, fat: 2, carb: 10, fiber: 0.2, sodium: 30, vitFat: ['A'], vitWater: ['C'], minerals: ['钙'], note: '公开测评：约 340kcal/大杯；酸奶+芒果+糖，蛋白略高于果茶' },
  { id: 'hs-strawberry-yogurt', name: '草莓冻冻酸奶（沪上阿姨，每100ml）', cat: 'drink', kcal: 62, protein: 2, fat: 1.8, carb: 9, fiber: 0.2, sodium: 30, vitFat: [], vitWater: ['C'], minerals: ['钙'], note: '公开测评：约 312kcal/大杯；含糖酸奶，不等于无糖希腊酸奶' },
  { id: 'hs-jasmine-green-tea', name: '毛峰茉莉绿茶（沪上阿姨，每100ml）', cat: 'drink', kcal: 23, protein: 0.1, fat: 0, carb: 5.5, fiber: 0, sodium: 5, vitFat: [], vitWater: [], minerals: [], note: '公开测评：约 113kcal/大杯；纯茶含糖取决于糖度，选无糖近乎零卡' },
  { id: 'hs-pineapple-tea', name: '刺梨金菠萝（沪上阿姨，每100ml）', cat: 'drink', kcal: 18, protein: 0.1, fat: 0, carb: 4.5, fiber: 0.2, sodium: 5, vitFat: [], vitWater: ['C'], minerals: [], note: '公开测评：约 89kcal/大杯；刺梨维C含量高，但饮品维C受加工与存放影响' },
  { id: 'hs-milk-tea-trio', name: '奶茶三兄弟（沪上阿姨，每100ml）', cat: 'drink', kcal: 86, protein: 1.5, fat: 3.5, carb: 13, fiber: 0.2, sodium: 40, vitFat: [], vitWater: [], minerals: [], note: '公开测评：大杯全糖约 569kcal/660ml；多种加料叠加，糖脂双高' },

  // ================= 正新鸡排（按每 100g 可食部） =================
  { id: 'zx-original-cutlet', name: '原味鸡排（正新鸡排，每100g）', cat: 'cooked', kcal: 330, protein: 22, fat: 20, carb: 14, fiber: 0.5, sodium: 700, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['磷', '钾'], note: '公开测评：一块约 450-550kcal/150g 可食部；裹粉油炸，去外皮可减约 80-120kcal' },
  { id: 'zx-cheese-burst-cutlet', name: '爆浆鸡排（正新鸡排，每100g）', cat: 'cooked', kcal: 360, protein: 21, fat: 23, carb: 16, fiber: 0.5, sodium: 750, vitFat: [], vitWater: ['B3'], minerals: ['钙', '磷'], note: '公开测评：约 540kcal/份；内含芝士，脂肪更高' },
  { id: 'zx-golden-shred-cutlet', name: '金丝鸡排（正新鸡排，每100g）', cat: 'cooked', kcal: 379, protein: 20, fat: 25, carb: 18, fiber: 0.5, sodium: 800, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '公开测评：约 568kcal/份；表层裹粉更厚，吸油更多' },
  { id: 'zx-chicken-wing-root', name: '金锤鸡翅根（正新鸡排，每100g）', cat: 'cooked', kcal: 280, protein: 22, fat: 18, carb: 7, fiber: 0, sodium: 650, vitFat: [], vitWater: ['B3'], minerals: ['锌'], note: '公开测评：约 140kcal/个；带骨，可食部约50g' },
  { id: 'zx-crispy-chicken-leg', name: '脆皮炸鸡腿（正新鸡排，每100g）', cat: 'cooked', kcal: 220, protein: 24, fat: 13, carb: 7, fiber: 0, sodium: 620, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['锌'], note: '公开测评：约 195kcal/个；去皮后脂肪明显下降' },
  { id: 'zx-crispy-nuggets', name: '脆皮鸡块（正新鸡排，每100g）', cat: 'cooked', kcal: 203, protein: 20, fat: 11, carb: 12, fiber: 0.3, sodium: 600, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '公开测评：约 305kcal/份；小块裹粉油炸，蘸酱另计' },
  { id: 'zx-chicken-skewer', name: '正新鸡肉串（每100g）', cat: 'cooked', kcal: 238, protein: 20, fat: 14, carb: 8, fiber: 0.2, sodium: 720, vitFat: [], vitWater: ['B3'], minerals: ['锌'], note: '公开测评：约 143kcal/串；钠偏高，注意调味料' },
  { id: 'zx-sausage', name: '正新石锅肠（每100g）', cat: 'cooked', kcal: 225, protein: 12, fat: 16, carb: 8, fiber: 0, sodium: 850, vitFat: [], vitWater: ['B1', 'B12'], minerals: ['钠'], note: '公开测评：约 180kcal/根；加工肉制品，钠与饱和脂肪偏高' },
  { id: 'zx-sweet-potato-fries', name: '甘梅地瓜条（正新鸡排，每100g）', cat: 'cooked', kcal: 151, protein: 2, fat: 6, carb: 24, fiber: 2, sodium: 280, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '公开测评：约 226kcal/份；地瓜本身有纤维与维A，但油炸后热量仍高' },
  { id: 'zx-pepper-nuggets', name: '黑椒鸡块（正新鸡排，每100g）', cat: 'cooked', kcal: 163, protein: 16, fat: 8, carb: 13, fiber: 0.3, sodium: 600, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '公开测评：约 244kcal/份；黑椒调味钠较高' },
  { id: 'zx-fried-rice-cake', name: '炸烤年糕（正新鸡排，每100g）', cat: 'cooked', kcal: 177, protein: 4, fat: 7, carb: 26, fiber: 0.5, sodium: 400, vitFat: [], vitWater: [], minerals: [], note: '公开测评：约 266kcal/份；糯米制品，碳水为主' },
  { id: 'zx-cheese-stick', name: '拉丝芝士棒（正新鸡排，每100g）', cat: 'cooked', kcal: 260, protein: 10, fat: 14, carb: 24, fiber: 0.5, sodium: 700, vitFat: ['A'], vitWater: [], minerals: ['钙'], note: '公开测评：约 312kcal/份；裹粉油炸芝士，热量密度高' },
  { id: 'zx-popcorn-chicken', name: '劲爆鸡米花（正新鸡排，每100g）', cat: 'cooked', kcal: 237, protein: 19, fat: 13, carb: 13, fiber: 0.3, sodium: 680, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '公开测评：约 355kcal/份；与肯德基鸡米花接近' },
  { id: 'zx-french-fries', name: '薯条（正新鸡排，每100g）', cat: 'cooked', kcal: 253, protein: 3.5, fat: 13, carb: 33, fiber: 2, sodium: 350, vitFat: [], vitWater: [], minerals: ['钾'], note: '公开测评：约 380kcal/份；油炸碳水，蘸酱另计' },
  { id: 'zx-chicken-strips', name: '香酥鸡柳（正新鸡排，每100g）', cat: 'cooked', kcal: 260, protein: 21, fat: 15, carb: 12, fiber: 0.3, sodium: 700, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '公开测评：约 390kcal/份；鸡胸肉条裹粉油炸' },

  // ================= 肯德基（补充每100g 口径，与既有「整份」条目区分） =================
  { id: 'kfc-orleans-wing-100g', name: '新奥尔良烤翅（肯德基，每100g）', cat: 'cooked', kcal: 239, protein: 22.1, fat: 13.8, carb: 6.8, fiber: 0, sodium: 1263, vitFat: ['A'], vitWater: ['B3'], minerals: ['磷', '钾', '锌'], note: '中国食物成分表实测：1002kJ≈239kcal/100g（食部70%）；钠极高（烤翅腌料），非油炸但别多食' },
  { id: 'kfc-spicy-wing-100g', name: '香辣鸡翅（肯德基，每100g）', cat: 'cooked', kcal: 320, protein: 19.2, fat: 23, carb: 9.3, fiber: 0, sodium: 900, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '公开资料：约 320kcal/100g（裹粉油炸）；去外皮可减脂，钠偏高' },
  { id: 'kfc-crispy-white-100g', name: '香辣脆鸡白肉（肯德基，每100g）', cat: 'cooked', kcal: 272, protein: 22.6, fat: 15.6, carb: 10.4, fiber: 0, sodium: 665, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: 'KFC 官方营养标签经 TOPick 转载：272kcal/100g；白肉部位蛋白较高' },
  { id: 'kfc-fries-100g', name: '薯条（肯德基，每100g）', cat: 'cooked', kcal: 308, protein: 4.3, fat: 15.5, carb: 40.5, fiber: 2.5, sodium: 58, vitFat: [], vitWater: [], minerals: ['钾'], note: 'howtoeat 引食物成分数据：约 308kcal/100g；中份约 110g≈340kcal' },
  { id: 'kfc-original-100g', name: '吮指原味鸡（肯德基，每100g）', cat: 'cooked', kcal: 280, protein: 25, fat: 18, carb: 9, fiber: 0, sodium: 750, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['磷', '锌'], note: '按公开测评：一块带皮约 364kcal/130g 折算；带皮脂肪高，去皮后明显降低' },
  { id: 'kfc-zinger-100g', name: '香辣鸡腿堡（肯德基，每100g）', cat: 'cooked', kcal: 270, protein: 17, fat: 14, carb: 28, fiber: 1.2, sodium: 650, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '按整堡约 513kcal/190g 折算；与既有「整份」条目 kfc-zinger 口径不同，勿重复记录' },
  { id: 'kfc-orleans-burger-100g', name: '新奥尔良烤鸡腿堡（肯德基，每100g）', cat: 'cooked', kcal: 230, protein: 17, fat: 10, carb: 27, fiber: 1.2, sodium: 700, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '按整堡约 440kcal/190g 折算；非油炸烤鸡排，酱汁含糖' },
  { id: 'kfc-tart-100g', name: '葡式蛋挞（肯德基，每100g）', cat: 'cooked', kcal: 370, protein: 6, fat: 22, carb: 40, fiber: 0.3, sodium: 220, vitFat: ['A'], vitWater: ['B2'], minerals: ['钙'], note: '按每个约 196kcal/53g 折算；酥皮+蛋奶馅，糖油混合物' },
  { id: 'kfc-nuggets-100g', name: '鸡米花（肯德基，每100g）', cat: 'cooked', kcal: 280, protein: 18, fat: 17, carb: 16, fiber: 0.3, sodium: 700, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '按中份约 355kcal/125g 折算；炸鸡块，蘸酱另计' },
  { id: 'kfc-wrap-100g', name: '老北京鸡肉卷（肯德基，每100g）', cat: 'cooked', kcal: 230, protein: 13, fat: 9, carb: 29, fiber: 1, sodium: 620, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '按整卷约 415kcal/180g 折算；甜面酱+黄瓜+京葱' },
  { id: 'kfc-corn-cup', name: '玉米杯（肯德基，每100g）', cat: 'cooked', kcal: 70, protein: 2.5, fat: 0.5, carb: 15, fiber: 2, sodium: 15, vitFat: ['A'], vitWater: ['B1'], minerals: ['镁'], note: '公开估算：甜玉米粒水煮，低脂高纤；快餐里少见的清爽配菜' },
  { id: 'kfc-sundae-100g', name: '圣代（肯德基，每100g）', cat: 'snack', kcal: 180, protein: 3.5, fat: 7, carb: 26, fiber: 0.2, sodium: 60, vitFat: ['A'], vitWater: [], minerals: ['钙'], note: '公开估算：冰淇淋+糖浆，糖脂双高；具体随口味与糖浆量浮动' },
  { id: 'kfc-family-bucket-100g', name: '全家桶（肯德基，每100g可食部）', cat: 'cooked', kcal: 292, protein: 14, fat: 16.3, carb: 31, fiber: 1, sodium: 700, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '搜狗百科：全家桶约 292kcal/100g（蛋白7.9g 脂肪16.3g 碳水31g为桶均）；整桶重量差异大，仅作粗略参考' },

  // ================= 华莱士（按每 100g 可食部） =================
  { id: 'wl-spicy-chicken-burger', name: '香辣鸡腿堡（华莱士，每100g）', cat: 'cooked', kcal: 260, protein: 16, fat: 13, carb: 27, fiber: 1, sodium: 700, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '公开测评：约 416-550kcal/个（约180g），区间差异大；按中位折算' },
  { id: 'wl-chicken-wrap', name: '辣味鸡肉卷（华莱士，每100g）', cat: 'cooked', kcal: 236, protein: 15, fat: 11, carb: 25, fiber: 1, sodium: 720, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '公开测评：约 354kcal/个（约150g）；面饼+炸鸡肉+酱料' },
  { id: 'wl-shrimp-burger', name: '劲脆鲜虾堡（华莱士，每100g）', cat: 'cooked', kcal: 205, protein: 14, fat: 9, carb: 25, fiber: 1, sodium: 680, vitFat: [], vitWater: [], minerals: ['钙'], note: '公开测评：约 369kcal/个（约180g）；虾排裹粉油炸，比炸鸡堡略低卡' },
  { id: 'wl-beef-burger', name: '牛气冲天堡（华莱士，每100g）', cat: 'cooked', kcal: 177, protein: 14, fat: 8, carb: 19, fiber: 1, sodium: 650, vitFat: [], vitWater: ['B12', 'B3'], minerals: ['铁', '锌'], note: '公开测评：约 318kcal/个（约180g）；牛肉饼蛋白较高' },
  { id: 'wl-veggie-burger', name: '田园香蔬堡（华莱士，每100g）', cat: 'cooked', kcal: 169, protein: 8, fat: 8, carb: 21, fiber: 1.5, sodium: 550, vitFat: ['A'], vitWater: ['C'], minerals: ['钾'], note: '公开测评：约 305kcal/个（约180g）；蔬菜+面饼+酱，蛋白偏低' },
  { id: 'wl-cutlet-burger', name: '香辣鸡排堡（华莱士，每100g）', cat: 'cooked', kcal: 226, protein: 16, fat: 11, carb: 24, fiber: 1, sodium: 700, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '公开测评：约 407kcal/个（约180g）；鸡胸肉排裹粉炸' },
  { id: 'wl-grilled-burger', name: '秘制板烧堡（华莱士，每100g）', cat: 'cooked', kcal: 216, protein: 16, fat: 10, carb: 23, fiber: 1, sodium: 680, vitFat: [], vitWater: ['B3'], minerals: ['钾'], note: '公开测评：约 389kcal/个（约180g）；非油炸板烧鸡腿排' },
  { id: 'wl-chicken-cutlet', name: '元气鸡排（华莱士，每100g）', cat: 'cooked', kcal: 264, protein: 22, fat: 16, carb: 12, fiber: 0.4, sodium: 750, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '公开测评：约 264kcal/份（约100g）；单吃鸡排蛋白不低但钠高' },
  { id: 'wl-honey-wing', name: '蜜汁烤翅（华莱士，每100g）', cat: 'cooked', kcal: 326, protein: 24, fat: 22, carb: 6, fiber: 0, sodium: 700, vitFat: [], vitWater: ['B3'], minerals: ['锌'], note: '公开测评：约 261kcal/份（约80g）；蜜汁含糖，带皮脂肪高' },
  { id: 'wl-cartilage-skewer', name: '华香脆骨串（每100g）', cat: 'cooked', kcal: 265, protein: 18, fat: 19, carb: 8, fiber: 0, sodium: 800, vitFat: [], vitWater: [], minerals: ['磷'], note: '公开测评：约 53kcal/串（约20g）；脆骨为胶原为主的不完全蛋白，需搭配完全蛋白' },
  { id: 'wl-crispy-leg', name: '香酥鸡腿（华莱士，每100g）', cat: 'cooked', kcal: 248, protein: 24, fat: 15, carb: 7, fiber: 0, sodium: 680, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['锌'], note: '公开测评：约 248kcal/个（约100g）；去皮可减脂' },
  { id: 'wl-french-fries', name: '薯条（华莱士，每100g）', cat: 'cooked', kcal: 215, protein: 3, fat: 10, carb: 28, fiber: 2, sodium: 320, vitFat: [], vitWater: [], minerals: ['钾'], note: '公开测评：约 215kcal/小份（约100g）；油炸碳水' },
  { id: 'wl-whole-chicken', name: '脆皮全鸡（华莱士，每100g可食部）', cat: 'cooked', kcal: 190, protein: 26, fat: 9, carb: 3, fiber: 0, sodium: 700, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['锌', '磷'], note: '公开测评：整鸡约 1140kcal（带骨约1000g，可食部约600g）；带皮脂肪高，去皮后更低' },
  { id: 'wl-hand-pulled-chicken', name: '蜜汁手扒鸡（华莱士，每100g去皮去骨）', cat: 'cooked', kcal: 145, protein: 28, fat: 3, carb: 2, fiber: 0, sodium: 600, vitFat: [], vitWater: ['B3', 'B6'], minerals: ['锌'], note: '公开测评：去皮去骨约 435kcal/300g；高蛋白低脂，是华莱士里相对友好的选择' },
  { id: 'wl-corn-cup', name: '玉米杯（华莱士，每100g）', cat: 'cooked', kcal: 58, protein: 2, fat: 0.5, carb: 13, fiber: 2, sodium: 12, vitFat: ['A'], vitWater: ['B1'], minerals: ['镁'], note: '公开测评：约 58kcal/杯（约100g）；低脂高纤配菜' },
  { id: 'wl-chicken-strips', name: '炸雪花鸡柳（华莱士，每100g）', cat: 'cooked', kcal: 162, protein: 17, fat: 7, carb: 14, fiber: 0.4, sodium: 600, vitFat: [], vitWater: ['B3'], minerals: ['磷'], note: '公开测评：约 162kcal/份（约100g）；鸡胸肉条轻裹粉油炸' },
  { id: 'wl-chicken-wing-tips', name: '椒傲江湖脆翅尖（华莱士，每100g）', cat: 'cooked', kcal: 275, protein: 20, fat: 19, carb: 5, fiber: 0, sodium: 780, vitFat: [], vitWater: ['B3'], minerals: ['锌'], note: '公开测评：约 220kcal/份（约80g）；翅尖肉少骨多，调味料钠高' },
  { id: 'wl-fried-mushroom', name: '爆汁杏鲍菇（华莱士，每100g）', cat: 'cooked', kcal: 133, protein: 5, fat: 8, carb: 13, fiber: 2, sodium: 550, vitFat: [], vitWater: ['B1'], minerals: ['钾'], note: '公开测评：约 200kcal/份（约150g）；杏鲍菇本身低卡，油炸吸油后升高' },
];
