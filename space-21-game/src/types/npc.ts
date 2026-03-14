// NPC 对话
export interface Dialogue {
  greeting: string;
  win: string;
  lose: string;
}

// NPC 商店
export interface Shop {
  items: string[];
}

// NPC 信息
export interface NPC {
  id: string;
  name: string;
  avatar: string;
  dialogue: Dialogue;
  shop: Shop | null;
}
