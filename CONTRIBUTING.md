# 贡献指南

感谢你想为「雄性意志」贡献代码！以下是参与流程。

---

## 开发环境搭建

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

---

## 代码风格

- **TypeScript**：严格模式，所有变量必须有类型
- **样式**：Tailwind CSS，不写内联 style
- **组件**：函数式组件 + Hooks
- **命名**：文件名 PascalCase（`NutritionCalculator.tsx`），目录名小写
- **导入**：用 `@/` 别名，不用相对路径
  ```typescript
  // 正确
  import { Button } from '@/components/ui/button';
  // 错误
  import { Button } from '../../components/ui/button';
  ```

---

## 提交规范

提交信息格式：

```
<类型>: <描述>
```

类型：
- `feat`：新功能
- `fix`：修复 bug
- `docs`：文档更新
- `style`：样式调整
- `refactor`：代码重构
- `chore`：构建/工具变更

例子：
```
feat: 新增荒野板块——徒步/露营/生火
fix: 修复动作搜索不灵敏的问题
docs: README 补充下载说明
```

---

## PR 检查清单

提交 PR 前确认：

- [ ] `npm run typecheck` 无错误
- [ ] `npm run build` 成功
- [ ] 没有 console.log 残留
- [ ] 新功能有对应的说明文字
- [ ] 移动端能正常显示
- [ ] 没有引入新的依赖（除非确实需要）

---

## 内容贡献（不写代码也能参与）

这个项目的核心价值是**内容的准确性**——动作做对了没有、营养数据对不对。欢迎只改数据、不改代码：

### 新增 / 修正动作

- 动作数据在 `src/data/` 下，搜索动作名称定位条目
- 每个动作条目至少包含：中文名、英文名、目标肌群、器械类型、组次建议、动作要点
- 有教学视频链接就加上（YouTube / B站均可），链接要直链到具体视频，不要贴频道主页
- 新增动作前先在动作百科里搜一遍，避免重复

### 修正营养数据

- 食物数据在 `src/data/foods/` 目录下，按品类分文件：`meats.ts` / `seafood.ts` / `dairy.ts` / `vegetables.ts` / `fruits.ts` / `staples.ts` / `legumes.ts` / `nuts.ts` / `snacks.ts` / `cooked.ts` / `condiments.ts`
- 每个食物按**每 100g 生重**标注：热量(kcal)、蛋白质、脂肪、碳水、膳食纤维、钠，有条件再补维生素/矿物质
- 数据来源优先：中国食物成分表 > USDA > 品牌包装实测。PR 里注明来源，别凭印象写数
- 特殊食材（草饲/谷饲牛肉、水牛奶、牦牛肉、少数民族食材）欢迎补，注明和普通版本的差异

### 补充训练原则 / 参考文献

- 训练原则类内容写在 `src/lib/training-plan.ts`、`src/lib/body-math.ts` 或对应页面文件里
- 引用研究时注明出处（作者 + 年份），例如"自然训练者组间休息建议 3–5 分钟（Schoenfeld et al., 2016）"
- 不接受没有来源的个人经验当结论写进核心逻辑

### 修正文案 / 错别字 / 翻译

- 本站默认中文，英文为辅助。翻译错误、错别字、不通顺的句子直接改，提 PR 即可

---

## 什么不接受

- 宣传极端训练、药物、PUA、厌女内容
- 引入需要后端的功能（这是纯前端项目）
- 破坏现有玻璃质感风格的改动
- 未经说明的大文件（图片、视频）

---

## 问题反馈

- Bug：用 Issue 模板提，附上截图和复现步骤
- 功能建议：用 Issue 模板提，说明使用场景
- 安全问题：见 [SECURITY.md](./SECURITY.md)
