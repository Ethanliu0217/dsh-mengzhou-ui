# 鸣潮·梦州玄方DeepSeek Harness UI

## 预览截图

<div align="center">
  <img src="./%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-11-14%20005125.png" alt="Mengzhou UI screenshot 1" width="48%" />
  <img src="./%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-11-14%20005142.png" alt="Mengzhou UI screenshot 2" width="48%" />
  <img src="./%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-11-14%20005157.png" alt="Mengzhou UI screenshot 3" width="48%" />
  <img src="./%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-11-14%20005209.png" alt="Mengzhou UI screenshot 4" width="48%" />
</div>

参考《鸣潮》梦州版本的 UI 视觉语言，把「墨玉底 + 青玉描边 + 鎏金刻线 + 衬线题签 + 云纹角饰 + 竖排印章」移植到 DeepSeek Harness 的 Web GUI 上，做成可安装、可卸载、可热替换的客户端主题插件：`dsh-mengzhou-ui`。

## 安装

不需要下载或解压任何文件：这个主题以 DeepSeek Harness 插件的形式发布，让 Harness 里的助手帮你装就行。

### 推荐方式：把一句话发给助手

打开 DeepSeek Harness（桌面端或 Web GUI），在任意对话里发送：

```text
请用 plugin_manager 帮我安装并启用 DSH 主题插件 dsh-mengzhou-ui，仓库地址：
https://github.com/Ethanliu0217/dsh-mengzhou-ui
装好之后告诉我怎么重启才能看到新主题。
```

助手会自己完成安装；如果弹出权限确认，允许这一次安装即可。装好后**完全退出 DeepSeek Harness 再重新打开**，界面就是梦州主题了（暗色 / 亮色跟随 DSH 的明暗模式切换）。

<details>
<summary>其他安装方式、卸载与说明</summary>

**从「插件」页安装**：侧边栏「插件」→「添加插件」，在输入框里填 `https://github.com/Ethanliu0217/dsh-mengzhou-ui`（或 `github:Ethanliu0217/dsh-mengzhou-ui`），点「安装」；装完点「立即启用」，然后重启 DSH。

**命令行安装**（`dsh` 命令已随桌面端提供并加入 PATH 时；`desktop` 是桌面端默认 profile，换 profile 时改成对应名字）：

```bash
dsh plugin --profile desktop add github:Ethanliu0217/dsh-mengzhou-ui
```

**卸载 / 恢复默认主题**：

```bash
dsh plugin --profile desktop remove dsh-mengzhou-ui
```

也可以对助手说一句「请卸载 dsh-mengzhou-ui 并恢复默认主题」，或在「插件」页里卸载。重启后即恢复默认外观。

**说明**

- 这个插件没有发布到 npm，安装时请使用上面的 GitHub 地址；
- 安装会把 `dsh-mengzhou-ui` 写入当前 profile 的依赖与 `dsh.profile.bundles`，并自动应用它的 `cordis.patch.yml`（插入 `mengzhou-ui` 主题）；插件本身不会改动 DSH 安装目录；
- 需要能访问 github.com；安装、卸载都在重启 DSH 之后生效；
- 助手的插件管理工具 `plugin_manager` 在 Standard / Creator 预设中默认启用；若当前预设没有该工具，用上面的「插件」页或命令行方式。

</details>

## 视觉设计

- **墨玉暗色主题**：近黑墨色底，青玉色边框与文字层次，鎏金色作为细节强调。
- **宣纸亮色主题**：纸色背景搭配墨绿与暗金，并使用反相取墨的底图效果。
- **界面装饰**：龙首徽记、云纹角饰、金色刻线、竖排印章与玉璜风格按钮。
- **组件适配**：重新映射 DSH 颜色令牌及 `--dsw-static-neutral-bluish-{50…1000}` 灰阶，保持界面整体色调统一。

### 色板

墨玉（暗）：

```text
ink #070a0a · ink1 #0c1112 · ink2 #111819 · ink3 #172022
jade #7fe8d2 · jadeStrong #5fe0c6 · gold #e0c070 · goldDeep #a8792c
text #e6f2ec · text2 #9fb5ae · text3 #7c918a
success #4fd28a · warn #e0c070 · error #e2615a · done #a79cf5
```

宣纸（亮）：

```text
paper #f5f1e6 · paper1 #fbf7ee · paper2 #f2ece0
ink #0f6b5c · gold #a8792c
```

### 令牌映射（节选）

| DSH token | 暗 | 亮 |
| --- | --- | --- |
| `--dsw-alias-bg-base` | `#070a0a` | `#f5f1e6` |
| `--dsw-alias-bg-layer-1/2/3` | `#0c1112` / `#111819` / `#172022` | `#f8f4ea` / `#fbf7ee` / `#f2ece0` |
| `--dsw-alias-label-primary/secondary/tertiary` | `#e6f2ec` / `#9fb5ae` / `#7c918a` | `#12332c` / `#3c5a52` / `#6d837b` |
| `--dsw-alias-button-primary-fill` | `#1aa88f` | `#0f6b5c` |
| `--dsw-alias-link` | `#7fe3cd` | `#0f6b5c` |
| `--dsw-alias-markdown-code-block` | `#0a1011` | `#efe9da` |
