import { motion } from 'framer-motion';
import type { ResourceCard } from '@/types';

interface Props {
  card: ResourceCard;
  count?: number;
}

const rarityColors = {
  common: '#6B7280',
  rare: '#3B82F6',
  epic: '#A855F7',
  legendary: '#F59E0B'
};

const rarityGradients = {
  common: 'linear-gradient(180deg, #1F2937 0%, #374151 100%)',
  rare: 'linear-gradient(180deg, #1E3A8A 0%, #1E40AF 100%)',
  epic: 'linear-gradient(180deg, #3B0764 0%, #581C87 100%)',
  legendary: 'linear-gradient(180deg, #78350F 0%, #92400E 100%)'
};

const infoPanelColors = {
  common: '#374151',
  rare: '#1E3A8A',
  epic: '#581C87',
  legendary: '#92400E'
};

export function ResourceCard({ card, count }: Props) {
  return (
    <motion.div
      className="w-[128px] h-[176px] rounded-lg border-2 relative overflow-hidden"
      style={{
        background: rarityGradients[card.rarity],
        borderColor: rarityColors[card.rarity]
      }}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* 图标区域 */}
      <div className="absolute top-[14px] left-[14px] w-[100px] h-[100px] rounded-lg flex items-center justify-center"
        style={{ backgroundColor: rarityColors[card.rarity], opacity: 0.3 }}
      >
        <div className="text-4xl">{card.imagePath}</div>
      </div>

      {/* 信息面板 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[62px] rounded-lg px-2 py-2 flex flex-col gap-1"
        style={{ backgroundColor: infoPanelColors[card.rarity] }}
      >
        <div className="text-white font-bold text-sm leading-tight">{card.displayName}</div>
        <div className="text-gray-400 text-xs leading-tight">{card.name}</div>
      </div>

      {/* 数量标记 */}
      {count && count > 1 && (
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
          ×{count}
        </div>
      )}
    </motion.div>
  );
}
