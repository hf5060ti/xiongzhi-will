// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 图源熔断回归测试：外站图床抖动时，动作演示要能自动换源并能「恢复后重试」。
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isHostDown, markHostFailed, pickSrc, resetImgGuard } from './img-guard';

const A = 'https://cdn.example.com/demo.gif';
const B = 'https://backup.example.com/demo.jpg';

describe('img-guard 图源熔断', () => {
  beforeEach(() => {
    resetImgGuard();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    resetImgGuard();
  });

  it('连续失败 3 次才熔断，之前不影响正常图源选择', () => {
    expect(isHostDown(A)).toBe(false);
    expect(markHostFailed(A)).toBe(false);
    expect(markHostFailed(A)).toBe(false);
    expect(markHostFailed(A)).toBe(true);
    expect(isHostDown(A)).toBe(true);
  });

  it('熔断后 pickSrc 自动跳过该图床，改用候选源', () => {
    markHostFailed(A);
    markHostFailed(A);
    markHostFailed(A);
    expect(pickSrc([A, B])).toBe(B);
  });

  it('候选全被熔断时仍返回第一个，交给 onError 显示占位', () => {
    for (let i = 0; i < 3; i++) { markHostFailed(A); markHostFailed(B); }
    expect(pickSrc([A, B])).toBe(A);
  });

  it('7 天后重新给满 3 次机会：过期后第一次失败不会立刻重新熔断', () => {
    markHostFailed(A);
    markHostFailed(A);
    markHostFailed(A);
    expect(isHostDown(A)).toBe(true);

    // 熔断过期（TTL 7 天 + 1 秒）
    vi.setSystemTime(new Date('2026-01-08T00:00:01Z'));
    expect(isHostDown(A)).toBe(false);
    // 修复前 fails 一直是 3，这里会立刻返回 true，网络刚恢复就又被拉黑 7 天
    expect(markHostFailed(A)).toBe(false);
    expect(isHostDown(A)).toBe(false);
    expect(markHostFailed(A)).toBe(false);
    expect(markHostFailed(A)).toBe(true);
  });

  it('resetImgGuard 会立刻解除熔断（设置页「重试外部图源」）', () => {
    markHostFailed(A);
    markHostFailed(A);
    markHostFailed(A);
    resetImgGuard();
    expect(isHostDown(A)).toBe(false);
  });
});
