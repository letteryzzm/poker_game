# 游戏组件规格

## 21点游戏组件

### BlackjackTable 组件

**职责**：21点游戏桌主容器

**Props**：
```typescript
interface BlackjackTableProps {
  sceneId: string;  // 当前场景ID
}
```

**状态**：使用 `useGameStore` 获取游戏状态

**子组件**：
- DealerHand（庄家手牌）
- PlayerHand（玩家手牌）
- GameControls（游戏控制按钮）
- BettingPanel（下注面板）

### PlayingCard 组件

**职责**：单张扑克牌渲染

**Props**：
```typescript
interface PlayingCardProps {
  card: PlayingCard;
  hidden?: boolean;  // 是否隐藏（牌背）
}
```

**样式**：
- 尺寸：250px × 360px
- 圆角：10px
- 动画：发牌、翻牌

### GameControls 组件

**职责**：游戏操作按钮

**按钮**：
- Deal（发牌）- status === 'idle'
- Hit（要牌）- status === 'playing'
- Stand（停牌）- status === 'playing'
- Double（加倍）- status === 'playing' && playerHand.length === 2
- Split（分牌）- status === 'playing' && 可分牌

**状态控制**：根据游戏状态禁用/启用按钮

## 资源卡组件

### ResourceCard 组件

**职责**：资源卡渲染

**Props**：
```typescript
interface ResourceCardProps {
  card: ResourceCard;
  count: number;
  onDragStart?: (e: React.MouseEvent) => void;
  onClick?: () => void;
}
```

**显示元素**：
- 卡牌图片
- 卡牌名称
- 堆叠数量（count > 1时）
- 重量标识
- 稀有度边框

### Deck 组件

**职责**：卡组容器

**Props**：
```typescript
interface DeckProps {
  deckId: string;
  cards: CardStack[];
  maxWeight: number;
  onCardDrop?: (card: ResourceCard) => void;
}
```

**功能**：
- 显示所有卡牌
- 接收拖拽放置
- 显示负重条

## 场景组件

### SceneView 组件

**职责**：场景展示

**Props**：
```typescript
interface SceneViewProps {
  sceneId: string;
}
```

**显示元素**：
- 场景背景图
- NPC卡片列表
- 场景切换按钮

### NPCCard 组件

**职责**：NPC卡片

**Props**：
```typescript
interface NPCCardProps {
  npc: NPC;
  onClick: () => void;
}
```

**交互**：点击触发对话

## UI组件

### DialogueBox 组件

**职责**：对话框

**Props**：
```typescript
interface DialogueBoxProps {
  dialogue: Dialogue;
  onChoice: (choiceId: string) => void;
  onClose: () => void;
}
```

### RewardModal 组件

**职责**：奖励弹窗

**Props**：
```typescript
interface RewardModalProps {
  result: GameResult;
  money: number;
  cards: ResourceCard[];
  onClose: () => void;
}
```

**动画**：
- 星币飞入动画
- 卡牌翻转动画
