// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 每动作个人记录（PR）浏览器本地持久化。
// 与 lib/store.ts 同一命名空间（fitness-goal-app），写入时同样派发 xy-store-write
// 事件以便云同步模块捕获；数据结构简单、单条最优记录（按估算 1RM 取最高）。
import { estimateOneRm } from '@/lib/body-math';

const NS = 'fitness-goal-app';
const KEY = 'exercise-pr';

interface StoredPR {
  /** 最佳单组重量 kg */
  weightKg: number;
  /** 该重量下的次数 */
  reps: number;
  /** 达成日期 YYYY-MM-DD */
  date: string;
  note?: string;
}

type PRMap = Record<string, StoredPR>;

function readAll(): PRMap {
  try {
    const raw = localStorage.getItem(`${NS}:${KEY}`);
    return raw ? (JSON.parse(raw) as PRMap) : {};
  } catch {
    return {};
  }
}

function writeAll(map: PRMap) {
  try {
    localStorage.setItem(`${NS}:${KEY}`, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('xy-store-write'));
  } catch {
    /* 隐私模式 / 禁用站点数据时静默降级 */
  }
}

export interface ExercisePR {
  weightKg: number;
  reps: number;
  /** 由重量 × 次数按 Epley 估算的 1RM（kg） */
  oneRmKg: number;
  date: string;
  note?: string;
  /** 本次写入是否刷新了个人纪录（新 1RM 高于旧值） */
  isNewRecord?: boolean;
}

export function getExercisePR(id: string): ExercisePR | null {
  const r = readAll()[id];
  if (!r) return null;
  return { ...r, oneRmKg: estimateOneRm(r.weightKg, r.reps) };
}

/**
 * 记录一条最佳成绩：以估算 1RM 为准，只有刷新纪录才覆盖旧的。
 * 返回写入后的记录（含 isNewRecord 标记）。
 */
export function setExercisePR(
  id: string,
  pr: { weightKg: number; reps: number; date: string; note?: string },
): ExercisePR {
  const all = readAll();
  const prev = all[id];
  const prevOneRm = prev ? estimateOneRm(prev.weightKg, prev.reps) : 0;
  const newOneRm = estimateOneRm(pr.weightKg, pr.reps);
  const isNewRecord = newOneRm > prevOneRm;
  all[id] = { weightKg: pr.weightKg, reps: pr.reps, date: pr.date, note: pr.note };
  writeAll(all);
  return { ...all[id], oneRmKg: newOneRm, isNewRecord };
}

export function clearExercisePR(id: string): void {
  const all = readAll();
  if (all[id]) {
    delete all[id];
    writeAll(all);
  }
}
