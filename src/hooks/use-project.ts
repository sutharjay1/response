import { Project } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProjectState {
  project: Project | null;
  setProject: (project: Project) => void;
}

export const useProject = create<ProjectState>()(
  persist(
    (set) => ({
      project: null,
      setProject: (project: Project) => {
        set({ project });
      },
    }),
    { name: "project", storage: createJSONStorage(() => localStorage) },
  ),
);
