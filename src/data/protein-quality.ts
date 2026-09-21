// EXPORTS: PROTEIN_QUALITY（植物蛋白有效系数）、PROTEIN_POWDERS（蛋白粉选购对照）
// 来自用户提供的两张表：蛋白质质量系数表 + 蛋白粉选购对照表
// 用于「氨基酸互补法」：植物蛋白系数低，搭配动物蛋白（系数 1）可互补提升有效蛋白摄入。

export interface ProteinQualityRow {
  cat: string;
  examples: string;
  coeff: string; // 有效系数（区间文字）
  note: string;
}

export const PROTEIN_QUALITY: ProteinQualityRow[] = [
  { cat: '动物蛋白', examples: '肉、蛋、乳清', coeff: '1.0', note: '高质量、高消化率，氨基酸完整' },
  { cat: '分离/浓缩大豆蛋白粉', examples: '大豆分离蛋白粉', coeff: '0.9–1.0', note: 'PDCAAS≈1.0' },
  { cat: '普通大豆类制品', examples: '黄豆、黑豆、青豆、豆腐、豆干、无糖豆浆、素鸡', coeff: '0.8–0.9', note: '质量略受工艺影响' },
  { cat: '豆类蛋白粉', examples: '豌豆、鹰嘴豆、扁豆蛋白粉', coeff: '0.8 左右', note: '高蛋白，部分抗营养残留' },
  { cat: '熟杂豆', examples: '红豆、绿豆、芸豆、豌豆、鹰嘴豆、蚕豆', coeff: '0.7–0.8', note: '消化率 70–85%' },
  { cat: '马铃薯蛋白分离物', examples: '土豆蛋白粉', coeff: '0.9 左右', note: '肌蛋白合成≈牛奶蛋白' },
  { cat: '整个土豆', examples: '白土豆、红皮土豆', coeff: '0.8 左右', note: '质量高但总量少' },
  { cat: '全谷物主食', examples: '全麦粉、燕麦、糙米、黑米、大麦、黑麦、玉米、藜麦、荞麦', coeff: '0.5–0.7', note: '赖氨酸限制，中等质量' },
  { cat: '坚果/种子', examples: '杏仁、核桃、腰果、花生、开心果、葵花籽、南瓜籽、芝麻、亚麻籽、奇亚籽、火麻仁', coeff: '0.5–0.7', note: '蛋白中等，脂肪主导' },
];

export interface ProteinPowderRow {
  name: string;
  price: string;
  quality: string;
  score: number; // 10 分制
}

export const PROTEIN_POWDERS: ProteinPowderRow[] = [
  {
    name: '乳清蛋白',
    price: '75–150 元/斤',
    quality: '动物完全蛋白，氨基酸评分高（PDCAAS=1.0），生物利用率高，快速吸收，含丰富 BCAA',
    score: 8.5,
  },
  {
    name: '分离乳清蛋白',
    price: '100–200 元/斤',
    quality: '纯度最高（90%+），乳糖含量极低，生物利用率最高，适合乳糖不耐受人群',
    score: 9.0,
  },
  {
    name: '大豆分离蛋白',
    price: '15–40 元/斤',
    quality: '植物完全蛋白，但生物利用率较低（PDCAAS≈0.9），含抗营养物质，吸收较慢',
    score: 6.5,
  },
  {
    name: '豌豆蛋白',
    price: '30–80 元/斤',
    quality: '植物蛋白，缺乏蛋氨酸，氨基酸不完整，适合素食者，生物利用率中等',
    score: 7.0,
  },
  {
    name: '酵母蛋白',
    price: '40–90 元/斤',
    quality: '微生物蛋白，氨基酸组成较好，含 B 族维生素，吸收中等，可持续性高',
    score: 7.5,
  },
];
