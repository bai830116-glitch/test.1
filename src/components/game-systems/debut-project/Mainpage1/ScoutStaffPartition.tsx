import React, { useState, useEffect, useMemo } from 'react';
import { BrainCircuit } from 'lucide-react';
import { ActionType } from './ScoutPixelAvatar';
import { Room, FloorSeparator } from './Room';
import { StaffSprite } from './StaffSprite';
import { 
  Desk, ServerRack, Poster, Whiteboard, WaterCooler, 
  VendingMachine, Plant, Door, Window, FilingCabinet, 
  Sofa, Bookshelf, Copier, DiningTable, BarStool, BarCounter, ClothesRack, KitchenStove, MedicalBed, LabMonitor,
  AlbumPoster, AlbumDisplay, GoldTrophy
} from './Furniture';
import { useStaffLogic } from './hooks/useStaffLogic';

export default function ScoutStaffPartition({ 
  searchRadius = 1200, 
  serverLevel = 1, 
  isVisible = true, 
  funds = 0, 
  onSpendFunds,
  onStaffGeneUpdate
}: { 
  searchRadius?: number, 
  serverLevel?: number, 
  isVisible?: boolean, 
  funds?: number, 
  onSpendFunds?: (amount: number) => void,
  onStaffGeneUpdate?: (genes: string[]) => void
}) {
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const { staffs, roomThoughts } = useStaffLogic({
    isVisible, searchRadius, serverLevel, funds, onSpendFunds, onStaffGeneUpdate
  });

  const [winSize, setWinSize] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 1024 });

  useEffect(() => {
    const handleResize = () => setWinSize({ w: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmallScreen = winSize.w < 700;

  const workNPCs = useMemo(() => [
    { id: 'npc1', roomId: 1, x: 95, facing: -1 as 1 | -1, action: 'idle' as ActionType, color: '#C0C0C0' },
    { id: 'npc_reception', roomId: 1, x: 45, facing: 1 as 1 | -1, action: 'idle' as ActionType, color: '#FFDCA8' },
    { id: 'npc_bar1', roomId: 2, x: 70, facing: 1 as 1 | -1, action: 'eat' as ActionType, color: '#E0C097' },
    { id: 'npc_chef', roomId: 3, x: 30, facing: 1 as 1 | -1, action: 'eat' as ActionType, color: '#FFFFFF' },
    { id: 'npc_pc1', roomId: 3, x: 50, facing: -1 as 1 | -1, action: 'pc' as ActionType, color: '#B0BEC5' },
    { id: 'npc_lounge1', roomId: 4, x: 30, facing: 1 as 1 | -1, action: 'slack' as ActionType, color: '#E0C097' },
    { id: 'npc_lounge2', roomId: 4, x: 10, facing: 1 as 1 | -1, action: 'idle' as ActionType, color: '#8D6E63' },
    { id: 'npc_office1', roomId: 5, x: 25, facing: 1 as 1 | -1, action: 'typing' as ActionType, color: '#F5E6CC' },
    { id: 'npc_office2', roomId: 5, x: 65, facing: -1 as 1 | -1, action: 'read' as ActionType, color: '#FFE0B2' },
    { id: 'npc_lab1', roomId: 6, x: 40, facing: 1 as 1 | -1, action: 'idle' as ActionType, color: '#E0F7FA' },
  ], []);

  const filteredNPCs = useMemo(() => isSmallScreen ? workNPCs.filter((_, i) => i % 2 === 0) : workNPCs, [isSmallScreen, workNPCs]);

  return (
    <div className="relative w-full h-full aspect-[9/19.5] max-h-screen mx-auto overflow-hidden flex flex-col font-sans select-none border-x-4 border-black box-border bg-[#0A0E13]">
       <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          <div className="absolute top-10 left-[-20px] w-40 h-80 bg-[#81D8D0]/10 blur-[80px] rotate-12" />
          <div className="absolute top-40 right-[-20px] w-40 h-80 bg-[#FF85A2]/10 blur-[80px] -rotate-12" />
       </div>

       <div className="flex-1 flex flex-col mx-2 mb-0 rounded-t-sm relative z-10 mt-2 md:mt-4">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-10 flex justify-end items-end gap-2 px-4 z-10 scale-[0.8]">
            <div className="w-12 h-10 border-[3px] border-black bg-gray-400 rounded-t-full relative">
               <div className="absolute top-1 left-1 w-2 h-4 bg-white/50 rounded-full" />
            </div>
            <div className="w-2 h-20 bg-black relative flex justify-center items-start mb-1">
               <div className="absolute -top-3 w-4 h-4 bg-[#FF85A2] rounded-full border-2 border-black" />
            </div>
          </div>

          <div className="flex-1 flex flex-col w-full h-full relative z-0 bg-[#2D3748] border-[5px] border-black shadow-[12px_12px_20px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-4 bg-black/20 z-40 pointer-events-none" />
              
              <Room id={1} name="明星衣櫥間" bgColor="#FFF7ED" roomThoughts={roomThoughts} decors={<>
                {!isSmallScreen && <Window className="left-[10%]" />}
                {!isSmallScreen && <ClothesRack className="left-[30%]" />}
                <AlbumPoster className="top-2 left-[50%] -rotate-3" color="#FF85A2" />
                <AlbumPoster className="top-3 left-[62%] rotate-6" color="#81D8D0" />
                <Door className="right-[5%]" />
              </>}>
                {staffs.filter(s => s.roomId === 1).map(s => <StaffSprite key={s.id} staff={s} onClick={setSelectedStaffId} />)}
                {filteredNPCs.filter(n => n.roomId === 1).map(n => <StaffSprite key={n.id} staff={n as any} onClick={() => {}} />)}
              </Room>
              <FloorSeparator />
              <Room id={2} name="練習生食堂" bgColor="#FEF2F2" roomThoughts={roomThoughts} decors={<>
                 <DiningTable className="left-[10%]" />
                 <AlbumDisplay className="left-[45%]" />
                 <BarCounter className="right-[10%]" />
                 {!isSmallScreen && <BarStool className="right-[25%]" />}
                 {!isSmallScreen && <BarStool className="right-[35%]" />}
                 {isSmallScreen && <div className="absolute bottom-1 right-[30%] text-[8px]">🥤</div>}
              </>}>
                {staffs.filter(s => s.roomId === 2).map(s => <StaffSprite key={s.id} staff={s} onClick={setSelectedStaffId} />)}
                {filteredNPCs.filter(n => n.roomId === 2).map(n => <StaffSprite key={n.id} staff={n as any} onClick={() => {}} />)}
              </Room>
              <FloorSeparator />
              <Room id={3} name="戰術研發室" bgColor="#F1F5F9" roomThoughts={roomThoughts} decors={<>
                 <KitchenStove className="left-[15%]" />
                 <GoldTrophy className="left-[45%]" />
                 <Desk className="right-[15%] bg-gray-200" />
                 {!isSmallScreen && <Whiteboard className="left-[50%] scale-75" />}
              </>}>
                {staffs.filter(s => s.roomId === 3).map(s => <StaffSprite key={s.id} staff={s} onClick={setSelectedStaffId} />)}
                {filteredNPCs.filter(n => n.roomId === 3).map(n => <StaffSprite key={n.id} staff={n as any} onClick={() => {}} />)}
              </Room>
              <FloorSeparator />
              <Room id={4} name="粉絲見面廣場" bgColor="#F0FDFA" roomThoughts={roomThoughts} decors={<>
                 <Sofa className="left-[10%]" />
                 <AlbumPoster className="top-4 left-[28%] rotate-12" color="#FDFD96" />
                 {!isSmallScreen && <Plant className="right-[10%]" />}
                 {!isSmallScreen && <VendingMachine className="right-[30%]" />}
                 <div className="absolute top-2 left-[40%] text-xs opacity-50">✨</div>
              </>}>
                {staffs.filter(s => s.roomId === 4).map(s => <StaffSprite key={s.id} staff={s} onClick={setSelectedStaffId} />)}
                {filteredNPCs.filter(n => n.roomId === 4).map(n => <StaffSprite key={n.id} staff={n as any} onClick={() => {}} />)}
              </Room>
              <FloorSeparator />
              <Room id={5} name="探員聯絡中心" bgColor="#FEFCE8" roomThoughts={roomThoughts} decors={<>
                 <Desk className="left-[10%]" />
                 <AlbumPoster className="top-2 right-[25%] -rotate-6" color="#81D8D0" />
                 <GoldTrophy className="left-[40%]" />
                 {!isSmallScreen && <FilingCabinet className="right-[10%]" />}
                 {!isSmallScreen && <Bookshelf className="right-[30%]" />}
              </>}>
                {staffs.filter(s => s.roomId === 5).map(s => <StaffSprite key={s.id} staff={s} onClick={setSelectedStaffId} />)}
                {filteredNPCs.filter(n => n.roomId === 5).map(n => <StaffSprite key={n.id} staff={n as any} onClick={() => {}} />)}
              </Room>
              <FloorSeparator />
              <Room id={6} name="偶像重塑工廠" bgColor="#F0FBFF" roomThoughts={roomThoughts} decors={<>
                 <MedicalBed className="left-[20%]" />
                 <ServerRack className="right-[10%]" />
                 <Door className="right-[40%]" />
              </>}>
                {staffs.filter(s => s.roomId === 6).map(s => <StaffSprite key={s.id} staff={s} onClick={setSelectedStaffId} />)}
                {filteredNPCs.filter(n => n.roomId === 6).map(n => <StaffSprite key={n.id} staff={n as any} onClick={() => {}} />)}
              </Room>
          </div>
       </div>

       <div className="flex-none mx-2 mb-1 bg-[#0F172A]/95 backdrop-blur-xl p-2 flex items-center justify-between z-40 border-[4px] border-t-0 border-black shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3">
             <div className="flex flex-col">
                <span className="text-[5px] font-black text-white/30 tracking-[0.2em] uppercase">Security</span>
                <span className="text-[10px] font-black text-[#81D8D0] italic">MAX PROTECT</span>
             </div>
             <div className="w-px h-6 bg-white/10" />
             <div className="flex flex-col">
                <span className="text-[5px] font-black text-white/30 tracking-[0.2em] uppercase">Connection</span>
                <span className="text-[10px] font-black text-[#FF85A2] italic font-mono">STABLE_v2</span>
             </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#1E293B] border-[2px] border-white/10 rounded-full px-3 py-1 shadow-inner">
             <BrainCircuit size={12} className="text-[#81D8D0] animate-pulse" />
             <span className="text-white text-[8px] font-black tracking-[0.2em]">巡航中...</span>
          </div>
       </div>
    </div>
  );
}
