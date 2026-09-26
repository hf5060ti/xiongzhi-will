import { BASE } from '@/lib/base';

// 站点级全屏动态视频背景
// - 横屏宽幅素材（1280x680），桌面/平板/横屏手机共用，object-cover 自动适配
// - 无水印、无音频、muted + playsInline，保证移动端可自动播放
// - poster 作为首屏兜底：视频未就绪 / 系统省电模式禁用自动播放 / 用户开启"减少动态效果"时也好看
// - 叠三层遮罩（压暗 + 上下渐变 + 暗角），保证玻璃卡片上的文字对比度

const POSTER = `${BASE}images/bg-main-poster.jpg`;
const VIDEO = `${BASE}images/bg-main.mp4`;

export default function VideoBackground() {
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

      {/* 动态视频层：缓慢推近，弱化循环接口的跳变 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={POSTER}
        className="bg-drift bg-video-motion absolute inset-0 h-full w-full object-cover object-center opacity-80"
      >
        <source src={VIDEO} type="video/mp4" />
      </video>

      {/* 遮罩 1：整体压暗，保证前景文字可读 */}
      <div className="absolute inset-0 bg-black/35" />
      {/* 遮罩 2：上下渐深，顶栏 / 页脚区域更沉，视线集中到中间 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/75" />
      {/* 遮罩 3：四角暗角，突出中央玻璃卡片 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
