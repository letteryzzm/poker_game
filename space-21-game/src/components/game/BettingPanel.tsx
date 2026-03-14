import { useState } from 'react';
import { usePlayerStore } from '@/store/playerStore';
import { useGameStore } from '@/store/gameStore';

export function BettingPanel() {
  const { player } = usePlayerStore();
  const { initDeck, shuffleDeck, placeBet, dealCards } = useGameStore();
  const [selectedBet, setSelectedBet] = useState(100);

  const betOptions = [50, 100, 200, 500];

  const handleDeal = () => {
    if (player.money < selectedBet) {
      alert('星币不足！');
      return;
    }
    initDeck();
    shuffleDeck();
    placeBet(selectedBet);
    dealCards();
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-3">
        {betOptions.map(bet => (
          <button
            key={bet}
            onClick={() => setSelectedBet(bet)}
            disabled={player.money < bet}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedBet === bet
                ? 'bg-[#FFC107] text-[#1A1A2E]'
                : player.money >= bet
                ? 'bg-[#2C3E50] text-white hover:bg-[#34495E]'
                : 'bg-[#1A1A2E] text-gray-600 cursor-not-allowed'
            }`}
          >
            {bet} ⭐
          </button>
        ))}
      </div>
      <button
        onClick={handleDeal}
        className="px-6 py-3 bg-[#4A90E2] text-white rounded-lg font-semibold text-lg shadow-[0_0_12px_rgba(74,144,226,0.5)] hover:bg-[#357ABD]"
      >
        发牌
      </button>
    </div>
  );
}
