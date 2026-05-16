export type DifficultyId = 'easy' | 'normal' | 'hard';

export interface GameFounderConfig {
  name: string;
  gender: 'M' | 'F';
  difficulty: DifficultyId;
  company?: string; // Optional for compatibility
  starterIdol?: string; // Optional for compatibility
}

export type AppScreen = 'MAIN_MENU' | 'FOUNDER_SETUP' | 'IN_GAME';
