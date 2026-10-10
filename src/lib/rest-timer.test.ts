// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import {
  defaultRestSeconds,
  defaultRestSecondsFor,
  fmtDuration,
  REST_KIND_LABEL,
  REST_KIND_NOTE,
  REST_PRESETS,
} from './rest-timer';

describe('fmtDuration 倒计时显示', () => {
  it('整分钟显示为 M:00', () => {
    expect(fmtDuration(180_000)).toBe('3:00');
    expect(fmtDuration(120_000)).toBe('2:00');
    expect(fmtDuration(600_000)).toBe('10:00');
  });

  it('带零头的秒数补零对齐', () => {
    expect(fmtDuration(150_000)).toBe('2:30');
    expect(fmtDuration(61_000)).toBe('1:01');
    expect(fmtDuration(65_000)).toBe('1:05');
  });

  it('向上取整：剩 1.5 秒显示 0:02，不显示 0:01', () => {
    expect(fmtDuration(1_500)).toBe('0:02');
    expect(fmtDuration(1_000)).toBe('0:01');
  });

  it('归零与负数都显示 0:00，不会出现负数倒计时', () => {
    expect(fmtDuration(0)).toBe('0:00');
    expect(fmtDuration(-5_000)).toBe('0:00');
  });

  it('超过一小时按分钟累加，不跳回 0', () => {
    expect(fmtDuration(3_599_000)).toBe('59:59');
    expect(fmtDuration(3_600_000)).toBe('60:00');
  });
});

describe('默认休息秒数', () => {
  it('复合 3 分钟、孤立 2 分钟起步（取区间下限）', () => {
    expect(defaultRestSeconds('compound')).toBe(180);
    expect(defaultRestSeconds('isolation')).toBe(120);
  });

  it('按动作名判定时与 restFor 口径一致', () => {
    expect(defaultRestSecondsFor('杠铃深蹲')).toBe(180);
    expect(defaultRestSecondsFor('哑铃卧推')).toBe(180);
    expect(defaultRestSecondsFor('哑铃弯举')).toBe(120);
  });

  it('预设秒数都落在 restFor() 宣称的区间内', () => {
    // 复合 3–5 分钟、孤立 2–3 分钟：预设不能越界，否则 UI 上写的区间和按下的按钮互相矛盾
    for (const p of REST_PRESETS.compound) {
      expect(p.sec).toBeGreaterThanOrEqual(180);
      expect(p.sec).toBeLessThanOrEqual(300);
    }
    for (const p of REST_PRESETS.isolation) {
      expect(p.sec).toBeGreaterThanOrEqual(120);
      expect(p.sec).toBeLessThanOrEqual(180);
    }
  });

  it('预设按秒数递增排列，UI 上从左到右是「短 → 长」', () => {
    for (const kind of ['compound', 'isolation'] as const) {
      const secs = REST_PRESETS[kind].map((p) => p.sec);
      expect(secs).toEqual([...secs].sort((a, b) => a - b));
    }
  });
});

describe('文案表完整性', () => {
  it('复合与孤立都有标签与说明，避免 undefined 渲染到页面上', () => {
    for (const kind of ['compound', 'isolation'] as const) {
      expect(REST_KIND_LABEL[kind]).toBeTruthy();
      expect(REST_KIND_NOTE[kind]).toBeTruthy();
    }
  });
});
