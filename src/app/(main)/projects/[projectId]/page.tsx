"use client";

import DynamicForm from "@/features/projects/dynamic-form";
import React from "react";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const IndividualProject = ({ params }: Props) => {
  const { projectId } = React.use(params);

  return <DynamicForm projectId={projectId} />;
};

export default IndividualProject;
