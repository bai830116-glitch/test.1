import React from 'react';
import { LandmarkIcon } from './LandmarkIcon';

import { UI_COLORS } from '../../../../constants';
import { MapScoutStaff } from '../../../../types/scout';

export interface Destination {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  icon: React.ReactNode;
  color: string;
  minRadius: number;
}

export interface CityIntel {
    traineeHeat: number; // 練習生熱度 (0-100)
    marketLevel: string; // 市場等級 (S, A, B...)
    specialty: string; // 城市特產 (Vocal, Dance, Visual...)
    description: string;
}

export { default as CITY_INTEL_DB } from '../../../../data/CityIntel.json';
export { default as SCOUT_LOGS } from '../../../../data/ScoutLogs.json';

export const ALL_DESTINATIONS: Destination[] = [
  { id: 'seoul', name: '首爾總部 (亞洲)', coordinates: [126.5000, 38.5000], icon: <LandmarkIcon id="seoul" color="#FF85A2" />, color: '#FF85A2', minRadius: 0 },
  { id: 'busan', name: '釜山 (韓國)', coordinates: [129.0000, 32.5000], icon: <LandmarkIcon id="busan" color="#FFED99" />, color: '#FFED99', minRadius: 0 },
  { id: 'tokyo', name: '東京分部 (亞洲)', coordinates: [141.5000, 36.5000], icon: <LandmarkIcon id="tokyo" color="#90E0EF" />, color: '#90E0EF', minRadius: 2500 },
  { id: 'la', name: '洛杉磯分部 (北美洲)', coordinates: [-118.2437, 34.0522], icon: <LandmarkIcon id="la" color="#FFFFFF" />, color: '#FFFFFF', minRadius: 3800 },
  { id: 'sydney', name: '雪梨分部 (大洋洲)', coordinates: [151.2093, -33.8688], icon: <LandmarkIcon id="sydney" color="#FFED99" />, color: '#FFED99', minRadius: 5100 },
  { id: 'london', name: '倫敦分部 (歐洲)', coordinates: [-0.1276, 51.5074], icon: <LandmarkIcon id="london" color="#A084E8" />, color: '#A084E8', minRadius: 6400 },
  { id: 'saopaulo', name: '聖保羅分部 (南美洲)', coordinates: [-46.6333, -23.5505], icon: <LandmarkIcon id="saopaulo" color="#90E0EF" />, color: '#90E0EF', minRadius: 7700 },
];

export const INITIAL_SCOUTS: MapScoutStaff[] = [
  { 
    id: '1', 
    name: '老鳥金哥', 
    role: '戰術總監', 
    color: UI_COLORS.MACARON, 
    avatarSprite: '😎', 
    currentCoords: [126.9780, 37.5665], 
    targetCityId: 'tokyo', 
    status: 'traveling', 
    intelLog: ['準備前往東京搜查潛力股...'], 
    fatigue: 0, 
    specialty: 'Vocal',
    stats: { charm: 90, scout: 95 },
    traits: [],
    roomId: 0,
    x: 0,
    action: 'walk',
    actionText: '',
    facing: 1
  },
  { 
    id: '2', 
    name: 'Aori', 
    role: '潮流獵手', 
    color: UI_COLORS.CORAL, 
    avatarSprite: '👩‍🎤', 
    currentCoords: [139.6917, 35.6895], 
    targetCityId: null, 
    status: 'scouting', 
    intelLog: ['東京的街頭文化非常盛行，正在尋找地下舞者。'], 
    fatigue: 0, 
    specialty: 'Dance',
    stats: { charm: 95, scout: 80 },
    traits: [],
    roomId: 0,
    x: 0,
    action: 'walk',
    actionText: '',
    facing: 1
  },
  { 
    id: '3', 
    name: '小王', 
    role: '血汗星探', 
    color: UI_COLORS.TIFFANY, 
    avatarSprite: '🧑‍💻', 
    currentCoords: [129.0756, 35.1796], 
    targetCityId: 'busan', 
    status: 'scouting', 
    intelLog: ['釜山的練習生體力驚人！'], 
    fatigue: 0, 
    specialty: 'Visual',
    stats: { charm: 70, scout: 85 },
    traits: [],
    roomId: 0,
    x: 0,
    action: 'walk',
    actionText: '',
    facing: 1
  },
];

