// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache-2.0
import { describe, expect, it } from 'vitest';
import { getFirstSetWarmup, WARMUP_GENERAL, DAY_ACTIVATION } from './warmup';

describe('getFirstSetWarmup', () => {
  it('上肢大重量：4 组递增 + 神经激活，共 5 步', () => {
    const steps = getFirstSetWarmup('杠铃卧推', 100);
    expect(steps.length).toBe(5);
    expect(steps[0].detail).toBe('20kg × 10-15次');
    expect(steps[1].detail).toBe('30kg × 8-10次'); // round(100*0.3)
    expect(steps[2].detail).toBe('50kg × 5-8次'); // round(100*0.5)
    expect(steps[3].detail).toBe('70kg × 3-5次'); // round(100*0.7)
    expect(steps[4].phase).toBe('neural');
    expect(steps[4].detail).toBe('3次最快速度空杆推/拉');
    expect(steps[4].order).toBe(5);
  });

  it('轻重量（10kg）：只有空杆组 + 神经激活，共 2 步', () => {
    const steps = getFirstSetWarmup('哑铃弯举', 10);
    expect(steps.length).toBe(2);
    expect(steps[0].detail).toBe('20kg × 10-15次'); // 工作重量>0 即显示空杆/极轻组
    expect(steps[1].detail).toBe('3次最快速度空杆推/拉');
    expect(steps[1].order).toBe(2);
  });

  it('深蹲：神经激活提示为半蹲', () => {
    const steps = getFirstSetWarmup('杠铃深蹲', 140);
    expect(steps.length).toBe(5);
    expect(steps[4].detail).toBe('3次最快速度半蹲');
  });

  it('硬拉：额外加握力预激活，共 6 步', () => {
    const steps = getFirstSetWarmup('硬拉', 200);
    expect(steps.length).toBe(6);
    expect(steps[4].detail).toBe('3次最快速度硬拉启动');
    expect(steps[5].name).toBe('硬拉专项：握力预激活');
    expect(steps[5].order).toBe(6);
  });

  it('自重动作（俯卧撑）：第一步为自重，神经提示为自重/空杆激活', () => {
    const steps = getFirstSetWarmup('俯卧撑', 0);
    expect(steps.length).toBe(2);
    expect(steps[0].detail).toBe('自重 × 10-15次');
    expect(steps[1].detail).toBe('3次最快速度自重/空杆激活');
  });
});

describe('热身常量', () => {
  it('WARMUP_GENERAL 为 5 步通用流程', () => {
    expect(WARMUP_GENERAL.length).toBe(5);
  });
  it('DAY_ACTIVATION 含推/拉/腿三套', () => {
    expect(Object.keys(DAY_ACTIVATION).sort()).toEqual(['legs', 'pull', 'push']);
  });
});
