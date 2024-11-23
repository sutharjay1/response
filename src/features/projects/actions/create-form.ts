"use server";

import { db } from "@/db";
import { z } from "zod";

const fieldSchema = z.object({
  label: z.string().nonempty("Label is required"),
  type: z.enum(["input", "textarea", "button", "checkbox"]),
  value: z.string().optional(),
  checked: z.boolean().optional(),
  order: z.number(),
});

const fieldsSchema = z.array(fieldSchema);

type TField = z.infer<typeof fieldSchema>;

export const createForm = async ({
  projectId,
  fields,
}: {
  projectId: string;
  fields: TField[];
}) => {
  try {
    const parsedFields = fieldsSchema.parse(fields);

    const createdFields = await Promise.all(
      parsedFields.map((field) =>
        db.field.create({
          data: {
            label: field.label,
            type: field.type,
            value: field.value || null,
            checked: field.checked || null,
            formId: projectId,
            order: field.order,
          },
        }),
      ),
    );

    return createdFields;
  } catch (error) {
    console.error("Error creating form:", error);
    throw new Error("Failed to create or update form.");
  }
};
