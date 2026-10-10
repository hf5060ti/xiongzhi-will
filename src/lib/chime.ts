// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.

/**
 * 组间休息结束提示音。
 *
 * 用 Web Audio 现场合成三声短鸣，不引用任何音频文件——
 * 桌面离线版（file://）与断网状态下同样能响，也不给仓库增加二进制资源。
 *
 * AudioContext 需要复用同一实例：每次 new 都会累积上下文，移动端 Safari 对
 * 同时存在的 AudioContext 数量有上限，超了之后就再也不出声。
 */
const cache: { ctx: AudioContext | null } = { ctx: null };

export function playFinishChime(): void {
  try {
    type WithWebkit = typeof window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? (window as WithWebkit).webkitAudioContext;
    if (!Ctor) return;
    cache.ctx ??= new Ctor();
    const ctx = cache.ctx;
    // 浏览器自动播放策略会把未交互前创建的上下文挂起，这里在用户点击后恢复
    if (ctx.state === 'suspended') void ctx.resume();
    [0, 0.35, 0.7].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = i === 2 ? 1046.5 : 880; // 末声抬高一档，明确「结束了」
      const t0 = ctx.currentTime + offset;
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(0.3, t0 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.2);
    });
  } catch {
    // 没有 Web Audio 的环境静默降级：声音没有，倒计时与高亮提示照常
  }
}
