"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { errorToast, successToast } from "@/features/global/toast";
import { getProjectField } from "@/features/projects/actions/get-project-field";
import { FormElement } from "@/features/projects/dynamic-form";
import { submitFieldResponse } from "@/features/submit/actions/submit-field-response";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const SubmitForm = ({ params }: Props) => {
  const { projectId } = React.use(params);
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  const { isLoading: isLoadingFields } = useQuery({
    queryKey: ["projectFields", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return getProjectField(projectId);
    },
    onSuccess: (data) => {
      setFormElements(
        data.fields.map((field) => {
          const baseField = {
            id: field.id,
            label: field.label,
            type: field.type as FormElement["type"],
          };

          switch (field.type) {
            case "checkbox":
              return {
                ...baseField,
                checked: Boolean(field.checked),
              };
            case "input":
            case "textarea":
              return {
                ...baseField,
                value: field.value || "",
              };
            default:
              return {};
          }
        }) as FormElement[],
      );
    },
    onError: (error: { message: string }) => {
      errorToast(error.message, {
        description: "Please try again",
      });
    },
    enabled: Boolean(projectId),
  });

  const { mutateAsync: submitFormMutation, isLoading: isSubmitting } =
    useMutation({
      mutationFn: async (elements: FormElement[]) => {
        const formattedData = elements.map((element) => ({
          fieldId: element.id.toString(),
          label: element.label,
          type: element.type,
          value: "value" in element ? element.value : "",
          checked: "checked" in element ? element.checked : false,
        }));

        return submitFieldResponse(projectId, formattedData);
      },
      onSuccess: () => {
        successToast("Form submitted successfully", {
          description: "Your responses have been recorded.",
        });
      },
      onError: (error: { message: string }) => {
        errorToast(error.message || "Failed to submit form", {
          description: "Please try again",
        });
      },
    });

  const updateFormElement = (
    id: number | string,
    updates: Partial<FormElement>,
  ) => {
    setFormElements(
      (prev) =>
        prev.map((element) =>
          element.id === id ? { ...element, ...updates } : element,
        ) as FormElement[],
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 pt-6">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Submit Form
          </CardTitle>
          <CardDescription>Please fill out the form below</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingFields ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitFormMutation(formElements);
              }}
              className="space-y-6"
            >
              {formElements.map((element) => {
                switch (element.type) {
                  case "input":
                    return (
                      <div key={element.id} className="space-y-2">
                        <Label
                          htmlFor={`input-${element.id}`}
                          className="block text-sm font-medium"
                        >
                          {element.label}
                        </Label>
                        <Input
                          id={`input-${element.id}`}
                          value={element.value}
                          onChange={(e) =>
                            updateFormElement(element.id, {
                              value: e.target.value,
                            })
                          }
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                    );
                  case "textarea":
                    return (
                      <div key={element.id} className="space-y-2">
                        <Label
                          htmlFor={`textarea-${element.id}`}
                          className="block text-sm font-medium"
                        >
                          {element.label}
                        </Label>
                        <Textarea
                          id={`textarea-${element.id}`}
                          value={element.value}
                          onChange={(e) =>
                            updateFormElement(element.id, {
                              value: e.target.value,
                            })
                          }
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          rows={4}
                        />
                      </div>
                    );
                  case "checkbox":
                    return (
                      <div key={element.id} className="flex items-center">
                        <Checkbox
                          id={`checkbox-${element.id}`}
                          checked={element.checked}
                          onCheckedChange={(checked) =>
                            updateFormElement(element.id, {
                              checked: checked as boolean,
                            })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <Label
                          htmlFor={`checkbox-${element.id}`}
                          className="ml-2 block text-sm"
                        >
                          {element.label}
                        </Label>
                      </div>
                    );
                  default:
                    return null;
                }
              })}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Form"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitForm;
