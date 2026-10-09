// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
import { useMemo, useState } from 'react';
import { Calculator, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { estimate1rm } from '@/lib/one-rep-max';

/**
 * 1RM / RPE / 做组重量计算器
 * 三个公式对照：
 *  - Epley:     1RM = w × (1 + reps/30)
 *  - Brzycki:   1RM = w × 36 / (37 - reps)
 *  - Lombardi:  1RM = w × reps^0.10
 * 输入次数 > 10 时误差快速放大，页面会给出警告。
 */

// 公式实现集中在 src/lib/one-rep-max.ts（力量等级页与本站其它页面共用同一套口径）
const epley = (w: number, r: number) => estimate1rm(w, r, 'epley');
const brzycki = (w: number, r: number) => estimate1rm(w, r, 'brzycki');
const lombardi = (w: number, r: number) => estimate1rm(w, r, 'lombardi');

interface PctRow {
  pct: number;
  label: string;
  use: string;
  color: string;
}

const PCT_TABLE: PctRow[] = [
  { pct: 60, label: '60%', use: '热身 / 耐力', color: 'bg-sky-500/15 text-sky-300' },
  { pct: 70, label: '70%', use: '肌肥大基础组（8-12次）', color: 'bg-emerald-500/15 text-emerald-300' },
  { pct: 75, label: '75%', use: '肌肥大主力组（6-10次）', color: 'bg-emerald-500/15 text-emerald-300' },
  { pct: 80, label: '80%', use: '力量耐力（5-8次）', color: 'bg-amber-500/15 text-amber-300' },
  { pct: 85, label: '85%', use: '力量基础（3-5次）', color: 'bg-orange-500/15 text-orange-300' },
  { pct: 90, label: '90%', use: '神经募集 / 力量（2-3次）', color: 'bg-red-500/15 text-red-300' },
  { pct: 95, label: '95%', use: '极限测试（1-2次）', color: 'bg-red-600/20 text-red-400' },
  { pct: 100, label: '100%', use: '最大单次（谨慎）', color: 'bg-red-700/25 text-red-300' },
];

const RPE_ROWS = [
  { rpe: 10, label: 'RPE 10', note: '力竭，一次都多做不了' },
  { rpe: 9, label: 'RPE 9', note: '还能再做 1 次' },
  { rpe: 8, label: 'RPE 8', note: '还能再做 2 次（增肌常用区间）' },
  { rpe: 7, label: 'RPE 7', note: '还能再做 3 次（自然训练者主力区间）' },
  { rpe: 6, label: 'RPE 6', note: '还能再做 4 次（技术练习 / 减载）' },
];

/** 主项热身组：输入今日正式组重量，自动算递增组 */
function WarmupCalculator() {
  const [workWeight, setWorkWeight] = useState<string>('100');
  const ww = parseFloat(workWeight) || 0;

  const rows = [
    { pct: 0, reps: '10-15', label: '空杆', rest: '60 秒', note: '找动作节奏，不喘气' },
    { pct: 40, reps: '8-10', label: '40%', rest: '90 秒', note: '血液循环，激活目标肌' },
    { pct: 60, reps: '5', label: '60%', rest: '2 分钟', note: '神经募集，开始加速' },
    { pct: 80, reps: '2-3', label: '80%', rest: '2-3 分钟', note: '接近正式组，保持速度' },
    { pct: 90, reps: '1', label: '90%（可选）', rest: '3-4 分钟', note: '只有正式组 ≥85% 时才做' },
  ];

  return (
    <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          主项热身组计算器
        </CardTitle>
        <CardDescription>
          输入今日第一组正式组重量（kg），自动算递增组。方法参考谭成义力量举热身法：空杆起步，大重量前小步递增。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-w-xs">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            今日正式组重量（kg）
          </label>
          <Input
            type="number"
            inputMode="decimal"
            value={workWeight}
            onChange={(e) => setWorkWeight(e.target.value)}
            placeholder="例如 100"
            className="border-white/12 bg-white/[0.06] text-lg"
          />
        </div>
        {ww > 0 && (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {rows.map((row) => {
              const kg = row.pct === 0 ? 20 : Math.round(ww * row.pct / 100);
              return (
                <div key={row.pct} className="rounded-xl border border-border/40 bg-accent/20 p-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[11px] text-muted-foreground">{row.label}</p>
                    <p className="font-mono text-lg font-bold text-foreground">{kg} kg</p>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">{row.reps} 次 · 休 {row.rest}</p>
                  <p className="mt-1 text-[10px] leading-snug text-muted-foreground/80">{row.note}</p>
                </div>
              );
            })}
          </div>
        )}
        <p className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          重量跳法：早期跳大一点（空杆→40%→60%），越接近正式组跳越小（60%→80%→90%）。
          孤立动作（弯举、侧平举）不需要这么完整的热身链，2 组轻重量过渡即可。
          深蹲/硬拉的热身组要比卧推多 1-2 组，因为下半身神经募集更慢。
        </p>
      </CardContent>
    </Card>
  );
}

/** 谭成义+凯圣王三分化热身清单 */
function WarmupRoutineGuide() {
  const [tab, setTab] = useState<'push' | 'pull' | 'legs'>('push');
  const tabs = [
    { key: 'push' as const, label: '推日（胸/肩/三头）' },
    { key: 'pull' as const, label: '拉日（背/后束/二头）' },
    { key: 'legs' as const, label: '腿日（臀/腿）' },
  ];
  const content = {
    push: [
      { t: '胸椎灵活', d: '泡沫轴垫在肩胛骨之间，双手抱头做胸椎后伸 10 次，打开胸腔。' },
      { t: '放松上背部', d: '泡沫轴从上背到中背缓慢滚动 30 秒，找到酸痛点停住深呼吸。' },
      { t: '前锯肌激活', d: '小哑铃或弹力带做"俯卧撑PLUS"，肩胛骨前伸后缩 15 次 × 2 组。' },
      { t: '弹力带绕肩', d: '弹力带从眼前拉到脑后，保持持续张力，20 次 × 2 组。8 字绕肩各 5 次。' },
      { t: '放松二头', d: '泡沫轴竖放，二头肌压上去滚动 20 秒。推日二头也参与稳定，紧了肘展不开。' },
      { t: '目标肌激活', d: '小重量哑铃对握夹胸 15 次 × 2-3 组，做到微充血即可。' },
    ],
    pull: [
      { t: '最伟大拉伸', d: '弓步 + 胸椎旋转 + 手够脚，每侧 5 次，全身动态打开。' },
      { t: '开胸椎', d: '泡沫轴卷腹式胸椎伸展 10 次，让肩胛骨能贴住肋骨。' },
      { t: '放松大小圆肌', d: '侧卧泡沫轴，腋下到肩胛下缘缓慢滚动 30 秒，找痛点停住。' },
      { t: '弹力带肩胛激活', d: '弹力带做面拉或外旋，保持张力不借力，15 次 × 2 组。不是划船！' },
      { t: '绕肩', d: '木棍或弹力带过顶绕肩，窄握距，10 次 × 2 组。' },
      { t: '激活背阔', d: '直臂下压或弹力带背阔下拉 15 次 × 2 组，找"背阔肌先发力"的感觉。' },
    ],
    legs: [
      { t: '毛毛虫爬行', d: '站立弯腰手贴地，小步走到平板位，再小步走回站立，5 次。全身升温。' },
      { t: '最伟大拉伸', d: '弓步 + 胸椎旋转，每侧 5 次。腿日尤其要开髋。' },
      { t: '泡沫轴股四', d: '俯卧泡沫轴压大腿前侧，从髋到膝缓慢滚动 40 秒。痛点停住。' },
      { t: '腘绳肌松解', d: '坐姿或侧卧泡沫轴压大腿后侧，30 秒。' },
      { t: '髂胫束放松', d: '侧卧泡沫轴压大腿外侧，20 秒。膝盖外侧痛的多滚一会。' },
      { t: '动态青蛙趴', d: '跪姿双膝打开，身体后坐找大腿内侧牵拉，主动控制幅度，10 次。不是比柔韧性！' },
    ],
  };
  return (
    <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          谭成义 + 凯圣王三分化热身清单
        </CardTitle>
        <CardDescription>
          推/拉/腿三天各有侧重，练前 8-12 分钟完成。来源：两人抖音「焚诀」三分化跟练系列整理。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ' +
                (tab === t.key
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-accent/20 text-muted-foreground hover:text-foreground')
              }
            >
              {t.label}
            </button>
          ))}
        </div>
        <ol className="space-y-2.5">
          {content[tab].map((item, i) => (
            <li key={i} className="flex gap-2.5 rounded-lg border border-border/40 bg-accent/20 p-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-[11px] text-primary">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{item.t}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{item.d}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
          热身不是训练前的"浪费时间"，而是让目标肌在正式组第一组就进入状态。
          跳过热身直接上重量，要么动作变形，要么第一组还在找感觉——那组就白练了。
        </p>
      </CardContent>
    </Card>
  );
}

export default function ToolsPage() {
  const [weight, setWeight] = useState<string>('80');
  const [reps, setReps] = useState<string>('5');

  const w = parseFloat(weight) || 0;
  const r = Math.max(0, parseInt(reps) || 0);

  const results = useMemo(() => {
    if (w <= 0 || r <= 0 || r >= 37) return null;
    const e = epley(w, r);
    const b = brzycki(w, r);
    const l = lombardi(w, r);
    const avg = (e + b + l) / 3;
    return { e, b, l, avg };
  }, [w, r]);

  const highRepsWarning = r > 10;
  const invalid = w <= 0 || r <= 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="border-b border-border pb-4 sm:pb-5">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Strength · 力量计算器
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          1RM · RPE · 做组重量
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          用你最近一次完成的重量 × 次数，反推极限力量（1RM），再按训练目标反推该用多重做组。
          三个公式取平均，误差常见 ±5–10%；只在动作技术稳定、不借力的情况下参考。
        </p>
      </header>

      {/* 输入区 */}
      <section className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-primary" />
              输入你的实测组
            </CardTitle>
            <CardDescription>
              选一组你「动作标准、没有大幅借力」的最好成绩
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                重量（kg）
              </label>
              <Input
                type="number"
                inputMode="decimal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="例如 80"
                className="border-white/12 bg-white/[0.06] text-lg"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                完成次数（严格动作）
              </label>
              <Input
                type="number"
                inputMode="numeric"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="例如 5"
                className="border-white/12 bg-white/[0.06] text-lg"
              />
            </div>
            {highRepsWarning && !invalid && (
              <p className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                次数超过 10 次后，公式推算的 1RM 误差会明显放大。建议用 1–10 次、接近力竭但不摔的那一组。
              </p>
            )}
            {invalid && (
              <p className="rounded-lg border border-border/40 bg-accent/20 p-3 text-xs text-muted-foreground">
                输入有效重量和次数后，自动出结果。
              </p>
            )}
          </CardContent>
        </Card>

        {/* 1RM 结果 */}
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              估算 1RM（单次极限）
            </CardTitle>
            <CardDescription>三种公式对照，取平均作为参考</CardDescription>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-center">
                  <p className="text-xs text-muted-foreground">参考 1RM（三公式平均）</p>
                  <p className="mt-1 font-display text-4xl font-extrabold text-primary">
                    {results.avg.toFixed(1)}
                    <span className="ml-1 text-base font-medium text-muted-foreground">kg</span>
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg border border-border/40 bg-accent/20 p-2.5">
                    <p className="text-muted-foreground">Epley</p>
                    <p className="mt-0.5 font-mono text-base text-foreground">{results.e.toFixed(1)}</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-accent/20 p-2.5">
                    <p className="text-muted-foreground">Brzycki</p>
                    <p className="mt-0.5 font-mono text-base text-foreground">{results.b.toFixed(1)}</p>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-accent/20 p-2.5">
                    <p className="text-muted-foreground">Lombardi</p>
                    <p className="mt-0.5 font-mono text-base text-foreground">{results.l.toFixed(1)}</p>
                  </div>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  Epley 最常用，Brzycki 在低次数区间偏低，Lombardi 在高次数区间偏高；三者平均更稳。
                  这是推算值，不是真去冲 1RM。自然训练者不建议频繁测极限，技术和恢复代价都很大。
                </p>
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">输入重量和次数后显示</p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* 做组百分比表 */}
      {results && !invalid && (
        <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              按目标反推做组重量
            </CardTitle>
            <CardDescription>
              用参考 1RM = <b className="text-foreground">{results.avg.toFixed(1)} kg</b> 计算
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {PCT_TABLE.map((row) => {
                const kg = results.avg * row.pct / 100;
                return (
                  <div key={row.pct} className="rounded-xl border border-border/40 bg-accent/20 p-3">
                    <div className="flex items-center justify-between">
                      <Badge className={row.color}>{row.label}</Badge>
                      <span className="font-mono text-base font-bold text-foreground">{kg.toFixed(1)} kg</span>
                    </div>
                    <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{row.use}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              自然训练者主力增肌区间落在 70–80%、RPE 7–8；不要每周都顶到 90% 以上，恢复不过来反而掉肌肉。
              下肢（深蹲/硬拉）通常比上肢（卧推/推举）能承受更高次数和更大百分比。
            </p>
          </CardContent>
        </Card>
      )}

      {/* RPE 标尺 */}
      <Card className="border-white/10 bg-card/60 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="h-5 w-5 text-primary" />
            RPE 主观强度标尺
          </CardTitle>
          <CardDescription>
            「做完这一组，你觉得还能再做几次？」—— RPE 让你不靠精确重量也能控制强度
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {RPE_ROWS.map((row) => (
              <div key={row.rpe} className="rounded-xl border border-border/40 bg-accent/20 p-3">
                <p className="font-display text-base font-bold text-primary">{row.label}</p>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{row.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
            增肌 ≈ RPE 7–8（留 2–3 次余量）；力量 ≈ RPE 8–9；减载周 ≈ RPE 5–6。
            自然训练者几乎不需要每周都做到 RPE 10，留几次余量反而长得更久。
          </p>
        </CardContent>
      </Card>

      {/* 主项热身组计算器 */}
      <WarmupCalculator />

      {/* 谭凯三分化热身清单 */}
      <WarmupRoutineGuide />

      {/* 免责 */}
      <p className="rounded-xl border border-border/40 bg-accent/10 p-3 text-[11px] leading-relaxed text-muted-foreground">
        本计算器基于广泛使用的经验公式，仅作训练规划参考。动作技术不标准、借力、疲劳状态下测出的重量，
        推算出的 1RM 会偏高。糖尿病、心血管疾病、关节旧伤者，冲大重量前请遵从医嘱。
      </p>
    </div>
  );
}
