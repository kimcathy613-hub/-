import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Users, AlertTriangle, Scale, HelpCircle, RefreshCw, Layers, ArrowRight } from 'lucide-react';

interface MarketProps {
  onNext: () => void;
}

export default function MarketMechanism({ onNext }: MarketProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const profitVal = selectedOption === null ? '+0%' : (selectedOption === 1 ? '+45%' : '-12%');
  const shareVal = selectedOption === null ? '15%' : (selectedOption === 1 ? '32%' : '8%');
  const demandWidth = '95%';
  const supplyWidth = selectedOption === null ? '30%' : (selectedOption === 1 ? '85%' : '18%');
  const headerStatusText = selectedOption === null 
    ? '市场警报：\n供不应求' 
    : (selectedOption === 1 ? '资源流入：\n扩大生产' : '资源偏置：\n失去商机');

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header Selection */}
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-widest text-[#a63b00] font-bold">第2章 · 供求机制</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1a1c1c] font-bold mt-1">
          互动体验：模拟市场调节机制
        </h1>
        <p className="text-[#5f5e5e] text-lg font-serif mt-2">
          模拟情景：持续一周 38°C 酷暑高温席卷全城，学校门口“优享茶饮”销量猛增。
        </p>
        <div className="h-1 w-24 bg-[#a63b00] mx-auto mt-3"></div>
      </div>

      {/* Main Canvas Presentation Visuals */}
      <div className="grid grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Visual Scene Simulator */}
        <div className="col-span-12 lg:col-span-8 bg-white border-2 border-black brutalist-shadow p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          
          {/* Watermark/Sun decoration */}
          <div className="absolute right-[-40px] top-[-40px] opacity-5 rotate-12 select-none pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-[280px] h-[280px] fill-current text-[#a63b00] animate-spin" style={{ animationDuration: '30s' }}>
              <path d="M50 15a3 3 0 013 3v8a3 3 0 01-6 0v-8a3 3 0 013-3zm0 56a3 3 0 013 3v8a3 3 0 01-6 0v-8a3 3 0 013-3zM15 50a3 3 0 013-3h8a3 3 0 110 6h-8a3 3 0 01-3-3zm56 0a3 3 0 013-3h8a3 3 0 110 6h-8a3 3 0 01-3-3zM25.3 25.3a3 3 0 014.2 0l5.7 5.7a3 3 0 11-4.2 4.2l-5.7-5.7a3 3 0 010-4.2zm40.5 40.5a3 3 0 014.2 0l5.7 5.7a3 3 0 11-4.2 4.2l-5.7-5.7a3 3 0 010-4.2zM25.3 74.7a3 3 0 010-4.2l5.7-5.7a3 3 0 114.2 4.2l-5.7 5.7a3 3 0 01-4.2 0zm40.5-40.5a3 3 0 010-4.2l5.7-5.7a3 3 0 114.2 4.2l-5.7 5.7a3 3 0 01-4.2 0z" />
            </svg>
          </div>

          {/* Sub Header Status Indicator */}
          <div className="flex justify-between items-start gap-4 flex-wrap z-10">
            <div className="bg-[#a63b00] text-white px-4 py-2 border-2 border-black brutalist-shadow-orange inline-block">
              <span className="font-mono text-sm font-bold tracking-wide uppercase">奶茶店微观供求现状</span>
            </div>
            
            {/* Real-time Indicator Tag */}
            <div className={`px-4 py-1.5 border-2 border-black text-sm font-mono font-bold capitalize brutalist-shadow-light ${
              selectedOption === null 
                ? 'bg-amber-100 text-amber-800' 
                : (selectedOption === 1 ? 'bg-green-100 text-green-800' : 'bg-rose-100 text-rose-800')
            }`}>
              {selectedOption === null ? '⚠️ 现状：供求失衡' : (selectedOption === 1 ? '✅ 资源扩充' : '❌ 供求萎缩')}
            </div>
          </div>

          {/* S/D progress bars */}
          <div className="my-8 space-y-6 z-10 max-w-lg">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="flex items-center gap-1.5 text-[#ff5f00] font-serif">
                  <TrendingUp className="w-5 h-5" />
                  消费者排队需求度 (Demand)
                </span>
                <span className="font-mono">热度: 极度爆满</span>
              </div>
              <div className="h-5 bg-stone-100 border-2 border-black rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: demandWidth }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-[#ff5f00] to-[#a63b00]"
                ></motion.div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="flex items-center gap-1.5 text-[#5f5e5e] font-serif">
                  <Users className="w-5 h-5" />
                  本店出货产能/员工配给 (Supply)
                </span>
                <span className="font-mono">
                  {selectedOption === null ? '极缺人手/原料不足 (30%)' : (selectedOption === 1 ? '原料充足/三班倒 (85%)' : '孤军奋战/库存虚空 (18%)')}
                </span>
              </div>
              <div className="h-5 bg-stone-100 border-2 border-black rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: '30%' }}
                  animate={{ width: supplyWidth }}
                  transition={{ type: 'spring', damping: 15 }}
                  className={`h-full ${selectedOption === 1 ? 'bg-emerald-500' : (selectedOption === 2 ? 'bg-rose-500' : 'bg-stone-500')}`}
                ></motion.div>
              </div>
            </div>
          </div>

          {/* Bottom section of visual */}
          <div className="border-t border-dashed border-[#8f7065] pt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#a63b00]" />
              <p className="text-sm font-mono text-[#5f5e5e] font-medium whitespace-pre-line leading-relaxed">
                {headerStatusText}
              </p>
            </div>
            <p className="text-xs font-mono text-zinc-500 max-w-xs md:text-right">
              消费者排队时间过长，附近有新竞争对手已关注到这片蓝海，资源流动正在加剧。
            </p>
          </div>
        </div>

        {/* Right Column: Key metrics counters */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* Profit counter */}
          <div className="bg-white border-2 border-black brutalist-shadow p-6 flex-1 flex flex-col justify-between">
            <div>
              <span className="font-mono uppercase text-xs tracking-wider text-[#a63b00] font-bold block mb-1">
                ECONOMETRIC PROJECTION
              </span>
              <h3 className="font-serif text-lg text-[#1a1c1c] font-bold">
                我的奶茶店预估利润变动
              </h3>
            </div>
            
            <div className="my-3">
              <span className={`text-5xl font-mono font-bold block ${
                selectedOption === null 
                  ? 'text-amber-600' 
                  : (selectedOption === 1 ? 'text-emerald-600 animate-pulse' : 'text-rose-600')
              }`}>
                {profitVal}
              </span>
            </div>

            <div className="h-3 bg-stone-100 border border-black rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: selectedOption === null ? '20%' : (selectedOption === 1 ? '85%' : '5%') }}
                className={`h-full ${selectedOption === 1 ? 'bg-emerald-500' : (selectedOption === 2 ? 'bg-rose-500' : 'bg-amber-500')}`}
              ></motion.div>
            </div>
          </div>

          {/* Market share counter */}
          <div className="bg-white border-2 border-black brutalist-shadow p-6 flex-1 flex flex-col justify-between">
            <div>
              <span className="font-mono uppercase text-xs tracking-wider text-[#5f5e5e] font-bold block mb-1">
                MARKET PENETRATION
              </span>
              <h3 className="font-serif text-lg text-[#1a1c1c] font-bold">
                周边学生客流市场占有率
              </h3>
            </div>
            
            <div>
              <span className="text-4xl font-mono font-bold block text-stone-800">
                {shareVal}
              </span>
              <p className="text-xs font-mono text-[#5f5e5e] mt-1">
                {selectedOption === null 
                  ? '原有基准点占有率。' 
                  : (selectedOption === 1 ? '🎉 通过扩增产能，占领周边学生绝大多数市场！' : '😭 顾客排队不耐烦投向了竞争对手大本营。')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Selection Zone */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl text-[#1a1c1c] font-bold flex items-center gap-2">
          <Scale className="w-6 h-6 text-[#a63b00]" />
          作为茶饮经营者，你认为最符合社会资源最优化流动的选择是：
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
          {/* Selection Option 1 */}
          <button
            onClick={() => setSelectedOption(1)}
            className={`text-left p-6 bg-white border-2 rounded-xl transition-all brutalist-shadow flex gap-4 cursor-pointer hover:scale-[1.01] ${
              selectedOption === 1 ? 'border-[#a63b00] scale-[1.01] ring-2 ring-[#a63b00]/25' : 'border-black'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center shrink-0 ${
              selectedOption === 1 ? 'bg-[#ff5f00] text-white' : 'bg-orange-50 text-[#ff5f00]'
            }`}>
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-serif text-lg font-bold text-[#a63b00] mb-1">
                策略 A：增加兼职员工并提早扩采原料
              </span>
              <p className="text-[#5f5e5e] text-sm leading-relaxed">
                追加部分投资，扩大微观生产规模，提高牛奶与茶包储备，快速消化市场上的过度拥挤需求。
              </p>
            </div>
          </button>

          {/* Selection Option 2 */}
          <button
            onClick={() => setSelectedOption(2)}
            className={`text-left p-6 bg-white border-2 rounded-xl transition-all brutalist-shadow flex gap-4 cursor-pointer hover:scale-[1.01] ${
              selectedOption === 2 ? 'border-[#a63b00] scale-[1.01] ring-2 ring-[#a63b00]/25' : 'border-black'
            }`}
          >
            <div className={`w-12 h-12 rounded-lg border-2 border-black flex items-center justify-center shrink-0 ${
              selectedOption === 2 ? 'bg-[#1a1c1c] text-white' : 'bg-stone-100 text-stone-600'
            }`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-serif text-lg font-bold text-[#5f5e5e] mb-1">
                策略 B：静观气温起伏，维持原有配置
              </span>
              <p className="text-[#5f5e5e] text-sm leading-relaxed">
                谨慎观望，防止下周突然降温导致采购的鲜奶过期倒掉。避免任何额外的用工开支和存货风险。
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Reveal Learning Insight Panel */}
      <AnimatePresence>
        {selectedOption !== null && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-stone-50 border-2 border-black rounded-xl p-6 brutalist-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#a63b00] border-2 border-black text-white flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#a63b00]">
                  微观教师点评：供求变化是如何引导社会资源合理配置的？
                </h4>
                <p className="text-sm font-sans leading-relaxed text-[#1a1c1c]">
                  {selectedOption === 1 ? (
                    <>
                      <strong>正确！</strong>天气炎热导致需求激增，奶茶处于<strong>供不应求</strong>状态，预估销售利润上升。这吸引着你（作为市场主体）<strong>追加生产要素投资</strong>（召集兼职员工、购买更多原材料）。
                      在这个自发过程中，社会劳动和生产资金在价格与供求力量的牵引下流入了“奶茶行业”。这就是市场这只“看不见的手”发挥资源配置作用的表现！
                    </>
                  ) : (
                    <>
                      <strong>深思！</strong>这虽然能在短期内防范存货风险。但是在供不应求的巨大商机面前，由于你的<strong>供给量没有增加</strong>，导致排队时间过长，消费者福利受损；附近关注到该热度的新竞争者会快速切入瓜分走你的常驻客群，导致你的<strong>市场占有率萎缩</strong>。这也是市场自我调节机制中，竞争机制对滞后/被动主体的惩罚写照。
                    </>
                  )}
                </p>
                <div className="border-t border-stone-200 pt-3 flex justify-between items-center flex-wrap gap-2 text-xs text-zinc-500 font-mono">
                  <span>✨ 核心概念：本决策实质是生产要素（劳动、资本）在供求规律下的合理流动。</span>
                  <button 
                    onClick={() => setSelectedOption(null)}
                    className="flex items-center gap-1 hover:text-[#a63b00] underline font-bold cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    重新模拟本节
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide Navigator */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="bg-[#a63b00] text-white px-8 py-4 border-2 border-black rounded-lg brutalist-shadow font-serif text-lg font-bold flex items-center gap-2 hover:bg-[#ff5f00] transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          <span>进入第3节：奶茶定价实验室</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
