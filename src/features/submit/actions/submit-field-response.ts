"use server";

import { db } from "@/db";
import { uploadVideoToCloudinary } from "./upload-video";

type FieldResponse = {
  fieldId: string;
  value?: string;
  checked?: boolean;
  label: string;
  type:
    | "input"
    | "textarea"
    | "button"
    | "checkbox"
    | "star"
    | "image"
    | "video";
};

export const submitFieldResponse = async (
  projectId: string,
  formData: (FieldResponse & { name: string; avatar: string })[],
): Promise<{ success: boolean }> => {
  if (!formData || formData.length === 0) {
    throw new Error("Form data is empty or null");
  }

  try {
    if (formData.some((d) => d.type === "video")) {
      const videoValue = formData.find((d) => d.type === "video")?.value;
      if (videoValue) {
        uploadVideoToCloudinary(videoValue, projectId);
      }
    }

    const dataToInsert = formData
      .filter((response) => response.fieldId)
      .map((response) => ({
        projectId,

        fieldId: response.fieldId,
        value:
          response.type === "checkbox"
            ? String(Boolean(response.checked))
            : response.value?.toString(),
        isFavorite: false,
        name: response.name,
        avatar: response.avatar,
      }));

    await db.result.createMany({
      data: dataToInsert,
      skipDuplicates: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting field responses:", error);
    throw new Error("Failed to submit form responses");
  }
};
