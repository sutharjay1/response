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
import { useProject } from "@/hooks/use-project";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { Check, ChevronUpDown } from "@mynaui/icons-react";
import { Project } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
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
          <DropdownMenuTrigger asChild className="bg-background">
            <SidebarMenuButton
              size="lg"
              className={cn(
                "rounded-xl border border-input bg-background data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
                className,
              )}
            >
              <Avatar className="h-8 w-8 rounded-xl">
                {loadingCurrentProject ? (
                  <Skeleton className="h-8 w-8 rounded-xl" />
                ) : (
                  <AvatarFallback className="rounded-xl px-3 py-2">
                    {currentProject?.name
                      ? currentProject.name[0].toUpperCase()
                      : "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 items-center text-left text-sm leading-tight">
                {loadingCurrentProject ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <>
                    <span className="truncate font-semibold">
                      {currentProject?.name || "Select Workspace"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Project
                    </span>
                  </>
                )}
              </div>
              <ChevronUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-72"
            side={isMobile ? "bottom" : "right"}
            align="end"
            alignOffset={20}
            sideOffset={4}
          >
            <DropdownMenuLabel>Projects</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {loadingProjects ? (
              <div className="space-y-2 p-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
              </div>
            ) : (
              projects?.map((workspace: Project) => (
                <DropdownMenuItem
                  key={workspace.id}
                  className="flex w-full items-center px-2 py-1.5"
                  onSelect={() => handleSelectProject(workspace.id)}
                >
                  <Avatar className="mr-2 h-8 w-8 rounded-xl">
                    <AvatarFallback className="rounded-xl px-3 py-2">
                      {workspace.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate">{workspace.name}</span>
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
