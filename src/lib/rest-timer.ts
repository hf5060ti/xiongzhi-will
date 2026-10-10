// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { restFor, type RestKind } from './training-plan';

/**
 * 组间休息的领域逻辑（纯计算，无 DOM 依赖，便于单元测试）。
 *
 * 单独抽出来的原因：计时口径必须全站一致——工具页的独立计时器、
 * 执行模式 WorkoutRunner 的每组倒计时，都应该走同一套「复合 3–5 分 / 孤立 2–3 分」。
 * 此前 WorkoutRunner 里硬编码 180 / 120，工具页另写一份，两处数字各改各的。
 */

/** 各档位预设秒数，与 restFor() 给出的区间口径保持一致 */
export const REST_PRESETS: Record<RestKind, { sec: number; label: string }[]> = {
  compound: [
    { sec: 180, label: '3 分' },
    { sec: 240, label: '4 分' },
    { sec: 300, label: '5 分' },
  ],
  isolation: [
    { sec: 120, label: '2 分' },
    { sec: 150, label: '2.5 分' },
    { sec: 180, label: '3 分' },
  ],
};

export const REST_KIND_LABEL: Record<RestKind, string> = {
  compound: '复合动作',
  isolation: '孤立动作',
};

export const REST_KIND_NOTE: Record<RestKind, string> = {
  compound:
    '多关节大重量：深蹲、卧推、硬拉、划船、引体、实力推等。自然训练者磷酸原恢复慢，休息不够会让下一组在疲劳状态下开始，重量与技术一起打折。',
  isolation:
    '单关节小重量：弯举、侧平举、下压、飞鸟、卷腹等。目标肌群局部恢复即可，休息太久反而冷身。',
};

/**
 * 默认休息秒数：取区间下限。
 * 宁可先按最短建议休息、不够再加 30 秒，也不要一上来就按上限把训练拖得过长——
 * 休息过久同样掉状态，而「加时间」比「砍时间」对用户心理容易得多。
 */
export function defaultRestSeconds(kind: RestKind): number {
  return REST_PRESETS[kind][0].sec;
}

/** 按动作名判定后的默认休息秒数 */
export function defaultRestSecondsFor(name: string): number {
  return defaultRestSeconds(restFor(name).kind);
}

/**
 * 毫秒 → M:SS。
 * 向上取整：剩 1.5 秒时显示 0:02，最后归零那一刻直接跳 0:00，
 * 不会出现「显示 0:00 却还在走」的假结束。
 */
export function fmtDuration(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}
