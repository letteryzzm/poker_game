# 创建游戏状态管理 Store

## Goal
使用 Zustand 在 `space-21-game/src/store/gameStore.ts` 中实现游戏状态管理。

## Requirements

### 状态字段
- status: 游戏状态
- deck: 牌堆
- playerHand/dealerHand: 手牌
- playerScore/dealerScore: 分数
- currentBet: 下注金额
- result: 游戏结果

### 操作方法
- initDeck/shuffleDeck: 初始化和洗牌
- dealCards: 发牌
- hit/stand: 玩家操作
- placeBet: 下注
- resetGame: 重置

## Acceptance Criteria
- [ ] Zustand store 创建完成
- [ ] 所有状态和方法实现
- [ ] TypeScript 类型完整
- [ ] 集成 blackjackLogic 工具函数

## Technical Notes
- 使用已实现的 blackjackLogic 函数
- 遵循不可变性原则
