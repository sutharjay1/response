import { QueryLayout } from "@/features/global/query-layout";
import { getProjectById } from "@/features/projects/actions/get-projects";

type Props = {
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

const SubmitLayout = ({ children }: { children: React.ReactNode }) => {
  return <QueryLayout>{children}</QueryLayout>;
};

export default SubmitLayout;
