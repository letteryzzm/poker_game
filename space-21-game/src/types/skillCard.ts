export type SkillCardType = 'combat' | 'buff';

export type SkillCardEffect =
  | 'peek_dealer'      // 透视眼
  | 'insurance'        // 保险
  | 'double_reward'    // 双倍奖励
  | 'extra_hit'        // 额外抽牌
  | 'force_stand'      // 强制停牌
  | 'heal'             // 治疗
  | 'shield_boost'     // 护盾增强
  | 'luck_boost';      // 幸运加成

export interface SkillCard {
  id: string;
  name: string;
  type: SkillCardType;
  effect: SkillCardEffect;
  description: string;
  cooldown: number;
  currentCooldown: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  imagePath: string;
}

export interface SkillCardStack {
  card: SkillCard;
  count: number;
}
