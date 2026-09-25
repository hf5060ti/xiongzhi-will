import { useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FOODS, FOOD_CATEGORIES, getServings, type IFood, type FoodCategory } from '@/data/foods';
import { smartMatch } from '@/lib/smart-search';
import { getAbsorptionTips } from '@/lib/absorption';
import { cn } from '@/lib/utils';

interface FoodLibraryProps {
  selectedId: string;
  /** presetGrams：按常见份量（如「1 个 50g」）点选时直接带入克数 */
  onSelect: (food: IFood, presetGrams?: string) => void;
}

const CAT_ALL = 'all';

type CatFilter = FoodCategory | typeof CAT_ALL;

export default function FoodLibrary({ selectedId, onSelect }: FoodLibraryProps) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<CatFilter>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FOODS.filter((f) => {
      const hitCat = cat === 'all' || f.cat === cat;
            const hitQuery =
        q === '' ||
        smartMatch(q, [
          f.name,
          f.note ?? '',
          ...f.vitFat,
          ...f.vitWater,
          ...(f.minerals ?? []),
          ...(f.phytochem ?? []),
        ]);
      return hitCat && hitQuery;
    });
  }, [query, cat]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索食物，如「牛里脊」「菠菜」「香蕉」"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant={cat === 'all' ? 'default' : 'outline'}
            className={cn('cursor-pointer select-none', cat !== 'all' && 'hover:bg-accent')}
            onClick={() => setCat('all')}
          >
            全部
          </Badge>
          {FOOD_CATEGORIES.map((c) => (
            <Badge
              key={c.id}
              variant={cat === c.id ? 'default' : 'outline'}
              className={cn('cursor-pointer select-none', cat !== c.id && 'hover:bg-accent')}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          没有找到「{query}」，试试其它关键词，或用下方的「拍照营养表」自定义录入。
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((food) => {
            const active = selectedId === food.id;
            const servings = getServings(food);
            return (
              <button
                key={food.id}
                type="button"
                onClick={() => onSelect(food)}
                className={cn(
                  'flex flex-col gap-1.5 rounded-lg border p-2.5 text-left transition-colors sm:gap-2 sm:p-3.5',
                  active
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/50 hover:bg-accent',
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="font-display text-lg font-bold leading-none tracking-wide text-foreground">
                    {food.name}
                  </span>
                  <span className="shrink-0 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {FOOD_CATEGORIES.find((c) => c.id === food.cat)?.label}
                  </span>
                </span>
                <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    <b className="font-semibold text-foreground">{food.kcal}</b> kcal
                  </span>
                  <span>蛋白 {food.protein}g</span>
                  <span>脂肪 {food.fat}g</span>
                  <span>碳水 {food.carb}g</span>
                </span>
                {servings.length > 0 && (
                  <span className="flex flex-wrap gap-1.5">
                    {servings.slice(0, 2).map((s) => (
                      <span
                        key={s.label}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelect(food, String(s.grams));
                        }}
                        title={`按「${s.label}」折算 ${s.grams}g 并自动换算营养`}
                        className="cursor-pointer rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/15"
                      >
                        {s.label} {s.grams}g ≈ {Math.round((food.kcal * s.grams) / 100)} kcal
                      </span>
                    ))}
                  </span>
                )}
                {(food.vitFat.length > 0 || food.vitWater.length > 0 || (food.minerals?.length ?? 0) > 0) && (
                  <span className="text-[11px] leading-snug text-muted-foreground">
                    维生素 {[...food.vitFat, ...food.vitWater].join('、') || '—'}
                    {food.minerals && food.minerals.length > 0 && ` · 矿物质 ${food.minerals.join('、')}`}
                  </span>
                )}
                {food.note && (
                  <span className="text-[11px] leading-snug text-warning/90">{food.note}</span>
                )}
                {food.phytochem && food.phytochem.length > 0 && (
                  <span className="block text-[11px] leading-snug text-primary/90">
                    🌿 {food.phytochem[0].split('：')[0]}
                    {food.phytochem.length > 1 && ` 等 ${food.phytochem.length} 种活性成分`}
                  </span>
                )}
                {getAbsorptionTips(food).slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="flex items-start gap-1 text-[11px] leading-snug text-emerald-600/90 dark:text-emerald-400/90"
                  >
                    <Sparkles className="mt-0.5 h-3 w-3 shrink-0" />
                    {t}
                  </span>
                ))}
              </button>
            );
          })}
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        营养值为每 100g 参考值：生鲜食材为生重 / 可食部，「家常菜熟食」为常见做法熟重估算（随做法、调料浮动），实际以包装标注为准；
        卡片上的「1 个 / 1 碗」标签为常见份量锚点，点它即可按份量折算克数并直接算出营养。
      </p>
    </section>
  );
}
