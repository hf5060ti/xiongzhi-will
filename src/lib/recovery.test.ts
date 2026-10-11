// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import { assessRecovery, shouldDeload, todayIso, type RecoveryEntry } from './recovery';

describe('assessRecovery', () => {
  it('无记录 → null', () => {
    expect(assessRecovery([])).toBeNull();
  });

  it('睡眠充足、压力低 → good', () => {
    const log: RecoveryEntry[] = [
      { date: '2026-10-01', sleepHrs: 8, stress: 1, soreness: 1 },
      { date: '2026-10-02', sleepHrs: 7.5, stress: 2, soreness: 2 },
      { date: '2026-10-03', sleepHrs: 8, stress: 1, soreness: 1 },
    ];
    expect(assessRecovery(log)?.level).toBe('good');
  });

  it('睡眠 < 6h 但压力不高 → warn', () => {
    const log: RecoveryEntry[] = [
      { date: '2026-10-01', sleepHrs: 5 },
      { date: '2026-10-02', sleepHrs: 5.5 },
      { date: '2026-10-03', sleepHrs: 5 },
    ];
    expect(assessRecovery(log)?.level).toBe('warn');
  });

  it('睡眠 < 6h 且压力/酸痛偏高 → bad', () => {
    const log: RecoveryEntry[] = [
      { date: '2026-10-01', sleepHrs: 5, stress: 4, soreness: 4 },
      { date: '2026-10-02', sleepHrs: 5, stress: 4, soreness: 4 },
      { date: '2026-10-03', sleepHrs: 5, stress: 5, soreness: 4 },
    ];
    expect(assessRecovery(log)?.level).toBe('bad');
  });

  it('仅酸痛偏高（无睡眠记录）→ 因 highSoreness 现在参与判定，给出 warn', () => {
    const log: RecoveryEntry[] = [
      { date: '2026-10-01', soreness: 4 },
      { date: '2026-10-02', soreness: 5 },
      { date: '2026-10-03', soreness: 4 },
    ];
    expect(assessRecovery(log)?.level).toBe('warn');
  });
});

describe('shouldDeload', () => {
  it('近 6 周规律训练 → 建议减载', () => {
    const weekly = Array.from({ length: 8 }, (_, i) => ({ label: `W${i}`, volume: 1000, sessions: i < 6 ? 3 : 1 }));
    expect(shouldDeload(weekly)?.weeks).toBe(6);
  });

  it('连续 3 周容量上升 → 建议减载', () => {
    const weekly = [
      { label: 'W1', volume: 500, sessions: 1 },
      { label: 'W2', volume: 600, sessions: 1 },
      { label: 'W3', volume: 700, sessions: 1 },
      { label: 'W4', volume: 800, sessions: 1 },
    ];
    expect(shouldDeload(weekly)?.weeks).toBe(3);
  });

  it('无规律训练信号 → null', () => {
    const weekly = [
      { label: 'W1', volume: 500, sessions: 1 },
      { label: 'W2', volume: 400, sessions: 1 },
      { label: 'W3', volume: 300, sessions: 1 },
    ];
    expect(shouldDeload(weekly)).toBeNull();
  });
});

describe('todayIso', () => {
  it('返回 YYYY-MM-DD 格式', () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
