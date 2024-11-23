"use server";

import { db } from "@/db";

export async function createProject({
  name,
  description,
  userId,
}: {
  name: string;
  description: string;
  userId: string;
}) {
  console.log({
    name,
    description,
    userId,
  });

  if (!name) {
    throw new Error("Project name is required");
  }
  if (!userId) {
    throw new Error("Please login to create a project");
  }

  try {
    const project = await db.project.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return project;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
}
