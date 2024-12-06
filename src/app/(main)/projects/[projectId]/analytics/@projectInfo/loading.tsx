import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
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
};

export default Loading;
