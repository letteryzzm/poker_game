import { motion } from 'framer-motion';
import { colors } from '@/styles/theme';
import type { PlayingCard, GameState } from '@/types';
import { PlayingCard as Card } from './PlayingCard';

interface Props {
  dealerCards: PlayingCard[];
  playerCards: PlayingCard[];
  dealerScore: number;
  playerScore: number;
  bet: number;
  status: GameState['status'];
  result?: GameState['result'];
  onHit: () => void;
  onStand: () => void;
  onDouble: () => void;
  onNewGame: () => void;
}

const resultMessages = {
  win: { text: '你赢了！', color: colors.success },
  lose: { text: '你输了', color: colors.danger },
  push: { text: '平局', color: colors.textSecondary },
  blackjack: { text: 'Blackjack！', color: colors.warning },
  charlie: { text: 'Five Card Charlie！', color: colors.warning }
};

export function GameTable({ dealerCards, playerCards, dealerScore, playerScore, bet, status, result, onHit, onStand, onDouble, onNewGame }: Props) {
  const isPlaying = status === 'playing';
  const isFinished = status === 'finished';
  const canDouble = isPlaying && playerCards.length === 2;

  return (
    <div className="w-full h-full rounded-2xl p-8 flex flex-col gap-5" style={{ backgroundColor: 'transparent' }}>
      {/* 庄家区域 */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">庄家</span>
          <span style={{ color: colors.textSecondary }}>点数: {dealerScore}</span>
        </div>
        <div className="flex gap-3">
          {dealerCards.map((card, i) => <Card key={i} card={card} index={i} />)}
        </div>
      </div>

      {/* 下注区域 */}
      <div className="flex justify-center items-center gap-2 py-4">
        <span style={{ color: colors.warning }}>💰</span>
        <span className="text-white font-bold text-xl">当前下注: {bet}</span>
      </div>

      {/* 游戏结果 */}
      {isFinished && result && (
        <div className="flex justify-center">
          <div className="px-8 py-4 rounded-lg" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <span className="text-3xl font-bold" style={{ color: resultMessages[result].color }}>
              {resultMessages[result].text}
            </span>
          </div>
        </div>
      )}

      {/* 玩家区域 */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">玩家</span>
          <span style={{ color: colors.textSecondary }}>点数: {playerScore}</span>
        </div>
        <div className="flex gap-3">
          {playerCards.map((card, i) => <Card key={i} card={card} index={i} />)}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-4 mt-auto">
        {isFinished ? (
          <motion.button
            className="px-8 py-3 rounded-lg font-bold text-white"
            style={{ backgroundColor: colors.primary }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewGame}
          >
            重新开始
          </motion.button>
        ) : (
          <>
            <motion.button
              className="px-8 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: isPlaying ? colors.success : colors.textSecondary }}
              whileHover={isPlaying ? { scale: 1.05 } : {}}
              whileTap={isPlaying ? { scale: 0.95 } : {}}
              onClick={onHit}
              disabled={!isPlaying}
            >
              要牌
            </motion.button>
            <motion.button
              className="px-8 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: isPlaying ? colors.danger : colors.textSecondary }}
              whileHover={isPlaying ? { scale: 1.05 } : {}}
              whileTap={isPlaying ? { scale: 0.95 } : {}}
              onClick={onStand}
              disabled={!isPlaying}
            >
              停牌
            </motion.button>
            <motion.button
              className="px-8 py-3 rounded-lg font-bold text-white"
              style={{ backgroundColor: canDouble ? colors.warning : colors.textSecondary }}
              whileHover={canDouble ? { scale: 1.05 } : {}}
              whileTap={canDouble ? { scale: 0.95 } : {}}
              onClick={onDouble}
              disabled={!canDouble}
            >
              加倍
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}
