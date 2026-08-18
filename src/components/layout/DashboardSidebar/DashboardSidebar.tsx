import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import { Sidebar } from "@/components/ui/sidebar";
import type { AppRoute } from "@/config/app-routes";
import { DASHBOARD_NAVIGATION } from "@/config/dashboard-navigation";

function SidebarLink({ item }: { item: AppRoute }) {
  const { pathname } = useLocation();
  const active = pathname === item.path;

  return (
    <li>
      <Link
        to={item.path}
        aria-label={item.label}
        aria-current={active ? "page" : undefined}
        className="flex h-10 items-center gap-2 overflow-hidden px-2.5 text-sm font-medium hover:bg-sidebar-accent aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground aria-[current=page]:hover:bg-accent-hover"
      >
        <item.icon className="size-4 shrink-0" aria-hidden="true" />
        <span className="group-data-[collapsed=true]:hidden">{item.label}</span>
      </Link>
    </li>
  );
}

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <header className="border-b border-sidebar-border">
        <Link
          to="/"
          aria-label="Back to navigation home"
          className="flex h-16 items-center gap-2 overflow-hidden px-3"
        >
          <span className="grid size-8 shrink-0 place-items-center border border-foreground bg-accent text-xs font-bold text-accent-foreground">
            W
          </span>
          <span className="font-mono text-sm font-semibold uppercase group-data-[collapsed=true]:hidden">
            Workspace
          </span>
        </Link>
      </header>

      <nav className="flex min-h-0 flex-1 flex-col overflow-auto py-3">
        {DASHBOARD_NAVIGATION.map((group) => (
          <Fragment key={group.label}>
            {group.separated && <div className="mx-2 my-2 h-px bg-border" />}
            <section className={group.separated ? "mt-auto p-2" : "p-2"}>
              <h2 className="flex h-8 items-center px-2 font-mono text-xs uppercase text-muted-foreground group-data-[collapsed=true]:hidden">
                <span className="mr-2 text-accent">{group.index}</span>
                {group.label}
              </h2>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <SidebarLink key={item.path} item={item} />
                ))}
              </ul>
            </section>
          </Fragment>
        ))}
      </nav>
    </Sidebar>
  );
}
