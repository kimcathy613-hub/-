import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Zap, HelpCircle, ArrowRight, TrendingUp, Sparkles, MessageSquare, Flame } from 'lucide-react';
import { MarketShareChoice } from '../types';

interface CompetitionProps {
  onNext: () => void;
}

export default function CompetitionScenario({ onNext }: CompetitionProps) {
  const [activeStrategy, setActiveStrategy] = useState<'quality' | 'price' | 'ads' | null>(null);

  const strategies: Record<'quality' | 'price' | 'ads', MarketShareChoice> = {
    quality: {
      id: 'quality',
      title: '提升品质/研发新品',
      description: '优化原材料配方，推出芝士莓莓等季节限定新品。',
      shares: { player: 75, competitor: 25 },
      status: '长期领先',
      insight: '优胜劣汰！由于你聚焦产品质量和科技迭代创新，劳动效率和溢价能力远超同行，赢得了学生的深度信赖。大量的消费者资源与供应链资金源源不断地向你流来，这是竞争机制最核心的效率提升动力！'
    },
    price: {
      id: 'price',
      title: '发起价格战（恶性低价）',
      description: '推出“9.9元秒杀专区”并对全品类进行低级补贴。',
      shares: { player: 60, competitor: 40 },
      status: '利润预警',
      insight: '警报！降价虽然在短期内抢夺了对方的部分客群，但缺乏实际劳动生产率和精益管理的支撑，很快导致严重的行业生态利润耗损。这也再次说明：单纯的恶性价格战是不利于全社会资源的健康增值的。'
    },
    ads: {
      id: 'ads',
      title: '加大社交媒体与达人推广',
      description: '发力抖音探店与小红书打卡，绑定校区青春氛围营销。',
      shares: { player: 55, competitor: 45 },
      status: '品牌溢价',
      insight: '品牌活跃度有效提升！竞争的力量迫使你们两家茶饮店不遗余力地优化外观、服务与促销场景。差异化的广告让消费者拥有了更多、更多元的理性生活方式选择。'
    }
  };

  const handleChoice = (type: 'quality' | 'price' | 'ads') => {
    setActiveStrategy(type);
  };

  const currentStrategy = activeStrategy ? strategies[activeStrategy] : null;

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-widest text-[#a63b00] font-bold">第4章 · 竞争机制</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1a1c1c] font-bold mt-1">
          场景模拟：竞争机制博弈
        </h1>
        <div className="h-1 w-24 bg-[#a63b00] mx-auto mt-3"></div>
      </div>

      {/* Scenario introduction columns */}
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-7 space-y-4">
          <p className="font-serif text-xl leading-relaxed text-[#1a1c1c]">
            假如你正在经营学校门口的“优享茶饮”。突然，斜对街新开了一家名为其对手的<strong>“酷乐果茶”</strong>，装修风格现代时尚且大搞“买一送一”开业大酬宾。
          </p>
          <p className="font-serif text-xl font-bold text-[#a63b00] leading-relaxed">
            顾客开始分流！面对如此狂烈的外部挑战，你的竞争决策是什么？这如何牵引市场资源的转移？
          </p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <div className="relative overflow-hidden border-2 border-black rounded-xl brutalist-shadow aspect-video">
            <img 
              className="w-full h-full object-cover select-none" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-jndDQn_6DjGsE98BXCeAobqO9yIuaFfZaM5FONdLd0HF3PmsIZBJ-7JSm0j_nEyIHY6j7UC6uph6X6mwC0Ecz7FjSdyVFE6yCd7w4He85mLWaUhWcoGsDvM_6_XwtBzQLdURuaXUAqqgQmGH0lIk5ma803ajFz_QID21kOWjPkGCde-Vpnzine2JJ7a2qty5sp52Zlibgj8PMs4PqTY39OtOrfvZRdSRWGMOAsOcYBjHbDWRfNMIeL2FrFtzuo4eVEFhEFGg9qQ" 
              alt="Milk tea store interior styling"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Interactive 3 Strategic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">
        <button
          onClick={() => handleChoice('quality')}
          className={`group flex flex-col items-center p-6 bg-white border-2 rounded-xl text-center transition-all cursor-pointer hover:scale-[1.02] brutalist-shadow ${
            activeStrategy === 'quality' ? 'border-[#a63b00] bg-orange-50/50 scale-[1.02] ring-1 ring-[#a63b00]' : 'border-black'
          }`}
        >
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-orange-50 text-[#a63b00] mb-4">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold mb-1.5 text-stone-900">提升品质/研发新品</h3>
          <p className="text-stone-500 text-xs">优化配方，推出季节热销特色单品</p>
        </button>

        <button
          onClick={() => handleChoice('price')}
          className={`group flex flex-col items-center p-6 bg-white border-2 rounded-xl text-center transition-all cursor-pointer hover:scale-[1.02] brutalist-shadow ${
            activeStrategy === 'price' ? 'border-[#a63b00] bg-orange-50/50 scale-[1.02] ring-1 ring-[#a63b00]' : 'border-black'
          }`}
        >
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-rose-50 text-rose-600 mb-4">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold mb-1.5 text-stone-900">发起促销价格战</h3>
          <p className="text-stone-500 text-xs">打折促销，发起恶性低价秒杀圈地</p>
        </button>

        <button
          onClick={() => handleChoice('ads')}
          className={`group flex flex-col items-center p-6 bg-white border-2 rounded-xl text-center transition-all cursor-pointer hover:scale-[1.02] brutalist-shadow ${
            activeStrategy === 'ads' ? 'border-[#a63b00] bg-orange-50/50 scale-[1.02] ring-1 ring-[#a63b00]' : 'border-black'
          }`}
        >
          <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center bg-indigo-50 text-indigo-600 mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold mb-1.5 text-stone-900">加大社交舆论宣传</h3>
          <p className="text-stone-500 text-xs">发掘达人打卡，制造青年社圈潮流效应</p>
        </button>
      </div>

      {/* Dynamic shares simulation presentation panels */}
      <div className="bg-stone-50 border-2 border-black rounded-xl p-8 space-y-6 brutalist-shadow">
        <div className="flex justify-between items-center border-b border-stone-200 pb-3">
          <h4 className="font-serif text-lg font-bold text-[#a63b00]">
            市场占有率动态博弈运行器 (实时仿真结果)
          </h4>
          <span className="font-mono text-xs px-3 py-1 bg-[#1a1c1c] text-white rounded-full">
            状态: {currentStrategy ? currentStrategy.status : '等待选取策略'}
          </span>
        </div>

        {/* Dynamic Progress indicator Bars */}
        <div className="space-y-4">
          {/* Player stats bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm font-bold">
              <span>优享茶饮 (你)</span>
              <span className="font-mono text-[#a63b00]">
                {currentStrategy ? `${currentStrategy.shares.player}%` : '50%'}
              </span>
            </div>
            <div className="w-full h-7 bg-stone-200 border border-stone-300 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '50%' }}
                animate={{ width: currentStrategy ? `${currentStrategy.shares.player}%` : '50%' }}
                transition={{ type: 'spring', damping: 15 }}
                className="h-full bg-gradient-to-r from-[#ff5f00] to-[#a63b00]"
              ></motion.div>
            </div>
          </div>

          {/* Competitor stats bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm font-bold">
              <span>酷乐果茶 (竞争对手)</span>
              <span className="font-mono text-stone-600">
                {currentStrategy ? `${currentStrategy.shares.competitor}%` : '50%'}
              </span>
            </div>
            <div className="w-full h-7 bg-stone-200 border border-stone-300 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '50%' }}
                animate={{ width: currentStrategy ? `${currentStrategy.shares.competitor}%` : '50%' }}
                transition={{ type: 'spring', damping: 15 }}
                className="h-full bg-stone-500"
              ></motion.div>
            </div>
          </div>
        </div>

        {/* AI Insight popups */}
        <div className="border-t-2 border-[#1a1c1c] pt-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1a1c1c] border-2 border-black flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>
            <div className="bg-white border-2 border-black p-4 rounded-xl flex-1 brutalist-shadow-light">
              <span className="font-mono text-xs font-bold text-[#a63b00] block mb-1">AI 教师政治经济学讲解：</span>
              <p className="text-sm leading-relaxed text-stone-700">
                {currentStrategy 
                  ? currentStrategy.insight 
                  : '竞争机制是市场经济无形手能实现高效率的关键。点击上面任意选择卡片，感受在“优胜劣汰”法则面前，微观资源流向发生了何种波折？'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigator */}
      <div className="flex justify-between items-center border-t border-dashed border-stone-200 pt-6">
        <div className="bg-[#a63b00] text-white p-4 brutalist-shadow-orange rounded-lg flex items-center gap-3 max-w-lg">
          <MessageSquare className="w-6 h-6 shrink-0" />
          <p className="text-xs font-mono">
            <strong>核心要点：</strong>市场调节不仅是价格调节，更是强烈的竞争筛选。竞争迫使商品生产者改进技术，提高劳动效率，让资源自发流向效率更高、福祉最大的部门！
          </p>
        </div>

        <button
          onClick={onNext}
          className="bg-[#a63b00] text-white px-8 py-4 border-2 border-black rounded-lg brutalist-shadow font-serif text-lg font-bold flex items-center gap-2 hover:bg-[#ff5f00] transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer shrink-0"
        >
          <span>进入第5节：构建大课本全景图谱</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
