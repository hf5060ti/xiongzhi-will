import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import TrainingSection from './sections/TrainingSection';
import TrainingArchitecture from './sections/TrainingArchitecture';
import TrainingRules from './sections/TrainingRules';
import SpecialNeedsGuide from './sections/SpecialNeedsGuide';
import DietSection from './sections/DietSection';
import { GOALS } from '@/data/goals';
import { DIETS } from '@/data/diets';
import { loadGoalId, loadDietId, loadWeightKg } from '@/lib/store';

export default function PlanPage() {
  const goalId = loadGoalId();
  const dietId = loadDietId();
  const weightKg = loadWeightKg();
  const navigate = useNavigate();

  const goal = GOALS.find((g) => g.id === goalId);
  const diet = DIETS.find((d) => d.id === dietId);

  if (!goal || !diet) {
    return (
      <Card className="mx-auto max-w-md border-primary/30 bg-primary/5">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
          <p className="font-display text-2xl font-bold tracking-wide text-foreground">
            还没有设定目标
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            先选定你的训练目标和饮食方案，雄性意志才能为你生成对应的计划。
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            去设定
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-12">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Your Plan · 雄性意志
          </p>
          <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-foreground">
            你的专属方案
          </h1>
        </div>
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-1.5 h-4 w-4" />
          修改设定
        </Button>
      </header>

      <TrainingArchitecture />
      <TrainingRules />
      <SpecialNeedsGuide />
      <TrainingSection goal={goal} />
      <DietSection diet={diet} weightKg={weightKg} />
    </div>
  );
}
