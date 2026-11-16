// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 图源熔断回归测试：外站图床抖动时，动作演示要能自动换源并能「恢复后重试」。
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isHostDown, markHostFailed, markHostOk, pickSrc, resetImgGuard } from './img-guard';

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

  it('连续失败 5 次才熔断，之前不影响正常图源选择', () => {
    expect(isHostDown(A)).toBe(false);
    for (let i = 0; i < 4; i++) expect(markHostFailed(A)).toBe(false);
    expect(markHostFailed(A)).toBe(true);
    expect(isHostDown(A)).toBe(true);
  });

  it('熔断后 pickSrc 自动跳过该图床，改用候选源', () => {
    for (let i = 0; i < 5; i++) markHostFailed(A);
    expect(pickSrc([A, B])).toBe(B);
  });

  it('候选全被熔断时仍返回第一个，交给 onError 显示占位', () => {
    for (let i = 0; i < 5; i++) { markHostFailed(A); markHostFailed(B); }
    expect(pickSrc([A, B])).toBe(A);
  });

  it('2 天后重新给满 5 次机会：过期后第一次失败不会立刻重新熔断', () => {
    for (let i = 0; i < 5; i++) markHostFailed(A);
    expect(isHostDown(A)).toBe(true);

    // 熔断过期（TTL 2 天 + 1 秒）
    vi.setSystemTime(new Date('2026-01-03T00:00:01Z'));
    expect(isHostDown(A)).toBe(false);
    expect(markHostFailed(A)).toBe(false); // 过期后第 1 次：重新计数
    expect(isHostDown(A)).toBe(false);
    // 再失败 3 次（累计第 2–4 次）仍不熔断，第 5 次才熔断
    for (let i = 0; i < 3; i++) expect(markHostFailed(A)).toBe(false);
    expect(markHostFailed(A)).toBe(true);
  });

  it('失败计数带时间窗：超过 10 分钟的旧失败不再累计，避免误封', () => {
    markHostFailed(A);
    markHostFailed(A);
    // 11 分钟后又失败一次：应从头计数，而不是累计成第 3 次
    vi.setSystemTime(new Date('2026-01-01T00:11:00Z'));
    expect(markHostFailed(A)).toBe(false);
    for (let i = 0; i < 3; i++) expect(markHostFailed(A)).toBe(false);
    expect(markHostFailed(A)).toBe(true);
  });

  it('markHostOk 清零失败计数：弱网下成败交替不会越攒越多', () => {
    markHostFailed(A);
    markHostFailed(A);
    markHostOk(A);
    for (let i = 0; i < 4; i++) expect(markHostFailed(A)).toBe(false);
    expect(markHostFailed(A)).toBe(true);
  });

  it('resetImgGuard 会立刻解除熔断（设置页「重试外部图源」）', () => {
    for (let i = 0; i < 5; i++) markHostFailed(A);
    resetImgGuard();
    expect(isHostDown(A)).toBe(false);
  });
});
