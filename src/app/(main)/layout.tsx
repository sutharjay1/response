import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/app-sidebar";
import BreadcrumbInfo from "@/features/dashboard/breadcrumb-info";
import ProjectLink from "@/features/projects/project-link";
import { QueryProvider } from "@/providers/query-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 pr-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbInfo />
            </div>

            <ProjectLink />
          </header>
          <div className="flex min-h-[90vh] flex-col gap-4 overflow-y-hidden border-t border-zinc-200 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </QueryProvider>
  );
}
