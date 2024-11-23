"use client";

import PageHeader from "@/features/global/page-header";
import ProjectForm from "@/features/projects/form/project-form";
import { QueryProvider } from "@/providers/query-provider";
import React from "react";

const NewProject = () => {
  return (
    <QueryProvider>
      <PageHeader title="Create New Feedback" className="text-left">
        <p className="text-muted-foreground">Create a new project</p>
      </PageHeader>
      <ProjectForm />
    </QueryProvider>
  );
};

export default NewProject;
