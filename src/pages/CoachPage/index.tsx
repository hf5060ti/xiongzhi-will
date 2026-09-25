import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity,
  BedDouble,
  Bot,
  HeartPulse,
  Loader2,
  Pill,
  RefreshCw,
  Send,
  ShieldAlert,
  Smile,
  Stethoscope,
  Trash2,
  TrendingUp,
  Unplug,
  Zap,
} from 'lucide-react';
import {
  BackendOfflineError,
  chatStream,
  fetchProviders,
  getApiBase,
  hasCustomApiBase,
  hasSiliconflowKey,
  LOCAL_BACKEND_HINT,
  resetApiBase,
  setApiBase,
  getSiliconflowKey,
  setSiliconflowKey,
  getSiliconflowModel,
  setSiliconflowModel,
  SILICONFLOW_MODELS,
  type ChatMessage,
  type ProviderInfo,
} from '@/lib/ai';
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

      {/* UI 级免责声明 */}
      <div className="flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs leading-relaxed text-yellow-700 dark:text-yellow-400">
        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          本工具提供的所有建议仅供一般健身参考，<b>不构成医疗诊断、治疗或处方</b>。
          如果你有任何疾病、正在服药、或出现异常症状，<b>请优先咨询医生</b>。
          糖尿病、孕妇、老年人、大病初愈者，请遵从医嘱。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-2">
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

      <AIChatPanel />
    </div>
  );
}

// ── AI 对话面板：接本地后台（server/server.js），支持豆包 / Marvis 两路切换 ──
function AIChatPanel() {
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [providerId, setProviderId] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [backend, setBackend] = useState<'loading' | 'ready' | 'offline'>('loading');
  const [offlineDetail, setOfflineDetail] = useState('');
  const [address, setAddress] = useState(() => getApiBase());
  const [apiBase, setApiBaseState] = useState(() => getApiBase());
  const [customBase, setCustomBase] = useState(() => hasCustomApiBase());
  const [showAddress, setShowAddress] = useState(false);
  const [busy, setBusy] = useState(true);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const aliveRef = useRef(true);
  const [keyInput, setKeyInput] = useState(() => getSiliconflowKey());
  const [modelInput, setModelInput] = useState(() => getSiliconflowModel());
  const [showKeyForm, setShowKeyForm] = useState(() => !hasSiliconflowKey());

  /** 拉取成功：应用模型列表 */
  const applyProviders = useCallback((list: ProviderInfo[]) => {
    setProviders(list);
    const ready = list.find((p) => p.configured) ?? list[0];
    if (ready) setProviderId(ready.id);
    setOfflineDetail('');
    setBackend('ready');
  }, []);

  /** 拉取失败：区分"后台连不上"（引导态）与"后台在线但报错"（原有红字提示） */
  const handleLoadError = useCallback((e: unknown) => {
    if (e instanceof BackendOfflineError) {
      // 后台连不上：进入引导态，不再把 HTTP 404 之类的原始报错甩给用户
      setProviders([]);
      setOfflineDetail(e.detail);
      setBackend('offline');
      return;
    }
    // 后台在线但返回了业务错误：沿用原有的红字提示
    setBackend('ready');
    setError(e instanceof Error ? e.message : String(e));
  }, []);

  const loadProviders = useCallback(
    () =>
      fetchProviders()
        .then(
          (list) => {
            if (aliveRef.current) applyProviders(list);
          },
          (e: unknown) => {
            if (aliveRef.current) handleLoadError(e);
          },
        )
        .finally(() => {
          if (aliveRef.current) setBusy(false);
        }),
    [applyProviders, handleLoadError],
  );

  useEffect(() => {
    aliveRef.current = true;
    void loadProviders();
    return () => {
      aliveRef.current = false;
    };
  }, [loadProviders]);

  /** 用户在页面上点了重连（保存地址 / 重试）：显示加载态后重新拉取 */
  const reconnect = () => {
    setBusy(true);
    setError('');
    void loadProviders();
  };

  /** 保存自定义后台地址（持久化到 localStorage）并立即重连 */
  const applyAddress = () => {
    const saved = setApiBase(address);
    setAddress(saved);
    setApiBaseState(saved);
    setCustomBase(Boolean(saved));
    setShowAddress(false);
    reconnect();
  };

  /** 清除自定义地址，回到构建期默认值 */
  const clearAddress = () => {
    const fallback = resetApiBase();
    setAddress(fallback);
    setApiBaseState(fallback);
    setCustomBase(false);
    setShowAddress(false);
    reconnect();
  };

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending]);

  const current = providers.find((p) => p.id === providerId);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    if (backend === 'offline') {
      setShowAddress(true);
      return;
    }
    if (!current) {
      setError('后台没返回可用模型，先确认 server/server.js 已启动');
      return;
    }
    if (!current.configured) {
      setError(`${current.label} 还没配置：在 server/.env 填好 BASE_URL / API_KEY / MODEL，再重启后台服务`);
      return;
    }

    setError('');
    const system: ChatMessage = {
      role: 'system',
      content:
        '你是一位专业、务实的自然健身教练，服务「雄性意志」网站的健身者。回答用简体中文，简洁、直接、有行动可执行。' +
        '核心原则：① 强调自然训练、无药物，不推荐任何极端方法；② 发烧、大病初愈、明显疼痛时明确建议停训、遵医嘱；' +
        '③ 涉及疾病、服药、孕期、老人、慢性病时，提示以医生意见为准；④ 训练建议要落在具体数字（组数、次数、重量百分比、休息时间）；' +
        '⑤ 用户可能提到 肌肥大/斗腕/大力士/综合体能/街头健身 等目标，按目标给出对应侧重。',
    };
    const history: ChatMessage[] = [system, ...messages, { role: 'user', content: text }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setSending(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      await chatStream({
        provider: providerId,
        messages: history,
        signal: controller.signal,
        onDelta: (delta) => {
          setMessages((prev) => {
            const copy = [...prev];
            const last = copy[copy.length - 1];
            if (last?.role === 'assistant') {
              copy[copy.length - 1] = { ...last, content: last.content + delta };
            }
            return copy;
          });
        },
      });
    } catch (e) {
      const aborted = e instanceof DOMException && e.name === 'AbortError';
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === 'assistant' && !last.content) copy.pop();
        return copy;
      });
      if (!aborted) setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSending(false);
      abortRef.current = null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-wrap items-center gap-2 text-base">
          <Bot className="h-4 w-4 text-primary" />
          AI 教练对话
          <span className="text-xs font-normal text-muted-foreground">（本地后台，可切换模型）</span>
          <span className="ml-auto flex items-center gap-1.5">
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
            {providers.map((p) => (
              <Badge
                key={p.id}
                variant={p.id === providerId ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer select-none',
                  p.id !== providerId && 'hover:bg-accent',
                  !p.configured && 'opacity-60',
                )}
                onClick={() => setProviderId(p.id)}
                title={p.configured ? `模型：${p.model}` : '未配置（在 server/.env 里填 Key）'}
              >
                {p.label}
              </Badge>
            ))}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
{showKeyForm && (
                <div className="space-y-2.5 rounded-lg border border-primary/30 bg-primary/5 p-3.5">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Bot className="h-4 w-4 shrink-0" />
            AI 对话需要一个 Key（免费，2 分钟搞定）
          </p>
          <div className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
            <p>
              这个功能直连<strong className="text-foreground">硅基流动 SiliconFlow</strong>，
              新用户注册就送 14 元额度（够聊几千条），不用绑信用卡。
              Key 只存在你自己的浏览器里，不上传任何服务器。
            </p>
            <ol className="list-decimal space-y-0.5 pl-4">
              <li>打开 <a href="https://cloud.siliconflow.cn/me/account/ak" target="_blank" rel="noreferrer" className="underline text-primary">硅基流动 API 密钥页</a>，注册后点「新建 API 密钥」</li>
              <li>复制那串 <code className="rounded bg-muted px-1">sk-...</code> 粘到下面</li>
              <li>选个模型（推荐 Qwen2.5-7B，快且免费额度多），点「保存并启用」</li>
            </ol>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="粘贴 sk- 开头的 Key"
              className="h-9 flex-1 font-mono text-xs"
            />
            <NativeSelect value={modelInput} onChange={(e) => setModelInput(e.target.value)} className="h-9 sm:w-56">
              {SILICONFLOW_MODELS.map((m) => (
                <NativeSelectOption key={m.id} value={m.id}>{m.label}</NativeSelectOption>
              ))}
            </NativeSelect>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                setSiliconflowKey(keyInput);
                setSiliconflowModel(modelInput);
                setShowKeyForm(false);
                reconnect();
              }}
              disabled={!keyInput.trim()}
            >
              保存并启用
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground/80">
            已有 Key？直接粘进来就行。想换模型或清除 Key，点下面的「修改 Key」。
          </p>
        </div>
        )}

        {backend === 'offline' && (
          <div className="space-y-3 rounded-lg border border-warning/40 bg-warning/5 p-3.5">
            <p className="flex items-center gap-2 text-sm font-semibold text-warning">
              <Unplug className="h-4 w-4 shrink-0" />
              本地后台未连接
            </p>
            <div className="space-y-1.5 text-xs leading-relaxed text-muted-foreground">
              <p>
                这个对话面板要靠你自己电脑上跑的后台服务（<code className="rounded bg-muted px-1">server/server.js</code>）转发请求：
                <b className="text-foreground">API Key 只存在你本机的 server/.env 里，不会上传到公网</b>。
                线上页面是纯静态托管，只能放网页文件、跑不了后台，所以用公网地址访问时对话功能天然连不上——
                <b className="text-foreground">这是预期状态，不是页面出错</b>，页面其余功能（训练建议、计划等）不受影响。
              </p>
              <p className="font-semibold text-foreground">想用对话功能，按三步把后台开起来：</p>
              <ol className="list-decimal space-y-0.5 pl-4">
                <li>在本机打开项目目录（例如 <code className="rounded bg-muted px-1">D:\雄性意志</code>）</li>
                <li>
                  双击 <code className="rounded bg-muted px-1">启动网站.bat</code>，或在该目录执行
                  <code className="rounded bg-muted px-1">node server/server.js</code>（默认监听 127.0.0.1:8787）
                </li>
                <li>把后台地址填到下面，点「连接」</li>
              </ol>
              <p className="text-[11px]">
                直连本机地址（<code className="rounded bg-muted px-1">http://127.0.0.1:8787</code>）在 Chrome / Edge / Firefox 可用；
                若被浏览器拦截，回到本机用 <code className="rounded bg-muted px-1">npm run dev</code> 打开
                <code className="rounded bg-muted px-1">http://localhost:26666</code> 即可，功能完全一样。
                地址只保存在你自己的浏览器里，随时可点「恢复默认」清除。
              </p>
            </div>
            <BackendAddressForm
              value={address}
              onChange={setAddress}
              onApply={applyAddress}
              onReset={clearAddress}
              busy={busy}
              custom={customBase}
            />
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => reconnect()}
                disabled={busy}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                重试连接
              </Button>
              {offlineDetail && <span className="text-[11px] text-muted-foreground/80">诊断：{offlineDetail}</span>}
            </div>
          </div>
        )}

        {backend === 'ready' && (
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
            <span>
              后台地址：<b className="font-normal text-foreground">{apiBase || '同源 /api（本地开发代理）'}</b>
              {customBase && ' · 自定义'}
            </span>
            <button
              type="button"
              className="underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground"
              onClick={() => setShowAddress((v) => !v)}
            >
              {showAddress ? '收起' : '修改'}
            </button>
          </p>
        )}
        {showAddress && backend !== 'offline' && (
          <BackendAddressForm
            value={address}
            onChange={setAddress}
            onApply={applyAddress}
            onReset={clearAddress}
            busy={busy}
            custom={customBase}
            applyLabel="保存并连接"
          />
        )}

        {current && (
          <p className="text-xs text-muted-foreground">
            当前模型：<b className="text-foreground">{current.model || '未填写 MODEL'}</b>
            {!current.configured && <span className="text-warning"> · 尚未配置，去 server/.env 填 Key</span>}
          </p>
        )}

        <div ref={listRef} className="max-h-80 space-y-2 overflow-y-auto rounded-md border border-border bg-muted/30 p-3">
          {messages.length === 0 ? (
            <p className="py-6 text-center text-xs text-muted-foreground">
              问点具体的，比如“今天练背，只睡了 6 小时，重量怎么调？”
            </p>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  'whitespace-pre-wrap rounded-md px-3 py-2 text-sm leading-relaxed',
                  m.role === 'user' ? 'bg-primary/10 text-foreground' : 'bg-background text-foreground/90',
                )}
              >
                <span className="mb-0.5 block text-[10px] uppercase tracking-wide text-muted-foreground">
                  {m.role === 'user' ? '我' : (current?.label ?? 'AI')}
                </span>
                {m.content || (sending ? '…' : '')}
              </div>
            ))
          )}
        </div>

        {error && (
          <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs leading-relaxed text-destructive">
            {error}
          </p>
        )}

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void handleSend();
              }
            }}
            placeholder={backend === 'offline' ? '本地后台未连接，先按上方说明启动后台' : '输入你的问题，回车发送'}
            disabled={sending || backend === 'offline'}
          />
          <Button
            type="button"
            onClick={() => void handleSend()}
            disabled={sending || backend === 'offline' || !input.trim()}
          >
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
          {messages.length > 0 && (
            <Button
              type="button"
              variant="outline"
              title="清空对话"
              onClick={() => {
                abortRef.current?.abort();
                setMessages([]);
                setError('');
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ── 后台地址设置：线上页面连回本机后台（server/server.js）用，写入 localStorage 持久化 ──
function BackendAddressForm({
  value,
  onChange,
  onApply,
  onReset,
  busy,
  custom,
  applyLabel = '连接',
}: {
  value: string;
  onChange: (v: string) => void;
  onApply: () => void;
  onReset: () => void;
  busy: boolean;
  custom: boolean;
  applyLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onApply();
          }
        }}
        placeholder={`${LOCAL_BACKEND_HINT}（留空＝同源 /api）`}
        aria-label="后台地址"
        className="h-8 text-xs sm:flex-1"
        disabled={busy}
      />
      <Button type="button" size="sm" onClick={onApply} disabled={busy}>
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : applyLabel}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => onChange(LOCAL_BACKEND_HINT)}
        disabled={busy}
      >
        填本机默认
      </Button>
      {custom && (
        <Button type="button" size="sm" variant="outline" onClick={onReset} disabled={busy}>
          恢复默认
        </Button>
      )}
    </div>
  );
}
