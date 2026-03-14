import type { Player } from '@/types';

const DAILY_REWARD = 100; // 每日救济金金额
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

/**
 * 检查是否可以领取每日救济金
 */
export function canClaimDailyReward(lastClaimTime: number): boolean {
  const now = Date.now();
  return (now - lastClaimTime) >= ONE_DAY_MS;
}

/**
 * 领取每日救济金
 */
export function claimDailyReward(player: Player): Player {
  return {
    ...player,
    money: player.money + DAILY_REWARD,
    lastDailyReward: Date.now()
  };
}

/**
 * 判断是否显示破产帮助提示
 */
export function shouldShowBankruptcyHelp(
  player: Player,
  minBet: number
): boolean {
  return player.money < minBet;
}
