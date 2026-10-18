// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 周训练容量与疲劳看板
 *
 * 把按次记录的训练日志汇总成「周维度」：本周练了多少组、各肌群分布是否均衡、
 * 连续高容量之后该不该安排减载周。
 *
 * 疲劳分是经验模型（容量突增 / 高强度组占比 / 连续训练周数 / 单肌群过量），
 * 只作训练规划参考，不构成医疗建议。
 */
import { useMemo } from 'react';
import { AlertTriangle, CheckCircle2, Gauge, Minus, TrendingDown } from 'lucide-react';
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { buildVolumeReport, MUSCLE_SET_RANGE } from '@/lib/training-volume';
import { getMuscleLabel } from '@/lib/muscle-map';
import { resolveMuscles } from '@/lib/muscle-map';
import type { TrainingLog } from '@/lib/store';

const LEVEL_META = {
  low: { label: '恢复余量充足', color: 'text-emerald-600 dark:text-emerald-400', bar: '#10b981' },
  moderate: { label: '状态正常', color: 'text-sky-600 dark:text-sky-400', bar: '#0ea5e9' },
  high: { label: '疲劳偏高', color: 'text-amber-600 dark:text-amber-400', bar: '#f59e0b' },
  veryHigh: { label: '建议减载', color: 'text-red-600 dark:text-red-400', bar: '#ef4444' },
} as const;

const STATUS_META = {
  low: { label: '偏少', cls: 'border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300' },
  ok: { label: '合理', cls: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
  high: { label: '偏多', cls: 'border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300' },
} as const;

export default function VolumeDashboard({ logs }: { logs: TrainingLog[] }) {
  const report = useMemo(
    () =>
      buildVolumeReport(logs, {
        weeks: 8,
        // 复用全站已有的「动作名 → 肌群」索引；只取主肌群，避免协同肌把组数重复计入
        resolveMuscles: (name) => resolveMuscles(name)?.primary ?? [],
      }),
    [logs],
  );

  const meta = LEVEL_META[report.fatigueLevel];
  const chartData = report.weeks.map((w) => ({
    week: w.weekStart.slice(5).replace('-', '/'),
    sets: w.totalSets,
  }));

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <Gauge className="h-4 w-4 text-primary" />
            周容量与疲劳
          </h3>
          <span className="type-meta text-muted-foreground">
            基线 {report.baselineSets} 组/周 · 本周 {report.recentSets} 组
          </span>
        </div>

        {/* 疲劳分 + 建议 */}
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-border bg-muted/20 p-3">
          <div className="text-center">
            <p className={`font-display text-3xl font-bold leading-none tabular-nums ${meta.color}`}>
              {report.fatigue}
            </p>
            <p className="type-meta mt-1 text-muted-foreground">疲劳分</p>
          </div>
          <div className="min-w-0 flex-1">
            <p className={`flex items-center gap-1.5 text-sm font-semibold ${meta.color}`}>
              {report.fatigueLevel === 'veryHigh' ? (
                <AlertTriangle className="h-3.5 w-3.5" />
              ) : report.fatigueLevel === 'high' ? (
                <TrendingDown className="h-3.5 w-3.5" />
              ) : report.fatigueLevel === 'low' ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <Minus className="h-3.5 w-3.5" />
              )}
              {meta.label} · {report.adviceTitle}
            </p>
            <ul className="mt-1 space-y-0.5">
              {report.adviceDetails.map((d, i) => (
                <li key={i} className="type-meta leading-relaxed text-muted-foreground">
                  · {d}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 近 8 周组数趋势 */}
        {report.weeks.some((w) => w.totalSets > 0) && (
          <div>
            <p className="type-meta mb-1 text-muted-foreground">近 8 周有效组数</p>
            <div className="h-28 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 10 }}
                    stroke="currentColor"
                    className="text-muted-foreground"
                  />
                  <YAxis tick={{ fontSize: 10 }} stroke="currentColor" className="text-muted-foreground" />
                  <Tooltip
                    formatter={(v: number) => [`${v} 组`, '有效组数']}
                    contentStyle={{ fontSize: 12, borderRadius: 6 }}
                  />
                  <Bar dataKey="sets" radius={[3, 3, 0, 0]}>
                    {chartData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i === chartData.length - 1 ? meta.bar : 'hsl(var(--muted-foreground) / 0.35)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 本周肌群分布 */}
        {report.muscleFlags.length > 0 && (
          <div>
            <p className="type-meta mb-1.5 text-muted-foreground">
              本周各肌群组数（合理区间 {MUSCLE_SET_RANGE.low}–{MUSCLE_SET_RANGE.high} 组）
            </p>
            <div className="flex flex-wrap gap-1.5">
              {report.muscleFlags.map((m) => {
                const sm = STATUS_META[m.status];
                return (
                  <Badge key={m.muscle} variant="outline" className={`px-1.5 py-0 text-xs ${sm.cls}`}>
                    {getMuscleLabel(m.muscle)} {m.sets} 组 · {sm.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        <p className="type-meta leading-relaxed text-muted-foreground">
          疲劳分由「本周容量相对基线、≤5 次的大重量组占比、连续训练周数、单肌群是否过量」四项估算，
          用于提示是否需要安排减载周，不能替代身体感受与医学判断。
        </p>
      </CardContent>
    </Card>
  );
}
