"use client";

import { AvatarCircles } from "@/components/ui/avatar-circles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/modal";
import { InlineCode, TLarge, TSmall } from "@/components/ui/typography";
import { errorToast, successToast } from "@/features/global/toast";
import { getProjects } from "@/features/projects/actions/get-projects";
import {
  createProjectWithTemplate,
  TTemplate,
} from "@/features/template/actions/create-project-with-template";
import { templatesData } from "@/features/template/config";
import { useUser } from "@/hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AnnoyedSquare,
  ArrowLongRight,
  BoundingBox,
  ChartBarTwo,
  CogOne,
  FileText,
  Plus,
  SpinnerOne,
} from "@mynaui/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Projects = () => {
  const { user } = useUser();
  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ["all-projects", user?.id],
    queryFn: () => getProjects(user?.id as string),
    enabled: !!user?.id,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedTemplate, setSelectedTemplate] = useState<TTemplate | null>(
    null,
  );

  const formSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(3),
  });

  type TFormValues = z.infer<typeof formSchema>;

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedTemplate?.name || "",
      description: selectedTemplate?.description || "",
    },
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async ({
      name,
      description,
      userId,
      template,
    }: {
      name: string;
      description: string;
      userId: string;
      template: TTemplate;
    }) => {
      try {
        const result = await createProjectWithTemplate({
          name,
          description,
          userId,
          template,
        });
        if (!result) {
          throw new Error("Failed to create project");
        }
        return result;
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
    onSuccess: async (data) => {
      successToast("Redirecting...");
      router.push(`/projects/${data.id}`);
      await queryClient.invalidateQueries({ queryKey: ["all-projects"] });
    },
  });

  const onSubmit = async (values: TFormValues) => {
    if (!selectedTemplate) return;

    try {
      await mutateAsync({
        name: values.name,
        description: values.description,
        userId: user.id,
        template: selectedTemplate,
      });
    } catch (error) {
      if (error instanceof Error) {
        errorToast(error.message);
      }
    }
  };

  return (
    <>
      {loadingProjects ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <SpinnerOne className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      ) : !projects?.length ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <AnnoyedSquare className="h-8 w-8 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No projects found</h3>
            <p className="text-sm text-muted-foreground">
              Create your first project to get started
            </p>
            <Button asChild className="mt-4">
              <Link href="/projects/new">
                <Plus className="mr-2 h-5 w-5" strokeWidth={2} />
                Create Project
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Your Projects</h2>
            <Button asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-5 w-5" strokeWidth={2} />
                Create Project
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {projects.map((project) => {
              const totalResults = project?.fields?.reduce(
                (acc, field) => acc + field?.results?.length,
                0,
              );

              return (
                <Card
                  className="transform overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-sidebar-foreground/10 hover:shadow"
                  key={project.id}
                >
                  <CardHeader className="pb-4 pt-6">
                    <div className="flex items-center justify-between">
                      <h3 className="truncate pr-4 text-lg font-semibold">
                        {project.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          className="cursor-pointer rounded-xl px-2 py-1.5"
                          onClick={() => {
                            if (project.scriptFile) {
                              navigator.clipboard
                                .writeText(project.scriptFile.toString()!)
                                .then(() => {
                                  successToast(
                                    "Your embed link has been copied.",
                                    {
                                      position: "top-center",
                                    },
                                  );
                                });
                            }
                          }}
                        >
                          <FileText
                            className="h-5 w-5 font-semibold"
                            strokeWidth={2}
                          />
                          <span className="sr-only">Open menu</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-xl px-2 py-1.5"
                          asChild
                        >
                          <Link
                            href={`/hall-of-frame/${project.id}`}
                            className="cursor-pointer"
                          >
                            <BoundingBox
                              className="h-5 w-5 font-semibold"
                              strokeWidth={2}
                            />
                            <span className="sr-only">Hall of Frame</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-xl px-2 py-1.5"
                          asChild
                        >
                          <Link
                            href={`/projects/${project.id}/analytics`}
                            className="cursor-pointer"
                          >
                            <ChartBarTwo
                              className="h-5 w-5 font-semibold"
                              strokeWidth={2}
                            />
                            <span className="sr-only">Open menu</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-xl px-2 py-1.5"
                          asChild
                        >
                          <Link
                            href={`/projects/${project.id}/settings`}
                            className="cursor-pointer"
                          >
                            <CogOne
                              className="h-5 w-5 font-semibold"
                              strokeWidth={2}
                            />
                            <span className="sr-only">Open menu</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <TSmall className="line-clamp-2 text-sm text-muted-foreground">
                          <span>{totalResults} responses</span>
                        </TSmall>
                        <div className="flex -space-x-3 *:ring *:ring-background">
                          <AvatarCircles
                            projectUrl={`${window.location.origin}/submit/${project.id}`}
                            numPeople={project.fields
                              .map((field) => field.results.length)
                              .reduce((a, b) => a + b, 0)}
                            avatarUrls={project.fields
                              .map((field) =>
                                field.results.map((result) => ({
                                  profileUrl: result.avatar,
                                  imageUrl: result.avatar,
                                })),
                              )
                              .flat()}
                          />
                        </div>
                      </div>

                      <div className="mt-1 flex items-center text-sm text-muted-foreground">
                        Updated{" "}
                        <time
                          dateTime={project.updatedAt.toISOString()}
                          className="ml-1"
                        >
                          {formatDistanceToNow(new Date(project.updatedAt), {
                            addSuffix: true,
                          })}
                        </time>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
                    <Badge
                      variant="secondary"
                      className="text-sm font-medium hover:bg-secondary"
                    >
                      <InlineCode className="hidden md:flex">
                        {project.id}
                      </InlineCode>
                      <InlineCode className="flex md:hidden">
                        {project.id.slice(0, 6)}
                      </InlineCode>
                    </Badge>

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="group ml-auto rounded-lg px-2 py-0.5 text-sm text-primary"
                    >
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex items-center"
                      >
                        View Project
                        <ArrowLongRight
                          className="ml-2 h-5 w-5 transition-transform duration-700 group-hover:translate-x-1"
                          strokeWidth={2}
                        />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Templates</h2>
          <Button asChild variant="link">
            <Link href="/template">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {templatesData.templates.slice(0, 4).map((template) => (
            <Card
              className="flex h-full transform flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              key={template.name}
            >
              <div className="flex-1">
                <CardHeader className="h-[200px] space-y-2 overflow-hidden rounded-t-xl p-0 text-center">
                  <Image
                    src={template.banner}
                    alt={template.name}
                    width={400}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </CardHeader>
                <CardContent className="flex flex-1 flex-col p-4">
                  <TLarge className="mb-2 line-clamp-1">{template.name}</TLarge>
                  <TSmall className="line-clamp-2 flex-1 text-muted-foreground">
                    {template.description}
                  </TSmall>
                </CardContent>
              </div>
              <CardFooter className="bg-muted/50 p-4">
                <Modal>
                  <ModalTrigger className="w-full">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      Use Template
                    </Button>
                  </ModalTrigger>
                  <ModalContent className="sm:max-w-[425px]">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                      >
                        <div className="space-y-2">
                          <h2 className="text-lg font-semibold">
                            Create Project from Template
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Customize your new project details below.
                          </p>
                        </div>
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...form.register("name")}
                              placeholder="Enter project name"
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              {...form.register("description")}
                              placeholder="Enter project description"
                            />
                          </FormControl>
                        </FormItem>
                        <ModalFooter className="flex justify-end space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <SpinnerOne className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            Create Project
                          </Button>
                        </ModalFooter>
                      </form>
                    </Form>
                  </ModalContent>
                </Modal>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
