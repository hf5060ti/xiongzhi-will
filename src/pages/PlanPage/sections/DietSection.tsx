import { Info, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import type { IDiet } from '@/data/diets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DietSectionProps {
  diet: IDiet;
  weightKg: number;
}

const MACRO_META = [
  { key: 'carb', label: '碳水', className: 'bg-chart-1' },
  { key: 'protein', label: '蛋白质', className: 'bg-chart-2' },
  { key: 'fat', label: '脂肪', className: 'bg-chart-3' },
] as const;

export default function DietSection({ diet, weightKg }: DietSectionProps) {
  const hasWeight = weightKg > 0;
  const kcal = (ratio: number) => Math.round(weightKg * ratio);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
          <Sparkles className="h-6 w-6" strokeWidth={1.8} />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-display text-3xl font-extrabold tracking-wide text-foreground">
              {diet.name}
            </h2>
            <Badge variant="outline" className="uppercase tracking-wider">
              {diet.en}
            </Badge>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{diet.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">宏量营养占比</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
              {MACRO_META.map((m) => (
                <span
                  key={m.key}
                  className={m.className}
                  style={{ width: `${diet.macro[m.key]}%` }}
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {MACRO_META.map((m) => (
                <div key={m.key} className="rounded-md border border-border bg-muted/40 p-1.5 text-center sm:p-2.5">
                  <p className="font-display text-base font-bold leading-none text-foreground sm:text-2xl">
                    {diet.macro[m.key]}%
                  </p>
                  <p className="mt-1 flex flex-col items-center justify-center gap-0.5 text-[10px] text-muted-foreground sm:flex-row sm:gap-1.5 sm:text-xs">
                    <span className={cn('h-2 w-2 rounded-full', m.className)} />
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">每日热量参考</CardTitle>
            <CardDescription>按当前体重估算，单位 kcal/天</CardDescription>
          </CardHeader>
          <CardContent>
            {hasWeight ? (
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <div className="rounded-md border border-border bg-muted/40 p-1.5 text-center sm:p-2.5">
                  <p className="font-display text-base font-bold leading-none text-primary sm:text-xl">~{kcal(35)}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">增肌</p>
                </div>
                <div className="rounded-md border border-border bg-muted/40 p-1.5 text-center sm:p-2.5">
                  <p className="font-display text-base font-bold leading-none text-foreground sm:text-xl">~{kcal(30)}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">维持</p>
                </div>
                <div className="rounded-md border border-border bg-muted/40 p-1.5 text-center sm:p-2.5">
                  <p className="font-display text-base font-bold leading-none text-foreground sm:text-xl">~{kcal(25)}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">减脂</p>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-muted-foreground">
                返回首页填写当前体重后，这里会自动给出按你体重的热量参考。
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">核心原则</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {diet.principle.map((p) => (
              <li key={p} className="flex gap-2 text-sm leading-relaxed text-foreground/85">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {p}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ThumbsUp className="h-4 w-4 text-primary" />
            推荐
          </p>
          <ul className="mt-2 space-y-1.5">
            {diet.good.map((f) => (
              <li key={f} className="text-sm text-muted-foreground">
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <ThumbsDown className="h-4 w-4 text-primary" />
            尽量避免
          </p>
          <ul className="mt-2 space-y-1.5">
            {diet.avoid.map((f) => (
              <li key={f} className="text-sm text-muted-foreground">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-warning/40 bg-warning/10 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Info className="h-4 w-4 text-warning" />
          嘌呤提示
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{diet.purineNote}</p>
      </div>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          维生素吸收优化
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{diet.absorbNote}</p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          通用原则：脂溶性维生素（A / D / E / K，常见于胡萝卜、菠菜、蛋黄、坚果、深海鱼）需要脂肪同餐帮助吸收，同餐搭配 1–2g
          油脂即可；水溶性维生素（B 族 / C，常见于紫包菜、柑橘、全谷物）随水排出，保证饮水、避免长时间水煮。
        </p>
      </div>

      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">适合人群：</span>
        {diet.suited}
      </p>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          通用饮食法则 · 一周试用期
        </p>
        <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            不管你选的是哪一套饮食方案，<b className="text-foreground">底层都是这几条</b>：
            <b className="text-foreground">多吃肉、蛋、奶</b>（蛋白质优先）、
            <b className="text-foreground">多吃蔬菜</b>（纤维 + 维生素 + 植物活性成分）、
            <b className="text-foreground">脂肪、碳水适度</b>（按上面的宏量比例分配）。
          </p>
          <p>
            每个人的消化系统、胰岛素敏感度、训练量、基因都不一样，
            <b className="text-foreground">没有一套比例适合所有人</b>。
            按当前方案执行 <b className="text-foreground">一整周</b>作为试用期：
          </p>
          <ul className="space-y-1.5 pl-1">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <b className="text-foreground">满意就不换</b>：体重稳、训练有劲、睡眠正常、视觉上肌肉在长——继续这套，别折腾。
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <b className="text-foreground">不满意再调</b>：体重掉太快（每周超过 1kg）或训练没劲，加 100–200 kcal 碳水；
                体重不掉 / 视觉上脂肪在涨，减 100–200 kcal 碳水。每次只调一个变量，再观察一周。
              </span>
            </li>
          </ul>
          <p>
            估算热量优先用本站「营养库 → 拍照营养表」对着包装拍一张、输入克数自动换算；
            如果你能把每餐精确到克，直接在「从食物库选」里搜食物、填克数，系统会自动算出当餐的热量与三大营养素。
          </p>
        </div>
      </div>
    </section>
  );
}
