import type { CardStack } from './card';
import type { SkillCardStack } from './skillCard';

// 玩家信息
export interface Player {
  name: string;
  money: number;
  level: number;
  exp: number;
  hp: number;
  maxHp: number;
  shield: number;
  maxShield: number;
  currentScene: string;
  lastDailyReward: number; // 上次领取每日救济金时间戳
}

// 背包系统
export interface Inventory {
  handDeck: CardStack[];
  warehouse: CardStack[];
  skillCards: SkillCardStack[];
  maxWeight: number;
  currentWeight: number;
}
