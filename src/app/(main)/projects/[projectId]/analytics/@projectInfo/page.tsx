"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { generateEmbeddedFile } from "@/features/analytics/actions/generate-embedded-file";
import { errorToast } from "@/features/global/toast";
import { getProjectAnalytics } from "@/features/projects/actions/get-project-analytics";
import { useGenerateFile } from "@/hooks/use-generate-file";
import { useProject } from "@/hooks/use-project";
import { useUser } from "@/hooks/use-user";
import { At, InfoWaves } from "@mynaui/icons-react";
import { useQuery } from "@tanstack/react-query";

const ProjectAnalyticsInfo = () => {
  const { project } = useProject();
  const { user } = useUser();

  const { setIsScriptGenerated } = useGenerateFile();

  const { data, isLoading, isInitialLoading } = useQuery({
    queryKey: ["projectFields", project?.id],
    queryFn: async () => {
      if (!project?.id) {
        throw new Error("Project ID is required");
      }
      return getProjectAnalytics(project?.id);
    },

    onError: (error: { message: string }) => {
      errorToast(error.message, {
        position: "top-center",
      });
    },
    enabled: Boolean(project?.id),
  });

  if (isLoading || isInitialLoading) {
    return (
      <div className="space-y-6">
        <Card className="flex flex-col items-start justify-between space-y-4 rounded-lg bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-32" />
              <div className="flex space-x-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <Card className="flex flex-col items-start justify-between space-y-4 rounded-lg bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              <At
                className="h-6 w-6 font-semibold text-white"
                strokeWidth={2}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="font-medium text-primary">{project?.id}</div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex items-center justify-start space-x-2">
                  <Badge
                    icon={<InfoWaves className="h-4 w-4" />}
                    variant="default"
                    className="border border-input text-sm font-medium"
                  >
                    Certified
                  </Badge>
                  <div className="flex items-center gap-2 rounded-3xl border border-input px-1 pr-1.5 font-medium text-primary">
                    <Avatar className="h-5 w-5 rounded-xl">
                      <AvatarImage src={user?.image} alt={user?.name} />
                      <AvatarFallback className="rounded-xl px-3 py-2">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-normal">{user?.name}</span>
                  </div>
                </div>

                <div className="font-medium text-primary">
                  Edited {data?.updatedAt.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full gap-2 md:w-fit"
            onClick={() => {
              generateEmbeddedFile(project?.id as string).then((filePath) => {
                if (filePath) {
                  setIsScriptGenerated(true);
                }
              });
            }}
          >
            Generate Embedded File
          </Button>
        </Card>
      </div>
    </>
  );
};

export default ProjectAnalyticsInfo;
