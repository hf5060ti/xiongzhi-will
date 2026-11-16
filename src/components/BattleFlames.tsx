// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 战场火焰（Battle Flames）：铺满全宽的底部血火。
 *
 * 视觉参考：烧刃 / 武士刀刃纹（hamon）——连绵起伏、大小交替的波浪刃口，
 * 以及格斯在烙印战场上的血红火光。不是橙黄生活火，也不是粉红光带，
 * 而是**猩红→暗红的血火**：颜色压在血红区间，不再提亮成粉色盖住背景的猩红。
 *
 * 实现：SVG 路径直接画出「刀刃纹」轮廓——一条由连续圆弧+尖峰组成的波浪线，
 * 下方填血红渐变。两层以不同速度横向循环平移、轻微纵向呼吸，形成流动的火海。
 * 不用 feTurbulence 随机噪声（那会糊成雾状），刃纹要的是有节奏的大小波浪。
 * 全程 SVG/CSS，无图片无请求；prefers-reduced-motion 冻结为静态刃纹。
 */

/** 生成一条「烧刃纹」波浪：count 个大小交替的尖峰组成的闭合火墙路径。
 *  每个峰用两段二次贝塞尔收出锋利的刃尖，相邻峰高低交替，模拟淬火刃纹的起伏节奏。 */
function hamonPath(count: number, height: number, width: number, seed: number): string {
  const seg = width / count;
  let d = `M 0 ${height} L 0 ${height * 0.9}`;
  for (let i = 0; i < count; i++) {
    const x0 = i * seg;
    const x1 = x0 + seg;
    // 大/中/小交替 + 轻微种子抖动：像真实刃纹不规则却连续
    const size = i % 3 === 0 ? 1 : i % 3 === 1 ? 0.56 : 0.78;
    const jitter = 0.9 + (((i * 37 + seed * 13) % 11) / 11) * 0.2;
    const peak = height - height * size * jitter;
    const cx = x0 + seg * 0.5;
    d += ` L ${x0} ${height * 0.9}`;
    d += ` Q ${x0 + seg * 0.16} ${peak + height * 0.2} ${cx} ${peak}`;
    d += ` Q ${x1 - seg * 0.14} ${peak + height * 0.16} ${x1} ${height * 0.9}`;
  }
  d += ` L ${width} ${height} Z`;
  return d;
}

const WIDTH = 1200;
const HEIGHT = 200;

export default function BattleFlames() {
  // 两层刃纹：底层暗而低（细密小波，铺出火海基底）、上层亮而高（大波锋刃），
  // 亮层尖峰高出暗层，血红色才能真正出现在波浪顶端而不是被暗层埋在下面。
  const back = hamonPath(13, HEIGHT * 0.6, WIDTH, 3);
  const front = hamonPath(9, HEIGHT * 0.86, WIDTH, 7);

  return (
    <div className="xw-battle-flames" aria-hidden="true">
      {/* viewBox 跨两幅宽度：第二份 path 平移一个 WIDTH 后仍在画布内，横向循环才无缝 */}
      <svg className="xw-flame-svg" viewBox={`0 0 ${WIDTH * 2} ${HEIGHT}`} preserveAspectRatio="none">
        <defs>
          {/* 血红渐变：底部暗红 → 顶部猩红尖峰（绝不加粉白核心） */}
          <linearGradient id="xw-flame-back" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#4a0008" />
            <stop offset="45%" stopColor="#8c0014" />
            <stop offset="100%" stopColor="#b1061d" />
          </linearGradient>
          <linearGradient id="xw-flame-front" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#6e0010" />
            <stop offset="55%" stopColor="#c10824" />
            <stop offset="100%" stopColor="#de102c" />
          </linearGradient>
        </defs>
        {/* 路径画两遍并让整层平移一个宽度，实现无缝循环 */}
        <g className="xw-flame-layer xw-flame-layer-back">
          <path d={back} fill="url(#xw-flame-back)" />
          <path d={back} fill="url(#xw-flame-back)" transform={`translate(${WIDTH},0)`} />
        </g>
        <g className="xw-flame-layer xw-flame-layer-front">
          <path d={front} fill="url(#xw-flame-front)" />
          <path d={front} fill="url(#xw-flame-front)" transform={`translate(${WIDTH},0)`} />
        </g>
      </svg>

      {/* 底部辉光床：暗红氛围光，把火墙和地面衔接 */}
      <div className="xw-flame-bed" />

      {/* 余烬：暗红火星上飘 */}
      <div className="xw-flame-embers">
        {[6, 19, 33, 48, 61, 77, 90].map((left, i) => (
          <span
            key={left}
            className="xw-flame-ember"
            style={{
              left: `${left}%`,
              width: `${2 + (i % 2)}px`,
              height: `${2 + (i % 2)}px`,
              animationDelay: `${(i * 1.3) % 7}s`,
              animationDuration: `${7 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
