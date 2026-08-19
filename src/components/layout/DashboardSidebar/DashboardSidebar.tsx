import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import type { AppRoute } from "@/config/app-routes";
import { DASHBOARD_NAVIGATION } from "@/config/dashboard-navigation";

function SidebarLink({ item }: { item: AppRoute }) {
  const { pathname } = useLocation();
  const active = pathname === item.path;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active}>
        <Link to={item.path} aria-label={item.label}>
          <item.icon className="size-4 shrink-0" aria-hidden="true" />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" aria-label="Back to navigation home">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground border border-foreground">
                  <span className="font-bold text-xs">W</span>
                </div>
                <span className="font-mono text-sm font-semibold uppercase">Workspace</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {DASHBOARD_NAVIGATION.map((group) => (
          <Fragment key={group.label}>
            {group.separated && <SidebarSeparator className="mx-2" />}
            <SidebarGroup>
              <SidebarGroupLabel className="font-mono text-xs uppercase text-muted-foreground flex items-center">
                <span className="mr-2 text-accent">{group.index}</span>
                {group.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarLink key={item.path} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </Fragment>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
