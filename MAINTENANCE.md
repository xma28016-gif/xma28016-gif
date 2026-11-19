# 维护主页

内容在 `profile.json`，卡片布局与 Markdown 生成逻辑在 `scripts/build-profile.mjs`。

```sh
npm ci
npm run build
```

头像素材 `assets/maxiao.png` 为站点主人选择的身份与画风参考，顶部欢迎卡沿用原图。卡片使用 SVG 文本与矢量图形排版，按主题内嵌 `assets/poses/` 中不同姿态的人物 PNG。生成提示词与卡片映射保存在 `assets/poses/manifest.json`。没有已确认内容的卡片明确标为待补充。

GitHub 顶部卡片用 SVG 分层实现轻微起伏与挥手，每 6 秒循环；手腕的遮罩与重叠裁切按原始头像的 640 × 960 坐标定义。README 用 picture 根据减少动态效果偏好选择 hello-static.svg。原生 details/summary 仍负责点击展开 hi，网站保留原有点击动画。
