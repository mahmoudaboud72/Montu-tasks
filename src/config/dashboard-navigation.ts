import { APP_ROUTES, type AppRoute } from "@/config/app-routes";

export type DashboardNavGroup = {
  label: string;
  index: string;
  separated?: boolean;
  navbar: "entry" | "dropdown" | "link";
  items: AppRoute[];
};

export const DASHBOARD_NAVIGATION: DashboardNavGroup[] = [
  {
    label: "Overview",
    index: "01",
    navbar: "entry",
    items: [APP_ROUTES.dashboard],
  },
  {
    label: "Workspace",
    index: "02",
    navbar: "dropdown",
    items: [APP_ROUTES.posts, APP_ROUTES.tasks, APP_ROUTES.team],
  },
  {
    label: "Personal",
    index: "03",
    navbar: "link",
    items: [APP_ROUTES.saved],
  },
  {
    label: "System",
    index: "04",
    separated: true,
    navbar: "link",
    items: [APP_ROUTES.settings],
  },
];
