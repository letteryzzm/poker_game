import type { PlayingCard } from '@/types';

/**
 * 初始化52张牌
 */
export function initDeck(): PlayingCard[] {
  const suits: Array<'c' | 'h' | 's' | 'd'> = ['c', 'h', 's', 'd'];
  const deck: PlayingCard[] = [];

  suits.forEach(suit => {
    for (let i = 1; i <= 13; i++) {
      deck.push({
        value: i === 1 ? 11 : Math.min(i, 10),
        suit,
        face: `${suit}${i}`,
        hidden: false
      });
    }
  });

  return deck;
}

/**
 * 洗牌（Fisher-Yates算法）
 */
export function shuffleDeck(deck: PlayingCard[]): PlayingCard[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
