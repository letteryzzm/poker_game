import type { PlayingCard } from './card';
import type { SkillCardEffect } from './skillCard';

// 游戏状态
export interface GameState {
  status: 'idle' | 'betting' | 'dealing' | 'playing' | 'dealer_turn' | 'finished';
  deck: PlayingCard[];
  playerHand: PlayingCard[];
  dealerHand: PlayingCard[];
  playerScore: number;
  dealerScore: number;
  currentBet: number;
  result?: 'win' | 'lose' | 'push' | 'blackjack' | 'charlie';
  activeSkills: SkillCardEffect[];
}
