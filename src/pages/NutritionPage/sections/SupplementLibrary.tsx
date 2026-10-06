// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 补剂库：独立于食物库——补剂按「剂型 / 剂量 / 作用」说明，不按热量计算。
import { useMemo, useState } from 'react';
import { Search, FlaskConical, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SUPPLEMENTS, SUPPLEMENT_CATEGORIES, type ISupplement, type SupplementCategory } from '@/data/supplements';
import { smartMatch } from '@/lib/smart-search';
import { cn } from '@/lib/utils';

const CAT_ALL = 'all';
type CatFilter = SupplementCategory | typeof CAT_ALL;

export default function SupplementLibrary({ initialId }: { initialId?: string }) {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<CatFilter>('all');
  const [selected, setSelected] = useState<ISupplement | null>(
    initialId ? SUPPLEMENTS.find((s) => s.id === initialId) ?? null : null,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SUPPLEMENTS.filter((s) => {
      const hitCat = cat === 'all' || s.cat === cat;
      const hitQuery =
        q === '' ||
        smartMatch(q, [
          s.name,
          s.nameEn,
          s.role,
          ...(s.forms ?? []),
          ...s.pros,
          ...s.cons,
          ...(s.cautions ?? []),
          ...(s.note ?? []),
        ]);
      return hitCat && hitQuery;
    });
  }, [query, cat]);

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-bold tracking-wide text-foreground">健身补剂库</h2>
          <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {SUPPLEMENTS.length} 种 · 按作用与剂量说明，不按热量
          </span>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="搜索补剂，如「肌酸」「咖啡因」「液体钙」"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Badge
            variant={cat === 'all' ? 'default' : 'outline'}
            className={cn('cursor-pointer select-none', cat !== 'all' && 'hover:bg-accent')}
            onClick={() => setCat('all')}
          >
            全部
          </Badge>
          {SUPPLEMENT_CATEGORIES.map((c) => (
            <Badge
              key={c.id}
              variant={cat === c.id ? 'default' : 'outline'}
              className={cn('cursor-pointer select-none', cat !== c.id && 'hover:bg-accent')}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-border bg-card p-6 text-center text-sm text-muted-foreground">
          没有找到「{query}」，换个关键词试试（支持中英文、作用关键词，如「增力」「睡眠」「骨骼」）。
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {filtered.map((s) => {
            const active = selected?.id === s.id;
            return (
              <div key={s.id} className="rounded-lg border border-border bg-card transition-colors">
                <button
                  type="button"
                  onClick={() => setSelected(active ? null : s)}
                  className={cn(
                    'flex w-full flex-col gap-1.5 p-3 text-left transition-colors sm:p-3.5',
                    active && 'bg-primary/5',
                  )}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="font-display text-base font-bold leading-none tracking-wide text-foreground">
                      {s.name}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {SUPPLEMENT_CATEGORIES.find((c) => c.id === s.cat)?.label}
                      </span>
                      <ChevronDown className={cn('h-3.5 w-3.5 text-muted-foreground transition-transform', active && 'rotate-180')} />
                    </span>
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground">{s.nameEn}</span>
                  <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{s.role}</span>
                  {s.forms && s.forms.length > 0 && (
                    <span className="flex flex-wrap gap-1">
                      {s.forms.slice(0, 3).map((f) => (
                        <span key={f} className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                          {f}
                        </span>
                      ))}
                    </span>
                  )}
                </button>

                {active && (
                  <div className="space-y-3 border-t border-border px-3 py-3.5 sm:px-3.5">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-primary">作用</p>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/90">{s.role}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">常见剂量</p>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/90">{s.dosage}</p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">使用时机</p>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/90">{s.timing}</p>
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/5 p-2.5">
                        <p className="text-[11px] font-bold text-emerald-300">优点</p>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-xs leading-relaxed text-foreground/85">
                          {s.pros.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg border border-red-500/25 bg-red-500/5 p-2.5">
                        <p className="text-[11px] font-bold text-red-300">缺点 / 注意</p>
                        <ul className="mt-1 list-disc space-y-1 pl-4 text-xs leading-relaxed text-foreground/85">
                          {s.cons.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {s.cautions && (
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">注意事项</p>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/90">{s.cautions}</p>
                      </div>
                    )}
                    {s.evidence && (
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">循证参考</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.evidence}</p>
                      </div>
                    )}
                    <p className="rounded bg-muted/60 px-2.5 py-1.5 text-[10px] leading-relaxed text-muted-foreground">
                      剂量为常见成人参考范围，个体差异大；孕妇、哺乳期、未成年人、慢性病患者、服药者请先咨询医生或注册营养师。
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
