# 雄性意志 (Xiongzhi Will)

自然健身训练与营养定制系统。v0.1.0 初版发布。

**本站只提供健康自然的健身方式，不提供任何极端训练或药物方案；请遵守你所在国家/地区的法律法规。**

---

## 这是什么

一套基于 React + Vite + TypeScript 的纯前端健身应用。打开就能用，不需要登录、不需要后端、不需要数据库。所有数据存在你自己浏览器的 localStorage 里。

设计目标：**给自然训练者一个够专业、够详细、不绕弯的训练和营养工具。**

---

## 功能一览

| 模块 | 内容 |
|---|---|
| **目标设定** | 5 种训练目标：肌肥大 / 斗腕 / 大力士 / 综合体能 / 街头健身 |
| **饮食方案** | 4 种饮食：高碳低脂 / 生酮 / 碳循环 / 中碳 |
| **训练架构** | 三分化 / 四分化 / 五分化 / 二分化；正金字塔 / 倒金字塔 |
| **训练法则** | 练一休一 / 轻断食 14h–16h / 蛋白质分级 / 一天两练 |
| **动作百科** | 876 个动作动画演示，支持中英文搜索、部位/器械筛选 |
| **营养库** | 200+ 食物营养表（肉/海鲜/蛋/奶/主食/蔬菜/水果/坚果/零食） |
| **食物详情** | 每 100g 生重热量、蛋白质、脂肪、碳水、纤维、钠、维生素、矿物质、植物活性成分 |
| **今日饮食记录** | 选食物+克数加入记录，自动统计热量/蛋白质/脂肪/碳水，按餐次分组 |
| **身体数据** | BMR（Mifflin / Harris-Benedict / Katch-McArdle / Cunningham）、TDEE、FFMI 上限、Casey Butt 模型、IPF 力量等级、1RM 换算 |
| **形体记录** | 二头/三头/胸型分类，附经典人物参考 |
| **AI 教练** | 训练建议、生病/恢复判断 |
| **冷兵器消耗** | 剑道/唐刀/苗刀/长枪等每小时热量估算 |

---

## 技术栈

- **React 19 + TypeScript**
- **Vite 5** 构建
- **Tailwind CSS 4** + shadcn/ui（玻璃质感风格）
- **react-router-dom** 路由
- 所有数据存 **localStorage**，无需后端

---

## 本地运行

```bash
# 克隆
git clone https://github.com/hf5060ti/xiongzhi-will.git
cd xiongzhi-will

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 打开 http://localhost:26666
```

```bash
# 构建生产版本
npm run build

# 类型检查
npm run typecheck
```

---

## 在线体验

把 `dist/` 目录拖到任何静态托管平台即可：

- **Netlify Drop**：https://app.netlify.com/drop
- **Vercel**：`vercel deploy`
- **GitHub Pages**：推到 `gh-pages` 分支

不需要后端，不需要数据库，纯静态文件。

---

## 目录结构

```
├── src/
│   ├── pages/           # 页面
│   │   ├── HomePage/              # 目标设定
│   │   ├── PlanPage/              # 我的方案
│   │   ├── ExerciseLibraryPage/    # 动作百科
│   │   ├── NutritionPage/         # 营养库
│   │   ├── BodyDataPage/          # 身体数据
│   │   ├── PhysiquePage/          # 形体记录
│   │   └── CoachPage/             # AI 教练
│   ├── components/      # 通用组件 + shadcn/ui
│   ├── data/            # 数据（goals/diets/foods/exercises-db）
│   ├── lib/             # 工具函数（store/body-math/search-index）
│   └── hooks/           # React hooks
├── public/images/       # 静态图片（格斯/斯巴达）
└── dist/                # 构建产物
```

---

## 公式参考

### BMR 基础代谢（按优先级排序）

| 公式 | 适用 | 公式 |
|---|---|---|
| Katch-McArdle | 自然训练者首选 | BMR = 370 + 21.6 × LBM |
| Cunningham | 自然训练者备选 | BMR = 500 + 22 × LBM |
| Mifflin-St Jeor | 通用 | 男：10W + 6.25H − 5A + 5 |
| Harris-Benedict 修订 | 通用 | 男：88.362 + 13.397W + 4.799H − 5.677A |

LBM = 去脂体重 = W × (1 − 体脂率)

### TDEE 总消耗

TDEE = BMR × 活动系数

- 久坐 1.2 / 轻度 1.375 / 中度 1.55 / 高度 1.725 / 极高 1.9
- 增肌：TDEE + 300~500 kcal
- 减脂：TDEE − 300~500 kcal

### 蛋白质摄入（按训练年限）

| 级别 | 每公斤瘦体重 |
|---|---|
| 新手（0–1 年） | 1.5 g |
| 中级（1–3 年） | 1.8 g |
| 高级（3 年+ / 备赛） | 2.4–3.1 g |

### 肌肉上限（FFMI）

FFMI = 去脂体重(kg) / 身高(m)²

自然男性统计上限约 25，女性约 20–22。

---

## 边界与免责

- 本站提供一般训练规划与营养参考，**不是医疗诊断或康复建议**。
- 糖尿病、孕妇、老年人、大病初愈者，**优先遵从医嘱**。
- 出现胸部不适、晕厥、异常气短、锐痛、麻木等症状时，立即停止训练并寻求专业评估。
- 所有食物营养数值为常见食物成分表每 100g 生重参考值，不同品种/产地/烹饪方式差异可达 ±10–20%。
- 公式估算误差常见 ±10–15%。
- 本站**不提供任何极端训练或药物方案**。

---

## License

MIT © 2026 hf5060ti
