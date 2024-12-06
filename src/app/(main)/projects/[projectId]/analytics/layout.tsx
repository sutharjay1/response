import React from "react";

export default function AnalyticsParellelLayout({
  children,
  url,
  projectInfo,
  analytics,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  url: React.ReactNode;
  projectInfo: React.ReactNode;
}) {
  return (
    <>
      {children}
      {projectInfo}
      {url}
      {analytics}
    </>
  );
}
