import { Check } from 'lucide-react';
import { DIETS } from '@/data/diets';
import { cn } from '@/lib/utils';

interface DietPickerProps {
  selected: string;
  onSelect: (id: string) => void;
}

const MACRO_META = [
  { key: 'carb', label: '碳水', className: 'bg-chart-1' },
  { key: 'protein', label: '蛋白质', className: 'bg-chart-2' },
  { key: 'fat', label: '脂肪', className: 'bg-chart-3' },
] as const;

export default function DietPicker({ selected, onSelect }: DietPickerProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-wide text-foreground">选一套饮食方案</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        和训练目标配套，决定你的能量来源与恢复速度。
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 xl:grid-cols-4">
        {DIETS.map((diet) => {
          const active = selected === diet.id;
          return (
            <button
              key={diet.id}
              type="button"
              onClick={() => onSelect(diet.id)}
              className={cn(
                'group relative flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors',
                active
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-accent',
              )}
            >
              {active && (
                <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              )}
              <span>
                <span className="block font-display text-base font-bold leading-tight tracking-wide text-foreground">
                  {diet.name}
                </span>
                <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  {diet.en}
                </span>
              </span>
              <span className="block text-[11px] leading-snug text-muted-foreground">{diet.tagline}</span>
              <span className="mt-auto space-y-2">
                <span className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  {MACRO_META.map((m) => (
                    <span
                      key={m.key}
                      className={m.className}
                      style={{ width: `${diet.macro[m.key]}%` }}
                    />
                  ))}
                </span>
                <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-muted-foreground">
                  {MACRO_META.map((m) => (
                    <span key={m.key} className="flex items-center gap-1">
                      <span className={cn('h-1.5 w-1.5 rounded-full', m.className)} />
                      {m.label} {diet.macro[m.key]}%
                    </span>
                  ))}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
