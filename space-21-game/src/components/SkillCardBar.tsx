import { usePlayerStore } from '@/store/playerStore';
import { useGameStore } from '@/store/gameStore';
import { SkillCard } from './SkillCard';
import type { SkillCardEffect } from '@/types';

export function SkillCardBar() {
  const { inventory } = usePlayerStore();
  const { status, activateSkill } = useGameStore();

  const handleUseSkill = (cardId: string, effect: SkillCardEffect) => {
    if (status !== 'playing') return;

    const success = usePlayerStore.getState().useSkillCard(cardId);
    if (success) {
      activateSkill(effect);
    }
  };

  const quickSlots = inventory.skillCards.slice(0, 4);

  return (
    <div className="flex gap-2 p-2 bg-black/30 rounded-lg">
      {quickSlots.map((stack) => (
        <SkillCard
          key={stack.card.id}
          card={stack.card}
          count={stack.count}
          onUse={() => handleUseSkill(stack.card.id, stack.card.effect)}
          disabled={status !== 'playing'}
        />
      ))}
    </div>
  );
}
