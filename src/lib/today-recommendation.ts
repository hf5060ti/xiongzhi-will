// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
// 根据用户分化方案和最近训练记录，推算今天该练什么
import type { SplitType } from './store';

/** 每种分化方案的训练日顺序（不含休息日） */
const SPLIT_SEQUENCE: Record<SplitType, { title: string; muscles: string }[]> = {
  'push-pull-legs': [
    { title: '推日', muscles: '胸 · 肩 · 三头' },
    { title: '拉日', muscles: '背 · 二头' },
    { title: '腿日', muscles: '腿 · 臀' },
  ],
  'upper-lower': [
    { title: '上肢日', muscles: '胸 · 背 · 肩 · 手臂' },
    { title: '下肢日', muscles: '腿 · 臀 · 核心' },
  ],
  'bro-split': [
    { title: '胸部', muscles: '胸 · 三头' },
    { title: '背部', muscles: '背 · 二头' },
    { title: '肩部', muscles: '肩 · 腹' },
    { title: '腿部', muscles: '腿 · 臀' },
    { title: '手臂', muscles: '二头 · 三头 · 腹' },
  ],
  'full-body': [
    { title: '全身 A', muscles: '胸 · 背 · 腿 · 核心' },
    { title: '全身 B', muscles: '肩 · 手臂 · 腿 · 核心' },
  ],
  'ppl-upper-lower': [
    { title: '推日', muscles: '胸 · 肩 · 三头' },
    { title: '拉日', muscles: '背 · 二头' },
    { title: '腿日', muscles: '腿 · 臀' },
    { title: '上肢日', muscles: '胸 · 背 · 肩 · 手臂' },
    { title: '下肢日', muscles: '腿 · 臀 · 核心' },
  ],
};

export interface TodayRecommendation {
  /** 建议训练日名称 */
  dayTitle: string;
  /** 目标肌群 */
  muscles: string;
  /** 是否休息日 */
  isRest: boolean;
  /** 建议说明 */
  message: string;
}

/**
 * 根据最近训练记录推算今天该练什么
 * @param splitId 分化方案
 * @param lastDayLabel 最近一次训练的 dayLabel（可能为 null）
 * @param daysSinceLastTraining 距上次训练的天数
 */
export function getTodayRecommendation(
  splitId: SplitType,
  lastDayLabel: string | null,
  daysSinceLastTraining: number,
): TodayRecommendation {
  const sequence = SPLIT_SEQUENCE[splitId] ?? SPLIT_SEQUENCE['push-pull-legs'];

  // 还没有任何训练记录：从第一天开始
  if (!lastDayLabel) {
    return {
      dayTitle: sequence[0].title,
      muscles: sequence[0].muscles,
      isRest: false,
      message: `第一次训练，从${sequence[0].title}开始`,
    };
  }

  // 找到上次在序列中的位置
  const lastIdx = sequence.findIndex((d) =>
    lastDayLabel.includes(d.title.replace(/[A\s]/g, '')),
  );

  // 找不到匹配（自定义标签）：建议休息或自由训练
  if (lastIdx === -1) {
    return {
      dayTitle: '自由训练',
      muscles: '根据身体状态选择',
      isRest: false,
      message: `上次记录为"${lastDayLabel}"，今天可自由安排或休息`,
    };
  }

  // PPL/四分化：练1天休1天或连续练3天休1天
  // 如果距上次训练 >= 2天，身体已恢复，建议练下一天
  // 如果距上次训练 = 1天，PPL 可以连续练（推→拉→腿），也可以休1天
  if (daysSinceLastTraining >= 2) {
    // 休息够了，练下一个
    const nextIdx = (lastIdx + 1) % sequence.length;
    return {
      dayTitle: sequence[nextIdx].title,
      muscles: sequence[nextIdx].muscles,
      isRest: false,
      message: `已休息${daysSinceLastTraining}天，身体恢复完毕`,
    };
  }

  if (daysSinceLastTraining === 1) {
    // PPL 连续练3天的模式
    if (splitId === 'push-pull-legs' && lastIdx < 2) {
      const nextIdx = lastIdx + 1;
      if (nextIdx < sequence.length) {
        return {
          dayTitle: sequence[nextIdx].title,
          muscles: sequence[nextIdx].muscles,
          isRest: false,
          message: `连续训练日，接${sequence[nextIdx].title}`,
        };
      }
    }
    // 其他分化：练1天休1天
    return {
      dayTitle: '休息日',
      muscles: '主动恢复 / 拉伸 / 散步',
      isRest: true,
      message: '昨天刚练，今天建议休息恢复',
    };
  }

  // daysSinceLastTraining === 0：今天已经练过了（调用方自己判断）
  return {
    dayTitle: sequence[lastIdx].title,
    muscles: sequence[lastIdx].muscles,
    isRest: false,
    message: '今天已记录训练',
  };
}
