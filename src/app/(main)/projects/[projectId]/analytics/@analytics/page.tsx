"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TLarge } from "@/components/ui/typography";
import { addFeedbackToFavorite } from "@/features/analytics/actions/add-feedback-to-favourite";
import ProjectAnalyticsCharts from "@/features/analytics/response-charts";
import { aeonik } from "@/features/font";
import { errorToast, successToast } from "@/features/global/toast";
import { getProjectAnalytics } from "@/features/projects/actions/get-project-analytics";
import { cn } from "@/lib/utils";
import { Heart, HeartSolid } from "@mynaui/icons-react";
import { FieldType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

type ResponseType = {
  field?: { label: string; type: FieldType; checked: boolean };
  id: string;
  name: string;
  createdAt: Date;
  value: string;
  avatar: string;
  projectId: string;
  fieldId: string;
  isFavorite: boolean;
};

const ProjectAnalytics = ({ params }: Props) => {
  const [projectId, setProjectId] = useState<string>("");

  useEffect(() => {
    params.then((data) => {
      setProjectId(data.projectId);
    });
  }, [params]);

  const { data, isLoading, isInitialLoading, refetch } = useQuery({
    queryKey: ["analytics", projectId],
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

  if (isLoading || isInitialLoading) {
    return <SkeletonLoader />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const totalResponses = data.fields.reduce(
    (acc: number, fields) => acc + fields.results.length,
    0,
  );
  const averageRating = 4.8; // This should be calculated from actual data
  const responseRate = 68; // This should be calculated from actual data

  const recentResponses = data.fields
    .flatMap((field) => field.results)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="max-w-8xl mx-auto w-full">
        <TabsList className="mb-4 flex w-fit gap-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 space-y-6 lg:grid-cols-3 lg:space-x-6 lg:space-y-0">
            <Card className="w-full rounded-lg border bg-sidebar p-6 shadow">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Analytics Overview
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <StatCard
                  title="Total Responses"
                  value={totalResponses}
                  change={12}
                />
                <StatCard
                  title="Average Rating"
                  value={`${averageRating}/5.0`}
                  change={0.3}
                />
                <StatCard
                  title="Response Rate"
                  value={`${responseRate}%`}
                  change={-5}
                />
              </div>
            </Card>
            <Card className="col-span-2 rounded-lg border bg-sidebar p-6 shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Responses
                </h2>
                <Button variant="link" asChild>
                  <Link href={`/projects/${projectId}/response`}>View All</Link>
                </Button>
              </div>
              <div className="space-y-4">
                {recentResponses.map((response, index: number) => (
                  <ResponseCard
                    key={index}
                    response={response as ResponseType}
                    projectId={projectId}
                    refetch={refetch}
                  />
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="grid h-fit grid-cols-1 gap-4 md:grid-cols-[50%,50%]">
            <ProjectAnalyticsCharts data={data} className="w-full" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="grid h-fit grid-cols-1 gap-4 p-6 md:grid-cols-[50%,50%]">
    <Card className="flex flex-col items-start justify-between space-y-4 rounded-lg bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
      <Skeleton className="h-64 w-full" />
    </Card>
    <Card className="flex flex-col items-start justify-between space-y-4 rounded-lg bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
      <Skeleton className="h-64 w-full" />
    </Card>
  </div>
);

const StatCard = ({
  title,
  value,
  change,
}: {
  title: string;
  value: string | number;
  change: number;
}) => (
  <div className="flex items-center justify-between rounded-lg border bg-sidebar p-4 shadow">
    <div className="flex flex-col gap-y-2">
      <TLarge className="font-medium">{title}</TLarge>

      <div
        className={`mt-1 text-sm ${change >= 0 ? "text-green-600" : "text-red-600"}`}
      >
        {change >= 0 ? "↑" : "↓"} {Math.abs(change)}% from last week
      </div>
    </div>
    <div>
      <TLarge
        className={cn("text-2xl font-bold text-gray-900", aeonik.className)}
      >
        {value}
      </TLarge>
    </div>
  </div>
);

const ResponseCard = ({
  response,
  projectId,
  refetch,
}: {
  response: ResponseType;
  projectId: string;
  refetch: () => void;
}) => {
  const handleAddToFavorite = async () => {
    addFeedbackToFavorite(projectId, response.id, response.isFavorite)
      .then(() => {
        successToast(
          response.isFavorite ? "Removed from favorites" : "Added to favorites",
          {
            position: "top-center",
          },
        );
        refetch();
      })
      .catch((error: Error) => {
        errorToast(error.message || "Something went wrong", {
          position: "top-center",
        });
      });
  };

  return (
    <div className="rounded-lg border p-4 shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Image
            width={40}
            height={40}
            src={response.avatar}
            alt="User"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h4 className="font-medium text-gray-900">{response.name}</h4>
            <p className="text-sm text-gray-500">
              {new Date(response.createdAt).toLocaleString()}
            </p>
            <p className="mt-2 text-gray-600">{response.value}</p>
          </div>
        </div>
        {response?.field?.type === "star" && (
          <>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                {response.value}
              </span>
              <div className="text-yellow-400">
                {"★".repeat(Number(response.value))}
              </div>
            </div>

            <Button
              variant={response.isFavorite ? "default" : "outline"}
              size="sm"
              className="px-2"
              onClick={handleAddToFavorite}
            >
              {response.isFavorite ? <HeartSolid /> : <Heart />}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectAnalytics;
