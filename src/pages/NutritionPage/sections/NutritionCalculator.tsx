import { useState } from 'react';
import { Calculator, Info, Leaf, Droplets, ShieldAlert, PlusCircle } from 'lucide-react';
import type { IFood } from '@/data/foods';
import { getServings } from '@/data/foods';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { loadDailyLog, saveDailyLog } from '@/lib/store';
import { cn } from '@/lib/utils';
import PhotoNutritionForm from './PhotoNutritionForm';

interface NutritionCalculatorProps {
  selectedFood: IFood | null;
  weight: string;
  onWeightChange: (v: string) => void;
  onLogged?: () => void;
}

const MEALS = ['早餐', '午餐', '晚餐', '加餐'];

/** 按当前时间猜一个默认餐次，省一步操作 */
function defaultMeal(): string {
  const h = new Date().getHours();
  if (h < 10) return '早餐';
  if (h < 15) return '午餐';
  if (h < 21) return '晚餐';
  return '加餐';
}

// 食物 emoji 映射（按 id 关键词匹配）
function foodEmoji(food: IFood): string {
  const id = food.id.toLowerCase();
  const name = food.name;
  if (food.cat === 'meat') {
    if (id.includes('beef') || name.includes('牛')) return '🥩';
    if (id.includes('pork') || name.includes('猪')) return '🍖';
    if (id.includes('lamb') || name.includes('羊')) return '🍗';
    if (id.includes('chicken') || name.includes('鸡')) return '🐔';
    if (id.includes('duck') || name.includes('鸭')) return '🦆';
    return '🥩';
  }
  if (food.cat === 'seafood') return '🐟';
  if (food.cat === 'veg') {
    if (name.includes('番茄') || name.includes('黄瓜') || name.includes('茄子') || name.includes('椒')) return '🥬';
    if (name.includes('胡萝卜') || name.includes('萝卜')) return '🥕';
    if (name.includes('洋葱') || name.includes('蒜') || name.includes('姜') || name.includes('葱')) return '🧄';
    if (name.includes('蘑菇') || name.includes('香菇') || name.includes('金针菇') || name.includes('杏鲍菇')) return '🍄';
    if (name.includes('木耳') || name.includes('银耳')) return '🥢';
    return '🥬';
  }
  if (food.cat === 'fruit') {
    if (name.includes('香蕉')) return '🍌';
    if (name.includes('苹果')) return '🍎';
    if (name.includes('橙')) return '🍊';
    if (name.includes('葡萄')) return '🍇';
    if (name.includes('草莓')) return '🍓';
    if (name.includes('蓝莓')) return '🫐';
    if (name.includes('西瓜')) return '🍉';
    if (name.includes('牛油果')) return '🥑';
    return '🍎';
  }
  if (food.cat === 'dairy') return '🥛';
  if (food.cat === 'staple') return '🍚';
  if (food.cat === 'legume') return '🫘';
  if (food.cat === 'nuts') return '🥜';
  return '🍽️';
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export default function NutritionCalculator({
  selectedFood,
  weight,
  onWeightChange,
  onLogged,
}: NutritionCalculatorProps) {
  const [meal, setMeal] = useState(defaultMeal);
  const grams = parseFloat(weight);
  const valid = selectedFood !== null && Number.isFinite(grams) && grams > 0;
  const ratio = valid ? grams / 100 : 0;
  const servings = selectedFood ? getServings(selectedFood) : [];
  /** 当前克数正好等于某个常见份量时，回显该份量名称 */
  const matchedServing = valid ? servings.find((s) => Math.abs(s.grams - grams) < 0.01) : undefined;

  const hasVitFat = Boolean(selectedFood && selectedFood.vitFat.length > 0);
  const hasVitWater = Boolean(selectedFood && selectedFood.vitWater.length > 0);

  const addToLog = () => {
    if (!selectedFood || !valid) return;
    const log = loadDailyLog();
    log.push({
      foodId: selectedFood.id,
      name: selectedFood.name,
      grams,
      meal,
      kcal: Math.round(selectedFood.kcal * ratio),
      protein: Math.round(selectedFood.protein * ratio * 10) / 10,
      fat: Math.round(selectedFood.fat * ratio * 10) / 10,
      carb: Math.round(selectedFood.carb * ratio * 10) / 10,
    });
    saveDailyLog(log);
    onLogged?.();
  };

  return (
    <section className="space-y-4">
      <Tabs defaultValue="library">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="library">从食物库选</TabsTrigger>
          <TabsTrigger value="photo">拍照营养表</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-4">
          {selectedFood ? (
            <>
              {/* 壁纸详情页风格：左侧大图标 + 右侧玻璃信息卡 */}
              <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl">
                <div className="grid gap-0 md:grid-cols-[280px_1fr]">
                  {/* 左侧：大图标 */}
                  <div className="flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-transparent p-5 sm:p-8">
                    <div className="text-5xl sm:text-7xl">{foodEmoji(selectedFood)}</div>
                    <h2 className="mt-4 text-center font-display text-xl font-bold tracking-wide text-foreground sm:text-2xl">
                      {selectedFood.name}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">每 100g 生重参考值</p>
                    <div className="mt-4 w-full max-w-[240px]">
                      <label htmlFor="food-weight" className="text-xs text-muted-foreground">
                        吃了多少（g，按实际称重填）
                      </label>
                      <Input
                        id="food-weight"
                        type="number"
                        min={0}
                        placeholder="如 150"
                        value={weight}
                        onChange={(e) => onWeightChange(e.target.value)}
                        className="mt-1 bg-background/50"
                      />
                      {matchedServing && (
                        <p className="mt-1 text-[11px] text-primary">
                          = {matchedServing.label}（{matchedServing.grams}g）
                        </p>
                      )}
                      {servings.length > 0 && (
                        <div className="mt-2">
                          <p className="text-[11px] text-muted-foreground">或按常见份量快速填入</p>
                          <div className="mt-1 flex flex-wrap justify-center gap-1.5">
                            {servings.map((s) => {
                              const on = matchedServing?.label === s.label;
                              return (
                                <button
                                  key={s.label}
                                  type="button"
                                  onClick={() => onWeightChange(String(s.grams))}
                                  className={cn(
                                    'rounded-full border px-2 py-0.5 text-[11px] font-medium transition-colors',
                                    on
                                      ? 'border-primary bg-primary/15 text-primary'
                                      : 'border-border/60 bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                                  )}
                                >
                                  {s.label} {s.grams}g
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 右侧：玻璃信息面板 */}
                  <div className="space-y-4 p-4 sm:p-6">
                    <div className="grid grid-cols-2 gap-3">
                      <InfoRow label="热量" value={`${selectedFood.kcal} kcal`} />
                      <InfoRow label="蛋白质" value={`${selectedFood.protein} g`} />
                      <InfoRow label="脂肪" value={`${selectedFood.fat} g`} />
                      <InfoRow label="碳水" value={`${selectedFood.carb} g`} />
                      <InfoRow label="膳食纤维" value={`${selectedFood.fiber} g`} />
                      <InfoRow label="钠" value={`${selectedFood.sodium} mg`} />
                    </div>

                    {valid && (
                      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-medium text-primary">
                            实际摄入（{grams}g{matchedServing ? ` ≈ ${matchedServing.label}` : ''}）
                          </p>
                          <div className="flex items-center gap-2">
                            <select
                              value={meal}
                              onChange={(e) => setMeal(e.target.value)}
                              aria-label="餐次"
                              className="h-7 rounded-md border border-border bg-background px-1.5 text-xs"
                            >
                              {MEALS.map((m) => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>
                            <Button size="sm" variant="secondary" onClick={addToLog} className="h-7 text-xs">
                              <PlusCircle className="mr-1 h-3.5 w-3.5" />
                              加入今日记录
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                          <ResultCell label="热量" value={`${round1(selectedFood.kcal * ratio)}`} />
                          <ResultCell label="蛋白" value={`${round1(selectedFood.protein * ratio)}`} />
                          <ResultCell label="脂肪" value={`${round1(selectedFood.fat * ratio)}`} />
                          <ResultCell label="碳水" value={`${round1(selectedFood.carb * ratio)}`} />
                          <ResultCell label="纤维" value={`${round1(selectedFood.fiber * ratio)}`} />
                          <ResultCell label="钠" value={`${round1(selectedFood.sodium * ratio)}`} />
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-2">
                      <div className="rounded-lg border border-border/50 bg-background/40 p-2.5">
                        <p className="text-muted-foreground">脂溶性维生素</p>
                        <p className="mt-0.5 font-medium text-foreground">
                          {selectedFood.vitFat.length > 0 ? selectedFood.vitFat.join('、') : '—'}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-background/40 p-2.5">
                        <p className="text-muted-foreground">水溶性维生素</p>
                        <p className="mt-0.5 font-medium text-foreground">
                          {selectedFood.vitWater.length > 0 ? selectedFood.vitWater.join('、') : '—'}
                        </p>
                      </div>
                      <div className="rounded-lg border border-border/50 bg-background/40 p-2.5 sm:col-span-2">
                        <p className="text-muted-foreground">矿物质</p>
                        <p className="mt-0.5 font-medium text-foreground">
                          {selectedFood.minerals && selectedFood.minerals.length > 0
                            ? selectedFood.minerals.join('、')
                            : '—'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 免责声明 */}
              <p className="flex items-start gap-2 rounded-xl border border-warning/40 bg-warning/5 p-3 text-[11px] leading-relaxed text-muted-foreground">
                <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                <span>
                  <b className="font-semibold text-foreground">免责声明：</b>
                  「{selectedFood.name}」数值为常见食物成分表每 100g 生重 / 可食部参考值，不同品种、产地、成熟度与烹饪方式差异可达 ±10–20%；具体营养以该食品包装标注为准。本工具不构成医疗或膳食处方建议——如有肾病、痛风、糖尿病、食物过敏、孕期 / 哺乳期或其他疾病状况，请遵医嘱并咨询注册营养师。
                </span>
              </p>

              {/* 植物活性成分 */}
              {selectedFood.phytochem && selectedFood.phytochem.length > 0 && (
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Leaf className="h-4 w-4 text-primary" />
                    植物活性成分与功效
                  </p>
                  <ul className="space-y-1.5">
                    {selectedFood.phytochem.map((p, i) => {
                      const [name, desc] = p.split('：');
                      return (
                        <li
                          key={i}
                          className="flex items-start gap-2 rounded-xl border border-border/50 bg-card/40 p-2.5 text-sm leading-relaxed text-muted-foreground backdrop-blur-sm"
                        >
                          <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>
                            <b className="font-semibold text-foreground">{name}</b>
                            {desc && <span>：{desc}</span>}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* 维生素吸收提示 */}
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Info className="h-4 w-4 text-primary" />
                  维生素吸收提示
                </p>
                {hasVitFat && (
                  <p className="flex items-start gap-2 rounded-xl border border-border/50 bg-card/40 p-3 text-sm leading-relaxed text-muted-foreground backdrop-blur-sm">
                    <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    含脂溶性维生素（{selectedFood?.vitFat.join('、')}）：建议同餐搭配 1–2g
                    油脂（约半茶匙橄榄油），吸收率明显更高。
                  </p>
                )}
                {hasVitWater && (
                  <p className="flex items-start gap-2 rounded-xl border border-border/50 bg-card/40 p-3 text-sm leading-relaxed text-muted-foreground backdrop-blur-sm">
                    <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    含水溶性维生素（{selectedFood?.vitWater.join('、')}）：随水排出、不易过量，保证充足饮水，烹饪时避免长时间水煮流失。
                  </p>
                )}
                {!hasVitFat && !hasVitWater && (
                  <p className="rounded-xl border border-border/50 bg-card/40 p-3 text-sm leading-relaxed text-muted-foreground backdrop-blur-sm">
                    该食物主要提供宏量营养；搭配深色蔬菜同餐可补齐微量维生素。
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/50 bg-card/30 p-12 text-center">
              <div className="text-5xl">🍽️</div>
              <p className="mt-4 text-sm text-muted-foreground">
                先在上方「食物营养库」里点选一种食物
                <br />
                再输入实际称重克数（或点「1 个 / 1 碗」等常见份量）即可算出实际摄入
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="photo">
          <PhotoNutritionForm />
        </TabsContent>
      </Tabs>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/50 bg-background/40 p-3 backdrop-blur-sm">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold leading-none text-foreground">{value}</p>
    </div>
  );
}

function ResultCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/10 p-2 text-center">
      <p className="font-display text-base font-bold leading-none text-primary">{value}</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
