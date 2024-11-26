// import { Button } from "@/components/ui/button";
// import { H1, P } from "@/components/ui/typography";
// import ContinueWithGoogle from "@/features/auth/continue-with-google";
// import { geistSans } from "@/features/font";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { LuSquare } from "react-icons/lu";

// const SignIn = () => {
//   return (
//     <main
//       className={cn(
//         "relative z-10 h-screen bg-background",
//         geistSans.className,
//       )}
//     >
//       <div className="flex h-screen flex-col items-center justify-center bg-background">
//         <div className="w-full max-w-[400px] space-y-8 px-4">
//           <div className="flex flex-col items-center space-y-4">
//             <div className="flex items-center gap-2">
//               <Link
//                 href="/"
//                 className="flex items-center gap-2 text-xl font-semibold"
//               >
//                 <LuSquare className="h-6 w-6" />

//                 <span className="text-xl font-medium tracking-tight text-black">
//                   Response
//                 </span>
//               </Link>
//             </div>
//             <H1 className="mb-6 font-inter text-xl font-semibold tracking-tight sm:text-2xl lg:text-2xl">
//               Login to Platform
//             </H1>
//           </div>

//           <div className="mx-auto flex flex-col items-center space-y-3">
//             <ContinueWithGoogle />

//             <div className="flex justify-center">
//               <P className="w-full text-center text-sm text-muted-foreground [&:not(:first-child)]:mt-0">
//                 By continuing, you agree to our
//                 <Button
//                   asChild
//                   variant="link"
//                   className="h-auto p-0 px-1 text-sm font-normal"
//                 >
//                   <Link href="#">Terms</Link>
//                 </Button>
//                 and
//                 <Button
//                   asChild
//                   variant="link"
//                   className="h-auto p-0 px-1 pt-1 text-sm font-normal"
//                 >
//                   <Link href="#">Privacy Policy</Link>
//                 </Button>
//               </P>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default SignIn;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { P } from "@/components/ui/typography";
import ContinueWithGoogle from "@/features/auth/continue-with-google";
import { geistSans } from "@/features/font";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LuSquare } from "react-icons/lu";

const SignIn = () => {
  return (
    <main
      className={cn(
        "relative z-10 flex h-screen items-center justify-center bg-background",
        geistSans.className,
      )}
    >
      <Card className="overflow-hidden bg-sidebar transition-all hover:shadow-md">
        <CardHeader className="flex items-center justify-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold"
          >
            <LuSquare className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-black">
              Response
            </span>
          </Link>
        </CardHeader>
        <CardContent className="mx-auto flex w-full items-center justify-center px-2 pt-4 sm:px-6 sm:pt-6">
          <ContinueWithGoogle />
        </CardContent>
        <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
          <P className="text-xs text-muted-foreground">
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
          </P>
        </CardFooter>
      </Card>
    </main>
  );
};

export default SignIn;
