import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from './sections/HeroSection';
import GoalPicker from './sections/GoalPicker';
import DietPicker from './sections/DietPicker';
import { GOALS } from '@/data/goals';
import { DIETS } from '@/data/diets';
import {
  loadGoalId,
  loadDietId,
  loadWeightKg,
  saveGoalId,
  saveDietId,
  saveWeightKg,
} from '@/lib/store';

export default function HomePage() {
  const [goalId, setGoalId] = useState(loadGoalId);
  const [dietId, setDietId] = useState(loadDietId);
  const [weight, setWeight] = useState(() => {
    const w = loadWeightKg();
    return w > 0 ? String(w) : '';
  });
  const navigate = useNavigate();

  const savedGoal = GOALS.find((g) => g.id === goalId);
  const savedDiet = DIETS.find((d) => d.id === dietId);
  const hasSaved = Boolean(savedGoal && savedDiet);

  const handleGenerate = () => {
    if (!goalId || !dietId) {
      toast.error('请先选择训练目标和饮食方案');
      return;
    }
    saveGoalId(goalId);
    saveDietId(dietId);
    const w = parseFloat(weight);
    if (Number.isFinite(w) && w > 0) saveWeightKg(w);
    navigate('/plan');
  };

  return (
    <div className="space-y-12">
      <HeroSection />

      {hasSaved && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm">
              <p className="font-medium text-foreground">
                当前设定：<span className="text-primary">{savedGoal.name}</span> ×{' '}
                <span className="text-primary">{savedDiet.name}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">方案已生成，重新选择会覆盖旧设定。</p>
            </div>
            <Button onClick={() => navigate('/plan')}>
              查看我的方案
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      <GoalPicker selected={goalId} onSelect={(id) => { setGoalId(id); saveGoalId(id); if (loadDietId()) navigate('/plan'); }} />
      <DietPicker selected={dietId} onSelect={(id) => { setDietId(id); saveDietId(id); if (loadGoalId()) navigate('/plan'); }} />

      <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="sm:max-w-xs">
            <label htmlFor="weight-input" className="text-sm font-medium text-foreground">
              当前体重（选填）
            </label>
            <p className="mt-0.5 text-xs text-muted-foreground">用于估算每日热量参考，单位 kg。</p>
            <Input
              id="weight-input"
              type="number"
              min={20}
              max={300}
              placeholder="如 63"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-2"
            />
          </div>
          <Button size="lg" onClick={handleGenerate}>
            生成我的方案
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
