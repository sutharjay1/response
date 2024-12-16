"use client";

import { BlurFade } from "@/components/ui/blur";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { P, TLarge } from "@/components/ui/typography";
import { geistSans } from "@/features/font";
import { errorToast, successToast } from "@/features/global/toast";
import { getProjectField } from "@/features/projects/actions/get-project-field";
import { getProjectById } from "@/features/projects/actions/get-projects";
import { FormElement } from "@/features/projects/types";
import { VideoUploadButton } from "@/features/projects/video-upload-button";
import { getProjectStatus } from "@/features/submit/actions/get-project-status";
import { submitFieldResponse } from "@/features/submit/actions/submit-field-response";
import { AvatarDropZone } from "@/features/submit/avatar-drop-zone";
import { useVideo } from "@/features/submit/hooks/use-video";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DangerTriangle, SpinnerOne, Star, X } from "@mynaui/icons-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const basicInfoSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type BasicInfo = z.infer<typeof basicInfoSchema>;

const SubmitForm = ({ params }: Props) => {
  const [projectId, setProjectId] = useState<string>("");

  useEffect(() => {
    params.then((data) => {
      setProjectId(data.projectId);
    });
  }, [params]);

  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [avatar, setAvatar] = useState<string>("https://avatar.vercel.sh/form");
  const { videoUrl } = useVideo();

  const { data: projectStatus } = useQuery({
    queryKey: ["fetch-project-status", projectId],
    queryFn: () => getProjectStatus(projectId as string),
    enabled: !!projectId,
  });
  const { data: project } = useQuery({
    queryKey: ["submit-project-fetch", projectId],
    queryFn: () => getProjectById(projectId as string, true),
    enabled: !!projectId && projectStatus?.status === "PROD",
  });

  const form = useForm<BasicInfo>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      name: "",
    },
  });

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
        case "video":
          schemaFields[element.id] = z
            .string({
              required_error: `${element.label} is required`,
              invalid_type_error: `${element.label} must be a string`,
            })
            .trim()
            .min(1, { message: `${element.label} cannot be empty` });
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
          case "image":
            return {
              ...baseField,
              value: field.value,
            };
          case "video":
            return {
              ...baseField,
              value: field.value || videoUrl,
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
          value:
            element.type === "video"
              ? videoUrl || element.value
              : element.type === "image" && !element.value
                ? undefined
                : "value" in element
                  ? element.value
                  : "",
          checked: "checked" in element ? element.checked : false,
          name: form.getValues("name"),
          avatar,
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
        case "image":
          return { ...element, value: data[element.id] };
        case "video":
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
        case "image":
          return { ...element, value: data[element.id] };
        case "video":
          return { ...element, value: data[element.id] };
        default:
          return element;
      }
    });

    submitFormMutation(updatedElements);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {projectStatus?.status === "DEV" ? (
        // <main
        //   className={cn(
        //     "relative z-10 flex h-screen items-center justify-center bg-background",
        //     geistSans.className,
        //   )}
        // >
        //   <Card className="group overflow-hidden rounded-3xl border-none bg-muted/40 px-2 pt-2 shadow-none transition-all">
        //     <div className="rounded-3xl bg-sidebar pt-1 shadow-sm">
        //       <CardHeader className="m-2 flex items-center justify-center gap-2 space-y-0 border-b bg-sidebar py-5 sm:flex-row">
        //         <div className="animate-pulse rounded-full bg-yellow-100 p-3">
        //           <DangerSquare className="h-6 w-6 text-yellow-600" />
        //         </div>
        //         <h2 className="text-2xl font-semibold text-gray-800">
        //           Submissions Paused
        //         </h2>
        //       </CardHeader>
        //       <CardContent className="mx-auto flex w-full items-center justify-center rounded-3xl bg-sidebar px-2 pt-4 sm:px-6 sm:pt-6">
        //         <TSmall className="text-gray-600">
        //           {projectStatus.user.name} is currently not accepting new
        //           submissions for{" "}
        //           <span className="font-medium text-gray-800">
        //             {projectStatus.name}
        //           </span>
        //           .
        //         </TSmall>
        //       </CardContent>
        //     </div>
        //     <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-2">
        //       <Button variant="outline" className="w-fit">
        //         Get Notified When Open
        //       </Button>
        //     </CardFooter>
        //   </Card>
        // </main>

        <main
          className={cn(
            "relative z-10 flex h-screen items-center justify-center bg-background",
            geistSans.className,
          )}
        >
          <Card className="group max-w-xl overflow-hidden rounded-3xl border-none bg-muted/40 px-2 pt-2 shadow-none transition-all">
            <div className="rounded-3xl bg-sidebar pt-1 shadow-sm">
              <CardHeader className="space-y-2 border-b bg-muted/30 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                  <DangerTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Submissions Temporarily Paused
                </h2>
              </CardHeader>
              <CardContent className="mx-auto flex w-full flex-col items-center justify-center rounded-3xl bg-sidebar px-2 pt-4 sm:px-6 sm:pt-6">
                {/* <TSmall className="text-gray-600">
                  {projectStatus.user.name} is currently not accepting new
                  submissions for{" "}
                  <span className="font-medium text-gray-800">
                    {projectStatus.name}
                  </span>
                  .
                </TSmall> */}

                <p className="text-muted-foreground">
                  {projectStatus.user.name} is currently not accepting new
                  submissions for{" "}
                  <span className="font-semibold text-foreground">
                    {projectStatus.name}
                  </span>
                  .
                </p>
                <p className="text-sm text-muted-foreground">
                  This project is in development mode. The creator may be
                  updating the submission process or making improvements to
                  enhance your experience.
                </p>
              </CardContent>
            </div>
            <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-2">
              <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <ModalTrigger>
                  <Button variant="outline" className="w-fit">
                    Get Notified When Open
                  </Button>
                </ModalTrigger>
                <ModalContent className="sm:max-w-[425px]">
                  <ModalHeader>
                    <ModalTitle>Get Notified</ModalTitle>
                    <ModalDescription>
                      Enter your email to receive a notification when
                      submissions reopen for {projectStatus.name}.
                    </ModalDescription>
                  </ModalHeader>
                  <form className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="col-span-4">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="col-span-4"
                        required
                      />
                    </div>
                  </form>
                  <ModalFooter>
                    <Button type="submit">Subscribe</Button>
                  </ModalFooter>
                  <ModalClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </ModalClose>
                </ModalContent>
              </Modal>
            </CardFooter>
          </Card>
        </main>
      ) : (
        //     <main
        //     className={cn(
        //       "relative z-10 flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-background/95 p-4",
        //       geistSans.className
        //     )}
        //   >
        //  <Card className="group overflow-hidden rounded-3xl border-none   px-2 pt-2 shadow-none transition-all">
        //    <div className="rounded-3xl bg-sidebar pt-1 shadow-sm">
        //       <div className="rounded-3xl ">
        //         <CardHeader className="space-y-2 border-b bg-muted/30 p-6 text-center">
        //           <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
        //             <DangerTriangle className="h-6 w-6 text-yellow-600" />
        //           </div>
        //           <h2 className="text-2xl font-bold text-foreground">
        //             Submissions Temporarily Paused
        //           </h2>
        //         </CardHeader>
        //         <CardContent className="space-y-4 p-6 text-center">
        //           <p className="text-muted-foreground">
        //             {projectStatus.user.name} is currently not accepting new submissions for{" "}
        //             <span className="font-semibold text-foreground">{projectStatus.name}</span>.
        //           </p>
        //           <p className="text-sm text-muted-foreground">
        //             This project is in development mode. The creator may be updating the submission process or making improvements to enhance your experience.
        //           </p>
        //         </CardContent>
        //       </div>
        //       <CardFooter className="flex flex-col items-stretch gap-4 bg-muted/10 p-6 sm:flex-row sm:items-center sm:justify-between">
        //         <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsModalOpen(true)}>
        //           <Bell className="mr-2 h-4 w-4" />
        //           Get Notified When Open
        //         </Button>
        //         <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
        //           Return to Homepage
        //         </a>
        //       </CardFooter>
        //     </div>
        //     </Card>

        //   </main>

        projectStatus?.status === "PROD" && (
          <div className="m:px-6 flex min-h-[90vh] flex-1 flex-col rounded-xl bg-[#f3f2f1] shadow-inner md:m-4 md:py-12 lg:px-8">
            <Card className="mx-auto w-full max-w-2xl overflow-hidden border border-[#7c533a]/10 bg-sidebar">
              <div className="flex w-full flex-col items-center justify-center rounded-lg p-1 transition-colors">
                <div className="relative flex h-40 w-full overflow-hidden rounded-xl border-4 border-background bg-muted md:shadow-sm md:shadow-primary/20">
                  <Image
                    src={
                      project?.banner
                        ? project?.banner
                        : `https://avatar.vercel.sh/${project?.name}`
                    }
                    alt="card cover"
                    fill
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <CardHeader className="flex items-center gap-2 space-y-0 border-b px-4 py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-left">
                  <TLarge className="text-lg font-semibold text-primary md:text-3xl">
                    {project?.name}
                  </TLarge>
                  {project?.description && (
                    <P className="text-base text-muted-foreground [&:not(:first-child)]:mt-0">
                      {project?.description}
                    </P>
                  )}
                </div>
              </CardHeader>
              <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="flex w-full items-center justify-center gap-3 text-center">
                  <AvatarDropZone
                    onAvatarChange={setAvatar}
                    id={projectId as string}
                    setFormElements={setFormElements}
                  />
                  <Card className="flex w-full items-center justify-start rounded-md border-0 bg-transparent shadow-none">
                    <CardContent className={cn("w-full cursor-pointer p-0")}>
                      <div className="flex flex-col items-start justify-start gap-1 text-sm text-muted-foreground">
                        <Form {...form}>
                          <form {...form}>
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem className="flex w-full flex-col items-start justify-start gap-1">
                                  <FormLabel className="font-normal">
                                    Enter your name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      className="h-8 w-full rounded-md border border-gray-300 bg-background px-3 py-2 font-normal shadow-none focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                      </div>
                    </CardContent>
                  </Card>
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
                      {formElements.map((element, index) => {
                        switch (element.type) {
                          case "input":
                            return (
                              <BlurFade
                                inView={true}
                                key={element.id}
                                className="space-y-2"
                                delay={0.1 * index}
                              >
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
                                          className="block w-full rounded-md border-gray-300 bg-background shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors[element.id] && (
                                          <p className="mt-1 text-xs text-red-500">
                                            {
                                              errors[element.id]
                                                ?.message as string
                                            }
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>
                              </BlurFade>
                            );
                          case "textarea":
                            return (
                              <BlurFade
                                inView={true}
                                key={element.id}
                                className="space-y-2"
                                delay={0.1 * index}
                              >
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
                                          className="block w-full rounded-md border-gray-300 bg-background shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                          rows={4}
                                        />
                                        {errors[element.id] && (
                                          <p className="mt-1 text-xs text-red-500">
                                            {
                                              errors[element.id]
                                                ?.message as string
                                            }
                                          </p>
                                        )}
                                      </>
                                    )}
                                  />
                                </div>
                              </BlurFade>
                            );
                          case "checkbox":
                            return (
                              <BlurFade
                                inView={true}
                                key={element.id}
                                className="space-y-2"
                                delay={0.1 * index}
                              >
                                <div key={element.id} className="space-y-2">
                                  <Controller
                                    name={element.id.toString()}
                                    control={control}
                                    render={({
                                      field: { value, onChange },
                                    }) => (
                                      <div className="flex items-center">
                                        <Checkbox
                                          id={`checkbox-${element.id}`}
                                          checked={value}
                                          onCheckedChange={onChange}
                                          className="h-4 w-4 rounded border-gray-300 bg-background text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <Label
                                          htmlFor={`checkbox-${element.id}`}
                                          className="ml-2 block text-sm"
                                        >
                                          {element.label}
                                        </Label>
                                        {errors[element.id] && (
                                          <p className="ml-2 text-xs text-red-500">
                                            {
                                              errors[element.id]
                                                ?.message as string
                                            }
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  />
                                </div>
                              </BlurFade>
                            );
                          case "star":
                            return (
                              <BlurFade
                                inView={true}
                                key={element.id}
                                className="space-y-2"
                                delay={0.1 * index}
                              >
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
                                    render={({
                                      field: { onChange, value },
                                    }) => (
                                      <div className="flex items-center">
                                        {(
                                          ["1", "2", "3", "4", "5"] as const
                                        ).map((rating) => (
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
                                        ))}

                                        {errors[element.id] && (
                                          <p className="ml-2 text-xs text-red-500">
                                            {
                                              errors[element.id]
                                                ?.message as string
                                            }
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  />
                                </div>
                              </BlurFade>
                            );

                          case "image":
                            return (
                              <BlurFade
                                inView={true}
                                key={element.id}
                                className="space-y-2"
                                delay={0.1 * index}
                              >
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
                                    render={() => (
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
                                    )}
                                  />
                                </div>
                              </BlurFade>
                            );

                          case "video":
                            return (
                              <BlurFade
                                inView={true}
                                key={element.id}
                                className="space-y-2"
                                delay={0.1 * index}
                              >
                                <div key={element.id} className="space-y-2">
                                  <Label
                                    className="block text-sm font-medium"
                                    htmlFor={`video-${element.id}`}
                                  >
                                    {element.label}
                                  </Label>

                                  <Controller
                                    name={element.id.toString()}
                                    control={control}
                                    render={({ field: { onChange } }) => (
                                      <VideoUploadButton
                                        id={element.id}
                                        setFormElements={setFormElements}
                                        onChange={onChange}
                                      />
                                    )}
                                  />
                                </div>
                              </BlurFade>
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
        )
      )}
    </>
  );
};

export default SubmitForm;
