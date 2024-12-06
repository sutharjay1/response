import React from "react";

export default function AnalyticsParellelLayout({
  children,
  url,

  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  url: React.ReactNode;
}) {
  return (
    <>
      {children}
      {analytics}
      {url}
    </>
  );
}
