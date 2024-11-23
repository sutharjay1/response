"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getProjects } from "@/features/projects/actions/get-projects";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { FolderGit2, Loader2, PlusCircle, Settings } from "lucide-react";
import Link from "next/link";

const Projects = () => {
  const { user } = useUser();
  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ["projects", user?.id],
    queryFn: () => getProjects(user?.id as string),
    enabled: !!user?.id,
    staleTime: 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  return loadingProjects ? (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Loading projects...</p>
      </div>
    </div>
  ) : !projects?.length ? (
    <div className="flex min-h-[400px] flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <FolderGit2 className="h-8 w-8 text-muted-foreground" />
        <h3 className="text-lg font-semibold">No projects found</h3>
        <p className="text-sm text-muted-foreground">
          Create your first project to get started
        </p>
        <Button asChild className="mt-4">
          <Link href="/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Project
          </Link>
        </Button>
      </div>
    </div>
  ) : (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Your Projects</h2>
        <Button asChild>
          <Link href="/projects/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {project.name}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link
                      href={`/projects/${project.id}/settings`}
                      className="flex w-full"
                    >
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {/* Add more dropdown items as needed */}
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {project.description || "No description provided"}
              </div>
              <div className="mt-4 flex gap-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/projects/${project.id}`}>View Project</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
