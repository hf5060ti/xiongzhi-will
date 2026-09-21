export default function HeroSection() {
  return (
    <section className="relative -mx-4 mb-8 overflow-hidden rounded-b-2xl border-b border-border md:-mx-8 md:mb-10">
      {/* 背景层：动态视频由站点级 VideoBackground 提供，这里只叠加压暗与光线特效 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 横向渐变压暗：左侧重、右侧轻，保证标题可读 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
        {/* 顶部 / 底部渐隐，与页面其余部分自然衔接 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background/85" />
        {/* 呼吸光晕：右上角缓慢明暗 */}
        <div className="animate-glow pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        {/* 光线扫过：从左到右缓慢移动的光斑 */}
        <div className="animate-light-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
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
          <p className="mt-4 max-w-md rounded-xl border border-primary/40 bg-primary/10 px-3.5 py-2.5 text-xs leading-relaxed text-primary-foreground/95 backdrop-blur-md">
            <b className="font-semibold">本站只提供健康自然的健身方式</b>，不提供任何极端训练或药物方案；请遵守你所在国家 / 地区的法律法规。
          </p>

          {/* 核心理念 */}
          <div className="glass mt-6 max-w-lg space-y-3 rounded-2xl p-5">
            <p className="text-sm leading-relaxed text-foreground/90">
              健身只是生活的调味剂。<b className="text-primary">一切运动健身，都是为了服务于更好的生活，而不是被健身绑架。</b>
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              别熬夜——熬夜升高皮质醇，压制雄性激素，练了也白练。
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              真正的力量，不是你多能打、肌肉多大。
            </p>
            <p className="font-display text-base font-bold leading-relaxed text-primary">
              是你面对生活的压力，能否被击倒再站起来。
            </p>
            <p className="text-sm leading-relaxed text-foreground/90">
              像一个斗志昂扬的战士一样，去面对，去承担。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
