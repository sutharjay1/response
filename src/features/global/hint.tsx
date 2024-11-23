import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { P } from "../../components/ui/typography";

export interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
}

const Hint = ({
  label,
  children,
  className,
  side = "right",
  align = "center",
  sideOffset = 10,
  alignOffset = 10,
}: HintProps) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "text-text z-[500] border-[1px] border-zinc-900/5 bg-zinc-100 px-2 py-1 dark:border-zinc-300/10 dark:bg-zinc-900",
          className,
        )}
        alignOffset={alignOffset}
      >
        <P className={cn("font-semibold capitalize")}>{label}</P>
      </TooltipContent>
    </Tooltip>
  );
};

export default Hint;
