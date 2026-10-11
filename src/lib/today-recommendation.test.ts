// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import { getTodayRecommendation } from './today-recommendation';

describe('getTodayRecommendation', () => {
  it('无训练记录 → 从序列第一天开始', () => {
    const r = getTodayRecommendation('push-pull-legs', null, 0);
    expect(r.dayTitle).toBe('推日');
    expect(r.isRest).toBe(false);
  });

  it('PPL 距上次 >= 2 天 → 练下一天', () => {
    const r = getTodayRecommendation('push-pull-legs', '推日', 2);
    expect(r.dayTitle).toBe('拉日');
    expect(r.isRest).toBe(false);
  });

  it('PPL 距上次 1 天且在推/拉 → 连续练下一天', () => {
    const r = getTodayRecommendation('push-pull-legs', '推日', 1);
    expect(r.dayTitle).toBe('拉日');
    expect(r.isRest).toBe(false);
  });

  it('PPL 距上次 1 天且已到腿日 → 休息日', () => {
    const r = getTodayRecommendation('push-pull-legs', '腿日', 1);
    expect(r.dayTitle).toBe('休息日');
    expect(r.isRest).toBe(true);
  });

  it('距上次 0 天 → 今天已记录训练', () => {
    const r = getTodayRecommendation('bro-split', '胸部', 0);
    expect(r.message).toContain('今天已记录');
    expect(r.dayTitle).toBe('胸部');
  });

  it('自定义标签匹配不到 → 自由训练', () => {
    const r = getTodayRecommendation('push-pull-legs', '自定义野练', 3);
    expect(r.dayTitle).toBe('自由训练');
    expect(r.isRest).toBe(false);
  });

  it('bro-split 距上次 2 天 → 接背部', () => {
    const r = getTodayRecommendation('bro-split', '胸部', 2);
    expect(r.dayTitle).toBe('背部');
  });
});
