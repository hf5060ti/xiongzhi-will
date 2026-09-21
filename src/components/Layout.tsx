import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Search, Shield, Dumbbell, Apple, Sigma, Home, BarChart3, BookOpen, User, Bot, Brain, Briefcase, Coins, Heart, Wrench, Mountain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchEntries, type SearchEntry } from '@/lib/search-index';
import { saveGoalId } from '@/lib/store';
import { cn } from '@/lib/utils';
import { BASE } from '@/lib/base';

const NAV_ITEMS = [
  { path: '/', label: '身体', icon: Dumbbell, end: true },
  { path: '/mind', label: '心智', icon: Brain, end: false },
  { path: '/career', label: '事业', icon: Briefcase, end: false },
  { path: '/wealth', label: '财富', icon: Coins, end: false },
  { path: '/relation', label: '关系', icon: Heart, end: false },
  { path: '/skills', label: '技能', icon: Wrench, end: false },
  { path: '/wild', label: '荒野', icon: Mountain, end: false },
];

const TYPE_ICON = {
  movement: Dumbbell,
  food: Apple,
  formula: Sigma,
};
const TYPE_LABEL = { movement: '动作', food: '食物', formula: '公式' };

export const Layout = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
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

  const pick = (entry: SearchEntry) => {
    setOpen(false);
    setQuery('');
    if (entry.target.route === '/nutrition' && 'foodId' in entry.target) {
      navigate(`/nutrition?foodId=${entry.target.foodId}`);
    } else if (entry.target.route === '/plan' && entry.target.goalId) {
      saveGoalId(entry.target.goalId);
      navigate('/plan');
    } else {
      navigate(entry.target.route);
    }
  };

  return (
    <div className="relative flex min-h-screen bg-background">
      {/* 格斯动态背景视频：全屏一体，低透明度做底 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-[0.12]"
        src={`${BASE}images/guts-bg-new.mp4`}
      />
      {/* 纯黑遮罩，确保字清晰 */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/90" />

      {/* 左侧竖排导航（桌面端，玻璃质感，和背景一体） */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col border-r border-white/5 bg-black/30 backdrop-blur-2xl lg:flex">
        <Link to="/" className="flex flex-col items-center gap-1 py-5">
          <Shield className="h-7 w-7 text-red-500" strokeWidth={2.2} />
          <span className="font-display text-[10px] font-bold tracking-[0.2em] text-white">
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
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between gap-2 px-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Shield className="h-5 w-5 text-primary" strokeWidth={2.2} />
            <span className="font-display text-base font-bold tracking-[0.15em] text-foreground">
              雄性意志
            </span>
          </Link>
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

      {/* 主内容区 */}
      <main className="relative z-10 flex-1 lg:ml-20">
        {/* 全局搜索（桌面端在内容区顶部） */}
        <div className="mx-auto w-full max-w-4xl px-4 pt-4 lg:px-8">
          <div ref={rootRef} className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              type="search"
              placeholder="搜索动作 / 食物 / 公式，如「卧推」「牛里脊」「BMR」"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              className="pl-9 bg-white/[0.04] backdrop-blur-2xl border-white/10 text-white placeholder:text-neutral-500"
            />
            {open && results.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[60vh] overflow-auto rounded-lg border border-border/50 bg-popover/90 backdrop-blur-xl shadow-xl">
                {results.map((r, i) => {
                  const Icon = TYPE_ICON[r.type];
                  return (
                    <button
                      key={`${r.type}-${i}-${r.label}`}
                      type="button"
                      onClick={() => pick(r)}
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
            )}
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>

        <footer className="border-t border-border/30 bg-background/40 px-4 py-4 backdrop-blur-sm lg:px-8">
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
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};
