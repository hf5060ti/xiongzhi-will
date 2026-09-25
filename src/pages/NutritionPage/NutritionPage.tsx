import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FoodLibrary from './sections/FoodLibrary';
import NutritionCalculator from './sections/NutritionCalculator';
import ProteinGuide from './sections/ProteinGuide';
import DailyLog from './sections/DailyLog';
import { FOODS, type IFood } from '@/data/foods';
import { CHEN_SHI } from '@/data/coach-videos';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';

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
