import { useState, useRef, useCallback, useEffect } from 'react';

type SoundType = 'sfx' | 'music';

interface SoundConfig {
  [key: string]: string;
}

const SOUNDS: SoundConfig = {
  cardDeal: '/sound/deal_cards.mp3',
  win: '/sound/win.mp3',
  lose: '/sound/lose.mp3',
  click: '/sound/click.mp3',
};

export function useSound() {
  const [volumes, setVolumes] = useState({ sfx: 0.7, music: 0.5 });
  const [isMuted, setIsMuted] = useState(false);
  const audioCache = useRef<Map<string, HTMLAudioElement>>(new Map());
  const currentMusic = useRef<HTMLAudioElement | null>(null);
  const audioUnlocked = useRef(false);

  // 预加载音效
  useEffect(() => {
    Object.entries(SOUNDS).forEach(([name, path]) => {
      const audio = new Audio(path);
      audio.preload = 'auto';
      audioCache.current.set(name, audio);
    });

    // 解锁音频（用户首次交互时）
    const unlockAudio = () => {
      if (!audioUnlocked.current) {
        audioCache.current.forEach(audio => {
          audio.play().then(() => audio.pause()).catch(() => {});
        });
        audioUnlocked.current = true;
        document.removeEventListener('click', unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
      }
    };

    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);

    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
  }, []);

  const playSound = useCallback((soundName: string) => {
    if (isMuted) return;

    const audio = audioCache.current.get(soundName);
    if (audio) {
      audio.volume = volumes.sfx;
      audio.currentTime = 0;
      audio.play().catch(err => console.warn('音频播放失败:', soundName, err));
    }
  }, [isMuted, volumes.sfx]);

  const playMusic = useCallback((musicPath: string) => {
    if (currentMusic.current) {
      currentMusic.current.pause();
    }

    const audio = new Audio(musicPath);
    audio.loop = true;
    audio.volume = isMuted ? 0 : volumes.music;
    audio.play().catch(() => {});
    currentMusic.current = audio;
  }, [isMuted, volumes.music]);

  const stopMusic = useCallback(() => {
    if (currentMusic.current) {
      currentMusic.current.pause();
      currentMusic.current = null;
    }
  }, []);

  const setVolume = useCallback((type: SoundType, volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setVolumes(prev => ({ ...prev, [type]: clampedVolume }));

    if (type === 'music' && currentMusic.current) {
      currentMusic.current.volume = isMuted ? 0 : clampedVolume;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (currentMusic.current) {
        currentMusic.current.volume = newMuted ? 0 : volumes.music;
      }
      return newMuted;
    });
  }, [volumes.music]);

  return {
    playSound,
    playMusic,
    stopMusic,
    setVolume,
    toggleMute,
    isMuted,
    volumes
  };
}
