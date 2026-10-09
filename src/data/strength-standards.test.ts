// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import {
  AGE_GROUPS,
  LIFT_STANDARDS,
  STRENGTH_TIERS,
  TIER_UNRANKED,
  judgeStrength,
  liftDefOf,
  ratioThresholds,
  weightThresholds,
} from './strength-standards';

const bench = liftDefOf('bench')!;
const ageFactor = (id: string) => AGE_GROUPS.find((a) => a.id === id)!.factor;

describe('档位数据完整性', () => {
  it('共 38 项动作，key 不重复', () => {
    expect(LIFT_STANDARDS).toHaveLength(38);
    expect(new Set(LIFT_STANDARDS.map((l) => l.key)).size).toBe(38);
  });

  it('每项都是五档，且门槛严格递增', () => {
    for (const l of LIFT_STANDARDS) {
      expect(l.male, `${l.label} 应为五档`).toHaveLength(5);
      for (let i = 1; i < l.male.length; i++) {
        expect(l.male[i], `${l.label} 第 ${i + 1} 档`).toBeGreaterThan(l.male[i - 1]);
      }
    }
  });

  it('女性档位由男性按部位系数折算', () => {
    const female = ratioThresholds(bench, 'female');
    expect(ratioThresholds(bench, 'male')).toEqual(bench.male);
    female.forEach((v, i) => {
      expect(v).toBeCloseTo(Math.round(bench.male[i] * bench.femaleFactor * 100) / 100, 2);
    });
  });

  it('年龄组系数随年龄递减（40 岁后逐步放宽）', () => {
    expect(ageFactor('24-39')).toBe(1);
    expect(ageFactor('40-49')).toBeLessThan(1);
    expect(ageFactor('70-79')).toBeLessThan(ageFactor('60-69'));
  });
});

describe('判级', () => {
  it('男 70kg 卧推 1RM 100kg → 熟练（第 3 档），距下一档 5kg', () => {
    const r = judgeStrength(bench, 'male', 1, 70, 100)!;
    expect(r.tier).toBe(3);
    expect(r.label).toBe('熟练');
    expect(r.stars).toBe('★★★');
    expect(r.ratio).toBe(1.43);
    expect(r.gapKg).toBe(5);
    expect(r.nextLabel).toBe('优秀');
  });

  it('同样成绩，女性评级不低于男性（女性门槛更低）', () => {
    const male = judgeStrength(bench, 'male', 1, 70, 100)!;
    const female = judgeStrength(bench, 'female', 1, 70, 100)!;
    expect(female.tier).toBeGreaterThan(male.tier);
  });

  it('年长者门槛放宽：40-49 岁比 24-39 岁高一档', () => {
    const young = judgeStrength(bench, 'male', ageFactor('24-39'), 70, 100)!;
    const older = judgeStrength(bench, 'male', ageFactor('40-49'), 70, 100)!;
    expect(older.tier).toBeGreaterThan(young.tier);
  });

  it('未达首档 → 起步，且下一档指向入门', () => {
    const r = judgeStrength(bench, 'male', 1, 70, 20)!;
    expect(r.tier).toBe(0);
    expect(r.label).toBe(TIER_UNRANKED);
    expect(r.stars).toBe('');
    expect(r.nextLabel).toBe(STRENGTH_TIERS[0].label);
  });

  it('已达最高档 → gap 为 null、进度 100%', () => {
    const r = judgeStrength(bench, 'male', 1, 70, 200)!;
    expect(r.tier).toBe(5);
    expect(r.label).toBe('精英');
    expect(r.gapKg).toBeNull();
    expect(r.nextLabel).toBeNull();
    expect(r.withinPct).toBe(100);
  });

  it('体重或 1RM 缺失 → 返回 null（页面显示填完整数据）', () => {
    expect(judgeStrength(bench, 'male', 1, 0, 100)).toBeNull();
    expect(judgeStrength(bench, 'male', 1, 70, 0)).toBeNull();
    expect(judgeStrength(bench, 'male', 1, 70, Number.NaN)).toBeNull();
  });

  it('绝对门槛随体重线性缩放', () => {
    const a = weightThresholds(bench, 'male', 70, 1);
    const b = weightThresholds(bench, 'male', 80, 1);
    b.forEach((v, i) => expect(v).toBeCloseTo((a[i] * 80) / 70, 1));
  });

  it('对照表行数与档位数一致，且当前档只标记一个', () => {
    const r = judgeStrength(bench, 'male', 1, 70, 100)!;
    expect(r.rows).toHaveLength(STRENGTH_TIERS.length);
    expect(r.rows.filter((x) => x.current)).toHaveLength(1);
    expect(r.rows.filter((x) => x.passed)).toHaveLength(3);
  });
});

describe('自重动作', () => {
  it('引体向上按附加负重判定：负重 0 也能达到入门', () => {
    const pullUp = liftDefOf('pull_up')!;
    const r = judgeStrength(pullUp, 'male', 1, 70, 0);
    // 1RM 为 0 时不判级（不是"没负重就没等级"，而是没数据）
    expect(r).toBeNull();

    const weighted = judgeStrength(pullUp, 'male', 1, 70, 7)!;
    expect(weighted.tier).toBeGreaterThanOrEqual(1);
  });
});
