"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { P } from "@/components/ui/typography";
import { useProject } from "@/hooks/use-project";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Project } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import { getProjectById, getProjects } from "../projects/actions/get-projects";

export function ProjectDropDown({ className }: { className?: string }) {
  const { user } = useUser();
  const { isMobile } = useSidebar();
  const { project, setProject } = useProject();

  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => getProjects(user?.id as string),
    enabled: !!user?.id,
  });

  const { data: currentProject, isLoading: loadingCurrentProject } = useQuery({
    queryKey: ["currentProject", project?.id],
    queryFn: () => getProjectById(project?.id as string),
    enabled: !!project?.id,
  });
  const handleSelectProject = (projectId: string) => {
    setProject(projects?.find((p) => p.id === projectId) as Project);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="rounded-3xl">
            <SidebarMenuButton
              size="lg"
              className={cn(
                "rounded-xl border border-input bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                className,
              )}
            >
              <Avatar className="h-8 w-8">
                {loadingCurrentProject ? (
                  <Skeleton className="h-8 w-8 rounded-full" />
                ) : (
                  <AvatarFallback className="bg-gradient-to-tl from-[#2BC0E4] to-[#EAECC6] text-zinc-900">
                    {currentProject?.name
                      ? currentProject?.name[0].toUpperCase()
                      : "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden flex-col items-start md:flex">
                {loadingCurrentProject ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <P className="text-sm font-medium">
                    {currentProject?.name || "Select Workspace"}
                  </P>
                )}
              </div>
              <ChevronDown className="ml-auto h-4 w-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-72"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel>Projects</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            {loadingProjects ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              projects?.map((workspace: Project) => (
                <DropdownMenuItem
                  key={workspace.id}
                  className="jc mb-4 flex w-full items-center px-2 py-1.5 focus:bg-zinc-800 focus:text-white"
                  onSelect={() => handleSelectProject(workspace.id)}
                >
                  <Avatar className="mr-2 h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                      {workspace.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-full items-center justify-between">
                    <P className="[&:not(:first-child)]:mt-0">
                      {workspace.name}
                    </P>
                    {workspace.id === currentProject?.id && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
