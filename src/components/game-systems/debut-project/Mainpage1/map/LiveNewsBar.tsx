import React from 'react';
import { motion } from 'motion/react';

interface LiveNewsBarProps {
  latestDiscovery?: string;
}

export const LiveNewsBar: React.FC<LiveNewsBarProps> = ({ latestDiscovery }) => {
  return (
    <div className="absolute top-4 left-4 z-40 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-1.5 flex items-center gap-4 overflow-hidden w-[90%] max-w-2xl shadow-2xl">
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        <span className="text-white text-[10px] font-black tracking-tighter uppercase whitespace-nowrap">Global Industry News</span>
      </div>
      <div className="w-[2px] h-4 bg-white/20 shrink-0" />
      <div className="flex-1 overflow-hidden">
        <motion.div 
          animate={{ x: [-1200, 1200] }} 
          transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
          className="text-white/80 text-xs font-bold whitespace-nowrap flex gap-12"
        >
          <span>🚀 首爾總部宣告：新一代全球選秀計畫正式啟動！</span>
          <span>🔥 東京情報：地下舞團 L-Force 的表演在 SNS 上引發現象級關注。</span>
          <span>💎 洛杉磯消息：主流唱片公司正在尋找具備「西海岸之聲」的潛力新星。</span>
          <span>📡 技術連接：探員正在全球各地解析練習生數據流...</span>
          {latestDiscovery && <span>🌟 探員快訊：{latestDiscovery}！</span>}
        </motion.div>
      </div>
    </div>
  );
};
