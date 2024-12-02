import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Database } from "@mynaui/icons-react";
import { inter } from "../font";

export default function CTA() {
  return (
    <div className="relative min-h-[600px] w-full overflow-hidden rounded-xl bg-sidebar p-4 py-6">
      <div className="relative z-10 flex min-h-[600px] flex-col items-center justify-center px-4 text-center">
        <Badge
          icon={<Database className="h-4 w-4" />}
          variant="default"
          className="mb-4 ml-2 rounded-full border border-input py-1 text-sm font-medium"
        >
          Quick
        </Badge>

        <h1 className="mb-1 text-4xl font-bold md:text-5xl">
          Connect to feedback
        </h1>

        <p
          className={cn(
            "mb-8 max-w-md text-lg font-normal text-muted-foreground",
            inter.variable,
          )}
        >
          Make your business better with feedback
        </p>
        <div>
          <Button className="rounded-2xl border border-[#201e1d]/80 px-8 py-4 font-medium shadow-inner shadow-slate-400">
            Get started today
          </Button>
        </div>
      </div>
    </div>
  );
}
