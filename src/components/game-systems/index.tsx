import React from 'react';
import MainStage from './MainStage';
import DebutProject from './debut-project/DebutProject';
import IdolTroop from './IdolTroop';
import RecordingStudio from './RecordingStudio';
import MusicCopyright from './MusicCopyright';
import LoreUniverse from './LoreUniverse';
import GlobalComeback from './GlobalComeback';
import ChampionRoad from './ChampionRoad';
import RedCarpetPVP from './RedCarpetPVP';
import FandomBase from './FandomBase';
import MasterFans from './MasterFans';
import MerchSanctuary from './MerchSanctuary';
import DormLife from './DormLife';
import ContractTable from './ContractTable';

export type SystemModuleId = 'MainStage' | 'DebutProject' | 'IdolTroop' | 'RecordingStudio' | 'MusicCopyright' | 'LoreUniverse' | 'GlobalComeback' | 'ChampionRoad' | 'RedCarpetPVP' | 'FandomBase' | 'MasterFans' | 'MerchSanctuary' | 'DormLife' | 'ContractTable';

export interface SystemModule {
  id: SystemModuleId;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
}

export const SYSTEM_MODULES: SystemModule[] = [
  { id: 'MainStage', name: 'C位浴血打歌台', icon: '🏟️', component: MainStage },
  { id: 'DebutProject', name: '畫大餅出道企劃', icon: '🧑‍🤝‍🧑', component: DebutProject },
  { id: 'IdolTroop', name: '我的乖孫本命團', icon: '👥', component: IdolTroop },
  { id: 'RecordingStudio', name: '百萬修音錄音室', icon: '🎵', component: RecordingStudio },
  { id: 'MusicCopyright', name: '躺平印鈔詞曲庫', icon: '📀', component: MusicCopyright },
  { id: 'LoreUniverse', name: '超羞恥中二宇宙', icon: '🧠', component: LoreUniverse },
  { id: 'GlobalComeback', name: '全球割韭菜回歸', icon: '📡', component: GlobalComeback },
  { id: 'ChampionRoad', name: '血汗一位之路', icon: '🏆', component: ChampionRoad },
  { id: 'RedCarpetPVP', name: '紅毯艷壓修羅場', icon: '📸', component: RedCarpetPVP },
  { id: 'FandomBase', name: '飯圈護航兵工廠', icon: '⭐', component: FandomBase },
  { id: 'MasterFans', name: '禿頭爆肝數據組', icon: '📷', component: MasterFans },
  { id: 'MerchSanctuary', name: '榨乾錢包周邊店', icon: '🛍️', component: MerchSanctuary },
  { id: 'DormLife', name: '宿舍查勤防爆雷', icon: '🏠', component: DormLife },
  { id: 'ContractTable', name: '七年魔咒談判桌', icon: '🤝', component: ContractTable },
];

export function SystemCarrier({ activeId }: { activeId: string }) {
  const sys = SYSTEM_MODULES.find(s => s.id === activeId) || SYSTEM_MODULES[0];
  const Component = sys.component;
  return <Component />;
}
