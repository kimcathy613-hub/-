import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, BarChart3, HelpCircle, ArrowRight, RefreshCw, ShoppingCart, DollarSign, ArrowRightLeft } from 'lucide-react';
import { PricingOption } from '../types';

interface PricingProps {
  onNext: () => void;
}

export default function PricingLab({ onNext }: PricingProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(1); // default to 12元均衡

  const pricingOptions: PricingOption[] = [
    {
      price: 8,
      type: '走量模式',
      volume: 1000,
      profit: 2000,
      insight: "价格8元吸引了大量大中学生，客流爆满！每天销量冲破1000杯。但是由于降价导致单杯利润空间极低（仅有2元利润/杯），不仅员工累垮、原料周转困难，总利润也并不理想（2000元）。出现了典型的‘薄利多销’却‘产出效率低下’的情况。"
    },
    {
      price: 12,
      type: '均衡模式',
      volume: 600,
      profit: 4200,
      insight: "12元定价由于最贴合周边同类竞品和学生购买力，属于最合理的均衡价格！每日售出600杯，单杯净利润高达7元，总利润达到了顶峰（4200元）。这反映了商品供给量和消费者的最优平衡点，实现了生产要素利用的效率最大化！"
    },
    {
      price: 18,
      type: '高端模式',
      volume: 150,
      profit: 1950,
      insight: "18元的高价完全超出了周边高中生的常规零花钱支出预期，导致市场受冷销售量急剧萎缩到150杯。哪怕单杯利润达到13元的超级高点，由于消费者大幅弃选退缩，也根本无法支撑整体业绩，导致整体利润惨跌（1950元）。这也印证了高价格阻碍市场容量的铁律。"
    }
  ];

  const currentOption = pricingOptions[selectedIdx];

  // Calculations for visual bar heights representing cups and profits (Max volume is 1000, max profit is 5000)
  const volHeight = (currentOption.volume / 1000) * 180 + 20; // min 20px, max 200px
  const profitHeight = (currentOption.profit / 5000) * 180 + 20; // max 200px

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-widest text-[#a63b00] font-bold">第3章 · 价格与需求</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1a1c1c] font-bold mt-1">
          情景互动：奶茶定价实验室
        </h1>
        <p className="text-[#5f5e5e] text-lg font-serif mt-2">
          如果你是校门口这家奶茶摊的决策人，面对竞争和需求波动，你的销售量、单杯盈余和总利润会怎样改变？结合数据进行博弈！
        </p>
        <div className="h-1 w-24 bg-[#a63b00] mx-auto mt-3"></div>
      </div>

      {/* Main Interactive Sections */}
      <div className="grid grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Pricing Buttons Column */}
        <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="bg-white border-2 border-black p-6 brutalist-shadow flex flex-col gap-5">
            <h3 className="font-serif text-xl font-bold text-[#1a1c1c] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#a63b00]" />
              点击选择你的奶茶售价
            </h3>
            
            <div className="flex flex-col gap-4">
              {pricingOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full py-4 px-5 border-2 border-black flex justify-between items-center transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0 ${
                    idx === selectedIdx 
                      ? 'bg-orange-50 border-[#a63b00] brutalist-shadow-orange ring-1 ring-[#a63b00]' 
                      : 'bg-stone-50 brutalist-shadow-light'
                  }`}
                >
                  <span className="font-serif text-2xl font-bold text-[#1a1c1c]">
                    {opt.price} 元 / 杯
                  </span>
                  <span className={`font-mono text-sm font-bold ${
                    idx === selectedIdx ? 'text-[#a63b00]' : 'text-[#5f5e5e]'
                  }`}>
                    {opt.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* S/D Law theory box */}
          <div className="bg-[#a63b00] text-white p-6 brutalist-shadow-orange flex flex-col gap-3">
            <h3 className="font-serif text-xl font-bold">课本必背：价格决定需求法则</h3>
            <p className="text-sm font-sans leading-relaxed opacity-90">
              消费者需求量通常与价格反方向变动。当价格大幅上升时，消费者往往会弃置选择；当价格下降时，需求容量被显著唤醒。这就是基础的市场经济基本规律中的“需求规律”。
            </p>
          </div>
        </div>

        {/* Right Side: Charts and Advisor Insights */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          
          {/* Output analysis bar charts */}
          <div className="bg-white border-2 border-black brutalist-shadow p-6 flex flex-col justify-between flex-1 min-h-[340px]">
            <div className="flex justify-between items-center gap-4 flex-wrap border-b border-stone-200 pb-3 mb-4">
              <h3 className="font-serif text-lg font-bold text-stone-800">
                定价模拟动态图解 (24小时营业周期预测)
              </h3>
              <div className="flex gap-4 font-mono text-xs font-bold">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 bg-[#8f7065] border border-black shadow-[1px_1px_0px_#000]"></div>
                  <span>日销量 (杯)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 bg-[#a63b00] border border-black shadow-[1px_1px_0px_#000]"></div>
                  <span>总盈利 (元)</span>
                </div>
              </div>
            </div>

            {/* Custom chart diagram columns */}
            <div className="flex-1 flex items-end justify-around h-[220px] bg-stone-50/50 p-6 border-b-2 border-black/80">
              {/* Volume column */}
              <div className="flex flex-col items-center gap-3 w-28">
                <div className="w-full bg-[#eeeeee] border border-dashed border-stone-300 rounded-t-lg flex items-end h-[180px] relative">
                  <motion.div
                    animate={{ height: volHeight }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="w-full bg-[#8f7065] border-t border-[#1a1c1c] rounded-t-sm flex items-end justify-center pb-2 shadow-[2px_0px_0px_0px_rgba(0,0,0,0.15)_inset]"
                  >
                    <span className="text-white font-mono text-sm font-bold antialiased">
                      {currentOption.volume}
                    </span>
                  </motion.div>
                </div>
                <span className="font-serif text-sm font-bold text-stone-600">销售量(杯)</span>
              </div>

              {/* Profit column */}
              <div className="flex flex-col items-center gap-3 w-28">
                <div className="w-full bg-[#eeeeee] border border-dashed border-stone-300 rounded-t-lg flex items-end h-[180px] relative">
                  <motion.div
                    animate={{ height: profitHeight }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="w-full bg-[#a63b00] border-t border-[#1a1c1c] rounded-t-sm flex items-end justify-center pb-2 shadow-[2px_0px_0px_0px_rgba(0,0,0,0.15)_inset]"
                  >
                    <span className="text-white font-mono text-sm font-bold antialiased">
                      ¥{currentOption.profit}
                    </span>
                  </motion.div>
                </div>
                <span className="font-serif text-sm font-bold text-[#a63b00]">总收益(元)</span>
              </div>
            </div>

            {/* AI Advisor dialogue */}
            <div className="mt-4 flex gap-3 items-start bg-neutral-50/50 p-3 rounded-lg border border-black/5">
              <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center bg-white text-[#a63b00] shrink-0 mt-0.5">
                <Settings className="w-4 h-4 animate-spin-slow" />
              </div>
              <div className="flex-1 text-sm font-sans leading-relaxed text-stone-700">
                <span className="font-bold text-[#a63b00] block mb-1">定价实验室数据验证：</span>
                <p>{currentOption.insight}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fancy Double Flow loop */}
      <div className="h-44 border-2 border-black border-dashed bg-orange-100/10 flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-x-0 w-full h-full opacity-[0.04]">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-orange-950">
            <circle cx="50" cy="50" r="40" />
          </svg>
        </div>

        <div className="z-10 flex gap-12 items-center flex-wrap justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-black flex items-center justify-center text-[#ff5f00] brutalist-shadow-light">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <span className="font-serif text-sm font-bold">微观市场需求 (Demand)</span>
          </div>
          
          <div className="flex flex-col items-center">
            <ArrowRightLeft className="w-8 h-8 text-[#a63b00] animate-pulse" />
            <span className="font-mono text-xs text-[#a63b00] mt-0.5">反切耦合</span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-black flex items-center justify-center text-[#ff5f00] brutalist-shadow-light">
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="font-serif text-sm font-bold">价格杠杆信号 (Price)</span>
          </div>
        </div>
      </div>

      {/* Slide Navigator */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="bg-[#a63b00] text-white px-8 py-4 border-2 border-black rounded-lg brutalist-shadow font-serif text-lg font-bold flex items-center gap-2 hover:bg-[#ff5f00] transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          <span>进入第4节：竞争机制场景模拟</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
