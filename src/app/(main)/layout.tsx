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
import NextTopLoader from "nextjs-toploader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <NextTopLoader
        color="#37322f"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #EEEEEC65,0 0 5px #EEEEEC65"
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
<div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 pr-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="md:mr-2 md:h-4" />
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
