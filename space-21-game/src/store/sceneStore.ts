import { create } from 'zustand';
import type { Scene, NPC, ResourceCard } from '@/types';

interface SceneStore {
  scenes: Record<string, Scene>;
  npcs: Record<string, NPC>;
  cards: Record<string, ResourceCard>;
  currentScene: Scene | null;
  currentNPC: NPC | null;
  loadData: () => Promise<void>;
  changeScene: (sceneId: string) => void;
}

export const useSceneStore = create<SceneStore>((set, get) => ({
  scenes: {},
  npcs: {},
  cards: {},
  currentScene: null,
  currentNPC: null,

  loadData: async () => {
    const [scenesRes, npcsRes, cardsRes] = await Promise.all([
      fetch('/data/scenes.json'),
      fetch('/data/npcs.json'),
      fetch('/data/cards.json')
    ]);

    const scenes = await scenesRes.json();
    const npcs = await npcsRes.json();
    const cards = await cardsRes.json();

    const tutorialScene = scenes.tutorial_zone;
    const tutorialNPC = npcs[tutorialScene.npcDealer];

    set({
      scenes,
      npcs,
      cards,
      currentScene: tutorialScene,
      currentNPC: tutorialNPC
    });
  },

  changeScene: (sceneId) => {
    const { scenes, npcs } = get();
    const scene = scenes[sceneId];
    if (scene) {
      const npc = npcs[scene.npcDealer];
      set({ currentScene: scene, currentNPC: npc });
    }
  }
}));
