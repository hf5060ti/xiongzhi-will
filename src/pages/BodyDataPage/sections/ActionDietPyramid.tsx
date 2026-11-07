// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 行动导向饮食框架：把「身体数据页」算出的每日热量 + 三大营养素目标，
// 直接翻译成一份「水煮肉 + 彩虹粉剂」的简易饮食框架，并用金字塔图表呈现。
// 数据口径与 nutrition-targets.ts 的 getDailyTargets() 完全一致，不另起公式。

import { useMemo } from 'react';
import { Sparkles, UtensilsCrossed } from 'lucide-react';
import { getDailyTargets, type DailyTargets } from '@/lib/nutrition-targets';

/** 金字塔每层宽度：底边 100%，顶边收窄到 TOP_W，中间 5 等分斜面。 */
const TOP_W = 30;
const STEP = (100 - TOP_W) / 5;

interface Layer {
  key: string;
  title: string;
  sub: string;
  foods: string;
  /** 该层对应的量化目标文字（克数或吃法令） */
  grams: (t: DailyTargets) => string;
  note: string;
  /** 固定配色：明度适中、深色文字在明暗双主题下都清晰 */
  color: string;
}

// 顺序：索引 0 = 金字塔底层（最宽），向上递减。
const LAYERS: Layer[] = [
  {
    key: 'carb',
    title: '碳水主食',
    sub: '能量地基',
    foods: '糙米 · 燕麦 · 红薯 · 全麦',
    grams: (t) => `${t.carb} g`,
    note: '每餐约一拳头，训练日偏多',
    color: '#F2CC8F',
  },
  {
    key: 'veg',
    title: '彩虹蔬菜',
    sub: '微量营养素',
    foods: '西兰花 · 胡萝卜 · 紫甘蓝 · 番茄',
    grams: () => '盘盘有',
    note: '体积管够，颜色越杂越好',
    color: '#7FB069',
  },
  {
    key: 'protein',
    title: '水煮肉 · 优质蛋白',
    sub: '肌肉砖块',
    foods: '鸡胸 · 牛里脊 · 鱼虾 · 蛋',
    grams: (t) => `${t.protein} g`,
    note: '每餐一掌，水煮或少油煎',
    color: '#E07A5F',
  },
  {
    key: 'powder',
    title: '彩虹粉剂',
    sub: '精准补剂',
    foods: '乳清蛋白 · 肌酸 · 鱼油 · 维矿',
    grams: () => '训练后 1 勺 + 肌酸 5g',
    note: '补缺口，不替代正餐',
    color: '#9A8C98',
  },
  {
    key: 'fat',
    title: '好脂肪 · 水 · 调味',
    sub: '顶层点缀',
    foods: '橄榄油 · 坚果 · 柠檬 · 3L 水',
    grams: () => '适量',
    note: '少油少盐，水要喝够',
    color: '#A9C7E8',
  },
];

interface Meal {
  name: string;
  share: number;
  items: string[];
}

function buildDay(t: DailyTargets): Meal[] {
  const c = t.carb;
  const p = t.protein;
  return [
    {
      name: '早餐',
      share: 0.25,
      items: ['鸡蛋 3 个', `燕麦 ${Math.round(c * 0.18)} g（干）`, '牛奶 250 ml'],
    },
    {
      name: '上午加餐',
      share: 0.1,
      items: ['乳清蛋白 1 勺', '香蕉 1 根'],
    },
    {
      name: '午餐',
      share: 0.3,
      items: [
        `水煮鸡胸 ${Math.round(p * 0.3)} g`,
        `糙米 ${Math.round(c * 0.3)} g（干）`,
        '西兰花 / 胡萝卜 一盘',
      ],
    },
    {
      name: '训练后',
      share: 0.1,
      items: ['乳清蛋白 1 勺', '肌酸 5 g'],
    },
    {
      name: '晚餐',
      share: 0.25,
      items: [
        `牛里脊 / 鱼 ${Math.round(p * 0.3)} g`,
        `红薯 ${Math.round(c * 0.22)} g`,
        '彩虹蔬菜一盘',
      ],
    },
  ];
}

export default function ActionDietPyramid() {
  const t = useMemo(() => getDailyTargets(), []);
  const hasData = t.kcal > 0;
  const day = useMemo(() => (hasData ? buildDay(t) : []), [hasData, t]);

  return (
    <section className="space-y-4 rounded-lg border border-primary/40 bg-card p-4 sm:p-5">
      <div>
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          行动导向饮食框架 · 水煮肉 + 彩虹粉剂
        </p>
        <p className="mt-1 type-meta text-muted-foreground">
          不再只给数字：下方金字塔把每日热量与三大营养素目标，直接翻译成一份可照做的简易饮食框架。
          口径与上方「热量目标」完全一致。
        </p>
      </div>

      {!hasData ? (
        <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 p-8 text-center">
          <UtensilsCrossed className="h-7 w-7 text-primary/70" />
          <p className="text-sm text-muted-foreground">
            先填好身体数据与饮食方案，这里会自动生成你的专属饮食金字塔。
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_1fr]">
          {/* 左：金字塔 */}
          <div className="mx-auto w-full max-w-[340px]">
            <div className="flex flex-col">
              {LAYERS.map((layer, i) => {
                const wB = 100 - STEP * i;
                const wT = 100 - STEP * (i + 1);
                const clip = `polygon(${(100 - wB) / 2}% 100%, ${(100 + wB) / 2}% 100%, ${(100 + wT) / 2}% 0%, ${(100 - wT) / 2}% 0%)`;
                return (
                  <div
                    key={layer.key}
                    className="relative mb-1 flex h-[58px] items-center justify-center text-center"
                    style={{ clipPath: clip, backgroundColor: layer.color, color: '#1A1A1A' }}
                  >
                    <div className="px-6">
                      <p className="font-display text-base font-extrabold leading-tight">
                        {layer.title}
                        <span className="ml-1.5 text-xs font-bold opacity-70">{layer.grams(t)}</span>
                      </p>
                      <p className="text-[11px] leading-tight opacity-80">{layer.foods}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              底层吃最多，越往上越「精」——肉与粉是加码项，不是主食。
            </p>
          </div>

          {/* 右：数字 + 一日参考 */}
          <div className="space-y-4">
            {/* 三大营养素数字 */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <Stat label="每日热量目标" value={t.kcalRangeText} unit="kcal" />
              <Stat label="蛋白质" value={`${t.protein}`} unit="g" accent />
              <Stat label="碳水" value={`${t.carb}`} unit="g" />
              <Stat label="脂肪" value={`${t.fat}`} unit="g" />
            </div>

            {/* 一日参考餐单 */}
            <div className="rounded-md border border-border bg-muted/30 p-3">
              <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <UtensilsCrossed className="h-4 w-4 text-primary" />
                一日参考餐单（模板，按口味微调）
              </p>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {day.map((m) => (
                  <div key={m.name} className="rounded-md border border-border bg-background/40 p-2.5">
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-semibold text-foreground">{m.name}</p>
                      <span className="text-[11px] text-muted-foreground">
                        约 {Math.round(t.kcal * m.share)} kcal
                      </span>
                    </div>
                    <ul className="mt-1 space-y-0.5">
                      {m.items.map((it) => (
                        <li key={it} className="text-xs text-muted-foreground">
                          · {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                蛋白 / 碳水克数按你当天目标拆分；粉剂与肌酸补在训练后，正餐优先水煮肉与彩虹蔬菜。
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="rounded-md border border-border bg-muted/40 p-3 type-meta text-muted-foreground">
        框架为通用参考，不替代专业营养建议。数据为估算（误差常见 ±10–15%），且只存在当前浏览器本地。
      </p>
    </section>
  );
}

function Stat({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-md border border-border bg-background/40 p-2.5 text-center">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-xl font-extrabold ${accent ? 'text-primary' : 'text-foreground'}`}>
        {value}
        <span className="ml-1 text-xs font-bold text-muted-foreground">{unit}</span>
      </p>
    </div>
  );
}
