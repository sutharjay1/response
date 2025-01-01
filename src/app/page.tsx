import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { Separator } from "@/components/ui/separator";
import { TextLoop } from "@/components/ui/text-loop";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { TLarge, TSmall } from "@/components/ui/typography";
import { aeonik, geistSans, inter } from "@/features/font";
import Logo from "@/features/global/logo";
import { FreePG } from "@/features/pg/free";
import { ProButton } from "@/features/pg/layout";
import { Browser } from "@/features/root/browser";
import { response } from "@/features/root/config";
import { Nav } from "@/features/root/nav-bar";
import { ReviewCard } from "@/features/root/review-card";
import { SkewedInfiniteScroll } from "@/features/root/skewed-infinite-scroll";
import { cn, formatPrice } from "@/lib/utils";
import {
  BrandGithubSolid,
  ChartBarTwo,
  CheckWaves,
  Code,
  Database,
  FileCheck,
  Rocket,
  Rupee,
  Video,
} from "@mynaui/icons-react";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";

export default async function Home() {
  posthog.capture("my event", { property: "value" });

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mx-8 mt-3 h-full w-full rounded-3xl">
          <main className="mx-auto h-full max-w-6xl px-4 pb-3 pt-12 md:py-12">
            <BlurFade delay={0.1} inView>
              <div className="mb-12 w-full text-center">
                <Badge
                  icon={<CheckWaves className="h-4 w-4" />}
                  variant="default"
                  className="mb-6 rounded-full border border-input py-1 text-sm font-medium"
                >
                  {response.heading.badge}
                </Badge>

                <h1
                  className={cn(
                    "mb-4 text-4xl font-bold md:text-5xl",
                    aeonik.className,
                  )}
                >
                  <TextShimmer duration={2}>{response.heading.one}</TextShimmer>{" "}
                  {response.heading.two}
                  <br />
                  <span
                    className={cn(
                      "font-semibold text-[#FF6B6B]",
                      aeonik.className,
                    )}
                  >
                    <TextLoop>
                      {response.heading.four}
                      {response.heading.three}
                    </TextLoop>
                  </span>
                </h1>

                <p
                  className={cn(
                    "mx-auto mb-8 max-w-lg text-lg font-normal text-muted-foreground md:text-xl",
                    inter.variable,
                  )}
                >
                  {response.highlight.message}
                </p>

                <Button
                  className="rounded-2xl border border-[#201e1d]/80 px-8 py-4 font-medium shadow-inner"
                  asChild
                >
                  <Link href="/signin">Get started for free</Link>
                </Button>
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <Card className="group overflow-hidden rounded-3xl border-none bg-muted/40 p-3 shadow-none transition-all md:p-4">
                <div className="space-y-4 rounded-2xl bg-sidebar">
                  <Browser
                    className="h-[28rem] w-full rounded-2xl"
                    tabClassName="rounded-t-2xl"
                  >
                    <section className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-b-2xl">
                      <Marquee pauseOnHover className="[--duration:20s]">
                        {response.reviews
                          .slice(0, response.reviews.length / 2)
                          .map((review) => (
                            <ReviewCard key={review.username} {...review} />
                          ))}
                      </Marquee>
                      <Marquee
                        reverse
                        pauseOnHover
                        className="[--duration:20s]"
                      >
                        {response.reviews
                          .slice(response.reviews.length / 2)
                          .map((review) => (
                            <ReviewCard key={review.username} {...review} />
                          ))}
                      </Marquee>
                      <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
                      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
                    </section>
                  </Browser>
                </div>
              </Card>
            </BlurFade>
          </main>
        </div>

        <div className="mx-4 my-3 h-full w-full rounded-3xl md:mx-8">
          <main className="mx-auto w-full space-y-12 px-4 pb-12 md:max-w-6xl lg:px-4">
            <BlurFade delay={0.1} inView className="py-8">
              <Card className="group overflow-hidden rounded-3xl border-none bg-muted/40 p-2 shadow-none transition-all">
                <div className="relative z-10 flex flex-col-reverse items-start justify-center rounded-2xl border border-[#7c533a]/10 bg-sidebar p-6 text-center md:flex-row">
                  <div className="ml-2 mt-4 flex w-full flex-col items-start justify-start gap-y-4 md:ml-4 md:mt-0">
                    <Badge
                      icon={<Database className="h-4 w-4" />}
                      variant="default"
                      className="mb-4 rounded-full border border-input py-1 text-sm font-medium"
                    >
                      {response.cta.badge}
                    </Badge>

                    <div className="flex flex-1 flex-col space-y-1">
                      <h2
                        className={cn(
                          "text-left text-4xl font-bold",
                          aeonik.className,
                        )}
                      >
                        {response.cta.title.one}{" "}
                        <span
                          className={cn(
                            "font-semibold text-[#FF6B6B]",
                            aeonik.className,
                          )}
                        >
                          {response.cta.title.two}
                        </span>
                      </h2>

                      <TSmall
                        className={cn(
                          "mb-4 text-left text-lg font-normal leading-snug text-muted-foreground",
                          inter.variable,
                        )}
                      >
                        {response.cta.description}
                      </TSmall>
                    </div>

                    <Button
                      className="mt-4 rounded-2xl border border-[#201e1d]/80 px-8 py-4 font-medium shadow-inner"
                      asChild
                    >
                      <Link href="/signin">{response.cta.button}</Link>
                    </Button>
                  </div>
                  <SkewedInfiniteScroll reviews={response.reviews} />
                </div>
              </Card>
            </BlurFade>

            <BlurFade delay={0.1} inView className="pb-8">
              <div className="mx-auto mb-8 flex w-full flex-col items-center justify-center space-y-2 md:mb-12">
                <div className="flex w-fit items-center justify-center">
                  <Badge
                    icon={<ChartBarTwo className="h-4 w-4" />}
                    variant="default"
                    className="mx-auto mb-4 ml-2 rounded-full border border-input py-1 text-sm font-medium"
                  >
                    {response.features.badge}
                  </Badge>
                </div>
                <h2
                  className={cn(
                    "text-center text-3xl font-bold",
                    aeonik.className,
                  )}
                >
                  {response.features.title}
                </h2>
                <TSmall
                  className={cn(
                    "mb-4 text-center text-lg font-normal text-muted-foreground",
                    inter.variable,
                  )}
                >
                  {response.features.description}
                </TSmall>
              </div>

              <div className="mt-10 grid h-fit place-items-center gap-4 md:-mt-2 lg:grid-cols-3">
                <BlurFade delay={0.2} inView>
                  <Card className="group relative overflow-hidden rounded-lg border-none shadow-none transition-all max-lg:rounded-l-lg lg:row-span-2 lg:rounded-l-[2rem]">
                    <div className="overflow-hidden rounded-lg bg-muted/40 max-lg:rounded-t-lg lg:rounded-l-[2rem]">
                      <div className="absolute inset-px m-2 rounded-lg bg-sidebar max-lg:rounded-lg lg:rounded-l-[2rem]" />
                      <div className="relative flex h-fit flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-lg lg:rounded-l-[calc(2rem+1px)]">
                        <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                          <div className="flex w-fit items-center justify-center">
                            <Badge
                              variant="default"
                              className="mx-auto mb-1 ml-2 rounded-full border border-input py-1 text-sm font-medium"
                            >
                              {response.features.items.one.available}
                            </Badge>
                          </div>
                          <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                            {response.features.items.one.title}
                          </p>
                          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                            {response.features.items.one.description}
                          </p>
                        </div>
                        <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm max-lg:rounded-b-lg">
                          <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                            <img
                              className="size-full object-cover object-top"
                              src={response.features.items.one.image}
                              alt={response.features.items.one.title}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </BlurFade>

                <BlurFade
                  delay={0.2}
                  inView
                  className="h-full max-lg:row-start-1"
                >
                  <div className="flex h-full flex-1 flex-col items-start max-lg:row-start-1">
                    <Card className="group relative flex h-full w-full flex-1 flex-col overflow-hidden rounded-lg border-none shadow-none transition-all max-lg:row-start-1 max-lg:rounded-t-[calc(2rem+1px)]">
                      <div className="w-full overflow-hidden rounded-lg bg-muted/40">
                        <div className="absolute inset-px m-2 rounded-lg bg-sidebar max-lg:rounded-t-[calc(2rem+1px)]"></div>
                        <div className="relative flex h-full flex-1 flex-col items-center justify-center overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                          <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                              {response.features.items.two.title}
                            </p>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                              {response.features.items.two.description}
                            </p>
                          </div>
                          <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                            <img
                              className="w-full max-lg:max-w-xs"
                              src={response.features.items.two.image}
                              alt={response.features.items.two.title}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className="group relative mt-4 flex h-full flex-1 flex-col overflow-hidden rounded-lg border-none shadow-none transition-all max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                      <div className="w-full overflow-hidden rounded-lg bg-muted/40 max-lg:rounded-t-[2rem]">
                        <div className="absolute inset-px m-2 rounded-lg bg-sidebar"></div>
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                          <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                            <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                              {response.features.items.three.title}
                            </p>
                            <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                              {response.features.items.three.description}
                            </p>
                          </div>
                          <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                            <img
                              className="h-[min(152px,40cqw)] object-cover"
                              src={response.features.items.three.image}
                              alt={response.features.items.three.title}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </BlurFade>

                <BlurFade delay={0.2} inView className="h-full">
                  <Card className="group relative flex h-full flex-col overflow-hidden rounded-lg border-none shadow-none transition-all lg:row-span-2">
                    <div className="overflow-hidden bg-muted/40 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]">
                      <div className="absolute inset-px m-2 rounded-lg bg-sidebar max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
                      <div className="relative flex h-fit flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                        <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                          <p className="mt-2 text-lg font-medium tracking-tight text-gray-950 max-lg:text-center">
                            {response.features.items.four.title}
                          </p>
                          <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                            {response.features.items.four.description}
                          </p>
                        </div>
                        <div className="relative min-h-[34rem] w-full grow">
                          <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-xl bg-gradient-to-br from-[#37322f] to-[#201e1d] shadow-2xl">
                            <div className="flex bg-[#201e1d]/40 ring-1 ring-white/5">
                              <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                                <div className="bg-[#201e1d]/5 px-4 py-2 text-sidebar">
                                  {response.features.items.four.file[0].name}
                                </div>

                                <Separator
                                  orientation="vertical"
                                  className="bg-[#37322f]"
                                />
                                <div className="border-r border-primary/10 px-4 py-2">
                                  {response.features.items.four.file[1].name}
                                </div>
                              </div>
                            </div>
                            <div className="px-6 pb-14 pt-6">
                              <code className="text-sm/6 font-medium text-gray-400">
                                {response.features.items.four.file[0].code}
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </BlurFade>
              </div>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <div className="mx-auto w-full max-w-5xl pb-8 md:px-4">
                <div className="mx-auto mb-8 flex w-full flex-col items-center justify-center space-y-2">
                  <div className="flex w-fit items-center justify-center">
                    <Badge
                      icon={<Rupee className="h-4 w-4" />}
                      variant="default"
                      className="mx-auto mb-4 ml-2 rounded-full border border-input py-1 text-sm font-medium"
                    >
                      {response.pricing.badge}
                    </Badge>
                  </div>
                  <h2
                    className={cn(
                      "text-center text-3xl font-bold",
                      aeonik.className,
                    )}
                  >
                    {response.pricing.title}
                  </h2>
                  <TSmall
                    className={cn(
                      "mb-4 text-center text-lg font-normal text-muted-foreground",
                      inter.variable,
                    )}
                  >
                    {response.pricing.description}
                  </TSmall>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card className="group overflow-hidden rounded-3xl border-none bg-muted/40 p-2 shadow-none transition-all">
                    <div className="rounded-3xl bg-sidebar py-1 shadow-sm">
                      <CardHeader className="m-2 flex flex-col items-start gap-2 space-y-0 bg-sidebar py-2">
                        <TSmall className="font-inter text-base font-normal text-muted-foreground">
                          {response.pricing.plans.free.name}
                        </TSmall>

                        <TLarge
                          className={cn("pb-4 text-4xl", aeonik.className)}
                        >
                          {response.pricing.plans.free.price}
                        </TLarge>

                        <FreePG />
                      </CardHeader>
                      <CardContent className="space-y-3 rounded-b-3xl border-t border-dashed bg-sidebar px-6 pt-4 sm:pt-6">
                        <TSmall className="font-inter font-normal">
                          {response.pricing.plans.free.message}
                        </TSmall>
                        <ul className="space-y-2">
                          {response.pricing.plans.free.features.map(
                            (feature, index) => (
                              <li className="flex items-center" key={feature}>
                                {index === 0 ? (
                                  <FileCheck className="mr-2 h-5 w-5" />
                                ) : index === 1 ? (
                                  <Video className="mr-2 h-5 w-5" />
                                ) : (
                                  <Code className="mr-2 h-5 w-5" />
                                )}
                                {feature}
                              </li>
                            ),
                          )}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>

                  <Card className="group overflow-hidden rounded-3xl border-none bg-muted/40 p-2 shadow-none transition-all">
                    <div className="rounded-3xl bg-sidebar py-1 shadow-sm">
                      <CardHeader className="m-2 flex flex-col items-start gap-2 space-y-0 bg-sidebar py-2">
                        <TSmall className="font-inter text-base font-normal text-muted-foreground">
                          {response.pricing.plans.pro.name}
                        </TSmall>

                        <TLarge
                          className={cn("pb-4 text-4xl", aeonik.className)}
                        >
                          {formatPrice({
                            price: response.pricing.plans.pro.price,
                          })}
                        </TLarge>

                        <ProButton />
                      </CardHeader>
                      <CardContent className="space-y-3 rounded-b-3xl border-t border-dashed bg-sidebar px-6 pt-4 sm:pt-6">
                        <TSmall className="font-inter font-normal">
                          {response.pricing.plans.pro.message}
                        </TSmall>
                        <ul className="space-y-2">
                          {response.pricing.plans.pro.features.map(
                            (feature, index) => (
                              <li className="flex items-center" key={feature}>
                                {index === 0 ? (
                                  <FileCheck className="mr-2 h-5 w-5" />
                                ) : index === 1 ? (
                                  <Video className="mr-2 h-5 w-5" />
                                ) : (
                                  <Code className="mr-2 h-5 w-5" />
                                )}
                                {feature}
                              </li>
                            ),
                          )}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>

                  <Card className="group overflow-hidden rounded-3xl border-none bg-muted/40 p-2 shadow-none transition-all">
                    <div className="rounded-3xl bg-sidebar py-1 shadow-sm">
                      <CardHeader className="m-2 flex flex-col items-start gap-2 space-y-0 bg-sidebar py-2">
                        <TSmall className="font-inter text-base font-normal text-muted-foreground">
                          {response.pricing.plans.premium.name}
                        </TSmall>

                        <TLarge
                          className={cn("pb-4 text-4xl", aeonik.className)}
                        >
                          {formatPrice({
                            price: response.pricing.plans.premium.price,
                          })}
                        </TLarge>

                        <Button className="w-full">Get Started</Button>
                      </CardHeader>
                      <CardContent className="space-y-3 rounded-b-3xl border-t border-dashed bg-sidebar px-6 pt-4 sm:pt-6">
                        <TSmall className="font-inter font-normal">
                          {response.pricing.plans.premium.message}
                        </TSmall>
                        <ul className="space-y-2">
                          {response.pricing.plans.premium.features.map(
                            (feature, index) => (
                              <li className="flex items-center" key={feature}>
                                {index === 0 ? (
                                  <FileCheck className="mr-2 h-5 w-5" />
                                ) : index === 1 ? (
                                  <Video className="mr-2 h-5 w-5" />
                                ) : (
                                  <Code className="mr-2 h-5 w-5" />
                                )}
                                {feature}
                              </li>
                            ),
                          )}
                        </ul>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <div className="mx-auto py-5">
                <div className="mx-auto mb-8 flex w-full flex-col items-center justify-center space-y-2">
                  <div className="flex w-fit items-center justify-center">
                    <Badge
                      icon={<Rocket className="h-4 w-4" />}
                      variant="default"
                      className="mx-auto mb-4 ml-2 rounded-full border border-input py-1 text-sm font-medium"
                    >
                      {response.extra.badge}
                    </Badge>
                  </div>
                  <h2
                    className={cn(
                      "text-center text-3xl font-bold",
                      aeonik.className,
                    )}
                  >
                    {response.extra.title}
                  </h2>
                  <TSmall
                    className={cn(
                      "mb-4 text-center text-lg font-normal text-muted-foreground",
                      inter.variable,
                    )}
                  >
                    {response.extra.description}
                  </TSmall>
                </div>

                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                  {response.extra.items.map(
                    ({ badge, icon: Icon, title, description, color }) => (
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

                          <TSmall
                            className={cn(
                              "mb-0 max-w-md text-lg font-normal leading-snug text-white/80",
                              inter.variable,
                            )}
                          >
                            {description}
                          </TSmall>
                        </div>
                      </BlurFade>
                    ),
                  )}
                </div>
              </div>
            </BlurFade>
          </main>
        </div>
      </div>

      <BlurFade delay={0.1} inView>
        <footer className="relative mx-2 mb-2 overflow-hidden rounded-3xl bg-gradient-to-br from-[#37322f] to-[#201e1d] px-4 py-8 text-sidebar sm:px-6 lg:px-8">
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
                  <span>Made by</span>
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
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/5 hover:text-current"
                >
                  <Link
                    href="https://github.com/sutharjay1/response"
                    target="_blank"
                    aria-label="Response GitHub repository"
                  >
                    <BrandGithubSolid className="h-6 w-6" />
                  </Link>
                </Button>
                <Separator
                  orientation="vertical"
                  className="h-6 bg-sidebar-border/20"
                />
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="hover:bg-accent/5 hover:text-current"
                >
                  <Link
                    href="https://peerlist.io/sutharjay"
                    target="_blank"
                    aria-label="Response GitHub repository"
                    className="p-1.5"
                  >
                    <Image
                      src="https://res.cloudinary.com/cdn-feedback/image/upload/v1733355730/response/peerlist.png"
                      alt="Peerlist logo"
                      width={32}
                      height={32}
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </BlurFade>
    </div>
  );
}
