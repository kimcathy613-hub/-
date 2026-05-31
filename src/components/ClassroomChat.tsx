import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, MessageSquare, ArrowRight, User, HelpCircle } from 'lucide-react';
import { ChatMessage } from '../types';

interface ClassroomChatProps {
  onNext: () => void;
}

export default function ClassroomChat({ onNext }: ClassroomChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: '你好！我是你的 AI 政治课堂微导师。今天我们来探讨高中思想政治必修二《经济与社会》中的一个经典现象：当奶茶店面临销量下滑和竞争挑战时，背后的“市场调节”是如何悄悄发挥作用的？',
      timestamp: '05:04'
    },
    {
      id: '2',
      sender: 'owner',
      text: '销量下降怎么办？感觉压力好大呀。',
      timestamp: '05:05'
    },
    {
      id: '3',
      sender: 'ai',
      text: '别担心，店主！作为市场机制的微观主体，你可以考虑以下三大金牌策略：\n1. **降价促销**：降价刺激潜在消费，通过扩大销售量进行弥补。\n2. **推出新品**：差异化竞争，开发高附加值的创新产品。\n3. **增加热门原料采购**：紧跟社会热潮点，让商品供给贴合流行供求关系。',
      timestamp: '05:05'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestionChips = [
    "为什么降价能刺激需求？",
    "新品研发如何体现优胜劣汰？",
    "什么叫“看不见的手”调节资源配置？"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'owner',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      if (!response.ok) {
        throw new Error('API server issue');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (e) {
      // Local fallback in case of connection failure
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: '抱歉，本地服务器网络繁忙。不过请记住：市场经济中，价格变动是调节生产规模和人力资源要素流向的重要信号。我们可以点击下方按钮，进入第二关实地测试这些市场信号的功能！',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Intro block */}
      <div className="text-center">
        <span className="font-mono text-sm uppercase tracking-widest text-[#a63b00] font-bold">导言 · 情境导入</span>
        <h2 className="font-serif text-3xl md:text-4xl text-[#1a1c1c] font-bold mt-1">
          奶茶店的经营难题
        </h2>
        <div className="h-1 w-24 bg-[#a63b00] mx-auto mt-3"></div>
      </div>

      {/* Chat platform */}
      <div className="bg-white border-2 border-black rounded-xl brutalist-shadow flex flex-col h-[524px] overflow-hidden">
        {/* Chat header */}
        <div className="bg-[#eeeeee] border-b-2 border-black px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#a63b00] animate-pulse" />
            <span className="font-mono font-medium text-sm text-[#1a1c1c]">Policy AI Teaching Assistant</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs font-mono text-[#5f5e5e]">课堂授课状态: 在线</span>
          </div>
        </div>

        {/* Messaging box */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-stone-50/50 scroll-smooth">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'owner' ? 'ml-auto flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-black ${
                  msg.sender === 'owner' ? 'bg-[#ff5f00] text-white' : 'bg-[#1a1c1c] text-white'
                }`}>
                  {msg.sender === 'owner' ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-orange-400" />}
                </div>

                {/* Bubble card */}
                <div className={`rounded-xl px-5 py-3 border-2 border-black text-[15px] leading-relaxed brutalist-shadow-light ${
                  msg.sender === 'owner' 
                    ? 'bg-[#a63b00] text-white brutalist-shadow-orange-light' 
                    : 'bg-white text-[#1a1c1c]'
                }`}>
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`block text-right text-[10px] mt-1.5 ${
                    msg.sender === 'owner' ? 'text-stone-300' : 'text-stone-400'
                  }`}>
                    {msg.sender === 'owner' ? '店主 (你)' : 'AI微导师'} · {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1a1c1c] border-2 border-black text-white shrink-0">
                  <Sparkles className="w-5 h-5 text-orange-400 animate-spin" />
                </div>
                <div className="rounded-xl px-4 py-2 border-2 border-black bg-white">
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="w-2.5 h-2.5 bg-[#a63b00] rounded-full animate-bounce delay-100"></span>
                    <span className="w-2.5 h-2.5 bg-[#a63b00] rounded-full animate-bounce delay-200"></span>
                    <span className="w-2.5 h-2.5 bg-[#a63b00] rounded-full animate-bounce delay-300"></span>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Suggestion Chips */}
        <div className="px-6 py-2 border-t border-black/10 bg-stone-50 flex gap-2 overflow-x-auto whitespace-nowrap">
          {suggestionChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              disabled={loading}
              className="px-3 py-1 bg-white border border-black rounded-full text-xs font-mono font-medium hover:border-[#a63b00] hover:text-[#a63b00] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            >
              🚀 {chip}
            </button>
          ))}
        </div>

        {/* Input panel */}
        <div className="border-t-2 border-black px-6 py-4 bg-white flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            placeholder="询问AI微导师：什么是市场配置资源、价格如何形成等..."
            className="flex-1 px-4 py-2 bg-stone-50 border-2 border-black rounded-lg focus:outline-none focus:bg-white focus:border-[#a63b00] font-sans font-medium"
            disabled={loading}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || loading}
            className="bg-[#a63b00] hover:bg-[#ff5f00] text-white px-5 py-2 border-2 border-black rounded-lg brutalist-shadow-light font-bold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <span>发送</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Guide button footer */}
      <div className="border-t border-dashed border-[#e4bfb1] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-[#a63b00]">
          <HelpCircle className="w-6 h-6 shrink-0 animate-bounce" />
          <p className="text-sm font-medium font-serif leading-snug">
            提示：点击下方按钮或者章节目录，开始进行真实的场景实验，看看不同的决策对营收和供求指标的具体冲击！
          </p>
        </div>
        <button
          onClick={onNext}
          className="bg-[#a63b00] text-white px-8 py-4 border-2 border-black rounded-lg brutalist-shadow font-serif text-lg font-bold flex items-center gap-2 hover:bg-[#ff5f00] transition-colors active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
        >
          <span>开始探索市场机制</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
