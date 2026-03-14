# 背包资源卡牌系统设计文档

> Space 21 - 背包与资源管理系统完整设计

---

## 📊 一、数据结构设计

### 1.1 核心类型定义

```typescript
// 资源卡基础定义
interface ResourceCard {
  id: string;              // 唯一ID（如 "iron_ore"）
  name: string;            // 显示名称
  nameZh: string;          // 中文名称
  description: string;     // 卡牌描述
  type: CardType;          // 卡牌类型
  rarity: Rarity;          // 稀有度
  weight: number;          // 单张重量（kg）
  price: number;           // 基础价格（星币）
  maxStack: number;        // 最大堆叠数
  icon: string;            // 图标路径
  effects?: CardEffect[];  // 特殊效果
}

// 卡牌类型
enum CardType {
  ORE = 'ore',           // 矿石
  FOOD = 'food',         // 食物
  EQUIPMENT = 'equipment', // 装备
  SPECIAL = 'special'    // 特殊道具
}

// 稀有度
enum Rarity {
  COMMON = 'common',     // 普通（灰色）
  RARE = 'rare',         // 稀有（蓝色）
  EPIC = 'epic',         // 史诗（紫色）
  LEGENDARY = 'legendary' // 传说（金色）
}

// 卡牌效果
interface CardEffect {
  type: 'heal' | 'buff' | 'unlock' | 'currency';
  value: number;
  description: string;
}

// 卡牌堆叠
interface CardStack {
  card: ResourceCard;    // 卡牌引用
  count: number;         // 当前数量
  slot: number;          // 槽位索引
  isLocked: boolean;     // 是否锁定（防止误操作）
}

// 背包/卡组
interface Deck {
  id: string;            // 卡组ID
  name: string;          // 卡组名称
  type: DeckType;        // 卡组类型
  stacks: CardStack[];   // 卡牌堆叠数组
  maxWeight: number;     // 最大负重
  maxSlots: number;      // 最大槽位数
}

enum DeckType {
  HAND = 'hand',         // 手牌卡组（随身）
  STORAGE = 'storage'    // 仓库卡组
}
```

### 1.2 背包状态管理

```typescript
interface InventoryState {
  // 卡组
  handDeck: Deck;        // 手牌卡组
  storageDeck: Deck;     // 仓库卡组

  // 统计信息
  totalWeight: number;   // 总重量
  totalValue: number;    // 总价值

  // UI状态
  selectedStack: CardStack | null;  // 当前选中的堆叠
  isDragging: boolean;              // 是否正在拖拽
  draggedStack: CardStack | null;   // 被拖拽的堆叠

  // 过滤和排序
  filter: CardFilter;
  sortBy: SortOption;
}

interface CardFilter {
  type?: CardType;       // 按类型过滤
  rarity?: Rarity;       // 按稀有度过滤
  searchText?: string;   // 搜索文本
}

enum SortOption {
  NAME = 'name',         // 按名称
  RARITY = 'rarity',     // 按稀有度
  WEIGHT = 'weight',     // 按重量
  PRICE = 'price',       // 按价格
  COUNT = 'count'        // 按数量
}
```

---

## 🎨 二、UI布局设计

### 2.1 整体布局

```
┌─────────────────────────────────────────────────────┐
│  背包界面 (Inventory)                                │
├─────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────┐  ┌───────────────────────────────┐ │
│  │  侧边栏     │  │  主卡牌展示区                  │ │
│  │             │  │                                 │ │
│  │  [手牌卡组] │  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐     │ │
│  │  [仓库]     │  │  │卡1│ │卡2│ │卡3│ │卡4│     │ │
│  │  [商店]     │  │  └───┘ └───┘ └───┘ └───┘     │ │
│  │             │  │                                 │ │
│  │  [过滤器]   │  │  ┌───┐ ┌───┐ ┌───┐ ┌───┐     │ │
│  │  □ 矿石     │  │  │卡5│ │卡6│ │卡7│ │卡8│     │ │
│  │  □ 食物     │  │  └───┘ └───┘ └───┘ └───┘     │ │
│  │  □ 装备     │  │                                 │ │
│  │  □ 特殊     │  │  [滚动区域]                    │ │
│  │             │  │                                 │ │
│  │  [排序]     │  └───────────────────────────────┘ │
│  │  ▼ 稀有度   │                                     │
│  │             │  ┌───────────────────────────────┐ │
│  └─────────────┘  │  底部信息栏                    │ │
│                    │  负重: 45/100kg  价值: 2340💰 │ │
│                    └───────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### 2.2 卡牌展示样式

```
┌─────────────┐
│  [稀有度边框] │  ← 根据稀有度显示不同颜色边框
│             │
│   [图标]    │  ← 卡牌图标（128x128）
│             │
│  铁矿 x10   │  ← 名称 + 数量
│  5kg | 50💰 │  ← 重量 | 价格
│             │
│  [🔒]       │  ← 锁定图标（可选）
└─────────────┘
```

### 2.3 卡牌详情面板（悬停/点击显示）

```
┌──────────────────────────┐
│  铁矿 (Iron Ore)          │
│  ━━━━━━━━━━━━━━━━━━━━━  │
│                           │
│  [大图标]                 │
│                           │
│  类型: 矿石               │
│  稀有度: 普通 ⬜          │
│  重量: 5kg                │
│  价格: 50💰               │
│  堆叠: 10/999             │
│                           │
│  描述:                    │
│  基础矿石材料，可用于     │
│  升级装备或出售换钱。     │
│                           │
│  ┌────────┐  ┌─────────┐ │
│  │ 使用   │  │ 出售    │ │
│  └────────┘  └─────────┘ │
└──────────────────────────┘
```

---

## 🖱️ 三、交互设计

### 3.1 基础交互

| 操作 | 触发方式 | 效果 |
|------|----------|------|
| **查看详情** | 鼠标悬停 | 显示卡牌详情面板 |
| **选中卡牌** | 单击 | 高亮选中，显示操作按钮 |
| **快速使用** | 双击 | 直接使用卡牌（食物/装备） |
| **拖拽移动** | 按住拖动 | 移动到其他卡组或槽位 |
| **锁定/解锁** | 右键 | 防止误操作 |
| **批量选择** | Shift+点击 | 选择多张卡牌 |

### 3.2 拖拽系统详细设计

```typescript
// 拖拽状态机
enum DragState {
  IDLE = 'idle',           // 空闲
  DRAGGING = 'dragging',   // 拖拽中
  HOVERING = 'hovering',   // 悬停在目标上
  DROPPING = 'dropping'    // 放下中
}

// 拖拽逻辑
interface DragLogic {
  // 1. 开始拖拽
  onDragStart(stack: CardStack, event: MouseEvent): void {
    // - 记录起始位置
    // - 创建拖拽预览（半透明卡牌跟随鼠标）
    // - 高亮可放置区域
  }

  // 2. 拖拽中
  onDragMove(event: MouseEvent): void {
    // - 更新预览位置
    // - 检测目标区域（手牌/仓库/商店）
    // - 显示放置提示
  }

  // 3. 放下
  onDragEnd(targetDeck: Deck, event: MouseEvent): void {
    // - 验证是否可放置
    // - 执行移动/合并操作
    // - 播放动画
    // - 更新状态
  }
}
```

### 3.3 堆叠分离交互

```typescript
// 分离堆叠的三种方式

// 方式1: 拖拽时按住Shift - 分离1张
onDragStart(stack, event) {
  if (event.shiftKey) {
    splitCount = 1;
  }
}

// 方式2: 右键菜单 - 自定义数量
onContextMenu(stack) {
  showSplitDialog({
    max: stack.count,
    onConfirm: (count) => splitStack(stack, count)
  });
}

// 方式3: 拖拽到空槽位 - 弹出对话框
onDropToEmptySlot(stack) {
  if (stack.count > 1) {
    showSplitDialog({
      max: stack.count,
      onConfirm: (count) => moveStack(stack, count)
    });
  }
}
```

---

## ⚙️ 四、核心功能实现

### 4.1 添加卡牌到背包

```typescript
function addCardToInventory(
  deck: Deck,
  card: ResourceCard,
  count: number = 1
): Result<Deck, InventoryError> {
  // 1. 检查负重
  const newWeight = calculateWeight(deck) + card.weight * count;
  if (newWeight > deck.maxWeight) {
    return Err({ type: 'OVERWEIGHT', message: '超过负重限制' });
  }

  // 2. 查找是否已有同名卡牌
  const existingStack = deck.stacks.find(s => s.card.id === card.id);

  if (existingStack) {
    // 3a. 堆叠到现有卡牌
    const newCount = existingStack.count + count;
    if (newCount > card.maxStack) {
      return Err({ type: 'MAX_STACK', message: '超过最大堆叠数' });
    }

    return Ok({
      ...deck,
      stacks: deck.stacks.map(s =>
        s.card.id === card.id
          ? { ...s, count: newCount }
          : s
      )
    });
  } else {
    // 3b. 创建新堆叠
    if (deck.stacks.length >= deck.maxSlots) {
      return Err({ type: 'NO_SLOTS', message: '背包已满' });
    }

    const newStack: CardStack = {
      card,
      count,
      slot: findEmptySlot(deck),
      isLocked: false
    };

    return Ok({
      ...deck,
      stacks: [...deck.stacks, newStack]
    });
  }
}
```
