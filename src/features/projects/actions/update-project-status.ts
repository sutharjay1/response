"use server";

import { db } from "@/db";
import { Status } from "@prisma/client";

export async function updateProjectStatus(projectId: string, status: Status) {
  if (!projectId || !status) {
    throw new Error("User ID and status are required");
  }

  try {
    const projects = await db.project.update({
      where: { id: projectId },
      data: {
        status: status,
      },
    });
    return projects.status;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}
