# HU080608 — 个人作品集

这是一个以真实公开项目为基础的多页面个人作品集。站点使用 **React + Vite** 构建为纯静态站点，通过 **GitHub Actions** 自动部署到 **GitHub Pages**，不依赖后端服务。

- 线上地址：https://hu080608.github.io/Personal-website/
- GitHub：https://github.com/Hu080608
- 作者：胡胜杰（@Hu080608）

页面中的项目、技术栈、文章和联系方式均来自公开 GitHub 仓库与仓库 README，不包含虚构履历或无关内容。

---

## 1. 技术栈

| 层 | 方案 |
| --- | --- |
| 框架 | React 18 + Vite 6 |
| 路由 | React Router 6（HashRouter） |
| 样式 | 原生 CSS 设计令牌、玻璃拟态、霓虹辉光、扫描线与响应式栅格 |
| 3D / GPU | Three.js + 自定义 GLSL ShaderMaterial |
| 动效 | GSAP ScrollTrigger、Framer Motion、IntersectionObserver |
| 数据可视化 | SVG 雷达图、Canvas 2D 遥测、原生 WebGL Shader |
| 字体 | @fontsource 本地打包（Orbitron / Space Grotesk / JetBrains Mono），中文使用系统中文字体回退 |
| 部署 | GitHub Actions → GitHub Pages |

---

## 2. 页面与内容

| 路由 | 页面 |
| --- | --- |
| `/#/` | 首页：粒子 Hero、个人简介、精选项目、能力矩阵、工程原则、项目文章 |
| `/#/about` | 关于：真实项目背景、技术方向统计、项目时间线、工程原则 |
| `/#/projects` | 项目：按桌面工具 / AI 应用 / Web 筛选，打开真实项目详情 |
| `/#/lab` | 实验室：WebGL Shader、项目终端、Canvas 遥测、字符解码器 |
| `/#/blog` | 日志：项目复盘、标签筛选与搜索 |
| `/#/blog/:slug` | 文章正文：目录、阅读进度、作者卡、下一篇 |
| `/#/contact` | 联系：GitHub 联系方式、反馈说明、本地演示表单、FAQ |
| `/#/任意路径` | 404 页面 |

### 收录项目

- **DJI D-Log M Batch Grader**：DJI 素材批量 LUT 调色与色彩还原工具
- **HuConverter**：基于 FFmpeg 的音视频批量转换器
- **music_dl**：多音源搜索与智能匹配的歌曲下载器
- **CrushChatAnalyzer**：本地优先的微信聊天分析与 AI 回复工具
- **费曼反向学校**：静态前端 + Cloudflare Worker 的 AI 学习应用
- **Cyber Girlfriend**：纯静态、本地优先的 AI 角色聊天客户端
- **学生防诈骗 H5**：移动端反诈宣传页

---

## 3. 目录结构

```text
nexus-portfolio/
├── .github/workflows/deploy.yml
├── public/
│   ├── .nojekyll
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── background/
│   │   ├── common/
│   │   ├── layout/
│   │   └── visuals/
│   ├── config/profile.js          ← 全站内容配置
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 4. 本地运行

要求 Node.js 20+。

```bash
npm install
npm run dev
```

生产构建与预览：

```bash
npm run build
npm run preview
```

`npm run build` 会生成可直接静态托管的 `dist/` 目录。

---

## 5. 修改内容

所有个人内容集中在：

```text
src/config/profile.js
```

可修改：

- `meta`：姓名、角色、简介、联系地址
- `socials`：GitHub 与仓库列表
- `hero`：首页标题、角色轮播、统计数据
- `about`：个人介绍、技术方向、时间线、原则
- `projects`：项目标题、说明、技术栈、指标、GitHub / Release 链接
- `posts`：文章列表与正文内容
- `contact`：联系说明与 FAQ
- `footer`：页脚说明

项目卡片和文章正文支持新增条目，页面会自动更新。

---

## 6. 特效实现

1. **GPU 粒子背景**：`src/components/background/ParticleField.jsx`，Three.js + ShaderMaterial，自适应移动端粒子数量与 DPR。
2. **滚动动画**：GSAP ScrollTrigger + `Reveal.jsx` 的 IntersectionObserver。
3. **自定义光标**：`CustomCursor.jsx`，触屏自动禁用。
4. **路由过渡**：`App.jsx` 中 Framer Motion `AnimatePresence` + 懒加载路由。
5. **文字特效**：Glitch、Typewriter、ScrambleText、GlyphDecoder。
6. **动态可视化**：SVG 雷达图、Canvas 遥测、WebGL Shader Lab。

所有 rAF、Observer、Timeout、指针监听和 WebGL 资源在组件卸载时清理。

---

## 7. GitHub Pages 部署

Workflow 已包含在：

```text
.github/workflows/deploy.yml
```

部署步骤：

1. 推送代码到 `main`。
2. 仓库 **Settings → Pages**。
3. **Build and deployment → Source** 选择 **GitHub Actions**。
4. Actions 完成后访问：

```text
https://<username>.github.io/<repository-name>/
```

当前站点：

```text
https://hu080608.github.io/Personal-website/
```

`vite.config.js` 使用 `base: './'`，路由使用 HashRouter，因此部署在仓库子路径下不会出现静态资源或路由 404。

---

## 8. 说明

- 站点为纯静态前端，联系表单只在本地校验，不会发送数据。
- 正式反馈请使用 GitHub Issues 或仓库主页。
- 各项目的许可证、使用方式和数据边界以其 README / LICENSE 为准。
