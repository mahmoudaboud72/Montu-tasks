import { createBrowserRouter, Navigate } from "react-router-dom";
import { APP_ROUTES, APP_ROUTE_LIST } from "@/config/app-routes";
import DashboardLayout from "@/layouts/DashboardLayout";
import HomePage from "@/pages/HomePage";
import PostsPage from "@/pages/PostsPage";
import RoutePage from "@/pages/RoutePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <DashboardLayout />,
    children: APP_ROUTE_LIST.map((route) => ({
      path: route.path,
      element:
        route.path === APP_ROUTES.posts.path ? (
          <PostsPage />
        ) : (
          <RoutePage title={route.label} description={route.description} />
        ),
    })),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);