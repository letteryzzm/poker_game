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

### 4.4 当前实现状态（v2.0）

#### ✅ 已实现功能

**1. 技能卡数据结构**
- 完整的 SkillCard 类型定义
- 8种技能卡配置（`skillCards.ts`）
- 技能卡堆叠系统（SkillCardStack）

**2. 背包系统**
- playerStore 中的 skillCards 数组
- addSkillCard() - 添加技能卡到背包
- useSkillCard() - 使用技能卡（扣除库存、进入冷却）
- reduceCooldowns() - 每局结束冷却-1

**3. 技能卡UI**
- SkillCard 组件 - 单个技能卡显示
- SkillCardBar 组件 - 快捷栏（显示前4张）
- 位置：游戏桌面右下角
- 显示信息：
  - 卡牌名称和描述
  - 右下角：库存数量
  - 冷却时：中间显示剩余回合数

**4. 使用限制**
- 状态检查：只能在 `status === 'playing'` 时使用
- 库存检查：count > 0
- 冷却检查：currentCooldown === 0
- 使用后：库存-1，进入冷却

**5. 冷却机制**
- 每次 resetGame() 时，所有技能卡冷却-1
- 冷却为0时可再次使用

**6. 技能卡效果实现**

✅ **保险（Insurance）**
```typescript
// 在 gameStore.stand() 中实现
if (result === 'lose') {
  const hasInsurance = activeSkills.includes('insurance');
  moneyReward = hasInsurance ? -currentBet * 0.5 : -currentBet;
}
```

✅ **双倍奖励（Double Reward）**
```typescript
// 在 gameStore.stand() 中实现
if (result === 'win' || result === 'blackjack' || result === 'charlie') {
  const hasDoubleReward = activeSkills.includes('double_reward');
  if (hasDoubleReward) {
    moneyReward = (reward.money - currentBet) * 2;
  }
}
```

#### ❌ 未实现功能

**1. 技能卡效果（6个）**
- ❌ 透视眼（peek_dealer）- 查看庄家底牌3秒
- ❌ 额外抽牌（extra_hit）- 本局可多抽1张牌不爆
- ❌ 强制停牌（force_stand）- 强制庄家停牌
- ❌ 治疗（heal）- 恢复30点生命值（已移除HP系统）
- ❌ 护盾增强（shield_boost）- 恢复20点护盾（已移除护盾系统）
- ❌ 幸运加成（luck_boost）- 下3局掉落率+20%

**2. 技能卡获取方式**
- ❌ 赌局奖励掉落
- ❌ 商店购买
- ❌ 任务奖励

**3. 背包界面**
- ❌ 完整的背包UI（当前只有快捷栏）
- ❌ 查看所有技能卡
- ❌ 丢弃技能卡功能

**4. 使用时机限制**
- ❌ 不同技能卡的使用时机检查（BETTING vs PLAYER_TURN）
- 当前：所有技能卡都在 PLAYING 状态使用

#### 🔄 下一步开发建议

**优先级1：完善核心技能卡效果**
1. 实现透视眼效果（显示庄家底牌3秒）
2. 实现额外抽牌效果（允许多抽1张不爆）
3. 实现强制停牌效果（庄家不抽牌）

**优先级2：技能卡获取**
1. 赌局结束时随机掉落技能卡
2. 添加简单的商店界面

**优先级3：完整背包界面**
1. 背包按钮打开完整背包
2. 显示所有技能卡
3. 支持丢弃功能

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

## 🌌 六、RPG探索系统（第三版规划 📋）

### 6.1 场景探索

**场景类型**：

| 场景名称 | 解锁条件 | 特点 |
|----------|----------|------|
| 新手矿区 | 初始解锁 | 安全，低风险低回报 |
| 中级矿区 | 500星币 | 中等难度，有随机事件 |
| 深空矿区 | 深空通行证 | 高风险高回报，稀有资源 |
| 废弃空间站 | 特殊钥匙 | 探索模式，多个房间 |

**探索机制**：

```typescript
interface Scene {
  id: string;
  name: string;
  type: 'casino' | 'exploration'; // 赌场模式 | 探索模式
  rooms?: Room[];                 // 探索模式的房间列表
  npcs: NPC[];
  events: RandomEvent[];          // 随机事件池
}

interface Room {
  id: string;
  name: string;
  description: string;
  connections: string[];          // 连接的房间ID
  content: 'npc' | 'treasure' | 'enemy' | 'empty';
  discovered: boolean;            // 是否已探索
}
```

**探索流程**：
1. 进入场景 → 显示地图（迷雾遮挡未探索区域）
2. 点击相邻房间 → 移动角色
3. 触发房间内容：
   - NPC → 对话/交易/赌局
   - 宝箱 → 获得资源/技能卡
   - 敌人 → 触发战斗（21点对决）
   - 空房间 → 继续探索

### 6.2 NPC系统

**NPC类型**：

| NPC类型 | 功能 | 交互方式 |
|---------|------|----------|
| 商人 | 买卖物品 | 打开商店界面 |
| 赌徒 | 21点对战 | 开始赌局 |
| 任务发布者 | 发布/完成任务 | 对话选择 |
| 路人 | 提供信息/线索 | 对话 |

**对话系统**：

```typescript
interface DialogNode {
  id: string;
  text: string;                   // NPC说的话
  options: DialogOption[];        // 玩家选项
}

interface DialogOption {
  text: string;                   // 选项文本
  nextNode?: string;              // 下一个对话节点
  action?: 'trade' | 'battle' | 'quest' | 'exit';
  condition?: string;             // 显示条件（可选）
}
```

**示例对话**：
```
NPC: "欢迎来到废弃空间站，这里很危险。"
选项1: "我想买点补给" → 打开商店
选项2: "有什么任务吗？" → 显示任务列表
选项3: "来一局21点吧" → 开始赌局
选项4: "告辞" → 结束对话
```

### 6.3 任务系统

**任务类型**：

| 任务类型 | 目标 | 奖励 |
|----------|------|------|
| 收集任务 | 收集指定物品 | 星币 + 技能卡 |
| 战斗任务 | 击败指定NPC | 星币 + 稀有物品 |
| 探索任务 | 探索指定区域 | 解锁新场景 |
| 连胜任务 | 连续赢N局 | 传说技能卡 |

**任务数据结构**：

```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'collect' | 'battle' | 'explore' | 'streak';
  target: {
    type: string;                 // 目标类型
    count: number;                // 目标数量
    current: number;              // 当前进度
  };
  reward: {
    money: number;
    items?: string[];             // 物品ID列表
  };
  status: 'available' | 'active' | 'completed';
}
```

**任务流程**：
1. 从NPC接受任务 → 状态变为 active
2. 完成目标 → 自动检测进度
3. 返回NPC → 领取奖励，状态变为 completed

### 6.4 随机事件

**事件类型**：

| 事件名称 | 触发条件 | 效果 |
|----------|----------|------|
| 幸运宝箱 | 探索房间时10%概率 | 获得随机奖励 |
| 强制对决 | 进入特定房间 | 必须赢得赌局才能离开 |
| 商人出现 | 随机 | 临时商店，稀有物品 |
| 陷阱 | 探索时5%概率 | 损失HP或星币 |

**事件处理**：

```typescript
interface RandomEvent {
  id: string;
  name: string;
  probability: number;            // 触发概率
  effect: () => void;             // 事件效果
}

// 示例：幸运宝箱
{
  id: 'lucky_chest',
  name: '幸运宝箱',
  probability: 0.1,
  effect: () => {
    const reward = randomReward();
    showMessage(`你发现了一个宝箱！获得了 ${reward.name}`);
    player.addItem(reward);
  }
}
```

### 6.5 战斗遭遇

**敌人类型**：

| 敌人 | 难度 | 特殊规则 | 奖励 |
|------|------|----------|------|
| 新手机器人 | ⭐ | 标准规则 | 50星币 |
| 老练赌徒 | ⭐⭐ | 庄家17点停牌 | 200星币 + 技能卡 |
| 海盗头目 | ⭐⭐⭐ | 可以看玩家第一张牌 | 500星币 + 稀有技能卡 |
| BOSS：赌场之王 | ⭐⭐⭐⭐⭐ | 多重技能 | 传说技能卡 + 大量星币 |

**战斗流程**：
1. 遭遇敌人 → 显示敌人信息
2. 选择：战斗 / 逃跑（消耗星币）
3. 战斗 → 标准21点规则
4. 胜利 → 获得奖励
5. 失败 → 损失下注金额，可选择重试

### 6.6 资源收集

**可收集资源**：

| 资源名称 | 获取方式 | 用途 |
|----------|----------|------|
| 矿石 | 探索宝箱 | 出售换钱 |
| 能量核心 | 击败敌人 | 升级技能卡 |
| 通行证 | 任务奖励 | 解锁新场景 |
| 图纸 | 稀有宝箱 | 制作特殊物品 |

**背包扩展**（第三版）：

```typescript
interface Inventory {
  skillCards: SkillCard[];        // 技能卡
  resources: Resource[];          // 资源物品
  maxSkillSlots: number;
  maxResourceSlots: number;
}

interface Resource {
  id: string;
  name: string;
  count: number;
  type: 'ore' | 'core' | 'pass' | 'blueprint';
}
```

### 6.7 第三版实现重点

✅ **必须实现**：
1. 至少2个探索场景（废弃空间站 + 深空矿区）
2. 房间探索系统（迷雾 + 移动）
3. 3种NPC类型（商人、赌徒、任务发布者）
4. 简单的任务系统（至少3个任务）
5. 2种随机事件（宝箱、强制对决）
6. 3种敌人（不同难度）

**实现优先级**：
1. 场景地图和房间系统
2. NPC对话和交互
3. 任务系统
4. 随机事件
5. 战斗遭遇

---

## 📅 版本规划总结

| 版本 | 核心功能 | 状态 |
|------|----------|------|
| **v1.0** | 21点对战 + 输赢系统 | ✅ 已完成 |
| **v2.0** | 技能卡系统 + 背包查看 | 🔄 开发中 |
| **v3.0** | RPG探索 + NPC + 任务 | 📋 规划中 |

**开发建议**：
- 先完成v2.0的技能卡系统
- 确保技能卡在战斗中正常工作
- 再开始v3.0的探索系统开发

---

**文档版本**：v2.0 - 技能卡系统 + v3.0规划
**更新日期**：2026-03-14
**当前重点**：技能卡系统实现
**下一步**：RPG探索系统
