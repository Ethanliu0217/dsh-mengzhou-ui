window.__ModuleLoader__.load({
  id: "dsh-mengzhou-ui",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

    /* ------------------------------------------------------------------ *
     * 鸣潮 · 梦州 —— 玄方墨玉 skin (v3)
     *
     * v3 变更（依据御者的三张参考图）：
     *   · 背景整幅照搬图一：龙首徽记 + 青绿墨带 + 大「玄」字描线 +
     *     竖排题字 + 红篆 + 云头花钿，由 PNG→WEBP 抠亮度通道生成透明场景层
     *   · 按钮改成参考图的「玉璜胶囊」：外描金线 / 内描青玉线 /
     *     竖纹肌理 / 中线横贯 + 两端菱形节点
     *   · 撤掉右下角竖排「梦州」印章（御者要求先去掉）
     *   · 撤掉右下角 520px 仪表环 .mz-ring 与它的虚线内环、刻线（御者嫌碍眼，2026-11-13）
     *   · 浮层层级改为近实底 + backdrop-filter 毛玻璃（见 README 第 8 节）
     * ------------------------------------------------------------------ */

    var P = {
      ink: '#070a0a',
      ink1: '#0c1112',
      ink2: '#111819',
      ink3: '#172022',
      jade: '#7fe8d2',
      jadeStrong: '#5fe0c6',
      gold: '#e0c070',
      goldDeep: '#a8792c',
      jadeText: '#e6f2ec',
      jadeTxt2: '#9fb5ae',
      jadeTxt3: '#7c918a'
    };

    var pair = function (light, dark) {
      return { light: light, dark: dark };
    };
    var rgba = function (hex, a) {
      var n = parseInt(hex.slice(1), 16);
      return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
    };

    var TOKENS = {
      /* --- 底面 --------------------------------------------------------- *
       * 底面一律用「半透」而不是实色：整屏底图只由 body 画一次，
       * 任何用这些 token 铺底的面板（框架主列、侧栏、卡片、第三方插件的
       * bg-layer-*）都会自然透出底图，墨带在整屏是同一条。
       * 不透明度逐层递增，保证层级仍能分辨。                              */
      '--dsw-alias-bg-base': pair(rgba('#f5f1e6', 0.58), rgba(P.ink, 0.38)),
      /* 浮层用的 layer-2/3 比主列更实：窗口一开就压在底图上，
         太透会把墨带纹样透进正文，读起来像隔着纱看字。 */
      '--dsw-alias-bg-layer-1': pair(rgba('#fbf7ee', 0.72), rgba(P.ink1, 0.52)),
      '--dsw-alias-bg-layer-2': pair(rgba('#f2ece0', 0.82), rgba(P.ink2, 0.66)),
      '--dsw-alias-bg-layer-3': pair(rgba('#e9e2d3', 0.90), rgba(P.ink3, 0.78)),
      '--dsw-alias-bg-module-platform': pair(rgba('#ede7d9', 0.78), rgba('#131b1c', 0.62)),
      '--dsw-alias-bg-overlay': pair(rgba('#e6dfcf', 0.90), rgba('#16201f', 0.90)),
      '--dsw-alias-bg-multi-select': pair(rgba('#ece5d6', 0.64), rgba('#131b1c', 0.50)),
      '--dsw-alias-bg-document-preview': pair(rgba('#f5f1e6', 0.58), rgba(P.ink, 0.38)),
      '--dsw-alias-bg-document-selection': pair(rgba('#0f6b5c', 0.22), rgba(P.jade, 0.26)),
      '--dsw-alias-bg-skeleton': pair('rgba(24,58,51,0.06)', rgba(P.jade, 0.07)),
      '--dsw-alias-bg-mask-1': pair('rgba(23,35,31,0.40)', 'rgba(0,0,0,0.70)'),
      '--dsw-alias-bg-mask-2': pair('rgba(23,35,31,0.20)', 'rgba(0,0,0,0.52)'),
      '--dsw-alias-bg-mask-3': pair('rgba(23,35,31,0.62)', 'rgba(0,0,0,0.64)'),
      '--dsw-alias-bg-mask-drop': pair('rgba(255,253,247,0.82)', 'rgba(10,16,17,0.80)'),
      '--dsw-alias-bg-mask-photo': pair('rgba(23,35,31,0.86)', 'rgba(0,0,0,0.88)'),

      /* --- 描边：发丝级青玉 ---------------------------------------------- */
      '--dsw-alias-border-l1': pair('rgba(24,58,51,0.10)', rgba(P.jade, 0.10)),
      '--dsw-alias-border-l2': pair('rgba(24,58,51,0.16)', rgba(P.jade, 0.16)),
      '--dsw-alias-border-l3': pair('rgba(24,58,51,0.26)', rgba(P.jade, 0.24)),
      '--dsw-alias-border-l4': pair('rgba(168,121,44,0.36)', rgba(P.gold, 0.34)),
      '--dsw-alias-border-l2-darkmode-thin': pair('rgba(24,58,51,0.12)', rgba(P.jade, 0.10)),
      '--dsw-alias-border-inverted': pair('rgba(255,253,247,0)', rgba(P.jade, 0.06)),
      '--dsw-alias-border-inverted2': pair('rgba(255,253,247,0.28)', rgba(P.jade, 0.10)),

      /* --- 文字 ---------------------------------------------------------- */
      '--dsw-alias-label-primary': pair('#17231f', P.jadeText),
      '--dsw-alias-label-primary-bluish': pair('#17231f', P.jadeText),
      '--dsw-alias-label-primary-dimmed': pair('#2c3b36', '#c6d8d1'),
      '--dsw-alias-label-primary-foreground': pair('#fffdf7', '#04100d'),
      '--dsw-alias-label-primary-inverted': pair('#f7f4ea', '#0a1211'),
      '--dsw-alias-label-secondary': pair('#44564f', P.jadeTxt2),
      '--dsw-alias-label-tertiary': pair('#5f7168', P.jadeTxt3),
      '--dsw-alias-label-caption': pair('#7b8b83', '#647771'),
      '--dsw-alias-label-dimmed': pair('#cdd5cd', '#27332f'),
      '--dsw-alias-label-document-preview': pair('#44564f', '#b9cbc4'),
      '--dsw-alias-label-deep-diving': pair('#0f6b5c', P.jade),
      '--dsw-alias-label-deep-diving-shimmer': pair('#3aa38c', '#cfe9dc'),
      '--dsw-alias-label-shimmer': pair('rgba(23,35,31,0.30)', 'rgba(230,242,236,0.45)'),
      '--dsw-alias-menu-icon': pair('#2c3b36', '#c6d8d1'),
      '--dsw-alias-link': pair('#0f6b5c', '#7fe3cd'),
      '--dsw-alias-brand-primary': pair('#0f6b5c', P.jadeStrong),
      '--dsw-alias-brand-primary-invert': pair('#0f6b5c', P.jadeStrong),
      '--dsw-alias-brand-primary-new-colorprimary-new-color': pair('#0f6b5c', P.jadeStrong),
      '--dsw-alias-brand-text': pair('#6b4f13', '#d9c183'),

      /* --- 按钮 ---------------------------------------------------------- */
      '--dsw-alias-button-primary-fill': pair('#0f6b5c', '#1aa88f'),
      '--dsw-alias-button-primary-hover': pair('#13806e', '#2fd0b3'),
      '--dsw-alias-button-primary-dimmed': pair('#cfe4dd', '#163f38'),
      '--dsw-alias-button-contrast-fill': pair('#17231f', P.jadeText),
      '--dsw-alias-button-elevated-fill': pair('#fffdf7', '#17211f'),
      '--dsw-alias-button-floating-fill': pair('#fffdf7', '#111917'),
      '--dsw-alias-button-floating-hover': pair('#f2ece0', '#18211f'),
      '--dsw-alias-button-ghost-active-fill': pair('#e9e2d3', '#1b2725'),
      '--dsw-alias-button-ghost-active-hover': pair('#ded5c2', '#223330'),
      '--dsw-alias-button-ghost-active-border': pair('#8b9a92', '#35504a'),
      '--dsw-alias-button-info-fill': pair('#0f6b5c', '#2fbfa3'),
      '--dsw-alias-button-info-hover': pair('#13806e', '#46d6b8'),
      '--dsw-alias-button-tool-bar-fill': pair('rgba(23,35,31,0.50)', 'rgba(26,36,35,0.50)'),
      '--dsw-alias-button-tool-bar-fill-invisible': pair('rgba(23,35,31,0.36)', 'rgba(15,22,22,0.36)'),
      '--dsw-alias-button-tool-bar-hover': pair('rgba(23,35,31,0.60)', 'rgba(36,50,48,0.60)'),

      /* --- 交互层 -------------------------------------------------------- */
      '--dsw-alias-interactive-bg-hover': pair('rgba(15,107,92,0.08)', rgba(P.jade, 0.10)),
      '--dsw-alias-interactive-bg-active': pair('rgba(15,107,92,0.14)', rgba(P.jade, 0.16)),
      '--dsw-alias-interactive-bg-hover-accent': pair('rgba(168,121,44,0.14)', rgba(P.gold, 0.18)),
      '--dsw-alias-interactive-bg-hover-danger': pair('rgba(185,58,51,0.08)', 'rgba(226,97,90,0.16)'),
      '--dsw-alias-interactive-bg-hover-solid': pair('#ece5d6', '#18211f'),
      '--dsw-alias-turn-trigger-bg': pair('rgba(15,107,92,0.08)', rgba(P.jade, 0.10)),
      '--dsw-alias-turn-trigger-bg-hover': pair('rgba(15,107,92,0.14)', rgba(P.jade, 0.16)),

      /* --- 代码 / Markdown ---------------------------------------------- */
      '--dsw-alias-markdown-code-block': pair('#efe9dc', '#080d0d'),
      '--dsw-alias-markdown-code-block-banner': pair('#eae3d4', '#0f1717'),
      '--dsw-alias-markdown-code-segment-selected': pair('#fffdf7', '#1b2a28'),
      '--dsw-alias-markdown-code-segment-unselected': pair('#e7e0d1', '#0b1211'),
      '--dsw-alias-markdown-inline-code': pair('#eee7d9', '#16201f'),
      '--dsw-alias-markdown-placeholder': pair('#e8e2d4', '#101817'),
      '--dsw-alias-markdown-tag': pair('#ece6d7', '#16201f'),
      '--dsw-alias-markdown-citation': pair('#f0eadc', '#16201f'),
      '--dsw-alias-code-diff-added': pair('rgba(31,138,95,0.10)', 'rgba(79,210,138,0.14)'),
      '--dsw-alias-code-diff-deleted': pair('rgba(185,58,51,0.10)', 'rgba(226,97,90,0.14)'),
      '--dsw-alias-file-diff-added-bg': pair('#eaf4ec', '#10281b'),
      '--dsw-alias-file-diff-added-gutter': pair('#f0f8f1', '#0b1d13'),
      '--dsw-alias-file-diff-added-marker': pair('#1f8a5f', '#4fd28a'),
      '--dsw-alias-file-diff-deleted-bg': pair('#f8ebe7', '#2a1512'),
      '--dsw-alias-file-diff-deleted-gutter': pair('#fbf1ee', '#1f0e0c'),
      '--dsw-alias-file-diff-deleted-marker': pair('#b93a33', '#e2615a'),

      /* --- 状态 ---------------------------------------------------------- */
      /* 侧栏会话列表的状态点：done=墨绿 / error=红 / idle=灰，2026-11-13 */
      '--dsw-alias-state-success-primary': pair('#1f8a5f', P.jade),
      '--dsw-alias-state-success-secondary': pair('#2fa878', '#7fe8d2'),
      '--dsw-alias-state-success-tertiary': pair('#e3f3ea', '#16301f'),
      '--dsw-alias-state-warn-primary': pair('#a97b25', P.gold),
      '--dsw-alias-state-warn-secondary': pair('#c1932f', '#eed69a'),
      '--dsw-alias-state-warn-tertiary': pair('#f6eeda', '#2a2415'),
      '--dsw-alias-state-warn-label': pair('#8a6318', '#d9b062'),
      '--dsw-alias-state-error-primary': pair('#b93a33', '#e2615a'),
      '--dsw-alias-state-error-secondary': pair('#d15048', '#f08a83'),
      '--dsw-alias-state-done-primary': pair('#5f43a8', '#a79cf5'),
      '--dsw-alias-state-business-primary': pair('#0f6b5c', P.jade),
      '--dsw-alias-state-business-tertiary': pair('#e2efe9', '#123a34'),
      '--dsw-alias-state-idle-primary': pair('#b3bdb5', '#4d5f59'),

      /* --- 控件 / 浮层 ---------------------------------------------------- */
      '--dsw-alias-switch-thumb': pair('#fffdf7', P.jadeText),
      '--dsw-alias-scrollbar-bg-l1': pair('#d3cbb9', '#24312e'),
      '--dsw-alias-scrollbar-bg-l2': pair('#cdc5b2', '#2b3a36'),
      '--dsw-alias-scrollbar-hover-l1': pair('#b9ae97', '#3a504a'),
      '--dsw-alias-scrollbar-hover-l2': pair('#b0a48c', '#47605a'),
      '--dsw-alias-menu-group-header-fill': pair('rgba(255,253,247,0.94)', 'rgba(15,22,23,0.94)'),
      '--dsw-alias-tooltip-bg': pair('#17231f', '#17211f'),
      '--dsw-alias-tooltip-key-bg': pair('rgba(255,253,247,0.18)', rgba(P.jade, 0.14)),
      '--dsw-alias-toast-bg': pair('#17231f', '#14201e'),
      '--dsw-alias-toast-label': pair('#fffdf7', P.jadeText),
      '--dsw-alias-settings-card-fill': pair('#fffdf7', '#0e1516'),
      '--dsw-alias-settings-card-stroke': pair('rgba(24,58,51,0.14)', rgba(P.jade, 0.16)),

      /* --- 插画底（onboarding / 空态） ------------------------------------ */
      '--dsw-alias-illustration-background': pair('#f1ebdf', '#131b1c'),
      '--dsw-alias-illustration-backing': pair('#ddd5c4', '#1b2725'),
      '--dsw-alias-illustration-detail': pair('#b9b09c', '#3a4f48'),
      '--dsw-alias-illustration-inset': pair('#fffdf7', '#1f2b28'),
      '--dsw-alias-illustration-shadow': pair('#fffdf7', '#1f2b28'),
      '--dsw-alias-illustration-surface': pair('#e8e1d2', '#1f2b28'),
      '--dsw-alias-onboarding-accent': pair('#0f6b5c', P.jade),
      '--dsw-alias-onboarding-card-fill': pair('rgba(255,253,247,0.92)', 'rgba(14,21,22,0.92)'),
      '--dsw-alias-onboarding-secondary-fill': pair('#fffdf7', '#16201f'),
      '--dsw-alias-onboarding-checkbox-border': pair('rgba(24,58,51,0.28)', rgba(P.jade, 0.36))
    };

    var RADII = {
      '--dsw-radius-2xs': '1px',
      '--dsw-radius-xs': '2px',
      '--dsw-radius-sm': '3px',
      '--dsw-radius-md': '4px',
      '--dsw-radius-lg': '6px',
      '--dsw-radius-xl': '8px',
      '--dsw-radius-2xl': '10px',
      '--dsw-radius-3xl': '14px',
      '--dsw-radius-full': '999px'
    };

    /* 正文两个字族：拉丁字母走微软雅黑，汉字走思源宋（unicode-range 分段拼成一支） */
    var SERIF = '"MZ Text","Segoe UI","Microsoft YaHei","Noto Serif SC",serif';
    var UI_SANS = '"Segoe UI","Microsoft YaHei","微软雅黑","PingFang SC",-apple-system,sans-serif';

    /* 背景场景层：图一整幅抠出的亮度通道（含龙首 / 墨带 / 玄字 / 竖题 / 红篆） */
    var SCENE_DARK = 'data:image/webp;base64,__SCENE_DARK__';
    var SCENE_LIGHT = 'data:image/webp;base64,__SCENE_LIGHT__';

    /* 龙首徽记（御者给的图，白线取 alpha，当遮罩上色用） */
    var LOGO = 'data:image/webp;base64,__LOGO__';

    /* 按钮肌理：竖向细纹（参考图按钮的织纹底） */
    var WEAVE =
      'repeating-linear-gradient(90deg, rgba(4,32,27,0.16) 0 1px, rgba(255,255,255,0) 1px 4px)';

    /* 浮层（对话框 / 弹出层 / 菜单 / 命令面板）与它背后的遮罩：
       框架里这些容器用自己的哈希类名，只能按后缀子串兜住。 */
    var pick = function (list) {
      return list.map(function (s) { return 'body[data-mz-skin] ' + s; }).join(',\n');
    };
    var GLASS = pick([
      '[role="dialog"]', '[role="alertdialog"]', '[role="menu"]', '[role="listbox"]',
      '[class*="dialog"]', '[class*="Dialog"]', '[class*="modal"]', '[class*="Modal"]',
      '[class*="popover"]', '[class*="Popover"]', '[class*="popup"]', '[class*="Popup"]',
      '[class*="dropdown"]', '[class*="Dropdown"]', '[class*="contextMenu"]', '[class*="ContextMenu"]',
      '[class*="commandPalette"]', '[class*="CommandPalette"]', '[class*="_sheet"]', '[class*="_Sheet"]',
      '[class*="menuSurface"]', '[class*="floatingCard"]', '[class*="overlayCard"]'
    ]);
    var SCRIM = pick([
      '[class*="scrim"]', '[class*="Scrim"]', '[class*="backdrop"]', '[class*="Backdrop"]',
      /* 框架的模态遮罩类名是 _mask_<hash>，菜单/对话框都靠它压场 */
      '[class*="_mask_"]', '[class*=" mask"]', '[class*="Mask_"]'
    ]);

    var CSS = [
      /* ---------- 皮：全局 ------------------------------------------------- */
      'body[data-mz-skin]{',
      '  --mz-jade: #7fe8d2;',
      '  --mz-gold: #e0c070;',
      /* 暗纱：叠在场景层之上，保证正文对比度 */
      '  --mz-scrim: linear-gradient(180deg, rgba(4,6,7,0.06), rgba(4,6,7,0.34) 52%, rgba(4,6,7,0.10));',
      '  --mz-scrim-light: linear-gradient(180deg, rgba(245,241,230,0.10), rgba(245,241,230,0.34) 52%, rgba(245,241,230,0.12));',
      /* 墨玉化灰阶：框架里写死 var(--dsw-static-neutral-bluish-*) 的组件跟着变深 */
      '  --dsw-static-neutral-bluish-50: #eef6f2;',
      '  --dsw-static-neutral-bluish-75: #e2efea;',
      '  --dsw-static-neutral-bluish-100: #d6e7e0;',
      '  --dsw-static-neutral-bluish-150: #cbdcd5;',
      '  --dsw-static-neutral-bluish-200: #b8ccc4;',
      '  --dsw-static-neutral-bluish-300: #98aea6;',
      '  --dsw-static-neutral-bluish-400: #7d938c;',
      '  --dsw-static-neutral-bluish-500: #647871;',
      '  --dsw-static-neutral-bluish-600: #4d5f59;',
      '  --dsw-static-neutral-bluish-700: #3a4a45;',
      '  --dsw-static-neutral-bluish-750: #2c3a36;',
      '  --dsw-static-neutral-bluish-800: #22302c;',
      '  --dsw-static-neutral-bluish-850: #172422;',
      '  --dsw-static-neutral-bluish-875: #101a19;',
      '  --dsw-static-neutral-bluish-900: #0b1213;',
      '  --dsw-static-neutral-bluish-950: #080e0f;',
      '  --dsw-static-neutral-bluish-1000: #050708;',
      /* 场景层放最底下，最上层压一层暗纱保证正文可读 */
      '  background-color: #050708;',
      '  background-image:',
      '    linear-gradient(180deg, rgba(5,8,8,0.30), rgba(5,8,8,0.10) 42%, rgba(5,8,8,0.34)),',
      '    url(' + SCENE_DARK + ');',
      '  background-size: cover, cover;',
      '  background-position: center center, center center;',
      '  background-repeat: no-repeat, no-repeat;',
      '  background-attachment: fixed, fixed;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin]{',
      '  background-color: #f5f1e6;',
      '  background-image:',
      '    linear-gradient(180deg, rgba(245,241,230,0.42), rgba(245,241,230,0.24) 44%, rgba(245,241,230,0.46)),',
      '    url(' + SCENE_LIGHT + ');',
      '}',
      /* 场景层只画一次：钉在 body 上，fixed 附着 = 定位区是视口，
         滚动不动、任何面板都不再各自重绘一张，也就不会出现「第二条绿带」。 */
      'body[data-mz-skin] [class*="_frame"],',
      'body[data-mz-skin] [class$="_root"],',
      'body[data-mz-skin] [class*="_root "],',
      'body[data-mz-skin] [class*="_emptyTabHost"],',
      'body[data-mz-skin] [class*="_sidebarCol"],',
      'body[data-mz-skin] [class*="quietBars"]{',
      '  background-color: transparent !important;',
      '  background-image: none !important;',
      '}',
      'html:has(body[data-mz-skin]){ background-color: #050708; }',
      'html:has(body:not([data-ds-dark-theme])[data-mz-skin]){ background-color: #f5f1e6; }',
      /* 侧栏、输入座、以及任何自带底色的面板：全部清空成透明。
         底图只由 body 画一次，整屏连续，侧栏不再自己叠第二层。 */
      'body[data-mz-skin] [class*="composerSeat"],',
      'body[data-mz-skin] [class*="quietBars"],',
      'body[data-mz-skin] [class$="_sidebarCol"],',
      'body[data-mz-skin] [class*="_sidebarCol "],',
      'body[data-mz-skin] [class*="_sidebar"],',
      'body[data-mz-skin] [class*="sidebar"]{',
      '  background-color: transparent !important;',
      '  background-image: none !important;',
      '  box-shadow: none !important;',
      '}',
      /* 标签层衬线化 */
      'body[data-mz-skin] [class$="_panelTitle"],',
      'body[data-mz-skin] [class$="_brandName"],',
      'body[data-mz-skin] [class$="_newSessionLabel"],',
      'body[data-mz-skin] [class$="_newSessionContent"],',
      'body[data-mz-skin] [class$="_panelRow"] span,',
      'body[data-mz-skin] [class$="_sessionRow"] span,',
      'body[data-mz-skin] [class$="_previewBadge"]{',
      '  font-family: ' + SERIF + ';',
      '  letter-spacing: 0.055em;',
      '}',
      'body[data-mz-skin] [class$="_sessionRow"][class*="selected"]{',
      '  box-shadow: inset 2px 0 0 rgba(224,192,112,0.42);',
      '}',
      'body[data-mz-skin] ::selection{',
      '  background: rgba(127,232,210,0.26);',
      '  color: var(--dsw-alias-label-primary);',
      '}',

      /* ---------- 玉璜按钮 ------------------------------------------------ *
       * 参考图按钮的三要素：外层金线 / 内层青玉线 / 织纹肌理，
       * 宽按钮再加一条横贯中线与两端菱形节点。                              */
      'body[data-mz-skin] [class$="_primary"],',
      'body[data-mz-skin] [class$="_add"],',
      'body[data-mz-skin] [class$="_newSession"]{',
      '  border-radius: 999px !important;',
      '  background-image:',
      '    ' + WEAVE + ',',
      '    radial-gradient(120% 190% at 50% 50%, rgba(255,255,255,0.10), rgba(0,0,0,0) 62%),',
      '    linear-gradient(168deg, #35c9ac, #178b76 62%, #0f6f5d);',
      '  background-repeat: repeat, no-repeat, no-repeat;',
      '  box-shadow:',
      '    inset 0 0 0 1px rgba(224,192,112,0.62),',
      '    inset 0 0 0 4px rgba(127,232,210,0.13),',
      '    0 0 22px -10px rgba(127,232,210,0.85);',
      '  color: #04201b !important;',
      '}',
      /* 宽按钮：按参考图「已领取」的构图排层 ——
         两端菱形节点 + 内缩竖刻 + 横贯中线 + 竖向织纹 */
      'body[data-mz-skin] [class$="_newSession"]{',
      '  background-image:',
      /* 1,2 两端菱形节点 */
      '    radial-gradient(circle, rgba(236,208,140,0.96) 0 1.3px, rgba(236,208,140,0) 2.1px),',
      '    radial-gradient(circle, rgba(236,208,140,0.96) 0 1.3px, rgba(236,208,140,0) 2.1px),',
      /* 3,4 节点内侧的短竖刻，像参考图两端的括形刻线 */
      '    linear-gradient(180deg, rgba(236,208,140,0), rgba(236,208,140,0.62) 18%, rgba(236,208,140,0.62) 82%, rgba(236,208,140,0)),',
      '    linear-gradient(180deg, rgba(236,208,140,0), rgba(236,208,140,0.62) 18%, rgba(236,208,140,0.62) 82%, rgba(236,208,140,0)),',
      /* 5 横贯中线，两端淡出 */
      '    linear-gradient(90deg, rgba(236,208,140,0) 0, rgba(236,208,140,0.40) 12%, rgba(236,208,140,0.40) 88%, rgba(236,208,140,0) 100%),',
      /* 6 织纹 */
      '    ' + WEAVE + ',',
      /* 7 底色 */
      '    linear-gradient(168deg, #33c4a8, #178b76 64%, #0f6f5d);',
      '  background-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, repeat, no-repeat;',
      '  background-size: 9px 9px, 9px 9px, 1px 13px, 1px 13px, 100% 1px, auto, auto;',
      '  background-position: 15px 50%, calc(100% - 15px) 50%, 26px 50%, calc(100% - 26px) 50%, 50% 50%, 0 0, 0 0;',
      '}',
      'body[data-mz-skin] [class$="_primary"]:hover,',
      'body[data-mz-skin] [class$="_add"]:hover,',
      'body[data-mz-skin] [class$="_newSession"]:hover{',
      '  box-shadow:',
      '    inset 0 0 0 1px rgba(255,226,158,0.85),',
      '    inset 0 0 0 4px rgba(127,232,210,0.20),',
      '    0 0 26px -8px rgba(127,232,210,0.95);',
      '}',
      /* 次级按钮 / 工具按钮：细金边 + 极淡织纹，形状仍保持胶囊；
         纯图标按钮（内含 svg 且无文字）不描边，避免满屏小圈 */
      'body[data-mz-skin] button:not([class$="_primary"]):not([class$="_add"]):not([class$="_newSession"]):not([class*="icon"]):not([class*="Icon"]){',
      '  border-radius: 999px !important;',
      '  box-shadow: inset 0 0 0 1px rgba(127,232,210,0.14);',
      '}',
      'body[data-mz-skin] button:not([class$="_primary"]):not([class$="_add"]):hover{',
      '  box-shadow: inset 0 0 0 1px rgba(224,192,112,0.48), 0 0 18px -10px rgba(224,192,112,0.7);',
      '}',
      'body[data-mz-skin] button[class*="icon"],',
      'body[data-mz-skin] button[class*="Icon"]{',
      '  box-shadow: none !important;',
      '  border-radius: 6px !important;',
      '  background: transparent !important;',
      '}',

      /* ---------- 滚动条 --------------------------------------------------- */
      'body[data-mz-skin] ::-webkit-scrollbar{ width:9px; height:9px; }',
      'body[data-mz-skin] ::-webkit-scrollbar-track{ background:transparent; }',
      'body[data-mz-skin] ::-webkit-scrollbar-thumb{',
      '  background: linear-gradient(180deg, var(--dsw-alias-scrollbar-bg-l2), var(--dsw-alias-scrollbar-bg-l1));',
      '  border:1px solid var(--dsw-alias-border-l2);',
      '  border-radius: 8px;',
      '}',
      'body[data-mz-skin] ::-webkit-scrollbar-thumb:hover{',
      '  background: linear-gradient(180deg, var(--dsw-alias-scrollbar-hover-l2), var(--dsw-alias-scrollbar-hover-l1));',
      '  border-color: var(--dsw-alias-border-l3);',
      '}',

      /* ---------- 字形 ----------------------------------------------------- */
      'body[data-mz-skin] h1, body[data-mz-skin] h2, body[data-mz-skin] h3,',
      'body[data-mz-skin] h4, body[data-mz-skin] h5, body[data-mz-skin] h6{',
      '  font-family: ' + SERIF + ';',
      '  letter-spacing: 0.02em;',
      '  font-weight: 600;',
      '}',
      'body[data-mz-skin] [class*="markdown"]{',
      '  font-family: ' + SERIF + ';',
      '  font-size: calc(var(--dsh-content-font-size, 14px) + 0.5px);',
      '  letter-spacing: 0.012em;',
      '}',
      'body[data-mz-skin] [class*="markdown"] code,',
      'body[data-mz-skin] [class*="markdown"] pre,',
      'body[data-mz-skin] [class*="markdown"] pre *{',
      '  font-family: var(--ds-font-family-code, "SF Mono", "JetBrains Mono", Consolas, monospace);',
      '  letter-spacing: 0;',
      '}',

      /* ---------- 刻线 / 焦点 ---------------------------------------------- *
       卡片刻线只上「最外层」这一圈。框架里图标、标题、简介全都叫 _card_*，
       之前每条规则都给所有 card 戴框，插件列表里一条就变成
       「外框 → 图标框 → 名称框 → 简介框」四层嵌套长方形，御者说看着乱。
       [class*="card"]:not([class*="card"] [class*="card"]) = 没有 card 祖先的 card，
       即最外层那一枚；内部嵌套的不再起框。 */
      'body[data-mz-skin] [class*="card"]:not([class*="card"] [class*="card"]),',
      'body[data-mz-skin] [class*="Card"]:not([class*="card"] [class*="Card"]){',
      '  box-shadow: inset 0 0 0 1px rgba(24,58,51,0.07);',
      '}',
      /* 卡片内的图标按钮、消息操作条：不再各戴一个圈，只留悬停时的青光
         —— 主操作（玉璜胶囊）与加号按钮除外，它们由上面的规则负责 */
      'body[data-mz-skin] [class*="card"] button:not([class$="_primary"]):not([class$="_add"]):not([class$="_newSession"]),',
      'body[data-mz-skin] [class*="Card"] button:not([class$="_primary"]):not([class$="_add"]):not([class$="_newSession"]),',
      'body[data-mz-skin] [class*="deliverable"] button:not([class$="_primary"]):not([class$="_add"]),',
      'body[data-mz-skin] [class*="_actions"] button:not([class$="_primary"]),',
      'body[data-mz-skin] [class*="action"] button:not([class$="_primary"]){',
      '  box-shadow: none !important;',
      '  background: transparent !important;',
      '  border-color: transparent !important;',
      '  border-radius: 6px !important;',
      '}',
      'body[data-mz-skin] [class*="card"] button:not([class$="_primary"]):hover,',
      'body[data-mz-skin] [class*="deliverable"] button:hover{',
      '  background: rgba(127,232,210,0.10) !important;',
      '}',
      /* 附件 / 交付物卡：实底——边框内不露出底图的花纹 */
      'body[data-mz-skin] [class*="deliverable"],',
      'body[data-mz-skin] [class*="_attachment"],',
      'body[data-mz-skin] [class*="_fileCard"],',
      'body[data-mz-skin] [class*="_filePill"],',
      'body[data-mz-skin] [class*="flowItem"] [class$="_file"]{',
      '  background-color: #090f10 !important;',
      '  border: 0 !important;',
      '  border-radius: 999px !important;',
      '  box-shadow: 0 0 16px -3px rgba(127,232,210,0.20), 0 0 40px -18px rgba(127,232,210,0.30),',
      '              inset 0 0 0 1px rgba(127,232,210,0.05), inset 0 0 22px -14px rgba(127,232,210,0.55) !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="deliverable"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="_attachment"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="_fileCard"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="_filePill"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="flowItem"] [class$="_file"]{',
      '  background-color: #fbf7ee !important;',
      '  box-shadow: 0 0 14px -3px rgba(24,58,51,0.14), 0 0 34px -18px rgba(24,58,51,0.18),',
      '              inset 0 0 0 1px rgba(24,58,51,0.07) !important;',
      '}',
      'body[data-mz-skin] [class*="attachmentRow"]{',
      '  background: transparent !important;',
      '  border: 0 !important;',
      '  box-shadow: none !important;',
      '  border-radius: 0 !important;',
      '}',
      /* 卡片里的按钮 / 触发区 / 文件名：一律不再套第二层框 */
      'body[data-mz-skin] [class*="attachmentRow"] button,',
      'body[data-mz-skin] [class*="attachmentRow"] [role="button"],',
      'body[data-mz-skin] [class*="attachmentRow"] [class*="_action"],',
      'body[data-mz-skin] [class*="attachmentRow"] [class*="_Action"],',
      'body[data-mz-skin] [class*="attachmentRow"] [class*="_link"],',
      'body[data-mz-skin] [class*="attachmentRow"] [class*="_trigger"],',
      'body[data-mz-skin] [class*="attachmentRow"] [class*="_fileName"],',
      'body[data-mz-skin] [class*="attachmentRow"] [class*="_fileIcon"],',
      'body[data-mz-skin] [class*="deliverable"] button,',
      'body[data-mz-skin] [class*="deliverable"] [role="button"]{',
      '  background: transparent !important;',
      '  border: 0 !important;',
      '  box-shadow: none !important;',
      '}',
      /* 中文副标题同样做出深浅：文件名亮，描述与提示压暗 */
      'body[data-mz-skin] [class*="_fileName"]{',
      '  color: var(--dsw-alias-label-primary) !important;',
      '  font-weight: 600 !important;',
      '}',
      'body[data-mz-skin] [class*="_secondaryText"],',
      'body[data-mz-skin] [class*="_description"],',
      'body[data-mz-skin] [class*="_previewHint"],',
      'body[data-mz-skin] [class*="_hint"]{',
      '  color: rgba(230,242,236,0.46) !important;',
      '  font-weight: 400 !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="_secondaryText"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="_description"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="_previewHint"]{',
      '  color: rgba(26,40,36,0.58) !important;',
      '}',
      /* 气泡：只留一根青玉发丝，去掉框架自带的双层边 */
      'body[data-mz-skin] [class$="_bubble"],',
      'body[data-mz-skin] [class*="_bubble "]{',
      '  border: 0 !important;',
      '  box-shadow: inset 0 0 0 1px rgba(127,232,210,0.11) !important;',
      '}',
      'body[data-mz-skin] textarea:focus, body[data-mz-skin] input:focus{',
      '  caret-color: var(--mz-jade);',
      '}',
      'body[data-mz-skin] button{',
      '  transition: background-color .16s ease, box-shadow .18s ease, border-color .16s ease, color .16s ease;',
      '}',
      'body[data-mz-skin] *:focus-visible{',
      '  outline: 1px solid rgba(127,232,210,0.55);',
      '  outline-offset: 2px;',
      '}',
      'body[data-mz-skin] pre{',
      '  border-left: 2px solid rgba(224,192,112,0.34);',
      '  border-radius: 2px;',
      '}',
      'body[data-mz-skin] hr{',
      '  border:0; height:1px;',
      '  background: linear-gradient(90deg, transparent, var(--dsw-alias-border-l3), transparent);',
      '}',
      'body[data-mz-skin] table th{',
      '  font-family: ' + SERIF + ';',
      '  letter-spacing: 0.06em;',
      '}',
      /* 表格只留横线，去掉竖网格；行内代码不再各戴一个框 */
      'body[data-mz-skin] [class*="markdown"] table{',
      '  border-collapse: collapse !important;',
      '  border: 0 !important;',
      '}',
      'body[data-mz-skin] [class*="markdown"] table th,',
      'body[data-mz-skin] [class*="markdown"] table td{',
      '  border-left: 0 !important;',
      '  border-right: 0 !important;',
      '  border-top: 0 !important;',
      '  border-bottom: 1px solid rgba(127,232,210,0.10) !important;',
      '}',
      'body[data-mz-skin] [class*="markdown"] table th{',
      '  border-bottom: 1px solid rgba(224,192,112,0.28) !important;',
      '}',
      'body[data-mz-skin] [class*="markdown"] :not(pre) > code,',
      'body[data-mz-skin] [class*="markdown"] p code{',
      '  background: rgba(127,232,210,0.07) !important;',
      '  border: 0 !important;',
      '  box-shadow: none !important;',
      '  padding: 0 3px;',
      '  border-radius: 3px;',
      '}',
      'body[data-mz-skin] blockquote{',
      '  border-left: 2px solid rgba(127,232,210,0.30);',
      '}',

      /* ---------- 浮层毛玻璃：窗口一开就该「压住」背后的画 ------------------ *
       * 御者反馈：弹窗/弹出层太透，墨带纹样从窗口里透出来，字浮在花纹上。
       * 处理分两层——遮罩加厚 + 窗口本体近乎不透明，再叠 backdrop-filter
       * 让背后的底图化成一团模糊的青墨，不做锐利的透印。                          */
      /* 框架把「模糊」本身做成了两个 CSS 变量：
       *   --dsw-mask-blur            模态/看图的遮罩模糊
       *   --dsw-menu-backdrop-filter 菜单浮层的毛玻璃
       * --dsw-menu-surface-fill      菜单浮层的底色
       它们在默认主题里几乎没给值（或给了极淡的一层），本皮肤统一在这里重下。       */
      'body[data-mz-skin]{',
      '  --dsw-mask-blur: blur(16px) saturate(130%);',
      '  --dsw-menu-backdrop-filter: blur(26px) saturate(140%);',
      '  --dsw-menu-surface-fill: rgba(9,14,15,0.90);',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin]{',
      '  --dsw-mask-blur: blur(14px) saturate(120%);',
      '  --dsw-menu-surface-fill: rgba(250,246,236,0.94);',
      '}',
      SCRIM + '{',
      '  -webkit-backdrop-filter: blur(12px) saturate(120%);',
      '  backdrop-filter: blur(12px) saturate(120%);',
      '  background-color: rgba(4,8,9,0.62) !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="scrim"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="backdrop"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="Backdrop"]{',
      '  background-color: rgba(226,219,203,0.66) !important;',
      '}',
      GLASS + '{',
      '  -webkit-backdrop-filter: blur(30px) saturate(140%);',
      '  backdrop-filter: blur(30px) saturate(140%);',
      '  background-color: rgba(9,14,15,0.90) !important;',
      '  border: 0 !important;',
      '  box-shadow:',
      '    0 26px 70px -30px rgba(0,0,0,0.92),',
      '    0 0 32px -14px rgba(127,232,210,0.30),',
      '    inset 0 0 0 1px rgba(127,232,210,0.16) !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] [role="dialog"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [role="alertdialog"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [role="menu"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [role="listbox"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="dialog"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="Dialog"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="modal"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="popover"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="popup"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="dropdown"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="commandPalette"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="_sheet"]{',
      '  background-color: rgba(250,246,236,0.94) !important;',
      '  box-shadow:',
      '    0 22px 60px -28px rgba(23,35,31,0.34),',
      '    inset 0 0 0 1px rgba(24,58,51,0.18) !important;',
      '}',
      /* 不支持 backdrop-filter 的老内核：把窗口做成实底，宁可厚一点也不能透印 */
      '@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))){',
      '  ' + GLASS + '{',
      '    background-color: rgba(8,12,13,0.98) !important;',
      '  }',
      '}',
      /* 浮层里的内容不再继承「卡片」的描边，避免窗口里套一圈小圈 */
      'body[data-mz-skin] [role="dialog"] [class*="card"],',
      'body[data-mz-skin] [role="dialog"] [class*="Card"],',
      'body[data-mz-skin] [class*="popover"] [class*="card"]{',
      '  box-shadow: none !important;',
      '  background: transparent !important;',
      '}',

      /* ---------- 装饰层：金线 / 侧轨 / 云纹 --------------------------------- */
      '.mz-veil{',
      '  position: fixed; inset: 0; z-index: 2147482000;',
      '  pointer-events: none; user-select: none;',
      '  contain: layout style paint;',
      '}',
      '.mz-veil svg{ display:block; overflow:visible; }',
      'body:not([data-ds-dark-theme]) .mz-topline{ background: linear-gradient(90deg, transparent, rgba(168,121,44,0.70), transparent); }',

      '.mz-topline{',
      '  position:absolute; top:0; left:0; right:0; height:2px;',
      '  background: linear-gradient(90deg, rgba(224,192,112,0.04), rgba(224,192,112,0.30) 18%, rgba(255,224,150,0.92) 50%, rgba(224,192,112,0.30) 82%, rgba(224,192,112,0.04));',
      '  box-shadow: 0 0 14px -2px rgba(224,192,112,0.42);',
      '  animation: mz-breathe 6.5s ease-in-out infinite;',
      '}',
      '@keyframes mz-breathe{',
      '  0%,100%{ opacity:.62; }',
      '  50%{ opacity:1; }',
      '}',
      '.mz-rail{',
      '  position:absolute; top:12vh; bottom:12vh; width:1px;',
      '  background: linear-gradient(180deg, transparent, rgba(127,232,210,0.46) 18%, rgba(127,232,210,0.46) 82%, transparent);',
      '  opacity:.85;',
      '}',
      '.mz-rail--l{ left:10px; }',
      '.mz-rail--r{ right:10px; }',
      '.mz-crest{',
      '  position:absolute; top:6px; left:50%; transform: translateX(-50%);',
      '  width:22px; height:22px; opacity:.92; color: rgba(224,192,112,0.92);',
      '  filter: drop-shadow(0 0 6px rgba(224,192,112,0.35));',
      '}',
      '.mz-grain{',
      '  position:absolute; inset:0;',
      '  background-image: radial-gradient(rgba(127,232,210,0.06) 1px, transparent 1px);',
      '  background-size: 4px 4px;',
      '  opacity:.18;',
      '  mix-blend-mode: screen;',
      '}',
      'body:not([data-ds-dark-theme]) .mz-grain{ opacity:.10; mix-blend-mode: multiply; }',

      /* ---------- 四周饰件：直角回纹括 / 点阵 / 竖题（轻科幻 + 国风） ---------- */
      '.mz-corner{',
      '  position:absolute; width:46px; height:46px;',
      '  color: rgba(127,232,210,0.30);',
      '}',
      '.mz-corner::before, .mz-corner::after{',
      '  content:""; position:absolute; background: currentColor;',
      '}',
      '.mz-corner::before{ width:100%; height:1px; }',
      '.mz-corner::after{ width:1px; height:100%; }',
      '.mz-corner i{',
      '  position:absolute; width:8px; height:8px;',
      '  border-top:1px solid currentColor; border-left:1px solid currentColor;',
      '  opacity:.85;',
      '}',
      '.mz-corner--tl{ top:12px; left:12px; }',
      '.mz-corner--tl::before{ top:0; left:0; }',
      '.mz-corner--tl::after{ top:0; left:0; }',
      '.mz-corner--tl i{ top:7px; left:7px; }',
      '.mz-corner--tr{ top:12px; right:12px; }',
      '.mz-corner--tr::before{ top:0; right:0; }',
      '.mz-corner--tr::after{ top:0; right:0; }',
      '.mz-corner--tr i{ top:7px; right:7px; transform: scaleX(-1); }',
      '.mz-corner--bl{ bottom:12px; left:12px; }',
      '.mz-corner--bl::before{ bottom:0; left:0; }',
      '.mz-corner--bl::after{ bottom:0; left:0; }',
      '.mz-corner--bl i{ bottom:7px; left:7px; transform: scaleY(-1); }',
      '.mz-corner--br{ bottom:12px; right:12px; }',
      '.mz-corner--br::before{ bottom:0; right:0; }',
      '.mz-corner--br::after{ bottom:0; right:0; }',
      '.mz-corner--br i{ bottom:7px; right:7px; transform: scale(-1); }',

      '.mz-dots{',
      '  position:absolute; width:34px; height:70px; opacity:.30;',
      '  background-image: radial-gradient(currentColor 1px, transparent 1.4px);',
      '  background-size: 8px 8px; color: rgba(224,192,112,0.9);',
      '}',
      '.mz-dots--tr{ top:78px; right:16px; }',
      '.mz-dots--bl{ bottom:96px; left:16px; }',

      '.mz-vtext{',
      '  position:absolute; right:15px; top:44%;',
      '  writing-mode: vertical-rl; text-orientation: upright;',
      '  font-family: ' + UI_SANS + ';',
      '  font-size:10px; letter-spacing:.42em;',
      '  color: rgba(224,192,112,0.42);',
      '}',
      '.mz-vtext--l{ left:15px; right:auto; top:64%; color: rgba(127,232,210,0.34); }',
      '@media (max-width:1100px){ .mz-vtext{ display:none; } }',

      /* 右下角那枚 520px 仪表环已按御者要求撤掉（2026-11-13）：
         它挂在视口外 160/190px，只露出四分之一弧，远看像块贴歪的圆规痕。 */
      '.mz-meander{',
      '  position:absolute; left:0; right:0; bottom:0; height:10px; opacity:.20;',
      '  color: rgba(224,192,112,0.95);',
      '  background-image:',
      '    linear-gradient(90deg, currentColor 0 2px, transparent 2px 10px),',
      '    linear-gradient(90deg, transparent 0 3px, currentColor 3px 5px, transparent 5px 10px),',
      '    linear-gradient(90deg, currentColor 0 10px, transparent 10px 20px);',
      '  background-size: 10px 2px, 10px 2px, 20px 2px;',
      '  background-position: 0 0, 0 4px, 0 8px;',
      '  background-repeat: repeat-x;',
      '}',
      /* ---------- 字体：拉丁走 Segoe UI（Windows 默认），汉字走宋（unicode-range 分段） ---------- */
      '@font-face{',
      '  font-family: "MZ Text"; font-display: swap;',
      '  src: local("Noto Serif SC"), local("Source Han Serif SC"), local("Songti SC");',
      '  unicode-range: U+2E80-9FFF, U+3000-303F, U+F900-FAFF, U+FF00-FFEF;',
      '}',
      '@font-face{',
      '  font-family: "MZ Text"; font-display: swap;',
      '  src: local("Segoe UI"), local("Segoe UI Variable Text"), local("Segoe UI Symbol");',
      '  unicode-range: U+0020-007E, U+00A0-024F, U+2000-206F;',
      '}',

      /* ---------- 深浅对比：分组标题提亮加粗，会话名压暗 ---------- */
      'body[data-mz-skin] [class*="groupSection"],',
      'body[data-mz-skin] [class*="groupTitle"]{',
      '  font-family: ' + UI_SANS + ' !important;',
      '  font-weight: 700 !important;',
      '  color: #f4fbf7 !important;',
      '  letter-spacing: .03em;',
      '}',
      'body[data-mz-skin] [class*="sessionRow"],',
      'body[data-mz-skin] [class*="sessionRow"] *{',
      '  font-family: ' + UI_SANS + ' !important;',
      '  color: rgba(230,242,236,0.46) !important;',
      '}',
      'body[data-mz-skin] [class*="sessionRow"][class*="selected"],',
      'body[data-mz-skin] [class*="sessionRow"][class*="selected"] *{',
      '  color: rgba(244,251,247,0.64) !important;',
      '}',
      'body[data-mz-skin] [class*="logoRow"],',
      'body[data-mz-skin] [class*="brandIdentity"],',
      'body[data-mz-skin] [class*="panelTitle"],',
      'body[data-mz-skin] [class*="treeBody"],',
      'body[data-mz-skin] [class*="regionArea"]{',
      '  font-family: ' + UI_SANS + ' !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="sessionRow"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="sessionRow"] *{ color: rgba(24,38,34,0.56) !important; }',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="sessionRow"][class*="selected"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="sessionRow"][class*="selected"] *{ color: rgba(16,30,26,0.90) !important; }',

      /* ---------- 品牌：龙首替鲸鱼，副标 HARNESS → XUANFANG ---------- */
      /* 徽记先被父级行高裁掉下半截，这里放开容器：不裁切 + 撑高 + 垂直居中 */
      'body[data-mz-skin] [class*="logoRow"],',
      'body[data-mz-skin] [class*="brandIdentity"],',
      'body[data-mz-skin] button[class*="brand"]{',
      '  overflow: visible !important;',
      '  height: auto !important; min-height: 44px !important;',
      '  align-items: center !important;',
      '  justify-content: flex-start !important;',
      '}',
      'body[data-mz-skin] [class*="brandMark"]{',
      '  width:44px !important; height:44px !important;',
      '  min-width:44px !important; min-height:44px !important;',
      '  flex: 0 0 44px !important;',
      '  margin: 0 6px 0 0 !important;',
      '  overflow: visible !important;',
      '  background: linear-gradient(160deg, #f4fbf7, #a9dccd) !important;',
      '  -webkit-mask: url(' + LOGO + ') center center / contain no-repeat;',
      '  mask: url(' + LOGO + ') center center / contain no-repeat;',
      '}',
      'body[data-mz-skin] [class*="brandMark"] > *{ display:none !important; }',
      'body[data-mz-skin] [class*="brandName"] svg{ display:none !important; }',
      /* 品牌按钮本身不描边：那个胶囊框正是御者说的「外面的长方形」 */
      'body[data-mz-skin] button[class*="brand"]{',
      '  box-shadow: none !important;',
      '  background: transparent !important;',
      '}',
      'body[data-mz-skin] [class*="brandName"]{',
      '  display:inline-flex !important; align-items:center; gap:7px;',
      '  font-family: ' + UI_SANS + ' !important;',
      '}',

      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="brandMark"]{',
      '  background: linear-gradient(160deg, #22332e, #48705f) !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] .mz-corner{ color: rgba(15,107,92,0.34); }',
      'body:not([data-ds-dark-theme])[data-mz-skin] .mz-vtext{ color: rgba(120,88,34,0.42); }',
      'body[data-mz-skin] [class*="brandName"]::after{',
      '  content:"XUANFANG";',
      '  font-size:11px; font-weight:700; letter-spacing:.10em; line-height:1;',
      '  padding:4px 8px 3px; border-radius:4px;',
      '  color:#04201b;',
      '  background: linear-gradient(160deg, #9ff0dc, #3fc9ad);',
      '  box-shadow: inset 0 0 0 1px rgba(224,192,112,0.45);',
      '}',

      /* ---------- 消息气泡：胶囊化，并去掉外层长方框 ---------- */
      'body[data-mz-skin] [class$="_bubble"],',
      'body[data-mz-skin] [class*="_bubble "]{',
      '  border-radius: 999px !important;',
      '}',
      /* CSS-module 类名带哈希尾巴（_bubble_1sgyj_1），只能子串匹配 */
      'body[data-mz-skin] [class*="_bubble"]{ border-radius: 999px !important; }',
      'body[data-mz-skin] [class*="flowItem"] [class*="_frame"],',
      'body[data-mz-skin] [class*="flowItem"] [class*="_Frame"]{',
      '  box-shadow: none !important;',
      '  border: 0 !important;',
      '  background: transparent !important;',
      '}',
      'body[data-mz-skin] [class*="attachmentRow"]{',
      '  border-radius: 999px !important;',
      '}',
      /* 插件页开关：关 = 墨色底青玉细线，开 = 墨绿玉色渐变。
         选择器带 button + [class*="card"] 前缀，压过通用的「卡内按钮透明」规则。
         关键是滑块（thumb）：开/关都做成白点，深色底上根本分不出。
         改成状态色——开是发绿光的玉球，关是暗下去的灰球，一眼可辨。 */
      'body[data-mz-skin] button[role="switch"],',
      'body[data-mz-skin] [class*="card"] button[role="switch"],',
      'body[data-mz-skin] button[class*="_switch"]{',
      '  background: rgba(10,22,20,0.86) !important;',
      '  background-image: none !important;',
      '  border-radius: 999px !important;',
      '  box-shadow: inset 0 0 0 1px rgba(127,232,210,0.26) !important;',
      '  transition: background .18s ease, box-shadow .18s ease;',
      '}',
      'body[data-mz-skin] button[role="switch"][aria-checked="true"],',
      'body[data-mz-skin] [class*="card"] button[role="switch"][aria-checked="true"]{',
      '  background: linear-gradient(160deg, #2fbfa3, #178b76 70%, #0f6f5d) !important;',
      '  box-shadow: inset 0 0 0 1px rgba(224,192,112,0.60), 0 0 14px -5px rgba(47,191,163,0.85) !important;',
      '}',
      /* 关：暗灰玉球，不抢眼。
         滑块在框架里是 ._thumb_1ik0f_33（一个 div，不是 span），
         背景默认 var(--dsw-alias-label-primary-foreground) 白点——
         所以按类名打，别按标签名。 */
      'body[data-mz-skin] [role="switch"] [class*="_thumb"],',
      'body[data-mz-skin] [class*="_switch"] [class*="_thumb"]{',
      '  background: radial-gradient(circle at 32% 26%, #3a544a, #1c2f28 70%, #0a1614) !important;',
      '  box-shadow: 0 0 0 1px rgba(0,0,0,0.55) !important;',
      '}',
      /* 开：亮玉色球 + 青玉辉光 —— 御者要的「墨绿」在这里。
         对比度再拉满：开态球心提亮到近白，辉光外扩，深底上一眼可辨。 */
      'body[data-mz-skin] [role="switch"][aria-checked="true"] [class*="_thumb"],',
      'body[data-mz-skin] [class*="_switch"][aria-checked="true"] [class*="_thumb"]{',
      '  background: radial-gradient(circle at 30% 24%, #f6fffb, #bff7e6 18%, #7fe8d2 42%, #2fbfa3 72%, #178b76) !important;',
      '  box-shadow: 0 0 0 1px rgba(6,26,22,0.30), 0 0 14px -3px rgba(47,191,163,0.95), 0 0 22px -8px rgba(127,232,210,0.80) !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] button[role="switch"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="card"] button[role="switch"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] button[class*="_switch"]{',
      '  background: rgba(226,235,229,0.92) !important;',
      '  box-shadow: inset 0 0 0 1px rgba(24,58,51,0.24) !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] button[role="switch"][aria-checked="true"],',
      'body:not([data-ds-dark-theme])[data-mz-skin] [class*="card"] button[role="switch"][aria-checked="true"]{',
      '  background: linear-gradient(160deg, #1aa88f, #0f6b5c) !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] button[role="switch"] > span{',
      '  background: #ffffff !important;',
      '}',
      'body:not([data-ds-dark-theme])[data-mz-skin] button[role="switch"][aria-checked="true"] > span{',
      '  background: #f7fffb !important;',
      '}',      /* 卡片里那枚「文件夹 + 抽屉」小控件不再自带胶囊边 */
      'body[data-mz-skin] [class*="attachmentRow"] [class*="_action"],',
      'body[data-mz-skin] [class*="attachmentRow"] [class*="_link"],',
      'body[data-mz-skin] [class*="deliverable"] [class*="_action"],',
      'body[data-mz-skin] [class*="deliverable"] [class*="_link"]{',
      '  border: 0 !important;',
      '  box-shadow: none !important;',
      '  background: transparent !important;',
      '}',
      'body[data-mz-skin] [class*="userRow"],',
      'body[data-mz-skin] [class*="flowItem"]{',
      '  background: transparent !important;',
      '  border: 0 !important;',
      '  box-shadow: none !important;',
      '  border-radius: 0 !important;',
      '}',
      'body[data-mz-skin] [class*="deliverable"] [class*="card"],',
      'body[data-mz-skin] [class*="deliverable"] [class*="Card"],',
      'body[data-mz-skin] [class*="deliverable"] [class*="button"],',
      'body[data-mz-skin] [class*="deliverable"] [class*="Button"]{',
      '  box-shadow: none !important;',
      '  border: 0 !important;',
      '  background: transparent !important;',
      '}',

      '@media (prefers-reduced-motion: reduce){ .mz-topline{ animation:none; } }'
    ].join('\n');

    var CREST_SVG = [
      '<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1">',
      '<path d="M11 1 L21 11 L11 21 L1 11 Z" opacity=".9"/>',
      '<circle cx="11" cy="11" r="3.2" opacity=".8"/>',
      '<path d="M11 5.5 V7.8 M11 14.2 V16.5 M5.5 11 H7.8 M14.2 11 H16.5" stroke-width=".8" opacity=".6"/>',
      '</svg>'
    ].join('');

    function ensureStyle() {
      var existing = document.querySelector('style[data-mz-skin]');
      if (existing) return existing;
      var el = document.createElement('style');
      el.setAttribute('data-mz-skin', 'mengzhou');
      el.textContent = CSS;
      document.head.appendChild(el);
      return el;
    }

    function buildVeil() {
      var veil = document.createElement('div');
      veil.className = 'mz-veil';
      veil.setAttribute('aria-hidden', 'true');
      veil.innerHTML =
        '<div class="mz-grain"></div>' +
        '<div class="mz-topline"></div>' +
        '<div class="mz-rail mz-rail--l"></div>' +
        '<div class="mz-rail mz-rail--r"></div>' +
        '<div class="mz-corner mz-corner--tl"><i></i></div>' +
        '<div class="mz-corner mz-corner--tr"><i></i></div>' +
        '<div class="mz-corner mz-corner--bl"><i></i></div>' +
        '<div class="mz-corner mz-corner--br"><i></i></div>' +
        '<div class="mz-dots mz-dots--tr"></div>' +
        '<div class="mz-dots mz-dots--bl"></div>' +
        '<div class="mz-vtext">歲主玄方</div>' +
        '<div class="mz-meander"></div>' +
        '<div class="mz-crest">' + CREST_SVG + '</div>';
      document.body.appendChild(veil);
      return veil;
    }

    function apply(ctx) {
      ctx.effect(function () {
        ensureStyle();
        document.body.setAttribute('data-mz-skin', 'mengzhou');
        return function () {
          document.body.removeAttribute('data-mz-skin');
          var el = document.querySelector('style[data-mz-skin]');
          if (el) el.remove();
        };
      }, 'mengzhou: skin stylesheet');

      ctx.effect(function () {
        var veil = buildVeil();
        return function () {
          veil.remove();
        };
      }, 'mengzhou: ornament layer');

      ctx.effect(function () {
        ctx.theme.overrideTokens('dsh-mengzhou-ui', TOKENS);
        var radii = {};
        Object.keys(RADII).forEach(function (k) {
          radii[k] = { light: RADII[k], dark: RADII[k] };
        });
        ctx.theme.overrideTokens('dsh-mengzhou-ui:geometry', radii);
        return function () {
          ctx.theme.overrideTokens('dsh-mengzhou-ui', {});
          ctx.theme.overrideTokens('dsh-mengzhou-ui:geometry', {});
        };
      }, 'mengzhou: token overrides');
    }

    var inject = ['theme'];

    exports.apply = apply;
    exports.inject = inject;
    exports.TOKENS = TOKENS;
    return module.exports;
  }
});
