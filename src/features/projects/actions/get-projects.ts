"use server";

import { db } from "@/db";

export async function getProjects(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const projects = await db.project.findMany({
      where: { userId },
      include: {
        fields: {
          select: {
            results: true,
          },
        },
      },
    });
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

export async function getProjectById(projectId: string, username?: true) {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        user: username ? { select: { name: true, email: true } } : false,
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
}

export async function getResponse(projectId: string) {
  if (!projectId) {
    throw new Error("Project ID is required");
  }

  try {
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: {
        fields: {
          select: {
            results: true,
          },
        },
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return project.fields;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw new Error("Failed to fetch project");
  }
}
