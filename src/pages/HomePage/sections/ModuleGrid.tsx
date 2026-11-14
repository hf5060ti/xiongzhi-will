// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 首页模块网格：暗色艺术封面 + 玻璃信息层，一屏看清所有主要入口。
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  ArrowUpRight,
  Brain,
  CalendarDays,
  Library,
  Trophy,
  Utensils,
} from 'lucide-react';
import { BASE } from '@/lib/base';

interface ModuleItem {
  to: string;
  kicker: string;
  title: string;
  desc: string;
  meta: string;
  icon: LucideIcon;
  /** 封面图；没有配图的模块用红色渐变 + 水印图标兜底 */
  art?: string;
  /** 无配图时显示的大号水印图标 */
  watermark?: LucideIcon;
}

const MODULES: ModuleItem[] = [
  {
    to: '/plan',
    kicker: 'TRAIN',
    title: '训练计划',
    desc: '目标 × 饮食方案，生成分周训练',
    meta: '5 大目标',
    icon: CalendarDays,
    art: `${BASE}images/modules/train.jpg`,
  },
  {
    to: '/library',
    kicker: 'LIBRARY',
    title: '动作百科',
    desc: '按肌群、器械、难度检索动作',
    meta: '2428 个动作',
    icon: Library,
    art: `${BASE}images/modules/library.jpg`,
  },
  {
    to: '/nutrition',
    kicker: 'FUEL',
    title: '营养与外卖',
    desc: '食物库、补剂库，外卖门店一键记账',
    meta: '新增外卖门店',
    icon: Utensils,
    watermark: Utensils,
  },
  {
    to: '/strength',
    kicker: 'STRENGTH',
    title: '力量等级',
    desc: '42 项标准，对照你的真实水平',
    meta: '42 项标准',
    icon: Trophy,
    art: `${BASE}images/spartan.webp`,
  },
  {
    to: '/body',
    kicker: 'BODY',
    title: '身体数据',
    desc: '体重、围度、体脂与趋势曲线',
    meta: '趋势追踪',
    icon: Activity,
    art: `${BASE}images/modules/body.jpg`,
  },
  {
    to: '/mind',
    kicker: 'MIND',
    title: '心智',
    desc: '专注、纪律与情绪的训练场',
    meta: '每日一练',
    icon: Brain,
    art: `${BASE}images/modules/mind.jpg`,
  },
];

export default function ModuleGrid() {
  return (
    <section aria-labelledby="module-grid-title" className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-[0.6rem] font-semibold tracking-[0.34em] text-primary">MODULES</p>
          <h2 id="module-grid-title" className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            所有模块
          </h2>
        </div>
        <p className="hidden max-w-[16rem] text-right type-meta text-muted-foreground sm:block">
          一个入口一件事，不用在侧栏里找。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {MODULES.map(({ to, kicker, title, desc, meta, icon: Icon, art, watermark: Watermark }) => (
          <Link
            key={to}
            to={to}
            className="module-card group flex h-[188px] flex-col rounded-2xl sm:h-[228px]"
          >
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <div className="module-card__art">
                {art ? <img src={art} alt="" loading="lazy" decoding="async" /> : null}
              </div>
              <div className="module-card__veil" />
              <div className="module-card__scan" />
              {!art && Watermark ? (
                <Watermark
                  aria-hidden="true"
                  strokeWidth={0.75}
                  className="pointer-events-none absolute -right-3 -top-2 h-32 w-32 text-primary/20 sm:h-40 sm:w-40"
                />
              ) : null}
              <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/35 text-primary backdrop-blur-md">
                <Icon className="h-4 w-4" />
              </div>
            </div>

            <div className="module-card__body px-3.5 py-3 sm:px-4">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-display text-[0.55rem] font-semibold tracking-[0.28em] text-primary/90">{kicker}</p>
                  <h3 className="mt-0.5 truncate font-display text-lg font-bold leading-tight text-white">{title}</h3>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/35 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
              <p className="mt-1 line-clamp-1 text-[0.65rem] text-white/55 sm:text-xs">{desc}</p>
              <p className="mt-2 border-t border-white/10 pt-1.5 text-[0.6rem] tracking-wide text-white/40">{meta}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
