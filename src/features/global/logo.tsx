"use client";

import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { SlashSquare } from "@mynaui/icons-react";
import Link from "next/link";
import { aeonik } from "../font";

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
          "relative flex h-8 w-fit items-center justify-center rounded-lg",
        )}
      >
        <SlashSquare size={show ? 32 : 48} />
        {show ? (
          <span
            className={cn(
              "px-2 pt-1 text-xl font-bold",
              text,
              aeonik.className,
            )}
          >
            Response
          </span>
        ) : null}
      </div>
    </Link>
  );
};

export default Logo;
