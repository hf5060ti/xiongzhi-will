// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
// 热身模板：融合谭成义动态热身法 + 凯圣王渐进激活法
//
// 核心理念：
//   - 热身不是走流程，是为了让神经、肌肉、关节进入"能扛重量"的状态
//   - 第一个正式动作要充分热身（4-5组递增），后续动作轻重量过渡即可
//   - 动态拉伸 > 静态拉伸（练前静态拉伸会降低力量输出）
//   - 谭成义强调：神经激活是关键，最后做快速动作让系统兴奋
//   - 凯圣王强调：渐进负荷，不要一上来就冲大重量

export interface WarmupStep {
  /** 序号 */
  order: number;
  /** 阶段名称 */
  phase: 'general' | 'activation' | 'first-set' | 'neural';
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
    detail: '5分钟：慢跑 / 跳绳 / 划船机 / 开合跳',
    cue: '微微出汗即可，不要练力竭，心率到120左右就行。天冷时延长到8分钟。',
  },
  {
    order: 2,
    phase: 'general',
    name: '关节环绕',
    detail: '每个方向10次：肩→髋→膝→踝→腕',
    cue: '从轻到重，幅度逐渐加大，不要猛甩。谭成义强调：关节预热是预防损伤的第一道防线。',
  },
  {
    order: 3,
    phase: 'general',
    name: '动态拉伸：下肢',
    detail: '高抬腿20次 + 弓步走10步/侧 + 侧向弓步10次/侧',
    cue: '练前不要做静态压腿（会降低力量输出），动态拉伸让肌肉热起来。',
  },
  {
    order: 4,
    phase: 'general',
    name: '动态拉伸：上肢',
    detail: '手臂环绕20次 + 弹力带拉开15次 + 猫牛式10次',
    cue: '肩袖激活很重要，尤其是推日。胸椎灵活性也要活动开。',
  },
  {
    order: 5,
    phase: 'general',
    name: '核心激活',
    detail: '死虫式10次/侧 + 鸟狗式10次/侧',
    cue: '激活深层核心，让脊柱稳定。深蹲/硬拉前尤其重要。',
  },
];

/** 不同训练日的额外激活建议 */
export const DAY_ACTIVATION: Record<string, WarmupStep[]> = {
  push: [
    {
      order: 1,
      phase: 'activation',
      name: '肩袖激活',
      detail: '弹力带外旋 15次/侧 × 2组',
      cue: '推日必做，预防肩伤。冈下肌和小圆肌是肩关节稳定的关键。',
    },
    {
      order: 2,
      phase: 'activation',
      name: '胸肌激活',
      detail: '俯卧撑15次或弹力带夹胸15次',
      cue: '让胸肌先"醒过来"，感觉肌肉收缩。',
    },
    {
      order: 3,
      phase: 'activation',
      name: '三头肌激活',
      detail: '绳索下压15次 × 2组（轻重量）',
      cue: '推类动作都需要三头稳定，提前激活减少代偿。',
    },
  ],
  pull: [
    {
      order: 1,
      phase: 'activation',
      name: '肩胛激活',
      detail: '弹力带下压15次 × 2组',
      cue: '拉日先激活肩胛稳定肌群（前锯肌、斜方肌中下束）。',
    },
    {
      order: 2,
      phase: 'activation',
      name: '背阔激活',
      detail: '直臂下压12次 × 2组',
      cue: '找背阔收缩感，想象用肘尖往下压。',
    },
    {
      order: 3,
      phase: 'activation',
      name: '二头肌激活',
      detail: '轻重量弯举12次 × 2组',
      cue: '拉类动作都需要二头参与，提前激活。',
    },
  ],
  legs: [
    {
      order: 1,
      phase: 'activation',
      name: '臀肌激活',
      detail: '臀桥15次 × 2组 + 蚌式15次/侧',
      cue: '腿日必做，避免膝盖代偿。很多人深蹲膝盖疼就是臀肌没激活。',
    },
    {
      order: 2,
      phase: 'activation',
      name: '腘绳激活',
      detail: '北欧挺退阶5次或弹力带腿弯举12次',
      cue: '深蹲/硬拉前激活后链，保护膝盖和腰椎。',
    },
    {
      order: 3,
      phase: 'activation',
      name: '踝关节灵活',
      detail: '踝关节松动10次/侧 + 提踵15次',
      cue: '深蹲深度不够往往是踝关节灵活性问题，提前活动开。',
    },
  ],
};

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
  const isSquat = /蹲|深蹲|颈前蹲|腿举/.test(exerciseName);
  const isDeadlift = /硬拉|罗马尼亚硬拉|相扑硬拉/.test(exerciseName);

  // 空杆或最轻重量
  steps.push({
    order: 1,
    phase: 'first-set',
    name: '空杆/极轻组',
    detail: `${workingWeightKg > 0 ? '20kg' : '自重'} × 10-15次`,
    cue: '找动作感觉，不急着加重量，注意力放在目标肌群发力。凯圣王：这一组主要是"走一遍动作模式"。',
  });

  // 30% 工作重量
  if (workingWeightKg >= 20) {
    steps.push({
      order: 2,
      phase: 'first-set',
      name: '轻重量组',
      detail: `${Math.round(workingWeightKg * 0.3)}kg × 8-10次`,
      cue: '速度放慢，感受目标肌肉收缩。谭成义：这一组要专注于肌肉控制。',
    });
  }

  // 50% 工作重量
  if (workingWeightKg >= 40) {
    steps.push({
      order: 3,
      phase: 'first-set',
      name: '半程重量组',
      detail: `${Math.round(workingWeightKg * 0.5)}kg × 5-8次`,
      cue: '这时开始加快速度，神经募集增加。感受重量在身上的感觉。',
    });
  }

  // 70% 工作重量
  if (workingWeightKg >= 60) {
    steps.push({
      order: 4,
      phase: 'first-set',
      name: '接近工作重量组',
      detail: `${Math.round(workingWeightKg * 0.7)}kg × 3-5次`,
      cue: '这是最后一组热身，做完直接上工作组。不要在这一组力竭。',
    });
  }

  // 神经激活（谭成义特色）
  steps.push({
    order: steps.length + 1,
    phase: 'neural',
    name: '神经激活（快速动作）',
    detail: isUpper ? '3次最快速度空杆推/拉' : isSquat ? '3次最快速度半蹲' : '3次最快速度硬拉启动',
    cue: '谭成义强调：热身最后做几组快速动作，让神经系统进入兴奋状态。这是"唤醒"神经，不是练力量。',
  });

  // 特殊动作的额外提示
  if (isDeadlift) {
    steps.push({
      order: steps.length + 1,
      phase: 'neural',
      name: '硬拉专项：握力预激活',
      detail: '单杠悬挂20-30秒 × 1-2组',
      cue: '硬拉最容易先掉握力，提前激活前臂和握力肌群。',
    });
  }

  return steps;
}

/** 热身常见错误 */
export const WARMUP_MISTAKES = [
  {
    title: '练前做静态拉伸',
    wrong: '压腿、压肩、静态保持30秒以上',
    right: '练前动态拉伸，练后静态拉伸。练前静态拉伸会降低力量输出约5-15%。',
  },
  {
    title: '每个动作都从头热身',
    wrong: '卧推热完，推肩又从空杆开始热',
    right: '第一个动作充分热身（4-5组），后续动作轻重量过渡即可（1-2组）。',
  },
  {
    title: '热身组力竭',
    wrong: '70%重量那组做到力竭',
    right: '热身组永远保留2-3次余力。力竭会消耗你的恢复能力，影响正式组表现。',
  },
  {
    title: '热身时间太长',
    wrong: '热身20分钟以上',
    right: '总热身时间控制在10-15分钟。太长会让你"冷下来"，神经兴奋性下降。',
  },
  {
    title: '天冷不延长热身',
    wrong: '冬天还是5分钟有氧',
    right: '环境温度低于15℃时，有氧升温延长到8-10分钟，关节活动幅度加大。',
  },
];

/** 特殊情况调整 */
export const WARMUP_ADJUSTMENTS = [
  {
    situation: '睡眠不足/状态差',
    advice: '起始重量降低10-15%，多做一组轻重量适应，不要硬冲。',
  },
  {
    situation: '关节有旧伤',
    advice: '旧伤部位额外做2组激活，减少该部位的冲击性动作。',
  },
  {
    situation: '刚起床练',
    advice: '热身时间延长到15分钟，身体从睡眠状态需要更长时间唤醒。',
  },
  {
    situation: '下午状态好',
    advice: '可以适当缩短热身，但不要低于8分钟。',
  },
];
