import { BASE } from '@/lib/base';

// 全屏启动加载动画（刷新 / 首次进入时显示）
// - 横屏无水印视频循环 + 中央品牌字 + 免责金句
// - 无音频、muted + playsInline，保证移动端可自动播放
// - 父组件控制 visible：false 时用 CSS 过渡淡出，不阻塞首屏交互

const POSTER = `${BASE}images/loading-bg-poster.jpg`;
const VIDEO = `${BASE}images/loading-bg.mp4`;

export default function LoadingScreen({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      {/* 动态视频层 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={POSTER}
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={VIDEO} type="video/mp4" />
      </video>

      {/* 压暗遮罩，保证文字对比度 */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

      {/* 中央品牌 */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <h1 className="font-display text-4xl font-extrabold tracking-[0.3em] text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
          雄性意志
        </h1>
        <p className="max-w-md text-xs leading-relaxed text-white/70 drop-shadow sm:text-sm">
          本站只提供健康自然的健身方式，不提供任何极端和药物，请遵守当地法律法规。
        </p>
      </div>
    </div>
  );
}
