import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Trash2, Plus, Flame, Beef, Drumstick, Wheat, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FOODS, FOOD_CATEGORIES, getServings, type IFood } from '@/data/foods';
import { Card, CardContent } from '@/components/ui/card';
import { loadDailyLog, saveDailyLog, type LogEntry } from '@/lib/store';
import { getDailyTargets } from '@/lib/nutrition-targets';
import { cn } from '@/lib/utils';

const MEALS = ['早餐', '午餐', '晚餐', '加餐'];

/** 记录条目回显常见份量：克数正好等于某个锚点时附上「· 1 个（中）」 */
function servingNote(foodId: string, grams: number): string {
  const f = FOODS.find((x) => x.id === foodId);
  if (!f) return '';
  const s = getServings(f).find((x) => Math.abs(x.grams - grams) < 0.01);
  return s ? ` · ${s.label}` : '';
}

/** 按当前时间猜一个默认餐次，省一步操作 */
function defaultMeal(): string {
  const h = new Date().getHours();
  if (h < 10) return '早餐';
  if (h < 15) return '午餐';
  if (h < 21) return '晚餐';
  return '加餐';
}

export default function DailyLog({ refreshKey }: { refreshKey: number }) {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [foodId, setFoodId] = useState('');
  const [q, setQ] = useState('');
  const [grams, setGrams] = useState('100');
  const [meal, setMeal] = useState(defaultMeal);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setEntries(loadDailyLog());
  }, [refreshKey]);

  // 食物下拉：按 9 大分类分组全量展示（此前只取前 100 条，导致水果 / 坚果 / 零食选不到）
  const grouped = useMemo(() => {
    const kw = q.trim().toLowerCase();
    return FOOD_CATEGORIES.map((c) => ({
      ...c,
      items: FOODS.filter((f) => f.cat === c.id && (kw === '' || f.name.toLowerCase().includes(kw))),
    })).filter((g) => g.items.length > 0);
  }, [q]);

  const selectedFood: IFood | null = useMemo(
    () => FOODS.find((f) => f.id === foodId) ?? null,
    [foodId],
  );
  const servings = selectedFood ? getServings(selectedFood) : [];
  const gramsNum = parseFloat(grams);
  const gramsValid = Number.isFinite(gramsNum) && gramsNum > 0;

  const totals = entries.reduce(
    (acc, e) => ({
      kcal: acc.kcal + e.kcal,
      protein: acc.protein + e.protein,
      fat: acc.fat + e.fat,
      carb: acc.carb + e.carb,
    }),
    { kcal: 0, protein: 0, fat: 0, carb: 0 },
  );

  // 目标值：按身体数据实时计算（体重 / 体脂 / 阶段 / 活动系数 / 饮食方案变更即时生效）
  const targets = getDailyTargets();

  const addEntry = () => {
    if (!foodId || !grams) return;
    const food = FOODS.find((f) => f.id === foodId);
    if (!food) return;
    const g = parseFloat(grams);
    if (!g || g <= 0) return;
    const ratio = g / 100;
    const entry: LogEntry = {
      foodId: food.id,
      name: food.name,
      grams: g,
      meal,
      kcal: Math.round(food.kcal * ratio),
      protein: Math.round(food.protein * ratio * 10) / 10,
      fat: Math.round(food.fat * ratio * 10) / 10,
      carb: Math.round(food.carb * ratio * 10) / 10,
    };
    const newLog = [...entries, entry];
    setEntries(newLog);
    saveDailyLog(newLog);
    setFoodId('');
    setGrams('100');
  };

  const removeEntry = (idx: number) => {
    const newLog = entries.filter((_, i) => i !== idx);
    setEntries(newLog);
    saveDailyLog(newLog);
  };

  const clearAll = () => {
    setConfirmClear(false);
    setEntries([]);
    saveDailyLog([]);
    toast.success('已清空今日饮食记录');
  };

  return (
    <Card className="overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl">
      <CardContent className="p-4 sm:p-6">
        {/* 标题栏 */}
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <Flame className="h-5 w-5 text-primary" />
            今日饮食记录
          </h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setShowAdd(!showAdd)}>
              <Plus className="mr-1 h-3.5 w-3.5" />
              添加
            </Button>
            {entries.length > 0 && (
              <Button size="sm" variant="ghost" onClick={() => setConfirmClear(true)} className="text-muted-foreground">
                清空
              </Button>
            )}
          </div>
        </div>

        {/* 清空二次确认 */}
        {confirmClear && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-destructive/50 bg-destructive/5 px-3 py-2 text-xs">
            <span className="text-foreground">
              将清空今日全部 {entries.length} 条饮食记录，清空后不可恢复。
            </span>
            <span className="flex items-center gap-2">
              <Button variant="destructive" size="sm" className="h-7 px-2 text-xs" onClick={clearAll}>
                确认清空
              </Button>
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => setConfirmClear(false)}>
                取消
              </Button>
            </span>
          </div>
        )}

        {/* 统计概览 */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon={<Flame className="h-4 w-4" />}
            label="热量"
            value={Math.round(totals.kcal)}
            goal={targets.kcal}
            unit="kcal"
            color="text-orange-400"
          />
          <StatCard
            icon={<Beef className="h-4 w-4" />}
            label="蛋白质"
            value={Math.round(totals.protein)}
            goal={targets.protein}
            unit="g"
            color="text-red-400"
          />
          <StatCard
            icon={<Drumstick className="h-4 w-4" />}
            label="脂肪"
            value={Math.round(totals.fat)}
            goal={targets.fat}
            unit="g"
            color="text-yellow-400"
          />
          <StatCard
            icon={<Wheat className="h-4 w-4" />}
            label="碳水"
            value={Math.round(totals.carb)}
            goal={targets.carb}
            unit="g"
            color="text-green-400"
          />
        </div>

        {/* 热量目标区间文案（进度条与三大宏量均按下限计） */}
        {targets.kcal > 0 && (
          <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
            {targets.kcalMax > targets.kcalMin ? (
              <>
                热量目标区间{' '}
                <span className="font-semibold text-foreground">{targets.kcalRangeText} kcal</span>
                （进度条与蛋白质 / 脂肪 / 碳水均按区间下限 {targets.kcal} kcal 计）
              </>
            ) : (
              <>
                热量目标 <span className="font-semibold text-foreground">{targets.kcal} kcal</span>
                （维持期即含 TEF 的 TDEE）
              </>
            )}
            {targets.tdeeWithTef > 0 && (
              <>
                <span className="mx-1.5 text-border">|</span>
                基数：含 TEF 的 TDEE {targets.tdeeWithTef} kcal
              </>
            )}
          </p>
        )}

        {/* 目标来源说明（按身体数据实时计算 / 兜底提示） */}
        {targets.kcal > 0 ? (
          <p className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] leading-relaxed text-muted-foreground">
            <Info
              className={cn(
                'h-3.5 w-3.5 shrink-0',
                targets.source === 'fallback' ? 'text-warning' : 'text-primary',
              )}
            />
            <span>{targets.basis}</span>
            <Link
              to="/body"
              className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline"
            >
              去身体数据页
              <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        ) : (
          <div className="mt-3 rounded-xl border border-dashed border-warning/50 bg-warning/5 p-3">
            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
              <span>
                {targets.basis}
                <Link
                  to="/body"
                  className="ml-1 inline-flex items-center gap-0.5 font-medium text-primary hover:underline"
                >
                  去填写
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </span>
            </p>
          </div>
        )}

        {/* 添加表单 */}
        {showAdd && (
          <div className="mt-4 space-y-2.5 rounded-xl border border-border/50 bg-background/40 p-3">
            <div className="flex flex-wrap gap-2">
              <Input
                type="search"
                placeholder="筛选食物"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-9 w-full bg-background/50 sm:w-36"
              />
              <select
                value={foodId}
                onChange={(e) => {
                  const id = e.target.value;
                  setFoodId(id);
                  // 有常见份量锚点的食物，默认按第一档份量填好克数
                  const f = FOODS.find((x) => x.id === id);
                  const first = f ? getServings(f)[0] : undefined;
                  setGrams(first ? String(first.grams) : '100');
                }}
                className="h-9 min-w-[150px] flex-1 rounded-md border border-border bg-background px-2 text-sm"
              >
                <option value="">选择食物</option>
                {grouped.length === 0 && <option value="">无匹配食物</option>}
                {grouped.map((g) => (
                  <optgroup key={g.id} label={g.label}>
                    {g.items.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <Input
                type="number"
                placeholder="克数"
                value={grams}
                onChange={(e) => setGrams(e.target.value)}
                className="h-9 w-24 bg-background/50"
              />
              <select
                value={meal}
                onChange={(e) => setMeal(e.target.value)}
                className="h-9 rounded-md border border-border bg-background px-2 text-sm"
              >
                {MEALS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <Button size="sm" onClick={addEntry} disabled={!foodId}>
                添加
              </Button>
            </div>

            {/* 常见份量锚点：点一下直接折算克数 */}
            {selectedFood && servings.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">常见份量：</span>
                {servings.map((s) => {
                  const on = gramsValid && Math.abs(gramsNum - s.grams) < 0.01;
                  return (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setGrams(String(s.grams))}
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors',
                        on
                          ? 'border-primary bg-primary/15 text-primary'
                          : 'border-border/60 bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                      )}
                    >
                      {s.label} {s.grams}g · {Math.round((selectedFood.kcal * s.grams) / 100)} kcal
                    </button>
                  );
                })}
              </div>
            )}

            {/* 实时换算预览 */}
            {selectedFood && gramsValid && (
              <p className="text-[11px] text-primary">
                「{selectedFood.name}」{gramsNum}g ≈ {Math.round((selectedFood.kcal * gramsNum) / 100)} kcal ·
                蛋白 {Math.round(selectedFood.protein * gramsNum) / 100}g · 脂肪{' '}
                {Math.round(selectedFood.fat * gramsNum) / 100}g · 碳水{' '}
                {Math.round(selectedFood.carb * gramsNum) / 100}g
              </p>
            )}
          </div>
        )}

        {/* 食物列表 */}
        {entries.length === 0 ? (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            还没有记录。点「添加」记录你今天吃了什么。
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {MEALS.map((m) => {
              const mealEntries = entries.filter((e) => e.meal === m);
              if (mealEntries.length === 0) return null;
              return (
                <div key={m}>
                  <p className="mb-1.5 text-xs font-medium text-muted-foreground">{m}</p>
                  <div className="space-y-1">
                    {mealEntries.map((e, i) => (
                      <div
                        key={`${e.foodId}-${i}`}
                        className="flex items-center justify-between rounded-lg border border-border/30 bg-background/30 px-3 py-2 text-sm"
                      >
                        <span className="text-foreground">{e.name}</span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{e.grams}g{servingNote(e.foodId, e.grams)}</span>
                          <span>{e.kcal} kcal</span>
                          <span>蛋白 {e.protein}g</span>
                          <button
                            onClick={() => removeEntry(entries.indexOf(e))}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StatCard({
  icon, label, value, goal, unit, color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  goal: number;
  unit: string;
  color: string;
}) {
  const pct = goal > 0 ? Math.min(100, (value / goal) * 100) : 0;
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-2.5 sm:p-3">
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground sm:text-xs">
        <span className={color}>{icon}</span>
        {label}
      </div>
      <p className="mt-1 font-display text-lg font-bold leading-none text-foreground sm:text-2xl">
        {value}
        <span className="ml-1 text-[10px] font-normal text-muted-foreground sm:text-xs">/ {goal} {unit}</span>
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted/40">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
