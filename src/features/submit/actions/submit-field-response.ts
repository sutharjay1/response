"use server";

import { db } from "@/db";

type FieldResponse = {
  fieldId: string;
  value?: string;
  checked?: boolean;
  label: string;
  type: "input" | "textarea" | "button" | "checkbox";
};

export const submitFieldResponse = async (
  projectId: string,
  formData: FieldResponse[],
): Promise<{ success: boolean }> => {
  try {
    const dataToInsert = formData.map((response) => ({
      projectId,
      fieldId: response.fieldId,
      value:
        response.type === "input" ? response.value : String(response.checked),
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
