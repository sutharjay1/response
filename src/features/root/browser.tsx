import { cn } from "@/lib/utils";
import { Lock } from "@mynaui/icons-react";
import { geistSans } from "../font";

export function Browser({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative w-full rounded-xl border bg-sidebar text-sm shadow dots-gray-300 dark:dots-neutral-800",
        className,
        geistSans.className,
      )}
    >
      <div className="z-50 flex w-full items-center justify-between rounded-t-xl border-b-2 border-[#201e1d]/10 bg-[#37322f] bg-inherit px-4 py-2">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-sidebar-border" />
          <div className="h-3 w-3 rounded-full bg-sidebar-border" />
          <div className="h-3 w-3 rounded-full bg-sidebar-border" />
        </div>
        <div className="flex w-fit min-w-fit items-center justify-center gap-2 rounded-md border border-inherit px-2 py-1 font-sans">
          <Lock className="h-4 w-4" />
          <span
            className={cn(
              "flex items-center justify-center text-sm font-normal text-primary",
              geistSans.className,
            )}
          >
            yourwebsite.com
          </span>
        </div>
        <div />
      </div>
      <div className="absolute left-0 top-0 z-20 h-full w-full pt-12">
        {children}
      </div>
    </div>
  );
}
