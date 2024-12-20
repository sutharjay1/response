import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TLarge } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface PolicyLayoutProps {
  children: React.ReactNode;
  heading: string;
  lastUpdated: string;
  className?: string;
}

export function PolicyLayout({
  children,
  heading,
  lastUpdated,
  className,
}: PolicyLayoutProps) {
  return (
    <ScrollArea>
      <div
        className={cn("container max-w-3xl", className)}
        style={{
          scrollbarWidth: "none",
        }}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <TLarge className="text-3xl font-bold tracking-tight">
              {heading}
            </TLarge>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
