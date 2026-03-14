import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '@/store/playerStore';
import { SkillCard } from './SkillCard';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InventoryModal({ isOpen, onClose }: InventoryModalProps) {
  const { inventory } = usePlayerStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-white mb-4">技能卡背包</h2>
            <div className="grid grid-cols-4 gap-4">
              {inventory.skillCards.map((stack) => (
                <SkillCard
                  key={stack.card.id}
                  card={stack.card}
                  count={stack.count}
                  disabled
                />
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              关闭
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
