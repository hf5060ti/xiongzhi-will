// 雄性意志（Xiongzhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: CONNECTIVE_TISSUE_FOODS
// 结缔组织类食物：脆骨 / 筋膜 / 肌腱 —— 胶原蛋白来源。
//
// 数据来源与可信度（均为公开、可核验的数据库参考值，非本站实测）：
//  [1] 中国疾病预防控制中心营养与健康所《中国食物成分表》食物营养成分查询平台·牛蹄筋
//      https://nlc.chinanutri.cn/fq/foodinfo/831.html
//      （每 100g 可食部：能量 642 kJ、蛋白质 34.1g、脂肪 0.5g、碳水 2.6g、
//        钠 153.6mg、铁 3.2mg、锌 0.81mg、磷 150mg。该站声明数据不得用于商业目的。）
//  [2] USDA FoodData Central（public domain / CC0 1.0）· Chicken feet, fdcId 2706085
//      https://fdc.nal.usda.gov/food-details/2706085/nutrients
//      （每 100g：215 kcal、蛋白质 19.4g、脂肪 14.6g、碳水 0.2g、
//        钠 67mg、钙 88mg、铁 0.91mg。建议引用：U.S. Department of Agriculture,
//        Agricultural Research Service, FoodData Central, https://fdc.nal.usda.gov/。）
//
// 估算条目的不确定性：鸡脆骨 / 牛脆骨 / 筋膜在 [1][2] 中无独立条目，
// 以同组织参考值推算，属预测值，个体差异（品种、部位、含水量、烹调）
// 可达 ±20%；用于饮食记录时请以包装标签或实测为准，必要时做湿实验/成分检测验证。
//
// 营养学依据（用于下方 note 与吸收提示）：
//  [3] 胶原蛋白缺乏色氨酸、亮氨酸/异亮氨酸/缬氨酸偏低，属不完全蛋白
//      （Mass Research Review, 2025, "Connecting The Dots For Connective Tissue
//       Outcomes"；综述 https://massresearchreview.com/2025/09/29/connecting-the-dots-for-connective-tissue-outcomes-an-update-on-the-collagen-supplementation-debates/）。
//  [4] 脯氨酸/赖氨酸羟化需维生素 C 作为辅因子（prolyl / lysyl hydroxylase）；
//      Shaw et al., 2017, Nutrients 9(1):37, "Vitamin C-Enriched Gelatin
//      Supplementation Before Intermittent Activity Augments Collagen Synthesis",
//      https://doi.org/10.3390/nu9010037 。
//  [5] EFSA Journal 2011 未确认胶原水解物与维持关节健康的因果关系；
//      口服胶原经消化为氨基酸/小肽，不定向沉积于肌腱，属全身营养支持而非治疗。
import type { IFood } from './types';

/** 蛋白质类型标记：'collagen' = 以胶原蛋白/明胶为主的不完全蛋白 */
export const CONNECTIVE_TISSUE_FOODS: IFood[] = [
  {
    id: 'chicken-cartilage',
    name: '鸡脆骨（鸡膝软骨，生）',
    cat: 'meat',
    kcal: 165,
    protein: 20,
    fat: 9,
    carb: 0.5,
    fiber: 0,
    sodium: 80,
    vitFat: [],
    vitWater: ['B12'],
    minerals: ['钙', '磷'],
    phytochem: ['胶原蛋白（Ⅱ型为主）'],
    proteinProfile: 'collagen',
    note: '估算参考值（±20%）：以 USDA 鸡爪 [2] 为基准、按软骨含水量更高下调脂肪；非实测。富含Ⅱ型胶原，需久煮软化。',
  },
  {
    id: 'beef-cartilage',
    name: '牛脆骨（牛肋软骨，生）',
    cat: 'meat',
    kcal: 130,
    protein: 22,
    fat: 4.5,
    carb: 0.5,
    fiber: 0,
    sodium: 90,
    vitFat: [],
    vitWater: ['B12'],
    minerals: ['钙', '磷'],
    phytochem: ['胶原蛋白（Ⅱ型为主）'],
    proteinProfile: 'collagen',
    note: '估算参考值（±20%）：以牛蹄筋 [1] 与软骨含水量推算；非实测。钙磷来自软骨基质，久炖后更易咀嚼。',
  },
  {
    id: 'beef-tendon',
    name: '牛蹄筋 / 肌腱（生）',
    cat: 'meat',
    kcal: 151,
    protein: 34.1,
    fat: 0.5,
    carb: 2.6,
    fiber: 0,
    sodium: 154,
    vitFat: [],
    vitWater: ['B1', 'B2', 'B3'],
    minerals: ['铁', '锌', '磷'],
    phytochem: ['胶原蛋白（Ⅰ型为主）'],
    proteinProfile: 'collagen',
    note: '实测数据库值：中国食物成分表·牛蹄筋 [1]（642 kJ≈151 kcal、蛋白 34.1g、脂肪 0.5g）。高蛋白低脂，但蛋白几乎全为胶原，属不完全蛋白。',
  },
  {
    id: 'beef-fascia',
    name: '牛筋膜（生）',
    cat: 'meat',
    kcal: 145,
    protein: 30,
    fat: 2,
    carb: 1,
    fiber: 0,
    sodium: 120,
    vitFat: [],
    vitWater: ['B12'],
    minerals: ['锌'],
    phytochem: ['胶原蛋白（Ⅰ/Ⅲ型）'],
    proteinProfile: 'collagen',
    note: '近似值（±20%）：以牛蹄筋 [1] 同属致密结缔组织推算；非实测。肌外膜/肌束膜以Ⅰ、Ⅲ型胶原为主。',
  },
  {
    id: 'chicken-feet',
    name: '鸡爪（带皮，煮）',
    cat: 'meat',
    kcal: 215,
    protein: 19.4,
    fat: 14.6,
    carb: 0.2,
    fiber: 0,
    sodium: 67,
    vitFat: [],
    vitWater: [],
    minerals: ['钙', '铁'],
    phytochem: ['胶原蛋白（Ⅰ型为主）'],
    proteinProfile: 'collagen',
    note: '实测数据库值：USDA FDC [2] fdcId 2706085（CC0）。皮、筋、软骨混合，脂肪高于纯蹄筋；维 C 含量≈0，务必另配蔬果。',
  },
];
