// EXPORTS: SearchEntry, SEARCH_INDEX
// 全局通用搜索：合并动作 / 食物 / 公式三类条目，导航栏搜索框直接用
import { GOALS } from '@/data/goals';
import { FOODS } from '@/data/foods';

export type SearchTarget =
  | { route: '/plan'; goalId?: string }
  | { route: '/nutrition'; foodId: string }
  | { route: '/body' };

export interface SearchEntry {
  type: 'movement' | 'food' | 'formula';
  label: string;
  sublabel: string;
  target: SearchTarget;
}

const MOVEMENTS: SearchEntry[] = GOALS.flatMap((g) =>
  g.movements.map((m) => ({
    type: 'movement' as const,
    label: m.name,
    sublabel: `${g.name} · ${m.set}`,
    target: { route: '/plan', goalId: g.id },
  })),
);

const FOOD_ENTRIES: SearchEntry[] = FOODS.map((f) => ({
  type: 'food' as const,
  label: f.name,
  sublabel: `食物 · ${f.kcal} kcal/100g`,
  target: { route: '/nutrition', foodId: f.id },
}));

const FORMULAS: SearchEntry[] = [
  { type: 'formula', label: '瘦体重 LBM', sublabel: '身体数据 · 体重 ×（1−体脂率）', target: { route: '/body' } },
  { type: 'formula', label: '每日蛋白质', sublabel: '身体数据 · LBM × 阶段系数', target: { route: '/body' } },
  { type: 'formula', label: 'BMR 基础代谢', sublabel: '身体数据 · 6 个公式对照', target: { route: '/body' } },
  { type: 'formula', label: 'TDEE 每日总消耗', sublabel: '身体数据 · BMR × 活动系数', target: { route: '/body' } },
  { type: 'formula', label: 'TEF 食物热效应', sublabel: '身体数据 · 宏量加权约 10%', target: { route: '/body' } },
  { type: 'formula', label: '1RM 最大筋力换算', sublabel: '身体数据 · 次数法反推', target: { route: '/body' } },
  { type: 'formula', label: 'FFMI / 肌肉量上限', sublabel: '身体数据 · 4 个公式对照', target: { route: '/body' } },
  { type: 'formula', label: 'Aragon 增肌速率', sublabel: '身体数据 · 初/中/高级月增重', target: { route: '/body' } },
];

export const SEARCH_INDEX: SearchEntry[] = [...MOVEMENTS, ...FOOD_ENTRIES, ...FORMULAS];

export function searchEntries(query: string, limit = 8): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const scored = SEARCH_INDEX.map((e) => {
    const label = e.label.toLowerCase();
    const sub = e.sublabel.toLowerCase();
    let score = 0;
    if (label === q) score = 100;
    else if (label.startsWith(q)) score = 80;
    else if (label.includes(q)) score = 60;
    else if (sub.includes(q)) score = 30;
    return { e, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((x) => x.e);
}
