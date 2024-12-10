"use server";

import { db } from "@/db";

export const uploadUnsplashBanner = async ({
  url,
  id,
}: {
  url: string;
  id: string;
}) => {
  if (!url) {
    return {
      success: false,
      data: null,
    };
  }

  try {
    const result = await db.project.update({
      where: { id },
      data: {
        banner: url,
      },
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "upload failed",
    };
  }
};
