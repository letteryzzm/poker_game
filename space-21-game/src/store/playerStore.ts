import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Player, Inventory, ResourceCard, CardStack } from '@/types';

interface PlayerStore {
  player: Player;
  inventory: Inventory;
  updateMoney: (amount: number) => void;
  setScene: (sceneId: string) => void;
  addCard: (card: ResourceCard, count?: number) => void;
  claimDailyReward: () => boolean;
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      player: {
        name: '玩家',
        money: 1000,
        level: 1,
        exp: 0,
        hp: 100,
        maxHp: 100,
        shield: 50,
        maxShield: 50,
        currentScene: 'tutorial_zone',
        lastDailyReward: 0
      },
      inventory: {
        handDeck: [],
        warehouse: [],
        maxWeight: 100,
        currentWeight: 0
      },
      updateMoney: (amount) => set((state) => ({
        player: { ...state.player, money: Math.max(0, state.player.money + amount) }
      })),
      setScene: (sceneId) => set((state) => ({
        player: { ...state.player, currentScene: sceneId }
      })),
      addCard: (card, count = 1) => set((state) => {
        const additionalWeight = card.weight * count;
        if (state.inventory.currentWeight + additionalWeight > state.inventory.maxWeight) {
          return state;
        }

        const existingStack = state.inventory.handDeck.find(s => s.card.id === card.id);
        let newHandDeck: CardStack[];

        if (existingStack) {
          newHandDeck = state.inventory.handDeck.map(s =>
            s.card.id === card.id
              ? { ...s, count: Math.min(s.count + count, card.maxStack) }
              : s
          );
        } else {
          newHandDeck = [...state.inventory.handDeck, { card, count, position: state.inventory.handDeck.length }];
        }

        return {
          inventory: {
            ...state.inventory,
            handDeck: newHandDeck,
            currentWeight: state.inventory.currentWeight + additionalWeight
          }
        };
      }),
      claimDailyReward: () => {
        const { player } = get();
        const now = Date.now();
        const oneDayMs = 24 * 60 * 60 * 1000;

        if (now - player.lastDailyReward < oneDayMs) {
          return false;
        }

        set((state) => ({
          player: {
            ...state.player,
            money: state.player.money + 100,
            lastDailyReward: now
          }
        }));
        return true;
      }
    }),
    {
      name: 'player-storage',
      version: 1
    }
  )
);
