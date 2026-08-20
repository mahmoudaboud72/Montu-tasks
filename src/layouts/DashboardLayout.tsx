import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/layout/DashboardSidebar/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getRouteByPath } from "@/config/app-routes";
import { useAppSelector } from "@/store/hooks";
import { ThemeToggle } from "@/components/ui/ThemeToggle"; // We will create this

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const pageTitle = getRouteByPath(pathname)?.label ?? "Dashboard";
  const workspaceName = useAppSelector((state) => state.dashboard.workspaceName);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-foreground bg-background px-4 md:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="h-5 w-px bg-border" aria-hidden="true" />
            <div>
              <p className="font-mono text-xs uppercase text-muted-foreground">
                {workspaceName}
              </p>
              <h1 className="text-sm font-semibold">{pageTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
