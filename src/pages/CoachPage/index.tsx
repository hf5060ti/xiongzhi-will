import { useMemo, useState } from 'react';
import { Activity, BedDouble, HeartPulse, Pill, Smile, TrendingUp, Zap, ShieldAlert, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Sickness = 'none' | 'cold' | 'fever' | 'recovering' | 'injury' | 'other';
type Energy = 'great' | 'good' | 'tired' | 'exhausted';
type Stress = 'low' | 'normal' | 'high';
type Diet = 'normal' | 'underfed' | 'overeaten' | 'junk';

interface Advice {
  level: 'stop' | 'light' | 'normal' | 'push';
  title: string;
  lines: string[];
  dietNote?: string;
  medicalNote?: boolean;
}

const SICKNESS_LABEL: Record<Sickness, string> = {
  none: '无异常',
  cold: '感冒（鼻塞/流涕/咽痛）',
  fever: '发烧 / 明显不适',
  recovering: '大病初愈（刚恢复几天内）',
  injury: '关节 / 肌肉疼痛',
  other: '其他不适',
};

const ENERGY_LABEL: Record<Energy, string> = {
  great: '精力充沛',
  good: '状态正常',
  tired: '有点累',
  exhausted: '非常疲惫',
};

function evaluate(sleepH: number, sickness: Sickness, energy: Energy, stress: Stress, diet: Diet): Advice {
  // 医疗红线：发烧 / 大病初愈 / 明显疼痛 → 停训
  if (sickness === 'fever') {
    return {
      level: 'stop',
      title: '今天停训，休息',
      lines: [
        '发烧状态下训练会加重心脏负担、延缓恢复，<b>今天不要练</b>。',
        '多喝水、保证睡眠、按医嘱用药。',
        '退烧后再观察 24–48 小时，没有反复再恢复训练。',
      ],
      dietNote: '清淡饮食，粥 / 面条 / 水果，别重油重辣。',
      medicalNote: true,
    };
  }
  if (sickness === 'recovering') {
    return {
      level: 'stop',
      title: '停训 2 天，完全休息',
      lines: [
        '大病初愈阶段，免疫系统和肌肉都在修复，<b>不要训练</b>。',
        '至少停训 2 天，等身体完全恢复（不乏力、不低烧、食欲正常）再恢复。',
        '恢复训练第一周重量降 30–50%，别冲 PR。',
      ],
      dietNote: '蛋白质吃够（体重 × 1.6–2.0g/kg），多吃蔬菜，别节食。',
      medicalNote: true,
    };
  }
  if (sickness === 'injury') {
    return {
      level: 'stop',
      title: '疼痛部位停训，其他部位可轻量',
      lines: [
        '<b>关节刺痛 / 肌肉拉伤部位不要练</b>，强行练只会加重。',
        '如果是上肢问题，可以练腿；下肢问题可以练核心/低强度有氧。',
        '疼痛持续超过 3 天或加重，去看医生。',
      ],
      medicalNote: true,
    };
  }
  if (sickness === 'cold') {
    return {
      level: 'light',
      title: '减量训练，或直接休息',
      lines: [
        '感冒早期（脖子以上症状：鼻塞/流涕/咽痛）：可以做 30 分钟低强度有氧（快走/慢骑车），别上重量。',
        '如果有咳嗽 / 胸闷 / 全身酸痛：<b>今天停训休息</b>。',
        '多喝水、维 C、保证睡眠。',
      ],
      dietNote: '多吃蔬菜、优质蛋白，别喝高糖饮料。',
    };
  }
  if (sickness === 'other') {
    return {
      level: 'light',
      title: '有其他不适，自行判断',
      lines: [
        '如果是肠胃不适 / 头痛 / 女性生理期等，<b>症状明显时停训</b>。',
        '症状轻微可以做轻量有氧，别上大重量。',
        '不确定时宁可多休息一天。',
      ],
      medicalNote: true,
    };
  }

  // 没生病，看睡眠和精力
  if (sleepH < 5 || energy === 'exhausted') {
    return {
      level: 'light',
      title: '减量训练，或补觉',
      lines: [
        `昨晚只睡了 ${sleepH} 小时 / 感觉非常疲惫：神经募集和力量会明显下降。`,
        '今天别上大重量，做 30–40 分钟中低强度组（12+ 次），或直接回家补觉。',
        '别冲 PR，状态差时受伤风险高 3 倍。',
      ],
      dietNote: '碳水可以多一点（昨晚睡不够血糖低），蛋白质照常。',
    };
  }
  if (sleepH < 6 || energy === 'tired' || stress === 'high') {
    return {
      level: 'light',
      title: '正常训练，但降一档重量',
      lines: [
        `睡眠 ${sleepH}h / 压力偏高：可以练，但主项重量降 10–15%。`,
        '组间休息延长到 2.5–3 分钟，别赶节奏。',
        '今天目标是"完成"而不是"突破"。',
      ],
      dietNote: '蛋白质吃够，碳水按方案来，别因为累就乱吃。',
    };
  }
  if (energy === 'great' && stress === 'low') {
    return {
      level: 'push',
      title: '状态好，可以冲一冲',
      lines: [
        `睡了 ${sleepH}h、精力充沛、压力低：这是冲重量 / 突破 PR 的窗口。`,
        '先做 2 组热身，然后主项正常强度或加 2.5–5kg。',
        '突破后立刻降回正常重量做容量组。',
      ],
      dietNote: '练前 1 小时补点碳水（香蕉/面包），练后 1 小时内蛋白质 + 碳水。',
    };
  }
  return {
    level: 'normal',
    title: '按计划正常训练',
    lines: [
      `睡了 ${sleepH}h、状态正常：按你的训练方案正常执行。`,
      '主项重量按计划来，别冲动加量。',
      '注意动作质量，有不对劲立刻停。',
    ],
    dietNote: '按当前饮食方案吃，别多也别少。',
  };
}

const LEVEL_STYLE: Record<Advice['level'], { label: string; cls: string; icon: typeof Zap }> = {
  stop: { label: '停训', cls: 'bg-destructive/15 text-destructive border-destructive/30', icon: ShieldAlert },
  light: { label: '减量', cls: 'bg-warning/15 text-warning border-warning/30', icon: TrendingUp },
  normal: { label: '正常', cls: 'bg-primary/15 text-primary border-primary/30', icon: Activity },
  push: { label: '冲一冲', cls: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30', icon: Zap },
};

export default function CoachPage() {
  const [sleep, setSleep] = useState('7.5');
  const [sickness, setSickness] = useState<Sickness>('none');
  const [energy, setEnergy] = useState<Energy>('good');
  const [stress, setStress] = useState<Stress>('normal');
  const [diet, setDiet] = useState<Diet>('normal');
  const [show, setShow] = useState(false);

  const advice = useMemo(() => {
    const s = parseFloat(sleep);
    return evaluate(Number.isFinite(s) ? s : 7, sickness, energy, stress, diet);
  }, [sleep, sickness, energy, stress, diet]);

  const Style = LEVEL_STYLE[advice.level];
  const LevelIcon = Style.icon;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold tracking-wide text-foreground">AI 教练</h1>
        <p className="text-sm text-muted-foreground">
          每天训练前花 30 秒填一下状态，系统根据你的睡眠、身体、精力给出当天建议。不是聊天机器人，是基于规则的实时判断——生病 / 受伤时优先停训，别硬撑。
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BedDouble className="h-4 w-4 text-primary" />
              昨晚睡眠
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label htmlFor="sleep" className="text-sm">睡眠时长（小时）</Label>
            <Input id="sleep" type="number" min={0} max={16} step={0.5} value={sleep} onChange={(e) => setSleep(e.target.value)} />
            <p className="text-xs text-muted-foreground">成年人 7–9h 最佳；少于 6h 力量下降、受伤风险上升。</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Stethoscope className="h-4 w-4 text-primary" />
              身体状态
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <NativeSelect value={sickness} onChange={(e) => setSickness(e.target.value as Sickness)}>
              {Object.entries(SICKNESS_LABEL).map(([v, l]) => (
                <NativeSelectOption key={v} value={v}>{l}</NativeSelectOption>
              ))}
            </NativeSelect>
            <p className="text-xs text-muted-foreground">
              <b className="text-foreground">发烧 / 大病初愈：直接停训。</b>不要带病训练。
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4 text-primary" />
              训练精力
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <NativeSelect value={energy} onChange={(e) => setEnergy(e.target.value as Energy)}>
              {Object.entries(ENERGY_LABEL).map(([v, l]) => (
                <NativeSelectOption key={v} value={v}>{l}</NativeSelectOption>
              ))}
            </NativeSelect>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <Smile className="h-4 w-4 text-primary" />
              压力 / 饮食
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Label className="text-xs text-muted-foreground">压力水平</Label>
            <div className="flex gap-1.5">
              {(['low', 'normal', 'high'] as Stress[]).map((s) => (
                <Badge
                  key={s}
                  variant={stress === s ? 'default' : 'outline'}
                  className={cn('cursor-pointer select-none', stress !== s && 'hover:bg-accent')}
                  onClick={() => setStress(s)}
                >
                  {s === 'low' ? '低' : s === 'normal' ? '正常' : '高'}
                </Badge>
              ))}
            </div>
            <Label className="mt-2 block text-xs text-muted-foreground">饮食</Label>
            <div className="flex flex-wrap gap-1.5">
              {([
                { v: 'normal', l: '正常' },
                { v: 'underfed', l: '没吃够' },
                { v: 'overeaten', l: '吃多了' },
                { v: 'junk', l: '垃圾食品' },
              ] as { v: Diet; l: string }[]).map((d) => (
                <Badge
                  key={d.v}
                  variant={diet === d.v ? 'default' : 'outline'}
                  className={cn('cursor-pointer select-none', diet !== d.v && 'hover:bg-accent')}
                  onClick={() => setDiet(d.v)}
                >
                  {d.l}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Button type="button" onClick={() => setShow(true)} className="w-full">
        给出今天建议
      </Button>

      {show && (
        <Card className={cn('border', Style.cls)}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <LevelIcon className="h-5 w-5" />
              {advice.title}
              <Badge variant="outline" className={cn('ml-2', Style.cls)}>{Style.label}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-1.5">
              {advice.lines.map((line, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-60" />
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                </li>
              ))}
            </ul>
            {advice.dietNote && (
              <p className="flex items-start gap-2 rounded-md border border-border bg-muted/40 p-3 text-sm leading-relaxed text-muted-foreground">
                <Pill className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span><b className="text-foreground">饮食：</b>{advice.dietNote}</span>
              </p>
            )}
            {advice.medicalNote && (
              <p className="flex items-start gap-2 rounded-md border border-warning/40 bg-warning/5 p-3 text-xs leading-relaxed text-muted-foreground">
                <HeartPulse className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                <span>
                  <b className="font-semibold text-foreground">医疗提示：</b>
                  以上建议仅为通用训练参考。<b className="text-foreground">感冒发烧、大病初愈、关节疼痛或任何疾病状况，请优先遵从医嘱</b>，不要自行判断训练强度。症状持续或加重时及时就医。
                </span>
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <p className="text-xs leading-relaxed text-muted-foreground">
        本"AI 教练"基于运动医学通用原则做规则判断，不是真正的 AI 对话模型。它的价值在于<b className="text-foreground">把"生病就停训"这条红线写死</b>——很多人带病训练反而练得更差。真正的个性化追踪、周期化调整，还是要靠你自己按周观察体重、力量、睡眠。
      </p>
    </div>
  );
}
