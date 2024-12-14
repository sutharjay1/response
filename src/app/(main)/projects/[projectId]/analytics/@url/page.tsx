"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Hint from "@/features/global/hint";
import { errorToast, successToast } from "@/features/global/toast";
import { getProjectAnalytics } from "@/features/projects/actions/get-project-analytics";
import { useGenerateFile } from "@/hooks/use-generate-file";
import { useProject } from "@/hooks/use-project";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const ProjectURL = () => {
  const { project } = useProject();
  const { isScriptGenerated, setIsScriptGenerated } = useGenerateFile();

  const { data, isLoading, isInitialLoading, refetch } = useQuery({
    queryKey: ["generate-script", project?.id],
    queryFn: async () => {
      if (!project?.id) {
        throw new Error("Project ID is required");
      }
      return getProjectAnalytics(project?.id);
    },
    onError: (error: Error) => {
      errorToast(error.message, {
        position: "top-center",
      });
    },
    enabled: Boolean(project?.id),
  });

  useEffect(() => {
    if (isScriptGenerated) {
      refetch().then(() => {
        successToast("Script generated successfully", {
          duration: 5000,
          position: "top-center",
        });
        setIsScriptGenerated(false);
      });
    }
  }, [isScriptGenerated, refetch, setIsScriptGenerated]);

  return (
    <>
      <div className="space-y-6">
        {isLoading || isInitialLoading ? (
          <Card className="flex items-center justify-between rounded-lg bg-sidebar p-4">
            <div className="flex w-full items-center space-x-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48 flex-1" />
            </div>
          </Card>
        ) : data?.scriptFile ? (
          <Card className="flex items-center justify-between rounded-lg bg-sidebar p-4">
            <div className="flex items-center space-x-4">
              <Hint label="Copy feedback script file" side="top">
                <Badge
                  className="cursor-pointer rounded-lg py-1"
                  onClick={() => {
                    if (data?.scriptFile) {
                      navigator.clipboard.writeText(data.scriptFile.toString());
                      successToast("Copied to clipboard", {
                        position: "top-center",
                      });
                    }
                  }}
                >
                  <div className="font-medium text-primary">
                    {data.scriptFile}
                  </div>
                </Badge>
              </Hint>
            </div>
          </Card>
        ) : (
          <Card className="flex items-center justify-between rounded-lg bg-sidebar p-4">
            <div className="flex items-center space-x-4">
              No script file found - Add the feedback to favorites and generate
              file
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default ProjectURL;
