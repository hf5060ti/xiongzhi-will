// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 图源熔断（img guard）
 *
 * 背景：动作演示图分散在多个第三方图床上，其中
 *   - raw.githubusercontent.com（英文动作库静态图）
 *   - cdn.jsdelivr.net（同类 CDN）
 * 在中国大陆多数家庭宽带 / 移动网络下**完全不可达**（实测 HTTP 000，连接直接失败），
 * 而 fitness.xingshuwen.com（动作百科动图）可正常访问。
 *
 * 不做处理时会发生两件事：
 *   1. 每次进动作库都会发出上百个注定失败的请求 —— 拖慢首屏、塞满控制台报错、
 *      并且在弱网下这些失败请求要等超时才结束，进一步拖垮后续真实请求；
 *   2. 手机端卡片图策略原本是「优先静态图」，于是整屏卡片图全黑。
 *
 * 机制：某个图床连续失败达到阈值后，把它标记为「已熔断」，
 * 后续（本次会话 + 7 天内）直接跳过该图床，自动改用候选列表里的下一个可用源。
 * 网络正常时不会触发，行为与原来完全一致 —— 属于纯兜底，不牺牲可用网络下的画质。
 */

const STORAGE_KEY = 'xw-img-host-down-v1';
/** 连续失败多少次后熔断 */
const FAIL_LIMIT = 3;
/** 熔断保留时长：7 天。过期后重新给一次机会（网络环境可能变了） */
const DOWN_TTL = 7 * 24 * 60 * 60 * 1000;

type GuardRecord = { fails: number; until: number };

let memory: Record<string, GuardRecord> = {};

function load(): Record<string, GuardRecord> {
  if (Object.keys(memory).length > 0) return memory;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, GuardRecord>;
      const now = Date.now();
      // 顺手清掉过期记录
      for (const k of Object.keys(parsed)) {
        if (!parsed[k] || parsed[k].until < now) delete parsed[k];
      }
      memory = parsed;
    }
  } catch {
    // 隐私模式 / 禁用存储：退化成「仅本次会话有效」，不影响功能
    memory = {};
  }
  return memory;
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
  } catch {
    /* ignore */
  }
}

/** 取 URL 的 host；解析失败时返回空串 */
export function hostOf(url: string): string {
  try {
    return new URL(url, typeof location !== 'undefined' ? location.href : 'https://x/').hostname;
  } catch {
    return '';
  }
}

/** 该图床当前是否已熔断 */
export function isHostDown(url: string | undefined | null): boolean {
  if (!url) return false;
  const rec = load()[hostOf(url)];
  return !!rec && rec.until > Date.now();
}

/** 记录一次加载失败；达到阈值即熔断，返回是否刚刚熔断 */
export function markHostFailed(url: string | undefined | null): boolean {
  if (!url) return false;
  const host = hostOf(url);
  if (!host) return false;
  const store = load();
  const rec = store[host] || { fails: 0, until: 0 };
  rec.fails += 1;
  if (rec.fails >= FAIL_LIMIT) rec.until = Date.now() + DOWN_TTL;
  store[host] = rec;
  save();
  return rec.until > Date.now();
}

/**
 * 从候选图源里挑第一个「可用」的：
 * 过滤掉空值，再跳过已熔断的图床；全部不可用则返回最后一个候选（交给 onError 走占位兜底）。
 */
export function pickSrc(candidates: Array<string | undefined | null>): string {
  const list = candidates.filter((u): u is string => !!u);
  if (list.length === 0) return '';
  const alive = list.filter((u) => !isHostDown(u));
  return alive.length > 0 ? alive[0] : list[0];
}

/** 在候选列表里，取「当前 src 之后」的下一个可用源 */
export function nextSrc(
  candidates: Array<string | undefined | null>,
  current: string,
): string {
  const list = candidates.filter((u): u is string => !!u);
  const i = list.indexOf(current);
  return pickSrc(i >= 0 ? list.slice(i + 1) : list);
}

/** 手动清除熔断记录（设置页「重试外部图源」用） */
export function resetImgGuard(): void {
  memory = {};
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

// 网络恢复（断线重连、开了代理/VPN）时解除熔断，给外部图床一次重新机会。
// 若它依然不可达，最多再失败 3 次就会重新熔断，代价可忽略。
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => resetImgGuard());
}
