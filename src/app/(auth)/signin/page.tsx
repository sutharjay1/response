import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
import ContinueWithGoogle from "@/features/auth/continue-with-google";
import { geistSans } from "@/features/font";
import Logo from "@/features/global/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SignIn = () => {
  return (
    <main
      className={cn(
        "relative z-10 h-screen bg-background",
        geistSans.className,
      )}
    >
      <div className="flex h-screen flex-col items-center justify-center bg-background">
        <div className="w-full max-w-[400px] space-y-8 px-4">
          <div className="flex flex-col items-center space-y-4">
            <Logo text="text-4xl sm:text-5xl lg:text-5xl" show={false} />
            <H1 className="font-inter mb-6 text-xl font-semibold tracking-tight sm:text-2xl lg:text-2xl">
              Login to Platform
            </H1>
          </div>

          <div className="space-y-3">
            <ContinueWithGoogle />

            <div className="flex justify-center">
              <P className="w-full text-center text-sm text-muted-foreground [&:not(:first-child)]:mt-0">
                By continuing, you agree to our
                <Button
                  asChild
                  variant="link"
                  className="h-auto p-0 px-1 text-sm font-normal"
                >
                  <Link href="#">Terms</Link>
                </Button>
                and
                <Button
                  asChild
                  variant="link"
                  className="h-auto p-0 px-1 pt-1 text-sm font-normal"
                >
                  <Link href="#">Privacy Policy</Link>
                </Button>
              </P>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
