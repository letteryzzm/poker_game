import { colors } from '@/styles/theme';
import { ResourceCard } from './ResourceCard';
import { Button } from '../ui/Button';
import type { ResourceCard as ResourceCardType } from '@/types';

interface ShopItem {
  card: ResourceCardType;
  stock: number;
}

interface Props {
  items: ShopItem[];
  gold: number;
  onBuy: (itemId: string) => void;
  onClose: () => void;
}

export function ShopScreen({ items, gold, onBuy, onClose }: Props) {
  return (
    <div className="w-screen h-screen flex flex-col" style={{ backgroundColor: colors.bgDark }}>
      {/* 头部 */}
      <div className="h-30 flex items-center justify-between px-8" style={{ backgroundColor: colors.cardBg }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏪</span>
          <span className="text-2xl font-bold" style={{ color: colors.textPrimary }}>商店</span>
        </div>
        <button onClick={onClose} className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.danger }}>
          <span style={{ color: colors.textPrimary }}>✕</span>
        </button>
      </div>

      {/* 主内容 */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-5 gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <ResourceCard card={item.card} />
              <div className="flex justify-between items-center px-2">
                <span style={{ color: colors.warning }}>💰 {item.card.price}</span>
                <span style={{ color: colors.textSecondary }}>库存: {item.stock}</span>
              </div>
              <Button variant="primary" onClick={() => onBuy(item.card.id)}>
                购买
              </Button>
            </div>
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
