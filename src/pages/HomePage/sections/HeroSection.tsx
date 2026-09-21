import { BASE } from '@/lib/base';

// 主视觉图：优先用格斯（guts.jpg），没有则 fallback 到斯巴达蚀刻图
const HERO_IMG = `${BASE}images/guts.jpg`;
const FALLBACK_IMG = `${BASE}images/spartan.png`;

export default function HeroSection() {
  return (
    <section className="relative -mx-4 mb-8 overflow-hidden rounded-b-2xl border-b border-border md:-mx-8 md:mb-10">
      {/* 动态壁纸背景层 */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={HERO_IMG}
          onError={(e) => {
            const t = e.currentTarget;
            if (t.src !== FALLBACK_IMG) t.src = FALLBACK_IMG;
          }}
          alt="格斯"
          className="animate-ken-burns h-full w-full object-cover object-center"
        />
        {/* 呼吸光晕：右上角缓慢明暗 */}
        <div className="animate-glow pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        {/* 光线扫过：从左到右缓慢移动的光斑 */}
        <div className="animate-light-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        {/* 多层渐变压暗：左侧重、右侧轻，底部渐隐到页面底色 */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      {/* 文字层 */}
      <div className="relative z-10 px-6 py-16 md:px-12 md:py-24">
        <div className="animate-hero-rise max-w-xl">
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.35em] text-primary">
            Berserk · 雄性意志
          </p>
          <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl">
            你的目标，
            <br />
            决定你的练法。
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/80">
            选定训练目标与饮食方案，雄性意志为你生成对应的训练计划与饮食建议。像格斯穿过尸山血海一样，目标明确，执行彻底。
          </p>
          <p className="mt-4 max-w-md rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs leading-relaxed text-primary-foreground/95 backdrop-blur-sm">
            <b className="font-semibold">本站只提供健康自然的健身方式</b>，不提供任何极端训练或药物方案；请遵守你所在国家 / 地区的法律法规。
          </p>
        </div>
      </div>
    </section>
  );
}
