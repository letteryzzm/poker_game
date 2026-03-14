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
      <div className="flex-1 p-6 relative">
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
        {/* 技能牌栏 - 右下角 */}
        <div className="absolute bottom-6 right-6">
          <SkillCardBar />
        </div>
      </div>
    </div>
  );
}
