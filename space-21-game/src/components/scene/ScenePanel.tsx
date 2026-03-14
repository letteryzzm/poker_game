import { useSceneStore } from '@/store/sceneStore';
import { usePlayerStore } from '@/store/playerStore';
import { useEffect } from 'react';

export function ScenePanel() {
  const { currentScene, currentNPC, scenes, loadData, changeScene } = useSceneStore();
  const { player, setScene } = usePlayerStore();

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!currentScene || !currentNPC) {
    return <div className="bg-[#16213E] rounded-lg p-5">加载中...</div>;
  }

  const connectedScenes = currentScene.connectedScenes
    .map(id => scenes[id])
    .filter(Boolean);

  const handleSceneChange = (sceneId: string) => {
    const targetScene = scenes[sceneId];
    if (!targetScene) return;

    // 检查解锁条件
    if (targetScene.unlockRequirement) {
      const { type, value } = targetScene.unlockRequirement;
      if (type === 'money' && player.money < value) {
        alert(`需要 ${value} 星币才能解锁`);
        return;
      }
      if (type === 'level' && player.level < value) {
        alert(`需要等级 ${value} 才能解锁`);
        return;
      }
    }

    changeScene(sceneId);
    setScene(sceneId);
  };

  const currentIndex = connectedScenes.findIndex(s => s.id === currentScene.id);
  const prevScene = connectedScenes[currentIndex - 1];
  const nextScene = connectedScenes[currentIndex + 1];

  return (
    <div className="bg-[#16213E] rounded-lg p-5 flex flex-col gap-4">
      {/* 场景背景 */}
      <div className="w-full h-[300px] bg-[#2C3E50] rounded-lg" />

      {/* 场景标题 */}
      <h3 className="text-white text-2xl font-bold">{currentScene.displayName}</h3>

      {/* NPC 卡片 */}
      <div className="bg-[#1A1A2E] rounded-lg p-4 flex items-center gap-4">
        <div className="w-20 h-20 bg-[#4A90E2] rounded-lg flex-shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <h4 className="text-white font-semibold text-lg">{currentNPC.name}</h4>
          <p className="text-gray-400 text-sm">{currentNPC.dialogue.greeting}</p>
        </div>
      </div>

      {/* 导航按钮 */}
      <div className="flex justify-between gap-3">
        <button
          onClick={() => prevScene && handleSceneChange(prevScene.id)}
          disabled={!prevScene}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${
            prevScene
              ? 'bg-[#4A90E2] text-white hover:bg-[#357ABD]'
              : 'bg-[#2C3E50] text-gray-400 opacity-50 cursor-not-allowed'
          }`}
        >
          <span>←</span>
          <span className="text-sm">上一区域</span>
        </button>
        <button
          onClick={() => nextScene && handleSceneChange(nextScene.id)}
          disabled={!nextScene}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${
            nextScene
              ? 'bg-[#4A90E2] text-white hover:bg-[#357ABD] shadow-[0_0_12px_rgba(74,144,226,0.5)]'
              : 'bg-[#2C3E50] text-gray-400 opacity-50 cursor-not-allowed'
          }`}
        >
          <span className="text-sm">下一区域</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
