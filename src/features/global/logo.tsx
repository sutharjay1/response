"use client";

import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Monitor } from "lucide-react";
import Link from "next/link";

type Props = {
  text?: string;
  show?: boolean;
};

const Logo = ({ text, show = true }: Props) => {
  const { user } = useUser();

  return (
    <Link
      href={user ? "/dashboard" : "/"}
      className="relative flex items-center"
    >
      <div
        className={cn(
          "relative flex h-8 w-fit items-center justify-center rounded-lg px-2",
          !show && "pb-12",
        )}
      >
        <Monitor size={show ? 25 : 75} />
        {show ? (
          <span className={cn("px-2 text-lg font-bold", text)}>Response</span>
        ) : null}
      </div>
    </Link>
  );
};

export default Logo;
