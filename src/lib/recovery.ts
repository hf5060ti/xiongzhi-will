// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 恢复状态记录（轻量）：
 * - 存 localStorage：每天一条 { date, sleepHrs, soreness, stress }
 * - 连续 3 天睡眠 < 6h，或最近一次压力 >= 4，或静息状态明显偏高 → 提示"今天减量或休息"
 * - 配合训练日志容量趋势，判断是否到了该减载周的时候
 *
 * 设计原则：极简、不强制填、填了就给建议；不填不影响主流程。
 */

const STORAGE_KEY = 'xiongzhi-will:recovery-log';

export interface RecoveryEntry {
  date: string; // YYYY-MM-DD
  sleepHrs?: number; // 0-12
  soreness?: number; // 1-5
  stress?: number; // 1-5
  note?: string;
}

export function loadRecoveryLog(): RecoveryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export function saveRecoveryLog(list: RecoveryEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // 容量满了或隐私模式，静默失败
  }
}

export function upsertRecovery(entry: RecoveryEntry): RecoveryEntry[] {
  const list = loadRecoveryLog();
  const idx = list.findIndex((e) => e.date === entry.date);
  if (idx >= 0) list[idx] = entry;
  else list.push(entry);
  list.sort((a, b) => (a.date < b.date ? 1 : -1));
  saveRecoveryLog(list);
  return list;
}

export function todayIso(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

export interface RecoveryVerdict {
  level: 'good' | 'warn' | 'bad';
  title: string;
  detail: string;
}

/** 根据最近几天的恢复记录给出今天的训练建议 */
export function assessRecovery(log: RecoveryEntry[]): RecoveryVerdict | null {
  if (!log || log.length === 0) return null;
  const recent = log.slice(0, 3); // 最近3天
  const avgSleep =
    recent.filter((e) => typeof e.sleepHrs === 'number').reduce((s, e) => s + (e.sleepHrs ?? 0), 0) /
    Math.max(1, recent.filter((e) => typeof e.sleepHrs === 'number').length);
  const avgStress =
    recent.filter((e) => typeof e.stress === 'number').reduce((s, e) => s + (e.stress ?? 0), 0) /
    Math.max(1, recent.filter((e) => typeof e.stress === 'number').length);
  const avgSoreness =
    recent.filter((e) => typeof e.soreness === 'number').reduce((s, e) => s + (e.soreness ?? 0), 0) /
    Math.max(1, recent.filter((e) => typeof e.soreness === 'number').length);

  const badSleep = avgSleep > 0 && avgSleep < 6;
  const highStress = avgStress > 0 && avgStress >= 4;
  const highSoreness = avgSoreness > 0 && avgSoreness >= 4;

  if (badSleep && (highStress || highSoreness)) {
    return {
      level: 'bad',
      title: '恢复不足 · 今天建议减量或休息',
      detail: `近3天平均睡眠 ${avgSleep.toFixed(1)}h，压力/酸痛偏高。自然训练者睡眠 < 6h 时皮质醇升高、睾酮下降，硬冲大重量只会掉肌肉。今天改练技术或散步，别上 PR。`,
    };
  }
  if (badSleep || highStress) {
    return {
      level: 'warn',
      title: '恢复一般 · 控制今天强度',
      detail: `近3天平均睡眠 ${avgSleep > 0 ? avgSleep.toFixed(1) + 'h' : '—'}${avgStress > 0 ? `，压力 ${avgStress.toFixed(1)}/5` : ''}。今天主力组别顶到 RPE 9+，RPE 7-8 收工，早点睡。`,
    };
  }
  return {
    level: 'good',
    title: '状态在线 · 可以正常训练',
    detail: avgSleep > 0 ? `近3天平均睡眠 ${avgSleep.toFixed(1)}h，恢复正常。` : '暂无睡眠记录，凭自我感觉控制强度。',
  };
}

/**
 * 判断是否该安排减载周：
 * - 近 8 周里有 >= 6 周都在规律训练（周训练 >= 2 次），且中间没有明显空窗
 * - 或连续 3 周容量上升
 * 返回 null 表示不用减载
 */
export function shouldDeload(
  weekly: { label: string; volume: number; sessions: number }[],
): { weeks: number; reason: string } | null {
  const activeWeeks = weekly.filter((w) => w.sessions >= 2).length;
  if (activeWeeks >= 6) {
    return {
      weeks: activeWeeks,
      reason: `近 ${activeWeeks} 周都在规律训练（每周 ≥ 2 次），身体神经系统和关节已经累积了疲劳。下周安排减载：容量砍 50%，重量维持，睡眠补足——这不是偷懒，是自然训练者长期进步的必要环节。`,
    };
  }
  // 连续3周容量上升
  const last3 = weekly.slice(-3);
  if (
    last3.length === 3 &&
    last3[0].volume > 0 &&
    last3[1].volume > last3[0].volume &&
    last3[2].volume > last3[1].volume
  ) {
    return {
      weeks: 3,
      reason: `连续 3 周训练容量在上升（${last3[0].volume} → ${last3[1].volume} → ${last3[2].volume} kg）。压力持续累积，下周可以减载一周让身体超量恢复，再继续冲。`,
    };
  }
  return null;
}
