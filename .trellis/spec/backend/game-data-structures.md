# 游戏数据结构规格

## 核心类型定义

### 扑克牌类型

```typescript
// types/card.ts
export interface PlayingCard {
  value: number;                    // 1-13 (A-K)
  suit: 'c' | 'h' | 's' | 'd';     // 梅花/红心/黑桃/方块
  face: string;                     // 图片文件名 (如 "c1", "h13")
  hidden?: boolean;                 // 是否隐藏（牌背）
}
```

### 资源卡类型

```typescript
// types/card.ts
export interface ResourceCard {
  id: string;                       // 唯一ID
  name: string;                     // 英文名
  displayName: string;              // 显示名称
  type: 'ore' | 'food' | 'equipment' | 'special';
  description: string;              // 描述
  weight: number;                   // 重量（kg）
  maxStack: number;                 // 最大堆叠数
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;                    // 价格（星币）
  imagePath: string;                // 图片路径
  hp?: number;                      // 食物回复值
  effect?: CardEffect;              // 装备效果
}

export interface CardEffect {
  type: 'hp_boost' | 'weight_boost' | 'luck_boost';
  value: number;
}

export interface CardStack {
  card: ResourceCard;
  count: number;
  position: number;
}
```

### 游戏状态类型

```typescript
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
```

### 玩家类型

```typescript
// types/player.ts
export interface Player {
  name: string;
  money: number;                    // 星币
  level: number;                    // 等级
  exp: number;                      // 经验值
  currentScene: string;             // 当前场景ID
  lastDailyReward: number;          // 上次领取每日救济金时间戳
}

export interface Inventory {
  handDeck: CardStack[];            // 手牌卡组
  warehouse: CardStack[];           // 仓库卡组
  maxWeight: number;                // 最大负重
  currentWeight: number;            // 当前负重
}
```

### 场景类型

```typescript
// types/scene.ts
export interface Scene {
  id: string;
  displayName: string;
  description: string;
  backgroundImage: string;
  npcDealer: string;                // NPC庄家ID
  minBet: number;
  maxBet: number;
  specialRules: string[];
  cardPool: string[];               // 奖励卡池（卡牌ID列表）
  connectedScenes: string[];
  unlockRequirement?: UnlockRequirement;
}

export interface UnlockRequirement {
  type: 'money' | 'level';
  value: number;
}
```

### NPC类型

```typescript
// types/npc.ts
export interface NPC {
  id: string;
  name: string;
  avatar: string;
  dialogue: {
    greeting: string;
    win: string;
    lose: string;
  };
  shop?: {
    items: string[];                // 商店物品ID列表
  };
}
```

## 数据配置文件格式

### cards.json

```json
{
  "iron_ore": {
    "id": "iron_ore",
    "name": "Iron",
    "displayName": "铁矿",
    "type": "ore",
    "description": "最常见的矿石",
    "weight": 5,
    "maxStack": 999,
    "rarity": "common",
    "price": 50,
    "imagePath": "/assets/resources/iron_ore.png"
  }
}
```

### scenes.json

```json
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
  }
}
```

### npcs.json

```json
{
  "robot_dealer": {
    "id": "robot_dealer",
    "name": "机器人教官",
    "avatar": "/assets/npcs/robot_dealer.png",
    "dialogue": {
      "greeting": "欢迎来到新手矿区",
      "win": "干得不错！",
      "lose": "别灰心，再试一次"
    },
    "shop": null
  }
}
```
