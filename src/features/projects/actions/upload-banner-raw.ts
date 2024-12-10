"use server";
import { db } from "@/db";
import { v2 as cloudinary } from "cloudinary";
import { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type UploadResult = {
  success: boolean;
  data?: UploadApiResponse;
  error?: string;
};

export async function uploadBannerToCloudinary({
  data,
  id,
}: {
  data: FormData;
  id: string;
}): Promise<UploadResult> {
  try {
    const file = data.get("file") as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = buffer.toString("base64");
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        `data:${file.type};base64,${base64File}`,
        {
          resource_type: "auto",
          folder: "response/banner",
          public_id: `response_banner_${id}_`,
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
    await db.project.update({
      where: { id },
      data: {
        banner: result.secure_url,
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
}
