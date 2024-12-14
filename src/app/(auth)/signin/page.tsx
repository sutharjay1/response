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
      <Card className="box-border overflow-hidden bg-sidebar shadow-[0_0_1px_rgba(0,0,0,0.118),0_8px_8px_rgba(0,0,0,0.118)] transition-all hover:shadow-md">
        <CardHeader className="flex items-center justify-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <Logo show={false} />
        </CardHeader>
        <CardContent className="mx-auto flex w-full items-center justify-center px-2 pt-4 sm:px-6 sm:pt-6">
          <ContinueWithGoogle />
        </CardContent>
        <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
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
