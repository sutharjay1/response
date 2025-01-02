"use client";

import { geistSans } from "@/features/font";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        <div>
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </div>
      </main>
    </div>
  );
}
