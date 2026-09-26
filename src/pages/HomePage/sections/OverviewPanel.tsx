import { Link } from 'react-router-dom';
import { Activity, CalendarRange, Flame, Ruler } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  loadBodyProfile,
  loadMeasurements,
  loadTrainingLogs,
  latestWeightKg,
  MEASURE_META,
  type MeasureKey,
} from '@/lib/store';
import { ACTIVITY_FACTORS, calcBmr, tdee, calcLbm } from '@/lib/body-math';

/** 本周起始日（周一）字符串 YYYY-MM-DD */
function weekStartStr(): string {
  const d = new Date();
  const day = (d.getDay() + 6) % 7; // 周一 = 0
  d.setDate(d.getDate() - day);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** 首页「总体数据」面板：本周训练 / 每日消耗估算 / 当前体重 / 围度趋势，一眼掌握全局状态 */
export default function OverviewPanel() {
  const logs = loadTrainingLogs();
  const profile = loadBodyProfile();
  const measurements = loadMeasurements();
  const weightKg = latestWeightKg();

  // 训练统计
  const ws = weekStartStr();
  const weekDays = new Set(logs.filter((l) => l.date >= ws).map((l) => l.date)).size;
  const totalSessions = logs.length;

  // 每日消耗（Mifflin-St Jeor + 活动系数；与身体数据页口径一致）
  const age = Number(profile.age);
  const height = Number(profile.heightCm);
  const bw = Number(profile.weightKg) > 0 ? Number(profile.weightKg) : weightKg;
  const bodyFat = Number(profile.bodyFatPct);
  const hasBody = age > 0 && height > 0 && bw > 0;
  let bmr = 0;
  let tdeeVal = 0;
  let activityLabel = '';
  if (hasBody) {
    const lbm = bodyFat > 0 ? calcLbm(bw, bodyFat) : bw * 0.85; // 没填体脂时按 15% 估算
    const factor = ACTIVITY_FACTORS.find((a) => a.id === profile.activity)?.value ?? 1.55;
    activityLabel = ACTIVITY_FACTORS.find((a) => a.id === profile.activity)?.label ?? '';
    bmr = Math.round(calcBmr({ sex: profile.sex, age, heightCm: height, weightKg: bw, lbmKg: lbm }).mifflin);
    tdeeVal = Math.round(tdee(bmr, factor));
  }

  // 围度：最近一次 vs 上一次（胸/腰/臂有数据才对比）
  const last = measurements.length > 0 ? measurements[measurements.length - 1] : null;
  const prev = measurements.length > 1 ? measurements[measurements.length - 2] : null;
  const deltas: { key: MeasureKey; delta: number }[] = [];
  if (last && prev) {
    for (const k of ['chest', 'waist', 'arm'] as MeasureKey[]) {
      const a = last.values[k];
      const b = prev.values[k];
      if (a != null && b != null) deltas.push({ key: k, delta: Math.round((a - b) * 10) / 10 });
    }
  }

  // 没有任何追踪数据就不显示，避免新用户看到空卡片
  if (totalSessions === 0 && !hasBody && weightKg <= 0 && measurements.length === 0) return null;

  return (
    <Card className="border-border/60 bg-card/60 backdrop-blur-xl">
      <CardContent className="p-4 sm:p-5">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <Activity className="h-4 w-4 text-primary" />
          我的数据
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">训练总量、每日消耗估算与身体趋势，一屏掌握。</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {/* 本周训练 */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <CalendarRange className="h-3.5 w-3.5 text-primary" />
              本周训练
            </p>
            {totalSessions > 0 ? (
              <>
                <p className="mt-1.5 font-display text-xl font-bold text-foreground">
                  {weekDays}
                  <span className="ml-1 text-[10px] font-normal text-muted-foreground">天</span>
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">累计 {totalSessions} 次训练记录</p>
              </>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground">还没有训练记录</p>
            )}
            <Link to="/training-logs" className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
              去记录 <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* 每日消耗估算 */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-primary" />
              每日消耗估算
            </p>
            {hasBody ? (
              <>
                <p className="mt-1.5 font-display text-xl font-bold text-foreground">
                  {tdeeVal}
                  <span className="ml-1 text-[10px] font-normal text-muted-foreground">kcal/天</span>
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  TDEE（BMR {bmr} × {activityLabel || '活动系数'}）
                </p>
              </>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground">填身高体重年龄即可估算</p>
            )}
            <Link to="/body" className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
              {hasBody ? '调整身体数据' : '去填写'} <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* 当前体重 */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Activity className="h-3.5 w-3.5 text-primary" />
              当前体重
            </p>
            {weightKg > 0 || bw > 0 ? (
              <>
                <p className="mt-1.5 font-display text-xl font-bold text-foreground">
                  {bw > 0 ? bw : weightKg}
                  <span className="ml-1 text-[10px] font-normal text-muted-foreground">kg</span>
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">用于热量与营养估算</p>
              </>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground">还没有体重数据</p>
            )}
            <Link to="/light" className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
              去记录 <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* 围度趋势 */}
          <div className="rounded-xl border border-border/50 bg-background/40 p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Ruler className="h-3.5 w-3.5 text-primary" />
              围度变化
            </p>
            {deltas.length > 0 ? (
              <>
                <p className="mt-1.5 font-display text-xl font-bold text-foreground">
                  {deltas.length}
                  <span className="ml-1 text-[10px] font-normal text-muted-foreground">个部位有记录</span>
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {deltas
                    .map((d) => `${MEASURE_META[d.key].label} ${d.delta > 0 ? '+' : ''}${d.delta}cm`)
                    .join(' · ')}
                </p>
              </>
            ) : (
              <p className="mt-1.5 text-xs text-muted-foreground">还没有围度记录</p>
            )}
            <Link to="/body" className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-primary hover:underline">
              去记录 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
