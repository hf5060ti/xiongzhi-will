import { Check } from 'lucide-react';
import { GOALS } from '@/data/goals';
import { cn } from '@/lib/utils';

interface GoalPickerProps {
  selected: string;
  onSelect: (id: string) => void;
}

export default function GoalPicker({ selected, onSelect }: GoalPickerProps) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold tracking-wide text-foreground">
        你的训练目标是什么？
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">不同目标，训练思路完全不同。先选一个，之后随时可以改。</p>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
        {GOALS.map((goal) => {
          const active = selected === goal.id;
          const Icon = goal.icon;
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => onSelect(goal.id)}
              className={cn(
                'group relative flex flex-col gap-2 rounded-lg border p-3 text-left transition-colors',
                active
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-accent',
              )}
            >
              {active && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
              )}
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-md border',
                  active ? 'border-primary/50 bg-primary/20 text-primary' : 'border-border bg-muted text-muted-foreground',
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block font-display text-base font-bold leading-tight tracking-wide text-foreground">
                  {goal.name}
                </span>
                <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                  {goal.en}
                </span>
              </span>
              <span className="block text-[11px] leading-snug text-muted-foreground">{goal.tagline}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
