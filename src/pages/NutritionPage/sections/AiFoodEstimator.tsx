import { useRef, useState, type FormEvent } from 'react';
import { Bot, Calculator, Loader2, RefreshCw, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  chatStream,
  fetchProviders,
  hasSiliconflowKey,
  type ChatMessage,
} from '@/lib/ai';

interface FoodEstimate {
  energy: string; // 每100g kcal
  protein: string;
  fat: string;
  carb: string;
  fiber: string;
  sodium: string;
}

const EMPTY_EST: FoodEstimate = { energy: '', protein: '', fat: '', carb: '', fiber: '', sodium: '' };

type AiState = 'idle' | 'loading' | 'ready' | 'error';

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

function extractJson(text: string): Partial<Record<keyof FoodEstimate, number>> | null {
  // 先找 JSON 对象
  const brace = text.indexOf('{');
  const endBrace = text.lastIndexOf('}');
  if (brace !== -1 && endBrace > brace) {
    const candidate = text.slice(brace, endBrace + 1);
    try {
      const parsed = JSON.parse(candidate) as Record<string, unknown>;
      const out: Partial<Record<keyof FoodEstimate, number>> = {};
      const map: Array<[string, keyof FoodEstimate]> = [
        ['energy', 'energy'],
        ['kcal', 'energy'],
        ['热量', 'energy'],
        ['protein', 'protein'],
        ['蛋白质', 'protein'],
        ['fat', 'fat'],
        ['脂肪', 'fat'],
        ['carb', 'carb'],
        ['carbohydrate', 'carb'],
        ['碳水', 'carb'],
        ['fiber', 'fiber'],
        ['纤维', 'fiber'],
        ['sodium', 'sodium'],
        ['钠', 'sodium'],
      ];
      for (const [key, target] of map) {
        const v = parsed[key] ?? parsed[target];
        if (typeof v === 'number' && Number.isFinite(v)) {
          out[target] = v;
        }
      }
      return Object.keys(out).length > 0 ? out : null;
    } catch {
      /* fallthrough */
    }
  }
  // 兜底：正则提取数值
  const num = (re: RegExp) => {
    const m = text.match(re);
    return m && m[1] ? parseFloat(m[1]) : undefined;
  };
  const out: Partial<Record<keyof FoodEstimate, number>> = {};
  const v = num(/(?:能量|热量|kcal|energy)[^0-9]{0,12}(\d+(?:\.\d+)?)/i);
  if (v !== undefined) out.energy = v;
  const p = num(/(?:蛋白质|蛋白|protein)[^0-9]{0,12}(\d+(?:\.\d+)?)/i);
  if (p !== undefined) out.protein = p;
  const f = num(/(?:脂肪|fat)[^0-9]{0,12}(\d+(?:\.\d+)?)/i);
  if (f !== undefined) out.fat = f;
  const c = num(/(?:碳水化合物|碳水|carb)[^0-9]{0,12}(\d+(?:\.\d+)?)/i);
  if (c !== undefined) out.carb = c;
  const fi = num(/(?:膳食纤维|纤维|fiber)[^0-9]{0,12}(\d+(?:\.\d+)?)/i);
  if (fi !== undefined) out.fiber = fi;
  const s = num(/(?:钠|sodium)[^0-9]{0,12}(\d+(?:\.\d+)?)/i);
  if (s !== undefined) out.sodium = s;
  return Object.keys(out).length > 0 ? out : null;
}

export default function AiFoodEstimator() {
  const [desc, setDesc] = useState('');
  const [state, setState] = useState<AiState>('idle');
  const [err, setErr] = useState('');
  const [est, setEst] = useState<FoodEstimate>(EMPTY_EST);
  const [rawAi, setRawAi] = useState('');
  const [grams, setGrams] = useState('');
  const [providerReady, setProviderReady] = useState<boolean | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const checkProvider = async () => {
    try {
      const list = await fetchProviders();
      setProviderReady(list.length > 0);
    } catch {
      setProviderReady(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const d = desc.trim();
    if (!d) return;
    if (providerReady === null) await checkProvider();

    setState('loading');
    setErr('');
    setRawAi('');
    setEst(EMPTY_EST);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const systemPrompt =
      '你是一名运动营养师。用户会描述一种食物（可能包含份量描述），请估算其「每 100 克（可食部）」的营养成分。' +
      '只输出一个 JSON 对象，不要任何其他文字、不要 markdown 代码块。格式：' +
      '{"energy": 热量kcal, "protein": 蛋白质g, "fat": 脂肪g, "carb": 碳水化合物g, "fiber": 膳食纤维g(没有写0), "sodium": 钠mg(没有写0)}。' +
      '数值参考《中国食物成分表》与常见食物营养数据库；若用户描述的是熟食/菜品，按常见做法的熟重估算；' +
      '若无法确定，给出合理估计并保证能量与三大营养素大致自洽（1g蛋白4kcal、1g碳水4kcal、1g脂肪9kcal）。';

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: d },
    ];

    let aiText = '';
    try {
      const providers = await fetchProviders();
      const provider = providers[0]?.id ?? '';
      await chatStream({
        provider,
        messages,
        signal: ctrl.signal,
        onDelta: (t) => {
          aiText += t;
          setRawAi(aiText);
        },
      });
      const parsed = extractJson(aiText);
      if (parsed) {
        setEst({
          energy: parsed.energy !== undefined ? String(parsed.energy) : '',
          protein: parsed.protein !== undefined ? String(parsed.protein) : '',
          fat: parsed.fat !== undefined ? String(parsed.fat) : '',
          carb: parsed.carb !== undefined ? String(parsed.carb) : '',
          fiber: parsed.fiber !== undefined ? String(parsed.fiber) : '',
          sodium: parsed.sodium !== undefined ? String(parsed.sodium) : '',
        });
        setState('ready');
      } else {
        setErr('AI 返回的内容里没能提取出营养数值，可重试或换一种描述方式。');
        setState('error');
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'AI 请求失败，请检查网络与 Key 配置。');
      setState('error');
    }
  };

  const setField =
    (key: keyof FoodEstimate) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setEst((prev) => ({ ...prev, [key]: e.target.value }));

  const g = parseFloat(grams);
  const validGrams = Number.isFinite(g) && g > 0;
  const ratio = validGrams ? g / 100 : 0;
  const hasEst = Object.values(est).some((v) => v.trim() !== '');

  const resultRows = [
    { label: '热量', unit: 'kcal', v: parseFloat(est.energy), has: Boolean(est.energy) },
    { label: '蛋白质', unit: 'g', v: parseFloat(est.protein), has: Boolean(est.protein) },
    { label: '脂肪', unit: 'g', v: parseFloat(est.fat), has: Boolean(est.fat) },
    { label: '碳水', unit: 'g', v: parseFloat(est.carb), has: Boolean(est.carb) },
    { label: '膳食纤维', unit: 'g', v: parseFloat(est.fiber), has: Boolean(est.fiber) },
    { label: '钠', unit: 'mg', v: parseFloat(est.sodium), has: Boolean(est.sodium) },
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        <h2 className="font-display text-xl font-extrabold text-foreground">AI 热量估算</h2>
        <Badge variant="outline" className="px-2 py-0.5 text-[11px]">描述食物 → 自动算</Badge>
      </div>
      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
        用一句话描述你吃的东西（尽量带上做法与大致份量，如「一碗蛋炒饭大概 200 克」），
        AI 会按《中国食物成分表》口径估算每 100g 的营养数据；你再填实际吃了多少克，系统自动换算成你的实际摄入。
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Textarea
          rows={2}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="例：食堂的一碗蛋炒饭，大概 200 克；或：半斤酱牛肉；或：一杯牦牛奶"
          className="text-sm"
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={state === 'loading' || !desc.trim()}>
            {state === 'loading' ? (
              <>
                <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                AI 估算中…
              </>
            ) : (
              <>
                <Wand2 className="mr-1.5 h-4 w-4" />
                AI 估算每 100g
              </>
            )}
          </Button>
          {!hasSiliconflowKey() && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                window.location.hash = '#/coach';
              }}
            >
              去配置 AI Key
            </Button>
          )}
        </div>
      </form>

      {state === 'error' && (
        <p className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 p-2.5 text-xs text-destructive">
          {err}
        </p>
      )}

      {state === 'ready' && (
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium text-foreground">
              AI 估算每 100g 营养（可手动微调）
            </p>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setState('idle')}>
              <RefreshCw className="mr-1 h-3.5 w-3.5" />
              重新估算
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            <EstField label="热量 kcal/100g" value={est.energy} onChange={setField('energy')} />
            <EstField label="蛋白质 g/100g" value={est.protein} onChange={setField('protein')} />
            <EstField label="脂肪 g/100g" value={est.fat} onChange={setField('fat')} />
            <EstField label="碳水 g/100g" value={est.carb} onChange={setField('carb')} />
            <EstField label="纤维 g/100g" value={est.fiber} onChange={setField('fiber')} />
            <EstField label="钠 mg/100g" value={est.sodium} onChange={setField('sodium')} />
          </div>

          <div className="max-w-xs">
            <label htmlFor="ai-grams" className="text-xs text-muted-foreground">
              实际吃了多少克
            </label>
            <Input
              id="ai-grams"
              type="number"
              min={0}
              placeholder="如 200"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              className="mt-1"
            />
          </div>

          {validGrams && hasEst ? (
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
                <Calculator className="h-4 w-4 text-primary" />
                你的实际摄入（按 {g} / 100g 换算）
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                {resultRows.map((row) => (
                  <div key={row.label} className="rounded-md border border-border bg-muted/40 p-2.5 text-center">
                    <p className="font-display text-base font-bold leading-none text-foreground">
                      {row.has ? `${round1(row.v * ratio)} ${row.unit}` : '—'}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{row.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                AI 估算仅供参考，不是精确值；有包装以实物营养表为准，有秤尽量上秤。
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              填写实际克数后，这里自动给出换算好的热量与营养。
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface EstFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function EstField({ label, value, onChange }: EstFieldProps) {
  return (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <Input type="number" min={0} value={value} onChange={onChange} className="mt-1" />
    </div>
  );
}
