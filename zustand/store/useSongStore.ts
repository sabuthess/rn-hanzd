import { ISongStore } from "@/interfaces/song-store.interface";
import { storage } from "@/utils/mmkv";
import type { AudioPlayer } from "expo-audio";
import { createAudioPlayer } from "expo-audio";
import { create } from "zustand";

const storedSongs = storage.getString("@local_songs");
const parsedSongs = storedSongs ? JSON.parse(storedSongs) : [];

// 🔐 helper anti-crash
const safeRelease = async (player?: AudioPlayer | null) => {
  try {
    if (!player) return;

    await player.pause().catch(() => {});
    player.release();
  } catch (e) {
    console.log("⚠️ Player ya liberado");
  }
};

export const useSongStore = create<ISongStore>((set, get) => ({
  songs: parsedSongs,
  currentIndex: 0,

  player: null,
  duration: 0,
  currentTime: 0,

  isPlaying: false,

  setPlayer: (player: AudioPlayer) => set({ player }),

  setStatus: (time, duration) =>
    set({
      currentTime: time,
      duration: duration,
    }),

  setSongs: (songs) => set({ songs }),

  // ✅ CREAR PLAYER
  setSongById: async (id) => {
    const { songs } = get();
    const index = songs.findIndex((s) => s.id === id);

    if (index === -1) return;

    const oldPlayer = get().player;

    // 🔴 liberar seguro
    await safeRelease(oldPlayer);

    // ✅ crear nuevo
    const newPlayer = await createAudioPlayer({
      source: { uri: songs[index].uri },
      updateInterval: 250,
    });

    // 🎧 listener progreso
    newPlayer.addListener("playbackStatusUpdate", (status) => {
      set({
        currentTime: status.currentTime ?? 0,
        duration: status.duration ?? 0,
      });

      // 🔁 autoplay siguiente
      if (status.didJustFinish) {
        get().handleNext();
      }
    });

    set({
      currentIndex: index,
      player: newPlayer,
      isPlaying: true,
    });

    await newPlayer.play();
  },

  // ▶️ / ⏸
  togglePlay: async () => {
    const currentPlayer = get().player;

    if (!currentPlayer) return;

    // Solo usar player válido
    if (typeof currentPlayer.play !== "function") {
      console.log("⚠️ togglePlay skipped, player no válido");
      return;
    }

    try {
      if (get().isPlaying) {
        await currentPlayer.pause();
        set({ isPlaying: false });
      } else {
        await currentPlayer.play();
        set({ isPlaying: true });
      }
    } catch (e) {
      console.log("⚠️ togglePlay error", e);
    }
  },

  // ⏭
  handleNext: async () => {
    const { songs, currentIndex } = get();

    if (songs.length === 0) return;

    const nextIndex = currentIndex + 1 < songs.length ? currentIndex + 1 : 0;

    const oldPlayer = get().player;

    await safeRelease(oldPlayer);

    const newPlayer = await createAudioPlayer({
      source: { uri: songs[nextIndex].uri },
      updateInterval: 250,
    });

    newPlayer.addListener("playbackStatusUpdate", (status) => {
      set({
        currentTime: status.currentTime ?? 0,
        duration: status.duration ?? 0,
      });

      if (status.didJustFinish) {
        get().handleNext();
      }
    });

    set({
      currentIndex: nextIndex,
      player: newPlayer,
      isPlaying: true,
    });

    await newPlayer.play();
  },

  // ⏮
  handlePrev: async () => {
    const { songs, currentIndex } = get();

    if (songs.length === 0) return;

    const prevIndex =
      currentIndex - 1 >= 0 ? currentIndex - 1 : songs.length - 1;

    const oldPlayer = get().player;

    await safeRelease(oldPlayer);

    const newPlayer = await createAudioPlayer({
      source: { uri: songs[prevIndex].uri },
      updateInterval: 250,
    });

    newPlayer.addListener("playbackStatusUpdate", (status) => {
      set({
        currentTime: status.currentTime ?? 0,
        duration: status.duration ?? 0,
      });

      if (status.didJustFinish) {
        get().handleNext();
      }
    });

    set({
      currentIndex: prevIndex,
      player: newPlayer,
      isPlaying: true,
    });

    await newPlayer.play();
  },
}));
