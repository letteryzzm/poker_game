# 游戏核心逻辑规格

## 21点逻辑模块

### blackjackLogic.ts

**职责**：21点核心算法实现

**发牌规则**：
- 玩家：2张明牌
- 庄家：1张明牌 + 1张暗牌（hidden: true）
- 庄家回合时翻开暗牌

#### calculateScore 函数

```typescript
/**
 * 计算手牌分数（处理Ace自动转换）
 * @param hand 手牌数组
 * @returns 最终分数
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
```

**测试用例**：
- 普通牌：[5, 6, 9] = 20
- 单个Ace：[11, 9] = 20（Ace转为1）
- 多个Ace：[11, 11, 9] = 21（一个Ace转为1）
- 全Ace：[11, 11, 11] = 13（两个Ace转为1）

#### isBlackjack 函数

```typescript
/**
 * 判断是否为天然21点
 * @param hand 手牌数组
 * @returns 是否为Blackjack
 */
export function isBlackjack(hand: PlayingCard[]): boolean {
  if (hand.length !== 2) return false;
  const score = calculateScore(hand);
  return score === 21;
}
```

#### isFiveCardCharlie 函数

```typescript
/**
 * 判断是否为五张牌不爆
 * @param hand 手牌数组
 * @returns 是否为Five Card Charlie
 */
export function isFiveCardCharlie(hand: PlayingCard[]): boolean {
  return hand.length === 5 && calculateScore(hand) < 21;
}
```

#### determineResult 函数

```typescript
/**
 * 判定游戏结果
 * @param playerHand 玩家手牌
 * @param dealerHand 庄家手牌
 * @returns 游戏结果
 */
export function determineResult(
  playerHand: PlayingCard[],
  dealerHand: PlayingCard[]
): GameResult {
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  // 玩家爆牌
  if (playerScore > 21) return 'lose';

  // Five Card Charlie
  if (isFiveCardCharlie(playerHand)) return 'charlie';

  // Blackjack
  if (isBlackjack(playerHand) && !isBlackjack(dealerHand)) {
    return 'blackjack';
  }

  // 庄家爆牌
  if (dealerScore > 21) return 'win';

  // 比较点数
  if (playerScore > dealerScore) return 'win';
  if (playerScore < dealerScore) return 'lose';
  return 'push';
}
```

#### dealerShouldHit 函数

```typescript
/**
 * 判断庄家是否应该继续抽牌
 * @param dealerHand 庄家手牌
 * @param playerScore 玩家分数
 * @returns 是否应该抽牌
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

## 奖励系统模块

### rewardSystem.ts

**职责**：计算和发放奖励

#### calculateReward 函数

```typescript
/**
 * 计算奖励
 * @param result 游戏结果
 * @param bet 下注金额
 * @param sceneId 场景ID
 * @returns 奖励（星币+资源卡）
 */
export function calculateReward(
  result: GameResult,
  bet: number,
  sceneId: string
): Reward {
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
```

**奖励配置表**：

```typescript
const REWARD_TABLE: Record<GameResult, RewardConfig> = {
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
```

## 背包管理模块

### inventoryManager.ts

**职责**：背包操作逻辑

#### addCardToInventory 函数

```typescript
/**
 * 添加卡牌到背包（自动堆叠）
 * @param inventory 背包
 * @param card 卡牌
 * @param count 数量
 * @returns 更新后的背包
 */
export function addCardToInventory(
  inventory: Inventory,
  card: ResourceCard,
  count: number = 1
): Inventory {
  // 检查负重
  if (!canAddCard(inventory, card, count)) {
    throw new Error('超过最大负重');
  }

  const newInventory = { ...inventory };

  // 查找同名卡牌
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
```

#### calculateTotalWeight 函数

```typescript
/**
 * 计算总重量
 * @param deck 卡组
 * @returns 总重量
 */
export function calculateTotalWeight(deck: CardStack[]): number {
  return deck.reduce((total, stack) => {
    return total + (stack.card.weight * stack.count);
  }, 0);
}
```

#### canAddCard 函数

```typescript
/**
 * 检查是否可以添加卡牌
 * @param inventory 背包
 * @param card 卡牌
 * @param count 数量
 * @returns 是否可以添加
 */
export function canAddCard(
  inventory: Inventory,
  card: ResourceCard,
  count: number = 1
): boolean {
  const additionalWeight = card.weight * count;
  return (inventory.currentWeight + additionalWeight) <= inventory.maxWeight;
}
```

## 牌堆管理模块

### deckManager.ts

**职责**：扑克牌堆管理

#### initDeck 函数

```typescript
/**
 * 初始化52张牌
 * @returns 牌堆
 */
export function initDeck(): PlayingCard[] {
  const suits: Array<'c' | 'h' | 's' | 'd'> = ['c', 'h', 's', 'd'];
  const deck: PlayingCard[] = [];

  suits.forEach(suit => {
    for (let i = 1; i <= 13; i++) {
      deck.push({
        value: i === 1 ? 11 : Math.min(i, 10),
        suit,
        face: `${suit}${i}`
      });
    }
  });

  return deck;
}
```

#### shuffleDeck 函数

```typescript
/**
 * 洗牌（Fisher-Yates算法）
 * @param deck 牌堆
 * @returns 洗牌后的牌堆
 */
export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
```

## 数据加载模块

### dataLoader.ts

**职责**：加载游戏数据

```typescript
/**
 * 加载资源卡数据
 */
export async function loadResourceCards(): Promise<Record<string, ResourceCard>> {
  const response = await fetch('/data/cards.json');
  return response.json();
}

/**
 * 加载场景数据
 */
export async function loadScenes(): Promise<Record<string, Scene>> {
  const response = await fetch('/data/scenes.json');
  return response.json();
}

/**
 * 加载NPC数据
 */
export async function loadNPCs(): Promise<Record<string, NPC>> {
  const response = await fetch('/data/npcs.json');
  return response.json();
}
```

## 破产保护机制

### bankruptcyProtection.ts

**职责**：防止玩家破产无法继续游戏

#### canClaimDailyReward 函数

```typescript
/**
 * 检查是否可以领取每日救济金
 * @param lastClaimTime 上次领取时间戳
 * @returns 是否可以领取
 */
export function canClaimDailyReward(lastClaimTime: number): boolean {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  return (now - lastClaimTime) >= oneDayMs;
}
```

#### claimDailyReward 函数

```typescript
/**
 * 领取每日救济金
 * @param player 玩家对象
 * @returns 更新后的玩家对象
 */
export function claimDailyReward(player: Player): Player {
  const DAILY_REWARD = 100; // 每日救济金金额
  
  return {
    ...player,
    money: player.money + DAILY_REWARD,
    lastDailyReward: Date.now()
  };
}
```

#### shouldShowBankruptcyHelp 函数

```typescript
/**
 * 判断是否显示破产帮助提示
 * @param player 玩家对象
 * @param minBet 当前场景最低下注
 * @returns 是否显示提示
 */
export function shouldShowBankruptcyHelp(
  player: Player,
  minBet: number
): boolean {
  return player.money < minBet;
}
```

**破产保护规则**：
- 每日救济金：100星币
- 冷却时间：24小时
- 触发条件：玩家星币 < 当前场景最低下注
