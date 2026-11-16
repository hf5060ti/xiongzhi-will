// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 开场（Opening）：直接把用户给的素材从头播一遍——烙印符号 → 斩龙剑 → 龟裂大地 →
 * 格斯起身 → 月食升起，播完淡出到主界面（主界面背景正是这段素材的「神之手」段循环），
 * 因此入场与主页是同一条视觉脉络，不会出现「加载页 → 主页」的割裂感。
 *
 * - 全屏黑底 + object-contain：素材是 4:3，保留完整构图（烙印和月食都不能被裁）
 * - 无音频、muted + playsInline，保证移动端自动播放
 * - 任意点击 / Esc / 空格跳过；播放结束或出错都会 resolve
 * - 系统开启「减少动态效果」时直接跳过，不阻塞首屏
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { BASE } from '@/lib/base';

const INTRO_SRC = `${BASE}images/berserk-intro.mp4`;
export const INTRO_DONE_EVENT = 'xy-intro-done';

export default function OpeningScene() {
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(true);
  const doneRef = useRef(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setClosing(true);
    window.dispatchEvent(new Event(INTRO_DONE_EVENT));
    window.setTimeout(() => setMounted(false), 760);
  }, []);

  useEffect(() => {
    // 减少动态效果 / 无法播放视频：不拖住首屏
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') finish();
    };
    window.addEventListener('keydown', onKey);
    // 兜底：视频卡住 / 解码失败 / 事件丢失时最多挡 13 秒，绝不把用户锁在开场里
    const hardStop = window.setTimeout(finish, 13000);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(hardStop);
    };
  }, [finish]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center bg-black transition-opacity duration-700 ${
        closing ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      onClick={finish}
      role="presentation"
    >
      <video
        autoPlay
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-contain"
        onEnded={finish}
        onError={finish}
      >
        <source src={INTRO_SRC} type="video/mp4" />
      </video>

      {/* 底部细红光，把画面和黑底衔接得更柔和 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/60 to-transparent" />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          finish();
        }}
        className="absolute bottom-6 right-6 z-10 rounded-full border border-white/25 bg-black/40 px-4 py-1.5 text-xs tracking-widest text-white/70 backdrop-blur transition-colors hover:border-white/50 hover:text-white"
      >
        跳过
      </button>
    </div>
  );
}
