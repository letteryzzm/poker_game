# 实现21点游戏核心逻辑

## Goal
在 `space-21-game/src/utils/blackjackLogic.ts` 中实现21点游戏的核心逻辑函数。

## Requirements

### 核心函数
1. **calculateScore** - 计算手牌总分，处理 Ace 自动转换
2. **isBlackjack** - 判断是否为天然21点
3. **isFiveCardCharlie** - 判断是否为五张牌不爆
4. **determineResult** - 判定游戏结果
5. **dealerShouldHit** - 庄家是否继续抽牌

### 技术要求
- 使用 TypeScript 严格类型
- 添加必要注释
- 创建单元测试（Vitest）

## Acceptance Criteria
- [ ] 所有5个函数实现完成
- [ ] TypeScript 类型检查通过
- [ ] 单元测试覆盖所有函数
- [ ] 测试通过率 100%

## Technical Notes
- 参考 plan.md 第 406-483 行的逻辑实现
- Ace 值为 11，爆牌时自动转换为 1
- Five Card Charlie：5张牌且不爆牌
