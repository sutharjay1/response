import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { GetProjectAnalyticsType } from "../projects/actions/get-project-analytics";

const ProjectAnalyticsCharts = ({
  data,
}: {
  data: GetProjectAnalyticsType;
}) => {
  const [timeRange] = useState("90d");

  const chartData = data.fields.map((field) => ({
    label: field.label,
    value: field.value,
  }));

  const filteredData = chartData.filter(() => timeRange === "90d");

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
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <Tooltip />
              <Area
                dataKey="value"
                type="monotone"
                fill="url(#fillColor)"
                stroke="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">No data available</p>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
        <span className="text-sm text-muted-foreground">
          Total fields: {chartData.length}
        </span>
        <span className="text-sm text-muted-foreground">Updated just now</span>
      </CardFooter>
    </Card>
  );
};

export default ProjectAnalyticsCharts;
