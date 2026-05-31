import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, EyeOff, Hourglass, Layers, Puzzle, ArrowRight, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';

interface SynthesisProps {
  onNext: () => void;
}

export default function FailureSynthesis({ onNext }: SynthesisProps) {
  const [placedElements, setPlacedElements] = useState<string[]>([]);
  
  const originalElements = [
    { id: 'price', label: '价格信号 (Price)', desc: '反映供求关系，指明资源流动航标面' },
    { id: 'demand', label: '供求反馈 (Supply/Demand)', desc: '调节供求比例，指导生产规模变化' },
    { id: 'competition', label: '竞争激励 (Competition)', desc: '促进优胜劣汰，提供生产技术革新动力' }
  ];

  const handlePlace = (id: string) => {
    if (!placedElements.includes(id)) {
      setPlacedElements([...placedElements, id]);
    }
  };

  const resetAssembly = () => {
    setPlacedElements([]);
  };

  const isCompleted = placedElements.length === originalElements.length;

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-widest text-[#a63b00] font-bold">第5章 · 缺陷与失灵</span>
        <h1 className="font-serif text-3xl md:text-4xl text-[#1a1c1c] font-bold mt-1">
          本课总结：构建市场机制图谱
        </h1>
        <div className="h-1 w-24 bg-[#a63b00] mx-auto mt-3"></div>
      </div>

      {/* Assembly Game Board */}
      <div className="grid grid-cols-12 gap-8 items-stretch">
        
        {/* Left Interactive Drag-Drop Area */}
        <div className="col-span-12 lg:col-span-4 bg-white border-2 border-black p-6 brutalist-shadow flex flex-col justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2 mb-2">
              <Puzzle className="w-5 h-5 text-[#a63b00]" />
              组装课本核心概念
            </h2>
            <p className="text-sm font-sans text-[#5f5e5e] mb-5 leading-relaxed">
              点击下方“市场配置资源”的三大关键支柱，组装进入中央拼图。拼图组装完成后，即可解锁完整的《市场调节机制与局限》全景图谱。
            </p>

            <div className="flex flex-col gap-3">
              {originalElements.map((elem) => {
                const placed = placedElements.includes(elem.id);
                return (
                  <button
                    key={elem.id}
                    onClick={() => handlePlace(elem.id)}
                    disabled={placed}
                    className={`text-left p-4 border-2 border-black rounded-lg transition-all ${
                      placed 
                        ? 'opacity-40 bg-stone-100 line-through scale-95 pointer-events-none' 
                        : 'bg-stone-50 hover:bg-orange-50/50 hover:border-[#a63b00] brutalist-shadow-light cursor-pointer'
                    }`}
                  >
                    <span className="block font-serif font-bold text-sm text-[#1a1c1c]">{elem.label}</span>
                    <span className="block text-[11px] font-mono text-stone-500 mt-0.5">{elem.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-dashed border-stone-200 flex justify-between items-center text-xs">
            <span className="font-mono text-zinc-500">组装进度: {placedElements.length}/3</span>
            <button 
              onClick={resetAssembly} 
              className="flex items-center gap-1 hover:text-[#a63b00] underline font-mono font-bold cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              清空重置
            </button>
          </div>
        </div>

        {/* Right Board / Big Blueprint Box */}
        <div className="col-span-12 lg:col-span-8 bg-white border-2 border-black brutalist-shadow p-6 flex flex-col justify-center relative overflow-hidden min-h-[420px]">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key="incomplete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center p-8 space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#a63b00]/10 border-2 border-dashed border-[#a63b00] flex items-center justify-center animate-bounce">
                  <Puzzle className="w-8 h-8 text-[#a63b00]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#1a1c1c]">等待核心支柱组装完成...</h3>
                <p className="text-sm font-sans max-w-sm text-stone-500 leading-relaxed">
                  市场机制犹如一架精密的多维天平。只有填入价格、供求、竞争三大要素，市场才能够实现自主高效的资源流动配置。
                </p>
                <div className="flex gap-2 font-mono text-xs font-bold pt-4">
                  {originalElements.map((elem) => (
                    <span 
                      key={elem.id} 
                      className={`px-3 py-1 border border-black rounded-md ${
                        placedElements.includes(elem.id) ? 'bg-[#ff5f00] text-white shadow-sm' : 'bg-stone-50 text-stone-400'
                      }`}
                    >
                      {elem.id === 'price' ? '价格支柱' : elem.id === 'demand' ? '供求支柱' : '竞争支柱'}
                    </span>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                {/* Unlock banner */}
                <div className="bg-[#a63b00] text-white p-4 brutalist-shadow-orange rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    <div>
                      <h4 className="font-serif text-lg font-bold">全课机制图谱组装成功！</h4>
                      <p className="text-xs font-mono opacity-90">
                        价格、供求、竞争相互影响、相互作用，自发调节资本和劳动要素配置。
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs border border-white px-3 py-1 rounded bg-stone-900/10 font-bold">
                    100% 达成
                  </span>
                </div>

                {/* Grid of details: Market Failures (市场缺陷) */}
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#1a1c1c] border-b-2 border-black pb-1.5 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#a63b00]" />
                    警惕：市场调节局限“三大缺陷”（市场失灵）
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Failure card 1 */}
                    <div className="bg-stone-50 border-2 border-black rounded-lg p-4 brutalist-shadow-light">
                      <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-serif text-sm font-bold text-stone-900">自发性 (Spontaneity)</h4>
                      </div>
                      <p className="text-[11px] font-sans leading-relaxed text-stone-600">
                        在求利本质驱使下，极易产生假冒伪劣、不正当倾销等失序行为。<strong>例如：</strong>为了牟利，奶茶店可能非法使用劣质廉价人造原材料。
                      </p>
                    </div>

                    {/* Failure card 2 */}
                    <div className="bg-stone-50 border-2 border-black rounded-lg p-4 brutalist-shadow-light">
                      <div className="flex items-center gap-2 mb-2">
                        <EyeOff className="w-5 h-5 text-amber-600" />
                        <h4 className="font-serif text-sm font-bold text-stone-900">盲目性 (Blindness)</h4>
                      </div>
                      <p className="text-[11px] font-sans leading-relaxed text-stone-600">
                        经营者多头试探，极难掌握全面准确的需求信息，从而盲目跟风。<strong>例如：</strong>看到果茶火爆，周边一哄而上跟进开店，引发恶性竞争。
                      </p>
                    </div>

                    {/* Failure card 3 */}
                    <div className="bg-stone-50 border-2 border-black rounded-lg p-4 brutalist-shadow-light">
                      <div className="flex items-center gap-2 mb-2">
                        <Hourglass className="w-5 h-5 text-blue-600" />
                        <h4 className="font-serif text-sm font-bold text-stone-900">滞后性 (Lag)</h4>
                      </div>
                      <p className="text-[11px] font-sans leading-relaxed text-stone-600">
                        市场从降价、过剩到清仓调整是渐进的，常滞后于供需。<strong>例如：</strong>察觉到供过于求时，商家已采购过期积压，招致重大损折。
                      </p>
                    </div>
                  </div>
                </div>

                {/* Synthesis outcome quote */}
                <div className="bg-orange-50/50 border border-[#e4bfb1] p-3 text-xs text-stone-700 leading-relaxed font-sans rounded-lg">
                  因此，要实现国民经济的高效率平稳运行，必须要把市场这只“看不见的手”与政府在法制轨道和宏观调控层面的“有形之手”完美结合！
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Navigator */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="bg-[#a63b00] text-white px-8 py-4 border-2 border-black rounded-lg brutalist-shadow font-serif text-lg font-bold flex items-center gap-2 hover:bg-[#ff5f00] transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          <span>进入第6节：课后作业与 AI 实验室</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
