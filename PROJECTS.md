# 项目与作品

[← 返回个人主页](./README.md)

## 携程酒店订阅体验

以酒店体验画册为载体，串联 360° 全景、客房视频、按晚预订演示与行程助手，让浏览、选择和体验形成完整路径。

`交互原型` `全景交互` `JavaScript` `响应式布局`

### 项目内容

从大厅全景到房型浏览、相册、视频与预订演示，围绕酒店选择过程组织信息。包含海滨全景与页面内行程助手。

### 交互与实现

使用 HTML、CSS 和 JavaScript，结合 Pannellum 实现场景热点、拖动与缩放；视频按视野和页面状态加载、播放与暂停，适配触摸和键盘操作。

### 完整交付

公开页面可体验房型切换、入住日期与晚数计算、图库和行程演示；源码仓库保留素材说明与验证脚本。

[完整作品](https://xma28016-gif.github.io/ctrip-hotel-subscription/) · [源码仓库](https://github.com/xma28016-gif/ctrip-hotel-subscription)

---

## 即梦 AI 产品拆解

围绕中文海报生成与受约束改图，拆解任务流程、模型入口、费用口径与产品编排，并把判断关联到取证材料。

`AI 产品评测` `产品拆解` `证据核验`

### 研究任务

以中文茶饮海报生成和指定原图改背景为任务，记录从参数设置、多稿筛选到编辑结果的完整可见路径。

### 分析内容

报告覆盖产品定位、用户场景、评测维度、模型与费用、技术职责分工和架构推导，并分别标记已确认信息、推断及待验证项。

### 完整交付

在线报告提供 10 张取证截图、证据索引与二次核验清单；研究日期为 2026 年 10 月 19 日。

[完整作品](https://xma28016-gif.github.io/jimeng-product-teardown/) · [源码仓库](https://github.com/xma28016-gif/jimeng-product-teardown)

---

## Scene Studio · 商品场景图生成器

上传商品图，搭配场景与文字描述生成摄影图。支持语音听写、进度反馈和私有作品库。

`AI 生图` `Dify` `Supabase` `MIT 开源`

### 从商品图到场景图

上传商品照片，选择场景、比例和张数，也可以通过文字或语音描述画面。等待时可查看处理阶段与已用时间。

### 保存与复用

登录后可在「我的作品」查看原图和生成图，下载所需图片。

### 开源实现

前端使用原生 Web，服务端接入 Dify Chatflow，Supabase 提供登录与私有存储。仓库提供本地运行、数据库初始化与 Vercel 部署说明。

[完整作品](https://scene-studio-six.vercel.app/prototype.html) · [源码仓库](https://github.com/xma28016-gif/scene-studio)

---

## 个人网站 · MX OS

用原生 Web 构建的个人空间。从终端欢迎页进入桌面式主页，探索项目目录、实践技能与文章归档。

`HTML` `CSS` `JavaScript` `Canvas` `GitHub Pages`

### 内容组织

首页整合个人介绍、全部公开项目、实践技能和文章索引，提供分类、搜索与项目详情。

### 交互与可访问性

支持点击或回车进入主页、侧栏分区切换、技能关联项目和浏览器前进后退。适配手机与键盘操作；仓库保留早期 Canvas 粒子实验。

### 完整交付

网站通过 GitHub Pages 发布，字体本地托管；内容集中存放，便于持续维护。

[完整作品](https://xma28016-gif.github.io/) · [源码仓库](https://github.com/xma28016-gif/xma28016-gif.github.io)

---

## 心跳 heartbeat · 薪动 × 涨声

工资与资产双看板：按薪资和作息估算每秒收入，手动管理股票、ETF、基金与黄金；支持小憩计时、金额隐藏和可缩放置顶的 Mac 小窗。

`macOS` `Swift / AppKit` `JavaScript` `MIT 开源`

### 两份看板

薪动：看见每一秒的心动。涨声：听见每一次的涨声。工资按排班估算，资产参考价手动维护，示例曲线不代表真实行情。

### 互动与桌面体验

提供小憩计时、票根、工资设置和持仓管理。Mac 版支持独立小窗、拖动、缩放、置顶与本地保存；浏览器 Demo 无需安装即可体验。

### 版本与边界

采用 MIT 协议开源。v0.2.1 桌面预览版仅支持 Apple 芯片 Mac，尚未完成 Apple 公证，系统可能阻止打开；建议先体验网页版。

[完整作品](https://xma28016-gif.github.io/heartbeat/) · [源码仓库](https://github.com/xma28016-gif/heartbeat) · [在线体验](https://xma28016-gif.github.io/heartbeat/demo/) · [Mac 预览版下载](https://github.com/xma28016-gif/heartbeat/releases/tag/v0.2.1)

---

## RAG中台

可自行部署的知识库问答中台，串联文档导入、解析与分块预览、混合检索和带引用的问答，提供运行日志与人工评测集。

`RAG` `混合检索` `Next.js / FastAPI` `MIT 开源`

### 文档入库与知识构建

导入 PDF、Word、Excel、Markdown、CSV 和图片，检查解析结果、分块与来源位置，再异步构建索引。扫描件和复杂版式可按需配置 DocMind 增强解析。

### 检索、问答与评测

支持向量与关键词混合召回、RRF 融合和可选重排，输出流式回答与引用。运行日志保留查询、证据、用量、耗时和错误，可人工收录 Good / Bad Case 并补充参考答案与判定标准。

### 实现与部署

前端使用 Next.js、React 和 TypeScript，后端使用 FastAPI、LangChain Core 与 Celery，配合 PostgreSQL、pgvector 和 Redis。仓库提供 Docker Compose 与 macOS 本机运行方式。当前免登录管理界面面向本机或可信测试环境。

[完整作品](https://github.com/xma28016-gif/zhijing-rag) · [源码仓库](https://github.com/xma28016-gif/zhijing-rag)

---

## 小小发明家

面向 4–6 岁儿童的 AI 游戏创作桌面应用，通过自然对话、语音输入与图文灵感选择，按现有模板制作小游戏并保存为本地作品。当前公开产品介绍、工作流程与真实界面截图。

`4–6 岁` `AI 游戏创作` `语音输入` `React / Electron`

### 从想法到小游戏

从兴趣和日常聊天出发，逐步形成游戏想法，也可以通过图文灵感库选择玩法。确认制作后，应用校验方案并复用现有游戏模板创建独立作品，显示准备进度后进入游戏。

### 语音与桌面实现

界面使用 React 和 TypeScript，Electron 负责桌面宿主与本地作品。DeepSeek 提供自然对话，火山引擎双向流式 ASR 将语音转入可编辑的输入框；游戏模板根据玩法使用 Canvas 2D 或 Three.js。

### 公开展示与当前阶段

仓库提供产品介绍、工作流程和真实应用截图。本地版本处于内部体验阶段，源码与安装包的公开分发仍待上游授权核对，真实家庭与儿童验收待完成。

[完整作品](https://github.com/xma28016-gif/little-inventor) · [源码仓库](https://github.com/xma28016-gif/little-inventor)

---

## Vibe Coding 全栈开发技巧

面向 AI 辅助全栈开发的中文手册与工具包，覆盖从想法、PRD、技术适配到开发、验收和上线的六阶段流程，附规则卡、模板与验证脚本。

`PRD 模板` `Python / FastAPI` `Next.js / TypeScript` `验证与交付` `MIT 开源`

### 六阶段开发流程

从需求检查、技术适配、后端 MVP、前端实现，到部署与收尾，按阶段组织产物、验证和交接。

### 手册与模板

包含通用技术栈、前端与上线部署三份手册，以及 PRD 模板、AI 规则卡和参考代码。默认方案覆盖 FastAPI、Next.js 与腾讯云开发，可根据现有项目调整。

### 验证与开源

提供项目状态管理和自检脚本，指导保留真实模型调用、模拟测试与验收证据。经授权整理发布，维护者马骁，采用 MIT 许可证。

[完整作品](https://github.com/xma28016-gif/vibe-coding-fullstack-tips) · [源码仓库](https://github.com/xma28016-gif/vibe-coding-fullstack-tips)

## 全部公开仓库

| 仓库 | 用途 |
| --- | --- |
| [ctrip-hotel-subscription](https://github.com/xma28016-gif/ctrip-hotel-subscription) | 携程酒店订阅体验 |
| [jimeng-product-teardown](https://github.com/xma28016-gif/jimeng-product-teardown) | 即梦 AI 产品拆解 |
| [scene-studio](https://github.com/xma28016-gif/scene-studio) | Scene Studio · 商品场景图生成器 |
| [xma28016-gif.github.io](https://github.com/xma28016-gif/xma28016-gif.github.io) | 个人网站 · MX OS |
| [heartbeat](https://github.com/xma28016-gif/heartbeat) | 心跳 heartbeat · 薪动 × 涨声 |
| [zhijing-rag](https://github.com/xma28016-gif/zhijing-rag) | RAG中台 |
| [little-inventor](https://github.com/xma28016-gif/little-inventor) | 小小发明家 |
| [vibe-coding-fullstack-tips](https://github.com/xma28016-gif/vibe-coding-fullstack-tips) | Vibe Coding 全栈开发技巧 |
| [qingyan-camera-proposal](https://github.com/xma28016-gif/qingyan-camera-proposal) | 轻颜相机 2.0 迭代方案 |
| [xma28016-gif](https://github.com/xma28016-gif/xma28016-gif) | GitHub 主页 README、展示卡片与内容索引 |
