import type { AudioPlayer } from "expo-audio";
import { ISong } from "./song.interface";

export interface ISongStore {
  songs: ISong[];

  queue: ISong[];
  currentIndex: number;

  player: AudioPlayer | null;
  subscription: any | null;

  trackingInterval: NodeJS.Timeout | null;
  currentPlayId: number | null;

  duration: number;
  currentTime: number;

  isPlaying: boolean;

  setSongs: (songs: ISong[]) => void;

  setQueue: (songs: ISong[], startIndex?: number) => Promise<void>;
  playCurrent: () => Promise<void>;
  setSongById: (id: string) => Promise<void>;

  togglePlay: () => Promise<void>;

  handleNext: () => Promise<void>;
  handlePrev: () => Promise<void>;

  addToQueue: (song: ISong) => void;
  removeFromQueue: (index: number) => void;
  replaceQueue: (songs: ISong[]) => void;
}
