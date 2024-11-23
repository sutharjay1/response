import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
import { geistSans } from "@/features/font";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main
        className={cn(
          "relative z-10 min-h-screen bg-gradient-to-b from-[#fdfdfc] via-[#fee7ac] to-[#ffc064]/90",
          geistSans.className,
        )}
      >
        <div className="absolute inset-0 z-0">
          <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:50px_50px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]" />
        </div>

        <section
          className={cn(
            "relative flex h-[calc(100vh-20rem)] flex-col items-center justify-center pt-20 md:pt-24",
          )}
        >
          <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4">
            <div className="mx-auto max-w-3xl text-center">
              <H1 className="font-inter mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-6xl">
                Streamline feedback
                <span className="bg-gradient-to-br from-primary to-primary-foreground bg-clip-text text-transparent">
                  for better experiences
                </span>
              </H1>

              <P className="mx-auto mb-12 max-w-5xl text-base font-light text-muted-foreground md:text-lg">
                Empower your team with Response&apos;s dynamic feedback
                platform. Collect, analyze, and act on user feedback
                effortlessly, whether it&apos;s video or text responses.
                Seamlessly integrate with your workflow and unlock actionable
                insights to improve your products and foster meaningful user
                engagement.
              </P>

              <div className="flex flex-col gap-4 px-2 sm:flex-row sm:justify-center md:px-0">
                <Button
                  size="lg"
                  className="group w-full gap-2 border border-input bg-zinc-100 px-6 hover:bg-zinc-50 sm:w-fit"
                  asChild
                  variant="outline"
                >
                  <Link href="/signin">
                    Start collecting feedback
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-1000 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
