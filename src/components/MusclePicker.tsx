// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 「点哪练哪」人体导航：在解剖图上点击肌群，下方立即列出该部位的代表动作，
// 点击动作在卡片内滑出详情抽屉（不跳页），抽屉里再去动作库看完整演示与要点。挂在首页 Hero 右侧。
// 数据：anatomy-regions.json（可点区域坐标） + muscle-exercise-map.json（肌群→动作索引，构建期生成）。
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MousePointerClick, X, ArrowUpRight, Dumbbell, Activity } from 'lucide-react';
import { BASE } from '@/lib/base';
import regionData from '@/data/anatomy-regions.json';
import muscleMap from '@/data/muscle-exercise-map.json';

const OVERVIEW = `${BASE}images/anatomy/muscles-overview.webp`;

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

/** 肌群中文名（展示用） */
const GROUP_CN: Record<string, string> = {
  chest: '胸部',
  lats: '背阔肌',
  'middle back': '上背（菱形肌/冈下肌）',
  'lower back': '下背（竖脊肌）',
  traps: '斜方肌（上背）',
  shoulders: '肩部',
  biceps: '二头肌',
  triceps: '三头肌',
  forearms: '前臂',
  abdominals: '腹肌',
  neck: '颈部',
  quadriceps: '股四头肌',
  hamstrings: '腘绳肌',
  glutes: '臀肌',
  adductors: '内收肌',
  abductors: '外展肌',
  calves: '小腿',
};

/** 器械中文（徽标用） */
const EQUIP_CN: Record<string, string> = {
  barbell: '杠铃',
  dumbbell: '哑铃',
  'body only': '自重',
  cable: '绳索',
  machine: '器械',
  'e-z curl bar': '曲杆',
  'ez-bar': '曲杆',
  kettlebell: '壶铃',
  bands: '弹力带',
  'medicine ball': '药球',
  'exercise ball': '健身球',
  'foam roll': '泡沫轴',
  other: '其他',
  none: '徒手',
};

/** 难度 / 动作类型中文（抽屉详情用） */
const LEVEL_CN: Record<string, string> = {
  beginner: '入门',
  intermediate: '进阶',
  advanced: '高阶',
};
const MECHANIC_CN: Record<string, string> = {
  isolation: '孤立动作',
  compound: '复合动作',
};

interface MapEntry {
  id: string;
  n: string;
  en: string;
  eq: string;
  lv: string;
  mc: string;
  media: 0 | 1;
  src: 'db' | 'ext' | 'fw';
}

const GROUPS = (muscleMap as { groups: Record<string, MapEntry[]> }).groups;

/** 人体图肌群 → 动作库筛选档（动作库只有 胸/背/肩/臂/腿/腹 六档） */
const LIB_MUSCLE: Record<string, string> = {
  chest: 'chest',
  lats: 'back',
  'middle back': 'back',
  'lower back': 'back',
  traps: 'back',
  shoulders: 'shoulders',
  biceps: 'arms',
  triceps: 'arms',
  forearms: 'arms',
  abdominals: 'abs',
  quadriceps: 'legs',
  hamstrings: 'legs',
  glutes: 'legs',
  adductors: 'legs',
  abductors: 'legs',
  calves: 'legs',
};

/** 有索引数据的肌群才可点（颈部位移太少、无数据的区域降级为不可点） */
const CLICKABLE = new Set(Object.keys(GROUPS));

export default function MusclePicker() {
  const navigate = useNavigate();
  // 支持 ?m=biceps 直接选中某个部位（分享 / 回链用）
  const [params] = useSearchParams();
  const initial = params.get('m');
  const [group, setGroup] = useState<string | null>(initial && GROUPS[initial] ? initial : null);
  const [hover, setHover] = useState<string | null>(null);
  /** 点动作名后在本卡片内滑出的详情（不跳页）；null = 抽屉关闭 */
  const [detail, setDetail] = useState<MapEntry | null>(null);

  // 抽屉打开时按 Esc 关闭，和动作库弹窗的交互保持一致
  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetail(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [detail]);

  const exercises = useMemo(() => (group ? GROUPS[group] ?? [] : []), [group]);
  const groupLabel = group ? GROUP_CN[group] ?? group : '';

  return (
    <div className="relative rounded-2xl border border-border/70 bg-card/70 p-4 backdrop-blur-xl">
      <h3 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
        <MousePointerClick className="h-5 w-5 text-primary" />
        点哪练哪
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        点击人体图的部位，立刻列出对应的训练动作（左正面 / 右背面）。
      </p>

      {/* 人体图 + 可点区域 */}
      <div className="relative mt-3 overflow-hidden rounded-lg border border-border bg-white">
        <img
          src={OVERVIEW}
          alt="人体肌肉分布图（正面与背面），点击部位查看对应动作"
          className="block w-full"
          loading="lazy"
        />
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {REGIONS.map((r) => {
            const clickable = CLICKABLE.has(r.group);
            const active = group === r.group;
            const hovered = hover === r.group;
            return (
              <rect
                key={r.id}
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                rx={10}
                fill={active ? 'rgba(200,16,46,0.5)' : hovered ? 'rgba(200,16,46,0.28)' : 'transparent'}
                stroke={active ? '#C8102E' : hovered ? 'rgba(200,16,46,0.75)' : 'transparent'}
                strokeWidth={active ? 3 : 2}
                className={clickable ? 'cursor-pointer transition-all' : 'pointer-events-none'}
                role={clickable ? 'button' : undefined}
                aria-label={clickable ? `查看${GROUP_CN[r.group] ?? r.group}训练动作` : undefined}
                onClick={clickable ? () => setGroup(active ? null : r.group) : undefined}
                onMouseEnter={clickable ? () => setHover(r.group) : undefined}
                onMouseLeave={clickable ? () => setHover(null) : undefined}
              />
            );
          })}
        </svg>
      </div>

      {/* 选中部位的动作列表 */}
      {group === null ? (
        <p className="mt-3 rounded-lg border border-dashed border-border/80 bg-black/10 px-3 py-3 text-center text-xs text-muted-foreground">
          先点上面一个部位 —— 比如胸、二头、腹肌 —— 就能看到动作清单。
        </p>
      ) : (
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-[0.78rem] font-semibold text-foreground">
              <span className="text-primary">{groupLabel}</span>
              <span className="ml-1.5 font-normal text-muted-foreground">{exercises.length} 个动作 · 点名字看演示与要点</span>
            </p>
            <button
              type="button"
              onClick={() => setGroup(null)}
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              收起
            </button>
          </div>
          <ul className="mt-2 grid gap-1">
            {exercises.slice(0, 8).map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setDetail(e)}
                  aria-label={`查看${e.n || e.en}详情`}
                  className="flex w-full items-center gap-2 rounded-lg border border-border/50 bg-black/20 px-2.5 py-1.5 text-left transition-colors hover:border-primary/60 hover:bg-primary/10"
                >
                  <span className="min-w-0 flex-1 truncate text-[0.78rem] font-medium text-foreground/90">
                    {e.n || e.en}
                  </span>
                  <span className="shrink-0 rounded bg-foreground/10 px-1.5 py-px text-[0.6rem] text-muted-foreground">
                    {EQUIP_CN[e.eq] ?? e.eq}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {exercises.length > 8 && (
            <button
              type="button"
              onClick={() => navigate(`/library?m=${LIB_MUSCLE[group ?? ''] ?? 'all'}`)}
              className="mt-2 w-full rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              在动作库查看全部 {exercises.length} 个 →
            </button>
          )}
        </div>
      )}

      <p className="mt-3 border-t border-border/60 pt-2 text-center text-[0.6rem] leading-relaxed text-muted-foreground/70">
        动作库共 2400+ 条，这里只列各部位最常用的；进动作库可查全部与替代动作。
      </p>

      {/* 动作详情抽屉：点列表项后从卡片底部滑出，不离开首页。
          这里只放「一眼看要点」的元信息，演示动图/替代动作仍由动作库详情页统一维护，
          底部按钮走原来的 ?e= 深链过去，避免两处重复一套动图逻辑。 */}
      {detail && (
        <div className="absolute inset-0 z-20 flex flex-col justify-end rounded-2xl bg-black/65 backdrop-blur-sm">
          <div className="max-h-[88%] overflow-y-auto rounded-2xl border border-primary/40 bg-card/95 p-4 shadow-2xl">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-display text-lg font-bold leading-tight text-foreground">
                  {detail.n || detail.en}
                </p>
                {detail.n && detail.en && (
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{detail.en}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setDetail(null)}
                aria-label="关闭详情"
                className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2 py-1 text-xs font-medium text-primary">
                <Dumbbell className="h-3.5 w-3.5" />
                {EQUIP_CN[detail.eq] ?? detail.eq}
              </span>
              {detail.lv && (
                <span className="rounded-md bg-foreground/10 px-2 py-1 text-xs text-muted-foreground">
                  {LEVEL_CN[detail.lv] ?? detail.lv}
                </span>
              )}
              {detail.mc && (
                <span className="rounded-md bg-foreground/10 px-2 py-1 text-xs text-muted-foreground">
                  {MECHANIC_CN[detail.mc] ?? detail.mc}
                </span>
              )}
              {!!detail.media && (
                <span className="inline-flex items-center gap-1 rounded-md bg-foreground/10 px-2 py-1 text-xs text-muted-foreground">
                  <Activity className="h-3.5 w-3.5" />
                  有演示
                </span>
              )}
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              这里展示动作要点与演示动图请进动作库 —— 站内有 {2400}+ 个动作、带演示的均可悬停播放，
              还能查看针对你的替代动作。
            </p>

            <button
              type="button"
              onClick={() => navigate(`/library?e=${encodeURIComponent(detail.id)}`)}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              在动作库看完整演示与要点
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
