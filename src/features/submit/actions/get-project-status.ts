"use server";

import { db } from "@/db";

export async function getProjectStatus(projectId: string) {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  try {
    const project = await db.project.findUnique({
      where: { id: projectId },

      select: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        name: true,
        status: true,
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error("Error fetching project status:", error);
    throw new Error("Failed to fetch project status");
  }
}
