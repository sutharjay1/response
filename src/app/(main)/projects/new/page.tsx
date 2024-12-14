"use client";

import { TSmall } from "@/components/ui/typography";
import PageHeader from "@/features/global/page-header";
import ProjectForm from "@/features/projects/create-project-form";
import { QueryProvider } from "@/providers/query-provider";
import React from "react";

const NewProject = () => {
  return (
    <QueryProvider>
      <PageHeader title="Create New Project" className="text-left">
        <TSmall className="text-base text-muted-foreground">
          Get started by creating a new project
        </TSmall>
      </PageHeader>
      <ProjectForm />
    </QueryProvider>
  );
};

export default NewProject;
