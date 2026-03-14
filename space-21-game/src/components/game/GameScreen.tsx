import { colors } from '@/styles/theme';
import { StatusBar } from '../ui/StatusBar';
import { GameTable } from './GameTable';
import { SkillCardBar } from '../SkillCardBar';
import type { PlayingCard, GameState } from '@/types';

interface Props {
  dealerCards: PlayingCard[];
  playerCards: PlayingCard[];
  dealerScore: number;
  playerScore: number;
  bet: number;
  status: GameState['status'];
  result?: GameState['result'];
  hp: number;
  maxHp: number;
  shield: number;
  maxShield: number;
  gold: number;
  onHit: () => void;
  onStand: () => void;
  onDouble: () => void;
  onNewGame: () => void;
}

export function GameScreen(props: Props) {
  return (
    <div
      className="w-screen h-screen flex flex-col"
      style={{
        backgroundImage: 'url(/assets/scenes/VBWoSzFmmKFo7Uh6Qmshf3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* 顶部栏 */}
      <div className="h-20 flex items-center justify-between px-6" style={{ backgroundColor: `${colors.cardBg}E6` }}>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold" style={{ color: colors.textPrimary }}>Space-21</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">💰</span>
            <span className="font-bold" style={{ color: colors.warning }}>{props.gold}</span>
          </div>
          <button className="px-4 py-2 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
            <span style={{ color: colors.textPrimary }}>🎒</span>
          </button>
        </div>
      </div>

      {/* 主内容 */}
      <div className="flex-1 p-6">
        <GameTable
          dealerCards={props.dealerCards}
          playerCards={props.playerCards}
          dealerScore={props.dealerScore}
          playerScore={props.playerScore}
          bet={props.bet}
          status={props.status}
          result={props.result}
          onHit={props.onHit}
          onStand={props.onStand}
          onDouble={props.onDouble}
          onNewGame={props.onNewGame}
        />
      </div>

      {/* 底部栏 */}
      <div className="p-6 flex gap-4" style={{ backgroundColor: colors.cardBg }}>
        <div className="flex-1 flex flex-col gap-3">
          <StatusBar label="生命值" current={props.hp} max={props.maxHp} color={colors.danger} icon="❤️" />
          <StatusBar label="护盾" current={props.shield} max={props.maxShield} color={colors.primary} icon="🛡️" />
        </div>
        <div className="flex items-center">
          <SkillCardBar />
        </div>
      </div>
    </div>
  );
}
