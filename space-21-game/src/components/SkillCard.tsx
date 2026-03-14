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

  return (
    <motion.div
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={`relative w-20 h-28 rounded-lg border-2 bg-black/40 border-cyan-500/50 ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
      onClick={() => !isDisabled && onUse?.()}
    >
      <div className="p-2 text-white text-center">
        <div className="text-xs font-bold">{card.name}</div>
        <div className="text-[10px] mt-1">{card.description}</div>
        {card.currentCooldown > 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg">
            <span className="text-2xl font-bold">{card.currentCooldown}</span>
            <span className="text-[10px] mt-1">冷却回合</span>
          </div>
        )}
        {count > 0 && (
          <div className="absolute bottom-1 right-1 bg-black/80 rounded px-1.5 py-0.5 flex flex-col items-center text-[10px]">
            <span className="font-bold">{count}</span>
            <span className="text-[8px]">库存</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
