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
        status: "DEV",
        banner: `https://avatar.vercel.sh/${name}`,
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
