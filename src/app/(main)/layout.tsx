import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/features/dashboard/app-sidebar";
import BreadcrumbInfo from "@/features/dashboard/breadcrumb-info";
import ProjectLink from "@/features/projects/project-link";
import { SettingsBreadCrumb } from "@/features/settings/setting-breadcrumb";
import { QueryProvider } from "@/providers/query-provider";
import NextTopLoader from "nextjs-toploader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <NextTopLoader
        color="#37322f"
        initialPosition={0.08}
        crawlSpeed={200}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 15px #37322f, 0 0 30px #37322f"
        template='<div class="bar" role="bar"><div class="peg"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex h-screen flex-col">
          <header className="relative sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 bg-background pr-4">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="md:mr-2 md:h-4" />
              <BreadcrumbInfo />
            </div>

            <SettingsBreadCrumb />
            <ProjectLink />

            <div className="absolute inset-0 rounded-t-xl ring-1 ring-inset ring-primary/10" />
          </header>
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto border-t border-zinc-200 p-4">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </QueryProvider>
  );
}
