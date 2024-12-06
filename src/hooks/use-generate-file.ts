import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GenerateFileState {
  isScriptGenerated: boolean;
  setIsScriptGenerated: (isScriptGenerated: boolean) => void;
}

export const useGenerateFile = create<GenerateFileState>()(
  persist(
    (set) => ({
      isScriptGenerated: false,
      setIsScriptGenerated: (isScriptGenerated: boolean) => {
        set({ isScriptGenerated });
      },
    }),
    { name: "generate-file", storage: createJSONStorage(() => localStorage) },
  ),
);
