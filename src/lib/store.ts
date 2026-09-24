// EXPORTS: loadGoalId, saveGoalId, loadDietId, saveDietId, loadWeightKg, saveWeightKg
// 用户选择（目标 / 饮食 / 体重）的浏览器本地持久化，命名空间 fitness-goal-app
const NS = 'fitness-goal-app';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${NS}:${key}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
  } catch {
    /* 隐私模式 / 禁用站点数据时静默降级 */
  }
}

export function loadGoalId(): string {
  return read<string>('goal', '');
}

export function saveGoalId(id: string) {
  write('goal', id);
}

export function loadDietId(): string {
  return read<string>('diet', '');
}

export function saveDietId(id: string) {
  write('diet', id);
}

export function loadWeightKg(): number {
  const v = read<number>('weight', 0);
  return typeof v === 'number' && v > 0 ? v : 0;
}

export function saveWeightKg(kg: number) {
  write('weight', kg);
}

// ---------- 身体数据（身体数据页输入，本地持久化便于随时整改） ----------
export interface BodyProfile {
  sex: 'male' | 'female';
  age: string;
  heightCm: string;
  weightKg: string;
  bodyFatPct: string;
  wristCm: string;
  ankleCm: string;
  level: string;
  activity: string;
  phase: string;
}

const BODY_DEFAULTS: BodyProfile = {
  sex: 'male',
  age: '',
  heightCm: '',
  weightKg: '',
  bodyFatPct: '',
  wristCm: '',
  ankleCm: '',
  level: 'beginner',
  activity: 'moderate',
  phase: 'bulk',
};

export function loadBodyProfile(): BodyProfile {
  const v = read<BodyProfile>('body', BODY_DEFAULTS);
  return { ...BODY_DEFAULTS, ...v };
}

export function saveBodyProfile(p: BodyProfile) {
  write('body', p);
}


// ---------- 训练架构：分化方式 + 金字塔强度 ----------
export type SplitType = 'push-pull-legs' | 'upper-lower' | 'bro-split' | 'full-body' | 'ppl-upper-lower';
export type PyramidType = 'reverse' | 'straight' | 'russian' | 'double';

export function loadSplit(): SplitType {
  return read<SplitType>('split', 'push-pull-legs');
}
export function saveSplit(s: SplitType) { write('split', s); }

export function loadPyramid(): PyramidType {
  return read<PyramidType>('pyramid', 'reverse');
}
export function savePyramid(p: PyramidType) { write('pyramid', p); }

// ---------- 轻盈计划：减脂追踪（目标 / 体重体脂记录 / 每日打卡） ----------
export interface LightTarget {
  startWeight: number;   // 起始体重 kg
  targetWeight: number;  // 目标体重 kg
  startDate: string;     // YYYY-MM-DD
}

export interface LightEntry {
  date: string;          // YYYY-MM-DD，同一天只保留最新一条
  weight: number;        // kg
  bodyFat?: number;      // 体脂率 %（选填）
}

export type LightCheckinKey = 'diet' | 'training' | 'sleep';
export type LightCheckins = Record<string, Partial<Record<LightCheckinKey, boolean>>>;

export function loadLightTarget(): LightTarget | null {
  const v = read<LightTarget | null>('light-target', null);
  if (v && v.startWeight > 0 && v.targetWeight > 0 && v.startDate) return v;
  return null;
}

export function saveLightTarget(t: LightTarget) {
  write('light-target', t);
}

export function loadLightEntries(): LightEntry[] {
  const v = read<LightEntry[]>('light-entries', []);
  return Array.isArray(v) ? v.filter((e) => e && e.date && e.weight > 0) : [];
}

export function saveLightEntries(entries: LightEntry[]) {
  write('light-entries', entries);
}

/** 追加 / 覆盖一条记录（同日期覆盖），保持按日期升序；最新体重自动同步到全站体重档案 */
export function upsertLightEntry(entry: LightEntry) {
  const entries = loadLightEntries().filter((e) => e.date !== entry.date);
  entries.push(entry);
  entries.sort((a, b) => a.date.localeCompare(b.date));
  saveLightEntries(entries);
  // 只有记的是最新一条才同步，补录历史不打扰当前档案
  if (entries[entries.length - 1].date === entry.date) syncLightWeightToProfile();
}

/** 把轻盈计划最新一条体重同步到全站：快捷体重（有氧/自重消耗计算）+ 身体数据页档案 */
export function syncLightWeightToProfile() {
  const entries = loadLightEntries();
  const latest = entries[entries.length - 1];
  if (!latest) return;
  saveWeightKg(latest.weight);
  const body = loadBodyProfile();
  saveBodyProfile({ ...body, weightKg: String(latest.weight) });
}

export function loadLightCheckins(): LightCheckins {
  return read<LightCheckins>('light-checkins', {});
}

export function saveLightCheckins(all: LightCheckins) {
  write('light-checkins', all);
}

export function toggleLightCheckin(date: string, key: LightCheckinKey) {
  const all = loadLightCheckins();
  const day = all[date] ?? {};
  all[date] = { ...day, [key]: !day[key] };
  saveLightCheckins(all);
  return all;
}

// ---------- 今日饮食记录（营养页写入，目标比对见 lib/nutrition-targets.ts） ----------
// 说明：shortKey 与数据结构沿用既有约定，旧数据零迁移
export interface LogEntry {
  foodId: string;
  name: string;
  grams: number;
  meal: string;
  kcal: number;
  protein: number;
  fat: number;
  carb: number;
}

export function loadDailyLog(): LogEntry[] {
  const v = read<LogEntry[]>('daily-log', []);
  return Array.isArray(v) ? v.filter((e) => e && typeof e.name === 'string') : [];
}

export function saveDailyLog(entries: LogEntry[]) {
  write('daily-log', entries);
}

// ---------- 数据备份与恢复 ----------
export function exportAllData(): string {
  const data: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(`${NS}:`)) {
      const shortKey = key.slice(NS.length + 1);
      try {
        data[shortKey] = JSON.parse(localStorage.getItem(key) || '');
      } catch {
        data[shortKey] = localStorage.getItem(key);
      }
    }
  }
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), data }, null, 2);
}

export function importAllData(json: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(json);
    if (!parsed.data || typeof parsed.data !== 'object') {
      return { success: false, count: 0, error: '文件格式不正确' };
    }
    let count = 0;
    for (const [key, value] of Object.entries(parsed.data)) {
      localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
      count++;
    }
    return { success: true, count };
  } catch {
    return { success: false, count: 0, error: 'JSON 解析失败' };
  }
}