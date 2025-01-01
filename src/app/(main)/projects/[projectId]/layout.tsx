import { getProjectById } from "@/features/projects/actions/get-projects";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    projectId: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { projectId } = await params;
  const project = await getProjectById(projectId);

  return {
    title: `${project.name} | Response`,
    description: project.description || "View project details.",
    openGraph: {
      title: project.name,
      description: project.description,
      images: [
        {
          url: project.banner,
          width: 800,
          height: 600,
          alt: project.name,
        },
      ],
    },
  };
}

const ProjectLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default ProjectLayout;
