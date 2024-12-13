"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSidebar } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { H2, P } from "@/components/ui/typography";
import Hint from "@/features/global/hint";
import { errorToast, successToast } from "@/features/global/toast";
import { createForm } from "@/features/projects/actions/create-form";
import { getProjectField } from "@/features/projects/actions/get-project-field";
import { removeField } from "@/features/projects/actions/remove-field";
import { BannerUploadDropZone } from "@/features/projects/banner-upload-button";
import { fieldTypes } from "@/features/projects/config";
import { ImageUploadDropZone } from "@/features/projects/image-upload-button";
import { FormElement } from "@/features/projects/types";
import { useDebounce } from "@/hooks/use-debounce";
import { useProject } from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import { useEffect, useState } from "react";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const IndividualProject = ({ params }: Props) => {
  const [projectId, setProjectId] = useState<string>("");

  useEffect(() => {
    params.then((data) => {
      setProjectId(data.projectId);
    });
  }, [params]);

  const { project } = useProject();

  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [, setIsSaving] = useState(false);
  const [banner, setBanner] = useState<string>(project?.banner || "");
  const { state } = useSidebar();

  const debouncedFormElements = useDebounce(formElements, 1000);

  const { isLoading, isInitialLoading } = useQuery({
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
          successToast("Form saved", {
            margin: {
              left: "8rem",
            },
          });
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFormElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const FormField = ({
    element,
    index,
  }: {
    element: FormElement;
    index: number;
  }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: element.id });

    const style = {
      transform: CSS.Transform.toString({
        scaleX: 1,
        scaleY: 1,
        x: transform?.x ?? 0,
        y: transform?.y ?? 0,
      }),
      transition,
    };

    return (
      <Card
        className={cn(
          "group relative bg-sidebar transition-all hover:shadow",
          formElements.length - 1 === index && "mb-32",
          "reorder-handle cursor-pointer",
        )}
        key={element.id}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
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
                className="inline-flex h-8 w-8 items-center rounded-xl border border-input bg-[#fff3ec]/80 p-0 text-xs font-semibold text-[#7c533a] transition-colors hover:bg-[#fff3ec]/80 hover:text-[#7c533a] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <ChevronUp className="h-4 w-4" />
                <span className="sr-only">Move up</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => moveElement(index, "down")}
                disabled={index === formElements.length - 1}
                className="inline-flex h-8 w-8 items-center rounded-xl border border-input bg-[#fff3ec]/80 p-0 text-xs font-semibold text-[#7c533a] transition-colors hover:bg-[#fff3ec]/80 hover:text-[#7c533a] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <ChevronDown className="h-4 w-4" />
                <span className="sr-only">Move down</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeElement(element.id)}
                className="inline-flex h-8 w-8 items-center rounded-xl border border-input bg-[#fff3ec]/80 p-0 text-xs font-semibold text-destructive shadow transition-colors hover:bg-[#fff3ec]/80 hover:text-destructive/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove element</span>
              </Button>
              {/* <Button
                  variant="ghost"
                  size="sm"
                  onPointerDown={(e) => controls.start(e)}
                  className="reh-8 w-8 rounded-xl p-0 text-destructive shadow hover:text-destructive/80"
                >
                  <Grid />
                  <span className="sr-only">Reorder</span>
                </Button> */}
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
                        variant="ghost"
                        onClick={() =>
                          handleChange(element.id, "value", rating)
                        }
                        className="group"
                      >
                        <Star
                          key={rating}
                          className={cn(
                            "h-6 w-6",
                            parseInt(element.value) >= parseInt(rating)
                              ? "text-yellow-500 group-hover:text-yellow-500"
                              : "text-gray-300 group-hover:text-gray-400",
                          )}
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
                      <CardContent className="cursor-pointer rounded-lg border border-dashed border-[#7c533a] p-6">
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

  return (
    <div className="relative mx-auto flex w-full flex-col items-center overflow-y-auto pb-12 sm:rounded-lg">
      <div
        className={cn(
          "fixed inset-x-0 bottom-4 z-50 w-full transform",
          state === "expanded" ? "ml-[7.8rem]" : "ml-0",
        )}
      >
        <div className="hidden space-x-2 md:flex md:items-center md:justify-center">
          <div className="rounded-xl border border-input bg-background shadow-lg">
            <div className="flex flex-wrap items-center justify-center gap-2 p-2">
              {fieldTypes.map(({ type, icon: Icon, label }) => (
                <Button
                  key={type}
                  onClick={() => addField(type)}
                  variant="outline"
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm transition-all duration-200 ease-in-out hover:scale-105",
                    type === "input" && "bg-blue-50 hover:bg-blue-100",
                    type === "textarea" && "bg-yellow-50 hover:bg-yellow-100",
                    type === "checkbox" && "bg-green-50 hover:bg-green-100",
                    type === "star" && "bg-yellow-50 hover:bg-yellow-100",
                    type === "image" && "bg-violet-50 hover:bg-violet-100",
                    type === "video" && "bg-red-50 hover:bg-red-100",
                  )}
                >
                  <Icon className="mr-1 h-5 w-5" />
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-2 md:hidden">
          <div className="flex items-center justify-start gap-2">
            {fieldTypes.map(({ type, icon: Icon }) => (
              <Button
                key={type}
                onClick={() => addField(type)}
                variant="outline"
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm transition-all duration-200 ease-in-out hover:scale-105",
                  type === "input" && "bg-blue-50 hover:bg-blue-100",
                  type === "textarea" && "bg-yellow-50 hover:bg-yellow-100",
                  type === "checkbox" && "bg-green-50 hover:bg-green-100",
                  type === "star" && "bg-yellow-50 hover:bg-yellow-100",
                  type === "image" && "bg-violet-50 hover:bg-violet-100",
                  type === "video" && "bg-red-50 hover:bg-red-100",
                )}
              >
                <Icon className="mr-1 h-5 w-5" />
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Card className="z-20 w-full max-w-screen-sm space-y-4 border-none pt-6 shadow-none md:col-span-1">
        <BannerUploadDropZone
          banner={banner}
          onAvatarChange={setBanner}
          id={projectId}
          setFormElements={setFormElements}
        />
        {isInitialLoading || isLoading ? (
          <div className="flex items-center justify-center">
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <CardHeader className="flex flex-col items-center justify-center space-y-1 px-0 py-4">
              <CardTitle>
                <H2 className="border-none p-0 pb-0">{project?.name}</H2>
                <P className="leading-normal [&:not(:first-child)]:mt-0">
                  {project?.description}
                </P>
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full space-y-6 border-none px-0 shadow-none">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={formElements.map((element) => element.id)}
                  strategy={rectSortingStrategy}
                >
                  {formElements.map((element, index) => (
                    <FormField
                      key={element.id}
                      element={element}
                      index={index}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
};

export default IndividualProject;
