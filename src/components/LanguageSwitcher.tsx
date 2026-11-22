// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
import { useEffect, useRef, useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { LANGS, getLang, setLang, onLangChange, t } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** 语言切换按钮：Globe 图标，点开 4 个语言选项。
 *  inline：内嵌在「设置」面板里，直接铺开语言列表、不再套一层弹出菜单。 */
export default function LanguageSwitcher({ compact, inline }: { compact?: boolean; inline?: boolean }) {
  const [open, setOpen] = useState(false);
  const [lang, setLangState] = useState(getLang());
  const ref = useRef<HTMLDivElement>(null);

  // 顶栏与设置菜单里各有一个实例，任一处切换都要让另一处同步显示当前语言
  useEffect(() => onLangChange(() => setLangState(getLang())), []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const pick = (code: typeof LANGS[number]['code']) => {
    setLang(code);
    setLangState(code);
    setOpen(false);
  };

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  if (inline) {
    return (
      <div>
        <p className="px-2 pb-1.5 text-xs leading-relaxed text-muted-foreground">{t('lang_scope')}</p>
        <div className="grid grid-cols-2 gap-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => pick(l.code)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors hover:bg-accent',
                lang === l.code ? 'bg-primary/10 text-primary' : 'text-foreground',
              )}
            >
              <span>{l.flag}</span>
              <span className="truncate">{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label="Language"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={
          compact
            ? 'flex h-9 items-center gap-1 rounded-lg border border-border/60 pl-2 pr-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
            : 'flex w-14 flex-col items-center gap-1 rounded-xl py-2.5 text-muted-foreground transition-all hover:bg-accent/50 hover:text-foreground'
        }
      >
        {compact ? (
          <>
            {/* 当前语言国旗常驻可见，小箭头提示可点开切换 */}
            <span className="text-base leading-none">{current.flag}</span>
            <ChevronDown
              className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform', open && 'rotate-180')}
              strokeWidth={2}
            />
          </>
        ) : (
          <>
            <Globe className="h-5 w-5" strokeWidth={1.8} />
            <span className="text-xs leading-none">语言</span>
          </>
        )}
      </button>
      {open && (
        <div
          className={
            compact
              ? 'absolute left-0 top-full z-50 mt-2 w-52 max-w-[calc(100vw-1.5rem)] rounded-xl border border-border/60 bg-popover/95 p-1.5 shadow-2xl backdrop-blur-2xl'
              : 'absolute left-full top-0 z-50 ml-3 w-52 rounded-xl border border-border/60 bg-popover/95 p-1.5 shadow-2xl backdrop-blur-2xl'
          }
        >
          {/* 顶部明确标出当前语言，再列出全部选项（当前项高亮打勾） */}
          <p className="px-2.5 py-1.5 text-xs font-medium text-primary">
            {t('lang_current')}：{current.flag} {current.label}
          </p>
          <div className="mx-1.5 mb-1 h-px bg-border/60" />
          <p className="px-2.5 pb-1.5 text-xs leading-relaxed text-muted-foreground">{t('lang_scope')}</p>
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => pick(l.code)}
              className={cn(
                'flex w-full items-center justify-between rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors hover:bg-accent',
                lang === l.code && 'bg-primary/10',
              )}
            >
              <span className="flex items-center gap-2.5">
                <span className="text-base leading-none">{l.flag}</span>
                <span className={cn('text-foreground', lang === l.code && 'font-medium text-primary')}>
                  {l.label}
                </span>
              </span>
              {lang === l.code && <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
