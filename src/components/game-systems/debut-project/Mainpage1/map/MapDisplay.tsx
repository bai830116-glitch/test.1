import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { globalTimeBroker } from '../../../../../core/TimeBroker';
import { LiveNewsBar } from './LiveNewsBar';
import { DiscoveryCard } from './DiscoveryCard';
import { MapScoutDetailModal } from './MapScoutDetailModal';
import { CityMarker } from './CityMarker';
import { ScoutPixelAvatar } from '../ScoutPixelAvatar';
import { ALL_DESTINATIONS } from '../MapConstants';
import { MapScoutStaff } from '../../../../../types/scout';

interface MapDisplayProps {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  scoutRef: React.RefObject<HTMLDivElement | null>;
  tooltipRef: React.RefObject<HTMLDivElement | null>;
  projection: any;
  DESTINATIONS: any[];
  discoveryLog: any[];
  discoveredTrainee: any;
  selectedScout: MapScoutStaff | null;
  setSelectedScout: (s: MapScoutStaff | null) => void;
  scouts: MapScoutStaff[];
  setScouts: React.Dispatch<React.SetStateAction<MapScoutStaff[]>>;
  cityProgress: Record<string, number>;
  onTriggerNotification?: (msg: string) => void;
  buffEndTime: number | null;
  scanPulse: any;
  heatMapData: any[];
  onCityClick: (city: any) => void;
  funds: number;
  onSpendFunds: any;
}

export const MapDisplay: React.FC<MapDisplayProps> = ({
  mapContainerRef,
  scoutRef,
  tooltipRef,
  projection,
  DESTINATIONS,
  discoveryLog,
  discoveredTrainee,
  selectedScout,
  setSelectedScout,
  scouts,
  setScouts,
  cityProgress,
  onTriggerNotification,
  buffEndTime,
  scanPulse,
  heatMapData,
  onCityClick,
  funds,
  onSpendFunds
}) => {
  const MAP_W = 1600;
  const MAP_H = 800;
  const geoUrl = "/countries-110m.json";

  return (
    <div className="relative w-full h-full bg-[#0A0E13] overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-[5] transition-colors duration-[3000ms]" 
        style={{ 
            backgroundColor: (globalTimeBroker.time % 1440 > 1140 || globalTimeBroker.time % 1440 < 300) 
                ? 'rgba(10, 14, 19, 0.4)' : 'transparent'
        }} 
      />

      <LiveNewsBar latestDiscovery={discoveryLog.length > 0 ? `${discoveryLog[0].scoutName} 在 ${discoveryLog[0].name} 取得了重大突破` : undefined} />
      <DiscoveryCard trainee={discoveredTrainee} onAction={(msg) => onTriggerNotification?.(msg)} />

      <div className={`absolute top-16 right-4 md:top-24 md:right-8 z-40 flex flex-col gap-3 pointer-events-none transform origin-top-right`}>
         <AnimatePresence>
            {discoveryLog.map((log) => (
               <motion.div 
                 key={log.id}
                 initial={{ x: 50, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 exit={{ x: 100, opacity: 0 }}
                 className="bg-[#00B4D8] text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg border-2 border-white flex items-center gap-2 pointer-events-auto"
               >
                  {log.name}
               </motion.div>
            ))}
         </AnimatePresence>
      </div>

      {selectedScout && (
           <MapScoutDetailModal
              selectedScout={selectedScout}
              onClose={() => setSelectedScout(null)}
              canSendSupplies={funds >= 100 && selectedScout.fatigue > 0}
              onSendSupplies={() => {
                  if (funds < 100) return;
                  onSpendFunds?.(100);
                  setScouts(prev => prev.map(s => s.id === selectedScout.id ? { ...s, fatigue: Math.max(0, s.fatigue - 20) } : s));
                  onTriggerNotification?.(`已為 ${selectedScout.name} 提供補給 (疲勞度 -20)`);
              }}
           />
      )}

      <div 
        ref={mapContainerRef}
        className="absolute top-1/2 left-1/2 will-change-transform transform-gpu"
        style={{ width: MAP_W, height: MAP_H }}
      >
        <div className="absolute inset-0 sm:rounded-[3rem] overflow-hidden border-[4px] border-[#00B4D8]/30 bg-[#0B131A] shadow-inner" style={{ 
          backgroundImage: 'linear-gradient(90deg, rgba(0,180,216,0.15) 2px, transparent 2px), linear-gradient(rgba(0,180,216,0.15) 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}>
          <ComposableMap projection={projection} width={MAP_W} height={MAP_H} style={{ width: "100%", height: "100%", position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {scanPulse && (
                <circle cx={scanPulse.x} cy={scanPulse.y} r={scanPulse.radius} fill="none" stroke="#00B4D8" strokeWidth={4} opacity={Math.max(0, 1 - scanPulse.radius / 1000)} />
            )}

            <Geographies geography={geoUrl}>
              {({ geographies }) => geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="rgba(0,180,216,0.12)" stroke="rgba(0,180,216,0.4)" strokeWidth={1.5} />
              ))}
            </Geographies>

            {DESTINATIONS.map((dest, idx) => {
              const next = DESTINATIONS[(idx + 1) % DESTINATIONS.length];
              return <Line key={`line-${dest.id}-${next.id}`} from={dest.coordinates} to={next.coordinates} stroke="rgba(0,180,216,0.3)" strokeWidth={2} strokeLinecap="round" strokeDasharray="4 4" />;
            })}

            {scouts.map(scout => {
                const targetCity = ALL_DESTINATIONS.find(d => d.id === scout.targetCityId);
                if (!targetCity || scout.status !== 'traveling') return null;
                const start = projection(scout.currentCoords as [number, number]);
                const end = projection(targetCity.coordinates as [number, number]);
                if (!start || !end) return null;
                return <line key={`path-${scout.id}`} x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} stroke={scout.color} strokeWidth={2} strokeDasharray="4 4" opacity={0.4} />;
            })}

            {DESTINATIONS.map(dest => (
              <Marker key={`marker-${dest.id}`} coordinates={dest.coordinates as [number, number]}>
                 <circle r={5} fill={dest.color} opacity="1" className="stroke-white stroke-1" />
              </Marker>
            ))}
          </ComposableMap>

          <div className="absolute inset-0 pointer-events-none z-10 w-full h-full transform-gpu origin-top-left">
             {DESTINATIONS.map(dest => {
                 const projected = projection(dest.coordinates as [number, number]);
                 return <CityMarker key={`html-marker-${dest.id}`} dest={dest} progress={cityProgress[dest.id] || 0} pxX={projected?.[0] || 0} pxY={projected?.[1] || 0} onClick={onCityClick} />;
             })}
          </div>

          <div ref={scoutRef} className="absolute z-30 pointer-events-none will-change-transform transform-gpu" style={{ width: 1, height: 1, left: 0, top: 0 }}>
             <div className="relative flex flex-col items-center justify-end w-[80px] -translate-x-1/2 -translate-y-full">
                 <div className="scale-[0.4] mb-[-4px] origin-bottom"><ScoutPixelAvatar id={'1'} action="walk" facing={1} aura={!!buffEndTime} /></div>
             </div>
             <div ref={tooltipRef} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[120%] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
