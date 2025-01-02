"use client";

import { Button } from "@/components/ui/button";
import { aeonik, geistSans, inter } from "@/features/font";
import { cn } from "@/lib/utils";
import { DangerTriangle } from "@mynaui/icons-react";
import { useEffect } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-1 flex-col border border-[#7c533a]/10 bg-sidebar peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-4 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl">
      <main
        className={cn(
          "m:px-6 relative z-10 m-4 mx-4 flex h-fit flex-1 flex-col items-center justify-center rounded-xl bg-[#f3f2f1] shadow-inner lg:px-8",
          geistSans.className,
        )}
      >
        <div className="max-w-xl text-center">
          <div className="flex justify-center">
            <DangerTriangle className="h-14 w-14 text-destructive md:h-20 md:w-20" />
          </div>

          <h1
            className={cn(
              "text-center text-2xl font-bold text-primary md:text-4xl",
              aeonik.className,
            )}
          >
            Oops, something went wrong
          </h1>

          <div className="space-y-2">
            <p
              className={cn(
                "mx-auto text-lg font-normal text-muted-foreground",
                inter.variable,
              )}
            >
              An error occurred while loading this page.
            </p>
            {error.digest && (
              <p
                className={cn(
                  "mx-auto text-base font-normal text-muted-foreground",
                  inter.variable,
                )}
              >
                Error ID: {error.digest}
              </p>
            )}
          </div>

          <Button variant="secondary" size="lg" onClick={reset}>
            Try again
          </Button>
        </div>
      </main>
    </div>
  );
}
