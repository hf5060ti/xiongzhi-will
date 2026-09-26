import { useMemo, useState } from 'react';
import { CalendarRange, Dumbbell, Info, PlayCircle, ShieldAlert, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GOALS } from '@/data/goals';
import { buildWeekTraining, type DayTraining } from '@/lib/training-plan';
import { loadGoalId, loadSplit, loadPyramid, type SplitType, type PyramidType } from '@/lib/store';
import { LEVEL_LABEL } from '@/lib/body-math';
import { cn } from '@/lib/utils';

const SPLIT_CHOICES: { id: SplitType; name: string }[] = [
  { id: 'full-body', name: '二分化' },
  { id: 'push-pull-legs', name: '三分化' },
  { id: 'ppl-upper-lower', name: '四分化·推拉上下' },
  { id: 'upper-lower', name: '四分化·上下' },
  { id: 'bro-split', name: '五分化' },
];

const PYRAMID_CHOICES: { id: PyramidType; name: string }[] = [
  { id: 'reverse', name: '倒金字塔' },
  { id: 'straight', name: '正金字塔' },
  { id: 'double', name: '双金字塔' },
  { id: 'russian', name: '俄式套装' },
];

export default function WeekTrainingGenerator() {
  const [split, setSplit] = useState<SplitType>(loadSplit());
  const [pyramid, setPyramid] = useState<PyramidType>(loadPyramid());
  const [day, setDay] = useState(0);

  const goal = useMemo(() => {
    const id = loadGoalId();
    return GOALS.find((g) => g.id === id) ?? GOALS[0];
  }, []);

  const week = useMemo(() => buildWeekTraining(goal, split, pyramid, 'beginner'), [goal, split, pyramid]);
  const cur: DayTraining = week.days[day] ?? week.days[0];

  const onSplit = (s: SplitType) => setSplit(s);
  const onPyramid = (p: PyramidType) => setPyramid(p);

  return (
    <Card className="overflow-hidden border-border/70">
      <CardContent className="p-4 sm:p-5">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <CalendarRange className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-extrabold text-foreground">本周训练计划</h2>
          <Badge variant="outline" className="text-[11px]">{week.splitName}</Badge>
          <Badge variant="secondary" className="text-[11px]">{goal.name}</Badge>
        </div>
        <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground">
          按你的训练目标自动生成 7 天排布：每天练哪些部位、做哪些动作、组次怎么安排，动作带视频链接可直接点开学。
          分化与强度方式随时可改，下方计划会跟着变——动作本身不变，变的只是哪一天练什么。
        </p>

        {/* 分化 + 金字塔 快捷选择 */}
        <div className="mb-3 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-foreground">分化</span>
            {SPLIT_CHOICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSplit(s.id)}
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-[11px] transition-colors',
                  s.id === split
                    ? 'border-primary bg-primary/15 font-semibold text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:bg-accent',
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-foreground">强度</span>
            {PYRAMID_CHOICES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onPyramid(p.id)}
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-[11px] transition-colors',
                  p.id === pyramid
                    ? 'border-primary bg-primary/15 font-semibold text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:bg-accent',
                )}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* 7 天选择 */}
        <div className="mb-3 grid grid-cols-7 gap-1.5">
          {week.days.map((d, i) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setDay(i)}
              className={cn(
                'rounded-lg border px-1 py-2 text-center transition-colors',
                i === day
                  ? 'border-primary bg-primary/15 text-foreground shadow-sm'
                  : 'border-border bg-card/40 text-muted-foreground hover:bg-card/80',
              )}
            >
              <span className="block text-[11px] font-semibold">{d.label}</span>
              <span className={cn('mt-0.5 block text-[9px]', d.isTrainDay ? 'text-primary' : 'text-muted-foreground')}>
                {d.isTrainDay ? '训练日' : '休息日'}
              </span>
            </button>
          ))}
        </div>

        {/* 当天详情 */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge className={cn('text-[11px]', !cur.isTrainDay && 'bg-muted text-muted-foreground')}>
              {cur.label} · {cur.isTrainDay ? cur.title : '休息日'}
            </Badge>
            {cur.isTrainDay && <Badge variant="secondary" className="text-[11px]">{cur.muscles}</Badge>}
          </div>

          {!cur.isTrainDay ? (
            <p className="flex items-start gap-1.5 rounded-md border border-border bg-muted/20 p-3 text-[11px] leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              休息日不等于躺平：散步、拉伸、呼吸训练都算主动恢复；练一休一的好处是给中枢神经和关节肌腱留足修复时间，肌肉在休息时生长。
              睡眠尽量保证 8–9 小时（因人而异），熬夜会升高皮质醇、压制雄性激素，直接影响训练效果。
            </p>
          ) : (
            <div className="space-y-2">
              {cur.movements.map((m, i) => (
                <div key={`${m.name}-${i}`} className="rounded-lg border border-border bg-muted/20 p-3">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-1.5">
                    <p className="text-sm font-semibold text-foreground">
                      <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded bg-primary/15 text-[11px] font-bold text-primary">
                        {i + 1}
                      </span>
                      {m.name}
                    </p>
                    {m.videoUrl && (
                      <a
                        href={m.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[11px] text-primary hover:underline"
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        视频演示
                      </a>
                    )}
                  </div>
                  <p className="mb-1 text-[11px] font-medium text-primary/90">{m.set}</p>
                  {m.tip && <p className="text-[11px] leading-relaxed text-muted-foreground">{m.tip}</p>}
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <p className="flex items-start gap-1.5 rounded-md border border-primary/20 bg-primary/5 p-2.5 text-[11px] leading-relaxed text-foreground/85">
              <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                <b className="text-foreground">强度策略：</b>
                {week.pyramidNote}
              </span>
            </p>
            <p className="flex items-start gap-1.5 rounded-md border border-primary/20 bg-primary/5 p-2.5 text-[11px] leading-relaxed text-foreground/85">
              <Dumbbell className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                <b className="text-foreground">容量参考（{LEVEL_LABEL.beginner}起步）：</b>
                {week.levelNote}
              </span>
            </p>
          </div>

          <p className="flex items-start gap-1.5 rounded-md border border-amber-500/25 bg-amber-500/10 p-2.5 text-[11px] leading-relaxed text-amber-700 dark:text-amber-300">
            <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>
              在安全的范围内去运动：单次训练建议控制在 70 分钟左右（超过多为垃圾容量，只影响恢复；长跑等耐力有氧除外），一天两练可以但不建议天天如此，以恢复为准。
              糖尿病及有相关疾病人群、孕妇、老年人、大病初愈者优先遵从医嘱。本站只提供健康自然的健身方式，不提供任何极端和药物，并请遵守当地的法律法规。
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
