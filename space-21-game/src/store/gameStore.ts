import { create } from 'zustand';
import type { PlayingCard, GameState } from '@/types';
import { calculateScore, determineResult } from '@/utils/blackjackLogic';
import { calculateReward } from '@/utils/rewardSystem';
import { usePlayerStore } from './playerStore';
import { useSceneStore } from './sceneStore';

interface GameStore extends GameState {
  initDeck: () => void;
  shuffleDeck: () => void;
  dealCards: () => void;
  hit: () => void;
  stand: () => void;
  placeBet: (amount: number) => void;
  resetGame: () => void;
  playSound?: (sound: string) => void;
  setPlaySound: (fn: (sound: string) => void) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  status: 'idle',
  deck: [],
  playerHand: [],
  dealerHand: [],
  playerScore: 0,
  dealerScore: 0,
  currentBet: 0,
  result: undefined,
  playSound: undefined,

  setPlaySound: (fn) => set({ playSound: fn }),

  initDeck: () => {
    const suits: Array<'c' | 'h' | 's' | 'd'> = ['c', 'h', 's', 'd'];
    const deck: PlayingCard[] = [];

    suits.forEach(suit => {
      for (let i = 1; i <= 13; i++) {
        deck.push({
          value: i === 1 ? 11 : Math.min(i, 10),
          suit,
          face: `${suit}${i}`
        });
      }
    });

    set({ deck, status: 'idle' });
  },

  shuffleDeck: () => {
    const { deck } = get();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    set({ deck: shuffled });
  },

  dealCards: () => {
    const { deck, playSound } = get();
    const newDeck = [...deck];

    const playerHand = [newDeck.pop()!, newDeck.pop()!];
    const dealerHand = [newDeck.pop()!, { ...newDeck.pop()!, hidden: true }];

    playSound?.('cardDeal');

    set({
      deck: newDeck,
      playerHand,
      dealerHand,
      playerScore: calculateScore(playerHand),
      dealerScore: calculateScore([dealerHand[0]]),
      status: 'playing'
    });
  },

  hit: () => {
    const { deck, playerHand, currentBet, playSound } = get();
    const newDeck = [...deck];
    const newHand = [...playerHand, newDeck.pop()!];
    const score = calculateScore(newHand);

    playSound?.('cardDeal');

    if (score > 21) {
      playSound?.('lose');
      usePlayerStore.getState().updateMoney(-currentBet);
      set({
        deck: newDeck,
        playerHand: newHand,
        playerScore: score,
        status: 'finished',
        result: 'lose'
      });
    } else {
      set({
        deck: newDeck,
        playerHand: newHand,
        playerScore: score
      });
    }
  },

  stand: () => {
    const { deck, playerHand, dealerHand, currentBet, playSound } = get();
    const newDeck = [...deck];
    const newDealerHand = dealerHand.map(c => ({
      value: c.value,
      suit: c.suit,
      face: c.face,
      hidden: false
    }));
    let dealerScore = calculateScore(newDealerHand);

    // 庄家抽牌至17点以上
    while (dealerScore < 17) {
      const card = newDeck.pop()!;
      newDealerHand.push({
        value: card.value,
        suit: card.suit,
        face: card.face,
        hidden: false
      });
      dealerScore = calculateScore(newDealerHand);
    }

    const result = determineResult(playerHand, newDealerHand);

    // 播放音效
    if (result === 'win' || result === 'blackjack' || result === 'charlie') {
      playSound?.('win');
    } else if (result === 'lose') {
      playSound?.('lose');
    }

    // 计算奖励
    const cardPool = Object.values(useSceneStore.getState().cards);
    if (result) {
      const reward = calculateReward(result, currentBet, cardPool);
      usePlayerStore.getState().updateMoney(reward.money - currentBet);
      reward.cards.forEach(card => {
        usePlayerStore.getState().addCard(card, 1);
      });
    }

    set({
      deck: newDeck,
      dealerHand: newDealerHand,
      dealerScore,
      status: 'finished',
      result
    });
  },

  placeBet: (amount: number) => {
    set({ currentBet: amount, status: 'betting' });
  },

  resetGame: () => {
    set({
      playerHand: [],
      dealerHand: [],
      playerScore: 0,
      dealerScore: 0,
      currentBet: 0,
      result: undefined,
      status: 'idle'
    });
  }
}));
