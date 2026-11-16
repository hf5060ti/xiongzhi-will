// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useRef, useState } from 'react';
import { BASE } from '@/lib/base';
import HandLayer from '@/components/HandLayer';
// 站点级全屏动态视频背景
// - 横屏宽幅素材（1280x680），桌面/平板/横屏手机共用，object-cover 自动适配
// - 无水印、无音频、muted + playsInline，保证移动端可自动播放
// - poster 作为首屏兜底：视频未就绪 / 系统省电模式禁用自动播放 / 用户开启"减少动态效果"时也好看
// - 叠三层遮罩（压暗 + 上下渐变 + 暗角），保证玻璃卡片上的文字对比度
// - 人物左眼叠加「血瞳」：素材里眼睛被盔甲遮住，只从甲片间一道窄缝透出猩红，
//   与视频人物左眼严格对齐（先压黑原有白光，再叠血红，最后用甲片把光切断）

const POSTER = `${BASE}images/bg-main-poster.jpg`;
const VIDEO = `${BASE}images/bg-main.mp4`;

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // 视频「真正开始播放」才置 true。卡在首帧 / 解码失败 / 自动播放被拒时保持 false，
  // 视频层淡出、露出下面的静态海报——避免出现「video 盖住 poster 却不动」的死画面。
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlaying = () => setPlaying(true);
    const onStalled = () => {
      // 卡住超过 6 秒仍未恢复就退回海报；恢复播放时 onPlaying 会再置回
      const t = window.setTimeout(() => {
        if (v.readyState < 3) setPlaying(false);
      }, 6000);
      v.dataset.stallTimer = String(t);
    };
    const onWaiting = onStalled;
    const onCanPlay = () => {
      const t = Number(v.dataset.stallTimer);
      if (t) window.clearTimeout(t);
    };
    v.addEventListener('playing', onPlaying);
    v.addEventListener('stalled', onStalled);
    v.addEventListener('waiting', onWaiting);
    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('canplaythrough', onCanPlay);
    return () => {
      const t = Number(v.dataset.stallTimer);
      if (t) window.clearTimeout(t);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('stalled', onStalled);
      v.removeEventListener('waiting', onWaiting);
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('canplaythrough', onCanPlay);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* 静态海报层：视频未加载完成时先显示，避免黑屏跳变 */}
      <img
        src={POSTER}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
      />

      {/* 动态层：视频 + 遮罩 + 血瞳统一放进同一个 drift 包裹，
          这样人物左眼的辉光会跟视频一起缩放/位移，永远锁在眼睛上，不会漂移。
          注意：视频本体保留 bg-video-motion 标记，减少动态效果时仅隐藏视频、保留海报。 */}
      <div className="bg-drift absolute inset-0">
        {/* 动态视频层 */}
        {/* preload 用 metadata 而不是 auto：背景视频本体约 0.92 MB，
            auto 会让它在首屏就整段开下，与 JS / CSS 争带宽；
            poster 已经提供了完整视觉兜底，视频迟几百毫秒进场用户察觉不到，
            而省电模式（禁用自动播放）和弱网下则直接省掉这 0.92 MB。 */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={POSTER}
          className={`bg-video-motion absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${playing ? 'opacity-80' : 'opacity-0'}`}
        >
          <source src={VIDEO} type="video/mp4" />
        </video>

        {/* 神之手 + 黑太阳（月食）：素材原样保留，只给位置——披风后偏右。
            放在视频之后、所有压暗遮罩之前，让站点自己的黑场遮罩把它一起压进环境里。 */}
        <HandLayer />

        {/* 遮罩 1：整体压暗，保证前景文字可读（黑要压得够沉，红色才立得住） */}
        <div className="absolute inset-0 bg-black/40" />
        {/* 遮罩 2：上下渐深，顶栏 / 页脚区域更沉，视线集中到中间 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/80" />
        {/* 遮罩 3：四角暗角，突出中央玻璃卡片 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.6)_100%)]" />
        {/* 遮罩 4：黑红氛围——红色不整片洗色（那样黑会发灰发脏），
            只做「光」：右缘一道警戒红光缓慢涨落（xw-alert-glow，警戒/压迫感），
            左下一点余烬红，人物轮廓一圈极淡血色（见 xw-eye-layer 内的 xw-figure-aura）。
            黑就是黑，红只从边缘和缝隙里亮 —— "黑多红少、红是活的"。 */}
        <div className="xw-alert-glow absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_36%_at_-8%_106%,rgba(230,12,34,0.12),transparent_65%)] mix-blend-screen" />

        {/* 人物左眼·血瞳：素材里眼睛被盔甲遮住，只有甲片间一道上宽下尖的窄缝
            （视频内约 46.0% / 46.5%）漏光。这层先用暗影压黑原有白光，再沿缝形叠深血红，
            最后用两道黑色甲片把光切断 —— 呈现"被盔甲挡住、从缝里透出猩红"的状态。 */}
        <div className="xw-eye-layer">
          <div className="xw-eye-stage">
            {/* 人物轮廓的血色氛围：随 drift 一起动，让人物从黑里"浮"出来 */}
            <div className="xw-figure-aura" />
            <div className="xw-eye-rig">
              <span className="xw-eye-socket" />
              <span className="xw-eye-halo" />
              <span className="xw-eye-blackout" />
              <span className="xw-eye-leak" />
              <span className="xw-eye-core" />
              <span className="xw-eye-rim" />
              <span className="xw-eye-sheen" />
              <span className="xw-eye-plate xw-eye-plate-a" />
              <span className="xw-eye-plate xw-eye-plate-b" />
              <span className="xw-eye-ember" />
            </div>
          </div>
        </div>

        {/* 亮色遮罩：仅在明亮模式下启用，把暗色视频压到近白底，避免深色视频在浅色 UI 上发灰发脏。
            放在血瞳之后，浅色模式下连血瞳一并盖住，保证浅色主题干净。 */}
        <div className="absolute inset-0 light:bg-background/90" />
      </div>
    </div>
  );
}
