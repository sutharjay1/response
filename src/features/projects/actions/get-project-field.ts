"use server";

import { db } from "@/db";

export const getProjectField = async (projectId: string) => {
  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        fields: {
          select: {
            id: true,
            type: true,
            label: true,
            checked: true,
            value: true,
            order: true,
          },
        },
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project");
  }
};
