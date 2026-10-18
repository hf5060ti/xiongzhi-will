// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.
/**
 * 动作替代推荐
 *
 * 场景：
 *   · 想练的部位器械被占了（深蹲架排队、哑铃被拿光）→ 换个器械练同一肌群；
 *   · 某个动作关节不舒服 → 换一个发力模式相同、但轨迹更友好的变式；
 *   · 家庭训练没有某器械 → 找自重 / 弹力带替代。
 *
 * 评分思路（越高越像「合格替代」）：
 *   主肌群重合      ×3    —— 替代的首要条件是练到同一块肌肉
 *   发力方向相同    ×2    —— push/pull/static 一致，动作性质才不变
 *   复合 / 孤立一致 ×1.5  —— 主项换主项、收尾换收尾
 *   器械跨类        ×1.5  —— 替代的核心诉求就是「换个器械」；同类器械加分减半
 *   难度接近        ×0.5
 * 并且硬性排除自身、排除主肌群完全不重合的条目。
 */

export interface ExerciseLite {
  id: string;
  name: string;
  nameZh: string;
  equipment: string;
  primaryMuscles: string[];
  secondaryMuscles?: string[];
  level?: string;
  mechanic?: string;
  force?: string;
  category?: string;
}

export interface Substitute extends ExerciseLite {
  /** 综合得分 */
  score: number;
  /** 匹配的理由，如 ['同主肌群：胸大肌', '同为推', '换器械：杠铃 → 哑铃'] */
  reasons: string[];
}

/** 器械大类：用于判断「是否真的换了器械」 */
const EQUIP_CLASS: Record<string, string> = {
  barbell: '杠铃',
  'e-z curl bar': '杠铃',
  dumbbell: '哑铃',
  kettlebells: '哑铃',
  machine: '固定器械',
  'leverage machine': '固定器械',
  cable: '绳索',
  bands: '绳索',
  'body only': '自重',
  'foam roll': '自重',
  'exercise ball': '自重',
  other: '其他',
};

export function equipClass(equipment: string): string {
  return EQUIP_CLASS[equipment] || equipment || '其他';
}

const LEVEL_ORDER: Record<string, number> = {
  beginner: 0,
  intermediate: 1,
  expert: 2,
};

export interface SubstituteOptions {
  /** 返回条数，默认 6 */
  limit?: number;
  /**
   * 是否只推荐「换了器械」的替代。
   * true：只返回器械大类不同的（解决「器械被占」场景，默认）
   * false：同器械的变式也算（解决「关节不适 / 想换角度」场景）
   */
  mustSwitchEquipment?: boolean;
}

/**
 * 为目标动作找替代。
 * @param target 目标动作
 * @param pool   候选池（传全量动作库；自身会被自动排除）
 */
export function findSubstitutes(
  target: ExerciseLite,
  pool: readonly ExerciseLite[],
  options: SubstituteOptions = {},
): Substitute[] {
  const limit = options.limit ?? 6;
  const mustSwitch = options.mustSwitchEquipment ?? true;

  const targetMuscles = new Set(target.primaryMuscles || []);
  const targetClass = equipClass(target.equipment);
  const targetLevel = LEVEL_ORDER[target.level || ''] ?? 1;

  if (targetMuscles.size === 0) return [];

  const scored: Substitute[] = [];

  for (const ex of pool) {
    if (ex.id === target.id) continue;

    const muscles = ex.primaryMuscles || [];
    if (muscles.length === 0) continue;

    // 主肌群必须有重合，否则不是替代而是另一个动作
    const overlap = muscles.filter((m) => targetMuscles.has(m));
    if (overlap.length === 0) continue;

    const exClass = equipClass(ex.equipment);
    const switched = exClass !== targetClass;
    // 默认只推「换器械」的；同类器械的变式仅在允许时纳入（权重低）
    if (mustSwitch && !switched) continue;

    let score = overlap.length * 3;
    const reasons: string[] = [];
    reasons.push(`同主肌群：${overlap.slice(0, 2).join('、')}`);

    if (target.force && ex.force && ex.force === target.force) {
      score += 2;
      reasons.push(
        target.force === 'push' ? '同为推' : target.force === 'pull' ? '同为拉' : '同为静态',
      );
    }

    if (target.mechanic && ex.mechanic && ex.mechanic === target.mechanic) {
      score += 1.5;
      reasons.push(ex.mechanic === 'compound' ? '同为复合动作' : '同为孤立动作');
    }

    if (switched) {
      score += 1.5;
      reasons.push(`换器械：${targetClass} → ${exClass}`);
    } else {
      score += 0.75;
      reasons.push(`同为${exClass}变式`);
    }

    // 协同肌群有重合：动作链更接近
    const secOverlap = (ex.secondaryMuscles || []).filter((m) => targetMuscles.has(m));
    if (secOverlap.length > 0) score += 0.5;

    const exLevel = LEVEL_ORDER[ex.level || ''] ?? 1;
    if (Math.abs(exLevel - targetLevel) === 0) {
      score += 0.5;
    } else if (Math.abs(exLevel - targetLevel) >= 2) {
      score -= 1; // 难度跨度太大，不适合直接替代
    }

    // 名称过于雷同（同一动作的器械变式，如「杠铃卧推」→「哑铃卧推」）反而更贴切
    scored.push({ ...ex, score, reasons });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (a.nameZh || a.name).localeCompare(b.nameZh || b.name, 'zh');
  });

  return scored.slice(0, limit);
}
