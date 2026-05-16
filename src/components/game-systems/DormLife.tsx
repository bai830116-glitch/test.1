import React, { useState } from 'react';
import LeftSubNav from '../LeftSubNav';

const SUB_TABS: {id: string; label: string; icon?: React.ReactNode}[] = [
  { id: 'decor', label: '豬窩佈置', icon: '🛏️' },
  { id: 'food', label: '外送偷吃防禦', icon: '🍗' },
  { id: 'escape', label: '半夜翻牆防堵', icon: '🚧' }
];

export default function DormLife() {
  const [activeTab, setActiveTab] = useState(SUB_TABS[0]?.id || '');

  return (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-[#121214] text-white overflow-hidden">
      <LeftSubNav items={SUB_TABS} activeId={activeTab} onSelect={setActiveTab} />
      
      <div className="flex flex-col items-center p-8 bg-black/20 rounded-[32px] border border-white/5 shadow-2xl backdrop-blur-sm z-10 text-center">
        <h1 className="text-5xl text-tiffany font-heavy mb-4 tracking-widest drop-shadow-md pb-[4px]">
          團員日常
        </h1>
        <p className="text-white/60 font-medium text-lg bg-white/5 px-6 py-2.5 rounded-full border border-white/5 shadow-inner">
          當前檢視區域：
          <span className="mr-1">{SUB_TABS.find(t=>t.id===activeTab)?.icon}</span>
          <strong className="text-macaron ml-1 tracking-wider">{SUB_TABS.find(t=>t.id===activeTab)?.label || '暫無內容'}</strong>
        </p>
      </div>
    </div>
  );
}
