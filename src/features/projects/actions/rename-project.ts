"use server";

import { db } from "@/db";

export const renameProject = async ({
  projectId,
  name,
  description,
}: {
  projectId: string;
  name: string;
  description: string;
}) => {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  try {
    const project = await db.project.update({
      where: { id: projectId },
      data: {
        name,
        description: description.trim(),
      },
    });
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};
