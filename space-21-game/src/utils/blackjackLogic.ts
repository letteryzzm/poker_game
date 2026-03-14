import type { PlayingCard, GameState } from '@/types';

/**
 * 计算手牌总分（处理Ace自动转换）
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

/**
 * 检查是否为Blackjack（天然21点）
 */
export function isBlackjack(hand: PlayingCard[]): boolean {
  if (hand.length !== 2) return false;
  const score = calculateScore(hand);
  return score === 21;
}

/**
 * 检查是否为Five Card Charlie
 */
export function isFiveCardCharlie(hand: PlayingCard[]): boolean {
  return hand.length === 5 && calculateScore(hand) <= 21;
}

/**
 * 判定游戏结果
 */
export function determineResult(
  playerHand: PlayingCard[],
  dealerHand: PlayingCard[]
): GameState['result'] {
  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  // 玩家爆牌
  if (playerScore > 21) return 'lose';

  // Five Card Charlie
  if (isFiveCardCharlie(playerHand)) return 'charlie';

  // Blackjack
  if (isBlackjack(playerHand) && !isBlackjack(dealerHand)) return 'blackjack';

  // 庄家爆牌
  if (dealerScore > 21) return 'win';

  // 比较点数
  if (playerScore > dealerScore) return 'win';
  if (playerScore < dealerScore) return 'lose';
  return 'push';
}

/**
 * 庄家自动抽牌逻辑
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
