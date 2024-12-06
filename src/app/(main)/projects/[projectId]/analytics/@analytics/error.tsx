"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { DangerTriangle } from "@mynaui/icons-react";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="error-ui">
      <Card className="flex h-64 flex-col items-center justify-center space-y-4 rounded-lg bg-sidebar p-4">
        <CardHeader className="flex flex-row items-center space-x-4 border-b pb-4">
          <DangerTriangle className="h-8 w-8 text-destructive" />
          <h2 className="text-xl font-bold text-destructive">Error Occurred</h2>
        </CardHeader>

        <div className="flex flex-col items-center justify-center space-x-4 space-y-6">
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-primary">
              {error.message}
            </h2>
          </div>
        </div>
        <Button onClick={() => reset()}>Try again</Button>
      </Card>
    </div>
  );
}
