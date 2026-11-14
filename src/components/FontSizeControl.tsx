// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useEffect, useRef, useState } from 'react';
import { ALargeSmall } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'xy-font-size';
/** 同页多实例同步事件：桌面侧栏与手机顶栏各渲染一份，
 *  改其中一份时另一份（隐藏的那个）也要跟上，否则窗口宽度跨断点后会显示旧数字 */
const SYNC_EVENT = 'xy-font-change';
/** 默认字号：与 src/index.css 里 html { font-size } 保持一致 */
export const FONT_DEFAULT = 18;
/** 可调范围：14px（小屏紧凑）~ 22px（大字模式，约为默认的 122%）。
 *  上限不含 24：24px 时首页大标题「雄性意志」会被挤成两行（"志。"落单），
 *  22px 是标题仍能一行放下的临界值。 */
const FONT_MIN = 14;
const FONT_MAX = 22;

function clampSize(v: number): number {
  return Math.min(FONT_MAX, Math.max(FONT_MIN, Math.round(v)));
}

/** 读取当前字号：优先 <html> 内联样式（首屏脚本/本组件已写入），兜底 localStorage */
function readSize(): number {
  const inline = parseFloat(document.documentElement.style.fontSize);
  if (Number.isFinite(inline) && inline > 0) return clampSize(inline);
  try {
    const saved = parseInt(localStorage.getItem(STORAGE_KEY) ?? '', 10);
    if (Number.isFinite(saved)) return clampSize(saved);
  } catch {
    /* 隐私模式 / 禁用存储时静默降级 */
  }
  return FONT_DEFAULT;
}

/** 应用并持久化：全站文字/间距以 rem 为单位，改根字号即整体等比缩放 */
function applySize(px: number): void {
  document.documentElement.style.fontSize = `${px}px`;
  try {
    localStorage.setItem(STORAGE_KEY, String(px));
  } catch {
    /* 存不进 localStorage 也照样生效，只是不记忆 */
  }
  // 通知同页另一个实例（桌面侧栏 / 手机顶栏）
  window.dispatchEvent(new CustomEvent<number>(SYNC_EVENT, { detail: px }));
}

const BTN =
  'flex items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-35';

/**
 * 全局字号调节器：A− / A+ 逐步缩放根字号（14–22px），localStorage 记忆。
 * - 桌面端（侧栏）：一行 [A− A+] + 底部「字号」文字（点文字恢复默认）
 * - 手机端（顶栏）：单按钮弹出小面板（− 数值 + / 重置）
 */
export default function FontSizeControl({ compact = false }: { compact?: boolean }) {
  const [size, setSize] = useState(readSize);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  /** 与 size 同步的实时值：连续快速点击时 state 还没重渲染，
   *  若直接读闭包里的 size，三次点击都会以同一个旧值为基准（只涨 1 档）。 */
  const sizeRef = useRef(size);

  // 多标签页同步：另一个标签调了字号，这里跟着变
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const n = parseInt(e.newValue, 10);
        if (Number.isFinite(n)) {
          const next = clampSize(n);
          sizeRef.current = next;
          setSize(next);
        }
      }
    };
    // 同页另一实例调整时同步显示值（根字号已由对方写入，这里只更新数字）
    const onSync = (e: Event) => {
      const next = clampSize((e as CustomEvent<number>).detail);
      if (next !== sizeRef.current) {
        sizeRef.current = next;
        setSize(next);
      }
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener(SYNC_EVENT, onSync);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(SYNC_EVENT, onSync);
    };
  }, []);

  // 手机端：点击面板外关闭
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  const change = (delta: number) => {
    const next = clampSize(sizeRef.current + delta);
    if (next === sizeRef.current) return;
    sizeRef.current = next;
    setSize(next);
    applySize(next);
  };
  const reset = () => {
    sizeRef.current = FONT_DEFAULT;
    setSize(FONT_DEFAULT);
    applySize(FONT_DEFAULT);
  };

  // ── 手机端：顶栏单按钮 + 弹出面板 ──
  if (compact) {
    return (
      <div ref={ref} className="relative shrink-0">
        <button
          type="button"
          aria-label="调整字号"
          aria-expanded={open}
          title={`字号 ${size}px`}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            BTN,
            'h-9 w-9',
            open && 'bg-accent text-foreground',
          )}
        >
          <ALargeSmall className="h-5 w-5" strokeWidth={1.8} />
        </button>
        {open && (
          <div
            role="dialog"
            aria-label="字号设置"
            className="absolute right-0 top-full z-50 mt-2 flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-border/60 bg-popover/95 p-2 shadow-2xl backdrop-blur-2xl"
          >
            <button
              type="button"
              aria-label="减小字号"
              onClick={() => change(-1)}
              disabled={size <= FONT_MIN}
              className={cn(BTN, 'h-9 w-9 shrink-0 text-xs font-semibold')}
            >
              A−
            </button>
            {/* 点数字恢复默认：省掉一个「重置」按钮，窄屏也不会挤成两行 */}
            <button
              type="button"
              onClick={reset}
              aria-label={`当前 ${size}px，点击恢复默认字号`}
              title={`点击恢复默认（${FONT_DEFAULT}px）`}
              className="w-12 shrink-0 rounded-md py-1 text-center text-sm font-medium tabular-nums text-foreground transition-colors hover:bg-accent"
            >
              {size}px
            </button>
            <button
              type="button"
              aria-label="增大字号"
              onClick={() => change(1)}
              disabled={size >= FONT_MAX}
              className={cn(BTN, 'h-9 w-9 shrink-0 text-sm font-bold')}
            >
              A+
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── 桌面端：侧栏一行两键 + 「字号」标签（点击恢复默认） ──
  return (
    <div className="flex w-14 flex-col items-center gap-1">
      <div className="flex w-14 items-stretch gap-1" role="group" aria-label="字号设置">
        <button
          type="button"
          aria-label="减小字号"
          title="减小字号"
          onClick={() => change(-1)}
          disabled={size <= FONT_MIN}
          className={cn(BTN, 'h-8 flex-1 text-xs font-semibold')}
        >
          A−
        </button>
        <button
          type="button"
          aria-label="增大字号"
          title="增大字号"
          onClick={() => change(1)}
          disabled={size >= FONT_MAX}
          className={cn(BTN, 'h-8 flex-1 text-sm font-bold')}
        >
          A+
        </button>
      </div>
      <button
        type="button"
        onClick={reset}
        title={`当前 ${size}px，点击恢复默认（${FONT_DEFAULT}px）`}
        className="rounded py-0.5 text-xs leading-none text-muted-foreground transition-colors hover:text-foreground"
      >
        字号 {size}
      </button>
    </div>
  );
}
