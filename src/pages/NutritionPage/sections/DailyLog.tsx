import { useEffect, useState } from 'react';
import { Trash2, Plus, Flame, Beef, Drumstick, Wheat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FOODS, type IFood } from '@/data/foods';
import { Card, CardContent } from '@/components/ui/card';

interface LogEntry {
  foodId: string;
  name: string;
  grams: number;
  meal: string;
  kcal: number;
  protein: number;
  fat: number;
  carb: number;
}

const STORAGE_KEY = 'fitness-goal-app:daily-log';
const MEALS = ['早餐', '午餐', '晚餐', '加餐'];

function loadLog(): LogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLog(entries: LogEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export default function DailyLog({ refreshKey }: { refreshKey: number }) {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [foodId, setFoodId] = useState('');
  const [grams, setGrams] = useState('100');
  const [meal, setMeal] = useState('早餐');

  useEffect(() => {
    setEntries(loadLog());
  }, [refreshKey]);

  const totals = entries.reduce(
    (acc, e) => ({
      kcal: acc.kcal + e.kcal,
      protein: acc.protein + e.protein,
      fat: acc.fat + e.fat,
      carb: acc.carb + e.carb,
    }),
    { kcal: 0, protein: 0, fat: 0, carb: 0 },
  );

  // 目标值（用户之前的截图：2730 kcal, 173g 蛋白, 81g 脂肪, 353g 碳水）
  const goals = { kcal: 2730, protein: 173, fat: 81, carb: 353 };

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
    saveLog(newLog);
    setFoodId('');
    setGrams('100');
  };

  const removeEntry = (idx: number) => {
    const newLog = entries.filter((_, i) => i !== idx);
    setEntries(newLog);
    saveLog(newLog);
  };

  const clearAll = () => {
    setEntries([]);
    saveLog([]);
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
              <Button size="sm" variant="ghost" onClick={clearAll} className="text-muted-foreground">
                清空
              </Button>
            )}
          </div>
        </div>

        {/* 统计概览 */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            icon={<Flame className="h-4 w-4" />}
            label="热量"
            value={Math.round(totals.kcal)}
            goal={goals.kcal}
            unit="kcal"
            color="text-orange-400"
          />
          <StatCard
            icon={<Beef className="h-4 w-4" />}
            label="蛋白质"
            value={Math.round(totals.protein)}
            goal={goals.protein}
            unit="g"
            color="text-red-400"
          />
          <StatCard
            icon={<Drumstick className="h-4 w-4" />}
            label="脂肪"
            value={Math.round(totals.fat)}
            goal={goals.fat}
            unit="g"
            color="text-yellow-400"
          />
          <StatCard
            icon={<Wheat className="h-4 w-4" />}
            label="碳水"
            value={Math.round(totals.carb)}
            goal={goals.carb}
            unit="g"
            color="text-green-400"
          />
        </div>

        {/* 添加表单 */}
        {showAdd && (
          <div className="mt-4 rounded-xl border border-border/50 bg-background/40 p-3">
            <div className="flex flex-wrap gap-2">
              <select
                value={foodId}
                onChange={(e) => setFoodId(e.target.value)}
                className="h-9 flex-1 rounded-md border border-border bg-background px-2 text-sm"
              >
                <option value="">选择食物</option>
                {FOODS.slice(0, 100).map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
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
                          <span>{e.grams}g</span>
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
