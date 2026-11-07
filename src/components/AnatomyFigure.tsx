// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 目标肌群解剖图：正面 / 背面人体示意，按所选动作的高亮主发力肌群（金）与协同肌群（浅金）。
// 采用风格化人体区块（非医学级解剖），重点是把"练哪里"一眼看懂；颜色走 CSS 变量，明暗双主题自适应。
import { type ReactNode } from 'react';

/** 肌群中文名（覆盖动作库出现的全部 key） */
const MUSCLE_CN: Record<string, string> = {
  quadriceps: '股四头肌',
  hamstrings: '腘绳肌',
  glutes: '臀肌',
  calves: '小腿',
  chest: '胸肌',
  shoulders: '肩部',
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

type RegionEl =
  | { t: 'ellipse'; cx: number; cy: number; rx: number; ry: number }
  | { t: 'rect'; x: number; y: number; w: number; h: number; rx?: number }
  | { t: 'poly'; points: string };

interface Region {
  key: string;
  view: 'front' | 'back';
  el: RegionEl;
}

// 风格化人体区块坐标（viewBox 0 0 220 470）。坐标只求神似、不求精确。
const REGIONS: Region[] = [
  // 肩（三角肌）
  { key: 'shoulders', view: 'front', el: { t: 'ellipse', cx: 72, cy: 116, rx: 19, ry: 17 } },
  { key: 'shoulders', view: 'front', el: { t: 'ellipse', cx: 148, cy: 116, rx: 19, ry: 17 } },
  // 胸
  { key: 'chest', view: 'front', el: { t: 'ellipse', cx: 92, cy: 132, rx: 23, ry: 25 } },
  { key: 'chest', view: 'front', el: { t: 'ellipse', cx: 128, cy: 132, rx: 23, ry: 25 } },
  // 二头
  { key: 'biceps', view: 'front', el: { t: 'ellipse', cx: 60, cy: 182, rx: 12, ry: 22 } },
  { key: 'biceps', view: 'front', el: { t: 'ellipse', cx: 160, cy: 182, rx: 12, ry: 22 } },
  // 前臂
  { key: 'forearms', view: 'front', el: { t: 'ellipse', cx: 55, cy: 236, rx: 9, ry: 26 } },
  { key: 'forearms', view: 'front', el: { t: 'ellipse', cx: 165, cy: 236, rx: 9, ry: 26 } },
  // 腹
  { key: 'abdominals', view: 'front', el: { t: 'rect', x: 95, y: 160, w: 30, h: 76, rx: 9 } },
  // 内收肌（大腿内侧）
  { key: 'adductors', view: 'front', el: { t: 'rect', x: 103, y: 300, w: 14, h: 84, rx: 7 } },
  // 股四头
  { key: 'quadriceps', view: 'front', el: { t: 'rect', x: 82, y: 294, w: 25, h: 108, rx: 12 } },
  { key: 'quadriceps', view: 'front', el: { t: 'rect', x: 113, y: 294, w: 25, h: 108, rx: 12 } },
  // 小腿（前）
  { key: 'calves', view: 'front', el: { t: 'rect', x: 86, y: 410, w: 22, h: 46, rx: 11 } },
  { key: 'calves', view: 'front', el: { t: 'rect', x: 112, y: 410, w: 22, h: 46, rx: 11 } },
  // 颈
  { key: 'neck', view: 'front', el: { t: 'rect', x: 99, y: 58, w: 22, h: 18, rx: 8 } },

  // 背面：斜方肌（上背三角）
  { key: 'traps', view: 'back', el: { t: 'poly', points: '92,96 128,96 118,140 110,150 102,140' } },
  // 背阔 / 上背（V 形）
  { key: 'lats', view: 'back', el: { t: 'ellipse', cx: 110, cy: 150, rx: 44, ry: 30 } },
  { key: 'middle back', view: 'back', el: { t: 'ellipse', cx: 110, cy: 152, rx: 34, ry: 22 } },
  // 下背
  { key: 'lower back', view: 'back', el: { t: 'rect', x: 96, y: 178, w: 28, h: 40, rx: 10 } },
  // 三头（臂后侧）
  { key: 'triceps', view: 'back', el: { t: 'ellipse', cx: 60, cy: 182, rx: 12, ry: 22 } },
  { key: 'triceps', view: 'back', el: { t: 'ellipse', cx: 160, cy: 182, rx: 12, ry: 22 } },
  // 臀
  { key: 'glutes', view: 'back', el: { t: 'ellipse', cx: 96, cy: 250, rx: 20, ry: 22 } },
  { key: 'glutes', view: 'back', el: { t: 'ellipse', cx: 124, cy: 250, rx: 20, ry: 22 } },
  // 腘绳（大腿后）
  { key: 'hamstrings', view: 'back', el: { t: 'rect', x: 82, y: 294, w: 25, h: 108, rx: 12 } },
  { key: 'hamstrings', view: 'back', el: { t: 'rect', x: 113, y: 294, w: 25, h: 108, rx: 12 } },
  // 小腿（后）
  { key: 'calves', view: 'back', el: { t: 'rect', x: 86, y: 410, w: 22, h: 46, rx: 11 } },
  { key: 'calves', view: 'back', el: { t: 'rect', x: 112, y: 410, w: 22, h: 46, rx: 11 } },
];

/** 中性人体底图（viewBox 0 0 220 470），用低对比色勾出人形，让高亮肌群有承载 */
function BodySilhouette() {
  return (
    <g fill="var(--muted-foreground)" fillOpacity={0.10} stroke="var(--border)" strokeWidth={1}>
      <circle cx={110} cy={40} r={24} />
      <rect x={98} y={60} width={24} height={18} rx={8} />
      {/* 躯干：肩 → 腰 */}
      <path d="M70 88 Q110 70 150 88 L140 210 Q110 230 80 210 Z" />
      {/* 上臂 */}
      <rect x={44} y={100} width={20} height={86} rx={10} />
      <rect x={156} y={100} width={20} height={86} rx={10} />
      {/* 前臂 */}
      <rect x={40} y={188} width={18} height={62} rx={9} />
      <rect x={162} y={188} width={18} height={62} rx={9} />
      {/* 大腿 */}
      <rect x={80} y={248} width={28} height={116} rx={14} />
      <rect x={112} y={248} width={28} height={116} rx={14} />
      {/* 小腿 */}
      <rect x={84} y={370} width={22} height={74} rx={11} />
      <rect x={114} y={370} width={22} height={74} rx={11} />
    </g>
  );
}

function renderRegion(r: Region, primary: Set<string>, secondary: Set<string>): ReactNode {
  const isPrimary = primary.has(r.key);
  const isSecondary = secondary.has(r.key);
  const fill = isPrimary || isSecondary ? 'var(--primary)' : 'var(--muted-foreground)';
  const fillOpacity = isPrimary ? 0.92 : isSecondary ? 0.34 : 0.07;
  const stroke = isPrimary ? 'var(--primary-foreground)' : 'none';
  const common = { fill, fillOpacity, stroke, strokeWidth: isPrimary ? 1.2 : 0 };

  if (r.el.t === 'ellipse') {
    return <ellipse cx={r.el.cx} cy={r.el.cy} rx={r.el.rx} ry={r.el.ry} style={common} />;
  }
  if (r.el.t === 'rect') {
    return <rect x={r.el.x} y={r.el.y} width={r.el.w} height={r.el.h} rx={r.el.rx ?? 6} style={common} />;
  }
  return <polygon points={r.el.points} style={common} />;
}

function View({ label, view, primary, secondary }: { label: string; view: 'front' | 'back'; primary: Set<string>; secondary: Set<string> }) {
  return (
    <div className="flex-1">
      <p className="mb-1 text-center text-xs font-medium text-muted-foreground">{label}</p>
      <svg viewBox="0 0 220 470" className="mx-auto h-64 w-full max-w-[200px]" role="img" aria-label={`${label}目标肌群示意`}>
        <BodySilhouette />
        {REGIONS.filter((r) => r.view === view).map((r, i) => (
          <g key={`${view}-${r.key}-${i}`}>{renderRegion(r, primary, secondary)}</g>
        ))}
      </svg>
    </div>
  );
}

export default function AnatomyFigure({
  primaryMuscles,
  secondaryMuscles,
}: {
  primaryMuscles: string[];
  secondaryMuscles: string[];
}) {
  const primary = new Set(primaryMuscles);
  const secondary = new Set(secondaryMuscles);
  const primaryLabels = primaryMuscles.map((m) => MUSCLE_CN[m] || m);
  const secondaryLabels = secondaryMuscles.map((m) => MUSCLE_CN[m] || m);

  return (
    <div className="rounded-lg border border-border bg-card p-3.5">
      <h3 className="mb-2 flex items-center gap-2 font-display text-base font-bold text-foreground">
        <span className="text-primary">◬</span> 目标肌群解剖图
      </h3>
      <div className="flex gap-2">
        <View label="正面" view="front" primary={primary} secondary={secondary} />
        <View label="背面" view="back" primary={primary} secondary={secondary} />
      </div>
      <div className="mt-2 space-y-1.5 border-t border-border pt-2">
        {primaryLabels.length > 0 && (
          <p className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: 'var(--primary)', opacity: 0.92 }} />
            <span className="font-medium text-foreground">主发力：</span>
            {primaryLabels.map((l) => (
              <span key={l} className="rounded bg-primary/15 px-1.5 py-0.5 text-primary">{l}</span>
            ))}
          </p>
        )}
        {secondaryLabels.length > 0 && (
          <p className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: 'var(--primary)', opacity: 0.34 }} />
            <span className="font-medium text-foreground">协同：</span>
            {secondaryLabels.map((l) => (
              <span key={l} className="rounded bg-muted px-1.5 py-0.5 text-muted-foreground">{l}</span>
            ))}
          </p>
        )}
        {primaryLabels.length === 0 && secondaryLabels.length === 0 && (
          <p className="text-xs text-muted-foreground">该动作暂无肌群标注。</p>
        )}
      </div>
    </div>
  );
}
