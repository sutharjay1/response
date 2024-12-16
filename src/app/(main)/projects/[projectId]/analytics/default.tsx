import React from "react";

export default function AnalyticsParellelLayout({
  children,
  projectInfo,
  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  projectInfo: React.ReactNode;
}) {
  return (
    <>
      {children}
      {projectInfo}
      {analytics}
    </>
  );
}
