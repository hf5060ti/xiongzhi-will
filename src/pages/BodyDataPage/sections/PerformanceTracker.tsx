import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Activity, Check, ChevronDown, Eraser, Gauge, Pencil, Save, Trash2, X, Zap } from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  ATHLETIC_METRICS,
  ENDURANCE_METRICS,
  LIFT_STANDARDS,
  LIFTS,
  OVERALL_WEIGHTS,
  STANDARD_SOURCES,
  STRENGTH_LEVELS,
  TIER_START_LABEL,
  estimate1RM,
  formatDuration,
  formatMetricValue,
  gapText,
  judgeThresholds,
  liftChartColor,
  liftGapText,
  medianTier,
  overallRating,
  parseDurationInput,
  tierColor,
  tierLevelProgress,
  tierProgress,
  type GradeResult,
  type MetricDef,
  type Sex,
  type TierLevelProgress,
} from '@/lib/performance-standards';
import {
  appendPerformanceLog,
  clearPerformanceLogs,
  latestWeightKg,
  loadPerformanceLogs,
  loadSexSetting,
  removePerformanceLog,
  saveSexSetting,
  updatePerformanceLog,
  type BodyProfile,
  type PerformanceLog,
  type PerformanceLogs,
  type PerfSection,
  type SexSetting,
} from '@/lib/store';

/** 指标定义查找（耐力 / 运动能力合表） */
function findMetricDef(key: string): MetricDef | null {
  return [...ENDURANCE_METRICS, ...ATHLETIC_METRICS].find((m) => m.key === key) ?? null;
}

/** 档内进度文案：展示「当前档 → 下一档」的数值区间与已完成百分比 */
function levelProgressText(lp: TierLevelProgress | null, format: (value: number) => string): string | null {
  if (!lp) return null;
  if (lp.isTop) return `已达最高档（${lp.toLabel}），无更高区间`;
  return `档内进度：${lp.fromLabel} → ${lp.toLabel} 区间 ${format(lp.from)} → ${format(lp.to)}，已完成 ${lp.pct}%`;
}

/** 力量录入 / 编辑入参校验（两者共用，口径一致） */
function validateStrengthInput(weightStr: string, repsStr: string): { weight: number; reps: number } | { error: string } {
  const weight = parseFloat(weightStr);
  const reps = parseInt(repsStr, 10);
  if (!Number.isFinite(weight) || weight <= 0 || weight > 500) return { error: '重量请填 1–500 kg' };
  if (!Number.isFinite(reps) || reps <= 0 || reps > 15) return { error: '次数请填 1–15（超过 15 次时 1RM 估算不可靠）' };
  return { weight, reps };
}

/** 耐力 / 运动能力录入 / 编辑入参校验（用时支持 4:50 与纯秒数） */
function validateMetricInput(metric: MetricDef, raw: string): { value: number } | { error: string } {
  if (metric.isTime) {
    const value = parseDurationInput(raw);
    const maxSec = metric.key === 'plank' ? 3600 : 1800;
    if (value == null || value <= 0 || value > maxSec) return { error: `${metric.label}请填有效用时（如 4:50 或 90，秒）` };
    return { value };
  }
  const n = parseFloat(raw);
  const max = metric.key === 'longjump' ? 400 : 300;
  if (!Number.isFinite(n) || n <= 0 || n > max) return { error: `${metric.label}请填 1–${max} ${metric.unit}` };
  return { value: n };
}

function todayStr(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function fmtDate(iso: string): string {
  return `${Number(iso.slice(5, 7))}/${Number(iso.slice(8, 10))}`;
}

function GradeTag({ grade, className }: { grade: GradeResult; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold whitespace-nowrap',
        className,
      )}
      style={{ color: grade.color, borderColor: grade.color }}
    >
      {grade.label}
    </span>
  );
}

function AbilityBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${Math.max(2, Math.min(100, progress))}%`, background: color }}
      />
    </div>
  );
}

function sectionLabel(tier: number | null, labels: string[]): string {
  if (tier == null) return '未录入';
  if (tier <= 0) return TIER_START_LABEL;
  return labels[Math.min(tier, labels.length) - 1];
}

function sectionScore(grades: GradeResult[], totalLevels: number): number | null {
  const med = medianTier(grades.map((g) => g.tier));
  return med == null ? null : tierProgress(med, totalLevels);
}

const SECTION_META: { key: PerfSection; label: string; desc: string; icon: typeof Zap }[] = [
  { key: 'strength', label: '力量', desc: '能推 / 拉 / 蹲多重', icon: Zap },
  { key: 'endurance', label: '耐力', desc: '能持续多久', icon: Activity },
  { key: 'athletic', label: '运动能力', desc: '能跳多高 / 跑多快', icon: Gauge },
];

export default function PerformanceTracker({
  profile,
  onSexChange,
}: {
  profile: BodyProfile;
  onSexChange?: (sex: SexSetting) => void;
}) {
  const [logs, setLogs] = useState<PerformanceLogs>(loadPerformanceLogs);
  const [sexSetting, setSexSetting] = useState<SexSetting | null>(loadSexSetting);
  const [tab, setTab] = useState<PerfSection>('strength');
  const [chartMetric, setChartMetric] = useState<Record<PerfSection, string>>({
    strength: LIFTS[0].key,
    endurance: ENDURANCE_METRICS[0].key,
    athletic: ATHLETIC_METRICS[0].key,
  });

  const [sqlStrength, setSqlStrength] = useState({ date: todayStr(), metric: LIFTS[0].key as string, weight: '', reps: '' });
  const [sqlEndurance, setSqlEndurance] = useState({ date: todayStr(), metric: ENDURANCE_METRICS[0].key, value: '' });
  const [sqlAthletic, setSqlAthletic] = useState({ date: todayStr(), metric: ATHLETIC_METRICS[0].key, value: '' });

  // 已录入记录的行内编辑态：按 id 逐条定位，同一天多条互不影响
  const [editing, setEditing] = useState<{ section: PerfSection; id: string; metric: string; date: string } | null>(null);
  const [draft, setDraft] = useState({ date: '', value: '', reps: '' });

  // 「清空本模块记录」两步确认开关
  const [confirmClear, setConfirmClear] = useState(false);

  // 「档位依据」折叠区展开状态（默认收起）
  const [showSources, setShowSources] = useState(false);

  // 判级口径：显式设置优先；未设置时回落身体档案（默认男性），并在页内提示用户就地选择
  const sex: Sex = sexSetting ?? (profile.sex === 'female' ? 'female' : 'male');
  const profileWeight = Number(profile.weightKg);
  const weightKg = Number.isFinite(profileWeight) && profileWeight > 0 ? profileWeight : latestWeightKg();

  /** 估算 1RM 口径统一：训练记录导入的条目直接取 oneRmKg（写入时算好的 Epley 值），手动条目按 Epley 现算 */
  const oneRmOf = (log: PerformanceLog): number =>
    log.oneRmKg != null ? log.oneRmKg : estimate1RM(log.value, log.reps ?? 1);

  // ---------- 力量 ----------
  const liftRows = useMemo(
    () =>
      LIFTS.map((lift) => {
        const entries = logs.strength
          .filter((l) => l.metric === lift.key)
          .map((l) => ({
            date: l.date,
            weight: l.value,
            reps: l.reps ?? 1,
            snapshotKg: l.weightKg ?? null,
            oneRm: oneRmOf(l),
          }));
        const last = entries.length > 0 ? entries[entries.length - 1] : null;
        const best = entries.reduce((max, e) => Math.max(max, e.oneRm), 0);
        const thresholds = LIFT_STANDARDS[lift.key][sex];
        // 倍数分母 = 该次记录当时的体重快照；仅旧记录（无快照）才回落当前体重，历史档位不再随体重漂移
        const baseKg = last ? last.snapshotKg ?? (weightKg > 0 ? weightKg : null) : null;
        const ratio = last && baseKg ? Math.round((last.oneRm / baseKg) * 100) / 100 : null;
        const grade = judgeThresholds(ratio, thresholds, STRENGTH_LEVELS, 'higher');
        const startKg = weightKg > 0 ? Math.round(thresholds[0] * weightKg * 10) / 10 : null;
        const gapKg = grade.gap != null && baseKg ? Math.round(grade.gap * baseKg * 10) / 10 : null;
        return {
          lift,
          entries,
          last,
          best,
          ratio,
          grade,
          startKg,
          gapKg,
          baseKg,
          progress: tierProgress(grade.tier, STRENGTH_LEVELS.length),
          // 档内进度：当前体重倍数在「当前档门槛 → 下一档门槛」区间内的完成度
          levelProgress: tierLevelProgress(ratio, thresholds, STRENGTH_LEVELS, 'higher'),
        };
      }),
    [logs.strength, sex, weightKg],
  );

  const metalRows = useMemo(() => {
    const build = (metrics: MetricDef[], list: PerformanceLog[]) =>
      metrics.map((metric) => {
        const entries = list.filter((l) => l.metric === metric.key).map((l) => ({ date: l.date, value: l.value }));
        const last = entries.length > 0 ? entries[entries.length - 1] : null;
        const best =
          entries.length > 0
            ? metric.direction === 'higher'
              ? Math.max(...entries.map((e) => e.value))
              : Math.min(...entries.map((e) => e.value))
            : null;
        const thresholds = metric.thresholds[sex];
        const grade = judgeThresholds(last?.value ?? null, thresholds, metric.levels, metric.direction);
        return {
          metric,
          entries,
          last,
          best,
          grade,
          startTarget: thresholds[0],
          progress: tierProgress(grade.tier, metric.levels.length),
          // 档内进度：当前成绩在「当前档门槛 → 下一档门槛」区间内的完成度
          levelProgress: tierLevelProgress(last?.value ?? null, thresholds, metric.levels, metric.direction),
        };
      });
    return {
      endurance: build(ENDURANCE_METRICS, logs.endurance),
      athletic: build(ATHLETIC_METRICS, logs.athletic),
    };
  }, [logs.endurance, logs.athletic, sex]);

  const strengthScore = sectionScore(liftRows.map((r) => r.grade), STRENGTH_LEVELS.length);
  const enduranceScore = sectionScore(metalRows.endurance.map((r) => r.grade), ENDURANCE_LEVELS_LEN());
  const athleticScore = sectionScore(metalRows.athletic.map((r) => r.grade), ATHLETIC_LEVELS_LEN());
  const overall = overallRating({ strength: strengthScore, endurance: enduranceScore, athletic: athleticScore });

  const strengthTier = medianTier(liftRows.map((r) => r.grade.tier));
  const enduranceTier = medianTier(metalRows.endurance.map((r) => r.grade.tier));
  const athleticTier = medianTier(metalRows.athletic.map((r) => r.grade.tier));

  const overview = [
    { key: 'strength' as PerfSection, tier: strengthTier, labels: STRENGTH_LEVELS, score: strengthScore, grades: liftRows.map((r) => r.grade), count: logs.strength.length, metrics: LIFTS.length },
    { key: 'endurance' as PerfSection, tier: enduranceTier, labels: ENDURANCE_METRICS[0].levels, score: enduranceScore, grades: metalRows.endurance.map((r) => r.grade), count: logs.endurance.length, metrics: ENDURANCE_METRICS.length },
    { key: 'athletic' as PerfSection, tier: athleticTier, labels: ATHLETIC_METRICS[0].levels, score: athleticScore, grades: metalRows.athletic.map((r) => r.grade), count: logs.athletic.length, metrics: ATHLETIC_METRICS.length },
  ];

  const chartRows = useMemo(() => {
    const section = tab;
    if (section === 'strength') {
      return logs.strength
        .filter((l) => l.metric === chartMetric.strength)
        .map((l) => ({ date: l.date, value: oneRmOf(l) }));
    }
    return logs[section]
      .filter((l) => l.metric === chartMetric[section])
      .map((l) => ({ date: l.date, value: l.value }));
  }, [tab, chartMetric, logs]);

  const activeMetricDef: MetricDef | null = useMemo(() => {
    if (tab === 'endurance') return ENDURANCE_METRICS.find((m) => m.key === chartMetric.endurance) ?? null;
    if (tab === 'athletic') return ATHLETIC_METRICS.find((m) => m.key === chartMetric.athletic) ?? null;
    return null;
  }, [tab, chartMetric]);

  // ---------- 写入 / 删除 ----------
  const saveStrength = () => {
    if (!sqlStrength.date) return toast.error('请选择日期');
    const parsed = validateStrengthInput(sqlStrength.weight, sqlStrength.reps);
    if ('error' in parsed) return toast.error(parsed.error);
    const metric = sqlStrength.metric;
    // 追加写入：同一动作同一天允许多条（同日多组各自留档，不再互相覆盖）
    setLogs(
      appendPerformanceLog('strength', {
        date: sqlStrength.date,
        metric,
        value: parsed.weight,
        reps: parsed.reps,
        weightKg: weightKg > 0 ? weightKg : undefined,
      }),
    );
    setSqlStrength((prev) => ({ ...prev, weight: '', reps: '' }));
    const oneRm = estimate1RM(parsed.weight, parsed.reps);
    toast.success(
      `${LIFTS.find((l) => l.key === metric)?.label ?? ''} 已记录：估算 1RM ${oneRm} kg${weightKg > 0 ? `（体重快照 ${weightKg} kg）` : ''}`,
    );
  };

  const saveMetric = (section: 'endurance' | 'athletic') => {
    const metrics = section === 'endurance' ? ENDURANCE_METRICS : ATHLETIC_METRICS;
    const form = section === 'endurance' ? sqlEndurance : sqlAthletic;
    const setForm = section === 'endurance' ? setSqlEndurance : setSqlAthletic;
    const metric = metrics.find((m) => m.key === form.metric);
    if (!metric) return;
    if (!form.date) return toast.error('请选择日期');

    const parsed = validateMetricInput(metric, form.value);
    if ('error' in parsed) return toast.error(parsed.error);
    // 追加写入：同一指标同一天允许多条
    setLogs(appendPerformanceLog(section, { date: form.date, metric: metric.key, value: parsed.value }));
    setForm((prev) => ({ ...prev, value: '' }));
    toast.success(`${metric.label} 已记录：${formatMetricValue(metric, parsed.value)}`);
  };

  const handleRemove = (section: PerfSection, log: PerformanceLog) => {
    // 按 id 逐条定位删除：同一天同指标的多条只删这一条
    setLogs(removePerformanceLog(section, { id: log.id, metric: log.metric, date: log.date }));
    if (editing?.section === section && editing.id === log.id) setEditing(null);
    toast.success(`已删除 ${log.date} 的 ${metricLabelOf(log.metric)} 记录`);
  };

  // ---------- 编辑已录入记录 ----------
  const startEdit = (section: PerfSection, log: PerformanceLog) => {
    setEditing({ section, id: log.id ?? '', metric: log.metric, date: log.date });
    setDraft({
      date: log.date,
      value:
        section === 'strength'
          ? String(log.value)
          : findMetricDef(log.metric)?.isTime
            ? formatDuration(log.value)
            : String(log.value),
      reps: log.reps != null ? String(log.reps) : '',
    });
  };

  const saveEdit = () => {
    if (!editing) return;
    const { section, metric, date: oldDate } = editing;
    const nextDate = draft.date || oldDate;
    let next: PerformanceLog;

    if (section === 'strength') {
      const parsed = validateStrengthInput(draft.value, draft.reps);
      if ('error' in parsed) return toast.error(parsed.error);
      const prevLog =
        logs.strength.find((l) => l.id === editing.id) ??
        logs.strength.find((l) => l.metric === metric && l.date === oldDate);
      next = {
        date: nextDate,
        metric,
        value: parsed.weight,
        reps: parsed.reps,
        // 编辑不改写体重快照：原记录有快照就沿用，旧记录无快照则补当前体重，避免倍数随体重漂移
        weightKg: prevLog?.weightKg ?? (weightKg > 0 ? weightKg : undefined),
      };
    } else {
      const def = findMetricDef(metric);
      if (!def) return;
      const parsed = validateMetricInput(def, draft.value);
      if ('error' in parsed) return toast.error(parsed.error);
      next = { date: nextDate, metric, value: parsed.value };
    }

    // 就地更新这一条，同一天其它记录原样保留
    setLogs(updatePerformanceLog(section, { id: editing.id, metric, date: oldDate }, next));
    setEditing(null);
    toast.success(`${metricLabelOf(metric)} ${nextDate} 的记录已更新`);
  };

  // ---------- 清空本模块记录（两步确认） ----------
  const handleClearAll = () => {
    const total = logs.strength.length + logs.endurance.length + logs.athletic.length;
    setConfirmClear(false);
    if (total === 0) return toast.info('本模块暂无记录');
    setEditing(null);
    setLogs(clearPerformanceLogs());
    toast.success(`已清空本模块 ${total} 条运动能力记录`);
  };

  // ---------- 判级口径 ----------
  const chooseSex = (value: SexSetting) => {
    saveSexSetting(value);
    setSexSetting(value);
    onSexChange?.(value);
    toast.success(`判级口径已设为${value === 'male' ? '男性' : '女性'}标准，等级与目标已按该标准重算`);
  };

  // 最近记录最多列 30 条（够覆盖日常修改需求，避免超长列表）
  const saveHistory = (section: PerfSection) => [...logs[section]].slice(-30).reverse();

  const metricLabelOf = (key: string): string => {
    const lift = LIFTS.find((l) => l.key === key);
    if (lift) return lift.label;
    const def = [...ENDURANCE_METRICS, ...ATHLETIC_METRICS].find((m) => m.key === key);
    return def?.label ?? key;
  };

  // 同一指标同一天可能有多条：标出「同日第 n 条」，让用户一眼分清
  const sameDayPeers = (section: PerfSection, log: PerformanceLog) =>
    logs[section].filter((l) => l.metric === log.metric && l.date === log.date);
  const sameDayIndex = (section: PerfSection, log: PerformanceLog) =>
    sameDayPeers(section, log).findIndex((l) => l.id === log.id) + 1;

  return (
    <section className="space-y-5 rounded-lg border border-border bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Activity className="h-4 w-4 text-primary" />
            运动能力追踪 · 力量 / 耐力 / 运动能力
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            追踪「能做什么」，而不是「看起来多大」。力量项按估算 1RM ÷ 记录当时的体重快照判级，历史倍数与档位不再随体重变化漂移；未带快照的旧记录才按当前体重计算。
          </p>
        </div>
        <div className="space-y-1.5 text-xs text-muted-foreground">
          <p>{weightKg > 0 ? `新记录体重快照：${weightKg} kg` : '尚未录入体重，力量记录无法写入快照'}</p>
          <div className="flex items-center gap-2">
            <span>判级口径</span>
            <div className="inline-flex overflow-hidden rounded-md border border-border">
              {(['male', 'female'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => chooseSex(s)}
                  className={cn(
                    'px-2.5 py-1 text-xs transition-colors',
                    sex === s ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent',
                  )}
                >
                  {s === 'male' ? '男性标准' : '女性标准'}
                  {sexSetting === null && sex === s ? '·默认' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {sexSetting === null && (
        <p className="rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
          判级口径尚未设置，等级与目标暂按{sex === 'male' ? '男性' : '女性'}标准计算。请在上方「判级口径」点选男性 / 女性，选定后会立即按对应标准表重算并记住。
        </p>
      )}

      {weightKg <= 0 && (
        <p className="rounded-md border border-primary/40 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
          请先在上方「身体档案」填写体重（或在轻盈计划记一次体重）：新记录会写入体重快照，倍数与档位据此锁定。
        </p>
      )}

      {/* 档位依据：可折叠，凡折算口径均逐条标注 */}
      <div className="rounded-lg border border-border bg-muted/20">
        <button
          type="button"
          onClick={() => setShowSources((v) => !v)}
          className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-xs font-medium text-foreground"
        >
          <span>档位依据与折算说明</span>
          <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', showSources && 'rotate-180')} />
        </button>
        {showSources && (
          <div className="space-y-3 border-t border-border px-3 py-3">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              三板块统一档位术语：入门 / 进阶 / 熟练 / 优秀 / 精英（耐力沿用原五档名作英文副标，运动能力为国标四项，无第五档）。各档线为大众训练者参考线，不是体检或医学结论。
            </p>
            {STANDARD_SOURCES.map((note) => (
              <div key={note.section} className="space-y-1.5">
                <p className="text-xs font-medium text-foreground">{note.title}</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">档位表：{note.source}</p>
                <p className="text-[11px] leading-relaxed text-muted-foreground">档数：{note.levels}</p>
                <ul className="space-y-1">
                  {note.derived.map((line) => (
                    <li key={line} className="text-[11px] leading-relaxed text-muted-foreground">
                      · {line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 总览 */}
      <div className="grid gap-3 lg:grid-cols-[repeat(3,minmax(0,1fr))_1.15fr]">
        {overview.map((item) => {
          const meta = SECTION_META.find((m) => m.key === item.key)!;
          const Icon = meta.icon;
          return (
            <div key={item.key} className="rounded-lg border border-border bg-muted/30 p-3">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="h-3.5 w-3.5" />
                {meta.label}
              </p>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-display text-xl font-bold tracking-wide" style={{ color: tierColor(item.tier ?? -1) }}>
                  {sectionLabel(item.tier, item.labels)}
                </span>
                {item.score != null && <span className="text-xs text-muted-foreground">{item.score}/100</span>}
              </div>
              <div className="mt-2">
                <AbilityBar progress={item.score ?? 0} color={tierColor(item.tier ?? -1)} />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                {meta.desc} · 已录 {item.count} 条 / {item.metrics} 项
              </p>
            </div>
          );
        })}

        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-xs text-muted-foreground">综合能力评级</p>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold tracking-wide" style={{ color: overall.color }}>
              {overall.label}
            </span>
            {overall.score != null && <span className="text-xs text-muted-foreground">加权 {overall.score}/100</span>}
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
            力量 {sectionLabel(strengthTier, STRENGTH_LEVELS)} · 耐力 {sectionLabel(enduranceTier, ENDURANCE_METRICS[0].levels)} · 运动能力{' '}
            {sectionLabel(athleticTier, ATHLETIC_METRICS[0].levels)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            权重：力量 {Math.round(OVERALL_WEIGHTS.strength * 100)}% / 耐力 {Math.round(OVERALL_WEIGHTS.endurance * 100)}% / 运动能力{' '}
            {Math.round(OVERALL_WEIGHTS.athletic * 100)}%
          </p>
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as PerfSection)}>
        <TabsList className="h-10 w-full max-w-lg overflow-x-auto">
          {SECTION_META.map((m) => (
            <TabsTrigger key={m.key} value={m.key} className="shrink-0 px-2.5 text-xs sm:text-sm">
              {m.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ---------- 力量 ---------- */}
        <TabsContent value="strength" className="mt-3 space-y-4">
          <div className="grid gap-3 lg:grid-cols-[150px_1fr_150px_130px_auto] lg:items-end">
            <div className="space-y-2">
              <Label htmlFor="pf-s-date" className="text-sm">日期</Label>
              <Input id="pf-s-date" type="date" max={todayStr()} value={sqlStrength.date} onChange={(e) => setSqlStrength((p) => ({ ...p, date: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-s-metric" className="text-sm">动作</Label>
              <div className="w-full [&>div]:w-full">
                <NativeSelect id="pf-s-metric" value={sqlStrength.metric} onChange={(e) => setSqlStrength((p) => ({ ...p, metric: e.target.value }))}>
                  {LIFTS.map((l) => (
                    <NativeSelectOption key={l.key} value={l.key}>{l.label}</NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-s-weight" className="text-sm">重量（kg）</Label>
              <Input id="pf-s-weight" type="number" min={0} step="0.5" placeholder="如 100" value={sqlStrength.weight} onChange={(e) => setSqlStrength((p) => ({ ...p, weight: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pf-s-reps" className="text-sm">完成次数</Label>
              <Input id="pf-s-reps" type="number" min={1} step="1" placeholder="如 5" value={sqlStrength.reps} onChange={(e) => setSqlStrength((p) => ({ ...p, reps: e.target.value }))} />
            </div>
            <Button className="w-full lg:w-28" onClick={saveStrength}>
              <Save className="mr-1.5 h-4 w-4" />
              保存
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            1RM 用 Epley 公式估算：重量 ×（1 + 次数 ÷ 30）；建议填 1–8 次的组，估算更接近真实极限。
          </p>

          <div className="grid gap-3 lg:grid-cols-5">
            {liftRows.map((row) => (
              <div key={row.lift.key} className="space-y-2 rounded-lg border border-border bg-muted/30 p-3">
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: row.lift.chart }} />
                  {row.lift.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-xl font-bold text-foreground">
                    {row.last ? row.last.oneRm.toFixed(1) : '—'}
                  </span>
                  <span className="text-[11px] text-muted-foreground">{row.last ? 'kg 1RM' : '待录入'}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {row.ratio != null ? `体重倍数 ${row.ratio.toFixed(2)}×` : weightKg > 0 ? '填体重后算倍数' : '待录体重'}
                </p>
                {row.last && (
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {row.last.snapshotKg != null
                      ? `按记录时体重快照 ${row.last.snapshotKg} kg 判级，以后改体重也不变`
                      : row.baseKg != null
                        ? `该记录无体重快照，暂按当前体重 ${row.baseKg} kg 计算`
                        : '该记录无体重快照，且尚未录入体重'}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <GradeTag grade={row.grade} />
                </div>
                <AbilityBar progress={row.progress} color={row.grade.color} />
                {row.levelProgress && (
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {levelProgressText(row.levelProgress, (v) => `${v.toFixed(2)}×`)}
                  </p>
                )}
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {row.grade.tier === -1
                    ? row.startKg != null
                      ? `${STRENGTH_LEVELS[0]}目标 ≈ ${row.startKg} kg（体重 × ${LIFT_STANDARDS[row.lift.key][sex][0]}）`
                      : '先录体重再定目标'
                    : liftGapText(row.gapKg, row.grade.nextLabel) ?? `已是最高档（${row.grade.label}）`}
                </p>
                {row.entries.length > 1 && row.last && (
                  <p className="text-[11px] text-muted-foreground">
                    最近 {fmtDate(row.last.date)} · 历史最高 1RM {row.best.toFixed(1)} kg
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-3 rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-medium text-foreground">1RM 变化曲线</p>
              <div className="flex flex-wrap gap-1.5">
                {LIFTS.map((l) => (
                  <Badge
                    key={l.key}
                    variant={chartMetric.strength === l.key ? 'default' : 'outline'}
                    className={cn('cursor-pointer select-none px-3', chartMetric.strength !== l.key && 'hover:bg-accent')}
                    onClick={() => setChartMetric((p) => ({ ...p, strength: l.key }))}
                  >
                    {l.label}
                  </Badge>
                ))}
              </div>
            </div>
            {chartRows.length >= 2 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartRows} margin={{ top: 4, right: 12, bottom: 0, left: -18 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="date" tickFormatter={fmtDate} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickLine={false} axisLine={false} unit=" kg" />
                    <Tooltip
                      contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--popover-foreground)' }}
                      formatter={(value: number) => [`${Number(value).toFixed(1)} kg`, '估算 1RM']}
                      labelFormatter={(label: string) => `日期 ${label}`}
                    />
                    <Line type="monotone" dataKey="value" stroke={liftChartColor(chartMetric.strength as (typeof LIFTS)[number]['key'])} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">至少 2 次记录才会出曲线，先录入同一动作的不同日期成绩。</p>
            )}
          </div>
        </TabsContent>

        {/* ---------- 耐力 / 运动能力 ---------- */}
        {(['endurance', 'athletic'] as const).map((section) => {
          const metrics = section === 'endurance' ? ENDURANCE_METRICS : ATHLETIC_METRICS;
          const rows = section === 'endurance' ? metalRows.endurance : metalRows.athletic;
          const form = section === 'endurance' ? sqlEndurance : sqlAthletic;
          const setForm = section === 'endurance' ? setSqlEndurance : setSqlAthletic;
          return (
            <TabsContent key={section} value={section} className="mt-3 space-y-4">
              <div className="grid gap-3 lg:grid-cols-[150px_1fr_220px_auto] lg:items-end">
                <div className="space-y-2">
                  <Label htmlFor={`pf-${section}-date`} className="text-sm">日期</Label>
                  <Input id={`pf-${section}-date`} type="date" max={todayStr()} value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`pf-${section}-metric`} className="text-sm">项目</Label>
                  <div className="w-full [&>div]:w-full">
                    <NativeSelect id={`pf-${section}-metric`} value={form.metric} onChange={(e) => setForm((p) => ({ ...p, metric: e.target.value }))}>
                      {metrics.map((m) => (
                        <NativeSelectOption key={m.key} value={m.key}>{m.label}</NativeSelectOption>
                      ))}
                    </NativeSelect>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`pf-${section}-value`} className="text-sm">成绩</Label>
                  <Input
                    id={`pf-${section}-value`}
                    type="text"
                    placeholder={metrics.find((m) => m.key === form.metric)?.isTime ? '如 4:50 或 90' : '数值'}
                    value={form.value}
                    onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))}
                  />
                </div>
                <Button className="w-full lg:w-28" onClick={() => saveMetric(section)}>
                  <Save className="mr-1.5 h-4 w-4" />
                  保存
                </Button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                {metrics.find((m) => m.key === form.metric)?.hint}
                {metrics.find((m) => m.key === form.metric)?.isTime && '（用时支持 4:50 或 4′50″ 写法，也可只填秒数）'}
                {metrics.find((m) => m.key === form.metric)?.maleOnly && sex === 'female' && '（该表为男生标准，女生按同表参考）'}
              </p>

              <div className="grid gap-3 lg:grid-cols-3">
                {rows.map((row) => (
                  <div key={row.metric.key} className="space-y-2 rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs text-muted-foreground">{row.metric.label}</p>
                      <GradeTag grade={row.grade} />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-bold text-foreground">
                        {row.last ? formatMetricValue(row.metric, row.last.value) : '—'}
                      </span>
                      {row.best != null && row.entries.length > 1 && (
                        <span className="text-[11px] text-muted-foreground">最佳 {formatMetricValue(row.metric, row.best)}</span>
                      )}
                    </div>
                    <AbilityBar progress={row.progress} color={row.grade.color} />
                    {row.levelProgress && (
                      <p className="text-[11px] leading-relaxed text-muted-foreground">
                        {levelProgressText(row.levelProgress, (v) => formatMetricValue(row.metric, v))}
                      </p>
                    )}
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      {row.grade.tier === -1
                        ? `起手目标 ${formatMetricValue(row.metric, row.startTarget)}（${row.metric.levels[0]}）`
                        : gapText(row.metric, row.grade) ?? `已是最高档（${row.grade.label}）`}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {row.metric.levels.map((lv, i) => {
                        const t = row.metric.thresholds[sex][i];
                        return (
                          <span
                            key={lv}
                            className={cn(
                              'rounded border px-1.5 py-0.5 text-[10px]',
                              row.grade.tier >= i + 1 ? 'text-foreground' : 'text-muted-foreground',
                            )}
                            style={{ borderColor: row.grade.tier >= i + 1 ? row.grade.color : 'var(--border)' }}
                            title={lv}
                          >
                            {row.metric.isTime ? formatDuration(t) : `${t}${row.metric.unit}`}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 rounded-lg border border-border bg-card p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm font-medium text-foreground">
                    {section === 'endurance' ? '耐力变化曲线' : '运动能力变化曲线'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {metrics.map((m) => (
                      <Badge
                        key={m.key}
                        variant={chartMetric[section] === m.key ? 'default' : 'outline'}
                        className={cn('cursor-pointer select-none px-3', chartMetric[section] !== m.key && 'hover:bg-accent')}
                        onClick={() => setChartMetric((p) => ({ ...p, [section]: m.key }))}
                      >
                        {m.label}
                      </Badge>
                    ))}
                  </div>
                </div>
                {chartRows.length >= 2 ? (
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartRows} margin={{ top: 4, right: 12, bottom: 0, left: -12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                        <XAxis dataKey="date" tickFormatter={fmtDate} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
                        <YAxis
                          domain={['dataMin - 2', 'dataMax + 2']}
                          tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v: number) => (activeMetricDef?.isTime ? formatDuration(v) : `${v}`)}
                        />
                        <Tooltip
                          contentStyle={{ background: 'var(--popover)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, color: 'var(--popover-foreground)' }}
                          formatter={(value: number) => [
                            activeMetricDef ? formatMetricValue(activeMetricDef, Number(value)) : `${value}`,
                            activeMetricDef?.label ?? '',
                          ]}
                          labelFormatter={(label: string) => `日期 ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={section === 'endurance' ? 'var(--chart-2)' : 'var(--chart-3)'}
                          strokeWidth={2.5}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">至少 2 次记录才会出曲线，先录入同一项目的不同日期成绩。</p>
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      {/* 最近记录 */}
      {(['strength', 'endurance', 'athletic'] as const).some((s) => logs[s].length > 0) && (
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">最近记录</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                每条最多列最近 30 条。同一指标同一天允许多条（会标注「同日第 n 条」）：点铅笔改日期 / 重量 / 次数 / 数值，点垃圾桶即时删除，均按条定位；编辑不改动力量项的体重快照。
              </p>
            </div>
            <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => setConfirmClear(true)}>
              <Eraser className="mr-1 h-3.5 w-3.5" />
              清空本模块记录
            </Button>
          </div>
          {confirmClear && (
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-md border border-destructive/50 bg-destructive/5 px-3 py-2 text-xs">
              <span className="text-foreground">
                将删除本模块全部记录（力量 / 耐力 / 运动能力共{' '}
                {logs.strength.length + logs.endurance.length + logs.athletic.length} 条），删除后不可恢复。
              </span>
              <span className="flex items-center gap-2">
                <Button variant="destructive" size="sm" className="h-7 px-2 text-xs" onClick={handleClearAll}>
                  确认清空
                </Button>
                <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => setConfirmClear(false)}>
                  取消
                </Button>
              </span>
            </div>
          )}
          <div className="mt-2 grid gap-4 lg:grid-cols-3">
            {(['strength', 'endurance', 'athletic'] as const).map((section) => (
              <div key={section}>
                <p className="mb-1 text-xs text-muted-foreground">{SECTION_META.find((m) => m.key === section)!.label}</p>
                {logs[section].length === 0 ? (
                  <p className="text-xs text-muted-foreground">暂无记录</p>
                ) : (
                  <ul className="divide-y divide-border">
                    {saveHistory(section).map((log) => {
                      const metricDef = findMetricDef(log.metric);
                      const isEditing = editing?.section === section && editing.id === log.id;
                      if (isEditing) {
                        return (
                          <li key={log.id ?? `${log.metric}-${log.date}`} className="space-y-1.5 py-2">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Input
                                type="date"
                                max={todayStr()}
                                value={draft.date}
                                onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))}
                                className="h-8 w-[136px] max-w-full text-xs"
                              />
                              {section === 'strength' ? (
                                <>
                                  <Input
                                    type="number"
                                    min={0}
                                    step="0.5"
                                    value={draft.value}
                                    onChange={(e) => setDraft((p) => ({ ...p, value: e.target.value }))}
                                    className="h-8 w-20 text-xs"
                                    placeholder="重量 kg"
                                  />
                                  <Input
                                    type="number"
                                    min={1}
                                    step="1"
                                    value={draft.reps}
                                    onChange={(e) => setDraft((p) => ({ ...p, reps: e.target.value }))}
                                    className="h-8 w-16 text-xs"
                                    placeholder="次数"
                                  />
                                </>
                              ) : (
                                <Input
                                  type="text"
                                  value={draft.value}
                                  onChange={(e) => setDraft((p) => ({ ...p, value: e.target.value }))}
                                  className="h-8 w-24 text-xs"
                                  placeholder={metricDef?.isTime ? '如 4:50' : '数值'}
                                />
                              )}
                              <button type="button" onClick={saveEdit} className="text-primary transition-colors hover:text-primary/80" title="保存修改">
                                <Check className="h-4 w-4" />
                              </button>
                              <button type="button" onClick={() => setEditing(null)} className="text-muted-foreground transition-colors hover:text-foreground" title="取消编辑">
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-[10px] leading-relaxed text-muted-foreground">
                              {metricLabelOf(log.metric)}
                              {section === 'strength'
                                ? ` · 体重快照 ${log.weightKg != null ? `${log.weightKg} kg` : '无（按当前体重）'}`
                                : metricDef?.isTime
                                  ? ' · 用时支持 4:50 或 90（秒）'
                                  : metricDef
                                    ? ` · 单位 ${metricDef.unit}`
                                    : ''}
                            </p>
                          </li>
                        );
                      }
                      return (
                        <li key={log.id ?? `${log.metric}-${log.date}`} className="flex items-start justify-between gap-2 py-1.5 text-xs">
                          <span className="min-w-0 break-words text-foreground">
                            {log.date} · {metricLabelOf(log.metric)}
                            {sameDayPeers(section, log).length > 1 ? ` · 同日第 ${sameDayIndex(section, log)} 条` : ''}
                          </span>
                          <span className="flex flex-wrap items-center justify-end gap-2">
                            <span className="break-words text-right text-muted-foreground">
                              {section === 'strength'
                                ? log.source === 'training'
                                  ? `训练导入 · 1RM ${(log.oneRmKg ?? estimate1RM(log.value, log.reps ?? 1)).toFixed(1)} kg（${log.value.toFixed(2)}× 体重）`
                                  : `${log.value} kg × ${log.reps ?? 1}`
                                : metricDef
                                  ? formatMetricValue(metricDef, log.value)
                                  : `${log.value}`}
                            </span>
                            {!(section === 'strength' && log.source === 'training') && (
                              <button
                                type="button"
                                onClick={() => startEdit(section, log)}
                                className="text-muted-foreground transition-colors hover:text-primary"
                                title="编辑这条记录"
                              >
                                <Pencil className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemove(section, log)}
                              className="text-muted-foreground transition-colors hover:text-destructive"
                              title={section === 'strength' && log.source === 'training' ? '撤销这条训练导入记录' : '删除这条记录'}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function ENDURANCE_LEVELS_LEN(): number {
  return ENDURANCE_METRICS[0].levels.length;
}

function ATHLETIC_LEVELS_LEN(): number {
  return ATHLETIC_METRICS[0].levels.length;
}
