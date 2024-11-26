import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aeonik, inter } from "@/features/font";
import CTA from "@/features/root/cta";
import { DashboardPreview } from "@/features/root/dashboard-preview";
import Features from "@/features/root/features";
import { Nav } from "@/features/root/nav-bar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BsWindowPlus } from "react-icons/bs";
import { ImMeter } from "react-icons/im";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="mx-8 my-3 rounded-3xl">
        <main className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-12 w-full text-center">
            <Badge
              icon={<BsWindowPlus className="h-4 w-4" />}
              variant="default"
              className="mb-4 rounded-full border border-input py-1 text-sm font-medium"
            >
              Response Beta
            </Badge>

            <h1 className={cn("mb-4 text-5xl font-bold", aeonik.className)}>
              Streamlined for{" "}
              <span
                className={cn("font-semibold text-[#FF6B6B]", aeonik.className)}
              >
                Feedback
              </span>
              <br />
              Better Experiences
            </h1>

            <p
              className={cn(
                "mb-8 text-xl font-normal text-muted-foreground",
                inter.variable,
              )}
            >
              Effortlessly collect and analyze feedback.
              <br />
              Unlock insights with video and text responses.
            </p>

            <Button
              className="rounded-2xl border border-[#201e1d]/80 px-8 py-4 font-medium shadow-inner"
              asChild
            >
              <Link href="/signin">Get started</Link>
            </Button>
          </div>

          <DashboardPreview />
        </main>
      </div>

      <div className="mx-8 my-3 rounded-3xl">
        <main className="mx-auto max-w-6xl space-y-12 px-4 py-12">
          <CTA />

          <Features />

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-3xl bg-[#201e1d] p-12 shadow-md">
              <Badge
                icon={<ImMeter className="h-4 w-4" />}
                variant="default"
                className="mb-4 w-fit rounded-full border border-[#201e1d]/80 bg-[#37322f] py-1 text-sm font-medium text-sidebar hover:bg-[#37322f]"
              >
                Feedback Collection
              </Badge>

              <h1 className="mb-4 text-4xl font-bold text-sidebar md:text-5xl">
                Ease of Use
              </h1>

              <p
                className={cn(
                  "mb-0 max-w-md text-lg font-normal leading-snug text-muted-foreground",
                  inter.variable,
                )}
              >
                Collect meaningful feedback effortlessly using our dynamic
                forms. Support both video and text responses to understand your
                users better.
              </p>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#201e1d] p-12 shadow-md">
              <Badge
                icon={<ImMeter className="h-4 w-4" />}
                variant="default"
                className="mb-4 w-fit rounded-full border border-[#201e1d]/80 bg-[#37322f] py-1 text-sm font-medium text-sidebar hover:bg-[#37322f]"
              >
                Actionable Insights
              </Badge>

              <h1 className="mb-4 text-4xl font-bold text-sidebar md:text-5xl">
                Data to Insights
              </h1>

              <p
                className={cn(
                  "mb-0 max-w-md text-lg font-normal leading-snug text-muted-foreground",
                  inter.variable,
                )}
              >
                Turn feedback into actionable insights with advanced analytics.
                Gain clarity on user sentiment and make data-driven decisions
                with ease.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
