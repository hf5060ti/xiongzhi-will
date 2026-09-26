import { useMemo, useState } from 'react';
import { CalendarRange, ChevronDown, Coffee, Dumbbell, Info, PlayCircle, ShieldAlert, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GOALS } from '@/data/goals';
import { buildWeekTraining, restFor, type DayTraining } from '@/lib/training-plan';
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
  const [restOpen, setRestOpen] = useState(false);

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
                  <div className="mb-1 flex flex-wrap items-center gap-1.5">
                    <p className="text-[11px] font-medium text-primary/90">{m.set.replace(/[，,]?\s*组间歇\s*\d+\s*s/g, '')}</p>
                    {(() => {
                      const r = restFor(m.name);
                      return (
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-medium',
                            r.kind === 'compound'
                              ? 'border-primary/40 bg-primary/10 text-primary'
                              : 'border-border bg-muted/40 text-muted-foreground',
                          )}
                          title="自然训练者需充分恢复磷酸原系统，避免下一组在疲劳状态下开始"
                        >
                          <Coffee className="h-3 w-3" />
                          休息 {r.range}
                        </span>
                      );
                    })()}
                  </div>
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

            {/* 为什么复合动作要休 3–5 分钟：可展开说明 */}
            <div className="rounded-md border border-border bg-muted/20">
              <button
                type="button"
                onClick={() => setRestOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-2 p-2.5 text-left text-[11px] font-medium text-foreground"
              >
                <span className="flex items-center gap-1.5">
                  <Coffee className="h-3.5 w-3.5 text-primary" />
                  为什么复合动作要休 3–5 分钟，而不是 60 秒？
                </span>
                <ChevronDown className={cn('h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform', restOpen && 'rotate-180')} />
              </button>
              {restOpen && (
                <div className="space-y-1.5 border-t border-border px-2.5 py-2 text-[11px] leading-relaxed text-muted-foreground">
                  <p>
                    <b className="text-foreground">这不是"为休息而休息"。</b>自然训练者（无药物）恢复磷酸原系统、清除组间乳酸、让中枢神经回稳，
                    在大重量复合动作上普遍需要 3–5 分钟；少于这个时间，下一组往往是"带着疲劳硬做"——重量掉、动作变形、力还没发够就做完了，
                    神经和肌肉都没受到该有的刺激。
                  </p>
                  <p>
                    <b className="text-foreground">短休息（60 秒）</b>更适合孤立小动作和泵感训练，用代谢压力刺激局部；
                    但用在卧推、深蹲、硬拉这种神经负荷大的动作上，等于自废重量。
                  </p>
                  <p>
                    标准是：<b className="text-foreground">下一组要在接近上一组的力量状态下开始</b>，而不是"按表到点就练"。喘匀了、心率回落、神经不紧了，再开始下一组——通常就是 3–5 分钟。
                  </p>
                </div>
              )}
            </div>
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
