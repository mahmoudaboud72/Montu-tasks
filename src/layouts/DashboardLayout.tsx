import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "@/components/layout/DashboardSidebar/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getRouteByPath } from "@/config/app-routes";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const pageTitle = getRouteByPath(pathname)?.label ?? "Dashboard";

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center border-b border-foreground bg-background px-4 md:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <span className="h-5 w-px bg-border" aria-hidden="true" />
            <div>
              <p className="font-mono text-xs uppercase text-muted-foreground">
                Montu
              </p>
              <h1 className="text-sm font-semibold">{pageTitle}</h1>
            </div>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
