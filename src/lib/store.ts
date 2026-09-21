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