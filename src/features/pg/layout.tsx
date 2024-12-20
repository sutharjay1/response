"use client";
import { QueryProvider } from "@/providers/query-provider";
import { ProPG } from "./pro";

export const ProButton = () => {
  return (
    <QueryProvider>
      <ProPG />
    </QueryProvider>
  );
};
