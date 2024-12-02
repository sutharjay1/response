import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, GripVertical, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckboxField, InputField, StarField, TextareaField } from "./types";
import { getProjectField } from "./actions/get-project-field";
import { errorToast, successToast } from "../global/toast";
import { createForm } from "./actions/create-form";
import { removeField } from "./actions/remove-field";

export type FormElement =
  | InputField
  | TextareaField
  | CheckboxField
  | StarField;

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
            case "star":
              return {
                ...baseField,
                value: field.value || "1",
              };
            default:
              return {};
          }
        }) as FormElement[],
      );
    },
    onError: (error: { message: string }) => {
      errorToast(error.message, {
        position: "top-center",
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
          value: "value" in element ? element.value : "",
          checked: "checked" in element ? Boolean(element.checked) : false,
          order: index,
        }));

        await createForm({
          projectId,
          fields,
        }).then(() => successToast("Form saved", {}));
      } catch (error) {
        console.error(error);
        errorToast("Error saving form", {
          position: "top-center",
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
      ...(type === "star" ? { value: "0" } : {}),
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
                <div key={`${element.id}-value`}>
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
                      className="w-full transition-colors focus-visible:ring-1"
                    />
                  ) : (
                    <Textarea
                      id={`${element.id}-value`}
                      value={element.value}
                      onChange={(e) =>
                        handleChange(element.id, "value", e.target.value)
                      }
                      placeholder="Enter default value"
                      className="mt-1 min-h-[100px] w-full transition-colors focus-visible:ring-1"
                    />
                  )}
                </div>
              )}

              {element.type === "checkbox" && (
                <div className="mt-1 flex items-center gap-2" key={element.id}>
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

              {element.type === "star" && (
                <div className="mt-4 flex items-center gap-2" key={element.id}>
                  <Label className="text-sm font-medium">Default Rating</Label>
                  <div className="flex">
                    {(["1", "2", "3", "4", "5"] as const).map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          handleChange(element.id, "value", rating)
                        }
                        className={`p-1 ${
                          element.value === rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      >
                        <Star className="h-5 w-5" fill="currentColor" />
                      </button>
                    ))}
                  </div>
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
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-[30%,70%]">
        <Card className="">
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
              <Button
                onClick={() => addField("star")}
                variant="outline"
                className="bg-orange-50 hover:bg-orange-100"
              >
                Add Star
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

        <Card className="mx-auto flex w-full items-center justify-center">
          <Card className="w-full max-w-md overflow-hidden bg-sidebar transition-all hover:shadow-md">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-primary">Preview</h2>
                <p className="text-sm text-muted-foreground">
                  View how your form will look like
                </p>
              </div>
            </CardHeader>
            <CardContent className="px-4 pt-4 sm:px-6">
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
                    case "star":
                      return (
                        <div key={element.id} className="space-y-2">
                          <Label>{element.label}</Label>
                          <div className="flex">
                            {(["1", "2", "3", "4", "5"] as const).map(
                              (rating) => (
                                <Star
                                  key={rating}
                                  className={`h-6 w-6 ${
                                    parseInt(element.value) >= parseInt(rating)
                                      ? "text-yellow-500"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                />
                              ),
                            )}
                          </div>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
              <Button type="submit" className="w-full" disabled>
                Submit Form
              </Button>
            </CardFooter>
          </Card>
        </Card>
      </div>
    </div>
  );
};

export default DynamicForm;
