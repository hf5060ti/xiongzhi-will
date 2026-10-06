// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 训练分享卡（纯前端生成，不依赖账号 / 网络）
 * - buildShareCardData(): 从本地数据聚合分享卡内容（体重 / 训练统计 / 三大项 PR / 最近训练）
 * - renderShareCard(): Canvas 绘制 1080×1440 竖版卡片，返回 PNG dataURL
 * 说明：数据全部来自 localStorage，离线可用（桌面版 file:// 同样能生成）。
 */
import {
  latestWeightKg,
  loadTrainingLogs,
  type TrainingLog,
} from '@/lib/store';
import { estimate1RM } from '@/lib/performance-standards';

export interface ShareCardData {
  weightKg: number;       // 当前体重 kg（0 = 未录入）
  totalSessions: number;  // 总训练次数（条日志）
  totalVolume: number;    // 累计容量 kg（重量 × 次数 求和）
  streak: number;         // 当前连续训练天数
  recent7: number;        // 近 7 天训练天数
  lifts: { key: string; label: string; bestKg: number }[]; // 三大项 PR（深蹲 / 卧推 / 硬拉）
  lastDate: string | null; // 最近一次训练日期（YYYY-MM-DD）
  lastLabel: string;       // 最近训练日标签
  lastExercises: number;   // 最近一次训练动作数
  lastDurationMin: number; // 最近一次训练时长（分钟）
  createdAt: string;       // 生成日期（YYYY-MM-DD）
}

/** 三大项：深蹲 / 卧推 / 硬拉（含常见别名，命中动作名即算） */
const LIFT_ALIASES: Record<string, string[]> = {
  squat: ['深蹲', 'squat'],
  bench: ['卧推', '平板卧推', 'bench press', 'bench'],
  deadlift: ['硬拉', 'deadlift'],
};
const LIFT_LABELS: Record<string, string> = {
  squat: '深蹲',
  bench: '卧推',
  deadlift: '硬拉',
};

function todayIso(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** 单条日志的累计容量（重量 × 次数 求和，时长类动作不参与） */
function logVolume(log: TrainingLog): number {
  let v = 0;
  for (const ex of log.exercises) {
    for (const s of ex.sets) {
      if (s.weightKg && s.reps) v += s.weightKg * s.reps;
    }
  }
  return v;
}

/** 动作别名是否命中某动作（忽略大小写） */
function matchLift(name: string, aliases: string[]): boolean {
  const key = name.trim().toLowerCase();
  return aliases.some((a) => key === a || key.includes(a));
}

export function buildShareCardData(): ShareCardData {
  const logs = loadTrainingLogs();
  const weightKg = latestWeightKg();

  // 统计（与训练记录页口径一致）
  const totalSessions = logs.length;
  const totalVolume = logs.reduce((s, l) => s + logVolume(l), 0);
  const dates = [...new Set(logs.map((l) => l.date))].sort();

  // 当前连续训练天数：今天已练从今天起算，今天没练从最近训练日起算
  let streak = 0;
  if (dates.length > 0) {
    const set = new Set(dates);
    const iso = (d: Date) => {
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${d.getFullYear()}-${m}-${day}`;
    };
    let cur = new Date();
    if (!set.has(iso(cur))) cur.setDate(cur.getDate() - 1);
    while (set.has(iso(cur))) {
      streak++;
      cur.setDate(cur.getDate() - 1);
    }
  }

  // 近 7 天训练天数
  let recent7 = 0;
  if (dates.length > 0) {
    const today = todayIso();
    const d = new Date();
    const weekAgo = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 6);
    const agoIso = `${weekAgo.getFullYear()}-${String(weekAgo.getMonth() + 1).padStart(2, '0')}-${String(
      weekAgo.getDate(),
    ).padStart(2, '0')}`;
    recent7 = dates.filter((x) => x >= agoIso && x <= today).length;
  }

  // 三大项最佳 1RM（遍历全部日志，命中动作名取最佳组）
  const bestByLift = new Map<string, number>();
  for (const l of logs) {
    for (const ex of l.exercises) {
      for (const [key, aliases] of Object.entries(LIFT_ALIASES)) {
        if (!matchLift(ex.name, aliases)) continue;
        for (const s of ex.sets) {
          if (!s.weightKg || !s.reps) continue;
          const oneRm = estimate1RM(s.weightKg, s.reps);
          const cur = bestByLift.get(key) ?? 0;
          if (oneRm > cur) bestByLift.set(key, oneRm);
        }
      }
    }
  }
  const lifts = Object.keys(LIFT_ALIASES).map((key) => ({
    key,
    label: LIFT_LABELS[key],
    bestKg: bestByLift.get(key) ?? 0,
  }));

  // 最近一次训练（按日期 + 录入时间排序取最后一条）
  const sorted = [...logs].sort(
    (a, b) => a.date.localeCompare(b.date) || (a.createdAt ?? 0) - (b.createdAt ?? 0),
  );
  const last = sorted[sorted.length - 1] ?? null;

  return {
    weightKg,
    totalSessions,
    totalVolume: Math.round(totalVolume),
    streak,
    recent7,
    lifts,
    lastDate: last?.date ?? null,
    lastLabel: last?.dayLabel ?? '',
    lastExercises: last?.exercises.length ?? 0,
    lastDurationMin: last?.durationMin ?? 0,
    createdAt: todayIso(),
  };
}

// ---------------------------------------------------------------------------
// Canvas 绘制：1080×1440 竖版卡片（深墨绿黑底 + 金色主色，贴合站点视觉）
// ---------------------------------------------------------------------------
const CARD_W = 1080;
const CARD_H = 1440;
const M = 76; // 页面边距

const BG_TOP = '#171d18';
const BG_BOTTOM = '#0a0d0b';
const GOLD = '#f2c200';
const GOLD_DIM = 'rgba(242,194,0,0.35)';
const WHITE = '#f4f4ee';
const MUTED = '#9aa69c';
const CARD_BG = 'rgba(255,255,255,0.045)';
const CARD_BORDER = 'rgba(242,194,0,0.22)';

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function text(ctx: CanvasRenderingContext2D, str: string, x: number, y: number, size: number, color: string, bold = false) {
  ctx.fillStyle = color;
  ctx.font = `${bold ? '700 ' : '400 '}${size}px "Microsoft YaHei","PingFang SC","Noto Sans SC",sans-serif`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(str, x, y);
}

function numText(ctx: CanvasRenderingContext2D, str: string, x: number, y: number, size: number, color: string) {
  ctx.fillStyle = color;
  ctx.font = `700 ${size}px Bahnschrift,"Segoe UI",Arial,sans-serif`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(str, x, y);
}

function centerText(ctx: CanvasRenderingContext2D, str: string, cx: number, y: number, size: number, color: string, bold = false) {
  const w = ctx.measureText(str).width;
  text(ctx, str, cx - w / 2, y, size, color, bold);
}

function centerNum(ctx: CanvasRenderingContext2D, str: string, cx: number, y: number, size: number, color: string) {
  ctx.font = `700 ${size}px Bahnschrift,"Segoe UI",Arial,sans-serif`;
  const w = ctx.measureText(str).width;
  numText(ctx, str, cx - w / 2, y, size, color);
}

export function renderShareCard(data: ShareCardData): string {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 背景（垂直渐变 + 左上金辉）
  const bg = ctx.createLinearGradient(0, 0, 0, CARD_H);
  bg.addColorStop(0, BG_TOP);
  bg.addColorStop(1, BG_BOTTOM);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  const glow = ctx.createRadialGradient(CARD_W - 200, 260, 40, CARD_W - 200, 260, 560);
  glow.addColorStop(0, 'rgba(242,194,0,0.10)');
  glow.addColorStop(1, 'rgba(242,194,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  const cx = CARD_W / 2;

  // ---- 顶部：金色细线 + 站名 ----
  ctx.strokeStyle = GOLD_DIM;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(M, 96);
  ctx.lineTo(CARD_W - M, 96);
  ctx.stroke();

  centerText(ctx, 'X I O N G Z H I · W I L L', cx, 140, 22, GOLD);
  centerText(ctx, 'B E R S E R K  ·  雄 性 意 志', cx, 210, 56, WHITE, true);
  centerText(ctx, '自然健身 · 目标明确 · 执行彻底', cx, 262, 24, MUTED);

  // ---- 分隔 ----
  ctx.strokeStyle = GOLD_DIM;
  ctx.beginPath();
  ctx.moveTo(M, 300);
  ctx.lineTo(CARD_W - M, 300);
  ctx.stroke();

  // ---- 主体 1：当前体重 ----
  centerText(ctx, '当 前 体 重', cx, 372, 24, MUTED);
  const wStr = data.weightKg > 0 ? String(Math.round(data.weightKg * 10) / 10) : '--';
  centerNum(ctx, wStr, cx, 540, 170, GOLD);
  const wUnit = ctx.measureText(wStr).width;
  text(ctx, 'kg', cx + wUnit / 2 + 22, 470, 44, MUTED);

  // ---- 主体 2：四格数据卡 ----
  const gap = 20;
  const cw = (CARD_W - M * 2 - gap * 3) / 4;
  const cy = 620;
  const ch = 200;
  const stats: [string, string, string][] = [
    [String(data.totalSessions), '总训练次数', '条日志'],
    [data.streak > 0 ? String(data.streak) : '--', '连续训练', '天 · 当前连击'],
    [data.totalVolume > 0 ? data.totalVolume.toLocaleString() : '--', '累计容量', 'kg · 总吨位'],
    [data.recent7 > 0 ? String(data.recent7) : '--', '近 7 天', '次训练'],
  ];
  stats.forEach(([big, label, sub], i) => {
    const x = M + i * (cw + gap);
    ctx.fillStyle = CARD_BG;
    roundRect(ctx, x, cy, cw, ch, 16);
    ctx.fill();
    ctx.strokeStyle = CARD_BORDER;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    centerText(ctx, label, x + cw / 2, cy + 44, 20, MUTED);
    centerNum(ctx, big, x + cw / 2, cy + 130, 66, WHITE);
    centerText(ctx, sub, x + cw / 2, cy + 172, 18, MUTED);
  });

  // ---- 主体 3：三大项 PR ----
  const ly = 880;
  centerText(ctx, '个 人 最 佳  ·  估 算 1RM', cx, ly - 24, 22, MUTED);
  const lw = (CARD_W - M * 2 - gap * 2) / 3;
  data.lifts.forEach((lift, i) => {
    const x = M + i * (lw + gap);
    ctx.fillStyle = CARD_BG;
    roundRect(ctx, x, ly, lw, 230, 16);
    ctx.fill();
    ctx.strokeStyle = CARD_BORDER;
    ctx.stroke();
    centerText(ctx, lift.label, x + lw / 2, ly + 52, 26, MUTED);
    const v = lift.bestKg > 0 ? String(Math.round(lift.bestKg)) : '--';
    centerNum(ctx, v, x + lw / 2, ly + 160, 78, GOLD);
    const unitW = ctx.measureText(v).width;
    text(ctx, 'kg', x + lw / 2 + unitW / 2 + 16, ly + 135, 30, MUTED);
  });

  // ---- 主体 4：最近训练 ----
  const ry = 1170;
  const rh = 110;
  ctx.fillStyle = CARD_BG;
  roundRect(ctx, M, ry, CARD_W - M * 2, rh, 16);
  ctx.fill();
  ctx.strokeStyle = CARD_BORDER;
  ctx.stroke();
  text(ctx, '最近训练', M + 40, ry + 66, 22, MUTED);
  const lastInfo =
    data.lastDate !== null
      ? `${data.lastDate}${data.lastLabel ? ' · ' + data.lastLabel : ''} · ${data.lastExercises} 个动作${
          data.lastDurationMin ? ' · ' + data.lastDurationMin + ' 分钟' : ''
        }`
      : '还没有训练记录，去录下第一条';
  text(ctx, lastInfo, M + 40, ry + 110, 26, WHITE);

  // ---- 底部 ----
  ctx.strokeStyle = GOLD_DIM;
  ctx.beginPath();
  ctx.moveTo(M, CARD_H - 140);
  ctx.lineTo(CARD_W - M, CARD_H - 140);
  ctx.stroke();
  centerText(ctx, 'hf5060ti.github.io/xiongzhi-will', cx, CARD_H - 92, 24, GOLD);
  centerText(ctx, `数据存于本机 · 由「雄性意志」生成 · ${data.createdAt}`, cx, CARD_H - 52, 18, MUTED);

  return canvas.toDataURL('image/png');
}

/** 生成分享卡的快捷入口：聚合数据 + 渲染，返回 PNG dataURL；无任何训练数据时返回空串 */
export function generateShareCard(): string {
  const data = buildShareCardData();
  if (data.totalSessions === 0 && data.weightKg === 0) return '';
  return renderShareCard(data);
}
