"use server";

import { db } from "@/db";

export async function removeField(projectId: string, fieldId: string) {
  try {
    await db.field.delete({
      where: {
        id: fieldId,
        project: {
          id: projectId,
        },
      },
    });
    return true;
  } catch (error) {
    console.error("Error deleting field:", error);
    throw new Error("Failed to delete field");
  }
}
