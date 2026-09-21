import { useState } from 'react';
import { Layers, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { loadSplit, loadPyramid, saveSplit, savePyramid, type SplitType, type PyramidType } from '@/lib/store';
import { cn } from '@/lib/utils';

const SPLITS: { id: SplitType; name: string; desc: string; suit: string }[] = [
  {
    id: 'full-body',
    name: '二分化 · 全身 / 上下',
    desc: '练两天休一天：A=上肢推+核心，B=下肢+核心。一周 3–4 练。',
    suit: '初学者 / 每周训练 ≤4 次',
  },
  {
    id: 'push-pull-legs',
    name: '三分化 · 推/拉/腿',
    desc: '推（胸肩三头）→ 拉（背二头）→ 腿 → 休 → 循环。一周 6 练或 3 练。',
    suit: '最经典、增肌效率最高；大部分人用这个',
  },
  {
    id: 'ppl-upper-lower',
    name: '四分化 · 推拉/上下',
    desc: '推→拉→上肢综合→下肢综合，或推拉 + 上下肢变体。一周 4 练。',
    suit: '中级、时间有限又想全面发展',
  },
  {
    id: 'upper-lower',
    name: '四分化 · 上肢/下肢',
    desc: '上肢 → 下肢 → 休 → 循环。每个部位一周练 2 次。',
    suit: '中级、每周 4 练、恢复较好',
  },
  {
    id: 'bro-split',
    name: '五分化 · 胸/背/肩/臂/腿',
    desc: '一天一个部位：胸→背→肩→手臂→腿→休 2 天。',
    suit: '高级、每周能练 5–6 次、恢复能力强',
  },
];

const PYRAMIDS: { id: PyramidType; name: string; desc: string }[] = [
  {
    id: 'reverse',
    name: '倒金字塔',
    desc: '第一组最重（85%+ 1RM），后面每组降重量加次数。神经募集优先，适合主项。',
  },
  {
    id: 'straight',
    name: '正金字塔',
    desc: '第一组轻重量热身，逐组加重到峰值，再降回。安全但峰值组数少。',
  },
  {
    id: 'double',
    name: '双金字塔',
    desc: '正金字塔上去 + 倒金字塔下来，中间峰值组最多。容量最大，也最累。',
  },
  {
    id: 'russian',
    name: '俄罗斯套装',
    desc: '同重量做 6 组递减次数（6/6/6/6/6/6），最后两组接近力竭。容量刺激最强。',
  },
];

export default function TrainingArchitecture() {
  const [split, setSplit] = useState<SplitType>(loadSplit);
  const [pyramid, setPyramid] = useState<PyramidType>(loadPyramid);

  const onSplit = (s: SplitType) => { setSplit(s); saveSplit(s); };
  const onPyramid = (p: PyramidType) => { setPyramid(p); savePyramid(p); };

  const splitMeta = SPLITS.find((s) => s.id === split)!;
  const pyrMeta = PYRAMIDS.find((p) => p.id === pyramid)!;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Layers className="h-4 w-4 text-primary" />
            分化方式（一周怎么分天）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {SPLITS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSplit(s.id)}
                className={cn(
                  'flex flex-col gap-1 rounded-lg border p-3 text-left transition-colors',
                  s.id === split
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-accent',
                )}
              >
                <span className="font-display text-base font-bold text-foreground">{s.name}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{s.desc}</span>
                <span className="text-[11px] text-primary/90">{s.suit}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" />
            强度方式（每组重量怎么排）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {PYRAMIDS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => onPyramid(p.id)}
                className={cn(
                  'flex flex-col gap-1 rounded-lg border p-3 text-left transition-colors',
                  p.id === pyramid
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-card hover:border-primary/40 hover:bg-accent',
                )}
              >
                <span className="font-display text-base font-bold text-foreground">{p.name}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{p.desc}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          <b className="text-foreground">当前组合：</b>
          <Badge variant="outline" className="mr-1">{splitMeta.name}</Badge>
          +
          <Badge variant="outline" className="ml-1">{pyrMeta.name}</Badge>
        </p>
        <p className="mt-2">
          不同分化只是"哪一天练哪块肌肉"，强度方式只是"一组之间重量怎么排"。<b className="text-foreground">动作本身不变</b>——下面的动作表照常参考。
          初学者建议三分化 + 倒金字塔；高级、恢复好再试五分化 + 双金字塔。
        </p>
      </div>
    </div>
  );
}
