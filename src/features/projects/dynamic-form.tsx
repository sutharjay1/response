import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { errorToast, infoToast } from "../global/toast";
import { createForm } from "./actions/create-form";
import { getProjectField } from "./actions/get-project-field";
import { removeField } from "./actions/remove-field";

type InputField = {
  id: number;
  type: "input";
  label: string;
  value: string;
};

type TextareaField = {
  id: number;
  type: "textarea";
  label: string;
  value: string;
};

type CheckboxField = {
  id: number;
  type: "checkbox";
  label: string;
  checked: boolean;
};

export type FormElement = InputField | TextareaField | CheckboxField;

const DynamicForm = ({ projectId }: { projectId: string }) => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const debouncedFormElements = useDebounce(formElements, 1000);

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

  useEffect(() => {
    const saveForm = async () => {
      if (debouncedFormElements.length === 0) return;

      const loadId = toast.loading("Saving form...", {
        position: "bottom-right",
      });
      try {
        setIsSaving(true);

        const fields = debouncedFormElements.map((element, index) => ({
          id: element.id.toString(),
          label: element.label,
          type: element.type,
          value: "value" in element ? element.value || "" : "",
          checked: "checked" in element ? Boolean(element.checked) : false,
          order: index,
        }));

        await createForm({
          projectId,
          fields,
        }).then(() =>
          infoToast("Form saved", {
            description: `Your form has been saved updated.`,
          }),
        );
      } catch (error) {
        console.error(error);
        errorToast("Error saving form", {
          description: "Please try again",
        });
        toast.dismiss(loadId);
      } finally {
        setIsSaving(false);
        toast.dismiss(loadId);
      }
    };

    saveForm();
  }, [debouncedFormElements, projectId]);

  const addField = (type: FormElement["type"]) => {
    const baseField = {
      id: Date.now(),
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    };

    const newField = {
      ...baseField,
      type,
      ...(type === "input" || type === "textarea" ? { value: "" } : {}),
      ...(type === "checkbox" ? { checked: false } : {}),
    } as FormElement;

    setFormElements([...formElements, newField]);
  };

  const handleChange = (id: number, key: string, value: string | boolean) => {
    setFormElements(
      formElements.map((element) =>
        element.id === id ? { ...element, [key]: value } : element,
      ),
    );
  };

  const moveElement = (index: number, direction: "up" | "down") => {
    const newElements = [...formElements];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newElements.length) {
      [newElements[index], newElements[newIndex]] = [
        newElements[newIndex],
        newElements[index],
      ];
      setFormElements(newElements);
    }
  };

  const removeElement = async (id: number) => {
    await removeField(projectId, id.toString());
    setFormElements(formElements.filter((element) => element.id !== id));
  };

  const renderFormElement = (element: FormElement, index: number) => {
    return (
      <Card className="group relative transition-all hover:shadow-md">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="cursor-move opacity-40 transition-opacity group-hover:opacity-100">
                <GripVertical className="h-5 w-5" />
              </div>
              <Badge variant="secondary" className="ml-2 font-medium">
                {element.type}
              </Badge>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveElement(index, "up")}
                disabled={index === 0}
                className="h-8 w-8 rounded-xl p-0"
              >
                <ChevronUp className="h-4 w-4" />
                <span className="sr-only">Move up</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveElement(index, "down")}
                disabled={index === formElements.length - 1}
                className="h-8 w-8 rounded-xl p-0"
              >
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Move down</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeElement(element.id)}
                className="h-8 w-8 rounded-xl p-0 text-destructive hover:text-destructive/80"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove element</span>
              </Button>
            </div>
          </div>
          <div className="mb-2 flex items-center justify-between rounded-3xl">
            <div className="space-y-1">
              <div className="space-y-2">
                <Label
                  htmlFor={`${element.id}-label`}
                  className="text-sm font-medium"
                >
                  Label
                </Label>
                <Input
                  id={`${element.id}-label`}
                  value={element.label}
                  onChange={(e) =>
                    handleChange(element.id, "label", e.target.value)
                  }
                  placeholder="Enter field label"
                  className="mt-1 transition-colors focus-visible:ring-1"
                />
              </div>

              {(element.type === "input" || element.type === "textarea") && (
                <div>
                  <Label
                    htmlFor={`${element.id}-value`}
                    className="text-sm font-medium"
                  >
                    Default Value
                  </Label>
                  {element.type === "input" ? (
                    <Input
                      id={`${element.id}-value`}
                      value={element.value}
                      onChange={(e) =>
                        handleChange(element.id, "value", e.target.value)
                      }
                      placeholder="Enter default value"
                      className="transition-colors focus-visible:ring-1"
                    />
                  ) : (
                    <Textarea
                      id={`${element.id}-value`}
                      value={element.value}
                      onChange={(e) =>
                        handleChange(element.id, "value", e.target.value)
                      }
                      placeholder="Enter default value"
                      className="mt-1 min-h-[100px] transition-colors focus-visible:ring-1"
                    />
                  )}
                </div>
              )}

              {element.type === "checkbox" && (
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={element.checked}
                    onChange={(e) =>
                      handleChange(element.id, "checked", e.target.checked)
                    }
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600">Default state</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container gap-6 space-x-9">
      <div className="flex flex-1 flex-row gap-8 py-4">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4"> */}

        <Card className="w-full">
          <CardHeader className="pt-6">
            <div className="flex items-center justify-between">
              <CardTitle>Form Builder</CardTitle>
              <CardTitle>
                {isSaving ? (
                  <Badge variant="default">Saving...</Badge>
                ) : (
                  <Badge variant="default">Saved</Badge>
                )}
              </CardTitle>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={() => addField("input")}
                variant="outline"
                className="bg-blue-50 hover:bg-blue-100"
              >
                Add Input
              </Button>
              <Button
                onClick={() => addField("textarea")}
                variant="outline"
                className="bg-green-50 hover:bg-green-100"
              >
                Add Textarea
              </Button>
              <Button
                onClick={() => addField("checkbox")}
                variant="outline"
                className="bg-orange-50 hover:bg-orange-100"
              >
                Add Checkbox
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formElements.map((element, index) =>
                renderFormElement(element, index),
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="pt-6">
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {formElements.map((element) => {
                switch (element.type) {
                  case "input":
                    return (
                      <div key={element.id} className="space-y-2">
                        <Label>{element.label}</Label>
                        <Input value={element.value} readOnly />
                      </div>
                    );
                  case "textarea":
                    return (
                      <div key={element.id} className="space-y-2">
                        <Label>{element.label}</Label>
                        <Textarea value={element.value} readOnly />
                      </div>
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
                          readOnly
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DynamicForm;
