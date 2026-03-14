import type { SkillCard } from '@/types';

export const SKILL_CARDS: Record<string, SkillCard> = {
  peek_dealer: {
    id: 'peek_dealer',
    name: '透视眼',
    type: 'combat',
    effect: 'peek_dealer',
    description: '查看庄家底牌3秒',
    cooldown: 3,
    currentCooldown: 0,
    rarity: 'rare',
    imagePath: '/assets/skills/peek.png'
  },
  insurance: {
    id: 'insurance',
    name: '保险',
    type: 'combat',
    effect: 'insurance',
    description: '输了只扣50%下注',
    cooldown: 2,
    currentCooldown: 0,
    rarity: 'epic',
    imagePath: '/assets/skills/insurance.png'
  },
  double_reward: {
    id: 'double_reward',
    name: '双倍奖励',
    type: 'combat',
    effect: 'double_reward',
    description: '赢了获得双倍星币',
    cooldown: 4,
    currentCooldown: 0,
    rarity: 'legendary',
    imagePath: '/assets/skills/double.png'
  },
  extra_hit: {
    id: 'extra_hit',
    name: '额外抽牌',
    type: 'combat',
    effect: 'extra_hit',
    description: '本局可多抽1张牌不爆',
    cooldown: 3,
    currentCooldown: 0,
    rarity: 'rare',
    imagePath: '/assets/skills/extra.png'
  },
  force_stand: {
    id: 'force_stand',
    name: '强制停牌',
    type: 'combat',
    effect: 'force_stand',
    description: '强制庄家停牌',
    cooldown: 5,
    currentCooldown: 0,
    rarity: 'epic',
    imagePath: '/assets/skills/force.png'
  },
  heal: {
    id: 'heal',
    name: '治疗',
    type: 'buff',
    effect: 'heal',
    description: '恢复30点生命值',
    cooldown: 0,
    currentCooldown: 0,
    rarity: 'common',
    imagePath: '/assets/skills/heal.png'
  },
  shield_boost: {
    id: 'shield_boost',
    name: '护盾增强',
    type: 'buff',
    effect: 'shield_boost',
    description: '恢复20点护盾',
    cooldown: 0,
    currentCooldown: 0,
    rarity: 'common',
    imagePath: '/assets/skills/shield.png'
  },
  luck_boost: {
    id: 'luck_boost',
    name: '幸运加成',
    type: 'buff',
    effect: 'luck_boost',
    description: '下3局掉落率+20%',
    cooldown: 5,
    currentCooldown: 0,
    rarity: 'rare',
    imagePath: '/assets/skills/luck.png'
  }
};
