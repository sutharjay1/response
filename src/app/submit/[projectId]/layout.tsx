"use client";

import { QueryProvider } from "@/providers/query-provider";
import React from "react";

const SubmitLayout = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default SubmitLayout;
