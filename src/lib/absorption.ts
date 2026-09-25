// EXPORTS: getAbsorptionTips, ABSORPTION_GUIDE, TEF_RULE
// 食物营养素吸收率：根据食物营养字段自动推导「怎么吃吸收更好」
// 依据：脂溶性维生素需油脂、水溶性需水/避免过度水煮、血红素铁 vs 非血红素铁、
// 草酸/植酸抑制钙铁、氨基酸互补（植物蛋白配动物蛋白）等通用营养学共识。
import type { IFood } from '@/data/foods';

/** 按食物字段推导吸收提示（每条一句话，卡片直接展示） */
export function getAbsorptionTips(food: IFood): string[] {
  const tips: string[] = [];
  const cat = food.cat;

  // ---- 脂溶性维生素 A/D/E/K：需油脂 ----
  const fatVit = food.vitFat;
  if (fatVit.includes('A')) {
    tips.push('维生素 A 为脂溶性：建议搭配 1~2g 油脂（炒菜油、蛋黄、坚果）一起食用，吸收率显著提升。');
  }
  if (fatVit.includes('D')) {
    tips.push('维生素 D 为脂溶性：随餐吃一点油脂吸收更好；日常主要靠晒太阳合成。');
  }
  if (fatVit.includes('E') || fatVit.includes('K')) {
    tips.push('脂溶性维生素 E/K：与油脂同食更易吸收（凉拌时加一点橄榄油即可）。');
  }

  // ---- 水溶性维生素 B/C ----
  if (food.vitWater.includes('C')) {
    tips.push('维生素 C 为水溶性且怕高温：生食、快炒或焯水时间尽量短，能保留更多。');
  }
  if (food.vitWater.some((v) => v.startsWith('B') || v === '叶酸')) {
    tips.push('B 族维生素（含叶酸）为水溶性：少久煮、菜汤别浪费，搭配正常饮水即可。');
  }

  // ---- 植物化学物 ----
  const phyto = food.phytochem ?? [];
  if (phyto.some((p) => p.includes('花青素'))) {
    tips.push('花青素为水溶性：紫包菜等生食或轻拌保留更多，不必刻意配油。');
  }
  if (phyto.some((p) => p.includes('番茄红素'))) {
    tips.push('番茄红素：加热（炖、炒）并配少量油脂，吸收率比生吃高 2~4 倍。');
  }
  if (phyto.some((p) => p.includes('萝卜硫素'))) {
    tips.push('萝卜硫素：十字花科切碎或焯水后活性更高，西兰花别过度煮烂。');
  }
  if (phyto.some((p) => p.includes('大蒜素'))) {
    tips.push('大蒜素：切碎后静置 10 分钟再烹饪，活性成分保留更好。');
  }
  if (phyto.some((p) => p.includes('姜黄素'))) {
    tips.push('姜黄素：与黑胡椒（胡椒碱）同食吸收率提升约 20 倍，建议加热配油脂。');
  }

  // ---- 矿物质吸收 ----
  const minerals = food.minerals ?? [];
  const isAnimal = cat === 'meat' || cat === 'seafood' || cat === 'dairy';
  if (minerals.includes('铁')) {
    if (isAnimal) {
      tips.push('血红素铁（动物性）：吸收率 15~35%，远高于植物铁，直接高效吸收。');
    } else {
      tips.push('非血红素铁（植物性）：吸收率仅 2~20%，建议搭配维 C（柠檬、青椒）或少量肉类同吃，吸收率翻倍。');
    }
  }
  if (minerals.includes('钙')) {
    if (cat === 'dairy') {
      tips.push('乳钙：吸收率约 30%，是补钙首选；搭配维 D 吸收更好。');
    } else if (food.name.includes('菠菜') || food.name.includes('苋菜') || food.name.includes('竹笋') || food.name.includes('甜菜')) {
      tips.push('草酸会抑制钙吸收：先焯水 30 秒去草酸再烹饪，钙吸收明显提升。');
    } else {
      tips.push('钙：建议搭配维 D 与蛋白质同食吸收更好；避免与浓茶同餐。');
    }
  }
  if (minerals.includes('锌')) {
    tips.push('锌：动物性食物吸收率高；植物性锌受植酸影响，豆类可浸泡/发芽后食用。');
  }

  // ---- 蛋白质 / 氨基酸互补 ----
  if (cat === 'meat' || cat === 'seafood' || cat === 'dairy') {
    tips.push('动物蛋白：必需氨基酸齐全、吸收率高（约 90%+），是增肌主力蛋白。');
  }
  if (cat === 'legume') {
    tips.push('植物蛋白：赖氨酸较充足但含硫氨基酸偏低，搭配鸡蛋/牛奶/谷物（氨基酸互补）可补齐。');
  }
  if (cat === 'staple') {
    tips.push('谷物蛋白：赖氨酸偏低，搭配豆类或蛋奶（氨基酸互补法）利用率更高。');
  }
  if (cat === 'nuts') {
    tips.push('坚果蛋白与脂肪同存：适量食用，蛋白质利用率配合主食更佳。');
  }

  // 去重（同一规则可能重复命中）
  return [...new Set(tips)].slice(0, 4);
}

/** 食物热效应（TEF）：消化吸收消耗的热量占比 */
export const TEF_RULE = {
  fat: '1~5%',
  carb: '5~10%',
  protein: '20~25%',
  default: '10%',
  note: '若不想细算，每餐统一按 10% 计：实际净热量 ≈ 食物热量 × 90%。',
};

export interface AbsGuideItem {
  title: string;
  badge: string;
  body: string;
  tips: string[];
}

/** 营养素吸收率指南（营养页板块数据） */
export const ABSORPTION_GUIDE: AbsGuideItem[] = [
  {
    title: '蛋白质吸收率',
    badge: '最影响增肌',
    body: '蛋白质吸收率看「必需氨基酸是否齐全」：动物蛋白（蛋/奶/肉/鱼）约 90%+，植物蛋白偏低（大豆 65~80%、谷物更低）。',
    tips: [
      '增肌期优先动物蛋白打底，植物蛋白靠「氨基酸互补」补齐（豆+蛋、豆+奶、豆+谷物）。',
      '每餐 20~40g 蛋白质吸收利用率最高，单次暴饮 100g 反而浪费。',
      '消化弱的人分 4~5 餐，比 2 餐猛吃吸收更好。',
    ],
  },
  {
    title: '铁的吸收',
    badge: '贫血高发',
    body: '血红素铁（肉/血/肝）吸收率 15~35%；非血红素铁（植物）仅 2~20%，受植酸、茶多酚、草酸抑制。',
    tips: [
      '植物铁搭配维 C（柠檬汁、青椒、番茄）或少量瘦肉，吸收率可翻倍。',
      '餐后 1 小时内少喝浓茶、咖啡，鞣酸会锁住铁。',
      '猪血、鸭血是性价比最高的血红素铁来源。',
    ],
  },
  {
    title: '钙的吸收',
    badge: '骨骼与神经',
    body: '乳钙吸收率约 30% 且量大；菠菜/苋菜等草酸高的菜，钙被草酸锁住吸收率大跌。',
    tips: [
      '绿叶菜先焯水去草酸再炒，钙和铁的可用性同时提升。',
      '钙与维 D 同补（晒太阳或补剂），吸收效率更高。',
      '豆浆钙含量远低于牛奶，别用豆浆完全替代补钙。',
    ],
  },
  {
    title: '脂溶性维生素 A/D/E/K',
    badge: '记得配油',
    body: '这类维生素必须溶于油脂才能被吸收，干啃胡萝卜、水煮菜里的维 A 吸收率很低。',
    tips: [
      '做菜加 1~2g 油（约一小勺），吸收率立竿见影。',
      '胡萝卜、番茄等「炒着吃」比「生吃/煮着吃」营养利用率更高。',
      '维生素 D 主要靠晒太阳，食物补充为辅。',
    ],
  },
  {
    title: '水溶性维生素 B/C 与花青素',
    badge: '怕高温久煮',
    body: 'B 族与维 C 溶于水且怕热，长时间炖煮会大量流失进汤里；花青素（紫包菜、紫薯）也易溶于水。',
    tips: [
      '能快炒/焯水就不久煮，蔬菜别煮到发黄。',
      '汤也是营养，菜汤别倒（痛风/高尿酸者少喝浓肉汤）。',
      '花青素类生食或轻拌保留最多，配一点水即可。',
    ],
  },
  {
    title: '食物热效应（TEF）',
    badge: '吃也耗能',
    body: '消化食物本身会消耗热量：脂肪 1~5%、碳水 5~10%、蛋白质 20~25%。蛋白质最"耗能"。',
    tips: [
      '不想细算就统一按 10%：实际净热量 ≈ 食物热量 × 90%。',
      '高蛋白饮食自带"热效应红利"，是减脂期多保留蛋白质的额外理由。',
      '本站在摄入记录里即按此原则提示净热量。',
    ],
  },
];
