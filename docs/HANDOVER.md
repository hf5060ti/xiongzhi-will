# 「雄性意志」项目交接文档

> 给接手的开发者 / AI 工具：读完这份文档即可开工。
> 最后更新：2026-09-23（对应提交 `b80ddc3`）

## 一、项目是什么

「雄性意志 · 自然健身系统」——面向自然健身人群的一站式工具站：训练计划、饮食营养、身体数据、减脂追踪、AI 教练，外加心智/事业/财富/关系/技能/荒野等成长内容页。**纯前端、无后端、数据全部存在用户浏览器 localStorage**，免费开源（MIT）。

## 二、关键路径

| 项 | 值 |
|---|---|
| GitHub 仓库 | https://github.com/hf5060ti/xiongzhi-will （公开，MIT） |
| 线上地址 | https://hf5060ti.github.io/xiongzhi-will/ （GitHub Pages） |
| 克隆 | `git clone https://github.com/hf5060ti/xiongzhi-will.git` |
| 原开发机本地路径 | `D:\雄性意志`（Windows） |

## 三、技术栈

- **框架**：React 19 + TypeScript + Vite 8（`react-router-dom` v7）
- **样式**：Tailwind CSS 4 + shadcn/ui（`src/components/ui/`）+ tw-animate-css；深色主题为主，玻璃拟态卡片
- **图表**：recharts（轻盈计划趋势图）；echarts 也在依赖里
- **数据**：纯 localStorage，无数据库无后端
- **可选本地服务**：`server/server.js`（零依赖 Node 代理，127.0.0.1:8787，配合 `server/.env` 的 doubao/marvis 双模型配置）——仅供本地 AI 教练使用；线上无此后端，教练页显示引导态
- **OCR**：tesseract.js（营养页拍营养表识别）

## 四、跑起来

```bash
npm install
npm run dev        # Vite 开发服务器
npm run build      # 产物输出到 dist/client
npm run typecheck  # tsc -p tsconfig.app.json（提交前必跑）
npm run lint       # typecheck + eslint
```

Node 建议 20+（原开发机用 22）。

## 五、部署（已全自动）

**push 到 `main` 即发布**：GitHub Actions 两条流水线——CI 与 Deploy to GitHub Pages（`.github/workflows/deploy.yml`，构建 `dist/client` + `404.html` SPA 回退），约 40 秒上线。

## 六、目录结构

```
src/
├── app.tsx                 # 路由注册（全部页面在此声明）
├── index.tsx               # 入口
├── components/
│   ├── Layout.tsx          # 全站布局：导航 + 搜索 + 内容容器（max-w-7xl）
│   └── ui/                 # shadcn/ui 组件
├── pages/
│   ├── HomePage/           # 主页：目标/饮食选择 + 生成方案（宽屏两列）
│   ├── PlanPage/           # /plan 方案页（左方案主流程，右法则参考栏）
│   ├── NutritionPage/      # /nutrition 食物库+计算器+今日饮食记录+蛋白质指南
│   ├── BodyDataPage/       # /body 身体数据（BMR/TDEE/肌肉上限/1RM/力量表）
│   ├── LightPage/          # /light 轻盈计划·减脂追踪（体重/打卡/周报/里程碑/维持期）
│   ├── CardioPage/         # /cardio 有氧消耗（MET 公式）
│   ├── BodyweightPage/     # /bodyweight 自重力量消耗
│   ├── StomachPage/        # /stomach 胃部/FODMAP
│   ├── PhysiquePage/       # /physique 体态
│   ├── CoachPage/          # /coach AI 教练（需本地 server 代理）
│   ├── ExerciseLibraryPage/# /library 动作库
│   ├── Mind/Career/Wealth/Relation/Skills/WildPage  # 成长内容页（卡片网格）
│   ├── PrivacyPage / NotFoundPage
├── lib/
│   ├── store.ts            # localStorage 读写层（所有数据键在此）
│   ├── body-math.ts        # 健身公式库（BMR/TDEE/1RM/上限等）
│   └── search-index.ts     # 全局搜索
└── data/                   # goals/diets/foods/bodyweight/stomach 等静态数据
server/                     # 可选本地 AI 代理（零依赖 Node）
```

## 七、数据层约定（重要）

- 所有 localStorage 键带命名空间前缀 `fitness-goal-app:`，读写一律走 `src/lib/store.ts`，**不要在页面里直接碰 localStorage**
- 主要键：`goal`（训练目标）、`diet`（饮食方案）、`weight`（快捷体重）、`body`（BodyProfile 身体档案）、`split`/`pyramid`（训练偏好）、`light-target`（减脂目标）、`light-entries`（体重体脂记录）、`light-checkins`（每日打卡）
- **联动规则**：轻盈计划记最新体重会自动同步 `weight` + `body.weightKg`（`syncLightWeightToProfile()`）；补录历史不同步
- 主页「数据备份」的导出/导入会自动覆盖该命名空间下所有键，新加键无需改备份逻辑
- 宽屏版式约定：内容容器 `max-w-7xl`；主页/方案页/身体数据页为「宽屏两列」模式（左主流程 + 右 340–400px 侧栏，`lg`/`xl` 断点起，移动端保持单列）

## 八、当前进度（截至 b80ddc3）

已完成：全站宽屏两列版式统一；轻盈计划减脂追踪全功能（目标设置、记录、7 日均线趋势图、本周战报、里程碑、14 天打卡热力、维持期模式、体重全站同步）；胃部/自重力量页面；全站玻璃拟态 + 首页动态背景。

## 九、待办清单（按优先级）

1. **饮食目标联动**：`NutritionPage/sections/DailyLog.tsx` 的目标是硬编码（2730 kcal/173g 蛋白/81g 脂肪/353g 碳水），应改为按 BodyProfile 实时计算（身体数据页已有 TDEE/蛋白质算法，`lib/body-math.ts`）
2. **训练执行闭环**：方案页生成的计划没有"今天练了没"的执行记录，需要训练日志（哪天/动作/组次/重量）
3. **围度追踪**：腰围/胸围/臂围记录与趋势（减脂期腰围是金标准）
4. **首页"今日"驾驶舱**：今天该练什么、吃了多少、打卡没，一屏聚合
5. **备份提醒**：localStorage 清缓存即丢数据，加"距上次备份 X 天"提醒
6. **营养页"清空"按钮加二次确认**
7. 仓库里 5 个 dependabot PR 待处理
8. 线上 AI 教练定位（本地代理才能用，线上只有引导态）

## 十、协作约定（原作者要求）

- 任何删除/覆盖类破坏性操作必须先经本人允许
- 改动提交前跑 `npm run typecheck && npm run build`
- 与原开发机并行协作时注意：`git pull` 后再开工，避免覆盖他人未推送工作
