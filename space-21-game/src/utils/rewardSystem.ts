import type { GameState, ResourceCard } from '@/types';

export interface Reward {
  money: number;
  cards: ResourceCard[];
}

interface RewardConfig {
  moneyMultiplier: number;
  cardCount: number;
  cardRarity: Array<'common' | 'rare' | 'epic' | 'legendary'>;
}

const REWARD_TABLE: Record<NonNullable<GameState['result']>, RewardConfig> = {
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

/**
 * 计算奖励
 */
export function calculateReward(
  result: NonNullable<GameState['result']>,
  bet: number,
  cardPool: ResourceCard[]
): Reward {
  const config = REWARD_TABLE[result];
  const money = bet * config.moneyMultiplier;

  const cards = generateRewardCards(cardPool, config.cardCount, config.cardRarity);

  return { money, cards };
}

/**
 * 根据稀有度生成奖励卡牌
 */
function generateRewardCards(
  cardPool: ResourceCard[],
  count: number,
  rarities: Array<'common' | 'rare' | 'epic' | 'legendary'>
): ResourceCard[] {
  if (count === 0 || rarities.length === 0) return [];

  const filteredCards = cardPool.filter(card => rarities.includes(card.rarity));
  if (filteredCards.length === 0) return [];

  const result: ResourceCard[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    result.push(filteredCards[randomIndex]);
  }

  return result;
}
