import type { ResourceCard, Scene, NPC } from '@/types';

/**
 * 加载资源卡数据
 */
export async function loadResourceCards(): Promise<Record<string, ResourceCard>> {
  const response = await fetch('/data/cards.json');
  return response.json();
}

/**
 * 加载场景数据
 */
export async function loadScenes(): Promise<Record<string, Scene>> {
  const response = await fetch('/data/scenes.json');
  return response.json();
}

/**
 * 加载NPC数据
 */
export async function loadNPCs(): Promise<Record<string, NPC>> {
  const response = await fetch('/data/npcs.json');
  return response.json();
}
