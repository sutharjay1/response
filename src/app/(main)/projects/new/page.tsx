"use client";

import { H3, P } from "@/components/ui/typography";
import ProjectForm from "@/features/projects/create-project-form";
import { QueryProvider } from "@/providers/query-provider";

const NewProject = () => {
  return (
    <QueryProvider>
      <section className="container mx-auto max-w-6xl pt-6">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <H3>Create New Project</H3>
            </div>
            <P className="text-muted-foreground [&:not(:first-child)]:mt-2">
              Get started by creating a new project
            </P>
          </div>
        </div>
        <ProjectForm />
      </section>
    </QueryProvider>
  );
};

export default NewProject;
