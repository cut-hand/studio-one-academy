# Studio One · 声音研习室

从第一条音轨到完整作品的中文音乐制作学习网站。玻璃材质导航、清晰分级、案例驱动，可部署到 GitHub Pages。

## 内容

- 5 个学习阶段，30 节课程，90 个知识点案例。
- 每个知识点包含解释、动手步骤、案例、预期结果和常见误区。
- 每课附练习任务、验收清单、素材下载及上下课导航。
- 全文搜索、深浅色主题、手机目录、打印 / PDF、浏览器本地进度与 JSON 备份。
- 4 套原创练习素材：节奏、合成信号编辑、混音分轨、MIDI。可试听并下载 ZIP。

## 本地运行

需要 Node.js 22 或以上，无第三方依赖。

```sh
npm run build
npm run dev
```

打开终端输出的 `http://127.0.0.1:4173`。不要直接双击 HTML：HTTP 环境才能正常读取素材清单。

## GitHub Pages

1. 将此项目上传到公开仓库的 `main` 分支。
2. 打开仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
3. 在 Actions 页面运行 **Build and deploy learning site**（或者推送一次提交）。
4. 等待 deploy 任务成功，网站地址为：
   https://cut-hand.github.io/studio-one-academy/

`.github/workflows/pages.yml` 会在每次推送后运行构建、生成原创素材、检查课程数据，再发布 `dist/`。所有资源使用相对路径，支持仓库子路径和 hash 路由深链接。不要使用根路径 `/assets`。

## 维护课程

编辑 `content/curriculum.json`，运行 `npm run build`。`dist/curriculum.js` 是自动生成的浏览器数据包。页面主体在 `dist/index.html`、`dist/styles.css` 和 `dist/app.js`。

修改 `scripts/generate-assets.mjs` 可重建原创 WAV、MIDI 与 ZIP；生成文件不提交到 Git，GitHub Actions 会复现它们并包含在网页部署产物内。

```text
content/curriculum.json         课程数据
dist/                          网页源文件及生成产物
scripts/build.mjs              构建入口
scripts/generate-assets.mjs     原创素材生成器
scripts/check.mjs               课程、下载包和音频格式验证
scripts/serve.mjs               本地预览
.github/workflows/pages.yml    GitHub Pages 部署
```

## 素材说明

所有练习均采用 100 BPM / 4⁄4 / 8 小节 / 19.2 秒。WAV 为 44.1 kHz、16-bit、单声道，分轨统一起点。MIDI 为标准 MIDI 格式，需自行加载音源，鼓使用 GM 映射。

`vocal.zip` 包含的是合成人声式振荡器信号，不是真人演唱，仅用于基础编辑、噪声和音量练习。真实齿音、换气、话筒摆位、音准修整和多次录音拼接，应使用自己录制或获授权的真人素材。课程需自行录音的案例会明确说明。

下载链接在网站完成构建部署后可直接访问：

- [完整素材](https://cut-hand.github.io/studio-one-academy/assets/all-materials.zip)
- [节奏素材](https://cut-hand.github.io/studio-one-academy/assets/rhythm.zip)
- [编辑练习信号](https://cut-hand.github.io/studio-one-academy/assets/vocal.zip)
- [混音分轨](https://cut-hand.github.io/studio-one-academy/assets/mix.zip)
- [MIDI](https://cut-hand.github.io/studio-one-academy/assets/midi.zip)

## 参考与版本

- [软件在线参考手册](https://s1manual.presonus.com/)（当前重定向至 Fender Studio Pro）
- [官方参考手册安装说明](https://support.presonus.com/hc/en-us/articles/42529985007501-Where-To-Find-the-Fender-Studio-Pro-Manual)
- [Apple HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)

课程侧重 Studio One 通用 Song 工作流。软件版本、系统、授权及设备会影响菜单和功能。高级修音、ARA、Project 页面等不能假定所有版本均具备。以本机参考手册为准。本站是独立教学项目，与 Apple、PreSonus、Fender 无隶属或背书关系。

## 许可与隐私

代码 MIT；原创课程文字 CC BY 4.0；原创生成素材 CC0。课程转载请注明“Studio One · 声音研习室”。无账户、分析追踪或后台服务；学习进度仅保存到当前浏览器，可导出备份，不会跨设备自动同步。
