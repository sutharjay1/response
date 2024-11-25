// // "use client";

// // import { Input } from "@/components/ui/input";
// // import { useProject } from "@/hooks/use-project";
// // import { cn } from "@/lib/utils";
// // import { Check, Copy } from "lucide-react";
// // import { usePathname } from "next/navigation";
// // import { useRef, useState } from "react";
// // import Hint from "../global/hint";

// // const ProjectLink = () => {
// //   const { project } = useProject();
// //   const pathname = usePathname();
// //   const [copied, setCopied] = useState<boolean>(false);
// //   const inputRef = useRef<HTMLInputElement>(null);

// //   const handleCopy = () => {
// //     if (inputRef.current) {
// //       navigator.clipboard.writeText(inputRef.current.value);
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 1500);
// //     }
// //   };

// //   return pathname.startsWith("/projects") ? (
// //     <div className="space-y-2">
// //       <div className="relative w-96">
// //         <Input
// //           ref={inputRef}
// //           id="input-53"
// //           className="w-72"
// //           type="text"
// //           defaultValue={`${window.location.origin}/submit/${project?.id}`}
// //           readOnly
// //         />

// //         <Hint label="Copy to clipboard" side="bottom">
// //           <button
// //             onClick={handleCopy}
// //             className="absolute inset-y-0 right-0 flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 outline-offset-2 transition-colors read-only:bg-muted hover:text-foreground focus-visible:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed"
// //             aria-label={copied ? "Copied" : "Copy to clipboard"}
// //             disabled={copied}
// //           >
// //             <div
// //               className={cn(
// //                 "transition-all",
// //                 copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
// //               )}
// //             >
// //               <Check
// //                 className="stroke-emerald-500"
// //                 size={16}
// //                 strokeWidth={2}
// //                 aria-hidden="true"
// //               />
// //             </div>
// //             <div
// //               className={cn(
// //                 "absolute transition-all",
// //                 copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
// //               )}
// //             >
// //               <Copy size={16} strokeWidth={2} aria-hidden="true" />
// //             </div>
// //           </button>
// //         </Hint>
// //       </div>
// //     </div>
// //   ) : null;
// // };

// // export default ProjectLink;

// "use client";

// import { useState, useRef } from "react";
// import { usePathname } from "next/navigation";
// import { Check, Copy, Share2 } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useProject } from "@/hooks/use-project";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { successToast } from "../global/toast";

// const ProjectLink = () => {
//   const { project } = useProject();
//   const pathname = usePathname();
//   const [copied, setCopied] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   if (!pathname.startsWith("/projects") || !project?.id) return null;

//   const shareLink = `${window.location.origin}/submit/${project.id}`;

//   const handleCopy = () => {
//     if (inputRef.current) {
//       navigator.clipboard.writeText(inputRef.current.value);
//       setCopied(true);
//       successToast("Copied to clipboard", { duration: 1500 });
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline">
//           <Share2 className="mr-2 h-4 w-4" />
//           <span className="hidden md:flex">Share Form</span>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80" align="end">
//         <div className="space-y-4">
//           <h4 className="font-medium leading-none">Form Share Link</h4>
//           <p className="text-sm text-muted-foreground">
//             Anyone with this link can submit to your form.
//           </p>
//           <div className="flex space-x-2">
//             <Input
//               ref={inputRef}
//               value={shareLink}
//               readOnly
//               className="w-[300px]"
//             />
//             <Button size="icon" onClick={handleCopy}>
//               {copied ? (
//                 <Check className="h-4 w-4" />
//               ) : (
//                 <Copy size={16} strokeWidth={2} aria-hidden="true" />
//               )}
//               <span className="sr-only">
//                 {copied ? "Copied" : "Copy to clipboard"}
//               </span>
//             </Button>
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default ProjectLink;

"use client";

import { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Check, Copy, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProject } from "@/hooks/use-project";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { successToast } from "../global/toast";

const ProjectLink = () => {
  const { project } = useProject();
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!pathname.startsWith("/projects") || !project?.id) return null;

  const shareLink = `${window.location.origin}/submit/${project.id}`;

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value);
      setCopied(true);
      successToast("Copied to clipboard", { duration: 1500 });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Project
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-1 text-lg font-medium">
                    Project Share Link
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Anyone with this link can submit to your project.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative flex items-center space-x-2">
                    <Input
                      ref={inputRef}
                      value={shareLink}
                      readOnly
                      className="pr-10"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className={cn(
                        "ml-2 px-3 py-4 transition-all",
                        copied && "text-green-500",
                      )}
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {copied ? "Copied" : "Copy to clipboard"}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share your project</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ProjectLink;
