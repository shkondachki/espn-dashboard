import { AppBar, Toolbar, Stack } from "@mui/material";
import { HamburgerMenu } from "@refinedev/mui";
import { LeagueSelector } from "@/components/LeagueSelector";

/**
 * Custom header for Refine ThemedLayoutV2.
 * Renders HamburgerMenu (sidebar toggle) and LeagueSelector.
 */
export function AppHeader() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <HamburgerMenu />
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <LeagueSelector />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
