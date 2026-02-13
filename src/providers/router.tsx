import { createBrowserRouter } from "react-router-dom";
import { RefineLayout } from "@/components/RefineLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { TeamsPage } from "@/pages/TeamsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RefineLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "teams", element: <TeamsPage /> },
    ],
  },
]);
