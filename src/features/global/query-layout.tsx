"use client";

import { QueryProvider } from "@/providers/query-provider";
import React from "react";

export const QueryLayout = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};
