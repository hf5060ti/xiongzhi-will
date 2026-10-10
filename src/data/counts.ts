// 雄性意志（XiongZhi Will）· Copyright (c) 2026 hf5060ti · Licensed under Apache License 2.0
// See LICENSE / NOTICE for details.

/**
 * 对外宣传用的内容规模数字（README、SEO 描述、页面文案统一引用这里）。
 *
 * 为什么手工维护而不是从数据数组 length 派生：
 * 动作库那三份数据加起来约 2.2 MB（exercises-db 885 KB + exercises-ext 827 KB +
 * fitwill 497 KB）。Layout 属于首屏主 chunk，一旦为了取 .length 去 import 它们，
 * 首屏就要多背 2 MB——而 SEO 描述只需要一个数字。
 * 所以这里存纯数字常量，由 counts.test.ts 拿真实数据源校验：
 * 数据变了常量没跟着改，CI 会直接红，不会再出现「写着 39 项、实际 42 项」这种漂移。
 */

/** 动作百科动作总数：exercises-db + exercises-ext + fitwill */
export const EXERCISE_COUNT = 2428;

/** 力量等级计算器支持的动作数 */
export const STRENGTH_LIFT_COUNT = 42;

/** 健身补剂库条目数 */
export const SUPPLEMENT_COUNT = 24;
