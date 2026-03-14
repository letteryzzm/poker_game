import type { ResourceCard } from '@/types';

export const resourceCards: ResourceCard[] = [
  // 矿石类 (4张)
  {
    id: 'iron_ore',
    name: 'Iron Ore',
    displayName: '铁矿',
    type: 'ore',
    description: '常见的铁矿石，可用于基础建造',
    weight: 2,
    maxStack: 50,
    rarity: 'common',
    price: 10,
    imagePath: '⛰️'
  },
  {
    id: 'gold_ore',
    name: 'Gold Ore',
    displayName: '金矿',
    type: 'ore',
    description: '珍贵的金矿石，价值不菲',
    weight: 3,
    maxStack: 30,
    rarity: 'rare',
    price: 50,
    imagePath: '💰'
  },
  {
    id: 'silver_ore',
    name: 'Silver Ore',
    displayName: '银矿',
    type: 'ore',
    description: '闪亮的银矿石',
    weight: 2.5,
    maxStack: 40,
    rarity: 'rare',
    price: 30,
    imagePath: '🪙'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    displayName: '钻石',
    type: 'ore',
    description: '极其稀有的钻石',
    weight: 1,
    maxStack: 10,
    rarity: 'epic',
    price: 200,
    imagePath: '💎'
  },

  // 食物类 (5张)
  {
    id: 'energy_bar',
    name: 'Energy Bar',
    displayName: '能量棒',
    type: 'food',
    description: '恢复20点生命值',
    weight: 0.5,
    maxStack: 20,
    rarity: 'common',
    price: 15,
    imagePath: '🍫',
    hp: 20
  },
  {
    id: 'water',
    name: 'Water',
    displayName: '水源',
    type: 'food',
    description: '基础补给品',
    weight: 1,
    maxStack: 10,
    rarity: 'common',
    price: 5,
    imagePath: '💧',
    hp: 10
  },
  {
    id: 'oxygen',
    name: 'Oxygen',
    displayName: '氧气罐',
    type: 'food',
    description: '维持生命必需品',
    weight: 2,
    maxStack: 5,
    rarity: 'common',
    price: 20,
    imagePath: '🫁',
    hp: 15
  },
  {
    id: 'nutrient',
    name: 'Nutrient',
    displayName: '营养包',
    type: 'food',
    description: '恢复50点生命值',
    weight: 1,
    maxStack: 10,
    rarity: 'rare',
    price: 40,
    imagePath: '🍱',
    hp: 50
  },
  {
    id: 'medkit',
    name: 'Med Kit',
    displayName: '医疗包',
    type: 'food',
    description: '恢复80点生命值',
    weight: 1.5,
    maxStack: 5,
    rarity: 'rare',
    price: 80,
    imagePath: '🏥',
    hp: 80
  },

  // 装备类 (11张)
  {
    id: 'drill',
    name: 'Drill',
    displayName: '钻头',
    type: 'equipment',
    description: '基础采矿工具',
    weight: 3,
    maxStack: 1,
    rarity: 'common',
    price: 50,
    imagePath: '🔧'
  },
  {
    id: 'scanner',
    name: 'Scanner',
    displayName: '扫描仪',
    type: 'equipment',
    description: '探测周围资源',
    weight: 1,
    maxStack: 1,
    rarity: 'rare',
    price: 100,
    imagePath: '📡'
  },
  {
    id: 'shield',
    name: 'Shield',
    displayName: '护盾',
    type: 'equipment',
    description: '提供额外防护',
    weight: 5,
    maxStack: 1,
    rarity: 'epic',
    price: 300,
    imagePath: '🛡️'
  },
  {
    id: 'battery',
    name: 'Battery',
    displayName: '能量电池',
    type: 'equipment',
    description: '为设备提供能量',
    weight: 2,
    maxStack: 5,
    rarity: 'rare',
    price: 60,
    imagePath: '🔋'
  },
  {
    id: 'fuel',
    name: 'Fuel',
    displayName: '燃料罐',
    type: 'equipment',
    description: '飞船燃料',
    weight: 4,
    maxStack: 10,
    rarity: 'common',
    price: 25,
    imagePath: '⛽'
  },
  {
    id: 'toolbox',
    name: 'Toolbox',
    displayName: '工具箱',
    type: 'equipment',
    description: '包含各种维修工具',
    weight: 3,
    maxStack: 1,
    rarity: 'rare',
    price: 120,
    imagePath: '🧰'
  },
  {
    id: 'repair_kit',
    name: 'Repair Kit',
    displayName: '修理包',
    type: 'equipment',
    description: '修复损坏的设备',
    weight: 2,
    maxStack: 5,
    rarity: 'common',
    price: 35,
    imagePath: '🔨'
  },
  {
    id: 'communicator',
    name: 'Comm',
    displayName: '通讯器',
    type: 'equipment',
    description: '远程通讯设备',
    weight: 1,
    maxStack: 1,
    rarity: 'rare',
    price: 90,
    imagePath: '📻'
  },
  {
    id: 'detector',
    name: 'Detector',
    displayName: '探测器',
    type: 'equipment',
    description: '高级探测设备',
    weight: 2,
    maxStack: 1,
    rarity: 'epic',
    price: 250,
    imagePath: '🔍'
  },
  {
    id: 'locator',
    name: 'Locator',
    displayName: '定位器',
    type: 'equipment',
    description: '精确定位装置',
    weight: 1,
    maxStack: 1,
    rarity: 'rare',
    price: 110,
    imagePath: '📍'
  },
  {
    id: 'jetpack',
    name: 'Jetpack',
    displayName: '喷气背包',
    type: 'special',
    description: '传说级飞行装备',
    weight: 8,
    maxStack: 1,
    rarity: 'legendary',
    price: 1000,
    imagePath: '🚀'
  }
];
