// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck2, Dumbbell, Scale, UtensilsCrossed } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  hasTrainingOn,
  loadDailyLog,
  loadLightCheckins,
  loadLightEntries,
  loadLightTarget,
  loadSplit,
  loadTrainingLogs,
} from '@/lib/store';
import { getDailyTargets } from '@/lib/nutrition-targets';
import { getTodayRecommendation } from '@/lib/today-recommendation';
import { cn } from '@/lib/utils';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const CHECKIN_LABELS = [
  { key: 'diet', label: '饮食' },
  { key: 'training', label: '训练' },
  { key: 'sleep', label: '睡眠' },
] as const;

/** 首页「今日」驾驶舱：今天该练什么、吃了多少、打卡没、体重趋势，一屏聚合 */
export default function TodayPanel() {
  const today = todayStr();

  const entries = loadDailyLog();
  const totals = entries.reduce(
    (acc, e) => ({ kcal: acc.kcal + e.kcal, protein: acc.protein + e.protein }),
    { kcal: 0, protein: 0 },
  );
  const targets = getDailyTargets();

  const trainingLogs = loadTrainingLogs().filter((l) => l.date === today);
  const trainedToday = hasTrainingOn(today);
  const todaySets = trainingLogs.reduce((s, l) => s + l.exercises.reduce((n, ex) => n + ex.sets.length, 0), 0);
  const todayMoves = trainingLogs.reduce((s, l) => s + l.exercises.length, 0);

  const checkins = loadLightCheckins()[today] ?? {};
  // 当日已有训练记录时，训练打卡项自动视为完成（与轻盈计划口径一致）
  const isDone = (key: string) => (key === 'training' ? checkins.training || trainedToday : Boolean(checkins[key]));
  const displayDone = CHECKIN_LABELS.filter((c) => isDone(c.key)).length;

  const lightEntries = loadLightEntries();
  const latestWeight = lightEntries.length > 0 ? lightEntries[lightEntries.length - 1] : null;
  const prevWeight = lightEntries.length > 1 ? lightEntries[lightEntries.length - 2] : null;
  const lightTarget = loadLightTarget();

  // 今日训练建议：根据分化方案 + 最近训练记录
  const split = loadSplit();
  const allLogs = loadTrainingLogs();
  const lastLog = allLogs.length > 0 ? allLogs[allLogs.length - 1] : null;
  const lastLogDate = lastLog?.date ?? null;
  const lastDayLabel = lastLog?.dayLabel ?? null;
  const daysSinceLast = lastLogDate
    ? Math.round((Date.now() - new Date(lastLogDate + 'T00:00:00').getTime()) / 86400000)
    : 99;
  const recommendation = getTodayRecommendation(split, lastDayLabel, trainedToday ? 0 : daysSinceLast);

  // 减载周提醒：最近7天训练天数
  const recent7 = allLogs.filter((l) => {
    const d = Math.round((Date.now() - new Date(l.date + 'T00:00:00').getTime()) / 86400000);
    return d >= 0 && d <= 6;
  }).length;
  const needsDeload = recent7 >= 6;

  // 有任何追踪数据才显示驾驶舱，避免新用户看到一排空卡片
  const hasAnyData =
    entries.length > 0 || trainingLogs.length > 0 || lightEntries.length > 0 || lightTarget != null || displayDone > 0;
  if (!hasAnyData) return null;

  const kcalPct = targets.kcal > 0 ? Math.min(100, Math.round((totals.kcal / targets.kcal) * 100)) : 0;
  const proteinPct = targets.protein > 0 ? Math.min(100, Math.round((totals.protein / targets.protein) * 100)) : 0;
  const weightDelta =
    latestWeight && prevWeight ? Math.round((latestWeight.weight - prevWeight.weight) * 10) / 10 : null;

  return (
    <Card className="border-primary/30 bg-primary/5 backdrop-blur-xl">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <CalendarCheck2 className="h-4 w-4 text-primary" />
            今日概览
          </h3>
          <p className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {/* 今日饮食 */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <UtensilsCrossed className="h-3.5 w-3.5 text-primary" />
              今日饮食
            </p>
            {entries.length > 0 ? (
              <>
                <p className="mt-1.5 font-display text-xl font-bold text-foreground">
                  {Math.round(totals.kcal)}
                  <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                    / {targets.kcal > 0 ? targets.kcal : '—'} kcal
                  </span>
                </p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted/40">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${kcalPct}%` }} />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  蛋白 {Math.round(totals.protein)}g{targets.protein > 0 ? ` / ${targets.protein}g` : ''} · {entries.length} 条记录
                </p>
              </>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground">今天还没记录饮食</p>
            )}
            <Link to="/nutrition" className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
              去记录 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* 今日训练 */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Dumbbell className="h-3.5 w-3.5 text-primary" />
              今日训练
            </p>
            {trainedToday ? (
              <>
                <p className="mt-1.5 font-display text-xl font-bold text-primary">已练 ✓</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {todayMoves > 0 ? `${todayMoves} 个动作 · ${todaySets} 组` : '当天有训练记录'}
                </p>
              </>
            ) : (
              <>
                <p className="mt-1.5 font-display text-xl font-bold text-foreground">
                  {recommendation.isRest ? '休息日' : recommendation.dayTitle}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {recommendation.muscles || recommendation.message}
                </p>
                {/* 上次训练提醒：让用户一眼看到上次练了什么 */}
                {lastLog && !recommendation.isRest && (
                  <p className="mt-1.5 border-t border-border/40 pt-1.5 text-[11px] text-muted-foreground">
                    <span className="font-medium text-foreground">上次练：</span>
                    {lastDayLabel ? `${lastDayLabel} · ` : ''}
                    {lastLog.exercises.slice(0, 3).map((e) => e.name).join('、')}
                    {lastLog.exercises.length > 3 ? ` 等${lastLog.exercises.length}个动作` : ''}
                    <span className="ml-1 opacity-70">
                      （{daysSinceLast === 0 ? '今天' : `${daysSinceLast}天前`}）
                    </span>
                  </p>
                )}
              </>
            )}
            <Link to="/training-logs" className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
              {trainedToday ? '查看记录' : '去训练'} <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* 今日打卡 */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <CalendarCheck2 className="h-3.5 w-3.5 text-primary" />
              今日打卡
            </p>
            <p className="mt-1.5 font-display text-xl font-bold text-foreground">
              {displayDone}
              <span className="ml-1 text-[10px] font-normal text-muted-foreground">/ {CHECKIN_LABELS.length} 项</span>
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {CHECKIN_LABELS.map((c) => {
                const done = c.key === 'training' ? checkins.training || trainedToday : Boolean(checkins[c.key]);
                return (
                  <span
                    key={c.key}
                    className={cn(
                      'rounded-full border px-1.5 py-0.5 text-[10px]',
                      done ? 'border-primary/50 bg-primary/15 text-primary' : 'border-border/60 text-muted-foreground',
                    )}
                  >
                    {c.label}
                  </span>
                );
              })}
            </div>
            <Link to="/light" className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
              去打卡 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* 体重 */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Scale className="h-3.5 w-3.5 text-primary" />
              最近体重
            </p>
            {latestWeight ? (
              <>
                <p className="mt-1.5 font-display text-xl font-bold text-foreground">
                  {latestWeight.weight}
                  <span className="ml-1 text-[10px] font-normal text-muted-foreground">kg</span>
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {weightDelta != null && weightDelta !== 0
                    ? `较上次 ${weightDelta > 0 ? '+' : ''}${weightDelta} kg · `
                    : '与上次持平 · '}
                  {lightTarget ? `目标 ${lightTarget.targetWeight} kg` : '未设减脂目标'}
                </p>
              </>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground">还没有体重记录</p>
            )}
            <Link to="/light" className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
              去记录 <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* 减载周提醒：最近7天练了6天以上 */}
        {needsDeload && (
          <div className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2.5 text-xs leading-relaxed text-amber-600 dark:text-amber-400">
            <b>⚠ 减载提醒：</b>
            最近7天你训练了 {recent7} 天。自然训练者恢复能力有限，连续高强度训练会导致皮质醇升高、睾酮下降、动作质量变差。建议明天安排主动恢复（散步/拉伸/完全休息），下一周训练量减到 50-60%，让身体超量恢复。
          </div>
        )}
      </CardContent>
    </Card>
  );
}
