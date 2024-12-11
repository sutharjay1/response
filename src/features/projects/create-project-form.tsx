"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  errorToast,
  loadingToast,
  successToast,
} from "@/features/global/toast";
import { useProject } from "@/hooks/use-project";
import { useUser } from "@/hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerOne } from "@mynaui/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { generateSlug } from "random-word-slugs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createProject } from "./actions/create-project";

const projectSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Project name is required" })
    .max(20, { message: "Project name is too long" }),
  description: z
    .string()
    .max(100, { message: "Description is too long" })
    .optional(),
});

const ProjectForm = () => {
  const { user } = useUser();
  const router = useRouter();
  const { setProject } = useProject();

  const { mutateAsync: createProjects, isLoading: loadingProjects } =
    useMutation({
      mutationFn: async (data: {
        name: string;
        description: string;
        userId: string;
      }) => {
        try {
          const result = await createProject(data);
          if (!result) {
            throw new Error("Failed to create project");
          }
          return result;
        } catch (error) {
          console.error("Mutation error:", error);
          throw error;
        }
      },
      onSuccess: (data) => {
        successToast("Project Created", {
          description: "Your project has been created successfully.",
        });

        if (data) {
          setProject(data);
          router.push(`/projects/${data.id}`);
        }
      },
      onError: (error) => {
        if (error instanceof Error) {
          errorToast(error.message, {
            description:
              error.message === "Project already exists in this account"
                ? "Try using a different project name."
                : "An unexpected error occurred. Please try again.",
          });
        } else {
          errorToast("Something went wrong", {
            position: "top-center",
          });
        }
      },
    });

  const form = useForm<z.infer<typeof projectSchema>>({
    mode: "onChange",
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: generateSlug(2),
      description: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof projectSchema>) => {
    if (!user?.id) {
      errorToast("Authentication Error", {
        description: "Please log in to create a project.",
        position: "top-center",
      });
      return;
    }

    const { dismissToast } = loadingToast("Creating project...", {
      position: "top-center",
    });

    try {
      await createProjects({
        name: values.name,
        description: values.description || "",
        userId: user.id,
      });
    } catch (error) {
      if (error instanceof Error) {
        errorToast(error.message, {
          description:
            error.message === "Project already exists in this account"
              ? "Change the project name and try again."
              : "Please try again",
        });
      } else {
        errorToast("Something went wrong", {
          position: "top-center",
        });
      }
    } finally {
      dismissToast();
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="z-50 flex flex-col space-y-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Project Name"
                  className="border-transparent bg-muted shadow-none"
                  disabled={loadingProjects}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Description (optional)"
                  className="border-transparent bg-muted shadow-none"
                  disabled={loadingProjects}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 flex flex-1 gap-x-2 sm:flex-row sm:gap-x-2 sm:space-y-0 md:justify-end">
          <Button
            variant="shine"
            className="w-fit sm:order-1 md:w-min md:self-center"
            type="submit"
            disabled={loadingProjects || !user?.id}
          >
            {loadingProjects ? (
              <>
                <SpinnerOne className="mr-2 h-4 w-4 animate-spin text-muted-foreground" />
                Creating...
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProjectForm;
