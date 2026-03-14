import { usePlayerStore } from '@/store/playerStore';

export function TopBar() {
  const { player, claimDailyReward } = usePlayerStore();

  const handleClaimReward = () => {
    const success = claimDailyReward();
    if (success) {
      alert('领取成功！获得 100 星币');
    } else {
      alert('每日救济金冷却中，请明天再来');
    }
  };

  const canClaim = Date.now() - player.lastDailyReward >= 24 * 60 * 60 * 1000;
  const needHelp = player.money < 50;

  return (
    <div className="h-20 bg-[#16213EE6] flex items-center justify-between px-6">
      {/* 左侧：星币 */}
      <div className="flex items-center gap-3">
        <span className="text-2xl">💰</span>
        <span className="text-[#FFC107] font-bold text-[20px] font-mono">{player.money.toLocaleString()}</span>
      </div>

      {/* 右侧：破产保护 */}
      {needHelp && (
        <button
          onClick={handleClaimReward}
          disabled={!canClaim}
          className={`px-4 py-2 rounded-lg font-semibold ${
            canClaim
              ? 'bg-[#4CAF50] text-white hover:bg-[#45A049] shadow-[0_0_12px_rgba(76,175,80,0.5)]'
              : 'bg-[#2C3E50] text-gray-400 cursor-not-allowed'
          }`}
        >
          🎁 每日救济金
        </button>
      )}
    </div>
  );
}
