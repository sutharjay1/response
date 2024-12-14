"use client";

import { Button } from "@/components/ui/button";
import { TLarge, TSmall } from "@/components/ui/typography";
import {
  errorToast,
  loadingToast,
  successToast,
} from "@/features/global/toast";
import { deleteProject } from "@/features/projects/actions/delete-project";
import { SpinnerOne } from "@mynaui/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

const ProjectSettings = ({ params }: Props) => {
  const [projectId, setProjectId] = useState<string>("");

  useEffect(() => {
    params.then((data) => {
      setProjectId(data.projectId);
    });
  }, [params]);

  const router = useRouter();

  const { mutateAsync: deleteProjectMutation, isLoading } = useMutation({
    mutationFn: async (data: { projectId: string }) => {
      try {
        const result = await deleteProject(data.projectId);
        if (!result) {
          throw new Error("Failed to create project");
        }
        return result;
      } catch (error) {
        console.error("Mutation error:", error);
        throw error;
      }
    },
  });

  const handleDeleteProject = async () => {
    const { dismissToast } = loadingToast("Deleting project...", {
      position: "top-center",
    });

    try {
      const result = await deleteProjectMutation({ projectId });

      if (result) {
        successToast("Project Deleted", {
          description: "Your project has been deleted successfully.",
        });
        router.push("/projects");
      }
    } catch (error) {
      if (error instanceof Error) {
        errorToast(error.message, {
          description:
            error.message === "Project already exists in this account"
              ? "Change the project name and try again."
              : "Please try again",
        });
      } else {
        errorToast("Something went wrong. Please try again.", {
          position: "top-center",
        });
      }
    } finally {
      dismissToast();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
      <div className="space-y-4">
        <div>
          <TLarge className="font-medium">
            Permanently delete this project
          </TLarge>
          <TSmall className="text-base text-muted-foreground [&:not(:first-child)]:mt-0">
            Permanently remove your project and all of its contents from the
            response platform. This action is not reversible — please continue
            with caution.
          </TSmall>
        </div>
        <Button
          variant="destructive"
          onClick={handleDeleteProject}
          disabled={isLoading}
        >
          {isLoading && (
            <SpinnerOne
              className="mr-2 h-4 w-4 animate-spin font-semibold"
              aria-hidden="true"
              strokeWidth={2}
            />
          )}
          Delete this project
        </Button>
      </div>
    </div>
  );
};

export default ProjectSettings;
