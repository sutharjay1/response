"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { errorToast, successToast } from "@/features/global/toast";
import { getProjectField } from "@/features/projects/actions/get-project-field";
import { FormElement } from "@/features/projects/dynamic-form";
import { submitFieldResponse } from "@/features/submit/actions/submit-field-response";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerOne, Star } from "@mynaui/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const SubmitForm = ({ params }: Props) => {
  const { projectId } = React.use(params);
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  const generateFormSchema = (elements: FormElement[]) => {
    const schemaFields: { [key: string]: z.ZodType } = {};

    elements.forEach((element) => {
      switch (element.type) {
        case "input":
        case "textarea":
          schemaFields[element.id] = z
            .string({
              required_error: `${element.label} is required`,
              invalid_type_error: `${element.label} must be a string`,
            })
            .trim()
            .min(1, { message: `${element.label} cannot be empty` });
          break;
        case "checkbox":
          schemaFields[element.id] = z.boolean({
            required_error: `${element.label} must be checked`,
          });
          break;
        case "star":
          schemaFields[element.id] = z
            .string({
              required_error: `${element.label} is required`,
              invalid_type_error: `${element.label} must be a rating`,
            })
            .refine((val) => ["1", "2", "3", "4", "5"].includes(val), {
              message: "Please select a rating",
            });
          break;
      }
    });

    return z.object(schemaFields);
  };

  const { isLoading: isLoadingFields, error: fieldsLoadError } = useQuery({
    queryKey: ["projectFields", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return getProjectField(projectId);
    },
    onSuccess: (data) => {
      const mappedElements = data.fields.map((field) => {
        const baseField = {
          id: field.id,
          label: field.label,
          type: field.type as FormElement["type"],
        };

        switch (field.type) {
          case "checkbox":
            return {
              ...baseField,
              checked: false,
            };
          case "input":
          case "textarea":
            return {
              ...baseField,
              value: "",
            };
          case "star":
            return {
              ...baseField,
              value: "0",
            };
          default:
            return {};
        }
      }) as FormElement[];

      setFormElements(mappedElements);
    },
    onError: (error: { message: string }) => {
      errorToast(error.message, {
        position: "top-center",
      });
    },
    enabled: Boolean(projectId),
  });

  useEffect(() => {
    if (fieldsLoadError) {
      errorToast("Form Loading Error", {
        position: "top-center",
      });
    }
  }, [fieldsLoadError]);

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
        successToast("Form Submitted Successfully", {
          description: "Your responses have been recorded.",
          position: "top-center",
          duration: 3000,
        });
        reset();
      },
      onError: (error: { message: string }) => {
        errorToast(error.message, {
          duration: 5000,
        });
      },
    });

  const FormSchema = React.useMemo(
    () => generateFormSchema(formElements),
    [formElements],
  );

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitted },
    reset,
  } = useForm({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      Object.values(errors)
        .map((error) => error?.message)
        .filter(Boolean)
        .map((error) => {
          errorToast(error!.toString(), {
            position: "top-center",
          });
        });
    }
  }, [errors, isSubmitted]);

  //  eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    const isAllFieldsFilled = formElements.every((element) => {
      switch (element.type) {
        case "input":
        case "textarea":
          return data[element.id]?.trim() !== "";
        case "checkbox":
          return data[element.id] === true;
        case "star":
          return { ...element, value: data[element.id] };
        default:
          return false;
      }
    });

    if (!isAllFieldsFilled) {
      errorToast("Please fill out all required fields.", {
        position: "top-center",
      });
      return;
    }

    const updatedElements = formElements.map((element) => {
      switch (element.type) {
        case "input":
        case "textarea":
          return { ...element, value: data[element.id] };
        case "checkbox":
          return { ...element, checked: data[element.id] };
        case "star":
          return { ...element, value: data[element.id] };
        default:
          return element;
      }
    });

    submitFormMutation(updatedElements);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md overflow-hidden bg-sidebar transition-all hover:shadow-md">
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <h2 className="text-lg font-semibold text-primary">Submit Form</h2>
            <p className="text-sm text-muted-foreground">
              Please fill out all required fields
            </p>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="px-4 pt-4 sm:px-6 sm:pt-6">
            {isLoadingFields ? (
              <div className="flex h-40 items-center justify-center">
                <SpinnerOne
                  className="h-6 w-6 animate-spin font-semibold text-primary"
                  strokeWidth={2}
                />
              </div>
            ) : (
              <div className="space-y-6">
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
                          <Controller
                            name={element.id.toString()}
                            control={control}
                            render={({ field }) => (
                              <>
                                <Input
                                  id={`input-${element.id}`}
                                  {...field}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                                {errors[element.id] && (
                                  <p className="mt-1 text-xs text-red-500">
                                    {errors[element.id]?.message as string}
                                  </p>
                                )}
                              </>
                            )}
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
                          <Controller
                            name={element.id.toString()}
                            control={control}
                            render={({ field }) => (
                              <>
                                <Textarea
                                  id={`textarea-${element.id}`}
                                  {...field}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  rows={4}
                                />
                                {errors[element.id] && (
                                  <p className="mt-1 text-xs text-red-500">
                                    {errors[element.id]?.message as string}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </div>
                      );
                    case "checkbox":
                      return (
                        <div key={element.id} className="space-y-2">
                          <Controller
                            name={element.id.toString()}
                            control={control}
                            render={({ field: { value, onChange } }) => (
                              <div className="flex items-center">
                                <Checkbox
                                  id={`checkbox-${element.id}`}
                                  checked={value}
                                  onCheckedChange={onChange}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <Label
                                  htmlFor={`checkbox-${element.id}`}
                                  className="ml-2 block text-sm"
                                >
                                  {element.label}
                                </Label>
                                {errors[element.id] && (
                                  <p className="ml-2 text-xs text-red-500">
                                    {errors[element.id]?.message as string}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      );
                    case "star":
                      return (
                        <div key={element.id} className="space-y-2">
                          <Label
                            className="block text-sm font-medium"
                            htmlFor={`star-${element.id}`}
                          >
                            {element.label}
                          </Label>
                          <Controller
                            name={element.id.toString()}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <div className="flex items-center">
                                {(["1", "2", "3", "4", "5"] as const).map(
                                  (rating) => (
                                    <Button
                                      key={rating}
                                      id={`star-${element.id}`}
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => {
                                        onChange(rating);
                                      }}
                                      className={`p-1 ${
                                        value >= rating
                                          ? "text-yellow-500"
                                          : "text-gray-300"
                                      }`}
                                    >
                                      {/* <Star
                                        className="h-5 w-5"
                                        fill={
                                          value >= rating
                                            ? "currentColor"
                                            : "none"
                                        }
                                      /> */}
                                      <Star
                                        className="h-6 w-6 font-semibold"
                                        strokeWidth={2}
                                        fill={
                                          value >= rating
                                            ? "currentColor"
                                            : "none"
                                        }
                                      />
                                    </Button>
                                  ),
                                )}

                                {errors[element.id] && (
                                  <p className="ml-2 text-xs text-red-500">
                                    {errors[element.id]?.message as string}
                                  </p>
                                )}
                              </div>
                            )}
                          />
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || isLoadingFields}
            >
              Submit Form 🚀
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SubmitForm;
