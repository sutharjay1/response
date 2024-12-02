"use client";

import {
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

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
import { NavSecondary } from "@/features/dashboard/nav-secondary";
import { NavUser } from "@/features/dashboard/nav-user";
import { useProject } from "@/hooks/use-project";

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
        icon: SquareTerminal,
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
        icon: Frame,
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
        icon: Settings2,
        isActive: true,
        items: [
          {
            title: "General Settings",
            url: `/projects/${project?.id}/settings`,
          },
        ],
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
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
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
