import { useEffect } from 'react';
import { GameScreen } from './components/game/GameScreen';
import { useSound } from './hooks/useSound';
import { useGameStore } from './store/gameStore';
import { usePlayerStore } from './store/playerStore';

function App() {
  const { playSound } = useSound();
  const setPlaySound = useGameStore(state => state.setPlaySound);
  const initDeck = useGameStore(state => state.initDeck);
  const shuffleDeck = useGameStore(state => state.shuffleDeck);
  const dealCards = useGameStore(state => state.dealCards);
  const hit = useGameStore(state => state.hit);
  const stand = useGameStore(state => state.stand);
  const placeBet = useGameStore(state => state.placeBet);
  const resetGame = useGameStore(state => state.resetGame);

  const dealerHand = useGameStore(state => state.dealerHand);
  const playerHand = useGameStore(state => state.playerHand);
  const dealerScore = useGameStore(state => state.dealerScore);
  const playerScore = useGameStore(state => state.playerScore);
  const currentBet = useGameStore(state => state.currentBet);
  const status = useGameStore(state => state.status);
  const result = useGameStore(state => state.result);

  const player = usePlayerStore(state => state.player);

  useEffect(() => {
    setPlaySound(playSound);
    initDeck();
    shuffleDeck();
  }, []);

  useEffect(() => {
    if (status === 'idle' && currentBet === 0) {
      placeBet(100);
    }
    if (status === 'betting') {
      dealCards();
    }
  }, [status, currentBet]);

  const handleDouble = () => {
    if (playerHand.length === 2) {
      placeBet(currentBet * 2);
      hit();
      setTimeout(() => stand(), 500);
    }
  };

  const handleNewGame = () => {
    resetGame();
    shuffleDeck();
    placeBet(100);
  };

  return (
    <GameScreen
      dealerCards={dealerHand}
      playerCards={playerHand}
      dealerScore={dealerScore}
      playerScore={playerScore}
      bet={currentBet}
      status={status}
      result={result}
      hp={player.hp}
      maxHp={player.maxHp}
      shield={player.shield}
      maxShield={player.maxShield}
      gold={player.money}
      onHit={hit}
      onStand={stand}
      onDouble={handleDouble}
      onNewGame={handleNewGame}
    />
  );
}

export default App;
