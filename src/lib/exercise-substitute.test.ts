// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import { findSubstitutes, equipClass, type ExerciseLite } from './exercise-substitute';

const ex = (o: Partial<ExerciseLite> & { id: string }): ExerciseLite => ({
  name: o.id,
  nameZh: o.id,
  equipment: 'other',
  primaryMuscles: [],
  ...o,
});

const bench = ex({
  id: 'bench',
  nameZh: '平板杠铃卧推',
  equipment: 'barbell',
  primaryMuscles: ['chest'],
  secondaryMuscles: ['triceps', 'shoulders'],
  level: 'intermediate',
  mechanic: 'compound',
  force: 'push',
});

const pool: ExerciseLite[] = [
  bench,
  ex({
    id: 'db-bench',
    nameZh: '哑铃卧推',
    equipment: 'dumbbell',
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps'],
    level: 'intermediate',
    mechanic: 'compound',
    force: 'push',
  }),
  ex({
    id: 'machine-press',
    nameZh: '杠杆胸推',
    equipment: 'machine',
    primaryMuscles: ['chest'],
    level: 'beginner',
    mechanic: 'compound',
    force: 'push',
  }),
  ex({
    id: 'cable-fly',
    nameZh: '绳索夹胸',
    equipment: 'cable',
    primaryMuscles: ['chest'],
    level: 'intermediate',
    mechanic: 'isolation',
    force: 'push',
  }),
  ex({
    id: 'squat',
    nameZh: '杠铃全程深蹲',
    equipment: 'barbell',
    primaryMuscles: ['quadriceps'],
    mechanic: 'compound',
    force: 'push',
  }),
  ex({
    id: 'row',
    nameZh: '杠铃俯身划船',
    equipment: 'barbell',
    primaryMuscles: ['middle back'],
    mechanic: 'compound',
    force: 'pull',
  }),
];

describe('equipClass', () => {
  it('杠铃与曲杆归为同一类', () => {
    expect(equipClass('barbell')).toBe('杠铃');
    expect(equipClass('e-z curl bar')).toBe('杠铃');
  });
  it('哑铃与壶铃归为同一类', () => {
    expect(equipClass('dumbbell')).toBe('哑铃');
    expect(equipClass('kettlebells')).toBe('哑铃');
  });
  it('未知器械原样返回', () => {
    expect(equipClass('战绳')).toBe('战绳');
  });
});

describe('findSubstitutes', () => {
  it('排除自身', () => {
    const r = findSubstitutes(bench, pool);
    expect(r.map((x) => x.id)).not.toContain('bench');
  });

  it('默认只推荐换了器械的替代', () => {
    const r = findSubstitutes(bench, pool);
    const ids = r.map((x) => x.id);
    expect(ids).toContain('db-bench');
    expect(ids).toContain('machine-press');
    // 同器械的深蹲主肌群不同，本就不会命中；换个同器械同肌群的验证：
    const sameEquipPool = [
      bench,
      ex({
        id: 'incline-bench',
        nameZh: '杠铃上斜卧推',
        equipment: 'barbell',
        primaryMuscles: ['chest'],
        mechanic: 'compound',
        force: 'push',
      }),
    ];
    expect(findSubstitutes(bench, sameEquipPool).map((x) => x.id)).toEqual([]);
    // 放开限制后同器械变式也出现
    expect(
      findSubstitutes(bench, sameEquipPool, { mustSwitchEquipment: false }).map((x) => x.id),
    ).toContain('incline-bench');
  });

  it('主肌群完全不重合的不算替代', () => {
    const r = findSubstitutes(bench, pool);
    const ids = r.map((x) => x.id);
    expect(ids).not.toContain('squat');
    expect(ids).not.toContain('row');
  });

  it('命中最多、发力与复合性都一致的排在前面', () => {
    const r = findSubstitutes(bench, pool);
    expect(r[0].id).toBe('db-bench');
    expect(r[0].reasons).toContain('同主肌群：chest');
    expect(r[0].reasons.join()).toContain('换器械');
  });

  it('无主肌群时返回空', () => {
    expect(findSubstitutes(ex({ id: 'x', primaryMuscles: [] }), pool)).toEqual([]);
  });

  it('limit 生效', () => {
    expect(findSubstitutes(bench, pool, { limit: 1 })).toHaveLength(1);
  });

  it('难度跨度过大时会降权', () => {
    const easy = ex({
      id: 'easy',
      nameZh: '新手推',
      equipment: 'bands',
      primaryMuscles: ['chest'],
      level: 'beginner',
      mechanic: 'compound',
      force: 'push',
    });
    const hard = ex({
      id: 'hard',
      nameZh: '专家推',
      equipment: 'cable',
      primaryMuscles: ['chest'],
      level: 'expert',
      mechanic: 'compound',
      force: 'push',
    });
    const expertTarget = { ...bench, level: 'expert' };
    const r = findSubstitutes(expertTarget, [expertTarget, easy, hard]);
    expect(r[0].id).toBe('hard');
  });
});
