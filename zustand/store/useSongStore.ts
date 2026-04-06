import { ISongStore } from "@/interfaces/song-store.interface";
import { ISong } from "@/interfaces/song.interface";
import { storage } from "@/utils/mmkv";
import type { AudioPlayer } from "expo-audio";
import { createAudioPlayer } from "expo-audio";
import { create } from "zustand";
//
/* =========================|
   🎵 TYPES
========================= */

interface PlaybackStatus {
  currentTime?: number;
  duration?: number;
  didJustFinish?: boolean;
}

/* =========================
   💾 STORAGE
========================= */
const storedSongs = storage.getString("@local_songs");
const parsedSongs: ISong[] = storedSongs ? JSON.parse(storedSongs) : [];

/* =========================
   🔐 HELPERS
========================= */
const safeRelease = async (player?: AudioPlayer | null, subscription?: any) => {
  try {
    subscription?.remove?.(); // elimina listener viejo

    if (!player) return;

    await player.pause().catch(() => {});
    player.release();
  } catch {}
};

const setupLockScreen = (player: AudioPlayer, song: ISong) => {
  try {
    player.setActiveForLockScreen(true, {
      title: song.title ?? "Unknown",
      artist: song.artist ?? "Unknown",
      albumTitle: song.album ?? "",
      artworkUrl: song.artwork ?? undefined,
    });
  } catch (e) {
    console.log("⚠️ lockscreen error", e);
  }
};

const createNewPlayer = async (
  song: ISong,
  onUpdate: (status: PlaybackStatus) => void,
) => {
  const player = await createAudioPlayer({
    source: { uri: song.uri },
    updateInterval: 250,
  });

  const subscription = player.addListener("playbackStatusUpdate", onUpdate);

  setupLockScreen(player, song);

  return { player, subscription };
};

/* =========================
   🧠 STORE
========================= */
export const useSongStore = create<ISongStore>((set, get) => ({
  songs: parsedSongs,

  queue: [],
  currentIndex: 0,

  player: null,
  subscription: null,

  duration: 0,
  currentTime: 0,

  isPlaying: false,

  /* =========================
     🎶 SET SONGS
  ========================= */
  setSongs: (songs) => set({ songs }),

  /* =========================
     🎶 SET QUEUE
  ========================= */
  setQueue: async (songs, startIndex = 0) => {
    const { player, subscription } = get();
    await safeRelease(player, subscription);

    set({
      queue: songs,
      currentIndex: startIndex,
      subscription: null,
    });

    await get().playCurrent();
  },

  /* =========================
     ▶️ PLAY CURRENT
  ========================= */
  playCurrent: async () => {
    const { queue, currentIndex, player: oldPlayer, subscription } = get();
    if (!queue.length) return;

    await safeRelease(oldPlayer, subscription);

    const song = queue[currentIndex];

    const { player: newPlayer, subscription: newSub } = await createNewPlayer(
      song,
      (status) => {
        const current = get().player;
        if (current !== newPlayer) return;

        set({
          currentTime: status.currentTime ?? 0,
          duration: status.duration ?? 0,
        });

        // 🔥 autoplay seguro
        if (status.didJustFinish && get().player === newPlayer) {
          get().handleNext();
        }
      },
    );

    set({
      player: newPlayer,
      subscription: newSub,
      isPlaying: true,
    });

    await newPlayer.play();
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

  /* =========================
     ▶️ / ⏸ TOGGLE
  ========================= */
  togglePlay: async () => {
    const player = get().player;
    if (!player) return;

    const { isPlaying } = get();

    if (isPlaying) {
      await player.pause();
      if (get().player === player) {
        set({ isPlaying: false });
      }
    } else {
      await player.play();
      if (get().player === player) {
        set({ isPlaying: true });
      }
    }
  },

  /* =========================
     ⏭ NEXT
  ========================= */
  handleNext: async () => {
    const { queue, currentIndex } = get();
    if (!queue.length) return;

    const nextIndex = currentIndex + 1 < queue.length ? currentIndex + 1 : 0;

    set({ currentIndex: nextIndex });
    await get().playCurrent();
  },

  /* =========================
     ⏮ PREV
  ========================= */
  handlePrev: async () => {
    const { queue, currentIndex } = get();
    if (!queue.length) return;

    const prevIndex =
      currentIndex - 1 >= 0 ? currentIndex - 1 : queue.length - 1;

    set({ currentIndex: prevIndex });
    await get().playCurrent();
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
