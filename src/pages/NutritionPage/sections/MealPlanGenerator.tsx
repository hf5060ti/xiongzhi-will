import { useMemo, useState } from 'react';
import { CalendarRange, ClipboardList, Dumbbell, Flame, Info, Salad, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  buildMealPlan,
  buildWeekPlan,
  dietAbsorbNote,
  type MealPlanInput,
  type MealPlanResult,
  type PlannedMeal,
} from '@/lib/meal-plan';
import { loadBodyProfile, loadDietId, loadSplit } from '@/lib/store';
import { PHASE_LABEL, LEVEL_LABEL } from '@/lib/body-math';
import { DIETS } from '@/data/diets';

const KIND_LABEL: Record<string, string> = {
  staple: '主食',
  protein: '蛋白',
  veg: '蔬菜',
  fat: '脂肪',
  drink: '饮品',
};

const SPLIT_LABEL: Record<string, string> = {
  'full-body': '全身分化（二分化）',
  'push-pull-legs': '推拉腿（三分化）',
  'ppl-upper-lower': '推拉腿 + 上下（四分化）',
  'upper-lower': '上下分化（四分化）',
  'bro-split': '五分化',
};

export default function MealPlanGenerator() {
  const input = useMemo<MealPlanInput | null>(() => {
    const p = loadBodyProfile();
    const w = parseFloat(p.weightKg);
    const h = parseFloat(p.heightCm);
    const bf = parseFloat(p.bodyFatPct);
    const age = parseInt(p.age || '0', 10);
    if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(h) || h <= 0) return null;
    return {
      sex: p.sex,
      age: Number.isFinite(age) && age > 0 ? age : 25,
      heightCm: h,
      weightKg: w,
      bodyFatPct: Number.isFinite(bf) && bf >= 0 ? bf : 20,
      level: (p.level as 'beginner' | 'intermediate' | 'advanced') || 'beginner',
      activity: p.activity || 'moderate',
      phase: (p.phase as 'bulk' | 'cut' | 'maintain') || 'bulk',
      dietId: loadDietId() || 'high-carb',
    };
  }, []);

  const result = useMemo<MealPlanResult | null>(() => (input ? buildMealPlan(input) : null), [input]);
  const diet = DIETS.find((d) => d.id === loadDietId()) ?? DIETS[0];

  if (!result || !input) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-2 flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-extrabold text-foreground">一日三餐方案</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          去「身体数据」页填好身高、体重、体脂率后，这里会自动按你的目标与饮食方案生成三餐搭配与食材克数。
        </p>
        <Button className="mt-3" size="sm" onClick={() => { window.location.hash = '#/body'; }}>
          去填写身体数据
        </Button>
      </div>
    );
  }

  const { daily, meals, dietName, warn } = result;

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <ClipboardList className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-extrabold text-foreground">一日三餐方案</h2>
        <Badge variant="outline" className="px-2 py-0.5 text-[11px]">{dietName}</Badge>
      </div>

      {/* 每日目标 */}
      <div className="rounded-lg border border-border bg-muted/30 p-3.5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <DailyMetric icon={<Flame className="h-4 w-4 text-orange-500" />} label="每日热量" value={`${daily.calories} kcal`} sub={`基础 TDEE ${daily.tdee} kcal`} />
          <DailyMetric icon={<span className="text-[11px] font-bold text-blue-500">蛋</span>} label="蛋白质" value={`${daily.proteinG} g`} sub={`占 ${Math.round((daily.proteinG * 4 / daily.calories) * 100)}%`} />
          <DailyMetric icon={<span className="text-[11px] font-bold text-amber-500">碳</span>} label="碳水化合物" value={`${daily.carbG} g`} sub={`占 ${Math.round((daily.carbG * 4 / daily.calories) * 100)}%`} />
          <DailyMetric icon={<span className="text-[11px] font-bold text-rose-500">脂</span>} label="脂肪" value={`${daily.fatG} g`} sub={`占 ${Math.round((daily.fatG * 9 / daily.calories) * 100)}%`} />
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          按你的身体数据实时计算（Katch BMR × 活动系数 × 食物热效应 + 阶段调整），
          蛋白质按瘦体重 × 阶段系数；新手蛋白质建议 1.6–1.8g/kg 体重即可，无需硬撑高蛋白。
        </p>
      </div>

      {warn && (
        <p className="flex items-start gap-1.5 rounded-md border border-amber-500/30 bg-amber-500/10 p-2.5 text-xs text-amber-700 dark:text-amber-300">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {warn}
        </p>
      )}

      {/* 四餐卡片 */}
      <div className="grid gap-3 sm:grid-cols-2">
        {meals.map((meal) => (
          <MealCard key={meal.slot} meal={meal} />
        ))}
      </div>

      {/* 吸收率提示 */}
      <p className="rounded-md border border-primary/20 bg-primary/5 p-2.5 text-[11px] leading-relaxed text-foreground/80">
        <b className="text-foreground">吸收率提示：</b>
        {dietAbsorbNote(diet.id)}
      </p>

      <p className="text-[10px] leading-relaxed text-muted-foreground">
        方案为营养模板，克数按每餐碳蛋脂目标换算；同一食材请以食物库（营养库）实际数据为准。一周为试用期：
        体重与视觉效果符合预期就沿用，不满意再按体重上下浮动微调 5–10% 热量。
        糖尿病、孕妇、老年人、大病初愈者优先遵从医嘱，本站只提供健康自然的饮食思路。
      </p>

      {/* 本周菜单 */}
      <WeekPlanView input={input} />
    </div>
  );
}

function MealCard({ meal }: { meal: PlannedMeal }) {
  return (
    <Card className="overflow-hidden border-border/60">
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 font-display text-base font-bold text-foreground">
            <Salad className="h-4 w-4 text-primary" />
            {meal.slot}
            <span className="text-[11px] font-normal text-muted-foreground">约 {meal.pct}% 热量</span>
          </h3>
          <Badge variant="secondary" className="text-[11px]">
            {meal.calories} kcal
          </Badge>
        </div>
        <p className="mb-2 text-[11px] text-muted-foreground">
          蛋白 {meal.proteinG}g · 碳水 {meal.carbG}g · 脂肪 {meal.fatG}g
        </p>
        <div className="space-y-2">
          {meal.options.map((opt, oi) => (
            <div key={oi} className="rounded-md border border-border bg-muted/20 p-2.5">
              <p className="mb-1.5 flex items-center justify-between text-xs font-semibold text-foreground">
                {opt.title}
                <span className="font-normal text-muted-foreground">≈{opt.kcal} kcal</span>
              </p>
              <ul className="space-y-1">
                {opt.items.map((it, ii) => (
                  <li key={ii} className="flex items-center justify-between text-xs text-foreground/80">
                    <span>
                      <Badge variant="outline" className="mr-1.5 px-1 py-0 text-[9px]">{KIND_LABEL[it.kind]}</Badge>
                      {it.name}
                      {it.note ? <span className="text-muted-foreground">（{it.note}）</span> : null}
                    </span>
                    <span className="shrink-0 font-medium">{Math.round(it.grams)}g</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

/** 本周菜单：按分化推演 7 天训练日/休息日，碳循环休息日自动低碳 */
function WeekPlanView({ input }: { input: MealPlanInput }) {
  const [day, setDay] = useState(0);
  const splitId = loadSplit();
  const week = useMemo(() => buildWeekPlan(input, splitId), [input, splitId]);
  const cur = week[day] ?? week[0];

  return (
    <div className="mt-2 rounded-xl border border-border/80 bg-muted/10 p-3.5 sm:p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <CalendarRange className="h-5 w-5 text-primary" />
        <h3 className="font-display text-lg font-bold text-foreground">本周菜单</h3>
        <Badge variant="outline" className="text-[11px]">{SPLIT_LABEL[splitId] ?? '按训练分化'}</Badge>
      </div>
      <p className="mb-3 text-[11px] text-muted-foreground">
        按你选的训练分化自动排布训练日 / 休息日（训练日碳水足、休息日适度减碳），点日期切换当天四餐；
        实际操作按个人恢复情况调整，训练日 / 休息日不是死规矩。
      </p>

      {/* 7 天选择 */}
      <div className="mb-3 grid grid-cols-7 gap-1.5">
        {week.map((d, i) => (
          <button
            key={d.label}
            type="button"
            onClick={() => setDay(i)}
            className={`rounded-lg border px-1 py-2 text-center transition-colors ${
              i === day
                ? 'border-primary bg-primary/15 text-foreground shadow-sm'
                : 'border-border bg-card/40 text-muted-foreground hover:bg-card/80'
            }`}
          >
            <span className="block text-[11px] font-semibold">{d.label}</span>
            <span className={`mt-0.5 block text-[9px] ${d.isTrainDay ? 'text-primary' : 'text-muted-foreground'}`}>
              {d.isTrainDay ? '训练日' : '休息日'}
            </span>
          </button>
        ))}
      </div>

      {/* 当天详情 */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge className={`text-[11px] ${cur.isTrainDay ? '' : 'bg-muted text-muted-foreground'}`}>
            {cur.label} · {cur.isTrainDay ? '训练日' : '休息日'}
          </Badge>
          <Badge variant="secondary" className="text-[11px]">{cur.dietName}</Badge>
          <span className="text-[11px] text-muted-foreground">
            {cur.plan.daily.calories} kcal · 蛋白 {cur.plan.daily.proteinG}g · 碳水 {cur.plan.daily.carbG}g · 脂肪 {cur.plan.daily.fatG}g
          </span>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {cur.plan.meals.map((m) => (
            <MealCard key={m.slot} meal={m} />
          ))}
        </div>
        {cur.plan.warn && (
          <p className="text-[11px] text-amber-700 dark:text-amber-300">{cur.plan.warn}</p>
        )}
        {input.dietId === 'carb-cycle' && !cur.isTrainDay && (
          <p className="flex items-start gap-1 rounded-md border border-primary/20 bg-primary/5 p-2 text-[11px] text-foreground/80">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            碳循环休息日已自动按「低碳日」口径排布（碳水≈25%，蛋白质不降）；如果休息日你仍有训练后的酸痛恢复需求，可手动回到训练日方案。
          </p>
        )}
      </div>

      <p className="mt-3 flex items-start gap-1 text-[10px] leading-relaxed text-muted-foreground">
        <Dumbbell className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        单次训练建议控制在 70 分钟左右（超过多为垃圾容量，只影响恢复；长跑等耐力有氧除外），睡眠 8–9 小时因人而异；
        饮食上多吃肉蛋奶、蔬菜，脂肪碳水适度，按个人消化系统微调。
      </p>
    </div>
  );
}

function DailyMetric({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-md border border-border bg-card/60 p-2.5 text-center">
      <div className="flex items-center justify-center gap-1 text-xs font-medium text-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-0.5 font-display text-lg font-bold leading-none text-foreground">{value}</p>
      <p className="mt-1 text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}
