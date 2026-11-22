// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useMemo, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FOODS, FOOD_CATEGORIES, getServings, type IFood, type FoodCategory } from '@/data/foods';
import { localizeTerm, localizeFoodName, useI18nPack } from '@/lib/i18n-pack';
import { smartMatch } from '@/lib/smart-search';
import { getAbsorptionTips } from '@/lib/absorption';
import { getFatComposition } from '@/lib/fat-composition';
import { cn } from '@/lib/utils';

interface FoodLibraryProps {
  query: string;
  selectedId: string;
  /** presetGrams：按常见份量（如「1 个 50g」）点选时直接带入克数 */
  onSelect: (food: IFood, presetGrams?: string) => void;
}

type CatFilter = FoodCategory | 'all';

export default function FoodLibrary({ query, selectedId, onSelect }: FoodLibraryProps) {
  const [cat, setCat] = useState<CatFilter>('all');
  // 订阅语言切换并按当前语言懒加载开源语言包（加载完成后重渲染）
  useI18nPack();

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
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant={cat === 'all' ? 'default' : 'outline'}
            className={cn('cursor-pointer select-none', cat !== 'all' && 'hover:bg-accent')}
            onClick={() => setCat('all')}
          >
            {localizeTerm('All', '全部')}
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
                    {localizeFoodName(food.name)}
                  </span>
                  <span className="shrink-0 type-meta font-medium uppercase tracking-wider text-muted-foreground">
                    {FOOD_CATEGORIES.find((c) => c.id === food.cat)?.label}
                  </span>
                </span>
                <span className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    <b className="font-semibold text-foreground">{food.kcal}</b> kcal
                  </span>
                  <span>{localizeTerm('Protein', '蛋白')} {food.protein}g</span>
                  <span>{localizeTerm('Fat', '脂肪')} {food.fat}g</span>
                  <span>{localizeTerm('Carbohydrates', '碳水')} {food.carb}g</span>
                </span>
                {food.fat > 0 &&
                  (() => {
                    const c = getFatComposition(food);
                    const t = c.sat + c.mono + c.poly + c.trans;
                    if (t <= 0) return null;
                    const p = (v: number) => Math.round((v / t) * 100);
                    return (
                      <span className="type-meta text-muted-foreground">
                        脂肪比 饱和{p(c.sat)}% · 单{p(c.mono)}% · 多{p(c.poly)}%
                        {c.trans > 0 ? ` · 反式${p(c.trans)}%` : ''}
                      </span>
                    );
                  })()}
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
                        className="cursor-pointer rounded-full border border-primary/30 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary transition-colors hover:bg-primary/15"
                      >
                        {s.label} {s.grams}g ≈ {Math.round((food.kcal * s.grams) / 100)} kcal
                      </span>
                    ))}
                  </span>
                )}
                {(food.vitFat.length > 0 || food.vitWater.length > 0 || (food.minerals?.length ?? 0) > 0) && (
                  <span className="type-meta text-muted-foreground">
                    维生素 {[...food.vitFat, ...food.vitWater].join('、') || '—'}
                    {food.minerals && food.minerals.length > 0 && ` · 矿物质 ${food.minerals.join('、')}`}
                  </span>
                )}
                {food.note && (
                  <span className="text-xs leading-snug text-warning/90">{food.note}</span>
                )}
                {food.phytochem && food.phytochem.length > 0 && (
                  <span className="block text-xs leading-snug text-primary/90">
                    🌿 {food.phytochem[0].split('：')[0]}
                    {food.phytochem.length > 1 && ` 等 ${food.phytochem.length} 种活性成分`}
                  </span>
                )}
                {getAbsorptionTips(food).slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="flex items-start gap-1 text-xs leading-snug text-primary/90"
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
      {cat === 'cuisine' && (
        <p className="rounded-lg border border-primary/40 bg-primary/5 px-3 py-2 text-xs leading-relaxed text-foreground/80">
          🍽 各国菜系按<strong>餐厅与家庭常见做法</strong>估算，咖喱、椰浆、奶酪、黄油、油炸类一律<strong>偏高一档取值</strong>，
          宁可高估不低估；同一道菜不同店家可差 ±30%，减脂期按此表记账更安全。
        </p>
      )}

      <p className="type-meta text-muted-foreground">
        营养值为每 100g 参考值：生鲜食材为生重 / 可食部，「家常菜熟食」为常见做法熟重估算（随做法、调料浮动），实际以包装标注为准；
        卡片上的「1 个 / 1 碗」标签为常见份量锚点，点它即可按份量折算克数并直接算出营养。
      </p>
      <p className="type-meta rounded-md border border-border bg-muted/30 px-3 py-2 text-muted-foreground">
        ℹ <strong className="text-foreground">本网站收录的所有食物（含各国菜系）仅作为参考</strong>：
        数值为公开食物成分表与常见做法的估算，不是精确测量值，也不是膳食处方；品种、产地、油盐用量不同差异可达 ±20–30%，
        有包装请以实物营养成分表为准。如有肾脏疾病、痛风、糖尿病、食物过敏、孕期 / 哺乳期等情况，请遵医嘱并咨询注册营养师。
      </p>
    </section>
  );
}
