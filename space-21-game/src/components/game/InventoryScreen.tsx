import { colors } from '@/styles/theme';
import { ResourceCard } from './ResourceCard';
import type { ResourceCard as ResourceCardType } from '@/types';

interface Props {
  items: Array<{ card: ResourceCardType; count: number }>;
  gold: number;
  onClose: () => void;
}

export function InventoryScreen({ items, gold, onClose }: Props) {
  return (
    <div className="w-screen h-screen flex flex-col" style={{ backgroundColor: colors.bgDark }}>
      {/* 头部 */}
      <div className="h-30 flex items-center justify-between px-8" style={{ backgroundColor: colors.cardBg }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎒</span>
          <span className="text-2xl font-bold" style={{ color: colors.textPrimary }}>你的物品</span>
        </div>
        <button onClick={onClose} className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.danger }}>
          <span style={{ color: colors.textPrimary }}>✕</span>
        </button>
      </div>

      {/* 主内容 */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-6 gap-4">
          {items.map((item, i) => (
            <ResourceCard key={i} card={item.card} count={item.count} />
          ))}
        </div>
      </div>

      {/* 底部 */}
      <div className="h-20 flex items-center justify-between px-8" style={{ backgroundColor: colors.cardBg }}>
        <div className="flex items-center gap-2">
          <span className="text-xl">💰</span>
          <span className="font-bold text-xl" style={{ color: colors.warning }}>{gold}</span>
        </div>
      </div>
    </div>
  );
}
