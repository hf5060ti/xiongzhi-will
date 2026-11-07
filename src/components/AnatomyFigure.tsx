// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
// 目标肌群解剖图：正面 / 背面人体示意，按所选动作高亮主发力肌群（金）与协同肌群（浅金）。
// 采用风格化有机形状（贝塞尔分区 + 细节分割线 + 引线标注），把"练哪里"一眼看懂；
// 颜色走 CSS 变量，明暗双主题自适应。非医学级解剖图，重在识别与教学。
import { type ReactNode } from 'react';

/** 肌群中文名（覆盖动作库出现的全部 key） */
const MUSCLE_CN: Record<string, string> = {
  quadriceps: '股四头肌',
  hamstrings: '腘绳肌',
  glutes: '臀肌',
  calves: '小腿',
  chest: '胸肌',
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

interface Region {
  key: string;
  d: string;
}

/* ============================ 正面肌群（viewBox 0 0 280 600，中心 x=140） ============================ */
const FRONT_REGIONS: Region[] = [
  // 颈
  { key: 'neck', d: 'M126 80 L154 80 C154 94 152 104 148 108 L132 108 C128 104 126 94 126 80 Z' },
  // 胸大肌：上（锁骨部）+ 下（胸骨部），左右各一
  { key: 'chest', d: 'M140 138 C122 130 100 134 90 148 C88 154 92 161 106 162 L140 162 Z' },
  { key: 'chest', d: 'M140 164 C120 166 96 166 90 174 C88 188 100 203 118 205 C128 205 138 198 140 192 Z' },
  { key: 'chest', d: 'M140 138 C158 130 180 134 190 148 C192 154 188 161 174 162 L140 162 Z' },
  { key: 'chest', d: 'M140 164 C160 166 184 166 190 174 C192 188 180 203 162 205 C152 205 142 198 140 192 Z' },
  // 三角肌：前束 + 中束
  { key: 'shoulders', d: 'M86 118 C76 122 72 134 76 146 C80 154 90 156 94 148 C97 138 93 122 86 118 Z' },
  { key: 'shoulders', d: 'M76 138 C70 144 68 156 72 166 C76 174 84 176 88 168 C91 158 86 142 76 138 Z' },
  { key: 'shoulders', d: 'M194 118 C204 122 208 134 204 146 C200 154 190 156 186 148 C183 138 187 122 194 118 Z' },
  { key: 'shoulders', d: 'M204 138 C210 144 212 156 208 166 C204 174 196 176 192 168 C189 158 194 142 204 138 Z' },
  // 肱二头肌
  { key: 'biceps', d: 'M74 160 C64 163 62 182 66 198 C70 212 82 215 86 205 C90 193 86 166 74 160 Z' },
  { key: 'biceps', d: 'M206 160 C216 163 218 182 214 198 C210 212 198 215 194 205 C190 193 194 166 206 160 Z' },
  // 前臂
  { key: 'forearms', d: 'M68 220 C61 223 59 240 63 254 C67 266 77 268 81 258 C84 247 80 223 68 220 Z' },
  { key: 'forearms', d: 'M212 220 C219 223 221 240 217 254 C213 266 203 268 199 258 C196 247 200 223 212 220 Z' },
  // 腹肌：腹直肌 + 腹外斜肌
  { key: 'abdominals', d: 'M126 224 L154 224 C156 255 154 290 150 314 L130 314 C126 290 124 255 126 224 Z' },
  { key: 'abdominals', d: 'M124 232 C112 236 106 254 110 276 C113 294 122 306 128 306 C125 283 125 255 124 232 Z' },
  { key: 'abdominals', d: 'M156 232 C168 236 174 254 170 276 C167 294 158 306 152 306 C155 283 155 255 156 232 Z' },
  // 外展肌（髋外侧）
  { key: 'abductors', d: 'M100 318 C92 322 88 334 92 346 C96 354 104 356 108 350 C110 340 106 322 100 318 Z' },
  { key: 'abductors', d: 'M180 318 C188 322 192 334 188 346 C184 354 176 356 172 350 C170 340 174 322 180 318 Z' },
  // 股四头肌：外侧头 + 股直肌 + 内侧头
  { key: 'quadriceps', d: 'M98 320 C92 338 92 382 98 416 C100 426 106 427 108 419 C110 392 110 348 108 322 Z' },
  { key: 'quadriceps', d: 'M110 320 C108 345 108 392 112 420 C114 428 120 428 122 420 C124 392 124 345 122 320 Z' },
  { key: 'quadriceps', d: 'M124 356 C127 372 128 404 126 420 C125 428 119 428 117 420 C115 400 117 372 119 358 C121 354 123 354 124 356 Z' },
  { key: 'quadriceps', d: 'M182 320 C188 338 188 382 182 416 C180 426 174 427 172 419 C170 392 170 348 172 322 Z' },
  { key: 'quadriceps', d: 'M170 320 C172 345 172 392 168 420 C166 428 160 428 158 420 C156 392 156 345 158 320 Z' },
  { key: 'quadriceps', d: 'M156 356 C153 372 152 404 154 420 C155 428 161 428 163 420 C165 400 163 372 161 358 C159 354 157 354 156 356 Z' },
  // 内收肌（大腿内侧）
  { key: 'adductors', d: 'M124 320 C121 340 121 380 124 404 C125 411 130 411 131 404 L132 320 Z' },
  { key: 'adductors', d: 'M156 320 C159 340 159 380 156 404 C155 411 150 411 149 404 L148 320 Z' },
  // 小腿（胫骨前肌）
  { key: 'calves', d: 'M102 436 C98 452 98 494 102 518 C104 526 112 526 114 518 C116 494 116 452 112 436 Z' },
  { key: 'calves', d: 'M178 436 C182 452 182 494 178 518 C176 526 168 526 166 518 C164 494 164 452 168 436 Z' },
];

/* ============================ 背面肌群 ============================ */
const BACK_REGIONS: Region[] = [
  // 斜方肌：上（左右）+ 中 + 下
  { key: 'traps', d: 'M140 80 C122 84 104 96 92 116 C100 119 114 119 126 113 L140 98 Z' },
  { key: 'traps', d: 'M140 80 C158 84 176 96 188 116 C180 119 166 119 154 113 L140 98 Z' },
  { key: 'traps', d: 'M140 118 C128 120 120 136 122 156 C124 174 132 186 140 186 C148 186 156 174 158 156 C160 136 152 120 140 118 Z' },
  { key: 'traps', d: 'M140 188 C130 190 124 204 126 222 C128 238 134 248 140 248 C146 248 152 238 154 222 C156 204 150 190 140 188 Z' },
  // 上背部（菱形肌，斜方肌下方的横带）
  { key: 'middle back', d: 'M112 158 C112 183 122 203 140 206 C158 203 168 183 168 158 C158 170 148 176 140 176 C132 176 122 170 112 158 Z' },
  // 背阔肌（左右大翼）
  { key: 'lats', d: 'M100 168 C86 178 78 205 84 236 C90 270 104 296 120 302 C124 293 121 262 115 232 C109 205 107 180 100 168 Z' },
  { key: 'lats', d: 'M180 168 C194 178 202 205 196 236 C190 270 176 296 160 302 C156 293 159 262 165 232 C171 205 173 180 180 168 Z' },
  // 下背部（竖脊肌）
  { key: 'lower back', d: 'M130 252 L150 252 C152 280 152 308 148 332 L132 332 C128 308 128 280 130 252 Z' },
  // 肱三头肌
  { key: 'triceps', d: 'M74 160 C64 163 62 182 66 198 C70 212 82 215 86 205 C90 193 86 166 74 160 Z' },
  { key: 'triceps', d: 'M206 160 C216 163 218 182 214 198 C210 212 198 215 194 205 C190 193 194 166 206 160 Z' },
  // 臀肌：臀大肌 + 臀中肌
  { key: 'glutes', d: 'M100 318 C90 326 87 348 94 368 C101 386 114 394 124 389 C131 384 133 366 128 346 C123 328 112 316 100 318 Z' },
  { key: 'glutes', d: 'M180 318 C190 326 193 348 186 368 C179 386 166 394 156 389 C149 384 147 366 152 346 C157 328 168 316 180 318 Z' },
  { key: 'glutes', d: 'M98 316 C89 319 84 332 88 345 C92 354 101 356 106 349 C109 338 105 320 98 316 Z' },
  { key: 'glutes', d: 'M182 316 C191 319 196 332 192 345 C188 354 179 356 174 349 C171 338 175 320 182 316 Z' },
  // 腘绳肌：股二头肌（外侧）+ 半腱半膜肌（内侧）
  { key: 'hamstrings', d: 'M98 320 C92 340 92 386 98 418 C100 427 106 428 108 419 C110 392 110 348 108 322 Z' },
  { key: 'hamstrings', d: 'M112 320 C110 345 110 392 114 420 C116 428 122 428 124 420 C126 392 126 345 124 320 Z' },
  { key: 'hamstrings', d: 'M182 320 C188 340 188 386 182 418 C180 427 174 428 172 419 C170 392 170 348 172 322 Z' },
  { key: 'hamstrings', d: 'M168 320 C170 345 170 392 166 420 C164 428 158 428 156 420 C154 392 154 345 156 320 Z' },
  // 小腿（腓肠肌 + 比目鱼肌）
  { key: 'calves', d: 'M102 428 C95 436 93 455 98 471 C102 481 110 482 113 473 C115 461 112 436 102 428 Z' },
  { key: 'calves', d: 'M114 428 C121 436 123 455 118 471 C114 481 106 482 103 473 C101 461 104 436 114 428 Z' },
  { key: 'calves', d: 'M103 480 C99 488 99 507 103 520 C105 526 111 526 113 520 C115 507 115 488 111 480 Z' },
  { key: 'calves', d: 'M166 428 C159 436 157 455 162 471 C166 481 174 482 177 473 C179 461 176 436 166 428 Z' },
  { key: 'calves', d: 'M178 428 C185 436 187 455 182 471 C178 481 170 482 167 473 C165 461 168 436 178 428 Z' },
  { key: 'calves', d: 'M169 480 C165 488 165 507 169 520 C171 526 177 526 179 520 C181 507 181 488 177 480 Z' },
  // 前臂（伸肌）
  { key: 'forearms', d: 'M68 220 C61 223 59 240 63 254 C67 266 77 268 81 258 C84 247 80 223 68 220 Z' },
  { key: 'forearms', d: 'M212 220 C219 223 221 240 217 254 C213 266 203 268 199 258 C196 247 200 223 212 220 Z' },
];

/* ============================ 细节分割线（静态，增强"肌肉感"） ============================ */
const FRONT_DETAIL: string[] = [
  'M140 136 L140 216',          // 胸骨中线
  'M96 130 C112 124 128 122 140 122', // 锁骨
  'M184 130 C168 124 152 122 140 122',
  'M126 246 L154 246',          // 腹肌横线 ×3
  'M126 268 L154 268',
  'M126 290 L154 290',
  'M140 224 L140 314',          // 腹白线
  'M114 322 C114 356 114 396 116 424', // 股四头分割（左）
  'M166 322 C166 356 166 396 164 424', // 股四头分割（右）
];
const BACK_DETAIL: string[] = [
  'M140 118 L140 332',          // 脊柱
  'M140 186 L140 250',          // 斜方肌下段分界
  'M140 318 L140 392',          // 臀缝
  'M112 322 C112 356 112 396 114 424', // 腘绳分割（左）
  'M168 322 C168 356 168 396 166 424', // 腘绳分割（右）
  'M108 430 L108 522',          // 小腿分割（左）
  'M172 430 L172 522',          // 小腿分割（右）
];

/* ============================ 引线标注（只标高亮肌群） ============================ */
interface LabelSpec {
  x: number; // 文本 x（左缘或右缘）
  y: number; // 文本基线 y
  ax: number; // 肌肉锚点 x
  ay: number; // 肌肉锚点 y
  side: 'l' | 'r';
}
const FRONT_LABELS: Record<string, LabelSpec> = {
  neck: { x: 268, y: 92, ax: 140, ay: 92, side: 'r' },
  shoulders: { x: 12, y: 126, ax: 80, ay: 132, side: 'l' },
  chest: { x: 268, y: 172, ax: 112, ay: 176, side: 'r' },
  biceps: { x: 12, y: 190, ax: 72, ay: 190, side: 'l' },
  forearms: { x: 12, y: 250, ax: 66, ay: 246, side: 'l' },
  abdominals: { x: 268, y: 268, ax: 140, ay: 268, side: 'r' },
  abductors: { x: 12, y: 336, ax: 98, ay: 338, side: 'l' },
  adductors: { x: 12, y: 372, ax: 128, ay: 368, side: 'l' },
  quadriceps: { x: 268, y: 366, ax: 112, ay: 366, side: 'r' },
  calves: { x: 12, y: 478, ax: 106, ay: 478, side: 'l' },
};
const BACK_LABELS: Record<string, LabelSpec> = {
  traps: { x: 12, y: 122, ax: 122, ay: 118, side: 'l' },
  'middle back': { x: 12, y: 186, ax: 126, ay: 186, side: 'l' },
  lats: { x: 268, y: 238, ax: 104, ay: 238, side: 'r' },
  'lower back': { x: 268, y: 292, ax: 140, ay: 292, side: 'r' },
  triceps: { x: 12, y: 190, ax: 72, ay: 190, side: 'l' },
  glutes: { x: 12, y: 352, ax: 106, ay: 352, side: 'l' },
  hamstrings: { x: 268, y: 366, ax: 114, ay: 368, side: 'r' },
  calves: { x: 12, y: 470, ax: 108, ay: 470, side: 'l' },
  forearms: { x: 268, y: 250, ax: 214, ay: 246, side: 'r' },
};

/* ============================ 中性人体底图 ============================ */
function Silhouette() {
  return (
    <g fill="var(--muted-foreground)" fillOpacity={0.09} stroke="var(--border)" strokeWidth={1}>
      <circle cx={140} cy={54} r={26} />
      <path d="M126 80 L154 80 L152 110 L128 110 Z" />
      {/* 躯干 + 髋 */}
      <path d="M140 86 C120 88 104 98 92 116 C84 128 82 142 84 156 C88 182 96 208 106 230 C112 250 116 272 118 296 C119 312 112 320 104 322 L176 322 C168 320 161 312 162 296 C164 272 168 250 174 230 C184 208 192 182 196 156 C198 142 196 128 188 116 C176 98 160 88 140 86 Z" />
      {/* 上臂 */}
      <path d="M92 116 C80 120 74 134 72 152 C70 176 70 196 72 212 C70 228 68 244 70 258 C71 270 78 276 85 272 C90 268 90 250 89 236 C88 214 89 190 91 168 C92 148 94 130 92 116 Z" />
      <path d="M188 116 C200 120 206 134 208 152 C210 176 210 196 208 212 C210 228 212 244 210 258 C209 270 202 276 195 272 C190 268 190 250 191 236 C192 214 191 190 189 168 C188 148 186 130 188 116 Z" />
      {/* 大腿 + 小腿 */}
      <path d="M116 320 C106 320 98 330 96 348 C92 380 92 420 96 452 C98 482 100 512 103 530 C105 538 115 538 117 530 C119 512 121 482 123 452 C127 420 127 380 124 348 C122 330 120 320 116 320 Z" />
      <path d="M164 320 C174 320 182 330 184 348 C188 380 188 420 184 452 C182 482 180 512 177 530 C175 538 165 538 163 530 C161 512 159 482 157 452 C153 420 153 380 156 348 C158 330 160 320 164 320 Z" />
      {/* 脚 */}
      <path d="M100 530 C98 538 98 544 102 546 L120 546 C123 544 122 536 118 532 C112 528 104 528 100 530 Z" />
      <path d="M180 530 C182 538 182 544 178 546 L160 546 C157 544 158 536 162 532 C168 528 176 528 180 530 Z" />
    </g>
  );
}

function regionStyle(key: string, primary: Set<string>, secondary: Set<string>) {
  const isPrimary = primary.has(key);
  const isSecondary = secondary.has(key);
  return {
    fill: isPrimary || isSecondary ? 'var(--primary)' : 'var(--muted-foreground)',
    fillOpacity: isPrimary ? 0.92 : isSecondary ? 0.34 : 0.06,
    stroke: isPrimary ? 'var(--primary-foreground)' : 'var(--background)',
    strokeWidth: isPrimary ? 1 : 0.6,
  } as const;
}

function Figure({
  view,
  primary,
  secondary,
}: {
  view: 'front' | 'back';
  primary: Set<string>;
  secondary: Set<string>;
}) {
  const regions = view === 'front' ? FRONT_REGIONS : BACK_REGIONS;
  const details = view === 'front' ? FRONT_DETAIL : BACK_DETAIL;
  const labels = view === 'front' ? FRONT_LABELS : BACK_LABELS;
  const highlighted = new Set([...primary, ...secondary]);

  const labelEls: ReactNode[] = [];
  for (const [key, L] of Object.entries(labels)) {
    if (!highlighted.has(key)) continue;
    const name = MUSCLE_CN[key] || key;
    const isPrimary = primary.has(key);
    labelEls.push(
      <g key={`lbl-${view}-${key}`}>
        <line
          x1={L.ax}
          y1={L.ay}
          x2={L.side === 'l' ? L.x - 2 : L.x + 2}
          y2={L.y - 3}
          stroke="var(--muted-foreground)"
          strokeOpacity={0.55}
          strokeWidth={0.8}
        />
        <circle cx={L.ax} cy={L.ay} r={2} fill="var(--foreground)" fillOpacity={0.65} />
        <text
          x={L.x}
          y={L.y}
          textAnchor={L.side === 'l' ? 'start' : 'end'}
          fontSize={11}
          fontWeight={isPrimary ? 700 : 500}
          style={{ fill: isPrimary ? 'var(--primary)' : 'var(--foreground)', paintOrder: 'stroke', stroke: 'var(--card)', strokeWidth: 3 }}
        >
          {name}
        </text>
      </g>,
    );
  }

  return (
    <svg viewBox="0 0 280 600" className="mx-auto h-auto w-full max-w-[240px]" role="img" aria-label={`${view === 'front' ? '正面' : '背面'}目标肌群示意`}>
      <Silhouette />
      {regions.map((r, i) => (
        <path key={`${view}-${i}`} d={r.d} style={regionStyle(r.key, primary, secondary)} />
      ))}
      {details.map((d, i) => (
        <path key={`d-${view}-${i}`} d={d} fill="none" stroke="var(--foreground)" strokeOpacity={0.14} strokeWidth={0.8} />
      ))}
      {labelEls}
    </svg>
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
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <p className="mb-1 text-center text-xs font-medium text-muted-foreground">正面</p>
          <Figure view="front" primary={primary} secondary={secondary} />
        </div>
        <div className="flex-1">
          <p className="mb-1 text-center text-xs font-medium text-muted-foreground">背面</p>
          <Figure view="back" primary={primary} secondary={secondary} />
        </div>
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
