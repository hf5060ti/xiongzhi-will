// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 力量等级计算器：性别 / 年龄 / 体重 + 动作 + 重量×次数 → 估算 1RM → 五档等级与星级。
// 功能形态参考公开健身力量计算器的通用做法；档位数据由本站整理与折算，
// 未使用任何第三方站点的文案或数据表（详见 src/data/strength-standards.ts 头部说明）。
import { useMemo, useState } from 'react';
import { Award, Info, Trophy, TriangleAlert, Link2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AGE_GROUPS,
  LIFT_GROUPS,
  LIFT_STANDARDS,
  STRENGTH_TIERS,
  TIER_UNRANKED,
  judgeStrength,
  liftDefOf,
  type Sex,
} from '@/data/strength-standards';
import { ONE_RM_FORMULAS, REPS_ACCURACY_LIMIT, estimate1rm, estimateAll, isRepsUnreliable } from '@/lib/one-rep-max';
import { loadWeightKg } from '@/lib/store';

const selectClass =
  // 原生 <select> 展开后的面板由系统渲染（浅色/白底）。如果不显式指定颜色，
  // 选项文字会继承页面的浅色前景色 → 变成"白底白字"完全看不见。
  // 这里给选项强制白底黑字；收起状态则压暗底色配白字，保证两种状态都清晰。
  'h-9 w-full rounded-lg border border-white/15 bg-black/45 px-3 text-sm font-medium text-white outline-none transition-colors focus:border-primary/60 ' +
  '[&>option]:bg-white [&>option]:text-black [&>optgroup]:bg-neutral-100 [&>optgroup]:text-black [&>optgroup]:font-semibold';

export default function StrengthStandardPage() {
  const [sex, setSex] = useState<Sex>('male');
  const [ageId, setAgeId] = useState('24-39');
  // 体重预填：读身体数据页已存的体重，省去重复输入
  const [bodyweight, setBodyweight] = useState(() => {
    const w = loadWeightKg();
    return w > 0 ? String(w) : '70';
  });
  const [liftKey, setLiftKey] = useState('bench');
  const [mode, setMode] = useState<'reps' | 'direct'>('reps');
  const [weight, setWeight] = useState('60');
  const [reps, setReps] = useState('5');
  const [oneRmDirect, setOneRmDirect] = useState('80');

  const def = useMemo(() => liftDefOf(liftKey) ?? LIFT_STANDARDS[0], [liftKey]);
  const age = useMemo(() => AGE_GROUPS.find((a) => a.id === ageId) ?? AGE_GROUPS[2], [ageId]);

  const bwNum = parseFloat(bodyweight) || 0;
  const wNum = parseFloat(weight) || 0;
  const rNum = parseFloat(reps) || 0;

  const oneRm = mode === 'reps' ? estimate1rm(wNum, rNum) : parseFloat(oneRmDirect) || 0;
  const formulas = mode === 'reps' ? estimateAll(wNum, rNum) : null;
  const result = judgeStrength(def, sex, age.factor, bwNum, oneRm);
  const repsWarn = mode === 'reps' && isRepsUnreliable(rNum);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="flex items-center gap-2 font-display text-3xl font-extrabold tracking-wide text-foreground">
          <Trophy className="h-7 w-7 text-primary" />
          力量等级计算器
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          选性别、年龄与体重，挑一个动作，填你能做的重量和次数（或直接填已知 1RM），
          就算出你的力量处在哪个档位——从「入门 ★」到「精英 ★★★★★」共五档，
          并告诉你离下一档还差多少公斤。
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        {/* ── 输入区 ── */}
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-lg">你的数据</CardTitle>
            <CardDescription>体重会自动读取身体数据页的记录，可临时改。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">性别</label>
              <div className="flex gap-2">
                {(['male', 'female'] as Sex[]).map((s) => (
                  <Button
                    key={s}
                    type="button"
                    variant={sex === s ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSex(s)}
                    className="flex-1"
                  >
                    {s === 'male' ? '男' : '女'}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="ss-age" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  年龄
                </label>
                <select
                  id="ss-age"
                  value={ageId}
                  onChange={(e) => setAgeId(e.target.value)}
                  className={selectClass}
                >
                  {AGE_GROUPS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="ss-bw" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  体重（kg）
                </label>
                <Input
                  id="ss-bw"
                  type="number"
                  min={25}
                  max={250}
                  value={bodyweight}
                  onChange={(e) => setBodyweight(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="ss-lift" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                训练动作（共 {LIFT_STANDARDS.length} 项）
              </label>
              <select id="ss-lift" value={liftKey} onChange={(e) => setLiftKey(e.target.value)} className={selectClass}>
                {LIFT_GROUPS.map((g) => (
                  <optgroup key={g.id} label={g.label}>
                    {LIFT_STANDARDS.filter((l) => l.group === g.id).map((l) => (
                      <option key={l.key} value={l.key}>
                        {l.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {def.note && <p className="mt-1.5 text-[11px] text-muted-foreground">{def.note}</p>}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant={mode === 'reps' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('reps')}
                className="flex-1"
              >
                按重量 × 次数
              </Button>
              <Button
                type="button"
                variant={mode === 'direct' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('direct')}
                className="flex-1"
              >
                直接填 1RM
              </Button>
            </div>

            {mode === 'reps' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="ss-w" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    重量（kg）
                  </label>
                  <Input id="ss-w" type="number" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="ss-r" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    重复次数
                  </label>
                  <Input id="ss-r" type="number" min={1} max={36} value={reps} onChange={(e) => setReps(e.target.value)} />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="ss-1rm" className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  已知 1RM（kg）
                </label>
                <Input
                  id="ss-1rm"
                  type="number"
                  min={0}
                  value={oneRmDirect}
                  onChange={(e) => setOneRmDirect(e.target.value)}
                />
              </div>
            )}

            {repsWarn && (
              <p className="flex items-start gap-1.5 rounded-md border border-warning/50 bg-warning/5 px-2.5 py-2 text-[11px] leading-relaxed text-warning">
                <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                次数超过 {REPS_ACCURACY_LIMIT} 次后，1RM 公式误差会快速放大。想算准，最好用 1–8 次能做到力竭的重量。
              </p>
            )}
          </CardContent>
        </Card>

        {/* ── 结果区 ── */}
        <div className="space-y-6">
          <Card className="border-primary/30 bg-primary/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-primary" />
                {def.label} · 你的等级
              </CardTitle>
              <CardDescription>
                {sex === 'male' ? '男' : '女'} · {age.label} · 体重 {bwNum || '—'} kg
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!result ? (
                <p className="text-sm text-muted-foreground">填完体重与重量就能出结果。</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-end gap-3">
                    <span className="font-display text-4xl font-extrabold text-primary">{result.label}</span>
                    <span className="text-2xl tracking-widest text-primary/90">{result.stars || '—'}</span>
                    <Badge variant="secondary" className="mb-1">
                      1RM ≈ {oneRm} kg
                    </Badge>
                    <Badge variant="outline" className="mb-1">
                      {result.ratio} × 体重
                    </Badge>
                  </div>

                  <div>
                    <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>
                        {result.tier === 0 ? `${TIER_UNRANKED} → ${STRENGTH_TIERS[0].label}` : `${result.label} → ${result.nextLabel ?? '已封顶'}`}
                      </span>
                      <span>{result.withinPct}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${result.withinPct}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {result.gapKg != null && result.nextLabel
                        ? `再 +${result.gapKg} kg（${def.label} 1RM）进入「${result.nextLabel}」`
                        : '已达最高档，剩下的对手只有自己。'}
                    </p>
                  </div>

                  {formulas && (
                    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                      <p className="mb-1 text-[11px] font-medium text-muted-foreground">三个公式对照（判级统一用 Epley）</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                        {ONE_RM_FORMULAS.map((f) => (
                          <span key={f.id}>
                            {f.label}：<b className="text-foreground">{formulas[f.id]}</b> kg
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg">五档对照表</CardTitle>
              <CardDescription>
                按你当前的性别、年龄与体重，{def.label} 各档位需要的 1RM（kg）。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-xs text-muted-foreground">
                      <th className="py-2 pr-4">档位</th>
                      <th className="py-2 pr-4">需要 1RM</th>
                      <th className="py-2">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result?.rows.map((row) => (
                      <tr
                        key={row.label}
                        className={`border-b border-white/5 ${row.current ? 'bg-primary/10' : ''}`}
                      >
                        <td className="py-2 pr-4">
                          <span className={row.current ? 'font-semibold text-primary' : 'text-foreground'}>
                            {row.label}
                          </span>{' '}
                          <span className="text-primary/80">{row.stars}</span>
                        </td>
                        <td className="py-2 pr-4 text-foreground">{row.kg} kg</td>
                        <td className="py-2 text-xs">
                          {row.current ? (
                            <span className="text-primary">当前档位</span>
                          ) : row.passed ? (
                            <span className="text-emerald-400">已达成</span>
                          ) : (
                            <span className="text-muted-foreground">还差 {Math.max(0, Math.round((row.kg - oneRm) * 10) / 10)} kg</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {!result && (
                      <tr>
                        <td colSpan={3} className="py-3 text-xs text-muted-foreground">
                          填完数据后显示。
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── 口径与来源 ── */}
      <Card className="border-white/10 bg-card/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4 text-primary" />
            档位怎么来的、哪些是估算
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-[11px] leading-relaxed text-muted-foreground">
          <p>
            <b className="text-foreground">原始表：</b>
            深蹲 / 卧推 / 硬拉 / 站姿推举 / 杠铃弯举这 5 项沿用本站既有档位（出处：fitnesscalcs.com
            《How Strong Should You Be?》Bodyweight Ratio Standards）。
          </p>
          <p>
            <b className="text-foreground">折算项：</b>
            其余 {LIFT_STANDARDS.length - 5} 项动作没有同等公信力的公开原始表，本站以上述核心动作为锚点，
            按部位相对强度折算五档门槛（如前蹲 ≈ 深蹲 0.85、上斜卧推 ≈ 卧推 0.85），属估算值。
          </p>
          <p>
            <b className="text-foreground">折算项：</b>
            女性档位由男性档位按部位系数折算（下肢 0.72 / 上肢与肩臂 0.60 / 举重 0.65 / 自重负重 0.55 /
            固定器械 0.68）；年龄按门槛放宽系数递减（40 岁后 0.95 → 0.70）。同为估算。
          </p>
          <p>
            <b className="text-foreground">折算项：</b>
            1RM 由 Epley 公式「重量 ×（1 + 次数 ÷ 30）」估算，不是实测极限；次数越多偏差越大，
            建议用 1–8 次做到力竭的重量。
          </p>
          <p>
            <b className="text-foreground">不是：</b>
            这不是任何比赛的分级标准，也不构成训练或医疗建议。数值只用于给自己找个参照，
            别为了追档位去冲超出能力范围的重量。
          </p>
          <p className="flex items-center gap-1.5 pt-1">
            <Link2 className="h-3.5 w-3.5" />
            本模块随雄性意志以 <b className="text-foreground">Apache-2.0</b> 免费开源，可自由使用、修改与商用
            （须保留署名与许可证）。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
