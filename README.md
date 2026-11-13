# 鸣潮·梦州（Mengzhou）— DeepSeek Harness 界面皮肤

参考《鸣潮》梦州版本的 UI 截图与实机录屏（`D:\下载\梦州ui\2026-11-12 17-01-30.mp4`，1920×1080 / 60fps / 57.48s，外加 7 张界面截图），
把「墨玉底 + 青玉描边 + 鎏金刻线 + 衬线题签 + 云纹角饰 + 竖排印章」这一套视觉语言移植到 DeepSeek Harness 的 Web GUI 上，
做成一个**可安装、可卸载、可热替换**的客户端主题插件：`dsh-mengzhou-ui`。

最终形态：桌面端（`profiles/desktop`）里已建好安装位与 patch 条目，已挂上并在跑。验证用的探针 profile（`mzskin` 最小实例、`mzprobe` 桌面克隆）在收尾时已删除，需要复验时按第 5 节重建即可。

---

## 1. 视觉还原要点

从参考素材里提炼出的语法（不是"黑底加绿字"，而是有层次的界面骨架）：

| 元素 | 参考素材 | 本皮肤的处理 |
| --- | --- | --- |
| 品牌 | 御者 m02566 给的龙首徽记 | 侧栏鲸鱼换成龙首：白线取 alpha 当遮罩（`-webkit-mask`）上玉色渐变，30×32；`deepseek` 字样去掉，只留徽记 + 青玉铭牌 `XUANFANG` |
| 底图 | 御者提供的 `主UI.png`（1672×941：龙首徽记 + 青绿墨带 + 大「玄」描线 + 竖向题字 + 红篆 + 楼阁线描） | **整屏一张**：只在 `body` 上画一次（`background-attachment: fixed` + `cover`），侧栏 / 输入座 / 各面板全部 `transparent`，因此画面上不会出现第二条墨带、也没有侧栏自带的底板 |
| 底色 | 近黑墨色，带极轻的青绿偏色 | `#070a0a` 底 + 纵向暗纱（顶 .14 / 中 .40 / 底 .18），保证正文压在墨带上仍然可读 |
| 分隔与描边 | 细如发丝的荧光青玉线 | 边框 token 全部改青玉 `rgba(127,232,210,α)`，从 .10 递进到 .34 |
| 高光与强调 | 鎏金细刻线、金色铭牌 | 顶部 2px 鎏金呼吸线（6.5s）、顶部菱形徽记；四周另加直角回纹括角、金点阵、右下仪表竖环、底部回纹带、右缘竖题「歲主玄方」——轻科幻 + 国风 + 黑白三味合在一条灰度里 |
| 字体 | 中文衬线、拉丁无衬线 | 用 `@font-face` 的 `unicode-range` 拼一支 `MZ Text`：汉字走 `Noto Serif SC`，拉丁字母与数字走**微软雅黑**；侧栏题签、分组标题同样雅黑，且分组标题加粗提亮、会话名压到 0.58 透明度做深浅对比 |
| 按钮 | 参考图「已领取」的玉璜胶囊 | `_primary`/`_add`/`_newSession`：金线外框 + 双向织纹 + 横贯中线（两端淡出）+ 两端菱形节点与内缩竖刻，文字色 `#04201b` |
| 圆角 | 菱形切角、硬朗直角 | 面板圆角收窄（2xs 1px … md 4px … 3xl 14px）；**对话气泡、文件卡、按钮一律 999px 胶囊**；附件卡改成**实底**（`#090f10` / `#fbf7ee`），边框内不再透出底图花纹，卡内按钮与文件名也不再套第二层框 |
| 浅色 | 梦州活动页的宣纸底 | 浅色不是换色，而是同一张底图**反相取墨**：亮度当墨量、铺在宣纸 `#f5f1e6` 上，暗金 `#5c5038` 描线 |

### 色板

墨玉（暗）：

```
ink   #070a0a   ink1 #0c1112   ink2 #111819   ink3 #172022
jade  #7fe8d2   jadeStrong #5fe0c6   gold #e0c070   goldDeep #a8792c
text  #e6f2ec   text2 #9fb5ae   text3 #7c918a
success #4fd28a   warn #e0c070   error #e2615a   done #a79cf5
```

宣纸（亮）：

```
paper #f5f1e6   paper1 #fbf7ee   paper2 #f2ece0
ink   #0f6b5c   gold #a8792c
```

### 令牌映射（节选）

| DSH token | 暗 | 亮 |
| --- | --- | --- |
| `--dsw-alias-bg-base` | `#070a0a` | `#f5f1e6` |
| `--dsw-alias-bg-layer-1/2/3` | `#0c1112` / `#111819` / `#172022` | `#f8f4ea` / `#fbf7ee` / `#f2ece0` |
| `--dsw-alias-label-primary/secondary/tertiary` | `#e6f2ec` / `#9fb5ae` / `#7c918a` | `#12332c` / `#3c5a52` / `#6d837b` |
| `--dsw-alias-border-l1…l4` | 青玉 .10 → 金 .34 | 墨绿 .14 → 暗金 .30 |
| `--dsw-alias-button-primary-fill` | `#1aa88f` | `#0f6b5c` |
| `--dsw-alias-link` | `#7fe3cd` | `#0f6b5c` |
| `--dsw-alias-markdown-code-block` | `#0a1011` | `#efe9da` |
| `--dsw-alias-menu-group-header-fill` | `#101a19f0` | `#efe8daf0` |

`--dsw-static-neutral-bluish-{50…1000}` 这一整族灰阶也被重映射到玉石色系（框架里有大量组件直接把这一族写死，
不改它，侧栏 `#1b1b1c`、卡片 `#2c2c2e` 会顽固地留在灰调里）。

---

## 2. 技术实现

三件事，都由一个客户端 bundle 完成，不碰宿主逻辑：

1. **token 覆盖** —— 走官方主题服务：`ctx.theme.overrideTokens('dsh-mengzhou-ui', TOKENS)`，108 个 `--dsw-alias-*` 全部给 `{light, dark}` 值对；
   几何另开一层 `overrideTokens('dsh-mengzhou-ui:geometry', RADII)`。卸载时以空对象撤销，主题回到原样。
2. **静态灰阶重映射** —— 在 `<style>` 里对 `body[data-mz-skin]` 重定义 `--dsw-static-neutral-bluish-*`；
   框架的 presenter 只会把 alias 写进 `body.style`，静态族必须靠 CSS 层压。
3. **装饰层** —— `body` 尾部注入 `.mz-veil`（`position:fixed; inset:0; z-index:2147482000; pointer-events:none; contain:layout style paint`），
   只留顶部鎏金呼吸线、左右直竖轨、顶部菱形徽记与 4px 青点网纹；纯 CSS + 内联 SVG，无图片资源、无网络请求。
   （四角云卷曲线已按御者反馈删除。）

### 底图为什么只画在 body 上

早期版本给每个大容器都贴同一张 `background-attachment: fixed` 图，靠「fixed 的定位区是视口」让各块拼成一张连续画。
这在普通元素上成立，但**带 `transform` / `filter` / `backdrop-filter` 的祖先会重新成为 fixed 背景的定位容器**，
于是侧栏、输入座各自缩放出自己那一份 —— 表现为「输入框背后又有一条一模一样的绿带」。
现在改为单一图层：`body` 画图 + 纵向暗纱，`_frame`/`_root`/`_sidebarCol`/`quietBars`/`composerSeat` 等全部 `background: none`，
侧栏连 `box-shadow` 接缝也去掉，整屏只有一张画。

针对框架里 CSS Modules 的 `<hash>_<name>` 类名（如 `mP3x-q_sidebarCol`、`wtg9ga_panelRow`、`GRgSLq_card`），
选择器一律用**名字后缀匹配**：`[class$="_sidebarCol"]`、`[class$="_panelRow"] span`、`[class$="_sessionRow"][class*="selected"]`。
哈希前缀随版本变，后缀名稳定。

---

## 3. 目录

精简后只剩必需件（共 14 个文件、约 2.4 MB）：

```
E:\deepseek workspace\mengzhou-ui\
├─ plugin\dsh-mengzhou-ui\        ← 插件本体（可整体拷走 / link 安装）
│  ├─ package.json                 dsh.client { platform: web, immediately: true, inject: [ui-theme] }
│  ├─ cordis.patch.yml             自身 bundle 的 insert 声明
│  └─ lib\
│     ├─ index.js                 宿主半侧：日志探针（mengzhou-ui.log），无业务逻辑
│     ├─ client.tpl.js            皮肤源文件（含 __SCENE_DARK__ / __SCENE_LIGHT__ 占位符）
│     └─ client.js               构建产物：把两张底图 base64 内联后的最终 bundle
├─ refs\
│  ├─ src-mainui.png              御者提供的底图原稿（1672×941）
│  ├─ plate-dark.webp             暗色版底图（降亮 + 纵向暗纱）
│  └─ plate-light.webp            亮色版底图（亮度反相 → 墨线铺宣纸）
├─ harness\
│  ├─ final-dark.png / final-light.png   真实 GUI 验证截图 1440×900
├─ _probe\                        构建与验证工具（不属于交付件，可删）
│  ├─ compose3.py                 src-mainui.png → plate-*.webp
│  ├─ build.py                    plate-*.webp + client.tpl.js → client.js
│  └─ shot2.mjs                   CDP 截图（Edge headless，可模拟深浅色 / 点击 / 滚动）
└─ README.md
```

---

## 4. 安装 / 启用 / 停用

已在本机桌面端配置好（`C:\Users\guest01\.dsh\profiles\desktop`）：

```
profiles\desktop\node_modules\dsh-mengzhou-ui  →(junction)→  E:\deepseek workspace\mengzhou-ui\plugin\dsh-mengzhou-ui
profiles\desktop\cordis.patch.yml 末尾：
    - insert:
        - id: mengzhou-ui
          name: dsh-mengzhou-ui
```

**重启桌面端生效**（patch 层的新 insert 条目不热应用，宿主启动时才组装）。

换机器 / 新 profile：

```powershell
# 1) 建安装位
New-Item -ItemType Junction `
  -Path  "$env:USERPROFILE\.dsh\profiles\<profile>\node_modules\dsh-mengzhou-ui" `
  -Target "E:\deepseek workspace\mengzhou-ui\plugin\dsh-mengzhou-ui"

# 2) 在 <profile>\cordis.patch.yml 追加
#    - insert:
#        - id: mengzhou-ui
#          name: dsh-mengzhou-ui

# 3) 重启该 profile 的宿主
```

或者用 CLI 装（等价）：

```powershell
$env:ELECTRON_RUN_AS_NODE='1'
& 'E:\Deepseek\DeepSeek Harness.exe' 'E:\Deepseek\resources\app.asar\dsh\node_modules\@deepseek-ai\dsh\lib\bin.js' `
  plugin --profile desktop add link:'E:\deepseek workspace\mengzhou-ui\plugin\dsh-mengzhou-ui'
```

停用：把 patch 里那三行注释掉（`#`），重启；或整条删掉并把 junction 移除。卸载不留残渣——插件不写数据库、不改宿主文件。

---

## 5. 验证

已跑过的三层验证（都是可复跑的命令，不是"看起来没问题"）：

1. **合成树**：`--dump-config` 的输出里出现 `- id: mengzhou-ui / name: dsh-mengzhou-ui`（当时用 `mzprobe` 克隆桌面 profile 验证，desktop 自身被 Electron 独占不允许 CLI boot）。
2. **真实实例**：`mzskin` 最小 profile（base + web-app + 本插件）起 `dsh --port 4399 --no-open`（已删，可照第 4 节重建），宿主打印的 token URL 里模块图明确包含 `dsh-mengzhou-ui/client.js`；浏览器侧探针读到
   `body[data-mz-skin]="mengzhou"`、`<style data-mz-skin>` 已注入、`.mz-veil` 节点就位、`bgColor rgb(5,7,8)`、markdown 字体解析到 `Noto Serif SC`；
   `elementsFromPoint(120,420)` 逐层确认侧栏链路上每一层 `background-color` 都是 `rgba(0,0,0,0)`、`box-shadow: none`，只有 `body` 带底图。
3. **像素证据**（1440×900，扫描绿带行宽确认「整屏只有一条墨带」）：

| 图 | 说明 | 绿带行 | 主色 |
| --- | --- | --- | --- |
| `harness/final-dark.png` | 真实实例 · 暗色 · 侧栏透明 · 边框统一 | 仅 y≈390–450 一段 | `#050707 #0b1213 #172422` |
| `harness/final-light.png` | 真实实例 · 浅色 · 同构图反相取墨 | 仅 y≈390→450 一段 | `#f5f1e6 #efe9da` |

复跑工具（`_probe` 里只保留这三件）：

```powershell
py -X utf8 _probe\compose3.py      # 底图：refs\src-mainui.png → refs\plate-dark.webp + plate-light.webp
py -X utf8 _probe\build.py         # 皮肤：plate-*.webp + client.tpl.js → plugin\...\lib\client.js
node --check plugin\dsh-mengzhou-ui\lib\client.js
node _probe\shot2.mjs '<token-url>' harness\final-dark.png 14000 dark '<会话名>' 4000 bottom
```

`shot2.mjs` 参数：`<url> <out.png> [waitMs] [light|dark] [clickText] [extraWaitMs] [top|bottom|<px>]`。

---

## 6. 边框规约（2026-11-12 收敛）

满屏小圈是这套皮肤最容易翻车的地方，现统一成三条：

1. **一层描边**：卡片 / 气泡 / 附件卡一律 `box-shadow: inset 0 0 0 1px` 发丝，`border: 0`，不再叠框架自带边与二层辉光。
2. **图标按钮不描边**：卡片内、消息操作条里的按钮（`[class*="card"] button`、`[class*="_actions"] button`）透明底、无圈，仅悬停时 `rgba(127,232,210,0.10)`；`_primary` / `_add` / `_newSession` 除外，玉璜胶囊由专门规则负责。
3. **表格只留横线**：`table th/td` 去竖网格，行间 `rgba(127,232,210,0.10)`，表头一金线；行内 `code` 无边框、`rgba(127,232,210,0.07)` 淡底。

配套的**底面半透**策略：`--dsw-alias-bg-base` / `bg-layer-1..3` 不再是实色，而是 0.38→0.56 的 rgba（暗色）与 0.58→0.76（亮色）。
这样任何用这些 token 铺底的面板——框架主列、第三方插件的 `bg-layer-*`——都会自然透出底图，墨带在整屏是同一条，不必再逐个 `background: none`。

---

## 7. 约束与已知限制

- 客户端 bundle 只在**已构建**路径 `lib/client.js` 被托管，没有构建步骤——它本身就是最终产物（原生 `window.__ModuleLoader__.load` 包裹的 ESM 工厂）。
- 宿主不热应用 `cordis.patch.yml` 里**新增的 insert 条目**，改完必须重启；`client.js` 的 rev 由 `mtime/ctime/size` 算出且带 `immutable` 缓存，重载页面（Ctrl+R）才会换到新 rev。
  不想重启时，用插件管理器把 `mengzhou-ui` 关掉再开一次即可强制 `reconcilePackage` 并替换 rev（已在桌面端实测生效）。
- 包资源路由只允许 `.svg/.png/.webp/.jpg/.jpeg`，做不了字体托管，所以衬线字走系统字体族（本机有 `Noto Serif SC` / `Source Han Serif SC`）。
- `--dsw-static-neutral-bluish-*` 是框架内部命名，升级后若改名，需要在 `client.js` 的 `body[data-mz-skin]` 块里同步。
- 装饰层用 `contain: layout style paint` + 超大 z-index，不拦截事件；截图之外的实际点击、滚动、拖拽都不受影响。
- `_probe\*` 与 `harness\*` 不属于交付件，删掉不影响插件运行；`refs\src-mainui.png` 是底图原稿，改底图时需保留。

---

## 8. 浮层毛玻璃：窗口不再透印（2026-11-13）

御者反馈：**一打开窗口/弹层就透得过分**，底图上的墨带纹样直接透进正文，字像浮在花纹上。
根因在自家 token：`--dsw-alias-bg-layer-2/3`、`bg-overlay` 早先被压到 0.50 / 0.56 / 0.72（暗色），
而框架的模态正文、菜单、命令面板全都铺这几层——底面半透是为了让整屏底图透出来，
浮层接着半透就变成了「隔着两层纱读字」。

**改法（三处，全在 `lib/client.tpl.js`）**

1. **浮层用 token 收厚**（第 6 节那组 0.38→0.56 的底面策略只保留给主列，浮层层级另给）：

   | token | 暗色 旧→新 | 亮色 旧→新 |
   | --- | --- | --- |
   | `--dsw-alias-bg-layer-1` | 0.44 → **0.52** | 0.64 → **0.72** |
   | `--dsw-alias-bg-layer-2` | 0.50 → **0.66** | 0.70 → **0.82** |
   | `--dsw-alias-bg-layer-3` | 0.56 → **0.78** | 0.76 → **0.90** |
   | `--dsw-alias-bg-overlay` | 0.72 → **0.90** | 0.80 → **0.90** |
   | `--dsw-alias-bg-mask-1` | 0.62 → **0.70** | 0.30 → **0.40** |
   | `--dsw-alias-bg-mask-2` | 0.42 → **0.52** | 0.12 → **0.20** |
   | `--dsw-alias-bg-mask-3` | 0.55 → **0.64** | 0.55 → **0.62** |

   第 6 节写的 0.38→0.56 是主列（底图透印的来源），浮层层级自此独立，不再跟着一起透。

2. **接住框架自带的三个模糊变量**。前端 CSS 里浮层的模糊不是写死的，是走变量：
   `._mask_*` 用 `backdrop-filter: var(--dsw-mask-blur)`，
   菜单材质层 `._material_*` 用 `background: var(--dsw-menu-surface-fill)` + `backdrop-filter: var(--dsw-menu-backdrop-filter)`。
   这两三个变量在默认主题里等于没给值，皮肤里直接重下：

   ```css
   body[data-mz-skin]{
     --dsw-mask-blur: blur(16px) saturate(130%);
     --dsw-menu-backdrop-filter: blur(26px) saturate(140%);
     --dsw-menu-surface-fill: rgba(9,14,15,0.90);
   }
   ```

   亮色另给 `blur(14px)` + `rgba(250,246,236,0.94)`。

3. **给 `[role="dialog"|"menu"]` 与哈希类名兜一层**：`pick()` 生成 `body[data-mz-skin] ` 前缀选择器组，
   `GLASS` 命中 `[class*="dialog"] / "Dialog" / "modal" / "popover" / "popup" / "dropdown" /
   "contextMenu" / "commandPalette" / "_sheet" / "menuSurface" / "floatingCard" / "overlayCard"`，
   窗口本体给 `blur(30px) saturate(140%)` + 0.90（暗）/ 0.94（亮）实底 + 双层投影 + 玉色内描边；
   `SCRIM` 命中 `scrim / backdrop / _mask_`，遮罩 `blur(12px)` + 0.62 实压。
   `@supports not ((backdrop-filter: blur(1px)))` 的旧内核回退成 0.98 实底，宁可厚也不透印。

**框架类名参考（从 `app.asar` 抽 `assets/index-*.js` 得到，升级后要复核）**

| 组件 | 类名 | 用到的变量 |
| --- | --- | --- |
| Modal | `_root_14mp3_6` / `_mask_14mp3_18` / `_dialog_14mp3_33` / `_content_14mp3_63` | mask 用 `--dsw-mask-blur` + `--dsw-alias-bg-mask-1`；dialog 用 `--dsw-alias-bg-layer-2` |
| MenuSurface | `_surface_1w4el_1` / `_material_1w4el_21` | `--dsw-menu-surface-fill` + `--dsw-menu-backdrop-filter` |
| 菜单列表 | `_list_1p5el_7` / `_submenu_1p5el_8` / `_portal_1p5el_46` | 阴影 `--dsw-elevation-prominent` |
| 看图 | `_backdrop_19zw2_2` / `_mask_19zw2_19` | 同上（mask-blur） |
| Toast | `_toast_hr9yd_6` | `--dsw-alias-bg-overlay` 系 |

**验证方式**：`node _probe\cssdump.js` 用假 DOM 跑一遍 `client.tpl.js`，把 `ensureStyle()` 真正注入的
CSS 落到 `_probe\mz.css`（v3 后 28.4 KB，括号配平），再 `node _probe\cssrules.js "<关键字>"` 按规则块查看。
视觉引擎在本会话不可用（`modlens` provider 报 `unknown model id`），所以一律走计算样式与规则文本核对，不靠看图。

**生效**：`client.js` 的 rev 由 mtime/ctime/size 算出且带 `immutable` 缓存——改完只剩重载那一步：
重载页面（Ctrl+R）即换 rev；不重载就关掉再开一次 `mengzhou-ui` 插件强制 `reconcilePackage`。

**想再调**：模糊只改上面三个变量的 `blur()` 半径（16/26/30px 是当前值）；
窗口的「实度」只改第 1 张表；遮罩压暗只改 `--dsw-alias-bg-mask-1`。


---

## 9. 撤掉右下角仪表环（2026-11-13）

御者：「背景的右下角是不是有个环一样的东西，不好看」。那不是底图里画进去的，是装饰层多画的一个 DOM 节点
`.mz-ring`：`position:absolute; right:-160px; bottom:-190px; width:520px; height:520px; border-radius:50%`，
圆环挂在视口外，只露出左上四分之一弧；外加一个 `inset:52px` 的金色虚线内环和顶端一竖刻线（`::after`）。
在侧栏透明、底图铺满的画面上，这四分之一的圆规痕正好压在消息区右下的空白里，非常显眼。

**改动（`lib/client.tpl.js`）**

1. 删掉 `.mz-ring` / `.mz-ring::before` / `.mz-ring::after` 三条规则与 `@media (max-width:900px){ .mz-ring{display:none} }`；
2. 删掉亮色的两处 `.mz-ring` 覆盖（`border-color` / `box-shadow`）；
3. `buildVeil()` 里删掉 `'<div class="mz-ring"></div>' +`，装饰层剩 `.mz-grain / .mz-topline / .mz-rail ×2 / .mz-corner ×4 / .mz-dots ×2 / .mz-vtext / .mz-meander / .mz-crest`；
4. 头部变更记录补一行。

**验证**：`node _probe\cssdump.js` 抽出的 `_probe\mz.css` 从 28.4 KB 降到 **27.6 KB**，括号 130:130 配平，
`mz-ring` 在 CSS 里 **0 命中**；构建产物 `lib/client.js` 180,626 字节，全文只剩注释里那一处 `mz-ring` 字样。

**留的余地**：`.mz-corner--br`（右下 12px 的小角标）、`.mz-meander`（贴底回纹带）都还在——它们只有 1px～10px 级别，
不构成「环」。若御者连这枚小角标也不想要，删 `buildVeil()` 里对应那一行即可。
**若刷新后右下仍有弧形**，那就是 `refs\plate-*.webp` 底图里画着的（组装图一时抠进来的），要在 `_probe\compose3.py` 的裁剪里抹掉，
不在 CSS 层。


---

## 10. 发布：GitHub 仓库与 DSH 插件市场索引（2026-11-14）

**仓库**：<https://github.com/Ethanliu0217/dsh-mengzhou-ui>（public，MIT，分支 `main`）
**直接安装（已知来源）**：`github:Ethanliu0217/dsh-mengzhou-ui`

### 市场为什么要自建索引

DSH 的「发现」标签页（实验性插件索引 bundle）**没有官方索引**——官方 README 原文：
「目前没有官方插件索引；发现标签页只列出用户添加的索引源」。所以「上架市场」不是提交审核，
而是**自己托管一份 format 1 的 JSON 索引**，让用户把它的 URL 加进「发现」页。

- 索引 URL（本仓库 raw）：`https://raw.githubusercontent.com/Ethanliu0217/dsh-mengzhou-ui/main/index.json`
- 索引文件：`index.json`（仓库根，由 `_probe/make_index.mjs <40位commit> <version> <输出>` 生成）

### 索引格式（format 1，`@deepseek-ai/dsh-plugin-market-index` 校验器口径）

顶层：`format: 1`、`title`（本地化文案，必须含 `en`）、可选 `description`、
可选 `metadata`（`categories` / `labels` / `sortKeys` 的声明表）、`plugins` 数组。

每个 plugin：`name`（合法 npm 包名且唯一）、可选 `title` / `description`（同本地化规格）、
可选 `icon`（`data:` base64 ≤32 KiB，或相对索引 URL 的 https 引用）、可选 `author` / `homepage` /
`repository{url[,directory]}`、`metadata{category?,keywords[],labels[],sortKeys}`、`versions[]`。

每个 version：`version`（精确 SemVer）、`publishTimestamp`（Unix 秒整数）、`engines.dsh`（可选 SemVer range）、
`source`：npm 用 `{type:"npm"[,registry]}`，Git 用 `{type:"git",url:"https://github.com/<owner>/<repo>",commit:"<40位小写 sha>"[,path:"<包目录>"]}`。

**Git 源的关键约束**：`url` 必须是**规范形式**的 https 仓库地址（至少两段路径、不能带 query/fragment），
`commit` 必须是**完整 40 位小写 SHA**——市场按 commit 钉死，拼出来的安装串形如 `git+https://github.com/...git#<commit>`。

### 发新版本的流程

1. 改 `package.json` 的 `version`，提交并 `git push`；
2. 取 `git rev-parse HEAD` 的 40 位 SHA；
3. `node _probe\make_index.mjs <sha> <version> index.json`；
4. 提交并推送 `index.json`；
5. 仓外用户：插件 → 实验性插件 → 启用「自定义插件索引」→「发现」→ 添加索引源 URL → 安装 `dsh-mengzhou-ui`。

> `index.json` 只列当前版本；要留历史版本就往 `versions[]` 里追加，校验器会按 SemVer 降序排。
