"use server";

import { db } from "@/db";

export const getProjectField = async (projectId: string) => {
  if (!projectId || typeof projectId !== "string") {
    console.error("Invalid projectId:", projectId);
    throw new Error("Invalid projectId");
  }

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
      console.error("Project not found:", projectId);
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error("Error in getProjectField:", {
      projectId,
      error: error,
    });
    throw new Error("Failed to fetch project");
  }
};

export type GetProjectFieldType = Awaited<ReturnType<typeof getProjectField>>;
