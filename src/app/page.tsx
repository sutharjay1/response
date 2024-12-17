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
import { TextLoop } from "@/components/ui/text-loop";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { TLarge, TSmall } from "@/components/ui/typography";
import { aeonik, geistSans, inter } from "@/features/font";
import Logo from "@/features/global/logo";
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

export default function Home() {
  posthog.capture("my event", { property: "value" });

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mx-8 mt-3 h-full w-full rounded-3xl">
          <main className="mx-auto h-full max-w-6xl px-4 py-12">
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
                  <Link href="/signin">Get started</Link>
                </Button>
              </div>
            </BlurFade>
            <BlurFade delay={0.1} inView>
              <div className="space-y-4 rounded-xl border-none border-[#7c533a]/10 bg-muted/40 p-4">
                <Browser className="h-[28rem] w-full">
                  <section className="relative z-10 flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-b-xl border-x border-b">
                    <Marquee pauseOnHover className="[--duration:20s]">
                      {response.reviews
                        .slice(0, response.reviews.length / 2)
                        .map((review) => (
                          <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]">
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
              <div className="mx-auto mb-8 flex w-full flex-col items-center justify-center space-y-2">
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {response.features.items.map((feature) => (
                  <BlurFade delay={0.1} inView key={feature.id}>
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
                        <CardContent className="rounded-3xl bg-sidebar px-2 pb-4 pt-2 sm:px-4">
                          <Image
                            src={feature.imageSrc}
                            alt={feature.title}
                            width={500}
                            height={500}
                            className="rounded-3xl"
                          />
                        </CardContent>
                      </div>
                      <CardFooter className="flex items-center gap-4 p-4">
                        <feature.icon className="h-6 w-6" /> {feature.footer}
                      </CardFooter>
                    </Card>
                  </BlurFade>
                ))}
              </div>
            </BlurFade>

            <BlurFade delay={0.1} inView>
              <div className="mx-auto w-full max-w-5xl px-4 pb-8">
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

                        <Button className="w-full">Get Started</Button>
                      </CardHeader>
                      <CardContent className="space-y-3 rounded-b-3xl border-t border-dashed bg-sidebar px-2 pt-4 sm:px-6 sm:pt-6">
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

                        <Button className="w-full">Get Started</Button>
                      </CardHeader>
                      <CardContent className="space-y-3 rounded-b-3xl border-t border-dashed bg-sidebar px-2 pt-4 sm:px-6 sm:pt-6">
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
                      <CardContent className="space-y-3 rounded-b-3xl border-t border-dashed bg-sidebar px-2 pt-4 sm:px-6 sm:pt-6">
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
                  <span>Building in public by</span>
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
      </BlurFade>
    </div>
  );
}
