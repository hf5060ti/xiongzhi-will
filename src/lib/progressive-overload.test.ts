// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import { getOverloadAdvice, getExerciseHistory } from './progressive-overload';

describe('getOverloadAdvice', () => {
  it('次数达上限 → 加重量（复合步长 2.5kg）', () => {
    const advice = getOverloadAdvice('杠铃卧推', [[{ weightKg: 100, reps: 12 }, { weightKg: 100, reps: 12 }]], [8, 12]);
    expect(advice?.type).toBe('increase-weight');
    expect(advice?.nextWeightKg).toBe(102.5); // round((100+2.5)*2)/2
    expect(advice?.nextReps).toBe('8-10'); // minReps - round(maxReps-2)
  });

  it('次数低于下限 → 减重量', () => {
    const advice = getOverloadAdvice('杠铃深蹲', [[{ weightKg: 100, reps: 5 }]], [8, 12]);
    expect(advice?.type).toBe('decrease-weight');
    expect(advice?.nextWeightKg).toBe(97.5); // round((100-2.5)*2)/2
    expect(advice?.nextReps).toBe('8-12');
  });

  it('次数在区间内（孤立步长 1.25kg）→ 维持重量，尝试加次数', () => {
    const advice = getOverloadAdvice('哑铃弯举', [[{ weightKg: 10, reps: 10 }]], [8, 12]);
    expect(advice?.type).toBe('maintain');
    expect(advice?.nextWeightKg).toBe(10); // round(10*2)/2
    expect(advice?.nextReps).toBe('10-12');
  });

  it('自重动作无重量且达标 → 加次数', () => {
    const advice = getOverloadAdvice('引体向上', [[{ reps: 12 }, { reps: 12 }]]);
    expect(advice?.type).toBe('increase-reps');
    expect(advice?.nextWeightKg).toBeNull();
    expect(advice?.nextReps).toBe('14-16'); // round(12+2)-round(12+4)
  });

  it('无历史记录 → null', () => {
    expect(getOverloadAdvice('深蹲', [])).toBeNull();
    expect(getOverloadAdvice('深蹲', [[]])).toBeNull();
  });
});

describe('getExerciseHistory', () => {
  it('按日期顺序收集匹配动作的历史 sets', () => {
    const logs = [
      { date: '2026-10-01', exercises: [{ name: '卧推', sets: [{ weightKg: 60, reps: 8 }] }] },
      { date: '2026-10-05', exercises: [{ name: '卧推', sets: [{ weightKg: 80, reps: 8 }] }] },
    ];
    const history = getExerciseHistory(logs, '卧推');
    expect(history.length).toBe(2);
    expect(history[0][0]).toEqual({ weightKg: 60, reps: 8 });
    expect(history[1][0]).toEqual({ weightKg: 80, reps: 8 });
  });

  it('模糊匹配（大小写不敏感、包含），不展开英文别名', () => {
    const logs = [{ date: '2026-10-01', exercises: [{ name: '上斜哑铃卧推', sets: [{ weightKg: 40, reps: 10 }] }] }];
    expect(getExerciseHistory(logs, '卧推').length).toBe(1);
    expect(getExerciseHistory(logs, 'BENCH').length).toBe(0); // 仅按动作名包含匹配
  });
});
