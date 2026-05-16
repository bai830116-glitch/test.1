import React from 'react';

export function StreetBackgroundLayer({ activeRegion, isNight, currentSeason }: { activeRegion: string, isNight: boolean, currentSeason: string }) {
   return (
      <div className="absolute inset-0 z-10 perspective-[1200px] overflow-hidden pointer-events-none">
         <div className="w-full h-full min-w-[1372px] relative origin-bottom">
            {/* 遠景地標層 */}
            <div className="absolute bottom-[35%] w-full flex justify-center opacity-100 z-[12]">
                {activeRegion === 'Seoul' && (
                   <div className="flex flex-col items-center absolute right-[15%] md:right-[18%] bottom-[50px] scale-[1.2] md:scale-[1.5] origin-bottom drop-shadow-[0_0_30px_rgba(30,41,59,0.5)]">
                       <div className="w-1.5 h-32 bg-zinc-600 mb-[-1px]" />
                       <div className="w-12 border-b-[20px] border-b-red-400 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent mb-[-2px]" />
                       <div className="w-16 h-8 bg-red-400 rounded-full border-[2px] border-black shadow-[0_0_20px_rgba(248,113,113,0.4)] flex justify-center items-center z-10">
                          <div className="w-12 h-2 rounded-full bg-white opacity-40 blur-[2px]" />
                       </div>
                       <div className="w-12 border-b-[180px] border-b-zinc-400 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent -mt-4 bg-zinc-400/90" />
                       <div className="w-[400px] h-32 border-t-[6px] border-black rounded-[100%] absolute bottom-[-40px] -z-10 shadow-inner" style={{ backgroundColor: isNight ? '#0f172a' : '#1e293b' }} />
                   </div>
                )}
                {activeRegion === 'Tokyo' && (
                   <div className="flex flex-col items-center absolute right-[25%] bottom-[0px] scale-[1] md:scale-[1.2] origin-bottom drop-shadow-[0_0_30px_rgba(127,29,29,0.3)]">
                       <div className="w-2 h-24 bg-red-600 shadow-xl" />
                       <div className="w-16 border-b-[60px] border-b-white border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent" />
                       <div className="w-20 h-4 bg-red-600 border-[2px] border-black shadow-[0_0_15px_rgba(220,38,38,0.6)] z-10" />
                       <div className="w-32 border-b-[160px] border-b-red-600 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent shadow-[0_0_40px_rgba(220,38,38,0.5)]" />
                   </div>
                )}
                {activeRegion === 'LA' && (
                   <div className="flex flex-col items-center absolute left-[10%] bottom-[80px] scale-[1.2] md:scale-[1.5] origin-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] opacity-90">
                       <div className="flex z-10 font-black text-6xl tracking-widest text-[#f8fafc] rotate-2 mix-blend-overlay">
                          <span className="transform rotate-[1deg] translate-y-1">H</span>
                          <span className="transform -rotate-[2deg] -translate-y-1">O</span>
                          <span className="transform rotate-[3deg] translate-x-1">L</span>
                          <span className="transform -rotate-[1deg] -translate-y-2">L</span>
                          <span className="transform rotate-[2deg] translate-y-1">Y</span>
                          <span className="transform -rotate-[3deg]">W</span>
                          <span className="transform rotate-[1deg] translate-x-1 translate-y-1">O</span>
                          <span className="transform -rotate-[2deg]">O</span>
                          <span className="transform rotate-[4deg] -translate-y-1">D</span>
                       </div>
                       <div className="w-[500px] h-48 border-t-[8px] border-yellow-900 absolute bottom-[-40px] -z-10 shadow-[inset_0_-20px_0_rgba(0,0,0,0.2)] rounded-[100%]" style={{ backgroundColor: isNight ? '#451a03' : '#713f12' }} />
                   </div>
                )}
            </div>
            
            {/* 建築群 */}
            <div className="absolute bottom-[35%] w-[150%] -left-[10%] flex items-end opacity-95 transition-all duration-1000 z-[15] drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
               {activeRegion === 'Seoul' && Array.from({ length: 24 }).map((_, i) => {
                   const isLandmark = i >= 13 && i <= 15;
                   const h = isLandmark ? 100 + (i % 2) * 40 : 300 + (i * 47) % 250;
                   return (
                   <div key={`seoul-${i}`} className="flex-1 flex flex-col items-center relative border-r-[4px] border-black shadow-[inset_-10px_0_0_rgba(0,0,0,0.2)]" 
                        style={{ height: h + 'px', backgroundColor: isNight ? '#1e293b' : (isLandmark ? '#f8fafc' : '#94a3b8'), zIndex: 10 + (i % 3) }}>
                        {isLandmark && <div className="absolute top-2 w-3/4 h-8 bg-blue-500 border-2 border-black flex items-center justify-center text-[10px] text-white font-black">CU25</div>}
                       <div className="w-full h-full pt-12 px-1 grid grid-cols-2 gap-1 pb-16">
                           {Array.from({ length: isLandmark ? 2 : 12 }).map((_, j) => (
                               <div key={j} className="w-full relative shadow-[0_2px_0_rgba(0,0,0,0.6)]" style={{ height: isLandmark ? '30px' : '18px', backgroundColor: isNight ? (isLandmark ? '#fde047' : '#0f172a') : '#334155', border: '1.5px solid black' }}>
                                   <div className={`w-full h-full border-[1px] border-white/5`} style={{ backgroundColor: (isNight && ((i * 17 + j * 11) % 10 > 6)) ? '#fef08a' : 'transparent' }} />
                               </div>
                           ))}
                       </div>
                   </div>
                )})}
               {activeRegion === 'Tokyo' && Array.from({ length: 26 }).map((_, i) => {
                   const isLandmark = i >= 13 && i <= 15;
                   const h = isLandmark ? 120 + (i % 2) * 30 : 250 + (i * 31) % 200;
                   return (
                   <div key={`tokyo-${i}`} className="flex-1 flex flex-col items-center relative border-r-[4px] border-black shadow-[inset_-10px_0_0_rgba(0,0,0,0.2)]" 
                        style={{ height: h + 'px', backgroundColor: i % 2 === 0 ? (isNight ? '#7f1d1d' : '#f87171') : (isNight ? '#1e293b' : '#fef08a'), zIndex: 10 + (i % 2) }}>
                       {isLandmark && <div className="absolute top-2 w-[120%] h-8 bg-black flex items-center justify-center text-white text-xs font-black z-10 border-2 border-white transform skew-x-[-10deg]">LAWSON</div>}
                       <div className="w-full h-full pt-10 px-1 grid grid-cols-1 gap-1 pb-16">
                           {Array.from({ length: isLandmark ? 2 : 8 }).map((_, j) => (
                               <div key={j} className="w-full relative" style={{ height: isLandmark ? '30px' : '20px', backgroundColor: isNight && isLandmark ? '#cbd5e1' : '#e2e8f0', border: '2px solid black' }}>
                                   <div className="w-full h-full border-[1px] border-white/10" style={{ backgroundColor: (isNight && (isLandmark || (i * 13 + j * 9) % 10 > 5)) ? '#fde047' : '#94a3b8' }} />
                               </div>
                           ))}
                       </div>
                   </div>
                )})}
                {activeRegion === 'LA' && Array.from({ length: 20 }).map((_, i) => {
                   const isLandmark = i >= 2 && i <= 3;
                   const h = isLandmark ? 110 + (i % 2) * 20 : 180 + (i * 23) % 150;
                   return (
                   <div key={`la-${i}`} className="flex-1 flex flex-col items-center relative border-r-[4px] border-black shadow-[inset_-10px_0_0_rgba(0,0,0,0.2)]" 
                        style={{ height: h + 'px', backgroundColor: i % 2 === 0 ? (isNight ? '#0f766e' : '#5eead4') : (isNight ? '#854d0e' : '#fde047'), zIndex: 10 + (i % 3) }}>
                       <div className="w-[110%] h-3 bg-rose-500 border-[2px] border-black absolute -top-1.5 skew-x-6 shadow-sm" />
                       {isLandmark && <div className="absolute top-4 w-10 h-10 bg-yellow-400 rounded-full border-4 border-black flex items-center justify-center text-black font-black text-[8px] z-20">TACO</div>}
                       <div className="w-full h-full pt-6 px-2 grid grid-cols-2 gap-2 pb-16">
                          {Array.from({ length: isLandmark ? 2 : 4 }).map((_, j) => (
                              <div key={j} className="w-full h-8 bg-white/10 border-[2px] border-black rounded shadow-[0_1px_0_rgba(0,0,0,0.4)]" />
                          ))}
                       </div>
                   </div>
                )})}
            </div>

            {/* 基礎地板層 (路面) */}
            <div className="absolute bottom-0 w-[150%] -left-[10%] h-[40%] transition-colors duration-1000 z-[10]">
               {/* 人行道 */}
               <div className="absolute top-0 w-full h-[30%] border-t-[4px] border-b-[6px] border-black shadow-[inset_0_-8px_0_rgba(0,0,0,0.15)] flex overflow-hidden" 
                    style={{ backgroundColor: isNight ? '#334155' : (currentSeason === 'WINTER' ? '#f1f5f9' : '#cbd5e1') }}>
                   {Array.from({ length: 80 }).map((_, i) => (
                       <div key={i} className="flex-none w-10 h-full border-r-[2px] border-black/20" />
                   ))}
               </div>
               {/* 車道 */}
               <div className="absolute bottom-0 w-full h-[70%]" style={{ backgroundColor: isNight ? '#0f172a' : '#475569' }}>
                   <div className="absolute top-8 w-full h-2 flex gap-12 px-10 border-y border-black/20 overflow-hidden">
                      {Array.from({length: 30}).map((_,i) => <div key={i} className="w-16 h-full bg-yellow-400/80 shadow-[0_2px_0_rgba(0,0,0,0.4)] shrink-0" />)}
                   </div>
               </div>
            </div>

            {/* 前景草叢 */}
            <div className="absolute -bottom-[5%] -left-[10%] w-[150%] h-20 flex z-[50] pointer-events-none filter drop-shadow-[0_-5px_10px_rgba(0,0,0,0.3)] overflow-hidden">
                {Array.from({length: 30}).map((_, i) => (
                   <div key={`bush-${i}`} className="w-40 h-24 bg-[#14532d] border-[4px] border-black rounded-t-[3rem] -ml-12 shrink-0" 
                        style={{ transform: `scale(${0.8 + ((i * 13) % 50) / 100}) rotate(${((i * 7) % 20) - 10}deg)`, filter: isNight ? 'brightness(0.5)' : 'brightness(1)' }}>
                      <div className="w-10 h-10 bg-[#166534] rounded-full absolute top-2 left-4 opacity-50 blur-[2px]" />
                   </div>
                ))}
            </div>
         </div>
      </div>
   );
}
