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
    var SCENE_DARK = 'data:image/webp;base64,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EgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBGXcYdVhWvyxICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAj88JpMOJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAZSQK1+WJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJARl3GHVYVr8sSAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgI/PCaTDiQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgGUkCtfliQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEYoKgfNfliQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEgJASAkBICQEfgAAP7/iOgAB+t177Zk+t9nOl+/iX8ni2RTwMoF/JwlxXg/VpCAAAAACU3eHwAAAAIcABlallLv0AAAGmGgRzkQbE5ScBuBAPQvTpn/8CoK7mr3wC1MBOxFtK2JYESj/uDX6DYHX4L7duLqYSJbFLgHodoYc2H+nAQFyHMw4fkKhhtS2fOOTRn33ahIBpx+oUmcZbI3Xl69YUgCIqY4L92PB9H/ZKex6QZe1DmVN06dc6zNH9nf14AGNYks2WYqWMGO0HvyipI8Q4FRuFuPpowObB+PMBCxEgWu+JCBM3zmYczpLCXtLvwAczbWPFZXfhN9T6pymm92vScL7GhaMZB9QoMm3z4+zElKEBo6ec745Dy7dl0Jbtok/Ui1vyX4PvGUJlsWyASVRlAzQtnkMqgu2ZHtUKXd5Btm38JmyjuB4zcxnAw6Hog0MtWRpyHtPaqsxSD1mS4afzIESllL1hMh2Mn1NynE4q7VR+zdIABDY4HQQHsBKmXMirYcWRARNetrTAcB+qrB20GzB3cwM3SSSyAK3moWet6l02eGSH5zCIDZOgbGlArL+WlTqcWUUnEcNLBH6auWgAQUyOEPGg9hnKhnwHNXo0IQB93fTbmLNTb1KQzWhIIrmLdHeQ3QPJBz0oquLidjWZzQvjQaTNXFOgPyafolAqQ1V6buslwfBGk3IA4TQS1NTE9oXQAXoYb7fU1Be27na7kj9dpokgdp4mtPKkKXDZShG66/537uxKzWaW4V8vFE6azupYNCGXLZtMlrmoKbBLpcHuokf79oVd7vmjZ4wk/5tpwMWiWQZwgDVjgbuDpMMWX8qdk3WgFoL0NiguKg9u1yj/OjnmV8LJyUlJTd4QRbFtyRGNDh4ziKy7Ep53ViESsFJ0GfjU/trKS6mZrfyJyajJAdNjpCHTGvZgRlhpz7wBv0QFgxirzp4yOFR4fz9IEx2fQ89vCUarwvprM6oLfdUL/Red/GK7jshDPBEs9lPlHuTVD1ZykA1gjyjMhJxHse4PDY8eJ5qEvkdTyf9jzcAa2eZIuYOt3hh7wNOmJFJQAkPnGAqsr5WZeKKA7RfZzCCt8WRUbu2fal9DeMbpgB26GV6nGLkCo7y8bASzmeKO1KvSiczKSX7JW6MgzN+Ild3ga+B5ah1HjKggTH+Wx5EgNaZlc9v0ZnitIS9XtVJFoV+vheriLlhamPRMyMgDqTDS9nUBZToyL6B5668AX5CJ/6Cob7Afu7zHx9U2PbE2D8Sl5mDrUqwSC4V57XdSvrsZEfHzSVe5wTE38aDOAvRUbxxXNYgDG9TbsxR5ahtFtVg3iZ76kQV7bNDN0RciHynAYXkkDAucUFSPW18j2jI5wHu64SE3ck27unYbpAF29ELnaOJAd9otiJYNmHJ0rQT92IqKxe8+dN90B/k5MCpsTKMgq+EDvLPt269TtUKeE0F0vPWBJjSfpxl12j0f2kvaPE9CM6PDd/u8kmyVNcjt/wUzrUK36Bm5Tws+7l+6DQ5DwFcCPepgXJXq+dJFzQaYf3HbMGFbvoOW0/wlDkbhA/uGkLoimVD6uoutRLxtp8LB2qrRrilfwIUbMed97MatHx8c+1r0NkCkyLTy91S4ZzyYM1F/JJ8B9iNFAbL1Sbb9Vnoqd5FztOZk2xlJPINdT7P8yCKxy5JKYS4rjQ8j9Oeh2iTSiSM391LIGBUMi+hEFBV6QScp1zpQCUd49cyCsdfE+S5nxSVtbvqtYeSI/0zwbR6ToMM+dn/AxxBKe7Hmt6IA17ntuI1zoRfz4RQtBYQcez4g+CM8a/a2oK3JPgYyuni1/a8K8NDt+6ts+3oCEvw3z8k29bv3S9aKAKe4hNDCKDFM1njmWATOp5u203sKvQAjDQV6yFckdtYup2qEz6QmcckyO5Bat6PMfWCQxZi5Zb0+U+N37mSI5kmILs5ZZKSKj3pix6+aJ/XQEd4cWhHF/qNdbcCIeDBX1JNibeX46CPX3S5Cl4CJEftOoOpeAvN50c4h3R8y2c5nChhmuf85RNGN5IJCVAd3Woq3Yncf66iH/qjuOUe04Y2eAeFHuzZLgK42t84GT8XqgkCw+HzRml4G2gaJd07KCfXaD9wFKUUcXFO1OhKlMKTyDgOxWDpFprtl6pXA1O3THjhVCOdYGKcHf8dQKWhjxqwk2SaZxs9KtSeoduOuyQ8rAo3QlcM8xFqVqLfYHK8KdvwyBdDVYjYKsjEO2tSlT9RZDPB7kvd9sPVm2e2VF4MSGu/2Mnoh7k3Dpjvc3/QmkCtZwgHwXH7YwugtdTPm00fEyxMYkjFjqhkWQUSHVYyOQyzc3yZiLt4TFnGeZENT2rO4dj/nULIqBv/E7RsiKihFF9piWeeTdh/+m0oLwGEBl7Chb34/L9gsgb3zR/J2SGK4DZToidpAyeO0pQ1H4dAFYVqYNUx/Ge9wuwuB/yDYNyU4sZxWYrHdtl5+NwO1i4SJOz7YAbygS8bk+E3NPm0jzyPJZ+4owx3yimErXKoeFuvldwFXCEPrq4bTUP5FgvhMm/ZE4AE+93oYmtLqcMD1NZpP1bXEXDPLm6p2RHOa9KyiO1S6m4IKagcVB/epFM+NlQstdvnQ/gQuWqtOV6P0oHnijMfZY/B5y1LcKVmv1DDlcmpBuGfbKMPfeMraHHl2Rzx/FoHWpM7g8I8Xo43d7nlKh/1+WR4W+coZTTq+n6yRjz8tmSbmRQABRJ8J+KqunDgGzq7wjoIoC45yHsLQDXr9qBQerhzVjIpa5ureDUcfVT7X09yo2qp6yQa3g3PoCcbjP1RP60w7fTlVokQh/YfakzZ2U0bF/8qdjRNJhuh5pg/mfW4c4nLhN+EGLmP4V7zpacRxp1AIhA5Irv6jZwQwstHV+rj6feKtP9ThQS7ajGN8kbe6XcPKzs6A88FV4mSk3t/aKlmsgjvqWrfIENvnXlgFUPS+1Yv77I6DKKhJr4g+Lnt8vV+qVywRKAlWcMRsXAHgTVC8CUNWckouKqrOO3qvaydoOkZwJ9ncPa8EKGoUzC6vbz8bljl0WukRKGPPQ0zdYjK1fgAvPl/S0T4EI0ZfR62Z7Auk9xHQJuZ+yuNzAgjkqqNAdnlHyT3AbrH+JayTlNm0GpZzikQv0bVGQ86Qj1T0hNNLtj90racHLxr0z0aHptWwrbwW/FBHt1743/ALc+Q8YBTY4sw5g87vf7FtgiQk8o5fiEhUMf9rtzO6627dZcto60W6i9ptDkWgTjaLNZ12drgjSU9LIw1/ti5ZmfKVs0HlF9E/wte09twECbfhIRz3P4X+0brBcCdI6XyZBpYGlHsqkYAJxCEB7177OG7iX7WCUh9Pw5fLFYfYMIrAr4LqLWmcmlvmY+ACfZRajwdDasmiQT3VasYy79IxR7Hf1IuDeZPGvzTfd9PB2q1q3e9gvnoe87TK7DIOtcao+w6c5f+Kk2gKYn+q5hOLtLSaAkKEJFubRpCoy/UTWpvA3wjEioJjUzhp1DdHAWvMP0GjHq5oeojA7Z/gk9+1llkyzJdp4Hj0k370h90u79/Ldy/M0Xewv/AHUdSX+WWMnCN1JAdZEIFdiXmsWJ4x8VW5Ii37Gx7GrUUXmS1VkEl8fRD2OSjvaCksDOaOB37X6wz1qSPzHzfTONrFOnLirIYaof+vLMwfA1vjlYV91+iSH+CjmB+wYkVa0hkLX7DTXJ/qM4kdCmu2UxJJvRrcuDyWvbleJHBMpJiRSsSctGf8WFf8ajg8AKKoLP6VkCH89M4n+TKn/73Oo6/8/eSRoB6j4aoQpnSI1s4t7z2PlUe1kDLCRCl/5h2jF8x2Z/4wj9YKMNgiIqZ5MXihH0BpPO2FCoIYvJkTRHub2wU2hhubg/Y8yfojY4SDLQsYMgym6QiSDTmSfOpSExXH4y3mxw24grddafILtLO9CaFUqPmoc2HmswI1FCAQOFCfgPPut6plpE/Oe+2KuHewfc0wW+dlpfw8nQGSbKPovepc279rw4EkpVt6FEYuyLhOiCJdJJvCfRaqQCeJ09BlPO0m5+V2FvqCtua1clLX1oMCOG+YFpDJz/dYy+pdQJpV0AFD3JCWuHrXP2vfp6G3WdRUohLdumdKjXTfl2Dkyvm9FxQNSEUW4ssKYDEY2AvkTbG3rAIdFZyLletlEALxvrQ3JSjLguFJaOoNN4fLHNtXzuoGzyeZnw9edf9oDPiooo3U9QBkdQxuIEWqymTScqfGcBAPz+vfAVtJ/R/v9ZYNCowbE0k0G7dH8YJN+l1sQi9VEYWlbVpidgoF+c8gRcpxiiGmBk457oY6KjvLrmANrAPeuBVEK+pKOEiXaTcsWHTDc4IWIusZoztcOMJKjgI42RLS9q4/MB+xFcVLbKI0EFIVUjqtQNixVI5CmmsMTg8BnSZnjddQrlsukOmUB/I2twhmX7790+enzvLsS9+XKeUS4dcKdujzvh4EVkS8fXmd1n+5M7kLfn5jgF93Xf6vKVS4l/WzRwyAkD5AmU9Og9h5Q7S84TtRuvG8hQuHBet0iBxZzp9srMAc18XQ6HGOSbRrGT2WAzgNxhraPjmAikTWCQKDsclBS0/ik8JqSH/oBjRi0ASibrFlxlNUOJ2HtTlr83uQNnanbahoANgMwsxXhZQ44TdKQrv7KWFJnzMby8KyPKKniLdURQlY6rerIx3aWAX8jH7GLHro/i8KIpq50u20R7Kvlx+Ln5qaHCuc/a39eoB1+dh1aZ/j1Crp75p3HCTf6aBpWWrMbxCr+85qyIjhxJJ13h1kU9dxhFsoTircq7Z1anFX1XcNhTIWfb7MUbZNoxhzhYUvB7PKe2e3xnYOOiy1TzIZomQXsDJKAOGLC4b/isRiqqimdSEEnQb7pHLfUyKMB2P62Del+NzwuJHfhnmfb/PYkr+ZUCJD+ofon5zVACKDoKicum1Kq7w+eAVqdARqlINvcfWAmzDi5xvjgx65LKfb5H5mL4L1Osf9uLQdcxT0lDoPlrAmfmuzk5E/lZIixNeTigQvXDevotdn2C/Zql5jWICYS9YcD/+vvO6P1eZOWkEMGnYeIpcodUDOruA6RS1txtSNkNx6Un2j3Ppt027t/gZzAUNNbfRG60IdNQr0RS2goI9ppWrcVOD/bLR9OZRATkQQhqr6b5VfF9n215862ImFFGKZK2lTRp/qLnPf64EsNNKSgAgtoIXunyXAiwZSB46G2vIHrR7o1+pZ+RrXnh7/gKIECyxDtaRgs24Ue8OcUYZkuhilsywYphjw+6KtZkS8qPBlAr31OzYMZVoo9jyYbCkW68+0AZ3jlRy/haCn8hpiqO/EqQ/BTFEC+e/7HDbfmf+hc8Ca8lZL3dSe+HwstnfoMkbMSXprDaF1bhVvR2AW4T2SPmNCa9qR1He+BnYlxw6Olo4pIGJ20Xj/PzowzxhdtuO4OpVvGXBBx3JW6pNUciQF0Ttmpkx9oL051R/GFstAyNmPGbD0hTrvrMgCebJiilVVpv5AfrrbktXpIAjmByR3LeqUgK00hDmLKXFXAQpFSkTEEh4tL+UYttcpjcsYcZopkHz8q9xJGjcHuc67o0L1iFusfRZT7JAToyIUXq3Qx/HP2KnBWz/2OUbfQi0xTvNKKAEZOB8cOyPQiGonhAmdV/RVyouUZiAOfgXh2917KNKT3clhd7RgKRd8Q4yxmPU0eTwmQw+khTa9s0+iQcKzfYBORfu0uic5/c3/wFTNi+gmGpiwrjfX8opnHKhBLTeeDztYTIjjBP08JFbh0VI4JmrfvNa7dSDYdT/AvK9Zog4CH0JiA1lEWHVEi0S0Ti711ezS+iQrCpHgiNQ+7Nwa5/DIypNYycjRjlvb4hBAIw90DwHsMVowuI2BinjfPlFzk7oFARlof2Kco7tZe8bZElOd/yC46q8RdAa20vb2tb3Qb7TXYW4jjGL597svsOBpOuMOZ/+n11epy2s9Pjni6E27CF1bNx9bZyBWSRIDnGQwI9HXV79P9J8cse7bCMwM28rHVYQwG/oaQ1/URZMtMmd0xrGbMHiy9FLwKQ1kZe53ac+wWm9Dqp+OLa9qepr9XTWdLycPj4UORYYNUQcQdkADv1Tjt92NNgZc0ijRTrE3tqaIBtNeSc2S6NLDx7guc0kXmDKx+SrdtXD/gm6ZR98dp94GFyIux+HAbzzrG+s5RehLnYPdupUnPWtuTLqmaxFTpSEAynXlcpXyrYyxeZRPNPSP4I2/jXN7W2EOLi8HUSzyFq75WHTfrCleyLKSUZKQf6/o13UpXQ2nh75EAZXvScErUiV5Yol5XlkJF3+X0tGsT7DK6zDYXN1Pce/hwxZK9ELjSDYiX2/QGQrqMSicS7STY4GJ1jA3qbAw90mg8ULmSgaXOaaiJelH8KPqaQG/oiQIpiR3RqpsfqSDKMn/7yvXGGC1tfr+qorhr4hwB8tlbAAZcPL4b0iwAM4jbLh7j7z/4llGL8Hl98VdkYUAyiOPQmB62PWyps/TOSXhvlfIfpe7iaepkfznsmIJQnyhOPwPjRovhIpeSxArRQEs4qoWibjWTMwfmWJKKxz9woL5w59GcCf4ZvxYUYlAX6bJm01myqcLwjtcs+2XtFfZSd8v4SJ08uja/o2gH5Y33bKoEE3FPyqXfKwfHrQj55RvGSp6NdjSYlNZFyNkbn7OZ4TP902P49T1DCvs4wXeMT5Jr5z474rxBFyQiRAvBW5U8tMv9+k6x2PaTU0qP3bQ024UgngY/dhPNK5nUsjLCCcU42SJ3voyCKuIL4FKwEzQjyQGwnuQNebBukLrUGIdiQ02JYegwDkLcj5zpL1rCemgvOK7GYAjilqvsxsJD4LnToolfSI6Pg21IoI7j7X3wCbrt70GpnT6bbMMNHD3DVRTjOyDrsyF7zQ7l7zThXkY2rE7/8UR9Uzw6kYuc5/wvqbrmJmGbIgjuR76bnAHs+pLjBm5kfsFYdDgi2KIaKSDD2XEfttkguv6CrqfH6/87XF5RGBFdFdG0UtrGnr4Px09JfsxyjpV4ax3b/ihj8CetnZR5wPSbXqMgua7v6WxAmylreJrKAkS6maaKM/JwrSBAVn5HKL6GKgVH7zU6f4vtBATdg/LPzz+KD2v7nbIpGtDDrUo9igQp0uIGl6JRC571d0tIcMwjJMJlZGPFcyUMMhMXKIYKJiEcQIS55O2HWbihQ3xnZ+0x5vd4aopLkuSeI2E8JWu6JIXb79gIdElbG59ZcJ36wS5elFsBIljs69+kYSnCREOj8cU493F9KpLnCYWikwVju1fBpkzPyQ9vQ3y6fcPILPFjGMfUORlTU7UTzTUekPzvLW+B0u+ZAa+AXUOA/v4tIRjPgAfG6s2YdUL/D4rcwWTokwUI+KmwIUDTp9FEL6QDs/lWRjtpg3SUtPFIpddT5ZwOVE9V3/PxJ/8a0JzPbttTBM9pJihCeQUDvXMdKWNevg8z6Ct+C5s+UbA040elJenjtDN7GJmxRs0oHXygQ/6oFiYVgpILgUXSJlsen1CawXDn9fbRELa1Bx8b6h0z1zCHi105qeugU/MWHQqRiRYAG0EcIhAhimS5eW6LAvp6fxBteNTQfjXZfxhn8PAAA65cObdelF1EJK0YvM6IOG5LQPQBYSwROS00b0M/nGm+AghX8VDIBiXXwG8qaxuH3ZQhcfKJtFTYuH2AYjlwCvrg4rcQGuYyuUusaLB7S7l1wPZxzA83x0rRt9xP2EJL47ujw1LBDUB27P6lDW1qFHZHhoKLw9awIfCe6eth7aoQVj7MYVpuZ6Zm55DRFWfhXsbe71s7U+TlbPlKGFLUdBfl8DsGQpnw32bBdl7XL8hcfXhqt6BE+rVIs/UUuKswyaci7Q4XVt39QpJIfg6irdv4DbZ+akOpP6V4eLhoXdMOu7xGEoeLgMhmksKYqgwGDxY3IEIH51XYKj5TFQlO4JPSFAXmekLnsHHMSK5SLrJEMw+QWRJ6SbbX5ItPgp/49tva3LlH54KKbbNHFmQlysjdFCDkOlxDhwjyvro8qKDla/9RvRAGfdAdFFBPDn9I6RO1t3U7nOSJw1FBQcvvpLeDHx6MqGikMYbuhUfQ7i/IesdEfNz3o7Z2YuhM7iR8CE6ccX6JsAJVPW2k6AcvHjnV6XQO/n3r1hlGNW5Lkr+ILT2Ym2WB+pDlEf76E/IecIs7it/rwDcdPLyWAUVZDHNukk8+J0iNfHIVAnLCNAgVwO02LwoZ45cMO73luDAHwrS3R+iMcd7r+lSZH1Sf2HuBF0Q6jqoTK29NkKXGJAsfZP2zWM09JnyGg2FCOlGr/+6fCqMKzJ96GfLU3RpVxAPiefr6iAxLlmMvRLF2dlkMsRB3FyA0eEvADbezeeArxw++S80nItmI6dzS7LBM086byvtburcM7PmHAaR6gr3Zb2gcOUYRldp6J0ou1HYFL8n0oSgDBaQ2hSbXRIb3VFBjtkhfCp7qaTqAQEIDaiqbEsajK6AO57qt2x6fnPziaDYCvgv5Pc/6GhlSGZqymPXyCURI9AsnUlX2f/WC361MWspq6N0/aGvyyUPabt6bF3AaGjKi1n5Wt/O1yJfBpWjuilH73bytrrOg0KlliO5qmd2Qp2mbAg5QwLNPk79AO5e7s1EoZEz2uJzoybtza9Zjq0aWqyCVemhrN0hPW4fgtkZ71kxBYl7EupvcpImcVbXNQHvkl1QyB5J0NwkygyJpvDZk6jBZBD729nl58usELC2VDX6hzkM1SFI+VBRtm3WmnTQCALQHSg2ePigHT+WkogUFCJ6h6I33rY/MuwtJUVlGJo5yTzIdD8akjWS05qOBuGD27+meqMMZYuhjrps3pPryNVTVCMm0kmt9749zHMBNC3c8a55v1DVjoEqNsA/Acf1BGB/2iWpv6i3unQhoiAFuPUpjCAIlHtRNASNmuJfZrIxn+o9zSCG9TltBcD3wgiJZr/jC2MkwtYgnST+JPgD45WiINNUgvSMVMyRX+X3vK62gcuCGC9u0O6kDAOIrwQNVEAKBLfxInA5muN5jatQxUiPRM4yo67+o4SxN1Gb1kB5brb+9UdRnSVsVlr8+/7JHZeO5Eb/S4c88hMc3Rk8cKqbM3dZX3FlmxiAynW3HeeSnHVCnf6KNTSbJZ6A9wGudgJSz2O8kHIQNZlbvKOvZ+zsQT1fRQsFa02uAWn7z7RisTNlqMHCVUbJja/8wNdQJ2Z3zCLmeYc+K0GtnSHhs5rDQodlVmIiuP+xX5+WLxR1mGVPE7OsnCths5fGemQMn7eGiZusdWR+2n3NiXLcRvv8QAh5xsrCSY27ETddUz9elyrqRR+0RU36c/Kqi10ydy5jU48NkVyUCURN7+jL9eTv7xYbCDVTjokUVzBqT2/8jJs9axUA+OfuoM0I3FcXjZl36iYTdMtOzq6wVPHKAaE2BfWnX8xmkbAAZhcF98JqvDnfCQZP86I+MmPVHNhWvAYDNKotD2i6GkNcDdDI06T+Q6L3Wrq4jxjZPsiZJPhAE3/1Hdkt9Et5k4OGJnA8FR6M/aXSJEIinq1IWp/FEvyyXeQg9t31vqP6CRJpje0QOcQhXnkpSJ+FJFl9ithfBrAC1J/lWCNgl/YfPOmmDApKD9iS7zFlSneNssb29ul0+GAnpeRDgIEGdBOE54FX0rU695oKgFav1dAKq/PdhxfEatbdMm6kF3vj7YYo/uwUaD4s34TiKpVAG2tTL3x9QP8otEsGx/XY5hVStY64UYoaxsAJChJk+757JaG57tGez4lWAd69/S+0JbPtFCUNpPJBX3hoQEVic6oi4e/iAdBI5kQny4VDPU4npMXceFToIW0YTq4hCP7oD3LDoAPaO4vGXim1Jm+9GuK7B0jcdBpV6iMGmVCa7onGFcmE25vdbONDqsRNjz4ajxRwwi4vGnrk25aoHFx3pHlJnHO689IfWOGebrxQCUnArjYIBLJrQ/YOrjxPFIBQUy1GxUdtVWzmM69uaPXIJAcUeJErn3VR8E+XqhvhHcHGslkP3/XE5xESZ1OTbCSazU8tz2SWr9OjqNOzr155w1rGQ6+W0npjWpEudYGmxupMznYJOd+BY1kBVMdAFWflQjzlLRcHShc29CNlEWIjpxsBiDB5NhtQyUIYtu8lEdLUwxB3Bu3rujdEc9IoNgHNsWlYYdjS61KUhSuaZrT9SBXGf9YULBCFct2kdKpoodkSwO7mI8lxAnMGKkzUPLPmJmZel++xCjwL/cL2izwnDY34jdEvaZa1AHyTeS27mNPspNjp/vTBzVElerw5IrnwVbCULJlx/gSJbAneZLe3/9auSTBo57ZhWi/if+BQOA/9yPWRU65euFBNq7IufJSxiwWo/iMmk7SbSI53OGMTZ4+kw2NWDSMJfCNxxm8GFNLs40dzVLC8UtpxZhCuYspBKITcwl4jswJPmS/ynh87zEuQvwAyCicoakXKC9d9w7y5j8x5C4RBn9wbd3ZgfqnRFUzuJSFKdHSOGmzQte2DznLtKaDaSKVjW8P5l4ohFjeATCAu6zbPvVxjJd4KKpdLAG30arw1evq0KdKXQ41mXr5hhP+D+3pp+coMMhhRlpL0x3PkjproTsYxIqTsC+hU4ODWqO22kK1ybywfjEeS9edpFEJWjr3Hof+OW++CV3fcIgK3I0a74e+bMTG+FfMvbieorSOhPDnxXmK/C5SVaSIvhhEs43mH0rsmooR8NLQq77PYaTe1GWbfH6OuJbYG3NPGzQ2kYWC+bBTuZDwobu7R0wY/V6Q47kXFmgUvIhWtl5DliUpsRDyjYW4PWxQb6uV+CP5KKNKTAxei2cpoV/6n0LWuy7RUKQ4kAsEcmDtscl1gqlobSVcAdZfUyj+X6olc9twc4KTnEoX+TdzcRYHdGXKvu9lDor8TGmof4Z8zMJsJ0ViDGThDUEWBJHzCUElhWfhUzxaykOCLKlBIxlBQ5HiA6dnTQy6z6jeVX5qJVqv4XDn7S9fnTcgIfFKSr2fqI6TxxIMPHxciGCltLQBjIhDEkXXlGKscU3N9nsNtvbXNuXxXDGDzyjwxcoSRLdp3uZJ+5fwv77bQi2+v4SI++VZddAnn3RczbGeO/5lJYS8CtNHpBDpjgo4iOvUgmdedXNourA0QAGh/2bPKbMiuiSFSsQNs5hHqXEH/c+f0U3ePLJdJ9lb/0N0amTsev0+t15TWvu2q6YN4Yu9iYdSh6MWAPBNsXXPZyEPz+1DmIC8GALaRmsEcqI8GZN8Kyy8ksShXvoxch8Qq0jPMxcxkDVifmXZSZXZck06lvM81MBu9PjNke512wvY7E1hd7Cj0GbGcZE7ljAkgnO5UQAp7G0aPsC8EvuYTsewnxdLcnq57G7lJefWl2pRXIiByfkXyW/s1mphhS1CJHUY8hPF5vphJYu2Y9pVd+4LEFwt0FbCWvE7Fuk9+aV5lbvDscZZYnUNTm14B76zWyCpxTSMLyoJ3zZ80G4w+dtv5puL8KS217SOao+1Ku3pOWx4okYR9CKoZlwWKCUE0nklE+ipbh56mSkUfud4OaYOQz5x7xZKmfE+DDBseUoppBRx/EcCiHz27XxzD7HDJkUu7bWo+D7uLRvyUGbmn+ntBX0FWq69g2xZoUXyV3laR1qrfBLxbquq/PwJ1+eg+NxX7WCz5t5GjNvN+iJpf3QAU5T1PcXjw5hUnS6fgME86afFh8lwt4TeERnPoi5UrDSckrs6K2ausF6kUTuHjkB7sI4g5Rh4/t1GWWazvz72d0MdWI0aK2M9lv6NqTDETFqhCFu9sHIH/S20ntsvCnMTnOhuDWzdfRWX20Pu0yWu6pNjgfw8IkBcEsYpbJefdRVmbZds8hMG3TfUoyo3dPoUBJiUTofIxp0HTF8Ixm68iP4ow/gWqm8vNH+ZE8ei/pzviqntWsYgM3pVXtCQ9ByJgGPDPbhbJNdWs5aso2YNcKkNwM2eKOrUFJyDHoRyMGeQGMIfM3rZqcCDMLiecXBXZJH9ARMoUYLBzkh12p2rM/Lla/IhBU9xR7ONrXyACHj4nLl68HPnsJFJsHmtuGZSi+gO+3OrFdCteFgWzGGPQZAGZU/VHHISMl3pWf17pqpczDj24T6iZNUBMXxIQRLtEWhCCpZBRm0qjvx4L+M6a/VLGoh1S3FvfAn2ViPQlLQm1p+O5Uc3N2ibnoX2jmRTkXAd3VHh9HNWjrpuO/bPF7W71EkBQax9wgmBo/HELkLCYj6TsbXi2maiAUs4VMNsyhmIzQwfLEsthCDJaW0jiIGqMOwYHK46rbJ3qbyx0qdQOHH7/TIwqHkyZ+OpAfco9oUDOnMIkiEidbpC1PSBHSJ4p0uESHGG+r9NaBNKPuQhMYrI6Hk65PuitZOiPgfejAbkOjJauKcHQ4sxNZ+VmBLlg0n3IxcX58i4LXUsRbBUeCS7fsPB4gszctDCDuW9e9r4VqqEetVuPxP3f/yoYDb9+vylgABGWoXDKVNbkzhhT80aMranC3GqbaF2VdhHIy0DFL0PqaYwcE7q+pbtBuQZuEUesZCNJ2qE2oKy5Q4K2x7cT3bJNdPbPbL3/6mf/Zx67rQyK63kBC1tBznjQrdjooqyiP8mRi9Nc/L0tNRZei+GuJN7991a4VIPWkYAG4parFqYmUlw/q9cQyyxWLixaCMsUN/ZeWUpcx80BKF4XlxN2RkjyvFp2wTF4OIolf+QV0muZz8rwrp4tRnZXkC3ox/E64we3ZBucHom7BUOHY9Z4BOCpX9Pt/DyTT3xedYoCYa6GwbM5ba3twMPP5eOaWNi274BetKo3dhIFwBwc2vlzMoRpeaAcXJcMOPNYgTh89sEYyEljMlAIO1PXV5CSkkoy6ZRRi0/Ev0vlaKBq0byKoGC6A5p4gQmaGlQl3KKnRjtBicKHgjD7NJUb8MLd03KJukwCneP5Qkk0lgwLRgNk/oLwaOWAIR3QHUXeKyF8t9+jNUs5I3BbiU4SwLvuSdIQiZUwkhvzR0CWcfaXW5lc/0XKlA6oHNh53G//6D8r8HE3fofhflK8APuTmVBv/agtSnjGeXFe7HW9HVZMAj7MJqtAx1+H8eHzIvSFrRP9pj3/NKTlFbiZZqP/lzLVn1z9CYCFCjvkdG+ByaqW0wArQd0OjMpn3H72Q6q41Rry97GxqDeC3FZaTL21+C8J7EGDlMd3s1tRoh50tzzsUqnnLLmowfFAT7PaEpD5XSgu/v5exx/7HwrQkeuA5JzxcAqjwrzYI+aOUcVvlLfUAJeNauG4Su69Zs/6mlkEb5qNL9Hpuv1qf1zMk4ANpSNHzEjqlr5I8/iRPw+Q1YDe6pd0jFWsUczMmrKtouq55KgndbfzwYk2iHMoqdZgwBJPn2aZ0tdrkrXCB4DKFGZwWRULXHL4Yx3L8nreWthnbn3uV1WykppxZ/YHUU4xU9U+Qmm9w0XHJUPnYm4iCTDvQDihrbjd47XdoU64SrXZTCbxkMCxvRgFqLgG31OuGASvQY9/hvuSWY83eNZ+fKSGoxnU9mwL9VKsmlgofIRCC0jWclww35o/D8dQGeBt2kCNasqLhy9juelIGPRIlHxAbGxVCAAvZ3CJ8DT8WqbrIkMi57BI0vPS6E45FOcHdmDZhcXpITxnTAdCQsibkqzGW4EgtXNfbhNf6FGlkn5Cpblrlcpecfse2LT/ZeL6IaoJBXoi5LVAt2KrF0zAvxR155SdPoJLMzTA8hfzgD/n7kAmCwP6AYKtJiWmBlhUtnalq+gnutNM+8DaciQWo4gP+7bn2U8AOISNTrSxCn8BfOzdej2hZeRuO/HlASdgVPIWGQXx/IJGNs3F3LdiLCvztO/uAdhmDz4z7cOdYnKkNGTzZT6OFfpDvWCPZPwwiG1p08chojUNgbqsoMkgBwHs3FZafOpozsMaDj1QiPmQUp7ApRRsFtPZbbJlufLSkpbame427dJnQSJ/NIJL0dpx0Dvc5gYOaQYPnRywCdFeaCesjCpkrhXzoz4epsya1tXEXBnIon3+tLUMvQjU3uRIL8555umme/pRg1mPXN35CoyaCnyk43F4dRtMVSS8083+VWm2FsyELxvUxpS7AAW9I+m/hWy4XWQ/V6RstLdEFePL3qXfYIbKUEwkXHfwhyldehzsi9wa7VJ97EiTK2pEaPXm8L84dxGprqxvkF36m+epEQvxvI84QGsELACDQ7swZYauJQOEYFSXe/ic/eTMDXa9QI/m3TDgSpZCQj3BdTQwM7eTgKIKkCpNQmaayBfIVi6c0oCkHrKj2qz5biMZer0q+hP0bB44VUpaZYWtlpVd10tv+zURdJO5Pog9sumFK00JJjuvsZsFftyLqJFF8qlWL5OeeX4Ksg9h5s/lg9rKRODK+HzRFRSNL4Ce+m4get8Hf/GwFfH69K2KBD32wU/EWoyL3vyGwgrp7P7M95Ls5ctqOM/RB5g+9xzby4UNK/xmjONY23dEx8+DmfjY//qLs46U0+YwCW+9256Z9fVw1XIzR8DHubBdpAq+LoK1F3S4L+72gHPaZWVjAbL32ClEAcTwwINnv8M6YXB6FmEzAtkx3LLjqlwP3OvCR0hHMd68jad8L6r6aimPTBdLrXvusT7NIdp+qN3wYPktAgyqk3OPSQO3WOOTWLrC/yxD6gAgocIDtHsJjTAiVHD4Z0NFc8i91DEg9L5j1UseRNlCIqHLXB0MULKPQ0K++k9rkTeb8mluelaX/yzDGDMvihml1sOEESxbSs65jfsRR0GumoVpgq7lIURVWqTIf3IQiVa6BHDTIC+2DJqX1eF7VYhJlbbbisqzaI9BX0sGEIqgsaRWZQeONsSdYurBRCvnoLATCJuFQ7peSAolmWo+yNPZbAO98e4FpR7Lg7RhUpbFpv00xDDdt16CH233APWKVDy7r1M3err5Vult4IQ0Ew3nYRtsMX8Fla6k5p37x/1oVQciyLcR2MO2sX5lztHPJcaf3nqAQOaalC89p561Kri0lbpHALIZeXVGKk1iPcPMappG4rfFZsx5UDU2AAJYDuhL29Y25BvKTRm/QUPnu68UMQ4Uhyo0IOw8BrMvyw1eM8bo2PANz1iSA7HGrQekZ5SFnQ4X33v1lakK0Gxg75fXg/JsswIXCxzUd23XnCvza5ktmtR0wZYxR4jDr12U2XwnVffDw+sUl0Dj5dwDxvQv4Z5MmiRmFHsJUfyQiGEdwn272siq5CquhduAX0Tb38QmriXgK9pReeieJJEts++fQt5EF5iy8203ITFV8IcC2xkNSetMECSrKmvRxJoQliB0gViNs2DhQzJVUvkVKgwhNedkqRl0k/DiwSb0vpD6w7sWYoFEzoyc6u42sUu5xkzBgrCYN3pVV94oB8ThA0a/Iidec/zNKpzxx+CF10w0p3ubH/ztQXDcFxU0qz3lyOHIA2qGcu1XKkrzNYOPjkUS7AcD6rWg2LiTX+OM0xWgnt4n3RyUi4UteaOxwPV5zFnI/ZlYYYtxZMF86hWmTmWxkZu6r2J5B7jix9yvoklWlM5luDpTPmhWQcqvrT41c5FJtTqmfrxW7sri9CDG+/aHKb66FznZnv/1ppEvcrTJnO1WoApQJHOdK2aLuPm6NS44mFNU/7IICJGJVMpQKhEGuOR8n19JwnXGTHd8MqRixxl40UMmsb/80PXvwFxZ5Ve/y4m3AbiMhpb8qGNpalJ3CNQOJXM9K3cKl4lmsB0hjDiObHooaOpNcyMOdl8qRq1gijzzjnJ4Eer7XVB7YKQto+PKLDbvC8Q6Z+7XhlBJmLu9JU/wq5Uv4QMwblWp39UmAqzy6e7IVyC49TyNkwSD6DRnRVR+bwClKcluoan3hVTn5wXhBqu9hCDpQBiHHhQ0Y0vAa4gh5SNsfRcTjhjJ8U3v4QbQ7c1xJQg+ZlTwv1gz3pBSyWqz419Eahs/ijB2DmpBKFtF8OLi6BeLME0p0Axj1Q7FOA1pw1VbXiAH5WA347EoWK0AZkRHMBcv14uP+69xzMZ+5ych4EAbfy/7KSLa70Y1Oq34Ad/In3OFnwG0V12mUxWxajfpDWETkgW279qPzBigO1v0Pzsl2NB22Tx0lBvzNG55T+TbofFy3yBg6OS5T92SB24x3z0K4nm6yZcKwBGc/zSOEkzRTgHx+joieKPnvrGLDdzgn3/Zy38qwbZGiI3R4BDPrKo6f0ygK/Hv+pmiol/Gcfb+HOWT3lHl9rgNqsx/cXKPlmnBBtorq9znFttdC21JYLKXms4DqDaFcIbpOMcJBv636I97U9reDGhje2rCGDbZeKqGlfrLGO7RgmlDJiAyuMpy8zLkt5RaQrBkJk1qE3FDasdr3CsaMUMqZ9RJeChw1AuLi8/KYzeOJaUJFC79x5wSyvgKbmYUbzcUSxrGlzWed+c9y2PhcbTgld6x2xuOKm1q9/6/qw/w4WdHxTAxqyVOWP3XFNIddXRAV2s25adc8LhO/TBbhktZcytuOSQLAsHeeroZveTUi0UT7R9Sce82RtY3EWBUlcUxlHd6rV75B3ttiJ4nbzlVZbTSuwRTVIv2W47Qo1R9pvYgQAKr4pYf3xqkuUqgW9BXv5RPbSntkPUiN2WQMsOft374smr+nfgKm19KxCCeyY0LgVNcuac++FhdiYxRrGjbv3UqftYmoEoPsRiSQmyKHmfcvCWMg2cjPX6Husf0odsqZ0Vh8zcT/vaMoYO+M8OfbiQbpDrmM+xcPwi0RC2exJ+aQwZPcTiJ/D6kCPbJ8LIme+3UMOtmVHQbRTp7T2meR48ypBYZ5k20p6geFzEc2PRzytVy9+piQO3/CfjIgAPxxZTaPdyJ+AN3sIX2Pvdn3+QHbm//Q/8i7nHxvIyp4TjR/9h8sbPcYibM+LyjC99h3bxE6dlrrDP+gOKw/O9nECCewAQ4dy5/ZK1x2waJiJ2SIApt6hX66DUmirOpBGzOFxMmO7gcyCU9g/HkukfWI5D43yhFE44P9xIKGVPK341vAuTGlCqeUKGSqmuERnnPffk9O/FIbH9+uIAiAFUsnlcW+Nk5BYthxn8U9kukPeAMGhrrA9iXwRo/pQnTcn7eFzAG3VqO0CiCErLDms5Xe4hDp1/Ekx6HQoawCB4YAiE55NPKOJrUBMIAFFOCCOvgt81jsSVXtEKMvyVjCX+uHX794XdIsKmUeBI1MuveipnxoW6vchvVsXvANxPsMcSnb6phjXKEoHy6e7CAKDJdq4+JThUUhg9lOlHE2Jb1LbKcDdGzCO5XZXE7Rln01ZLOTcNUQAceqCe67Jzh4IFTD5CfkSdog5Gkb+EG26goTiX+CL5gtI5QwYeniByur3hnOLqsSA7HgeAKVieQHy5WWmXiVECUnOYv2m/N1Y72k28Wh7Ox0QN63eSzYMptNWH1BPoEhdo7x0ANRx1Tm/+zltdCtT5ujUU5vTsqjZ5ZeoQGU3TAtWVF5L6mWNTGQ2ObRW1zQt0BQd9+dQxYEoHRxWauz6uvI9WL4y//8NILtFzAOPE2W/F0Po0OHZrVEOWFbFycHRH7OwvpYnhEsrDQePPZ+Bs0JswTQqn6VddBhW070ASjwVYMDc13/Uhv5Ssh1UjYXtb3Q9aafdtM8OCHSQ+xnP78GpstQwf9jVCTKBrn/nsEZu4mPmT/l0QFIuJVXYt7uDUoP0zGFun3L9lsD7OvjXfRkKrt4sJZsgO0SlcqhU+jd+wS99a89s/6R52QT1+EE1o+nxbSu9WOArBEZWOMzxUegyUtu5rYYZamCOrfZ8plglwT/vHXI9qbGlsznbCaA5wWkl+Q/7UznRClMWHtxpGnvZ8cNXj9L8STTLKiCBszMJBemjVUF0R2v/pSDeUB4VSczT4CLDKSBj9PAK50bt7HjQuTdDJ9KvL54noeebNrwpv1j2fKPpQnv98xLXLnZg9HUrN0JtNtgqgzVeTpymvxCIFypubKFkD029rBUqNwXp0NGkio61FebY4m3ECX4yGfB82hV0Vai3WVW8zNEvaWNkFiqAAZRYIWh55g+bEsmi8sDzuLzLWUsAbMw9o/9yobloajWuVvHdIYfOumnkV+kJzRgpTyJm+doUFwqQqZzGold1j7/FdAnbWdM1pWmFb61HBT+keEZJy9U589XJFsuYf4DRKQKgZjgpxjx02qUAKVfFs/TkTaftntLGLjFxi+/2yzkMDhCqWmyX89Df4vyWhkaFapGPoyadpd2isJuK3l7NFrA+juZ/+wgq7T+EtSfOeuDcBk/18C0+N2ada8jZREu/siIqHe47yPeQ7mBfr/WfpFrfe0FGRPdMr9V0BMx6h2NYEGs5KNrjTA8lVTIdSh+p7lsk0P19fWJkO0I97GrIQOe0m8zL3FJCmHXyG83/0C+LJKTAudnFEJ58HnJeETjmTNbtjIgYcfZfapIvqQIrqp6we8WF2uOMVAJKOX/u6P5keufM2mBrTay/C6ZvPvnY1y5xoD9Va9OgKkW7IQ7jlm1YZkdHmFdWuIcFLtwtVkgljXvhh0NRzoaZoy0GREDE7E48wPHC6wEb5hZi3/6GP5+HW929qLBg0+YSl5pDZjNREi/oFN7li23I6vUafCdNgSOkWfl+345OSnTh3wq8yLMR3Ycs4wKSnnVQPcqO1qcj9Dr3CuCNdI5D34vCa/+cTYK1MPsRxGZERrL8TjzS5zo4DxfCXX+vN+xLxajVYv205qcZQdE8sZ+RGCY49xvsbAxmVoo+PNQaGSwxJhTzgF+bwcEu0JLgPdGS69qykAnB5qNGjnvUGEBIoVzZqVe0vfUXcVdtbyWY8Xr+4RvZVoAjByFIH2hzzCed4EK3wqb7TwaLtl2kymytguser+3sHXRr/B0PdYwLYP2dD+w1J7l3FJGYvrHXNZwrGlS/24x4mippA015jVWhWLMKAVEg/FULqWIPxHoFCUisdAc1AWBcnYi197AHJAp8EmcCPvGxhJBVU48ENmnELnznPehLFaqSdeLtoH2Q7z4yFVC73lwSJjvBbaJW2r2WJEil/zTPNHBLdNs5K8rY88cF5OGxtyUzqcz35doTNymmvsk1c8V1fzABpWoGgwCw9Xau1YuhXPcStPbiDh24+cf4W90YCn7lQMOpTKZU+6IvdFtPuZYH2iP5gXfOM48rUMmTIwnwa6l7lD2uIiTFV2pyw4tDOyhyBhkdUShBZe56eyTC3DMDahoxDOtZkTcvxaKpNUMDQrRH1J50kzWJAPfduUluk7c9+I1h7OfBb8I2u4zplnoRKju7++dqjPbCGf1MillK4UPl+iQmMHkak2U2sv8RGx8Z4Lq1F093FNQZVzbYLwbvsqSEPe0bYQ2q9LgxnYV0xz9b7jhQqhgSpvPgep3OoZDLdla7gmhflBLIhNPMMGNR5jCzSKpdSBAvzkGifanjElIjoxAUUS8ssIr23BCIUr4R5AggKBHEO/DazV2ipO4Wmy0UkIQcZu3f33a76t8vrjzm3Lnms9cE6dAkzC14Mfp73yfnHiS8o36Icpn/9S8Z53IrUT0uOaEAaozD0ZvhzUlzKxyJKNrFqcXySltUfgdstoZZgS3bF3ppcSoz7NjRbKfNsbRlJNUCc3WJpDizuclw4dx9p/yzUdTEfN/s+7jIJR+Bo8ClRt0b8AY0KTyDMXIoPiHnhmpLZwOHn2/fKVtrx2VdbXbH+7j5SAMPsEIMIPnelhY69gI84GhXL6OamMmY18sgfzNPRmnM7ZPMy0wbly7hFVvtBePtY3UOCMWkZ08rGc9k9eJrOX2gLSu6HHCgeu9YiS5hGKvxCI9Fvv0Bnvd0wCP8euUI4Nv+3lJj8L+uOMu3Q7DwDJAQavkolE7SlPZpNVAYXqaSooiKi7kFq0w/BeQXN7tzoRK/CEmBEDNcnyBbw1AmrqhGngtJKFDpB2p81TT5bNoTMQ3pmqp1OPsZVYjcIy9MLbfUS4O1MkQIWZxXAjBsDyEiFC+tO0mvmxDmE+eyIibrSCeWj1O3c9ffI9dfwiGoQcHToKLsQVNgQNV5iNNIceGc27vld8NULs4jV1uw+xWdVnH4C7I8/iP7YbLOlL6QsN6KNxINZukQdTyOxbrjvkdbX82UhJftoQClfL1LsNYMNCTBD2rFhnbjl+GxsFYXfthiiJ3ZsvBjrzIlfr+bwdREE9RnR+buHNunZQKV6MVxkmyS4RrvrSbMWgC+0NEXgbXKA3Dfala5FlvVmcDQvMPPniipR47wgpm+DYmHTfYWJ7kr2UY/CXifwFZGtgzp6x+Xvt7tZ4hTSA/x+dU8xo7Trc72nzwhpgQ2qT6I/swuF5z7xTVznkwTmOKj8zMkw3uCYLbG3d7FQ+KshDj4w9wskpS0Z0jzhNI6SnraD+TpZ+CVrSP2/Q7pq1SEPpzuzY3g0hDwgHZvWZ+7xYXhGhUKXiDR2ERi5Vs7zm+CRYWYVPplVxjBUsdtD9Tqqokca9NAmLC/RNQ7KBfxdOvv212MbJxsuVkYCrNBCMZ6JshPJfW8rsNRrSyHB34Wahp4BENv3O/3xHuFzKYbrhu40Lqo6Q9NHvYo3kE19YXjyDxbSK8FyP4E2MEsV8WPk2Y+sBZ81O1EHSJ7pbWlO8jnKT48VrCs28kOZz4A8Bo4xU+hpZ8DwPezsPp7kE8lyIDWZEo28MZjRTyXnAonUddqsLHfmez+Lnknz7yBNymAEg5dELEzB/IxPAjkhcU2NhA/2aqsGmWKSPeVQy7r9N35klTjPU+wFbXYvZx/9EhqtUf04rAdN2pUGcKSHQ5mpz9FwxltPn1Q8gvP7mFLPQvo+EdGRO/5lJHLlPoxOKajcGwHkS/VMmX9TjfSc1gh0td6nfK1u5ZAiqyeGnWVeCe3NUCufKWbFe3B2eyoK+8hnaNFEs7eQYf4Mxs8ac+kEv2Lx5HTa0BIuMzUABcI4tEuEg1XIBLno/j4Tjph15MP5+tOMhsM3C26PkeCKvN1CmC7Ro60v3OjG6qWv/XhcoeiWQuUVNXzRfftrOb7gbOmGjpWwYSF6LPv0Co33qLT/fFuwgd//Lzs4Uxtij/mWZ7BXte2cNuMux8QIYgecMuQjajOWQ3gHSBeDC85siCKUZeH+Fj3l6dh32HIJBbIZ9Kzu47zGNpUlMx+uE5pclVKEBImDWJyKiWPkI2mpYtaq2NfnoFZ0zjiNkMvKsfBp4TsLIV64a4tN6GnVG+hSDluDJYZCA72EEFj/lXBzds+9HIqt+mQjBuWj8cwPUthFstYAMWqN+dTlJjwYpfT5dEsH+AIFWw8RPW9+z5m6by2McKC23jCsWM7RBJjy2SevLonng4LMkY9YqiPdL3j8ql4wARejEUZqqh6RKwqrUYafZhlhVlrqNdZsZ37nUdvYg5toLJBlR1TP3GowCPro8de1s1kwD1t6s4qol4GW7hf0Iu3U/bJE6APFhzCKPwYxdzTFSPvTyA1gvkFnV34Rwzi9dyFyNmWDLAIBRKqQOYCYSEOjoQO53p8apHPJqB/bZONCvBGhnW4ks+inJbqJ4DgpZL4W11SFnllPBKueeIXSPKBvD+9s++kv2UZ0z3yl0A622cEh/eUesdCu7Q4u5Xw/OcyYuC/50z9QQzrPkaHjOd/wVZQfiG5izwkYtBRdtskyt14OtBx7CXIN/X6HYPV/rNHL9P8vTbML7yW2YjlvabHOTVEDvrL5IbxPjKjCHhfU0IWcxeUsF1hd/qHbNJEC7YA9DLUZSczx45iGynjzdlJOSOPVqtDoA4xzNgD42CNZlOktheA//Fua41sZ6zi7OsVY5vTejyuodKfSg9GprbNa4dWgwzccqsc2hfzc1i2ymAmmRaVutSSBo866lmaFyEULCTE3j6PEj3g92wvvCO8DiM2hDf+5RC0zDb6A03OJXwsno9JGtkdCirSwLaaVZ/qjVNxWXg23Advf2nh9i1WDH9fmL+hi4qMs4DmfjnIKwin60ycMOJ9UMhFE5TLcLbEWNRXIr2IiAWqRaHO/04GK8AXrsT+hnM8zbRbZyl4rFwAsgArEm7VLIpp53VKl4JOYRz+AJUVBbIIxAXjpoh4NIlKWJSPIU38drmFE4J0Jt+yHVyXmIqtj7FoWTSZmGWLRVdC4XArKO/tPsHoGfR/cmonLKp2D2P0Ugocw14/nGK/J6+3eUrUDQp4vht/yk8GcftYc9KK0NDEHWA61YdsOeWCBYJzLGycmxsaV+pntU9NvEyEfSs10AGPblWDFhiw6brkioNdmaAV9ArmOviu3CCv8+kyb0xGxZfCDu2VEdbsyy/o5MnNT7hBVo0wC2VKfEl+txvvZ+ghb7jQWWA1BJk5GWVedN8ZQtgsgn8qaRu11JzVKqRe1ozdTVi+m+IFE5IA/Hxq8k7m+q4kXv2l4wjUIq2O1DR42kRW17C3bOFwCpp/z/KpCRijNWEEZQ6hC2jU/1nSbYo4nJU46ww0KBH1InhvDLAmlRgcg0w1iX4zxComwE+fiB02ixRTPbQT1mwvYL73HbDu+d45ovYBOh7sL+6kPP+L+gyi38ZL52eyMEPl3Lwr0ZHzwPPqJVFrROfozLwsGIbSBYdRNSrGQ1Ahu+y+FsNkRFeRKpAje/U+c/WShB2y6T8YvVCCLJ8ryGz7RI2cLJvG/gIs7Vre1i0MqTfiWQPxFnxft4jKZxOU8RcONZ8B6CKk2iPWcX5zO0xWFP1uAHTOH0zwgFH+x/xJlrCCVxOlYumRIegj52YxTtY1pQ/IQNVjGBf6lNrWq1am0hF+kxmn36tkZQxdjaPTluGFJkYpo3PAyzMNUwuc0194uKX6sSKktOvBdprjrVrD4/C6++ETDfWguWhss02xbhxCahqXKiMGxoI/NpfffRArhpIzDh+KIabThXD12ON6eIWdxxuB4AbuUpN3h51JchV3zrfKoVnGxpyV9kc+wQVsys4fvSoOs4sY45BNZFNc2FCB6NPwg83/cddGjs3uS8Eb4x42MM+vN/RhzjeWPPenR3R7S+q4Z0K0wl54660WXdv4l0JEzqq5paWutqNyDWfwpBt2MzMWC3FXaGjDJVi42Bts6JRwFTQB7g8J/J7X/xkbUfqpZsexE9s2Y05jKYeD92z1u0gNr7kDGz9TZ+MfgA65qF7opYA2edMPnu9/Cnk6cT4pS4m22a+7DZktEcieDD9L7nmLITXNLP4DXHwujgwJyeEuxxx89sx00m5vom0zmgO4B65JFDrJmocXPo1BJrJImbD/5QVSPiNKGmRjvE6Hv9FYW5V9ohP6rdT4P2ZqBRkKgc1Ic8ndu7Jktu4W3DatxTjf4HCGoJKSkzDulrGli6DNnJwZm3Yk+bGof2rNmEZcTz2X+xQ8vFxbqDDsINfYtQUgyfzDQgW5ozsFEiAE454c3fokDMTLDxC2QRQdtqU6QDM+3h8kpWB98F6EIh8Ha1sckQEZXoonSDs6di8YeIRaM+/TqemA2ICqV5rotIKwwsExvakqfxTjqk9W4Q9ncxhktVzFCu3Ot9jQ4M7Zmx4CdUHycPaYvVeJOuvQka0RrWMnKLu9F4Q/tHg9XtpALhDKu6UrYqIx1tshyjmbXmQMp9UVvjkF5YCfSwEUX4YB7USbSjp6L6ElermQgPtMSrJUi9eUZ8I2cdTaskkw+ocsrO7uv0tLkOyAvCKbYYuf5yrbZOLM1qD+ORcYoTOIKie1RLaQyKn+Lb5dP18ckOvPKd8o65Pn0+nKexfr/2Jj+DsRT5+Ed2CUGre71UIUXlrh2KbK5UMQDXI5Pcd8qnJi0CL6Kmc8a6hbudevGaEz7HD0cMW41TRJ0e4eSSR2/0zpQyiDY1PaWnVI1yoysSSGFg9NesEDh7T5FZx2sLyfLVQnmAzVdOQu1aWzmF4zraDqdc+5ffuUJwj0kGabdzqh+swUdxeoG1/z5yF0FwtLIW0mZpYHyox7wcV0/UOz7OhzqY4PwLj7J3d+kIIG8N/T22DhV092nAj8IJ0tucdMpnljbPZes5lyYiUOc3ZoGXMogO4Q2xWMIpnxFHntM8ZfbGGYPjXMYsMnjHCvZEDX7avyvRosnddXLtX1MqTDDhTlWwzJOwia53NdfODdE6In0gPqFbMMBdFhFVhwbZBXJSIx3TlpgAk+nAve3eRk0yqHtsHiCtc/Ys43jI5DZWKGY5ImJo35VHfHruQ0wJz2xdMVzMWv7jliq5FnN+m0sBEBf5KfeFBqKShpcjP0lyYdaB3VY9QwzjGmB57R26SlizpZ6fgF/2wnuSpCmE/c1k9aDMBzV8cw1JdQgU9IUFtZkBUaWEa5+vO4iQO0tz3U2Vm5+66Z60lNZTd5nuGlWULiQZDPdGTqg0xGR1hNlOXxrEpSp+mJS+Fx4I4GUyBEqFMsl/pUtdnDu/W2sSFk+JfbyTmutaCYcX+P5MlL6fTmw0lKazv1BVVNOZUcEGwVSNZu4QBjF8JOmHwfTo1XykcwiJtaC6KseTwz4aLqBQUkj9EAApJ+cGjOOIdFFYD2OXcyHuq9i0CDN8UrOD1s0xZu9GonyIdLJNPehtp7oE5vrruhpx1rZSz1qbcEihEAvB0ZgJOaTSQoDwTC98zcKNo8suhzG5ww+ae54t2/dfZIt4etBZfxmopo8AcNVKSqHXo1GMnekpKAC2nJbr2+atTHhL0Jt2OzOIuUugmcn0wFxjzOkvgJ2BPxYJa5RIAtYMyY8aGNxKbHtfavLaNSzzsfYwKh2hfuKjKlQQmDKAU4Z1eXqf5GlNDezjblA7LkpoOQA/BslvaqTDbGdBCF/huApHM6Sz0JNDSHuVG+1+r3P/FWsHJ0hE3Dp+pJ05ZCTdntqku4zCwvjEQG8j7fm/4KtqjCT6Mw1nqtGwyenhqq0MxDaKBdiHWlHyAyVKHo70EVoBO0RUWq98QhsU7idA0HQqBcNRqdPDqqPPKvhpZGiUTF7JB2leBpQsLnGkd16SjNmJatDI8vcSJWCNNtcizN7jSE+gdrOJLWKmtZrU//l1dKbu/6ka1XbrQ0JH3BXeq1dijRI6HxEmWhNRFuwn7iMK9HgE/hR0+kPHl15muo7g8pfud+i8h2dWhC47pDOlTo4AWg4V+XYctSACh99xTV49QOqIA0J7aAgga+PYFA6J5fFcWFuSBj2p2Oo0/y6cTPyp6y7nKfpxFKoZ/kSiO+8H1cq0cQOQ/TydC8FaKwuPeum8oNDkPMSYbYQWRfJ1CqzRiP2p8paW+TcpmGsiCuKiYQAtoB53ypH9xofhHBwsy8eaqT3kIGv+38RPGoKmwW0IRIPCudyFM2Pzkam8Sm6BVXFubAolR+yFOmKhgvgdCsenIIALz9AFbdPtncQZgW6eDTOwXZrgRM0GPRCIfoDyeW9yHQMtBeTPzG895WwQJFPtE/6ET+kD8a8LlyihWo7TC5SZCLA2iNhDJjh7ymw1fsi9wcxNjOfX7H0FnBRribbPmiGuJAZiFdVYqKv3i49YOqs84b8pIH+G89on+r0PqQYJMGjupIS6XISkwzjNC6y28s+y1OHeosmOMM1PkvBmOVAnW8BGBF+bs8KjFrs5U6EKnscBjKNq4q1JST7lQCE31SRDivNczKwOFfON5yKEPgQILRwLfcb1e+0TIs6tFK2DaP8Dv5fJIX4VpCZL1RHruR2hjot5MhbuDQQpAvaLfjTywxRAaBbZA6R0MIb0bz4W7dFgRqaSEZb91CG5IhoeJMdpW20siwDtoOMuzoBjHiFgCLTyVgwjL4dn6f2zZXTURVjv3NKT+ReXUHsJ5osH6W1PnRtuxZLOvzNWRqtwSiqftaC9cOujsZwMkhGUdgpvyzlovRVvTXPExgmZFj9hvqeGu4RWshaLYK2W+uMKzG+xU1FTXRPUz1z2n5niXcFieQ10W/pUoD3pBJZGIhhqqMEInnCIvEWuJncbSfe4AuFXrlpL1dTUODdkOoJSYfoJzO2kSJhFanap6Jmws7KjKHV3unx437A5ZHZoCA1s5PBt7UIsguNYsJI2N8/u24cQVtaeHPpfIpFYCRG1/GbZjLgPBqvB34Kzw39/vRq6gmTuLhTxdxoFo7CdbkIvb1JJ/wyGer4KvQoq12ETLgpcVBcUGu2U/FVPioi33DhoRiU89WCXW4BL8Lmfg9NHzaErl8BjMve6EzQORNBTS5x6x0w44NUqGzry24s7vxIef64y1AWjfjh0mlMEtqr79jvo/0oHQBqPeKl+AV52jM2/1P3Rtt/oNKg9E6+zjzT5rygbsFjOVMPCU8NIiyqz/1m9cX6Z9v/cI2+Eo42TXg9Y5rZ1mp9mvKXJn5FOvxgB/glri0GOn9cZHHqgMD+7ihP5uLXQ11HlK8DHXn3VHqFYmFAGxyg/mRlBea40VNkvoaji3BQlVTF7fhDJhakinxvxNyIHHQtIQCTesEu3m92UqAIH80Qvzfmv6dAQGZY7plYG1RwYqrUUfFnWnpJPEsd6yt1zf7iKrQfMSbU16HPA7h86PG2dW2aUMFURIHbsoEX33kvkvCi4Qi0zO+wYauauDsU6HWBaKrIqtl5cGKwqkPkDRxSFkZt2C+QCU+69nOLzQE9YwPUBmZna8bg9vvPyOdW5G2cB+WNxXGJ0eXQ3vW+ohnx6Zrj5dPiIn1ZOB5MYfnIYKmtxTnLFnyjVG3YlmDpJD62lxzh1UcBNJjki06dlSV04Axb8w59SOhC/UmpPvuxPLgNQ+GXKKzBIo9IfN+rKRE6Z/qdaKj291Ead6SHFZYvjMGlBfJUiogBymg94su3j8SRJHt9pTemKsP2wWxRzP8EFVNXTQe23Dcc+zzjO/aIulLDOOODiPzk1+LWX8XMBj0sUM63+JaEJ3Yt/BcSSYP0yngf0NxXi1NSUnTBcWvRu1buc3VFuMKwKM0bbCPZl+KXz6hn3V6T9Hdk7COp4V694z4FzKI94v9o7W5pHdMEU/Z3JWyj40ZMdi82VpT86MZnkYi6L09824fDDC4x7mSjLisar1VIk83pjgJOV8KSpBXtOdtSaxkUO6/opfjn1ASwxx3LHV54BXKnNsOiuGPxhQFXzwxO6NRqZmwPH2dCfIuLwqcsSODrbihw0b86q1NF9u3cpifwnQHnZ++fty/Oj1U4mI4EuK3UAAg5sbVGXugYKvIuQTZ2F4KKdebT+YC7AQNRcKRoETcWSuZK7eD12BeCpSmcfXG0Pzt9mmucft9U2Acm1gepzwdi44kuGwR4X2dax92Q6vkIeNG6J6gDIbSVk1VL7jtBk3RdGiKD47klfJO48cDPK76Q9OL5POP1GMLktuDZf2TklRD1CosrefvtuM9vyLL0VDek9D9sYS4VZkDCtmX8UZjPQNq4FRxp+iS1eCNrXEFCwuimORCOOxjp3AOknuxKWZCoU2RcB/RKwApXpJ5WFZkIms+pmx7E29DYeYEVDP7KVZWKhK/IFDQw08igvk8wf2FF5caKUN4zpgbw9JvtkPKo914GgHX0jPpp0zO6OIHeNXOaP9XtBvd4D6n8lZl1jzZ9O/igThLWUF3jw7yisco5F7Ejq/y/bue5WEj42D7sGS0+hbYdEbPa0tC2Wggcxhk/aSUo8hCi7nK680gZ5sqAco0+aJ82l+HXysDshi6zHTu9e/L5YqkDku4gRJfB2PlpidXmwUXcWFYJnAuPo2I1M5QN9/pCWIZb4D0u/esisT3RdbNuZO9L2UO8OXfGY3DXo7tUem4Nyg0tNmx3tfN7L69IObXC6sefoIfGgi+gjGWF6NzwnMMMRa5KUo+XEbLWKV6dBzL5doDRW8VxMsovl77z4fomrGFzz28ijB/njzTsrkeCAlGtJmWB+1X3Qzqmk1QgC9K2AkTuoyoH0IPlJhSLzJEBX7eq0gZgesK6OVws+R/X+ygXwQVLXnEYwzUDKihavwgmNW29aYVkmU9ODvHQ8sXlkKfgkqW5B4vOq/BfzCQj41cLXRds0Or389qzOBxdWN6wJzrXE4XpHoSRT0IpnLBGlNdKtZl6aslpqkc07oAwhbWgQVqq0F8hyFwl9JidXtahajGUhSzM8hwdxSMRWE30CT/rcAspn6tkXfV1QqxWRujb9LfhPMRZ1mfM1mkl2Upv5guAP7535qSIAz7PR/gqhvECK42CgPvUd2/ZDjoA/zf8OyamQRCX8eh3VSvLLYkINU42yJUj4ALRydubcBsaf/qaEvwhgmAifj+OHB+7JDjc6qFkTkSyEotC9CopXS6ayN1zmTndE9toSYq8IKTFiBLxhnUAPweRLLPUMESDfOtv03rClbvMhF4+Z07W086diHS/eeeHOu+9uRm7e/PY7dxvAFH/VRglJ0lNk7xs4PzLjGQwm4A9qGsBhI1EWgZWJNjFikUmXhE6sweKqlm3bLBakj1YgovdXHGQIz3VBPQ3dLcDqbyFpcISCU2wY7I2szIpkM+1NAGWV+FOScb2I+jxtcP3WyI4pibaCSLIbyWbkIKMhsRU00LX/eyYEBJy5BMn+BRyGDlhYxdz8RS4HSwryQKK5+V+oItW73oAiTLwKnuWmJIMQBfil7g/03CE9he/3ayOFI7CX3UtzWRFnhea/MqgUJ/cuGyvVNaTas5XwKUHusZWuZ2fgntMXEo2J7IX/J6SlDQP1I3USuZMI2kiWkUP2rl5NSuD+bf+Xb+1AsJ5g4xpb7VUVjnQSgJOjXW0vtHPribkVo19B3oQ9V+sn/uHAhMg3AENEnVWM9lbQujYkE53tPRKyftUoVOOxQrBnV4BnIlIztlVUycoIJMjriI4EB5yY4JIAzZLRSF+IlPNmGgL0vTcIQ+q31D2teZ4/3OF6FmK8S9AN67NTsZjx92ZIb5Wb2q+BOcNJiz3D4D0pBIyqBs7YdVT3J3j1LRWa0BbaQO4QhNlYK4cnMY37FPmB323R1koy0Q6HvPuthdxsNBlWCndfpGCK07LqcvRWRhI89R0MPM46v+p1GRintQ2r7KnjnWZaAbc3D1+mLeknYkyxpcmI2VnGcJKJkbFRQRAkQt5QQQRT0zmsIbnvaibBr2DHvP0lTxNA16Reax8KsZJ8cbiPIJ/RMmjge2Oe1MrViVaNufTZAmyO3Fiwa5e+gpGB+CcyErSuEWKaSd0sF9CeOQ/60yXCr68Tkrn2Ge6GgK9r6Ln5nfzyHyotCrIMoNT1avGly5k5LKWIWNFm6OsQZcz5aTaBaEF0jPC32Ia1sLRxTFrJW0d2x+Xbekxp8WijqCgyXr0Pja2aSCk1+CJPliLax5SkPKv8ki9qDxrgPEkePD0zD0jg0HlfM8ilEwMe3HsZwTatqAGow2ebVnd+RcdxoCcU0uJh7kVzHVCFMLgcVodAJeVupVMmxuDdgbK69rlNjO2/jHQTIKAx4LQjl8wDPVKlSTS/ow4shpMJiAMk2EqJYNDCosyz7G3NLx2ZdcF8YR51+rx+CV56Jgie0YRO2YH7R+9+eDiMJ9/zDcvhgZ8PBGDGq/FoinmNQKF6Yb0k3OGfDOSe5Z8ATVUDdCMJpGFGjzyyfTKQdi+DUOcmYgUIG3QItDTr56NNbbjipPq7FbypkshsZXyOrbQx8/kCPr/kfghZeeFywZN0aZ5hh2CDpz14KQLrsZcQqw1kVJJtrgWOSY8P0LKMdp6b1paFUsMVmOr2onBQ+IJ0zq934mQSMq5Q5d1XwbvKmbv6CmzSo4GPfhk62cUXYkZ8uzs8Y9/k9YldmooWAS0very8jFqFMUYs1M6ruzP9ewN7FQME0mRFuR3ZoETZF9TEGmStw9oX4NV46T58sVvUSEIntYk1Wewek/fyDUDJeCjCv9yPrTHD5uFDCY1HFc/E1WuFOwOK2y7yEmDFh1PfjW/bL/BQhV2QLH82HSpVWk4TvncMVfLoBztt5uVR61QZl39pzN3X2MjgSv2fGW6XTtAYL0vvctkMSwCo469D9KwXL6PBwL/O2+b9TM6GP5nteSOaKTf6CHBa2k/VEgSc8mRI0eZ3Voes3anEOWtpMysgSLCejqGHlDkJCPxJHwij2E4RPNFxmPs6EP2SGwJ58J9bMUsBJ5WWfEbasJ+ZWYy/9ArQN6BNNd0w59e3e0ow5xpT0zW2ssKfhIHJypNMbhcxz9lbMBHtRfnghznkgLhM4sQX0RqQI5n2EQVPWttC4oOB1TtAszmSzDP83lnzEm68qWTJnaUc1iIfbnpwTmC1zQD6WMQ2iMfWKQh05xKB0nEauZBfO7dwjRf8lGNe+LlNQLu33lVepgWeCQeIJvg67YXmDJvxP8H+EP/G71UT8/23hP/cvcPQ5JUxFCEyq29Jv91GxXHTC1Wc2mG57B0t6uuPZERY4m/IqKCOeMmIV90oHmW/c5k17ZQsdbSlhgVC8fBpYgSV+g3Gq+t5gu1xA/8eoe38+WfFvYscYEt4a0lHDl1TvrpTRnDrHIMmt3W1zPCZ4G4FelefxbywAXkKmQ0p46fJ3jzeaSd+xYoLrHHUqkLXJti77ERLXrZeJzQLuDdEoi3CVxgXhFBl0dL3QYgwFDvEWzaIpyGqFtOLxUByBRqAsPyAz341VZXGHkMk5CV4g/bFEtrED+Bkk2S8jONTGqPfoPucz9IgH9jKUBSmU7UdSUTgCG/H9z4N9GxnArL6qkpfx5uBeQP81Zxk72Qu25qT4uqPG02hiAXCZvcC0fZ/DDiC4iTxzRCd/ibudyxYzKm2TqiYBo+/YU0iRYWom0YVpSrsVQbURF2mbBTAoKV8qRDg9SS9R0zP05GSVkaWerv3X2NIVJO2I7KZ6gEBKSQQiO2WxPkZa5M3Te0yuRBsSvQFSubIL/hLeoYoHBOz9LkDop2tVcVKXlpyJXLKJ4IK8X/KLXs+uvuxyW5LOhIBeFoYDbqxasdZWF+19M5YutkA+pHv7BVFdLbdV/o8xEeMZE/0Q8P/vIq948n/qHxh8XPC1ApzR6vnfmALUOwRzJh0Iz7KCzpwxabTFEOYWge5oB91CPL7qNlk2QftCIlCd8T/o89lKvX7reErrYM5fjPBdEx1I6hrHdtf3LTaOQmmQyu2MMQQOP0onToo5SBHNavNTMJKcOx2tGXdsTHrsmzJHilmQo0CkqqGhKYsnOaZD5Jl8JtvtaZic6pg1Ju37UFCjjwhiq1zGHZ5pgIMISBHEAYkIy7kMnBeennMt0bkhRauvxqkEnMaETtGm86B+8vVRmgUPr3gFGeGvoLt8ily52z2vaJp1RBYUPgbYZ2kMiZN+eFmwC63fLavAEGV7xq1vVvJ92669SlGqZZBRX2OoTXYLaVUANk/67ij62shQIVpnQst+mJrNgGatreE0r3pC1xoKZ1fdMmjNGKo7hqJVvzLD/E5hJ9Vc+5PDN1sSySJ0mtQ4DXacT4H9vUoddf5WSPKOYecWSxY1YeYrBrjdvggqRMkIc1qWYuWG89vDOxoLuo/Hb9aVOYiJgBthqyTrjhfo6TY2rBQXS6IUeqYEEX65zukDD2v+ZbnL3+QaDRxK2gGDR8+3NU/IEX3E+6B2eCvuviPzn10fEr0n1ohr4UMEZdwqe6In8nBiBsQxvcwk7l9mKWzgWpUTEdVysW1z2MdPT+xoSWpAT+MVHYGtSuRYCX3gm+Un4TBQ9e/uWMhYTK8Xg3Jv3hIRpoz7wfmvOu7XztCFYLw1ai/O46+QG01WpoNZ9V+fqgh33he/p9C6ao8g3SLUPPkYYkjwVc52lnYyTCe4RPlzv4apatjqz6PfPYX+fmHu1urmJzGyoKQqK5s2AkOFOLxcXacjYTMHA16oLGk9wpqWT3tqQdVHEARSn7z3mVQtGpOgEQkH+0vmabfRr71BlhLnVWAjXP9ig4WtwO+pr1TgnErJnRcF7UA+vOUY+0JbuRVQGN60R4WmW3XEhpOq8DSwSkihb5304k6VJfw+lQq6lif/AiLrvIlYPzerz52LX+3dCWbRFCfcI7NA6jarmsZ56QywplutG4SJdzfov1zNiJv7mzOqEI4pjuCAb7tTzHAew6Xui0hg60DzvE0zaw7xMg46CGchmnhkeI+dE46/nBfxnMQILJEUhAfwiC60VmXqq23IG7x9VRZ8Ug6LuCDy/KKSH08EoI5L89R8uMF4RFMaXmLAf0F2M4XW68HWIz82B5mDff7ql8HNWUxvKLvuCCzxmORWOt0Zi7rOvx0BNMpu4HQ0rkEEsipUf8reKctKpt89j0UqNXoEYxDiMoaHOb8DP8e4/57qaFdFgwT9H/e90yZU3YWg9ne0SojZE+1k4af4GYvpit4tfVAe65mjTr+aeHdLl6fpZv8PDZHUU8n+rMynV2jd7hb/sM+hGYKRbgHiQtLXeRRgYsAJzzgIu9Xb997tmxtyhl1YbY4+rMBSDkZZUOLDo1WD5mbyUo1D4v2kyXIZitfESHatYNHcFpqxjPzLaKTAYeB7I8VL93Ycy9Gm3kHGx5I2XF+NLix+qttvR0Unk5JlHRempnesaigW99yjwoqWKxhkSjfC1HnP9IH7xEaab8lrXQcsoEnsOZMhwy3htpxgw0AqSVTxolJiWDgRICTdi8NQjKFIHIgpk8Gu+LG5t8xzTc7ivmnK5jdr7792PwacwbvAU+0dK4+DNlfA/JMwma6P413Xx3WCEwXyXcMifABri0Z01E9seYOD/H1SMNJui1+KRij6U/0fQMupUo6a7Z2+UaHYUFXiGk3UyqQFGqGMxqahd43haV6NJR0rTH54ZAm7fC3amE5cm6huiifphYI0K9aS63dIwsQy6rWxIVipEsw1nogvp+oSjDfwQ6A2mnc9fPOavmaHL3f7gnS+2DW35JUsat51qEhMqU9RkYbr97eDgXyqcuXW2G+w/6tq+v1bkVeYZo6E0KKiWX3vbGanI4f4xoOYfquDNR3UB7sraRnm0q+ttahI7INS3E79wNnTv9UYzK/ff+kaH4NQTe6xN7u0PH3arYb2fwWMVgW5WYEdnZUE4ltTvqTluwIaQ1OeZNqJlTLmxmlit2dUUhpmbp5n8BSuVNppiTaycB21KQnF18/lN9Q36Hk/74qbfp6b4ojKARLnURFuE4P+U+2kyJVTpJ4S0DsO2+TGA0ktEWlG7If0mALBSQE/qP9x4O/bI+QchhX6Wjr9//aNNOhR85xhbB9lNDGlcppGRjJHAoylptm1xPUJE7NrKvAH4HUiWWSeYVC7uHlSAR3m9EXQIzHIWX55nVB5IhH42+6gp/cixYrn1DBK7KosQEXuG4rW6k89C03/RfwauuCGfwllRjkmpLJ5xq/wSayfAy1TfZuhs7ZhgTX31grlwuStJfHAMm6s7wImAHONNLYSVBRaIBuJVS8gGuAII85qpCW5MFlJnv2qZ/W3+3cUaBWum1jP/3ueau3HvqPW0vWP66zlREt/bs3nuZ5NmVjrPYtnKca27h2aQuzSEPg0S6WZUU94d2aqL2w//aJKgbNyy0GK3YzWlANq2soW+5iJCXYmq6f7KyQCTZhNhHHPJLKqpy0pTiGgqYfcOMoRZUS95ewOYZJg3JJjnyTh4aWCGo2qgampTFz70xbs06WGd4i+EnkWJ7Nr4gToE2vHCvuX0k74sCsUNi1FEi/MViycWozzNU0n2COUiDKoViKhbCIanb41bRXGWfWEz18tWK9wHXcAKoSIjdPX3xFID2L0yUKLomFFKLp85OjZQK06nLJhzWfMQYJO5KUTyXoImhjRfjJHjCuaxGbF0tYGNm+CiNh38pwAeiQVQBH0l4dBpTrn4Eh/YYds47ffwGi7CXZsUIfkqGBmJ/vzTB8xJv4+CMb2pSXqQuILM/FcFmPrkMWvY8Tp2D+KyaDs5IMc3fTlskX1BllhEVyeWLkB3i4yzBDGq90KHAHAV2BSnkHVzPNjNiKxDq46u7+977wZGsqDeDqHsGGpJ7qM3K/gZrI0eNbE91Pr/em/He7+oucwp/vBr0P+F2xxXQTchnj13adMmOlPmAAhHUti2QiXNkaxzO/H+Q8RbXAZi3L7WQ2fr4j/WaYCQ0NMsuNI+4zRYbQZOd1bH/AOtuc+S6A/8wJDiQLQHLaZhWQW8iCmAadTKOIwMrOOyXHLsGQ1Jjv+hgmaeOCU9RPgRnqhw3xtuoFpIrk/qP3aauCqERxKkyHjeyeAzFuYXOzyq4MNtgzCeuqvm7bEBs7/FIvX7tztD9dYHL4Uxp2UECiSzuvr143njXP9aomAauQ3+xfl/+IXRgHbjDMf7iPBj5MPw1xFdzHMkynP045h6GEpTtEdif2jl4gQISATnEtHtFYBr/qzcOYLDm/2UDbu/hUEIF1nOsXXUvS2IKcIOjzYs+SoS4RHJMnGKQbT2cAVcleBexl60kbgqrlKMrM4PGIOfmUy8m488Hr/HpxgGFrQNCZSxBiyVRPaPfK4DcR8YQ8TAE6HMWphlXx9HvnUgpmRlh3LDbkzT7oZfmXJSiQpYgiLFn3c8D3kmqK0qNiCBr5StCh9vcbs75pAR33lpwwxrI6WFu0B9FJb6s+gzPltVzgeNqeWxv5+8sNNK0Muva9AxbtIG7KFj2GAuhzccfIOiagS7iURemuD1VUA1fWRAdcMtZi8aSk2vcrdBFh289/YxqxI0KKN7v36C2SyqdEOIjv+IdIXp71OG9Inar4sx7FEeb7yXsZ7K8BbPjaL435COgy+h5cfL2+m/IY8y51oRajtGNRUfbbFOh+ECODeB4FyWXOIIg8LccvcDGo/6Qgbe6UjAF3iR3E7B1dhOPl308nu/+pNdOYdSbl9Sk3v/dFaGmAbVE+lGOUq4zqZXId5hSbmpIZaPJnWZCLJqDpw88wtlOWl7lQJyrGLFGwX4OHyMl69+nUk+0+WdiLyumSW85tV2qEz7YQWoRPxfVCYGCf6LKv81cxr3VYjXcAB/PPqNJ0Vd1rO7TG1ImeBIucFs+fbrLMGplEfMCbN+R0FeC1adwTtHtcgWt8FBQ5uDBZkK72R3yyqX99dxKxpgWX0PF+tj34/4dgsXUZBYyxSXrgV4ivDOv9WfSHKSq2omon5DJDqSsy5ZT9CgLq7xMJ3wgC1VlS8zgem8yWm4snj5t7PfkMDk6WdGEdRblLFtSDKaLpMF9h34cdwLyNL/P8H+ewyv1ju2DPfHl7NzSMmQ3nS7vbDx1ilw097WLq6tKxuuGZdcoygkTIZ4EN+T3pI9KJbnbn+4JFic0QxqZyvbnivz/3sS+m3fyRNzGbtQLOLX+QzGWpdqixINWwZQUH0BNuYU8wBe9kTUd2CXdLxg2nil8B4TBecRSpi9XLakjMDyUS6IB2Zx+Y18kP1cXuTFS4VNbdj7k72gsR9YlmNdwK0zlLOCTQLQtC/A2QZAMDbpBC6oFk+QI+K8/bFyDFqzoRAgivCeujoISl3WrYNlx/x6ryhjSFFVfoV2bDpIacZ+UPbCblyvO36npnorhCTVghpIOpEXDDeSayNiYXTgOPJVnw2lQykzxiDdzoNyelp+252Z4h9XBRIs6RjVK+S013nJzpA3iSlYtMRbz3bb7SH6zZj4IpV6wSIjhuBxDcEs8qWB/AiWHDsByiq5oJxGzX1kCzqHxEZ14Y4m8NKN+K9wpytBzwYXx2X4xUOEuqHlUi3HBPc02J/vHJwzikopD6WeN60GEyb7piWUYSKMO19o3xj4R71N/BBp6wF6c8Xog5nYckVf7OsoqLxdYWZG/vH0J3/c4w7v9FDhOp1pYy4UfTY7g4nUmGID/iKyTNOP0HLYUGLi90pnhQ1vhRaQdMkGFlyOuqTSXVgwxKrGQiUCF0D8LIMZq0JQg6XO8sto+812DbjN39oBYWJdakE84KkqLDhuT0oJsTxH5QLv43siJGp6019kEuoe/8MCxSG9XYb8gji5fWGgRn8d8GSx0pxOHS+dVc8k0aMeT6zHMlLuTlKHCduAX6jCvooMyVoS7uKXMu8pUVQpZhDunaLZ2HzIVrLSbTkULdiwTKQM4nRwOZnqGNOPlyBOXmdSgMYtsjJgrhmKCv5sENhEU1mHQOZRJ7CPe2eTFXFYywMSZ1dKK5NTAG0X2LXGhrHsoAI/C8sqBS+cDhKvfoaZ+m46ZMBrZlvSBGRLOuv188kKiHnjJXpDKlO8f2eGYwjqCeCMYgX92D60h7Bsd2ign1LUJv1ziOBxCdJuafvdLGaiMRIhqEoUkUjU0Hd/6L9IlphxZBZz3hjdTQT3ae9HGEulMl324CPgKLisL4t02B3rwJsUN4n6/Ev917Cp6Md9NjntSwncQybvvQqA6SOHnCmUUrXw2m2Yo9s7ibf1BrrUBdF4vpztg/iPvF8qwKgtxHBiQLgjgeLs+9S4IOuIEWEqEPRYeqz4nFMlscenAFQi4RPr8okzvv/9cYjZEq9SY7aBb621VtgxGo+XvHME0HwxLPUj1b8NJHHm5DSMrAaDlX46EOJ+3FlO4TXCiG67Ym9WDmkrY9LJ+8ogf8LevgntSelSkKd71nVCNWWYmklJOVG86wWrDaZu6j5YyJTkcH2vw9IrMPFJzvFnxDnkNsddhnbZQBamhwi3UZcCAyQDGS9+Agt4SNt/ZhvlAfwgLOuVKlBP+SA+owYG9CZhc1WXZ5BcCY4HSNbpRXAXugg8d38yWGHyX4ByycnVEzT7T40rolj+Mz8K5vLQynuKvca/fLjXmt2QmNN4mK67Acvs+qlIPUT8gg2ow6rtbOdtH7lrzt0geJ6pFU8d1DL824jPycUZKOKkeqlbFIL4yE3m3aK9NYTTlV4MqHofvzu4vZWNyy/9eRi0sweHF6fFNPHACzPZS8ymeTXTimAMWfp3H4E55zqHOdmMnVZM95zck6GUGlz2grzL91na7uNna+jVeJPQxgBcacO8EcWSUUZH3lYHUhLvGQD/QLVu6/t0iLK0hY85B0kZpooGqrNNKhCK6gedRZRRVxC4QvQ2qCUAj7h2Ctva2hAdP5BGv9IOScGnc8aVAIMf0nJqjUYD5w8HVOEpDeAAvLRjLR5N87v4yRdXwkKNRNQ0zF8gnaCAoqtjT4YoGuK20IRLPjz5/ZUKnwm6SZanMUN0wmfydFGrAxQDqzPcYX/k9O1nftPzv/n0/QUhtrNV6icRBAx2l667TyfARjuribmQ5WZ36+VLjA+w4Ym5kSzBEc2Hq/svJj3JDg7ZI13cE2QhTzXLcHMVPVfZ74Tc1Y+YG5/Mlf3Gnybowthr5dGNzBk4bQcG5M9prGXNXiuq3waOTDP8CVLBL2fgaLoUFhdcXCn2OrGKXy4DWmCfEkV3sod/EGx1onmeOwI27j1t/BZxECk+lrDHzJGSm35HHDG5j+s6i4TLR+XIJxMUTOWCKa6M7ThKMAQ9lx6aZr5y+WqIgcFngD2L8J4G2d5DMRctU26i0yzO4WTPQsqh92bmkvRIDPvkLCTU7OhfGh9V/HF5ENhoKedtvdHV1TBzFv2bt37GUpxgEJOjd0IIO1ADP3K7T2cpa08rW0A1o7GcVce2AsKRrat4uaaEMaaIa+LJl6yl1jlrTJp+TLcffM7QF3VFabBSI9ryYF3iqBZmEEgRw7G14O3YbxdbZ/VoNNzmtOhYIzsagpZpjBozKjENubvBd9SN6ggrcOnANQzEQ3TpVAlHvewRxSmw1a/KwtP8WsDLKGk9IeP/orYJ1EocfMJvSthyXsByFO7dH2TpGIOInUUoxqYnWXqcJuGVcjnGIhkc4dklZeFmzpzXgCrB1OoKfxZDvZi26Cv4nqeb5PNOdmYqtLN0aEVPTeJYYPck/+IKY8HkGJVjlJpmpXWNajzu1+n4/A1OgC8VIYPY9Z2HtLvAm6AcmODw/If5CLPs6AONH2nhdd/vfauS7t1fVhh6GMokzln8egbKrRnRTSb6Ixw2BneFM8hI5uSseQVT1g1Tkqnj2wo3yF0pfqK73dnX+zPZY21P/DPo4aNcjzh/bApYdfN0gjZMJmctPf4XbSRL9PJMv7Vi1Ik4quKOqtNc/n7uPK6seYXLg5RDWOILFy86iUHWR4eV5KL73+o+jX2QF/BuiDMEAekQoUV9V/6sZSTpifexAx3kLg8NcikMrb6ZFAM34majA2wROzRaLPU7hEY0CYFIOWBZ5utX/lhjCqBykWipbOh91pQXwVzipwsgSya+RbDuRdGD3TZv+VdmqpkMP3G99aDuzz/5B1T0aX46LvdDA4S4esh5ARPMevg8xjk8mS+PCbK0jQrJLblp7ubuDA3cRWjuHCs+6dPk1tWeNZUzpva2+4YKTIGr4ctlqP/JKRsR+RErglTuORJ73BksaJCsC6Tk8JbMxShZgz3+mlM0HIIsjVju0bPG6aXo7ef71fCOwLOwX0Li3sQ0F8WCueCNEPBVlDVO7Er6l0UHku4IVZxR7D38egyxQHqQ2vtbmO/i0lV9S1pNiKZ9NUt8McTc7xNWgUKz0cJqzmgeGi+qZ0FgOgscjbJ4RN8bGwcrgmfM9jsDswz/pyZhf7QaHEaG2umPMPDcTdPizCriFcXfa9Y2xAOnbJyXVugzTWZtaLI9r8VrgdUuga0qIxn6g300vTaKtXLKj46gzmgmafiJ9iGIq6cJLy+Wc2ol9fC5lK69kMZzANF3e6T+EGSEDAFB6/B8BjtjGweWMZqpStk8jV3Vu6JjvWMkSRnJVDFlH15jgCKYIUJ9k852dA+uRl6MtieUCOdKFAHhf0GPTFO7QJkTaX3vJff1r6nQEGedsZkeHGuZbyLAieab9sWwcM0Mr6gPoFujrhB3tzR76rgwmfntsPg3XbWY+8I34d3ojJhwvoY2JNtHZIROCAIFCxAf57acDYgcQwi7iWr6M++TFgg1eojcXGZtAj7Veop3mran3Ar1kpNaQk2pPq/a5tFTZ+tbAhFsQn6ntsA2IaZzeArYRIhn2o1hW3TnjYxIWCu3b+2BUXQGbP86h5Fi76AvGpMqDVpSK+64NFJ5VfQHUgtOt6QAtjhJECdciGYqYvjR3sCd922Q63ggbcSONzpbJ+BJ3VEwxKn+4RaXcJIQIvQd0NJF+JA6pnIyomhBF9g6Ir11y7jDkbaZ436d1qX3aEmoFIr38qz89hxVNiJa1EiBzclYT2f17iSM/3cQpATcrlWGFD7b3e72WBRuuMGtD0diKoeIH7mZ+OQyq1HHuGzpuUiwWz4wRk4TwboPMzHs9wvXei55idvRAHbwJhU0kxgitvQqIhUfFDjO9dbEtYYlB1R3K2VNkoRBIGvH2bvGQHJQQC3FL55tOdSpnnw0SUZcx+IA8C+c/wTIwGYfJYQCfeNaA5sA1g8+MVCHV8A7bZO6KvEzTCjgU+0mt6ioex/8NHQfwGITnyDUR1IkFzVlp/4MXrECRcW04B1j5u1b43tu9095q53Y65Zb91F3iLpCF4SIHtVxCW7O6O253QH1Re4mkJCWVvcULvVytIUlTiAf6JXdDEG7cSHvuOeHYaQ+pmlSlAgR89XmTxbiqTfEudeurPJP6IMIFqdN/GUTXfFOLeLnl68wZo9Jn677R88BlsK9QDx8O22aGLzSqigSzn2WybnFYcAdZ/h5Bo/+Tppn6f+QKr7BhwYOlX/hDfEBxcm9RVJug4tb8alk+jmWikmUXCEcPOIDhMC+rIK6T++jjcunVwO9nPsU90PcT+h3qH76HpsllJReejMBxey23MQzsHLWQchYpcikQe6B5i01lABjbsv4APPMn7J29tObjn8hniJEwzcE8cCKkOJ7zU/3sV4ucN+Dv5quz0qPJpt1tIpzreURzt7b/lF1vDGpvrqXu2Jd2leR2fnL+fr2mdaBgeAcWeHnA2QvDndWRXiRVGrFkJG7iBQgBokOygl38Yt9VIMojJo768m2HBolvpgHoy8K8eqc+RDC83dUkeMdf8T1rQjnNkx6hAFTGUcGxQm6IuLU8tpU4aPaKumllaEP5MTLTOJbGof9BOTxbjTZVwaii7kpp3cpDrCjRy25saYA/w08PcJC/7pU1EDWX27wg1Jr7j8bAOEXMchBCB+qXMehxJUUgLoyxgQ35D8UUipNWiZDjHCxAj9203uaHurQSEHcXZRBVrDsyBWGbpBhlWQ+nw9FiniT6Trx1wOekygSvUeodnDtjf4hdB/QLUHCof8Neksx9SeBGOpEYW1wqNnjTfplSNw7q3X/YHqConR3BuhSehH0OGlyoQpSUetWL91kjZ8M9b/FG+wgp/Pfh/IXgA2/N6g4/OmiyDCZIpOWIfHgCZ4ynZ2lyKJBROdg6in/bVMIz2WrE+h/4LifqahXxQb6srFJRByd5vuXy3lFHa3MwuvCeCl+NIfX5iozbRqIovFOsqLBJ70JelQxU+wd+pYUMdy8PT5aDHAQZ0flKxUZuaNvLwQeh1PLnlODyQS9VnMd/yhAU2QqElLG1J0i/9Wi+FNUiGPv//sr3tPdJgv4utuZ7xKk6lx834KnqNdVSbtulUuR4xh9ARLujL5co2N3pE7izJsuEliDPAo99lxshJuvb8gU2jx2Cb0L4cBOxzf1YqsYSeqoW4abnLfz4WBugsFrrz2dX0PWuhxUNPMzk2UGjeElzpe/IFMoabITNkNLDDoPfbTOQQc7CXSZmBxaPaga0ns5vTRlLVvsbAfKNbfip0be7z6/oNzXNmNTX9Ljdji+J+hox8Ddsy88rTDYuVzZ7uF5v3AcSpOHpUKb3ahh84W/OZoO+HhE8nuJrcxWu+XCPNjQkFDymWUXugy434vBfN4/4wH11kAutxtzjQpD34/A451W8yo/Uj8LWlGbANHa5ZJyzonI1EjZhqa4kvyraGhjsanSQZ0l2bqhnL4UV+/TQl/qUz3mUiqRTJ9+iXd6TtHxJGb8ljWYArXWENwmxC2CBbz7LYATL6/6d17rsrk4a+mGxUZgiCK7M8iXoch48ZpphiZ0o0OblYH7bb55Rnwl0Cj+P6N17Bt3SXsqZXirmI1wldbLQ+XB8MYuYQ/EbEn9Ya/Uwhr1dCN6N9P13QIayNJpmZos2OXmV+/Fvl75xvr/UlgBSTeRRYd8aoqELVY0hzvX4MmHjyc0mH4kerjNvjfvj6rw/WcuMKKTZAn/YVg0xcq03QuzBseEJtlVfRCgWOEcHDbar0zUa2H7y/oHZTEQHLWmfm4ku4wDuC0tUOpZTDOA3p3fWsAJypoRUBMy7vqYu8++oMkfknLiOXgcE+qez7d+Wzql6T/kVVeDTKeEmImaY0GYtvmc2XXzQ4GmLRMgDyFj0Bs1XELXtv3NCabQva88NLewsYtQKyGgaBpQYWA40vhzCRBZzEQK5bW5debYWwBfSsTj7u0wNAB+7KvBRxe+VCdvIT1lXd3kecz1Yb9SMKPlmclPuejWMnd3NbjjrNTPy/ebR+5ey5xk9fBjGkdOTM3eYFypTW+H2uOykgoVhfcDmFoTCkEX+7MZHRi10TYc6KZ4SvRy/iZIPoRnzKRYQ7pzDKv5TrkPrTLDAlXhaVJ+P4NFozUtOWVzesO7N2GWe5dvfflGWdcTCEkdisKV4rekgOW2hzVP/hWCWnpKpPO4wvLQr8peC7h5SE6kjTeRYSUUqBIm7oFeXDFcdV1v6PMpAa2yomBiJOBwT19PatoRX4mNzq3fuCJWyFNHXDGkf2k1KegMuBUc5p5110SgLjUH588EGm/LGppKJVM2Ler5DCRsMrogWfnCyIRh4JZjNJ+F+iN+QMyH0nXPd89rsFf9j9MUFOWHrychMoSinWbRKn9s/peVlrozqV1PqfWmR83rEx2YdwZXLUX57nhrJmcN25yHOB4MXioQULo5NJxaYf6mhDvtxAQPy3k3eT5i5vYlv1VjP4n+vFJA4hPTHYSjG24ieIsCVDV106YEglCQhDojXI3IyxrSDo+HbrQhCx0JSwFStHHhqDKODcF5zH9ElpkFno6w6R0Grk8JGvJ+4g5tJCeL6elP7cyFK1+rxTyDIqm+zh3CpF4Xauzcj3dZgZPKrAgExhFetN534uS9hovBjY7wGAbuWwd2/mal/jp7LI/Cx1bMW+IspZWyQyJ+2YE9hzN6gBK8RkWBf1k82T/S/zlR7Z/hO108OocWuuSnZSlr1QjcxOVKfwbJRb548SOqRDQA/ucDwiG/GlaEevec7cWABy6/JaTCvqyxSAqFlC5vk4GDpGQ5lr/12G1Yu5EvqPLIKQl091GAmu2XNziKc1A3M7/AAT7BXKOrucE5gOzJ8AvecEhHBJkh+Oj3yPj1e8a19Wa24GmhGadE7ZXZYMdQ9G0uhs5M4u0D58/DPtBbqv6Pg4zp8vobKURISdaxmQKkrVzaYX7bmQ38L1sFTWRRANCCq51+M2rr9kAC7cNPqbJeIvNACdfV2vjb/3Qlf+OwNRb9vzxV8qiQ2DiBFhyNHIPgjepFTKmUuawdLdHjFJQ8RUM5m50+Ar2msn8gEdqDylg96B6gZNcw4vU7/XERzEz4VokwV1buGMfEfucgcsDvFZLxb/294JfXss6MHAP096ezhnnN8vdnj+aFYzWJsZsxUznh+hsYaPvcCdRuyqFUEOo0JvAkqVAVONnOl+rVWhU45b9K9RIURdSbhn/mx+wxyiMgRKK5qiKoibQheEz7PArlt8x+HpWn03fpqeP2Yy08qac4LheW2y9ANTEU0H8OEi/KsljIhozwTjMXaSW5A2A6R9eHWiKCDe+m4924ZRm6jFLB2QVHBkwU/uGPfevMzCEKbNfnEb1beZooai8Wx0uOLZofxhWQAVL5O7J0c8SjK0G2gvOzD/1pb/5dECoLb2cYkOMihKJgMgIkJFoGf1Rj1Tx+Et5CDVP237eB9wOIXzwfHVW9FZ9VtjPTRSGgKAonM/Bs3S9/zZCd4Cu+XHk25lXkqNzbN/JitERoqt+aot+I9mdDYwm0H6XF2tx9bX4ugu73lTR0pD6Tc/m5MhDbTqNu9wIYom8eVTaybhD52xYmJlq1E5XKTwk/HhDVNkxTgAoCdlROmox0c+21nee/yntYmeaX4ptgZRfuOVVYVeInuvP5aiRv5Fnc85VpiPfQ1azgc0wELPqYPUaao3x/M4MCQHnnkRtYJ5v470Hc3292pqVOED+CXbC/9zvXFYtbkStFoZo7MQbcqDVfVgONHYba+WdIIWJFrPFoRWzHPQ7ekDjKr99V/59Pag5ijC1EWxFVxvoOsZgInSmpOJImDakPWV2uNiwIVOINicDpjL/c+PD9R0UloS6riosCaFzrOb14a+xJMNjFr84f05u1YDEPjbAlyLKSqneMl5J9uT7lHOrPbzsT4yyH6AYuKoKAxlvd68Ygz9qOytgMKLBGqiqxWqaWgMR4rHu1QbDDSdOY1Lv8mQ5r1AExQeYwp725YiS0sPIEWys7QzkjhgAhlHbcjqTIqUra7hhhw/jnyxfcuAbOcvFgrxaxO0cnVCpi030kQZ+/W3IX19YXONLS+xjgxT1B9bNoS+02jUUnIybHkd172J+qUA8ELfzWBgYrnkdgvCTjAEoXl2ZkC9O9uQTdf/4i3bdh7Lo0huaNG9w5ePrbUyTCIh5JEKYCAyHP2cV8CisBzk3AqcsnHBfn7t5oNOw8cNgbLc24xDnQsA9fjafUkfcXWTiuYjqJJp8tUWVo/7PmjrTgYZ4iTXnHOr1PaNAd1NKHvUHgEzNJUQSRqIsjjUybf0kmoyI5ZnQq6yYdb8+u7prg872cHjTbIU49YgHM4okpHvH2Ska86O6T6luwGF+99289c59gWI+rLJ9CXallaCDMYb0jIXS8OsCvAayruzibuhzYUHUVCu3ttvTzW4YLrp56FAdvWthLgkySiOdpVLrMF+4Gqyzlsvw7Zdzgts4STqaviHR8PWQKFmvs4T9cEN+VVfTzZFg3I8OT8pt7o3BPmG1b9+3jszP39NEkixnAkIX3VIZ9HCsqO6D7VANigsRpzUyUQZbYLbOFgXo2mDjIob6m3WMZjZhqlGu6RnsFJrNumXriuSdeCtWb7Mi9mp8SYyfk0VsCBwjl0FPqCGeGsmiBJ59qDYtnoChhzqzos8deQolJe13V9n6PXKp8ZH+kUP31mYAd0d1oEG3t/3+Z/6RaRRRZ8HaO8x1lG74dJaasMddcfIN5fwibaY8dLQfaEaloE9y2Ei/fMieWj7FtPcGjMH67Bg/43jd5lGOo1kjTaX70DH5p1mYhItiteYlXt2icJKHYPEB7at+hF0ai3VbNqBMmaJoXHLOqZWjfSSFbrDuoZnT+T4c0PaGNeaxanUA0jAyThb5KY3WiTU6twzmK9ptf+W3JRy0RwM4qed0HUOvEbffkQshDU0wumD7XBCTFEvJhnroMmrornReLCOzslu+DjgZfISjU8NvhjgWOk32xZSpspZxFmTdHx6ExlgtamLGyAXU56CLMmbDI2jgf5uBJabOzuGwcrp2BSzhvi1dEosmgA6VdEqxJsI8mhbWAan9u6fs7Igj+cYd17xtlSSZOD+dPEjhLNtoRDZ/IUkChupnhZTOaQ4HWiu5lkG0w+lts3qKgsE3+5OqS8Skj6W6udW1USxXh9OTsfPsfEn3JERVPk0nfmCdxLIxDsVGDafV344q9H6SqcsjESvKsMC6ThZfpdWmEyiCnJEf6wQJatWn3UIBDa6wJMxuP4M9VMrULlfxnzf/NTc8P3aEW8eCJ/U0/qopgpJxEuUyPBDBfGoUWoMoJRaB3DadoC1E9Q7B+JNtsjvEPNGVY9jt1270MaF+L9rbimQW0dxxNh5Yif8rUe68yQ+RKWkdPtITDP5g30cXloQ7lkHFsvZUOztlG+DRBBp+2+lpKSIhYL6FaBuIo9grkIah80TJx99q2Kwmb7RjvwJh1+hhEox7zCNRATKrTYib6DJNcg8kf2ejFDlRT7V1gruRBrl3ULj7rVwhOdGUB0CTc6bmcd7OpBdU7isVWFublwU4/EzTPuEu6ylqZ3uxSqcOBPGCJmPJHuDAqMhqRfnKVzgplAXzXiKv25a5t/GZ25nrTTTU+Uwq4T38AoTwlVSzVeZSnqFvC09Q/e8pZkwCgi02ga/Mw33Ghz1lWkHKwmmo5C1wIdK5km5VGDBDW6Gs7oSM+23psNd8S+FaqAWxBzGvjBJ1RXGHL0X0Wz6ldhk0a96l7r0jp8px62iSJwuMpxs+T9au46dXi6Wo1z8/tNh0dWM3ft0CddEXFis9hDjU/H9WXsWafVhk7TSYL/RZR3kqjw0faMd/ZYCbTdwMy9CJKMI6zx6mC3voFUzeWCWk9SDjChsecC8cjGdggaBP/JW2/csXY+jRb09+w/gmxBpGSMijflsQQN/kcaMR7ptKVwjPnhsZ30/fCBGCWEppVU0QdoaraSH6/O1Pq+6pQR63P7cSufdHQCExN7/wR0s7u2NWsxH0QPDB6nC1fnF7Ek5uJf8rV/0I5JqlZmGiv7tehDy0OLugLPixPvI4h/VHfDBSMejJC6H/Hv52VBnVywUVb74lXYbVZ8e82KAa9D7dh2Ad4FgYu3WEyIRh8BVP7AG8A21CchfxEUJQGp0Cg+xOQdmq98u3wDNadHMVU8VU4SqRWYDXS9KDpTCi/vqOdYgt9EWBClBIX+qsIzT5aCaulEqRIL1oEJVaeUMR1q/BINmG++1tdnygT8UPek//J5APv0PJyKl2HHwNxqa+4Zhteg+45TSGXoHajZ8rLOU4WRIlqAVg4V7ZryAbXDYVgcvGn9lH7pfCDcZtArNk3QKXwwbK9CIj0cKml9SiB3Xb3O3ucOcNi0bXpRsZQCkqtXkIFUBOAwXl/gcWJNtwDsVfK/0sA1bf3iSG27Dq7nzjEzPFUrDJdv+LF2Nun2CvKjNDDvFV/MDrfgpoDDrITdmmRCYe0/0huvM6V1b+Sd3HF7MeX7LlGxwdIc0frIw9pCjWH6otTSWIiB4gq5ib9g6Sx6bZxhD+cz4fXEN3Aw5ftSZhLS6GUe9stZIyZSw9JpP5Fvn2FkiDuJ2vSLMmN4h8aCFkuk+1gZd1N4kVM9HHlP+GPwqn3QUdMKZEzMoUl18GeVTi/BABldL7h271IwOt5pze5pHK1kzg8ZwqNXS46RdlDFBLHljuaxtALJqZVEXRagMRRtLXiwk6v4c1+gL8/idhR4w94Dq5C1LC9/knqFHXnAWGkVT7JqDga80gJfnIRCTYKfmVNZX6vHR7oRKST+ltA1gxSPLSxYr1doPwtN9j17I0ss/oof1TPApUfsZQlYsJhXscVh/qRCGJjOB8k2w1c/op80BZburOmcz/x7HDAVhMwflpKa/LKoWljv1mPZVvC0A+cx+Z3WMp9ua9HkjTbV+1mkkNn4zSLS/plJDVjaENokXwVQILDmq/8dZeCjwkqmmo3W5rIbeApnSes5tNDCJ+uihHGhMm8ywRirxkS9K4pp5bbSxf/34/qQ4LAUN88VehYjWg8kyKlFFUWiveW+uS1+sjAWIwt5L72Ph9uTWs15mKLMZKdgmELgPftcb6EDKDGDN4m1IHV/BejmP03ejQstvPNJ6/Si+dOQXFdhs9fjvGipqvNehbnEengkFKB1w7TEQqKnm7dVnrKnguww39lTmshvTcEgJ+/tTuKroYdtrzgAYtlHAgg65JNUW/2keC/SQXJ1x13atPIWQBYeqdgW63sDxjihWZ+ZAg1/9VIJjLqvgfD9T/g2Yvs//73r5U9NNxdPuwLkXallmJrCA4dG7Ni5+QCMVUkcEh1CqYoOZVYK89jARD9GutuN2q8Q9q1w1PP4DnF3DIcKMW/tymJ+tvFzWLngebcrJ2JHTvyf9eE47Xzqeu7yGdBeI1Yd/T56eEZ4iNldvmXyp96KNHGHsR0dmVNvhJxhSO3vXyjHo9mxvQYx7kzCAPvYAzb5HFhR3tQZg80Q2XrZPsmUuNvfOSPuf7lb7u37jjl8xB43+oKHBO0MKWxrP0hwkUmgnmyYv3mT2tKhXpAHmweNJBfgq28LjeLXB6V4jvnXZOgDrZgEK591Zht/muxeTK0ONTVHfbLX/NZZo0j9I7nZLfh0piKYHP+cT7LCIv2i9ctk/VjfxY7hfREVbIXfdf2rL7oqjG9HJ0avOfXxaJRdh36AhBfbpgjp4QwN6ji7rcPddPspoP4WQ/xJriZUIv/yRO7q3zWyGQtxDGGPOiBCnrlJfe2ZjSxjH59p8Lt4lONmI6hMC6CWQmDTuY3MeVA7V6l8R7UD7hF+2pQlEe3PW+Jq1wEx7zhNLtDlBD0xC8Ai4laNIinwND5DzpQloaBEayIj8MeuozNQuIp/FSdAoF5ojePDXBE49hHa2qJD+sRd7Qej3kpkdIPKUtVnmcPxTvGm3KtPfs21qcqIFnaTTkG8+0bXuS6zm5bZMtKtcRtui4T0qjFNFS5OqwJ9bripkD+yInhuUWfu1CDMJlMWGLm6erZq6RopZYXDhWwjnorzFvH8aVNYcKucDFcpe0zrQD5dNt6N+/73+0wrcJJgoH/EJ0tI+YO0MRAtR7naBnRRk3O8ydyaKuD2YKbcHADkGzlzr6sGwkoMlEB4khNufQfPvGuPuQK5HxY8iRnhJbQ469y4tvO6FdAMHxW7ACZmZQN22VmD/8Ac7FYW2wkhvtt5BENkmy33pqPuaR3M7jL8GbDxiiDIEFhlXDatKhKNc/ZwicJsPlnxjg/73npZVpC1/Oj6CQMYyp+vZh7X7mcU8Hk/Ik0r++mwnQAiDv62KGq7D2PS8t0BO9LM+1Ut5pARxgSI/f/yuZCer41TNwxGNRMkrK1UuhPGJOvAjPInAbglYbDTJoyRRVfsM8Cexp+I9zMbs7cZfwx/qbAo17qNM5cDA/WLsSpOu4jUrapMF6W4uA4N42cTWCPh8+nxRCjtApGuCGgb4PsJkiRwMLybJSfnSI8v+25tHwXyVAcUldRCyG/+kFm4NWLlmaBCXF81FmB8PFF3AbXiqHrxv8z0ggWq56KUt3LNOaC1z2y/YIRU4nGHrOjdKVsKCvw+fTly/k6/3Sfvv0MbPCz/ffoffzeNoRWi7HPxZtzWsKTGA1eokZeaxTmQ2/7kdELp6ZhSmh0Cb4M5YovZUhUnnPa8JaBy9jnUTUh0nmk0cBj+0ENJmlowrRhcseQbsVL1rkIOkp0g/hKAy2voYeg9xciFGKEeF7lMTbsVB0pTrNOie6T4uKK87TchnXcwg6CoPlKXhZ6j1VG6csHCDVaQqljmLlcF5CqKDsQiv9cEWJ/u40MalqcTI3OM2O/dF8SpY1lCqEZ3pgf9kRltCIkZdM3vZWYPKFTR1kXfECHt75sm5WqZFd1Qx6TKuKk38SqwL8drYXH9B8J4vjF0P3UdiNMMS9+UnJ34uRcKI+535ZdPQPTl7cHbsby67ajLWjZbCkD/1rBVNHMR75tK6FSOj6OFSAU19dw9rIL2g8O2DcDAaYvTsXKrcfG3FNH+DadugPXt96QyC01DKp3m+UkSKB+FKWiPnHR12CGM56d2+mNxE4s4AJCY4O2H9x3sM2lng4gq2olk3niD/gFElld+CkQzPxRqMXaUis65HEZFOwI6nagom0pG3y20dSFTIEtcNBEQBpimdtN+9hYpmhKzpcPXccP6glnOZdioz1GIDOwDoFiZfAJTP/EmE4XZq3awxDyjpFPi+awZqkw3XE2eF+vWdJqIw+C7lWBSEKbhvaUBJIYuxbGbRwc144lQV3IbIT5bsphINwL/HhyAjtiyfNzPxY2nddRdUE0bnXiDzuFf+4P/Dtoe6hAfkfiZC8bd7t3Lcys7z0sYj7x85vJq/oSvczDW6MxyycOZLKwDtM51R0V4nGMnnM10einqtkogfjaKQ8AzQ7RJDHEpSvhrzZNKxOjGQEg1jap14aQw2d3EUDzkd5PwF661vYdWy0Ng8Ezrf+4K7mv2fpJwpYNL0Agzm8nzt9fmJvdmEmPlCCMBIPgd/6onLJW8gOJ3KPmX9lq8WANUaZXBixL/cKORPoG4v7DYJ87EFEZaSCGzGJrQvf1oMl02UQmzgMA0POzHFWDJv889v0E4a81ovvJxp9+iI5z6irn02I9Fl0ujOxA5Hm/Q/yEHc+HBpjR5iKj4ZlnR0+h613KoDiMHT4fk39KUKEtk5+JSc8EEbxs5fqTdgIRvRGvS67SLl0qFT8xRIpo3TZ08eWu5u8G+DTBXLnDhNVnIghMuLlrdQj1uMhWYmdH4nHDZn6oONZhUbZd65sPeix56OlunVSCbWOUJq8uFC0W9Dp+ZgdGZ288SfNj3b1rYpyytBK/5C+rzW42Htne7WUijdzqZgI0f7mf6NjOGw2749VyQEyU0UqKN+fhPj7HNp0k8Koh+qSCvYBZATgBRuTLUIZgG6nn7gK4R5gCJ+6z9QEloZwSn24V3koGY1HIsYHaZPrQaDu1ricpXVZ9AQkztid/VOoF2mT3tlr08iBn3XIpADQKea/cWVzE04JDLukX7Ttv6uBpLUAc/iXZ9UzcQQpK+CeUQs5YRqgAxcrxKm2CkHoRD0aClOEQQd5DcPl7OZ4+hrv5x6rQNz/d9O+9LDogCGyMaYJK2MnBG7e8OExlIX7Qe8L47XUo93Fle0ZJ/prXgwXRuE0I8PATtAPlsng53i5zaGJP8ET5k+dfq+T8x/wrL0Zc4a7+/3NjdH6ACMF3hD0A+pB5WpqUrY1+0SO/quxIJGqV83f/036OuKaGE4L/Df/NwD847ymdhZcssMdbZuTMmw8Inla5pznMNktqIheKls5toGyBzzXCzueRay3jweoHvgBNfiaA8RkERqenS+zgaDywJtyfKN6NxPcRBqmnFN2NKk89guyfTozxcg9S5NEUf9hemUfzMBcxm8yHJs9yqysK+6jh/W+9Vw6+ipSGx8dKSwKgvhfC8AqfdcNgqlRMoxjk6FRuGsUaC1ZYSeieHurUdX5zefHrVeXFVgnu2XJoku0XyVg9M0OFNV3kxHCDoEJ3SqcSxnyKfcDYUIuel+tJf60j9lyRWTGcBg76uYBm4imiwBHzXITNRBQxefPabDQRyEbG6mlh16twduOxNyW3aDtz/It/bDwk2z0h9Ys7oJGEMyRpBpecA+O5dyIS40y7SSyTbT0EatzJ8EfpDI1upBBS68Lce9uf/PkAcK2JJlP00XkX9KAbTBRQgCBRUPJSrhh8RlpSg5hz+Q8gmmJfN0uQ1sSBSD5Cb7xWoWVGJpJaA0hPRWhGjM25ShqgSGqq9WciCNuUKMU2+07wlVRUiRKOPVTptW7z5x2rNvvUwmOMC8A7MpQc+G+s8TeedQOVsimippNlbCLTqf2m55owd3HAvhnSBydkD32NEcm3SHcPrWwXQ9oE3ATpSa6mQxJT4zRs0YVE6mkrkvSBxDnARYNUbBFoJIITVH+sb2/vH6Oza19SvmhUNTSeO/HoPSmeNQrKodNEjyVq7xvWL++hI9jn5gO76LDWzhuPwYFvsU28FXP9Co/wv6v3SW9v5Rxpv77LyCIwVmrj96BFDiFXZCLb7JhPQqN+/spM27W0HQweD8PxH8fw+GEFWN6uykfRC7lXRa7tdrMYEpCtHPLPy1aa5Gi/Qx/q9drJEqQ+4sf6pvqzvCOO9AVqyvKlwwOcDgKaGsP6EeAho62ZAMSEy65DOPEIFDq+aHombIt+tTnUo3r8cVJ8AyyfloKg3u4wn7DX/dywBzbA+BkqHkV+Gef6p2ZeuLH5htUMyePbMwZtXWj6r9CDo5nI5QSpSWYIVALbcqAxq3Xy+wvHIu4cP4F7JaN3QqL4wo63awcucX48RoKbDiH3Ug+04UXGFoEI7ITH40hIRtXtWN4dbTZX5ZaUNVgvg6uqiiaUM2OC8iB8UlILck/Va4OKDWTv0bnUstz8NNz4bplYYDKgUPXoMt/TD9oo7zquVZIgMAxBA/3AO1ADG+AxmHibVgydDvrNl90WHsMOWJxczwWiNoNMfhmKL+Y8IkUQYCRYylwE7C6+kRsviPXz3E4rRplr60Nf485Hwc3mTdY5YaU14oBzgWr0fJTXbu3x4qU62Uj/lF36e49FMV3h+czd8q50k4Ne+r6ZlVZzrxsaqHO3H/WlHxXP0GnFXQr4edUuzc7b80ecJGXKn4dYk0mls+TUVrHD0K7YmQ+c4kaSqnakNwea7tR2VTumteTf9XtOVrc/iT4e5zytbzm6Bzul4WxeyTTDzkkOX06Nm+YXsttLJdtZKCqLC3TrLLdRclPLf03vYqeztA09CoyIkUfj+MniSmRh/8Gg2d+06OI1usSSY0HrgyRlwQLyD7aSKs5XLXoc+CqrJkhwibbgtmHDX/ZzfP7Dwv8qap400aNOJxgwG4jfGxkL4itH/0ANFhxjHlapFqy6rhjjkzrbm0blc+aG2dG4mYofBqAZYdzc0+5eQygsGzPn8URJ62fUyOmTcjJVPQmU/JEQ/Ycx7mjpKzAun3udyd1UdUEd4t7NkeNEhq1YmltatDy17m0OIrRy0dmscNo0zO3jT/a39jdGr3sJBycdoXZtygXkC501Uls+tgXkUyk/adyEZ+h6sSFM9VlNMY0de1nsrYXgQ6UbrIguTQ8yHmnvrtOJLFcQsV+eD0i425hio/OaTBUZ2A5XnHuVkH+sv2M35miZdTsV1BbRnWYVGRGmL9/SHu7WXjFvmSLHM3+FfU/CNOh3WcI+cG6Cjbzu5mzwuhTJK8PYwzWvPiQJV91c9933k1KLQKkk532cHXz/+H1s7GsNATuSHM9Q4HW0qZGRSQAmn20J9YqZivCvHQUZ/wJ+kRtHgGKD1jWNkn9zPGkPfCwGoXyh5U02GQ1ujAUAU5VkoJYqEOqi8O9Ay4BU+OHN2naxcviOQAush3vuxWkOUUk8slVTViIlT92LaXC/NaGLrN5icIdcdnSIhOFlphGCvnkToKRU5xQJtFMhiHqLPQPOkqqchOUKMK5caOZr64aUX+CTo3yr4QoElFFt01+tpgmG4zK5qb+wc7ffRG8hnT248hJQFGDfhbSknSVIHY+FHp04cwF17oLepMlBc1UVhftQRdYNEvOLB26jViGsIj+O3PnaSyYu/GnpPD+pi8TF5+nmipdEMfWYKfVb3xpcZPUbBdJCv580lFPlxnj2CRNW6DgYta58kNGNRv0v4X4AeXV0odfeiztw6WW9hrKZXudphRd71t3r/FKXFcc5b61SrEClqqMDk3XLIwZL/nPJeK/zgQZjEvibHxz4lS+mWqVuJuCjn2gg9vPkclj5vN487brpG3pmedqcPOaFDA6rCUZZdQjWAOulg3xnc9bxdC7MeHkfiAa9KWc5IRhJ84OZcNRYz5HVFYNHD92b7FvVv6lLPHrwzWM6BPW46mwet2MtUkQpiA3afr4zyMDkcQ24V14mAAYxhWt20SuxSuvb+YA59VTwaKAT5hUERXkS/wk8Lgnwx0cf3ulKKOY/iyDSTQlDcv0DSuf4NWaCUxL7D86b15nvFG84T3fSKJyoItrDs1sSO+BwrT5MMsZ+H47rCZHZogCXGsgDxjeIb42YArIXr4B0XoWTUPiAig8Sfjf+lTdv5U0OKgtkpb1CoRcsFVXB4NWUgrmoA8AfErhUXqDsc7d9UZ+ClaGhOO13mV5B3hONFtaQ9K7LssznloCZ9MmP2FGgQe5Uv9dMYDe10xQ3VYkppj5iU4iWZVC4IX3RDUFXWtKp0ysoanh5LSBx8d6Opmq42RzLvUmbdIyqRvj3UFOGa7asTnB3AbFz7vtoiWCrGw/hGmcgP6N1dFJYVl7c9La45h5oQLJmL8O0ModvrIxhCBIHGNMaAXFeCW/rg+JcXiWxwRg6LO3etc79p394yCfYASIghVKmY+y5lsIsFEO0vzvNqdYtSrehlbxvZStFvuJLd7cU1UErX8bjcUmdUCGEUWHrrAh2EBGyra4J11inCwo+UQ1qULo6gMI+Hn1gc5sbPzJ+F8Mn1235JhXE6h6WmIi5+Obk0ViJnBkua1dEh1dF+EzXuFCdsuUmaC+CW7UF5V3Q+QlMOQCx78jXk8yqm4VYKftKPQW/8hn5NgSH3eAWyslmTFA5n5vNevTJx5Jmt3DzZzwCd7R8XNil7w4oGsMQ4LNHFIIwOnYlnzS1YBSDD6TdDdSO6qw5vD5sJQRycHofirYFOEp5NsZ2xlivT+uyrgSnadc87Yelrlm+4qGKDLYrUN5CDkCXFgLkcPtJZZ6Gt3QGQKw5eGPK7uqODaVxX2fU96fe4RvF55YlBCpa3FRZ3JnSq0FELAkqRiKydH7d3UShoi+5jgo7X4i3jqFjbb6Kp/uta3z+2qPftB3Hz3Mei6Gp2ASRIvPq4qV5S1xjMUQ8BF+kJeXcM9fpgKAbhFLTitCnWqmqi9zvfXNtGhFTDSWV/Rmdvz59eeTOtlxHc5sxtYUoQ1eaXtEwnbJ+kAcZkfmq+Gqh8MDOI/7zu7H4Sdldy34Zv/l8sTvKGYg/phowLIb1lBY+xmfHlE9PImKqD/zh+4CUlWC00QqsL0hP4eHXEJPRHZzwYh0NKa9Qci2itbLUO3jerrCCiW3FgQ9LSBKhkC04z4s3buh/xrQV/tRucDGgHzFn7bIEqGPT5ETF2dgORQog9kDC1b3cdf17aQamstH4bh/BZHcDLP7M33SUXkePGmggY6QuMmXidiK+HAeUGcZu9WQLI+hKJRtMJ2rEw6hu3wn0IuyX4BH2sAiFl/OsPdYjACyhVcsDzXH0LuVB5+CQ2EQ0adfwSRc/FGkfL9MbV84s0nk7yc8986Sxi6Ezj7/Kt4qpYaVPvVOOTwbqOO7oGaxQ90/WklJiKw12I1K0D9FypGLDcg/b8sy6asFZ2mQwMddZTlcZfGGtk8mVt2Qqr0PtuMfgXF5UHc1dgjnOzwT3IO6IlTRavoEP2TYJtFzkQnUUA3+UaNhWcyxFzYTng1QfSOGhmIWewVz8rQIlg5MUaDX1mb5HduiAVaDVi3fBy5Zn4+olD7F0/EhxmNDVX/+ksTInaQYltqODENWpYqoNneY7UOF0s+ONlXncf/eveJS3X+VOlEzm7HwNIahCkINKJ2AiiDoeseS/biPIf/mEj9toC9cyGOS/vlQB2S20/3SvWS4TEFNU/ACPnq/d03I1HLU8V3RbsVyit2amxgzVYRP5LFMivqLSw+AxnPVOrFtc/1kOHp93iQUQsofvwv7KvMz0FJCqUsJqQ7qgw4grkHE0l2a09gJNnwiJMGyXaPRa66PWdlpmbq+ZDLZnTzoTK2Cq/2R86p5pkOu0TsJfR/cvb8ML8u6VyOVVjDKBUHT7VZv+HlVEdodDgw/pnJwTLKrHiSZ8YR2gr+wGxgfUdC2C4Dec+OUXYE9LnvBYH499Ty9cWSqG2SaxFmPjvizYWVoqXAsvmQxFe+VZeBnnYIq5yJPcKaTZ+hS6R+AZ9X3KxWuXK3aQHcVwlphgyY3v3teOvj68QkvVwbYgLxbE7hPD1DbmzF3h9GSpqjhW2za8yNErJrlq1FsGWNVt4zF+pghPyCMEdlUImnSdrhkO9FUAWIIPMBSeVDLXzig/bEDWKK4kCkXuiL4NeldC+QkcILSt4XOGVw+c2LZ2Sxoqv0sL5K7pM8NF3/wXWXu92qsiSTUl+SDhv/xTVYtLEtwOjbj4Mvbmoz19pTwayXTprZJy/YlLJvBbSZ1MpVsekPZNraJX6yXbelR7b1xLqkKbUN68JMr8FkNec0jqBLot+lGMjb5mGZiaODdVA865rDozOKXtlsbcp+0e5TQd4SdO+Rzr6b/SQ6lRaPn4VR0hk86HAZe1KuMIF2S9YmxjlqnPRCm+n23FcO2Vy3OWYzZhm4F40AHlg3uI3C4SYJnBCYnWvJGyVmpV9UUp0FXKXrzXE04EaNJ3L1TqahOACGs13QFwobg8pYq8l2VbaDN6BlR5YSDlm7XF+tocOD3F9uY7Au4rRhV+khz2n2PjMo6UxI0AKueXrbl3fQrIR7piZA7DY8MIQHHnede3ZpSifyA3xARdnMpJHANagaWwIYwUJJWkWA4EjjmoBCPmzR0ygWZDe8REZAjZ9iFoupx9OygDapo/nOXl31ayC5fMFsyoZjIaCZAvpfp087umstt61lPlaAEdwjpEpNlVEanu8FaNUeI2uv7W7Te6KMmp1HfnQqoxlmxLoq5ddPj81R0mquFqGY/hAlPvGGIatC/PwSv//PWJbvXJDPSUe+oQ9lW8HRB6RdNUjR9kyJKXWAoShMbcg3PU5Nv9YvnEpsGErWUgReU5GvC5BEEuzM3K0HPBOW4HJOU0ls04l3P+ITCcwl+esZSDON2Ht2ncTlo3qWGb7UzjciORzzMXC8Ga6jyKtUCVz0KSMK/4xiJzOhso8n1om49rB/DR44n8pu2WUPj73GwwICX52QAEpTGzI+MihRa5MCl9fqbML+W+SC8IZT+mlLXHCNEK4lENimrUCt1VFov8m6wlhufT3wakxEThmNVB1+8YS+nZl+GrJCJ2yrTGxbuNy1TSRB3Cb7Akz6MN3SbAu+ZLa52KzbjC/qhOYbJ2QWV8Wyx6SmwUPA5rm00QkArcVSkdBuX0dfYWLguUzkk7cTC5+QW7PLf8nqxdWatUzf6TKHa2xanKOKEzFd4X5F1zTLUtpj/RSe6e+JC8WuTUAfKyDRe/ZUEVFFpLCrJRWgRnGr/O/lPu0vVwj1CrYCW1s4APyg0uxGNp8zbCd+AANHIX8xJdgVrOaVS4mBlxGRBHgA5V3IQgJNtEj5r7E+aZDM1087DiG19gmaWkoAl2BdMmrlRg/9BTiebmyEtha7jrOQZQKNAW0WXQyarkvJGoL32jaXtu3yk1viJfKT9VVrej3yYaRZe+ISfwcsQXlG3p8TmLjMnQLKFv+csY0t2jcM2YNYRoPcMj6lStysp0bvvRgAD29KHvt8xSI4TBxnsF+03cat3qeq/43jcM0qrsFeEYMEGePiRQE7M29TNN1ykyQGb/pIhSDsg6H+CycagrQQDoacivAR46nznPlmdnmYS8li5ec24DWmwmPHi2Sth9Zc+KlyFKRrLZuzAdi2+3gHn8EZvJe48oPoLcVNQo3eGvVWdf4j32JPzzgzsHE+eXqXHYI4j9vpAV+sYMbZ20xCttcJUVaYr+a2kqkCuDMneCS7GPCFaBCUsnS5VZunEm1FP0N1tXr8k8eRRB3xPanyid7VwQglz6JqYHCU1dWOp2ZRBcJuWwGWvP21LbjWWwb2AP3jOB5GZDBM3IXlQRtYkA6foW+J7TVpxPBAPbqtDRfxoYKpkQFmXdOv9DsAMJetxjnaTvk2H4Y+I931PRP86wD+/NjCKTw2u2pEKgnoZUUxBRojzhqN+b++KPEbPnJ2VhmuSQY0HcBpqoxgrLzj5zd7GVQE5JUPZf6j6g57n6I6jXXLwf1v+KPdUGGFursOWQ/qwGYS/Wqd9r1vT94vvXYm7H6Dqd4d0FX7DfEiuxSLs8rV5TTc6ssMT2Qr/nGRG5JgJWwHga5wy/xBFca7ufmy2TLmbcmmoG/UqS7PfRtzVU3CFVZWHo3A+FAxJdt9vt7QfUFMdm/vQfLuyWI7ml9WVctuQSyeuTuYzH4WkOJSyvfkQ9upX5zJ/BcAsDP5SPx+VJntrRy605NKi/I24ac5sDNfkSqwrudjiGxmiJWN+e1ifcu/sJqFnlx1vRTClJDxcpYeKy7LIvxzRDgEiZ0hvdUDGN+X/lm+5zc+q38PghySY5LEybNNqAmT06+AhbzsXrqH39Hta2mJB4I3dBZESsNmDwAoocp52fW9vAjq3f/mN8LIN9Ik2h/Es9U4SO9rPwK2UI050E8ki9p/uA18VfR6w4KUYvkSEJPmtHuNbY4zMlfGMCzJFBcfbQS7N96XH+tnjhJ/sQOg+PpjnYIDGoMQ7Bky8zsiA0zb/VcdaWe7G6jFXv8+/p2sU0zfQjsdA2o20EWG9u/EV8xh9vt8cezw210EP2/x/gbeiasqelvVGdDbrQ5UMDMSmShOo1wQMpBQYMllbbaNb/Rnf23UrqQVp4IgmLN4XUnfBnIEEK58i90BuoDmCKh5gB6+qys46l1crROgTftfsFXCTUIgVwnyAHWrWGZy31gkjhA7XAuSsSliVH0VCWsQGZAU5SsNOYDyJ6w9JCCSV5ZmEhYiKhinUaT5wnw+mFKNFSBKAezwkhhUetCOnbQwEXxVS2nSjHKNxEXexj/pOd5lKVmwyDZi/4h5H2sDBvGC+12+n6DTWf1ZN8U16QGpKZC42fOlv8XM2lioPyr1N79+o9PBd9WaxIcCwhZCnC+9qc+1WnBPuv5brwLzDIgj9+sCS1JRAjR0yAuLq15BLA/ti+jBD+tYgV2+uSR/kTEVxK2PMyiZ0633wVTOXjoQs4zIvzgz2499zQ/1iSYLi+DEQUOaDXO0MQD2QAAJoUGXTMZvygAqdeJuRR9RnhY78JzFm8D1kI1xkPn0mILKyMkx4puPvr7kNN2MxTF2k4xbAnwsWxXGajT/rBGDzEI1HhqPztDRcNKCA3YSKSyLF0LAb7CGfjUo2IaG2LpKqR6lvMNYEBCgHahQ5HbQ2uAphRIaGPquyJ1aJlxTf3ZaETDGSUYGXA7wPilPHH7hc1N+EKKYQmKurGcf7tKCLWJlKSsVt3zG5OtWSWBlN8SqF8ZV8kq2knnBNFKHqQHxcUmViKaNNDetVNYJtkWf/uFWilRZQx5ztkt90lqemCSO1vgLcYrfEfzp78JnEoG+MyPrFR98z77hUAM13RfzxLkRP8ZS3+IVw2FjIW4eGUKBWjVJAVPZ85ZoIbVFjZhsrNam5KWQws3vIY7eouJuT0wLS3kMM9+8Zln6xiDl7r3hkRsaL+SGNBKGkKrl1ZjDxCrkpkPQKtisE9/Gucup7vEszLrOlipvGl1nxuV8TehZdZahPMc5o9a142r1nhh3u7hUH3TyIjbqdORk3Nkhn95AAYlQucAbV90gz1yoqGzswXWh/mGG72gpxXjUDnBW5/dVc9rUHJZoDWnvBK6bdFIlkh8qV6yHeUJSTIFvyRDLYe/PiVT6Jsxet1dlVcqjRCvA54J/NQRBKVXxehA59wbfXFXET3Wp7EURg0yp6km6M+IR533IiXLGu30HW263GAvhuBE4scm1vbKI+ZhqTFNZdg7CShcRzjW6N0LtWvglVscg6azZG5xNNmexArrFMOODp31E94b7tdzxdtUzZYCAs8aYlTUAveaPQNAJh2n4DNehvshFh4UQsqAVhbovKg9OJjMGmjkrJ3RXz8ApqZAHOyUTuXRKq9eFn872pNtk75yoiLmTrsKZw2XAbO9MksaNzwyDo3Q/PFpPYxNPWfWafe6R2AuuHEaYvdjqZdpU+7G3E39ZhosIiiUaG1BLIIu50gCgqlH/5n3t7yuoOo85cP6dwCB90emgKhgFym+es9+FBH4/p+Bs5/CY4y5W6Kbi4cxGBxIS0HQATfqBK/2pMi281RNaHDGiNAJVvKCpznxypU86mLWW8UmT601JLOfZjqonL1obguRxEu2QFO0EBAIhlfeejK7RxQkfYrnXSV7e9+hAGhaeOsDCpUO6LqTEcctFmYzLuQITjelmn4eFizb8gQFXli4m5EMN8LxQYeX7ABMAUIo25y/IUHIbYk2l5tLJLVBLOPhnP6ik36TQC8LEuNpZCeVTMGHQKNESts4jtmB0TnhudczBrHL3Ohx9h1mJJlF3UlOdnXNPE0wmNFIBGRZeS/HqFzr99dQdn4Rr3OY6+ojsNKVfhdY/PVwVhN/x9Gc2edFgz5WcEzlPGlLZcVeQIvu3Yzu0FG1Zn+wwgji66+BA1Ycm2rTL5+6hkvvKNa751jvy03OhGVqnLK18FUrBbR+ngIEA64EMRZyXigaY5jDAa9ZnQjpWj/qnRCdwyI8MFFYYZe9aeuaV4AFT6foSfSb1A5nIyH6L3eEyxWmUSirm9yr3iLSDdz/1npSko6RKA/WqGLTSKKOAOcdzjMNGI3wzTtdnKYagQXiv32s00HCKLRAWdgdzugwJ32jpDXGHP+htdTKFfPSWKH03ufo66e0xYMfODa4DNM2BLdKMwjsKl3CEVHrEfWYHHy9IWLYEUzeyPnCxzmL96m6Z5dZwW/qLFXvakCypMVALzwgZoGqhqtVoq4uRYqR1qLBSsknXkiPBiEqRP+ZiGIhICR8RhzD4jV8A3TFdNGbG/ZjSZWYYEe0KYjUdw2Rb6LYHok89P/vTZ1gTMBEvh3ao8i0irolQVQcm3j6VN7JNX4jAin6Of1nxdtRSt3YUBkYmy2dnwoLRDYGCcDCX7Il2RhaDbVcc/shHmItjfQ43lVs/5o90r8HVmJJOFs4GR6o9jHb71QSglrzk+JxzAFgisqFh1A6xbw7O/hMK6e/RaxpCrfVyiDNjdexAwSm6RvhEfWaf8JWini2jzHQOfDygNENj3LYF4mQMBwa/Z3ZnrgevxHU3XytFIK9G7/WlLUOPiebebQkhQBy+pn2HUD3LlNg7QwO7Wc7K5ik6IC6Sglik4vdbVwAsfpAUoRlclJDzq8xfmJhu2JG4LK+Po/SizIvQH2/B3r/+H/pGSMoRKY+YDapoy2wsNEgs49pxKqbQGsBJTeFLL321iStJLU/rjQU1AVD9QrB4/bC7gXctgqyCXGqYOYxFagC9kScsxX8daQOkltHpJmsOH6MnCepW4l/29HNFsK89lRFAHtg3rWCY5YCnFIa52wOTv6jZ9rrsZ4fT6lNJ5qhlpVg9voTNDAMLiIR20eYuk4fp/aRehn+w0a0bg5ftxyhk8Syw2Fxyb6vTM9/lTukL/18G7j/pg0ipPZuT54s1voTryg5dxiTnI+rFTjeuXzmpmj4jXguFo9BH4TuuQxG1MAIypMmJkfkOe7H5txgOm2nr2OS5igYgyaAP1RT99g2pHD1eyQqocaK/1aUSMziIvdA04nOS2KP+20Bl6eeL9B58zGjKa5v6PtqpWM6yXOjktb3pLMrCV2IsPlUpmwPJgbCNS0OSps0IwMIf81Jyk6sKU3pU/iqzIZMuWlXvuv0HGvV9SneZ4R1Ue70d0kUpZ0u5nKkSay64tNIAuimhSKSZna83dAt2Gl0DXnbv4V9LhwYCCZyjmhrqbECJoTP7qTFwPErp16VyS5Sj4u5YNHS74KlETHBmVwvuCq5/NEnCSfFD4mdqYWuWTxN54clmQ33RExdbrKusDLEaGehbb3jUGopfat3x5VDa5m41zRB+X+47Jg8EhvF+ojqfBX7Fwrdntd/1rplmF9QOYqBbGIHuVd8WeRyAzntqv8q/nMcri3CfupzUFCTXVV0q4HbU5xa2AUbhHXiKuf8JgGrlPUciH3QdQ7W47umNr5a/KOz2jmAKWYrpHwnRNlo4e0vYoopBd1MKGXw2Tny6QaPoJo9yh6LBUWGTosXwchktEgXDpse+p8SIo//ljm+8g31IxaIttzY3yks3+xwSJletfOE1HKpRDIzgeU8TwqGZw8cQkRyeDktdq8V8VdctW5AmA4pINsWGvBR4KJLSCrwirFmq7ermnfyV+X+HdJlD80zpK19meBRg47zKITt5Fd1xCzHV4j7Q0nN0G88eJ+1nvM3dkS7pS8TjPD6V5IeNV4mmchs7I0LUGByPirBJ/xgpbuNPXRoiUfJ3NpdcvdY2aTbwOWDz6e6vdtMZHADYgIVFP+v/BPHzyM43wglVxA88/P6CQCbZzQUf6YXmexMmPvBOAzeMwphfQliWiEac8EKtZf0ifmUI9orIdKVxCqKp9bRLmWlN3Zen78xDkVoOdwA+92AHwTZBa9ZJCCJTW4POae1O/IpLFv+sTEAm8ICnG0BJZ4uAkpQ9xKzYhNyr989v02lxpPAG54gG+g/+ohvLd2tiPG7E+Xl3qMUqQ8yo2QHTVycD0sZWg6Kdzo6FhcR/DGjkA+Vfs93R2IM1N0K9SvzVIGgvQMhpQwyTF+SMYZgHV18bR7V8v3V8w4jMWttpaRxEQyprJRN53rCU9haCeSYwPpGNZnwfb03HsG25rP2bP31iELRhh1dBFGonAjaXz7jSIMQkA7hezSL7e26hMbXIFB2o3zKoxjwczwnaGozVLwkgN1zfemziUxjL19wvXShVHfW99HXF4vFhnbruOfDQLdrhAON2Wgh62t92hjwKDcxJt29pcXeDr2JLCoMSmdoV6DB28w/Zun+DxDX+QeCqVQhsSQhgTAsG/E8efoI2Eahj7iJjrsuGdMC/a9vM6VfCmuMvJpWNKI6yOkxBcz+ODnG5qcItynd8Lv6UFGqfL46dLXkJCKRZzUk15P8rxJa7p/4K2h7q1va8JcGSdwWM2otWlobqxJaQX6HpJ7qzz7A6Q/RxbbFpiUsG/JY3H8mXizetjUcRpUQpJ4o4q3iYOlO98nsBuVQGJLKMQlzRiLbWtSYVxRitBITJHi2ALilSBbyiyXQVMApTC7JN5VeCjp4TfMflIigO2RuxuSIgGStKfeEkpj4kIIvxgTbAs54GASZFG2GEvAEl9z9DnFCMysOJ9nrJjZ0hYfHaQWJFJWurhDqFUjI2B+pO1tB58A0y669Ki/Sr93uDZjHkXg2HbbLh0i4UYPMh8JEaIW3KuPXHFBMOx47xMtm8NMivY5DSUXsTI5EWkMo1QXuPCkcAebF65cPJy64ZuAsKAclASuNowJK+AeJHaHG7UQhj0S/kDvy3zO0Rp0yMSzLRBNunrs7Pn9FpCQX56UEhSFYETA51TOiI+QMn6/s7hOUQ0Z3yGW+E8C4VXF1ImjxAZt0cvPNARtMTwSxang28SCqJzELZ02nF1SWO/EtCsaBURedw55g80zY2vN+FqBhhQHa6PjFFFfkdTdlOf/EoT8c7z2BRNXgnXNpF0jBiwTCTEs6Q7Y+GA0dbmDZHGBAMRweWJV81wMZZq2m2FRjTcK4EY3A0/0rg93jV1CFZIE1q39NUkvA9H8YOoZxHwtuVALo8RVH3rw8GHfjo1eJXqV8ybrT6txqV7odYe3z3o27zDWECphLpk0cTnyWTaGJKcuXCxfWJui6e1M4rq7ZJyMozpaJyVDGjIoYGVSGLP5CExlg4i8IhoCQItNHN2lLV4zYlWRIg0XkwoQgegcoARJ7jic8mLrwythaZ1Ut69FPinN66YE9T645hKy5MxixHtozUDSRUAJN84orgOOrxwos2/rOV1FNGAqXS55gLUTFF5Oa5O247HUveeZnuLOcI1pCURmmJKdVW9e2OpFzf90Brh+Uw5hL9QaC62z88WX0CIAz3QKxzUnXbbnQx+7WlMuFlrJMsoMCPKfANKBJArmrShNXW3xQ2JLYHPUYIN9f2g+dh0WVrv5uGib7jqtnjwE38PW+LZIAjKzyog6FOStbh74RvCVb+aVQqt7AHpyUsW6PBSG+e14m5Yzwq6u1W+At6UGmjK+R9XCu2hg9GJxFAOKCi+Iu9AWaWl0gFWAQOM8LCMPsR6/it9OL4peQnyfhhecxWXBTXcIxWK+zheCVbaHPcCOSKUjCkkA31pZqSZTC5Xvugw/K6Gm4KIfaYkROfPK5LnX/IQ3fjaKtwSxZYZ1yry2eSpSZk52eht170PIS3tZclUvXPTuRw/WK/gpkCRXXL/IfGsIiececH0jeHGZPJTVU7+iD9nY4B7VZ6upOmdmAjh8SMODu/XN/oA4nrZ4aID0lb0JeSWogvR9JRfCh0M/T6s6ET4XAsJXSDfMMpqGOOXCFT4WzShxwcxETk8vTMIAqsK1hhD/HeWiyMtThQ2du85ijgh+cuqbuhcMiPT0HrZlFhW9PWWF17fM/+twm3elb2jPEplLsN9K98Edwf40kynRVssG3vWfwCeGZi/mQAFPY3QJ5ET5Y02mIrbX8y5XPWYXa0rQ2B08IzRqJTUskDjnsRJVEM/Cyuk3bU5CooCY7WCj6SyDV5gpiJLshseoUdXAvOY6SbSus4J6oyZiKedQzRQjmePIHOITvFK9OkKbOavTdWJNCCrnlKLgzHSLO3mkco3vddDePjMkUKqoQ92XSUWVvA5ORRkReTCmbnIOtLZc4GjNQgmbJrdewPFqwc4yQnh08iV6GS5I/lXqUnnFoPqUZMUpAG1f35rAgsnIvFpeO+2oB18BT5FzmsiI+zr0oDacjybpIji3PLq0t7v8e4GpZ4/uYItv349WBHwpgxprX0JwxJ6m9CxpCoAPdboeeV5MXDV49bJe2PsA2mRt4W0gXSYIDLfQUu/ffdJI6RrcRUOq0/eV+dLy4H4F6QG8D5Fr0At3+LtrBNXmpx4lx+pSYWG0L1Ywggp82B8OA8fKhmnbO+k18FtRrJ4ro4LOqhENbtyDH+ORsRWpAbNEiblLZIeLg0/YAslkcT9bOyZkz3EeEjScT7svlxUE6yeWnfAWYMHL+/NaA0nyqxJiOqed+g4jBPg7vcyvoc7gBW+TfXraakR3RfQiFoUKcnZwCgVhfRkpCwh5O5AWYMe1YzYjJ22JKo3Jqyb8z0yCDIwUlk8HKARMsEg7y+094l9hwHFKiO6SWoZwiupTkdAbIa/lzyiMx+WUx8mLUTbvYjK9aXzC3dSOwS76MSJvTteaU4PsRcs8drB98L8tD6Vbobfzs18bvcKxkaKaqxUrLRkgYQEb1alFGamUzgzgMy5eHnlvzXqdzqA0xxpcO8InpV6VSjK3vRFCHbI+zliBNYdRvrTHYiIn4DV5we8w3aBYUCSxz5xXURzesoPRe2jt/i0idDwkmt9vfBWlGbCKbAZkeMRQzHio5X6FQqv0Xy+Wssd5o/AQ+6l7SIZEpDo7LkqkSyTVpBTqnAeCJ1P5qaqKgY+HTghC0A7rAKLO8OXJ3Z2Vie9wPsMa+Q1X78R88uHxlpLe6cpPaW7F6gCqD4soU+1OhkA700HvqS3/xnJZIL6K4N2lvS2F6+Wy3Rf0eu9YtJsCPx2Y3jFYM3lQtNlZH6oIPHDYaAjKnooGxW0xKEgM0FIH69ZgiiLfIVxy8lAEdtFrTpDWI6iCs6cNRnXwrDrnUvqxkQ1XjbAb6OpEQnjVz0CKjfQwmiGteJ4z+/HKXXLMeV0PrzdNLWRrzys+osKzTD7fhLipRj8z2fffcBoZta4X7z7YP7Pibn+3OQS3z/30FdaQgFQlXsrqNOEl5IemVXlg0CEhlZhlbBipu6kKf+ePTV7oeogecadKsHDWzaZENCZGlR19tgG/TElZ1O6v5dBKy8fqTRw4XFAUNv/FUOWlwW06ZkaIzIbP55+Iwxi+4tjRfC72f+1SQioY9Bnh2csKHgbN83pLe9ZnY84xm2bsjLljsX4dUZljKv/mJ8ilkbxEgTJbd2DACFC4h9eYxiOXNPlh8B7wEFdhfSatrPwkZWLcOCUYRloKUSi+ipstzBBBXW/NNov6hAcEvqDygG+Klc/bEgt4wvPijElobC+YraMsknpa72Bvqeb6SPEfImoGZ6f7zvY6EgO/zI1HSTbgBlcXZVliRYcawTyzGFfH8IkYJwrtcU6JPggOppyrTMpNQIPD6GKzpTopRRADdYuXRBemyFA/kU6Z3cA6d7vx67zJDl0+yb95JCts2GKH0P+5JStrqPHR3oRGT0t6XVpdXBk7dqeyX18cOMPBPIS3RpxjZog2ZaeWR08e1LRYnaZ3U8wFqd2aKKRNuT+M3o9b9UJftJi50Xb985yiHVwRRbGyzjHTPmA+IcimDlLP1A3RKBOCChNTei5rCRt+xydY5QyvhOI+W6jylO/Z0vg7t8kMTACSk/nG/wwT7urZEDWKQxwhtMlm+JnQfwe1ri9DxfAgaw0OlgQobry+N5itmX+kbW6ohvFIyPT91dmtjfrMjqsN83EpM8ZXatfkqRwbLsDdM4j/SdXbDZG/JLOVrsAoHt19emLaQaHIz/GstNaYJIAhcDsY7xQ2Fs43mQ07E2LMgOhxiyBFymAfOnt9DfMehhNMNZWwRSIpLSiG4aENuEUoePl+NPciTTd/eMgVIyW2wRXBctwwzk5xnmFK38JO2H5o/DqfmCg0Pl6opMqJfN3cAtgncrps2A7locPc0upjbX9bg0OramHVh3J8IrzENe1H4Eg0PXa9dRNcMrdysCFT+WLH2RM69EXwFI/eNxzyrnylvFME8gJs3O3JMdw81HZsp4Mw9jxcRUXWnxaYac3wqEJ0uFvBBb34sKr4g/FejGYtx5fjqaOoj5Z4dni50jVHt/Apfw0CP0L5VJnNwQaePhnrsZ+0pxuDSJbKwkuvtFMNcBalv5NhmIf6cUmV8fOww0JFOdShqwqn/HCKIXkTsyhnuc4OF5fp/Btf/Kwl7VGJfm+pHJprKn2tjDPH9BGNisfbYS3/ylqahcqLSjy89ReqiSa0zC4DoxHoGiwPQa9UKj9ERvuLFsAJkttVBOaTq3CzlrWZ+ea/O6+Q4lHc70G0glcPfDWRgYs1OD7w+XyjFvEO3xf9kf8FOo9eaKcwa6qKfyUeD6GrlNzu/eOMYqbUMmU8VFkwoeKBwHDIL1ZKH832ROCAL6oNgG52O9CLsncG8i5zdwZisekhHwHQ0G34HoaxyyN80kCnQq999Q0uF+OhjNRgulZqpAnXFKucclbTlgWGMKP2UY24LHfVyeiHX508VJCrfQvqCe+iJlddKrl9Z/bdZAsuJq4YxsOsw7UUYsHigDJOOhUXeVyGTXEcNMihGf5rYMhnornGoQX2Xq4lN6R2M5SWSUOULKpn8lOerwVAwK1lPFTWtFcWkgi/ol4dDOkE0beKuwm/U+XIaHhscXZvIzai4iFacTvSdgnwkmvkVA0lScFVf/vOHee4/P7NN5136QqNl46d2CPkvqBKJOPEKw2aD+9XRNZyG3Bzqm/x7oskGXtaqYwd5qApPWYtqNXcz4RiQqFWtvi5vFMKiqLW7uBoW73OOY1REYnHgI6NHqAJ6tK5ChPcBvxBiuTd/zJv+ogpk0Sax9qY60RcKyaGaPRKc7nTO9g9orWZD034hAtfeiHwJstHcz6DOkI3fZx8YTvPY+5u/ODQXasEncrdoibC+vPBm38fU/X88H8qJGo9QAR0gXYeosFAT+f6paMMDZijI2FX7T/QGc5Tj+jM9EhGlagtQk7Fq20+R/3hrwuZ15wnjoyUrbgFJ1YqvGSqmW1SEK1ub+lKXskKiBRoF6u9k03TXWCTvkS0w9PitDpKWFE/uwCALctB912M2naVS9+cqroAOOnRS2PfURt5iHgjZ2KUgTvBmTzw9IkpuwQG0/LfHPI3VLzQr71On4F7LnjwN2Mi9p5oMFaPogmfLW3ej/l/YJoV4ExJynfvXcbZZeb1jkfPUK363+mHJzKj9EE00LA6A8mTIzdb7U9i+WNyvJXjAK3kz3AuJ4dnGiheGXmxUjSUuKlAnZEs8+OjaeqzrDv7y6sV5TMWeWYWDVbQ1zwy+5Y1F0diLY2LHBycvWl3aQQsqC7EKE41ra5LvshJUB9/jLFcN4Pn63p1HUwpt5uqIkzpUZVxGiEhP7T51oxAlXvHK0ViSrrdlsuANfR2njF9Zj5njelrhxBY55K5ZNz7sqCEWdIgBn7J0eY5IDpyNKGGE66tanQFPKOe0HyuNQtllmc2pRp0Rw+Gv8MGY1jMAcB9fe1y+K+a56cIROMbAFqGXg3xLOKlPdiZBOBffbVywK9Kf84xGBcP3HGsOAU6Ps1sHeDVDCwjEurtkoH6gwObjQFm9ibKjAolsPfcxp8RN+zETM8f0eWeZRKk4nAIDPvOXvR0eZiQQQ7O7Cyg4LcRjfHJAa96OecWm7oPl0hnsg2N9cDDpyGHWDDPUTAQmMyaUA31ceizG8xccI38mxayT3Qotfp/bJylxlVSeheZZSqGElltaMGhVjZcgJdQHLTzTW7uXjWiguJquxOTP2g+FGNficrRlEo7eIqCNupxC/3H/lu9HTFpTpNuc4a8fdYrMKkZYsdhMxuyNqoyTYVdbQ0icam0uJGCWjHLAwexsayoH/pYkyI7+lK3KzoQ7Dbmok/rsvWsKefn7i+C80kV22S7ILg+tKcmZmD78CgxCQqpLNRm8A3D08bSyIF+R5kWis5k0wf8dZfF4BVmggi1A2Y1NqQgf7nOViGS6BPBVM0tlKccmYbE3tj9luOnmvKZz4PSVuGjHEV0qkCnHhImZvNEY7LF9cIe1ZvtSmUvH6EY16ryZNaH3s0fD0a5yK0/zF7E+5ZL6vrfdH7l/ZZIzDSL+FaViiUOcb8J8hsSlgK41B3sRjTWu9YE3+ckF9dXBTh/C1J562QcFcF9UB0PvxK9UXvbL8I3n1iuGoNkDv3g4q1yyU1SxUQQRsE2jCbb4drmZ/zilD/qXEsZAtd06S0MI50qcPDniq/qzQ/W7y1rNZMo9plCYDBkxtfeYdsamzbQTiwPIgq7P401QoRem93SOZEI8QUwPgXWZro11B+oz3q4AfGbqcWpRbrRjxhr6nu3Nm5Y4WYzQN//mX2eGORWtuF03d7JQlmHGYt/zHAPKCgc6f4Vhu04V2KqCg0SvLZwwaYbdVfxQWbYoOU94iv4nBZi/8jt2CvXmz9lIdT3Ne+u/lXLdCfcHUIgPQwTQowPwPjDC37bB4alyN/5EUHm7ScjZvVea9l0INXPyP1XZsW5vyO6cQbfL+0wiF6ZuRuMZxnAmMLYytjf4R1rxQ/qXNqBAORob+4ANhYGr+jIRh1N9fE/K3C4iP9wKjNo4BUrmK1iYNhjzAGki4/HQXmlsLE+gQf/JxZWjHKvpycxt/w3gQATO1+Ixnj8OneMpxT/SO8PlBgnvQg4VhvTZmF1AnpXMh/2MH/XZG9py1ZmmeJrP7QneY85ZARXB1Th2ft0RUKZZkoEPNwwzOE+Q9gwwtKrhlbdpMAXe4/BBGwNNjx6uzp5H5GSZuIMHRC+DR1JRzknx/onPIbvjUX8MVoM9vrXM2rpqJsePyqiBoVeZWNA2pPRysS3OnWJkLcC5eaCNo+46XKhanfHr1hC/RdKHDQOAz1Mx/oyyYblDGGQy2Rz5X4IqaqYKYq5omI2xHMnBAmrK5S8b12HnoAs53xXudZT+SdRTu8UTSyYVFqn+JZGUWOXeduhNawN88mhX+4hoGgexKX8tFOKydkR7/LGZywFWiYzG3RkVv1AgOAsuVHzPYm+dySSmVRKWlcrfiKdSKROtGUp+dMxu0XLERJ+Bb3BxYuqPIfe2QtidsBVSz9OLWcxyn40zcAahccKe3xPr618tKXkjBwVeJkVxGBo5tG/HS5BzaNl69vQP1quGziGQzLzQ7zuNuw77nuKQXDoePvqOxrP6hO+0EvGjXh+UEtDTK3XrNCV7xL2pizuHoayFC8TgZzXCyOiWGWfobHYcsHcgnlWE697wUtMq4gJZGvtxWd1Sl+QxglRxtgv58PNXM/RO6I1PEQh+yg+dlDcljnCquARe1of56XGq7ZsvXrQ+3Og635iJ2A/aHfQ7Vnyw03yRbxvCIjH4eG6rAX85hZTn6WX5GAJtp1Ee9dl7C91hkzNveO1IYHLXTeUR+msRTssMoyAHUosJ6SV5puQFQ98MExOc2RIQSJx/hvDXHJbCsHisDnUBlzZRuId0cFC3PxJrDNV0HisJ8Tnxf9wLUJm3vHDs8ewh3PIMWL//2sigmkOoqEPfdzjd5gUq+itVg53cmj2fFDZ2xdRAnR2tp9SwwhUXJayWNC1Gse9G+mFaW6XN6XJcD+HzEPSGIkTcFpXiXYSUwdE5EleF6nytY1434N4uu+ySBegKvEU5CA821nCmcXUEW7Fy95z7FD/U4zX5UljXc2EFvEuiERE2gaR7jg9hEjjGAJRpCKwDcfUPJ48RlMoX05L/4MAWjtvqUyNGV+ZArYsqfiPisPxxcysvI4ew+evomHIZH1KYosfUQ97yJWuSRqKfnnlMnGLAV143Uc0lk+zh56AAFCjMgRQ9ueIarmKe0ZjwXxmVW4NQ6B44E8uOiACqtNbdu0ScpOzvcI3INHQAoCpt9DxF+SEgvreanP+4l3lX4kPm1340vDak3MMp4U3Ts62y6fznS8Id1T+V/7pK4LriX+zktxhWjtZoZITeEy8HWIs64o7qemRRMAfjnTTaZ1ZqjOR23rZaDlC+G0ycJQM/dQ24nEY5n6RoZP0i+ftHwGoe3tFNRT9p3w8mVv01L1JmwPyYiN6mfNxTwD0hQSHBMS3tNVuiPJ+AosfOdQ5a3OVoIkRF6Cwf02TzFd334v4+iuBDyT7mbVcWVtw7536nSHUiWlgmKZXblwCR/y8ENkaTM2Q1+1fFyP+3KO3NuM0pd+e/zyhQmyzhosor1aohsU9ADnbTZZZ7SpM4EF98UISH630eENW+nIkpawXmr1IBtsdeZj46i9cb4j0NgDcJl0J+zHwCoUbX51hIiwX9JQIbxm/jPFWgmB8auNn7QgEnKPSlkhsmBVCaCCa+qm5b0ycH2nN915Q+xhTZK3BoZ5Le/J5AZltidEM3iLsJXm16ubL/cOpa8nhtZUbKdcbsDEn2ue0pBlxSFNV7HwNw0x+qhN4/F4PWftACt66P1Mq2JEcGJp8sDk8HKIgzkp6kyXubjqXxSHEpKWMNgbY/LDFeqn1n3r60SpVX0rBd3FQYk3m2tgzccU6CEp7wJ5WZT9csFe5p7yXl05CqCY2E/aog0rqUGY44Zv5XofhZK6UF9Lw8Ku78gtD8324xX0d+w1I8Z87X+53nA6zCDILw+E66Nd3qsWAv2JbN2V70XOeS+JAGrPgKobH9C/hmVHK+LLMprpkC97yoa043mpm5WLLVTxI1AqDipmANd8RS17CT/Gkrcqwf9wK3TVLh5alM57JGuuWt+izA4pTZOWh1fiTD2pCbirU6bYItGg3L0LO2qme7cY3M/wJH/kl5JNU9bFzhtFRQmCCt41/AG2jhXiLETrZxgY461wGQAhsAKegaRCjVYFMYaE3ky5PWoyGWhSxh3TN3eFIVukA7ykoBFwQVwO6MKFkHVTIAAI82YtJNdAEYvC6+mxHEQNnRXDtDXj7qJpf4fdlbf4QZWxLr++RZbTfWBT6AkuzLUnHNNImhfZwaopmGFRVC59xvlEpOn43ShWM9aU6WKNGkZhwgUNJVNimBcI+BHXwniKM7dK66JoQsNYS4agU7Sr6vFmcplTH7S/OmgifDG+OUMBJO5fWihmzrlXjxtwU60vZCvpBebixjlJ8TtLXXS1+/uuAatZVQmgfI4bMbINjwgD4YqUVipiOFswIhRQEni+fOBN7hOKPxzbpDxAp/vsNtSf/9I0OgQbtDBn+ACr43CXSFc6PsRfsOb09Zq0x+2MZnSzn81p4qXL4ME9w2Cz3k1ioYc5y666ZQ+Aucp3K4SfQ4ejGNo1iK3gVV2M4YZ1Bx4oymyv2cQhfqEoqqYqGO8A9nhS/8/Cb2erv+MAIDyS0DBygT1Wjsv3hO5dbj1ZrbbxNYHmma+5cMF4TTN7UB0RuRZzYTwDY21EOgJot7Jb6kHf9YAAX2dlCWXTtcPIeyK8s9YgBQ8jthh7fhhy5RnU9vLybmEWX1wR3aK2vAvrCZ6YbPu9ZFFQiFgIo2NKmEguRf37roEl4LG5FlNXjsrWGT3UwvIqLmAMogfGXbHfhRYMIHxxOiofC9UeusXuh7gh40XFRzzoZCOO7qhE2kqNTLMCO0UtRVM7/josAnq8fnIvGbb6PoeitpiBlLqrsua+NG/Lbo1gYRQChIIFpj9sq1IHMGj8s+HNw6/Y8HTpj+7SBfA9VS95WsO7Te+DKkvE613Oq5/VXogzA5I/4zYmrgG5Dkw4V6foWhkRfLJTEcLZBDKd2d/rvDv1eo+g2l2K5lccEhkBd3SdVtYOvwZOgXy5ftMQOd3eKOrt8YvGy151bu3dZnSQTSMEGJhG+IpdA9Jxns4V5gwGV6XECdhgnAAOEnzpqqOmfW824+PNPD5Wbh98zZmzfx6Zbt71+RRaB2uLsv+kPN5/L3SbzekL6KzWaqZfQdyiG6DpadY7994oRibynXzAfQ+/KZHk1JQME/hVef/J5eBcFr1PmA5/EiAHmwRxaycuH+gVNeRtWBtKwrj3t2QMAAAAJcRkEGz923dgYliKOeYt7++nL7APURgeB4uBsOlhXZ/aijZRSkrywUzd7Ru2Py3VCfVuBrPP+9PftAr0ajFlAe3TjpdVC/tab3J8KoNBQ0Bv3MGjXsKAnRAmO0OuA2MigzRs1dzThXw655/Xy32Nhu2tsVcCK0OXfmFXgxFc2I1dhJXv3razDByn0lNT8MLvgt7egrIb/4dXfBRQ0ztX7XWz42c/O8Oi0IKKlpXXVmunOmTBc2Sf+g34T1VJW0vYRWDd25s4akbeB/jBfVyYgaBKAmYg5nhE26S1QHT8jEKYLTsyI8cCX87Nf5Md2GXeYl9y6Elc4AKV30c7Llbk09+zcb+X4LtvIY6v0RExykK/WCcjl/VBpoppfGILLIwB2HxfcCUpAr5CSkj8nW/N6dk4xkkXH0C0Qk7bfT/LKvsGH11OkL54+2sCt/+eqT/JcIeqv3AkfFo5HWhw0bs/OJIQJurdHhW70LilDVVmfZOzN1KwldbUx9txIpuEdd2jAlVAAAASfISknmEY2Uz5ep1lKyvB1JaJ9moJsJbkQrSm5lTwc+/qCNZNeLdr4g3rQ6tfN1468p2h6FAJ6kj3jvxLxdmxGyNTK3Ke6AGSZYCII77zP7xT08T7ng6ywfr55C35cDb+O5T+Ue4a4tniMm9M/2E55m1hv6pVov8Vgp5lS+E5rBgv/U22C85gxii92QX7p+aLki4FMldFFMpP9rVE4gYCWoklOuRGOezf8CMDn+Jw5sG4f8cRQNZ8vTDYLD6eA/+6dZZPun4kHSB3qfKeBdynknPyxUMj+vfu9bL5Q7cmO4ofZi6Gf7VNCY47r5fQsMGK4c/nknfU6hJV7kWsZciN8poS6PCgCaxEbWdiUTxOZvIB7QQxQd9q7aH68inXoZUAbK3GHFJlT50C0C03DOIPU1ZTehehI9uAUaGQdcH4wEHXAJfoYV+ecJ21t4OBb3k+zxb5K0sjQX6oNpGFeGHiK45KSGpMzVhjPP/wlroF0r30EbuJfB/BehCQ9pSLh631O5N5l18bNmSOVYDQMvtFfbwH1dEJUPaxe1y1Ov+VZcqtlcb3Y2b7TRMqMfVB8zF5PArkdvE2Ll0mIUdGB4vyA7uv9OimH/l9YOYBHVdkygQFkcXF4ztv4ttJyhUxzsxus6nn9NgU98CnnOYGo95eYTEPRW7q4hejN4kDJmA1DSc4b8vXbSvnIiAZ89hr563/eM/qaxJbc5S54UJ8E+cYGNSK3sOAdbjeWcn2TIPEZ10ZeeZ93r2FDeneRTwN0JgPXegz+9n51FXeNRsWK3IvwMYAAr4fJLgH2RqqQ8INEq3GESUhv9F5Lqu5VAjqJy+Ow0iITeUafy33QG4yGSUMDnz2ax3tyT5npk2QuU6pqj4IM4GV4IHEi64Pyn4cyTe4MaWmZq/kqysrMk73+ZtudQ7I6T2XStn+GrLeQ9CxGC0r0T5tB7QhGFL/LuwW/s+YwQvFouw3d7mUCv00sFQeQVLQEUDTeGX4Ck58lBG5SKGhTjcOm1l7hlW2MjVsqeXfgTLH6MteBFT/vamVUVCKXO9pKTPWl0K033FmzlE3PtU08ik+GfNXBinJIbdf1u9un99SKG3qOLuQ9gw8oSHS09Pjrj8Mh82LnLWTqSQEQWdGkrUxHMB9g8sDLLyoymd+B5gf5aIgvgARhm5LafGsXj4HFkxlBUcGv/fCpVLPSyDAbKoawktnZN0GrYL+RUrcjd6A2omjGn6XKKPzZQoPhe9xXnMnfTxMv6JWW0oHGhMXuEnhPuDT3alPlQ39HMjZ0uW3xu734n/zu/wAcoPCaUJK08YBBn5o/GF/veRoomD/Hbw2Knkd2rOmhEqtnLvMXkRuH9XO4bPDyy4L8ew0XcePOe/8yhwL753ZuzJ4hr1wU88eSByDY3CpknRb1Bx+ERh1P/DrxL+3PdQzJEQyA16DHnq32jCnbJS2dr4HignwwM25k8rz+0ZWu6rbi4Vwcc/JN0Rv1cPxchZLueBwY+2agsz+ZL0NK3EzRnAeQWKt96znfGBhwGB5h9C2RCUdnm7l2RdCnFnACGzAAAABBhxAADY6SnBYv7JD3VNTZ/xm6dwNbJjTsgmhY9UW8dwCJEnXL81/dNpcpbiwQwn8156cXuEmbdtDquOjV/rA4DavzFl7V5oL/dHS6H/hDeH5ofOuzfZv4ee5C66U7szGGO34SJBgBSSTJAzXA1Hzlq55br0AR6cHmMDDgLaUlr+usVfCWmvAJHF8DP9yM2AiHiRqHMeBrxkwobLb1JTEqgVw4CsnWhT1oR4nTBr4hAz6O+gm5d/2eX5Po9CYeFGEgT6ExLunAiV8SZumg1qinPUO0/jHmvypuRCfB/IsVns1CJodolwWsOxlSMpqFMQXOolED+WywgxX3GHef6YmZAKQ64474ChHpI73ahemQAAAbsGiEV1pg/N9gk84ICjEt65/jUxBpKuEB28lPVrO8p+ZpBXaMhePtM1bLYMAgAAAAAJBBnDgAAAAAc9KclQAAAAAOsubAAAAAAgytJxCBQAAAAAAAAAAAAAAAAAABrC7S2K5TqdVAAAAAAAAAAAAA';
    var SCENE_LIGHT = 'data:image/webp;base64,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';

    /* 龙首徽记（御者给的图，白线取 alpha，当遮罩上色用） */
    var LOGO = 'data:image/webp;base64,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';

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
