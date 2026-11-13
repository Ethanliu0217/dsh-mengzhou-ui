# 鸣潮·梦州（Mengzhou）— DeepSeek Harness 界面皮肤

## 预览截图

<div align="center">
  <img src="./screenshots/1.png" alt="Mengzhou UI screenshot 1" width="48%" />
  <img src="./screenshots/2.png" alt="Mengzhou UI screenshot 2" width="48%" />
  <img src="./screenshots/3.png" alt="Mengzhou UI screenshot 3" width="48%" />
  <img src="./screenshots/4.png" alt="Mengzhou UI screenshot 4" width="48%" />
</div>

> 说明：将 4 张参考截图放到仓库根目录下的 `screenshots/` 目录内，并命名为 `1.png`、`2.png`、`3.png`、`4.png` 即可。

参考《鸣潮》梦州版本的 UI 截图与实机录屏（`D:\下载\梦州ui\2026-11-12 17-01-30.mp4`，1920×1080 / 60fps / 57.48s，外加 7 张界面截图），
把「墨玉底 + 青玉描边 + 鎏金刻线 + 衬线题签 + 云纹角饰 + 竖排印章」这一套视觉语言移植到 DeepSeek Harness 的 Web GUI 上，
做成一个**可安装、可卸载、可热替换**的客户端主题插件：`dsh-mengzhou-ui`。

最终形态：桌面端（`profiles/desktop`）里已建好安装位与 patch 条目，已挂上并在跑。验证用的探针 profile（`mzskin` 最小实例、`mzprobe` 桌面克隆）在收尾时……

---

## 1. 视觉还原要点

从参考素材里提炼出的语法（不是"黑底加绿字"，而是有层次的界面骨架）：

| 元素 | 参考素材 | 本皮肤的处理 |
| --- | --- | --- |
| 品牌 | 御者 m02566 给的龙首徽记 | 侧栏鲸鱼换成龙首：白线取 alpha 当遮罩（`-webkit-mask`）上玉色渐变，30×32；`deepseek` 字样去掉，只留徽记 + 青玉铭牌 `[...]
| 底图 | 御者提供的 `主UI.png`（1672×941：龙首徽记 + 青绿墨带 + 大「玄」描线 + 竖向题字 + 红篆 + 楼阁线描） | **整屏一张**：只在 `body` 上画一次（`backg[...]
| 底色 | 近黑墨色，带极轻的青绿偏色 | `#070a0a` 底 + 纵向暗纱（顶 .14 / 中 .40 / 底 .18），保证正文压在墨带上仍然可读 |
| 分隔与描边 | 细如发丝的荧光青玉线 | 边框 token 全部改青玉 `rgba(127,232,210,α)`，从 .10 递进到 .34 |
| 高光与强调 | 鎏金细刻线、金色铭牌 | 顶部 2px 鎏金呼吸线（6.5s）、顶部菱形徽记；四周另加直角回纹括角、金点阵、右下仪表竖环、底部回纹带、右[...]
| 字体 | 中文衬线、拉丁无衬线 | 用 `@font-face` 的 `unicode-range` 拼一支 `MZ Text`：汉字走 `Noto Serif SC`，拉丁字母与数字走**微软雅黑**；侧栏题签、分组标��[...]
| 按钮 | 参考图「已领取」的玉璜胶囊 | `_primary`/`_add`/`_newSession`：金线外框 + 双向织纹 + 横贯中线（两端淡出）+ 两端菱形节点与内缩竖刻，文字色 `#042[...]
| 圆角 | 菱形切角、硬朗直角 | 面板圆角收窄（2xs 1px … md 4px … 3xl 14px）；**对话气泡、文件卡、按钮一律 999px 胶囊**；附件卡改成**实底**（`#090f10` / `#[...]
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
