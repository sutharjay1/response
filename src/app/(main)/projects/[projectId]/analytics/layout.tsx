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
    <div className="mx-auto w-full max-w-screen-8xl space-y-6">
      {children}
      {projectInfo}
      {analytics}
    </div>
  );
}
