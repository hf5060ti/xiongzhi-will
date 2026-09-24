// EXPORTS: SearchEntry, SEARCH_INDEX
// 全局通用搜索：合并动作 / 食物 / 公式 / 饮食讲解四类条目，导航栏搜索框直接用
import { GOALS } from '@/data/goals';
import { FOODS } from '@/data/foods';
import { BODYWEIGHT_ITEMS } from '@/data/bodyweight';
import { DIET_KNOWLEDGE } from '@/data/diet-knowledge';

export type SearchTarget =
  | { route: '/plan'; goalId?: string }
  | { route: '/nutrition'; foodId: string }
  | { route: '/body' }
  | { route: '/cardio'; itemId?: string }
  | { route: '/bodyweight'; itemId?: string }
  | { route: '/stomach' }
  | { route: '/diet-knowledge'; entryId?: string };

export interface SearchEntry {
  type: 'movement' | 'food' | 'formula' | 'knowledge';
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
  { type: 'formula', label: '有氧运动消耗', sublabel: '有氧运动 · MET × 体重 × 时长', target: { route: '/cardio' } },
  { type: 'formula', label: '散步消耗', sublabel: '有氧运动 · 4 档配速 MET 换算', target: { route: '/cardio', itemId: 'walking' } },
  { type: 'formula', label: '自重力量消耗', sublabel: '自重力量 · MET × 体重 × 时长（次数换算）', target: { route: '/bodyweight' } },
  { type: 'formula', label: '俯卧撑消耗', sublabel: '自重力量 · 标准/钻石/下斜等 8 个变式', target: { route: '/bodyweight', itemId: 'pushup-standard' } },
  { type: 'formula', label: '引体向上消耗', sublabel: '自重力量 · 斜身/离心/正握/反握', target: { route: '/bodyweight', itemId: 'pullup-standard' } },
  { type: 'formula', label: '自重深蹲消耗', sublabel: '自重力量 · 相扑/弓步/保加利亚/手枪蹲', target: { route: '/bodyweight', itemId: 'squat-standard' } },
];

/** 自重动作（俯卧撑全变式 / 引体向上 / 自重深蹲）：搜索直达对应动作页 */
const BODYWEIGHT_ENTRIES: SearchEntry[] = BODYWEIGHT_ITEMS.map((i) => ({
  type: 'movement' as const,
  label: i.name,
  sublabel: `自重力量 · ${i.group} · ${i.level} · ${i.met} MET`,
  target: { route: '/bodyweight', itemId: i.id },
}));

/** 胃部（消化系统修复）：搜索直达肠漏 / FODMAP 排查页面 */
const STOMACH_ENTRIES: SearchEntry[] = [
  { type: 'formula', label: '肠漏', sublabel: '胃部 · 屏障受损四类核心诱因', target: { route: '/stomach' } },
  { type: 'formula', label: 'FODMAP 排查表', sublabel: '胃部 · 四类构成与健身饮食常见来源', target: { route: '/stomach' } },
  { type: 'formula', label: '低 FODMAP 三阶段', sublabel: '胃部 · 排除 / 重引入 / 个性化', target: { route: '/stomach' } },
  { type: 'formula', label: '腹胀', sublabel: '胃部 · 高 FODMAP 与「干净饮食」悖论', target: { route: '/stomach' } },
];

/** 饮食讲解：搜索直达对应讲解条目（关键词走条目标题） */
const KNOWLEDGE_ENTRIES: SearchEntry[] = DIET_KNOWLEDGE.map((k) => ({
  type: 'knowledge' as const,
  label: k.title,
  sublabel: `饮食讲解 · ${k.author} · ${k.topic}`,
  target: { route: '/diet-knowledge', entryId: k.id },
}));

export const SEARCH_INDEX: SearchEntry[] = [...MOVEMENTS, ...FOOD_ENTRIES, ...BODYWEIGHT_ENTRIES, ...FORMULAS, ...STOMACH_ENTRIES, ...KNOWLEDGE_ENTRIES];

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
