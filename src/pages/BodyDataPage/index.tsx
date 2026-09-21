import { useMemo, useState } from 'react';
import { Activity, Dumbbell, Flame, HeartPulse, Scale, ShieldAlert, Swords, TrendingUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import InputPanel from './sections/InputPanel';
import { GOALS } from '@/data/goals';
import { DIETS } from '@/data/diets';
import { loadBodyProfile, saveBodyProfile, loadGoalId, loadDietId, type BodyProfile } from '@/lib/store';
import {
  ACTIVITY_FACTORS,
  GOAL_PROTEIN,
  LEVEL_LABEL,
  PHASE_LABEL,
  REP_PCT,
  STRENGTH_LEVEL_LABEL,
  BENCH_RM_ROWS,
  FEMALE_STRENGTH_TABLE,
  MALE_STRENGTH_TABLE,
  WEAPON_ROWS,
  aragonGain,
  builtLeanLbmMax,
  calcBmr,
  calcLbm,
  calcProtein,
  caseyButtLbmMax,
  estimateOneRm,
  ffmiLbmMax,
  martinBerkhamWeightMax,
  matchWeightBand,
  plannedWeights,
  round0,
  round1,
  tdee,
  tefPct,
  type Phase,
  type StrengthRow,
  type TrainLevel,
} from '@/lib/body-math';

export default function BodyDataPage() {
  const [profile, setProfile] = useState<BodyProfile>(loadBodyProfile);
  const [rmReps, setRmReps] = useState('5');
  const [rmWeight, setRmWeight] = useState('');
  const [weaponId, setWeaponId] = useState('kendo');
  const [weaponMin, setWeaponMin] = useState('30');

  const oneRm = useMemo(() => {
    const w = parseFloat(rmWeight);
    const reps = Number(rmReps);
    if (!Number.isFinite(w) || w <= 0 || !REP_PCT[reps]) return 0;
    return estimateOneRm(w, reps);
  }, [rmReps, rmWeight]);

  const patch = (p: Partial<BodyProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...p };
      saveBodyProfile(next);
      return next;
    });
  };

  const d = useMemo(() => {
    const weight = parseFloat(profile.weightKg);
    const height = parseFloat(profile.heightCm);
    const fat = parseFloat(profile.bodyFatPct);
    const age = parseFloat(profile.age);
    const wrist = parseFloat(profile.wristCm);
    const ankle = parseFloat(profile.ankleCm);
    const sex = profile.sex;
    const level = profile.level as TrainLevel;
    const phase = profile.phase as Phase;
    const activity = ACTIVITY_FACTORS.find((a) => a.id === profile.activity)?.value ?? 1.55;

    const hasCore = Number.isFinite(weight) && weight > 0 && Number.isFinite(height) && height > 0 && Number.isFinite(fat) && fat >= 0 && fat < 100;
    const hasAge = Number.isFinite(age) && age > 0;

    const lbm = hasCore ? calcLbm(weight, fat) : 0;
    const protein = hasCore ? calcProtein(lbm, phase) : null;
    const goal = GOALS.find((g) => g.id === loadGoalId());
    const diet = DIETS.find((dd) => dd.id === loadDietId());
    const goalAdvice = goal ? GOAL_PROTEIN[goal.id] : null;

    const ffmi = hasCore ? ffmiLbmMax(sex, height) : 0;
    const casey = hasCore ? caseyButtLbmMax(height, wrist, ankle) : null;
    const builtLean = hasCore ? builtLeanLbmMax(height) : 0;
    const martin = hasCore ? martinBerkhamWeightMax(height) : 0;

    const bmr = hasCore && hasAge
      ? calcBmr({ sex, age, heightCm: height, weightKg: weight, lbmKg: lbm })
      : null;
    const recommendedBmr = bmr ? bmr.katch : 0;
    const tdeeVal = bmr ? tdee(recommendedBmr, activity) : 0;

    // 食物热效应：有饮食方案按宏量加权，没设就按用户说的兜底 10%
    const tefVal = diet ? tefPct(diet.macro) : 10;
    const tdeeWithTef = tdeeVal * (1 + tefVal / 100);

    const gain = hasCore ? aragonGain(weight, level) : null;

    return {
      weight,
      height,
      fat,
      hasCore,
      hasAge,
      lbm,
      protein,
      goal,
      diet,
      goalAdvice,
      ffmi,
      casey,
      builtLean,
      martin,
      bmr,
      recommendedBmr,
      tdeeVal,
      tefVal,
      tdeeWithTef,
      activityLabel: ACTIVITY_FACTORS.find((a) => a.id === profile.activity)?.label ?? '',
      activityFactor: activity,
      gain,
      levelLabel: LEVEL_LABEL[level],
      phaseLabel: PHASE_LABEL[phase],
      phase,
      level,
    };
  }, [profile]);

  if (!d.hasCore) {
    return (
      <div className="space-y-5">
        <Header />
        <InputPanel profile={profile} onChange={patch} />
        <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-10 text-center">
          <Scale className="h-8 w-8 text-primary/70" />
          <p className="text-sm text-muted-foreground">
            先填好体重、身高、体脂率，就会自动算出瘦体重、每日蛋白质、肌肉量上限与热量需求。
          </p>
        </div>
      </div>
    );
  }

  const proteinPerKg = d.protein ? round1(d.protein.target / d.weight) : 0;

  return (
    <div className="space-y-5">
      <Header />

      <InputPanel profile={profile} onChange={patch} />

      {/* 核心：瘦体重 + 蛋白质 */}
      <section className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-lg border border-primary/40 bg-primary/10 p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Dumbbell className="h-4 w-4 text-primary" />
            瘦体重（去脂体重）
          </p>
          <p className="mt-3 font-display text-5xl font-extrabold tracking-wide text-foreground">
            {round1(d.lbm)}
            <span className="ml-2 text-lg font-bold text-muted-foreground">kg</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {d.weight} kg ×（1 − {d.fat}% 体脂）= 瘦体重。肌肉量上限与代谢都以此为准。
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Zap className="h-4 w-4 text-primary" />
            每日蛋白质需求 · {d.phaseLabel}
          </p>
          {d.protein ? (
            <>
              <p className="mt-3 font-display text-5xl font-extrabold tracking-wide text-primary">
                {round0(d.protein.target)}
                <span className="ml-2 text-lg font-bold text-muted-foreground">g / 天</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                区间 {round0(d.protein.range[0])}–{round0(d.protein.range[1])} g
                <span className="mx-2 text-border">|</span>
                约 {proteinPerKg} g / kg 体重
                <span className="mx-2 text-border">|</span>
                基准 {d.protein.perKgLbm} g / kg 瘦体重
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {d.phase === 'cut' && '减脂期基准 = 瘦体重 × 2.3（你定的规则），保住肌肉的关键。'}
                {d.phase === 'bulk' && '增肌期基准 = 瘦体重 × 2.2，吃够才有盈余合成。'}
                {d.phase === 'maintain' && '维持期基准 = 瘦体重 × 1.8，稳住现有肌肉。'}
              </p>
            </>
          ) : null}
        </div>
      </section>

      {/* 目标与饮食联动 */}
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">当前训练目标</p>
          {d.goal ? (
            <>
              <p className="mt-1 font-display text-lg font-bold tracking-wide text-foreground">{d.goal.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                蛋白质偏好 {d.goalAdvice?.kg} g/kg 体重。{d.goalAdvice?.note}
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              尚未设定，去「目标设定」页选择后会在此联动。
            </p>
          )}
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">当前饮食方案</p>
          {d.diet ? (
            <>
              <p className="mt-1 font-display text-lg font-bold tracking-wide text-foreground">{d.diet.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {d.diet.id === 'keto'
                  ? '生酮碳水极低：蛋白质建议按区间上限吃（多出的部分替代碳水供能）。'
                  : d.diet.id === 'carb-cycle'
                    ? '碳循环蛋白质恒定不降：两日的蛋白质需求按同一天算。'
                    : '该方案蛋白质比例适中，按上方基准吃即可，训练日可略偏上限。'}
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">
              尚未设定，去「目标设定」页选择后会在此联动。
            </p>
          )}
        </div>
      </section>

      {/* 肌肉量上限 */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <TrendingUp className="h-4 w-4 text-primary" />
          自然健身肌肉量上限（5 个公式对照）
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>公式</TableHead>
              <TableHead>口径</TableHead>
              <TableHead className="text-right">上限</TableHead>
              <TableHead className="text-right">距当前瘦体重</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-foreground">FFMI 上限（男 25 / 女 21）</TableCell>
              <TableCell className="text-muted-foreground">瘦体重</TableCell>
              <TableCell className="text-right font-semibold text-foreground">{round1(d.ffmi)} kg</TableCell>
              <TableCell className="text-right text-muted-foreground">{gapText(d.ffmi - d.lbm)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">Casey Butt 骨架模型</TableCell>
              <TableCell className="text-muted-foreground">瘦体重（约 5% 体脂）</TableCell>
              <TableCell className="text-right font-semibold text-foreground">
                {d.casey ? `${round1(d.casey)} kg` : '填手腕+脚踝围'}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">
                {d.casey ? gapText(d.casey - d.lbm) : '—'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">BuiltLean</TableCell>
              <TableCell className="text-muted-foreground">瘦体重</TableCell>
              <TableCell className="text-right font-semibold text-foreground">{round1(d.builtLean)} kg</TableCell>
              <TableCell className="text-right text-muted-foreground">{gapText(d.builtLean - d.lbm)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-foreground">Martin Berkham</TableCell>
              <TableCell className="text-muted-foreground">总体重（约 5–6% 体脂）</TableCell>
              <TableCell className="text-right font-semibold text-foreground">{round1(d.martin)} kg</TableCell>
              <TableCell className="text-right text-muted-foreground">—</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-xs leading-relaxed text-muted-foreground">
          上限是"自然、无药物"的统计边界，个体骨架差异 ±10–15%。距离当前瘦体重的数值为正 = 还有增长空间。
        </p>
      </section>

      {/* BMR */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <HeartPulse className="h-4 w-4 text-primary" />
          基础代谢 BMR（6 个公式对照）
        </p>
        {d.bmr ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>公式</TableHead>
                  <TableHead className="text-right">kcal / 天</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-foreground">Mifflin-St Jeor</TableCell>
                  <TableCell className="text-right text-muted-foreground">{round0(d.bmr.mifflin)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-foreground">Harris-Benedict（修订版）</TableCell>
                  <TableCell className="text-right text-muted-foreground">{round0(d.bmr.harris)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-foreground">
                    Katch-McArdle
                    <Badge variant="outline" className="ml-2 border-primary/50 text-primary">推荐</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-foreground">{round0(d.bmr.katch)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-foreground">
                    Cunningham
                    <Badge variant="outline" className="ml-2 border-primary/50 text-primary">推荐</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-foreground">{round0(d.bmr.cunningham)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-foreground">FAO / WHO / UNU（按年龄段）</TableCell>
                  <TableCell className="text-right text-muted-foreground">{round0(d.bmr.fao)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-foreground">Owen 简易式</TableCell>
                  <TableCell className="text-right text-muted-foreground">{round0(d.bmr.owen)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs leading-relaxed text-muted-foreground">
              自然健身者优先看 Katch-McArdle 与 Cunningham——它们基于瘦体重，更贴近真实肌肉量。
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">填上年龄后即可计算 6 种 BMR。</p>
        )}
      </section>

      {/* TDEE */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Activity className="h-4 w-4 text-primary" />
            每日总消耗 TDEE
          </p>
          {d.bmr ? (
            <>
              <p className="mt-2 font-display text-4xl font-extrabold tracking-wide text-foreground">
                {round0(d.tdeeVal)}
                <span className="ml-2 text-base font-bold text-muted-foreground">kcal / 天</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                推荐 BMR（Katch）× 活动系数 {d.activityFactor}（{d.activityLabel}）
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">BMR 计算后自动得出。</p>
          )}
        </div>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <ShieldAlert className="h-4 w-4 text-primary" />
            {d.phaseLabel}热量目标
          </p>
          {d.bmr ? (
            <>
              <p className="mt-2 font-display text-3xl font-extrabold tracking-wide text-primary">
                {d.phase === 'maintain'
                  ? round0(d.tdeeVal)
                  : d.phase === 'bulk'
                    ? `${round0(d.tdeeVal + 300)}–${round0(d.tdeeVal + 500)}`
                    : `${round0(d.tdeeVal - 500)}–${round0(d.tdeeVal - 300)}`}
                <span className="ml-2 text-base font-bold text-muted-foreground">kcal / 天</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {d.phase === 'bulk' && '增肌：TDEE +300~500 kcal，配合蛋白质基准。'}
                {d.phase === 'cut' && '减脂：TDEE −300~500 kcal，蛋白质不减反升（瘦体重 × 2.3）。'}
                {d.phase === 'maintain' && '维持：吃回 TDEE，蛋白质按维持基准。'}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">BMR 计算后自动得出。</p>
          )}
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Flame className="h-4 w-4 text-primary" />
            食物热效应 TEF
          </p>
          {d.bmr ? (
            <>
              <p className="mt-2 font-display text-3xl font-extrabold tracking-wide text-foreground">
                {round0(d.tdeeWithTef)}
                <span className="ml-2 text-base font-bold text-muted-foreground">kcal / 天</span>
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                含食物热效应后。当前方案「{d.diet ? d.diet.name : '通用'}」加权 ≈ {round1(d.tefVal)}%
                {!d.diet && '（未设饮食，按 10% 通用估）'}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                蛋白 20–25% · 碳水 5–10% · 脂肪 1–5%；不想细算就按 10% 直接加。
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">BMR 计算后自动得出。</p>
          )}
        </div>
      </section>

      {/* 冷兵器训练消耗 */}
      <section className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Swords className="h-4 w-4 text-primary" />
            冷兵器 / 剑道训练消耗速查
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            选武器 + 时长，按你当前体重自动折算。剑道基准 270 kcal/h；唐刀 / 武士刀 / 苗刀 / 长枪 200–600 kcal/h；重兵器按重量上浮。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="weapon" className="text-sm">武器 / 项目</Label>
            <NativeSelect
              id="weapon"
              value={weaponId}
              onChange={(e) => setWeaponId(e.target.value)}
            >
              {WEAPON_ROWS.map((w) => (
                <NativeSelectOption key={w.id} value={w.id}>
                  {w.name}（{w.range[0]}–{w.range[1]} kcal/h）
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <Label htmlFor="weapon-min" className="text-sm mt-2 block">时长（分钟）</Label>
            <Input
              id="weapon-min"
              type="number"
              min={0}
              value={weaponMin}
              onChange={(e) => setWeaponMin(e.target.value)}
            />
          </div>
          <WeaponResult
            weaponId={weaponId}
            minutes={weaponMin}
            weightKg={d.weight}
          />
        </div>
      </section>
      {/* 1RM 筋力换算 */}
      <section className="space-y-4 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Dumbbell className="h-4 w-4 text-primary" />
            1RM 最大筋力换算
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            输入你能标准做完某重量的次数与重量，反推最大单次重量；再列出各次数的建议训练重量。
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="rm-reps" className="text-sm">完成次数</Label>
            <NativeSelect
              id="rm-reps"
              className="mt-1.5 w-full"
              value={rmReps}
              onChange={(e) => setRmReps(e.target.value)}
            >
              {Object.keys(REP_PCT).map((n) => (
                <NativeSelectOption key={n} value={n}>
                  {n}RM（占 1RM 的 {Math.round(REP_PCT[Number(n)] * 100)}%）
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div>
            <Label htmlFor="rm-weight" className="text-sm">完成重量</Label>
            <div className="relative mt-1.5">
              <Input
                id="rm-weight"
                type="number"
                min={0}
                step="any"
                placeholder="如 100"
                value={rmWeight}
                onChange={(e) => setRmWeight(e.target.value)}
                className="pr-10"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                kg
              </span>
            </div>
          </div>
        </div>
        {oneRm > 0 ? (
          <>
            <p className="font-display text-3xl font-extrabold tracking-wide text-primary">
              估算 1RM：{round0(oneRm)} kg
            </p>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>次数</TableHead>
                    <TableHead className="text-right">占 1RM</TableHead>
                    <TableHead className="text-right">建议重量</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plannedWeights(oneRm).map((row) => (
                    <TableRow key={row.reps}>
                      <TableCell className="font-medium text-foreground">{row.reps}RM</TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {Math.round(row.pct * 100)}%
                      </TableCell>
                      <TableCell className="text-right font-semibold text-foreground">
                        {round1(row.weight)} kg
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              1–5 次（85% 以上 1RM）= 神经募集 / 最大力量训练：3–5 组、组间休息 2–3
              分钟，放在训练最开头、精力最充沛时做；动作质量永远优先于重量。
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">填上完成重量后自动估算 1RM。</p>
        )}
      </section>

      {/* 力量等级对照表（IPF） */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Dumbbell className="h-4 w-4 text-primary" />
            力量等级对照表（IPF 系数 · {profile.sex === 'male' ? '男性' : '女性'}）
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            按你当前体重段高亮。数字为「该项 / 体重」的倍数；三项总重 = 深蹲 + 卧推 + 硬拉。
          </p>
        </div>
        <StrengthTable
          rows={profile.sex === 'male' ? MALE_STRENGTH_TABLE : FEMALE_STRENGTH_TABLE}
          activeBand={d.hasCore ? matchWeightBand(profile.sex, d.weight) : null}
          bodyWeight={d.weight}
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          未训练 = 基本没进过健身房；初学者 = 规律训练半年到一年；中级 = 2–3 年规律训练；高级 = 4–6 年；精英级 ≈ 业余赛水平；大师级以上接近竞技。
        </p>
      </section>

      {/* 卧推 1–10RM 查表 */}
      <section className="space-y-3 rounded-lg border border-border bg-card p-4 sm:p-5">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Dumbbell className="h-4 w-4 text-primary" />
            卧推 1–10RM 重量查表
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            第一列是你预估的 1RM；横向是不同次数下建议使用的重量。上方估算出 1RM 后会自动高亮对应行。
          </p>
        </div>
        <BenchRmTable highlightOneRm={oneRm} />
        <p className="text-xs leading-relaxed text-muted-foreground">
          原表个别印刷误差（如 40kg × 9次、180kg × 5次、200kg × 7次、220kg 行）已按相邻行规律修正；实际训练以动作标准为先。
        </p>
      </section>

      {/* 增肌速率 */}
      {d.gain && (
        <section className="rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <TrendingUp className="h-4 w-4 text-primary" />
            增肌速率预测（Alan Aragon · {d.levelLabel}）
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            按你 {d.weight} kg 的体重，每月合理增长约
            <b className="mx-1 font-semibold text-foreground">
              {round1(d.gain[0])}–{round1(d.gain[1])} kg
            </b>
            （{d.levelLabel}为体重的{' '}
            {d.level === 'beginner' ? '1–1.5%' : d.level === 'intermediate' ? '0.5–1%' : '0.25–0.5%'}）。
            超过太多大概率是脂肪或水分，别高兴太早。
          </p>
        </section>
      )}

      <p className="rounded-md border border-border bg-muted/40 p-3 text-xs leading-relaxed text-muted-foreground">
        以上均为估算模型，误差常见 ±10–15%。自然训练、无药物前提；骨骼、激素与训练年限都会让个体偏离均值。数据只存在当前浏览器本地。
      </p>
    </div>
  );
}

function Header() {
  return (
    <header>
      <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-primary">Body Data</p>
      <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">身体数据公式库</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        填入身体数据，自动计算瘦体重、每日蛋白质、肌肉量上限、基础代谢与热量目标。
      </p>
    </header>
  );
}

function gapText(kg: number): string {
  if (kg > 0) return `还可增长 ${round1(kg)} kg`;
  if (kg < 0) return `已超上限 ${round1(Math.abs(kg))} kg`;
  return '正好在上限';
}

function StrengthTable({
  rows,
  activeBand,
  bodyWeight,
}: {
  rows: StrengthRow[];
  activeBand: string | null;
  bodyWeight: number;
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>体重段</TableHead>
            <TableHead>等级</TableHead>
            <TableHead className="text-right">三项总重</TableHead>
            <TableHead className="text-right">深蹲</TableHead>
            <TableHead className="text-right">卧推</TableHead>
            <TableHead className="text-right">硬拉</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => {
            const active = r.weightBand === activeBand;
            return (
              <TableRow key={`${r.weightBand}-${r.level}`} className={active ? 'bg-primary/10' : ''}>
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {r.weightBand}
                  {active && <span className="ml-1.5 text-[10px] uppercase tracking-wider text-primary">你</span>}
                </TableCell>
                <TableCell className="font-medium text-foreground">{STRENGTH_LEVEL_LABEL[r.level]}</TableCell>
                <TableCell className="text-right text-muted-foreground">× {r.total.toFixed(2)}</TableCell>
                <TableCell className="text-right text-muted-foreground">× {r.squat.toFixed(2)}</TableCell>
                <TableCell className="text-right text-muted-foreground">× {r.bench.toFixed(2)}</TableCell>
                <TableCell className="text-right text-muted-foreground">× {r.deadlift.toFixed(2)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {activeBand && bodyWeight > 0 && (
        <p className="mt-2 text-xs text-muted-foreground">
          你当前体重 {bodyWeight} kg，落在「{activeBand}」档。把深蹲 / 卧推 / 硬拉的最好成绩除体重，对照上表即可知道自己处于哪个等级。
        </p>
      )}
    </div>
  );
}

function BenchRmTable({ highlightOneRm }: { highlightOneRm: number }) {
  const nearest = BENCH_RM_ROWS.reduce((best, row) =>
    highlightOneRm > 0 && Math.abs(row.oneRm - highlightOneRm) < Math.abs(best.oneRm - highlightOneRm)
      ? row
      : best,
  );
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">1RM</TableHead>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <TableHead key={n} className="text-right">{n}次</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {BENCH_RM_ROWS.map((row) => (
            <TableRow key={row.oneRm} className={row.oneRm === nearest.oneRm && highlightOneRm > 0 ? 'bg-primary/10' : ''}>
              <TableCell className="whitespace-nowrap font-medium text-foreground">
                {row.oneRm} kg
                {row.oneRm === nearest.oneRm && highlightOneRm > 0 && (
                  <span className="ml-1.5 text-[10px] uppercase tracking-wider text-primary">你</span>
                )}
              </TableCell>
              {row.reps.map((w, i) => (
                <TableCell key={i} className="text-right text-muted-foreground">{w}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


function WeaponResult({ weaponId, minutes, weightKg }: { weaponId: string; minutes: string; weightKg: number }) {
  const w = WEAPON_ROWS.find((x) => x.id === weaponId);
  const min = parseFloat(minutes);
  if (!w || !Number.isFinite(min) || min <= 0) {
    return (
      <div className="flex items-center justify-center rounded-md border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
        输入时长后自动算消耗。
      </div>
    );
  }
  // 按 70kg 参考体重缩放
  const scale = weightKg > 0 ? weightKg / 70 : 1;
  const low = Math.round(w.range[0] * scale * (min / 60));
  const high = Math.round(w.range[1] * scale * (min / 60));
  return (
    <div className="space-y-2 rounded-md border border-border bg-muted/40 p-4">
      <p className="text-sm text-muted-foreground">{w.name}</p>
      <p className="font-display text-3xl font-extrabold tracking-wide text-foreground">
        {low}–{high}
        <span className="ml-2 text-base font-bold text-muted-foreground">kcal</span>
      </p>
      <p className="text-xs text-muted-foreground">
        {min} 分钟 · 按你 {weightKg > 0 ? (weightKg + " kg") : "70 kg 参考"} 体重折算。
      </p>
      {w.note && <p className="text-xs leading-relaxed text-muted-foreground">{w.note}</p>}
    </div>
  );
}
