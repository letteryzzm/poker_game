import type { Inventory, ResourceCard, CardStack } from '@/types';

/**
 * 添加卡牌到背包（自动堆叠）
 */
export function addCardToInventory(
  inventory: Inventory,
  card: ResourceCard,
  count: number = 1
): Inventory {
  const newHandDeck = [...inventory.handDeck];

  // 查找已存在的堆叠
  const existingIndex = newHandDeck.findIndex(stack => stack.card.id === card.id);

  if (existingIndex !== -1) {
    // 更新现有堆叠
    const existing = newHandDeck[existingIndex];
    const newCount = Math.min(existing.count + count, card.maxStack);
    newHandDeck[existingIndex] = { ...existing, count: newCount };
  } else {
    // 创建新堆叠
    newHandDeck.push({
      card,
      count: Math.min(count, card.maxStack),
      position: newHandDeck.length
    });
  }

  return {
    ...inventory,
    handDeck: newHandDeck,
    currentWeight: calculateTotalWeight(newHandDeck)
  };
}

/**
 * 从背包移除卡牌
 */
export function removeCardFromInventory(
  inventory: Inventory,
  cardId: string,
  count: number = 1
): Inventory {
  const newHandDeck = inventory.handDeck
    .map(stack => {
      if (stack.card.id === cardId) {
        const newCount = stack.count - count;
        return newCount > 0 ? { ...stack, count: newCount } : null;
      }
      return stack;
    })
    .filter((stack): stack is CardStack => stack !== null);

  return {
    ...inventory,
    handDeck: newHandDeck,
    currentWeight: calculateTotalWeight(newHandDeck)
  };
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
  if (stackIndex < 0 || stackIndex >= inventory.handDeck.length) {
    return inventory;
  }

  const stack = inventory.handDeck[stackIndex];
  if (stack.count <= splitCount) {
    return inventory;
  }

  const newHandDeck = [...inventory.handDeck];

  // 减少原堆叠数量
  newHandDeck[stackIndex] = { ...stack, count: stack.count - splitCount };

  // 创建新堆叠
  newHandDeck.push({
    card: stack.card,
    count: splitCount,
    position: newHandDeck.length
  });

  return {
    ...inventory,
    handDeck: newHandDeck
  };
}
