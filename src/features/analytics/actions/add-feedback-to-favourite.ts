"use server";

import { db } from "@/db";

export const addFeedbackToFavorite = async (
  projectId: string,
  resultId: string,
  isFavorite: boolean,
) => {
  if (!projectId || !resultId) {
    throw new Error("Both projectId and resultId are required.");
  }

  try {
    const updatedResult = await db.result.update({
      where: {
        id: resultId,
        projectId,
      },
      data: {
        isFavorite: !isFavorite,
      },
    });

    return updatedResult;
  } catch (error) {
    console.error("Error adding feedback to favorites:", error);
    throw new Error("An error occurred while adding feedback to favorites.");
  }
};
