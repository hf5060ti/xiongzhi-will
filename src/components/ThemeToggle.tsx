// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'xy-theme';
// 只导出默认组件：同文件里再导出函数/常量会让 react-refresh 规则报错（CI 里 --max-warnings=0 会直接红）
type Theme = 'dark' | 'light';

/** 读取当前主题：优先取 <html data-theme>（首屏内联脚本已设好），否则默认暗色 */
function readTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

/** 切换主题并持久化：写 <html data-theme> + localStorage + 同步 theme-color 与 color-scheme */
function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* 隐私模式 / 禁用存储时静默降级，不阻断切换 */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#F4F1EA' : '#0a0a0a');
}

export default function ThemeToggle({ compact = false, inline = false }: { compact?: boolean; inline?: boolean }) {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const isDark = theme === 'dark';

  // 多标签页同步：另一个标签切了主题，这里跟着变
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = () => {
    const next: Theme = isDark ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  // 设置面板内嵌行：左侧图标+名称，右侧当前值，整行可点
  if (inline) {
    return (
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent"
      >
        <span className="flex items-center gap-2 text-foreground">
          {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          主题
        </span>
        <span className="text-muted-foreground">{isDark ? '暗黑' : '明亮'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? '切换到明亮模式' : '切换到暗黑模式'}
      title={isDark ? '明亮模式' : '暗黑模式'}
      className={cn(
        'flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        compact ? 'h-10 w-10 shrink-0' : 'w-14 flex-col gap-1 py-2.5',
      )}
    >
      {isDark ? (
        <Moon className="h-5 w-5" strokeWidth={1.8} />
      ) : (
        <Sun className="h-5 w-5" strokeWidth={1.8} />
      )}
      {!compact && (
        <span className="text-xs leading-none">{isDark ? '暗黑' : '明亮'}</span>
      )}
    </button>
  );
}
