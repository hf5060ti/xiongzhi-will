import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Soup,
  Microscope,
  ShieldAlert,
  TrendingDown,
  FlaskConical,
  ClipboardList,
  Timer,
  Info,
  Droplets,
} from 'lucide-react';
import {
  GUT_BARRIER_MECHANISMS,
  GUT_TRIGGERS,
  GUT_IMPACTS,
  FODMAP_INTRO,
  FODMAP_GROUPS,
  FODMAP_MECHANISMS,
  LOW_FODMAP_PHASES,
  LOW_FODMAP_POSITION,
  FODMAP_MYTHS,
  GUT_ACTION_LIST,
  GUT_DISCLAIMER,
  STOOL_TYPES,
  type PointCard,
} from '@/data/stomach';

export default function StomachPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b border-border pb-4 sm:pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Gut · 胃部
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          3 分练，7 分吃，90 分靠睡眠
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          练得够狠、吃得够「干净」，却还是腹胀、疲惫、肌肉停滞——问题往往不在训练计划，而在消化道屏障与代谢底盘。
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          本页内容依据 ALEX 律师《健身人群肠漏成因与影响》《FODMAPs 健身饮食排查表格》两份资料整理。
        </p>
      </header>

      {/* 机制：肠道通透性是怎么被打开的 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<Microscope className="h-4 w-4" />}
          title="屏障是怎么被打开的"
          desc="肠道通透性增加的底层微观生理机制"
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
          {GUT_BARRIER_MECHANISMS.map((c) => (
            <PointCardView key={c.title} card={c} />
          ))}
        </div>
      </section>

      {/* 诱因 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<ShieldAlert className="h-4 w-4" />}
          title="健身人群的四类核心诱因"
          desc="这些习惯在备赛与增肌期非常常见"
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-2">
          {GUT_TRIGGERS.map((c) => (
            <PointCardView key={c.title} card={c} />
          ))}
        </div>
      </section>

      {/* 影响 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<TrendingDown className="h-4 w-4" />}
          title="肠漏对形体与运动表现的连锁打击"
          desc="从炎症、皮肤、神经递质到食物耐受"
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-2">
          {GUT_IMPACTS.map((c) => (
            <PointCardView key={c.title} card={c} />
          ))}
        </div>
      </section>

      {/* FODMAP 构成 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<FlaskConical className="h-4 w-4" />}
          title="FODMAPs：健身饮食排查表"
          desc={FODMAP_INTRO}
        />
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-2 sm:p-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">类别</TableHead>
                    <TableHead className="whitespace-nowrap">具体成分</TableHead>
                    <TableHead className="whitespace-nowrap">健身饮食中的常见来源</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FODMAP_GROUPS.map((g) => (
                    <TableRow key={g.category}>
                      <TableCell className="whitespace-nowrap align-top">
                        <span className="block text-xs font-medium text-foreground">{g.cn}</span>
                        <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                          {g.category}
                        </span>
                      </TableCell>
                      <TableCell className="align-top text-xs text-foreground/90">{g.items}</TableCell>
                      <TableCell className="align-top text-xs text-muted-foreground">{g.sources}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FODMAP 负面影响机制 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<Soup className="h-4 w-4" />}
          title="高 FODMAP 如何拖累训练"
          desc="四类负面影响机制"
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-2">
          {FODMAP_MECHANISMS.map((c) => (
            <PointCardView key={c.title} card={c} />
          ))}
        </div>
      </section>

      {/* 三阶段排查 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<Timer className="h-4 w-4" />}
          title="低 FODMAP 饮食的三阶段排查框架"
          desc={LOW_FODMAP_POSITION}
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
          {LOW_FODMAP_PHASES.map((p) => (
            <Card key={p.step} className="border-border/50 bg-card/60 backdrop-blur-xl">
              <CardContent className="p-3 sm:p-5">
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                    {p.step}
                  </span>
                  <h3 className="font-display text-sm font-bold leading-tight text-foreground sm:text-base">
                    {p.name}
                  </h3>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  <b className="text-foreground/90">周期：</b>
                  {p.duration}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-muted-foreground">
                  <b className="text-foreground/90">操作原则：</b>
                  {p.principle}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-muted-foreground">
                  <b className="text-foreground/90">核心目的：</b>
                  {p.goal}
                </p>
                {p.warning && (
                  <p className="mt-2 rounded-md border border-destructive/30 bg-destructive/10 px-2 py-1.5 text-[11px] leading-snug text-foreground/90">
                    警示：{p.warning}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 认知误区 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<Info className="h-4 w-4" />}
          title="两个认知盲区"
          desc="评估消化道问题时最容易搞错的两件事"
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
          {FODMAP_MYTHS.map((c) => (
            <PointCardView key={c.title} card={c} />
          ))}
        </div>
      </section>

      {/* 排泄观察 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<Droplets className="h-4 w-4" />}
          title="排泄观察：消化道健康的晴雨表"
          desc="不同形态对应不同信号，文明表述供自我观察参考，持续异常请就医"
        />
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
          {STOOL_TYPES.map((c) => (
            <PointCardView key={c.title} card={c} />
          ))}
        </div>
      </section>

      {/* 落地清单 */}
      <section className="space-y-3">
        <SectionTitle
          icon={<ClipboardList className="h-4 w-4" />}
          title="落地清单"
          desc="由上述结论直接对应的五条可执行动作"
        />
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-4 sm:p-6">
            <ol className="space-y-2.5">
              {GUT_ACTION_LIST.map((a, i) => (
                <li key={a.title} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>
                    <b className="text-sm text-foreground">{a.title}</b>
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                      {a.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* 免责声明 */}
      <Card className="border-border/50 bg-card/40 backdrop-blur-xl">
        <CardContent className="p-4 sm:p-5">
          <h2 className="font-display text-base font-bold text-foreground">免责声明</h2>
          {GUT_DISCLAIMER.map((t) => (
            <p key={t} className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {t}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function SectionTitle({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc?: string;
}) {
  return (
    <div>
      <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground sm:text-xl">
        <span className="shrink-0 text-primary">{icon}</span>
        {title}
      </h2>
      {desc && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>}
    </div>
  );
}

function PointCardView({ card }: { card: PointCard }) {
  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
      <CardContent className="p-3 sm:p-5">
        <h3 className="font-display text-sm font-bold leading-tight text-foreground sm:text-base">
          {card.title}
        </h3>
        <ul className="mt-2 space-y-1">
          {card.points.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-1.5 text-xs leading-snug text-muted-foreground"
            >
              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
              {p}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
