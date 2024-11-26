"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateEmbeddedFile } from "@/features/analytics/actions/generate-embedded-file";
import ProjectAnalyticsCharts from "@/features/analytics/response-charts";
import ProjectAnalyticsResponseTable from "@/features/analytics/response-table";
import { errorToast, successToast } from "@/features/global/toast";
import { getProjectAnalytics } from "@/features/projects/actions/get-project-analytics";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { AtSign } from "lucide-react";
import { use } from "react";
import { IoIosInformationCircle } from "react-icons/io";

type Props = {
  params: Promise<{ projectId: string }>;
};

const ProjectAnalytics = ({ params }: Props) => {
  const { projectId } = use(params);
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["projectFields", projectId],
    queryFn: async () => {
      if (!projectId) {
        throw new Error("Project ID is required");
      }
      return getProjectAnalytics(projectId);
    },

    onError: (error: { message: string }) => {
      errorToast(error.message, {
        position: "top-center",
      });
    },
    enabled: Boolean(projectId), // Ensure query only runs when projectId is truthy
  });

  return (
    <>
      <div className="space-y-6">
        <Card className="flex items-center justify-between rounded-lg bg-sidebar p-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              <AtSign className="h-6 w-6 text-white" />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="font-medium text-primary">{projectId}</div>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex items-center justify-start space-x-2">
                  <Badge
                    icon={<IoIosInformationCircle className="h-4 w-4" />}
                    variant="default"
                    className="font-medium"
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
            className="gap-2"
            onClick={() => {
              generateEmbeddedFile(projectId).then((filePath) => {
                if (filePath) {
                  console.log({
                    filePath,
                  });
                  successToast("File generated", {
                    position: "top-center",
                  });
                }
              });
            }}
          >
            Generate Embedded File
          </Button>
        </Card>

        {data?.scriptFile ? (
          <Card className="flex items-center justify-between rounded-lg bg-sidebar p-4">
            <div className="flex items-center space-x-4">
              <div className="font-medium text-primary">{data?.scriptFile}</div>
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

        {data && data.fields && (
          <div className="grid h-fit grid-cols-1 gap-4 md:grid-cols-[30%,70%]">
            <ProjectAnalyticsCharts data={data} className="w-full" />
            <ProjectAnalyticsResponseTable
              data={data!}
              projectId={projectId}
              className="w-full"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectAnalytics;
