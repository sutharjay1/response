"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TLarge, TSmall } from "@/components/ui/typography";
import { errorToast, successToast } from "@/features/global/toast";
import {
  createProjectWithTemplate,
  TTemplate,
} from "@/features/template/actions/create-project-with-template";
import { templatesData } from "@/features/template/config";
import { useUser } from "@/hooks/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SpinnerOne } from "@mynaui/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
});

type TFormValues = z.infer<typeof formSchema>;

const TemplatesGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<TTemplate | null>(
    null,
  );
  const router = useRouter();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedTemplate?.name || "",
      description: selectedTemplate?.description || "",
    },
  });

  useEffect(() => {
    if (selectedTemplate) {
      form.reset({
        name: selectedTemplate.name,
        description: selectedTemplate.description,
      });
    }
  }, [selectedTemplate]);

  const filteredTemplates = useMemo(() => {
    return templatesData.templates.filter((template) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <h2 className="text-2xl font-bold tracking-tight">Review Templates</h2>
        <Button asChild>
          <Link href="/templates/new">Create New Template</Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <Input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />

        <Select onValueChange={(category) => setSelectedCategory(category)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {Array.from(
              new Set(templatesData.templates.map((t) => t.category)),
            ).map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTemplates.map((template) => (
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
  );
};

export default TemplatesGrid;
