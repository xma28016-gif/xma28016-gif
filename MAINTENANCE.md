# 维护主页

内容在 `profile.json`，卡片布局与 Markdown 生成逻辑在 `scripts/build-profile.mjs`。

```sh
npm ci
npm run build
```

头像素材 `assets/maxiao.png` 复用站点主人选择的形象，不重新生成。卡片使用 SVG 文本与矢量图形排版，内嵌同一人物 PNG。没有已确认内容的卡片明确标为待补充。

GitHub 顶部卡片用原生 details/summary 展开 hi，网站保留原有点击动画。
