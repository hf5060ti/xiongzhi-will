// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useMemo } from 'react';
import { FOODS, type IFood } from '@/data/foods';
import { cn } from '@/lib/utils';

/**
 * 饮料口味快捷选择条：搜「魔爪」「红牛」这类品牌时，直接在搜索框下方弹出该品牌的
 * 全部口味/罐色选项（带颜色圆点 + 热量），点一下就选中对应食物。
 * 数据来源完全复用 foods/drinks.ts 的独立条目，不改数据结构、不重复维护名称。
 */

/** 品牌关键词 → 展示名。命中查询时列出该品牌的所有变体 */
const BRANDS: { key: string; label: string }[] = [
  { key: '魔爪', label: '魔爪 Monster' },
  { key: 'monster', label: '魔爪 Monster' },
  { key: '红牛', label: '红牛 Red Bull' },
  { key: 'redbull', label: '红牛 Red Bull' },
  { key: 'red bull', label: '红牛 Red Bull' },
];

/** 从口味名推断罐色（用于左侧色点，纯视觉标识） */
function canColor(name: string): string {
  if (/黑罐|经典原味|classic/i.test(name)) return '#1a1a1a';
  if (/白罐|ultra white|无糖/i.test(name)) return '#e8e8e8';
  if (/蓝罐|blue/i.test(name)) return '#2f7fe0';
  if (/紫罐|violet/i.test(name)) return '#8b5cf6';
  if (/绿罐|paradise/i.test(name)) return '#22a06b';
  if (/橙|sunrise/i.test(name)) return '#f59e0b';
  if (/芒果|mango/i.test(name)) return '#f5b301';
  if (/金罐/i.test(name)) return '#d4a017';
  if (/银罐/i.test(name)) return '#b8bcc4';
  return '#c8102e';
}

/** 从完整食物名里抽出括号内的口味短名，如「魔爪（蓝罐蓝莓味）」→「蓝罐蓝莓味」 */
function variantLabel(name: string): string {
  const m = name.match(/[（(]([^）)]+)[）)]/);
  return m ? m[1] : name;
}

interface Props {
  query: string;
  /** 点选某个口味后回调：把对应食物设为当前选中 */
  onPick: (food: IFood) => void;
}

export default function DrinkVariants({ query, onPick }: Props) {
  const brand = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return BRANDS.find((b) => q.includes(b.key.toLowerCase()) || b.key.toLowerCase().includes(q))
      ?? null;
  }, [query]);

  // 仅当查询确实指向某品牌、且该品牌有 2 个以上变体时才弹出（避免单个选项没意义）
  const variants = useMemo(() => {
    if (!brand) return [];
    const key = brand.key.toLowerCase();
    return FOODS.filter((f) => f.cat === 'drink' && f.name.toLowerCase().includes(key));
  }, [brand]);

  if (!brand || variants.length < 2) return null;

  return (
    <div className="mt-2 rounded-xl border border-primary/40 bg-primary/[0.06] p-2.5">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-foreground">
        <span className="text-primary">{brand.label}</span>
        <span className="font-normal text-muted-foreground">· 选口味 / 罐色</span>
      </p>
      <div className="flex flex-wrap gap-1.5">
        {variants.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => onPick(f)}
            className={cn(
              'flex items-center gap-1.5 rounded-lg border border-border/60 bg-background/60 px-2.5 py-1.5 text-xs transition-colors',
              'hover:border-primary/70 hover:bg-primary/10',
            )}
          >
            <span
              className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/30"
              style={{ backgroundColor: canColor(f.name) }}
            />
            <span className="font-medium text-foreground">{variantLabel(f.name)}</span>
            <span className="text-muted-foreground">{f.kcal} kcal</span>
          </button>
        ))}
      </div>
    </div>
  );
}
