"use server";

import { db } from "@/db";
import { z } from "zod";

const fieldSchema = z.object({
  id: z.string().optional(),
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
  console.log("Received createForm request");
  console.log("Project ID:", projectId);
  console.log("Fields:", JSON.stringify(fields, null, 2));

  try {
    // Validate the fields
    console.log("Validating fields...");
    const parsedFields = fieldsSchema.parse(fields);
    console.log("Parsed fields:", JSON.stringify(parsedFields, null, 2));

    // Create fields in the database
    console.log("Creating fields in the database...");
    const createdFields = await Promise.all(
      parsedFields.map(async (field) => {
        console.log("Creating field:", field);
        console.log("Processing field:", field);

        // Upsert logic: Check for existing field and update or create
        const existingField = await db.field.findFirst({
          where: {
            formId: projectId,
            label: field.label,
          },
        });

        if (existingField) {
          console.log("Updating existing field:", existingField.id);
          return db.field.update({
            where: { id: existingField.id },
            data: {
              type: field.type,
              value: field.value || null,
              checked: field.checked || null,
              order: field.order,
            },
          });
        }

        console.log("Creating new field:", field.label);
        return db.field.create({
          data: {
            label: field.label,
            type: field.type,
            value: field.value || null,
            checked: field.checked || null,
            formId: projectId,
            order: field.order,
          },
        });
      }),
    );

    console.log("Created fields:", JSON.stringify(createdFields, null, 2));
    const fieldTypes = createdFields.map((field) => {
      if (
        field.type === "input" ||
        field.type === "textarea" ||
        field.type === "button" ||
        field.type === "checkbox"
      ) {
        return field.type;
      }
      throw new Error(`Unexpected field type: ${field.type}`);
    });

    console.log("Returning field types:", fieldTypes);

    return fieldTypes;
  } catch (error) {
    console.error("Error creating form:", error);
    throw new Error("Failed to create or update form.");
  }
};
