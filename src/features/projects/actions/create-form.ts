"use server";

import { db } from "@/db";
import { FieldType } from "@prisma/client";
import { z } from "zod";

const fieldSchema = z.object({
  id: z.string().optional(),
  label: z.string().nonempty("Label is required"),
  type: z.enum([
    "input",
    "textarea",
    "button",
    "checkbox",
    "star",
    "image",
    "video",
  ]),
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
      parsedFields.map(async (field) => {
        const existingField = await db.field.findUnique({
          where: { id: field.id },
        });

        if (existingField) {
          return db.field.update({
            where: { id: existingField.id },
            data: {
              label: field.label,
              type: field.type as FieldType,
              value: field.value || null,
              checked: field.checked || null,
              order: field.order,
            },
          });
        } else {
          return db.field.create({
            data: {
              id: field.id || `${field.type}_${projectId}_${Date.now()}`,
              label: field.label,
              type: field.type as FieldType,
              value: field.value || null,
              checked: field.checked || null,
              formId: projectId,
              order: field.order,
            },
          });
        }
      }),
    );

    return createdFields.map((field) => field.type);
  } catch (error) {
    console.error("Error creating or updating form:", error);
    throw new Error("Failed to create or update form.");
  }
};
