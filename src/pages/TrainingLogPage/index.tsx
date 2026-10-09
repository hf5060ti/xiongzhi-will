// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 训练记录页（训练闭环）
 * - 逐个动作录入逐组「重量 × 次数」，历史记录可按条编辑 / 删除 / 清空
 * - 概览：近 7 天训练频次（练了几次）与周训练容量（重量 × 次数 求和）
 * - 命中力量五动作（深蹲 / 卧推 / 硬拉 / 站姿推举 / 杠铃弯举）时，用 Epley 公式估算 1RM，
 *   可一键写入能力追踪：value 存体重倍数、带写入当时的体重快照，写入后可撤销
 * - 1RM 口径与能力追踪判级、身体数据页换算器完全一致（Epley）
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useNow } from '@/hooks/useNow';
import { BarChart3, CalendarDays, Check, Clock, Dumbbell, Download, Eraser, Flame, HeartPulse, Medal, Moon, Pencil, Play, Plus, Save, Scale, Share2, SkipForward, Trash2, TrendingUp, Undo2, X } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  loadLightEntries,
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
import {
  assessRecovery,
  loadRecoveryLog,
  shouldDeload,
  todayIso,
  upsertRecovery,
  type RecoveryEntry,
} from '@/lib/recovery';
import { getOverloadAdvice } from '@/lib/progressive-overload';
import { generateShareCard } from '@/lib/share-card';

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

/** 所在周的周一 0 点（周一到周日为一周） */
function weekStartOf(date: Date): Date {
  const d = new Date(date);
  const dow = (d.getDay() + 6) % 7; // 周一 = 0
  d.setDate(d.getDate() - dow);
  d.setHours(0, 0, 0, 0);
  return d;
}

/** 该动作在指定日期之前最近一次记录的最佳表现（用于历史列表「vs 上次」对比） */
function prevBestBefore(
  logs: TrainingLog[],
  date: string,
  name: string,
  sameEx: (a: string, b: string) => boolean,
): { date: string; weightKg: number; reps: number } | null {
  let best: { date: string; weightKg: number; reps: number } | null = null;
  for (const l of logs) {
    if (l.date >= date) continue;
    for (const ex of l.exercises) {
      if (!sameEx(ex.name, name)) continue;
      const b = bestSetOf(ex);
      if (!b) continue;
      if (!best || l.date > best.date) best = { date: l.date, weightKg: b.weightKg, reps: b.reps };
    }
  }
  return best;
}

/** 某动作全部历史中的「最佳表现」，按日期降序（含本次所在记录，用于连续两次追平检测） */
function rankedBests(logs: TrainingLog[], name: string, sameEx: (a: string, b: string) => boolean) {
  const hits: { date: string; weightKg: number; reps: number }[] = [];
  for (const l of logs) {
    for (const ex of l.exercises) {
      if (!sameEx(ex.name, name)) continue;
      const b = bestSetOf(ex);
      if (b) hits.push({ date: l.date, weightKg: b.weightKg, reps: b.reps });
    }
  }
  hits.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return hits;
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
  const [recoveryLog, setRecoveryLog] = useState<RecoveryEntry[]>(() => loadRecoveryLog());
  const [recSleep, setRecSleep] = useState<string>('');
  const [recSoreness, setRecSoreness] = useState<string>('');
  const [recStress, setRecStress] = useState<string>('');
  const [perf, setPerf] = useState<PerformanceLogs>(loadPerformanceLogs);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [date, setDate] = useState(todayStr());
  const [dayLabel, setDayLabel] = useState('');
  const [durationMin, setDurationMin] = useState('');
  const [note, setNote] = useState('');
  const [exs, setExs] = useState<DraftExercise[]>([emptyExercise()]);
  const [confirmClear, setConfirmClear] = useState(false);
  const [shareCardUrl, setShareCardUrl] = useState<string | null>(null);
  const [runnerOpen, setRunnerOpen] = useState(false);

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

  /** 近 8 周（周一到周日）每周训练容量与训练天数，供容量趋势图 */
  const volumeTrend = useMemo(() => {
    const now = new Date();
    const thisMonday = weekStartOf(now);
    const out: { label: string; volume: number; sessions: number }[] = [];
    for (let i = 7; i >= 0; i--) {
      const start = new Date(thisMonday);
      start.setDate(thisMonday.getDate() - i * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      const startIso = isoOf(start);
      const endIso = isoOf(end);
      const inWeek = logs.filter((l) => l.date >= startIso && l.date <= endIso);
      out.push({
        label: `${start.getMonth() + 1}/${start.getDate()}`,
        volume: Math.round(inWeek.reduce((s, l) => s + logVolume(l), 0)),
        sessions: inWeek.length,
      });
    }
    return out;
  }, [logs]);

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

  // 当前时间（每分钟刷新）：渲染期不能调 Date.now()，统一从 hook 取
  const now = useNow();

  /** 距今天数差 */
  const daysAgo = (iso: string) => {
    const d = Math.round((now - new Date(iso + 'T00:00:00').getTime()) / 86400000);
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

  /** 存档统计（游戏存档式面板）：总训练次数 / 累计容量 / 累计组数 / 连续训练 / 最长连续 / 动作 PR 数 */
  const stats = useMemo(() => {
    const totalSessions = logs.length;
    const totalVolume = logs.reduce((s, l) => s + logVolume(l), 0);
    const totalSets = logs.reduce((s, l) => s + l.exercises.reduce((x, ex) => x + ex.sets.length, 0), 0);
    const dates = [...new Set(logs.map((l) => l.date))].sort();
    // 连续训练天数：今天已练从今天起算；今天没练则从最近一个训练日起算（不算断档）
    let streak = 0;
    if (dates.length > 0) {
      const set = new Set(dates);
      // cur 只做原地推进（setDate），不重新赋值，用 const
      const cur = new Date();
      if (!set.has(isoOf(cur))) cur.setDate(cur.getDate() - 1);
      while (set.has(isoOf(cur))) {
        streak++;
        cur.setDate(cur.getDate() - 1);
      }
    }
    // 最长连续训练段
    let longest = 0;
    let run = 0;
    let prevDay = -1;
    for (const d of dates) {
      const day = Math.round((new Date(d + 'T00:00:00').getTime() - new Date(dates[0] + 'T00:00:00').getTime()) / 86400000);
      run = prevDay === -1 || day === prevDay + 1 ? run + 1 : 1;
      if (run > longest) longest = run;
      prevDay = day;
    }
    // 动作 PR 数：每个动作名取历史最佳 1RM，统计共有多少个动作留下了纪录
    const prMap = new Map<string, number>();
    for (const l of logs) {
      for (const ex of l.exercises) {
        const b = bestSetOf(ex);
        if (!b) continue;
        const key = ex.name.trim().toLowerCase();
        const cur = prMap.get(key);
        if (cur == null || b.oneRm > cur) prMap.set(key, b.oneRm);
      }
    }
    return { totalSessions, totalVolume, totalSets, streak, longest, prCount: prMap.size };
  }, [logs]);

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
    setDurationMin('');
    setNote('');
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
    const durNum = Number(durationMin);
    const durOk = Number.isFinite(durNum) && durNum > 0 && durNum <= 600;
    const noteTrim = note.trim();
    if (editingId) {
      const prev = logs.find((l) => l.id === editingId);
      setLogs(
        updateTrainingLog(editingId, {
          id: editingId,
          date,
          dayLabel: dayLabel || undefined,
          exercises,
          note: noteTrim || undefined,
          durationMin: durOk ? Math.round(durNum) : undefined,
          createdAt: prev?.createdAt, // 保留原录入时间，同日多条的排序不因编辑而跳位
        }),
      );
      toast.success(`已更新并保存到本机：${date} 的训练日志（${exercises.length} 个动作）`);
    } else {
      setLogs(
        appendTrainingLog({
          date,
          dayLabel: dayLabel || undefined,
          exercises,
          note: noteTrim || undefined,
          durationMin: durOk ? Math.round(durNum) : undefined,
        }),
      );
      toast.success(`已存档：${date} 的训练日志（${exercises.length} 个动作），数据保存在本机`);
    }
    resetForm();
  };

  const startEdit = (log: TrainingLog) => {
    setEditingId(log.id ?? null);
    setDate(log.date);
    setDayLabel(log.dayLabel ?? '');
    setDurationMin(log.durationMin != null ? String(log.durationMin) : '');
    setNote(log.note ?? '');
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
    toast.info('已载入这条日志，改完点「保存修改」');
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

  /** 执行模式：从当前草稿动作构建逐组序列 */
  const runnerEntries: RunnerEntry[] = (() => {
    const out: RunnerEntry[] = [];
    exs.forEach((ex, exIdx) => {
      if (!ex.name.trim()) return;
      const lift = matchLift(ex.name);
      const compound = Boolean(lift); // 深蹲/卧推/硬拉/推举/弯举等力量动作按复合时长
      ex.sets.forEach((set, setIdx) => {
        out.push({
          exIdx,
          setIdx,
          exerciseName: ex.name.trim(),
          compound,
          suggestedWeight: set.weight,
          suggestedReps: set.reps,
        });
      });
    });
    return out;
  })();

  /** 执行模式走完：直接用现场填的重量×次数存档（不等 exs state 更新） */
  const saveFromRunner = (results: RunnerResult[]) => {
    const byEx = new Map<number, { name: string; exerciseId?: string; sets: TrainingSet[] }>();
    for (const r of results) {
      const src = exs[r.exIdx];
      if (!src || !src.name.trim()) continue;
      if (!byEx.has(r.exIdx)) {
        byEx.set(r.exIdx, { name: src.name.trim(), exerciseId: src.exerciseId, sets: [] });
      }
      const bucket = byEx.get(r.exIdx)!;
      const set: TrainingSet = {};
      const w = Number(r.weight);
      if (Number.isFinite(w) && w > 0 && w <= 500) set.weightKg = Math.round(w * 10) / 10;
      const rp = Number(r.reps);
      if (Number.isFinite(rp) && rp > 0) set.reps = Math.round(rp);
      if (set.reps != null) bucket.sets.push(set);
    }
    const exercises: TrainingExercise[] = [];
    for (const b of byEx.values()) {
      if (b.sets.length > 0) exercises.push({ exerciseId: b.exerciseId, name: b.name, sets: b.sets });
    }
    setRunnerOpen(false);
    if (exercises.length === 0) return toast.error('没有填有效的组（每组至少要填次数）');
    const durNum = Number(durationMin);
    const durOk = Number.isFinite(durNum) && durNum > 0 && durNum <= 600;
    setLogs(
      appendTrainingLog({
        date,
        dayLabel: dayLabel || undefined,
        exercises,
        note: note.trim() || undefined,
        durationMin: durOk ? Math.round(durNum) : undefined,
      }),
    );
    resetForm();
    toast.success(`执行完成，已存档：${date}（${exercises.length} 个动作 · ${exercises.reduce((s, e) => s + e.sets.length, 0)} 组）`);
  };

  return (
    <div className="space-y-5">
      {/* 头部 */}
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <CalendarDays className="h-5 w-5 text-primary" />
          训练日志
        </h2>
        <p className="text-xs leading-relaxed text-muted-foreground">
          像写日志一样记录每次训练：日期 + 训练日 + 动作逐组「重量 × 次数」+ 时长与感受。命中力量五动作（深蹲 / 卧推 / 硬拉 / 站姿推举 / 杠铃弯举）会用 Epley
          公式估算 1RM，可一键写入能力追踪。1RM 口径与能力追踪判级、身体数据页换算器一致。
        </p>
      </div>

      {/* 自动保存提示（游戏存档式：数据只存在本机，关页面不丢） */}
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-primary/25 bg-primary/5 px-3 py-2 text-[11px] text-muted-foreground">
        <Save className="h-3.5 w-3.5 shrink-0 text-primary" />
        <span>
          每条日志保存后自动写入本机浏览器（localStorage），刷新、关页面、重启都不会丢；换设备或清理浏览器前，去首页「数据备份」导出一次即可随身带走。
        </span>
      </div>
      {/* 存档统计面板（游戏存档式：一眼看到总进度） */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            我的存档
            <span className="font-normal text-muted-foreground/70">—— 所有日志合计，自动累计，不用手动维护</span>
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-7 gap-1.5 px-2.5 text-[11px]"
            onClick={() => {
              const url = generateShareCard();
              if (!url) {
                toast('还没有可分享的数据：先录入体重或一条训练记录，再来生成分享卡');
                return;
              }
              setShareCardUrl(url);
            }}
          >
            <Share2 className="h-3.5 w-3.5 text-primary" />
            生成分享卡
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          <Card>
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground">总训练次数</p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">{stats.totalSessions}</p>
              <p className="text-[10px] text-muted-foreground">条日志</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground">累计容量</p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">
                {stats.totalVolume > 0 ? Math.round(stats.totalVolume).toLocaleString() : '—'}
              </p>
              <p className="text-[10px] text-muted-foreground">kg · 总吨位</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground">累计组数</p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">{stats.totalSets}</p>
              <p className="text-[10px] text-muted-foreground">有效组</p>
            </CardContent>
          </Card>
          <Card className="border-primary/30">
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground">连续训练</p>
              <p className="mt-0.5 font-display text-lg font-bold text-primary">{stats.streak}</p>
              <p className="text-[10px] text-muted-foreground">天 · 当前连击</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground">最长连续</p>
              <p className="mt-0.5 font-display text-lg font-bold text-foreground">{stats.longest}</p>
              <p className="text-[10px] text-muted-foreground">天 · 生涯纪录</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3">
              <p className="text-[10px] text-muted-foreground">动作 PR</p>
              <p className="mt-0.5 flex items-center gap-1 font-display text-lg font-bold text-foreground">
                <Medal className="h-4 w-4 text-primary" />
                {stats.prCount}
              </p>
              <p className="text-[10px] text-muted-foreground">个动作留过最佳 1RM</p>
            </CardContent>
          </Card>
        </div>
      </div>


      {/* PR 墙：力量五动作个人最佳 */}
      {(() => {
        const prRows = LIFTS.map((lift) => {
          let best: { oneRm: number; weightKg: number; reps: number; date: string } | null = null;
          let prevBest: { oneRm: number; weightKg: number; reps: number; date: string } | null = null;
          for (const l of logs) {
            for (const ex of l.exercises) {
              if (!matchLift(ex.name) || matchLift(ex.name)!.key !== lift.key) continue;
              for (const set of ex.sets) {
                if (set.weightKg == null || set.reps == null) continue;
                const oneRm = estimate1RM(set.weightKg, set.reps);
                if (!best || oneRm > best.oneRm) {
                  prevBest = best ? { ...best } : null;
                  best = { oneRm, weightKg: set.weightKg, reps: set.reps, date: l.date };
                } else if (
                  (!prevBest || oneRm > prevBest.oneRm) &&
                  l.date < (best?.date ?? '')
                ) {
                  prevBest = { oneRm, weightKg: set.weightKg, reps: set.reps, date: l.date };
                }
              }
            }
          }
          return { lift, best, prevBest };
        }).filter((r) => r.best);
        if (prRows.length === 0) return null;
        return (
          <Card className="border-primary/20">
            <CardContent className="p-4 sm:p-5">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Medal className="h-3.5 w-3.5 text-primary" />
                个人最佳 PR 墙 · 估算 1RM
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {prRows.map(({ lift, best, prevBest }) => {
                  const diff = prevBest ? best!.oneRm - prevBest.oneRm : null;
                  return (
                    <div
                      key={lift.key}
                      className="rounded-lg border border-border bg-card p-3 text-center"
                    >
                      <p className="text-[11px] text-muted-foreground">{lift.label}</p>
                      <p className="mt-1 font-display text-2xl font-bold text-primary">
                        {Math.round(best!.oneRm)}
                        <span className="ml-0.5 text-xs font-normal text-muted-foreground">kg</span>
                      </p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {best!.weightKg}kg × {best!.reps} 次 · {fmtDate(best!.date)}
                      </p>
                      {diff != null && diff > 0 ? (
                        <p className="mt-1 inline-block rounded bg-green-500/15 px-1.5 py-0.5 text-[10px] text-green-400">
                          +{Math.round(diff)} kg 新 PR
                        </p>
                      ) : (
                        <p className="mt-1 text-[10px] text-muted-foreground">保持中</p>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                1RM 用 Epley 公式估算（重量 × (1 + 次数/30)），非真实极限试举。
                PR 墙自动从训练日志里取每个力量动作的最高估算 1RM；想刷新纪录，就在训练里用更重的重量或同重量多做一次。
              </p>
            </CardContent>
          </Card>
        );
      })()}

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

      {/* 训练容量趋势（近 8 周） */}
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <BarChart3 className="h-3.5 w-3.5 text-primary" />
              训练容量趋势（近 8 周）
            </p>
            {weekVolume > 0 && (
              <span className="text-[11px] text-muted-foreground">
                本周 {weekVolume.toLocaleString()} kg · {weekSessions} 天
              </span>
            )}
          </div>
          {logs.some((l) => logVolume(l) > 0) ? (
            <>
              <div className="mt-3 h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeTrend} margin={{ top: 4, right: 8, bottom: 0, left: -22 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: 'var(--border)' }}
                    />
                    <YAxis
                      tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--popover)',
                        border: '1px solid var(--border)',
                        borderRadius: 8,
                        fontSize: 12,
                        color: 'var(--popover-foreground)',
                      }}
                      formatter={(value: number, name: string) =>
                        name === 'volume' ? [`${Number(value).toLocaleString()} kg`, '周容量'] : [`${value} 天`, '训练天数']
                      }
                      labelFormatter={(label: string) => `周起始 ${label}（周一）`}
                      cursor={{ fill: 'var(--primary)', fillOpacity: 0.06 }}
                    />
                    <Bar dataKey="volume" fill="var(--chart-1)" radius={[3, 3, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                容量 = 重量 × 次数 求和（自重动作不计入）。逐周对比能看出训练量是否在「渐进上升」；若连续 2–3
                周下滑且伴疲劳，可能训练过度，考虑减载一周。
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted-foreground">
              还没有带重量的记录，录入第一条后这里会自动生成每周容量曲线。
            </p>
          )}
        </CardContent>
      </Card>

      {/* 体重趋势（近 12 周） */}
      <Card>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-1">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Scale className="h-3.5 w-3.5 text-primary" />
              体重趋势（近 12 周）
            </p>
            {(() => {
              const entries = loadLightEntries();
              if (entries.length < 2) return null;
              const first = entries[0];
              const last = entries[entries.length - 1];
              const diff = Math.round((last.weight - first.weight) * 10) / 10;
              const sign = diff > 0 ? '+' : '';
              const color = diff > 0.3 ? 'text-red-400' : diff < -0.3 ? 'text-green-400' : 'text-muted-foreground';
              return (
                <span className={cn('text-[11px]', color)}>
                  {first.weight} → {last.weight} kg（{sign}{diff} kg）
                </span>
              );
            })()}
          </div>
          {(() => {
            const entries = loadLightEntries();
            if (entries.length < 2) {
              return (
                <p className="mt-3 text-sm text-muted-foreground">
                  还没有体重记录。去「身体数据」页或「轻盈计划」每天记一次体重，这里会自动画出曲线。
                </p>
              );
            }
            // 只取最近 84 天（12 周）
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - 84);
            const cutoffIso = cutoff.toISOString().slice(0, 10);
            const recent = entries.filter((e) => e.date >= cutoffIso);
            if (recent.length < 2) {
              return (
                <p className="mt-3 text-sm text-muted-foreground">
                  近 12 周记录不足 2 个点，继续记几天再来看曲线。
                </p>
              );
            }
            const data = recent.map((e) => ({
              label: `${Number(e.date.slice(5, 7))}/${Number(e.date.slice(8, 10))}`,
              weight: e.weight,
              bodyFat: e.bodyFat ?? undefined,
            }));
            return (
              <>
                <div className="mt-3 h-40 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -22 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis
                        dataKey="label"
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                        tickLine={false}
                        axisLine={{ stroke: 'var(--border)' }}
                        interval="preserveStartEnd"
                      />
                      <YAxis
                        domain={['dataMin - 1', 'dataMax + 1']}
                        tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
                        tickLine={false}
                        axisLine={false}
                      />
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
                            ? [`${Number(value).toFixed(1)} kg`, '体重']
                            : [`${Number(value).toFixed(1)}%`, '体脂']
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        dot={{ r: 2.5 }}
                        activeDot={{ r: 4 }}
                      />
                      {data.some((d) => d.bodyFat != null) && (
                        <Line
                          type="monotone"
                          dataKey="bodyFat"
                          stroke="#FF5A1F"
                          strokeWidth={1.5}
                          strokeDasharray="4 3"
                          dot={false}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                  体重按天看会抖（水分、排便、碳水储存都影响），看周平均趋势才有意义。
                  增肌期体重缓慢上升 + 容量同步上升 = 有效；如果体重涨了但容量没涨，多半是脂肪。
                </p>
              </>
            );
          })()}
        </CardContent>
      </Card>

      {/* 减载周自动判断 */}
      {(() => {
        const dl = shouldDeload(volumeTrend);
        if (!dl) return null;
        return (
          <Card className="border-yellow-500/40">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start gap-2">
                <Moon className="mt-0.5 h-4 w-4 shrink-0 text-yellow-400" />
                <div>
                  <p className="text-sm font-medium text-yellow-300">
                    建议下周安排减载周
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {dl.reason}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* 今日恢复状态 */}
      <Card>
        <CardContent className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <HeartPulse className="h-3.5 w-3.5 text-primary" />
              恢复状态（睡眠 / 酸痛 / 压力）· 仅本地保存
            </p>
          </div>
          {(() => {
            const v = assessRecovery(recoveryLog);
            if (v) {
              const color =
                v.level === 'bad'
                  ? 'border-red-500/40 text-red-300'
                  : v.level === 'warn'
                  ? 'border-yellow-500/40 text-yellow-300'
                  : 'border-green-500/40 text-green-300';
              return (
                <div className={cn('rounded-md border p-3 text-xs leading-relaxed', color)}>
                  <p className="font-medium">{v.title}</p>
                  <p className="mt-1 text-muted-foreground">{v.detail}</p>
                </div>
              );
            }
            return null;
          })()}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label className="text-[11px] text-muted-foreground">昨晚睡眠(h)</Label>
              <Input
                inputMode="decimal"
                placeholder="7.5"
                value={recSleep}
                onChange={(e) => setRecSleep(e.target.value)}
                className="mt-1 h-8"
              />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground">酸痛(1-5)</Label>
              <Input
                inputMode="numeric"
                placeholder="2"
                value={recSoreness}
                onChange={(e) => setRecSoreness(e.target.value)}
                className="mt-1 h-8"
              />
            </div>
            <div>
              <Label className="text-[11px] text-muted-foreground">压力(1-5)</Label>
              <Input
                inputMode="numeric"
                placeholder="2"
                value={recStress}
                onChange={(e) => setRecStress(e.target.value)}
                className="mt-1 h-8"
              />
            </div>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              const sleep = parseFloat(recSleep);
              const soreness = parseInt(recSoreness, 10);
              const stress = parseInt(recStress, 10);
              if (
                (recSleep && (isNaN(sleep) || sleep < 0 || sleep > 14)) ||
                (recSoreness && (isNaN(soreness) || soreness < 1 || soreness > 5)) ||
                (recStress && (isNaN(stress) || stress < 1 || stress > 5))
              ) {
                toast.error('数值范围：睡眠 0-14h，酸痛/压力 1-5');
                return;
              }
              const next = upsertRecovery({
                date: todayIso(),
                sleepHrs: recSleep ? sleep : undefined,
                soreness: recSoreness ? soreness : undefined,
                stress: recStress ? stress : undefined,
              });
              setRecoveryLog(next);
              toast.success('恢复状态已记录');
            }}
          >
            <Save className="mr-1 h-3.5 w-3.5" />
            记录今天
          </Button>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            恢复状态只存你浏览器本地。连续 3 天睡眠 &lt; 6h 或压力 ≥ 4 时，这里会主动提示你今天减量或休息——硬冲 PR 的代价往往是下周躺平一周。
          </p>
        </CardContent>
      </Card>

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
          {/* 本次训练：时长 + 感受（可选，让每篇日志更完整） */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-sm">本次训练时长（分钟）</Label>
              <Input
                type="number"
                min={1}
                max={600}
                placeholder="如 60（选填；单次力量训练建议 70 分钟内，超时为垃圾容量）"
                value={durationMin}
                onChange={(e) => setDurationMin(e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">训练感受 / 备注</Label>
              <Input
                placeholder="如：状态不错、最后一组力竭、腰有点紧（选填）"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="h-8 text-xs"
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
                    const progressed = h.prev && best
                      && (best.weightKg > h.prev.weightKg + 0.01
                        || (Math.abs(best.weightKg - h.prev.weightKg) <= 0.01 && best.reps > h.prev.reps));
                    // 已保存记录里最近两次是否停在完全相同的一组（身体可能已适应）
                    const ranks = rankedBests(logs, ex.name, sameEx);
                    const prevTwoSame = ranks.length >= 2
                      && Math.abs(ranks[0].weightKg - ranks[1].weightKg) < 0.01
                      && ranks[0].reps === ranks[1].reps;
                    const tip = progressed
                      ? '已超过上次表现，渐进超负荷完成 —— 下次可维持或再小幅加重'
                      : sameAsPrev && prevTwoSame
                        ? `上次与上上次都停在 ${ranks[0].weightKg}kg × ${ranks[0].reps} 次，这次又追平，身体已适应 → 下次务必 +2.5kg 或同重量多做 1–2 次`
                        : sameAsPrev
                          ? '已追平上次表现 → 下次可试着 +2.5kg，或同重量多做 1–2 次（渐进超负荷）'
                          : null;
                    return (
                      <div
                        className={cn(
                          'rounded-md border px-2.5 py-1.5 text-[11px]',
                          progressed
                            ? 'border-primary/30 bg-primary/10 text-primary'
                            : sameAsPrev && prevTwoSame
                              ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              : 'border-primary/20 bg-primary/5 text-primary',
                        )}
                      >
                        {h.prev && (
                          <span>
                            上次：<b>{h.prev.weightKg}kg × {h.prev.reps} 次</b>（{daysAgo(h.prev.date)}）
                          </span>
                        )}
                        {h.pr && (
                          <span className={cn('ml-2', progressed ? 'text-amber-600 dark:text-amber-400' : '')}>
                            PR：{h.pr.weightKg}kg × {h.pr.reps} 次（{daysAgo(h.pr.date)}）
                          </span>
                        )}
                        {tip && (
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{tip}</p>
                        )}
                        {best && best.weightKg && best.reps && (() => {
                          const advice = getOverloadAdvice(ex.name, [[{ weightKg: best.weightKg, reps: best.reps }]]);
                          if (!advice || !advice.nextWeightKg) return null;
                          return (
                            <p className="mt-1 text-[11px] font-medium text-primary">
                              下次建议：{advice.nextWeightKg}kg × {advice.nextReps} 次
                            </p>
                          );
                        })()}
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
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-primary/50 bg-primary/10 px-3 text-xs text-primary hover:bg-primary/20"
              onClick={() => setRunnerOpen(true)}
              disabled={!exs.some((e) => e.name.trim())}
            >
              <Play className="mr-1 h-3.5 w-3.5" />
              开始执行模式（健身房跟着走）
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
                        {log.durationMin != null && (
                          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="h-3 w-3" /> {log.durationMin} 分钟
                          </span>
                        )}
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

                    {log.note && (
                      <p className="mt-2 text-[11px] italic leading-relaxed text-muted-foreground">「{log.note}」</p>
                    )}

                    <div className="mt-2 space-y-1.5">
                      {log.exercises.map((ex, exIdx) => {
                        const lift = matchLift(ex.name);
                        const best = bestSetOf(ex);
                        const importedId = lift && log.id ? importedIds.get(`${log.id}|${lift.key}`) : undefined;
                        const prev = best ? prevBestBefore(logs, log.date, ex.name, sameEx) : null;
                        const vsPrev =
                          prev && best
                            ? best.weightKg > prev.weightKg + 0.01
                              ? { tone: 'good' as const, text: '↑ 超上次 · 渐进完成' }
                              : Math.abs(best.weightKg - prev.weightKg) <= 0.01 && best.reps >= prev.reps
                                ? { tone: 'flat' as const, text: '追平上次 → 下次 +2.5kg' }
                                : { tone: 'down' as const, text: `未到上次（差 ${(prev.weightKg - best.weightKg).toFixed(1)}kg）` }
                            : null;
                        return (
                          <div
                            key={exIdx}
                            className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/70 bg-muted/20 px-2.5 py-1.5"
                          >
                            <div className="flex flex-wrap items-center gap-2 text-xs">
                              <span className="text-foreground">{ex.name}</span>
                              <span className="text-muted-foreground">{ex.sets.map(formatSet).join(' / ')}</span>
                              {vsPrev && (
                                <span
                                  className={cn(
                                    'rounded-md border px-1.5 py-0.5 text-[10px]',
                                    vsPrev.tone === 'good'
                                      ? 'border-primary/50 bg-primary/10 text-primary'
                                      : vsPrev.tone === 'flat'
                                        ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                        : 'border-border text-muted-foreground',
                                  )}
                                  title={
                                    vsPrev.tone === 'flat'
                                      ? '与上次同样重量 × 次数 → 下次务必加 2.5kg 或同重量多做 1–2 次'
                                      : vsPrev.tone === 'good'
                                        ? `上次 ${prev.weightKg}kg × ${prev.reps} 次（${fmtDate(prev.date)}）`
                                        : `上次 ${prev.weightKg}kg × ${prev.reps} 次（${fmtDate(prev.date)}）`
                                  }
                                >
                                  {vsPrev.text}
                                </span>
                              )}
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

      {/* 执行模式全屏 overlay（健身房跟着走） */}
      {runnerOpen && runnerEntries.length > 0 && (
        <WorkoutRunner
          entries={runnerEntries}
          onFinish={saveFromRunner}
          onClose={() => setRunnerOpen(false)}
        />
      )}

      {/* 训练分享卡弹窗 */}
      <Dialog open={shareCardUrl !== null} onOpenChange={(open) => { if (!open) setShareCardUrl(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-1.5">
              <Share2 className="h-4 w-4 text-primary" />
              训练分享卡
            </DialogTitle>
            <DialogDescription>
              长按 / 右键图片可保存，或直接下载 PNG 分享到朋友圈、群聊。
            </DialogDescription>
          </DialogHeader>
          {shareCardUrl && (
            <img
              src={shareCardUrl}
              alt="雄性意志训练分享卡"
              className="mx-auto w-full max-w-[300px] rounded-lg border border-border/60 shadow-lg"
            />
          )}
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">关闭</Button>
            </DialogClose>
            {shareCardUrl && (
              <a
                href={shareCardUrl}
                download={`雄性意志-训练卡-${new Date().toISOString().slice(0, 10)}.png`}
                className="inline-flex"
              >
                <Button className="gap-1.5">
                  <Download className="h-4 w-4" />
                  下载 PNG
                </Button>
              </a>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


interface RunnerEntry {
  exIdx: number;
  setIdx: number;
  exerciseName: string;
  compound: boolean;
  suggestedWeight: string;
  suggestedReps: string;
}

interface RunnerResult {
  exIdx: number;
  setIdx: number;
  weight: string;
  reps: string;
}

/** 训练执行器：大字动作名 + 当前组 + 重量/次数大输入 + 完成后红色横幅与休息倒计时 */
function WorkoutRunner({
  entries,
  onFinish,
  onClose,
}: {
  entries: RunnerEntry[];
  onFinish: (results: RunnerResult[]) => void;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [weight, setWeight] = useState(entries[0]?.suggestedWeight ?? '');
  const [reps, setReps] = useState(entries[0]?.suggestedReps ?? '');
  const [resting, setResting] = useState(false);
  const [restLeft, setRestLeft] = useState(0);
  const resultsRef = useRef<RunnerResult[]>([]);
  const timerRef = useRef<number | null>(null);

  const current = entries[idx];
  const restTotal = current.compound ? 180 : 120;

  // 剩余秒数的镜像：interval 回调要读最新值，又不能把 restLeft 放进依赖（否则每秒重建定时器）
  const restLeftRef = useRef(0);
  useEffect(() => {
    restLeftRef.current = restLeft;
  }, [restLeft]);

  // 定时器回调里要调最新的 goNext（它闭包着当前 idx / entries），统一走 ref
  const goNextRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!resting) return;
    timerRef.current = window.setInterval(() => {
      const left = restLeftRef.current;
      if (left <= 1) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        setRestLeft(0);
        // 倒计时归零直接进下一组：不再靠「effect 里监听 restLeft === 0 再 setState」触发
        goNextRef.current();
        return;
      }
      setRestLeft(left - 1);
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [resting]);

  const goNext = () => {
    setResting(false);
    const ni = idx + 1;
    if (ni >= entries.length) {
      onFinish(resultsRef.current);
      return;
    }
    setIdx(ni);
    setWeight(entries[ni].suggestedWeight);
    setReps(entries[ni].suggestedReps);
  };

  useEffect(() => {
    goNextRef.current = goNext;
  });

  const completeSet = () => {
    resultsRef.current.push({ exIdx: current.exIdx, setIdx: current.setIdx, weight, reps });
    if (idx + 1 >= entries.length) {
      onFinish(resultsRef.current);
      return;
    }
    setRestLeft(restTotal);
    setResting(true);
  };

  const mm = String(Math.floor(restLeft / 60)).padStart(2, '0');
  const ss = String(restLeft % 60).padStart(2, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D0C]/97 p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-[#1A1D1B] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          title="退出执行模式（不保存）"
        >
          <X className="h-5 w-5" />
        </button>
        {!resting ? (
          <>
            <p className="text-center text-xs text-muted-foreground">
              第 {idx + 1} / {entries.length} 组
            </p>
            <h3 className="mt-2 text-center font-display text-2xl font-bold text-foreground">{current.exerciseName}</h3>
            <p className="mt-1 text-center text-[11px] text-muted-foreground">
              {current.compound ? '复合动作 · 建议休息约 3 分钟' : '孤立动作 · 建议休息约 2 分钟'}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-muted-foreground">重量 kg</label>
                <input
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  inputMode="decimal"
                  placeholder="自重留空"
                  className="mt-1 h-14 w-full rounded-xl border border-border bg-black/30 text-center font-display text-2xl font-bold text-foreground outline-none focus:border-[#F7E7CE]"
                />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground">次数</label>
                <input
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  inputMode="numeric"
                  placeholder="如 8"
                  className="mt-1 h-14 w-full rounded-xl border border-border bg-black/30 text-center font-display text-2xl font-bold text-foreground outline-none focus:border-[#F7E7CE]"
                />
              </div>
            </div>
            <button
              onClick={completeSet}
              className="mt-6 h-14 w-full rounded-xl bg-[#F7E7CE] font-display text-lg font-bold text-black transition-transform active:scale-[0.98]"
            >
              完成本组
            </button>
            <p className="mt-3 text-center text-[10px] text-muted-foreground">
              自然训练者需充分恢复磷酸原系统，避免下一组在疲劳状态下开始
            </p>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#EF4444]/15">
              <Check className="h-10 w-10 text-[#EF4444]" />
            </div>
            <h3 className="mt-4 font-display text-3xl font-bold text-[#EF4444]">完成！</h3>
            <p className="mt-2 text-sm text-muted-foreground">休息一下，准备下一组</p>
            <p className="mt-4 font-display text-5xl font-bold tabular-nums text-foreground">
              {mm}:{ss}
            </p>
            <button
              onClick={goNext}
              className="mt-6 inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <SkipForward className="h-4 w-4" /> 跳过休息，下一组
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
