"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/features/dashboard/nav-main";
import { NavProjects } from "@/features/dashboard/nav-projects";
import { NavUser } from "@/features/dashboard/nav-user";
import { useProject } from "@/hooks/use-project";
import { CogOne, Frame, Terminal } from "@mynaui/icons-react";
import * as React from "react";
import { ProjectDropDown } from "./project-dropdown";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { project } = useProject();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: (
          <Terminal size={16} className="font-semibold" strokeWidth={1.08} />
        ),
        isActive: true,
        items: [
          {
            title: "Overview",
            url: "/dashboard/overview",
          },
          {
            title: "Analytics",
            url: "/dashboard/analytics",
          },
          {
            title: "Reports",
            url: "/dashboard/reports",
          },
        ],
      },
      {
        title: "Projects",
        url: "#",
        icon: <Frame size={16} className="font-semibold" strokeWidth={1.08} />,
        isActive: true,
        items: [
          {
            title: "My Projects",
            url: "/projects",
          },
          {
            title: "Create Project",
            url: `/projects/new`,
          },
          {
            title: "Archived Projects",
            url: "/projects/archived",
          },
          {
            title: "Settings",
            url: `/projects/${project?.id}/settings`,
          },
        ],
      },

      {
        title: "Settings",
        url: "#",
        icon: <CogOne size={16} className="font-semibold" strokeWidth={1.08} />,
        isActive: true,
        items: [
          {
            title: "General Settings",
            url: `/projects/${project?.id}/settings`,
          },
        ],
      },
    ],
    projects: [
      {
        name: "Hall of Frame",
        url: `/hall-of-frame/${project?.id}`,
        icon: <Frame size={16} className="font-semibold" strokeWidth={1.08} />,
      },
    ],
  };

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="bg-background">
              <ProjectDropDown />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="z-10">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
