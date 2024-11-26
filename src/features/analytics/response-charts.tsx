"use client";

import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { GetProjectAnalyticsType } from "../projects/actions/get-project-analytics";

const timeRanges = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 90 days", value: 90 },
];

const ProjectAnalyticsCharts = ({
  data,
}: {
  data: GetProjectAnalyticsType;
}) => {
  const [timeRange, setTimeRange] = useState<number>(90);

  const processChartData = (data: GetProjectAnalyticsType, range: number) => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - range * 24 * 60 * 60 * 1000);

    const chartData = data.fields.flatMap((field) =>
      field.results.map((result) => ({
        date: new Date(result.createdAt).toISOString().slice(0, 10),
        label: field.label,
        value: result.value ? parseFloat(result.value) : 0,
      })),
    );

    return chartData
      .filter(
        (item) =>
          new Date(item.date) >= startDate && new Date(item.date) <= endDate,
      )
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const chartData = processChartData(data, timeRange);

  return (
    <Card className="overflow-hidden bg-sidebar transition-all hover:shadow-md">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <h2 className="text-lg font-semibold text-primary">
            Analytics Overview
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing analytics for the selected range
          </p>
        </div>
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartData.length > 0 ? (
          <ChartContainer
            config={{
              value: {
                label: "Value",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100px">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-value)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-value)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => date}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-value)"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <p className="text-sm text-muted-foreground">
            No data available for the selected time range
          </p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
        <span className="text-sm text-muted-foreground">
          Total fields: {data.fields.length}
        </span>
        <span className="text-sm text-muted-foreground">
          Updated: {new Date(data.updatedAt).toLocaleString()}
        </span>
      </CardFooter>
    </Card>
  );
};

export default ProjectAnalyticsCharts;
