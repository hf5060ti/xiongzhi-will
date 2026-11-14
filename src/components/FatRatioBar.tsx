// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// EXPORTS: FatRatioBar
// 脂肪比可视化：堆叠条 + 图例（占比/每100g克数）+ 可选「实际摄入」换算与说明。
import type { FatComposition } from '@/data/foods/types';
import { cn } from '@/lib/utils';

const SEGMENTS: { key: keyof FatComposition; label: string; cls: string; hint: string }[] = [
  { key: 'sat', label: '饱和', cls: 'bg-primary', hint: '升 LDL 胆固醇，过量不利心血管，宜控量' },
  { key: 'mono', label: '单不饱和', cls: 'bg-foreground/80', hint: '橄榄油为代表，较友好，可优先选择' },
  { key: 'poly', label: '多不饱和', cls: 'bg-[#FF7A85]', hint: '含 ω-3/ω-6 等必需脂肪酸，注意抗氧化' },
  { key: 'trans', label: '反式', cls: 'bg-zinc-500', hint: '尽量为 0，对心血管最不利，加工食品需警惕' },
];

interface FatRatioBarProps {
  comp: FatComposition;
  /** 实际摄入克数；传入时额外展示「实际摄入」换算 */
  intakeGrams?: number;
  /** 是否展示每类脂肪的说明列表 */
  showHints?: boolean;
  className?: string;
}

export function FatRatioBar({ comp, intakeGrams, showHints, className }: FatRatioBarProps) {
  const total = comp.sat + comp.mono + comp.poly + comp.trans;
  if (total <= 0) {
    return <p className={cn('text-xs text-muted-foreground', className)}>几乎不含脂肪，无需看脂肪比。</p>;
  }
  const pct = (v: number) => Math.round((v / total) * 1000) / 10;
  const round1 = (v: number) => Math.round(v * 10) / 10;

  return (
    <div className={className}>
      <div className="flex h-3 w-full overflow-hidden rounded-full ring-1 ring-border/40">
        {SEGMENTS.map((s) => {
          const v = comp[s.key];
          if (v <= 0) return null;
          return (
            <div
              key={s.key}
              className={s.cls}
              style={{ width: `${pct(v)}%` }}
              title={`${s.label} ${pct(v)}%`}
            />
          );
        })}
      </div>

      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs">
        {SEGMENTS.map((s) => {
          const v = comp[s.key];
          if (v <= 0) return null;
          return (
            <span key={s.key} className="flex items-center gap-1">
              <span className={cn('inline-block h-2 w-2 rounded-full', s.cls)} />
              <span className="text-muted-foreground">{s.label}</span>
              <span className="font-medium text-foreground">{pct(v)}%</span>
              <span className="text-muted-foreground">({round1(v)}g)</span>
            </span>
          );
        })}
      </div>

      {intakeGrams != null && intakeGrams > 0 && (
        <p className="mt-1 text-xs text-muted-foreground">
          实际摄入（{Math.round(intakeGrams)}g）：饱和 {round1((comp.sat * intakeGrams) / 100)}g · 单不饱和{' '}
          {round1((comp.mono * intakeGrams) / 100)}g · 多不饱和 {round1((comp.poly * intakeGrams) / 100)}g
          {comp.trans > 0 ? ` · 反式 ${round1((comp.trans * intakeGrams) / 100)}g` : ''}
        </p>
      )}

      {showHints && (
        <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground">
          {SEGMENTS.filter((s) => comp[s.key] > 0).map((s) => (
            <li key={s.key} className="flex items-start gap-1.5">
              <span className={cn('mt-1 h-1.5 w-1.5 shrink-0 rounded-full', s.cls)} />
              <span>
                <b className="font-medium text-foreground">{s.label}脂肪</b>：{s.hint}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
