/**
 * 围度追踪（身体数据页板块）
 * - 按日期录入五部位围度（胸 / 腰 / 臀 / 臂 / 大腿，cm），同日重复录入覆盖旧值
 * - 未填的部位不写入（趋势图上自然断点）；历史可按日期载入修改或删除
 * - 趋势图：有 ≥2 个数据点的部位画折线；腰围卡突出「最新 vs 首次」变化（减脂期金标准）
 * 测量口径提示：早晨空腹、站立放松、软尺水平贴合不勒紧，固定同一时间测才可比。
 */
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Ruler, Save, Trash2, TrendingDown, AlarmClock, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  MEASURE_KEYS,
  MEASURE_META,
  loadMeasurements,
  removeMeasurement,
  upsertMeasurement,
  type MeasureKey,
  type MeasurementEntry,
} from '@/lib/store';

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function fmtDate(iso: string): string {
  return `${Number(iso.slice(5, 7))}/${Number(iso.slice(8, 10))}`;
}

type Draft = Record<MeasureKey, string>;

const emptyDraft = (): Draft => ({ chest: '', waist: '', hip: '', arm: '', thigh: '' });

export default function MeasurementTracker() {
  const [entries, setEntries] = useState<MeasurementEntry[]>(loadMeasurements);
  const [date, setDate] = useState(todayStr());
  const [draft, setDraft] = useState<Draft>(emptyDraft);

  /** 各部位最新值：做输入框 placeholder 与「较上次」对照 */
  const latestOf = useMemo(() => {
    const out: Partial<Record<MeasureKey, MeasurementEntry['values'][MeasureKey]>> = {};
    for (const e of entries) {
      for (const k of MEASURE_KEYS) {
        if (e.values[k] != null) out[k] = e.values[k];
      }
    }
    return out;
  }, [entries]);

  const save = () => {
    if (!date) return toast.error('请选择日期');
    const values: Partial<Record<MeasureKey, number>> = {};
    for (const k of MEASURE_KEYS) {
      const raw = draft[k].trim();
      if (raw === '') continue;
      const n = Number(raw);
      if (!Number.isFinite(n) || n <= 0 || n >= 300) {
        return toast.error(`「${MEASURE_META[k].label}」请填 0–300 cm 之间的数值`);
      }
      values[k] = n;
    }
    if (Object.keys(values).length === 0) {
      return toast.error('至少填一个部位的围度');
    }
    const next = upsertMeasurement({ date, values });
    setEntries(next);
    toast.success(
      date === todayStr() ? `已记录今日围度（${Object.keys(values).length} 个部位）` : `已记录 ${date} 的围度`,
    );
    setDate(todayStr());
    setDraft(emptyDraft());
  };

  const startEdit = (entry: MeasurementEntry) => {
    setDate(entry.date);
    const next = emptyDraft();
    for (const k of MEASURE_KEYS) {
      next[k] = entry.values[k] != null ? String(entry.values[k]) : '';
    }
    setDraft(next);
    toast.info('已载入该日围度，改完点「保存围度」（同一天会覆盖）');
  };

  const remove = (entry: MeasurementEntry) => {
    setEntries(removeMeasurement(entry.date));
    toast.success(`已删除 ${entry.date} 的围度记录`);
  };

  // 趋势图数据：一行一个日期，未录入的部位为 undefined（折线断开）
  const chartData = useMemo(
    () => entries.map((e) => ({ date: fmtDate(e.date), ...e.values })),
    [entries],
  );
  const chartKeys = MEASURE_KEYS.filter(
    (k) => entries.filter((e) => e.values[k] != null).length >= 2,
  );

  // 腰围对照：最新一条含腰围的记录 vs 最早一条含腰围的记录
  const waistFirst = entries.find((e) => e.values.waist != null);
  const waistLatest = [...entries].reverse().find((e) => e.values.waist != null);
  const waistDelta =
    waistFirst && waistLatest && waistFirst !== waistLatest && waistFirst.values.waist != null && waistLatest.values.waist != null
      ? Math.round((waistLatest.values.waist - waistFirst.values.waist) * 10) / 10
      : null;

  const history = [...entries].reverse();

  // 按日期排序后的记录，用于「距今天数」与全部位首次 vs 最新对比
  const sorted = useMemo(() => [...entries].sort((a, b) => a.date.localeCompare(b.date)), [entries]);
  const daysSinceLast = useMemo(() => {
    if (sorted.length === 0) return null;
    const today = new Date(`${todayStr()}T00:00:00`);
    const last = new Date(`${sorted[sorted.length - 1].date}T00:00:00`);
    return Math.round((today.getTime() - last.getTime()) / 86400000);
  }, [sorted]);

  /** 每个有数据的部位：首次值 → 最新值 → 变化（cm，负=缩小） */
  const progress = useMemo(() => {
    const out: { key: MeasureKey; first: number; latest: number; delta: number }[] = [];
    for (const k of MEASURE_KEYS) {
      const first = sorted.find((e) => e.values[k] != null)?.values[k];
      const latest = [...sorted].reverse().find((e) => e.values[k] != null)?.values[k];
      if (first != null && latest != null && first !== latest) {
        out.push({ key: k, first, latest, delta: Math.round((latest - first) * 10) / 10 });
      }
    }
    return out;
  }, [sorted]);

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl">
      <CardContent className="space-y-4 p-4 sm:p-5">
        <div className="space-y-1">
          <p className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Ruler className="h-4 w-4 text-primary" />
            围度追踪
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            胸 / 腰 / 臀 / 臂 / 大腿围，单位 cm。同一时间口径（建议早晨空腹、站立放松）固定测量才有可比性；减脂期腰围是金标准——体重会因水分波动，腰围不会说谎。
          </p>
        </div>

        {/* 录入 */}
        <div className="space-y-3 rounded-lg border border-border bg-muted/20 p-3">
          <div className="grid gap-3 sm:grid-cols-[150px_1fr] sm:items-end">
            <div className="space-y-1.5">
              <Label htmlFor="measure-date" className="text-sm">日期</Label>
              <Input
                id="measure-date"
                type="date"
                max={todayStr()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {MEASURE_KEYS.map((k) => (
                <div key={k} className="space-y-1">
                  <Label htmlFor={`measure-${k}`} className="text-[11px] text-muted-foreground">
                    {MEASURE_META[k].label}
                  </Label>
                  <Input
                    id={`measure-${k}`}
                    type="number"
                    min={1}
                    max={299}
                    step="0.5"
                    inputMode="decimal"
                    placeholder={latestOf[k] != null ? String(latestOf[k]) : '—'}
                    value={draft[k]}
                    onChange={(e) => setDraft((prev) => ({ ...prev, [k]: e.target.value }))}
                    className="h-9 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] text-muted-foreground">
              输入框里的灰色数字是各部位最近一次的值；只填想更新的部位即可，同一天重复保存会覆盖。
            </p>
            <Button size="sm" className="h-8 px-3 text-xs" onClick={save}>
              <Save className="mr-1 h-3.5 w-3.5" />
              保存围度
            </Button>
          </div>
        </div>

        {/* 趋势 + 腰围对照 */}
        {entries.length > 0 && (
          <div className="space-y-3">
          {/* 30 天复查提醒 */}
          {daysSinceLast != null && daysSinceLast >= 30 && (
            <div className="flex items-start gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2">
              <AlarmClock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <p className="text-xs leading-snug text-foreground/90">
                距上次体测已 <b>{daysSinceLast} 天</b>（建议每 30 天复查一次）。
                同口径早晨空腹复测一次，和历史曲线对比才能看出真实进展——体重会骗人，围度和照片不会。
              </p>
            </div>
          )}
          <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
            <div className="rounded-lg border border-border bg-background/30 p-3">
              <p className="text-xs font-medium text-muted-foreground">围度趋势（cm）</p>
              {chartKeys.length > 0 ? (
                <div className="mt-2 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 4, right: 8, bottom: 0, left: -18 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickLine={false} axisLine={{ stroke: 'var(--border)' }} />
                      <YAxis
                        domain={['auto', 'auto']}
                        tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                        tickLine={false}
                        axisLine={{ stroke: 'var(--border)' }}
                        tickFormatter={(v: number) => String(Math.round(v))}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'var(--popover)',
                          border: '1px solid var(--border)',
                          borderRadius: 8,
                          fontSize: 11,
                        }}
                        formatter={(v: number | undefined, name: string) =>
                          v == null ? ['—', name] : [`${v} cm`, name]
                        }
                      />
                      {chartKeys.map((k) => (
                        <Line
                          key={k}
                          type="monotone"
                          dataKey={k}
                          name={MEASURE_META[k].label}
                          stroke={MEASURE_META[k].chart}
                          strokeWidth={2}
                          connectNulls
                          dot={{ r: 2.5 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">同一部位记两次以上才会画出趋势线。</p>
              )}
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <TrendingDown className="h-3.5 w-3.5 text-primary" />
                腰围对照
              </p>
              {waistLatest && waistLatest.values.waist != null ? (
                <>
                  <p className="mt-2 font-display text-3xl font-extrabold text-foreground">
                    {waistLatest.values.waist}
                    <span className="ml-1.5 text-sm font-bold text-muted-foreground">cm</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    最近一次 {waistLatest.date === todayStr() ? '今天' : fmtDate(waistLatest.date)} 测得
                  </p>
                  {waistDelta != null && (
                    <p className={`mt-1.5 text-xs font-medium ${waistDelta < 0 ? 'text-primary' : 'text-foreground'}`}>
                      {waistDelta < 0 ? `较首次减少 ${Math.abs(waistDelta)} cm` : `较首次增加 ${waistDelta} cm`}
                      （首次 {fmtDate(waistFirst!.date)}）
                    </p>
                  )}
                  {waistDelta == null && <p className="mt-1.5 text-xs text-muted-foreground">多记几次即可看到腰围变化。</p>}
                </>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">还没有腰围记录。</p>
              )}
            </div>
          </div>

          {/* 首次 vs 最新：全部位进度对比 */}
          {progress.length > 0 && (
            <div className="rounded-lg border border-border bg-background/30 p-3">
              <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <RefreshCcw className="h-3.5 w-3.5 text-primary" />
                首次 vs 最新 · 进度报告
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {progress.map((p) => (
                  <span
                    key={p.key}
                    className="rounded-md border border-border/60 bg-card/60 px-2 py-1 text-[11px] text-muted-foreground"
                  >
                    {MEASURE_META[p.key].label}
                    <b className="ml-1 text-foreground">{p.first}→{p.latest}cm</b>
                    <b
                      className={`ml-1.5 ${
                        p.delta < 0 ? 'text-primary' : p.delta > 0 ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {p.delta > 0 ? `+${p.delta}` : p.delta}
                    </b>
                  </span>
                ))}
              </div>
              <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
                腰 / 大腿缩小、胸 / 臂增大是增肌减脂同时发生的理想形态；同向变大要警惕脂肪增长。
              </p>
            </div>
          )}
          </div>
        )}

        {/* 历史 */}
        {entries.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">历史记录（{entries.length} 天）</p>
            <ul className="space-y-1.5">
              {history.map((e) => (
                <li
                  key={e.date}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border/70 bg-muted/20 px-2.5 py-1.5 text-xs"
                >
                  <button type="button" onClick={() => startEdit(e)} className="font-medium text-foreground hover:text-primary" title="载入修改这一天的围度">
                    {e.date === todayStr() ? '今天' : fmtDate(e.date)}
                  </button>
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
                    {MEASURE_KEYS.filter((k) => e.values[k] != null).map((k) => (
                      <span key={k}>
                        {MEASURE_META[k].label} <b className="font-semibold text-foreground">{e.values[k]}</b>
                      </span>
                    ))}
                  </span>
                  <button
                    type="button"
                    onClick={() => remove(e)}
                    className="ml-auto text-muted-foreground transition-colors hover:text-destructive"
                    title="删除这一天的围度记录"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
