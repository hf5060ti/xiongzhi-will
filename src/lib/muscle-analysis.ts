// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 训练记录 → 肌群聚合统计 + 结构平衡比（Poliquin / Thibaudeau / ATG 流派的经验参考值，非硬性标准）。
import type { TrainingLog } from '@/lib/store';
import { resolveMuscles } from './muscle-map';

export interface MuscleStat {
  /** 累计训练容量（重量 × 次数；自重不计） */
  volume: number;
  /** 累计组数 */
  sets: number;
  /** 含该肌群的训练记录条数 */
  sessions: number;
  /** 最近训练日期 iso */
  lastTrained: string | null;
  /** 距今天数（基于 now）；从未训练为 null */
  gapDays: number | null;
}

const EMPTY = (): MuscleStat => ({ volume: 0, sets: 0, sessions: 0, lastTrained: null, gapDays: null });

function gapBetween(aIso: string, bIso: string): number {
  const a = new Date(aIso + 'T00:00:00').getTime();
  const b = new Date(bIso + 'T00:00:00').getTime();
  return Math.round((b - a) / 86_400_000);
}

/** 把训练记录按肌群聚合：每个动作解析出的肌群（primary + secondary 合并）平分该动作的容量 / 组数。 */
export function analyzeMuscleVolume(logs: TrainingLog[], now: Date = new Date()): Record<string, MuscleStat> {
  const stats: Record<string, MuscleStat> = {};
  const ensure = (m: string): MuscleStat => (stats[m] ??= EMPTY());

  for (const log of logs) {
    for (const ex of log.exercises) {
      const me = resolveMuscles(ex.name);
      if (!me) continue;
      const involved = Array.from(new Set([...me.primary, ...me.secondary]));
      if (involved.length === 0) continue;
      const exVolume = ex.sets.reduce((s, set) => s + (set.weightKg ?? 0) * (set.reps ?? 0), 0);
      const exSets = ex.sets.length;
      for (const m of involved) {
        const st = ensure(m);
        st.volume += exVolume;
        st.sets += exSets;
        st.sessions += 1;
        if (!st.lastTrained || log.date > st.lastTrained) st.lastTrained = log.date;
      }
    }
  }

  // 用本地日期算「今天」，避免 UTC 偏移导致跨日偏差（与训练记录的本地日期字符串口径一致）
  const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  for (const st of Object.values(stats)) {
    st.gapDays = st.lastTrained ? gapBetween(st.lastTrained, todayIso) : null;
  }
  return stats;
}

// ── 结构平衡比（经验参考，不同流派取值有差异） ──────────────────────────────
export interface BalanceRatio {
  id: string;
  label: string;
  /** 实际 a / b 比值 */
  actual: number;
  /** 推荐区间文本 */
  recommended: string;
  /** 理想比值（用于容差判定） */
  ideal: number;
  status: 'balanced' | 'slight' | 'imbalanced';
  note: string;
}

// 推 / 拉 肌群分组：肩（shoulders）因双向参与，不计入推拉比，单独看
const PUSH_MUSCLES = ['chest', 'triceps'];
const PULL_MUSCLES = ['lats', 'middle back', 'lower back', 'traps', 'biceps'];

function sumVol(stats: Record<string, MuscleStat>, muscles: string[]): number {
  return muscles.reduce((s, m) => s + (stats[m]?.volume ?? 0), 0);
}

function ratioStatus(actual: number, ideal: number, tight: number, loose: number): BalanceRatio['status'] {
  const dev = Math.abs(actual - ideal) / ideal;
  if (dev <= tight) return 'balanced';
  if (dev <= loose) return 'slight';
  return 'imbalanced';
}

/** 基于各肌群累计容量，计算几个经典结构平衡比（仅作训练规划参考，非医疗/竞赛标准）。 */
export function analyzeBalance(stats: Record<string, MuscleStat>): BalanceRatio[] {
  const push = sumVol(stats, PUSH_MUSCLES);
  const pull = sumVol(stats, PULL_MUSCLES);
  const quad = stats['quadriceps']?.volume ?? 0;
  const ham = stats['hamstrings']?.volume ?? 0;
  const bi = stats['biceps']?.volume ?? 0;
  const tri = stats['triceps']?.volume ?? 0;
  const abs = stats['abdominals']?.volume ?? 0;
  const low = stats['lower back']?.volume ?? 0;

  const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);

  return [
    {
      id: 'push-pull',
      label: '推 : 拉',
      actual: safeDiv(push, pull),
      recommended: '≈ 1:1（拉可略多，抵消现代生活前侧紧张）',
      ideal: 1,
      status: ratioStatus(safeDiv(push, pull), 1, 0.3, 0.6),
      note: `推肌群 ${Math.round(push)} kg·组 vs 拉肌群 ${Math.round(pull)} kg·组`,
    },
    {
      id: 'quad-ham',
      label: '股四头 : 腘绳',
      actual: safeDiv(quad, ham),
      recommended: '≈ 2:1（腘绳易被忽视，比例过高易腘绳拉伤）',
      ideal: 2,
      status: ratioStatus(safeDiv(quad, ham), 2, 0.35, 0.7),
      note: `股四头 ${Math.round(quad)} vs 腘绳 ${Math.round(ham)}`,
    },
    {
      id: 'bi-tri',
      label: '二头 : 三头',
      actual: safeDiv(bi, tri),
      recommended: '≈ 1:1（三头更大，可略多练）',
      ideal: 1,
      status: ratioStatus(safeDiv(bi, tri), 1, 0.4, 0.8),
      note: `二头 ${Math.round(bi)} vs 三头 ${Math.round(tri)}`,
    },
    {
      id: 'abs-lowback',
      label: '腹 : 下背',
      actual: safeDiv(abs, low),
      recommended: '≈ 1:1（核心前后平衡，避免骨盆前/后倾）',
      ideal: 1,
      status: ratioStatus(safeDiv(abs, low), 1, 0.5, 1),
      note: `腹 ${Math.round(abs)} vs 下背 ${Math.round(low)}`,
    },
  ];
}
