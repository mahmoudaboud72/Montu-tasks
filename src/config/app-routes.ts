import type { LucideIcon } from "lucide-react";
import {
  Bookmark,
  FileText,
  LayoutDashboard,
  ListChecks,
  Settings,
  Users,
} from "lucide-react";

export type AppRoute = {
  path: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const APP_ROUTES = {
  dashboard: {
    path: "/dashboard",
    label: "Dashboard",
    description: "Your workspace overview will appear here.",
    icon: LayoutDashboard,
  },
  posts: {
    path: "/dashboard/posts",
    label: "Posts",
    description: "Workspace posts will appear here.",
    icon: FileText,
  },
  tasks: {
    path: "/dashboard/tasks",
    label: "Tasks",
    description: "Team tasks will appear here.",
    icon: ListChecks,
  },
  team: {
    path: "/dashboard/team",
    label: "Team",
    description: "Team members will appear here.",
    icon: Users,
  },
  saved: {
    path: "/dashboard/saved",
    label: "Saved",
    description: "Your saved workspace items will appear here.",
    icon: Bookmark,
  },
  settings: {
    path: "/dashboard/settings",
    label: "Settings",
    description: "Workspace settings will appear here.",
    icon: Settings,
  },
} as const satisfies Record<string, AppRoute>;

export const APP_ROUTE_LIST: AppRoute[] = Object.values(APP_ROUTES);

export function getRouteByPath(pathname: string) {
  return APP_ROUTE_LIST.find((route) => route.path === pathname);
}
