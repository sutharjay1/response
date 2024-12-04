"use server";
import { db } from "@/db";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadVideoToCloudinary(url: string, id: string) {
  try {
    const uploadOptions = {
      resource_type: "video",
      folder: "response/video",
      transformation: [
        {
          width: 1920,
          height: 1080,
          crop: "limit",
          quality: "auto",
        },
      ],
    };

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        url,
        {
          ...uploadOptions,
          resource_type: "auto",
          folder: "response/video",
          public_id: `response_video_${id}_${Date.now()}`,
          overwrite: true,
          use_filename: true,
          unique_filename: false,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result!);
        },
      );
    });

    await db.result.update({
      where: { id },
      data: {
        value: result.secure_url,
      },
    });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Cloudinary video upload error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Video upload failed",
    };
  }
}
