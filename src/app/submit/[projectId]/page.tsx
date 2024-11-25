// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// // import { Textarea } from "@/components/ui/textarea";
// // import { errorToast, successToast } from "@/features/global/toast";
// // import { getProjectField } from "@/features/projects/actions/get-project-field";
// // import { FormElement } from "@/features/projects/dynamic-form";
// // import { submitFieldResponse } from "@/features/submit/actions/submit-field-response";
// // import { useMutation, useQuery } from "@tanstack/react-query";
// // import React, { useState } from "react";

// // type Props = {
// //   params: Promise<{
// //     projectId: string;
// //   }>;
// // };

// // const SubmitForm = ({ params }: Props) => {
// //   const { projectId } = React.use(params);
// //   const [formElements, setFormElements] = useState<FormElement[]>([]);

// //   const { isLoading, error } = useQuery({
// //     queryKey: ["projectFields", projectId],
// //     queryFn: async () => {
// //       if (!projectId) {
// //         throw new Error("Project ID is required");
// //       }
// //       return getProjectField(projectId);
// //     },
// //     onSuccess: (data) => {
// //       console.log({
// //         data,
// //       });
// //       setFormElements(
// //         data.fields.map((field) => {
// //           const baseField = {
// //             id: field.id,
// //             label: field.label,
// //             type: field.type as FormElement["type"],
// //           };

// //           switch (field.type) {
// //             case "checkbox":
// //               return {
// //                 ...baseField,
// //                 checked: Boolean(field.checked),
// //               };
// //             case "input":
// //             case "textarea":
// //               return {
// //                 ...baseField,
// //                 value: field.value || "",
// //               };
// //             case "button":
// //               return {
// //                 ...baseField,
// //                 value: field.value,
// //               };
// //             default:
// //               return {};
// //           }
// //         }) as FormElement[],
// //       );
// //     },
// //     onError: (error: any) => {
// //       errorToast(error.message, {
// //         description: "Please try again",
// //       });
// //     },
// //     enabled: Boolean(projectId), // Ensure query only runs when projectId is truthy
// //   });

// //   const { mutateAsync: submitFormMutation, isLoading: isSubmitting } =
// //     useMutation({
// //       mutationFn: async (elements: FormElement[]) => {
// //         const formattedData = elements.map((element) => ({
// //           fieldId: element.id.toString(),
// //           label: element.label,
// //           type: element.type,
// //           value: "value" in element ? element.value : undefined,
// //           checked: "checked" in element ? element.checked : undefined,
// //         }));

// //         return submitFieldResponse(projectId, formattedData);
// //       },
// //       onSuccess: () => {
// //         successToast("Form submitted successfully", {
// //           description: "Your responses have been recorded.",
// //         });
// //       },
// //       onError: (error: any) => {
// //         errorToast(error.message || "Failed to submit form", {
// //           description: "Please try again",
// //         });
// //       },
// //     });

// //   const handleSubmit = async () => {
// //     const formattedData = formElements.map((element) => {
// //       if ("value" in element) {
// //         return {
// //           fieldId: element.id.toString(),
// //           label: element.label,
// //           type: element.type,
// //           value: element.value,
// //         };
// //       } else {
// //         return {
// //           fieldId: element.id.toString(),
// //           label: element.label,
// //           type: element.type,
// //         };
// //       }
// //     });

// //     try {
// //       await submitFieldResponse(projectId, formattedData);
// //       successToast("Form submitted successfully", {
// //         description: "Your responses have been recorded.",
// //       });
// //     } catch (error: any) {
// //       errorToast(error.message || "Failed to submit form", {
// //         description: "Please try again",
// //       });
// //     }
// //   };

// //   return (
// //     <div className="flex w-full bg-sidebar">
// //       <SidebarProvider>
// //         <SidebarInset className="m-4 rounded-xl bg-background">
// //           <div className="flex flex-col items-center justify-center gap-4 p-4">
// //             <div className="space-y-6">
// //               {formElements.map((element) => {
// //                 switch (element.type) {
// //                   case "input":
// //                     return (
// //                       <div key={element.id} className="space-y-2">
// //                         <Label>{element.label}</Label>
// //                         <Input value={element.value} />
// //                       </div>
// //                     );
// //                   case "textarea":
// //                     return (
// //                       <div key={element.id} className="space-y-2">
// //                         <Label>{element.label}</Label>
// //                         <Textarea value={element.value} />
// //                       </div>
// //                     );
// //                   case "button":
// //                     return (
// //                       <Button
// //                         key={element.id}
// //                         className="mr-2"
// //                         variant="secondary"
// //                       >
// //                         {element.label}
// //                       </Button>
// //                     );
// //                   case "checkbox":
// //                     return (
// //                       <div
// //                         key={element.id}
// //                         className="flex items-center space-x-2"
// //                       >
// //                         <input
// //                           type="checkbox"
// //                           checked={element.checked}
// //                           readOnly
// //                           className="mr-2 rounded"
// //                         />
// //                         <Label>{element.label}</Label>
// //                       </div>
// //                     );
// //                   default:
// //                     return null;
// //                 }
// //               })}
// //             </div>

// //             <Button
// //               className="mt-6 w-full"
// //               onClick={() => submitFormMutation(formElements)}
// //               disabled={isSubmitting}
// //             >
// //               {isSubmitting ? "Submitting..." : "Submit Form"}
// //             </Button>
// //           </div>

// //         </SidebarInset>
// //       </SidebarProvider>
// //     </div>
// //   );
// // };

// // export default SubmitForm;

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { errorToast, successToast } from "@/features/global/toast";
import { getProjectField } from "@/features/projects/actions/get-project-field";
import { FormElement } from "@/features/projects/dynamic-form";
import { submitFieldResponse } from "@/features/submit/actions/submit-field-response";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const SubmitForm = ({ params }: Props) => {
  const { projectId } = React.use(params);
  const [formElements, setFormElements] = useState<FormElement[]>([]);

  const {} = useQuery({
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
            case "button":
              return {
                ...baseField,
                value: field.value,
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

        console.log({
          projectId,
          formattedData,
        });

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
    <Card>
      <CardContent>
        <div className="flex items-center justify-center bg-sidebar">
          <SidebarProvider>
            <SidebarInset className="m-4 rounded-xl bg-background">
              <div className="flex w-fit flex-col items-center justify-center gap-4 p-4">
                <div className="space-y-6">
                  {formElements.map((element) => {
                    switch (element.type) {
                      case "input":
                        return (
                          <div key={element.id} className="space-y-2">
                            <Label>{element.label}</Label>
                            <Input
                              value={element.value}
                              onChange={(e) =>
                                updateFormElement(element.id, {
                                  value: e.target.value,
                                })
                              }
                            />
                          </div>
                        );
                      case "textarea":
                        return (
                          <div key={element.id} className="space-y-2">
                            <Label>{element.label}</Label>
                            <Textarea
                              value={element.value}
                              onChange={(e) =>
                                updateFormElement(element.id, {
                                  value: e.target.value,
                                })
                              }
                            />
                          </div>
                        );
                      case "button":
                        return (
                          <Button
                            key={element.id}
                            className="mr-2"
                            variant="secondary"
                          >
                            {element.label}
                          </Button>
                        );
                      case "checkbox":
                        return (
                          <div
                            key={element.id}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={element.checked}
                              onChange={(e) =>
                                updateFormElement(element.id, {
                                  checked: e.target.checked,
                                })
                              }
                              className="mr-2 rounded"
                            />
                            <Label>{element.label}</Label>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>

                <Button
                  className="mt-6 w-fit"
                  onClick={() => submitFormMutation(formElements)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
                </Button>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmitForm;
