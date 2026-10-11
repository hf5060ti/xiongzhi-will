# 更新日志

所有版本变更记录。格式参考 [Keep a Changelog](https://keepachangelog.com/)。

---

## Unreleased

### 新增

- **社交分享卡片（Open Graph / Twitter Card）**：`index.html` 与两份 `landing.html`
  补全 `og:type` / `og:locale=zh_CN` / `og:site_name` / `og:image` / `twitter:image`
  （封面 1200×630，随 `vite.config.ts` 的 `base` 走相对路径，GitHub Pages 与 Gitee Pages
  任意子路径均可正确拉到图）；封面由 `scripts/gen-og-cover.py`（numpy 高斯光晕 + 独立 RGBA
  水印层，避免 banding）一次性生成，非运行依赖
- **结构化数据（JSON-LD）**：`index.html` 注入 `WebSite` + `SearchAction`，
  帮助搜索引擎识别站点与站内搜索入口（目标指向 HashRouter 的 `#/library?q=`；与 sitemap/robots 同源 GitHub Pages）
- **PWA iOS 适配元信息**：补齐 `apple-mobile-web-app-capable` / `mobile-web-app-capable` /
  `apple-mobile-web-app-status-bar-style` / `apple-mobile-web-app-title`，提升 iOS「添加到主屏幕」体验

### 修复

- **`public/sitemap.xml` 遗漏 `/strength` 路由**：逐条比对 `ROUTE_META`（27 条）与
  sitemap（26 条），仅缺 `/strength`，已补 `<loc>…/strength</loc><priority>0.8</priority>`；
  无多余 / 失效项

### 工程

- **判级引擎补 33 项单测**：`src/lib/performance-standards.test.ts` 覆盖门槛判定方向、
  档位进度 / 配色 / 中位档、0.5/0.3/0.2 加权与缺板块归一化、`estimate1RM`、时长解析 /
  格式化、五动作男女各 5 档门槛严格递增且男 ≥ 女。全站单测 **62 → 95 项**
- **核心纯逻辑补 54 项单测（合计 95 → 149 项）**：覆盖此前零测试的模块——
  `warmup`（递增组档位与神经激活提示）、`progressive-overload`（加/减重量与自重进阶）、
  `recovery`（睡眠/压力/酸痛三档判定与减载周判断）、`smart-search`（同义词/拼音/多词 AND）、
  `today-recommendation`（分化推演）、`meal-plan`（每日目标与四餐占比）、
  `absorption`（吸收提示推导）、`utils`（类名合并）。用例全部手算期望值
- **热身 `isUpper` 正则移除裸「拉」**：原先 `/推|拉|…/` 的裸 `拉` 会把「硬拉」误判为上肢，
  导致神经激活提示错写成「空杆推/拉」；现已改回「硬拉启动」（下拉/引体/划船等仍按显式词命中）
- **恢复评估纳入酸痛信号**：`highSoreness` 此前算出却未被任何判定分支使用，
  酸痛偏高（≥4/5）现在会给出 `warn` 而非被静默忽略成 `good`
- **智能搜索补全英文同义词反向展开**：`smartMatch` 原先只支持「中文别名 → 英文候选」
  （如 `卧推` 命中 `bench press`），反向缺失——搜索框直接输入 `bench` / `squat` / `deadlift`
  反而找不到对应中文动作。现补全「英文同义词 → 中文候选」展开，全局搜索与动作/食物/补剂库共用本函数

---

## v0.4.2 - 2026-10-10

### 新增

- **组间休息计时器（工具页 `/tools`）**：本站一直标注「复合 3–5 分钟、孤立 2–3 分钟」，
  但此前只在执行模式里才有计时。新增独立计时器，复用 `restFor()` 的复合 / 孤立分档，
  支持切换时长、加 30 秒、暂停；剩余时间同步写进标签页标题，锁屏回来一眼能看到
- **`src/lib/chime.ts`**：用 Web Audio 现场合成三声结束提示音，不引用音频文件，
  桌面离线版（file://）与断网状态下同样能响
- **单元测试增至 62 项**：
  - `counts.test.ts`（4 项）：守护对外宣传数字与真实数据的一致性
  - `rest-timer.test.ts`（10 项）：倒计时显示格式、默认休息秒数、预设必须落在宣称区间内
  - `training-plan.test.ts`（9 项）：`restFor()` 复合 / 孤立判定。
    原先有一条「已知局限」用例记录「仰卧臂屈伸被误判为复合」，该局限已在本次修复中消除，
    改为守卫修好的行为：俯卧撑全系列与「箭步蹲 / 弓步蹲」别名一致性判为复合，
    而仰卧 / 过顶臂屈伸判为孤立、双杠臂屈伸仍为复合
- **`src/lib/rest-timer.ts`**：把组间休息的领域逻辑（预设秒数、默认秒数、时长格式化）
  抽成无 DOM 依赖的纯模块，工具页计时器与执行模式共用同一套口径，
  并使这部分逻辑可被单元测试覆盖（vitest 跑在 node 环境，不测 .tsx）

### 修复

- **执行模式休息倒计时改用时间戳**：原先是 `setRestLeft(left - 1)` 每秒累减，
  手机锁屏或切后台时 `setInterval` 会被节流甚至暂停，倒计时越走越慢
  （说好休息 3 分钟，实际等了 5 分钟）。改为存 `endsAt` 再与当前时间相减，
  中间被节流多久都不影响；归零时先响一声再进下一组（原先静默跳组，低头看手机会错过），
  并新增「加 30 秒」
- **`/strength` SEO 描述动作数过期**：写着 39 项，实际 42 项
- **执行模式休息秒数改为复用 `defaultRestSeconds()`**：原先硬编码 180 / 120，
  与工具页计时器各写一套数字，改一处会漏另一处
- **导航「百科」改为「动作百科」**（中英俄德四语同步：Exercises / Упражнения / Übungen）；
  侧栏只有 56px 宽，导航文字补 `truncate`，俄语这类长词不再撑破布局
- **README 的 clone 路径写错**：`cd xiongzhi-will` 与实际仓库目录 `masculine-consciousness` 不一致
- **首屏主 chunk 体积降低 61%（gzip 239.6 kB → 92.7 kB）**：`src/lib/search-index.ts`
  会在模块顶层把动作 / 食物 / 补剂 / 自重 / 饮食知识全站数据摊平成一条大索引数组，
  而导航栏 `Layout` 以静态 import 引用它 —— 这些只在「用户敲字搜索时」才需要的数据
  被强行打进了首屏 `index` chunk。改为：Layout 只保留**类型导入**，
  真正的实现在挂载后用 `requestIdleCallback`（不支持则退化为普通异步）动态 `import()`，
  模块内单例缓存避免重复请求。剥离后 `foods` 309 kB 独立成按需 chunk，
  index.html 的 modulepreload 列表里不含任何按需 chunk（已核对），慢网/移动端首屏少下载约 147 kB
- **搜索索引未加载完会被误报成「无结果」**：索引改成懒加载后，
  手机端在索引还没到时会显示「没有找到匹配的内容」。补 `search_loading` 四语词条
  （正在载入搜索索引… / Loading search index… / Загрузка поискового индекса… / Suchindex wird geladen…），
  未就绪时显示加载态；桌面端行为不变（加载完成即刻出结果，不会闪假定为空）
- **执行模式「复合 / 孤立」判定双轨，导致大量真复合动作只给 2 分钟**：
  `TrainingLogPage` 原先写成 `Boolean(matchLift(name))`，只认五大力量动作，
  于是引体向上、杠铃划船、双杠臂屈伸、臀桥这些多关节动作全落进孤立分支，
  而 UI 还照着显示「孤立动作 · 建议休息约 2 分钟」。改为统一调用 `restFor()`，
  与工具页计时器、计划页、动作卡共用唯一真相源（此前两侧口径不一致）
- **`restFor()` 正则漏判两类高频动作**：
  俯卧撑全系列（标准 / 钻石 / 下斜 / 宽距 / 上斜）此前判为孤立，
  而它是胸 + 三头 + 前束 + 核心协同的闭链多关节动作，自重区 8 个变式全受影响；
  「箭步蹲」判为孤立，而同一动作的别名「弓步蹲」「分腿蹲」已是复合，纯属别名缺失
- **`restFor()` 误判「仰卧臂屈伸」为复合（原有的已知局限一并修掉）**：
  复合词表裸写着「臂屈伸」，只有双杠臂屈伸才是真复合，过顶 / 仰卧 / 哑铃臂屈伸
  都是肱三头肌单关节动作。删掉裸词后由已存在的「双杠」接管，
  既修正误判，也让「认不出的一律按孤立」这条既定原则保持成立
- **图片资源总体积降低 76%（约 13.3 MB → 3.0 MB）**：
  `public/images` 下 6 张「焚诀」专项计划图是站内最大的静态资源（合计 8.43 MB 的 PNG），
  计划页会把它们按部位平铺出来。转 WebP 前先做了量化比对，避免拍脑袋定质量档：

  | 资源 | 原体积 | 转换后 | 降幅 |
  | --- | --- | --- | --- |
  | 焚诀 6 张计划图 | 8.43 MB | 2.01 MB | 76.1% |
  | `public/screenshots` 6 张 | 2.34 MB | 0.44 MB | 81.4% |
  | `docs/screenshots` 7 张 | 2.49 MB | 0.47 MB | 81.0% |

  - **质量档位由 PSNR 实测选定**：图里是有中文小字的训练计划图，压缩过重会啃噬字形边缘。
    实测 `焚诀-背.png` 在 q75/80/85/88/92 下 PSNR 为 37.7 / 39.2 / 40.6 / 41.7 / 43.1 dB，
    取 **q=88**（>41 dB 的「小字不易出 ringing」区间），单张体积约为 PNG 的 22–27%
  - **试过无损 WebP，反而更大（1805 KB → 2406 KB）**，遂放弃：这些 PNG 本身已是优化过的
    含噪压缩，无损转码没有收益，这点必须实测才知道，不能依默认印象选方案
  - **图标不动**：`icon-main-512.png` 等 5 个图标均为 RGBA 且无损重编码零收益（部分反而变大），
    且 `apple-touch-icon` 对 WebP 支持不可靠，保持 PNG 原样
  - 原始 PNG **全部保留未删除**，HTML 无需 `<picture>` 兜底即可回退；转换遍及 `src/data/goals.ts`、
    `README.md`、两份 `landing.html`，共 23 处引用（含桌面版副本自包含性核对，
    确认其自带的 `images/` 与 `screenshots/` 副本不受影响）
- **表单标签与控件未关联（10 处）：既是无障碍缺陷，也是能用的功能性 bug**：
  页面上明明写了可见标签，但 `<label>` 没有 `htmlFor`、控件也没有 `id`，
  两者在 DOM 里互不相识。后果有两个：读屏软件只会念「编辑框」而不知道要填什么；
  **点标签也不会聚焦输入框** —— 后者在手机上的影响尤其明显，
  训练日志里「重量 kg / 次数」是 56px 高的大号数字框，点标签本应直接唤起键盘
  - 可复用的子组件（`EstField` / `NumberField`）会在同一画面渲染多份，
    用 React `useId()` 生成唯一 id，避免多个实例共享同一个 id 导致关联错乱
  - 单实例处补显式 id + `htmlFor`：`tools-work-weight` / `tools-weight` / `tools-reps` /
    `tl-rest-weight` / `tl-rest-reps` / `pn-ocr-text`
  - 全仓核对：静态 id 共 49 个，**重复 0**；`<label>` 未关联的剩余 **0 处**
- **力量等级页「性别」按钮组错用 `<label>`**：`<label>` 天然要指向一个表单控件，
  而它下面是一对切换按钮，于是标签指向空对象。改为 `role="group"` +
  `aria-labelledby` 提供「性别」这一分组语境，按钮本身用 `aria-pressed` 表达选中态，
  并补 `aria-label="男性 / 女性"`（原文只有一个「男」「女」字，读屏听不出指的是性别）
- **筛选类 `<select>` 缺无障碍名称**：动作百科的两个筛选下拉、饮食记录的「选择食物 / 餐次」，
  读屏只会念成「组合框」，不知道筛的是什么。补 `aria-label`
  （与页面既有做法一致 —— `NutritionCalculator` 里本就有 `aria-label="餐次"`）
- **背景视频 `preload="auto"` 改为 `metadata`**：背景视频本体约 0.92 MB，
  `auto` 会让它在首屏整段开下并与 JS / CSS 争带宽。`poster` 静态海报已提供
  完整视觉兜底（原注释写明），视频迟几百毫秒进场用户察觉不到，
  而系统省电模式（禁用自动播放）与弱网下则直接省掉这 0.92 MB
- **回退 3 处不该被语义化的紧凑元素（踩了 `@layer` 优先级陷阱）**：
  `.type-meta` 定义在 `index.css` 的**非 @layer 区域**，按 CSS 级联层规则「无层样式压过 @layer」，
  会盖掉 Tailwind `@layer utilities` 里的字号 / 行高类。上一轮批量收敛后暴露三类误伤：
  - 两处 `<Badge>`：基类自带 `px-2.5 py-0.5` 且 `whitespace-nowrap inline-flex`，
    `type-meta` 的 `line-height: 1.6` 会把药丸高度撑高约 7px，已恢复 `text-xs`
  - `DietKnowledgePage` 摘要段落：原写法 `text-xs … sm:text-sm` 意为「小屏 12px / ≥sm 放大到 14px」，
    换成 `type-meta` 后断点放大被**静默覆盖**，已恢复原写法
  - `Layout` 搜索空状态残留的 `leading-relaxed`：`type-meta` 已给 1.6，该工具类实为死代码，已清除
  
  顺带把这条规则沉淀为排查项并全仓验证：`type-*` 与显式字号 / 断点字号共存 **0 处**，
  `type-*` 与 `leading-*` 共存 **0 处**，`<Badge>` 带 `type-meta` **0 处**

### 工程

- **导航 21 项按板块分组**：原先平铺成一列，「营养」与「人生」相邻，找功能只能逐个扫读。
  改为训练 9 / 专项 4 / 生活 8 三组，桌面侧栏加分隔线与组名，移动端横向导航加竖线；
  i18n 补 `nav_group_train` / `nav_group_special` / `nav_group_life` 中英俄德四语
- **内容规模数字集中到 `src/data/counts.ts`**：动作数、力量动作数、补剂数此前散落在
  README、SEO 描述与页面文案里，加动作的人不会记得回头改文案（同类问题已踩过两次：
  876 → 2428、39 → 42）。改为统一引用常量，并由 `counts.test.ts` 校验——
  数据变了常量没跟着改，CI 直接失败。常量刻意手工维护而不从数据 `.length` 派生：
  三份动作数据合计约 2.2 MB，Layout 属于首屏主 chunk，不能为取一个数字背 2 MB
- **`package.json` 的 name 更正**：仍是脚手架残留的 `miaoda-react-standard-webapp-app`
- **说明性小字收敛到 `type-meta` 语义类（362 行 / 46 文件）**：
  全站散落的显式 `text-xs` 承担了太多「次要信息」职责，改排版只能逐文件搜字号。
  本次用保守启发式批量收敛——**只认「灰字 + 不含任何布局 / 强调类」的纯说明文字**，
  带 `px- / py- / flex / truncate / rounded-full / Button / absolute / whitespace-nowrap` 等
  紧凑或强排版意图的行一律跳过。人工精修两个高密度页面
  （`ExerciseLibraryPage` 17 处、`PerformanceTracker` 33 处）后，再对其余 44 个文件批替换 312 处。
  收敛后全站 `text-xs` 剩余 374 处（Badge / Button / Tab / TabsTrigger / 表单元格等确实需要紧凑的元素）

  教训已记录：批量替换脚本用整行 whitespace 折叠会吞掉缩进，一度污染 `ExerciseLibraryPage`，
  改走 `git show HEAD:` 逐行比对原始缩进修回。后续同类操作一律改用定向 `.replace()`，
  并在提交前解析 diff 比对 `+ / -` 行首空白以确认「破坏行数 = 0」

---

## v0.4.1 - 2026-10-10

### 工程

- **桌面离线版重新构建并打包**：以 `DESKTOP_BUILD=1` 产出 IIFE 单 bundle（懒加载页面内联，规避 file:// 下动态 import 的 CORS 限制），`scripts/sync-desktop.mjs` 转为经典 `<script src>` 后双击 `桌面版/index.html` 即离线可用；产物打包为 `雄性意志-桌面离线版-v0.4.1.zip`
- **Gitee Pages 重新部署**：以 `MIAODA_CLIENT_BASE_PATH=/masculine-consciousness/` 重建并推送 `gitee-pages` 分支（HashRouter，无需服务端 SPA 回退）

---

## v0.4.0 - 2026-10-09

### 新增

- **力量等级计算器同步数据层新能力**：自重动作按体重系数用 `addedLoad1rm` 折算（纯自重也能判级）、行走类动作显示距离选择器、引体三握法 / 山羊挺身 / 农夫行走等新动作生效（动作总数 39 → 42）
- **单元测试增至 39 项**：新增 `addedLoad1rm` / `distanceFactor` 回归用例

### 修复

- **路由统一为 HashRouter（线上与桌面一致）**：彻底解决 Gitee Pages / GitHub Pages 等静态托管子路由刷新 404（此前 BrowserRouter 在刷新时服务端不回退 index.html，尤其 Gitee Pages 直接 404）

### 文档

- **README 对齐现状**：路由说明改为统一 HashRouter、在线体验地址改为实际部署的 Gitee Pages、动作数更正为 42、clone 地址指向 Gitee 仓库

---

## v0.3.0 - 2026-10-09

### 新增

- **导航补全核心页面入口**：方案 / 动作百科 / 营养 / 身体数据 / AI 教练进入侧边导航，不再只能靠搜索撞见
- **界面多语言**：中 / 英 / 俄 / 德切换（`src/lib/i18n.ts`，覆盖导航、按钮、搜索与页脚；动作名与食物名保留原文）
- **力量等级计算器 `/strength`**：39 项动作（后补入农夫行走），按性别 / 年龄 / 体重 + 重量 × 次数估算 1RM，
  判定「入门 ★ → 精英 ★★★★★」五档并给出离下一档还差多少公斤；
  复用站内 Epley 口径，1RM 公式抽到 `src/lib/one-rep-max.ts` 与工具页共用
  （功能形态参考公开健身力量计算器的通用做法，档位数据由本站整理与折算，
  不使用任何第三方站点的文案或数据表，页内已标注来源与折算项）
- **`server/.env.example`**：本地 AI 后台配置模板
- **GitHub 登录补 OAuth state 校验**（Cookie 存 state，回调比对），并把 Worker 的 CORS 由 `*` 收窄为本站来源
- **单元测试**：引入 vitest，36 个用例覆盖 1RM 三公式、力量判级（性别 / 年龄 / 体重折算、
  边界与封顶）、BMR 六公式与 TDEE、瘦体重与蛋白质；其中一条专门断言
  `body-math` / `performance-standards` / `one-rep-max` 三处 Epley 实现结果完全一致，
  防止页面之间算法悄悄漂移
- **语言切换器标注翻译范围**：下拉里说明「界面文案已翻译，正文保留原文」，避免误以为全站已翻译

### 修复

- **用户菜单收不起来**：登录后浮层一直挂在页面上（`menuOpen` 定义了却没参与渲染判断）
- **Service Worker 重复注册**：`index.html` 与 `src/index.tsx` 各写一份且判断条件不一致，已收敛到入口一处，并跳过桌面离线版（file://）
- **动作百科 SEO 描述过期**：写着「876 个动作」，实际 2428 个
- **`/light`（轻盈计划）缺 SEO 元信息**
- **登录入口误导**：云同步后端未开放时不再显示登录按钮（此前点了只弹「即将上线」）
- **入口文件混放组件**：`Root` 拆到 `src/components/Root.tsx`，react-refresh 恢复正常
- 错别字：「雄心意志」→「雄性意志」（`server/server.js`、`启动网站.bat`）
- **路由改为 BrowserRouter**：线上 URL 变成 `/library`、`/plan` 这样的真实路径，`sitemap.xml` 才对搜索引擎有效（原先 HashRouter 下这些地址全部落在首页）；GitHub Pages 由 `404.html` 回退，桌面离线版因 `file://` 限制仍用 HashRouter，由构建期 `XW_DESKTOP` 区分
- **Service Worker 注册路径**：改用 `BASE_URL` 拼绝对路径，否则在 `/library` 这类子路由下会被解析成 `/xiongzhi-will/library/sw.js` 而注册失败
- **eslint 清零**：19 个 error 全部修掉（effect 内 setState 改为渲染期同步 / `Date.now()` 收敛到新的 `useNow` hook / `prefer-const` / 入口文件混放组件）

### 工程

- **仓库瘦身**：`docs/` 里的旧部署镜像（1082 个历史 bundle、约 126 MB）、`桌面版/assets/` 打包产物、`.wrangler/` 与临时排查文件移出 git 索引并加 `.gitignore`（磁盘文件保留），追踪文件数由 1400+ 降到 327
- 删除与 `public/landing.html` 重复的根目录 `landing.html`
- 移除未使用的 import（`Home` / `BarChart3` / `isLoggedIn` / `getLang`）与重复的 React Hooks 导入
- **CI 接入 lint 与测试**：`.github/workflows/ci.yml` 依次跑 `npm run lint`（typecheck + eslint）
  与 `npm run test`；eslint 以 `--max-warnings=0` 运行，warning 同样会让 CI 失败
- **eslint 全面清零**：清掉全部 18 个 warning（未使用的 `useEffect` 导入、`hovered`、`muscles`、
  `proteinPct`、`date0`、`CAT_ALL` 常量等死代码；`MUSCLE_GROUPS` 移到组件外以修正 `useMemo` 依赖）
- 新增 `src/hooks/useNow.ts`：统一提供「当前时间」，避免在渲染期调用 `Date.now()`
- **仓库历史瘦身**：用 `git filter-repo` 从全部 222 个提交中清除曾误提交的构建产物
  （`docs/assets`、`docs/images`、`桌面版/`）、`雄性意志-最新源码.zip`、未引用的背景视频与临时文件；
  `.git` 由数百 MB 降到 44 MB。操作前已做完整备份（`git clone --mirror` + 工作区文件副本），
  磁盘上的 `docs/`、`桌面版/` 文件均未删除，仍可本地双击使用

---

## v0.2.0 - 2026-09-26

### 新增

- **组间休息建议**：每个动作旁标注推荐休息区间——复合动作 3–5 分钟、孤立动作 2–3 分钟；计划页新增可展开说明块，解释为什么不是 60 秒
- **AI 教练专业边界**：说明 AI 不是医疗设备；营养问题改为双入口（AI 快问 + 饮食讲解视频页系统学）
- **体测进度反馈**：首次测量 vs 最新数据全部位对比卡；满 30 天提醒复查
- **FAQ / 关于页**：常见问题、数据方法论、免责说明
- **胃部 FODMAP 食物对照表**：低敏食物分级参考
- **身体数据输入校验**：年龄/身高/体重/体脂合理范围校验与错误提示
- **数据备份版本号**：导出 JSON 带 `version` 字段；导入时识别版本，老文件兼容导入、未来版本提示升级
- **PWA 支持**：manifest + service worker，可"添加到主屏幕"、离线打开
- **自动备份提醒**：超 7 天未导出 / 从未导出时，首页备份卡显示琥珀色提醒

### 文档

- README 新增「训练哲学」节：自然训练原则、组间休息 3–5 分钟的生理学依据、70 分钟单次训练上限
- CONTRIBUTING 新增「内容贡献」节：如何加动作、修营养数据、补参考文献

### 修复

- 计划页动作卡旧文案"组间歇 90s"与新休息标注冲突，已过滤旧文案

---

## v0.1.0 - 2026-09-21

### 新增

- **身体板块**
  - 5 种训练目标：肌肥大 / 斗腕 / 大力士 / 综合体能 / 街头健身
  - 4 种饮食方案：高碳低脂 / 生酮 / 碳循环 / 中碳
  - 训练架构：三/四/五/二分化，正/倒金字塔
  - 训练法则：练一休一 / 轻断食 14–16h / 蛋白质分级 / 一天两练
  - 特殊人群运动推荐（9 类人群）
  - 动作百科：876 个动作动画演示
  - 营养库：200+ 食物营养表
  - 今日饮食记录（热量/蛋白质/脂肪/碳水统计）
  - BMR/TDEE/FFMI 计算器
  - IPF 力量等级表
  - 形体记录
  - AI 教练
  - 冷兵器消耗计算器

- **心智板块**
  - 斯多葛哲学 / 延迟满足 / 注意力管理 / 情绪控制 / 日记复盘 / 独处能力
  - 30 天心智挑战

- **事业板块**
  - 目标拆解 / 时间管理 / 执行力 / 复盘
  - 事业底线

- **财富板块**
  - 存钱 / 消费观 / 投资基础 / 反诈骗
  - 财富底线

- **关系板块**
  - 沟通 / 边界感 / 亲密关系 / 友谊
  - 红线（不 PUA / 不冷暴力 / 不背叛）

- **技能板块**
  - 急救 / 料理 / 驾驶修理 / 户外生存

- **荒野板块**
  - 徒步登山 / 露营 / 生火 / 找水净水 / 导航 / 防身 / 可食用植物 / 独处
  - 工具与装备：钢材分类 / 生存刀 / 斧类 / 打火工具

### 核心理念

- 健身是生活的调味剂，不是被健身绑架
- 真正的力量是面对压力能站起来
- 本站只提供自然健身，不提供极端训练或药物
