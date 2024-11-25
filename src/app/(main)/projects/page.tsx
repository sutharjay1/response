"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Hint from "@/features/global/hint";
import { getProjects } from "@/features/projects/actions/get-projects";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Calendar,
  FolderGit2,
  Loader2,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project) => (
          // <Card key={project.id} className="hover:bg-muted/50">
          //   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          //     <CardTitle className="text-sm font-medium">
          //       {project.name}
          //     </CardTitle>
          //     <DropdownMenu>
          //       <DropdownMenuTrigger asChild>
          //         <Button variant="ghost" size="icon">
          //           <Settings className="h-4 w-4" />
          //         </Button>
          //       </DropdownMenuTrigger>
          //       <DropdownMenuContent align="end">
          //         <DropdownMenuItem>
          //           <Link
          //             href={`/projects/${project.id}/settings`}
          //             className="flex w-full"
          //           >
          //             Settings
          //           </Link>
          //         </DropdownMenuItem>
          //         {/* Add more dropdown items as needed */}
          //       </DropdownMenuContent>
          //     </DropdownMenu>
          //   </CardHeader>
          //   <CardContent>
          //     <div className="text-sm text-muted-foreground">
          //       {project.description || "No description provided"}
          //     </div>
          //     <div className="mt-4 flex gap-2">
          //       <Button asChild variant="outline" className="w-full">
          //         <Link href={`/projects/${project.id}`}>View Project</Link>
          //       </Button>
          //     </div>
          //   </CardContent>
          // </Card>
          <Card
            className="overflow-hidden transition-all hover:shadow-md"
            key={project.id}
          >
            <CardHeader className="pb-4 pt-6">
              <div className="flex items-center justify-between">
                <h3 className="truncate pr-4 text-lg font-semibold">
                  {project.name}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/projects/${project.id}/settings`}
                        className="cursor-pointer"
                      >
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    {/* Add more dropdown items as needed */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-3 w-3" />
                <time dateTime={project.createdAt.toISOString()}>
                  {project.createdAt.toLocaleDateString()}
                </time>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {project.description || "No description provided"}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
              <Hint label={`Project ID: ${project.id}`}>
                <Badge variant="secondary" className="hover:bg-secondary">
                  {project.id.slice(0, 8)}
                </Badge>
              </Hint>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className="group ml-auto"
              >
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center"
                >
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-700 group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
