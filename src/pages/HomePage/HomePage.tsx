import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, Download, Dumbbell, Footprints, Soup, TrendingDown, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import HeroSection from './sections/HeroSection';
import GoalPicker from './sections/GoalPicker';
import DietPicker from './sections/DietPicker';
import TodayPanel from './sections/TodayPanel';
import { GOALS } from '@/data/goals';
import { DIETS } from '@/data/diets';
import {
  loadGoalId,
  loadDietId,
  loadWeightKg,
  saveGoalId,
  saveDietId,
  saveWeightKg,
  loadLastBackupAt,
  saveLastBackupAt,
  exportAllData,
  importAllData,
} from '@/lib/store';

export default function HomePage() {
  const [goalId, setGoalId] = useState(loadGoalId);
  const [dietId, setDietId] = useState(loadDietId);
  const [weight, setWeight] = useState(() => {
    const w = loadWeightKg();
    return w > 0 ? String(w) : '';
  });
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const json = exportAllData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `雄性意志-备份-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    saveLastBackupAt(Date.now());
    toast.success('数据已导出');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importAllData(reader.result as string);
      if (result.success) {
        toast.success(`导入成功，共 ${result.count} 项数据`);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(result.error || '导入失败');
      }
    };
    reader.readAsText(file);
  };

  const savedGoal = GOALS.find((g) => g.id === goalId);
  const savedDiet = DIETS.find((d) => d.id === dietId);
  const hasSaved = Boolean(savedGoal && savedDiet);

  // 备份提醒：距上次导出备份的天数（清缓存即丢数据，超 7 天给醒目提示）
  const lastBackupAt = loadLastBackupAt();
  const backupDays = lastBackupAt ? Math.floor((Date.now() - lastBackupAt) / 86400000) : null;
  const backupStale = backupDays == null || backupDays >= 7;

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
    <div className="space-y-6 sm:space-y-10">
      <HeroSection />

      {/* 今日驾驶舱：今天吃了多少、练没练、打卡没、最近体重 */}
      <TodayPanel />

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

      {/* 宽屏两列并排：左列主流程（选目标 → 选饮食 → 生成），右列侧栏（各功能入口 + 备份） */}
      <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* 左列 · 主流程 */}
        <div className="space-y-6 sm:space-y-10">
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

        {/* 右列 · 侧栏 */}
        <div className="space-y-4 sm:space-y-5">
          {/* 轻盈计划（减脂追踪台） */}
          <Card className="border-primary/30 bg-primary/5 backdrop-blur-xl">
            <CardContent className="flex flex-col gap-3 p-4 sm:p-5">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <TrendingDown className="h-4 w-4 text-primary" />
                  轻盈计划
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  减脂追踪台：定目标体重，每天记体重、打卡，趋势图与达成预估自动算。
                </p>
              </div>
              <Button className="self-start" onClick={() => navigate('/light')}>
                进入轻盈计划
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* 有氧运动（散步等消耗计算） */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="flex flex-col gap-3 p-4 sm:p-5">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <Footprints className="h-4 w-4 text-primary" />
                  有氧运动
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  散步等有氧项目按 kcal = MET × 体重(kg) × 时长(h) 折算消耗，输入体重与时长实时出结果。
                </p>
              </div>
              <Button variant="outline" className="self-start" onClick={() => navigate('/cardio')}>
                进入有氧运动
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* 自重力量（俯卧撑 / 引体向上 / 自重深蹲消耗） */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="flex flex-col gap-3 p-4 sm:p-5">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <Dumbbell className="h-4 w-4 text-primary" />
                  自重力量
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  俯卧撑（含 8 种变式）、引体向上、自重深蹲按 kcal = MET × 体重(kg) × 时长(h) 折算消耗；次数按节奏换算成时长，输入体重与组次实时出结果。
                </p>
              </div>
              <Button variant="outline" className="self-start" onClick={() => navigate('/bodyweight')}>
                进入自重力量
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* 胃部（消化系统修复与 FODMAP 排查） */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="flex flex-col gap-3 p-4 sm:p-5">
              <div>
                <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                  <Soup className="h-4 w-4 text-primary" />
                  胃部
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  3 分练，7 分吃，90 分靠睡眠：肠漏成因、FODMAPs 排查与低 FODMAP 三阶段框架，对照腹胀、异常储水与增肌停滞的真实来源。
                </p>
              </div>
              <Button variant="outline" className="self-start" onClick={() => navigate('/stomach')}>
                进入胃部
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* 数据备份 */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
            <CardContent className="p-5">
              <h3 className="font-display text-lg font-bold text-foreground">数据备份</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                所有数据存在你自己的浏览器里。换浏览器或清理缓存前，先导出备份。
              </p>
              {backupStale ? (
                <p className="mt-2 rounded-md border border-warning/50 bg-warning/5 px-2.5 py-1.5 text-[11px] leading-relaxed text-warning">
                  {backupDays == null
                    ? '还没导出过备份：清一次浏览器缓存数据就全没了，建议现在就导出一份。'
                    : `距上次备份已 ${backupDays} 天：数据越攒越多，建议尽快再导出一份。`}
                </p>
              ) : (
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {backupDays === 0 ? '今天已备份过，数据是新的。' : `距上次备份 ${backupDays} 天。`}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" onClick={handleExport}>
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  导出备份
                </Button>
                <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                  <Upload className="mr-1.5 h-3.5 w-3.5" />
                  导入恢复
                </Button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleImport}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
