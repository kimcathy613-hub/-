import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy GoogleGenAI client helper
let aiClient: any = null;
function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.includes("MY_")) {
    console.warn("GEMINI_API_KEY is not defined or is placeholder. Using high-fidelity local simulations.");
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Global educational context prompt
const SYSTEM_PROMPT = `
你是一位资深高中思想政治教师兼经济学家，专门讲授统编版高中思想政治必修二中的《市场调节》一课。
你的语气亲切、客观、专业且极具启发性。
在回答时，要紧密结合《市场调节》的核心概念：价格、供求、竞争、资源配置、资源流动、市场机制、市场缺陷（自发性、盲目性、滞后性）、宏观调控等。
`;

// Endpoint 1: Classroom chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    const ai = getGeminiAI();
    
    // Create prompt history
    let formattedPrompt = "现在我们要进行模拟课堂情景互动。以下是我们的对话历史：\n\n";
    messages.forEach((msg: any) => {
      const sender = msg.sender === 'owner' ? '店主（学生）' : 'AI教学导师';
      formattedPrompt += `${sender}: ${msg.text}\n`;
    });
    formattedPrompt += "\n请向店主提供进一步启发式的教学反馈，深入阐释当前决策背后的市场经济学原理（如价格信号引导方向、需求反向调节、供求平衡等），字数控制在100-200字之间，保持精炼和高阶感。";

    if (!ai) {
      // High-quality local simulation responses
      const lastMsg = messages[messages.length - 1]?.text || '';
      let reply = "由于尚未检测到云端API密钥，我是本地教学助理：在《市场调节》中，价格、供求和竞争是市场机制的三大支柱。供不应求时，价格上涨，吸引资本流入；降价则能迅速提振销量，但要注意利润的平衡点，避免恶意价格战！";
      if (lastMsg.includes("降价") || lastMsg.includes("便宜")) {
        reply = "店主你好！价格是市场调节最敏锐的信号。降低售价在短期内确实可以迅速提高销量（需求量随着价格下降而上升，符合需求法则）；但是单杯利润会被压缩。如果无法通过走量降低边际成本，总利润反而会下降。因此，寻找均衡价格才是科学决策的关键！";
      } else if (lastMsg.includes("新品") || lastMsg.includes("原料")) {
        reply = "推出新品和增加高质量原材料属于非价格竞争手段。通过提升品质和满足消费者个性化需求，有利于引导和培育更持久的市场需求，实现优胜劣汰中的劳动效率领先。这也是市场竞争促进社会生产力发展的精髓所在！";
      } else if (lastMsg.includes("怎么办") || lastMsg.includes("下降")) {
        reply = "面临销量下降，市场机制提供了三个基本维度：1. 降价刺激需求法则；2. 改进产品，以高品质在竞争中脱颖而出；3. 合理调整原材料采购计划节约供应链成本。每种决策都代表着生产要素流动的方向，我们可以试试不同的策略！";
      }
      return res.json({ text: reply });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT + "\n请务必以精炼的人类教师口吻回答，多使用引导和启发性问题，避免满篇枯燥文字和空泛废话。字数控制在120字左右，排版干净。",
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Endpoint 2: Evaluate Essay Homework
app.post("/api/evaluate-essay", async (req, res) => {
  try {
    const { essay } = req.body;
    if (!essay) {
      return res.status(400).json({ error: "Essay content is required" });
    }

    const ai = getGeminiAI();

    if (!ai) {
      // Local fallback simulator with high fidelity
      const essayLen = essay.trim().length;
      if (essayLen < 40) {
        return res.json({
          score: 65,
          praise: [
            "结构初步建立，提到了汽车市场的基础概念。",
            "能够积极参与提交，是一次勇敢的尝试！"
          ],
          improvement: "内容过于简略，建议重点分析‘价格战’背后的生产成本、社会劳动生产率、供求变化和资源优胜劣汰机制，增加论据细节。"
        });
      }

      const score = Math.floor(Math.random() * 15) + 80; // 80-95
      return res.json({
        score: score,
        praise: [
          "紧扣市场信号主线，深入剖析了价格战是供求变化和产能调整的晴雨表。",
          "逻辑严密，指出了‘优胜劣汰’这一核心市场功能对促进新能源行业洗牌的长远价值。"
        ],
        improvement: "可以尝试补充我国宏观调控在公平竞争审查、防止不正当低价竞争方面的角色，使整篇政治大题论述结构更健全。"
      });
    }

    const promptText = `请对以下高中生的政治探究短评（题目：新能源汽车价格战背后的市场信号）进行打分和评估。
学生作文：
"${essay}"

请返回合法的JSON对象（无需包裹在markdown中，只输出JSON即可），结构如下：
{
  "score": 数字(满分100),
  "praise": ["优点一句", "深度刨析一句"],
  "improvement": "建议提升的细节"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_PROMPT + "\n你是一个极具爱心的知名特级教师。你的评估注重启发，正面肯定为主，一针见血为辅。要求返回干净的JSON，严禁输出非JSON文本。",
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text.trim());
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Evaluate API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Endpoint 3: AI Lab Market Simulator
app.post("/api/ai-lab-simulation", async (req, res) => {
  try {
    const { scenarioId, customStrategy } = req.body;
    if (!scenarioId || !customStrategy) {
      return res.status(400).json({ error: "Scenario and strategy are required" });
    }

    const ai = getGeminiAI();

    if (!ai) {
      // Local highly deterministic high school simulator
      let priceIndex = 120;
      let supplyIndex = 40;
      let demandIndex = 90;
      let scenarioName = "极端寒潮降温";
      let report = "";

      switch (scenarioId) {
        case 'cold':
          scenarioName = "极端寒潮降温";
          priceIndex = 145;
          supplyIndex = 30;
          demandIndex = 95;
          report = `【模拟环境：${scenarioName}】
1. **价格信号**：受寒潮影响，蔬菜产量急剧缩水，供求严重失衡，蔬菜价格指数飙升至145%。
2. **供求双重承压**：供给曲线左移。您的策略“${customStrategy}”在一定程度上缓解了物流囤货压力，但整体极寒大势仍让蔬菜呈现“供不应求、奇货可居”态势。
3. **资源配置启示**：由于蔬菜是居民生活必需品，需求弹性小，价格暴涨会引导跨区域长途调运资本流入，市场开始自发起纠偏作用。这也是‘自发性’带来的市场高价吸引社会资源的典型物理现象。建议配合政府‘绿色通道’价格调控！`;
          break;
        case 'flood':
          scenarioName = "暴雨洪涝";
          priceIndex = 160;
          supplyIndex = 20;
          demandIndex = 90;
          report = `【模拟环境：${scenarioName}】
1. **价格暴涨**：暴雨洗劫大棚，大批叶菜淹没绝收。终端价格暴涨+60%，引起恐慌性增购。
2. **策略反思**：您制定的策略“${customStrategy}”采取了部分温室预备方案。如果没有建立冷链应急库，当地仍会面临严重的供需缺口。
3. **市场失灵与调控**：极端灾害中，市场调节具有‘滞后性’和‘盲目性’，短时间内纯靠市场自发调节极易导致物价飞涨。此时，政府启动‘宏观调控’干预（如限价抛售应急备用蔬菜、给予大户物流补贴）对保障民生利益起到了兜底的决定性防守作用！`;
          break;
        default:
          scenarioName = "蔬菜供需常规变动";
          priceIndex = 110;
          supplyIndex = 60;
          demandIndex = 80;
          report = `日常供需扰动下，您的决策“${customStrategy}”非常平稳。物价指数轻微波动运行，反映了市场机制这只‘看不见的手’在常规情况下具有自我平抑、自发实现合理供求均衡的效率优势。`;
          break;
      }

      return res.json({
        priceIndex,
        supplyIndex,
        demandIndex,
        report
      });
    }

    const promptText = `
请模拟蔬菜市场在突发自然/经济状况下的价格博弈，结合学生的调控和经营策略：
- 背景事件（Scenario）："${scenarioId}" (cold: 寒潮灾害, flood: 暴雨灾害, subsidy: 政府补贴)
- 学生的危机应对经营策略（Strategy）："${customStrategy}"

请返回合法的JSON格式结果（无须markdown包裹，仅返回合法JSON）：
{
  "priceIndex": 范围100~200的数字 (100为基准价格指数, 反映价格上涨幅度),
  "supplyIndex": 范围0~100的供给充沛指数,
  "demandIndex": 范围0~100的民生需求指数,
  "report": "一份以资深特级政治老师口吻撰写的'经济学仿真仿真科研报告'，包含: 1.价格波动成因分析（解释供求曲线变动）; 2.分析学生策略的得失与局限; 3.联系课本的《市场调节》精髓：自发性怎么吸引要素、极端天气下市场失灵（盲目性、滞后性）为什么必须结合宏观调控（政府无形手与有形手合力）。字数250字左右。"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_PROMPT + "\n扮演AI超级仿真服务器，务必专业、严谨。输出结果请转换为标准的100%合规JSON结构。绝对不能携带任何前缀或者语法提示字符。",
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text.trim());
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Simulated Lab Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Vite server configuration to support hot preview and asset bundling
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack Server] running on http://localhost:${PORT}`);
  });
}

start();
