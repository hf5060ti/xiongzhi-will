// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  Layers,
  ListChecks,
  Quote,
  RefreshCw,
  ShieldAlert,
  Target,
  UserCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { PLAN_TEMPLATES, type IPlanTemplate } from '@/data/plan-templates';
import { cn } from '@/lib/utils';

/** 动作名跳动作百科搜索（复用全站 ?q= 机制，搜索词用中文名） */
function ExerciseLink({ name }: { name: string }) {
  return (
    <Link
      to={`/library?q=${encodeURIComponent(name)}`}
      className="font-medium text-foreground underline decoration-primary/40 decoration-dotted underline-offset-4 transition-colors hover:text-primary"
      title={`在动作百科搜索「${name}」`}
    >
      {name}
    </Link>
  );
}

function TemplateCard({
  tpl,
  open,
  onToggle,
}: {
  tpl: IPlanTemplate;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Card
      className={cn(
        'overflow-hidden border-border/70 transition-colors',
        open && 'border-primary/40',
      )}
    >
      {/* 卡片头部：点击展开 / 收起 */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 p-4 text-left sm:p-5"
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
              <Layers className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <h3 className="font-display text-lg font-extrabold tracking-wide text-foreground">
              {tpl.name}
            </h3>
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              {tpl.en}
            </Badge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{tpl.tagline}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <UserCheck className="h-3 w-3 text-primary" />
              {tpl.audience}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <Badge variant="secondary" className="text-[10px]">{tpl.frequency}</Badge>
            <Badge variant="secondary" className="text-[10px]">{tpl.split}</Badge>
          </div>
        </div>
        <ChevronDown
          className={cn(
            'mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform',
            open && 'rotate-180 text-primary',
          )}
        />
      </button>

      {/* 展开内容 */}
      {open && (
        <CardContent className="space-y-4 border-t border-border px-4 pb-5 pt-4 sm:px-5">
          {/* 每周安排 */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <ListChecks className="h-4 w-4 text-primary" />
              每周安排
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2">
              {tpl.weekly.map((d) => (
                <div
                  key={d.day}
                  className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-2.5"
                >
                  <span className="shrink-0 font-display text-xs font-bold text-primary">
                    {d.day}
                  </span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    <b className="text-foreground">{d.focus}：</b>
                    {d.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 动作清单 */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
              <Target className="h-4 w-4 text-primary" />
              动作清单（点动作名可查动作百科）
            </p>
            <div className="space-y-1.5">
              {tpl.blocks.map((b, i) => (
                <div
                  key={`${b.name}-${i}`}
                  className="rounded-md border border-border bg-card p-2.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                    <span className="inline-flex items-center gap-1.5 text-sm">
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-primary/15 text-[10px] font-bold text-primary">
                        {i + 1}
                      </span>
                      <ExerciseLink name={b.name} />
                    </span>
                    <span className="text-xs font-medium text-primary">{b.set}</span>
                  </div>
                  {b.note && (
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{b.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 执行要点 + 进阶法则 */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <ListChecks className="h-4 w-4 text-primary" />
                执行要点
              </p>
              <ul className="mt-2 space-y-1.5">
                {tpl.points.map((p) => (
                  <li key={p} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <RefreshCw className="h-4 w-4 text-primary" />
                进阶法则
              </p>
              <ul className="mt-2 space-y-1.5">
                {tpl.progression.map((p) => (
                  <li key={p} className="flex gap-2 text-xs leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 来源 */}
          <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
            <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
            {tpl.source}
          </p>
        </CardContent>
      )}
    </Card>
  );
}

export default function PlanTemplates() {
  const [openId, setOpenId] = useState<string | null>(PLAN_TEMPLATES[0]?.id ?? null);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
          <Layers className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-wide text-foreground sm:text-3xl">
            经典计划模板
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            8 套经过长期检验的成熟分化路线，与上方按目标生成的方案互补：选一套适合你时间与器械的，直接照着练。
          </p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {PLAN_TEMPLATES.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            tpl={tpl}
            open={openId === tpl.id}
            onToggle={() => setOpenId((cur) => (cur === tpl.id ? null : tpl.id))}
          />
        ))}
      </div>

      {/* 免责声明：沿用全站惯例 */}
      <p className="flex items-start gap-1.5 rounded-md border border-amber-500/25 bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-700 dark:text-amber-300">
        <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          以上计划模板整理自公开健身资料，仅作训练参考，不构成医疗建议。重量、次数与分组按你当前能力取，
          动作变形、关节刺痛或头晕恶心时立即停止；糖尿病及相关疾病人群、孕妇、老年人、大病初愈者优先遵从医嘱。
          本站只提供健康自然的健身方式，不提供任何极端和药物，并请遵守当地法律法规。
        </span>
      </p>
    </section>
  );
}
