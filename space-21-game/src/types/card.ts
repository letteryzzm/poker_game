// 扑克牌类型
export interface PlayingCard {
  value: number;        // 1-13 (A-K)
  suit: 'c' | 'h' | 's' | 'd';  // 梅花/红心/黑桃/方块
  face: string;         // 图片文件名
  hidden?: boolean;     // 是否隐藏
}

// 资源卡类型
export interface ResourceCard {
  id: string;
  name: string;
  displayName: string;
  type: 'ore' | 'food' | 'equipment' | 'special';
  description: string;
  weight: number;
  maxStack: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  price: number;
  imagePath: string;
  hp?: number;          // 食物回复值
}

// 卡牌堆叠
export interface CardStack {
  card: ResourceCard;
  count: number;
  position: number;
}
