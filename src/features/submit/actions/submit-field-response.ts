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
  formData: FieldResponse[]
): Promise<{ success: boolean }> => {
  try {
    // Map formData to the required Prisma format
    const dataToInsert = formData.map((response) => ({
      projectId,
      fieldId: response.fieldId,
      value: response.value,
      // Convert checked value to string if it's a checkbox
    //   value: response.type === "checkbox" ? `${response.checked}` : response.value,
    }));

    // Bulk insert using Prisma's `createMany` method
    await db.result.createMany({
      data: dataToInsert,
      skipDuplicates: true, // Avoid duplicate entries
    });

    return { success: true };
  } catch (error) {
    console.error("Error submitting field responses:", error);
    throw new Error("Failed to submit form responses");
  }
};
