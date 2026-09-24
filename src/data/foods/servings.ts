// EXPORTS: FoodServing, SERVING_ANCHORS, getServings, fmtServing
// 常见份量锚点：把「1 个鸡蛋 / 1 碗米饭 / 1 汤匙油」这类生活化份量折算为克数
// 数据来源：常见食物成分表中常食份量（可食部）参考值，误差 ±10% 左右；克数均为可食部净重
import type { IFood } from './types';

export interface FoodServing {
  /** 生活化份量名称，如「1 碗」「1 个（中）」 */
  label: string;
  /** 折算后的可食部克数 */
  grams: number;
}

/** 按「家常份量」折算：碗 / 个 / 片 / 汤匙 等，一律换算成克数再算营养 */
export const SERVING_ANCHORS: Record<string, FoodServing[]> = {
  // ---- 蛋奶 ----
  egg: [{ label: '1 个（中）', grams: 50 }, { label: '1 个（大）', grams: 60 }],
  'egg-white': [{ label: '1 个蛋的蛋清', grams: 33 }],
  'egg-yolk': [{ label: '1 个蛋的蛋黄', grams: 17 }],
  'quail-egg': [{ label: '1 个', grams: 10 }],
  'duck-egg': [{ label: '1 个', grams: 70 }],
  'egg-boiled': [{ label: '1 个', grams: 50 }],
  'egg-fried': [{ label: '1 个蛋的量', grams: 50 }],
  'egg-scrambled': [{ label: '1 个蛋的量', grams: 50 }],
  'egg-salted': [{ label: '1 个', grams: 65 }],
  'milk-whole': [{ label: '1 盒（250ml）', grams: 250 }, { label: '1 小杯（200ml）', grams: 200 }],
  'milk-lowfat': [{ label: '1 盒（250ml）', grams: 250 }],
  'milk-skim': [{ label: '1 盒（250ml）', grams: 250 }],
  'milk-goat': [{ label: '1 杯（250ml）', grams: 250 }],
  'yogurt-plain': [{ label: '1 杯', grams: 150 }],
  'greek-yogurt': [{ label: '1 杯', grams: 150 }],
  'yogurt-fruit': [{ label: '1 杯', grams: 150 }],
  'yogurt-skyr': [{ label: '1 杯', grams: 150 }],
  'kefir': [{ label: '1 杯（250ml）', grams: 250 }],
  'milk-powder': [{ label: '1 平勺', grams: 25 }],
  'milk-powder-skim': [{ label: '1 平勺', grams: 25 }],
  'condensed-milk': [{ label: '1 汤匙', grams: 20 }],
  'cream-heavy': [{ label: '1 汤匙', grams: 15 }],
  'sour-cream': [{ label: '1 汤匙', grams: 15 }],
  'cheese-cheddar': [{ label: '1 片', grams: 20 }],
  'cheese-swiss': [{ label: '1 片', grams: 20 }],
  'cheese-brie': [{ label: '1 片', grams: 20 }],
  'cheese-blue': [{ label: '1 片', grams: 20 }],
  'cheese-mozzarella': [{ label: '1 份（撒料）', grams: 30 }],
  'cheese-parmesan': [{ label: '1 汤匙（碎）', grams: 5 }],
  'cheese-ricotta': [{ label: '1 汤匙', grams: 25 }],
  'cheese-cottage': [{ label: '1 汤匙', grams: 25 }],
  'cheese-mascarpone': [{ label: '1 汤匙', grams: 15 }],
  'cream-cheese': [{ label: '1 汤匙', grams: 15 }],

  // ---- 主食 ----
  'rice-cooked': [{ label: '1 碗', grams: 150 }, { label: '1 小碗', grams: 110 }],
  'brown-rice-cooked': [{ label: '1 碗', grams: 150 }],
  'glutinous-rice-cooked': [{ label: '1 碗', grams: 150 }],
  'rice-dry': [{ label: '1 量米杯', grams: 150 }, { label: '1 小碗（生米）', grams: 80 }],
  'brown-rice-dry': [{ label: '1 量米杯', grams: 150 }],
  'black-rice-dry': [{ label: '1 量米杯', grams: 150 }],
  'oatmeal-dry': [{ label: '1 份', grams: 40 }, { label: '1 平汤匙', grams: 12 }],
  'oat-cooked': [{ label: '1 碗', grams: 250 }],
  'oat-bran': [{ label: '1 汤匙', grams: 6 }],
  'noodles-cooked': [{ label: '1 碗', grams: 200 }],
  'dried-noodles': [{ label: '1 把', grams: 100 }],
  'rice-noodle-cooked': [{ label: '1 碗', grams: 200 }],
  'rice-noodle-dry': [{ label: '1 把', grams: 100 }],
  'whole-wheat-bread': [{ label: '1 片', grams: 35 }],
  'white-bread': [{ label: '1 片', grams: 35 }],
  'rye-bread': [{ label: '1 片', grams: 35 }],
  'hamburger-bun': [{ label: '1 个', grams: 60 }],
  potato: [{ label: '1 个（中）', grams: 150 }],
  'potato-cooked': [{ label: '1 个（中）', grams: 150 }],
  'potato-mashed': [{ label: '1 碗', grams: 200 }],
  'sweet-potato': [{ label: '1 个（中）', grams: 200 }],
  'sweet-potato-steamed': [{ label: '1 个（中）', grams: 200 }],
  'corn-fresh': [{ label: '1 根', grams: 200 }],
  'rice-cake': [{ label: '1 块', grams: 30 }],
  'egg-fried-rice': [{ label: '1 碗', grams: 250 }],
  'corn-flakes': [{ label: '1 碗', grams: 40 }],
  'purple-potato': [{ label: '1 个（中）', grams: 150 }],

  // ---- 肉 ----
  'chicken-breast': [{ label: '1 块', grams: 120 }],
  'chicken-breast-cooked': [{ label: '1 块', grams: 120 }],
  'chicken-tender': [{ label: '1 条', grams: 40 }],
  'chicken-thigh': [{ label: '1 只（去皮）', grams: 100 }],
  'chicken-wing': [{ label: '1 个', grams: 50 }],
  'chicken-whole': [{ label: '1/4 只', grams: 200 }],
  'chicken-feet': [{ label: '1 个', grams: 40 }],
  'beef-tenderloin': [{ label: '1 份（约一掌）', grams: 100 }],
  'beef-shank': [{ label: '1 份', grams: 100 }],
  'beef-brisket': [{ label: '1 份', grams: 100 }],
  'beef-roll': [{ label: '1 份', grams: 100 }],
  'beef-mince': [{ label: '1 份', grams: 100 }],
  'beef-jerky': [{ label: '1 小包', grams: 30 }],
  'beef-tongue': [{ label: '1 片', grams: 20 }],
  'pork-tenderloin-cooked': [{ label: '1 份', grams: 100 }],
  'pork-mince': [{ label: '1 份', grams: 100 }],
  'pork-loin-chop': [{ label: '1 块', grams: 120 }],
  bacon: [{ label: '1 片', grams: 15 }],
  ham: [{ label: '1 片', grams: 25 }],
  sausage: [{ label: '1 根', grams: 40 }],
  'duck-whole': [{ label: '1/4 只', grams: 200 }],

  // ---- 水产 ----
  salmon: [{ label: '1 份（约一掌）', grams: 100 }],
  'salmon-smoked': [{ label: '1 片', grams: 30 }],
  'tuna-fresh': [{ label: '1 份', grams: 100 }],
  'tuna-tinned-oil': [{ label: '1 小罐', grams: 150 }],
  shrimp: [{ label: '1 只（大）', grams: 12 }, { label: '10 只', grams: 100 }],
  'freshwater-shrimp': [{ label: '1 只', grams: 5 }],
  'fish-ball': [{ label: '1 个', grams: 15 }],
  oyster: [{ label: '1 只', grams: 15 }],
  'nori-dry': [{ label: '1 片（寿司用）', grams: 3 }],
  'kelp-dry': [{ label: '1 小把（泡发前）', grams: 10 }],

  // ---- 豆类 ----
  tofu: [{ label: '1 块', grams: 100 }],
  'tofu-firm': [{ label: '1 块', grams: 100 }],
  'tofu-silken': [{ label: '1 盒', grams: 300 }],
  'tofu-dried': [{ label: '1 块', grams: 50 }],
  'soy-milk': [{ label: '1 杯（250ml）', grams: 250 }],
  'soymilk-dry': [{ label: '1 小包', grams: 30 }],
  'soybean-cooked': [{ label: '1 把（干重）', grams: 30 }],
  'chickpea-cooked': [{ label: '1 碗', grams: 150 }],
  'lentil-cooked': [{ label: '1 碗', grams: 150 }],
  edamame: [{ label: '1 小碗（带荚）', grams: 150 }],
  miso: [{ label: '1 汤匙', grams: 17 }],

  // ---- 蔬菜 ----
  broccoli: [{ label: '1 朵', grams: 15 }, { label: '1 份', grams: 150 }],
  'broccoli-cooked': [{ label: '1 份', grams: 150 }],
  spinach: [{ label: '1 把', grams: 200 }],
  'spinach-cooked': [{ label: '1 份', grams: 150 }],
  tomato: [{ label: '1 个（中）', grams: 150 }],
  'cherry-tomato': [{ label: '1 颗', grams: 15 }],
  cucumber: [{ label: '1 根', grams: 200 }],
  carrot: [{ label: '1 根', grams: 100 }],
  'carrot-cooked': [{ label: '1 根', grams: 100 }],
  onion: [{ label: '1 个（中）', grams: 150 }],
  'onion-red': [{ label: '1 个（中）', grams: 150 }],
  garlic: [{ label: '1 瓣', grams: 5 }],
  ginger: [{ label: '1 片', grams: 5 }],
  'oyster-mushroom': [{ label: '1 份', grams: 100 }],
  'king-oyster': [{ label: '1 根', grams: 50 }],

  // ---- 水果 ----
  banana: [{ label: '1 根（中）', grams: 120 }, { label: '1 根（大）', grams: 150 }],
  apple: [{ label: '1 个（中）', grams: 200 }],
  orange: [{ label: '1 个（中）', grams: 150 }],
  pear: [{ label: '1 个（中）', grams: 200 }],
  peach: [{ label: '1 个（中）', grams: 150 }],
  kiwi: [{ label: '1 个', grams: 80 }],
  mango: [{ label: '1 个（中）', grams: 200 }],
  avocado: [{ label: '1 个', grams: 150 }],
  pineapple: [{ label: '1 片', grams: 100 }],
  strawberry: [{ label: '1 颗', grams: 15 }],
  blueberry: [{ label: '1 把', grams: 50 }],
  grape: [{ label: '1 小串', grams: 100 }],
  watermelon: [{ label: '1 片', grams: 200 }],

  // ---- 坚果与酱料 ----
  peanut: [{ label: '1 把', grams: 25 }, { label: '1 小包', grams: 30 }],
  walnut: [{ label: '1 个（仁）', grams: 5 }, { label: '1 把', grams: 25 }],
  almond: [{ label: '10 颗', grams: 12 }, { label: '1 把', grams: 25 }],
  cashew: [{ label: '1 把', grams: 25 }],
  pistachio: [{ label: '1 把', grams: 25 }],
  hazelnut: [{ label: '1 把', grams: 25 }],
  'chia-seed': [{ label: '1 汤匙', grams: 12 }],
  flaxseed: [{ label: '1 汤匙', grams: 10 }],
  sesame: [{ label: '1 汤匙', grams: 9 }],
  'dark-sesame': [{ label: '1 汤匙', grams: 9 }],
  'peanut-butter': [{ label: '1 汤匙', grams: 16 }],
  tahini: [{ label: '1 汤匙', grams: 15 }],
  honey: [{ label: '1 汤匙', grams: 20 }, { label: '1 茶匙', grams: 7 }],

  // ---- 调味与零食 ----
  'soy-sauce': [{ label: '1 汤匙', grams: 15 }, { label: '1 茶匙', grams: 5 }],
  'oyster-sauce': [{ label: '1 汤匙', grams: 15 }],
  'tomato-ketchup': [{ label: '1 汤匙', grams: 15 }],
  'chili-sauce': [{ label: '1 汤匙', grams: 15 }],
  'salad-dressing': [{ label: '1 汤匙', grams: 15 }],
  jam: [{ label: '1 汤匙', grams: 20 }],
  'sugar-white': [{ label: '1 茶匙', grams: 4 }],
  'maple-syrup': [{ label: '1 汤匙', grams: 20 }],
  cola: [{ label: '1 罐（330ml）', grams: 330 }],
  'cola-zero': [{ label: '1 罐（330ml）', grams: 330 }],
  'soda-lemon': [{ label: '1 罐（330ml）', grams: 330 }],
  beer: [{ label: '1 罐（330ml）', grams: 330 }],
  'red-wine': [{ label: '1 杯（150ml）', grams: 150 }],
  baijiu: [{ label: '1 两（50ml）', grams: 50 }],
  'coffee-black': [{ label: '1 杯（250ml）', grams: 250 }],
  latte: [{ label: '1 杯（300ml）', grams: 300 }],
  'milk-tea': [{ label: '1 杯（500ml）', grams: 500 }],
  'bubble-tea': [{ label: '1 杯（500ml）', grams: 500 }],
  'energy-drink': [{ label: '1 罐（250ml）', grams: 250 }],
  'orange-juice': [{ label: '1 杯（250ml）', grams: 250 }],
  'apple-juice': [{ label: '1 杯（250ml）', grams: 250 }],
  'coconut-water': [{ label: '1 杯（250ml）', grams: 250 }],
  'oat-milk': [{ label: '1 杯（250ml）', grams: 250 }],
  'almond-milk': [{ label: '1 杯（250ml）', grams: 250 }],
  'soy-drink-sweet': [{ label: '1 杯（250ml）', grams: 250 }],
  'yogurt-drink': [{ label: '1 小瓶（100ml）', grams: 100 }],
  'whey-isolate': [{ label: '1 勺', grams: 30 }],
  'whey-protein': [{ label: '1 勺', grams: 30 }],
  'casein-protein': [{ label: '1 勺', grams: 30 }],
  'pea-protein': [{ label: '1 勺', grams: 30 }],
  'mass-gainer': [{ label: '1 勺', grams: 100 }],
  creatine: [{ label: '1 平勺', grams: 5 }],
  'protein-bar': [{ label: '1 根', grams: 60 }],
  'protein-cookie': [{ label: '1 块', grams: 50 }],
  'ice-cream': [{ label: '1 球', grams: 60 }],
  'cookie-butter': [{ label: '1 块', grams: 15 }],
  'cracker-soda': [{ label: '1 片', grams: 8 }],
  'cracker-whole-wheat': [{ label: '1 片', grams: 8 }],
  'instant-noodle': [{ label: '1 包（面饼）', grams: 100 }],
  'ramen-cup': [{ label: '1 桶', grams: 100 }],
  hamburger: [{ label: '1 个', grams: 200 }],
  pizza: [{ label: '1 片', grams: 100 }],
  'potato-chips': [{ label: '1 小袋', grams: 70 }],
  popcorn: [{ label: '1 小碗', grams: 30 }],
  'dark-chocolate': [{ label: '1 小块', grams: 10 }, { label: '1 块（整排）', grams: 100 }],
  'milk-chocolate': [{ label: '1 小块', grams: 10 }],
  'white-chocolate': [{ label: '1 小块', grams: 10 }],
  'cake-sponge': [{ label: '1 块', grams: 100 }],
  cheesecake: [{ label: '1 块', grams: 100 }],
  pretzel: [{ label: '1 个', grams: 60 }],
  'rice-cracker': [{ label: '1 片', grams: 10 }],
  granola: [{ label: '1 份', grams: 45 }],
  'cereal-bar': [{ label: '1 根', grams: 40 }],
  'energy-gel': [{ label: '1 支', grams: 40 }],
};

/** 油脂类兜底份量（汤匙 / 茶匙） */
const OIL_SERVINGS: FoodServing[] = [
  { label: '1 汤匙', grams: 10 },
  { label: '1 茶匙', grams: 4.5 },
];

/** 取某食物的常见份量锚点；无锚点时按品类兜底（油脂类给汤匙 / 茶匙） */
export function getServings(food: IFood): FoodServing[] {
  const hit = SERVING_ANCHORS[food.id];
  if (hit && hit.length > 0) return hit;
  if (food.id.endsWith('-oil')) return OIL_SERVINGS;
  return [];
}

/** 份量描述：`1 个（中） 50g` */
export function fmtServing(s: FoodServing): string {
  return `${s.label} ${s.grams}g`;
}
