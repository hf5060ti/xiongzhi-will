// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
import { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { LANGS, getLang, setLang } from '@/lib/i18n';

/** 语言切换按钮：Globe 图标，点开 4 个语言选项 */
export default function LanguageSwitcher({ compact }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [lang, setLangState] = useState(getLang());
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        type="button"
        aria-label="Language"
        onClick={() => setOpen((v) => !v)}
        className={
          compact
            ? 'flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
            : 'flex w-14 flex-col items-center gap-1 rounded-xl py-2.5 text-muted-foreground transition-all hover:bg-accent/50 hover:text-foreground'
        }
      >
        <Globe className={compact ? 'h-5 w-5' : 'h-5 w-5'} strokeWidth={1.8} />
        {!compact && <span className="text-[10px] leading-none">语言</span>}
      </button>
      {open && (
        <div
          className={
            compact
              ? 'absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-border/60 bg-popover/95 p-1.5 shadow-2xl backdrop-blur-2xl'
              : 'absolute left-full top-0 z-50 ml-3 w-44 rounded-xl border border-border/60 bg-popover/95 p-1.5 shadow-2xl backdrop-blur-2xl'
          }
        >
          <p className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">Language</p>
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => pick(l.code)}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm hover:bg-accent"
            >
              <span className="flex items-center gap-2">
                <span>{l.flag}</span>
                <span className="text-foreground">{l.label}</span>
              </span>
              {lang === l.code && <Check className="h-3.5 w-3.5 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
