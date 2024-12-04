import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type VideoState = {
  videoUrl: string | null;
  setVideoUrl: (url: string | null) => void;
};

export const useVideo = create<VideoState>()(
  persist(
    (set) => ({
      videoUrl: null,
      setVideoUrl: (videoUrl: string | null) => {
        set({ videoUrl });
      },
    }),
    { name: "video", storage: createJSONStorage(() => localStorage) },
  ),
);
