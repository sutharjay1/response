"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectAnalyticsCharts from "@/features/analytics/response-charts";
import ProjectAnalyticsResponseTable from "@/features/analytics/response-table";
import { errorToast } from "@/features/global/toast";
import { getProjectAnalytics } from "@/features/projects/actions/get-project-analytics";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";

type Props = {
  params: Promise<{ projectId: string }>;
};

const ProjectAnalytics = ({ params }: Props) => {
  const { projectId } = use(params);

  const { data, isLoading, isInitialLoading } = useQuery({
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
    enabled: Boolean(projectId),
  });

  return (
    <>
      <div className="space-y-6">
        {isLoading || isInitialLoading ? (
          <div className="grid h-fit grid-cols-1 gap-4 md:grid-cols-[50%,50%]">
            <Card className="flex flex-col items-start justify-between space-y-4 rounded-lg bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
              <Skeleton className="h-64 w-full" />
            </Card>
            <Card className="flex flex-col items-start justify-between space-y-4 rounded-lg bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
              <Skeleton className="h-64 w-full" />
            </Card>
          </div>
        ) : (
          data?.fields && (
            <div className="grid h-fit grid-cols-1 gap-4 md:grid-cols-[50%,50%]">
              <ProjectAnalyticsCharts data={data} className="w-full" />
              <ProjectAnalyticsResponseTable
                data={data}
                projectId={projectId}
                className="w-full"
              />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ProjectAnalytics;
