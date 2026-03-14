# 游戏动画规格

## 卡牌动画

### 发牌动画

**效果**：卡牌从牌堆飞向目标位置

**实现**：使用 Framer Motion

```typescript
const dealAnimation = {
  initial: {
    x: -200,
    y: -100,
    opacity: 0,
    rotate: -10
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0
  },
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
    delay: 0.1  // 每张牌延迟0.1s
  }
};
```

### 翻牌动画

**效果**：卡牌翻转显示正面

```typescript
const flipAnimation = {
  animate: {
    rotateY: [0, 180],
    scale: [1, 1.1, 1]
  },
  transition: {
    duration: 0.4,
    ease: 'easeInOut'
  }
};
```

### 堆叠动画

**效果**：卡牌飞向目标堆叠位置并缩小消失

```typescript
const stackAnimation = {
  animate: {
    x: targetX,
    y: targetY,
    scale: 0.5,
    opacity: 0
  },
  transition: {
    duration: 0.3,
    ease: 'easeInOut'
  }
};
```

## UI动画

### 胜利动画

**效果**：卡牌放大并旋转

```typescript
const winAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0]
  },
  transition: {
    duration: 0.5,
    repeat: 2
  }
};
```

### 按钮悬停

```typescript
const buttonHover = {
  whileHover: {
    scale: 1.05,
    boxShadow: '0 0 20px rgba(74, 144, 226, 0.5)'
  },
  whileTap: {
    scale: 0.95
  }
};
```

### 奖励弹窗

```typescript
const modalAnimation = {
  initial: {
    scale: 0,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 0,
    opacity: 0
  },
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 30
  }
};
```

## 性能优化

- 使用 `will-change` CSS属性
- 限制同时播放的动画数量
- 使用 `transform` 和 `opacity` 而非 `left/top`
- 动画完成后移除元素
