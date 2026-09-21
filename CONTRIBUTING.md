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
