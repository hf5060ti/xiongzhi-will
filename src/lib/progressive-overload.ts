// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
// 渐进超负荷建议引擎
// 输入：某个动作的历史训练记录（按时间倒序）
// 输出：下次训练建议（加重量 / 维持 / 减重量 / 加次数）
//
// 逻辑（自然训练者简化版）：
//   - 取最近一次该动作所有组
//   - 计算平均次数和完成率
//   - 如果最近一次完成次数 >= 目标区间上限（如12次），建议加重量（+2.5kg 或 +1次）
//   - 如果最近一次完成次数 < 目标区间下限（如6次），建议减重量（-2.5kg）
//   - 否则维持重量，尝试加1-2次
//   - 复合动作 vs 孤立动作的步长不同

import type { TrainingExercise, TrainingSet } from './store';

export interface OverloadAdvice {
  /** 建议动作类型 */
  type: 'increase-weight' | 'increase-reps' | 'maintain' | 'decrease-weight';
  /** 建议文案 */
  message: string;
  /** 建议下次重量（kg），null 表示自重或不明确 */
  nextWeightKg: number | null;
  /** 建议下次次数区间 */
  nextReps: string;
  /** 依据说明 */
  reason: string;
}

/** 判断是否复合动作（基于动作名关键词） */
function isCompound(name: string): boolean {
  const compoundKeywords = [
    '深蹲', '硬拉', '卧推', '推举', '划船', '引体', '下拉', '高翻',
    '卧推', '推举', '深蹲', '硬拉', '划船', '引体', '下拉',
    'deadlift', 'squat', 'bench', 'press', 'row', 'pull-up',
  ];
  const lower = name.toLowerCase();
  return compoundKeywords.some((kw) => lower.includes(kw.toLowerCase()));
}

/**
 * 根据历史记录计算渐进超负荷建议
 * @param exerciseName 动作名
 * @param history 该动作的历史记录数组（每个元素是一次训练的 sets，按时间倒序，最新在前）
 * @param targetRepRange 目标次数区间，默认 [8, 12]
 */
export function getOverloadAdvice(
  exerciseName: string,
  history: TrainingSet[][],
  targetRepRange: [number, number] = [8, 12],
): OverloadAdvice | null {
  if (!history || history.length === 0) return null;

  const lastSets = history[0]; // 最近一次
  if (!lastSets || lastSets.length === 0) return null;

  const hasWeight = lastSets.some((s) => s.weightKg && s.weightKg > 0);
  const [minReps, maxReps] = targetRepRange;

  // 自重动作（没有重量数据）
  if (!hasWeight) {
    const avgReps =
      lastSets.reduce((sum, s) => sum + (s.reps || 0), 0) / lastSets.length;
    if (avgReps >= maxReps) {
      return {
        type: 'increase-reps',
        message: `自重${exerciseName}最近${avgReps.toFixed(0)}次已达标，下次尝试加次数或进阶变式`,
        nextWeightKg: null,
        nextReps: `${Math.round(avgReps + 2)}-${Math.round(avgReps + 4)}`,
        reason: `最近平均${avgReps.toFixed(0)}次达到目标上限，可加次数或升级难度（如标准引体→负重引体）`,
      };
    }
    return {
      type: 'maintain',
      message: `自重${exerciseName}最近平均${avgReps.toFixed(0)}次，维持当前次数`,
      nextWeightKg: null,
      nextReps: `${Math.round(avgReps - 2)}-${Math.round(avgReps + 2)}`,
      reason: `次数在目标区间内，继续巩固动作质量`,
    };
  }

  // 有重量的动作
  const weights = lastSets.map((s) => s.weightKg || 0).filter((w) => w > 0);
  const repsList = lastSets.map((s) => s.reps || 0).filter((r) => r > 0);
  if (weights.length === 0 || repsList.length === 0) return null;

  const avgWeight = weights.reduce((a, b) => a + b, 0) / weights.length;
  const avgReps = repsList.reduce((a, b) => a + b, 0) / repsList.length;
  const step = isCompound(exerciseName) ? 2.5 : 1.25; // 复合动作步长大

  // 完成次数 >= 上限：加重量
  if (avgReps >= maxReps) {
    const nextW = Math.round((avgWeight + step) * 2) / 2;
    return {
      type: 'increase-weight',
      message: `${exerciseName}上次${avgWeight.toFixed(1)}kg×${avgReps.toFixed(0)}次已达标，下次建议${nextW}kg`,
      nextWeightKg: nextW,
      nextReps: `${minReps}-${Math.round(maxReps - 2)}`,
      reason: `最近平均${avgReps.toFixed(0)}次达到目标上限（${maxReps}次），按${step}kg递增`,
    };
  }

  // 完成次数 < 下限：减重量
  if (avgReps < minReps) {
    const nextW = Math.round((avgWeight - step) * 2) / 2;
    return {
      type: 'decrease-weight',
      message: `${exerciseName}上次${avgWeight.toFixed(1)}kg只完成${avgReps.toFixed(0)}次，建议减到${nextW}kg`,
      nextWeightKg: nextW,
      nextReps: `${minReps}-${maxReps}`,
      reason: `最近平均${avgReps.toFixed(0)}次低于目标下限（${minReps}次），减重量保证动作质量`,
    };
  }

  // 区间内：维持重量，尝试加次数
  return {
    type: 'maintain',
    message: `${exerciseName}上次${avgWeight.toFixed(1)}kg×${avgReps.toFixed(0)}次在区间内，维持重量尝试加次数`,
    nextWeightKg: Math.round(avgWeight * 2) / 2,
    nextReps: `${Math.round(avgReps)}-${Math.round(maxReps)}`,
    reason: `次数在${minReps}-${maxReps}区间内，下次尝试从${Math.round(avgReps)}次加到${maxReps}次`,
  };
}

/**
 * 从训练日志中提取某个动作的历史记录
 * @param logs 全部训练日志
 * @param exerciseName 动作名（模糊匹配）
 */
export function getExerciseHistory(
  logs: { date: string; exercises: TrainingExercise[] }[],
  exerciseName: string,
): TrainingSet[][] {
  const lower = exerciseName.toLowerCase();
  const history: TrainingSet[][] = [];

  // logs 已经按日期倒序排序
  for (const log of logs) {
    const match = log.exercises.find((e) => e.name.toLowerCase().includes(lower));
    if (match) {
      history.push(match.sets);
    }
  }

  return history;
}
