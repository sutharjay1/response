import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="grid h-fit grid-cols-1 gap-4 md:grid-cols-[50%,50%]">
        <Card className="flex flex-col items-start justify-between space-y-4 rounded-xl bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
          <Skeleton className="h-64 w-full animate-pulse rounded-lg" />
        </Card>
        <Card className="flex flex-col items-start justify-between space-y-4 rounded-xl bg-sidebar p-4 md:flex-row md:items-center md:space-y-0">
          <Skeleton className="h-64 w-full animate-pulse rounded-lg" />
        </Card>
      </div>
    </div>
  );
}
