import { ISongStore } from "@/interfaces/song-store.interface";
import { ISong } from "@/interfaces/song.interface";
import { storage } from "@/utils/mmkv";
import TrackPlayer from "react-native-track-player";

import { create } from "zustand";

const storedSongs = storage.getString("@local_songs");
const parsedSongs: ISong[] = storedSongs ? JSON.parse(storedSongs) : [];

/* =========================
   🧠 STORE
========================= */
export const useSongStore = create<ISongStore>((set, get) => ({
  songs: parsedSongs,

  queue: [],
  currentIndex: 0,

  player: null,
  subscription: null,
  trackingInterval: null,

  duration: 0,
  currentTime: 0,

  isPlaying: false,

  currentPlayId: null as number | null,

  setSongs: (songs) => set({ songs }),

  setQueue: async (songs, startIndex = 0) => {
    // const { player, subscription, trackingInterval } = get();

    // await safeRelease(player, subscription, trackingInterval);

    set({
      queue: songs,
      currentIndex: startIndex,
      subscription: null,
      trackingInterval: null,
    });

    await get().playCurrent();
  },

  playCurrent: async () => {
    const { queue, currentIndex } = get();

    if (!queue.length) return;
    if (currentIndex < 0 || currentIndex >= queue.length) return;

    const song = queue[currentIndex];
    if (!song?.uri) return;

    // await initTrackPlayer();

    await TrackPlayer.reset();

    await TrackPlayer.add(
      queue.map((song) => ({
        id: song.id.toString(),
        url: song.uri,
        title: song.title,
        artist: song.artist,
        artwork: require("../../assets/images/child-background-img.jpg"),
      })),
    );

    await TrackPlayer.skip(currentIndex);
    await TrackPlayer.play();

    set({
      isPlaying: true,
      currentTime: 0,
      duration: 0,
    });
  },
  /* =========================
     ▶️ PLAY BY ID
  ========================= */
  setSongById: async (id) => {
    const { songs } = get();
    const index = songs.findIndex((s) => s.id === id);
    if (index === -1) return;

    await get().setQueue(songs, index);
  },

  togglePlay: async () => {
    const { isPlaying } = get();

    if (isPlaying) {
      await TrackPlayer.pause();
      set({ isPlaying: false });
    } else {
      await TrackPlayer.play();
      set({ isPlaying: true });
    }
  },

  handleNext: async () => {
    const { currentIndex, queue } = get();

    if (currentIndex < queue.length - 1) {
      const newIndex = currentIndex + 1;

      await TrackPlayer.skipToNext();

      set({ currentIndex: newIndex });
    }
  },

  handlePrev: async () => {
    const { currentIndex } = get();

    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;

      await TrackPlayer.skipToPrevious();

      set({ currentIndex: newIndex });
    }
  },
  /* =========================
     ➕ ADD TO QUEUE
  ========================= */
  addToQueue: (song) => {
    const { queue } = get();
    set({ queue: [...queue, song] });
  },

  /* =========================
     ❌ REMOVE FROM QUEUE
  ========================= */
  removeFromQueue: (index) => {
    const { queue, currentIndex } = get();

    const newQueue = queue.filter((_, i) => i !== index);

    let newIndex = currentIndex;
    if (index < currentIndex) newIndex--;

    set({
      queue: newQueue,
      currentIndex: newIndex,
    });
  },

  /* =========================
     🔀 REPLACE QUEUE
  ========================= */
  replaceQueue: (songs) => {
    set({
      queue: songs,
      currentIndex: 0,
    });
  },
}));
