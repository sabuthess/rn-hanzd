import TrackPlayer, { Capability } from "react-native-track-player";

let initialized = false;

export const initTrackPlayer = async () => {
  if (initialized) return;
  initialized = true;

  await TrackPlayer.setupPlayer();

  await TrackPlayer.updateOptions({
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.SkipToNext,
      Capability.SkipToPrevious,
      Capability.Stop,
    ],
  });
};
