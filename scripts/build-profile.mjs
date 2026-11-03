import fs from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
const profile = JSON.parse(await fs.readFile(new URL('../profile.json', import.meta.url)));
const root = new URL('../', import.meta.url);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;' }[c]));
const avatar = await sharp(fileURLToPath(new URL('../assets/maxiao.png', import.meta.url))).resize({ height: 720 }).png({ palette: true, colours: 192, compressionLevel: 9 }).toBuffer();
const avatarURI = 'data:image/png;base64,' + avatar.toString('base64');
const poseManifest = JSON.parse(await fs.readFile(new URL('../assets/poses/manifest.json', import.meta.url)));
const poseURIs = new Map(await Promise.all(poseManifest.poses.map(async pose => {
 const image = await sharp(fileURLToPath(new URL('../' + pose.file, import.meta.url)))
   .resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true })
   .png({ palette: true, colours: 192, compressionLevel: 9 }).toBuffer();
 return [pose.id, 'data:image/png;base64,' + image.toString('base64')];
})));

const palettes = { blue:['#e7efff','#acc2ea','#4d73b9','#5f8fee'], mint:['#e6f4ee','#a8ccbc','#4c8c75','#55bda2'], pink:['#fceaf0','#d8aebd','#aa6a86','#ce7ea1'], lilac:['#f0eaff','#bfb0dc','#8065b0','#9874d3'], sand:['#faf0df','#dcc8a2','#aa8753','#d9aa66'] };
const write = (file,text) => fs.writeFile(new URL(file,root),text);
function frame(w,h,p,content,title) {
 const [bg,line,muted,accent] = palettes[p];
 const barLabel = content.match(/<text x="92" y="39"[^>]*>[\s\S]*?<\/text>/)?.[0] || '';
 content = content.replace(barLabel, '');
 return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title><defs><linearGradient id="bar" x2="1" y2="1"><stop stop-color="${bg}"/><stop offset="1" stop-color="#fff"/></linearGradient><radialGradient id="glow"><stop stop-color="${accent}" stop-opacity=".19"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient><clipPath id="inside"><rect x="17" y="58" width="${w-34}" height="${h-75}" rx="13"/></clipPath><style>text{font-family:'PingFang SC','Microsoft YaHei','Noto Sans CJK SC',Arial,sans-serif} .mono{font-family:Menlo,Consolas,monospace}</style></defs><rect x="3" y="3" width="${w-6}" height="${h-6}" rx="19" fill="url(#bar)" stroke="${line}" stroke-width="3"/><rect x="17" y="58" width="${w-34}" height="${h-75}" rx="13" fill="#fffefa" stroke="${line}" stroke-width="1.6"/><circle cx="28" cy="30" r="5" fill="${muted}" opacity=".65"/><circle cx="46" cy="30" r="5" fill="${muted}" opacity=".5"/><circle cx="64" cy="30" r="5" fill="${muted}" opacity=".35"/><path d="M${w-110} 32h16m16-7h12v12h-12m30-13 16 16m0-16-16 16" fill="none" stroke="${muted}" stroke-width="2" opacity=".55"/>${barLabel}<g clip-path="url(#inside)">${content}</g></svg>`;
}
function prop(kind,accent) {
 const base = `<g transform="translate(818 100) rotate(6 150 160)" opacity=".5" stroke="${accent}" stroke-width="3">`;
 if (kind==='hotel') return base + `<rect x="15" y="80" width="300" height="235" rx="24" fill="#e3edff"/><path d="M45 118h240M65 100v180m65-180v180m65-180v180m65-180v180M40 165h250M40 220h250" fill="none"/><rect x="135" y="245" width="55" height="70" rx="5" fill="#fff"/></g>`;
 if (kind==='camera') return base + `<rect x="5" y="125" width="300" height="190" rx="35" fill="#f1e8ff"/><path d="M65 125l25-45h125l25 45" fill="#f1e8ff"/><circle cx="156" cy="219" r="63" fill="#fff"/><circle cx="156" cy="219" r="41" fill="#d6c8ee"/><circle cx="259" cy="163" r="10" fill="#fff"/></g>`;
 if (kind==='code') return base + `<rect x="5" y="45" width="315" height="245" rx="24" fill="#e4ecff"/><path d="M5 90h315M93 135l-47 43 47 44m128-87 47 43-47 44m-51-103-35 121" fill="none" stroke-width="12" stroke-linecap="round"/></g>`;
 if (kind==='book') return base + `<rect x="35" y="55" width="245" height="275" rx="18" fill="#f1eaf8"/><path d="M80 55v275M118 110h115m-115 40h100m-100 40h110m-110 40h80" fill="none" stroke-width="9" stroke-linecap="round"/><path d="M15 320h285v22H15z" fill="#fff"/></g>`;
 if (kind==='placeholder') return base + `<rect x="20" y="40" width="290" height="275" rx="28" fill="#faf8f4" stroke-dasharray="10 10"/><path d="M165 125v100m-50-50h100" fill="none" stroke-width="11" stroke-linecap="round"/></g>`;
 return base + `<rect x="0" y="30" width="310" height="275" rx="23" fill="#e7f0fc"/><path d="M30 75h250M40 120h170M40 157h215M40 194h150" fill="none" stroke-width="9" stroke-linecap="round"/><circle cx="240" cy="248" r="48" fill="#fff"/><path d="m273 282 40 40" stroke-width="14" stroke-linecap="round"/></g>`;
}
const cards = [
 {id:'hotel',type:'产品 / INTERACTION',title:['酒店全景','订阅体验'],sub:'360° 体验 · 浏览与预订演示',tags:['交互原型','JavaScript','Pannellum'],p:'blue',prop:'hotel',url:profile.works[0].url,alt:profile.works[0].title},
 {id:'jimeng',type:'研究 / RESEARCH',title:['即梦 AI','产品拆解'],sub:'中文海报生成与受约束改图',tags:['实测评估','证据索引','完整报告'],p:'mint',prop:'research',url:profile.works[1].url,alt:profile.works[1].title},
 {id:'qingyan',type:'策划 / PRODUCT',title:['轻颜相机','2.0 迭代方案'],sub:'从用户需求，到版本取舍',tags:['需求分析','版本规划','实验设计'],p:'pink',prop:'camera',url:profile.works[2].url,alt:profile.works[2].title},
 {id:'website',type:'作品 / WEB',title:['MX OS','个人空间'],sub:'项目、技能与文章的统一入口',tags:['HTML / CSS / JS','GitHub Pages'],p:'lilac',prop:'code',url:'https://xma28016-gif.github.io/',alt:'MX OS 个人网站'},
 {id:'doc-research',type:'文档 / DOCUMENT',title:['AI 产品评测','研究笔记'],sub:'即梦 AI · 实测路径与判断依据',tags:['任务记录','截图取证','结论边界'],p:'blue',prop:'book',url:profile.works[1].url,alt:'AI 产品评测文档'},
 {id:'doc-planning',type:'文档 / DOCUMENT',title:['产品迭代','立项方案'],sub:'轻颜相机 · 2.0 评审稿',tags:['需求优先级','实验验收','资源规划'],p:'mint',prop:'book',url:profile.works[2].url,alt:'产品迭代立项文档'},
 {id:'skill-research',type:'技能 / PRACTICE',title:['产品研究','与策划'],sub:'拆解问题，形成可验证的方案',tags:['AI 产品评测','需求分析','版本规划'],p:'mint',prop:'research',url:'./SKILLS.md#产品研究与策划',alt:'产品研究与策划技能'},
 {id:'skill-build',type:'技能 / PRACTICE',title:['交互原型','与 Web 实践'],sub:'把想法，做成可体验的作品',tags:['全景交互','响应式布局','JavaScript'],p:'pink',prop:'code',url:'./SKILLS.md#交互与体验',alt:'交互原型与 Web 实践技能'},
 {id:'article-ai',type:'文章 / WECHAT',title:['AI 先裁谁？'],sub:'公司省下的人，最后去了哪里',tags:['代码不再冷冰冰','AI 与职场'],p:'sand',prop:'book',url:profile.notes[0].url,alt:profile.notes[0].title},
 {id:'article-qingyan',type:'文章 / PRODUCT',title:['从拍得好看','到愿意发布'],sub:'轻颜相机 2.0 · 产品策划记录',tags:['用户需求','产品取舍','完整报告'],p:'pink',prop:'camera',url:profile.notes[1].url,alt:profile.notes[1].title},
 {id:'article-jimeng',type:'文章 / RESEARCH',title:['生成之后','如何改图？'],sub:'即梦 AI · 一次完整任务观察',tags:['中文海报','编辑可控性','实测报告'],p:'blue',prop:'research',url:profile.notes[2].url,alt:profile.notes[2].title},
 {id:'article-placeholder',type:'文章 / PLACEHOLDER',title:['更多文章','待补充'],sub:'公众号历史文章 · 预留位置',tags:['等待标题与原文链接'],p:'lilac',prop:'placeholder',url:'./ARTICLES.md#待补充',alt:'更多公众号文章预留位，待补充'},
 {id:'doc-placeholder',type:'文档 / PLACEHOLDER',title:['更多知识文档','待补充'],sub:'文档、方法与模板 · 预留位置',tags:['内容整理中'],p:'sand',prop:'placeholder',url:'./DOCUMENTS.md#待补充',alt:'知识文档预留位，待补充'},
 {id:'skill-placeholder',type:'技能 / PLACEHOLDER',title:['公开 Skills','待补充'],sub:'可复用的工具包 · 预留位置',tags:['仅展示已公开内容'],p:'lilac',prop:'placeholder',url:'./SKILLS.md#公开-skills-预留位',alt:'公开 Skills 工具包预留位，待补充'},
 {id:'contact',type:'联系 / SAY HELLO',title:['下一个好想法','从你好开始'],sub:'产品研究 · 交互体验 · AI 探索',tags:['GitHub 交流','公众号阅读'],p:'blue',prop:'code',url:'https://xma28016-gif.github.io/home.html#contact',alt:'与马骁交流，点击前往网站打招呼'}
];
await fs.mkdir(new URL('assets/cards/',root),{recursive:true});
for (const c of cards) {
 const poseURI = poseURIs.get(c.id);
 if (!poseURI) throw new Error("Missing character pose for " + c.id);
 const [bg,line,muted,accent]=palettes[c.p];
 const titleSize = Math.max(...c.title.map(x=>x.length)) > 7 ? 65 : 74;
 const top=c.title.length===1 ? 206 : 173;
 const text=c.title.map((t,i)=>`<text x="58" y="${top+i*88}" fill="#17232e" font-size="${titleSize}" font-weight="850" letter-spacing="-3">${esc(t)}</text>`).join('');
 const lineY=c.title.length===1?224:278;
 const subY=c.title.length===1?278:328;
 const chipsY=c.title.length===1?348:387;
 let x=60;
 const tags=c.tags.map(t=>{const w=t.length*20+30;const tag=`<rect x="${x}" y="${chipsY-25}" width="${w}" height="38" rx="9" fill="${bg}"/><text x="${x+14}" y="${chipsY+1}" fill="${muted}" font-size="20" font-weight="550">${esc(t)}</text>`;x+=w+9;return tag;}).join('');
 const art=`<ellipse cx="985" cy="265" rx="235" ry="220" fill="url(#glow)"/>${prop(c.prop,accent)}<image href="${poseURI}" x="720" y="60" width="540" height="390" preserveAspectRatio="xMidYMin meet"/><text x="92" y="39" fill="${muted}" font-size="22" font-weight="650">${esc(c.type)}</text><path d="M60 ${lineY}q170 13 515-2" fill="none" stroke="#f4a15d" stroke-width="9" stroke-linecap="round"/>${text}<text x="60" y="${subY}" fill="#465668" font-size="28" font-weight="600">${esc(c.sub)}</text>${tags}`;
 await write('assets/cards/'+c.id+'.svg',frame(1280,460,c.p,art,c.alt));
}
const heroArt=`<ellipse cx="1000" cy="260" rx="260" ry="240" fill="url(#glow)"/>${prop('code','#829fdb')}<image href="${avatarURI}" x="820" y="62" width="400" height="600"/><text x="92" y="39" fill="#6d86af" font-size="21" font-weight="650">MX OS / PERSONAL PROFILE</text><text x="65" y="153" fill="#22334d" font-size="21" class="mono" letter-spacing="3">MA XIAO · IDEAS INTO PRACTICE</text><text x="60" y="248" fill="#17212f" font-size="84" font-weight="850" letter-spacing="-4">你好，我是马骁。</text><path d="M64 270q280 12 635-1" fill="none" stroke="#f4a15d" stroke-width="10" stroke-linecap="round"/><text x="65" y="330" fill="#52667e" font-size="30" font-weight="550">产品研究 · 交互实践 · 写作记录</text>`;
await write('assets/hello.svg',frame(1280,465,'blue',heroArt,'你好，我是马骁。点击卡片，和我打个招呼'));
const byID=Object.fromEntries(cards.map(c=>[c.id,c]));
function row(ids) {return '<p>\n'+ids.map(id=>{const c=byID[id];return `  <a href="${c.url}"><img width="49%" src="./assets/cards/${id}.svg?v=${id === 'article-qingyan' ? 'selected-photos-v3' : 'poses-v2'}" alt="${esc(c.alt)}" /></a>`;}).join('\n')+'\n</p>\n';}
const projectRows=profile.works.map(w=>`| [${w.title}](${w.repo}) | ${w.description} | [${w.category==='research'?'阅读报告':'在线体验'}](${w.url}) |`).join('\n');
const skillSections=profile.skills.map(g=>`### ${g.title}\n\n${g.description}\n\n`+g.items.map(s=>`- **${s.name}** · `+s.projects.map(id=>{const w=profile.works.find(x=>x.id===id);return `[${w.title}](${w.repo})`;}).join(' / ')).join('\n')).join('\n\n');
const articleTable=profile.notes.map(n=>`| [${n.title}](${n.url}) | ${n.category} | ${n.date||'未提供'} | ${n.source} |`).join('\n');
const readme=`# 你好，我是马骁 👋

<details>
<summary><picture><img width="1000" src="./assets/hello.svg?v=clean-greeting-v2" alt="马骁的个人空间：产品研究、交互实践与写作记录。点击和我打招呼。" /></picture></summary>

<h3 align="center">hi 👋，很高兴在这里遇见你。</h3>
<p align="center">我是马骁，欢迎交流产品研究、交互体验与 AI 探索。</p>

</details>

<p align="center">🌐 <a href="https://xma28016-gif.github.io/">个人网站</a> · 🧩 <a href="./PROJECTS.md">全部项目</a> · 🧰 <a href="./SKILLS.md">技能与标签</a> · ✍️ <a href="./ARTICLES.md">文章归档</a> · 👋 <a href="https://xma28016-gif.github.io/home.html#contact">联系我</a></p>

我把产品研究、交互原型和 Web 实践整理在这里。从即梦 AI 的实测拆解、轻颜相机的迭代方案，到酒店全景交互，记录从问题、方案到实现的过程。

**个人标签**　\`产品研究\` \`交互原型\` \`AI 探索\` \`写作与记录\`

---

## ⭐ 项目与作品

可访问的交互原型、实测报告与个人网站。点击卡片打开完整作品。

${row(['hotel','jimeng'])}
${row(['qingyan','website'])}
<details>
<summary><strong>展开项目说明与源码入口</strong></summary>

| 项目 | 内容 | 作品 |
| --- | --- | --- |
${projectRows}

[查看全部项目详情](./PROJECTS.md) · [浏览全部公开仓库](https://github.com/xma28016-gif?tab=repositories)

</details>

## 📚 知识文档

把研究过程、证据和产品方案留成可阅读的文档。

${row(['doc-research','doc-planning'])}
<details>
<summary><strong>更多知识文档与预留位置</strong></summary>

${row(['doc-placeholder'])}
当前已整理的完整报告见 [知识文档索引](./DOCUMENTS.md)。更多文档尚未提供，预留位置不代表已完成作品。

</details>

## 🧰 技能与实践

技能关联真实项目，方便从方法找到具体实践。

${row(['skill-research','skill-build'])}
**产品研究与策划**　${profile.skills[0].items.map(x=>'`'+x.name+'`').join(' ')}

**交互与体验**　${profile.skills[1].items.map(x=>'`'+x.name+'`').join(' ')}

**技术与工具**　${profile.skills[2].items.map(x=>'`'+x.name+'`').join(' ')}

<details>
<summary><strong>技能对应项目与公开 Skills 预留位</strong></summary>

${row(['skill-placeholder'])}
[查看全部 16 个技能标签与项目对应关系](./SKILLS.md)。公开 Skills 工具包尚未提供，暂留位置。

</details>

## ✍️ 文章与随笔

公众号 **代码不再冷冰冰**，以及我的产品研究与策划报告。

${row(['article-ai','article-qingyan'])}
${row(['article-jimeng','article-placeholder'])}
<details>
<summary><strong>全部文章、来源与待补充内容</strong></summary>

| 文章 | 分类 | 日期 | 来源 |
| --- | --- | --- | --- |
${articleTable}

更多公众号文章已预留位置；取得标题与原文链接后继续收录。[查看文章归档](./ARTICLES.md)

</details>

## 👋 交流一下

<p><a href="https://xma28016-gif.github.io/home.html#contact"><img width="1000" src="./assets/cards/contact.svg?v=poses-v2" alt="下一个好想法，从你好开始。点击前往个人网站打个招呼。" /></a></p>

- **个人网站** · [xma28016-gif.github.io](https://xma28016-gif.github.io/)
- **公众号** · [代码不再冷冰冰](https://mp.weixin.qq.com/s/jkrkeoMxSKqe4Bz1p6mLAQ)
- **项目交流** · [GitHub 公开项目](https://github.com/xma28016-gif?tab=repositories)

---

<sub>这里展示公开项目与已确认文章。标为“待补充”的卡片是预留位置；不会将它们计为完成成果。更新于 ${profile.reviewedAt}。</sub>
`;
await write('README.md',readme);
await write('PROJECTS.md','# 项目与作品\n\n[← 返回个人主页](./README.md)\n\n'+profile.works.map(w=>`## ${w.title}\n\n${w.description}\n\n${w.tags.map(x=>'`'+x+'`').join(' ')}\n\n`+w.sections.map(s=>'### '+s.title+'\n\n'+s.text).join('\n\n')+`\n\n[完整作品](${w.url}) · [源码仓库](${w.repo})\n`).join('\n---\n\n')+'\n## 全部公开仓库\n\n| 仓库 | 用途 |\n| --- | --- |\n'+profile.works.map(w=>`| [${w.id}](${w.repo}) | ${w.title} |`).join('\n')+'\n| [xma28016-gif](https://github.com/xma28016-gif/xma28016-gif) | GitHub 主页 README、展示卡片与内容索引 |\n');
await write('SKILLS.md','# 技能与实践\n\n[← 返回个人主页](./README.md)\n\n'+skillSections+'\n\n## 公开 Skills 预留位\n\n待补充。当前尚未收录可公开发布的独立 Skills 工具包；以上为已关联项目的实践技能。\n');
await write('ARTICLES.md','# 文章归档\n\n[← 返回个人主页](./README.md)\n\n## 已收录\n\n| 文章 | 分类 | 日期 | 来源 |\n| --- | --- | --- | --- |\n'+articleTable+'\n\n## 待补充\n\n| 内容 | 状态 |\n| --- | --- |\n| 公众号历史文章 | 待提供标题与 mp.weixin.qq.com 原文链接 |\n| 其他随笔与长文 | 待提供标题、来源与链接 |\n\n没有取得的信息不补写日期或摘要。\n');
await write('DOCUMENTS.md','# 知识文档\n\n[← 返回个人主页](./README.md)\n\n## 已收录\n\n- [即梦 AI 实测拆解报告]('+profile.works[1].url+') · 任务路径、截图证据与二次核验。\n- [轻颜相机 2.0 立项方案]('+profile.works[2].url+') · 需求取舍、版本范围与实验验收。\n\n## 待补充\n\n更多研究文档、产品规格与模板尚未提供。此处为预留位置。\n');
await write('MAINTENANCE.md','# 维护主页\n\n内容在 `profile.json`，卡片布局与 Markdown 生成逻辑在 `scripts/build-profile.mjs`。\n\n```sh\nnpm ci\nnpm run build\n```\n\n头像素材 `assets/maxiao.png` 为站点主人选择的身份与画风参考，顶部欢迎卡沿用原图。卡片使用 SVG 文本与矢量图形排版，按主题内嵌 `assets/poses/` 中不同姿态的人物 PNG。生成提示词与卡片映射保存在 `assets/poses/manifest.json`。没有已确认内容的卡片明确标为待补充。\n\nGitHub 顶部卡片用原生 details/summary 展开 hi，网站保留原有点击动画。\n');
console.log(`Generated ${cards.length} cards, hero, README and content indexes. Embedded character: ${avatar.length} bytes.`);
