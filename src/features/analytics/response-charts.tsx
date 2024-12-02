"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface FieldResult {
  field: {
    label: string;
    type: string;
    checked: boolean | null;
  } | null;
  value: string | null;
  id: string;
  createdAt: Date;
  projectId: string;
  fieldId: string | null;
  isFavorite: boolean;
}

interface Field {
  results: FieldResult[];
  label: string;
  value: string | null;
  id: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  checked: boolean | null;
  formId: string;
  order: number;
}

interface ProjectData {
  fields: Field[];
  id: string;
  name: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  scriptFile: string | null;
}

const ProjectAnalyticsCharts = ({
  data,
  className,
}: {
  data: ProjectData;
  className?: string;
}) => {
  const [timeRange] = useState<number>(90);

  const processChartData = (field: Field, range: number) => {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - range * 24 * 60 * 60 * 1000);

    return field.results
      .filter(
        (result) =>
          new Date(result.createdAt) >= startDate &&
          new Date(result.createdAt) <= endDate,
      )
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
      .map((result) => ({
        date: new Date(result.createdAt).toISOString().slice(0, 10),
        value: processFieldValue(result, field.type),
      }));
  };

  const processFieldValue = (result: FieldResult, fieldType: string) => {
    switch (fieldType) {
      case "number":
        return result.value ? parseFloat(result.value) : 0;
      case "checkbox":
        return result.field?.checked ? 1 : 0;
      case "text":
      case "textarea":
        return result.value ? result.value.length : 0;
      case "star":
        return result.value ? parseInt(result.value, 10) : 0;
      case "input":
        return result.value ? 1 : 0;
      default:
        return result.value ? 1 : 0;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderChart = (field: Field, chartData: any[]) => {
    switch (field.type) {
      case "number":
      case "star":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                  })
                }
                tickLine={false}
                axisLine={false}
                stroke="rgba(255,255,255,0.5)"
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="rgba(255,255,255,0.5)"
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7c533a"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "#7c533a",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                  fill: "#7c533a",
                  strokeWidth: 0,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "checkbox":
      case "input":
      case "text":
      case "textarea":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={true}
                vertical={false}
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-US", {
                    month: "short",
                  })
                }
                tickLine={false}
                axisLine={false}
                stroke="rgba(255,255,255,0.5)"
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="rgba(255,255,255,0.5)"
                tickMargin={8}
              />
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7c533a"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "#7c533a",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 6,
                  fill: "#7c533a",
                  strokeWidth: 0,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <p className="text-sm text-muted-foreground">
            Chart type not supported for this field type.
          </p>
        );
    }
  };

  const getChartDescription = (fieldType: string) => {
    switch (fieldType) {
      case "number":
        return "Showing numeric values over time";
      case "checkbox":
        return "Showing checked (1) vs unchecked (0) states";
      case "text":
      case "textarea":
        return "Showing text length over time";
      case "star":
        return "Showing star ratings over time";
      case "input":
        return "Showing filled (1) vs empty (0) states";
      default:
        return "Showing data over time";
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {data.fields.map((field) => {
        const chartData = processChartData(field, timeRange);
        return (
          <Card
            key={field.id}
            className="overflow-hidden bg-sidebar transition-all hover:shadow-md"
          >
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <h2 className="text-lg font-semibold text-primary">
                  {field.label} ({field.type})
                </h2>
                <p className="text-sm text-muted-foreground">
                  {getChartDescription(field.type)}
                </p>
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
                  {renderChart(field, chartData)}
                </ChartContainer>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No data available for the selected time range
                </p>
              )}
            </CardContent>
            <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
              <span className="text-sm text-muted-foreground">
                Total entries: {chartData.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Updated: {new Date(field.updatedAt).toLocaleString()}
              </span>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default ProjectAnalyticsCharts;
