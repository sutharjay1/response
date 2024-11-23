import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProjectState {
  projectId: string;
  setProjectId: (projectId: string) => void;
}

export const useProject = create<ProjectState>()(
  persist(
    (set) => ({
      projectId: "",
      setProjectId: (projectId: string) => {
        set({ projectId });
      },
    }),
    { name: "project", storage: createJSONStorage(() => localStorage) },
  ),
);
