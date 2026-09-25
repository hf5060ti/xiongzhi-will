import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FoodLibrary from './sections/FoodLibrary';
import NutritionCalculator from './sections/NutritionCalculator';
import ProteinGuide from './sections/ProteinGuide';
import DailyLog from './sections/DailyLog';
import { FOODS, type IFood } from '@/data/foods';
import { CHEN_SHI } from '@/data/coach-videos';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, UtensilsCrossed } from 'lucide-react';
import { ABSORPTION_GUIDE, TEF_RULE } from '@/lib/absorption';

export default function NutritionPage() {
  const [searchParams] = useSearchParams();
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);
  const [weight, setWeight] = useState('');
  const [refreshLog, setRefreshLog] = useState(0);

  // 全局搜索跳转过来时，按 ?foodId=xxx 自动选中
  useEffect(() => {
    const fid = searchParams.get('foodId');
    if (fid) {
      const f = FOODS.find((x) => x.id === fid);
      if (f) {
        setSelectedFood(f);
        setWeight('');
      }
    }
  }, [searchParams]);

  const handleSelect = (food: IFood, presetGrams?: string) => {
    setSelectedFood(food);
    // 点了常见份量（如「1 个 50g」）就直接带入克数，营养值随即算出
    setWeight(presetGrams ?? '');
  };

  // 从计算器加入今日记录后刷新
  const handleLogged = () => {
    setRefreshLog((n) => n + 1);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b border-border pb-4 sm:pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Nutrition · 营养库
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          食物营养库与计算器
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          搜索常见食物的综合营养表，点选后输入克数直接算出实际摄入；也可以拍下任何产品的营养表，
          自动识别数字后按重量换算热量与营养。
        </p>
      </header>

      {/* 今日饮食记录 */}
      <DailyLog refreshKey={refreshLog} />

      <div className="grid gap-8 lg:grid-cols-2">
        <FoodLibrary selectedId={selectedFood?.id ?? ''} onSelect={handleSelect} />
        <div className="lg:sticky lg:top-20 lg:self-start">
          <NutritionCalculator
            selectedFood={selectedFood}
            weight={weight}
            onWeightChange={setWeight}
            onLogged={handleLogged}
          />
        </div>
      </div>

      {/* 营养素吸收率指南 */}
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h2 className="font-display text-xl font-extrabold text-foreground">营养素吸收率指南</h2>
          <Badge variant="outline" className="px-2 py-0.5 text-[11px]">吃进去 ≠ 吸收进去</Badge>
        </div>
        <p className="mb-1 text-xs leading-relaxed text-muted-foreground">
          同样一份食物，会吃的人吸收率高一截。掌握这些搭配原则，营养利用率立竿见影。
        </p>
        <p className="mb-4 rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-xs leading-relaxed text-primary/90">
          🔥 食物热效应：脂肪 {TEF_RULE.fat} · 碳水 {TEF_RULE.carb} · 蛋白质 {TEF_RULE.protein}（{TEF_RULE.default}
          兜底）。{TEF_RULE.note}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {ABSORPTION_GUIDE.map((g) => (
            <div key={g.title} className="rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <UtensilsCrossed className="h-4 w-4 text-primary" />
                <span className="font-display text-base font-bold text-foreground">{g.title}</span>
                <Badge variant="outline" className="px-1.5 py-0 text-[10px]">{g.badge}</Badge>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{g.body}</p>
              <ul className="mt-2 space-y-1">
                {g.tips.map((t) => (
                  <li key={t} className="flex items-start gap-1.5 text-[11px] leading-snug text-foreground/80">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          吸收率因人而异（消化系统、年龄、疾病都会影响）；孕妇、老年人、大病初愈者、糖尿病及相关疾病人群，优先遵从医嘱。
        </p>
      </div>

      {/* 陈石营养讲解课堂 */}
      <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h2 className="font-display text-xl font-extrabold text-foreground">营养课堂 · 陈石</h2>
          <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
            3HFIT / SNC 运动营养咨询师
          </span>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
          关于蛋白质、碳水、脂肪、维生素怎么吃，与其自己猜，不如看专业营养师的讲解。
          以下视频由陈石老师讲解，点击跳转抖音观看（视频版权归原作者所有）。
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {CHEN_SHI.map((v, i) => (
            <a
              key={i}
              href={v.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 transition-colors hover:border-primary/50"
            >
              <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">
                  {v.title}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5">
                  <Badge variant="outline" className="px-1.5 py-0 text-[10px]">{v.topic}</Badge>
                  {v.note && (
                    <span className="truncate text-[11px] text-muted-foreground">{v.note}</span>
                  )}
                </span>
              </span>
              <Badge variant="outline" className="shrink-0">{v.platform}</Badge>
            </a>
          ))}
        </div>
      </div>

      <ProteinGuide />
    </div>
  );
}
