# 心理年龄测试 | PsycheAge

> 你的身体在成长，但你的灵魂几岁了？

一个基于 React 18 + TypeScript + Vite + TailwindCSS 3 的心理年龄测试单页应用（SPA）。所有计算均在浏览器本地完成，无需后端服务器，无需登录注册。

## ✨ 功能特点

- 🎨 **5 页面完整流程**：首页欢迎 → 确认年龄 → 40 题测试 → 加载动画 → 结果报告
- 📊 **雷达图人格分析**：使用 Chart.js 展示 6 大人格维度
- 🎭 **人格原型识别**：8 种人格类型（探索者、中坚、协调者、引领者等）
- 💫 **流畅过渡动画**：Framer Motion 页面切换与元素动画
- 📱 **响应式设计**：手机、平板、电脑完美适配
- 🔒 **纯前端本地**：答题数据仅存内存，刷新即清空

## 🛠 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3 | UI 框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 4.5 | 构建工具 |
| TailwindCSS | 3.4.x | 样式框架 |
| React Router | 6.22 | 路由管理 |
| Framer Motion | 11.x | 动画库 |
| Chart.js | 4.x | 雷达图表 |
| react-chartjs-2 | 5.x | Chart.js React 封装 |

## 📁 项目结构

```
examation/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # 全局布局（导航、背景）
│   ├── pages/
│   │   ├── WelcomePage.tsx     # 首页欢迎页
│   │   ├── AgePage.tsx         # 确认实际年龄页
│   │   ├── QuizPage.tsx        # 答题页（40道题）
│   │   ├── LoadingPage.tsx     # 结果加载动画页
│   │   └── ResultPage.tsx      # 最终报告页
│   ├── context/
│   │   └── TestContext.tsx     # 测试状态管理
│   ├── data/
│   │   └── questions.ts        # 题库数据（可编辑）
│   ├── utils/
│   │   └── calculator.ts       # 心理年龄计算逻辑
│   ├── App.tsx                 # 路由配置
│   ├── main.tsx                # 应用入口
│   └── index.css               # 全局样式
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                 # Vercel 部署配置（SPA 路由重写）
└── package.json
```

## 🚀 本地启动

### 前置条件

- Node.js >= 16
- npm >= 8

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后浏览器访问 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📝 题库编辑

题库位于 `src/data/questions.ts`，共 40 道题。每题结构：

```ts
{
  id: 1,
  text: "题目内容",
  category: "分类",
  options: [
    { text: "选项A文字", scores: { trait: 3, ... } },
    { text: "选项B文字", scores: { trait: 2, ... } },
    ...
  ]
}
```

- `scores` 对象：键为人格特质名，值为得分（1-3）
- 支持的特质：extroversion（外向）、introversion（内向）、stability（稳定）、neuroticism（神经质）、conscientiousness（尽责）、openness（开放）、creativity（创造）、reflectiveness（深思）、agreeableness（宜人）、energy（活力）、spontaneity（自发）、optimism（乐观）等

## 🎨 UI 设计

- **配色**：淡蓝 → 淡紫 → 淡粉渐变背景，紫色主色调
- **卡片**：毛玻璃效果（backdrop-blur），圆角设计
- **动画**：淡入淡出过渡，hover 动效，加载旋转
- **响应式**：移动端单列，桌面端多列布局

---

## 🚀 部署上线（Vercel）

> ⚠️ **建议使用 Node.js 18+ 部署**（本地 Node 16 不影响构建产物，但 Vercel 推荐 LTS 版本）

### 方式一：GitHub 导入部署（推荐，3分钟完成）

**第 1 步：初始化 Git 并推送到 GitHub**

```bash
# 如果你还没安装 Git，请先安装 https://git-scm.com/download/win

# 在项目目录下执行
git init
git add .
git commit -m "feat: 心理年龄测试 SPA 首次部署"

# 创建 GitHub 仓库（在 GitHub 网页上操作），然后推送
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

**第 2 步：在 Vercel 上导入项目**

1. 访问 [https://vercel.com/new](https://vercel.com/new) 并登录（支持 GitHub 直接登录）
2. 在 "Import Git Repository" 列表中，选择你刚推送的仓库
3. **Framework Preset** 会自动识别为 **Vite**（已配置好，无需修改）
4. ⚠️ 如果提示 **Node.js Version**，建议选择 **18.x** 或 **20.x**
5. 点击 **Deploy** 按钮
6. 等待 30-60 秒，部署完成后会给你一个 `xxx.vercel.app` 的访问链接

**第 3 步：绑定自定义域名（可选）**

1. 在 Vercel 项目面板 → Settings → Domains
2. 输入你的域名（如 `psycheage.yourdomain.com`）
3. 按照提示配置 DNS 记录

### 方式二：Vercel CLI 命令行部署

```bash
# 1. 安装 Vercel CLI
npm install -g vercel@latest

# 2. 登录（会打开浏览器）
vercel login

# 3. 在项目根目录执行部署
vercel --prod

# 4. 按提示操作：
#    - Set up and deploy? Y
#    - Which scope? (选择你的账号)
#    - Link to existing project? N (第一次部署)
#    - Project name? (输入项目名)
#    - Directory? (直接回车，使用当前目录)
```

### 方式三：Vercel Dashboard 直接上传

如果不想用 Git，可以直接在 Vercel 网页上上传：

1. 访问 [https://vercel.com/new](https://vercel.com/new)
2. 点击页面底部的 **"Upload"** 标签
3. 将整个项目文件夹拖拽到上传区
4. 等待部署完成

### 方式四：其他静态托管

```bash
# 构建生产版本
npm run build

# 将 dist/ 目录上传到：
# - Netlify: https://app.netlify.com/drop (拖拽上传)
# - Cloudflare Pages: https://pages.cloudflare.com
# - GitHub Pages: git subtree push
# - 任何支持静态文件的 CDN
```

### Vercel 部署注意事项

> 项目已包含 `vercel.json` 配置文件，确保 SPA 路由正常工作：

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

> 如果部署后刷新页面出现 404，请确认 `vercel.json` 存在且格式正确。

## 📄 License

MIT
