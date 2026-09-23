import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FoodLibrary from './sections/FoodLibrary';
import NutritionCalculator from './sections/NutritionCalculator';
import ProteinGuide from './sections/ProteinGuide';
import DailyLog from './sections/DailyLog';
import { FOODS, type IFood } from '@/data/foods';

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

  const handleSelect = (food: IFood) => {
    setSelectedFood(food);
    setWeight('');
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

      <ProteinGuide />
    </div>
  );
}
