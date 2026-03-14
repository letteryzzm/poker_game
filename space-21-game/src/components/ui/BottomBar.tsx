import { usePlayerStore } from '@/store/playerStore';
import { ResourceCard } from '../game/ResourceCard';

export function BottomBar() {
  const { inventory } = usePlayerStore();
  const weightPercent = (inventory.currentWeight / inventory.maxWeight) * 100;

  return (
    <div className="h-[200px] bg-[#16213E] p-6 flex flex-col gap-4">
      {/* 背包标题 */}
      <div className="flex items-center gap-2">
        <span className="text-xl">📦</span>
        <span className="text-white text-lg font-semibold">背包</span>
      </div>

      {/* 卡牌槽位 */}
      <div className="flex gap-3 overflow-x-auto">
        {inventory.handDeck.map((stack, i) => (
          <ResourceCard key={i} card={stack.card} count={stack.count} />
        ))}
        {Array.from({ length: Math.max(0, 6 - inventory.handDeck.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="w-[85px] h-[120px] bg-[#2C3E50] rounded-lg flex-shrink-0" />
        ))}
      </div>

      {/* 负重条 */}
      <div className="flex flex-col gap-2">
        <span className="text-white text-sm font-semibold">
          负重: {inventory.currentWeight}/{inventory.maxWeight} kg
        </span>
        <div className="relative w-full h-6">
          <div className="absolute inset-0 bg-[#1A1A2E] rounded-lg" />
          <div
            className="absolute inset-0 bg-[#4A90E2] rounded-lg transition-all"
            style={{ width: `${weightPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
