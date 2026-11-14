// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 外卖门店库：搜索 / 分类 / 多选门店 → 展开招牌餐 → 一键记入今日饮食。
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Bike, Check, Plus, UtensilsCrossed } from 'lucide-react';
import { loadDailyLog, saveDailyLog, type LogEntry } from '@/lib/store';
import {
  TAKEOUT_CATEGORIES,
  TAKEOUT_STORES,
  storeTotal,
  type TakeoutCategory,
  type TakeoutDish,
  type TakeoutStore,
} from '@/data/takeout';
import { cn } from '@/lib/utils';

const MEALS = ['早餐', '午餐', '晚餐', '加餐'];

/** 按当前时间猜一个默认餐次 */
function defaultMeal(): string {
  const h = new Date().getHours();
  if (h < 10) return '早餐';
  if (h < 15) return '午餐';
  if (h < 21) return '晚餐';
  return '加餐';
}

/** 门店招牌磁贴：只用黑 / 白 / 红三种配色 */
const TONE_CLASS: Record<TakeoutStore['tone'], string> = {
  red: 'border-black/40 bg-gradient-to-br from-[#E8283A] via-[#C8102E] to-[#7C0F1B] text-white',
  paper: 'border-white/50 bg-gradient-to-br from-[#F6F2EC] to-[#D8CFC6] text-[#161013]',
  ink: 'border-primary/35 bg-gradient-to-br from-[#151013] to-[#08080A] text-primary',
};

interface Props {
  query: string;
  /** 写入今日饮食后通知父级刷新 DailyLog */
  onLogged: () => void;
}

export default function TakeoutLibrary({ query, onLogged }: Props) {
  const [cat, setCat] = useState<TakeoutCategory | 'all'>('all');
  const [selected, setSelected] = useState<string[]>([]);
  const [meal, setMeal] = useState(defaultMeal);
  const [justAdded, setJustAdded] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const kw = query.trim().toLowerCase();
    return TAKEOUT_STORES.filter((s) => {
      const catOk = cat === 'all' || s.category === cat;
      if (!catOk) return false;
      if (kw === '') return true;
      return (
        s.name.toLowerCase().includes(kw) ||
        s.category.includes(query.trim()) ||
        s.desc.toLowerCase().includes(kw) ||
        s.dishes.some((d) => d.name.toLowerCase().includes(kw))
      );
    });
  }, [query, cat]);

  const selectedStores = TAKEOUT_STORES.filter((s) => selected.includes(s.id));
  const selectableDishes = selectedStores.reduce((n, s) => n + s.dishes.length, 0);

  const toggleStore = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const addDish = (store: TakeoutStore, dish: TakeoutDish) => {
    const entry: LogEntry = {
      foodId: `takeout:${store.id}:${dish.id}`,
      name: `${store.name} · ${dish.name}`,
      grams: dish.grams,
      meal,
      kcal: dish.kcal,
      protein: dish.protein,
      fat: dish.fat,
      carb: dish.carb,
    };
    saveDailyLog([...loadDailyLog(), entry]);
    onLogged();
    setJustAdded((prev) => [...prev, `${store.id}:${dish.id}`]);
    toast.success(`已加入${meal}：${store.name} · ${dish.name}`);

    // 门店的招牌餐一次性加完时，顺手取消选中，避免误以为还在「待选」
    const addedInStore = store.dishes.filter((d) =>
      [...justAdded, `${store.id}:${dish.id}`].includes(`${store.id}:${d.id}`),
    );
    if (addedInStore.length === store.dishes.length) {
      setSelected((prev) => prev.filter((x) => x !== store.id));
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-4 backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 font-display text-xl font-extrabold text-foreground">
            <Bike className="h-5 w-5 text-primary" />
            外卖门店库
          </h2>
          <p className="mt-1 type-meta text-muted-foreground">
            选门店 → 点招牌餐 → 直接记进今日饮食。支持多选，一次记多家。
          </p>
        </div>
        <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          共 {TAKEOUT_STORES.length} 家
        </span>
      </div>

      {/* 分类 + 已选计数 */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-border/60 pb-2.5">
        <div className="-mx-1 flex flex-1 gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {(['all', ...TAKEOUT_CATEGORIES] as const).map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c as TakeoutCategory | 'all')}
                className={cn(
                  'shrink-0 rounded-md px-3 py-1.5 text-[0.78rem] transition-colors',
                  active
                    ? 'bg-primary/15 font-semibold text-primary'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground',
                )}
                aria-pressed={active}
              >
                {c === 'all' ? '全部' : c}
              </button>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
          <span>
            已选 <span className="font-semibold text-primary">{selected.length}</span> 家
          </span>
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-muted-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
            >
              取消全选
            </button>
          )}
        </div>
      </div>

      {/* 门店网格 */}
      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">没找到匹配的门店，换个关键词试试。</p>
      ) : (
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((s) => {
            const checked = selected.includes(s.id);
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => toggleStore(s.id)}
                aria-pressed={checked}
                className={cn(
                  'group relative rounded-xl border p-2 text-left transition-all',
                  checked
                    ? 'border-primary/70 bg-primary/[0.07] shadow-[0_0_0_1px_rgba(255,59,74,0.25),0_10px_30px_-18px_rgba(255,59,74,0.8)]'
                    : 'border-border/60 bg-black/20 hover:border-primary/45 hover:bg-white/[0.03]',
                )}
              >
                <div className={cn('relative flex h-[74px] items-center justify-center overflow-hidden rounded-lg border', TONE_CLASS[s.tone])}>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.14] [background:repeating-linear-gradient(135deg,transparent_0_7px,rgba(255,255,255,0.8)_7px_8px)]"
                  />
                  <span className="relative font-display text-[1.55rem] font-black leading-none tracking-tight">{s.mark}</span>
                  <span className="absolute bottom-1.5 left-2 text-[0.55rem] font-medium uppercase tracking-[0.22em] opacity-60">
                    {s.category}
                  </span>
                  {checked && (
                    <span className="absolute -right-px -top-px flex h-6 w-6 items-center justify-center rounded-bl-lg bg-primary text-primary-foreground">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex items-baseline justify-between gap-1 px-0.5">
                  <span className="truncate text-[0.78rem] font-medium text-foreground/90">{s.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{s.dishes.length} 道</span>
                </div>
                <p className="truncate px-0.5 text-xs text-muted-foreground/80">
                  招牌约 {storeTotal(s).kcal} kcal
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* 已选门店的招牌餐：直接加入今日饮食 */}
      {selectedStores.length > 0 && (
        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/[0.04] p-3.5 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm">
              <UtensilsCrossed className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">
                已选 {selectedStores.length} 家 · {selectableDishes} 道可选
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-lg border border-border/60 bg-black/25 p-0.5">
              {MEALS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMeal(m)}
                  className={cn(
                    'rounded-md px-2.5 py-1 text-xs transition-colors',
                    meal === m
                      ? 'bg-primary font-semibold text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                  aria-pressed={meal === m}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {selectedStores.map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between">
                  <p className="text-[0.78rem] font-semibold text-foreground">
                    {s.name}
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">{s.desc}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleStore(s.id)}
                    className="text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    移除
                  </button>
                </div>
                <div className="mt-1.5 grid gap-1.5 sm:grid-cols-2">
                  {s.dishes.map((d) => {
                    const added = justAdded.includes(`${s.id}:${d.id}`);
                    return (
                      <div
                        key={d.id}
                        className="flex items-center gap-2 rounded-lg border border-border/50 bg-black/20 px-2.5 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-1.5 text-[0.78rem] font-medium text-foreground">
                            <span className="truncate">{d.name}</span>
                            {d.tag && (
                              <span className="shrink-0 rounded bg-primary/15 px-1 py-px text-[0.6rem] font-medium text-primary">
                                {d.tag}
                              </span>
                            )}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {d.grams}g · {d.kcal} kcal · 蛋白 {d.protein}g
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => addDish(s, d)}
                          disabled={added}
                          aria-label={`把 ${s.name} ${d.name} 加入${meal}`}
                          className={cn(
                            'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border transition-colors',
                            added
                              ? 'border-primary/50 bg-primary/15 text-primary'
                              : 'border-border/70 text-muted-foreground hover:border-primary/60 hover:bg-primary/10 hover:text-primary',
                          )}
                        >
                          {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-3 text-xs leading-relaxed text-muted-foreground/80">
        营养值为常见份量的参考估算（含米饭 / 汤汁），综合品牌公示与公开食物数据整理，
        不同门店、城市与口味差异较大，仅用于记录和横向对比。
        门店名称与商标归各自权利人所有，本站仅作就餐记录参考。
      </p>
    </section>
  );
}
