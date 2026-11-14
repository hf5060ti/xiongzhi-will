// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 肌肉覆盖热力图 + 结构平衡比：把训练记录按动作映射到的肌群聚合，做三视图（容量/频率/新鲜度）+ 平衡比卡片。
// 借鉴 openGym 的「分析可视化」思路，全部用本站自己的数据与算法实现（不复制任何 AGPL 代码）。
import { useMemo } from 'react';
import { Activity, Flame } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import type { TrainingLog } from '@/lib/store';
import { MUSCLE_KEYS, getMuscleLabel } from '@/lib/muscle-map';
import { analyzeBalance, analyzeMuscleVolume } from '@/lib/muscle-analysis';

/** 超过该天数没练某肌群，视为「需关注」 */
const NEGLECT_DAYS = 21;

function volumeClass(ratio: number): string {
  if (ratio <= 0) return 'bg-muted/40 border-border';
  if (ratio < 0.2) return 'bg-primary/10 border-primary/20';
  if (ratio < 0.4) return 'bg-primary/20 border-primary/30';
  if (ratio < 0.6) return 'bg-primary/40 border-primary/50';
  if (ratio < 0.8) return 'bg-primary/50 border-primary/60';
  return 'bg-primary/70 border-primary/80';
}

function freshnessClass(gap: number | null): string {
  if (gap == null) return 'bg-muted/40 border-border';
  if (gap < 7) return 'bg-white/10 border-white/25';
  if (gap <= NEGLECT_DAYS) return 'bg-primary/20 border-primary/40';
  return 'bg-primary/50 border-primary/70';
}

export function MuscleHeatmap({ logs }: { logs: TrainingLog[] }) {
  const stats = useMemo(() => analyzeMuscleVolume(logs), [logs]);
  const balance = useMemo(() => analyzeBalance(stats), [stats]);

  const maxVolume = Math.max(1, ...MUSCLE_KEYS.map((m) => stats[m]?.volume ?? 0));
  const maxSessions = Math.max(1, ...MUSCLE_KEYS.map((m) => stats[m]?.sessions ?? 0));

  const muscleCells = (mode: 'volume' | 'frequency' | 'freshness') =>
    MUSCLE_KEYS.map((m) => {
      const st = stats[m];
      const vol = st?.volume ?? 0;
      const ses = st?.sessions ?? 0;
      const gap = st?.gapDays ?? null;
      const ratio = mode === 'volume' ? vol / maxVolume : mode === 'frequency' ? ses / maxSessions : 0;
      const cls = mode === 'freshness' ? freshnessClass(gap) : volumeClass(ratio);
      const value =
        mode === 'volume'
          ? vol > 0
            ? `${Math.round(vol).toLocaleString()} kg·组`
            : '未练'
          : mode === 'frequency'
            ? ses > 0
              ? `${ses} 次训练`
              : '未练'
            : gap == null
              ? '无记录'
              : `${gap} 天前`;
      return (
        <div key={m} className={`rounded-lg border p-3 ${cls}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium text-foreground">{getMuscleLabel(m)}</span>
            {mode === 'freshness' && gap != null && gap > NEGLECT_DAYS && (
              <Badge variant="destructive" className="text-[0.6rem]">
                需关注
              </Badge>
            )}
          </div>
          <p className="mt-1 type-meta text-muted-foreground">{value}</p>
        </div>
      );
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="h-5 w-5 text-primary" />
          肌肉覆盖热力图 + 结构平衡
        </CardTitle>
        <CardDescription>
          把训练记录按动作映射到的肌群聚合。颜色越深 = 练得越多（容量 / 频率视图）；红 = 太久没练（新鲜度视图）。结构平衡比参考 Poliquin / Thibaudeau / ATG 流派经验值。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="volume">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="volume">容量分布</TabsTrigger>
            <TabsTrigger value="frequency">训练频率</TabsTrigger>
            <TabsTrigger value="freshness">久未训练</TabsTrigger>
          </TabsList>
          <TabsContent value="volume">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{muscleCells('volume')}</div>
            <p className="mt-3 type-meta text-muted-foreground">
              容量 = 重量 × 次数 求和（自重动作不计入）。深色块 = 练得多；浅 / 灰 = 练得少或没练。长期全灰的肌群说明计划里漏了它。
            </p>
          </TabsContent>
          <TabsContent value="frequency">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{muscleCells('frequency')}</div>
            <p className="mt-3 type-meta text-muted-foreground">
              频率 = 含该肌群的训练记录条数。容量高但频率低（一次猛练）不如稳定低频更利于自然训练者生长。
            </p>
          </TabsContent>
          <TabsContent value="freshness">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">{muscleCells('freshness')}</div>
            <p className="mt-3 type-meta text-muted-foreground">
              新鲜度：白 = 7 天内练过，浅红 = 7–21 天，深红 = 超过 {NEGLECT_DAYS} 天没练（标「需关注」）。长期深红说明该肌群被计划遗忘。
            </p>
          </TabsContent>
        </Tabs>

        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Flame className="h-3.5 w-3.5 text-primary" />
            结构平衡比（经验参考，非硬性标准）
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {balance.map((r) => {
              const statusBadge =
                r.status === 'balanced' ? (
                  <Badge className="bg-white/12 text-foreground">平衡</Badge>
                ) : r.status === 'slight' ? (
                  <Badge className="bg-primary/20 text-primary">略偏</Badge>
                ) : (
                  <Badge variant="destructive">失衡</Badge>
                );
              return (
                <div key={r.id} className="rounded-lg border border-border bg-muted/20 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-foreground">{r.label}</span>
                    {statusBadge}
                  </div>
                  <p className="mt-1 font-display text-xl font-bold text-foreground">
                    {r.actual > 0 ? `${r.actual.toFixed(2)} : 1` : '缺一侧'}
                  </p>
                  <p className="mt-1 type-meta text-muted-foreground">{r.recommended}</p>
                  <p className="type-meta text-muted-foreground/70">{r.note}</p>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
