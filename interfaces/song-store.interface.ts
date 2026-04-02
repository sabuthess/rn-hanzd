import type { AudioPlayer } from "expo-audio";
import { ISong } from "./song.interface";

export interface ISongStore {
  songs: ISong[];
  currentIndex: number;
  player: AudioPlayer | null;

  duration: number;
  currentTime: number;

  isPlaying: boolean;

  setSongs: (songs: ISong[]) => void;
  setSongById: (id: string) => Promise<void>;
  handleNext: () => Promise<void>;
  handlePrev: () => Promise<void>;
  togglePlay: () => Promise<void>;

  setPlayer: (player: AudioPlayer) => void;
  setStatus: (time: number, duration: number) => void;
}
