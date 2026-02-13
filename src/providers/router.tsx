import { createBrowserRouter, Outlet } from "react-router-dom";
import { Refine } from "@refinedev/core";
import {
  ThemedLayoutV2,
  ThemedTitleV2,
  useNotificationProvider,
} from "@refinedev/mui";
import routerBindings from "@refinedev/react-router-v6";
import { dataProvider } from "@/api/refineDataProvider";
import { AppHeader } from "@/components/AppHeader";
import { DashboardPage } from "@/pages/DashboardPage";
import { TeamsPage } from "@/pages/TeamsPage";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

function RefineLayout() {
  return (
    <Refine
      dataProvider={dataProvider}
      routerProvider={routerBindings}
      notificationProvider={useNotificationProvider}
      resources={[
        {
          name: "dashboard",
          list: "/",
          meta: {
            label: "Scoreboard",
            icon: <DashboardIcon />,
          },
        },
        {
          name: "teams",
          list: "/teams",
          meta: {
            label: "Teams",
            icon: <GroupsIcon />,
          },
        },
      ]}
      options={{ syncWithLocation: true }}
    >
      <ThemedLayoutV2
        Header={AppHeader}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            text="ESPN"
            icon={<SportsSoccerIcon />}
            collapsed={collapsed}
          />
        )}
      >
        <Outlet />
      </ThemedLayoutV2>
    </Refine>
  );
}

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
