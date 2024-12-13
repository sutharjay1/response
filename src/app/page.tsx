import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { Separator } from "@/components/ui/separator";
import { aeonik, geistSans, inter } from "@/features/font";
import Logo from "@/features/global/logo";
import { Nav } from "@/features/root/nav-bar";
import { cn } from "@/lib/utils";
import {
  BrandGithubSolid,
  ChartBarTwo,
  ChartLine,
  ChartPieTwo,
  CheckWaves,
  Database,
  Earth,
  HardDrive,
  Lock,
  Swatches,
  UsersGroup,
} from "@mynaui/icons-react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

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
] as const;

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
] as const;

export default function Home() {
  posthog.capture("my event", { property: "value" });

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mx-8 mt-3 h-full w-full rounded-3xl">
          <main className="mx-auto h-full max-w-6xl px-4 py-12">
            <div className="mb-12 w-full text-center">
              <Badge
                icon={<CheckWaves className="h-4 w-4" />}
                variant="default"
                className="mb-4 rounded-full border border-input py-1 text-sm font-medium"
              >
                Response Beta
              </Badge>

              <h1
                className={cn(
                  "mb-4 text-4xl font-bold md:text-5xl",
                  aeonik.className,
                )}
              >
                Streamlined for{" "}
                <span
                  className={cn(
                    "font-semibold text-[#FF6B6B]",
                    aeonik.className,
                  )}
                >
                  Feedback
                </span>
                <br />
                Better Experiences
              </h1>

              <p
                className={cn(
                  "mb-8 text-lg font-normal text-muted-foreground md:text-xl",
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

            <div className="space-y-4 rounded-xl border-[#7c533a]/10 bg-sidebar p-4">
              <Browser className="h-[28rem] w-full">
                <section className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-b-xl border-x border-b">
                  <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                      <ReviewCard key={review.username} {...review} />
                    ))}
                  </Marquee>
                  <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                      <ReviewCard key={review.username} {...review} />
                    ))}
                  </Marquee>
                  <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
                </section>
              </Browser>
            </div>
          </main>
        </div>

        <div className="mx-4 my-3 h-full w-full rounded-3xl md:mx-8">
          <main className="mx-auto w-full space-y-12 px-4 pb-12 md:max-w-6xl lg:px-4">
            <BlurFade delay={0.1} inView>
              <div className="relative z-10 flex flex-col items-center justify-center rounded-2xl border border-[#7c533a]/10 bg-sidebar px-4 py-6 text-center">
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
            </BlurFade>

            <BlurFade delay={0.1} inView>
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
            </BlurFade>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  badge: "Feedback Collection",
                  icon: Swatches,
                  title: "Ease of Use",
                  description:
                    "Collect meaningful feedback effortlessly using our dynamic forms. Support both video and text responses to understand your users better.",
                  color: "bg-gradient-to-br from-[#201e1d] to-[#37322f]",
                },
                {
                  badge: "Actionable Insights",
                  icon: HardDrive,
                  title: "Data to Insights",
                  description:
                    "Turn feedback into actionable insights with advanced analytics. Gain clarity on user sentiment and make data-driven decisions with ease.",
                  color: "bg-gradient-to-br from-[#37322f] to-[#201e1d]",
                },
              ].map(({ badge, icon: Icon, title, description, color }) => (
                <BlurFade delay={0.1} inView key={title}>
                  <div
                    className={cn(
                      "flex flex-col justify-between rounded-3xl p-8 shadow-lg lg:p-12",
                      color,
                    )}
                  >
                    <Badge
                      icon={<Icon className="h-4 w-4" />}
                      variant="default"
                      className="mb-4 w-fit rounded-full border border-[#201e1d]/80 bg-[#37322f] py-1 text-sm font-medium text-sidebar hover:bg-[#37322f]"
                    >
                      {badge}
                    </Badge>

                    <h1
                      className={cn(
                        "mb-4 text-4xl font-bold text-white md:text-5xl",
                        aeonik.className,
                      )}
                    >
                      {title}
                    </h1>

                    <p
                      className={cn(
                        "mb-0 max-w-md text-lg font-normal leading-snug text-white/80",
                        inter.variable,
                      )}
                    >
                      {description}
                    </p>
                  </div>
                </BlurFade>
              ))}
            </div>
          </main>
        </div>
      </div>

      <footer className="relative mx-2 mb-2 overflow-hidden rounded-3xl bg-[#201e1d] px-4 py-8 text-sidebar sm:px-6 lg:px-8">
        <div className="relative z-10 h-60 w-full text-center">
          <div className="absolute left-1/2 -translate-x-1/2 translate-y-[140%] text-[108px] font-bold leading-none md:translate-y-[22%] md:text-[278px]">
            <span className="select-none bg-gradient-to-b from-transparent to-neutral-700/50 bg-clip-text text-transparent">
              response
            </span>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3">
            <div className="h-56 w-56 rounded-full border-[20px] border-[#7c533a]/60 blur-[80px]"></div>
          </div>
        </div>

        <div className="container absolute left-0 right-0 top-0 z-50 mx-auto mt-6 flex w-full max-w-5xl flex-col items-center">
          <div className="mt-4 flex w-full flex-col items-center justify-around gap-6 md:flex-row">
            <Logo />
            <nav className="flex w-fit flex-wrap items-center justify-center gap-5 gap-y-3 lg:flex-nowrap lg:gap-12">
              <span
                className={cn(
                  "flex items-center space-x-1 text-sm font-medium leading-7",
                  geistSans.className,
                )}
              >
                <span>Building in public by</span>
                {/* <Separator orientation="vertical" className=" h-4" /> */}
                <Button asChild variant="link" className="px-0 text-sidebar">
                  <Link
                    href="https://peerlist.io/sutharjay"
                    target="_blank"
                    aria-label="Jay Suthar"
                    className=" "
                  >
                    Jay Suthar
                  </Link>
                </Button>
              </span>
            </nav>
            <div className="flex w-fit items-center gap-3">
              <Link
                href="https://github.com/sutharjay1/response"
                target="_blank"
                aria-label="Response GitHub repository"
              >
                <BrandGithubSolid className="h-6 w-6" />
              </Link>
              <Separator
                orientation="vertical"
                className="h-6 bg-sidebar-border/20"
              />
              <Link
                href="https://peerlist.io/sutharjay"
                target="_blank"
                aria-label="Response GitHub repository"
              >
                <Image
                  src="https://res.cloudinary.com/cdn-feedback/image/upload/v1733355730/response/peerlist.png"
                  alt="Peerlist logo"
                  width={32}
                  height={32}
                />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Browser({
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

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function ReviewCard({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",

        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",

        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="32"
          height="32"
          alt=""
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
}
