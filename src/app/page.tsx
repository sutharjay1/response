import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { aeonik, inter } from "@/features/font";
import { DashboardPreview } from "@/features/root/dashboard-preview";
import { Nav } from "@/features/root/nav-bar";
import { cn } from "@/lib/utils";
import {
  ChartBarTwo,
  ChartLine,
  ChartPieTwo,
  CheckWaves,
  Database,
  Earth,
  HardDrive,
  Swatches,
  UsersGroup,
} from "@mynaui/icons-react";
import Image from "next/image";
import Link from "next/link";

const featuresData = [
  {
    id: 1,
    title: "Average order vs. volume",
    description: "Analytics for average order and volume.",
    footer: "Customize bubble size.",
    imageSrc: "/images/chart1.png",
    Icon: Database,
  },
  {
    id: 2,
    title: "Sales by region",
    description: "Insights from different regions.",
    footer: "Bar chart for regional data.",
    imageSrc: "/images/chart2.png",
    Icon: ChartBarTwo,
  },
  {
    id: 3,
    title: "Category performance",
    description: "Top-performing categories.",
    footer: "Pie chart with segment details.",
    imageSrc: "/images/chart3.png",
    Icon: ChartPieTwo,
  },
  {
    id: 4,
    title: "Global reach",
    description: "Analyze global presence.",
    footer: "Globe chart for global reach.",
    imageSrc: "/images/chart4.png",
    Icon: Earth,
  },
  {
    id: 5,
    title: "User demographics",
    description: "Detailed user demographics.",
    footer: "User chart with segment data.",
    imageSrc: "/images/chart5.png",
    Icon: UsersGroup,
  },
  {
    id: 6,
    title: "Growth trends",
    description: "Track growth over time.",
    footer: "Line chart with trend data.",
    imageSrc: "/images/chart6.png",
    Icon: ChartLine,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="mx-8 my-3 rounded-3xl">
        <main className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-12 w-full text-center">
            <Badge
              icon={<CheckWaves className="h-4 w-4" />}
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
        <main className="mx-auto w-full space-y-12 py-12 md:max-w-6xl md:px-4">
          <div className="relative z-10 flex flex-col items-center justify-center rounded-2xl bg-sidebar px-4 py-6 text-center">
            <Badge
              icon={<Database className="h-4 w-4" />}
              variant="default"
              className="mb-4 ml-2 rounded-full border border-input py-1 text-sm font-medium"
            >
              Quick
            </Badge>

            <h1
              className={cn(
                "mb-1 text-4xl font-bold md:text-5xl",
                aeonik.className,
              )}
            >
              Connect to feedback
            </h1>

            <p
              className={cn(
                "mb-4 max-w-md text-lg font-normal text-muted-foreground",
                inter.variable,
              )}
            >
              Make your business better with feedback
            </p>

            <Button
              className="rounded-2xl border border-[#201e1d]/80 px-8 py-4 font-medium shadow-inner"
              asChild
            >
              <Link href="/signin">Get started</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {featuresData.map((feature) => (
              <Card
                className="group overflow-hidden rounded-3xl border-none bg-muted/40 px-2 pt-2 shadow-none transition-all"
                key={feature.id}
              >
                <div className="rounded-3xl bg-sidebar pt-1 shadow-sm">
                  <CardHeader className="m-2 flex items-center gap-2 space-y-0 border-b bg-sidebar py-2 sm:flex-row">
                    <div className="grid flex-1 gap-1 text-center sm:text-left">
                      <h2
                        className={cn(
                          "text-lg font-semibold text-primary",
                          aeonik.className,
                        )}
                      >
                        {feature.title}
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="rounded-3xl bg-sidebar px-2 pt-4 sm:px-6 sm:pt-6">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.title}
                      width={500}
                      height={500}
                    />
                  </CardContent>
                </div>
                <CardFooter className="flex items-center gap-4 p-0 px-2 py-4">
                  <feature.Icon className="h-4 w-4" /> {feature.footer}
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col justify-between rounded-3xl bg-[#201e1d] p-8 shadow-md lg:p-12">
              <Badge
                icon={<Swatches className="h-4 w-4" />}
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

            <div className="flex flex-col justify-between rounded-3xl bg-[#201e1d] p-8 shadow-md lg:p-12">
              <Badge
                icon={<HardDrive className="h-4 w-4" />}
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
