import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, Shield, Dumbbell, Apple, Sigma, Home, BarChart3, BookOpen, User, Bot, Brain, Briefcase, Coins, Heart, Wrench, Mountain, Soup, TrendingDown, ClipboardList } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchEntries, type SearchEntry } from '@/lib/search-index';
import { saveGoalId } from '@/lib/store';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';

const NAV_ITEMS = [
  { path: '/', label: '身体', icon: Dumbbell, end: true },
  { path: '/training-logs', label: '训练', icon: ClipboardList, end: false },
  { path: '/light', label: '轻盈', icon: TrendingDown, end: false },
  { path: '/stomach', label: '胃部', icon: Soup, end: false },
  { path: '/diet-knowledge', label: '饮食', icon: BookOpen, end: false },
  { path: '/mind', label: '心智', icon: Brain, end: false },
  { path: '/career', label: '事业', icon: Briefcase, end: false },
  { path: '/wealth', label: '财富', icon: Coins, end: false },
  { path: '/relation', label: '关系', icon: Heart, end: false },
  { path: '/skills', label: '技能', icon: Wrench, end: false },
  { path: '/wild', label: '荒野', icon: Mountain, end: false },

];

// 路由级 SEO：每个页面独立的 title / description（SPA 单页内切换时由 JS 更新）
const ROUTE_META: Record<string, { title: string; desc: string }> = {
  '/': { title: '雄性意志 - 自然健身系统', desc: '目标设定、动作百科、营养库、BMR/TDEE 计算、AI 教练。只提供健康自然的健身方式，数据只存本地。' },
  '/plan': { title: '专属方案 - 雄性意志', desc: '根据你的目标、身体数据与饮食方案生成的分化训练计划：每周安排、组次参数、核心动作、进步法则。' },
  '/nutrition': { title: '营养 - 雄性意志', desc: '食物营养库、BMR/TDEE 计算、一日三餐方案、AI 热量估算、营养素吸收率。' },
  '/body': { title: '身体数据 - 雄性意志', desc: '体重体脂记录、围度趋势、力量追踪、自然健身公式库（FFMI、BMR、TDEE、肌肉量上限）。' },
  '/cardio': { title: '有氧与冷兵器 - 雄性意志', desc: '拳击、跳绳、跑步、球类与冷兵器训练的热量消耗参考（剑道 270 kcal/h，唐刀武士刀等 200–600 kcal/h）。' },
  '/bodyweight': { title: '自重训练 - 雄性意志', desc: '俯卧撑、引体、吊杠举腿等自重动作库与组次参考。' },
  '/physique': { title: '形体 - 雄性意志', desc: '胸型、臂型等各部位形态对照与知名人物参考，拍照记录体态变化。' },
  '/coach': { title: 'AI 教练 - 雄性意志', desc: 'AI 个性化训练与饮食建议。建议仅供参考，不构成医疗建议。' },
  '/library': { title: '动作百科 - 雄性意志', desc: '876 个动作的演示动图、组次、要点、优缺点与名师教学视频。' },
  '/mind': { title: '心智 - 雄性意志', desc: '压力管理、自律习惯、斯多葛哲学、日记复盘——意志的内核。' },
  '/career': { title: '事业 - 雄性意志', desc: '职业发展、副业、写作、编程、谈判、领导力。' },
  '/wealth': { title: '财富 - 雄性意志', desc: '赚钱、存钱、投资基础、风险管理、消费观。' },
  '/relation': { title: '关系 - 雄性意志', desc: '边界感、表达、沟通、亲密关系——尊重与责任。' },
  '/skills': { title: '技能 - 雄性意志', desc: '急救、料理、修理、户外、生存、防身、旅行。' },
  '/wild': { title: '荒野 - 雄性意志', desc: '生存工具（打火石、生存斧、刀具与钢材特性）、户外技能。' },
  '/stomach': { title: '胃部 - 雄性意志', desc: '饮食与消化：蛋白质摄入量、嘌呤、吸收率、空腹训练建议。' },
  '/diet-knowledge': { title: '饮食讲解 - 雄性意志', desc: '公开健身博主讲解整理：每条注明证据等级与来源链接，非医疗建议。' },
  '/training-logs': { title: '训练日志 - 雄性意志', desc: '近 7 天训练频次、周容量、力量与耐力追踪。' },
  '/sources': { title: '内容来源与循证 - 雄性意志', desc: '本站每个模块的内容来源、证据等级与免责边界。' },
  '/privacy': { title: '隐私政策 - 雄性意志', desc: '数据只存本地浏览器，不上传、不追踪、无账号。' },
};

const TYPE_ICON = {
  movement: Dumbbell,
  food: Apple,
  formula: Sigma,
  knowledge: BookOpen,
};
const TYPE_LABEL = { movement: '动作', food: '食物', formula: '公式', knowledge: '讲解' };

/** 搜索结果列表：桌面下拉与手机搜索面板共用同一份渲染，保证两端口径一致 */
const SearchResultList = ({
  results,
  onPick,
  className,
}: {
  results: SearchEntry[];
  onPick: (entry: SearchEntry) => void;
  className?: string;
}) => (
  <div className={className}>
    {results.map((r, i) => {
      const Icon = TYPE_ICON[r.type];
      return (
        <button
          key={`${r.type}-${i}-${r.label}`}
          type="button"
          onClick={() => onPick(r)}
          className="flex w-full items-start gap-2.5 px-3 py-2 text-left hover:bg-accent/50"
        >
          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span className="flex-1">
            <span className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{r.label}</span>
              <span className="rounded px-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                {TYPE_LABEL[r.type]}
              </span>
            </span>
            <span className="block text-xs text-muted-foreground">{r.sublabel}</span>
          </span>
        </button>
      );
    })}
  </div>
);

export const Layout = () => {
  const { pathname } = useLocation();

  // 路由级 SEO：切页时更新 document.title 与 meta description
  useEffect(() => {
    const meta = ROUTE_META[pathname];
    if (meta) {
      document.title = meta.title;
      let desc = document.querySelector('meta[name="description"]');
      if (!desc) {
        desc = document.createElement('meta');
        desc.setAttribute('name', 'description');
        document.head.appendChild(desc);
      }
      desc.setAttribute('content', meta.desc);
    }
  }, [pathname]);

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  /** 手机端搜索面板（lg 以下断点使用，桌面端仍用内容区顶部搜索框） */
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchEntries(query), [query]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    setQuery('');
  };

  useEffect(() => {
    if (!mobileSearchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileSearchOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('keydown', onKey);
    // 面板打开期间锁住背景滚动，避免手机上出现"面板下方继续滚动"的错位感
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileSearchOpen]);

  const pick = (entry: SearchEntry) => {
    setOpen(false);
    setMobileSearchOpen(false);
    setQuery('');
    if (entry.target.route === '/nutrition' && 'foodId' in entry.target) {
      navigate(`/nutrition?foodId=${entry.target.foodId}`);
    } else if (entry.target.route === '/plan' && entry.target.goalId) {
      saveGoalId(entry.target.goalId);
      navigate('/plan');
    } else if (entry.target.route === '/bodyweight' && 'itemId' in entry.target && entry.target.itemId) {
      navigate(`/bodyweight?item=${entry.target.itemId}`);
    } else if (entry.target.route === '/diet-knowledge' && 'entryId' in entry.target && entry.target.entryId) {
      navigate(`/diet-knowledge?entry=${entry.target.entryId}`);
    } else {
      navigate(entry.target.route);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col lg:flex-row">
      {/* 全屏动态视频背景（站点级，全站页面共用） */}
      <VideoBackground />

      {/* 左侧竖排导航（桌面端） */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col border-r border-border/60 bg-card/70 backdrop-blur-2xl lg:flex">
        <Link to="/" className="flex flex-col items-center gap-1 py-5">
          <Shield className="h-7 w-7 text-primary" strokeWidth={2.2} />
          <span className="font-display text-[10px] font-bold tracking-[0.2em] text-foreground">
            雄性
          </span>
        </Link>
        <nav className="flex flex-1 flex-col items-center gap-1 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                title={item.label}
                className={({ isActive }) =>
                  cn(
                    'flex w-14 flex-col items-center gap-1 rounded-xl py-2.5 transition-all',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
                  )
                }
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
                <span className="text-[10px] leading-none">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* 手机端顶部导航 */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/70 backdrop-blur-2xl lg:hidden">
        <div className="flex h-14 items-center justify-between gap-2 px-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Shield className="h-5 w-5 text-primary" strokeWidth={2.2} />
            <span className="font-display text-base font-bold tracking-[0.15em] text-foreground">
              雄性意志
            </span>
          </Link>
          {/* 手机端搜索入口：桌面搜索框在 lg 以下断点被隐藏，这里补一个图标入口 */}
          <button
            type="button"
            aria-label="搜索"
            aria-expanded={mobileSearchOpen}
            onClick={() => setMobileSearchOpen(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
        {/* 手机端导航横向滚动 */}
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'shrink-0 rounded-md px-3 py-1.5 text-xs transition-colors',
                  isActive
                    ? 'bg-primary/15 font-medium text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* 手机端搜索面板：lg 以下断点使用，桌面端沿用内容区顶部搜索框 */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-50 flex flex-col lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={closeMobileSearch}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="全站搜索"
            className="relative m-3 rounded-2xl border border-border/60 bg-popover/95 p-3 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <Input
                  type="search"
                  autoFocus
                  placeholder="搜索动作 / 食物 / 公式 / 讲解"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 border-white/12 bg-white/[0.06] text-white placeholder:text-neutral-500"
                />
              </div>
              <button
                type="button"
                onClick={closeMobileSearch}
                className="shrink-0 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                取消
              </button>
            </div>
            {results.length > 0 ? (
              <SearchResultList
                results={results}
                onPick={pick}
                className="mt-2 max-h-[60vh] overflow-auto rounded-xl border border-border/60 bg-card/60"
              />
            ) : (
              <p className="mt-3 px-1 text-xs leading-relaxed text-muted-foreground">
                {query.trim()
                  ? '没有找到匹配的内容，换个词试试，如「卧推」「牛里脊」「BMR」「蛋白粉」。'
                  : '输入关键词，可搜动作、食物、公式与饮食讲解。'}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 主内容区 */}
      <main className="relative z-10 flex-1 lg:ml-20">
        {/* 全局搜索（桌面端在内容区顶部） */}
        <div className="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-4 sm:pt-4 lg:px-8">
          <div ref={rootRef} className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              type="search"
              placeholder="搜索动作 / 食物 / 公式 / 讲解，如「卧推」「牛里脊」「BMR」"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              className="pl-9 border-white/12 bg-white/[0.06] text-white backdrop-blur-xl placeholder:text-neutral-500"
            />
            {open && results.length > 0 && (
              <SearchResultList
                results={results}
                onPick={pick}
                className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[60vh] overflow-auto rounded-xl border border-border/60 bg-popover/85 shadow-2xl backdrop-blur-2xl"
              />
            )}
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>

        <footer className="border-t border-border/30 bg-card/40 px-4 py-4 backdrop-blur-xl lg:px-8">
          <div className="max-w-4xl text-[11px] leading-relaxed text-muted-foreground">
            <p>
              <b className="text-foreground">本站只提供健康自然的健身方式，不提供任何极端训练或药物方案；请遵守你所在国家 / 地区的法律法规。</b>
            </p>
            <p className="mt-2">
              <b className="text-foreground">适合人群：</b>
              本工具面向健康成年人的力量 / 体能训练与营养参考。
              <b className="text-foreground">糖尿病、高血压、心脏病、肝肾疾病、痛风等慢性疾病患者，孕期 / 哺乳期女性、老年人、大病初愈者，以及任何有关节旧伤或长期服药者，开始训练或调整饮食前请优先遵从医嘱。</b>
              本站只提供尽可能健康、安全的运动与营养思路，<b className="text-foreground">不建议任何用户逞强、冲超出技术水平的重量、或模仿未掌握的高阶动作</b>。出现头晕、胸痛、关节刺痛、异常气短时立即停止并就医。
            </p>
            <p className="mt-2 flex flex-wrap gap-3">
              <a href="https://github.com/hf5060ti/xiongzhi-will/issues" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">反馈 / 提 Bug</a>
              <a href="https://github.com/hf5060ti/xiongzhi-will" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">GitHub 仓库</a>
              <Link to="/privacy" className="underline hover:text-foreground">隐私政策</Link>
              <Link to="/sources" className="underline hover:text-foreground">内容来源与循证</Link>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};
