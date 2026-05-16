import React, { useState } from 'react';
import LeftSubNav from '../LeftSubNav';

const SUB_TABS: {id: string; label: string; icon?: React.ReactNode}[] = [
  { id: 'teaser', label: '預告詐欺', icon: '🎬' },
  { id: 'styling', label: '奇葩打歌服', icon: '👗' },
  { id: 'tour', label: '巡迴斂財', icon: '✈️' }
];

export default function GlobalComeback() {
  const [activeTab, setActiveTab] = useState(SUB_TABS[0]?.id || '');

  return (
    <div className="relative w-full h-[100dvh] flex flex-col items-center justify-center bg-[#121214] text-white overflow-hidden">
      <LeftSubNav items={SUB_TABS} activeId={activeTab} onSelect={setActiveTab} />
      
      <div className="flex flex-col items-center p-8 bg-black/20 rounded-[32px] border border-white/5 shadow-2xl backdrop-blur-sm z-10 text-center">
        <h1 className="text-5xl text-tiffany font-heavy mb-4 tracking-widest drop-shadow-md pb-[4px]">
          全球回歸
        </h1>
        <p className="text-white/60 font-medium text-lg bg-white/5 px-6 py-2.5 rounded-full border border-white/5 shadow-inner">
          當前檢視區域：<strong className="text-macaron ml-2 tracking-wider">{SUB_TABS.find(t=>t.id===activeTab)?.label || '暫無內容'}</strong>
        </p>
      </div>
    </div>
  );
}
