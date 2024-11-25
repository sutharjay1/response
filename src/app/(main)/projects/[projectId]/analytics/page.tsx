"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ProjectAnalyticsCharts from "@/features/analytics/response-charts";
import ProjectAnalyticsResponseTable from "@/features/analytics/response-table";
import { errorToast } from "@/features/global/toast";
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
        description: "Please try again",
      });
    },
    enabled: Boolean(projectId), // Ensure query only runs when projectId is truthy
  });

  return (
    <>
      <div className="space-y-6">
        <Card className="flex items-center justify-between rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
              <AtSign className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="font-medium text-primary">{projectId}</div>
              <div className="flex items-center justify-start space-x-2">
                <Badge
                  icon={<IoIosInformationCircle className="h-4 w-4" />}
                  variant="default"
                  className="ml-2 font-medium"
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
                <div className="font-medium text-primary">
                  Edited {data?.updatedAt.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {data?.updatedAt.toLocaleString()}
          </div>
        </Card>

        {data && data.fields && (
          <>
            <ProjectAnalyticsCharts data={data} />
            <ProjectAnalyticsResponseTable data={data!} />
          </>
        )}
      </div>
    </>
  );
};

export default ProjectAnalytics;
