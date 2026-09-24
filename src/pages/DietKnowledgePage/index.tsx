import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, ChevronDown, ExternalLink, Info, Link2, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DIET_KNOWLEDGE,
  KNOWLEDGE_AUTHORS,
  knowledgeMatchesDiet,
} from '@/data/diet-knowledge';
import { DIETS } from '@/data/diets';
import { cn } from '@/lib/utils';

const EVIDENCE_LEVELS = [
  { label: '原话', desc: '博主本人文字可查（如视频文案），可标注为原话' },
  { label: 'AI 章节要点', desc: '平台生成的章节 / 摘要，不是逐句原话' },
  { label: '未逐句核对', desc: '未取得字幕原文，只能佐证方向' },
  { label: '文献整理', desc: '来源为公开学术 / 官方文献，非视频素材，未逐句核对原文' },
] as const;

/**
 * 手机端吸顶 header 实测高 108px（Layout.tsx：sticky top-0 z-40 lg:hidden），
 * 桌面端该 header 隐藏（高 0），仅保留呼吸间距。
 */
const STICKY_HEADER_FALLBACK = 108;
/** 定位后卡片与吸顶 header 之间保留的呼吸间距 */
const SCROLL_GAP = 16;

/** 吸顶 header 下沿的安全定位线：跨路由首次定位必须把它算进去，否则卡片标题会被 header 盖住 */
function stickySafeTop() {
  const header = document.querySelector('header.sticky');
  const height = header instanceof HTMLElement ? header.getBoundingClientRect().height : 0;
  if (height > 0) return height + SCROLL_GAP;
  return window.matchMedia('(min-width: 1024px)').matches
    ? SCROLL_GAP
    : STICKY_HEADER_FALLBACK + SCROLL_GAP;
}

/**
 * 把目标卡片滚到安全位置：
 * - 卡片连同 header 高度能完整放进视口 → 几何居中（卡片视口 top = (viewport - h)/2），与旧 block:'center' 观感一致；
 * - 放不下（手机端展开后的长卡片）→ 顶部对齐到 header 下沿（top = stickySafeTop()），保证标题不被遮挡。
 */
function scrollToCard(id: string, behavior: ScrollBehavior = 'auto') {
  const el = document.getElementById(`diet-knowledge-${id}`);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const viewport = window.innerHeight;
  const offset = stickySafeTop();
  const absoluteTop = rect.top + window.scrollY;
  const centeredTop = absoluteTop - (viewport - rect.height) / 2;
  const startTop = absoluteTop - offset;
  // 条件 (h + 2·offset ≤ viewport) 在代数上等价于 (centeredTop ≤ startTop)：
  //   h + 2·offset ≤ viewport  ⟺  (viewport - h)/2 ≥ offset  ⟺  centeredTop ≤ startTop
  // 所以本分支里若写 Math.max(centeredTop, startTop) 会恒取 startTop，居中永不生效（桌面端实测恒为 top=16）。
  // 取 centeredTop 才是几何居中；且此时 (viewport - h)/2 ≥ offset，卡片标题天然位于 header 下沿之下，不会被遮挡。
  const fitsViewport = rect.height + offset * 2 <= viewport;
  const top = fitsViewport ? centeredTop : startTop;
  const maxTop = Math.max(document.documentElement.scrollHeight - viewport, 0);
  window.scrollTo({ top: Math.min(Math.max(top, 0), maxTop), behavior });
}

export default function DietKnowledgePage() {
  const [params] = useSearchParams();
  const dietParam = params.get('diet') ?? '';
  const entryParam = params.get('entry') ?? '';

  const [author, setAuthor] = useState('all');
  const [dietFilter, setDietFilter] = useState(dietParam);
  const [openIds, setOpenIds] = useState<string[]>(entryParam ? [entryParam] : []);

  // 从方案页带 ?diet=xxx 跳转进来时按方案预筛选
  useEffect(() => {
    setDietFilter(dietParam);
  }, [dietParam]);

  // 从搜索带 ?entry=xxx 跳转进来时展开对应条目并定位。
  // 跨路由首跳时页面高度尚未稳定（字体/图片回流 + 栅格重排），原来用 scrollIntoView({block:'center'})
  // 对「长于视口的展开卡片」会算出负的 top（实测 -14），标题被 108px 吸顶 header 盖住。
  // 现在：先即时（非平滑）对齐到 header 下沿，再在布局稳定后校正两次（幂等，未漂移时不动）。
  useEffect(() => {
    if (!entryParam) return;
    setOpenIds([entryParam]);
    let raf1 = 0;
    let raf2 = 0;
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => scrollToCard(entryParam));
    });
    const t1 = window.setTimeout(() => scrollToCard(entryParam), 140);
    const t2 = window.setTimeout(() => scrollToCard(entryParam), 420);
    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [entryParam]);

  const dietName = dietParam ? DIETS.find((d) => d.id === dietParam)?.name : undefined;

  const list = useMemo(
    () =>
      DIET_KNOWLEDGE.filter((e) => {
        if (author !== 'all' && e.author !== author) return false;
        if (dietFilter && !knowledgeMatchesDiet(e, dietFilter)) return false;
        return true;
      }),
    [author, dietFilter],
  );

  // 卡片展开后会被顶出视口（手机端展开卡长于视口）时，等布局稳定后把它拉回吸顶 header 下方
  const keepCardInView = (id: string) => {
    const reposition = () => {
      const el = document.getElementById(`diet-knowledge-${id}`);
      if (!el) return;
      if (el.getBoundingClientRect().top < stickySafeTop()) {
        scrollToCard(id, 'smooth');
      }
    };
    // 双 rAF 等栅格重排完成；过渡结束（300ms）后再兜底校验一次，防浏览器滚动锚定漂移
    window.requestAnimationFrame(() => window.requestAnimationFrame(reposition));
    window.setTimeout(reposition, 340);
  };

  const toggle = (id: string) => {
    const willOpen = !openIds.includes(id);
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    if (willOpen) keepCardInView(id);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b border-border pb-4 sm:pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Diet · 饮食
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          饮食讲解
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          四套方案给的是比例与清单，这一页讲的是背后的逻辑：把「为什么这么吃」讲明白，剩下的执行才有依据。
        </p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          内容来自公开讲解与公开文献的原创简要整理，非医疗建议，也不参与站内任何热量计算；每条注明证据等级与来源链接，
          来源归原作者，本站仅作整理引用。
        </p>
      </header>

      {/* 证据等级说明 */}
      <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
        <CardContent className="p-3 sm:p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Info className="h-4 w-4 text-primary" />
            证据等级怎么看
          </p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
            {EVIDENCE_LEVELS.map((l) => (
              <li key={l.label} className="text-xs leading-relaxed text-muted-foreground">
                <span className="mr-1.5 rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground/80">
                  {l.label}
                </span>
                {l.desc}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 筛选栏：作者 + 方案 */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs text-muted-foreground">作者</span>
          {['all', ...KNOWLEDGE_AUTHORS].map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAuthor(a)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs transition-colors',
                author === a
                  ? 'border-primary/50 bg-primary/15 font-medium text-primary'
                  : 'border-border/60 bg-card/50 text-muted-foreground hover:bg-accent/50 hover:text-foreground',
              )}
            >
              {a === 'all' ? '全部' : a}
            </button>
          ))}
        </div>

        {dietFilter && dietName && (
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>
              已按方案筛选：<b className="text-foreground">{dietName}</b>
            </span>
            <button
              type="button"
              onClick={() => setDietFilter('')}
              className="rounded-full border border-border/60 px-2.5 py-0.5 transition-colors hover:bg-accent/50 hover:text-foreground"
            >
              看全部方案相关的条目
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        共 {DIET_KNOWLEDGE.length} 条讲解，当前显示 {list.length} 条
      </p>

      {/* 条目列表：手机端一行两个宽扁标签卡（形状对齐上方筛选标签），展开后跨两列显示详情 */}
      <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
        {list.map((entry) => {
          const open = openIds.includes(entry.id);
          return (
            <Card
              key={entry.id}
              id={`diet-knowledge-${entry.id}`}
              className={cn(
                // 锚点定位兜底：手机端吸顶 header 108px + 16px 间距（与 stickySafeTop() 保持一致）
                'min-w-0 scroll-mt-[124px] overflow-hidden rounded-2xl border-border/50 bg-card/60 backdrop-blur-xl transition-colors',
                open && 'col-span-2 border-primary/40',
              )}
            >
              <CardContent className="p-0">
                <button
                  type="button"
                  onClick={() => toggle(entry.id)}
                  aria-expanded={open}
                  aria-controls={`diet-knowledge-panel-${entry.id}`}
                  aria-label={`${open ? '收起' : '展开'}讲解：${entry.title}`}
                  className={cn(
                    'flex w-full text-left transition-colors hover:bg-muted/30',
                    open
                      ? 'items-start gap-3 p-4 sm:p-5'
                      : 'h-full min-h-[86px] flex-col items-center justify-center gap-1.5 px-3 py-3.5 text-center sm:min-h-[96px]',
                  )}
                >
                  {open ? (
                    <>
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                        <BookOpen className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="font-display text-base font-bold leading-tight text-foreground sm:text-lg">
                            {entry.title}
                          </span>
                          <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                            {entry.topic}
                          </Badge>
                        </span>
                      </span>
                      <ChevronDown className="mt-1 h-4 w-4 shrink-0 rotate-180 text-muted-foreground transition-transform" />
                    </>
                  ) : (
                    <>
                      <span className="line-clamp-2 w-full font-display text-sm font-bold leading-snug text-foreground">
                        {entry.title}
                      </span>
                      <span className="rounded-full border border-border/60 bg-muted/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {entry.topic}
                      </span>
                      <span className="flex w-full items-center justify-center gap-1.5 text-[10px] leading-none text-muted-foreground">
                        <span className="max-w-[58%] truncate text-primary/90" title={entry.author}>
                          {entry.author}
                        </span>
                        <span
                          className="inline-flex shrink-0 items-center gap-0.5"
                          title={`${entry.sources.length} 条来源`}
                        >
                          <Link2 className="h-2.5 w-2.5" />
                          {entry.sources.length}
                        </span>
                        <ChevronDown className="h-3 w-3 shrink-0 opacity-70" />
                      </span>
                    </>
                  )}
                </button>

                <div
                  id={`diet-knowledge-panel-${entry.id}`}
                  role="region"
                  aria-label={`${entry.title} 详情`}
                  aria-hidden={!open}
                  className={cn(
                    'grid border-t border-border/60 transition-all duration-300 ease-out motion-reduce:transition-none',
                    open
                      ? 'grid-rows-[1fr] opacity-100 visible'
                      : 'grid-rows-[0fr] opacity-0 invisible',
                  )}
                >
                  <div className="min-h-0 overflow-hidden px-4 pb-4 sm:px-5 sm:pb-5">
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {entry.summary}
                    </p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                      <span className="text-primary">{entry.author}</span>
                      <span>·</span>
                      <span>{entry.date}</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Link2 className="h-3 w-3" />
                        {entry.sources.length} 条来源
                      </span>
                    </p>
                    <dl className="mt-3 space-y-3">
                      <BodyRow label="作者依据" text={entry.body.basis} />
                      <BodyRow label="这条在说什么" text={entry.body.explanation} />
                      <BodyRow label="可迁移方法" text={entry.body.takeaway} accent />
                      <BodyRow label="证据边界" text={entry.body.boundary} warning />
                      <BodyRow label="完成标准" text={entry.body.criteria} />
                    </dl>

                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-semibold text-foreground">来源</p>
                      {entry.sources.map((s) => (
                        <div
                          key={s.id}
                          className="rounded-lg border border-border/60 bg-muted/30 p-2.5 sm:p-3"
                        >
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline sm:text-sm"
                          >
                            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                            {s.title}
                          </a>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            {s.timeRange && (
                              <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-foreground/80">
                                {s.timeRange}
                              </span>
                            )}
                            {s.note && (
                              <span className="rounded border border-warning/40 bg-warning/10 px-1.5 py-0.5 text-[10px] text-foreground/80">
                                {s.note}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {entry.relatedDiets && entry.relatedDiets.length > 0 && (
                      <p className="mt-3 text-[11px] text-muted-foreground">
                        关联方案：{' '}
                        {entry.relatedDiets
                          .map((id) => DIETS.find((d) => d.id === id)?.name ?? id)
                          .join(' / ')}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-border/50 bg-card/40 backdrop-blur-xl">
        <CardContent className="p-4 sm:p-5">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Quote className="h-4 w-4 text-primary" />
            关于来源与版权
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            本页条目依据公开来源整理：多数来自创作者公开发布的视频内容，生酮一条依据公开学术 / 官方文献（三位博主的素材未覆盖生酮）。
            仅保留简要概括与公开链接，不搬运完整转写、不嵌入视频、不转载截图。
            观点与结论归原作者；平台 AI 生成的章节要点一律标注为「AI 章节要点 / 未逐句核对」，文献条目标注为「文献整理」，均不作为原话引用。
            如原作者认为存在不当引用，可通过页脚反馈入口联系下架。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function BodyRow({
  label,
  text,
  accent,
  warning,
}: {
  label: string;
  text: string;
  accent?: boolean;
  warning?: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-lg border p-2.5 sm:p-3',
        accent && 'border-primary/30 bg-primary/5',
        warning && 'border-warning/40 bg-warning/10',
        !accent && !warning && 'border-border/60 bg-muted/20',
      )}
    >
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-xs leading-relaxed text-foreground/90 sm:text-sm">{text}</dd>
    </div>
  );
}
