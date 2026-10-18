// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 动作名 → 肌群解析：基于 exercises-db.json / exercises-ext.json 的 primaryMuscles / secondaryMuscles
// 构建「动作名（中/英）→ 肌群」索引，供训练记录按肌群聚合统计（肌肉热力图 / 结构平衡比）使用。
import exercisesDb from '@/data/exercises-db.json';
import exercisesExt from '@/data/exercises-ext.json';

/** 全站肌群枚举（小写，与数据源一致） */
export const MUSCLE_KEYS = [
  'chest',
  'lats',
  'middle back',
  'lower back',
  'traps',
  'shoulders',
  'biceps',
  'triceps',
  'forearms',
  'abdominals',
  'neck',
  'quadriceps',
  'hamstrings',
  'glutes',
  'adductors',
  'abductors',
  'calves',
] as const;

export type MuscleKey = (typeof MUSCLE_KEYS)[number];

/** 肌群中文名（用于热力图展示） */
export const MUSCLE_LABELS: Record<string, string> = {
  chest: '胸',
  lats: '背阔肌',
  'middle back': '中背',
  'lower back': '下背',
  traps: '斜方肌',
  shoulders: '肩',
  biceps: '肱二头',
  triceps: '肱三头',
  forearms: '前臂',
  abdominals: '腹',
  neck: '颈',
  quadriceps: '股四头',
  hamstrings: '腘绳肌',
  glutes: '臀',
  adductors: '内收肌',
  abductors: '外展肌',
  calves: '小腿',
};

export function getMuscleLabel(key: string): string {
  return MUSCLE_LABELS[key] ?? key;
}

export interface MuscleEntry {
  primary: string[];
  secondary: string[];
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, '');
}

const index = new Map<string, MuscleEntry>();

function register(name: string | undefined, zh: string | undefined, primary: string[], secondary: string[]) {
  const entry: MuscleEntry = {
    primary: (primary ?? []).filter((m) => (MUSCLE_KEYS as readonly string[]).includes(m)),
    secondary: (secondary ?? []).filter((m) => (MUSCLE_KEYS as readonly string[]).includes(m)),
  };
  if (entry.primary.length === 0 && entry.secondary.length === 0) return;
  const keys: string[] = [];
  if (name) keys.push(normalize(name));
  if (zh) keys.push(normalize(zh));
  // 同名只取首次写入；name 与 nameZh 指向同一份肌群
  for (const k of keys) if (!index.has(k)) index.set(k, entry);
}

// 构建索引：英文库 + 中文扩展库
for (const e of exercisesDb as Array<{ name?: string; primaryMuscles?: string[]; secondaryMuscles?: string[] }>) {
  register(e.name, undefined, e.primaryMuscles ?? [], e.secondaryMuscles ?? []);
}
for (const e of exercisesExt as Array<{
  name?: string;
  nameZh?: string;
  primaryMuscles?: string[];
  secondaryMuscles?: string[];
}>) {
  register(e.name, e.nameZh, e.primaryMuscles ?? [], e.secondaryMuscles ?? []);
}

/** 解析动作名对应的肌群（合并 primary + secondary）。返回 null 表示动作库里没有该动作。 */
export function resolveMuscles(exerciseName: string): MuscleEntry | null {
  const n = normalize(exerciseName);
  if (!n) return null;
  const exact = index.get(n);
  if (exact) return exact;
  // 模糊：索引里找互相包含的最长匹配（兼容「杠铃深蹲」命中「深蹲」这类情况）
  let best: MuscleEntry | null = null;
  let bestLen = 0;
  for (const [k, v] of index) {
    if (k.includes(n) || n.includes(k)) {
      if (k.length > bestLen) {
        best = v;
        bestLen = k.length;
      }
    }
  }
  return best;
}
