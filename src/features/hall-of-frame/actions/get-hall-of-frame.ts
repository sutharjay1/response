"use server";

import { db } from "@/db";

export const getHallOfFrame = async ({ projectId }: { projectId: string }) => {
  try {
    const result = await db.result.findMany({
      where: {
        projectId,
      },
      select: {
        avatar: true,
        value: true,
        name: true,
        isFavorite: true,
      },
    });

    return result;
  } catch (error) {
    console.error("getHallOfFrame error:", error);
    throw new Error("An error occurred while fetching the hall of frame.");
  }
};
