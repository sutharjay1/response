"use server";

import { db } from "@/db";

type FieldResponse = {
  fieldId: string;
  value?: string;
  checked?: boolean;
  label: string;
  type: "input" | "textarea" | "button" | "checkbox" | "star" | "image";
};

export const submitFieldResponse = async (
  projectId: string,
  formData: FieldResponse[],
): Promise<{ success: boolean }> => {
  if (!formData || formData.length === 0) {
    throw new Error("Form data is empty or null");
  }

  try {
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
