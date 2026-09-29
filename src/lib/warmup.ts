// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
// 热身模板：融合谭成义动态热身法 + 凯圣王渐进激活法
//
// 核心理念：
//   - 热身不是走流程，是为了让神经、肌肉、关节进入"能扛重量"的状态
//   - 第一个正式动作要充分热身（4-5组递增），后续动作轻重量过渡即可
//   - 动态拉伸 > 静态拉伸（练前静态拉伸会降低力量输出）

export interface WarmupStep {
  /** 序号 */
  order: number;
  /** 阶段名称 */
  phase: 'general' | 'activation' | 'first-set';
  /** 动作名称 */
  name: string;
  /** 建议组次/时长 */
  detail: string;
  /** 要点 */
  cue: string;
}

/** 通用热身流程（所有训练日都适用，约8-10分钟） */
export const WARMUP_GENERAL: WarmupStep[] = [
  {
    order: 1,
    phase: 'general',
    name: '有氧升温',
    detail: '5分钟：慢跑 / 跳绳 / 划船机',
    cue: '微微出汗即可，不要练力竭，心率到120左右就行',
  },
  {
    order: 2,
    phase: 'general',
    name: '关节环绕',
    detail: '每个方向10次：肩→髋→膝→踝',
    cue: '从轻到重，幅度逐渐加大，不要猛甩',
  },
  {
    order: 3,
    phase: 'general',
    name: '动态拉伸：腿',
    detail: '高抬腿20次 + 弓步走10步/侧',
    cue: '练前不要做静态压腿，动态拉伸让肌肉热起来',
  },
  {
    order: 4,
    phase: 'general',
    name: '动态拉伸：上肢',
    detail: '手臂环绕20次 + 弹力带拉开15次',
    cue: '肩袖激活很重要，尤其是推日',
  },
];

/**
 * 第一个正式动作的递增组
 * 谭成义/凯圣王共识：第一个动作必须充分热身，后面的动作不需要重复热身
 */
export function getFirstSetWarmup(
  exerciseName: string,
  workingWeightKg: number,
): WarmupStep[] {
  const steps: WarmupStep[] = [];
  const isUpper = /推|拉|卧推|推举|划船|引体|下拉|弯举|臂屈伸/.test(exerciseName);

  // 空杆或最轻重量
  steps.push({
    order: 1,
    phase: 'first-set',
    name: '空杆/极轻组',
    detail: `${workingWeightKg > 0 ? '20kg' : '自重'} × 10-15次`,
    cue: '找动作感觉，不急着加重量，注意力放在目标肌群发力',
  });

  // 30% 工作重量
  if (workingWeightKg >= 20) {
    steps.push({
      order: 2,
      phase: 'first-set',
      name: '轻重量组',
      detail: `${Math.round(workingWeightKg * 0.3)}kg × 8-10次`,
      cue: '速度放慢，感受目标肌肉收缩',
    });
  }

  // 50% 工作重量
  if (workingWeightKg >= 40) {
    steps.push({
      order: 3,
      phase: 'first-set',
      name: '半程重量组',
      detail: `${Math.round(workingWeightKg * 0.5)}kg × 5-8次`,
      cue: '这时开始加快速度，神经募集增加',
    });
  }

  // 70% 工作重量
  if (workingWeightKg >= 60) {
    steps.push({
      order: 4,
      phase: 'first-set',
      name: '接近工作重量组',
      detail: `${Math.round(workingWeightKg * 0.7)}kg × 3-5次`,
      cue: '这是最后一组热身，做完直接上工作组',
    });
  }

  // 神经激活提示
  steps.push({
    order: steps.length + 1,
    phase: 'first-set',
    name: '神经激活',
    detail: isUpper ? '3次最快速度空杆推/拉' : '3次最快速度半蹲/硬拉',
    cue: '谭成义强调：热身最后做几组快速动作，让神经系统进入状态',
  });

  return steps;
}

/** 不同训练日的额外激活建议 */
export const DAY_ACTIVATION: Record<string, WarmupStep[]> = {
  push: [
    {
      order: 1,
      phase: 'activation',
      name: '肩袖激活',
      detail: '弹力带外旋 15次/侧 × 2组',
      cue: '推日必做，预防肩伤',
    },
    {
      order: 2,
      phase: 'activation',
      name: '胸肌激活',
      detail: '俯卧撑15次或弹力带夹胸15次',
      cue: '让胸肌先"醒过来"',
    },
  ],
  pull: [
    {
      order: 1,
      phase: 'activation',
      name: '肩胛激活',
      detail: '弹力带下压15次 × 2组',
      cue: '拉日先激活肩胛稳定肌群',
    },
    {
      order: 2,
      phase: 'activation',
      name: '背阔激活',
      detail: '直臂下压12次 × 2组',
      cue: '找背阔收缩感',
    },
  ],
  legs: [
    {
      order: 1,
      phase: 'activation',
      name: '臀肌激活',
      detail: '臀桥15次 × 2组',
      cue: '腿日必做，避免膝盖代偿',
    },
    {
      order: 2,
      phase: 'activation',
      name: '腘绳激活',
      detail: '北欧挺退阶5次或弹力带腿弯举12次',
      cue: '深蹲/硬拉前激活后链',
    },
  ],
};
