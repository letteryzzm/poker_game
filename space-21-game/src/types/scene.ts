// 场景解锁要求
export interface UnlockRequirement {
  type: 'money' | 'level';
  value: number;
}

// 场景信息
export interface Scene {
  id: string;
  displayName: string;
  description: string;
  backgroundImage: string;
  npcDealer: string;
  minBet: number;
  maxBet: number;
  specialRules: string[];
  cardPool: string[];
  connectedScenes: string[];
  unlockRequirement: UnlockRequirement | null;
}
