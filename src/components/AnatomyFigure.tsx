// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 目标肌群解剖图：使用真实人体肌肉解剖图作底图，按当前动作把对应肌群「涂黑」以便区分。
// - 正背分布图（muscles-overview.webp）叠加 SVG 高亮层，坐标见 data/anatomy-regions.json
// - 精细标注图（muscles-detail.webp）作为对照查阅
// - 主发力 = 纯黑实心；协同 = 半透明黑 + 虚线描边；两者都带白色部位名标签
// - 支持按动作名细分到「上胸 / 下胸 / 三角中束」等具体部位
import { useMemo, useState } from 'react';
import { Layers } from 'lucide-react';
import { BASE } from '@/lib/base';
import regionData from '@/data/anatomy-regions.json';

const OVERVIEW = `${BASE}images/anatomy/muscles-overview.webp`;
const DETAIL = `${BASE}images/anatomy/muscles-detail.webp`;

interface Region {
  id: string;
  group: string;
  label: string;
  view: 'front' | 'back';
  x: number;
  y: number;
  w: number;
  h: number;
}

const REGIONS = regionData.regions as Region[];
const VB_W = regionData.width;
const VB_H = regionData.height;

/** 肌群中文名（覆盖动作库出现的全部 key） */
const MUSCLE_CN: Record<string, string> = {
  quadriceps: '股四头肌',
  hamstrings: '腘绳肌',
  glutes: '臀肌',
  calves: '小腿',
  chest: '胸大肌',
  shoulders: '三角肌',
  triceps: '三头肌',
  biceps: '二头肌',
  abdominals: '腹肌',
  lats: '背阔肌',
  'middle back': '上背部',
  'lower back': '下背部',
  forearms: '前臂',
  traps: '斜方肌',
  adductors: '内收肌',
  abductors: '外展肌',
  neck: '颈部',
  cardio: '心肺',
};

interface SubRule {
  /** 命中动作名（中文或英文） */
  test: RegExp;
  /** 该规则作用的目标肌群 group */
  group: string;
  /** 只高亮这些细分区域 */
  ids: string[];
  /** 细分部位显示名 */
  label: string;
}

/**
 * 动作名 → 细分部位。命中时，该 group 只涂指定区域，而不是整块肌群。
 * 例：上斜卧推 → 只涂「上胸」，与平板卧推（整块胸）一眼可区分。
 */
const SUB_RULES: SubRule[] = [
  { test: /上斜|incline/i, group: 'chest', ids: ['chest_upper_l', 'chest_upper_r'], label: '上胸（锁骨部）' },
  { test: /下斜|decline/i, group: 'chest', ids: ['chest_lower_l', 'chest_lower_r'], label: '下胸（胸骨部）' },
  { test: /侧平举|lateral raise/i, group: 'shoulders', ids: ['delt_front_l', 'delt_front_r'], label: '三角中束' },
  { test: /前平举|front raise/i, group: 'shoulders', ids: ['delt_front_l', 'delt_front_r'], label: '三角前束' },
  { test: /俯身飞鸟|反向飞鸟|面拉|rear delt|reverse fly|face pull/i, group: 'shoulders', ids: ['rear_delt_l', 'rear_delt_r'], label: '三角后束' },
  { test: /腿屈伸|leg extension/i, group: 'quadriceps', ids: ['quads_l', 'quads_r'], label: '股四头肌' },
  { test: /腿弯举|leg curl|罗马尼亚|romanian/i, group: 'hamstrings', ids: ['hams_l', 'hams_r'], label: '腘绳肌' },
  { test: /提踵|calf raise/i, group: 'calves', ids: ['calves_back_l', 'calves_back_r', 'calves_front_l', 'calves_front_r'], label: '小腿三头肌' },
  { test: /卷腹|举腿|crunch|leg raise/i, group: 'abdominals', ids: ['abs'], label: '腹直肌' },
  { test: /俄罗斯转体|体侧屈|side bend|russian twist/i, group: 'abdominals', ids: ['obliques_l', 'obliques_r'], label: '腹外斜肌' },
  { test: /耸肩|shrug/i, group: 'traps', ids: ['traps_front_l', 'traps_front_r', 'traps_back'], label: '斜方肌上束' },
];

/** 把动作的主/协同肌群解析成要涂黑的区域 id + 展示标签 */
function resolveHighlights(
  exerciseName: string,
  primaryMuscles: string[],
  secondaryMuscles: string[],
) {
  const byGroup = new Map<string, Region[]>();
  for (const r of REGIONS) {
    const list = byGroup.get(r.group) ?? [];
    list.push(r);
    byGroup.set(r.group, list);
  }

  const expand = (groups: string[]) => {
    const ids: string[] = [];
    const labels: string[] = [];
    for (const g of groups) {
      const regions = byGroup.get(g);
      if (!regions) continue;
      const rule = SUB_RULES.find((s) => s.group === g && s.test.test(exerciseName));
      if (rule) {
        ids.push(...rule.ids);
        labels.push(rule.label);
      } else {
        ids.push(...regions.map((r) => r.id));
        labels.push(MUSCLE_CN[g] || g);
      }
    }
    return { ids, labels };
  };

  const p = expand(primaryMuscles);
  const s = expand(secondaryMuscles);
  // 同一区域若同时是主发力和协同，以主发力为准
  const pSet = new Set(p.ids);
  return {
    primaryIds: pSet,
    secondaryIds: new Set(s.ids.filter((id) => !pSet.has(id))),
    primaryLabels: [...new Set(p.labels)],
    secondaryLabels: [...new Set(s.labels)],
    knownGroups: primaryMuscles.concat(secondaryMuscles).filter((g) => byGroup.has(g)),
  };
}

function HighlightLayer({
  primaryIds,
  secondaryIds,
}: {
  primaryIds: Set<string>;
  secondaryIds: Set<string>;
}) {
  const active = REGIONS.filter((r) => primaryIds.has(r.id) || secondaryIds.has(r.id));
  // 同一 group + 标签只在第一个区域上挂一次，避免左右对称重复
  const seen = new Set<string>();

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="按当前动作涂黑的目标肌群"
    >
      {active.map((r) => {
        const isPrimary = primaryIds.has(r.id);
        const key = `${r.group}-${r.label}-${isPrimary ? 'p' : 's'}`;
        const showLabel = !seen.has(key);
        if (showLabel) seen.add(key);
        // 标签只放在纯黑的主发力块内（白字）；协同块靠虚线边框 + 下方图例区分，
        // 半透明底上再压白字会发糊。标签内置也避免浮动标签互相重叠或盖住原图中文标注。
        const fontSize = Math.min(15, Math.max(11, (r.w - 12) / Math.max(r.label.length, 1)));
        const fits = isPrimary && r.w >= 62 && r.h >= 30;
        return (
          <g key={r.id}>
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              rx={11}
              fill="#0A0A0A"
              fillOpacity={isPrimary ? 0.92 : 0.56}
              stroke="#FFFFFF"
              strokeOpacity={isPrimary ? 0.92 : 0.7}
              strokeWidth={isPrimary ? 2.4 : 1.8}
              strokeDasharray={isPrimary ? undefined : '9 6'}
            />
            {showLabel && fits && (
              <text
                x={r.x + r.w / 2}
                y={r.y + r.h / 2 + fontSize * 0.35}
                textAnchor="middle"
                fontSize={fontSize}
                fontWeight={700}
                fill="#FFFFFF"
                stroke="#0A0A0A"
                strokeWidth={2.5}
                paintOrder="stroke"
                fontFamily="'Noto Sans SC', sans-serif"
              >
                {r.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function AnatomyFigure({
  primaryMuscles,
  secondaryMuscles,
  exerciseName = '',
}: {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  /** 动作中文名 + 英文名，用于细分到上胸/下胸等具体部位 */
  exerciseName?: string;
}) {
  const [tab, setTab] = useState<'overview' | 'detail'>('overview');
  const h = useMemo(
    () => resolveHighlights(exerciseName, primaryMuscles, secondaryMuscles),
    [exerciseName, primaryMuscles, secondaryMuscles],
  );
  const hasHighlight = h.primaryIds.size + h.secondaryIds.size > 0;

  return (
    <div className="rounded-lg border border-border bg-card p-3.5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
          <Layers className="h-4 w-4 text-primary" />
          目标肌群解剖图
        </h3>
        <div className="inline-flex rounded-md border border-border bg-background/60 p-0.5">
          <button
            type="button"
            onClick={() => setTab('overview')}
            className={`min-h-8 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              tab === 'overview' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            正背分布
          </button>
          <button
            type="button"
            onClick={() => setTab('detail')}
            className={`min-h-8 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
              tab === 'detail' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            精细标注
          </button>
        </div>
      </div>

      {tab === 'overview' ? (
        <div className="relative overflow-hidden rounded-md border border-border bg-white">
          <img src={OVERVIEW} alt="人体主要肌肉分布图（正面与背面）" className="block w-full" loading="lazy" />
          {hasHighlight && <HighlightLayer primaryIds={h.primaryIds} secondaryIds={h.secondaryIds} />}
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-border bg-[#f4f3ee]">
          <img src={DETAIL} alt="人体全部肌肉标注图（正面精细标注与背面小图）" className="block w-full" loading="lazy" />
        </div>
      )}

      <p className="mt-2 text-center text-[11px] text-muted-foreground">
        {tab === 'overview'
          ? '按当前动作把目标部位涂黑区分 · 左为正面、右为背面'
          : '精细标注图：可对照查阅各肌群名称与分区'}
      </p>

      <div className="mt-2 space-y-1.5 border-t border-border pt-2">
        {hasHighlight ? (
          <>
            {h.primaryLabels.length > 0 && (
              <p className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="inline-block h-3 w-3 rounded-sm bg-[#0A0A0A]" />
                <span className="font-medium text-foreground">主发力（涂黑）：</span>
                {h.primaryLabels.map((l) => (
                  <span key={l} className="rounded bg-foreground/10 px-1.5 py-0.5 font-medium text-foreground">{l}</span>
                ))}
              </p>
            )}
            {h.secondaryLabels.length > 0 && (
              <p className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="inline-block h-3 w-3 rounded-sm border border-dashed border-foreground/60 bg-foreground/40" />
                <span className="font-medium text-foreground">协同：</span>
                {h.secondaryLabels.map((l) => (
                  <span key={l} className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground">{l}</span>
                ))}
              </p>
            )}
            {h.knownGroups.length === 0 && (
              <p className="text-xs text-muted-foreground">该动作暂无可定位的肌群标注（如心肺类）。</p>
            )}
          </>
        ) : (
          <p className="text-xs text-muted-foreground">该动作暂无肌群标注，可切换「精细标注」查阅完整肌肉名称。</p>
        )}
      </div>
    </div>
  );
}
