"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useProject } from "@/hooks/use-project";
import { At, ChartBarTwo, FolderTwo } from "@mynaui/icons-react";
import { usePathname } from "next/navigation";

const BreadcrumbInfo = () => {
  const { project } = useProject();
  const pathname = usePathname();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">
            <BreadcrumbPage className="flex items-center gap-2">
              <FolderTwo
                size={16}
                className="h-5 w-5 font-bold"
                strokeWidth={2}
              />{" "}
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage className="flex items-center gap-2">
            <At size={16} className="h-5 w-5 font-bold" strokeWidth={2} />
            {project?.name}
          </BreadcrumbPage>
        </BreadcrumbItem>

        {pathname?.includes("/analytics") && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">
                <ChartBarTwo
                  size={16}
                  className="h-5 w-5 font-bold"
                  strokeWidth={2}
                />
                Analytics
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbInfo;
