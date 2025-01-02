import { geistSans } from "@/features/font";
import { Nav } from "@/features/root/nav-bar";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-svh flex-1 flex-col border border-[#7c533a]/10 bg-sidebar peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-4 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl">
      <Nav className="pb-0" />
      <main
        className={cn(
          "m:px-6 relative z-10 flex h-fit flex-1 flex-col items-center justify-center rounded-xl bg-[#f3f2f1] shadow-inner md:m-4 lg:px-8",
          geistSans.className,
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default layout;
