# 游戏状态管理规格

## gameStore（21点游戏状态）

**文件**：`src/store/gameStore.ts`

### 状态定义

```typescript
interface GameStore {
  // 游戏状态
  status: 'idle' | 'betting' | 'dealing' | 'playing' | 'dealer_turn' | 'finished';
  deck: PlayingCard[];
  playerHand: PlayingCard[];
  dealerHand: PlayingCard[];
  playerScore: number;
  dealerScore: number;
  currentBet: number;
  result?: 'win' | 'lose' | 'push' | 'blackjack' | 'charlie';

  // 操作方法
  initDeck: () => void;
  shuffleDeck: () => void;
  dealCards: () => void;
  hit: () => void;
  stand: () => void;
  doubleDown: () => void;
  split: () => void;
  placeBet: (amount: number) => void;
  resetGame: () => void;
}
```

### 关键逻辑

**initDeck**：
- 创建52张牌（4种花色 × 13张）
- A初始值为11，2-10为面值，J/Q/K为10

**dealCards**：
- 玩家发2张明牌
- 庄家发1张明牌
- 状态变为 'playing'

**hit**：
- 从牌堆抽1张给玩家
- 计算分数（含Ace转换）
- 检查爆牌或Five Card Charlie

**stand**：
- 状态变为 'dealer_turn'
- 庄家自动抽牌
- 判定结果

## playerStore（玩家状态）

**文件**：`src/store/playerStore.ts`

### 状态定义

```typescript
interface PlayerStore {
  player: Player;
  inventory: Inventory;

  // 玩家操作
  updateMoney: (amount: number) => void;
  updateHp: (amount: number) => void;
  gainExp: (amount: number) => void;
  levelUp: () => void;

  // 背包操作
  addCard: (card: ResourceCard, count: number) => void;
  removeCard: (cardId: string, count: number) => void;
  moveCard: (cardId: string, fromDeck: string, toDeck: string) => void;
  useCard: (cardId: string) => void;
}
```

### 关键逻辑

**addCard**：
- 检查负重限制
- 自动堆叠同名卡
- 更新总重量

**useCard**：
- 食物卡：恢复HP
- 装备卡：应用效果
- 特殊卡：触发事件

## sceneStore（场景状态）

**文件**：`src/store/sceneStore.ts`

### 状态定义

```typescript
interface SceneStore {
  currentScene: string;
  unlockedScenes: string[];
  visitedScenes: string[];

  // 场景操作
  changeScene: (sceneId: string) => void;
  unlockScene: (sceneId: string) => void;

  // NPC操作
  startDialogue: (npcId: string) => void;
  endDialogue: () => void;
  selectChoice: (choiceId: string) => void;
}
```

## 状态持久化

使用 Zustand persist 中间件：

```typescript
export const usePlayerStore = create(
  persist(
    (set) => ({ /* ... */ }),
    {
      name: 'player-storage',
      version: 1
    }
  )
);
```

**持久化内容**：
- 玩家属性
- 背包内容
- 场景进度
- 解锁状态
