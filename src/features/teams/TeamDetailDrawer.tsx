import {
  Drawer,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { LeagueSlug } from "@/types/league";
import { useTeam } from "@/hooks/useTeam";
import { TeamDetailContent } from "./TeamDetailContent";

interface TeamDetailDrawerProps {
  league: LeagueSlug;
  teamId: string | null;
  onClose: () => void;
}

export function TeamDetailDrawer({
  league,
  teamId,
  onClose,
}: TeamDetailDrawerProps) {
  const { data, isLoading, isError, error, refetch } = useTeam(league, teamId);

  return (
    <Drawer
      anchor="right"
      open={Boolean(teamId)}
      onClose={onClose}
      slotProps={{ backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.3)" } } }}
      PaperProps={{ sx: { width: { xs: "100%", sm: 400, md: 480 } } }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Team Details</Typography>
        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ px: 2, pb: 2 }}>
        {isLoading && (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        )}
        {isError && error && (
          <Box py={2}>
            <Alert
              severity="error"
              action={<Button onClick={() => refetch()}>Retry</Button>}
            >
              {error.message}
            </Alert>
          </Box>
        )}
        {data?.team && !isLoading && <TeamDetailContent team={data.team} />}
      </Box>
    </Drawer>
  );
}
