// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 年度训练日历热力图（GitHub 风格网格：列=周，行=周一~周日）+ 年度汇总 + 连续训练统计。
// 借鉴 openGym 的「年度训练日历」思路，全部用本站自己的数据与算法实现（不复制任何 AGPL 代码）。
import { useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import type { TrainingLog } from '@/lib/store';
import { buildCalendar, heatLevel, weekMonthMarks, type CalendarDay } from '@/lib/calendar-heatmap';
import { cn } from '@/lib/utils';

/** 热度配色：0=未训练，1-4 依次加深（标准 opacity 步长，避免被 tree-shaking） */
function levelClass(level: number): string {
  switch (level) {
    case 1:
      return 'bg-primary/20';
    case 2:
      return 'bg-primary/40';
    case 3:
      return 'bg-primary/60';
    case 4:
      return 'bg-primary/80';
    default:
      return 'bg-muted/40';
  }
}

const WEEKDAY_LABELS = ['一', '', '三', '', '五', '', ''];
const WEEKDAY_FULL = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

function dayTitle(day: CalendarDay): string {
  const wd = WEEKDAY_FULL[day.weekday];
  if (!day.stat) return `${day.dateIso} ${wd} · 未训练`;
  const parts = [`${day.stat.sets} 组`, `${Math.round(day.stat.volume).toLocaleString()} kg·组`];
  if (day.stat.dayLabels.length > 0) parts.push(day.stat.dayLabels.join('/'));
  return `${day.dateIso} ${wd} · ${parts.join(' · ')}`;
}

export function TrainingCalendarHeatmap({ logs }: { logs: TrainingLog[] }) {
  const now = useMemo(() => new Date(), []);
  const currentYear = now.getFullYear();
  const [year, setYear] = useState(currentYear);

  // 可查看的最早年份：取记录里最早的一年（无记录则只有今年）
  const earliestYear = useMemo(() => {
    if (logs.length === 0) return currentYear;
    return logs.reduce((min, l) => Math.min(min, Number(l.date.slice(0, 4)) || currentYear), currentYear);
  }, [logs, currentYear]);

  // 渲染时钳制，防止数据变化后 state 越界
  const viewYear = Math.min(currentYear, Math.max(earliestYear, year));

  const { weeks, summary } = useMemo(() => buildCalendar(logs, viewYear, now), [logs, viewYear, now]);
  const marks = useMemo(() => weekMonthMarks(weeks), [weeks]);

  const [metric, setMetric] = useState<'volume' | 'sets'>('volume');
  const cells = useMemo(() => weeks.flatMap((w) => w.days), [weeks]);
  // 热度基准只统计「本年 + 非未来」的格子（邻年补齐格不计入）
  const maxValue = useMemo(() => {
    let max = 0;
    for (const c of cells) {
      if (!c.inYear || c.isFuture) continue;
      max = Math.max(max, metric === 'volume' ? (c.stat?.volume ?? 0) : (c.stat?.sets ?? 0));
    }
    return Math.max(1, max);
  }, [cells, metric]);

  const stats = [
    { label: '训练天数', value: `${summary.activeDays} 天` },
    { label: '训练次数', value: `${summary.totalSessions} 次` },
    { label: '总容量', value: `${Math.round(summary.totalVolume).toLocaleString()} kg·组` },
    { label: '最长连续', value: `${summary.longestStreak} 天` },
  ];
  if (viewYear === currentYear) {
    stats.push({ label: '当前连续', value: `${summary.currentStreak} 天` });
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5 text-primary" />
            年度训练日历
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={viewYear <= earliestYear}
              onClick={() => setYear(viewYear - 1)}
              aria-label="上一年"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-16 text-center font-display text-sm font-bold text-foreground">{viewYear} 年</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              disabled={viewYear >= currentYear}
              onClick={() => setYear(viewYear + 1)}
              aria-label="下一年"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            {viewYear !== currentYear && (
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={() => setYear(currentYear)}>
                今年
              </Button>
            )}
          </div>
        </div>
        <CardDescription>
          GitHub 风格年度热力图：颜色越深 = 当天练得越多。深灰 = 休整日，空白 = 未到的日子。坚持比强度更重要——先追求格子密，再追求格子深。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 年度汇总 */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="type-meta text-muted-foreground">{s.label}</p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>

        <Tabs value={metric} onValueChange={(v) => setMetric(v as 'volume' | 'sets')}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <TabsList className="grid w-40 grid-cols-2">
              <TabsTrigger value="volume">按容量</TabsTrigger>
              <TabsTrigger value="sets">按组数</TabsTrigger>
            </TabsList>
            {/* 图例 */}
            <p className="flex items-center gap-1 type-meta text-muted-foreground">
              少
              {[0, 1, 2, 3, 4].map((lv) => (
                <span key={lv} className={cn('inline-block h-3 w-3 rounded-sm', levelClass(lv))} />
              ))}
              多
            </p>
          </div>

          <TabsContent value="volume" className="mt-3">
            <CalendarGrid weeks={weeks} marks={marks} metric="volume" maxValue={maxValue} />
            <p className="mt-3 type-meta text-muted-foreground">
              容量 = 重量 × 次数 求和（纯自重日容量为 0，请切到「按组数」查看）。悬停格子看当日明细。
            </p>
          </TabsContent>
          <TabsContent value="sets" className="mt-3">
            <CalendarGrid weeks={weeks} marks={marks} metric="sets" maxValue={maxValue} />
            <p className="mt-3 type-meta text-muted-foreground">
              组数 = 当日全部单组计数（含自重 / 时长组）。自重训练者的勤奋度用这个视图更准。
            </p>
          </TabsContent>
        </Tabs>

        {summary.busiestDay && (
          <p className="flex items-center gap-1.5 type-meta text-muted-foreground">
            <Flame className="h-3.5 w-3.5 text-primary" />
            年内单日最高：{summary.busiestDay.dateIso} · {Math.round(summary.busiestDay.volume).toLocaleString()} kg·组
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function CalendarGrid({
  weeks,
  marks,
  metric,
  maxValue,
}: {
  weeks: ReturnType<typeof buildCalendar>['weeks'];
  marks: (string | null)[];
  metric: 'volume' | 'sets';
  maxValue: number;
}) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="inline-block min-w-full">
        {/* 月份标签行：与网格列同宽对齐 */}
        <div
          className="grid grid-flow-col gap-[3px] pl-6"
          style={{ gridTemplateColumns: `repeat(${weeks.length}, 0.75rem)` }}
          aria-hidden
        >
          {marks.map((m, i) => (
            <div key={i} className="whitespace-nowrap text-[0.6rem] leading-4 text-muted-foreground">
              {m ?? ''}
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {/* 星期标签列 */}
          <div className="grid grid-rows-7 gap-[3px] pt-px" aria-hidden>
            {WEEKDAY_LABELS.map((d, i) => (
              <div key={i} className="h-3 text-[0.6rem] leading-3 text-muted-foreground">
                {d}
              </div>
            ))}
          </div>
          {/* 格子：列=周（grid-flow-col），行=周一~周日 */}
          <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
            {weeks.flatMap((w) =>
              w.days.map((day) => {
                const hidden = !day.inYear || day.isFuture;
                const value = metric === 'volume' ? (day.stat?.volume ?? 0) : (day.stat?.sets ?? 0);
                const level = hidden ? 0 : heatLevel(value, maxValue);
                return (
                  <div
                    key={day.dateIso}
                    title={hidden ? undefined : dayTitle(day)}
                    className={cn(
                      'h-3 w-3 rounded-sm',
                      hidden ? 'invisible' : levelClass(level),
                      day.isToday && 'ring-1 ring-primary',
                    )}
                  />
                );
              }),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
