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
import { useEffect } from "react";
import { getProjects } from "../projects/actions/get-projects";

export function ProjectDropDown({ className }: { className?: string }) {
  const { user } = useUser();
  const { isMobile } = useSidebar();
  const { project, setProject } = useProject();

  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => getProjects(user?.id as string),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (!loadingProjects && projects?.length) {
      const activeProject = projects.find((p) => p.id === project?.id);
      if (activeProject) {
        setProject(activeProject);
      } else {
        setProject(projects[0]);
      }
    }
  }, [loadingProjects, projects, project?.id, setProject]);

  const handleSelectProject = (projectId: string) => {
    const selectedProject = projects?.find((p) => p.id === projectId);
    if (selectedProject) {
      setProject(selectedProject);
    }
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
                {loadingProjects ? (
                  <Skeleton className="h-8 w-8 rounded-xl" />
                ) : (
                  <AvatarFallback className="rounded-xl px-3 py-2">
                    {project?.name ? project.name[0].toUpperCase() : "?"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="grid flex-1 items-center text-left text-sm leading-tight">
                {loadingProjects ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <>
                    <span className="truncate font-semibold">
                      {project?.name || "Select Workspace"}
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
            alignOffset={20}
            sideOffset={6}
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
              projects?.map((proj: Project) => (
                <DropdownMenuItem
                  key={proj.id}
                  className="flex w-full items-center px-2 py-1.5"
                  onSelect={() => handleSelectProject(proj.id)}
                >
                  <Avatar className="mr-2 h-8 w-8 rounded-xl">
                    <AvatarFallback className="rounded-xl px-3 py-2">
                      {proj.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-full items-center justify-between">
                    <span className="truncate">{proj.name}</span>
                    {proj.id === project?.id && (
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
