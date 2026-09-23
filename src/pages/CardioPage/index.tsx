import { useState } from 'react';
import { Activity, Check, Flame, HeartPulse, Info, Timer, Users, X } from 'lucide-react';
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
  CARDIO_FORMULA,
  CARDIO_ITEMS,
  CARDIO_REF_WEIGHT,
  cardioKcal,
  cardioMetRangeText,
} from '@/data/cardio';
import { round0, round1 } from '@/lib/body-math';
import { loadBodyProfile, loadWeightKg } from '@/lib/store';
import { cn } from '@/lib/utils';

/** 分钟 → 小时文本，去掉多余的 0（90 → 1.5） */
function hoursText(minutes: number): string {
  return (minutes / 60)
    .toFixed(2)
    .replace(/0+$/, '')
    .replace(/\.$/, '');
}

const QUICK_MINUTES = [10, 20, 30, 45, 60];

/** 散步的功能与优点（纯文字说明，不参与任何计算） */
const WALK_BENEFITS: { title: string; desc: string }[] = [
  {
    title: '身体压力极低',
    desc: '全程双脚不离地、没有腾空落地，心率与呼吸几乎不会飙起来，练完不需要恢复期，第二天照常生活与训练。',
  },
  {
    title: '不伤膝盖，对关节友好',
    desc: '落地冲击远小于跑步、跳绳这类带腾空的有氧，是关节负担最小的有氧形式之一。膝盖不适、体重基数较大、平时不运动的人也能安心走；配速控制在中速以下，挑软一点的路面和有缓震的鞋更稳。',
  },
  {
    title: '几乎不引起皮质醇升高',
    desc: '皮质醇是身体的“压力激素”，高强度或过量训练会把它推高，反而促进脂肪囤积、影响睡眠。散步强度低到不触发这种应激反应；规律散步有助于把皮质醇维持在正常区间。',
  },
  {
    title: '极其温和，恢复期首选',
    desc: '受伤、生病或大强度训练之后的恢复期，散步是少数既能活动身体、又不额外增加恢复负担的选择。当作“主动恢复”用，还能促进血液循环、帮助睡眠。',
  },
  {
    title: '最适合不想做高强度有氧的人',
    desc: '不用装备、不用场地、不用逼自己喘不上气，随时能开始也随时能停。参与门槛几乎为零，因而最容易变成长期习惯。',
  },
  {
    title: '时间充足人群的稳赚选项',
    desc: '单次消耗不高，但可以拉长时长、拆成多次、融进日常（通勤、饭后、打电话时走），靠时间累积总消耗，同时几乎不占用额外意志力。',
  },
];

/** 强度与脂肪供能占比（供能结构参考区间） */
const WALK_FUEL_ROWS: { intensity: string; slot: string; fat: string; note: string }[] = [
  {
    intensity: '低强度 · 最大心率 50%–60%',
    slot: '慢走、中速',
    fat: '约 60%–70%',
    note: '氧气充足，脂肪是主要燃料，但单位时间总消耗小',
  },
  {
    intensity: '中强度 · 最大心率 60%–70%',
    slot: '快走、快步',
    fat: '约 40%–50%',
    note: '脂肪占比下降，总消耗明显上升，兼顾效率',
  },
  {
    intensity: '高强度 · 最大心率 70% 以上',
    slot: '散步达不到',
    fat: '降至 30% 以下',
    note: '糖原成为主要燃料，恢复负担大，且容易累积压力',
  },
];

export default function CardioPage() {
  const [itemId, setItemId] = useState(CARDIO_ITEMS[0].id);
  const [metId, setMetId] = useState(CARDIO_ITEMS[0].metRows[1]?.id ?? CARDIO_ITEMS[0].metRows[0].id);
  const [weight, setWeight] = useState(() => {
    const p = loadBodyProfile();
    const fromBody = parseFloat(p.weightKg);
    if (Number.isFinite(fromBody) && fromBody > 0) return String(fromBody);
    const stored = loadWeightKg();
    return stored > 0 ? String(stored) : '';
  });
  const [minutes, setMinutes] = useState('30');

  const item = CARDIO_ITEMS.find((i) => i.id === itemId) ?? CARDIO_ITEMS[0];
  const metRow = item.metRows.find((m) => m.id === metId) ?? item.metRows[0];

  const weightKg = parseFloat(weight);
  const mins = parseFloat(minutes);
  const valid = Number.isFinite(weightKg) && weightKg > 0 && Number.isFinite(mins) && mins > 0;

  const kcal = valid ? cardioKcal(metRow.met, weightKg, mins) : 0;
  const perHour = valid ? cardioKcal(metRow.met, weightKg, 60) : 0;
  const perMin = valid ? kcal / mins : 0;

  const selectItem = (id: string) => {
    const next = CARDIO_ITEMS.find((i) => i.id === id);
    if (!next) return;
    setItemId(next.id);
    setMetId(next.metRows[1]?.id ?? next.metRows[0].id);
  };

  return (
    <div className="space-y-5">
      <header>
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">
          Cardio
        </p>
        <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">
          有氧运动
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          选一项有氧运动，按公式算出自己的消耗：{CARDIO_FORMULA}。体重与时长随便改，结果实时更新。
        </p>
      </header>

      {/* 选择有氧项目 */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Activity className="h-4 w-4 text-primary" />
            选择有氧项目
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            点进去即显示该项目的消耗公式与计算器。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CARDIO_ITEMS.map((it) => {
            const Icon = it.icon;
            const active = it.id === item.id;
            return (
              <button
                key={it.id}
                type="button"
                onClick={() => selectItem(it.id)}
                className={cn(
                  'rounded-lg border p-3 text-left transition-colors hover-elevate sm:p-4',
                  active ? 'border-primary/60 bg-primary/10' : 'border-border bg-muted/20',
                )}
              >
                <span className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="font-display text-base font-bold text-foreground sm:text-lg">{it.name}</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">
                    {it.en}
                  </span>
                  {active && (
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-primary">
                      当前
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-xs text-muted-foreground">{it.tagline}</span>
                <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                  {it.desc}
                </span>
                <span className="mt-2 block text-xs font-medium text-primary/80">
                  {cardioMetRangeText(it.metRows)}
                </span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {it.metRows.map((m) => (
                    <span
                      key={m.id}
                      className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {m.label} · {m.met} MET
                    </span>
                  ))}
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
            填入体重与时长，选一个速度档位，实时算出消耗热量。
          </p>
        </div>

        <div className="rounded-md border border-primary/40 bg-primary/5 px-4 py-3">
          <p className="font-display text-lg font-bold tracking-wide text-primary">
            {CARDIO_FORMULA}
          </p>
          <p className="mt-1.5 flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
            MET（代谢当量）：1 MET ≈ 静坐时的能量消耗 ≈ 1 kcal/kg·h，也就是 70 kg 的人 1 小时约 70 kcal。速度越快，MET 值越高。
          </p>
        </div>

        {/* 速度档位 */}
        <div className="space-y-2">
          <Label className="text-sm">{item.name} · 强度 / 速度档位（MET 参考值）</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {item.metRows.map((m) => {
              const active = m.id === metRow.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMetId(m.id)}
                  className={cn(
                    'rounded-md border p-3 text-left transition-colors hover-elevate',
                    active ? 'border-primary/60 bg-primary/10' : 'border-border bg-muted/20',
                  )}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{m.label}</span>
                    <span className="font-display text-sm font-bold text-primary">
                      {m.met} MET
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{m.speed}</span>
                  <span className="mt-0.5 block text-[11px] text-primary/80">
                    参考 {Math.round(m.met * CARDIO_REF_WEIGHT)} kcal/小时（{CARDIO_REF_WEIGHT}kg）
                  </span>
                  <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">
                    {m.note}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 体重 / 时长 */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="cardio-weight" className="text-sm">
              体重
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="cardio-weight"
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
            <Label htmlFor="cardio-minutes" className="text-sm">
              时长
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="cardio-minutes"
                type="number"
                min={0}
                step="1"
                placeholder="如 30"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="pr-12"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                分钟
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK_MINUTES.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setMinutes(String(v))}
                  className={cn(
                    'rounded-md border px-2 py-0.5 text-xs transition-colors hover-elevate',
                    String(v) === minutes
                      ? 'border-primary/60 bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground',
                  )}
                >
                  {v} 分钟
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
              {item.name}消耗（{metRow.label} · {metRow.speed}）
            </p>
            <p className="font-display text-4xl font-extrabold tracking-wide text-foreground">
              {round0(kcal)}
              <span className="ml-2 text-base font-bold text-muted-foreground">kcal</span>
            </p>
            <p className="text-xs text-muted-foreground">
              计算：{metRow.met} MET × {weightKg} kg × {hoursText(mins)} h = {round0(kcal)} kcal
            </p>
            <p className="text-xs text-muted-foreground">
              折算：约 {round0(perHour)} kcal/小时 · {round1(perMin)} kcal/分钟（按你 {weightKg} kg 体重）。
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
            填入体重与时长后，自动按公式算出消耗。
          </div>
        )}
      </section>

      {/* 档位对照表 */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="text-sm font-medium text-foreground">
            {item.name}各档位消耗对照
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {valid
              ? `按你 ${weightKg} kg 体重折算，其余档位同体重同用时长的消耗如下。`
              : '填入体重后，这里会按你的体重折算各档位消耗。'}
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">档位</TableHead>
              <TableHead className="whitespace-nowrap">速度 / 强度</TableHead>
              <TableHead className="text-right">MET</TableHead>
              <TableHead className="text-right">kcal/小时</TableHead>
              <TableHead className="text-right whitespace-nowrap">
                {valid ? `kcal / ${mins} 分钟` : 'kcal / 本次'}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {item.metRows.map((m) => {
              const active = m.id === metRow.id;
              return (
                <TableRow key={m.id} className={active ? 'bg-primary/10' : ''}>
                  <TableCell className="whitespace-nowrap font-medium text-foreground">
                    {m.label}
                    {active && (
                      <span className="ml-1.5 text-[10px] uppercase tracking-wider text-primary">
                        当前
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{m.speed}</TableCell>
                  <TableCell className="text-right text-muted-foreground">{m.met}</TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {valid ? round0(cardioKcal(m.met, weightKg, 60)) : '—'}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {valid ? round0(cardioKcal(m.met, weightKg, mins)) : '—'}
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
          公式为估算值：实际消耗还受坡度、地形、步幅与个体代谢影响，误差约 ±10–20%；结果为总消耗（含基础代谢），不是额外净支出。MET 取值参考 Ainsworth《体力活动纲要》(Compendium of Physical Activities, 2011) 及公开 MET 消耗对照表，按该项目常见强度区间取值，仅供估算。
        </p>
      </section>

      {/* 优点 / 缺点 / 适合人群 */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <HeartPulse className="h-4 w-4 text-primary" />
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

      {/* 散步：功能与优点（纯文字说明，不参与计算） */}
      {item.id === 'walking' && (
        <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <HeartPulse className="h-4 w-4 text-primary" />
              散步的功能与优点（深入说明）
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              想长期坚持、又不想给身体加负担时，散步是最容易落地的一项有氧。以下只讲它“为什么值得做”，不改变上面的公式与计算。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-2">
            {WALK_BENEFITS.map((b) => (
              <div key={b.title} className="rounded-md border border-border bg-muted/20 p-3">
                <p className="text-sm font-medium text-foreground">{b.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* 供能比例 */}
          <div className="space-y-3 rounded-md border border-primary/40 bg-primary/5 p-4">
            <p className="text-sm font-medium text-foreground">
              低强度稳态下的供能比例：约 70% 脂肪 / 30% 糖原
            </p>
            <div className="flex h-2.5 overflow-hidden rounded-full">
              <div className="h-full bg-primary" style={{ width: '70%' }} />
              <div className="h-full bg-muted-foreground/40" style={{ width: '30%' }} />
            </div>
            <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                脂肪供能 ≈ 70%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                糖原供能 ≈ 30%
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              走路时氧气供应充足，身体会优先动用脂肪：中低强度持续有氧的脂肪供能比例可达 60%–70%，散步这类低强度稳态运动正好落在这一区间，脂肪约占七成、糖原约占三成。
              但要记住“占比高 ≠ 总量大”——散步单位时间总消耗小，想靠它减脂，靠的是时长与频率的累积，而不是强度。
            </p>
          </div>

          {/* 强度越高，脂肪占比越低 */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">强度越高，脂肪供能占比越低</p>
            <p className="text-xs text-muted-foreground">
              同一段时长里，强度提上去总消耗会变大，但供能结构会从“脂肪为主”转向“糖原为主”。
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">强度区间</TableHead>
                  <TableHead className="whitespace-nowrap">散步对应档位</TableHead>
                  <TableHead className="whitespace-nowrap">脂肪供能占比</TableHead>
                  <TableHead>说明</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {WALK_FUEL_ROWS.map((r) => (
                  <TableRow key={r.intensity}>
                    <TableCell className="whitespace-nowrap font-medium text-foreground">
                      {r.intensity}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground">
                      {r.slot}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-primary">{r.fat}</TableCell>
                    <TableCell className="text-muted-foreground">{r.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs leading-relaxed text-muted-foreground">
              所以慢走、中速是“练脂肪供能效率”，快走、快步是“把总消耗提上去”；散步的好处在于始终待在低强度这一段，几乎不会滑到糖原主导的高强度区。
            </p>
          </div>

          {/* 适合谁 */}
          <div className="space-y-2 rounded-md border border-border bg-muted/20 p-3">
            <p className="text-sm font-medium text-foreground">尤其适合这些人</p>
            <ul className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                身体恢复期：受伤、生病或大强度训练之后，需要动一动但不想增加恢复负担。
              </li>
              <li className="flex items-start gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                膝盖不适 / 关节敏感 / 体重基数较大：跑跳类有氧吃不消，散步几乎零门槛。
              </li>
              <li className="flex items-start gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                不想做高强度有氧的人：不想大汗淋漓、不想喘不上气，只想把活动量稳稳加上去。
              </li>
              <li className="flex items-start gap-1.5">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                时间充足的人：可以走 45–60 分钟甚至更久，用时长换总量，顺便当成放空与思考的时间。
              </li>
            </ul>
          </div>

          <p className="text-[11px] leading-relaxed text-muted-foreground/80">
            供能比例为运动生理学常见参考区间（低强度稳态脂肪供能约 60%–70%，随强度升高而下降），实际数值受配速、坡度、体能水平、饮食与空腹状态影响，个体差异明显；以上为一般性说明，不作为医疗建议。
          </p>
        </section>
      )}
    </div>
  );
}
