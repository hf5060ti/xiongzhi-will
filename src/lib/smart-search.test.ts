// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import { normalizeQuery, smartMatch, buildMuscleAliases, SEARCH_ALIASES } from './smart-search';

describe('normalizeQuery', () => {
  it('去空白转小写', () => {
    expect(normalizeQuery('  Bench Press ')).toBe('bench press');
    expect(normalizeQuery('')).toBe('');
    expect(normalizeQuery('卧推')).toBe('卧推');
  });
});

describe('smartMatch', () => {
  it('空查询 = 全部匹配', () => {
    expect(smartMatch('', ['胸', '背'])).toBe(true);
  });

  it('中文别名可展开命中英文候选', () => {
    expect(smartMatch('卧推', ['bench press'])).toBe(true);
    expect(smartMatch('胸', ['chest'])).toBe(true);
    expect(smartMatch('深蹲', ['squat'])).toBe(true);
  });

  it('拼音首字母（单字）可命中', () => {
    expect(smartMatch('w', ['卧推'])).toBe(true);
  });

  it('多词 AND：每个词都需命中', () => {
    expect(smartMatch('chest back', ['chest', 'back'])).toBe(true);
    expect(smartMatch('chest leg', ['chest', 'back'])).toBe(false);
  });

  it('直接包含即命中', () => {
    expect(smartMatch('引体', ['引体向上'])).toBe(true);
    expect(smartMatch('xyz', ['引体向上'])).toBe(false);
  });
});

describe('buildMuscleAliases', () => {
  it('英文肌群映射到中文口语', () => {
    const cn = buildMuscleAliases(['chest'], ['shoulders']);
    expect(cn).toContain('胸肌');
    expect(cn).toContain('三角肌');
    expect(cn).toContain('胸');
  });
});

describe('SEARCH_ALIASES 数据完整性', () => {
  it('每个别名的取值均为非空数组', () => {
    for (const [, v] of Object.entries(SEARCH_ALIASES)) {
      expect(Array.isArray(v)).toBe(true);
      expect(v.length).toBeGreaterThan(0);
    }
  });
});
