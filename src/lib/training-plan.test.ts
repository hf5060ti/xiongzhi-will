// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { describe, expect, it } from 'vitest';
import { restFor } from './training-plan';

/**
 * 组间休息分档判定。
 *
 * restFor() 用动作名正则匹配，是「复合 3–5 分钟 / 孤立 2–3 分钟」这条原则的落点，
 * 计划页、动作卡、执行模式、工具页计时器全都依赖它。判定错了，休息时长就跟着错。
 * 这里固化当前行为：改正则导致判定漂移时测试会红，逼你确认是有意调整还是误伤。
 */
describe('restFor 复合 / 孤立判定', () => {
  it('多关节大重量判为复合', () => {
    for (const name of ['杠铃深蹲', '哑铃卧推', '硬拉', '引体向上', '坐姿划船', '高位下拉', '实力推']) {
      expect(restFor(name).kind, name).toBe('compound');
    }
  });

  it('单关节小重量判为孤立', () => {
    for (const name of ['哑铃弯举', '侧平举', '绳索下压', '蝴蝶机夹胸', '站姿提踵', '卷腹']) {
      expect(restFor(name).kind, name).toBe('isolation');
    }
  });

  it('力量动作里的复合项：腿举、农夫行走、悬垂举腿', () => {
    for (const name of ['腿举', '农夫行走', '悬垂举腿']) {
      expect(restFor(name).kind, name).toBe('compound');
    }
  });

  it('孤立关键词优先于复合关键词（避免「卧推+飞鸟」这类组合被判成复合）', () => {
    // 构造用例：正则里排除表的判断在复合表之后生效，含孤立词时整体降级为孤立
    expect(restFor('卧推飞鸟').kind).toBe('isolation');
  });

  it('认不出的动作一律按孤立处理，不会给到过长的休息', () => {
    expect(restFor('平板支撑').kind).toBe('isolation');
    expect(restFor('').kind).toBe('isolation');
  });

  it('返回的区间与标签和 kind 对应', () => {
    const c = restFor('杠铃深蹲');
    expect(c.kind).toBe('compound');
    expect(c.label).toBe('复合动作');
    expect(c.range).toBe('3–5 分钟');

    const i = restFor('哑铃弯举');
    expect(i.kind).toBe('isolation');
    expect(i.label).toBe('孤立动作');
    expect(i.range).toBe('2–3 分钟');
  });

  it('俯卧撑系列判为复合（此前漏判，自重训练区 8 个变式全被按孤立给 2 分钟）', () => {
    for (const name of ['标准俯卧撑', '钻石俯卧撑', '下斜俯卧撑', '宽距俯卧撑', '上斜俯卧撑']) {
      expect(restFor(name).kind, name).toBe('compound');
    }
  });

  it('箭步蹲与弓步蹲是同一动作的两个叫法，判定必须一致', () => {
    expect(restFor('哑铃箭步蹲').kind).toBe('compound');
    expect(restFor('哑铃弓步蹲').kind).toBe('compound');
  });

  it('仰卧臂屈伸判为孤立，双杠臂屈伸仍为复合', () => {
    // 复合表里去掉裸「臂屈伸」后：过顶 / 仰卧 / 哑铃臂屈伸回归孤立，
    // 而「双杠」这个复合词仍然保住了真正的复合项双杠臂屈伸。
    expect(restFor('仰卧臂屈伸').kind).toBe('isolation');
    expect(restFor('过顶臂屈伸').kind).toBe('isolation');
    expect(restFor('双杠臂屈伸').kind).toBe('compound');
    expect(restFor('负重双杠臂屈伸').kind).toBe('compound');
  });
});
