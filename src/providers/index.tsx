import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { RefineThemes, RefineSnackbarProvider } from "@refinedev/mui";
import { store } from "@/store";
import { router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export function AppProviders() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={RefineThemes.RedDark}>
          <RefineSnackbarProvider>
            <CssBaseline />
            <GlobalStyles
              styles={{
                body: { backgroundColor: "var(--refine-bg-color, #f5f5f5)" },
              }}
            />
            <RouterProvider router={router} />
          </RefineSnackbarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
