// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import MusclePicker from '@/components/MusclePicker';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative -mx-3 mb-6 overflow-hidden rounded-b-2xl border-b border-border sm:-mx-4 sm:mb-8 lg:-ml-8 lg:-mr-12 lg:mb-10">
      {/* 背景层：动态视频由站点级 VideoBackground 提供，这里只叠加压暗与光线特效 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 横向渐变压暗：左侧重、右侧轻，保证标题可读；明亮模式下换成浅底压暗 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/62 via-black/26 to-black/5 light:from-background/85 light:via-background/40 light:to-transparent" />
        {/* 顶部 / 底部渐隐，与页面其余部分自然衔接 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background/85 light:from-background/55" />
        {/* 呼吸光晕：右上角缓慢明暗，比之前更大更亮，强化视觉焦点 */}
        <div className="animate-glow pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-primary/30 blur-3xl" />
        {/* 中央聚光：在标题左侧补一团暖光，把视线吸到 Slogan */}
        <div className="animate-glow pointer-events-none absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-primary/12 blur-3xl" />
        {/* 光线扫过：从左到右缓慢移动的光斑 */}
        <div className="animate-light-sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent light:via-black/5" />
      </div>

      {/* 文字层 + 右侧「点哪练哪」人体导航（大屏并排，小屏堆叠）。
          大屏右侧 padding 收到 8px、gap 收一档，让卡片尽量贴视口右缘 ——
          把中间的动态人物和左眼血红缝露出来（用户反馈卡片挡住了背景与红眼）。 */}
      <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-18 md:px-12 md:py-28 lg:flex lg:items-start lg:gap-4 lg:pr-0">
        {/* [container-type:inline-size] 让大标题能用 cqw 量自身容器宽度（见下） */}
        <div className="animate-hero-rise max-w-xl flex-1 [container-type:inline-size]">
          <p className="mb-3 flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.25em] text-primary sm:mb-4 sm:text-sm sm:tracking-[0.35em]">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            Berserk · 雄性意志
          </p>
          {/* 力量感 Slogan：放大字号、收紧字距，「雄性意志」以猩红点睛，瞬间抓住眼球。
              大屏字号用 cqw（随容器宽度）而非 rem（随根字号）：默认 18px 档时约 141px，
              与原 144px 几乎无差；但用户把「字号」调到 22px 时，侧栏/内边距/间距的 rem
              也会变宽、正文容器缩到 ~697px，rem 版标题会涨到 176px/字，「雄性意志。」
              需要 880px 从而被迫断行（"志。"落单）。cqw 版按容器等比收放，任何档位都一行。 */}
          <h1 className="font-display text-[28px] font-extrabold leading-[1.02] tracking-tight text-foreground min-[380px]:text-[31px] sm:text-[72px] md:text-[108px] lg:text-[min(144px,18.4cqw)]">
            记录你的
            <br />
            <span className="text-primary">雄性意志</span>。
          </h1>
          {/* 细红线分隔，强化标题与正文层次 */}
          <div className="mt-4 h-0.5 w-12 rounded-full bg-primary/70 sm:mt-5 sm:w-16" />
          <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/85 sm:mt-5 sm:text-lg">
            把每一次训练、每一餐、每一份坚持都记录下来。雄性意志为你生成对应的训练计划与饮食方案，让你看得见自己的成长。
          </p>
          {/* 免责卡：加粗成句 + 提到 14px，这是必须被读到的一段，不能让它在小字里沉掉 */}
          <p className="mt-3 max-w-md rounded-xl border border-primary/40 bg-primary/10 px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground/85 backdrop-blur-md sm:mt-4 sm:px-4 sm:py-3 sm:text-sm">
            <b className="font-semibold text-primary">本站只提供健康自然的健身方式</b>
            <span className="text-foreground/85">，不提供任何极端训练或药物方案；请遵守你所在国家 / 地区的法律法规。</span>
          </p>

          {/* AI 健身小助手入口：免责卡下方、核心理念上方，一键进对话 */}
          <button
            onClick={() => navigate('/coach')}
            className="group mt-4 flex w-full max-w-md items-center gap-3 rounded-2xl border border-primary/60 bg-primary/15 p-3 text-left backdrop-blur-xl transition-all hover:bg-primary/25 hover:border-primary sm:mt-5 sm:gap-3.5 sm:p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-black shadow-lg shadow-primary/30 sm:h-11 sm:w-11">
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <span className="flex-1">
              <span className="block font-display text-[15px] font-bold text-primary sm:text-base">AI 健身小助手</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-foreground/75">
                问任何训练 / 饮食 / 恢复问题，直接对话；支持上传动作照片帮你看动作是否标准。
              </span>
            </span>
            <span className="shrink-0 text-primary transition-transform group-hover:translate-x-1">→</span>
          </button>

          {/* 核心理念 */}
          <div className="glass mt-4 max-w-lg space-y-2 rounded-2xl p-4 sm:mt-5 sm:space-y-3 sm:p-6">
            <p className="type-eyebrow text-primary/70">Core belief</p>
            <p className="text-[15px] leading-relaxed text-foreground/90 sm:text-base">
              健身只是生活的调味剂。
              <b className="text-primary">一切运动健身，都是为了服务于更好的生活，而不是被健身绑架。</b>
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/85 sm:text-base">
              别熬夜——熬夜升高皮质醇，压制雄性激素，练了也白练。
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/85 sm:text-base">
              真正的力量，不是你多能打、肌肉多大。
            </p>
            {/* 收尾这句是全站的精神落点，单独放大并留出上下呼吸空间 */}
            <p className="font-display text-lg font-bold leading-snug text-primary sm:text-xl">
              是你面对生活的压力，能否被击倒再站起来。
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/85 sm:text-base">
              像一个斗志昂扬的战士一样，去面对，去承担。
            </p>
          </div>
        </div>

        {/* 右侧：点哪练哪 · 人体导航 */}
        <div className="mt-6 w-full max-w-md shrink-0 sm:mt-10 lg:mt-0 lg:ml-auto lg:w-[330px] xl:w-[360px]">
          <MusclePicker />
        </div>
      </div>
    </section>
  );
}
