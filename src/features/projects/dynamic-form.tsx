import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/use-debounce";
import {
  CheckSquare,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Keyboard,
  Star,
  TypeBold,
  Video,
  X,
} from "@mynaui/icons-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import Hint from "../global/hint";
import { errorToast, successToast } from "../global/toast";
import { createForm } from "./actions/create-form";
import { getProjectField } from "./actions/get-project-field";
import { getProjectById } from "./actions/get-projects";
import { removeField } from "./actions/remove-field";
import { BannerUploadDropZone } from "./banner-upload-button";
import { ImageUploadDropZone } from "./image-upload-button";
import { FormElement } from "./types";

const DynamicForm = ({ projectId }: { projectId: string }) => {
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [banner, setBanner] = useState<string>("");

  const { data: project } = useQuery({
    queryKey: ["currentProject", projectId],
    queryFn: () => getProjectById(projectId as string),
    enabled: !!projectId,
    onSuccess: (data) => {
      setBanner(data.banner);
    },
  });

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
            case "image":
              return {
                ...baseField,
                value: field.value || "",
              };
            case "video":
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
        position: "top-center",
      });
    },
    enabled: Boolean(projectId),
  });

  useEffect(() => {
    const saveForm = async () => {
      if (debouncedFormElements.length === 0) return;

      const validFields = debouncedFormElements.filter(
        (field) => field.type !== "image" || field.value,
      );

      if (validFields.length === 0) return;

      try {
        setIsSaving(true);

        const fields = debouncedFormElements.map((element, index) => ({
          id: element.id.toString(),
          label: element.label,
          type: element.type,
          value:
            (element.type === "image" || element.type === "video") &&
            !element.value
              ? undefined
              : "value" in element
                ? element.value
                : "",
          checked: "checked" in element ? Boolean(element.checked) : false,
          order: index,
        }));

        await createForm({
          projectId,
          fields,
        }).then(() => {
          successToast("Form saved", {});
        });
      } catch (error) {
        console.error(error);
        errorToast("Error saving form", {
          position: "top-center",
        });
      } finally {
        setIsSaving(false);
      }
    };

    saveForm();
  }, [debouncedFormElements, projectId]);

  const addField = (type: FormElement["type"]) => {
    const baseField = {
      id: `${type}_${projectId}_${Date.now()}`,
      label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
    };

    const newField = {
      ...baseField,
      type,
      ...(type === "input" || type === "textarea" ? { value: "" } : {}),
      ...(type === "checkbox" ? { checked: false } : {}),
      ...(type === "star" ? { value: "0" } : {}),
      ...(type === "image" ? { value: "" } : {}),
      ...(type === "video" ? { value: "" } : {}),
    } as FormElement;

    setFormElements([...formElements, newField]);
  };

  const handleChange = (id: string, key: string, value: string | boolean) => {
    setFormElements((prevElements) =>
      prevElements.map((element) =>
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

  const removeElement = async (id: string) => {
    await removeField(projectId, id.toString());
    setFormElements(formElements.filter((element) => element.id !== id));
  };

  const renderFormIcon = (type: FormElement["type"]) => {
    switch (type) {
      case "input":
        return <TypeBold className="h-6 w-6" />;
      case "textarea":
        return <Keyboard className="h-6 w-6" />;
      case "checkbox":
        return <CheckSquare className="h-6 w-6" />;
      case "star":
        return <Star className="h-6 w-6" />;
      case "image":
        return <ImageIcon className="h-6 w-6" />;
      case "video":
        return <Video className="h-6 w-6" />;
      default:
        return null;
    }
  };

  const renderFormElement = (element: FormElement, index: number) => {
    return (
      <Card
        className="group relative bg-sidebar transition-all hover:shadow"
        key={element.id}
      >
        <CardContent className="space-y-2 p-6">
          <div className="mb-6 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Badge
                icon={renderFormIcon(element.type)}
                variant="default"
                className="border border-input text-sm font-medium"
              >
                {element.type}
              </Badge>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveElement(index, "up")}
                disabled={index === 0}
                className="h-8 w-8 rounded-xl p-0 shadow"
              >
                <ChevronUp className="h-4 w-4" />
                <span className="sr-only">Move up</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveElement(index, "down")}
                disabled={index === formElements.length - 1}
                className="h-8 w-8 rounded-xl p-0 shadow"
              >
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Move down</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeElement(element.id)}
                className="h-8 w-8 rounded-xl p-0 text-destructive shadow hover:text-destructive/80"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove element</span>
              </Button>
            </div>
          </div>
          <div className="mb-2 flex w-full items-center justify-between rounded-3xl">
            <div className="w-full space-y-2">
              <div className="flex flex-col space-y-2">
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
                  className="mt-1 w-full border border-gray-300 bg-background transition-colors focus:border-indigo-500 focus:ring-indigo-500 focus-visible:ring-1 md:w-full"
                />
              </div>

              {(element.type === "input" || element.type === "textarea") && (
                <div
                  key={`${element.id}-value`}
                  className="w-full gap-2 space-y-1"
                >
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
                      className="w-full border border-gray-300 bg-background transition-colors focus:border-indigo-500 focus:ring-indigo-500 focus-visible:ring-1 md:w-full"
                    />
                  ) : (
                    <Textarea
                      id={`${element.id}-value`}
                      value={element.value}
                      onChange={(e) =>
                        handleChange(element.id, "value", e.target.value)
                      }
                      placeholder="Enter default value"
                      className="mt-1 min-h-[100px] w-full border border-gray-300 bg-background transition-colors focus:border-indigo-500 focus:ring-indigo-500 focus-visible:ring-1 md:w-full"
                    />
                  )}
                </div>
              )}

              {element.type === "checkbox" && (
                <div className="mt-1 flex items-center gap-2" key={element.id}>
                  <Checkbox
                    id={`checkbox-${element.id}`}
                    onChange={(e) =>
                      handleChange(
                        element.id,
                        "checked",
                        (e.currentTarget as HTMLInputElement).checked,
                      )
                    }
                    checked={element.checked}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-600">Default state</span>
                </div>
              )}

              {element.type === "star" && (
                <div className="mt-4 flex items-center gap-2" key={element.id}>
                  <Label className="text-sm font-medium">Default Rating</Label>
                  <div className="flex">
                    {(["1", "2", "3", "4", "5"] as const).map((rating) => (
                      <Button
                        size="icon"
                        key={rating}
                        variant={"ghost"}
                        onClick={() =>
                          handleChange(element.id, "value", rating)
                        }
                      >
                        <Star
                          key={rating}
                          className={`h-6 w-6 ${
                            parseInt(element.value) >= parseInt(rating)
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {element.type === "image" && (
                <div className="mt-2 flex items-center gap-2" key={element.id}>
                  <ImageUploadDropZone
                    handleChange={handleChange}
                    id={element.id}
                    setFormElements={setFormElements}
                  />
                </div>
              )}

              {element.type === "video" && (
                <div
                  className="mt-2 flex w-full items-center gap-2"
                  key={element.id}
                >
                  <Hint
                    label="Customer can record a video"
                    side="top"
                    align="center"
                  >
                    <Card className="w-full">
                      <CardContent className="cursor-pointer border-8 border-dashed border-[#7c533a] p-6">
                        <div
                          className={`flex flex-col items-center justify-center rounded-lg transition-colors`}
                        >
                          <div className="flex flex-col items-center justify-center text-center">
                            <Video className="mb-1 h-24 w-24 text-muted-foreground" />

                            <p className="mb-2 text-lg font-semibold">
                              Record a video
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Attach to accept a video
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Hint>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const { isMobile } = useSidebar();

  return (
    <div className="container relative h-screen w-full gap-6 space-x-9">
      <div className="absolute bottom-6 left-0 right-0 z-50 flex w-full items-center justify-between rounded-full px-6 py-3">
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => addField("input")}
            variant="outline"
            className="flex items-center gap-1 bg-blue-600 px-2 hover:bg-blue-100 md:gap-2 md:px-4"
          >
            <TypeBold className="h-6 w-6" />
            Input
          </Button>
          <Button
            onClick={() => addField("textarea")}
            variant="outline"
            className="flex items-center gap-1 bg-green-50 px-2 hover:bg-green-100 md:gap-2 md:px-4"
          >
            <Keyboard className="h-6 w-6" />
            Textarea
          </Button>
          <Button
            onClick={() => addField("checkbox")}
            variant="outline"
            className="flex items-center gap-1 bg-orange-50 px-2 hover:bg-orange-100 md:gap-2 md:px-4"
          >
            <CheckSquare className="h-6 w-6" />
            Checkbox
          </Button>
          <Button
            onClick={() => addField("star")}
            variant="outline"
            className="flex items-center gap-1 bg-orange-50 px-2 hover:bg-orange-100 md:gap-2 md:px-4"
          >
            <Star className="h-6 w-6" />
            Star
          </Button>
          <Button
            onClick={() => addField("image")}
            variant="outline"
            className="flex items-center gap-1 bg-orange-50 px-2 hover:bg-orange-100 md:gap-2 md:px-4"
          >
            <ImageIcon className="h-6 w-6" />
            Image
          </Button>
          <Button
            onClick={() => addField("video")}
            variant="outline"
            className="flex items-center gap-1 bg-orange-50 px-2 hover:bg-orange-100 md:gap-2 md:px-4"
          >
            <Video className="h-6 w-6" />
            Video
          </Button>
        </div>
      </div>

      <div
        className="mt-4 grid w-full gap-4"
        style={{
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        }}
      >
        <Card className="z-20 md:col-span-1">
          <CardHeader className="pt-6">
            <div className="flex items-center justify-between pb-3">
              <CardTitle>Form Builder</CardTitle>
              <CardTitle>
                {isSaving ? (
                  <Badge variant="default">Saving...</Badge>
                ) : (
                  <Badge variant="default">Saved</Badge>
                )}
              </CardTitle>
            </div>
            {/* <div className="mt-4 flex flex-wrap gap-2">
              <Button
                onClick={() => addField("input")}
                variant="outline"
                className="flex items-center gap-1 bg-blue-600 px-2 hover:bg-blue-100 md:gap-2 md:px-4"
              >
                <TypeBold className="h-6 w-6" />
                Input
              </Button>
              <Button
                onClick={() => addField("textarea")}
                variant="outline"
                className="flex items-center gap-1 bg-green-50 px-2 hover:bg-green-100 md:gap-2 md:px-4"
              >
                <Keyboard className="h-6 w-6" />
                Textarea
              </Button>
              <Button
                onClick={() => addField("checkbox")}
                variant="outline"
                className="flex items-center gap-1 bg-orange-50 px-2 hover:bg-orange-100 md:gap-2 md:px-4"
              >
                <CheckSquare className="h-6 w-6" />
                Checkbox
              </Button>
              <Button
                onClick={() => addField("star")}
                variant="outline"
                className="flex items-center gap-1 bg-orange-50 px-2 hover:bg-orange-100 md:gap-2 md:px-4"
              >
                <Star className="h-6 w-6" />
                Star
              </Button>
              <Button
                onClick={() => addField("image")}
                variant="outline"
                className="flex items-center gap-1 bg-orange-50 px-2 hover:bg-orange-100 md:gap-2 md:px-4"
              >
                <ImageIcon className="h-6 w-6" />
                Image
              </Button>
              <Button
                onClick={() => addField("video")}
                variant="outline"
                className="flex items-center gap-1 bg-orange-50 px-2 hover:bg-orange-100 md:gap-2 md:px-4"
              >
                <Video className="h-6 w-6" />
                Video
              </Button>
            </div> */}
          </CardHeader>
          <CardContent className="p-4 pt-4 md:p-6 md:pt-6">
            <div className="space-y-4">
              {formElements.map((element, index) =>
                renderFormElement(element, index),
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="z-20 mx-auto my-8 flex w-full items-center justify-center py-8 md:col-span-1">
          <Card className="mx-auto my-8 w-full max-w-3xl overflow-hidden bg-background">
            <BannerUploadDropZone
              id={project?.id}
              banner={banner}
              onAvatarChange={setBanner}
              setFormElements={setFormElements}
            />
            <CardHeader className="flex items-center gap-2 space-y-0 border-b px-6 py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-primary">
                  {project?.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {project?.description || (
                    <span className="text-destructive">No description</span>
                  )}
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
                          <Input
                            value={element.value}
                            readOnly
                            className="block w-full rounded-md border border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                          />
                        </div>
                      );
                    case "textarea":
                      return (
                        <div key={element.id} className="space-y-2">
                          <Label>{element.label}</Label>
                          <Textarea
                            value={element.value}
                            className="block w-full rounded-md border border-input bg-background shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                            readOnly
                          />
                        </div>
                      );
                    case "checkbox":
                      return (
                        <div
                          key={element.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={element.checked}
                            className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
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
                                <Button
                                  size="icon"
                                  key={rating}
                                  variant="ghost"
                                >
                                  <Star
                                    className={`h-6 w-6 ${
                                      parseInt(element.value) >=
                                      parseInt(rating)
                                        ? "text-yellow-500"
                                        : "text-muted-foreground"
                                    }`}
                                    fill="currentColor"
                                  />
                                </Button>
                              ),
                            )}
                          </div>
                        </div>
                      );
                    case "image":
                      return (
                        <div key={element.id} className="space-y-2">
                          <Label>{element.label}</Label>
                          <Image
                            src={
                              element.value ||
                              "https://res.cloudinary.com/cdn-feedback/image/upload/v1733229183/response/djqza3ehfpr3en6wbmsf.png"
                            }
                            alt="Image"
                            className="w-full rounded-md border border-input shadow"
                            width={200}
                            height={200}
                          />
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
