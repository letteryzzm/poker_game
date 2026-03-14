# 太空21点卡牌游戏 - 完整实现计划

> 融合 Blackjack 游戏机制 + 太空卡牌收集系统的创新卡牌游戏

---

## 📋 一、游戏概念设计

### 1.1 核心创意

**游戏名称**：Space 21 - 太空矿工的赌局

**游戏类型**：卡牌策略 + 21点机制 + RPG元素

**核心玩法**：
- 玩家扮演太空矿工，在不同星球矿区进行21点赌局
- 通过赢得赌局获得资源卡牌（矿石、装备等）
- 收集的卡牌可以用于升级、交易或解锁新区域
- 每个矿区有不同的NPC庄家，规则略有变化

### 1.2 游戏特色

**融合点1：21点核心机制**
- 保留经典21点规则（Hit/Stand/Bust）
- Ace自动转换（11点↔1点）
- Five Card Charlie特殊规则

**融合点2：卡牌收集系统**
- 赢得赌局获得资源卡牌
- 卡牌有重量和堆叠限制
- 卡组管理（负重系统）

**融合点3：RPG探索元素**
- 多个矿区场景（初级矿区、深空矿区、危险区等）
- NPC交互和对话系统
- 商店系统（用资源购买道具）

---

## 🎮 二、游戏规则设计

### 2.1 21点赌局规则

#### 基础流程
1. **下注阶段**：玩家用"星币"下注（10-1000）
2. **发牌阶段**：玩家2张明牌，庄家1张明牌
3. **玩家回合**：Hit（要牌）或 Stand（停牌）
4. **庄家回合**：自动抽牌至17点以上
5. **结算阶段**：判定胜负，发放奖励

#### 胜负判定
| 条件 | 结果 | 奖励 |
|------|------|------|
| 玩家爆牌（>21） | 输 | 失去赌注 |
| 庄家爆牌 | 赢 | 2倍赌注 + 1张资源卡 |
| 玩家点数 > 庄家 | 赢 | 2倍赌注 + 1张资源卡 |
| 玩家点数 < 庄家 | 输 | 失去赌注 |
| 点数相同 | 平局 | 退还赌注 |
| Five Card Charlie | 大赢 | 3倍赌注 + 2张稀有卡 |

#### 特殊规则
- **Blackjack（天然21）**：前两张A+10点牌，赔率2.5倍
- **Double Down**：前两张后可加倍下注，只能再抽1张
- **Split**：两张相同点数可分牌（需额外下注）

### 2.2 卡牌收集系统

#### 资源卡类型

| 类型 | 示例 | 用途 | 重量 | 稀有度 |
|------|------|------|------|--------|
| 矿石 | 铁矿、金矿、钻石 | 出售换钱、升级装备 | 5-20 | 普通-稀有 |
| 食物 | 能量棒、太空餐 | 恢复HP | 1-3 | 普通 |
| 装备 | 采矿工具、护甲 | 提升能力 | 10-30 | 稀有-史诗 |
| 特殊 | 通行证、钥匙 | 解锁区域 | 0 | 史诗 |

#### 卡组管理
- **手牌卡组**：最大负重100，存放收集的资源
- **仓库卡组**：最大负重500，长期存储
- **堆叠规则**：同类卡牌自动堆叠（最大999）
- **重量计算**：总重量 = Σ(卡牌重量 × 数量)

### 2.3 场景与NPC系统

#### 矿区场景
1. **新手矿区**（Tutorial Zone）
   - NPC庄家：机器人教官
   - 最低下注：10星币
   - 特殊规则：无
   - 奖励卡池：铁矿、石头、冰

2. **中级矿区**（Mid-Level Zone）
   - NPC庄家：老矿工杰克
   - 最低下注：50星币
   - 特殊规则：庄家17点必须停牌
   - 奖励卡池：金矿、银矿、能量棒

3. **深空矿区**（Deep Space Zone）
   - NPC庄家：神秘商人
   - 最低下注：200星币
   - 特殊规则：允许Split和Double Down
   - 奖励卡池：钻石、稀有装备、通行证

4. **危险区**（Danger Zone）
   - NPC庄家：海盗头目
   - 最低下注：500星币
   - 特殊规则：庄家可以看到玩家第一张牌
   - 奖励卡池：史诗装备、大量星币

#### NPC交互
- **对话系统**：点击NPC触发对话树
- **任务系统**：NPC发布收集任务（收集10个铁矿等）
- **商店系统**：用资源卡换取星币或装备

---

## 💻 三、技术实现方案

### 3.1 技术栈选择

**推荐方案：React + TypeScript + Zustand**

```
技术栈：
- React 18 + TypeScript
- Zustand（状态管理）
- Framer Motion（动画）
- Vite（构建工具）
- TailwindCSS（样式）
```

**优势**：
- 类型安全（TypeScript）
- 轻量级状态管理（Zustand）
- 流畅动画（Framer Motion）
- 快速开发（Vite热更新）

### 3.2 项目结构

```
space-21-game/
├── public/
│   ├── assets/
│   │   ├── cards/              # 扑克牌图片
│   │   │   ├── c1.png - c13.png
│   │   │   ├── h1.png - h13.png
│   │   │   ├── s1.png - s13.png
│   │   │   └── d1.png - d13.png
│   │   ├── resources/          # 资源卡图片
│   │   │   ├── iron_ore.png
│   │   │   ├── gold_ore.png
│   │   │   └── ...
│   │   ├── scenes/             # 场景背景
│   │   │   ├── tutorial_zone.png
│   │   │   ├── mid_zone.png
│   │   │   └── ...
│   │   ├── npcs/               # NPC头像
│   │   │   ├── robot_dealer.png
│   │   │   └── ...
│   │   └── sounds/             # 音效
│   │       ├── card_deal.mp3
│   │       ├── win.mp3
│   │       └── ...
│   └── data/
│       ├── cards.json          # 扑克牌数据
│       ├── resources.json      # 资源卡数据
│       ├── scenes.json         # 场景数据
│       └── npcs.json           # NPC数据
│
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── BlackjackTable.tsx    # 21点游戏桌
│   │   │   ├── PlayingCard.tsx       # 扑克牌组件
│   │   │   ├── PlayerHand.tsx        # 玩家手牌
│   │   │   ├── DealerHand.tsx        # 庄家手牌
│   │   │   ├── BettingPanel.tsx      # 下注面板
│   │   │   └── GameControls.tsx      # 游戏控制按钮
│   │   ├── inventory/
│   │   │   ├── ResourceCard.tsx      # 资源卡组件
│   │   │   ├── Deck.tsx              # 卡组组件
│   │   │   ├── InventoryPanel.tsx    # 背包面板
│   │   │   └── WeightBar.tsx         # 负重条
│   │   ├── scene/
│   │   │   ├── SceneView.tsx         # 场景视图
│   │   │   ├── NPCCard.tsx           # NPC卡片
│   │   │   └── NavigationMap.tsx     # 导航地图
│   │   ├── ui/
│   │   │   ├── TopBar.tsx            # 顶部状态栏
│   │   │   ├── DialogueBox.tsx       # 对话框
│   │   │   ├── ShopPanel.tsx         # 商店面板
│   │   │   └── RewardModal.tsx       # 奖励弹窗
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Modal.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── hooks/
│   │   ├── useBlackjackGame.ts       # 21点游戏逻辑
│   │   ├── useDragDrop.ts            # 拖拽逻辑
│   │   ├── useInventory.ts           # 背包管理
│   │   ├── useSound.ts               # 音效管理
│   │   └── useSaveLoad.ts            # 存档系统
│   │
│   ├── store/
│   │   ├── gameStore.ts              # 游戏状态
│   │   ├── playerStore.ts            # 玩家状态
│   │   ├── inventoryStore.ts         # 背包状态
│   │   └── sceneStore.ts             # 场景状态
│   │
│   ├── utils/
│   │   ├── blackjackLogic.ts         # 21点核心逻辑
│   │   ├── cardUtils.ts              # 卡牌工具函数
│   │   ├── deckManager.ts            # 牌堆管理
│   │   ├── rewardSystem.ts           # 奖励系统
│   │   └── dataLoader.ts             # 数据加载
│   │
│   ├── types/
│   │   ├── game.ts                   # 游戏类型定义
│   │   ├── card.ts                   # 卡牌类型定义
│   │   └── player.ts                 # 玩家类型定义
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### 3.3 核心数据结构

#### 类型定义（TypeScript）

```typescript
// types/card.ts
export interface PlayingCard {
  value: number;        // 1-13 (A-K)
  suit: 'c' | 'h' | 's' | 'd';  // 梅花/红心/黑桃/方块
  face: string;         // 图片文件名
  hidden?: boolean;     // 是否隐藏
}

export interface ResourceCard {
  id: string;
  name: string;
  displayName: string;
  type: 'ore' | 'food' | 'equipment' | 'special';
  description: string;
  weight: number;
  maxStack: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  imagePath: string;
  hp?: number;          // 食物回复值
}

export interface CardStack {
  card: ResourceCard;
  count: number;
  position: number;
}

// types/game.ts
export interface GameState {
  status: 'idle' | 'betting' | 'dealing' | 'playing' | 'dealer_turn' | 'finished';
  deck: PlayingCard[];
  playerHand: PlayingCard[];
  dealerHand: PlayingCard[];
  playerScore: number;
  dealerScore: number;
  currentBet: number;
  result?: 'win' | 'lose' | 'push' | 'blackjack' | 'charlie';
}

// types/player.ts
export interface Player {
  name: string;
  money: number;
  hp: number;
  maxHp: number;
  level: number;
  exp: number;
  currentScene: string;
}

export interface Inventory {
  handDeck: CardStack[];
  warehouse: CardStack[];
  maxWeight: number;
  currentWeight: number;
}
```

### 3.4 状态管理（Zustand）

```typescript
// store/gameStore.ts
import { create } from 'zustand';

interface GameStore {
  // 游戏状态
  status: GameState['status'];
  deck: PlayingCard[];
  playerHand: PlayingCard[];
  dealerHand: PlayingCard[];
  playerScore: number;
  dealerScore: number;
  currentBet: number;
  result?: GameState['result'];

  // 操作方法
  initDeck: () => void;
  shuffleDeck: () => void;
  dealCards: () => void;
  hit: () => void;
  stand: () => void;
  placeBet: (amount: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: 'idle',
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  currentBet: 0,

  initDeck: () => {
    const suits = ['c', 'h', 's', 'd'];
    const deck: PlayingCard[] = [];

    suits.forEach(suit => {
      for (let i = 1; i <= 13; i++) {
        deck.push({
          value: i === 1 ? 11 : Math.min(i, 10),
          suit: suit as any,
          face: `${suit}${i}`
        });
      }
    });

    set({ deck });
  },

  shuffleDeck: () => {
    const { deck } = get();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    set({ deck: shuffled });
  },

  // ... 其他方法实现
}));

// store/playerStore.ts
interface PlayerStore {
  player: Player;
  inventory: Inventory;

  updateMoney: (amount: number) => void;
  updateHp: (amount: number) => void;
  addCard: (card: ResourceCard, count: number) => void;
  removeCard: (cardId: string, count: number) => void;
  calculateWeight: () => number;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: {
    name: '玩家',
    money: 1000,
    hp: 100,
    maxHp: 100,
    level: 1,
    exp: 0,
    currentScene: 'tutorial_zone'
  },
  inventory: {
    handDeck: [],
    warehouse: [],
    maxWeight: 100,
    currentWeight: 0
  },

  updateMoney: (amount) => {
    set(state => ({
      player: { ...state.player, money: state.player.money + amount }
    }));
  },

  // ... 其他方法
}));
```

---

## 🎯 四、核心功能实现

### 4.1 21点游戏逻辑

```typescript
// utils/blackjackLogic.ts

/**
 * 计算手牌分数（处理Ace转换）
 */
export function calculateScore(hand: PlayingCard[]): number {
  let score = hand.reduce((sum, card) => sum + card.value, 0);
  let aces = hand.filter(card => card.value === 11).length;

  // Ace自动转换：11 -> 1
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}

/**
 * 检查是否为Blackjack（天然21点）
 */
export function isBlackjack(hand: PlayingCard[]): boolean {
  if (hand.length !== 2) return false;
  const score = calculateScore(hand);
  return score === 21;
}

/**
 * 检查是否为Five Card Charlie
 */
export function isFiveCardCharlie(hand: PlayingCard[]): boolean {
  return hand.length === 5 && calculateScore(hand) < 21;
}

/**
 * 判定游戏结果
 */
export function determineResult(
  playerHand: PlayingCard[],
  dealerHand: PlayingCard[]
): GameState['result'] {
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  // 玩家爆牌
  if (playerScore > 21) return 'lose';

  // Five Card Charlie
  if (isFiveCardCharlie(playerHand)) return 'charlie';

  // Blackjack
  if (isBlackjack(playerHand) && !isBlackjack(dealerHand)) return 'blackjack';

  // 庄家爆牌
  if (dealerScore > 21) return 'win';

  // 比较点数
  if (playerScore > dealerScore) return 'win';
  if (playerScore < dealerScore) return 'lose';
  return 'push';
}

/**
 * 庄家自动抽牌逻辑
 */
export function dealerShouldHit(
  dealerHand: PlayingCard[],
  playerScore: number
): boolean {
  const dealerScore = calculateScore(dealerHand);

  // 基础规则：小于17必须抽
  if (dealerScore < 17) return true;

  // 小于玩家分数继续抽
  if (dealerScore < playerScore && dealerScore < 21) return true;

  return false;
}
```

### 4.2 奖励系统

```typescript
// utils/rewardSystem.ts

interface RewardConfig {
  moneyMultiplier: number;
  cardCount: number;
  cardRarity: ResourceCard['rarity'][];
}

const REWARD_TABLE: Record<GameState['result'], RewardConfig> = {
  win: {
    moneyMultiplier: 2,
    cardCount: 1,
    cardRarity: ['common', 'rare']
  },
  blackjack: {
    moneyMultiplier: 2.5,
    cardCount: 2,
    cardRarity: ['rare', 'epic']
  },
  charlie: {
    moneyMultiplier: 3,
    cardCount: 2,
    cardRarity: ['rare', 'epic']
  },
  push: {
    moneyMultiplier: 1,
    cardCount: 0,
    cardRarity: []
  },
  lose: {
    moneyMultiplier: 0,
    cardCount: 0,
    cardRarity: []
  }
};

/**
 * 计算奖励
 */
export function calculateReward(
  result: GameState['result'],
  bet: number,
  sceneId: string
): {
  money: number;
  cards: ResourceCard[];
} {
  const config = REWARD_TABLE[result];
  const money = bet * config.moneyMultiplier;

  // 根据场景和稀有度随机抽取卡牌
  const cards = generateRewardCards(
    sceneId,
    config.cardCount,
    config.cardRarity
  );

  return { money, cards };
}

/**
 * 生成奖励卡牌
 */
function generateRewardCards(
  sceneId: string,
  count: number,
  rarities: ResourceCard['rarity'][]
): ResourceCard[] {
  // 从场景卡池中随机抽取
  const cardPool = getSceneCardPool(sceneId);
  const filtered = cardPool.filter(card =>
    rarities.includes(card.rarity)
  );

  const rewards: ResourceCard[] = [];
  for (let i = 0; i < count; i++) {
    const randomCard = filtered[Math.floor(Math.random() * filtered.length)];
    rewards.push(randomCard);
  }

  return rewards;
}
```

### 4.3 背包管理系统

```typescript
// utils/inventoryManager.ts

/**
 * 添加卡牌到背包（自动堆叠）
 */
export function addCardToInventory(
  inventory: Inventory,
  card: ResourceCard,
  count: number = 1
): Inventory {
  const newInventory = { ...inventory };

  // 检查是否已存在同名卡牌
  const existingStack = newInventory.handDeck.find(
    stack => stack.card.id === card.id
  );

  if (existingStack) {
    // 堆叠
    const newCount = Math.min(
      existingStack.count + count,
      card.maxStack
    );
    existingStack.count = newCount;
  } else {
    // 新增
    newInventory.handDeck.push({
      card,
      count,
      position: newInventory.handDeck.length
    });
  }

  // 更新总重量
  newInventory.currentWeight = calculateTotalWeight(newInventory.handDeck);

  return newInventory;
}

/**
 * 计算总重量
 */
export function calculateTotalWeight(deck: CardStack[]): number {
  return deck.reduce((total, stack) => {
    return total + (stack.card.weight * stack.count);
  }, 0);
}

/**
 * 检查是否可以添加卡牌
 */
export function canAddCard(
  inventory: Inventory,
  card: ResourceCard,
  count: number = 1
): boolean {
  const additionalWeight = card.weight * count;
  return (inventory.currentWeight + additionalWeight) <= inventory.maxWeight;
}

/**
 * 分离堆叠卡牌
 */
export function splitCardStack(
  inventory: Inventory,
  stackIndex: number,
  splitCount: number = 1
): Inventory {
  const newInventory = { ...inventory };
  const stack = newInventory.handDeck[stackIndex];

  if (stack.count <= splitCount) {
    // 全部分离，不做处理
    return inventory;
  }

  // 减少原堆叠数量
  stack.count -= splitCount;

  // 创建新堆叠
  newInventory.handDeck.push({
    card: stack.card,
    count: splitCount,
    position: newInventory.handDeck.length
  });

  return newInventory;
}
```

### 4.4 拖拽系统

```typescript
// hooks/useDragDrop.ts
import { useState, useCallback } from 'react';

interface DragState {
  isDragging: boolean;
  draggedCard: ResourceCard | null;
  draggedFrom: string | null;
  position: { x: number; y: number };
}

export function useDragDrop() {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedCard: null,
    draggedFrom: null,
    position: { x: 0, y: 0 }
  });

  const startDrag = useCallback((
    card: ResourceCard,
    fromDeck: string,
    event: React.MouseEvent
  ) => {
    setDragState({
      isDragging: true,
      draggedCard: card,
      draggedFrom: fromDeck,
      position: { x: event.clientX, y: event.clientY }
    });
  }, []);

  const updateDragPosition = useCallback((event: React.MouseEvent) => {
    if (dragState.isDragging) {
      setDragState(prev => ({
        ...prev,
        position: { x: event.clientX, y: event.clientY }
      }));
    }
  }, [dragState.isDragging]);

  const endDrag = useCallback((targetDeck: string | null) => {
    // 处理放置逻辑
    if (dragState.draggedCard && targetDeck) {
      // 调用背包管理函数移动卡牌
    }

    setDragState({
      isDragging: false,
      draggedCard: null,
      draggedFrom: null,
      position: { x: 0, y: 0 }
    });
  }, [dragState]);

  return { dragState, startDrag, updateDragPosition, endDrag };
}
```

---

## 🎨 五、UI/UX设计

### 5.1 游戏界面布局

```
┌─────────────────────────────────────────────────────┐
│  顶部栏                                              │
│  💰 1000星币 | ❤️ 100/100 HP | 🎒 45/100kg | ⚙️    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  场景区域（左侧）        │   21点游戏桌（右侧）      │
│  ┌──────────────┐       │   ┌──────────────┐      │
│  │  当前场景    │       │   │  庄家手牌    │      │
│  │  [NPC卡片]   │       │   │  [🂠] [?]     │      │
│  │  [商店入口]  │       │   │  分数: 10    │      │
│  │  [导航按钮]  │       │   └──────────────┘      │
│  └──────────────┘       │                          │
│                         │   ┌──────────────┐      │
│                         │   │  玩家手牌    │      │
│                         │   │  [🂡] [🂮]    │      │
│                         │   │  分数: 19    │      │
│                         │   └──────────────┘      │
│                         │                          │
│                         │   [下注: 100]            │
│                         │   [Hit] [Stand] [Double] │
│                                                     │
├─────────────────────────────────────────────────────┤
│  背包区域（底部）                                    │
│  [铁矿x5] [金矿x2] [能量棒x3] ...                   │
│  负重: 45/100 ████████████░░░░░░░░░░                │
└─────────────────────────────────────────────────────┘
```

### 5.2 核心组件设计

#### BlackjackTable 组件

```tsx
// components/game/BlackjackTable.tsx
import { useGameStore } from '@/store/gameStore';
import { PlayingCard } from './PlayingCard';
import { GameControls } from './GameControls';

export function BlackjackTable() {
  const {
    status,
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    currentBet
  } = useGameStore();

  return (
    <div className="blackjack-table bg-green-800 rounded-lg p-8">
      {/* 庄家区域 */}
      <div className="dealer-area mb-8">
        <h3 className="text-white mb-4">庄家 - {dealerScore}点</h3>
        <div className="flex gap-2">
          {dealerHand.map((card, i) => (
            <PlayingCard key={i} card={card} />
          ))}
        </div>
      </div>

      {/* 玩家区域 */}
      <div className="player-area mb-8">
        <h3 className="text-white mb-4">你 - {playerScore}点</h3>
        <div className="flex gap-2">
          {playerHand.map((card, i) => (
            <PlayingCard key={i} card={card} />
          ))}
        </div>
      </div>

      {/* 控制按钮 */}
      <GameControls />

      {/* 下注显示 */}
      {currentBet > 0 && (
        <div className="bet-display text-white text-center mt-4">
          当前下注: {currentBet} 星币
        </div>
      )}
    </div>
  );
}
```

#### ResourceCard 组件

```tsx
// components/inventory/ResourceCard.tsx
import { motion } from 'framer-motion';
import { ResourceCard as CardType } from '@/types/card';

interface Props {
  card: CardType;
  count: number;
  onDragStart?: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

export function ResourceCard({ card, count, onDragStart, onClick }: Props) {
  const rarityColors = {
    common: 'border-gray-400',
    rare: 'border-blue-500',
    epic: 'border-purple-500',
    legendary: 'border-yellow-500'
  };

  return (
    <motion.div
      className={`resource-card relative w-32 h-44 rounded-lg border-2 ${rarityColors[card.rarity]}
                  bg-gray-800 cursor-pointer overflow-hidden`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseDown={onDragStart}
      onClick={onClick}
    >
      {/* 卡牌图片 */}
      <img
        src={card.imagePath}
        alt={card.displayName}
        className="w-full h-24 object-cover"
      />

      {/* 卡牌名称 */}
      <div className="p-2">
        <h4 className="text-white text-sm font-bold">{card.displayName}</h4>
        <p className="text-gray-400 text-xs truncate">{card.description}</p>
      </div>

      {/* 堆叠数量 */}
      {count > 1 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-75
                        text-white text-xs px-2 py-1 rounded">
          x{count}
        </div>
      )}

      {/* 重量标识 */}
      <div className="absolute bottom-2 left-2 text-gray-400 text-xs">
        ⚖️ {card.weight}kg
      </div>
    </motion.div>
  );
}
```

### 5.3 动画效果

```typescript
// 发牌动画
const dealAnimation = {
  initial: { x: -200, opacity: 0, rotate: -10 },
  animate: { x: 0, opacity: 1, rotate: 0 },
  transition: { type: 'spring', stiffness: 300, damping: 20 }
};

// 堆叠动画
const stackAnimation = {
  initial: { scale: 1 },
  animate: {
    x: targetX,
    y: targetY,
    scale: 0.5,
    opacity: 0
  },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

// 胜利动画
const winAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0]
  },
  transition: { duration: 0.5, repeat: 2 }
};
```

---

## 📊 六、数据配置文件

### 6.1 资源卡数据

```json
// public/data/resources.json
{
  "iron_ore": {
    "id": "iron_ore",
    "name": "Iron",
    "displayName": "铁矿",
    "type": "ore",
    "description": "最常见的矿石，可以冶炼成铁锭",
    "weight": 5,
    "maxStack": 999,
    "rarity": "common",
    "price": 50,
    "imagePath": "/assets/resources/iron_ore.png"
  },
  "gold_ore": {
    "id": "gold_ore",
    "name": "Gold",
    "displayName": "金矿",
    "type": "ore",
    "description": "珍贵的金矿石，价值不菲",
    "weight": 8,
    "maxStack": 500,
    "rarity": "rare",
    "price": 200,
    "imagePath": "/assets/resources/gold_ore.png"
  },
  "energy_bar": {
    "id": "energy_bar",
    "name": "EnergyBar",
    "displayName": "能量棒",
    "type": "food",
    "description": "恢复20点HP",
    "weight": 1,
    "maxStack": 999,
    "rarity": "common",
    "price": 30,
    "hp": 20,
    "imagePath": "/assets/resources/energy_bar.png"
  }
}
```

### 6.2 场景数据

```json
// public/data/scenes.json
{
  "tutorial_zone": {
    "id": "tutorial_zone",
    "displayName": "新手矿区",
    "description": "适合新手的安全矿区",
    "backgroundImage": "/assets/scenes/tutorial_zone.png",
    "npcDealer": "robot_dealer",
    "minBet": 10,
    "maxBet": 100,
    "specialRules": [],
    "cardPool": ["iron_ore", "stone", "ice"],
    "connectedScenes": ["mid_zone"],
    "unlockRequirement": null
  },
  "mid_zone": {
    "id": "mid_zone",
    "displayName": "中级矿区",
    "description": "产出更好的矿石",
    "backgroundImage": "/assets/scenes/mid_zone.png",
    "npcDealer": "old_miner",
    "minBet": 50,
    "maxBet": 500,
    "specialRules": ["dealer_must_stand_17"],
    "cardPool": ["iron_ore", "gold_ore", "silver_ore", "energy_bar"],
    "connectedScenes": ["tutorial_zone", "deep_space"],
    "unlockRequirement": {
      "type": "money",
      "value": 500
    }
  }
}
```

### 6.3 NPC数据

```json
// public/data/npcs.json
{
  "robot_dealer": {
    "id": "robot_dealer",
    "name": "机器人教官",
    "avatar": "/assets/npcs/robot_dealer.png",
    "dialogue": {
      "greeting": "欢迎来到新手矿区，我来教你如何玩21点。",
      "win": "干得不错！这是你的奖励。",
      "lose": "别灰心，再试一次吧。"
    },
    "shop": null
  },
  "old_miner": {
    "id": "old_miner",
    "name": "老矿工杰克",
    "avatar": "/assets/npcs/old_miner.png",
    "dialogue": {
      "greeting": "小伙子，想试试运气吗？",
      "win": "你的运气不错啊！",
      "lose": "哈哈，还是我技高一筹。"
    },
    "shop": {
      "items": ["energy_bar", "mining_tool"]
    }
  }
}
```

---

## 🚀 七、开发路线图

### Phase 1: 核心21点游戏（2周）

**目标**：实现可玩的21点游戏

**任务清单**：
- [ ] 项目初始化（Vite + React + TypeScript）
- [ ] 创建基础UI布局
- [ ] 实现扑克牌数据结构和渲染
- [ ] 实现洗牌和发牌逻辑
- [ ] 实现Hit/Stand功能
- [ ] 实现分数计算（含Ace转换）
- [ ] 实现庄家自动抽牌
- [ ] 实现胜负判定
- [ ] 实现下注系统
- [ ] 添加基础动画（发牌、翻牌）

**验收标准**：
- 可以完整进行一局21点游戏
- 所有规则正确实现
- 无明显bug

### Phase 2: 资源卡系统（1.5周）

**目标**：实现资源卡收集和管理

**任务清单**：
- [ ] 创建资源卡数据结构
- [ ] 实现资源卡渲染组件
- [ ] 实现背包系统（负重、堆叠）
- [ ] 实现奖励系统（赢得游戏获得卡牌）
- [ ] 实现拖拽功能
- [ ] 实现卡牌详情查看
- [ ] 添加背包UI和动画

**验收标准**：
- 赢得游戏后正确发放资源卡
- 背包管理功能完整
- 拖拽流畅无bug

### Phase 3: 场景和NPC系统（2周）

**目标**：实现多场景探索和NPC交互

**任务清单**：
- [ ] 创建场景系统
- [ ] 实现场景切换
- [ ] 创建NPC卡片组件
- [ ] 实现对话系统
- [ ] 实现商店系统
- [ ] 添加场景背景和音效
- [ ] 实现场景解锁机制

**验收标准**：
- 可以在多个场景间切换
- NPC对话系统正常工作
- 商店可以正常交易

### Phase 4: 高级功能（1.5周）

**目标**：实现高级21点规则和优化

**任务清单**：
- [ ] 实现Blackjack（天然21点）
- [ ] 实现Double Down（加倍）
- [ ] 实现Split（分牌）
- [ ] 实现存档/读档系统
- [ ] 添加音效和背景音乐
- [ ] 优化动画效果
- [ ] 添加粒子特效

**验收标准**：
- 所有高级规则正确实现
- 存档系统稳定可靠
- 音效和动画流畅

### Phase 5: 打磨和测试（1周）

**目标**：优化体验，修复bug

**任务清单**：
- [ ] 性能优化
- [ ] UI/UX优化
- [ ] 响应式布局适配
- [ ] 全面测试和bug修复
- [ ] 添加教程引导
- [ ] 编写文档

**验收标准**：
- 无严重bug
- 流畅运行（60fps）
- 移动端适配良好

---

## 🛠️ 八、技术难点和解决方案

### 8.1 Ace自动转换

**难点**：多个Ace时的转换逻辑

**解决方案**：
```typescript
function calculateScore(hand: PlayingCard[]): number {
  let score = hand.reduce((sum, card) => sum + card.value, 0);
  let aces = hand.filter(card => card.value === 11).length;

  // 逐个转换Ace直到不爆牌
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }

  return score;
}
```

### 8.2 卡牌堆叠动画

**难点**：流畅的飞行动画和碰撞检测

**解决方案**：使用Framer Motion的`animate`属性
```typescript
<motion.div
  animate={{
    x: targetPosition.x,
    y: targetPosition.y,
    scale: 0.5,
    opacity: 0
  }}
  transition={{
    type: 'spring',
    stiffness: 300,
    damping: 25
  }}
  onAnimationComplete={onStackComplete}
/>
```

### 8.3 状态持久化

**难点**：复杂状态的序列化和恢复

**解决方案**：使用Zustand的persist中间件
```typescript
import { persist } from 'zustand/middleware';

export const usePlayerStore = create(
  persist(
    (set) => ({
      // ... state
    }),
    {
      name: 'player-storage',
      version: 1
    }
  )
);
```

---

## 📝 九、开发规范

### 9.1 代码规范

- 使用TypeScript严格模式
- 遵循Airbnb代码风格
- 组件使用函数式组件 + Hooks
- 状态管理使用Zustand
- 样式使用TailwindCSS

### 9.2 命名规范

```typescript
// 组件：PascalCase
export function BlackjackTable() {}

// 函数：camelCase
function calculateScore() {}

// 常量：UPPER_SNAKE_CASE
const MAX_BET = 1000;

// 类型：PascalCase
interface GameState {}
```

### 9.3 文件组织

```
- 一个文件一个组件
- 相关组件放在同一目录
- 工具函数独立文件
- 类型定义集中管理
```

---

## 🎯 十、成功指标

### 10.1 功能完整性
- ✅ 所有21点规则正确实现
- ✅ 资源卡系统完整可用
- ✅ 场景和NPC系统正常工作
- ✅ 存档系统稳定可靠

### 10.2 性能指标
- 帧率：≥60fps
- 首屏加载：<2秒
- 内存占用：<100MB

### 10.3 用户体验
- 操作响应：<100ms
- 动画流畅度：无卡顿
- 界面美观度：现代化设计

---

## 📚 十一、参考资源

### 技术文档
- React官方文档：https://react.dev
- Zustand文档：https://github.com/pmndrs/zustand
- Framer Motion：https://www.framer.com/motion
- TailwindCSS：https://tailwindcss.com

### 游戏规则
- 21点规则：https://en.wikipedia.org/wiki/Blackjack
- 卡牌游戏设计：https://www.gamedeveloper.com

### 现有项目
- Blackjack项目：`/blackjackin/`
- Godot卡牌框架：`/godot-card-game-frame/`

---

## ✅ 总结

这个计划融合了两个现有项目的优点：

**从Blackjack继承**：
- 成熟的21点游戏逻辑
- Ace自动转换机制
- Five Card Charlie规则
- 洗牌和发牌系统

**从太空卡牌继承**：
- 资源卡收集系统
- 负重和堆叠机制
- 场景探索系统
- NPC交互和对话
- 商店系统

**创新点**：
- 将21点赌局作为获取资源的核心玩法
- RPG式的场景探索和进度系统
- 不同场景有不同的规则变体
- 资源卡可以用于升级和解锁

**技术优势**：
- 使用现代技术栈（React 18 + TypeScript）
- 类型安全和可维护性高
- 组件化设计易于扩展
- 性能优化和用户体验良好

预计总开发时间：**8周**（约2个月）

---

**文档版本**：v1.0
**创建日期**：2026-03-14
**作者**：AI Assistant
**项目代号**：Space-21
