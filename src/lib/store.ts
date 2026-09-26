// EXPORTS: loadGoalId, saveGoalId, loadDietId, saveDietId, loadWeightKg, saveWeightKg,
//          loadLastBackupAt, saveLastBackupAt,
//          MEASURE_KEYS, MEASURE_META, loadMeasurements, saveMeasurements,
//          upsertMeasurement, removeMeasurement, latestMeasurement,
//          loadPerformanceLogs, savePerformanceLogs, appendPerformanceLog,
//          updatePerformanceLog, removePerformanceLog, clearPerformanceSection,
//          clearPerformanceLogs, latestWeightKg, loadSexSetting, saveSexSetting,
//          loadTrainingLogs, saveTrainingLogs, appendTrainingLog, updateTrainingLog,
//          removeTrainingLog, clearTrainingLogs, hasTrainingOn
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

// ---------- 备份提醒（导出时记录时间戳；该键随全量备份一并导出 / 导入） ----------
export function loadLastBackupAt(): number | null {
  const v = read<number>('last-backup', 0);
  return typeof v === 'number' && v > 0 ? v : null;
}

export function saveLastBackupAt(ts: number) {
  write('last-backup', ts);
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

// ---------- 围度追踪（身体数据页录入，按日期留存各部位围度） ----------
// 说明：一条记录 = 一个日期 + 若干部位围度；同一天重复录入覆盖旧值，
// 未填的部位不写入（曲线上自然断点），全部走 NS 命名空间，导出/导入自动覆盖。
export const MEASURE_KEYS = ['chest', 'waist', 'hip', 'arm', 'thigh'] as const;
export type MeasureKey = (typeof MEASURE_KEYS)[number];

/** 部位元信息：中文名 + 图表配色序号（对应 --chart-1..5） */
export const MEASURE_META: Record<MeasureKey, { label: string; chart: string }> = {
  chest: { label: '胸围', chart: 'var(--chart-1)' },
  waist: { label: '腰围', chart: 'var(--chart-2)' },
  hip: { label: '臀围', chart: 'var(--chart-3)' },
  arm: { label: '臂围', chart: 'var(--chart-4)' },
  thigh: { label: '大腿围', chart: 'var(--chart-5)' },
};

export type MeasureValues = Partial<Record<MeasureKey, number>>;

export interface MeasurementEntry {
  date: string;         // YYYY-MM-DD，同一天只保留最新一条
  values: MeasureValues; // 只存填了的部位，单位 cm
}

/** 归一化：只保留合法部位与 1–300 cm 的有效数值，统一留一位小数 */
export function sanitizeMeasureValues(values: MeasureValues | null | undefined): MeasureValues {
  const out: MeasureValues = {};
  if (!values || typeof values !== 'object') return out;
  for (const key of MEASURE_KEYS) {
    const n = Number(values[key]);
    if (Number.isFinite(n) && n > 0 && n < 300) out[key] = Math.round(n * 10) / 10;
  }
  return out;
}

export function loadMeasurements(): MeasurementEntry[] {
  const v = read<MeasurementEntry[]>('measurements', []);
  if (!Array.isArray(v)) return [];
  return v
    .filter((e) => e && typeof e.date === 'string' && e.values && typeof e.values === 'object')
    .map((e) => ({ date: e.date, values: sanitizeMeasureValues(e.values) }))
    .filter((e) => Object.keys(e.values).length > 0)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function saveMeasurements(entries: MeasurementEntry[]) {
  write('measurements', entries);
}

/** 追加 / 覆盖一条围度记录（同日期覆盖），保持按日期升序；返回写入后的完整列表 */
export function upsertMeasurement(entry: MeasurementEntry): MeasurementEntry[] {
  const values = sanitizeMeasureValues(entry.values);
  if (!entry.date || Object.keys(values).length === 0) return loadMeasurements();
  const entries = loadMeasurements().filter((e) => e.date !== entry.date);
  entries.push({ date: entry.date, values });
  entries.sort((a, b) => a.date.localeCompare(b.date));
  saveMeasurements(entries);
  return entries;
}

export function removeMeasurement(date: string): MeasurementEntry[] {
  const entries = loadMeasurements().filter((e) => e.date !== date);
  saveMeasurements(entries);
  return entries;
}

/** 最新一条围度记录（按日期，可能只含部分部位） */
export function latestMeasurement(): MeasurementEntry | null {
  const entries = loadMeasurements();
  return entries.length > 0 ? entries[entries.length - 1] : null;
}

// ---------- 运动能力追踪（身体数据页写入：力量 / 耐力 / 运动能力） ----------
// 说明：一条记录 = 日期 + 指标 + 数值（力量项另带次数与记录时的体重快照，用于估算 1RM 与倍数判级）。
// 同一指标同一天允许多条并存（例如同日两组不同重量）；编辑 / 删除按 id 逐条定位。
// 无 id 的旧数据在读取时自动补齐 id 并回写，历史条目不会被合并覆盖。
export type PerfSection = 'strength' | 'endurance' | 'athletic';

export interface PerformanceLog {
  id?: string;     // 记录唯一标识（旧数据读取时自动补齐）
  date: string;    // YYYY-MM-DD
  metric: string;  // 指标键：squat/bench/deadlift/ohp/curl | pushup/pullup/plank | longjump/sprint50/run1000
  value: number;   // 力量 = 重量 kg；耐力 = 次数 / 秒；运动能力 = cm / 秒
  reps?: number;   // 仅力量项：完成的次数
  weightKg?: number; // 仅力量项：记录当时的体重快照 kg，用于倍数判级；缺省（旧记录）= 回落全站最新体重
  // ---------- 训练闭环字段（仅训练记录一键写入的条目使用；手动录入的条目不带） ----------
  oneRmKg?: number;      // 估算 1RM（kg，Epley 口径）。存在时 value 为「1RM ÷ 体重快照」的体重倍数
  source?: 'training';   // 来源标记：training = 来自训练记录（能力追踪页显示「训练导入」、可撤销）
  trainingLogId?: string; // 来源训练记录 id，用于「已同步 / 撤销」精确联动
}

export type PerformanceLogs = Record<PerfSection, PerformanceLog[]>;

const PERF_SECTIONS: PerfSection[] = ['strength', 'endurance', 'athletic'];

function emptyPerformanceLogs(): PerformanceLogs {
  return { strength: [], endurance: [], athletic: [] };
}

/** 记录 id：时间戳 + 随机后缀，保证同一天多条也互不冲突 */
function newPerfLogId(): string {
  return `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

function normalizePerfLog(item: unknown, fallbackId: string): PerformanceLog | null {
  if (!item || typeof item !== 'object') return null;
  const raw = item as Partial<PerformanceLog>;
  if (typeof raw.date !== 'string' || !raw.date || typeof raw.metric !== 'string' || !raw.metric) return null;
  const value = Number(raw.value);
  if (!Number.isFinite(value) || value <= 0) return null;
  const id = typeof raw.id === 'string' && raw.id.trim() ? raw.id.trim() : fallbackId;
  const log: PerformanceLog = { id, date: raw.date, metric: raw.metric, value: Math.round(value * 100) / 100 };
  const reps = Number(raw.reps);
  if (Number.isFinite(reps) && reps > 0) log.reps = Math.round(reps);
  const snapWeight = Number(raw.weightKg);
  if (Number.isFinite(snapWeight) && snapWeight >= 20 && snapWeight <= 400) {
    log.weightKg = Math.round(snapWeight * 10) / 10;
  }
  // 训练闭环字段：旧数据没有这些字段，读取时保持缺省
  const oneRm = Number(raw.oneRmKg);
  if (Number.isFinite(oneRm) && oneRm > 0 && oneRm <= 1000) log.oneRmKg = Math.round(oneRm * 10) / 10;
  if (raw.source === 'training') log.source = 'training';
  if (typeof raw.trainingLogId === 'string' && raw.trainingLogId.trim()) log.trainingLogId = raw.trainingLogId.trim();
  return log;
}

function sortPerfLogs(list: PerformanceLog[]): PerformanceLog[] {
  // 稳定排序：同一天的多条保持录入先后顺序
  return [...list].sort((a, b) => a.date.localeCompare(b.date));
}

export function loadPerformanceLogs(): PerformanceLogs {
  const raw = read<Partial<PerformanceLogs>>('performance-logs', {});
  const out = emptyPerformanceLogs();
  let migrated = false;
  for (const section of PERF_SECTIONS) {
    const list = Array.isArray(raw?.[section]) ? (raw[section] as unknown[]) : [];
    const seen = new Set<string>();
    const items: PerformanceLog[] = [];
    list.forEach((item, index) => {
      const rawId = item && typeof item === 'object' ? (item as Partial<PerformanceLog>).id : undefined;
      const hasId = typeof rawId === 'string' && rawId.trim().length > 0;
      const log = normalizePerfLog(item, `legacy-${section}-${index}`);
      if (!log) return;
      if (!hasId) migrated = true;
      // 兜底：万一补出的 id 与已有 id 撞号，追加序号，避免两条记录共用一个 id
      const baseId = log.id ?? `legacy-${section}-${index}`;
      const id = seen.has(baseId) ? `${baseId}-${index}` : baseId;
      log.id = id;
      seen.add(id);
      items.push(log);
    });
    // 同一天的多条按录入顺序保留，不再互相覆盖
    out[section] = items
      .map((log, index) => ({ log, index }))
      .sort((a, b) => a.log.date.localeCompare(b.log.date) || a.index - b.index)
      .map((entry) => entry.log);
  }
  // 旧数据补齐 id 后回写一次，后续编辑 / 删除一律按 id 定位
  if (migrated) write('performance-logs', out);
  return out;
}

export function savePerformanceLogs(logs: PerformanceLogs) {
  write('performance-logs', logs);
}

/** 追加一条记录：同一指标同一天允许多条并存，各自按 id 定位 */
export function appendPerformanceLog(section: PerfSection, log: PerformanceLog): PerformanceLogs {
  const logs = loadPerformanceLogs();
  const entry = normalizePerfLog(log, newPerfLogId());
  if (!entry) return logs;
  logs[section] = sortPerfLogs([...logs[section], entry]);
  savePerformanceLogs(logs);
  return logs;
}

/** 记录定位：优先 id；无 id（旧数据）时按「指标 + 日期」命中第一条 */
function indexOfPerfLog(list: PerformanceLog[], target: { id?: string; metric?: string; date?: string }): number {
  if (target.id) {
    const byId = list.findIndex((e) => e.id === target.id);
    if (byId >= 0) return byId;
  }
  if (target.metric && target.date) {
    return list.findIndex((e) => e.metric === target.metric && e.date === target.date);
  }
  return -1;
}

/** 更新一条记录（按 id 逐条定位，不影响同一天的其它记录），返回写入后的完整数据 */
export function updatePerformanceLog(
  section: PerfSection,
  target: { id?: string; metric?: string; date?: string },
  log: PerformanceLog,
): PerformanceLogs {
  const logs = loadPerformanceLogs();
  const idx = indexOfPerfLog(logs[section], target);
  if (idx < 0) return logs;
  const prev = logs[section][idx];
  const id = prev.id ?? newPerfLogId();
  const entry = normalizePerfLog({ ...log, id }, id);
  if (!entry) return logs;
  const list = [...logs[section]];
  list[idx] = entry;
  logs[section] = sortPerfLogs(list);
  savePerformanceLogs(logs);
  return logs;
}

/** 删除一条记录（按 id 逐条定位，不牵连同一天的其它记录），返回写入后的完整数据 */
export function removePerformanceLog(
  section: PerfSection,
  target: { id?: string; metric?: string; date?: string },
): PerformanceLogs {
  const logs = loadPerformanceLogs();
  const idx = indexOfPerfLog(logs[section], target);
  if (idx < 0) return logs;
  logs[section] = logs[section].filter((_, i) => i !== idx);
  savePerformanceLogs(logs);
  return logs;
}

/** 清空单个板块的全部记录 */
export function clearPerformanceSection(section: PerfSection): PerformanceLogs {
  const logs = loadPerformanceLogs();
  logs[section] = [];
  savePerformanceLogs(logs);
  return logs;
}

/** 清空运动能力追踪模块（力量 / 耐力 / 运动能力）的全部记录 */
export function clearPerformanceLogs(): PerformanceLogs {
  const logs = emptyPerformanceLogs();
  savePerformanceLogs(logs);
  return logs;
}

/** 全站最新体重（kg）：优先快捷体重（轻盈计划同步值），回退身体档案；0 = 未录入 */
export function latestWeightKg(): number {
  const quick = loadWeightKg();
  if (quick > 0) return quick;
  const profile = loadBodyProfile();
  const n = Number(profile.weightKg);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

// ---------- 判级性别口径（力量 / 耐力 / 运动能力的等级标准） ----------
// 说明：身体档案里的 sex 有默认值 male，无法区分「用户没选过」，
// 故单独存一个显式设置项：未设置返回 null（页面据此提示用户选择）；
// 一旦设置，同时同步进身体档案 sex，保证 BMR / FFMI / 对照表口径一致。
export type SexSetting = 'male' | 'female';

export function loadSexSetting(): SexSetting | null {
  const v = read<string>('sex', '');
  return v === 'male' || v === 'female' ? v : null;
}

export function saveSexSetting(sex: SexSetting) {
  write('sex', sex);
  const body = loadBodyProfile();
  if (body.sex !== sex) saveBodyProfile({ ...body, sex });
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

// ---------- 训练记录（训练记录页写入：一天可多条，每条含若干动作与逐组数据） ----------
// 说明：一条记录 = 日期 + 训练日标签 + 若干动作（动作内含逐组「重量 × 次数」或时长）；
// 旧数据读取时自动补 id 并回写一次，编辑 / 删除一律按 id 逐条定位，不影响同一天的其它记录。
export interface TrainingSet {
  weightKg?: number;    // 单组重量 kg（自重动作可留空）
  reps?: number;        // 单组次数（自重动作必填）
  durationSec?: number; // 时长类单组时长（秒），如平板支撑
}

export interface TrainingExercise {
  exerciseId?: string;  // 命中动作库时写入的动作 id
  name: string;         // 动作名（动作库中文名或自定义名）
  sets: TrainingSet[];
}

export interface TrainingLog {
  id?: string;          // 记录唯一标识（旧数据读取时自动补齐）
  date: string;         // YYYY-MM-DD
  dayLabel?: string;    // 训练日（推 / 拉 / 腿 / 自定义）
  exercises: TrainingExercise[];
  note?: string;
  createdAt?: number;   // 录入时间戳，用于同日多条的稳定排序
}

/** 记录 id：时间戳 + 随机后缀，同日多条互不冲突 */
function newTrainingLogId(): string {
  return `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

function sanitizeTrainingSet(item: unknown): TrainingSet | null {
  if (!item || typeof item !== 'object') return null;
  const raw = item as Partial<TrainingSet>;
  const set: TrainingSet = {};
  const w = Number(raw.weightKg);
  if (Number.isFinite(w) && w > 0 && w <= 500) set.weightKg = Math.round(w * 10) / 10;
  const reps = Number(raw.reps);
  if (Number.isFinite(reps) && reps > 0 && reps <= 200) set.reps = Math.round(reps);
  const dur = Number(raw.durationSec);
  if (Number.isFinite(dur) && dur > 0 && dur <= 7200) set.durationSec = Math.round(dur);
  return Object.keys(set).length > 0 ? set : null;
}

function sanitizeTrainingExercise(item: unknown): TrainingExercise | null {
  if (!item || typeof item !== 'object') return null;
  const raw = item as Partial<TrainingExercise>;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  if (!name) return null;
  const sets = (Array.isArray(raw.sets) ? raw.sets : [])
    .map(sanitizeTrainingSet)
    .filter((s): s is TrainingSet => Boolean(s));
  if (sets.length === 0) return null;
  const exercise: TrainingExercise = { name, sets };
  if (typeof raw.exerciseId === 'string' && raw.exerciseId.trim()) exercise.exerciseId = raw.exerciseId.trim();
  return exercise;
}

/** 归一化一条训练记录：日期与动作缺一不可，动作内的空组自动丢弃 */
function sanitizeTrainingLog(item: unknown, fallbackId: string): TrainingLog | null {
  if (!item || typeof item !== 'object') return null;
  const raw = item as Partial<TrainingLog>;
  if (typeof raw.date !== 'string' || !raw.date) return null;
  const exercises = (Array.isArray(raw.exercises) ? raw.exercises : [])
    .map(sanitizeTrainingExercise)
    .filter((e): e is TrainingExercise => Boolean(e));
  if (exercises.length === 0) return null;
  const id = typeof raw.id === 'string' && raw.id.trim() ? raw.id.trim() : fallbackId;
  const log: TrainingLog = { id, date: raw.date, exercises };
  if (typeof raw.dayLabel === 'string' && raw.dayLabel.trim()) log.dayLabel = raw.dayLabel.trim();
  if (typeof raw.note === 'string' && raw.note.trim()) log.note = raw.note.trim();
  const created = Number(raw.createdAt);
  if (Number.isFinite(created) && created > 0) log.createdAt = created;
  return log;
}

function sortTrainingLogs(logs: TrainingLog[]): TrainingLog[] {
  return [...logs].sort(
    (a, b) => a.date.localeCompare(b.date) || (a.createdAt ?? 0) - (b.createdAt ?? 0),
  );
}

export function loadTrainingLogs(): TrainingLog[] {
  const raw = read<unknown[]>('training-logs', []);
  const list = Array.isArray(raw) ? raw : [];
  let migrated = false;
  const seen = new Set<string>();
  const items: TrainingLog[] = [];
  list.forEach((item, index) => {
    const rawId = item && typeof item === 'object' ? (item as Partial<TrainingLog>).id : undefined;
    const hasId = typeof rawId === 'string' && rawId.trim().length > 0;
    const log = sanitizeTrainingLog(item, `legacy-training-${index}`);
    if (!log) return;
    if (!hasId) migrated = true;
    const baseId = log.id ?? `legacy-training-${index}`;
    const id = seen.has(baseId) ? `${baseId}-${index}` : baseId;
    log.id = id;
    seen.add(id);
    items.push(log);
  });
  const sorted = sortTrainingLogs(items);
  // 旧数据补齐 id 后回写一次，后续编辑 / 删除一律按 id 定位
  if (migrated) write('training-logs', sorted);
  return sorted;
}

export function saveTrainingLogs(logs: TrainingLog[]) {
  write('training-logs', logs);
}

/** 追加一条训练记录（读旧数据自动补 id），返回写入后的完整列表 */
export function appendTrainingLog(log: TrainingLog): TrainingLog[] {
  const logs = loadTrainingLogs();
  const entry = sanitizeTrainingLog({ ...log, createdAt: log.createdAt ?? Date.now() }, newTrainingLogId());
  if (!entry) return logs;
  logs.push(entry);
  const sorted = sortTrainingLogs(logs);
  saveTrainingLogs(sorted);
  return sorted;
}

/** 更新一条训练记录（按 id 定位），返回写入后的完整列表；id 不存在时原样返回 */
export function updateTrainingLog(id: string, log: TrainingLog): TrainingLog[] {
  const logs = loadTrainingLogs();
  const idx = logs.findIndex((l) => l.id === id);
  if (idx < 0) return logs;
  const entry = sanitizeTrainingLog(
    { ...log, id, createdAt: log.createdAt ?? logs[idx].createdAt ?? Date.now() },
    id,
  );
  if (!entry) return logs;
  const next = [...logs];
  next[idx] = entry;
  const sorted = sortTrainingLogs(next);
  saveTrainingLogs(sorted);
  return sorted;
}

/** 删除一条训练记录（按 id 逐条定位，不牵连同一天的其它记录），返回写入后的完整列表 */
export function removeTrainingLog(id: string): TrainingLog[] {
  const logs = loadTrainingLogs().filter((l) => l.id !== id);
  saveTrainingLogs(logs);
  return logs;
}

/** 清空全部训练记录 */
export function clearTrainingLogs(): TrainingLog[] {
  saveTrainingLogs([]);
  return [];
}

/** 指定日期是否存在训练记录（轻盈计划「当日自动视为已练」用） */
export function hasTrainingOn(date: string): boolean {
  return loadTrainingLogs().some((l) => l.date === date);
}

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

export function importAllData(json: string): { success: boolean; count: number; error?: string; warning?: string } {
  try {
    const parsed = JSON.parse(json);
    if (!parsed.data || typeof parsed.data !== 'object') {
      return { success: false, count: 0, error: '文件格式不正确：缺少 data 字段' };
    }
    const version = typeof parsed.version === 'number' ? parsed.version : 0;
    let warning: string | undefined;
    if (version === 0) {
      warning = '这是早期版本的备份文件（无版本号），已按兼容模式导入。';
    } else if (version > 1) {
      warning = `这是 v${version} 版备份，当前网站为 v1 数据结构。已尽力导入，但个别较新字段可能无法识别，建议升级到最新版网站后再导出。`;
    }
    let count = 0;
    for (const [key, value] of Object.entries(parsed.data)) {
      localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
      count++;
    }
    return { success: true, count, warning };
  } catch {
    return { success: false, count: 0, error: 'JSON 解析失败' };
  }
}