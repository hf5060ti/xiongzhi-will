// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookMarked, ExternalLink, Library, ShieldCheck } from 'lucide-react';
import { LIFE_APPENDIXES, LIFE_CHAPTERS, LIFE_SOURCE } from '@/data/lifeGuide';
import { markdownToReact } from './markdown';
import PageFallback from '@/components/PageFallback';

type ChapterMod = { meta: { id: number; title: string }; content: string };

// 章节按需加载：每章独立 chunk，只在打开该章时拉取正文
const loaders: Record<number, () => Promise<ChapterMod>> = {
  1: () => import('@/data/lifeGuide/chapter01'),
  2: () => import('@/data/lifeGuide/chapter02'),
  3: () => import('@/data/lifeGuide/chapter03'),
  4: () => import('@/data/lifeGuide/chapter04'),
  5: () => import('@/data/lifeGuide/chapter05'),
  6: () => import('@/data/lifeGuide/chapter06'),
  7: () => import('@/data/lifeGuide/chapter07'),
  8: () => import('@/data/lifeGuide/chapter08'),
  9: () => import('@/data/lifeGuide/chapter09'),
  10: () => import('@/data/lifeGuide/chapter10'),
  11: () => import('@/data/lifeGuide/chapter11'),
  12: () => import('@/data/lifeGuide/chapter12'),
  13: () => import('@/data/lifeGuide/chapter13'),
  14: () => import('@/data/lifeGuide/chapter14'),
  15: () => import('@/data/lifeGuide/chapter15'),
  16: () => import('@/data/lifeGuide/chapter16'),
  17: () => import('@/data/lifeGuide/chapter17'),
  18: () => import('@/data/lifeGuide/chapter18'),
  19: () => import('@/data/lifeGuide/chapter19'),
  20: () => import('@/data/lifeGuide/chapter20'),
  21: () => import('@/data/lifeGuide/chapter21'),
  22: () => import('@/data/lifeGuide/chapter22'),
  23: () => import('@/data/lifeGuide/chapter23'),
  24: () => import('@/data/lifeGuide/chapter24'),
  25: () => import('@/data/lifeGuide/chapter25'),
  26: () => import('@/data/lifeGuide/chapter26'),
  27: () => import('@/data/lifeGuide/chapter27'),
  28: () => import('@/data/lifeGuide/chapter28'),
  29: () => import('@/data/lifeGuide/chapter29'),
  30: () => import('@/data/lifeGuide/chapter30'),
  31: () => import('@/data/lifeGuide/chapter31'),
  32: () => import('@/data/lifeGuide/chapter32'),
  33: () => import('@/data/lifeGuide/chapter33'),
  101: () => import('@/data/lifeGuide/appendix101'),
  102: () => import('@/data/lifeGuide/appendix102'),
  103: () => import('@/data/lifeGuide/appendix103'),
  104: () => import('@/data/lifeGuide/appendix104'),
  105: () => import('@/data/lifeGuide/appendix105'),
  106: () => import('@/data/lifeGuide/appendix106'),
};

const ChapterBody = ({ id }: { id: number }) => {
  const [data, setData] = useState<ChapterMod | null>(null);
  useEffect(() => {
    let alive = true;
    setData(null);
    loaders[id]?.().then((m) => {
      if (alive) setData(m);
    });
    return () => {
      alive = false;
    };
  }, [id]);
  if (!data) return <PageFallback />;
  return <article>{markdownToReact(data.content, `ch${id}`)}</article>;
};

const SourceNote = () => (
  <p className="rounded-xl border border-border/40 bg-white/[0.02] px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
    内容来源：《高性价比人生指南》开源项目（
    <a href={LIFE_SOURCE.repo} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">GitHub 仓库</a>，
    MIT 协议）。雄性意志收录仅供学习参考；健康与法律等专业问题请咨询执业人士，本站不构成医疗建议或法律意见。
  </p>
);

const ChapterView = ({ id }: { id: number }) => {
  const isAppendix = id > 100;
  const list = isAppendix ? LIFE_APPENDIXES : LIFE_CHAPTERS;
  const total = isAppendix ? LIFE_APPENDIXES.length : LIFE_CHAPTERS.length;
  const prev = list.find((c) => c.id === id - 1);
  const next = list.find((c) => c.id === id + 1);
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <Link to="/life" className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-xl transition-colors hover:bg-accent/60 hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" /> 返回目录
        </Link>
        <span className="rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
          {isAppendix ? `附录 ${id - 100} / ${total}` : `第 ${id} / ${total} 章`}
        </span>
      </div>
      <div className="rounded-2xl border border-border/50 bg-card/70 p-5 backdrop-blur-2xl sm:p-7">
        <ChapterBody id={id} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {prev ? (
          <Link to={`/life/${prev.id}`} className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-xs backdrop-blur-xl transition-colors hover:bg-accent/60 hover:text-foreground">
            <ArrowLeft className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate">{prev.title.replace(/^\d+\.\s*/, '')}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/life/${next.id}`} className="flex items-center justify-end gap-2 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-xs backdrop-blur-xl transition-colors hover:bg-accent/60 hover:text-foreground">
            <span className="truncate">{next.title.replace(/^\d+\.\s*/, '')}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
          </Link>
        ) : <span />}
      </div>
    </div>
  );
};

export default function LifeGuidePage() {
  const { id } = useParams<{ id?: string }>();
  const chapterId = id ? parseInt(id, 10) : NaN;

  if (!Number.isNaN(chapterId) && loaders[chapterId]) {
    return (
      <div className="space-y-4">
        <ChapterView id={chapterId} />
        <SourceNote />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-2xl sm:p-7">
        <div className="flex items-start gap-3">
          <BookMarked className="mt-1 h-7 w-7 shrink-0 text-primary" strokeWidth={2} />
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {LIFE_SOURCE.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {LIFE_SOURCE.intro}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              每条建议都标注了 <b className="text-foreground">成本（钱 / 时间 / 毅力）</b>、
              <b className="text-foreground">说人话</b>、<b className="text-foreground">收益</b>、
              <b className="text-foreground">证据等级（A / B / C）</b>与<b className="text-foreground">来源</b>，
              按自己的处境取舍，不盲从。
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-primary">
                <Library className="h-3 w-3" /> 开源内容（MIT 协议）
              </span>
              <a href={LIFE_SOURCE.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/60 px-2.5 py-1 text-muted-foreground transition-colors hover:text-foreground">
                <ExternalLink className="h-3 w-3" /> 原文仓库
              </a>
              <a href={LIFE_SOURCE.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-card/60 px-2.5 py-1 text-muted-foreground transition-colors hover:text-foreground">
                <ExternalLink className="h-3 w-3" /> 原网站
              </a>
            </div>
          </div>
        </div>
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-border/40 bg-white/[0.03] p-3 text-xs leading-relaxed text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          本页内容整理自开源项目《高性价比人生指南》（MIT 协议，版权归原作者），作为参考信息收录。
          涉及健康、医疗、法律、投资等专业决策，请以官方渠道与执业人士的意见为准；本站只提供尽可能健康的思路，不建议逞强。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {LIFE_CHAPTERS.map((c) => {
          const num = c.title.match(/^(\d+)\./)?.[1] ?? String(c.id);
          const name = c.title.replace(/^\d+\.\s*/, '');
          return (
            <Link
              key={c.id}
              to={`/life/${c.id}`}
              className="group flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 p-3.5 backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-accent/50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/12 font-display text-sm font-bold text-primary">
                {num}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">{name}</span>
                <span className="block text-[11px] text-muted-foreground">第 {c.id} 章</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/60 p-5 backdrop-blur-2xl sm:p-6">
        <h2 className="mb-3 flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Library className="h-4 w-4 text-primary" /> 附录 · 长文专题
        </h2>
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
          原项目 docs/ 目录下的延伸长文，与正文互引，一并收录。
        </p>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {LIFE_APPENDIXES.map((c) => {
            const name = c.title.replace(/^附录\s*\d+\s*·\s*/, '');
            return (
              <Link
                key={c.id}
                to={`/life/${c.id}`}
                className="group flex items-center gap-3 rounded-xl border border-border/50 bg-white/[0.02] p-3.5 backdrop-blur-xl transition-all hover:border-primary/40 hover:bg-accent/50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-display text-sm font-bold text-primary">
                  {String(c.id - 100).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground group-hover:text-primary">{name}</span>
                  <span className="block text-[11px] text-muted-foreground">附录 {c.id - 100}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            );
          })}
        </div>
      </div>

      <SourceNote />
    </div>
  );
}