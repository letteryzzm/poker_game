import { describe, it, expect } from 'vitest';
import {
  calculateScore,
  isBlackjack,
  isFiveCardCharlie,
  determineResult,
  dealerShouldHit,
} from './blackjackLogic';
import type { PlayingCard } from '@/types';

describe('calculateScore', () => {
  it('计算普通手牌分数', () => {
    const hand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 5, suit: 's', face: 's5' },
    ];
    expect(calculateScore(hand)).toBe(15);
  });

  it('处理单个Ace转换', () => {
    const hand: PlayingCard[] = [
      { value: 11, suit: 'h', face: 'h1' },
      { value: 10, suit: 's', face: 's10' },
      { value: 5, suit: 'd', face: 'd5' },
    ];
    expect(calculateScore(hand)).toBe(16); // 11+10+5=26 -> 1+10+5=16
  });

  it('处理多个Ace转换', () => {
    const hand: PlayingCard[] = [
      { value: 11, suit: 'h', face: 'h1' },
      { value: 11, suit: 's', face: 's1' },
      { value: 10, suit: 'd', face: 'd10' },
    ];
    expect(calculateScore(hand)).toBe(12); // 11+11+10=32 -> 1+1+10=12
  });

  it('空手牌返回0', () => {
    expect(calculateScore([])).toBe(0);
  });

  it('全A手牌', () => {
    const hand: PlayingCard[] = [
      { value: 11, suit: 'h', face: 'h1' },
      { value: 11, suit: 's', face: 's1' },
      { value: 11, suit: 'd', face: 'd1' },
      { value: 11, suit: 'c', face: 'c1' },
    ];
    expect(calculateScore(hand)).toBe(14); // 11+11+11+11=44 -> 1+1+1+11=14
  });

  it('恰好21点', () => {
    const hand: PlayingCard[] = [
      { value: 11, suit: 'h', face: 'h1' },
      { value: 10, suit: 's', face: 's10' },
    ];
    expect(calculateScore(hand)).toBe(21);
  });
});

describe('isBlackjack', () => {
  it('识别天然21点', () => {
    const hand: PlayingCard[] = [
      { value: 11, suit: 'h', face: 'h1' },
      { value: 10, suit: 's', face: 's10' },
    ];
    expect(isBlackjack(hand)).toBe(true);
  });

  it('非两张牌不是Blackjack', () => {
    const hand: PlayingCard[] = [
      { value: 7, suit: 'h', face: 'h7' },
      { value: 7, suit: 's', face: 's7' },
      { value: 7, suit: 'd', face: 'd7' },
    ];
    expect(isBlackjack(hand)).toBe(false);
  });

  it('两张牌但不是21点', () => {
    const hand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 9, suit: 's', face: 's9' },
    ];
    expect(isBlackjack(hand)).toBe(false);
  });

  it('空手牌不是Blackjack', () => {
    expect(isBlackjack([])).toBe(false);
  });

  it('单张牌不是Blackjack', () => {
    const hand: PlayingCard[] = [
      { value: 11, suit: 'h', face: 'h1' },
    ];
    expect(isBlackjack(hand)).toBe(false);
  });
});

describe('isFiveCardCharlie', () => {
  it('识别五张牌不爆', () => {
    const hand: PlayingCard[] = [
      { value: 2, suit: 'h', face: 'h2' },
      { value: 3, suit: 's', face: 's3' },
      { value: 4, suit: 'd', face: 'd4' },
      { value: 5, suit: 'c', face: 'c5' },
      { value: 6, suit: 'h', face: 'h6' },
    ];
    expect(isFiveCardCharlie(hand)).toBe(true);
  });

  it('五张牌爆牌不算', () => {
    const hand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 10, suit: 's', face: 's10' },
      { value: 10, suit: 'd', face: 'd10' },
      { value: 10, suit: 'c', face: 'c10' },
      { value: 10, suit: 'h', face: 'h11' },
    ];
    expect(isFiveCardCharlie(hand)).toBe(false);
  });

  it('少于五张牌不算', () => {
    const hand: PlayingCard[] = [
      { value: 2, suit: 'h', face: 'h2' },
      { value: 3, suit: 's', face: 's3' },
      { value: 4, suit: 'd', face: 'd4' },
      { value: 5, suit: 'c', face: 'c5' },
    ];
    expect(isFiveCardCharlie(hand)).toBe(false);
  });

  it('五张牌恰好21点', () => {
    const hand: PlayingCard[] = [
      { value: 2, suit: 'h', face: 'h2' },
      { value: 3, suit: 's', face: 's3' },
      { value: 4, suit: 'd', face: 'd4' },
      { value: 5, suit: 'c', face: 'c5' },
      { value: 7, suit: 'h', face: 'h7' },
    ];
    expect(isFiveCardCharlie(hand)).toBe(true);
  });
});

describe('determineResult', () => {
  it('玩家爆牌', () => {
    const playerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 10, suit: 's', face: 's10' },
      { value: 5, suit: 'd', face: 'd5' },
    ];
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'c', face: 'c10' },
      { value: 7, suit: 'h', face: 'h7' },
    ];
    expect(determineResult(playerHand, dealerHand)).toBe('lose');
  });

  it('玩家Five Card Charlie', () => {
    const playerHand: PlayingCard[] = [
      { value: 2, suit: 'h', face: 'h2' },
      { value: 3, suit: 's', face: 's3' },
      { value: 4, suit: 'd', face: 'd4' },
      { value: 5, suit: 'c', face: 'c5' },
      { value: 6, suit: 'h', face: 'h6' },
    ];
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'c', face: 'c10' },
      { value: 10, suit: 'h', face: 'h10' },
    ];
    expect(determineResult(playerHand, dealerHand)).toBe('charlie');
  });

  it('玩家Blackjack', () => {
    const playerHand: PlayingCard[] = [
      { value: 11, suit: 'h', face: 'h1' },
      { value: 10, suit: 's', face: 's10' },
    ];
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'c', face: 'c10' },
      { value: 10, suit: 'h', face: 'h11' },
    ];
    expect(determineResult(playerHand, dealerHand)).toBe('blackjack');
  });

  it('庄家爆牌玩家获胜', () => {
    const playerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 8, suit: 's', face: 's8' },
    ];
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'c', face: 'c10' },
      { value: 10, suit: 'd', face: 'd10' },
      { value: 5, suit: 'h', face: 'h5' },
    ];
    expect(determineResult(playerHand, dealerHand)).toBe('win');
  });

  it('玩家点数更高获胜', () => {
    const playerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 9, suit: 's', face: 's9' },
    ];
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'c', face: 'c10' },
      { value: 7, suit: 'h', face: 'h7' },
    ];
    expect(determineResult(playerHand, dealerHand)).toBe('win');
  });

  it('庄家点数更高玩家失败', () => {
    const playerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 7, suit: 's', face: 's7' },
    ];
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'c', face: 'c10' },
      { value: 9, suit: 'h', face: 'h9' },
    ];
    expect(determineResult(playerHand, dealerHand)).toBe('lose');
  });

  it('平局', () => {
    const playerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 8, suit: 's', face: 's8' },
    ];
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'c', face: 'c10' },
      { value: 8, suit: 'h', face: 'h8' },
    ];
    expect(determineResult(playerHand, dealerHand)).toBe('push');
  });
});

describe('dealerShouldHit', () => {
  it('庄家小于17必须抽牌', () => {
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 5, suit: 's', face: 's5' },
    ];
    expect(dealerShouldHit(dealerHand, 20)).toBe(true);
  });

  it('庄家17点但小于玩家继续抽牌', () => {
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 7, suit: 's', face: 's7' },
    ];
    expect(dealerShouldHit(dealerHand, 20)).toBe(true);
  });

  it('庄家17点以上且大于玩家停牌', () => {
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 9, suit: 's', face: 's9' },
    ];
    expect(dealerShouldHit(dealerHand, 18)).toBe(false);
  });

  it('庄家21点停牌', () => {
    const dealerHand: PlayingCard[] = [
      { value: 11, suit: 'h', face: 'h1' },
      { value: 10, suit: 's', face: 's10' },
    ];
    expect(dealerShouldHit(dealerHand, 20)).toBe(false);
  });

  it('庄家17点等于玩家停牌', () => {
    const dealerHand: PlayingCard[] = [
      { value: 10, suit: 'h', face: 'h10' },
      { value: 7, suit: 's', face: 's7' },
    ];
    expect(dealerShouldHit(dealerHand, 17)).toBe(false);
  });
});
