import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Search, Shield, Dumbbell, Apple, Sigma, Home, BarChart3, BookOpen, User, Bot, Brain, Briefcase, Coins, Heart, Wrench, Mountain } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchEntries, type SearchEntry } from '@/lib/search-index';
import { saveGoalId } from '@/lib/store';
import { cn } from '@/lib/utils';
import { BASE } from '@/lib/base';

const NAV_ITEMS = [
  { path: '/', label: '韬綋', icon: Dumbbell, end: true },
  { path: '/mind', label: '蹇冩櫤', icon: Brain, end: false },
  { path: '/career', label: '浜嬩笟', icon: Briefcase, end: false },
  { path: '/wealth', label: '璐㈠瘜', icon: Coins, end: false },
  { path: '/relation', label: '鍏崇郴', icon: Heart, end: false },
  { path: '/skills', label: '鎶€鑳?, icon: Wrench, end: false },
  { path: '/wild', label: '鑽掗噹', icon: Mountain, end: false },
];

const TYPE_ICON = {
  movement: Dumbbell,
  food: Apple,
  formula: Sigma,
};
const TYPE_LABEL = { movement: '鍔ㄤ綔', food: '椋熺墿', formula: '鍏紡' };

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
      {/* 鏍兼柉鍔ㄦ€佽儗鏅棰戯細鍏ㄥ睆涓€浣擄紝浣庨€忔槑搴﹀仛搴?*/}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-[0.12]"
        src={`${BASE}images/guts-bg-new.mp4`}
      />
      {/* 绾粦閬僵锛岀‘淇濆瓧娓呮櫚 */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-black/90" />

      {/* 宸︿晶绔栨帓瀵艰埅锛堟闈㈢锛岀幓鐠冭川鎰燂紝鍜岃儗鏅竴浣擄級 */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col border-r border-white/5 bg-black/30 backdrop-blur-2xl lg:flex">
        <Link to="/" className="flex flex-col items-center gap-1 py-5">
          <Shield className="h-7 w-7 text-red-500" strokeWidth={2.2} />
          <span className="font-display text-[10px] font-bold tracking-[0.2em] text-white">
            闆勬€?
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

      {/* 鎵嬫満绔《閮ㄥ鑸?*/}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between gap-2 px-3">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <Shield className="h-5 w-5 text-primary" strokeWidth={2.2} />
            <span className="font-display text-base font-bold tracking-[0.15em] text-foreground">
              闆勬€ф剰蹇?
            </span>
          </Link>
        </div>
        {/* 鎵嬫満绔鑸í鍚戞粴鍔?*/}
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

      {/* 涓诲唴瀹瑰尯 */}
      <main className="relative z-10 flex-1 lg:ml-20">
        {/* 鍏ㄥ眬鎼滅储锛堟闈㈢鍦ㄥ唴瀹瑰尯椤堕儴锛?*/}
        <div className="mx-auto w-full max-w-4xl px-4 pt-4 lg:px-8">
          <div ref={rootRef} className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <Input
              type="search"
              placeholder="鎼滅储鍔ㄤ綔 / 椋熺墿 / 鍏紡锛屽銆屽崸鎺ㄣ€嶃€岀墰閲岃剨銆嶃€孊MR銆?
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
              <b className="text-foreground">鏈珯鍙彁渚涘仴搴疯嚜鐒剁殑鍋ヨ韩鏂瑰紡锛屼笉鎻愪緵浠讳綍鏋佺璁粌鎴栬嵂鐗╂柟妗堬紱璇烽伒瀹堜綘鎵€鍦ㄥ浗瀹?/ 鍦板尯鐨勬硶寰嬫硶瑙勩€?/b>
            </p>
            <p className="mt-2">
              <b className="text-foreground">閫傚悎浜虹兢锛?/b>
              鏈伐鍏烽潰鍚戝仴搴锋垚骞翠汉鐨勫姏閲?/ 浣撹兘璁粌涓庤惀鍏诲弬鑰冦€?
              <b className="text-foreground">绯栧翱鐥呫€侀珮琛€鍘嬨€佸績鑴忕梾銆佽倽鑲剧柧鐥呫€佺棝椋庣瓑鎱㈡€х柧鐥呮偅鑰咃紝瀛曟湡 / 鍝轰钩鏈熷コ鎬с€佽€佸勾浜恒€佸ぇ鐥呭垵鎰堣€咃紝浠ュ強浠讳綍鏈夊叧鑺傛棫浼ゆ垨闀挎湡鏈嶈嵂鑰咃紝寮€濮嬭缁冩垨璋冩暣楗鍓嶈浼樺厛閬典粠鍖诲槺銆?/b>
              鏈珯鍙彁渚涘敖鍙兘鍋ュ悍銆佸畨鍏ㄧ殑杩愬姩涓庤惀鍏绘€濊矾锛?b className="text-foreground">涓嶅缓璁换浣曠敤鎴烽€炲己銆佸啿瓒呭嚭鎶€鏈按骞崇殑閲嶉噺銆佹垨妯′豢鏈帉鎻＄殑楂橀樁鍔ㄤ綔</b>銆傚嚭鐜板ご鏅曘€佽兏鐥涖€佸叧鑺傚埡鐥涖€佸紓甯告皵鐭椂绔嬪嵆鍋滄骞跺氨鍖汇€?
            </p>
            <p className="mt-2 flex flex-wrap gap-3">
              <a href="https://github.com/hf5060ti/xiongzhi-will/issues" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">鍙嶉 / 鎻?Bug</a>
              <a href="https://github.com/hf5060ti/xiongzhi-will" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">GitHub 浠撳簱</a>
              <Link to="/privacy" className="underline hover:text-foreground">闅愮鏀跨瓥</Link>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};
