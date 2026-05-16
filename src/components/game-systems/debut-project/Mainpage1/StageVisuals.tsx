import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu } from 'lucide-react';
import { ScoutPixelAvatar } from './ScoutPixelAvatar';
import { StudioCamera, MicStand, LiveSign } from './Furniture';

interface StageVisualsProps {
  radarScale: number;
  showRadarUpgrading: boolean;
  showServerUpgrading: boolean;
  radarLevel: number;
  serverLevel: number;
}

export const StageVisuals: React.FC<StageVisualsProps> = ({
  radarScale,
  showRadarUpgrading,
  showServerUpgrading,
  radarLevel,
  serverLevel
}) => {
  const renderServers = () => {
    const servers = [];
    for (let i = 0; i < Math.min(serverLevel + 2, 8); i++) {
      servers.push(
        <div key={i} className="relative z-10 w-12 h-32 bg-[#1A1A1A] border-2 border-black rounded-sm shadow-[4px_4px_0_#000] flex flex-col justify-between p-1">
           <div className="flex flex-col gap-1 w-full mt-2">
             <div className={`w-3 h-1 bg-green-500 rounded-full shadow-[0_0_4px_#22C55E] ${serverLevel > 3 ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDuration: `${Math.random() * 0.5 + 0.2}s` }} />
             <div className="w-1.5 h-1 bg-red-500 rounded-full animate-pulse" style={{ animationDuration: `${Math.random() * 1 + 0.5}s` }} />
             <div className="w-full h-[1px] bg-white/20 mt-1" />
           </div>
           <div className="flex flex-col gap-1 w-full">
             <div className={`w-full h-1.5 bg-[#0ABAB5] rounded-full shadow-[0_0_4px_#0ABAB5] ${serverLevel > 2 ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDuration: `${Math.random() * 0.5 + 0.3}s` }} />
             <div className="w-2 h-1 bg-macaron rounded-full" />
           </div>
           <div className="w-full h-8 bg-black/50 border border-white/10 rounded-[1px] flex justify-center items-center">
              <Cpu size={12} className="text-white/20" />
           </div>
        </div>
      );
    }
    return servers;
  };

  return (
    <>
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen bg-[#0A0E13]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0ABAB5]/20 via-[#0A0E13] to-[#0A0E13]" />
          <div className="absolute top-0 left-0 w-full h-32 flex justify-around items-start opacity-70">
              <div className="w-24 h-24 rounded-full bg-[#81D8D0] blur-[40px] animate-pulse" style={{ animationDuration: '2s' }} />
              <div className="w-32 h-32 rounded-full bg-[#0ABAB5] blur-[50px] animate-pulse" style={{ animationDuration: '3s' }} />
              <div className="w-24 h-24 rounded-full bg-[#E0F7FA] blur-[40px] animate-pulse" style={{ animationDuration: '2.5s' }} />
          </div>

          <StudioCamera className="absolute bottom-32 left-2 opacity-50 -rotate-12 scale-[1.5] text-[#81D8D0]" />
          <StudioCamera className="absolute bottom-40 right-2 opacity-50 rotate-12 scale-[1.3] text-[#0ABAB5]" />
          <MicStand className="absolute top-1/3 left-6 opacity-40 scale-150 text-[#81D8D0]" />
          <MicStand className="absolute top-1/3 right-6 opacity-40 scale-150 text-[#0ABAB5]" />
          <LiveSign className="absolute top-16 left-1/2 -translate-x-1/2 opacity-90 scale-[2.5]" />
          <div className="absolute top-1/4 left-0 w-[200%] h-2 bg-gradient-to-r from-transparent via-[#81D8D0]/50 to-transparent rotate-45 transform-origin-left animate-[pulse_3s_infinite]" />
          <div className="absolute top-1/4 right-0 w-[200%] h-2 bg-gradient-to-r from-transparent via-[#0ABAB5]/50 to-transparent -rotate-45 transform-origin-right animate-[pulse_4s_infinite]" />
      </div>

      <div className="relative w-[1372px] min-w-[1372px] h-full flex-shrink-0 flex flex-col justify-end items-center pointer-events-none pb-12 left-1/2 -translate-x-1/2">
          {/* Fan lightsticks */}
          <div className="absolute -bottom-8 left-0 w-full h-32 flex justify-between items-end px-[5%] opacity-70 mix-blend-screen z-50">
             {[...Array(60)].map((_, i) => (
                <div 
                   key={i} 
                   className="w-2 h-2 rounded-full absolute bottom-0 blur-[1px]" 
                   style={{ 
                     left: `${Math.random() * 100}%`,
                     bottom: `${Math.random() * 50}px`,
                     backgroundColor: Math.random() > 0.5 ? '#0ABAB5' : '#81D8D0',
                     animation: `bounce ${0.5 + Math.random() * 0.5}s infinite alternate`,
                     animationDelay: `${Math.random()}s`
                   }} 
                />
             ))}
          </div>

          {/* Main Display */}
          <div className="absolute top-[18%] w-full flex flex-col items-center justify-center z-0 perspective-[600px]">
             <div className="absolute left-1/2 -translate-x-1/2 w-[140%] h-[150px] bg-gradient-to-b from-[#1E1B4B]/80 to-[#0ABAB5]/20 opacity-80 mix-blend-screen scale-110 flex items-center justify-center overflow-hidden border-y-2 border-[#0ABAB5]/30">
                 <div className="w-[300%] h-[300%] bg-[linear-gradient(90deg,rgba(10,186,181,0.1)_1px,transparent_1px)] bg-[length:20px_20px] animate-[slide_10s_linear_infinite]" />
             </div>
             <div className="flex gap-1 xl:gap-2 opacity-100 mix-blend-normal transform translate-y-4 scale-[1.35] md:scale-[1.6] z-10 font-sans">
                 {['S','H','O','O'].map((letter, i) => (
                    <div key={i} className="relative">
                        <div className="absolute inset-0 text-7xl font-black italic text-[#81D8D0] translate-y-3 translate-x-2 blur-sm mix-blend-screen opacity-50" />
                        <div className="absolute inset-0 text-7xl font-black italic text-[#0ABAB5] translate-y-2 translate-x-1" />
                        <div className="absolute inset-0 text-7xl font-black italic text-[#E0F7FA] blur-[15px] mix-blend-screen animate-pulse" style={{ animationDuration: `${2 + i * 0.5}s` }}>
                            {letter}
                        </div>
                        <div className="relative text-7xl font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white via-[#81D8D0] to-[#0ABAB5] drop-shadow-[2px_4px_0_rgba(10,186,181,0.8)] border-white">
                            {letter}
                        </div>
                    </div>
                 ))}
             </div>
          </div>
          
          <div className="absolute top-0 -left-12 md:left-0 w-20 h-[90%] border-x-4 border-[#333] z-10 flex flex-col justify-between py-10 opacity-70 mix-blend-multiply bg-[#111]/30">
             {[...Array(20)].map((_, i) => <div key={i} className="w-full h-1 bg-[#222] transform rotate-[30deg] origin-center -my-1" />)}
          </div>
          <div className="absolute top-0 -right-12 md:right-0 w-20 h-[90%] border-x-4 border-[#333] z-10 flex flex-col justify-between py-10 opacity-70 mix-blend-multiply bg-[#111]/30">
             {[...Array(20)].map((_, i) => <div key={i} className="w-full h-1 bg-[#222] transform -rotate-[30deg] origin-center -my-1" />)}
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] flex justify-between px-10 z-10 opacity-90 scale-y-125 origin-top">
              {[...Array(12)].map((_, i) => (
                  <div key={i} className="relative flex flex-col items-center">
                      <div className="w-6 h-4 bg-gradient-to-b from-gray-900 to-[#222] border-b-2 border-[#81D8D0] rounded-sm z-10 shadow-[0_2px_15px_#81D8D0]" />
                      <div className={`w-[60px] h-[500px] bg-gradient-to-b ${i % 2 === 0 ? 'from-[#0ABAB5]/60' : 'from-[#E0F7FA]/60'} to-transparent origin-top ${i < 6 ? 'rotate-[35deg]' : 'rotate-[-35deg]'} mix-blend-screen animate-pulse`} style={{ animationDuration: `${0.3 + Math.random() * 1.5}s` }} />
                  </div>
              ))}
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[180%] h-[55%] bg-[#0B131A] rounded-[100%] border-t-[8px] border-[#0ABAB5]/80 flex items-end justify-center perspective-[800px] shadow-[0_-10px_60px_rgba(10,186,181,0.3)]" style={{ transform: 'rotateX(55deg) translateZ(-40px) scale(1.15)' }}>
             <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(10,186,181,0.5) 4px, transparent 2px), linear-gradient(90deg, rgba(10,186,181,0.5) 4px, transparent 2px)', backgroundSize: '80px 80px', transform: 'perspective(500px) rotateX(40deg)' }} />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-[#0ABAB5]/50 to-[#81D8D0]/40 opacity-90 mix-blend-screen" />
          </div>

          <div className="absolute top-4 shadow-[0_0_15px_rgba(10,186,181,0.3)] z-20 flex gap-4 bg-[#1E1B4B]/80 backdrop-blur-lg p-3 rounded-xl border-2 border-[#0ABAB5]/50">
             <div className="px-3 py-1 bg-black border border-[#0ABAB5]/50 rounded-md text-[#81D8D0] text-[10px] font-mono tracking-widest animate-pulse shadow-[inset_0_0_10px_rgba(10,186,181,0.2)]">APP_SYNC: OK</div>
             <div className="px-3 py-1 bg-black border border-[#81D8D0]/50 rounded-md text-[#E0F7FA] text-[10px] font-mono tracking-widest shadow-[inset_0_0_10px_rgba(129,216,208,0.2)]">STAGE_READY</div>
          </div>

          <div className="relative w-full xl:max-w-[1240px] h-[75%] flex gap-8 justify-between items-end px-12 pb-[10%] z-20 scale-[1.1] origin-bottom mt-10">
              {/* Radar Column */}
              <div className="relative w-1/3 h-full flex flex-col items-center justify-end group">
                  <motion.div 
                     animate={{ scale: radarScale }}
                     transition={{ type: "spring", stiffness: 50 }}
                     className="relative flex flex-col items-center origin-bottom z-10"
                  >
                     <AnimatePresence>
                        {showRadarUpgrading && (
                           <motion.div 
                             initial={{ opacity: 0, y: 0, scale: 0.5 }} 
                             animate={{ opacity: 1, y: -80, scale: 1.5 }} 
                             exit={{ opacity: 0 }}
                             className="absolute -top-10 text-[#BEF264] font-black text-sm tracking-widest drop-shadow-[0_2px_4px_#000] whitespace-nowrap z-30"
                           >
                              <span className="pb-[4%] block">GEAR UPGRADED! 🎥</span>
                           </motion.div>
                        )}
                     </AnimatePresence>

                     <div className={`w-4 h-4 bg-[#0ABAB5] rounded-sm absolute -top-1 -mt-3 z-30 shadow-[0_0_25px_#0ABAB5] ${radarLevel > 3 ? 'animate-ping' : 'animate-pulse'}`} style={{ animationDuration: radarLevel > 3 ? '0.3s' : '0.8s' }} />
                     
                     <div className="w-20 h-10 bg-gradient-to-b from-gray-300 to-gray-500 border-[3px] border-black rounded-b-[24px] shadow-[inset_0_-4px_0_rgba(0,0,0,0.3),0_10px_20px_rgba(10,186,181,0.4)] flex justify-center mt-2 relative overflow-hidden transform -rotate-12">
                        <div className="absolute top-2 w-full h-[2px] bg-black/60" />
                        <div className="absolute top-5 w-full h-[2px] bg-black/60" />
                        <div className="absolute w-8 h-8 bg-black rounded-full top-1 shadow-inner border border-gray-600 flex items-center justify-center">
                            <div className="w-4 h-4 bg-[#81D8D0] rounded-full blur-[2px]" />
                        </div>
                     </div>
                     <div className="w-6 h-16 bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 border-x-[3px] border-black flex flex-col items-center justify-evenly shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                        <div className="w-full h-[3px] bg-black/40 transform rotate-45" />
                        <div className="w-full h-[3px] bg-black/40 transform -rotate-45" />
                     </div>
                     <div className="w-28 h-6 bg-[#1E293B] border-[3px] border-black rounded-t-lg shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex justify-center items-center relative">
                        <div className="w-16 h-1.5 bg-[#F59E0B] rounded-full opacity-100 shadow-[0_0_8px_#F59E0B]" />
                        <div className="absolute -bottom-3 text-[7px] font-black text-white/60 w-[150%] text-center tracking-widest bg-black/50 px-1 py-0.5 rounded">MAIN CAM / SYS LINK</div>
                     </div>
                     
                     {radarLevel > 2 && (
                        <div className="absolute -top-[500px] w-[6px] h-[500px] bg-gradient-to-t from-[#81D8D0] to-transparent pointer-events-none opacity-50 mix-blend-screen transform rotate-[15deg] origin-bottom" />
                     )}
                  </motion.div>
                  <div className="w-40 h-8 bg-black/90 rounded-[100%] blur-[6px] absolute -bottom-4 z-0" />
                  
                  {/* Crew */}
                  <div className="absolute bottom-[-10px] -left-10 z-30 drop-shadow-[0_4px_0_#000] origin-bottom scale-100 flex items-end">
                      <div className="relative">
                         <ScoutPixelAvatar id="antenna-tech" action="typing" facing={1} />
                         <div className="absolute -top-8 left-2 w-12 h-6 border-[1.5px] border-[#84CC16]/60 bg-[#84CC16]/10 backdrop-blur-sm rounded overflow-hidden flex flex-col justify-center items-center shadow-[0_0_10px_rgba(132,204,22,0.4)] z-40">
                             <div className="w-full text-center text-[#A3E635] text-[6px] font-black animate-pulse leading-none mt-1">MAIN CAM</div>
                             <div className="w-3/4 h-0.5 bg-[#84CC16]/50 mt-0.5" />
                         </div>
                         <div className="absolute -top-6 left-2 text-[10px] border-2 border-[#f87171] bg-black/80 text-[#f87171] px-1 py-0.5 rounded animate-pulse font-bold z-50 scale-75 transform -translate-x-full">REC•</div>
                      </div>
                  </div>
               </div>
               
               {/* Dancers */}
               <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 z-40 drop-shadow-[0_4px_0_#000] flex items-center gap-2 xl:gap-4 pointer-events-auto">
                   <div className="origin-bottom scale-[0.9] translate-y-4 opacity-80"><ScoutPixelAvatar id="dancer5" action="excited" facing={1} /></div>
                   <div className="origin-bottom scale-[1.1] translate-y-2 opacity-95"><ScoutPixelAvatar id="dancer3" action="walk" facing={1} /></div>
                   <div className="origin-bottom scale-[1.2] translate-y-1 z-10"><ScoutPixelAvatar id="dancer1" action="excited" facing={1} /></div>
                   <div className="origin-bottom scale-[1.4] z-20 -translate-y-2 relative">
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#A3E635]/50 blur-lg rounded-[100%]" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-[1000px] bg-white/20 blur-sm mix-blend-screen z-50 pointer-events-none" />
                      <ScoutPixelAvatar id="center" action="idle" facing={-1} aura />
                   </div>
                   <div className="origin-bottom scale-[1.2] translate-y-1 z-10"><ScoutPixelAvatar id="dancer2" action="excited" facing={-1} /></div>
                   <div className="origin-bottom scale-[1.1] translate-y-2 opacity-95"><ScoutPixelAvatar id="dancer4" action="walk" facing={-1} /></div>
                   <div className="origin-bottom scale-[0.9] translate-y-4 opacity-80"><ScoutPixelAvatar id="dancer6" action="excited" facing={-1} /></div>
               </div>

               {/* Right Column - Servers */}
               <div className="relative w-1/3 h-full flex flex-col items-center justify-end z-20 group">
                  <div className="flex gap-1 relative z-20 items-end flex-wrap justify-end w-[180px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
                      {renderServers()}
                      <div className="w-14 h-12 bg-gray-800 border-2 border-black mb-0 mx-1 flex flex-col items-center justify-start p-1 relative shadow-inner">
                         <div className="w-full h-4 bg-blue-900 border border-black mb-1 flex items-center justify-center overflow-hidden">
                            <div className="w-[150%] h-[10px] bg-[#A3E635]/30 rotate-45 transform translate-y-[-50%] animate-[slide_2s_linear_infinite]" />
                         </div>
                         <div className="flex gap-1 w-full justify-around mt-1">
                            <div className="w-2 h-4 bg-gray-600 rounded-sm" />
                            <div className="w-2 h-3 bg-gray-600 rounded-sm" />
                            <div className="w-2 h-5 bg-[#F59E0B] rounded-sm" />
                         </div>
                      </div>
                  </div>

                  <AnimatePresence>
                    {showServerUpgrading && (
                        <motion.div 
                          initial={{ opacity: 0, y: 0, scale: 0.5 }} 
                          animate={{ opacity: 1, y: -100, scale: 1.5 }} 
                          exit={{ opacity: 0 }}
                          className="absolute top-0 text-[#F59E0B] font-black text-sm tracking-widest drop-shadow-[0_2px_4px_#000] whitespace-nowrap z-50"
                        >
                          <span className="pb-[4%] block">DATA ANALYZED! 🎛️</span>
                        </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="w-48 h-10 bg-black/90 rounded-[100%] blur-[6px] absolute -bottom-5 z-0" />

                  <div className="absolute bottom-[-5px] -right-4 z-30 drop-shadow-[0_4px_0_#000] origin-bottom scale-100">
                      <ScoutPixelAvatar id="server-tech" action="typing" facing={-1} />
                      <div className="absolute -top-6 left-2 text-[12px] animate-bounce drop-shadow-lg text-[#F59E0B]">🎧</div>
                  </div>
               </div>
          </div>
      </div>
    </>
  );
};
