"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logout } from "@mynaui/icons-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

const SettingsBreadCrumb = () => {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
    });
    localStorage.clear();
  };

  const pathname = usePathname();

  return (
    <div
      className={cn(
        pathname.startsWith("/settings")
          ? "flex w-full items-end justify-end"
          : "hidden",
      )}
    >
      <Button variant="destructive" onClick={handleLogout} className="relative">
        <Logout />
        Logout
        <div className="absolute inset-0 rounded-xl ring-2 ring-inset ring-[#500000]/5" />
      </Button>
    </div>
  );
};

export { SettingsBreadCrumb };
