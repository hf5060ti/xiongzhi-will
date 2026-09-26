/**
 * 训练记录页（训练闭环）
 * - 逐个动作录入逐组「重量 × 次数」，历史记录可按条编辑 / 删除 / 清空
 * - 概览：近 7 天训练频次（练了几次）与周训练容量（重量 × 次数 求和）
 * - 命中力量五动作（深蹲 / 卧推 / 硬拉 / 站姿推举 / 杠铃弯举）时，用 Epley 公式估算 1RM，
 *   可一键写入能力追踪：value 存体重倍数、带写入当时的体重快照，写入后可撤销
 * - 1RM 口径与能力追踪判级、身体数据页换算器完全一致（Epley）
 */
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CalendarDays, Dumbbell, Eraser, Flame, Pencil, Plus, Save, Trash2, Undo2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  appendPerformanceLog,
  appendTrainingLog,
  clearTrainingLogs,
  latestWeightKg,
  loadPerformanceLogs,
  loadSplit,
  loadTrainingLogs,
  removePerformanceLog,
  removeTrainingLog,
  updateTrainingLog,
  type PerformanceLogs,
  type SplitType,
  type TrainingExercise,
  type TrainingLog,
  type TrainingSet,
} from '@/lib/store';
import exercisesData from '@/data/exercises-db.json';
import extData from '@/data/exercises-ext.json';
import { LIFTS, estimate1RM } from '@/lib/performance-standards';
import { cn } from '@/lib/utils';

interface DraftSet {
  weight: string;
  reps: string;
}

interface DraftExercise {
  exerciseId?: string;
  name: string;
  sets: DraftSet[];
}

/** 训练日预设：按当前训练分化（split）生成，另可自定义 */
const SPLIT_DAY_PRESETS: Record<SplitType, string[]> = {
  'push-pull-legs': ['推', '拉', '腿'],
  'upper-lower': ['上肢', '下肢'],
  'ppl-upper-lower': ['推', '拉', '上肢综合', '下肢综合'],
  'bro-split': ['胸', '背', '肩', '手臂', '腿'],
  'full-body': ['全身 A', '全身 B'],
};

const EXTRA_DAY_LABELS = ['全身', '有氧'];

/** 力量五动作中英文别名：动作名命中即视为该力量动作，取最佳组估算 1RM */
const LIFT_ALIASES: Record<string, string[]> = {
  squat: ['深蹲', 'squat'],
  bench: ['卧推', '平板卧推', 'bench press', 'bench'],
  deadlift: ['硬拉', 'deadlift'],
  ohp: ['站姿推举', '肩上推举', '肩推', '推举', 'overhead press', 'ohp'],
  curl: ['弯举', 'barbell curl', 'curl'],
};

interface MoveOption {
  id: string;
  name: string;
  alias: string;
}

/** 动作库联想词表（中文名优先，附英文名）：来自动作库数据，仍允许手写任意动作名 */
const MOVE_LIBRARY: MoveOption[] = (() => {
  const out: MoveOption[] = [];
  const seen = new Set<string>();
  const push = (id: unknown, name: unknown, alias: unknown) => {
    const label = typeof name === 'string' ? name.trim() : '';
    if (!label || seen.has(label)) return;
    seen.add(label);
    out.push({ id: String(id ?? ''), name: label, alias: typeof alias === 'string' ? alias : '' });
  };
  for (const e of extData as unknown as { id?: string; name?: string; nameZh?: string }[]) {
    push(e.id ?? '', e.nameZh || e.name, e.name);
  }
  for (const e of exercisesData as unknown as { id?: string; name?: string }[]) {
    push(e.id ?? '', e.name, e.name);
  }
  return out;
})();

/** 动作名联想：中文名或英文名包含关键词即命中，最多 6 条 */
function searchMoves(query: string, exactName: string, limit = 6): MoveOption[] {
  const key = query.trim().toLowerCase();
  if (!key) return [];
  const out: MoveOption[] = [];
  for (const m of MOVE_LIBRARY) {
    if (m.name === exactName) continue;
    if (m.name.toLowerCase().includes(key) || (m.alias && m.alias.toLowerCase().includes(key))) {
      out.push(m);
      if (out.length >= limit) break;
    }
  }
  return out;
}

function todayStr(): string {
  const d = new Date();
  return isoOf(d);
}

function isoOf(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function fmtDate(iso: string): string {
  return `${Number(iso.slice(5, 7))}/${Number(iso.slice(8, 10))}`;
}

/** 动作名是否命中力量五动作（宽松匹配：含中文名或英文别名即算，如「杠铃深蹲」/「Back Squat」→ 深蹲） */
function matchLift(name: string) {
  const n = name.replace(/\s/g, '').toLowerCase();
  for (const lift of LIFTS) {
    const aliases = LIFT_ALIASES[lift.key] ?? [lift.label];
    if (aliases.some((a) => n.includes(a.replace(/\s/g, '').toLowerCase()))) return lift;
  }
  return null;
}

function parseSet(raw: DraftSet): TrainingSet | null {
  const set: TrainingSet = {};
  const weight = raw.weight.trim() === '' ? null : Number(raw.weight);
  if (weight != null && Number.isFinite(weight) && weight > 0 && weight <= 500) {
    set.weightKg = Math.round(weight * 10) / 10;
  }
  const reps = Number(raw.reps);
  if (Number.isFinite(reps) && reps > 0) set.reps = Math.round(reps);
  if (set.reps == null) return null; // 次数为必填，空行自动丢弃
  return set;
}

/** 单条记录的训练容量（重量 × 次数求和；自重动作无重量则不计入） */
function logVolume(log: TrainingLog): number {
  return log.exercises.reduce(
    (sum, ex) => sum + ex.sets.reduce((s, set) => s + (set.weightKg ?? 0) * (set.reps ?? 0), 0),
    0,
  );
}

function formatSet(set: TrainingSet): string {
  const reps = set.reps != null ? `${set.reps} 次` : '—';
  return set.weightKg != null ? `${set.weightKg} kg × ${reps}` : `自重 × ${reps}`;
}

/** 该动作中估算 1RM 最高的一组（重量 × 次数都齐全才参与） */
function bestSetOf(ex: TrainingExercise): { oneRm: number; weightKg: number; reps: number } | null {
  let best: { oneRm: number; weightKg: number; reps: number } | null = null;
  for (const set of ex.sets) {
    if (set.weightKg == null || set.reps == null) continue;
    const oneRm = estimate1RM(set.weightKg, set.reps);
    if (!best || oneRm > best.oneRm) best = { oneRm, weightKg: set.weightKg, reps: set.reps };
  }
  return best;
}

const emptyExercise = (): DraftExercise => ({ name: '', sets: [{ weight: '', reps: '' }] });

export default function TrainingLogPage() {
  const [logs, setLogs] = useState<TrainingLog[]>(loadTrainingLogs);
  const [perf, setPerf] = useState<PerformanceLogs>(loadPerformanceLogs);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [date, setDate] = useState(todayStr());
  const [dayLabel, setDayLabel] = useState('');
  const [exs, setExs] = useState<DraftExercise[]>([emptyExercise()]);
  const [confirmClear, setConfirmClear] = useState(false);

  // 力量判级 / 写入能力追踪所需的体重（与能力追踪页同口径：优先快捷体重，回退身体档案）
  const weightKg = latestWeightKg();

  const week = useMemo(() => {
    const out: { iso: string; label: string; count: number; volume: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const iso = isoOf(d);
      const dayLogs = logs.filter((l) => l.date === iso);
      out.push({
        iso,
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        count: dayLogs.length,
        volume: dayLogs.reduce((sum, l) => sum + logVolume(l), 0),
      });
    }
    return out;
  }, [logs]);

  const weekSessions = week.filter((d) => d.count > 0).length;

  /** 同名动作判定：互相包含即视为同动作（"卧推" ≈ "杠铃卧推"） */
  const sameEx = (a: string, b: string) => {
    const x = a.trim().toLowerCase();
    const y = b.trim().toLowerCase();
    return x && y && (x.includes(y) || y.includes(x));
  };

  /** 查某动作历史：最近一次记录 + 历史最佳 PR */
  const historyOf = (name: string) => {
    if (!name.trim()) return null;
    let prev: { date: string; weightKg: number; reps: number; oneRm: number } | null = null;
    let pr: { weightKg: number; reps: number; oneRm: number; date: string } | null = null;
    for (const l of logs) {
      for (const ex of l.exercises) {
        if (!sameEx(ex.name, name)) continue;
        for (const set of ex.sets) {
          if (set.weightKg == null || set.reps == null) continue;
          const oneRm = estimate1RM(set.weightKg, set.reps);
          if (!prev || l.date > prev.date) prev = { date: l.date, weightKg: set.weightKg, reps: set.reps, oneRm };
          if (!pr || oneRm > pr.oneRm) pr = { weightKg: set.weightKg, reps: set.reps, oneRm, date: l.date };
        }
      }
    }
    return { prev, pr };
  };

  /** 距今天数差 */
  const daysAgo = (iso: string) => {
    const d = Math.round((Date.now() - new Date(iso + 'T00:00:00').getTime()) / 86400000);
    return d <= 0 ? '今天' : d === 1 ? '昨天' : `${d} 天前`;
  };
  const weekVolume = week.reduce((sum, d) => sum + d.volume, 0);
  const weekSets = useMemo(
    () =>
      logs
        .filter((l) => week.some((d) => d.iso === l.date))
        .reduce((sum, l) => sum + l.exercises.reduce((s, ex) => s + ex.sets.length, 0), 0),
    [logs, week],
  );

  /** 已写入能力追踪的训练条目：trainingLogId + 动作键 → 能力追踪记录 id */
  const importedIds = useMemo(() => {
    const map = new Map<string, string>();
    for (const l of perf.strength) {
      if (l.trainingLogId && l.id) map.set(`${l.trainingLogId}|${l.metric}`, l.id);
    }
    return map;
  }, [perf]);

  /** 训练日快捷项：按当前训练分化（split）生成，另附通用项 */
  const presetChips = useMemo(() => {
    const preset = SPLIT_DAY_PRESETS[loadSplit()] ?? [];
    return [...preset, ...EXTRA_DAY_LABELS];
  }, []);

  // ---------- 表单操作 ----------
  const resetForm = () => {
    setEditingId(null);
    setDate(todayStr());
    setDayLabel('');
    setExs([emptyExercise()]);
  };

  const updateExercise = (idx: number, next: Partial<DraftExercise>) =>
    setExs((prev) => prev.map((ex, i) => (i === idx ? { ...ex, ...next } : ex)));

  const updateSet = (exIdx: number, setIdx: number, next: Partial<DraftSet>) =>
    setExs((prev) =>
      prev.map((ex, i) =>
        i === exIdx ? { ...ex, sets: ex.sets.map((s, j) => (j === setIdx ? { ...s, ...next } : s)) } : ex,
      ),
    );

  const addSet = (exIdx: number) =>
    setExs((prev) =>
      prev.map((ex, i) => {
        if (i !== exIdx) return ex;
        const last = ex.sets[ex.sets.length - 1];
        return { ...ex, sets: [...ex.sets, { weight: last?.weight ?? '', reps: '' }] };
      }),
    );

  const removeSet = (exIdx: number, setIdx: number) =>
    setExs((prev) =>
      prev.map((ex, i) =>
        i === exIdx ? { ...ex, sets: ex.sets.filter((_, j) => j !== setIdx) } : ex,
      ),
    );

  const addExercise = () => setExs((prev) => [...prev, emptyExercise()]);

  const removeExercise = (exIdx: number) =>
    setExs((prev) => (prev.length === 1 ? [emptyExercise()] : prev.filter((_, i) => i !== exIdx)));

  const save = () => {
    if (!date) return toast.error('请选择日期');
    const exercises: TrainingExercise[] = [];
    for (const ex of exs) {
      const name = ex.name.trim();
      if (!name) continue;
      const sets = ex.sets.map(parseSet).filter((s): s is TrainingSet => Boolean(s));
      if (sets.length === 0) continue;
      exercises.push({ exerciseId: ex.exerciseId, name, sets });
    }
    if (exercises.length === 0) {
      return toast.error('请至少填写一个动作，并给该动作填上「重量 × 次数」');
    }
    if (editingId) {
      const prev = logs.find((l) => l.id === editingId);
      setLogs(
        updateTrainingLog(editingId, {
          id: editingId,
          date,
          dayLabel: dayLabel || undefined,
          exercises,
          createdAt: prev?.createdAt, // 保留原录入时间，同日多条的排序不因编辑而跳位
        }),
      );
      toast.success(`已更新 ${date} 的训练记录（${exercises.length} 个动作）`);
    } else {
      setLogs(appendTrainingLog({ date, dayLabel: dayLabel || undefined, exercises }));
      toast.success(`已记录 ${date} 的训练：${exercises.length} 个动作`);
    }
    resetForm();
  };

  const startEdit = (log: TrainingLog) => {
    setEditingId(log.id ?? null);
    setDate(log.date);
    setDayLabel(log.dayLabel ?? '');
    setExs(
      log.exercises.map((ex) => ({
        name: ex.name,
        sets:
          ex.sets.length > 0
            ? ex.sets.map((s) => ({
                weight: s.weightKg != null ? String(s.weightKg) : '',
                reps: s.reps != null ? String(s.reps) : '',
              }))
            : [{ weight: '', reps: '' }],
      })),
    );
    toast.info('已载入该条记录，改完点「保存修改」');
  };

  const removeLog = (log: TrainingLog) => {
    if (!log.id) return;
    const linked = perf.strength.filter((l) => l.trainingLogId === log.id).length;
    setLogs(removeTrainingLog(log.id));
    if (editingId === log.id) resetForm();
    toast.success(
      linked > 0
        ? `已删除 ${log.date} 的训练记录；已写入能力追踪的 ${linked} 条记录保留在能力追踪页，可在那里删除`
        : `已删除 ${log.date} 的训练记录`,
    );
  };

  const handleClearAll = () => {
    setConfirmClear(false);
    if (logs.length === 0) return toast.info('暂无训练记录');
    setLogs(clearTrainingLogs());
    resetForm();
    toast.success('已清空全部训练记录（能力追踪中已写入的条目需到能力追踪页删除）');
  };

  // ---------- 写入 / 撤销能力追踪 ----------
  const writeToTracker = (log: TrainingLog, liftLabel: string, oneRm: number, reps: number) => {
    const lift = LIFTS.find((l) => l.label === liftLabel);
    if (!lift || !log.id) return;
    if (weightKg <= 0) return toast.error('请先录入体重（身体档案或轻盈计划记一次体重），力量项需要体重快照');
    const ratio = Math.round((oneRm / weightKg) * 100) / 100;
    setPerf(
      appendPerformanceLog('strength', {
        date: log.date,
        metric: lift.key,
        value: ratio,
        reps,
        weightKg,
        oneRmKg: oneRm,
        source: 'training',
        trainingLogId: log.id,
      }),
    );
    toast.success(
      `已写入能力追踪：${lift.label} ${ratio.toFixed(2)}× 体重（估算 1RM ${oneRm} kg，体重快照 ${weightKg} kg）`,
    );
  };

  const undoFromTracker = (logId: string, metricKey: string) => {
    const target = perf.strength.find((l) => l.trainingLogId === logId && l.metric === metricKey);
    if (!target) return;
    setPerf(removePerformanceLog('strength', { id: target.id, metric: target.metric, date: target.date }));
    toast.success('已撤销该条能力追踪记录');
  };

  const history = [...logs].reverse();

  return (
    <div className="space-y-5">
      {/* 头部 */}
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <CalendarDays className="h-5 w-5 text-primary" />
          训练记录
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground">
          逐组记录「重量 × 次数」，历史可编辑、删除。命中力量五动作（深蹲 / 卧推 / 硬拉 / 站姿推举 / 杠铃弯举）时会用 Epley
          公式估算 1RM，可一键写入能力追踪：以体重倍数留档并带写入当时的体重快照，写入后可撤销。1RM 口径与能力追踪判级、身体数据页换算器一致。
        </p>
      </div>

      {/* 近 7 天概览 */}
      <div className="grid gap-3 lg:grid-cols-[1fr_1fr_1.4fr]">
        <Card>
          <CardContent className="p-4">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Flame className="h-3.5 w-3.5 text-primary" />
              近 7 天频次
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-foreground">{weekSessions}</span>
              <span className="text-xs text-muted-foreground">天有训练 · 共 {weekSets} 组</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">按记录条数统计，一天多条算同一天</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Dumbbell className="h-3.5 w-3.5 text-primary" />
              周训练容量
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-foreground">
                {weekVolume > 0 ? Math.round(weekVolume).toLocaleString() : '—'}
              </span>
              <span className="text-xs text-muted-foreground">kg（重量 × 次数）</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">自重动作不计入容量</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground">近 7 天分布</p>
            <div className="mt-2 flex items-end gap-1.5">
              {week.map((d) => (
                <div key={d.iso} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={cn(
                      'w-full rounded-sm border',
                      d.count > 0 ? 'border-primary bg-primary/25' : 'border-border bg-muted/40',
                    )}
                    style={{ height: d.count > 0 ? 26 : 10 }}
                    title={`${d.label}：${d.count} 条 · 容量 ${Math.round(d.volume)} kg`}
                  />
                  <span className="text-[10px] text-muted-foreground">{d.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 录入 / 编辑 */}
      <Card>
        <CardContent className="space-y-4 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">
                {editingId ? '编辑训练记录' : '录入今天的训练'}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {weightKg > 0
                  ? `体重快照：${weightKg} kg（写入能力追踪时按此折算倍数）`
                  : '尚未录入体重：力量动作仍可记录，但无法写入能力追踪（力量项按体重倍数判级）'}
              </p>
            </div>
            {editingId && (
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={resetForm}>
                <X className="mr-1 h-3.5 w-3.5" />
                取消编辑
              </Button>
            )}
          </div>

          <div className="grid gap-3 lg:grid-cols-[150px_1fr] lg:items-end">
            <div className="space-y-2">
              <Label htmlFor="tl-date" className="text-sm">日期</Label>
              <Input
                id="tl-date"
                type="date"
                max={todayStr()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">训练日</Label>
              <div className="flex flex-wrap gap-1.5">
                {presetChips.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDayLabel(dayLabel === d ? '' : d)}
                    className={cn(
                      'rounded-md border px-2.5 py-1 text-xs transition-colors',
                      dayLabel === d
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-muted-foreground hover:bg-accent',
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <Input
                value={presetChips.includes(dayLabel) ? '' : dayLabel}
                onChange={(e) => setDayLabel(e.target.value)}
                placeholder="或自定义训练日"
                className="h-8 w-full text-xs sm:w-44"
              />
            </div>
          </div>

          {/* 动作列表 */}
          <div className="space-y-3">
            {exs.map((ex, exIdx) => {
              const lift = matchLift(ex.name);
              const moveHints = searchMoves(ex.name, ex.name);
              const best = bestSetOf({
                name: ex.name,
                sets: ex.sets.map(parseSet).filter((s): s is TrainingSet => Boolean(s)),
              });
              return (
                <div key={exIdx} className="space-y-2 rounded-lg border border-border bg-muted/20 p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative w-full sm:w-64">
                      <Input
                        placeholder="动作名，可搜动作库或手写"
                        value={ex.name}
                        onChange={(e) => updateExercise(exIdx, { name: e.target.value, exerciseId: undefined })}
                        className="h-9 w-full"
                      />
                      {moveHints.length > 0 && (
                        <ul className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-md border border-border bg-popover py-1 shadow-lg">
                          {moveHints.map((m) => (
                            <li key={m.id || m.name}>
                              <button
                                type="button"
                                onClick={() => updateExercise(exIdx, { name: m.name, exerciseId: m.id || undefined })}
                                className="flex w-full items-baseline gap-2 px-2.5 py-1 text-left text-xs hover:bg-accent"
                              >
                                <span className="text-foreground">{m.name}</span>
                                {m.alias && m.alias !== m.name && (
                                  <span className="truncate text-[11px] text-muted-foreground">{m.alias}</span>
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {lift && <Badge variant="secondary" className="shrink-0">力量五动作 · {lift.label}</Badge>}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                      onClick={() => removeExercise(exIdx)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      删除动作
                    </Button>
                  </div>
                  {(() => {
                    const h = historyOf(ex.name);
                    if (!h || (!h.prev && !h.pr)) return null;
                    const sameAsPrev = h.prev && best
                      && Math.abs(best.weightKg - h.prev.weightKg) < 0.01
                      && best.reps >= h.prev.reps;
                    return (
                      <div className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1.5 text-[11px] text-primary">
                        {h.prev && (
                          <span>
                            上次：<b>{h.prev.weightKg}kg × {h.prev.reps} 次</b>（{daysAgo(h.prev.date)}）
                          </span>
                        )}
                        {h.pr && (
                          <span className="ml-2 text-amber-600 dark:text-amber-400">
                            PR：{h.pr.weightKg}kg × {h.pr.reps} 次（{daysAgo(h.pr.date)}）
                          </span>
                        )}
                        {sameAsPrev && (
                          <p className="mt-0.5 text-[11px] text-muted-foreground">
                            已追平上次表现 → 下次可试着 +2.5kg，或同重量多做 1–2 次（渐进超负荷）
                          </p>
                        )}
                      </div>
                    );
                  })()}

                  <div className="space-y-1.5">
                    {ex.sets.map((set, setIdx) => (
                      <div key={setIdx} className="flex flex-wrap items-center gap-2">
                        <span className="w-10 text-[11px] text-muted-foreground">第 {setIdx + 1} 组</span>
                        <Input
                          type="number"
                          min={0}
                          step="0.5"
                          placeholder="重量 kg（自重可留空）"
                          value={set.weight}
                          onChange={(e) => updateSet(exIdx, setIdx, { weight: e.target.value })}
                          className="h-8 w-28 text-xs sm:w-40"
                        />
                        <Input
                          type="number"
                          min={1}
                          step="1"
                          placeholder="次数"
                          value={set.reps}
                          onChange={(e) => updateSet(exIdx, setIdx, { reps: e.target.value })}
                          className="h-8 w-16 text-xs sm:w-24"
                        />
                        <button
                          type="button"
                          onClick={() => removeSet(exIdx, setIdx)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          title="删除这一组"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => addSet(exIdx)}>
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      加一组
                    </Button>
                    {lift && best && (
                      <span className="text-[11px] text-muted-foreground">
                        估算 1RM {best.oneRm} kg（{best.weightKg} kg × {best.reps} 次 ·
                        {weightKg > 0 ? ` ${(Math.round((best.oneRm / weightKg) * 100) / 100).toFixed(2)}× 体重` : ' 填体重后算倍数'}）
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 px-3 text-xs" onClick={addExercise}>
              <Plus className="mr-1 h-3.5 w-3.5" />
              加动作
            </Button>
            <Button className="ml-auto" onClick={save}>
              <Save className="mr-1.5 h-4 w-4" />
              {editingId ? '保存修改' : '保存训练记录'}
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            一组至少填「次数」；力量动作的重量越接近 1–8 次，1RM 估算越准。当天有训练记录后，轻盈计划「完成训练」会自动打勾。
          </p>
        </CardContent>
      </Card>

      {/* 历史记录 */}
      <Card>
        <CardContent className="space-y-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-foreground">历史记录（{logs.length} 条）</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                点铅笔载入表单修改，点垃圾桶按条删除；命中力量五动作的记录可一键写入 / 撤销能力追踪。
              </p>
            </div>
            {logs.length > 0 && (
              <Button variant="outline" size="sm" className="h-7 px-2 text-xs" onClick={() => setConfirmClear(true)}>
                <Eraser className="mr-1 h-3.5 w-3.5" />
                清空训练记录
              </Button>
            )}
          </div>

          {confirmClear && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-destructive/50 bg-destructive/5 px-3 py-2 text-xs">
              <span className="text-foreground">
                将删除全部 {logs.length} 条训练记录，删除后不可恢复（已写入能力追踪的条目不会被连带删除）。
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

          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">暂无训练记录，先在上面录入一条。</p>
          ) : (
            <ul className="space-y-3">
              {history.map((log, idx) => {
                const volume = logVolume(log);
                const setCount = log.exercises.reduce((s, ex) => s + ex.sets.length, 0);
                const sameDayCount = logs.filter((l) => l.date === log.date).length;
                const sameDayIndex = logs.filter((l) => l.date === log.date).findIndex((l) => l.id === log.id) + 1;
                return (
                  <li key={log.id ?? `${log.date}-${idx}`} className="rounded-lg border border-border bg-card p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{fmtDate(log.date)}</span>
                        {log.dayLabel && <Badge variant="secondary">{log.dayLabel}</Badge>}
                        {sameDayCount > 1 && (
                          <span className="text-[11px] text-muted-foreground">同日第 {sameDayIndex} 条</span>
                        )}
                        <span className="text-[11px] text-muted-foreground">
                          {log.exercises.length} 个动作 · {setCount} 组
                          {volume > 0 ? ` · 容量 ${Math.round(volume).toLocaleString()} kg` : ' · 自重 / 无重量'}
                        </span>
                      </div>
                      <span className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(log)}
                          className="text-muted-foreground transition-colors hover:text-primary"
                          title="编辑这条记录"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeLog(log)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          title="删除这条记录"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </div>

                    <div className="mt-2 space-y-1.5">
                      {log.exercises.map((ex, exIdx) => {
                        const lift = matchLift(ex.name);
                        const best = lift ? bestSetOf(ex) : null;
                        const importedId = lift && log.id ? importedIds.get(`${log.id}|${lift.key}`) : undefined;
                        return (
                          <div
                            key={exIdx}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/70 bg-muted/20 px-2.5 py-1.5"
                          >
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="text-foreground">{ex.name}</span>
                              <span className="text-muted-foreground">{ex.sets.map(formatSet).join(' / ')}</span>
                            </div>
                            {lift && best && (
                              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                                <span className="text-muted-foreground">
                                  1RM {best.oneRm} kg
                                  {weightKg > 0
                                    ? ` · ${(Math.round((best.oneRm / weightKg) * 100) / 100).toFixed(2)}× 体重`
                                    : ' · 填体重后可写入'}
                                </span>
                                {importedId ? (
                                  <span className="flex items-center gap-1.5">
                                    <Badge variant="secondary">已写入能力追踪</Badge>
                                    <button
                                      type="button"
                                      onClick={() => undoFromTracker(log.id!, lift.key)}
                                      className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-destructive"
                                      title="撤销这条能力追踪记录"
                                    >
                                      <Undo2 className="h-3.5 w-3.5" />
                                      撤销
                                    </button>
                                  </span>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-6 px-2 text-[11px]"
                                    onClick={() => writeToTracker(log, lift.label, best.oneRm, best.reps)}
                                  >
                                    写入能力追踪
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

/** 删除提示里用的日期格式化（避免与组件内同名变量冲突） */
function date0(log: TrainingLog): string {
  return log.date;
}
