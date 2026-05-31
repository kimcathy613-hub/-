import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Compass, Award, Percent, AlertOctagon, HelpCircle, GraduationCap, 
  ChevronRight, ArrowLeft, RefreshCw, BarChart2, BookOpenCheck, Settings, Presentation
} from 'lucide-react';

// Subcomponents import
import ClassroomChat from './components/ClassroomChat';
import MarketMechanism from './components/MarketMechanism';
import PricingLab from './components/PricingLab';
import CompetitionScenario from './components/CompetitionScenario';
import FailureSynthesis from './components/FailureSynthesis';
import BentoHomework from './components/BentoHomework';
import { exportToPPTX } from './utils/pptxExport';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [userScore, setUserScore] = useState<number>(0);

  const menuItems = [
    { id: 1, label: '1. 导言 · 难题导入', desc: '奶茶店销量与要素选择', icon: GraduationCap },
    { id: 2, label: '2. 机制 · 供求调节', desc: '模拟酷暑下的供求变动', icon: Compass },
    { id: 3, label: '3. 价格 · 定价博弈', desc: '均衡售价的多态验证', icon: BarChart2 },
    { id: 4, label: '4. 竞争 · 优胜劣汰', desc: '商战下的客群流动机制', icon: BookOpenCheck },
    { id: 5, label: '5. 缺陷 · 市场失灵', desc: '三大缺陷与宏观配给', icon: AlertOctagon },
    { id: 6, label: '6. 总结 · 时政探究', desc: '时政大题与 AI 实验室', icon: Award }
  ];

  const handleNextSlide = () => {
    if (currentSlide < 6) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Calculate course progress percentage
  const progressPercent = Math.round(((currentSlide - 1) / 5) * 100);

  return (
    <div id="school-politics-container" className="min-h-screen bg-stone-100 flex flex-col font-sans select-none antialiased text-[#1a1c1c]">
      {/* Top Banner Row */}
      <header className="bg-white border-b-2 border-black z-20 sticky top-0 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#a63b00] text-white p-2 border-2 border-black rounded-lg brutalist-shadow-light">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#1a1c1c]">
              市场调节 — 统编版高中思想政治必修二
            </h1>
            <p className="text-[10px] font-mono text-stone-500 font-semibold tracking-wider">
              HIGH SCHOOL DYNAMIC CURRICULUM SERIES · CORE MODULES
            </p>
          </div>
        </div>

        {/* Course Progress Badge */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex flex-col text-right">
            <span className="font-mono text-stone-400">课程阅读进度</span>
            <span className="font-serif font-bold text-stone-800">{progressPercent}% 达成</span>
          </div>
          <div className="w-24 h-3 bg-stone-100 border border-black rounded-full overflow-hidden hidden md:block">
            <div 
              style={{ width: `${progressPercent}%` }} 
              className="h-full bg-gradient-to-r from-[#ff5f00] to-[#a63b00] transition-all duration-500"
            ></div>
          </div>

          <div className="px-3.5 py-1.5 bg-[#a63b00]/10 border border-[#a63b00] rounded text-xs font-mono font-bold text-[#a63b00] flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#ff5f00] rounded-full animate-pulse"></span>
            <span>学生角色：授课中</span>
          </div>
        </div>
      </header>

      {/* Main Framework Columns */}
      <div className="flex-1 flex flex-col lg:flex-row relative items-stretch">
        
        {/* Left Side Navigation Pane */}
        <aside className="w-full lg:w-72 bg-white border-b-2 lg:border-b-0 lg:border-r-2 border-black flex flex-col justify-between shrink-0">
          
          {/* Scrollable menu wrapper */}
          <div className="p-4 space-y-3 flex-1 lg:overflow-y-auto sidebar-scroll max-h-[300px] lg:max-h-none">
            <span className="font-mono text-[10px] uppercase text-stone-400 font-bold tracking-widest block px-2">
              微课堂课目章节 NAVIGATION
            </span>
            
            <nav className="space-y-1.5" aria-label="Course chapters navigation">
              {menuItems.map((item) => {
                const isActive = item.id === currentSlide;
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSlide(item.id)}
                    className={`w-full text-left p-3 border rounded-lg transition-all flex items-center gap-3.5 cursor-pointer ${
                      isActive 
                        ? 'bg-orange-50/80 border-[#a63b00] font-bold text-[#a63b00] shadow-[2px_2px_0px_#a63b00]' 
                        : 'bg-white border-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md border shrink-0 ${
                      isActive ? 'bg-[#a63b00] border-[#a63b00] text-white' : 'bg-stone-50 border-stone-200 text-stone-500'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block font-serif text-sm leading-none mb-1">{item.label}</span>
                      <span className="block text-[10px] opacity-80 font-mono tracking-tight leading-none">
                        {item.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* PPTX Export Integration Block */}
          <div className="p-4 border-t-2 border-stone-100 bg-stone-50/40">
            <h3 className="font-serif text-xs font-bold text-[#1a1c1c] mb-1.5 flex items-center gap-1.5">
              <Presentation className="w-4 h-4 text-[#a63b00]" />
              教师与自学辅助工具
            </h3>
            <p className="text-[10.5px] text-stone-500 leading-normal mb-3">
              可一键将本互动课堂的主干结构、核心论道与高考政治考点考情研究，导出为标准 PowerPoint (.pptx) 多媒体课件，方便用于大屏授课或课后巩固。
            </p>
            <button
              onClick={exportToPPTX}
              className="w-full py-2.5 px-4 bg-[#a63b00] hover:bg-[#8f3200] active:bg-[#7a2b00] text-white border-2 border-black rounded-lg brutalist-shadow-light font-serif text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <span>导出本课 PPTX 课件</span>
            </button>
          </div>

          {/* Quick Help Box */}
          <div className="p-4 border-t border-dashed border-stone-200 bg-stone-50/50 hidden lg:block">
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-[#a63b00] shrink-0 mt-0.5" />
              <div className="text-[11px] font-mono leading-relaxed text-stone-500">
                <strong>学习小技巧：</strong>
                时政分析非常注重“有形手与无形手”的科学配合。每一节互动数据都代表了真实的市场供给流动方向！
              </div>
            </div>
          </div>
        </aside>

        {/* Right Adaptive Interaction Canvas container */}
        <main className="flex-1 p-6 md:p-10 flex flex-col justify-between overflow-x-hidden min-h-[600px]">
          
          {/* Active section cross-fade transition */}
          <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                {currentSlide === 1 && (
                  <ClassroomChat onNext={handleNextSlide} />
                )}
                {currentSlide === 2 && (
                  <MarketMechanism onNext={handleNextSlide} />
                )}
                {currentSlide === 3 && (
                  <PricingLab onNext={handleNextSlide} />
                )}
                {currentSlide === 4 && (
                  <CompetitionScenario onNext={handleNextSlide} />
                )}
                {currentSlide === 5 && (
                  <FailureSynthesis onNext={handleNextSlide} />
                )}
                {currentSlide === 6 && (
                  <BentoHomework />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left/Right Step Buttons Footer */}
          <footer className="border-t border-black/10 pt-6 mt-8 flex justify-between items-center max-w-5xl mx-auto w-full">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 1}
              className="px-4 py-2 border-2 border-black bg-white rounded-lg brutalist-shadow-light font-serif text-sm font-bold flex items-center gap-1 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>上一章</span>
            </button>

            <span className="font-mono text-xs text-zinc-500 font-bold">
              第 {currentSlide} / 6 互动层 · 思想政治必修二教学研讨
            </span>

            <button
              onClick={handleNextSlide}
              disabled={currentSlide === 6}
              className="px-4 py-2 border-2 border-black bg-white rounded-lg brutalist-shadow-light font-serif text-sm font-bold flex items-center gap-1 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <span>下一章</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </footer>

        </main>
      </div>
    </div>
  );
}
