import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { UnsplashReturnType } from "../types/unsplash-return-type";

type BannerSearchState = {
  query: string;
  data: UnsplashReturnType[];
};

type BannerSearchHistoryState = {
  bannerSearchHistory: BannerSearchState[];
  setBannerSearchHistory: (data: BannerSearchState) => void;
  clearBannerSearchHistory: () => void;
};

export const useBannerSearchHistory = create<BannerSearchHistoryState>(
  persist(
    (set) => ({
      bannerSearchHistory: [],
      setBannerSearchHistory: (searchEntry: BannerSearchState) =>
        set((state: BannerSearchHistoryState) => {
          const historySet = new Map(
            state.bannerSearchHistory.map((item: BannerSearchState) => [
              item.query,
              item,
            ]),
          );
          historySet.set(searchEntry.query, searchEntry);

          return {
            bannerSearchHistory: Array.from(historySet.values()),
          };
        }),
      clearBannerSearchHistory: () => set({ bannerSearchHistory: [] }),
    }),
    {
      name: "banner-search-history",
      storage: createJSONStorage(() => localStorage),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any,
);
