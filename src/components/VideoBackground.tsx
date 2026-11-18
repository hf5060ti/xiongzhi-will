// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useRef, useState } from 'react';
import { BASE } from '@/lib/base';
import { useIsMobile } from '@/hooks/use-mobile';
import { INTRO_DONE_EVENT } from '@/components/OpeningScene';

// 站点级全屏动态视频背景
// - 横屏宽幅素材（1280x680），桌面/平板/横屏手机共用，object-cover 自动适配
// - 无水印、无音频、muted + playsInline，保证移动端可自动播放
// - poster 作为首屏兜底：视频未就绪 / 系统省电模式禁用自动播放 / 用户开启"减少动态效果"时也好看
// - 叠三层遮罩（压暗 + 上下渐变 + 暗角），保证玻璃卡片上的文字对比度
// - 不再叠加 CSS 血瞳：新主角是红色格斯壁纸，原画自带一颗炽亮红眼

// 背景合成片（1280×680, 9.93s 无缝循环）：
// 1) 基底用素材 11.4–16.4s（星云/黑太阳/神之手/地面骷髅十字阵最完整的一段），
//    原生比例铺中央、左右虚化羽化补满，裁到 y<530 彻底避开上移的抖音水印；
// 2) 前景是把用户给的红色格斯壁纸抠出人物（含披风/盔甲/剑），600×338 叠在中央，
//    带轻微缩放呼吸与上下浮动；披风顶部做渐隐，避免出现硬切线；
// 3) 往返转折处叠一段血红聚能 + 双层冲击波环，做出「神之手爆发」的节奏；
// 4) 素材自带小剪影被格斯盖住，两层 ping-pong 循环，两端各丢一帧避免定格。
const POSTER = `${BASE}images/berserk-world-poster.jpg`;
const VIDEO = `${BASE}images/berserk-world.mp4`;

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  // 视频「真正开始播放」才置 true。卡在首帧 / 解码失败 / 自动播放被拒时保持 false，
  // 视频层淡出、露出下面的静态海报——避免出现「video 盖住 poster 却不动」的死画面。
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // 手机端不播放动态背景：宽幅视频在竖屏上被放大裁切，既发热耗电、低速设备还会掉帧。
    // 只保留下面的静态海报，观感与配色一致。
    if (isMobile) return;
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
  }, [isMobile]);

  // 等开场放完再启动背景循环：开场片尾（月食+格斯）与循环首帧同源，
  // 淡出后直接接上，视觉上是一条连续的镜头。12s 兜底防止开场组件异常时黑场。
  useEffect(() => {
    if (isMobile) return;
    const v = videoRef.current;
    if (!v) return;
    const start = () => {
      const p = v.play();
      if (p) void p.catch(() => {});
    };
    const fallback = window.setTimeout(start, 12000);
    const onIntroDone = () => {
      window.clearTimeout(fallback);
      start();
    };
    window.addEventListener(INTRO_DONE_EVENT, onIntroDone);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener(INTRO_DONE_EVENT, onIntroDone);
    };
  }, [isMobile]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black"
    >
      {/* 静态海报层：视频未加载完成时先显示，避免黑屏跳变 */}
      <img
        src={POSTER}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center opacity-80 [filter:brightness(1.5)_saturate(1.12)]"
      />

      {/* 动态层：视频 + 遮罩 + 血瞳统一放进同一个 drift 包裹，
          这样人物左眼的辉光会跟视频一起缩放/位移，永远锁在眼睛上，不会漂移。
          注意：视频本体保留 bg-video-motion 标记，减少动态效果时仅隐藏视频、保留海报。 */}
      <div className={`absolute inset-0 ${isMobile ? '' : 'bg-drift'}`}>
        {/* 动态视频层：手机端根本不挂载 <video>，彻底不下载、不解码、不发热。
            只显示上面的静态 poster，配色/构图与桌面一致；桌面仍用动态循环。 */}
        {!isMobile && (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            poster={POSTER}
            className={`bg-video-motion absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${playing ? 'opacity-95' : 'opacity-0'} [filter:brightness(1.5)_saturate(1.12)]`}
          >
            <source src={VIDEO} type="video/mp4" />
          </video>
        )}

        {/* 遮罩 1：整体压暗，保证前景文字可读（黑要压得够沉，红色才立得住） */}
        <div className="absolute inset-0 bg-black/14" />
        {/* 遮罩 2：上下渐深，顶栏 / 页脚区域更沉，视线集中到中间 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/38 via-black/6 to-black/66" />
        {/* 遮罩 3：四角暗角，突出中央玻璃卡片 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(0,0,0,0.44)_100%)]" />
        {/* 遮罩 4：黑红氛围——红色不整片洗色（那样黑会发灰发脏），
            只做「光」：右缘一道警戒红光缓慢涨落（xw-alert-glow，警戒/压迫感），
            左下一点余烬红，人物轮廓一圈极淡血色（见 xw-eye-layer 内的 xw-figure-aura）。
            黑就是黑，红只从边缘和缝隙里亮 —— "黑多红少、红是活的"。 */}
        <div className="xw-alert-glow absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_36%_at_-8%_106%,rgba(230,12,34,0.12),transparent_65%)] mix-blend-screen" />

        {/* 血瞳层已停用：背景主角换成红色格斯壁纸，原画自带炽亮红眼，
            再叠一层 CSS 血瞳会出现两颗眼睛。相关样式保留但不再渲染。 */}

        {/* 亮色遮罩：仅在明亮模式下启用，把暗色视频压到近白底，避免深色视频在浅色 UI 上发灰发脏。
            放在血瞳之后，浅色模式下连血瞳一并盖住，保证浅色主题干净。 */}
        <div className="absolute inset-0 light:bg-background/90" />
      </div>
    </div>
  );
}
