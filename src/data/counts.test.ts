// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import exercisesDb from './exercises-db.json';
import exercisesExt from './exercises-ext.json';
import { FITWILL_EXERCISES } from './fitwill-exercises';
import { LIFT_STANDARDS } from './strength-standards';
import { SUPPLEMENTS } from './supplements';
import { EXERCISE_COUNT, STRENGTH_LIFT_COUNT, SUPPLEMENT_COUNT } from './counts';

/**
 * 守护对外宣传数字与真实数据的一致性。
 *
 * 本站踩过两次同类坑：动作百科 SEO 描述写着「876 个动作」实际 2428 个；
 * 力量等级页写着「39 项动作」实际 42 项。数字散落在 README、SEO 描述、
 * 页面文案里，加动作的人不会记得回头改文案。
 * 这里把校验固化成测试——数据动了而 counts.ts 没动，CI 立刻失败。
 * 测试环境可以放心 import 大 JSON，它们不会进生产 bundle。
 */
describe('内容规模数字与数据一致', () => {
  it('动作总数 = db + ext + fitwill', () => {
    const actual = exercisesDb.length + exercisesExt.length + FITWILL_EXERCISES.length;
    expect(EXERCISE_COUNT).toBe(actual);
  });

  it('力量等级动作数 = LIFT_STANDARDS 条目数', () => {
    expect(STRENGTH_LIFT_COUNT).toBe(LIFT_STANDARDS.length);
  });

  it('补剂数 = SUPPLEMENTS 条目数', () => {
    expect(SUPPLEMENT_COUNT).toBe(SUPPLEMENTS.length);
  });

  it('三个数字都是正整数，避免文案里出现 NaN / 0', () => {
    for (const n of [EXERCISE_COUNT, STRENGTH_LIFT_COUNT, SUPPLEMENT_COUNT]) {
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThan(0);
    }
  });
});
