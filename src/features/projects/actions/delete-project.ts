"use server";

import { db } from "@/db";

export const deleteProject = async (projectId: string) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  try {
    await db.project.delete({
      where: { id: projectId },
    });

    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw new Error("Failed to delete project");
  }
};
