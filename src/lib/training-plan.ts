// EXPORTS: 本周训练计划生成器
// 输入：目标（IGeal）+ 分化 + 金字塔 + 训练水平 → 7 天训练日排布与每天的具体动作清单
// 动作池取自 goals.ts 各目标的 movements（含 set / 视频链接 / 要点），按部位关键字分类后按分化分配
import type { IGoal, IGoalMovement } from '@/data/goals';
import { ROUTINE_PATTERNS, WEEK_DAY_LABELS } from '@/lib/meal-plan';
import type { SplitType, PyramidType } from '@/lib/store';
import type { TrainLevel } from '@/lib/body-math';

export interface DayTraining {
  label: string; // 周一
  isTrainDay: boolean;
  title: string; // 推日 / 拉日 / 腿日 / 全身A …
  muscles: string; // 胸·肩·三头
  movements: IGoalMovement[]; // 当天动作清单
}

export interface WeekTraining {
  splitId: SplitType;
  splitName: string;
  days: DayTraining[];
  pyramidNote: string;
  levelNote: string;
}

const SPLIT_NAMES: Record<SplitType, string> = {
  'full-body': '全身分化（二分化）',
  'push-pull-legs': '推拉腿（三分化）',
  'ppl-upper-lower': '推拉腿 + 上下（四分化）',
  'upper-lower': '上下分化（四分化）',
  'bro-split': '五分化',
};

/** 每分化 × 每训练日要练的部位（周一~周日；休息日跳过） */
const SPLIT_DAY_MUSCLES: Record<SplitType, { title: string; muscles: string }[]> = {
  'full-body': [
    { title: '全身 A', muscles: '胸 · 背 · 腿 · 核心' },
    { title: '全身 B', muscles: '肩 · 手臂 · 腿 · 核心' },
    { title: '休息日', muscles: '' },
    { title: '全身 A', muscles: '胸 · 背 · 腿 · 核心' },
    { title: '全身 B', muscles: '肩 · 手臂 · 腿 · 核心' },
    { title: '休息日', muscles: '' },
    { title: '休息日', muscles: '' },
  ],
  'push-pull-legs': [
    { title: '推日', muscles: '胸 · 肩 · 三头' },
    { title: '拉日', muscles: '背 · 二头' },
    { title: '腿日', muscles: '腿 · 臀' },
    { title: '休息日', muscles: '' },
    { title: '推日', muscles: '胸 · 肩 · 三头' },
    { title: '拉日', muscles: '背 · 二头' },
    { title: '休息日', muscles: '' },
  ],
  'ppl-upper-lower': [
    { title: '推日', muscles: '胸 · 肩 · 三头' },
    { title: '拉日', muscles: '背 · 二头' },
    { title: '腿日', muscles: '腿 · 臀' },
    { title: '休息日', muscles: '' },
    { title: '上肢日', muscles: '胸 · 背 · 肩 · 手臂' },
    { title: '下肢日', muscles: '腿 · 臀 · 核心' },
    { title: '休息日', muscles: '' },
  ],
  'upper-lower': [
    { title: '上肢 A', muscles: '胸 · 背 · 肩' },
    { title: '下肢 A', muscles: '腿 · 臀' },
    { title: '休息日', muscles: '' },
    { title: '上肢 B', muscles: '背 · 肩 · 手臂' },
    { title: '下肢 B', muscles: '腿 · 臀 · 核心' },
    { title: '休息日', muscles: '' },
    { title: '补强日', muscles: '手臂 · 腹 · 薄弱部位' },
  ],
  'bro-split': [
    { title: '胸部', muscles: '胸 · 三头' },
    { title: '背部', muscles: '背 · 二头' },
    { title: '肩部', muscles: '肩 · 腹' },
    { title: '腿部', muscles: '腿 · 臀' },
    { title: '手臂', muscles: '二头 · 三头 · 腹' },
    { title: '休息日', muscles: '' },
    { title: '休息日', muscles: '' },
  ],
};

/** 按动作名分类部位（基于目标动作库的命名习惯） */
function classifyMuscle(name: string): string[] {
  const tags: string[] = [];
  if (/卧推|飞鸟|夹胸|俯卧撑|臂屈伸/.test(name)) tags.push('胸');
  if (/划船|下拉|引体|悬垂|水平拉/.test(name)) tags.push('背');
  if (/实力推|推举|侧平举|前平举|反向飞鸟|耸肩/.test(name)) tags.push('肩');
  if (/弯举|下压|臂屈伸|锤式/.test(name)) tags.push('手臂');
  if (/深蹲|硬拉|腿举|弓步|提踵|分腿蹲|蹲/.test(name)) tags.push('腿');
  if (/举腿|伐木|卷腹|平板|劈柴|臀桥|核心/.test(name)) tags.push('核心');
  if (/腕弯举|转腕|旋前|旋后|尺偏|虎口|捏握/.test(name)) tags.push('专项');
  if (/跳绳|慢跑|长跑|拳击|空击|冲刺|轮胎|农夫走|波比|负重行军|沙袋|行军/.test(name)) tags.push('有氧');
  return tags;
}

/** 当天需要的部位 → 从该目标的动作池取动作（去重，有视频优先，按给定上限截取） */
const RELATED: Record<string, string[]> = {
  胸: ['肩', '手臂'],
  肩: ['胸', '手臂'],
  背: ['手臂'],
  腿: ['核心'],
  手臂: ['胸', '背', '肩'],
  核心: ['腿'],
};

function pickMoves(goal: IGoal, muscles: string[], max: number): IGoalMovement[] {
  const wanted = new Set(muscles);
  const related = new Set<string>();
  for (const w of muscles) for (const r of RELATED[w] ?? []) related.add(r);
  const pool = goal.movements.filter((m) => {
    const tags = classifyMuscle(m.name);
    return tags.some((t) => wanted.has(t) || related.has(t));
  });
  const seen = new Set<string>();
  const out: IGoalMovement[] = [];
  for (const m of pool) {
    if (seen.has(m.name)) continue;
    seen.add(m.name);
    out.push(m);
    if (out.length >= max) break;
  }
  return out;
}

/** 动作库少的专项目标（斗腕 / 大力士 / 街健）：不按部位硬分，按天轮转全部动作，保证每个动作每周都能练到 */
function rotateMoves(goal: IGoal, dayIndex: number, max: number): IGoalMovement[] {
  const n = goal.movements.length;
  if (n === 0) return [];
  const out: IGoalMovement[] = [];
  for (let i = 0; i < Math.min(max, n); i++) {
    out.push(goal.movements[(dayIndex + i) % n]);
  }
  return out;
}

/** 动作库充足（≥14 个）的目标按部位分配；否则按天轮转 */
function pickForDay(goal: IGoal, muscles: string[], dayIndex: number, max: number): IGoalMovement[] {
  if (goal.movements.length >= 14) return pickMoves(goal, muscles, max);
  return rotateMoves(goal, dayIndex, max);
}

const PYRAMID_NOTES: Record<PyramidType, string> = {
  reverse:
    '倒金字塔：先做最重的一组（约 5 次），随后每组逐步减重加次数（8 / 12 / 15）。神经募集最强时先冲极限重量，泵感在后；主项使用，小动作慎用。',
  straight:
    '正金字塔：从轻重量高次数热身组开始（15 / 12），逐组加重减次数（8 / 5）。关节与肌肉先充分预热再上重量，安全稳妥，适合新手与主项打底。',
  russian:
    '俄式金字塔：按 5/4/3/2/1 五组固定次数逐组加重，最后一组冲一次极限（1RM），对中枢神经要求高，练前务必充分热身，恢复不好时降一档。',
  double:
    '双金字塔：先正金字塔热身爬到重量顶点（8 → 6 → 4），再倒金字塔逐组减重回到高次数（6 → 8 → 12），单次容量大、时间长，控制在 70 分钟上限内。',
};

const LEVEL_NOTES: Record<TrainLevel, string> = {
  beginner:
    '新手：每个动作先做 2–3 组起步，重量宁轻勿重，把动作模式练熟；前 4–6 周每周按计划完成即可，不需要冲击力竭。',
  intermediate:
    '中级：每个动作 3–4 组，主项每 1–2 周尝试小幅加重（上肢 +2.5kg、下肢 +5kg）；每组力竭前留 1–2 次余量。',
  advanced:
    '高级：每个动作 4–5 组，主项可用 1–2 组力竭 / 强制次数突破平台，其余组仍保留余量；总训练量达到上限时优先减辅助组。',
};

/** 生成 7 天训练计划 */
export function buildWeekTraining(goal: IGoal, splitId: SplitType, pyramid: PyramidType, level: TrainLevel): WeekTraining {
  const pattern = ROUTINE_PATTERNS[splitId] ?? ROUTINE_PATTERNS['push-pull-legs'];
  const templates = SPLIT_DAY_MUSCLES[splitId] ?? SPLIT_DAY_MUSCLES['push-pull-legs'];
  const days: DayTraining[] = WEEK_DAY_LABELS.map((label, i) => {
    const isTrainDay = pattern[i] ?? true;
    const t = templates[i] ?? { title: '训练日', muscles: '' };
    if (!isTrainDay) return { label, isTrainDay: false, title: '休息日', muscles: '', movements: [] };
    // 当天部位 → 动作数：主项日 4 个（bro 五分化每天 4–5 个，复合日 5–6 个）
    const max = splitId === 'bro-split' ? 5 : splitId === 'full-body' ? 6 : 5;
    const muscles = t.muscles.split('·').map((s) => s.trim()).filter(Boolean);
    const rotateMode = goal.movements.length < 14;
    const movements = pickForDay(goal, muscles, i, max);
    return {
      label,
      isTrainDay: true,
      title: rotateMode ? '专项训练（动作轮转）' : t.title,
      muscles: rotateMode ? '目标专项动作按天轮转，全动作每周覆盖' : t.muscles,
      movements,
    };
  });
  return {
    splitId,
    splitName: SPLIT_NAMES[splitId],
    days,
    pyramidNote: PYRAMID_NOTES[pyramid] ?? PYRAMID_NOTES.reverse,
    levelNote: LEVEL_NOTES[level] ?? LEVEL_NOTES.beginner,
  };
}
