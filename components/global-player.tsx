import { useSongStore } from "@/zustand/store/useSongStore";
import { useAudioPlayer } from "expo-audio";
import { useEffect } from "react";

export const GlobalPlayer = () => {
  const { songs, currentIndex, isPlaying, handleNext } = useSongStore();

  const currentSong = songs[currentIndex];

  const player = useAudioPlayer(currentSong?.uri);

  // ▶ play / pause global
  useEffect(() => {
    if (!player) return;

    if (isPlaying) {
      player.play();
    } else {
      player.pause();
    }
  }, [isPlaying]);

  // 🔥 auto siguiente
  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      if (player.duration && player.currentTime >= player.duration - 0.5) {
        handleNext();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  return null; // 👈 no renderiza nada
};
