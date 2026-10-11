// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import {
  ATHLETIC_METRICS,
  ENDURANCE_METRICS,
  GRADE_COLORS,
  LIFT_STANDARDS,
  estimate1RM,
  formatDuration,
  formatMetricValue,
  gapText,
  judgeThresholds,
  liftChartColor,
  liftGapText,
  liftLabel,
  medianTier,
  metricDefOf,
  overallRating,
  parseDurationInput,
  tierColor,
  tierLevelProgress,
  tierProgress,
} from './performance-standards';

const PUSHUP = [10, 25, 35, 50, 60];
const PUSHUP_LABELS = ['入门', '进阶', '熟练', '优秀', '精英'];
const SPRINT = [9.5, 8.5, 7.5, 6.9]; // 50 米（男，越小越好）
const SPRINT_LABELS = ['入门', '进阶', '熟练', '优秀'];

describe('judgeThresholds · 越大越好', () => {
  it('未达首档 → tier 0、label 起步、给出到首档的差距', () => {
    const r = judgeThresholds(5, PUSHUP, PUSHUP_LABELS);
    expect(r.tier).toBe(0);
    expect(r.label).toBe('起步');
    expect(r.nextLabel).toBe('入门');
    expect(r.gap).toBe(5);
    expect(r.color).toBe(GRADE_COLORS[0]);
  });

  it('恰好命中门槛 → 判定为已过该档（>= 而非 >）', () => {
    const r = judgeThresholds(25, PUSHUP, PUSHUP_LABELS);
    expect(r.tier).toBe(2);
    expect(r.label).toBe('进阶');
    expect(r.nextLabel).toBe('熟练');
    expect(r.gap).toBe(10);
    expect(r.color).toBe(GRADE_COLORS[2]);
  });

  it('达到最高档 → 无下一档、gap 为 null', () => {
    const r = judgeThresholds(60, PUSHUP, PUSHUP_LABELS);
    expect(r.tier).toBe(5);
    expect(r.label).toBe('精英');
    expect(r.nextLabel).toBeNull();
    expect(r.gap).toBeNull();
    expect(r.color).toBe(GRADE_COLORS[5]);
  });

  it('超过最高档只封顶在最高档，不会越界', () => {
    expect(judgeThresholds(999, PUSHUP, PUSHUP_LABELS).tier).toBe(5);
  });

  it('null / NaN / Infinity → tier -1 未录入', () => {
    for (const bad of [null, undefined, Number.NaN, Number.POSITIVE_INFINITY]) {
      const r = judgeThresholds(bad as number, PUSHUP, PUSHUP_LABELS);
      expect(r.tier).toBe(-1);
      expect(r.label).toBe('未录入');
      expect(r.gap).toBeNull();
      expect(r.color).toBe(GRADE_COLORS[0]);
    }
  });
});

describe('judgeThresholds · 越小越好', () => {
  it('比首档还慢 → tier 0，差距为首档线之差', () => {
    const r = judgeThresholds(10, SPRINT, SPRINT_LABELS, 'lower');
    expect(r.tier).toBe(0);
    expect(r.label).toBe('起步');
    expect(r.nextLabel).toBe('入门');
    expect(r.gap).toBe(0.5);
  });

  it('方向反了必须换向：<= 才过关', () => {
    expect(judgeThresholds(9.5, SPRINT, SPRINT_LABELS, 'lower').tier).toBe(1);
    expect(judgeThresholds(6.9, SPRINT, SPRINT_LABELS, 'lower').tier).toBe(4);
    expect(judgeThresholds(9.5, SPRINT, SPRINT_LABELS, 'lower').label).toBe('入门');
  });

  it('达到最快档 → 优秀、无下一档', () => {
    const r = judgeThresholds(6.5, SPRINT, SPRINT_LABELS, 'lower');
    expect(r.tier).toBe(4);
    expect(r.label).toBe('优秀');
    expect(r.nextLabel).toBeNull();
  });
});

describe('tierProgress / tierColor', () => {
  it('tier 进度按档位占总档数折算，未录入为 0', () => {
    expect(tierProgress(-1, 5)).toBe(0);
    expect(tierProgress(0, 5)).toBe(0);
    expect(tierProgress(3, 5)).toBe(60);
    expect(tierProgress(5, 5)).toBe(100);
    expect(tierProgress(9, 5)).toBe(100);
    expect(tierProgress(1, 3)).toBe(33);
  });

  it('配色越界时夹紧到两端', () => {
    expect(tierColor(-3)).toBe(GRADE_COLORS[0]);
    expect(tierColor(0)).toBe(GRADE_COLORS[0]);
    expect(tierColor(9)).toBe(GRADE_COLORS[GRADE_COLORS.length - 1]);
  });
});

describe('medianTier 取中位', () => {
  it('过滤未录入（-1）后取中位', () => {
    expect(medianTier([])).toBeNull();
    expect(medianTier([-1, -1])).toBeNull();
    expect(medianTier([-1, 3, 5])).toBe(4);
  });

  it('奇偶长度分别取中位 / 中间两档均值', () => {
    expect(medianTier([1, 3, 5])).toBe(3);
    expect(medianTier([1, 5])).toBe(3);
    expect(medianTier([2, 4])).toBe(3);
    expect(medianTier([3])).toBe(3);
  });
});

describe('overallRating 三板块加权', () => {
  it('全缺 → 未录入', () => {
    const r = overallRating({ strength: null, endurance: null, athletic: null });
    expect(r.score).toBeNull();
    expect(r.label).toBe('未录入');
  });

  it('缺板块时按剩余权重归一化（不拉低分数）', () => {
    const r = overallRating({ strength: 80, endurance: null, athletic: null });
    expect(r.score).toBe(80);
    expect(r.label).toBe('优秀');
  });

  it('三板块齐全按 0.5 / 0.3 / 0.2 加权', () => {
    expect(overallRating({ strength: 100, endurance: 100, athletic: 100 }).score).toBe(100);
    expect(overallRating({ strength: 90, endurance: 0, athletic: 0 }).score).toBe(45);
  });

  it('分数落入正确档位名称', () => {
    expect(overallRating({ strength: 60, endurance: 60, athletic: 60 }).label).toBe('良好');
    expect(overallRating({ strength: 0, endurance: 0, athletic: 0 }).label).toBe('起步');
  });
});

describe('estimate1RM（与全站口径一致）', () => {
  it('Epley：100kg × 5 → 116.7', () => {
    expect(estimate1RM(100, 5)).toBe(116.7);
  });
  it('0 次按 1 次处理', () => {
    expect(estimate1RM(100, 0)).toBe(estimate1RM(100, 1));
  });
});

describe('tierLevelProgress 档内进度', () => {
  const T = [10, 20, 30];
  const L = ['A', 'B', 'C'];

  it('未录入 → null', () => {
    expect(tierLevelProgress(null, T, L)).toBeNull();
    expect(tierLevelProgress(Number.NaN, T, L)).toBeNull();
    expect(tierLevelProgress(15, [], L)).toBeNull();
  });

  it('未达首档：区间为 起步→首档，按到首档线的比例', () => {
    const r = tierLevelProgress(5, T, L)!;
    expect(r.pct).toBe(50);
    expect(r.from).toBe(0);
    expect(r.to).toBe(10);
    expect(r.fromLabel).toBe('起步');
    expect(r.toLabel).toBe('A');
    expect(r.isTop).toBe(false);
  });

  it('中段档位：区间为 当前档→下一档', () => {
    expect(tierLevelProgress(15, T, L)!.pct).toBe(50);
    expect(tierLevelProgress(15, T, L)!.fromLabel).toBe('A');
    expect(tierLevelProgress(15, T, L)!.toLabel).toBe('B');
    expect(tierLevelProgress(25, T, L)!.pct).toBe(50);
    expect(tierLevelProgress(20, T, L)!.pct).toBe(0);
  });

  it('达到最高档 → isTop、pct 100', () => {
    const r = tierLevelProgress(30, T, L)!;
    expect(r.isTop).toBe(true);
    expect(r.pct).toBe(100);
    expect(tierLevelProgress(999, T, L)!.isTop).toBe(true);
  });

  it('越小越好的项目按距离折算', () => {
    const tl = [10, 8, 6];
    expect(tierLevelProgress(12, tl, L, 'lower')!.pct).toBe(0);
    expect(tierLevelProgress(9, tl, L, 'lower')!.pct).toBe(50);
    expect(tierLevelProgress(9, tl, L, 'lower')!.fromLabel).toBe('A');
    expect(tierLevelProgress(7, tl, L, 'lower')!.fromLabel).toBe('B');
    expect(tierLevelProgress(6, tl, L, 'lower')!.isTop).toBe(true);
  });
});

describe('时长 / 数值格式化', () => {
  it('parseDurationInput 支持 分:秒、分′秒″、纯秒', () => {
    expect(parseDurationInput('4:50')).toBe(290);
    expect(parseDurationInput('4′50″')).toBe(290);
    expect(parseDurationInput("4'50")).toBe(290);
    expect(parseDurationInput('90')).toBe(90);
    expect(parseDurationInput('  90  ')).toBe(90);
  });

  it('parseDurationInput 非法输入 → null', () => {
    expect(parseDurationInput('')).toBeNull();
    expect(parseDurationInput('abc')).toBeNull();
    expect(parseDurationInput('4:xx')).toBeNull();
  });

  it('formatDuration：分′秒″ / 秒″', () => {
    expect(formatDuration(290)).toBe('4′50″');
    expect(formatDuration(45)).toBe('45″');
    expect(formatDuration(60)).toBe('1′00″');
    expect(formatDuration(605)).toBe('10′05″');
    expect(formatDuration(-5)).toBe('0″');
    expect(formatDuration(90.4)).toBe('1′30″');
  });

  it('formatMetricValue 按单位与是否计时格式化', () => {
    const reps = metricDefOf(ENDURANCE_METRICS, 'pushup')!;
    expect(formatMetricValue(reps, 12.4)).toBe('12.4 次');
    const jump = metricDefOf(ATHLETIC_METRICS, 'longjump')!;
    expect(formatMetricValue(jump, 250)).toBe('250 cm');
    const plank = metricDefOf(ENDURANCE_METRICS, 'plank')!;
    expect(formatMetricValue(plank, 290)).toBe('4′50″');
  });
});

describe('差距文案', () => {
  it('gapText：越大越好用「再 +」，越小越好用「再快」', () => {
    const reps = metricDefOf(ENDURANCE_METRICS, 'pushup')!;
    expect(gapText(reps, { tier: 1, label: '入门', nextLabel: '进阶', gap: 15, color: '#000' })).toBe(
      '再 +15 次 进入 进阶',
    );
    const sprint = metricDefOf(ATHLETIC_METRICS, 'sprint50')!;
    expect(gapText(sprint, { tier: 0, label: '起步', nextLabel: '入门', gap: 1.5, color: '#000' })).toBe(
      '再快 1.5″ 进入 入门',
    );
  });

  it('gapText：无 gap 或无 nextLabel → null', () => {
    const reps = metricDefOf(ENDURANCE_METRICS, 'pushup')!;
    expect(gapText(reps, { tier: 5, label: '精英', nextLabel: null, gap: null, color: '#000' })).toBeNull();
  });

  it('liftGapText：有下一档才给文案', () => {
    expect(liftGapText(5, '熟练')).toBe('再 +5 kg 进入 熟练');
    expect(liftGapText(null, '熟练')).toBeNull();
    expect(liftGapText(5, null)).toBeNull();
  });
});

describe('力量动作元数据与标准表', () => {
  it('动作名与图表色可查', () => {
    expect(liftLabel('squat')).toBe('深蹲');
    expect(liftChartColor('bench')).toBe('var(--chart-2)');
  });

  it('每个动作男女各 5 档、门槛严格递增（判级前提）', () => {
    for (const key of Object.keys(LIFT_STANDARDS) as (keyof typeof LIFT_STANDARDS)[]) {
      for (const sex of ['male', 'female'] as const) {
        const t = LIFT_STANDARDS[key][sex];
        expect(t).toHaveLength(5);
        for (let i = 1; i < t.length; i += 1) expect(t[i]).toBeGreaterThan(t[i - 1]);
      }
    }
  });

  it('men 门槛不低于同档 women（同动作）', () => {
    for (const key of Object.keys(LIFT_STANDARDS) as (keyof typeof LIFT_STANDARDS)[]) {
      const m = LIFT_STANDARDS[key].male;
      const f = LIFT_STANDARDS[key].female;
      for (let i = 0; i < 5; i += 1) expect(m[i]).toBeGreaterThanOrEqual(f[i]);
    }
  });
});
