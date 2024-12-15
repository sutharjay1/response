import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TSmall } from "@/components/ui/typography";
import ContinueWithGoogle from "@/features/auth/continue-with-google";
import { geistSans } from "@/features/font";
import Logo from "@/features/global/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SignIn = () => {
  return (
    <main
      className={cn(
        "relative z-10 flex h-screen items-center justify-center bg-background",
        geistSans.className,
      )}
    >
      <Card className="group overflow-hidden rounded-3xl border-none bg-muted/40 px-2 pt-2 shadow-none transition-all">
        <div className="rounded-3xl bg-sidebar pt-1 shadow-sm">
          <CardHeader className="m-2 flex items-center justify-center gap-2 space-y-0 border-b bg-sidebar py-5 sm:flex-row">
            <Logo show={false} />
          </CardHeader>
          <CardContent className="mx-auto flex w-full items-center justify-center rounded-3xl bg-sidebar px-2 pt-4 sm:px-6 sm:pt-6">
            <ContinueWithGoogle />
          </CardContent>
        </div>
        <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-2">
          <TSmall className="text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Button
              asChild
              variant="link"
              className="h-auto px-1 text-xs font-medium text-primary"
            >
              <Link href="#">Terms of Service</Link>
            </Button>
            and{" "}
            <Button
              asChild
              variant="link"
              className="h-auto px-1 text-xs font-medium text-primary"
            >
              <Link href="#">Privacy Policy</Link>
            </Button>
            .
          </TSmall>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignIn;
