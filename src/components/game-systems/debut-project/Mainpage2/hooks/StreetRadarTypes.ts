export interface Pedestrian {
  id: string;
  x: number;
  y: number;
  type: 'VOCAL' | 'DANCE' | 'VISUAL' | 'RAP' | 'NORMAL';
  rarity: 'C' | 'B' | 'A' | 'S' | 'SS';
  avatar: string;
  name: string;
  facing: 1 | -1;
  isMoving: boolean;
  targetX: number;
  targetY: number;
  speed: number;
  vibeColor: string;
  actionState: 'IDLE' | 'WALKING' | 'PHONE' | 'SPOTTED';
}
