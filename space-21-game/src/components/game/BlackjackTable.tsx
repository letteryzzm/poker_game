import { useGameStore } from '@/store/gameStore';
import { PlayingCard } from './PlayingCard';
import { GameControls } from './GameControls';

export function BlackjackTable() {
  const { playerHand, dealerHand, playerScore, dealerScore, result, status } = useGameStore();

  const resultText = {
    win: '你赢了！🎉',
    lose: '你输了 😢',
    push: '平局',
    blackjack: 'Blackjack! 🎊',
    charlie: 'Five Card Charlie! 🌟'
  };

  return (
    <div className="h-full bg-[#1B5E20] rounded-lg p-8 flex flex-col gap-5">
      {/* 庄家区域 */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-white text-lg font-semibold">庄家</span>
          {status !== 'idle' && <span className="text-white text-2xl font-bold">{dealerScore} 点</span>}
        </div>
        <div className="flex gap-5 justify-center h-40">
          {dealerHand.map((card, i) => (
            <PlayingCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* 下注显示 */}
      <div className="flex justify-center items-center gap-2">
        <div className="w-[60px] h-5 bg-[#FFC107] rounded-full" />
        <span className="text-[#FFC107] text-xl font-bold font-mono">下注: 100 ⭐</span>
      </div>

      {/* 玩家区域 */}
      <div className="flex-1 flex flex-col justify-end gap-3">
        <div className="flex items-center gap-3">
          <span className="text-white text-lg font-semibold">你</span>
          {status !== 'idle' && <span className="text-white text-[32px] font-bold">{playerScore} 点</span>}
        </div>
        <div className="flex gap-5 justify-center h-40 mb-6">
          {playerHand.map((card, i) => (
            <PlayingCard key={i} card={card} index={i} />
          ))}
        </div>

        {/* 结果显示 */}
        {result && (
          <div className="text-center mb-4 text-2xl font-bold text-white">
            {resultText[result]}
          </div>
        )}

        {/* 控制按钮 */}
        <div className="flex justify-center">
          <GameControls />
        </div>
      </div>
    </div>
  );
}
