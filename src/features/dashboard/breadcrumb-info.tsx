"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { useProject } from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  At,
  BoundingBox,
  ChartBarTwo,
  FolderTwo,
  SpinnerOne,
} from "@mynaui/icons-react";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { errorToast, successToast } from "../global/toast";
import { renameProject } from "../projects/actions/rename-project";

const renameProjectSchema = z.object({
  projectId: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

type TRenameProject = z.infer<typeof renameProjectSchema>;

const BreadcrumbInfo = () => {
  const { project, setProject } = useProject();
  const pathname = usePathname();
  const [onOpen, setOnOpen] = useState(false);

  const form = useForm<TRenameProject>({
    resolver: zodResolver(renameProjectSchema),
    defaultValues: {
      projectId: project?.id || "",
      name: project?.name || "",
      description: project?.description || "",
    },
  });

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: TRenameProject) =>
      renameProject({
        projectId: project?.id || "",
        name: data.name,
        description: data.description || "",
      }),
    onSuccess: (data) => {
      setProject(data);
      successToast("Board renamed successfully");
    },
    onError: () => {
      errorToast("Failed to rename board");
    },
  });

  const onSubmit = async (data: TRenameProject) => {
    try {
      await mutateAsync(data);
    } catch {
      errorToast("Failed to rename board");
    } finally {
      setOnOpen(false);
    }
  };

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList className=" ">
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">
              <BreadcrumbPage className="flex items-center gap-2">
                <FolderTwo
                  size={16}
                  className="h-5 w-5 font-bold md:flex"
                  strokeWidth={2}
                />
                {pathname.startsWith("/projects") && (
                  <span className="hidden md:flex">Dashboard</span>
                )}
              </BreadcrumbPage>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage className="flex items-center gap-2">
              <Modal open={onOpen} onOpenChange={setOnOpen}>
                <ModalTrigger asChild className="">
                  <Button variant="ghost" className="inline-flex w-fit">
                    <At
                      size={16}
                      className="h-5 w-5 font-bold"
                      strokeWidth={2}
                    />
                    {(pathname.startsWith("/projects") ||
                      pathname.endsWith("/analytics")) && (
                      <span
                        className={cn(
                          "w-full max-w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap px-2 py-0.5 text-sm hover:bg-accent hover:text-primary",
                          "hidden md:flex",
                        )}
                      >
                        {project?.name}
                      </span>
                    )}
                  </Button>
                </ModalTrigger>
                <ModalContent className="max-w-md">
                  <ModalHeader>
                    <ModalTitle>Edit Project Title</ModalTitle>
                    <ModalDescription>
                      Enter a new title for your project
                    </ModalDescription>
                  </ModalHeader>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-2"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Name</FormLabel>
                            <Input
                              {...field}
                              disabled={isLoading}
                              value={field.value}
                            />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                              {...field}
                              disabled={isLoading}
                              value={field.value}
                            />
                          </FormItem>
                        )}
                      />
                      <ModalFooter>
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <SpinnerOne className="h-4 w-4 animate-spin" />
                            ) : (
                              <span>Save Changes</span>
                            )}
                          </Button>
                          <ModalClose asChild>
                            <Button
                              type="button"
                              className="w-full"
                              variant="outline"
                            >
                              Cancel
                            </Button>
                          </ModalClose>
                        </div>
                      </ModalFooter>
                    </form>
                  </Form>
                </ModalContent>
              </Modal>
            </BreadcrumbPage>
          </BreadcrumbItem>

          {pathname?.includes("/analytics") && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-2">
                  <ChartBarTwo
                    size={16}
                    className="h-5 w-5 font-bold"
                    strokeWidth={2}
                  />
                  Analytics
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}

          {pathname?.includes("/hall-of-frame") && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-2">
                  <BoundingBox
                    size={16}
                    className="h-5 w-5 font-bold"
                    strokeWidth={2}
                  />
                  Hall of Frame
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbInfo;
