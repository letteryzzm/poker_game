import { useGameStore } from '@/store/gameStore';
import { usePlayerStore } from '@/store/playerStore';
import { BettingPanel } from './BettingPanel';

export function GameControls() {
  const { status, hit, stand, resetGame, currentBet, playerHand } = useGameStore();
  const { updateMoney } = usePlayerStore();

  const handleDoubleDown = () => {
    if (playerHand.length !== 2) return;
    updateMoney(-currentBet);
    hit();
    if (useGameStore.getState().status === 'playing') {
      stand();
    }
  };

  if (status === 'idle') {
    return <BettingPanel />;
  }

  if (status === 'playing') {
    const canDouble = playerHand.length === 2;

    return (
      <div className="flex gap-4 justify-center">
        <button
          onClick={hit}
          className="px-4 py-3 h-[50px] w-[120px] bg-[#4A90E2] text-white rounded-lg font-semibold text-base shadow-[0_0_12px_rgba(74,144,226,0.5)]"
        >
          要牌
        </button>
        <button
          onClick={stand}
          className="px-4 py-3 h-[50px] w-[120px] bg-[#FF9800] text-white rounded-lg font-semibold text-base shadow-[0_0_12px_rgba(255,152,0,0.5)]"
        >
          停牌
        </button>
        <button
          onClick={handleDoubleDown}
          disabled={!canDouble}
          className={`px-4 py-3 h-[50px] w-[120px] rounded-lg font-semibold text-base ${
            canDouble
              ? 'bg-[#FFC107] text-[#1A1A2E] shadow-[0_0_12px_rgba(255,179,0,0.5)]'
              : 'bg-[#2C3E50] text-gray-400 cursor-not-allowed'
          }`}
        >
          加倍
        </button>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <button
        onClick={resetGame}
        className="px-4 py-3 h-[50px] w-[120px] bg-[#4A90E2] text-white rounded-lg font-semibold text-base shadow-[0_0_12px_rgba(74,144,226,0.5)]"
      >
        再来一局
      </button>
    );
  }

  return null;
}
