import { motion } from 'framer-motion';
import type { PlayingCard } from '@/types';

interface Props {
  card: PlayingCard;
  index?: number; // 用于发牌延迟
}

const suitColors = {
  s: '#06B6D4', // 黑桃 - 青色
  h: '#EC4899', // 红心 - 粉色
  c: '#14B8A6', // 梅花 - 青色
  d: '#A855F7'  // 方块 - 紫色
};

const suitSymbols = {
  h: '♥',
  d: '♦',
  c: '♣',
  s: '♠'
};

const rankSymbols = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function PlayingCard({ card, index = 0 }: Props) {
  if (card.hidden) {
    return (
      <motion.div
        className="w-[120px] h-[168px] rounded-lg bg-[#0A0A1A] border-2 flex items-center justify-center"
        style={{ borderColor: suitColors.s }}
        initial={{ x: -200, y: -100, opacity: 0, rotate: -10 }}
        animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: index * 0.1
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#4A90E2] to-[#7B68EE]" />
      </motion.div>
    );
  }

  const rank = card.face?.slice(1) || '';
  const rankIndex = parseInt(rank) - 1;
  const rankSymbol = rankSymbols[rankIndex] || 'A';
  const suitSymbol = suitSymbols[card.suit] || '♠';
  const color = suitColors[card.suit] || '#06B6D4';

  return (
    <motion.div
      className="w-[120px] h-[168px] rounded-lg border-2 relative"
      style={{
        background: 'linear-gradient(180deg, #16213E 0%, #1A1A2E 100%)',
        borderColor: color
      }}
      initial={{ x: -200, y: -100, opacity: 0, rotate: -10 }}
      animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: index * 0.1
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute top-2 left-2 bg-black/40 px-2 py-1 rounded">
        <div className="text-white font-bold text-2xl leading-none">{rankSymbol}</div>
        <div className="text-xl leading-none mt-0.5" style={{ color, filter: 'drop-shadow(0 0 4px currentColor)' }}>
          {suitSymbol}
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl" style={{ color, filter: 'drop-shadow(0 0 12px currentColor)' }}>
        {suitSymbol}
      </div>
    </motion.div>
  );
}
