import { CalendarClock, LayoutGrid, ShieldAlert, TrendingUp, Clock, Droplets, Brain, Images, ClipboardList } from 'lucide-react';
import type { IGoal } from '@/data/goals';
import { BASE } from '@/lib/base';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface TrainingSectionProps {
  goal: IGoal;
}

export default function TrainingSection({ goal }: TrainingSectionProps) {
  const Icon = goal.icon;
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
          <Icon className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-3xl font-extrabold tracking-wide text-foreground">
              {goal.name}
            </h2>
            <Badge variant="outline" className="uppercase tracking-wider">
              {goal.en}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{goal.tagline}</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-foreground/85">{goal.desc}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <CalendarClock className="h-4 w-4 text-primary" />
              训练频率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-foreground/80">{goal.frequency}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <LayoutGrid className="h-4 w-4 text-primary" />
              分化方式
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm text-foreground/80">{goal.split}</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">每周安排</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2.5">
          {goal.workouts.map((w) => (
            <div
              key={w.title}
              className="flex flex-col gap-1 rounded-md border border-border bg-muted/40 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-display text-base font-bold tracking-wide text-foreground">
                {w.title}
              </span>
              <span className="text-sm text-muted-foreground">{w.detail}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {goal.plans && goal.plans.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Images className="h-4 w-4 text-primary" />
              专项计划图
            </CardTitle>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              焚诀原图按部位挂图，点开可看大图；下方「按部位训练计划」为公开资料整理的组次参数，两者并存。
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
              {goal.plans.map((p) => (
                <a
                  key={p.part}
                  href={`${BASE}images/${p.image}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-lg border border-border bg-muted/40 transition-colors hover:border-primary/40"
                >
                  <span className="flex aspect-[3/4] items-center justify-center overflow-hidden bg-muted/60">
                    <img
                      src={`${BASE}images/${p.image}`}
                      alt={`${p.part}专项计划图`}
                      loading="lazy"
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </span>
                  <span className="flex items-center justify-between gap-2 px-3 py-2">
                    <span className="font-display text-sm font-bold tracking-wide text-foreground">
                      {p.part}
                    </span>
                    <span className="text-xs text-muted-foreground transition-colors group-hover:text-primary">
                      查看大图
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {goal.partPlans && goal.partPlans.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <ClipboardList className="h-4 w-4 text-primary" />
              按部位训练计划
            </CardTitle>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              与上方焚诀计划图并存、互为参考：图是原图，这里是按公开经典方案整理的组次参数；按自己的器械与恢复情况取用，冲突时以身体反馈为准。
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {goal.partPlans.map((p) => (
              <div key={p.part} className="rounded-lg border border-border bg-muted/40 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-base font-bold tracking-wide text-foreground">
                    {p.part}
                  </span>
                  <span className="text-xs text-muted-foreground">来源：{p.source}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.frequency}</p>
                <div className="mt-2 space-y-1.5">
                  {p.blocks.map((b) => (
                    <div key={b.name} className="rounded-md border border-border bg-card p-2.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                        <span className="text-sm font-medium text-foreground">{b.name}</span>
                        <span className="text-xs font-medium text-primary">{b.set}</span>
                      </div>
                      {b.note && (
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{b.note}</p>
                      )}
                    </div>
                  ))}
                </div>
                <ul className="mt-2 space-y-1.5">
                  {p.points.map((point) => (
                    <li key={point} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-xs leading-relaxed text-muted-foreground">
              计划参数整理自公开经典方案的通用版本：StrongLifts 5×5、Push / Pull / Legs 分化、Wendler 5/3/1、German Volume Training (GVT 10×10)、PHUL。动作可依器械与关节状况替换，但建议保留原计划的组次结构与频率逻辑。
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">核心动作参数</CardTitle>
          <p className="mt-1 flex items-start gap-1.5 text-xs leading-relaxed text-primary">
            <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            在安全的范围内去运动：以下动作均为参考，重量与次数按自己当前能力取，动作变形、关节刺痛或头晕恶心时立即停止；新重量先做 1–2 组热身，不冲超出技术水平的极限。
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            每个动作的「优点 / 缺点 / 训练要点 / 适合人群」为通用训练常识与公开资料整理，用于挑选与替换动作时参考。
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">动作</TableHead>
                <TableHead className="whitespace-nowrap">组数 × 次数 / 间歇</TableHead>
                <TableHead className="whitespace-nowrap">演示视频</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {goal.movements.map((m) => (
                <TableRow key={m.name}>
                  <TableCell className="whitespace-nowrap align-top font-medium text-foreground">
                    {m.name}
                    {m.tip && (
                      <span className="mt-1 block whitespace-normal text-xs font-normal leading-snug text-muted-foreground">
                        <b className="font-semibold text-foreground/80">动作要点：</b>
                        {m.tip}
                      </span>
                    )}
                    {m.pros && m.pros.length > 0 && (
                      <span className="mt-1 block whitespace-normal text-xs font-normal leading-snug text-primary">
                        <b className="font-semibold">优点：</b>
                        {m.pros.map((s) => s.replace(/[。；]$/, '')).join('；')}。
                      </span>
                    )}
                    {m.cons && m.cons.length > 0 && (
                      <span className="mt-1 block whitespace-normal text-xs font-normal leading-snug text-muted-foreground">
                        <b className="font-semibold text-foreground/80">缺点：</b>
                        {m.cons.map((s) => s.replace(/[。；]$/, '')).join('；')}。
                      </span>
                    )}
                    {m.focus && m.focus.length > 0 && (
                      <span className="mt-1 block whitespace-normal text-xs font-normal leading-snug text-muted-foreground">
                        <b className="font-semibold text-foreground/80">训练要点：</b>
                        {m.focus.map((s) => s.replace(/[。；]$/, '')).join('；')}。
                      </span>
                    )}
                    {m.suitable && (
                      <span className="mt-1 block whitespace-normal text-xs font-normal leading-snug text-muted-foreground">
                        <b className="font-semibold text-foreground/80">适合人群：</b>
                        {m.suitable}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{m.set}</TableCell>
                  <TableCell>
                    {m.videoUrl ? (
                      <a
                        href={m.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        观看
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            进步法则
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{goal.progression}</p>
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShieldAlert className="h-4 w-4 text-primary" />
            特别提醒
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{goal.note}</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">训练时机与组次策略</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3 rounded-md border border-border bg-muted/40 p-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <b className="text-foreground">饭后训练：</b>餐后 1–2 小时开练，血糖稳定、力量与神经募集表现最好。
              主项大重量尽量安排在这个窗口，状态差别硬冲重量。
            </p>
          </div>
          <div className="flex gap-3 rounded-md border border-border bg-muted/40 p-3">
            <Droplets className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                <b className="text-foreground">空腹训练（晨练 / 久未进食）：</b>
                无论选哪种运动，空腹都可练，但<b className="text-foreground">先分强度</b>再决定补什么。
              </p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <b className="text-foreground">力量 / 高强度训练</b>（深蹲、卧推、硬拉、斗腕、HIIT、拳击、跳绳间歇）：
                    开练前先喝 <b className="text-foreground">200–300ml 淡盐水</b>（约 1g 盐兑 200–300ml 常温水），
                    防止低钠抽筋、维持血压。强度拉满时再加<b className="text-foreground">一包榨菜</b>
                    （快速补钠）或<b className="text-foreground">一小口蛋白质</b>（一个水煮蛋蛋白 / 200ml 牛奶），
                    把空腹状态下的肌肉分解压到最小。
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    <b className="text-foreground">低强度有氧</b>（快走、慢节奏慢跑、慢跳绳、椭圆机 30 分钟以内）：
                    补水可忽略，正常喝白水即可，不必刻意淡盐水。
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>
                    大重量神经募集（1–5RM）尽量留到饭后 1–2 小时再做；空腹状态下冲 PR 风险高。
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3 rounded-md border border-primary/30 bg-primary/5 p-3">
            <Brain className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <b className="text-foreground">神经募集训练：</b>大重量低次数（约 1–5 次，85% 以上 1RM），
              <b className="text-foreground">3–5 组、每组 1–5 次</b>，组间休息 2–3 分钟，
              放在训练最开头、精力最充沛时；次数法与 1RM 换算见「身体数据」页。
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
