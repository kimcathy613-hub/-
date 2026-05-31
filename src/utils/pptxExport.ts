import pptxgen from "pptxgenjs";

export function exportToPPTX() {
  const pptx = new pptxgen();

  // Set global layouts (slide size etc.) - default 16:9 widescreen
  pptx.defineLayout({ name: 'WIDESCREEN_16_9', width: 10, height: 5.625 });
  pptx.layout = 'WIDESCREEN_16_9';

  // Master slide colors and styling function
  const addTextbookSlide = (
    pptxInstance: typeof pptx,
    title: string,
    chapterBadge: string,
    leftContent: { title: string; desc: string; bullet?: boolean }[],
    rightInsights: string[]
  ) => {
    const slide = pptxInstance.addSlide();
    slide.background = { color: "F5F5F4" }; // Soft academic stone gray

    // 1. External Brutalist solid box container
    slide.addText("", {
      x: 0.4,
      y: 0.4,
      w: 9.2,
      h: 4.825,
      fill: { color: "FFFFFF" },
      line: { color: "1A1C1C", width: 2 }
    });

    // 2. Beautiful Title Bar
    slide.addText(title, {
      x: 0.8,
      y: 0.65,
      w: 5.6,
      h: 0.5,
      fontSize: 18,
      fontFace: "Microsoft YaHei",
      color: "A63B00",
      bold: true,
      valign: "middle"
    });

    // 3. Right chapter indicator
    slide.addText(chapterBadge, {
      x: 6.4,
      y: 0.65,
      w: 2.8,
      h: 0.5,
      fontSize: 10,
      fontFace: "Microsoft YaHei",
      color: "5F5E5E",
      bold: true,
      align: "right",
      valign: "middle"
    });

    // 4. Little decorative bracket line
    slide.addText("", {
      x: 0.8,
      y: 1.15,
      w: 8.4,
      h: 0.02,
      fill: { color: "1A1C1C" }
    });

    // 5. Left Panel Content Building
    const textObjects = leftContent.flatMap(item => [
      { text: `${item.bullet ? "■ " : ""}${item.title}\n`, options: { bold: true, color: "1A1C1C", fontSize: 13 } },
      { text: `${item.desc}\n\n`, options: { color: "5F5E5E", fontSize: 10.5 } }
    ]);

    slide.addText(textObjects, {
      x: 0.8,
      y: 1.4,
      w: 5.2,
      h: 3.5,
      fontFace: "Microsoft YaHei",
      valign: "top"
    });

    // 6. Right Highlight Box Panel (高考热点)
    slide.addText("", {
      x: 6.3,
      y: 1.4,
      w: 2.9,
      h: 3.5,
      fill: { color: "FBFBFA" },
      line: { color: "E4BFB1", width: 1 }
    });

    // Add orange tag for exam guide
    slide.addText("【 高 考 考 点 研 析 】", {
      x: 6.4,
      y: 1.55,
      w: 2.7,
      h: 0.3,
      fontSize: 10.5,
      fontFace: "Microsoft YaHei",
      color: "A63B00",
      bold: true,
      align: "center"
    });

    const examObjects = rightInsights.flatMap(line => [
      { text: `${line}\n\n`, options: { color: "1A1C1C", fontSize: 10 } }
    ]);

    slide.addText(examObjects, {
      x: 6.45,
      y: 1.95,
      w: 2.6,
      h: 2.8,
      fontFace: "Microsoft YaHei",
      valign: "top"
    });
  };

  // --- SLIDE 1: Title Slides (封面扉页) ---
  const s1 = pptx.addSlide();
  s1.background = { color: "F5F5F4" };
  
  s1.addText("", {
    x: 0.4,
    y: 0.4,
    w: 9.2,
    h: 4.825,
    fill: { color: "FFFFFF" },
    line: { color: "1A1C1C", width: 2 }
  });

  s1.addText("", {
    x: 0.6,
    y: 0.6,
    w: 0.15,
    h: 4.425,
    fill: { color: "A63B00" }
  });

  s1.addText("《市场调节》互动探究教学课件", {
    x: 1.0,
    y: 1.1,
    w: 8.0,
    h: 0.8,
    fontSize: 28,
    fontFace: "Microsoft YaHei",
    color: "A63B00",
    bold: true,
    align: "left"
  });

  s1.addText("统编版高中思想政治必修二 · 《经济与社会》 · 第一单元", {
    x: 1.0,
    y: 2.0,
    w: 8.0,
    h: 0.4,
    fontSize: 13,
    fontFace: "Microsoft YaHei",
    color: "5F5E5E",
    bold: false,
    align: "left"
  });

  s1.addText([
    { text: "■ 机制体系：", options: { bold: true, color: "A63B00" } },
    { text: "阐释价格、供求、竞争机制如何自发流转生产要素。\n\n", options: { color: "1A1C1C" } },
    { text: "■ 局限透视：", options: { bold: true, color: "A63B00" } },
    { text: "深入认识市场调节的“自发性”、“盲目性”与“滞后性”。\n\n", options: { color: "1A1C1C" } },
    { text: "■ 理论结合：", options: { bold: true, color: "A63B00" } },
    { text: "辩证看待‘看不见的手’与国家宏观调控的‘有形之手’。", options: { color: "1A1C1C" } }
  ], {
    x: 1.0,
    y: 2.6,
    w: 8.0,
    h: 1.8,
    fontSize: 11.5,
    fontFace: "Microsoft YaHei"
  });

  s1.addText("Policy AI 高中政治智慧教研组 · 研制导出", {
    x: 1.0,
    y: 4.6,
    w: 8.0,
    h: 0.3,
    fontSize: 9.5,
    fontFace: "Courier New",
    color: "5F5E5E"
  });

  // --- SLIDE 2: 第一章 ---
  addTextbookSlide(
    pptx,
    "第一章 · 情境导入：奶茶店的微观困局",
    "01 / CONCEPT IMPORT",
    [
      {
        title: "微观面临考验",
        desc: "商品销量下滑、消费者行为变迁，构成了市场经济主体的最基础危机，也是市场调节反馈机制的起点。",
        bullet: true
      },
      {
        title: "要素面临流动",
        desc: "针对销量困境，店主拥有三种策略：降低销售单价、开发高附加值新品、调整供应链原料采购比例。",
        bullet: true
      },
      {
        title: "机制启示",
        desc: "微观经营主体并不是一成不变的。追求生存与收益最大化的动机，迫使每一项商业决策都会引起全社会资本与劳动的重新流转分配。",
        bullet: true
      }
    ],
    [
      "★ 企业运营：如何通过优化微观生产决策，主动迎接市场法则并寻找盈余对称，是考试必考内容。",
      "★ 企业必须根据供求信号与经营成本，寻找劳动要素的最优流转。"
    ]
  );

  // --- SLIDE 3: 第二章 ---
  addTextbookSlide(
    pptx,
    "第二章 · 机制剖析：酷暑暴涨下的供求调节",
    "02 / SUPPLY & DEMAND",
    [
      {
        title: "供给量与需求的失衡",
        desc: "天气酷热拉动学校周边冷饮店的排队量急剧飙升，瞬间形成严峻的“供不应求”。在此关系下，预估收益空间随之飙涨。",
        bullet: true
      },
      {
        title: "价格信号的吸引力",
        desc: "丰厚红利构成了最敏锐的价格诱惑。在机制牵引下，店主主动追加兼职劳力（劳动要素流入）、高倍量采买原奶包（资本要素流入）。",
        bullet: true
      },
      {
        title: "何为看不见的手",
        desc: "不需任何人强硬要求，依靠供求关系的冷热、价格涨落和竞争变迁，市场便自发完成了让社会闲置资源流向最契合急用部门的使命，实现了高效率配置。",
        bullet: true
      }
    ],
    [
      "★ 供求机制：价格、供求、竞争是‘无形手’不可缺少的三大支柱。",
      "★ 考查点着重于无形手如何指挥生产要素（劳动、资本、土地等）在不同行业自由组合配置，提升整体效能。"
    ]
  );

  // --- SLIDE 4: 第三章 ---
  addTextbookSlide(
    pptx,
    "第三章 · 博弈验证：价格与需求规律实验室",
    "03 / PRICING LAB",
    [
      {
        title: "走量模式 (低价8元)",
        desc: "销量虽冲破每日1000杯，但单杯毛利极度薄弱。即使劳累负荷重担，总盈利依然低矮（¥2000）。薄利多销在此处没有实现资源的使用效率最大化。",
        bullet: true
      },
      {
        title: "高端模式 (高价18元)",
        desc: "定价严重高出周边高中生可消费常态，需求迅速限缩到150杯。即使利润率高，因消费者的抛弃致使总盈余迅速崩跌（¥1950）。",
        bullet: true
      },
      {
        title: "均衡模式 (适中12元)",
        desc: "完美承接学生购买力，日售 600 杯而单杯净结余高，总总收益（¥4200）突破历史波峰。完成了供与求的最和谐中枢平衡。",
        bullet: true
      }
    ],
    [
      "★ 需求法则：商品消费容量与自身价格通常呈反方向方向。企业定价必须与消费弹性（必需品与高档品差别）深刻结合。",
      "★ 价格变动起到了微观调节和宏观反馈的信息中枢功能。"
    ]
  );

  // --- SLIDE 5: 第四章 ---
  addTextbookSlide(
    pptx,
    "第四章 · 商战对垒：竞争的力量与优胜劣汰",
    "04 / COMPETITION",
    [
      {
        title: "低价恶意倾销之困",
        desc: "遭遇竞争大敌“买一送一”，盲目采取低级杀价将令自身成本穿孔、耗散商业生态利润。单纯的恶劣价格战无益于长远资本增量。",
        bullet: true
      },
      {
        title: "品牌营销引导流量",
        desc: "发掘青年打卡文化、升级审美环境与周边关怀，实现产品非价格特征竞争，以品质软实力获得更高的溢价支撑力。",
        bullet: true
      },
      {
        title: "竞争的最崇高本质",
        desc: "竞争就像一具天然筛子，淘汰那些技术落后、劳力浪费低下的商家。逼迫着每个活下来的店主都必须精益求精、引进领先工艺，客观上实现了全社会生产力的巨大跃迁。",
        bullet: true
      }
    ],
    [
      "★ 竞争机制：高考常见核心。竞争会自发推动优胜劣汰。",
      "★ 它一方面刺激企业为了活命提升自主创新与劳动生产率，缩短‘个别劳动时间’，使资源趋向最高效集聚。"
    ]
  );

  // --- SLIDE 6: 第五章 ---
  addTextbookSlide(
    pptx,
    "第五章 · 课后总结：市场调节陷阱与科学调控结合",
    "05 / FAILURE & SYNTHESIS",
    [
      {
        title: "自发性 (Spontaneity)",
        desc: "在价值逐利红利趋势下，部分主观容易萌发偷工减料、滥用违规不合格添加剂等违法行径，危害社会公平、破坏整体诚信生态。",
        bullet: true
      },
      {
        title: "盲目性 (Blindness)",
        desc: "由于市场主体孤立分散、没有全知全能视野，往往一哄而上、盲目复制，导致产业跟风恶战，造成物质资本的闲置与重大流失。",
        bullet: true
      },
      {
        title: "滞后性 (Lag)",
        desc: "价格供求信号传导存在较长时间差。当农户看到菜贵、奶贵并播种大用时，供求通常已经面临过剩危险，具有事后性的特点、调整不及时。",
        bullet: true
      }
    ],
    [
      "★ 高考超级主观大题：辩证阐述‘无形手’与‘看得见的手（宏观调控）’的辩证统一关系。",
      "★ 特别在抗灾民生应急等大义层面，必须彰显中国制度依靠科学宏观调控、维持宏观平稳、保障社会公共福利的制度底线优势。"
    ]
  );

  // Trigger output download to user
  pptx.writeFile({ fileName: "[高中政治教研课件] 必修二《市场调节原理与博弈体验》.pptx" });
}
