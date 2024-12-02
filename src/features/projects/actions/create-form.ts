"use server";

import { db } from "@/db";
import { FieldType } from "@prisma/client";
import { z } from "zod";

const fieldSchema = z.object({
  id: z.string().optional(),
  label: z.string().nonempty("Label is required"),
  type: z.enum(["input", "textarea", "button", "checkbox", "star"]),
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
        const existingField = await db.field.findFirst({
          where: {
            formId: projectId,
            label: field.label,
          },
        });

        if (existingField) {
          return db.field.update({
            where: { id: existingField.id },
            data: {
              type: field.type as FieldType,
              value: field.value || null,
              checked: field.checked || null,
              order: field.order,
            },
          });
        }

        return db.field.create({
          data: {
            label: field.label,
            type: field.type as FieldType,
            value: field.value || null,
            checked: field.checked || null,
            formId: projectId,
            order: field.order,
          },
        });
      }),
    );

    const fieldTypes = createdFields.map((field) => {
      if (
        field.type === "input" ||
        field.type === "textarea" ||
        field.type === "checkbox" ||
        field.type === "star"
      ) {
        return field.type;
      }
      throw new Error(`Unexpected field type: ${field.type}`);
    });

    return fieldTypes;
  } catch (error) {
    console.error("Error creating form:", error);
    throw new Error("Failed to create or update form.");
  }
};
