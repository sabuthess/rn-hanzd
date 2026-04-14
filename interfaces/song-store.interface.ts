export interface ISongStore {
  songs: any[];

  queue: any[];
  currentIndex: number;

  player: any | null;
  subscription: any | null;

  trackingInterval: NodeJS.Timeout | null;
  currentPlayId: number | null;

  duration: number;
  currentTime: number;

  isPlaying: boolean;

  setSongs: (songs: any[]) => void;

  setQueue: (songs: any[], startIndex?: number) => Promise<void>;
  playCurrent: () => Promise<void>;
  setSongById: (id: string) => Promise<void>;

  togglePlay: () => Promise<void>;

  handleNext: () => Promise<void>;
  handlePrev: () => Promise<void>;

  addToQueue: (song: any) => any;
  removeFromQueue: (index: number) => void;
  replaceQueue: (songs: any[]) => void;
}
