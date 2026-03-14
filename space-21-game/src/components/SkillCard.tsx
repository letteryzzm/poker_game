import { motion } from 'framer-motion';
import type { SkillCard as SkillCardType } from '@/types';

interface SkillCardProps {
  card: SkillCardType;
  count: number;
  onUse?: () => void;
  disabled?: boolean;
}

export function SkillCard({ card, count, onUse, disabled }: SkillCardProps) {
  const isDisabled = disabled || card.currentCooldown > 0 || count === 0;

  const rarityColors = {
    common: 'bg-gray-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500'
  };

  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={`relative w-20 h-28 rounded-lg border-2 ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${rarityColors[card.rarity]}`}
      onClick={() => !isDisabled && onUse?.()}
    >
      <div className="p-2 text-white text-center">
        <div className="text-xs font-bold">{card.name}</div>
        <div className="text-[10px] mt-1">{card.description}</div>
        {card.currentCooldown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
            <span className="text-2xl font-bold">{card.currentCooldown}</span>
          </div>
        )}
        {count > 0 && (
          <div className="absolute top-1 right-1 bg-black/70 rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {count}
          </div>
        )}
      </div>
    </motion.div>
  );
}
