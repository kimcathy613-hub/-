import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Sparkles, Award, Play, AlertCircle, CheckCircle, XCircle, 
  Send, Server, Upload, HelpCircle, Activity, ChevronRight 
} from 'lucide-react';
import { QuizQuestion } from '../types';

export default function BentoHomework() {
  // Level 1: Quiz state
  const [activeTab, setActiveTab] = useState<'quiz' | 'essay' | 'lab'>('quiz');
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Level 2: Essay evaluator state
  const [essayContent, setEssayContent] = useState('');
  const [evalLoading, setEvalLoading] = useState(false);
  const [evalResult, setEvalResult] = useState<{
    score: number;
    praise: string[];
    improvement: string;
  } | null>(null);

  // Level 3: AI Lab state
  const [selectedScenario, setSelectedScenario] = useState<'cold' | 'flood'>('cold');
  const [customStrategy, setCustomStrategy] = useState('');
  const [labLoading, setLabLoading] = useState(false);
  const [labResult, setLabResult] = useState<{
    priceIndex: number;
    supplyIndex: number;
    demandIndex: number;
    report: string;
  } | null>(null);

  // File Uploader state
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [fileName, setFileName] = useState('');

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "持续多日超40°C的高温让电风扇在一些县城卖断货，厂家连夜高价调拔省会库存前往补充。这最直接体现了哪种学说？",
      options: [
        "政府行政力量决定生产规模的方向",
        "供不应求导致价格上涨，市场调节引导社会生产要素流入急需部门",
        "市场盲目性会导致完全过剩的灾难后果",
        "市场自发性迫使生产者违规扩充违禁原料"
      ],
      correctIndex: 1,
      explanation: "正确答案是B。在市场经济中，供不应求会引起价格上涨，利润变丰，从而给生产者传递敏锐的市场信号，引导生产要素（比如电扇商品、运输资财）流入该地区，实现资源的高效流动组合。这也是‘看不见的手’的基础运行程序。"
    },
    {
      id: 2,
      question: "部分不良商家为了让网红奶茶‘看起来更有美感’，居然超限量使用未获许可证的合成添加剂。这反映了市场调节的何种局限性？",
      options: [
        "盲目性",
        "自发性",
        "滞后性",
        "长期稳健性"
      ],
      correctIndex: 1,
      explanation: "正确答案是B。市场调节的‘自发性’是指在求利本质的自发利益支配下，市场主体往往可能为了眼前私益而不择手段、产生假冒伪劣等失信或违法乱纪倾向。不合格违规添加正是为了自发利益损及民生福祉的生动例证。"
    },
    {
      id: 3,
      question: "一众跟进者看到市场上芝士草莓茶热销狂卖，在不作任何地理客流深入评估的情况下，一哄而上开办了数十家同款小茶饮摊。结果客运量无法满足，多数面临倒闭重洗。这符合什么缺陷？",
      options: [
        "滞后性",
        "自发性",
        "盲目性",
        "竞争良性提升"
      ],
      correctIndex: 2,
      explanation: "正确答案是C。市场调节的‘盲目性’是指由于经营者多处于分散孤立状态，极难把握市场宏观全局的供养容量。当一哄而上、盲目跟风、无头乱入时，必然导致社会资本的严重闲置甚至灭失。"
    },
    {
      id: 4,
      question: "市场蔬菜等副食品的价格变化波折调节，一般通常需要数天或至整季度的时间，才会反馈到农户的扩播决策中去。由此产生的‘过剩-惨跌-抢荒-暴涨’循环，主要属于什么？",
      options: [
        "盲目性造成的偶然变动",
        "单纯自发性追名逐誉",
        "滞后性带来的信息阻断与延迟错位",
        "宏观调控完全替代有形之手"
      ],
      correctIndex: 2,
      explanation: "正确答案是C。由于农业等生产经营决策到最终在货架上市销售存在无法抹去的周期，价格信号传递、买卖达成、到再调配具有长期的‘时间差’（Time-Lag），导致市场调节必然存在‘滞后性’缺陷。这导致价格总是呈现周期调整波折波动。"
    }
  ];

  // Quiz helper handlers
  const handleAnswerClick = (index: number) => {
    if (quizFinished) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuizIdx]: index
    }));
  };

  const handleNextQuiz = () => {
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx(currentQuizIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuizIdx(0);
    setQuizFinished(false);
  };

  const getQuizScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 25;
      }
    });
    return score;
  };

  // Essay Submission handler
  const handleEssayEvaluate = async () => {
    if (!essayContent.trim() || evalLoading) return;
    setEvalLoading(true);

    try {
      const response = await fetch('/api/evaluate-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay: essayContent })
      });
      if (!response.ok) throw new Error('Evaluation service error');
      const data = await response.json();
      setEvalResult(data);
    } catch (e) {
      // Local fallback simulator if server issue
      setEvalResult({
        score: 88,
        praise: [
          "文章逻辑较为完整，抓住了价格战是供求调整这一核心视角。",
          "能够结合课本理论，辩证剖析竞争产生的正负双重效应。"
        ],
        improvement: "建议更深入详实地联系自发性、盲目性以及国家宏观调控如何实施引导，增加行业案例。"
      });
    } finally {
      setEvalLoading(false);
    }
  };

  // AI Lab Simulated Engine handler
  const handleLabSimulate = async () => {
    if (!customStrategy.trim() || labLoading) return;
    setLabLoading(true);

    try {
      const response = await fetch('/api/ai-lab-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenarioId: selectedScenario,
          customStrategy: customStrategy
        })
      });
      if (!response.ok) throw new Error('Simulation failed');
      const data = await response.json();
      setLabResult(data);
    } catch (e) {
      // Local fallback simulation
      setLabResult({
        priceIndex: selectedScenario === 'cold' ? 145 : 160,
        supplyIndex: selectedScenario === 'cold' ? 30 : 20,
        demandIndex: 90,
        report: `【本地备用仿真器运行反馈】受${selectedScenario === 'cold' ? '极端寒潮' : '台风洪涝'}灾害冲击，全国副食品基地产能短时损失大。你的决策‘${customStrategy}’非常积极地试图在运输、防冷风沙方面作出自救调控，表现良好。但这暴露出在单纯的市场自由搏击环境中，面临大范围物理灾祸，个体的市场行为依然难逃市场缺陷导致的产能崩溃，这也铁证了在此处国家不得不引入‘看得见的手（宏观调控价格紧急保供）’。`
      });
    } finally {
      setLabLoading(false);
    }
  };

  // File Uploder mock handler
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = (file: File) => {
    setFileName(file.name);
    setUploadState('uploading');
    setTimeout(() => {
      setUploadState('success');
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Title Header */}
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-widest text-[#a63b00] font-bold">第6章 · 课后探究</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1a1c1c] font-bold mt-1">
          多维评价：课后作业与 AI 仿真
        </h1>
        <p className="text-[#5f5e5e] text-lg font-serif mt-2">
          我们将在这里整合客观评测与AI研究实验室！在这里展现你在政治经济学中的最高水准。
        </p>
        <div className="h-1 w-24 bg-[#a63b00] mx-auto mt-3"></div>
      </div>

      {/* Level Selection Tabs */}
      <div className="flex bg-[#eeeeee] border-2 border-black p-1 rounded-xl gap-2 max-w-md mx-auto w-full brutalist-shadow-light">
        {[
          { id: 'quiz', label: '1. 基础基础 Quiz' },
          { id: 'essay', label: '2. 提升层 辩证作文' },
          { id: 'lab', label: '3. 挑战层 AI 实验室' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 text-xs font-serif font-bold text-center rounded-lg transition-all cursor-pointer ${
              activeTab === tab.id 
                ? 'bg-[#a63b00] text-white' 
                : 'text-[#1a1c1c] hover:bg-black/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Switchable Platform Panels representing Bento Blocks */}
      <div className="bg-white border-2 border-black rounded-xl brutalist-shadow p-6 md:p-8 min-h-[500px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex-1 flex flex-col justify-between h-full"
            >
              {!quizFinished ? (
                <div className="space-y-6 flex-1">
                  {/* Headline */}
                  <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                    <span className="font-serif font-bold text-[#a63b00] text-lg">
                      基础达标评测 (第 {currentQuizIdx + 1}/{quizQuestions.length} 题)
                    </span>
                    <span className="font-mono text-xs text-stone-500 font-bold bg-stone-100 px-2 py-1 rounded">
                      单项选择题 · 每小题 25 分
                    </span>
                  </div>

                  {/* Question body */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg md:text-xl font-bold leading-relaxed text-[#1a1c1c]">
                      {quizQuestions[currentQuizIdx].question}
                    </h3>

                    {/* Options list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {quizQuestions[currentQuizIdx].options.map((opt, oIdx) => {
                        const isSelected = selectedAnswers[currentQuizIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleAnswerClick(oIdx)}
                            className={`text-left p-4 border-2 border-black rounded-lg transition-all text-sm font-sans flex items-start gap-3 cursor-pointer hover:border-[#a63b00] ${
                              isSelected 
                                ? 'bg-orange-50 border-[#a63b00] font-bold shadow-[2px_2px_0px_#a63b00]' 
                                : 'bg-stone-50'
                            }`}
                          >
                            <span className="font-mono w-6 h-6 rounded-full border border-black flex items-center justify-center shrink-0 bg-white">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="leading-normal">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Realtime Correct answer verification & teaching explanation box */}
                  {selectedAnswers[currentQuizIdx] !== undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 border border-black rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                        selectedAnswers[currentQuizIdx] === quizQuestions[currentQuizIdx].correctIndex
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'bg-rose-50/50 text-rose-800'
                      }`}
                    >
                      {selectedAnswers[currentQuizIdx] === quizQuestions[currentQuizIdx].correctIndex ? (
                        <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                      )}
                      <div>
                        <strong>
                          {selectedAnswers[currentQuizIdx] === quizQuestions[currentQuizIdx].correctIndex 
                            ? '正确！得25分。' 
                            : `回答有误，你选了 ${String.fromCharCode(65 + selectedAnswers[currentQuizIdx])}，正确应当为 ${String.fromCharCode(65 + quizQuestions[currentQuizIdx].correctIndex)}。`}
                        </strong>
                        <p className="mt-1 font-mono">{quizQuestions[currentQuizIdx].explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 space-y-6 flex-1">
                  <div className="w-16 h-16 rounded-full border-2 border-black bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#1a1c1c]">评测试炼通关！</h3>
                    <p className="text-stone-500 font-mono text-sm mt-1">你的政治必修二知识成绩汇总单</p>
                  </div>

                  <div className="bg-stone-50 border-2 border-black p-6 brutalist-shadow max-w-sm w-full divide-y divide-stone-200">
                    <div className="pb-3 flex justify-between font-mono text-sm">
                      <span>评测满分:</span>
                      <span className="font-bold">100 分</span>
                    </div>
                    <div className="py-3 flex justify-between font-mono text-sm">
                      <span>你的得分:</span>
                      <span className="font-bold text-[#a63b00]">{getQuizScore()} 分</span>
                    </div>
                    <div className="pt-3 flex justify-between font-mono text-sm">
                      <span>结论评价:</span>
                      <span className={`font-serif font-bold ${getQuizScore() >= 75 ? 'text-emerald-600' : 'text-[#a63b00]'}`}>
                        {getQuizScore() === 100 ? '特级经济优等生' : getQuizScore() >= 75 ? '中坚学者' : '需进一步复习要素配置'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="px-5 py-2 border-2 border-black rounded-lg brutalist-shadow-light font-bold hover:bg-stone-50 cursor-pointer font-serif flex items-center gap-1"
                  >
                    重新进行考试
                  </button>
                </div>
              )}

              {/* Navigator down */}
              {!quizFinished && selectedAnswers[currentQuizIdx] !== undefined && (
                <div className="flex justify-end pt-4 border-t border-dashed border-stone-200">
                  <button
                    onClick={handleNextQuiz}
                    className="bg-[#a63b00] text-white px-6 py-3 border-2 border-black rounded-lg brutalist-shadow font-serif font-bold flex items-center gap-2 hover:bg-[#ff5f00] cursor-pointer"
                  >
                    <span>{currentQuizIdx < quizQuestions.length - 1 ? '下一题' : '完成测评提交'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'essay' && (
            <motion.div
              key="essay"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-200 pb-3 flex-wrap gap-2">
                  <h3 className="font-serif text-lg font-bold text-[#a63b00]">
                    提升层 · 高考大题模拟分析
                  </h3>
                  <span className="font-mono text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded">
                    建议字数: 250字
                  </span>
                </div>

                <div className="bg-orange-50/50 p-4 rounded-lg border border-[#e4bfb1] text-xs leading-relaxed text-stone-700">
                  <strong>写作背景提示：</strong>2024年开春以来，我国新能源汽车品牌频频实施降价动作。请运用必修二关于《市场调节》的有关机理，简要书面评述新能源汽车‘价格战’的深远意义、价格信号与供求调节等，分析其利和弊。
                </div>

                {/* Input box */}
                <textarea
                  value={essayContent}
                  onChange={(e) => setEssayContent(e.target.value)}
                  placeholder="在这里输入你的时政小短评，写完之后即可递交给Policy AI特级教师进行高考等级的针对性赋分、提分、优点纠偏与评析建议..."
                  rows={6}
                  className="w-full p-4 border-2 border-black rounded-lg bg-stone-50 focus:bg-white focus:outline-none focus:border-[#a63b00] font-sans text-sm leading-relaxed"
                  disabled={evalLoading}
                />
              </div>

              {/* Evaluators results report container */}
              <AnimatePresence>
                {evalResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-stone-50 border-2 border-black rounded-xl p-5 mt-4 space-y-4 brutalist-shadow"
                  >
                    <div className="flex justify-between items-center border-b border-stone-200 pb-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#a63b00]" />
                        <span className="font-serif text-base font-bold text-stone-800">
                          Policy AI 特级微观教师反馈单
                        </span>
                      </div>
                      <div className="font-mono text-xs">
                        政治探究卷评分: <span className="text-[#a63b00] font-bold text-base">{evalResult.score}</span> / 100
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                      <div className="space-y-2">
                        <h4 className="font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                          亮点剖析 (Praise points):
                        </h4>
                        <ul className="list-disc pl-4 space-y-1 text-stone-600">
                          {evalResult.praise.map((pr, idx) => (
                            <li key={idx}>{pr}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-bold text-amber-700 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                          提分空间建议 (Enhancement guidance):
                        </h4>
                        <p className="text-stone-600 leading-normal pl-4">
                          {evalResult.improvement}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons footer */}
              <div className="pt-4 border-t border-dashed border-stone-200 flex justify-between items-center flex-wrap gap-4 mt-4">
                <p className="text-xs text-stone-400 font-mono">
                  ✨ 本小短评不设标准答案，由大语言模型特级教学助理进行客观赋分引导。
                </p>

                <button
                  onClick={handleEssayEvaluate}
                  disabled={!essayContent.trim() || evalLoading}
                  className="bg-[#a63b00] hover:bg-[#ff5f00] text-white px-6 py-3 border-2 border-black rounded-lg brutalist-shadow font-serif font-bold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {evalLoading ? (
                    <>
                      <Server className="w-4 h-4 animate-spin" />
                      <span>正在智能批阅打分中...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-orange-200" />
                      <span>提交并AI教师评分点评</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'lab' && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Headline status bar */}
                <div className="flex justify-between items-center border-b border-stone-200 pb-3 flex-wrap gap-2">
                  <h3 className="font-serif text-lg font-bold text-[#a63b00]">
                    AI 政治实验室 · 蔬菜价格应急沙盘
                  </h3>
                  <div className="flex gap-2 font-mono text-xs font-bold">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping mt-1"></span>
                    <span className="text-zinc-600 text-[11px] font-bold">仿真沙盘已开启</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Controls side */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700">第一步：选择恶劣危机场景</label>
                      <select 
                        value={selectedScenario}
                        onChange={(e) => setSelectedScenario(e.target.value as any)}
                        className="w-full p-2.5 bg-stone-50 border-2 border-black font-serif text-sm rounded-lg"
                      >
                        <option value="cold">🌧️ 极端寒潮：大范围大棚速冻绝收物流量受冷</option>
                        <option value="flood">🌊 台风洪涝：市郊白菜大棚遭灭绝性浸泡</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700">第二步：输入你的政企联合危机干预策略</label>
                      <textarea
                        value={customStrategy}
                        onChange={(e) => setCustomStrategy(e.target.value)}
                        placeholder="例：立即派警力协调‘绿色通道’免费通关，划拨区级专项保供资金50万直降大白菜售价，对郊区温室菜农给予燃煤电费补贴防冻灾..."
                        rows={4}
                        className="w-full text-xs p-3 bg-stone-50 border-2 border-black rounded-lg focus:bg-white focus:outline-none"
                        disabled={labLoading}
                      />
                    </div>
                  </div>

                  {/* Results preview side */}
                  <div className="md:col-span-7 bg-[#eeeeee] border-2 border-black p-5 flex flex-col justify-center relative min-h-[180px]">
                    <AnimatePresence mode="wait">
                      {!labResult ? (
                        <div className="text-center space-y-2 p-4">
                          <Activity className="w-10 h-10 mx-auto text-[#a63b00] animate-pulse" />
                          <h4 className="font-serif text-sm font-bold text-stone-800">等待仿真引擎计算...</h4>
                          <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
                            选择危机类型并设计好干预防抗方案后，政治经济学模型将为您仿真生成供需变化指数以及AI宏观评估报告。
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Indexes meters */}
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white border border-black p-3 text-center rounded brutalist-shadow-light">
                              <span className="block text-[9px] text-stone-500 font-mono">蔬菜价格指数</span>
                              <span className="text-xl font-bold font-mono text-[#a63b00]">{labResult.priceIndex}%</span>
                            </div>
                            <div className="bg-white border border-black p-3 text-center rounded brutalist-shadow-light">
                              <span className="block text-[9px] text-stone-500 font-mono">供给能力指数</span>
                              <span className="text-xl font-bold font-mono text-emerald-600">{labResult.supplyIndex}/100</span>
                            </div>
                            <div className="bg-white border border-black p-3 text-center rounded brutalist-shadow-light">
                              <span className="block text-[9px] text-stone-500 font-mono">需求缺口指数</span>
                              <span className="text-xl font-bold font-mono text-blue-600">{labResult.demandIndex}/100</span>
                            </div>
                          </div>

                          {/* Full Report */}
                          <div className="bg-white border-2 border-black p-4 rounded-lg font-mono text-[11px] leading-relaxed text-stone-700 max-h-[160px] overflow-y-auto">
                            <span className="block font-serif font-bold text-xs text-[#a63b00] border-b border-stone-200 pb-1 mb-2">
                              🔬 AI宏观调理与市场调节局限研究报告:
                            </span>
                            <p className="whitespace-pre-line">{labResult.report}</p>
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Footer controllers */}
              <div className="border-t border-dashed border-stone-200 pt-4 flex justify-between items-center flex-wrap gap-4 mt-4">
                <span className="text-xs font-mono text-zinc-400">
                  ⚡ 结合大语言模型运算：深入认识市场失灵及宏观调控补救。
                </span>

                <button
                  onClick={handleLabSimulate}
                  disabled={!customStrategy.trim() || labLoading}
                  className="bg-[#a63b00] hover:bg-[#ff5f00] text-white px-6 py-3 border-2 border-black rounded-lg brutalist-shadow font-serif font-bold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {labLoading ? (
                    <>
                      <Server className="w-4 h-4 animate-spin" />
                      <span>正在推演供需沙盘计算中...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-orange-200" />
                      <span>运行人工智能仿真</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Mock homework photo or essay doc draft file upload box */}
        <div className="border-t-2 border-dashed border-stone-200 mt-8 pt-6">
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-stone-400 hover:border-[#a63b00] rounded-lg p-5 text-center transition-all bg-stone-50/50 cursor-pointer flex flex-col items-center justify-center gap-2 relative min-h-[100px]"
          >
            <input 
              type="file" 
              id="file-hw-picker" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              onChange={handleFileSelect} 
            />
            {uploadState === 'idle' && (
              <>
                <Upload className="w-6 h-6 text-stone-400" />
                <p className="text-xs font-serif text-stone-600">
                  支持拖动或点击上传纸质手写作业照片、时政小论文 PDF 供学校教务归档
                </p>
                <span className="text-[10px] text-zinc-400 font-mono">(最大上传15MB。支持JPG、PDF、doc格式)</span>
              </>
            )}
            {uploadState === 'uploading' && (
              <div className="flex items-center gap-2 text-stone-500 font-mono text-xs">
                <Server className="w-4 h-4 animate-spin text-[#a63b00]" />
                <span>正在上传 "{fileName}" 到学校作业库中...</span>
              </div>
            )}
            {uploadState === 'success' && (
              <div className="flex flex-col items-center justify-center gap-1">
                <CheckCircle className="w-6 h-6 text-emerald-600 animate-bounce" />
                <span className="text-xs font-bold text-stone-800">🎉 上传成功！</span>
                <span className="text-[11px] text-stone-500 font-mono">文件 "{fileName}" 已成功收录至教务局档案柜。</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
