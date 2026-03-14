# 太空21点游戏规则文档

> Space 21 - 太空矿工的赌局

---

## 📋 一、21点核心规则（已实现 ✅）

### 1.1 基础流程

1. **下注** → 2. **发牌** → 3. **玩家回合**（Hit/Stand） → 4. **庄家回合** → 5. **结算**

### 1.2 牌面点数

- A（Ace）：11 或 1（自动选择最优）
- 2-10：面值
- J/Q/K：10点

### 1.3 胜负判定

| 条件 | 结果 | 赔率 |
|------|------|------|
| 玩家Blackjack（A+10点牌） | 大赢 | 2.5倍 |
| 玩家爆牌（>21） | 输 | 0 |
| 庄家爆牌 | 赢 | 2倍 |
| 玩家点数 > 庄家 | 赢 | 2倍 |
| 玩家点数 < 庄家 | 输 | 0 |
| 点数相同 | 平局 | 退还 |

---

## 🎴 二、技能卡系统（第二版新增 🆕）

### 2.1 技能卡类型

#### 战斗技能卡

| 卡牌名称 | 效果 | 冷却时间 | 稀有度 |
|----------|------|----------|--------|
| 透视眼 See Through | 查看庄家的底牌 | 3局 | 稀有 |
| 幸运星 Lucky Star | 下一次抽牌必定有利 | 5局 | 稀有 |
| 重来 Retry | 撤销上一次Hit，退回1张牌 | 单局1次 | 史诗 |
| 换牌 Swap | 将手牌中1张牌换成新牌 | 单局1次 | 史诗 |
| 保险 Insurance | 本局输了只扣50%下注 | 3局 | 普通 |

#### 增益技能卡

| 卡牌名称 | 效果 | 持续时间 | 稀有度 |
|----------|------|----------|--------|
| 双倍奖励 Double Reward | 赢了获得双倍星币 | 1局 | 史诗 |
| 幸运连击 Lucky Streak | 连胜奖励+50% | 3局 | 稀有 |
| 护盾 Shield | 本局不会输钱（平局） | 1局 | 传说 |

### 2.2 技能卡数据结构

```typescript
interface SkillCard {
  id: string;              // 唯一ID
  name: string;            // 卡牌名称
  description: string;     // 效果描述
  type: 'battle' | 'buff'; // 战斗技能 | 增益技能
  rarity: 'common' | 'rare' | 'epic' | 'legendary'; // 稀有度
  cooldown: number;        // 冷却局数
  currentCooldown: number; // 当前冷却（0=可用）
  usageLimit?: number;     // 单局使用次数限制
  usedInRound?: number;    // 本局已使用次数
}
```

### 2.3 技能卡使用规则

**使用时机**：

```typescript
// 战斗技能卡可用时机
{
  "透视眼": ["PLAYER_TURN"],           // 玩家回合
  "幸运星": ["PLAYER_TURN"],           // 玩家回合
  "重来": ["PLAYER_TURN"],             // 玩家回合（Hit后）
  "换牌": ["PLAYER_TURN"],             // 玩家回合
  "保险": ["BETTING"],                 // 下注阶段
  "双倍奖励": ["BETTING"],             // 下注阶段
  "幸运连击": ["BETTING"],             // 下注阶段
  "护盾": ["BETTING"]                  // 下注阶段
}
```

**使用流程**：

1. 玩家点击技能卡
2. 检查是否可用：
   - 当前游戏阶段是否匹配
   - 冷却时间是否结束（currentCooldown == 0）
   - 单局使用次数是否未超限
3. 如果可用 → 执行技能效果，进入冷却
4. 如果不可用 → 显示原因提示

**冷却机制**：

```typescript
// 每局结束后，所有技能卡冷却-1
function onRoundEnd() {
  skillCards.forEach(card => {
    if (card.currentCooldown > 0) {
      card.currentCooldown--;
    }
    card.usedInRound = 0; // 重置单局使用次数
  });
}
```

### 2.4 技能卡获取方式

1. **赌局奖励**：赢得赌局时有概率掉落
   - 普通胜利：10% 概率获得普通技能卡
   - Blackjack：30% 概率获得稀有技能卡

2. **商店购买**：
   - 普通技能卡：200 星币
   - 稀有技能卡：500 星币
   - 史诗技能卡：1000 星币
   - 传说技能卡：5000 星币

3. **任务奖励**：完成特定任务获得

---

## 🎒 三、背包系统（第二版更新 🆕）

### 3.1 背包结构

```typescript
interface Inventory {
  skillCards: SkillCard[];     // 技能卡列表
  maxSkillSlots: number;       // 最大技能卡槽位（默认5个）
}
```

### 3.2 背包界面

**布局**：

```
┌─────────────────────────────────┐
│  背包 - 技能卡 (3/5)             │
├─────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐    │
│  │透视眼│ │幸运星│ │保险  │    │
│  │ 稀有 │ │ 稀有 │ │ 普通 │    │
│  │冷却:0│ │冷却:2│ │冷却:0│    │
│  └──────┘ └──────┘ └──────┘    │
│                                 │
│  [空槽位] [空槽位]              │
└─────────────────────────────────┘
```

**卡牌显示信息**：
- 卡牌名称
- 稀有度（颜色标识）
- 冷却状态（可用/冷却中）
- 效果描述（悬停显示）

### 3.3 背包操作

**查看技能卡**：
1. 点击"背包"按钮
2. 显示所有拥有的技能卡
3. 点击卡牌查看详细信息

**使用技能卡**：
1. 在游戏中点击技能卡
2. 如果可用 → 执行效果
3. 如果不可用 → 显示冷却时间或使用限制

**丢弃技能卡**：
1. 长按技能卡
2. 选择"丢弃"
3. 确认 → 移除卡牌

---

## 🎮 四、第二版实现重点

### 4.1 核心功能

✅ **必须实现**：
1. 技能卡数据结构和配置
2. 背包UI显示技能卡列表
3. 技能卡使用逻辑（时机检查、冷却机制）
4. 至少实现3种技能卡效果：
   - 透视眼（查看庄家底牌）
   - 保险（输了只扣50%）
   - 双倍奖励（赢了双倍星币）

### 4.2 技能卡效果实现示例

**透视眼（See Through）**：
```typescript
function useSeeThrough() {
  // 显示庄家的底牌
  dealerHiddenCard.visible = true;

  // 3秒后自动隐藏
  setTimeout(() => {
    dealerHiddenCard.visible = false;
  }, 3000);

  // 进入冷却
  card.currentCooldown = card.cooldown;
}
```

**保险（Insurance）**：
```typescript
function useInsurance() {
  // 设置保险标记
  currentRound.hasInsurance = true;

  // 在结算时检查
  function onSettle() {
    if (result === 'lose' && currentRound.hasInsurance) {
      // 只扣50%
      player.money += betAmount * 0.5;
    }
  }
}
```

**双倍奖励（Double Reward）**：
```typescript
function useDoubleReward() {
  // 设置双倍标记
  currentRound.hasDoubleReward = true;

  // 在结算时检查
  function onSettle() {
    if (result === 'win' && currentRound.hasDoubleReward) {
      // 奖励翻倍
      reward = reward * 2;
    }
  }
}
```

### 4.3 UI更新点

1. **游戏界面**：
   - 添加技能卡快捷栏（显示3-5个常用技能卡）
   - 显示技能卡冷却状态

2. **背包界面**：
   - 显示所有技能卡
   - 卡牌可点击查看详情
   - 显示冷却时间

3. **结算界面**：
   - 显示获得的技能卡（如果有）

---

## 📊 五、数据配置

### 5.1 技能卡配置文件

```typescript
// skillCards.config.ts
export const SKILL_CARDS_CONFIG = [
  {
    id: 'see_through',
    name: '透视眼',
    description: '查看庄家的底牌3秒',
    type: 'battle',
    rarity: 'rare',
    cooldown: 3,
    price: 500
  },
  {
    id: 'insurance',
    name: '保险',
    description: '本局输了只扣50%下注',
    type: 'battle',
    rarity: 'common',
    cooldown: 3,
    price: 200
  },
  {
    id: 'double_reward',
    name: '双倍奖励',
    description: '本局赢了获得双倍星币',
    type: 'buff',
    rarity: 'epic',
    cooldown: 5,
    price: 1000
  }
];
```

---

**文档版本**：v2.0 - 技能卡系统
**更新日期**：2026-03-14
**实现重点**：技能卡系统 + 背包查看功能
