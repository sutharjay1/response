"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { successToast } from "@/features/global/toast";
import { getProjects } from "@/features/projects/actions/get-projects";
import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Calendar,
  FolderGit2,
  Loader2,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { TiAttachment, TiCog } from "react-icons/ti";

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
        {projects.map((project) => {
          const totalResults = project?.fields?.reduce(
            (acc, field) => acc + field?.results?.length,
            0,
          );

          return (
            <Card
              className="overflow-hidden transition-all hover:shadow-md"
              key={project.id}
            >
              <CardHeader className="pb-4 pt-6">
                <div className="flex items-center justify-between">
                  <h3 className="truncate pr-4 text-lg font-semibold">
                    {project.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      className="cursor-pointer rounded-xl px-2 py-1.5"
                      onClick={() => {
                        if (project.scriptFile) {
                          navigator.clipboard
                            .writeText(project.scriptFile.toString()!)
                            .then(() => {
                              successToast("Your embed link has been copied.", {
                                position: "top-center",
                              });
                            });
                        }
                      }}
                    >
                      <TiAttachment
                        className="h-7 w-7 font-bold"
                        strokeWidth={1.08}
                      />
                      <span className="sr-only">Open menu</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl px-2 py-1.5"
                      asChild
                    >
                      <Link
                        href={`/projects/${project.id}/analytics`}
                        className="cursor-pointer"
                      >
                        <TbLayoutDashboardFilled
                          className="h-7 w-7 font-bold"
                          strokeWidth={1.08}
                        />
                        <span className="sr-only">Open menu</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-xl px-2 py-1.5"
                      asChild
                    >
                      <Link
                        href={`/projects/${project.id}/settings`}
                        className="cursor-pointer"
                      >
                        <TiCog
                          className="h-7 w-7 font-bold"
                          strokeWidth={1.08}
                        />
                        <span className="sr-only">Open menu</span>
                      </Link>
                    </Button>
                  </div>
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
                  {projects.map((project) => (
                    <span key={project.id}>{totalResults} responses</span>
                  ))}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between bg-muted/50 px-6 py-4">
                <Badge
                  variant="secondary"
                  className="text-sm font-medium hover:bg-secondary"
                >
                  <span className="hidden md:flex">{project.id}</span>
                  <span className="flex md:hidden">
                    {project.id.slice(0, 6)}
                  </span>
                </Badge>

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
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
