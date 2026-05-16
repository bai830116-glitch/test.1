import React from 'react';
import { motion } from 'motion/react';
import { ScoutPixelAvatar } from '../Mainpage1/ScoutPixelAvatar';
import { Search, Target } from 'lucide-react';
import { StreetAvatar, DynamicEnvironment, RoundTree, Bench, StreetLamp } from './StreetRadarEntities';
import { StreetBackgroundLayer } from './StreetBackgroundLayer';
import { useStreetRadarLogic } from './hooks/useStreetRadarLogic';

interface StreetRadarPartitionProps {
  onTraineeDiscovered?: (trainee: any) => void;
  onShowBubble?: (msg: string) => void;
  totalGameMinutes?: number;
  isNightTime?: boolean;
  travelRemainingMinutes?: number;
  scoutGenes?: string[];
  activeRegion?: 'Seoul' | 'Tokyo' | 'LA' | null;
  radarLevel?: number;
  scoutStamina?: number;
  isVisible?: boolean;
}

export default function StreetRadarPartition({ 
  onTraineeDiscovered, 
  onShowBubble,
  totalGameMinutes = 0,
  isNightTime = false,
  travelRemainingMinutes = 0,
  scoutGenes = [],
  activeRegion = 'Seoul',
  radarLevel = 1,
  scoutStamina = 100,
  isVisible = true
}: StreetRadarPartitionProps) {
  const { pedestrians, scoutPos, currentSeason } = useStreetRadarLogic({
    onTraineeDiscovered, onShowBubble, totalGameMinutes, isNightTime,
    travelRemainingMinutes, scoutGenes, activeRegion, radarLevel,
    scoutStamina, isVisible
  });

  if (travelRemainingMinutes > 0) {
    return (
      <div className="w-full h-full bg-[#121214] flex flex-col items-center justify-center font-sans relative overflow-hidden">
        <Target size={64} className="text-[#dc2626] mb-8 animate-pulse shadow-lg" />
        <h2 className="text-[#00B4D8] text-4xl font-black tracking-widest mb-4">SIGNAL LOST</h2>
        <div className="text-[#facc15] font-mono text-3xl font-black animate-pulse">T - {travelRemainingMinutes} M</div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative overflow-hidden flex flex-col transition-all duration-1000 ${isNightTime ? 'bg-[#0A1128]' : 'bg-[#E0F2FE]'}`}>
      <div className={`absolute inset-[-100%] z-0 ${isNightTime ? 'bg-[#0A1128]' : 'bg-[#E0F2FE]'}`}>
        <DynamicEnvironment isNight={isNightTime} activeRegion={activeRegion} season={currentSeason} />
        <div className="absolute inset-0 opacity-[0.15] bg-[radial-gradient(#0ABAB5_3px,transparent_3px)]" style={{ backgroundSize: '60px 60px' }} />
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden">
         <div className="w-full h-full relative transition-transform duration-1000 origin-bottom">
            <StreetBackgroundLayer activeRegion={activeRegion} isNight={isNightTime} currentSeason={currentSeason} />
            <div className="absolute inset-0 z-[20]">
              {pedestrians.map(p => (
                <motion.div key={p.id} animate={{ left: `${p.x}%`, top: `${p.y}%`, zIndex: Math.floor(p.y) }} transition={{ duration: 0.1, ease: 'linear' }} className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center">
                   <StreetAvatar id={p.id} type={p.type} rarity={p.rarity} facing={p.facing} isMoving={p.isMoving} actionState={p.actionState} season={currentSeason} isNight={isNightTime} />
                </motion.div>
              ))}
              <motion.div animate={{ left: `${scoutPos.x}%`, top: `${scoutPos.y}%`, zIndex: Math.floor(scoutPos.y) }} transition={{ duration: 0.1, ease: 'linear' }} className="absolute -translate-x-1/2 -translate-y-full flex flex-col items-center">
                 <div className="absolute -top-7 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-[10px] font-black rounded-full border-2 border-white/20 whitespace-nowrap z-20">
                    <Search size={10} className="inline mr-1 text-[#00C2CB]" /> 掃描中...
                 </div>
                 <ScoutPixelAvatar id="1" action={scoutPos.isMoving ? 'walk' : 'idle'} facing={scoutPos.facing} aura={true} />
              </motion.div>
            </div>

            <div className="absolute bottom-[33%] w-[130%] -left-[5%] flex justify-between px-16 z-20 pointer-events-none">
               <RoundTree color={currentSeason === 'AUTUMN' ? '#f59e0b' : '#a3e635'} />
               <StreetLamp isOn={isNightTime} />
               <Bench />
               <StreetLamp isOn={isNightTime} />
               <RoundTree color={currentSeason === 'AUTUMN' ? '#f97316' : '#10b981'} />
            </div>
         </div>
      </div>
    </div>
  );
}


