import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  ArrowRight,
  Award,
  CalendarCheck2,
  Dumbbell,
  Flame,
  Moon,
  Scale,
  Target,
  TrendingDown,
  Trash2,
  UtensilsCrossed,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  hasTrainingOn,
  loadBodyProfile,
  loadLightCheckins,
  loadLightEntries,
  loadLightTarget,
  loadWeightKg,
  saveLightEntries,
  saveLightTarget,
  syncLightWeightToProfile,
  toggleLightCheckin,
  upsertLightEntry,
  type LightCheckinKey,
  type LightEntry,
} from '@/lib/store';
import { cn } from '@/lib/utils';

function todayStr(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function fmtDate(iso: string): string {
  return `${Number(iso.slice(5, 7))}/${Number(iso.slice(8, 10))}`;
}

/** 训练记录覆盖层：当日有训练记录时，把训练项视为已完成（仅用于展示 / 统计，不改写打卡存储） */
function withTrainingAuto(checkins: ReturnType<typeof loadLightCheckins>) {
  const today = todayStr();
  const cur = checkins[today];
  if (cur?.training || !hasTrainingOn(today)) return checkins;
  return { ...checkins, [today]: { ...(cur ?? {}), training: true } };
}

/** 最近连续「三项全部完成」的天数（今天没打完则从昨天往前算） */
function calcStreak(checkins: ReturnType<typeof loadLightCheckins>): number {
  let streak = 0;
  const d = new Date();
  const isPerfect = (iso: string) => {
    const c = checkins[iso];
    return Boolean(c && c.diet && c.training && c.sleep);
  };
  const toIso = (date: Date) => {
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${m}-${day}`;
  };
  // 今天完美则从今天起算，否则从昨天起算（今天还来得及补）
  if (!isPerfect(toIso(d))) d.setDate(d.getDate() - 1);
  while (isPerfect(toIso(d))) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

const CHECKIN_ITEMS: { key: LightCheckinKey; label: string; hint: string; icon: typeof UtensilsCrossed }[] = [
  { key: 'diet', label: '饮食达标', hint: '热量与蛋白都按计划吃', icon: UtensilsCrossed },
  { key: 'training', label: '完成训练', hint: '今天的训练或散步已做', icon: Dumbbell },
  { key: 'sleep', label: '睡够 7 小时', hint: '熬夜升皮质醇，白练', icon: Moon },
];

/** 给每条记录附上 7 天滚动均值（ma），平滑水分波动，看趋势别看单日 */
function withMovingAverage(entries: LightEntry[], win = 7) {
  return entries.map((e, i) => {
    const slice = entries.slice(Math.max(0, i - win + 1), i + 1);
    const ma = slice.reduce((s, x) => s + x.weight, 0) / slice.length;
    return { ...e, ma: Math.round(ma * 100) / 100 };
  });
}

/** 本周战报：近 7 天均重 vs 再前 7 天均重；delta < 0 表示在减 */
function weeklyReport(entries: LightEntry[]): { thisAvg: number; prevAvg: number; delta: number } | null {
  const today = new Date(`${todayStr()}T00:00:00`).getTime();
  const MS = 86400000;
  const avgIn = (fromDays: number, toDays: number) => {
    const xs = entries.filter((e) => {
      const diff = (today - new Date(`${e.date}T00:00:00`).getTime()) / MS;
      return diff >= fromDays && diff < toDays;
    });
    return xs.length > 0 ? xs.reduce((s, e) => s + e.weight, 0) / xs.length : null;
  };
  const thisAvg = avgIn(0, 7);
  const prevAvg = avgIn(7, 14);
  if (thisAvg == null || prevAvg == null) return null;
  return { thisAvg, prevAvg, delta: thisAvg - prevAvg };
}

/** 里程碑：每减 2.5 kg 一个；next 为 null 表示下一步就是终点 */
function milestoneOf(startWeight: number, targetWeight: number, current: number) {
  const STEP = 2.5;
  const done = startWeight - current;
  const hit = Math.max(0, Math.floor(done / STEP));
  const nextW = startWeight - (hit + 1) * STEP;
  if (nextW <= targetWeight) return { hit, next: null as number | null, toNext: 0 };
  return { hit, next: nextW, toNext: current - nextW };
}

/** 近 14 天打卡热力：3 项全完成 = 完美，1–2 项 = 部分，0 = 空白 */
function last14Days(checkins: ReturnType<typeof loadLightCheckins>) {
  const days: { iso: string; label: string; done: number }[] = [];
  const d = new Date();
  for (let i = 13; i >= 0; i--) {
    const t = new Date(d);
    t.setDate(d.getDate() - i);
    const m = String(t.getMonth() + 1).padStart(2, '0');
    const day = String(t.getDate()).padStart(2, '0');
    const iso = `${t.getFullYear()}-${m}-${day}`;
    const c = checkins[iso] ?? {};
    const done = (c.diet ? 1 : 0) + (c.training ? 1 : 0) + (c.sleep ? 1 : 0);
    days.push({ iso, label: `${t.getMonth() + 1}/${t.getDate()}`, done });
  }
  return days;
}

export default function LightPage() {
  const [target, setTarget] = useState(loadLightTarget);
  const [entries, setEntries] = useState(loadLightEntries);
  const [checkins, setCheckins] = useState(loadLightCheckins);
  // 当日有训练记录 → 训练项自动视为已练（只影响展示与统计，不改写打卡存储）
  const mergedCheckins = useMemo(() => withTrainingAuto(checkins), [checkins]);

  // 目标设置表单
  const body = useMemo(loadBodyProfile, []);
  const [startW, setStartW] = useState(() =>
    target ? String(target.startWeight) : (loadWeightKg() > 0 ? String(loadWeightKg()) : body.weightKg),
  );
  const [targetW, setTargetW] = useState(target ? String(target.targetWeight) : '');

  // 记体重表单
  const [logDate, setLogDate] = useState(todayStr);
  const [logWeight, setLogWeight] = useState('');
  const [logFat, setLogFat] = useState('');

  const latest = entries.length > 0 ? entries[entries.length - 1] : null;
  const current = latest ? latest.weight : target?.startWeight ?? 0;

  const stats = useMemo(() => {
    if (!target) return null;
    const total = target.startWeight - target.targetWeight; // 总共要减
    const done = target.startWeight - current;              // 已减
    const left = current - target.targetWeight;             // 还剩
    const pct = total !== 0 ? Math.min(100, Math.max(0, (done / total) * 100)) : 0;
    // 近 14 天平均速度（kg/周），用于估算达成时间
    let etaText = '';
    if (entries.length >= 2 && left > 0) {
      const recent = entries.slice(-14);
      const first = recent[0];
      const last = recent[recent.length - 1];
      const days = Math.max(1, (new Date(last.date).getTime() - new Date(first.date).getTime()) / 86400000);
      const perWeek = ((first.weight - last.weight) / days) * 7;
      if (perWeek > 0.05) {
        const weeks = left / perWeek;
        const eta = new Date(Date.now() + weeks * 7 * 86400000);
        etaText = `按近 ${recent.length} 条记录的速度（约 ${perWeek.toFixed(2)} kg/周），预计 ${eta.getFullYear()} 年 ${eta.getMonth() + 1} 月前后达成。`;
      } else {
        etaText = '近期待重变化不明显，检查热量缺口与睡眠。';
      }
    }
    return { done, left, pct, etaText };
  }, [target, current, entries]);

  const streak = useMemo(() => calcStreak(mergedCheckins), [mergedCheckins]);
  const todayChecks = mergedCheckins[todayStr()] ?? {};

  const chartData = useMemo(() => withMovingAverage(entries), [entries]);
  const weekly = useMemo(() => weeklyReport(entries), [entries]);
  const milestone = useMemo(
    () => (target ? milestoneOf(target.startWeight, target.targetWeight, current) : null),
    [target, current],
  );
  const heatDays = useMemo(() => last14Days(mergedCheckins), [mergedCheckins]);
  const achieved = Boolean(stats && stats.pct >= 100);

  const heightM = Number(body.heightCm) / 100;
  const bmi = heightM > 0 && current > 0 ? current / (heightM * heightM) : 0;

  const handleSaveTarget = () => {
    const s = parseFloat(startW);
    const t = parseFloat(targetW);
    if (!Number.isFinite(s) || !Number.isFinite(t) || s <= 0 || t <= 0) {
      toast.error('请填写有效的起始体重与目标体重');
      return;
    }
    if (s === t) {
      toast.error('起始体重和目标体重不能相同');
      return;
    }
    saveLightTarget({ startWeight: s, targetWeight: t, startDate: target?.startDate ?? todayStr() });
    setTarget(loadLightTarget());
    toast.success('目标已保存，开始追踪吧');
  };

  const handleLog = () => {
    const w = parseFloat(logWeight);
    if (!Number.isFinite(w) || w < 20 || w > 300) {
      toast.error('请填写有效体重（20–300 kg）');
      return;
    }
    if (!logDate) {
      toast.error('请选择日期');
      return;
    }
    const f = parseFloat(logFat);
    upsertLightEntry({
      date: logDate,
      weight: w,
      ...(Number.isFinite(f) && f > 0 && f < 70 ? { bodyFat: f } : {}),
    });
    setEntries(loadLightEntries());
    setLogWeight('');
    setLogFat('');
    toast.success(`${fmtDate(logDate)} 已记录 ${w} kg`);
  };

  const handleRemove = (date: string) => {
    saveLightEntries(loadLightEntries().filter((e) => e.date !== date));
    syncLightWeightToProfile(); // 删掉最新一条时，档案体重回退到新最新
    setEntries(loadLightEntries());
    toast.success(`已删除 ${fmtDate(date)} 的记录`);
  };

  const handleCheckin = (key: LightCheckinKey) => {
    setCheckins(toggleLightCheckin(todayStr(), key));
  };

  // ---------- 未设目标：先出设置卡 ----------
  if (!target) {
    return (
      <div className="mx-auto max-w-lg space-y-6">
        <header>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-wide text-foreground">
            <TrendingDown className="h-6 w-6 text-primary" />
            轻盈计划 · 减脂追踪台
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            定一个目标体重，每天记一次体重、打一次卡，趋势图和达成预估会自动算出来。
          </p>
        </header>
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="space-y-4 p-5">
            <div className="space-y-1.5">
              <Label htmlFor="start-w">起始体重（kg）</Label>
              <Input id="start-w" type="number" min={20} max={300} placeholder="如 78" value={startW} onChange={(e) => setStartW(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="target-w">目标体重（kg）</Label>
              <Input id="target-w" type="number" min={20} max={300} placeholder="如 68" value={targetW} onChange={(e) => setTargetW(e.target.value)} />
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              健康减脂速度约每周 0.5–1 kg，别追求快。目标随时能改，记录不会丢。
            </p>
            <Button className="w-full" size="lg" onClick={handleSaveTarget}>
              开始我的轻盈计划
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-wide text-foreground">
            <TrendingDown className="h-6 w-6 text-primary" />
            轻盈计划 · 减脂追踪台
            {achieved && (
              <span className="rounded-full border border-primary/50 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                已达成 · 维持期
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {target.startDate} 启程：{target.startWeight} kg → 目标 {target.targetWeight} kg
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setTarget(null)}>
          重设目标
        </Button>
      </header>

      {/* 四项概览 */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-4">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Scale className="h-3.5 w-3.5 text-primary" /> 当前体重
            </p>
            <p className="mt-1.5 font-display text-2xl font-bold text-foreground">
              {current > 0 ? `${current.toFixed(1)} kg` : '—'}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {bmi > 0 ? `BMI ${bmi.toFixed(1)}` : latest ? `记录于 ${fmtDate(latest.date)}` : '还没有记录'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-4">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-primary" /> 已减
            </p>
            <p className="mt-1.5 font-display text-2xl font-bold text-foreground">
              {stats && stats.done > 0 ? `${stats.done.toFixed(1)} kg` : '0 kg'}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              {stats && stats.done < 0 ? '比起始还重，稳住别慌' : '每一斤都是胜利'}
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-4">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Target className="h-3.5 w-3.5 text-primary" /> 距目标
            </p>
            <p className="mt-1.5 font-display text-2xl font-bold text-foreground">
              {stats && stats.left > 0 ? `${stats.left.toFixed(1)} kg` : '已达成'}
            </p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">目标 {target.targetWeight} kg</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-4">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarCheck2 className="h-3.5 w-3.5 text-primary" /> 连续完美打卡
            </p>
            <p className="mt-1.5 font-display text-2xl font-bold text-foreground">{streak} 天</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">三项全完成才算完美</p>
          </CardContent>
        </Card>
      </div>

      {/* 进度条 */}
      {stats && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="space-y-2 p-4 sm:p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">总进度 {stats.pct.toFixed(0)}%</span>
              <span className="text-xs text-muted-foreground">
                {target.startWeight} → {current.toFixed(1)} → {target.targetWeight} kg
              </span>
            </div>
            <Progress value={stats.pct} className="h-2" />
            {achieved ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {Math.abs(current - target.targetWeight) <= 1.5
                  ? `目标已达成。维持带 ${target.targetWeight} ± 1.5 kg，你正在带内——保持就是胜利。`
                  : current > target.targetWeight
                    ? `超出维持带上沿 ${(current - target.targetWeight - 1.5).toFixed(1)} kg，轻微收紧饮食一两周即可回带。`
                    : `比目标还轻 ${(target.targetWeight - current).toFixed(1)} kg，可以适当多吃一点，把代谢养回来。`}
              </p>
            ) : (
              stats.etaText && <p className="text-xs leading-relaxed text-muted-foreground">{stats.etaText}</p>
            )}
          </CardContent>
        </Card>
      )}

      {/* 本周战报 + 里程碑 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-4 sm:p-5">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <Flame className="h-4 w-4 text-primary" /> 本周战报
            </h3>
            {weekly ? (
              <>
                <p className="mt-2 font-display text-3xl font-extrabold tracking-wide">
                  <span className={weekly.delta < 0 ? 'text-primary' : weekly.delta > 0 ? 'text-destructive' : 'text-foreground'}>
                    {weekly.delta > 0 ? '+' : ''}{weekly.delta.toFixed(2)} kg
                  </span>
                  <span className="ml-2 text-sm font-bold text-muted-foreground">/ 周</span>
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  近 7 天均重 {weekly.thisAvg.toFixed(1)} kg，上 7 天 {weekly.prevAvg.toFixed(1)} kg。
                  {achieved
                    ? weekly.delta >= 0.3
                      ? ' 维持期在回涨，回看这一周的外食与酒精。'
                      : weekly.delta <= -0.3
                        ? ' 维持期还在降，可以多吃点，把热量拉回维持量。'
                        : ' 体重稳住了，维持得很漂亮。'
                    : weekly.delta <= -1
                      ? ' 降速偏快，注意蛋白质与力量训练，别掉肌肉。'
                      : weekly.delta > -0.3 && weekly.delta < 0.3
                        ? ' 基本持平，若持续两周以上，检查热量缺口。'
                        : weekly.delta >= 0.3
                          ? ' 在回涨，回看这一周的外食、酒精与睡眠。'
                          : ' 速度落在健康区间（0.5–1 kg/周），保持。'}
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                需要本周和上周各有至少 1 条记录才能出周报，继续记。
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-4 sm:p-5">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <Award className="h-4 w-4 text-primary" /> 里程碑
            </h3>
            {milestone && (
              <>
                <p className="mt-2 font-display text-3xl font-extrabold tracking-wide text-foreground">
                  {milestone.hit} <span className="text-sm font-bold text-muted-foreground">个已达成</span>
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {achieved
                    ? '目标线已踩过——从此每周稳住，就是新的胜利。'
                    : milestone.next != null
                      ? `每减 2.5 kg 一个里程碑。下一个 ${milestone.next.toFixed(1)} kg，还差 ${milestone.toNext.toFixed(1)} kg。`
                      : '里程碑全部踩完，最后一段直冲目标线。'}
                </p>
                <div className="mt-3 flex gap-1.5">
                  {Array.from({ length: Math.max(1, milestone.hit + (milestone.next != null ? 1 : 0)) }).map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-2 flex-1 rounded-full',
                        i < milestone.hit ? 'bg-primary' : 'border border-dashed border-primary/50',
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 记体重 + 今日打卡 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="space-y-3 p-4 sm:p-5">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <Scale className="h-4 w-4 text-primary" /> 记一笔
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label htmlFor="log-date" className="text-xs">日期</Label>
                <Input id="log-date" type="date" value={logDate} max={todayStr()} onChange={(e) => setLogDate(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="log-w" className="text-xs">体重 kg</Label>
                <Input id="log-w" type="number" min={20} max={300} step="0.1" placeholder="77.5" value={logWeight} onChange={(e) => setLogWeight(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="log-f" className="text-xs">体脂 %（选填）</Label>
                <Input id="log-f" type="number" min={3} max={70} step="0.1" placeholder="22" value={logFat} onChange={(e) => setLogFat(e.target.value)} />
              </div>
            </div>
            <Button className="w-full" onClick={handleLog}>保存记录</Button>
            <p className="text-[11px] text-muted-foreground">同一天重复记会覆盖旧值；建议每天早晨空腹、排便后称重。</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="space-y-3 p-4 sm:p-5">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <CalendarCheck2 className="h-4 w-4 text-primary" /> 今日打卡
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {CHECKIN_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = Boolean(todayChecks[item.key]);
                // 由训练记录自动打勾的训练项：按钮置灰，避免手动取消造成「记录在但没打勾」的矛盾
                const autoTraining = item.key === 'training' && active && !checkins[todayStr()]?.training;
                return (
                  <button
                    key={item.key}
                    type="button"
                    disabled={autoTraining}
                    title={autoTraining ? '当日已有训练记录，自动记为已完成；要改动请到「训练记录」页' : undefined}
                    onClick={() => handleCheckin(item.key)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors',
                      active
                        ? 'border-primary bg-primary/15 text-primary'
                        : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground',
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              三项全绿 = 完美一天，连续完美天数计入上方。{CHECKIN_ITEMS.map((i) => i.hint).join('；')}。当日已有训练记录时，「完成训练」会自动打勾（无需重复点击），改训练内容请到「训练记录」页。
            </p>
            <div>
              <p className="text-[11px] text-muted-foreground">近 14 天</p>
              <div className="mt-1.5 flex gap-1">
                {heatDays.map((d) => (
                  <span
                    key={d.iso}
                    title={`${d.label}：${d.done === 3 ? '完美' : d.done > 0 ? `完成 ${d.done}/3` : '未打卡'}`}
                    className={cn(
                      'h-4 flex-1 rounded-sm',
                      d.done === 3 ? 'bg-primary' : d.done > 0 ? 'bg-primary/40' : 'bg-muted',
                      d.iso === todayStr() && 'ring-1 ring-primary',
                    )}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 趋势图 */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
        <CardContent className="p-4 sm:p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <TrendingDown className="h-4 w-4 text-primary" /> 体重趋势
          </h3>
          {entries.length >= 2 ? (
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={fmtDate}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                    tickLine={false}
                    axisLine={{ stroke: 'var(--border)' }}
                  />
                  <YAxis
                    yAxisId="w"
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    unit=" kg"
                  />
                  <YAxis yAxisId="f" orientation="right" domain={[0, 60]} hide />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--popover)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      fontSize: 12,
                      color: 'var(--popover-foreground)',
                    }}
                    formatter={(value: number, name: string) =>
                      name === 'weight'
                        ? [`${value} kg`, '体重']
                        : name === 'ma'
                          ? [`${value} kg`, '趋势（7 日均）']
                          : [`${value}%`, '体脂率']
                    }
                    labelFormatter={(label: string) => `日期 ${label}`}
                  />
                  <Line yAxisId="w" type="monotone" dataKey="weight" stroke="var(--chart-2)" strokeWidth={1.5} strokeOpacity={0.55} dot={{ r: 2 }} connectNulls />
                  <Line yAxisId="w" type="monotone" dataKey="ma" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} connectNulls />
                  <Line yAxisId="f" type="monotone" dataKey="bodyFat" stroke="var(--chart-3)" strokeWidth={1.5} strokeDasharray="4 3" dot={false} connectNulls />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              至少 2 条记录才会出趋势图，先在上面「记一笔」吧。
            </p>
          )}
        </CardContent>
      </Card>

      {/* 历史记录 */}
      {entries.length > 0 && (
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
          <CardContent className="p-4 sm:p-5">
            <h3 className="font-display text-lg font-bold text-foreground">历史记录</h3>
            <div className="mt-3 max-h-72 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>体重</TableHead>
                    <TableHead>体脂率</TableHead>
                    <TableHead>较前次</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...entries].reverse().map((e, i, arr) => {
                    const prev = arr[i + 1];
                    const diff = prev ? e.weight - prev.weight : 0;
                    return (
                      <TableRow key={e.date}>
                        <TableCell className="text-foreground">{e.date}</TableCell>
                        <TableCell>{e.weight.toFixed(1)} kg</TableCell>
                        <TableCell>{e.bodyFat ? `${e.bodyFat}%` : '—'}</TableCell>
                        <TableCell className={diff < 0 ? 'text-primary' : diff > 0 ? 'text-muted-foreground' : 'text-muted-foreground'}>
                          {prev ? `${diff > 0 ? '+' : ''}${diff.toFixed(1)}` : '—'}
                        </TableCell>
                        <TableCell>
                          <button type="button" onClick={() => handleRemove(e.date)} className="text-muted-foreground transition-colors hover:text-destructive" title="删除这条记录">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 联动：食物热量 / 营养 */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div>
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <UtensilsCrossed className="h-4 w-4 text-primary" />
              减脂怎么吃？
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              全食物热量表与蛋白质质量评级就在本站营养页，配好热量缺口，体重曲线自然会往下走。
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/nutrition">
              去查食物热量
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
