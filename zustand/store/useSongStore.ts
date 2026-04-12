import { ISongStore } from "@/interfaces/song-store.interface";
import { ISong } from "@/interfaces/song.interface";
import { storage } from "@/utils/mmkv";
import { Asset } from "expo-asset";
import type { AudioPlayer } from "expo-audio";
import { createAudioPlayer } from "expo-audio";
import { create } from "zustand";

const loadAsset = async () => {
  const asset = Asset.fromModule(
    require("../../assets/images/child-background-img.jpg"),
  );
  await asset.downloadAsync();
  return asset.uri;
};
/* =========================
   💾 STORAGE
========================= */
const storedSongs = storage.getString("@local_songs");
const parsedSongs: ISong[] = storedSongs ? JSON.parse(storedSongs) : [];

/* =========================
   🔐 HELPERS
========================= */
const safeRelease = async (
  player?: AudioPlayer | null,
  subscription?: any,
  interval?: any,
) => {
  try {
    subscription?.remove?.();

    if (interval) {
      clearInterval(interval);
    }

    if (!player) return;

    await player.pause().catch(() => {});
    player.release();
  } catch {}
};
const setupLockScreen = async (player: AudioPlayer, song: ISong) => {
  try {
    const uri = await loadAsset();

    player.setActiveForLockScreen(true, {
      title: song.title ?? "Unknown",
      artist: song.artist ?? "Unknown",
      albumTitle: song.album ?? "",
      artworkUrl: uri,
    });
  } catch (e) {
    console.log(e);
  }
};

const createNewPlayer = async (song: ISong) => {
  const player = await createAudioPlayer({
    source: { uri: song.uri },
    updateInterval: 250,
  });

  setupLockScreen(player, song);

  return { player };
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
  trackingInterval: null,

  duration: 0,
  currentTime: 0,

  isPlaying: false,

  currentPlayId: null as number | null,

  /* =========================
     🎶 SET SONGS
  ========================= */
  setSongs: (songs) => set({ songs }),

  /* =========================
     🎶 SET QUEUE
  ========================= */
  setQueue: async (songs, startIndex = 0) => {
    const { player, subscription, trackingInterval } = get();

    await safeRelease(player, subscription, trackingInterval);

    set({
      queue: songs,
      currentIndex: startIndex,
      subscription: null,
      trackingInterval: null,
    });

    await get().playCurrent();
  },

  /* =========================
     ▶️ PLAY CURRENT
  ========================= */
  playCurrent: async () => {
    const {
      queue,
      currentIndex,
      player: oldPlayer,
      subscription,
      trackingInterval,
    } = get();
    if (!queue.length) return;

    // Limpia el player anterior
    await safeRelease(oldPlayer, subscription, trackingInterval);

    const song = queue[currentIndex];

    let newPlayer;
    try {
      const result = await createNewPlayer(song);
      newPlayer = result.player;
      if (!newPlayer) throw new Error("Player no se pudo crear");
    } catch (e) {
      console.error("Error creando AudioPlayer:", e);
      return;
    }

    // Suscríbete al evento de progreso
    const newSub = newPlayer.addListener("statusChange", (status) => {
      console.log("STATUS:", status);

      set({
        currentTime: status.currentTime ?? 0,
        duration: status.duration ?? 0,
      });
    });

    // Actualiza el store con el player y subscription
    set({
      player: newPlayer,
      subscription: newSub,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    });

    try {
      await newPlayer.play();
      set({ isPlaying: true });
    } catch (e) {
      console.error("Error reproduciendo canción:", e);
      set({ isPlaying: false });
    }
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
      set({ isPlaying: false });
    } else {
      await player.play();
      set({ isPlaying: true });
    }
  },

  /* =========================
     ⏭ NEXT
  ========================= */
  handleNext: async () => {
    const { queue } = get();
    if (!queue.length) return;

    // Elegir un índice aleatorio distinto al actual
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * queue.length);
    } while (nextIndex === get().currentIndex && queue.length > 1);

    set({ currentIndex: nextIndex });
    await get().playCurrent();
  },

  /* =========================
     ⏮ PREV
  ========================= */
  handlePrev: async () => {
    const { queue } = get();
    if (!queue.length) return;

    let prevIndex;
    do {
      prevIndex = Math.floor(Math.random() * queue.length);
    } while (prevIndex === get().currentIndex && queue.length > 1);

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
