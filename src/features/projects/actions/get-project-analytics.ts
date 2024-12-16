"use server";

import { db } from "@/db";
import { z } from "zod";

const ProjectAnalyticsSchema = z.string().cuid();

export const getProjectAnalytics = async (projectId: string) => {
  try {
    const validatedProjectId = ProjectAnalyticsSchema.parse(projectId);

    const project = await db.project.findUnique({
      where: { id: validatedProjectId },
      include: {
        user: true,
        fields: {
          orderBy: { order: "asc" },
          include: {
            results: {
              orderBy: { createdAt: "desc" },
              take: 100,
              include: {
                field: {
                  select: {
                    checked: true,
                    label: true,
                    type: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error("Error in getProjectAnalytics:", {
      projectId,
      error: error instanceof Error ? error.message : error,
    });

    throw error instanceof z.ZodError
      ? new Error("Invalid project ID")
      : new Error("Failed to fetch project analytics");
  }
};

export type GetProjectAnalyticsType = Awaited<
  ReturnType<typeof getProjectAnalytics>
>;
