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

  return (
    <div className="w-full">
      <DynamicForm projectId={projectId} />
    </div>
  );
};

export default IndividualProject;
