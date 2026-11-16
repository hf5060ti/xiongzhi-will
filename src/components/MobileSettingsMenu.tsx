// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useRef, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import FontSizeControl from './FontSizeControl';

/**
 * 手机端统一设置入口：主题 + 语言 + 字号合并到一个按钮里。
 * 原先顶栏要塞 5 个按钮（主题/语言/字号/搜索/账号），最大字号档时品牌被压成「雄…」；
 * 合并后只剩 3 个（设置/搜索/账号），品牌名能完整显示。
 * 三块控件都复用各自组件的 inline 形态，逻辑与桌面侧栏完全同源。
 */
export default function MobileSettingsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} className="shrink-0">
      <button
        type="button"
        aria-label="显示设置"
        aria-expanded={open}
        title="主题 / 语言 / 字号"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
          open && 'bg-accent text-foreground',
        )}
      >
        <SlidersHorizontal className="h-5 w-5" strokeWidth={1.8} />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="显示设置"
          className="absolute left-0 top-full z-50 mt-2 w-60 rounded-xl border border-border/60 bg-background p-2 shadow-2xl"
        >
          <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            显示设置
          </p>
          <div className="border-t border-border/40 pt-1">
            <ThemeToggle inline />
          </div>
          <div className="border-t border-border/40 pt-1">
            <p className="px-2.5 py-1.5 text-sm font-medium text-foreground">语言</p>
            <LanguageSwitcher inline />
          </div>
          <div className="border-t border-border/40 pt-1">
            <p className="px-2.5 py-1 text-sm font-medium text-foreground">字号</p>
            <FontSizeControl inline />
          </div>
        </div>
      )}
    </div>
  );
}
