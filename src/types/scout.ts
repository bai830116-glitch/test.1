import { ReactNode } from 'react';
import { ActionType } from '../components/game-systems/debut-project/Mainpage1/ScoutPixelAvatar';

export interface ScoutStaff {
  id: string;
  name: string;
  role: string;
  color: string;
  stats: { charm: number; scout: number };
  traits: { name: string; desc: string }[];
  roomId: number;
  x: number;
  action: ActionType;
  actionText: string;
  facing: 1 | -1;
  avatarSprite: string;
  dispatchRoute?: string;
  fatigue: number;
  // AI World additions
  targetX?: number;
  mood?: 'happy' | 'tired' | 'focused' | 'social';
  interactingWith?: string; // Furniture ID or Staff ID
}

export type WeatherType = 'clear' | 'rainy' | 'foggy' | 'stormy';

export interface GlobalEvent {
  id: string;
  name: string;
  targetCityId: string | 'global';
  effect: string;
  duration: number; // minutes
  startTime: number;
}

export interface MapScoutStaff extends ScoutStaff {
  currentCoords: [number, number];
  targetCityId: string | null;
  status: 'scouting' | 'traveling' | 'resting';
  intelLog: string[];
  specialty?: string;
}

export interface Destination {
  id: string;
  name: string;
  coordinates: [number, number];
  icon: ReactNode;
  color: string;
  minRadius: number;
}
