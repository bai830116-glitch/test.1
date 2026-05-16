export interface StreetPedestrianProps {
  id: string;
  type: string;
  rarity: string;
  facing: 1 | -1;
  isMoving: boolean;
  actionState: string;
  season: 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER';
  isNight: boolean;
}

export interface Pedestrian {
  id: string;
  x: number;
  y: number;
  type: 'JK' | 'GUITAR' | 'COOL_GUY' | 'DANCER' | 'IDOL_TRAINEE';
  rarity: 'C' | 'B' | 'A' | 'S' | 'SS';
  avatar: string;
  name: string;
  facing: 1 | -1;
  isMoving: boolean;
  targetX: number;
  targetY: number;
  speed: number;
  vibeColor: string;
  actionState: 'WALKING' | 'IDLE' | 'PHONE';
}
