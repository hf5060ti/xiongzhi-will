import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Activity, Check, Dumbbell, Flame, Info, Layers, Timer, Users, Weight, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BODYWEIGHT_FORMULA,
  BODYWEIGHT_GROUP_DESC,
  BODYWEIGHT_GROUPS,
  BODYWEIGHT_ITEMS,
  BODYWEIGHT_REF_WEIGHT,
  BODYWEIGHT_TIME_FORMULA,
  bodyweightKcal,
  bodyweightKcalPerRep,
  bodyweightMinutes,
  type BodyweightGroup,
  type IBodyweightItem,
} from '@/data/bodyweight';
import { round0, round1 } from '@/lib/body-math';
import { loadBodyProfile, loadWeightKg } from '@/lib/store';
import { cn } from '@/lib/utils';

/** 分钟 → 小时文本，去掉多余的 0（1 → 1，0.5 → 0.5） */
function hoursText(minutes: number): string {
  return (minutes / 60)
    .toFixed(3)
    .replace(/0+$/, '')
    .replace(/\.$/, '');
}

/** 保留两位小数（kcal 展示用） */
function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

const QUICK_SETS = [3, 4, 5];
const QUICK_REPS = [5, 10, 15, 20, 30];
/** 体重对照档位（自由体重换算参考） */
const WEIGHT_SAMPLES = [50, 55, 60, 65, 70, 75, 80, 85, 90];

type GroupFilter = '全部' | BodyweightGroup;
const GROUP_FILTERS: GroupFilter[] = ['全部', ...BODYWEIGHT_GROUPS];

/** 切换动作时给一个合理的每组次数默认值：约为该动作节奏的一半 */
function defaultRepsPerSet(item: IBodyweightItem): number {
  return Math.max(3, Math.round(item.rpm / 2));
}

export default function BodyweightPage() {
  const [searchParams] = useSearchParams();
  const itemParam = searchParams.get('item') ?? '';
  const initialItem =
    BODYWEIGHT_ITEMS.find((i) => i.id === itemParam) ??
    BODYWEIGHT_ITEMS.find((i) => i.id === 'pushup-standard') ??
    BODYWEIGHT_ITEMS[0];

  const [groupFilter, setGroupFilter] = useState<GroupFilter>('全部');
  const [itemId, setItemId] = useState(initialItem.id);
  const [weight, setWeight] = useState(() => {
    const p = loadBodyProfile();
    const fromBody = parseFloat(p.weightKg);
    if (Number.isFinite(fromBody) && fromBody > 0) return String(fromBody);
    const stored = loadWeightKg();
    return stored > 0 ? String(stored) : '';
  });
  const [sets, setSets] = useState('4');
  const [repsPerSet, setRepsPerSet] = useState(() => String(defaultRepsPerSet(initialItem)));

  // 搜索直达：地址栏 ?item=xxx 时切到对应动作
  useEffect(() => {
    if (!itemParam) return;
    const next = BODYWEIGHT_ITEMS.find((i) => i.id === itemParam);
    if (!next) return;
    setItemId(next.id);
    setRepsPerSet(String(defaultRepsPerSet(next)));
  }, [itemParam]);

  const item = BODYWEIGHT_ITEMS.find((i) => i.id === itemId) ?? BODYWEIGHT_ITEMS[0];
  const list = groupFilter === '全部' ? BODYWEIGHT_ITEMS : BODYWEIGHT_ITEMS.filter((i) => i.group === groupFilter);
  const siblings = BODYWEIGHT_ITEMS.filter((i) => i.group === item.group);

  const weightKg = parseFloat(weight);
  const setCount = parseFloat(sets);
  const repCount = parseFloat(repsPerSet);
  const totalReps =
    Number.isFinite(setCount) && Number.isFinite(repCount) && setCount > 0 && repCount > 0
      ? setCount * repCount
      : 0;
  const valid = Number.isFinite(weightKg) && weightKg > 0 && totalReps > 0;

  const minutes = valid ? bodyweightMinutes(totalReps, item.rpm) : 0;
  const kcal = valid ? bodyweightKcal(item.met, weightKg, totalReps, item.rpm) : 0;
  const perRep = valid ? bodyweightKcalPerRep(item.met, weightKg, item.rpm) : 0;
  const perMin = valid ? kcal / minutes : 0;

  const selectItem = (next: IBodyweightItem) => {
    setItemId(next.id);
    setRepsPerSet(String(defaultRepsPerSet(next)));
  };

  return (
    <div className="space-y-5">
      <header>
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
          Bodyweight
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">
          自重力量消耗
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          俯卧撑（含变式）、引体向上、自重深蹲按公式估算消耗：{BODYWEIGHT_FORMULA}
          。自重动作按次数计，{BODYWEIGHT_TIME_FORMULA}。体重、组数、每组次数随便改，结果实时更新。
        </p>
      </header>

      {/* 选择动作 */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Activity className="h-4 w-4 text-primary" />
            选择自重动作
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            共 {BODYWEIGHT_ITEMS.length} 个动作，含俯卧撑全变式；点进去即显示该动作的消耗公式与计算器。
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {GROUP_FILTERS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroupFilter(g)}
              className={cn(
                'rounded-md border px-2.5 py-1 text-xs transition-colors hover-elevate',
                g === groupFilter
                  ? 'border-primary/60 bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground',
              )}
            >
              {g}
              {g !== '全部' && (
                <span className="ml-1 text-[10px] text-muted-foreground">
                  {BODYWEIGHT_ITEMS.filter((i) => i.group === g).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((it) => {
            const Icon = it.icon;
            const active = it.id === item.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => selectItem(it)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors hover-elevate sm:p-4',
                  active ? 'border-primary/60 bg-primary/10' : 'border-border bg-muted/20',
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-display text-base font-bold text-foreground sm:text-lg">{it.name}</span>
                  {active && (
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-primary">
                      当前
                    </span>
                  )}
                </span>
                <span className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="rounded-md border border-border px-1.5 py-0.5 text-[11px]">
                    {it.group}
                  </span>
                  <span className="rounded-md border border-border px-1.5 py-0.5 text-[11px]">
                    {it.level}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider">{it.en}</span>
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">{it.tagline}</span>
                <span className="mt-2 block text-xs font-medium text-primary/80">
                  {it.met} MET · 节奏 {it.rpm} 次/分 · 单次约{' '}
                  {round2(bodyweightKcalPerRep(it.met, BODYWEIGHT_REF_WEIGHT, it.rpm))} kcal（
                  {BODYWEIGHT_REF_WEIGHT}kg）
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 消耗公式 + 计算器 */}
      <section className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Flame className="h-4 w-4 text-primary" />
            {item.name} · 消耗公式
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            填入体重、组数与每组次数，实时算出这组训练烧掉多少热量。
          </p>
        </div>

        <div className="rounded-md border border-primary/40 bg-primary/5 px-4 py-3">
          <p className="font-display text-lg font-bold tracking-wide text-primary">
            {BODYWEIGHT_FORMULA}
          </p>
          <p className="font-display text-sm font-bold tracking-wide text-primary/90">
            {BODYWEIGHT_TIME_FORMULA}
          </p>
          <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
            内核与有氧页完全一致（MET 代谢当量）：自重动作没有「分钟数」可填，所以先把总次数按该动作的节奏折算成时长，再套同一个公式。节奏取组内自然节奏，组间休息不计入额外消耗。
          </p>
        </div>

        {/* 动作强度档位 */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md border border-primary/40 bg-primary/10 p-3">
            <p className="text-xs text-muted-foreground">难度</p>
            <p className="mt-0.5 font-display text-lg font-bold text-foreground">{item.level}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">MET（强度）</p>
            <p className="mt-0.5 font-display text-lg font-bold text-primary">{item.met}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">节奏（次/分）</p>
            <p className="mt-0.5 font-display text-lg font-bold text-foreground">{item.rpm}</p>
          </div>
          <div className="rounded-md border border-border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">单次消耗（{BODYWEIGHT_REF_WEIGHT}kg）</p>
            <p className="mt-0.5 font-display text-lg font-bold text-foreground">
              {round2(bodyweightKcalPerRep(item.met, BODYWEIGHT_REF_WEIGHT, item.rpm))}
              <span className="ml-1 text-xs text-muted-foreground">kcal</span>
            </p>
          </div>
        </div>
        <p className="text-xs leading-relaxed text-muted-foreground">{item.note}</p>

        {/* 体重 / 组数 / 每组次数 */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div>
            <Label htmlFor="bw-weight" className="text-sm">
              体重
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="bw-weight"
                type="number"
                min={0}
                step="0.1"
                placeholder="如 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                kg
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="bw-sets" className="text-sm">
              组数
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="bw-sets"
                type="number"
                min={0}
                step="1"
                placeholder="如 4"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                组
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK_SETS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSets(String(v))}
                  className={cn(
                    'rounded-md border px-2 py-0.5 text-xs transition-colors hover-elevate',
                    String(v) === sets
                      ? 'border-primary/60 bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {v} 组
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="bw-reps" className="text-sm">
              每组次数
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="bw-reps"
                type="number"
                min={0}
                step="1"
                placeholder="如 10"
                value={repsPerSet}
                onChange={(e) => setRepsPerSet(e.target.value)}
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                次
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK_REPS.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setRepsPerSet(String(v))}
                  className={cn(
                    'rounded-md border px-2 py-0.5 text-xs transition-colors hover-elevate',
                    String(v) === repsPerSet
                      ? 'border-primary/60 bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {v} 次
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 结果 */}
        {valid ? (
          <div className="space-y-2 rounded-md border border-primary/40 bg-primary/10 p-4">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Timer className="h-3.5 w-3.5 text-primary" />
              {item.name}消耗（{sets} 组 × {repsPerSet} 次 = {round0(totalReps)} 次）
            </p>
            <p className="font-display text-4xl font-extrabold tracking-wide text-foreground">
              {round0(kcal)}
              <span className="ml-2 text-base font-bold text-muted-foreground">kcal</span>
            </p>
            <p className="text-xs text-muted-foreground">
              计算：{item.met} MET × {weightKg} kg × {hoursText(minutes)} h = {round0(kcal)} kcal
              （时长 = {round0(totalReps)} 次 ÷ {item.rpm} 次/分 = {round1(minutes)} 分钟）
            </p>
            <p className="text-xs text-muted-foreground">
              折算：单次约 {round2(perRep)} kcal · 约 {round1(perMin)} kcal/分钟 · 每组约{' '}
              {round2(bodyweightKcal(item.met, weightKg, parseFloat(repsPerSet) || 0, item.rpm))} kcal
              （按你 {weightKg} kg 体重）。
            </p>
            <p className="text-[11px] leading-relaxed text-muted-foreground/80">
              仅计动作本身，组间休息按静息处理、不计入额外消耗。
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
            填入体重、组数与每组次数后，自动按公式算出消耗。
          </div>
        )}
      </section>

      {/* 体重对照（自由换算） */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Weight className="h-4 w-4 text-primary" />
            {item.name} · 不同体重下的消耗对照
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            消耗与体重成正比：同动作、同次数，体重越大消耗越高。下表按各组体重换算（节奏 {item.rpm} 次/分）。
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">体重</TableHead>
              <TableHead className="text-right">单次 kcal</TableHead>
              <TableHead className="text-right whitespace-nowrap">
                每组 {repsPerSet || '—'} 次 kcal
              </TableHead>
              <TableHead className="text-right whitespace-nowrap">
                {valid ? `本次 ${round0(totalReps)} 次 kcal` : '本次 kcal'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {WEIGHT_SAMPLES.map((w) => {
              const active = valid && Math.abs(w - weightKg) < 0.05;
              const perSet = bodyweightKcal(item.met, w, parseFloat(repsPerSet) || 0, item.rpm);
              const total = bodyweightKcal(item.met, w, totalReps, item.rpm);
              return (
                <TableRow key={w} className={active ? 'bg-primary/10' : ''}>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">
                    {w} kg
                    {active && (
                      <span className="ml-1.5 text-[10px] uppercase tracking-wider text-primary">
                        当前
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {round2(bodyweightKcalPerRep(item.met, w, item.rpm))}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {round1(perSet)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {round1(total)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <p className="text-[11px] leading-relaxed text-muted-foreground/80">
          体重并不改变动作难度，只线性影响消耗：70 kg 的人做 1 次标准俯卧撑约 0.47 kcal，90 kg 的人同样一次约 0.60 kcal。
        </p>
      </section>

      {/* 同组变式对照 */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Layers className="h-4 w-4 text-primary" />
            {item.group} · 各变式消耗对照
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {BODYWEIGHT_GROUP_DESC[item.group]}
            {valid
              ? ` 下表按你 ${weightKg} kg 体重、同样做 ${round0(totalReps)} 次折算。`
              : ' 填入体重与次数后，这里会按你的体重折算各变式消耗。'}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">变式</TableHead>
              <TableHead className="whitespace-nowrap">难度</TableHead>
              <TableHead className="text-right">MET</TableHead>
              <TableHead className="text-right whitespace-nowrap">节奏 次/分</TableHead>
              <TableHead className="text-right">单次 kcal</TableHead>
              <TableHead className="text-right whitespace-nowrap">同次数 kcal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {siblings.map((s) => {
              const active = s.id === item.id;
              return (
                <TableRow key={s.id} className={active ? 'bg-primary/10' : ''}>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">
                    {s.name}
                    {active && (
                      <span className="ml-1.5 text-[10px] uppercase tracking-wider text-primary">
                        当前
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-muted-foreground">{s.level}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{s.met}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{s.rpm}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {valid ? round2(bodyweightKcalPerRep(s.met, weightKg, s.rpm)) : '—'}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {valid ? round1(bodyweightKcal(s.met, weightKg, totalReps, s.rpm)) : '—'}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Info className="h-4 w-4 text-primary" />
            {item.name} · 注意事项
          </p>
          <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            {item.cautions.map((t) => (
              <li key={t} className="flex items-start gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[11px] leading-relaxed text-muted-foreground/80">
          公式为估算值：MET 参考 Ainsworth《体力活动纲要》中 calisthenics（自重训练）条目（中等强度约 3.8、高强度约 8.0），各变式按动作难度（杠杆比、参与肌量、是否爆发）在基准上修正；节奏取常见组内自然节奏。实际消耗受动作幅度、速度、组间休息与个体代谢影响，误差约 ±15–25%，仅供估算，不作为医疗或营养处方依据。
        </p>
      </section>

      {/* 优点 / 缺点 / 适合人群 */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Dumbbell className="h-4 w-4 text-primary" />
            {item.name} · 优点、局限与适合人群
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Check className="h-4 w-4 text-primary" />
              优点
            </p>
            <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              {item.pros.map((p) => (
                <li key={p} className="flex items-start gap-1.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-border bg-muted/20 p-3">
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <X className="h-4 w-4 text-muted-foreground" />
              缺点 / 局限
            </p>
            <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              {item.cons.map((c) => (
                <li key={c} className="flex items-start gap-1.5">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-md border border-border bg-muted/20 p-3">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Users className="h-4 w-4 text-primary" />
            适合人群
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.suitable}</p>
        </div>
      </section>
    </div>
  );
}
