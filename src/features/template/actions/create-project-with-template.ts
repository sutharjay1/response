"use server";

import { db } from "@/db";
import { FieldType } from "@prisma/client";

export type TTemplate = {
  name: string;
  description: string;
  category: string;
  status: string;
  banner: string;
  fields: { label: string; type: string; order: number }[];
};

export async function createProjectWithTemplate({
  name,
  description,
  userId,
  template,
}: {
  name: string;
  description: string;
  userId: string;
  template: TTemplate;
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
        fields: {
          createMany: {
            data: template.fields.map((field, index) => ({
              label: field.label,
              type: field.type as FieldType,
              order: index,
            })),
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
