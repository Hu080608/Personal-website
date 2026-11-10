/**
 * ─────────────────────────────────────────────────────────────
 *  HU080608 — 个人网站内容配置
 * -------------------------------------------------------------
 *  所有个人资料、项目、文章与联系方式都集中在这里。
 *  内容来自 GitHub 公开仓库与仓库 README，不包含虚构履历。
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  meta: {
    name: '胡胜杰',
    firstName: '胡',
    lastName: '胜杰',
    alias: 'HU080608',
    initials: 'HSJ',
    role: '独立开发者',
    subtitle: 'Python / AI 工具 / 静态 Web',
    tagline: '把重复劳动变成工具，把想法做成能用的产品。',
    description:
      '独立开发者，关注 AI 工具、桌面效率软件与轻量 Web 应用。常用 Python 处理本地自动化，用 JavaScript 与 Cloudflare 把想法快速部署到浏览器。',
    location: '在线 / 远程协作',
    timezone: '按项目协商',
    availability: '通过 GitHub 联系',
    contactUrl: 'https://github.com/Hu080608',
    issuesUrl: 'https://github.com/Hu080608/Personal-website/issues',
    coordinates: 'github.com/Hu080608',
    copyrightStart: 2026,
  },

  socials: [
    { label: 'GitHub 主页', handle: '@Hu080608', url: 'https://github.com/Hu080608', icon: 'github' },
    { label: '全部仓库', handle: 'Repositories', url: 'https://github.com/Hu080608?tab=repositories', icon: 'layers' },
  ],

  hero: {
    overline: 'PORTFOLIO // HU080608 // PUBLIC BUILD 2026',
    roles: [
      '独立开发者',
      'Python 工具作者',
      'AI 应用构建者',
      '静态 Web 实践者',
    ],
    intro:
      '我把日常里反复出现的麻烦拆解成能直接使用的工具：批量调色、音视频转换、歌曲下载、聊天分析，以及浏览器里的 AI 应用。',
    primaryCta: { label: '查看项目', to: '/projects' },
    secondaryCta: { label: '通过 GitHub 联系', to: '/contact' },
    stats: [
      { value: '10', label: '公开仓库' },
      { value: '08', label: '原创项目' },
      { value: '03', label: '主要方向' },
      { value: '2026', label: '公开构建起点' },
    ],
    marquee: [
      '桌面工具',
      'AI 应用',
      '音视频处理',
      '自动化脚本',
      '静态 Web',
      'Cloudflare',
    ],
  },

  about: {
    eyebrow: '01 // 关于我',
    title: '把重复劳动，做成真正能用的工具。',
    lead:
      '我是胡胜杰，一名独立开发者。我的项目大多从一个具体麻烦开始：一批需要调色的素材、一首找不到的歌曲、一段需要复盘的聊天记录，或者一个想交给 AI 去解释的概念。',
    paragraphs: [
      '我偏爱“本地优先”的工具。能让数据留在本机的，就尽量不经过服务器；必须调用云端模型时，也会把 API Key、上下文和边界写清楚。HuConverter、DJI D-Log M Batch Grader、music_dl 和 CrushChatAnalyzer 都是沿着这个思路做出来的。',
      '我的公开项目覆盖 Python 桌面程序、AI 应用、音视频批处理和静态 Web。技术选择通常很务实：优先用标准库、FFmpeg、SQLite 这类可靠的基础设施，再把界面、错误处理、日志和测试补齐，让工具不只是能跑一次。',
      '这个网站本身也是一次公开构建：React + Vite 生成静态站点，用 GitHub Actions 自动部署到 GitHub Pages。页面里的项目、技术栈和文章内容都来自公开仓库，不写没有依据的经历和数字。',
    ],
    quote:
      '先把东西做出来，再让它变得更快、更稳、更好看。',
    status: [
      { label: '姓名', value: '胡胜杰' },
      { label: '主要语言', value: 'Python / JavaScript' },
      { label: '公开平台', value: 'GitHub @Hu080608' },
      { label: '当前维护', value: '个人网站与 AI 工具' },
    ],
    radar: [
      { label: '桌面工具', value: 4 },
      { label: 'AI 应用', value: 3 },
      { label: 'Web 前端', value: 4 },
      { label: '多媒体', value: 3 },
      { label: '自动化', value: 2 },
      { label: '云服务', value: 1 },
    ],
    skillGroups: [
      {
        title: 'Python 桌面开发',
        icon: 'code',
        items: ['Tkinter', 'PyInstaller', 'SQLite', 'Windows API', '日志与异常处理', '单文件 exe 分发'],
      },
      {
        title: 'AI 与自动化',
        icon: 'spark',
        items: ['DeepSeek API', '流式对话', '视觉 / 语音接口', 'OCR', 'HMAC 激活码', '自动更新'],
      },
      {
        title: 'Web 与云服务',
        icon: 'layers',
        items: ['HTML / CSS / JavaScript', 'React / Vite', 'GitHub Pages', 'Cloudflare Worker', 'Cloudflare KV', 'GitHub Actions'],
      },
      {
        title: '多媒体处理',
        icon: 'cube',
        items: ['FFmpeg', 'DJI LUT', 'LibRaw', 'H.264 / HEVC / ProRes', 'ID3 标签', '批量任务队列'],
      },
    ],
    timeline: [
      {
        period: '2026.09',
        role: '集中发布本地工具',
        org: 'Hu080608 / GitHub',
        description:
          '这个月公开了学生防诈骗 H5、music_dl、HuConverter 与 CrushChatAnalyzer。项目方向逐渐清晰：用 Python 和本地处理解决真实、重复、耗时的具体问题。',
        tags: ['Python', '本地工具', '自动化'],
      },
      {
        period: '2026.10',
        role: 'AI 与教育实验',
        org: 'feynman-reverse-school / cyber_girlfriend / DJI-BatchGrader',
        description:
          '从费曼反向学校、纯静态 AI 角色客户端，到面向 DJI 素材的批量调色工具，集中探索 AI 交互、无后端架构和 GPU/CPU 多媒体流水线。',
        tags: ['AI 应用', 'Cloudflare', '多媒体'],
      },
      {
        period: '2026.11',
        role: '个人网站上线',
        org: 'Personal-website',
        description:
          '用 React、Vite、Three.js、GSAP 与原生 CSS 构建多页面个人网站，通过 GitHub Actions 自动部署到 GitHub Pages，并把公开项目整理成可持续维护的档案。',
        tags: ['React', 'WebGL', 'GitHub Pages'],
      },
    ],
    principles: [
      {
        index: '01',
        title: '先解决真实问题',
        text: '项目应该对应一个具体麻烦，而不是为了展示技术而存在。批量素材、重复操作、找不到的资源，都是我做工具的起点。',
      },
      {
        index: '02',
        title: '本地优先',
        text: '能在本机完成的数据处理，就不额外经过服务器。必须调用云端模型时，要把 API Key、上传范围和失败边界讲清楚。',
      },
      {
        index: '03',
        title: '把失败也算进去',
        text: '批量任务会失败，接口会变，编码器会不可用。日志、重试、回退、取消与清理临时文件，和主流程同样重要。',
      },
      {
        index: '04',
        title: '写清楚再交付',
        text: 'README、使用说明、许可证和发布记录不是附属品。一个能被别人理解、安装和反馈的工具，才算真正完成。',
      },
    ],
  },

  projects: [
    {
      slug: 'dji-batchgrader',
      title: 'DJI D-Log M 批量调色器',
      subtitle: '面向 DJI 航拍素材的批量 LUT 与色彩还原桌面工具',
      category: '桌面工具',
      year: '2026',
      client: '个人项目',
      role: '独立开发 · 产品设计 · 发布维护',
      accent: '#ffb86b',
      featured: true,
      summary:
        '把照片、视频、LUT 选择、GPU/CPU 编码、并发处理、失败重试和结果报告放进同一个 Windows 桌面程序。',
      description:
        '航拍一次往往会产生大量 D-Log / D-Log M 素材。这个工具把批量导入、DJI 官方 LUT 匹配、GPU/CPU 编码、并发处理、失败重试和结果报告整合成一套本地离线工作流。',
      challenge:
        '大批量素材的色彩还原需要同时处理照片、RAW、视频、音频和多编码器。程序会自动探测 NVENC、QSV、AMF，真实试编码失败后回退 CPU，并为每个文件记录状态、编码器、耗时和错误。',
      outcome:
        '当前公开版本为 v3.8.5，支持 Windows 10/11 x64，提供免费试用与买断授权。仓库用于软件下载、用户文档与问题反馈，不公开源码。',
      metrics: [
        { value: '55+', label: '内置 DJI LUT' },
        { value: '4', label: '视频输出规格' },
        { value: 'v3.8.5', label: '当前版本' },
      ],
      features: ['照片与视频统一批处理', 'GPU / CPU 自动回退', 'RAW 转 16-bit TIFF', '监听文件夹与失败重试'],
      stack: ['Python', 'FFmpeg', 'LibRaw', 'NVENC / QSV / AMF', 'Windows x64'],
      links: [
        { label: 'GitHub 仓库', href: 'https://github.com/Hu080608/DJI-BatchGrader' },
        { label: '下载 Release', href: 'https://github.com/Hu080608/DJI-BatchGrader/releases' },
      ],
    },
    {
      slug: 'huconverter',
      title: 'HuConverter',
      subtitle: '基于 FFmpeg 的 Windows 音视频批量转换器',
      category: '桌面工具',
      year: '2026',
      client: '个人项目',
      role: '独立开发 · UI 设计 · 测试与发布',
      accent: '#6ff7ff',
      featured: true,
      summary:
        '支持音频转 MP3、视频转 MP4、拖拽批量处理、参数调节和单文件 exe 分发的桌面转换工具。',
      description:
        'HuConverter 把常见的音视频转换需求做成一个“打开就能用”的 Windows 程序：自动识别文件类型、批量队列、MP3 / MP4 参数、取消与进度、完成报告和日志窗口都在同一个界面里。',
      challenge:
        '转换工具真正难的不是调用 FFmpeg，而是处理边界：损坏文件、没有音轨、目标文件被占用、转换中途取消、同名文件、拖拽文件夹递归扫描，以及单文件 exe 的启动体验。',
      outcome:
        '当前版本 v1.1.1，内置 FFmpeg 6.1.1，MIT 许可。项目提供 22 项引擎边界测试、8 项拖拽测试、6 项模式切换测试，并通过 GitHub Releases 分发。',
      metrics: [
        { value: '22', label: '引擎边界测试' },
        { value: '8', label: '拖拽测试' },
        { value: 'v1.1.1', label: '当前版本' },
      ],
      features: ['音频 / 视频自动分流', 'Windows 原生拖拽', 'MP3 / MP4 参数调节', '单文件免安装 exe'],
      stack: ['Python', 'Tkinter', 'FFmpeg', 'PyInstaller', 'Windows API'],
      links: [
        { label: 'GitHub 仓库', href: 'https://github.com/Hu080608/HuConverter' },
        { label: '下载 Release', href: 'https://github.com/Hu080608/HuConverter/releases' },
      ],
    },
    {
      slug: 'music-dl',
      title: 'music_dl',
      subtitle: '多音源搜索与智能匹配的歌曲下载器',
      category: '桌面工具',
      year: '2026',
      client: '个人项目',
      role: '独立开发 · 匹配算法 · 图形界面',
      accent: '#9b6cff',
      featured: true,
      summary:
        '输入歌名后并行搜索多个音源，自动挑出更接近原唱的版本，下载为带 ID3 标签的 MP3；失败时转用 B 站音频兜底。',
      description:
        '项目同时提供 Tkinter 图形界面与命令行模式。匹配逻辑会对标题、歌手、时长和负向关键词做综合打分，尽量避开伴奏、KTV、翻唱、试听片段和合集。',
      challenge:
        '同名歌曲里混着翻唱、伴奏、DJ 版和试听版。项目使用多音源并行、模糊匹配、负向词降权、时长离群检测与失败降级来处理这些噪声。',
      outcome:
        '当前版本 v2.0.2，MIT 许可。支持全自动、每首询问、手动挑版本和只试跑四种策略，并提供下载核对表与 CSV 导出。',
      metrics: [
        { value: '2', label: '内置音源' },
        { value: '4', label: '下载策略' },
        { value: 'v2.0.2', label: '当前版本' },
      ],
      features: ['多音源并行搜索', '原唱 / 翻唱打分', 'B 站音频兜底', 'ID3 标签与核对表'],
      stack: ['Python', 'Tkinter', 'ThreadPoolExecutor', 'FFmpeg', 'Requests'],
      links: [
        { label: 'GitHub 仓库', href: 'https://github.com/Hu080608/music_dl' },
      ],
    },
    {
      slug: 'crush-chat-analyzer',
      title: 'Crush Chat Analyzer',
      subtitle: '本地优先的微信聊天分析与 AI 回复桌面工具',
      category: 'AI 应用',
      year: '2026',
      client: '个人项目',
      role: '独立开发 · AI 工作流 · 隐私设计',
      accent: '#ff4fd8',
      featured: true,
      summary:
        '导入微信聊天记录，用 DeepSeek 做情绪与表达复盘，生成不同风格的回复建议，并支持本地存储与演练模式。',
      description:
        '工具支持多种聊天记录格式导入、双方身份选择、关键词搜索、本地统计、AI 分析和智能回复。聊天记录与配置保存在本地 SQLite / 用户目录，API Key 不写入源码。',
      challenge:
        '在加入 AI 能力的同时，必须保留隐私边界：聊天数据只保存在本机，调用模型时只发送必要上下文，并把自动回复限制在用户明确配置的联系人与演练模式内。',
      outcome:
        '当前版本 v2.2.2，MIT 许可。提供 Windows exe 与源码运行方式，覆盖聊天导入、SQLite 存储、DeepSeek 请求、回复解析和自动回复逻辑的单元测试。',
      metrics: [
        { value: '5', label: '聊天导入格式' },
        { value: '7', label: '回复风格' },
        { value: 'v2.2.2', label: '当前版本' },
      ],
      features: ['本地聊天记录存储', 'DeepSeek 情绪分析', '多风格回复生成', '演练模式与发送上限'],
      stack: ['Python', 'DeepSeek API', 'SQLite', 'Win32', 'Markdown'],
      links: [
        { label: 'GitHub 仓库', href: 'https://github.com/Hu080608/CrushChatAnalyzer' },
        { label: '下载 Release', href: 'https://github.com/Hu080608/CrushChatAnalyzer/releases' },
      ],
    },
    {
      slug: 'feynman-reverse-school',
      title: '费曼反向学校',
      subtitle: '让 AI 扮演“需要被教会的学生”',
      category: 'AI 应用',
      year: '2026',
      client: '个人项目',
      role: '全栈开发 · Cloudflare Worker · 前端交互',
      accent: '#3ff2b0',
      featured: true,
      summary:
        '一个纯静态前端 + Cloudflare Worker 的费曼学习法应用：AI 不扮演老师，而是扮演一个会主动暴露不懂、需要你教会它的学生。',
      description:
        '项目包含设置页、对话页和运营后台，前端部署到 GitHub Pages，后端由 Cloudflare Worker 和 KV 承担。对话使用流式响应，激活码、会话、余额、用量与日志都在 Cloudflare 侧管理。',
      challenge:
        '前端不能保存 DeepSeek API Key，因此所有模型调用必须经过 Worker；同时还要处理激活码核销、会话恢复、后台权限、流式输出和静态部署。',
      outcome:
        '完成了从静态前端、边缘后端、KV 数据到运营后台的完整链路。激活码使用 HMAC-SHA256 核销，生产环境通过 Worker Secrets 管理模型密钥。',
      metrics: [
        { value: '3', label: '页面模块' },
        { value: '2', label: 'Cloudflare 组件' },
        { value: '流式', label: '对话响应' },
      ],
      features: ['AI 扮演学生', '流式对话', 'HMAC 激活码', '静态前端 + 边缘后端'],
      stack: ['JavaScript', 'Cloudflare Worker', 'Cloudflare KV', 'DeepSeek API', 'GitHub Pages'],
      links: [
        { label: 'GitHub 仓库', href: 'https://github.com/Hu080608/feynman-reverse-school' },
      ],
    },
    {
      slug: 'cyber-girlfriend',
      title: 'Cyber Girlfriend',
      subtitle: '纯静态、本地优先的 AI 角色聊天客户端',
      category: 'Web',
      year: '2026',
      client: '个人项目',
      role: '前端开发 · 本地存储 · 加密同步',
      accent: '#8aa7ff',
      featured: false,
      summary:
        '无需服务器、数据库或后端接口的静态网页客户端。人设、配置、记忆、聊天记录、进化与预算保存在浏览器，并支持 Gist 端到端加密同步。',
      description:
        '项目把 API Key、角色设定、记忆与聊天数据保存在浏览器 localStorage，使用 GitHub Gist 做端到端加密同步，让换设备时可以恢复数据。',
      challenge:
        '没有后端意味着所有状态管理、加密同步和恢复逻辑都要在前端完成，同时还要避免把敏感数据暴露到公开仓库或静态资源里。',
      outcome:
        '当前为纯静态实现，部署目标为 GitHub Pages。数据默认留在本地，跨设备同步通过用户自己的 Gist 完成。',
      metrics: [
        { value: '0', label: '后端服务' },
        { value: 'Gist', label: '加密同步' },
        { value: '本地', label: '数据存储' },
      ],
      features: ['纯静态部署', 'localStorage 持久化', 'Gist 端到端加密同步', '人设 / 记忆 / 预算管理'],
      stack: ['HTML', 'CSS', 'JavaScript', 'localStorage', 'GitHub Gist', 'GitHub Pages'],
      links: [
        { label: 'GitHub 仓库', href: 'https://github.com/Hu080608/cyber_girlfriend' },
      ],
    },
    {
      slug: 'anti-fraud-h5',
      title: '学生防诈骗 H5',
      subtitle: '面向学生的移动端反诈宣传页面',
      category: 'Web',
      year: '2026',
      client: '个人项目',
      role: '内容整理 · 页面开发 · GitHub Pages 部署',
      accent: '#ff6b8a',
      featured: false,
      summary:
        '一个可部署到 GitHub Pages 的手机端防诈骗宣传页，包含常见骗局、三不一多原则、被骗处理步骤和 3 道反诈测试。',
      description:
        '页面目标是让学生扫码即可阅读，因此采用移动端优先的短页面结构，把常见网络诈骗类型、报警与求助渠道、处理步骤和互动测试压缩在少量滚动中。',
      challenge:
        '反诈信息本身容易变成密集说教。页面用清晰分区、步骤卡片和 3 道小测试降低阅读门槛，同时保留 96110 与 110 等关键信息。',
      outcome:
        '纯静态 HTML 页面，可直接部署到 GitHub Pages，并通过二维码分享给学生。',
      metrics: [
        { value: '3', label: '反诈测试题' },
        { value: '2', label: '求助热线' },
        { value: '移动端', label: '优先设计' },
      ],
      features: ['学生常见骗局', '三不一多原则', '被骗处理步骤', '互动测试'],
      stack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
      links: [
        { label: 'GitHub 仓库', href: 'https://github.com/Hu080608/anti_fraud_h5' },
      ],
    },
  ],

  lab: {
    experiments: [
      {
        id: 'shader',
        code: 'EXP-001',
        title: '以太着色器',
        description: '一个实时片元着色器实验场，内置三种程序化氛围。移动鼠标，让场域随你弯曲。',
      },
      {
        id: 'terminal',
        code: 'EXP-002',
        title: '项目终端',
        description: '一个带本地命令集的模拟控制台。输入 `help` 查看项目信息与联系方式。',
      },
      {
        id: 'telemetry',
        code: 'EXP-003',
        title: '信号遥测',
        description: '一块实时 Canvas 画布，用合成网络流量与注意力负载绘制信号。',
      },
      {
        id: 'decoder',
        code: 'EXP-004',
        title: '字符解码器',
        description: '一个可交互的乱码引擎，让文字在干扰中逐渐显形。',
      },
    ],
  },

  posts: [
    {
      slug: 'huconverter-engineering-notes',
      title: '把音视频批处理做成桌面工具：HuConverter 的工程取舍',
      subtitle:
        '从 FFmpeg 命令生成、拖拽上传，到中途取消和单文件 exe 分发，记录一个 Windows 工具真正变得可用的过程。',
      date: '2026-09-21',
      displayDate: '2026.09.21',
      readTime: '9 分钟阅读',
      category: '项目复盘',
      tags: ['Python', 'FFmpeg', '桌面应用'],
      featured: true,
      excerpt:
        '转换工具真正难的不是调用 FFmpeg，而是处理损坏文件、没有音轨、中途取消、同名文件、拖拽文件夹和启动速度这些边界。',
      content: [
        { type: 'lead', text: 'HuConverter 的目标很具体：把音频转 MP3、视频转 MP4 这件小事做成一个打开就能用的 Windows 程序，而不是每次都打开终端拼 FFmpeg 参数。' },
        { type: 'p', text: '功能列表看起来不复杂：拖入文件、选择输出格式、开始转换、显示进度和结果。但真正开始实现后，大部分时间都花在“异常情况”上。只要批量处理存在，失败就不是偶发事件，而是流程的一部分。' },
        { type: 'h2', text: '01. FFmpeg 只是执行层' },
        { type: 'p', text: '程序需要先判断文件是音频还是视频、读取媒体信息、决定目标格式，再生成对应的参数。MP3 有码率、VBR、采样率和声道；MP4 有分辨率上限、CRF、编码器和音频码率。参数面板不是装饰，它直接决定命令怎么拼。' },
        { type: 'p', text: '我把 FFmpeg 定位、媒体探测、命令生成和进度解析放在独立模块里，界面只负责收集用户意图。这样测试时可以不经过 GUI，直接验证命令行转换本身。' },
        { type: 'h2', text: '02. 取消不是把进程杀掉' },
        { type: 'p', text: '批量转换里，用户点“取消”之后真正需要的是：停止当前任务、清理临时文件、保留已完成结果、不要让下一项继续运行。只终止进程会留下半成品文件，下一次运行时还可能覆盖同名文件。' },
        { type: 'list', items: [
          '为每次转换建立独立输出路径，避免同名覆盖。',
          '取消时同时终止 FFmpeg 进程并清理临时文件。',
          '把失败、跳过、取消和完成分开统计，而不是只显示一个百分比。',
          '为损坏文件、没有音轨、目标文件被占用等场景提供可读错误。',
        ] },
        { type: 'h2', text: '03. 拖拽和单文件 exe 都是产品体验' },
        { type: 'p', text: 'Windows 原生拖放需要处理 WM_DROPFILES，而不是依赖额外的 GUI 库。它能接收文件或整个文件夹，文件夹会递归扫描，非音视频文件会被忽略并提示。这个交互比“点击选择文件”更接近真实使用方式。' },
        { type: 'p', text: '单文件 exe 也有代价：每次启动都要解压内置引擎。项目通过提供 onedir 打包选项、减少启动日志和缓存路径来平衡体积与启动速度。工具不是打包完就结束，首次打开的三秒钟同样属于产品。' },
        { type: 'callout', title: '测试覆盖的是边界', text: '22 项引擎测试、8 项拖拽测试和 6 项模式切换测试，主要覆盖中途取消、无音轨、损坏文件、同名处理、文件夹递归和主题切换后拖拽失效这些问题。' },
        { type: 'h2', text: '04. 本地工具的价值' },
        { type: 'p', text: 'HuConverter 不上传文件，不依赖账号，也不需要服务端。它把 FFmpeg 的能力包进一个明确的界面，让不熟悉命令行的人也能完成批量转换。对这类工具来说，可靠、离线、结果可检查，比复杂功能更重要。' },
        { type: 'divider' },
        { type: 'p', text: '项目源码与 Releases 都在 GitHub：github.com/Hu080608/HuConverter。README 里保留了完整参数说明、测试命令和常见问题，方便别人验证与继续使用。' },
      ],
    },
    {
      slug: 'crush-chat-analyzer-local-first',
      title: '本地优先的 AI 聊天分析器是怎么搭起来的',
      subtitle:
        'CrushChatAnalyzer 如何把聊天导入、SQLite、DeepSeek 分析、回复生成和隐私边界组合成一个桌面工具。',
      date: '2026-10-06',
      displayDate: '2026.10.06',
      readTime: '8 分钟阅读',
      category: '架构笔记',
      tags: ['AI', 'Python', '隐私'],
      featured: false,
      excerpt:
        'AI 分析可以很强，但前提是把数据边界说清楚：什么留在本地，什么会发给模型，哪些动作必须由用户明确开启。',
      content: [
        { type: 'lead', text: 'CrushChatAnalyzer 的起点不是“做一个 AI 聊天工具”，而是“把已经存在的聊天记录整理成可以复盘的材料，再让模型帮助我换一个角度看对话”。' },
        { type: 'p', text: '因此它首先是一个本地数据处理工具，其次才是一个 AI 应用。聊天记录导入、身份选择、搜索、统计和存储都在本地完成；只有用户主动发起分析或生成回复时，才会调用 DeepSeek。' },
        { type: 'h2', text: '01. 导入层要容纳不完美的数据' },
        { type: 'p', text: '微信聊天记录可能来自 txt、csv、tsv、json 或 jsonl，不同导出工具的列名也不完全一样。程序会自动识别 StrTime、NickName、StrContent、IsSender、CreateTime 等常见字段，并允许用户确认“我是谁”。' },
        { type: 'p', text: '这类工具最容易被脏数据击穿。身份识别反了、时间顺序错了、空消息混进上下文，都会让后面的分析失去意义。所以导入层必须把清洗、校验和身份选择做成独立步骤。' },
        { type: 'h2', text: '02. 本地 SQLite 与浏览器边界' },
        { type: 'p', text: '聊天记录和配置保存在本机，API Key 也存放在用户目录。程序不把聊天数据库打进安装包，也不默认上传到服务器。只有当用户发起 AI 请求时，选定范围内的上下文才会发送给模型服务商。' },
        { type: 'quote', text: '本地优先不是“永不上传”，而是让用户知道什么时候、上传了什么、为什么需要上传。' },
        { type: 'h2', text: '03. 让 AI 输出可用于复盘' },
        { type: 'p', text: '分析结果被拆成对方情绪、对方态度、我的表达复盘、可调整话术、下一步建议、风险与边界。比起一句“他喜不喜欢你”，这种结构更像一份可以继续修改的沟通笔记。' },
        { type: 'p', text: '回复生成同样需要限制。工具一次生成 1 到 5 条不同风格的建议，展示风格、理由和风险等级；自动回复必须指定联系人，并提供演练模式和发送上限。' },
        { type: 'h2', text: '04. 不把概率说成读心术' },
        { type: 'p', text: 'README 里明确写了：AI 分析是概率推测，不是读心术。这个提醒不是免责声明装饰，而是产品设计的一部分。工具应该帮助人复盘沟通，而不是鼓励操控、跟踪或侵犯隐私。' },
        { type: 'callout', title: '工程上的收尾', text: '项目对聊天导入、本地统计、SQLite 存储、DeepSeek 请求、回复解析和自动回复逻辑提供单元测试。对涉及隐私的桌面工具来说，可验证性本身就是信任的一部分。' },
        { type: 'p', text: '源码采用 MIT 许可，仓库：github.com/Hu080608/CrushChatAnalyzer。' },
      ],
    },
    {
      slug: 'static-frontend-cloudflare-ai',
      title: '静态前端 + Cloudflare Worker：费曼反向学校的架构',
      subtitle:
        '没有自建服务器，也能把 AI 对话、激活码、会话和后台管理接起来。',
      date: '2026-10-11',
      displayDate: '2026.10.11',
      readTime: '8 分钟阅读',
      category: '架构笔记',
      tags: ['Cloudflare', 'AI', 'Web'],
      featured: false,
      excerpt:
        'GitHub Pages 托管前端，Cloudflare Worker 负责 API、KV 保存状态，DeepSeek 只通过 Worker 调用。这个组合足够轻，也足够完整。',
      content: [
        { type: 'lead', text: '费曼反向学校是一个纯静态前端项目：AI 不扮演老师，而是扮演一个需要被教会、会主动暴露不懂的学生。' },
        { type: 'p', text: '为了让这个交互真正可用，项目需要处理的不只是聊天窗口，还包括设置、对话记录、激活码、余额、用量和运营后台。自建服务器当然可以，但对一个个人项目来说，Cloudflare Worker + KV 更轻。' },
        { type: 'h2', text: '01. 为什么前端必须是静态的' },
        { type: 'p', text: '前端部署在 GitHub Pages，没有 Node 服务，也没有数据库。所有页面都是 HTML / CSS / JavaScript，后端请求统一指向 Cloudflare Worker。这样做的好处是部署简单、成本低，也方便别人复制和 fork。' },
        { type: 'h2', text: '02. API Key 不能进浏览器' },
        { type: 'p', text: 'DeepSeek 的 Key 只保存在 Worker Secret 里，前端永远看不到。Worker 接收前端请求，校验激活码和额度，再调用模型 API，最后以流式方式把结果返回给页面。' },
        { type: 'callout', title: '最小可信链路', text: '浏览器 → Cloudflare Worker → DeepSeek API。每一步都能独立验证，前端只负责交互，边缘层负责认证和转发。' },
        { type: 'h2', text: '03. 激活码与 KV 的边界' },
        { type: 'p', text: '激活码使用 HMAC-SHA256 核销，存储在 Cloudflare KV。KV 适合这类轻量状态，但最终一致性意味着极高并发下仍需要 D1 或 Durable Objects 才能做到严格原子。README 里把这个限制写清楚，而不是假装它不存在。' },
        { type: 'p', text: '聊天记录默认只保存在当前设备浏览器里，不跨设备同步。激活码可用于恢复账号，但用户仍然需要像保管密码一样保管它。' },
        { type: 'h2', text: '04. 运营后台也在同一套架构里' },
        { type: 'p', text: '项目包含设置页、对话页和后台页面。后台需要独立的管理员令牌，生产环境还需要限制 ALLOWED_ORIGIN。静态前端并不意味着不能有管理能力，而是要把权限和入口设计清楚。' },
        { type: 'p', text: '这个项目让我更确定一件事：静态站点并不是“简单版应用”，它可以是一个完整产品的前端，只要把边缘层、状态边界和密钥管理设计好。' },
        { type: 'divider' },
        { type: 'p', text: '仓库：github.com/Hu080608/feynman-reverse-school。架构图、Worker 配置和激活码生成命令都写在 README 里。' },
      ],
    },
  ],

  contact: {
    eyebrow: '06 // 联系',
    title: '通过 GitHub 找到我。',
    lead:
      '如果你对我的项目感兴趣、发现了 Bug，或者想交流 AI 工具、桌面应用和静态 Web，欢迎通过 GitHub 联系。公开仓库里的 Issues 是最直接的反馈入口。',
    responseTime: '不承诺固定响应时间，请优先通过 GitHub Issues 反馈',
    formNote:
      '这是纯静态演示表单，不会发送数据。真实联系请使用 GitHub 主页或对应仓库的 Issues。',
    faqs: [
      {
        q: '如何反馈 Bug 或功能建议？',
        a: '优先到对应项目的 GitHub Issues 提交，附上系统版本、复现步骤、日志或截图。这样问题可以公开追踪，也方便其他人搜索到解决方案。',
      },
      {
        q: '这些项目可以商用或二次开发吗？',
        a: '以每个仓库的 LICENSE 为准。HuConverter、music_dl、CrushChatAnalyzer 等使用 MIT 许可；DJI D-Log M Batch Grader 是商业软件，公开仓库只用于下载、文档和反馈，不提供源码。',
      },
      {
        q: 'AI 功能会把我的数据上传吗？',
        a: '这些工具大多采用本地优先设计：聊天记录、配置和媒体文件默认保存在本机。只有主动调用 AI 功能时，相关上下文才会发送给模型服务商。具体边界请查看各项目 README。',
      },
      {
        q: '可以定制开发吗？',
        a: '目前以个人项目维护为主。合作与定制可以通过 GitHub 联系，具体是否适合取决于时间、范围和项目边界。',
      },
    ],
  },

  footer: {
    statement: '公开构建，持续维护。',
    note: '本站项目信息来自 GitHub 公开仓库与 README；个人资料以公开信息为准。欢迎通过 GitHub 交流。',
  },
}

export default profile
