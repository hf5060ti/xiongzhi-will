// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Search, Shield, Dumbbell, Apple, Sigma, BookOpen, User, Bot, Brain, Briefcase, Coins, Heart, Wrench, Mountain, Soup, TrendingDown, ClipboardList, Bookmark, BookMarked, Crosshair, LogIn, LogOut, Hand, CalendarDays, Utensils, Library, Activity, Trophy, LayoutGrid, X, type LucideIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
// 搜索索引属于「按需加载」：它内部会在模块顶层把动作 / 食物 / 补剂 / 自重 / 饮食知识
// 全站数据摊平成一条大数组（约 176 KB 源数据）。若在此处以值导入的形式静态引用，
// 这段数据就会被打进首屏主 chunk（实测 index chunk 达 759 kB）。
// 因此这里只做「类型导入」，真正的实现首次需要时（空闲阶段预取）才动态 import，
// 让 Vite 把索引与其数据单独切成一个 chunk，首屏不必为其付费。
import type { SearchEntry } from '@/lib/search-index';

/** 已加载的搜索索引 API；null = 尚未加载完成 */
type SearchIndexApi = { searchEntries: (query: string, limit?: number) => SearchEntry[] };

let searchIndexPromise: Promise<SearchIndexApi> | null = null;

/**
 * 加载搜索索引（模块内单例，重复调用复用同一个 Promise，不会重复请求）。
 * 放在组件外是为了让缓存作用于整个模块而不是单个组件实例。
 */
function loadSearchIndex(): Promise<SearchIndexApi> {
  searchIndexPromise ??= import('@/lib/search-index').then((mod) => ({
    searchEntries: mod.searchEntries,
  }));
  return searchIndexPromise;
}
import { saveGoalId } from '@/lib/store';
import { EXERCISE_COUNT, STRENGTH_LIFT_COUNT } from '@/data/counts';
import { getUser, isLoginEnabled, loginWithGithub, logout, type AuthUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import VideoBackground from '@/components/VideoBackground';
import ErrorBoundary from '@/components/ErrorBoundary';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import FontSizeControl from '@/components/FontSizeControl';
import MobileSettingsMenu from '@/components/MobileSettingsMenu';
import { t, onLangChange } from '@/lib/i18n';

interface NavItem {
  path: string;
  labelKey: string;
  icon: LucideIcon;
  end: boolean;
}

// 导航按板块分组：21 项平铺成一列时，「营养」和「人生」挨在一起，
// 找功能全靠逐个扫读。分组后每组是一块语义完整的入口，扫一眼就能定位。
// 组一 = 训练主链路（选目标 → 出方案 → 查动作 → 记训练 → 算营养 → 看数据 → 问 AI），
// 组二 = 专项（减脂 / 肠胃 / 等长 / 饮食讲解），组三 = 心智 / 事业 / 荒野等延伸板块。
const NAV_GROUPS: { key: string; labelKey: string; items: NavItem[] }[] = [
  {
    key: 'train',
    labelKey: 'nav_group_train',
    items: [
      { path: '/', labelKey: 'nav_body', icon: Dumbbell, end: true },
      { path: '/plan', labelKey: 'nav_plan', icon: CalendarDays, end: false },
      { path: '/library', labelKey: 'nav_library', icon: Library, end: false },
      { path: '/strength', labelKey: 'nav_strength', icon: Trophy, end: false },
      { path: '/training-logs', labelKey: 'nav_training', icon: ClipboardList, end: false },
      { path: '/nutrition', labelKey: 'nav_nutrition', icon: Utensils, end: false },
      { path: '/body', labelKey: 'nav_bodydata', icon: Activity, end: false },
      { path: '/coach', labelKey: 'nav_coach', icon: Bot, end: false },
      { path: '/tools', labelKey: 'nav_tools', icon: Crosshair, end: false },
    ],
  },
  {
    key: 'special',
    labelKey: 'nav_group_special',
    items: [
      { path: '/light', labelKey: 'nav_light', icon: TrendingDown, end: false },
      { path: '/stomach', labelKey: 'nav_stomach', icon: Soup, end: false },
      { path: '/isometric', labelKey: 'nav_isometric', icon: Hand, end: false },
      { path: '/diet-knowledge', labelKey: 'nav_diet', icon: BookOpen, end: false },
    ],
  },
  {
    key: 'life',
    labelKey: 'nav_group_life',
    items: [
      { path: '/mind', labelKey: 'nav_mind', icon: Brain, end: false },
      { path: '/career', labelKey: 'nav_career', icon: Briefcase, end: false },
      { path: '/wealth', labelKey: 'nav_wealth', icon: Coins, end: false },
      { path: '/relation', labelKey: 'nav_relation', icon: Heart, end: false },
      { path: '/skills', labelKey: 'nav_skills', icon: Wrench, end: false },
      { path: '/wild', labelKey: 'nav_wild', icon: Mountain, end: false },
      { path: '/life', labelKey: 'nav_life', icon: BookMarked, end: false },
      { path: '/collect', labelKey: 'nav_collect', icon: Bookmark, end: false },
    ],
  },
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
  '/strength': { title: '力量等级计算器 - 雄性意志', desc: `按性别、年龄、体重与动作，用重量×次数估算 1RM，判定从入门到精英五档力量等级，并给出下一档还差多少公斤。${STRENGTH_LIFT_COUNT} 项动作，含自重与行走类。` },
  '/coach': { title: 'AI 教练 - 雄性意志', desc: 'AI 个性化训练与饮食建议。建议仅供参考，不构成医疗建议。' },
  '/library': { title: '动作百科 - 雄性意志', desc: `${EXERCISE_COUNT} 个动作的演示动图、组次、要点、优缺点与名师教学视频，含斗腕专项与等长训练。` },
  '/mind': { title: '心智 - 雄性意志', desc: '压力管理、自律习惯、斯多葛哲学、日记复盘——意志的内核。' },
  '/career': { title: '事业 - 雄性意志', desc: '职业发展、副业、写作、编程、谈判、领导力。' },
  '/wealth': { title: '财富 - 雄性意志', desc: '赚钱、存钱、投资基础、风险管理、消费观。' },
  '/relation': { title: '关系 - 雄性意志', desc: '边界感、表达、沟通、亲密关系——尊重与责任。' },
  '/skills': { title: '技能 - 雄性意志', desc: '急救、料理、修理、户外、生存、防身、旅行。' },
  '/wild': { title: '荒野 - 雄性意志', desc: '生存工具（打火石、生存斧、刀具与钢材特性）、户外技能。' },
  '/life': { title: '人生 - 雄性意志', desc: '《高性价比人生指南》33 章全收录（MIT 开源）：每一条都回答花掉什么、换回什么，标注成本、说人话、收益、证据等级与来源。' },
  '/stomach': { title: '胃部 - 雄性意志', desc: '饮食与消化：蛋白质摄入量、嘌呤、吸收率、空腹训练建议。' },
  '/isometric': { title: '等长训练 - 雄性意志', desc: '等长式训练：术后恢复期、环境受限时的低压力保肌方案——动作库、眼部手术后分阶段恢复指南，搭配散步温和促进循环。' },
  '/diet-knowledge': { title: '饮食讲解 - 雄性意志', desc: '公开健身博主讲解整理：每条注明证据等级与来源链接，非医疗建议。' },
  '/training-logs': { title: '训练日志 - 雄性意志', desc: '近 7 天训练频次、周容量、力量与耐力追踪。' },
  '/light': { title: '轻盈计划 - 雄性意志', desc: '减脂追踪台：定目标体重，每天记体重、打卡，趋势图与达成预估自动算。' },
  '/tools': { title: '力量计算器 - 雄性意志', desc: '1RM 估算（Epley/Brzycki/Lombardi 三公式对照）、按目标反推做组重量、RPE 主观强度标尺。' },
  '/sources': { title: '内容来源与循证 - 雄性意志', desc: '本站每个模块的内容来源、证据等级与免责边界。' },
  '/faq': { title: '关于与常见问题 - 雄性意志', desc: '项目初衷、公式方法论（BMR / TDEE / MET）、隐私与免责、免费开源说明。' },
  '/privacy': { title: '隐私政策 - 雄性意志', desc: '未登录时数据只存本地浏览器；登录 GitHub 后可开启云端同步，数据存储在你的账号下。' },
  '/collect': { title: '收藏导入 - 雄性意志', desc: '粘贴抖音收藏的分享文本，自动解析标题/作者/链接，按训练、饮食、心智等维度分类并生成周总结。数据只存本地。' },
};

const TYPE_ICON = {
  movement: Dumbbell,
  food: Apple,
  formula: Sigma,
  knowledge: BookOpen,
};
const TYPE_LABEL = { movement: 'type_movement', food: 'type_food', formula: 'type_formula', knowledge: 'type_knowledge' };

// ── 账号登录区：GitHub 登录 / 用户菜单 / 云同步状态 ──
// 登录入口会随"xy-auth-change"事件刷新（登录回调落地、退出登录时触发）
function AuthSection({ compact }: { compact?: boolean }) {
  const [user, setUser] = useState<AuthUser | null>(() => getUser());
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onAuth = () => setUser(getUser());
    window.addEventListener('xy-auth-change', onAuth);
    return () => window.removeEventListener('xy-auth-change', onAuth);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // 云同步后端还没对国内开放（见 lib/auth.ts 的 ENABLE_LOGIN），未登录时不显示登录按钮，
  // 免得用户点下去只弹一句"即将上线"。已登录的会话照常显示，方便退出。
  // 注意：必须放在所有 Hooks 之后，条件 return 出现在 Hook 之前会破坏 Hook 调用顺序。
  if (!user && !isLoginEnabled()) return null;

  // 菜单只有点开时才渲染：此前这里只判断 user，导致登录状态下浮层一直挂在页面上、
  // 点击头像也收不起来（menuOpen 定义了却没被读取）
  const menu = user && menuOpen ? (
    <div
      className={
        compact
          ? 'absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-border/60 bg-popover/95 p-3 shadow-2xl backdrop-blur-2xl'
          : 'absolute left-full top-0 z-50 ml-3 w-56 rounded-xl border border-border/60 bg-popover/95 p-3 shadow-2xl backdrop-blur-2xl'
      }
    >
      <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
      <p className="truncate text-xs text-muted-foreground">@{user.login}</p>
      <p className="mt-2 type-meta text-muted-foreground">
        已开启云端同步：训练记录、身体数据、计划与收藏会跟随账号，换设备自动取回。
      </p>
      <button
        type="button"
        onClick={() => {
          logout();
          setMenuOpen(false);
        }}
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-border/60 py-1.5 text-xs text-foreground transition-colors hover:bg-accent"
      >
        <LogOut className="h-3.5 w-3.5" />
        {t('logout')}
      </button>
    </div>
  ) : null;

  if (compact) {
    // 手机端：顶部右侧图标按钮
    return (
      <div ref={ref} className="relative shrink-0">
        {user ? (
          <button
            type="button"
            aria-label="账号"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border/60 transition-colors hover:bg-accent"
          >
            {user.avatar ? (
              <img src={user.avatar} alt="" className="h-full w-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={loginWithGithub}
            className="flex h-9 items-center gap-1 rounded-lg border border-border/60 px-2.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogIn className="h-4 w-4" />
            {t('login')}
          </button>
        )}
        {menu}
      </div>
    );
  }

  // 桌面端：左侧栏底部
  return (
    <div ref={ref} className="relative">
      {user ? (
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          title={user.login}
          className="flex w-14 flex-col items-center gap-1 rounded-xl py-2.5 transition-all hover:bg-accent/50"
        >
          {user.avatar ? (
            <img src={user.avatar} alt="" className="h-8 w-8 rounded-full border border-border/60" />
          ) : (
            <User className="h-5 w-5 text-muted-foreground" strokeWidth={1.8} />
          )}
          <span className="max-w-full truncate text-xs leading-none text-muted-foreground">
            {user.login}
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={loginWithGithub}
          title="GitHub 登录"
          className="flex w-14 flex-col items-center gap-1 rounded-xl py-2.5 text-muted-foreground transition-all hover:bg-accent/50 hover:text-foreground"
        >
          <LogIn className="h-5 w-5" strokeWidth={1.8} />
          <span className="text-xs leading-none">{t('login')}</span>
        </button>
      )}
      {menu}
    </div>
  );
}

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
              <span className="rounded px-1 text-xs uppercase tracking-wider text-muted-foreground">
                {t(TYPE_LABEL[r.type])}
              </span>
            </span>
            <span className="block type-meta text-muted-foreground">{r.sublabel}</span>
          </span>
        </button>
      );
    })}
  </div>
);

export const Layout = () => {
  const { pathname } = useLocation();
  // 语言切换时触发重渲染，所有 t() 即时刷新
  const [, setLangTick] = useState(0);
  useEffect(() => onLangChange(() => setLangTick((n) => n + 1)), []);

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

  // 通知云同步：路由切换 = 用户可能刚改完某页数据，强制刷一次
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('xy-route-change'));
  }, [pathname]);

  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [open, setOpen] = useState(false);
  /** 手机端搜索面板（lg 以下断点使用，桌面端仍用内容区顶部搜索框） */
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  /** 手机端「全部分类」面板：21 项分组网格，一览无余、点选即跳 */
  const [mobileCatsOpen, setMobileCatsOpen] = useState(false);
  const mobileCatsRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  /** 动态加载进来的搜索索引；未就绪时搜索面板保持可用，只是没有结果 */
  const [searchApi, setSearchApi] = useState<SearchIndexApi | null>(null);

  // 切页后关闭分类面板，并把当前页在横滚条里滚到可视区（否则用户会以为分类丢了）
  useEffect(() => {
    setMobileCatsOpen(false);
    const el = mobileCatsRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    el?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [pathname]);

  // 分类面板打开时锁背景滚动，关闭时还原（与搜索面板一致）
  useEffect(() => {
    if (!mobileCatsOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileCatsOpen]);

  // 空闲预取：趁浏览器空闲把索引 chunk 拉下来，等用户真正敲字时通常已就绪。
  // setState 发生在异步回调里（不在 effect 同步体内），因此不会触发额外渲染。
  useEffect(() => {
    let alive = true;
    const kick = () => {
      loadSearchIndex().then(
        (api) => {
          if (alive) setSearchApi(api);
        },
        () => {
          /* 索引加载失败不应影响导航使用，搜索静默降级（由 AllowEmptySearch 兜底） */
        },
      );
    };
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(kick, { timeout: 2000 });
      return () => {
        alive = false;
        cancelIdleCallback(id);
      };
    }
    // 不支持 requestIdleCallback 的浏览器（Safari 旧版本）退化为普通异步预取
    const timer = setTimeout(kick, 0);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, []);

  // 搜索防抖：用户停止输入 200ms 后才真正搜索，避免每次按键都触发
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 200);
    return () => clearTimeout(timer);
  }, [query]);

  // 索引未就绪时返回空数组（行为等同于「无匹配」），加载完成前后 alve 行为一致，
  // 不会出现搜索框卡住；真正的 UI 差异由下方 resultsPending 给出轻量状态提示。
  const results = useMemo(
    () => (searchApi && debouncedQuery.trim() ? searchApi.searchEntries(debouncedQuery) : []),
    [searchApi, debouncedQuery],
  );
  /** 用户已输入内容、但索引 chunk 还没到：用于显示「正在加载」而不是「无结果」 */
  const resultsPending = Boolean(debouncedQuery.trim()) && !searchApi;

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
          <span className="font-display text-xs font-bold tracking-[0.2em] text-foreground">
            雄性
          </span>
        </Link>
        {/* 导航项较多（20 项），矮屏放不下时允许侧栏内部滚动，避免把底部语言/账号区挤出去 */}
        <nav className="flex flex-1 flex-col items-center gap-1 overflow-y-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_GROUPS.map((group, gi) => (
            <div key={group.key} className="flex w-full flex-col items-center">
              {/* 组间分隔线 + 组名：80px 宽的侧栏里，分组比再多的分隔空间都管用 */}
              <div
                className={cn(
                  'flex w-14 items-center gap-1.5 pt-1',
                  gi > 0 && 'mt-2 border-t border-border/60',
                )}
              >
                <span className="type-meta font-medium uppercase tracking-widest text-muted-foreground/70">
                  {t(group.labelKey)}
                </span>
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    title={t(item.labelKey)}
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
                    {/* 侧栏只有 56px 宽：俄语「Упражнения」这类长词会撑破，统一截断 */}
                    <span className="max-w-full truncate text-xs leading-none">{t(item.labelKey)}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* 主题切换 + 语言切换 + 字号调节 + 账号：左侧栏底部 */}
        <div className="border-t border-border/60 py-2">
          <div className="flex flex-col items-center gap-1">
            <ThemeToggle />
            <LanguageSwitcher />
            <FontSizeControl />
            <AuthSection />
          </div>
        </div>
      </aside>

      {/* 手机端顶部导航：整行左右对调（右手持机时按钮更顺手）。
          用 flex-row-reverse 只翻转视觉顺序、不动 DOM 顺序，读屏/键盘 Tab 顺序仍是品牌在前 */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-card/70 backdrop-blur-2xl lg:hidden">
        <div className="flex h-12 flex-row-reverse items-center justify-between gap-2 px-3 sm:h-14">
          {/* 右侧组：语言按钮紧贴品牌左侧（右手持机拇指最易够到）。
              DOM 仍保持品牌在前，仅用 flex-row-reverse 翻视觉顺序，读屏 / Tab 顺序不变 */}
          <div className="flex min-w-0 flex-row-reverse items-center gap-2">
            <Link to="/" className="flex min-w-0 items-center gap-2">
              <Shield className="h-5 w-5 shrink-0 text-primary" strokeWidth={2.2} />
              <span className="truncate font-display text-base font-bold tracking-[0.15em] text-foreground">
                {t('brand')}
              </span>
            </Link>
            {/* 语言：常驻顶栏靠右，显示当前国旗；面板 right-0 向左展开，避免越出屏幕右边界 */}
            <LanguageSwitcher compact />
          </div>
          {/* 左侧组：设置 / 搜索 / 账号 */}
          <div className="flex shrink-0 items-center gap-1.5">
            <MobileSettingsMenu />
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
            {/* 账号：GitHub 登录 / 云同步（手机端） */}
            <AuthSection compact />
          </div>
        </div>
        {/* 手机端分类条：横滚当前可见分类 + 右侧固定「全部」按钮。
            去掉原先混在横滚里的组名（组名「训练」与分类「训练」重名，用户分不清），
            并让当前页分类自动滚到可视区，避免用户以为被裁掉。 */}
        <div className="flex items-center gap-1 px-3 pb-1.5 sm:pb-2">
          <nav
            ref={mobileCatsRef}
            className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {NAV_GROUPS.flatMap((group) => group.items).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'shrink-0 rounded-md px-2.5 py-1 text-xs transition-colors sm:px-3 sm:py-1.5',
                    isActive
                      ? 'bg-primary/15 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </nav>
          {/* 固定在右侧、不随横滚：点开分组网格面板，21 项一览无余 */}
          <button
            type="button"
            aria-label={t('nav_all')}
            onClick={() => setMobileCatsOpen(true)}
            className="flex h-7 shrink-0 items-center gap-1 rounded-md border border-border/60 bg-card/80 px-2 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
          >
            <LayoutGrid className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
            {t('nav_all')}
          </button>
        </div>
      </header>

      {/* 手机端「全部分类」面板：按 NAV_GROUPS 分组的网格，带图标、当前高亮、点选即跳 */}
      {mobileCatsOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setMobileCatsOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t('nav_all')}
            className="relative mx-2 mb-2 max-h-[82vh] overflow-y-auto rounded-2xl border border-border/60 bg-popover/95 p-4 shadow-2xl backdrop-blur-2xl sm:mx-3 sm:mb-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-base font-bold tracking-wide text-foreground">
                {t('nav_all')}
              </h2>
              <button
                type="button"
                aria-label={t('cancel')}
                onClick={() => setMobileCatsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </div>
            <div className="space-y-4">
              {NAV_GROUPS.map((group) => (
                <section key={group.key}>
                  <h3 className="mb-2 border-l-2 border-primary/70 pl-2 type-meta font-semibold text-muted-foreground">
                    {t(group.labelKey)}
                  </h3>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {group.items.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        onClick={() => setMobileCatsOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'flex flex-col items-center gap-1.5 rounded-xl border px-1 py-3 text-center text-xs transition-colors',
                            isActive
                              ? 'border-primary/50 bg-primary/10 font-medium text-primary'
                              : 'border-border/50 bg-card/40 text-foreground hover:bg-accent',
                          )
                        }
                      >
                        <item.icon className="h-5 w-5" strokeWidth={1.8} />
                        <span className="w-full truncate">{t(item.labelKey)}</span>
                      </NavLink>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

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
                  placeholder={t('search_ph_mobile')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-9 border-border bg-background/50 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <button
                type="button"
                onClick={closeMobileSearch}
                className="shrink-0 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {t('cancel')}
              </button>
            </div>
            {results.length > 0 ? (
              <SearchResultList
                results={results}
                onPick={pick}
                className="mt-2 max-h-[60vh] overflow-auto rounded-xl border border-border/60 bg-card/60"
              />
            ) : (
              <p className="mt-3 px-1 type-meta text-muted-foreground">
                {/* 索引 chunk 还没到就显示「无结果」会误导用户，这里先给出加载态 */}
                {resultsPending ? t('search_loading') : query.trim() ? t('search_empty') : t('search_typing')}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 主内容区 */}
      <main className="relative z-10 flex-1 lg:ml-20">
        {/* 全局搜索（桌面端在内容区顶部）；动作百科页隐藏——该页自带搜索+部位/器械筛选，避免两个搜索框混淆 */}
        {pathname !== '/library' && (
        <div className="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-4 sm:pt-4 lg:px-8">
          <div ref={rootRef} className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              type="search"
              placeholder={t('search_ph')}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              className="pl-9 border-border bg-background/50 text-foreground backdrop-blur-xl placeholder:text-muted-foreground"
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

        )}
        <div className="mx-auto w-full max-w-7xl px-3 py-3 sm:px-4 sm:py-6 lg:px-8 lg:py-8">
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>

        <footer className="border-t border-border/30 bg-card/40 px-4 py-4 backdrop-blur-xl lg:px-8">
          <div className="max-w-4xl type-meta text-muted-foreground">
            <p>
              <b className="text-foreground">{t('disclaimer')}</b>
            </p>
            <p className="mt-2">
              <b className="text-foreground">{t('suitable')}</b>
            </p>
            <p className="mt-2 flex flex-wrap gap-3">
              <a href="https://github.com/hf5060ti/xiongzhi-will/issues" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">{t('feedback')}</a>
              <a href="https://github.com/hf5060ti/xiongzhi-will" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">{t('github')}</a>
              <Link to="/privacy" className="underline hover:text-foreground">{t('privacy')}</Link>
              <Link to="/sources" className="underline hover:text-foreground">{t('sources')}</Link>
              <Link to="/faq" className="underline hover:text-foreground">{t('faq')}</Link>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};
