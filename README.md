# 鸣潮·梦州（Mengzhou）— DeepSeek Harness 界面皮肤

## 预览截图

<div align="center">
  <img src="./%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-11-14%20005125.png" alt="Mengzhou UI screenshot 1" width="48%" />
  <img src="./%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-11-14%20005142.png" alt="Mengzhou UI screenshot 2" width="48%" />
  <img src="./%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-11-14%20005157.png" alt="Mengzhou UI screenshot 3" width="48%" />
  <img src="./%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE%202026-11-14%20005209.png" alt="Mengzhou UI screenshot 4" width="48%" />
</div>

参考《鸣潮》梦州版本的 UI 视觉语言，把「墨玉底 + 青玉描边 + 鎏金刻线 + 衬线题签 + 云纹角饰 + 竖排印章」移植到 DeepSeek Harness 的 Web GUI 上，做成可安装、可卸载、可热替换的客户端主题插件：`dsh-mengzhou-ui`。

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
