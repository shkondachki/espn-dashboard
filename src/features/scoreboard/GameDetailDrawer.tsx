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
import { useGameSummary } from "@/hooks/useGameSummary";
import { GameDetailContent } from "./GameDetailContent";

interface GameDetailDrawerProps {
  league: LeagueSlug;
  gameId: string | null;
  onClose: () => void;
}

function GameDetailDrawerInner({
  league,
  gameId,
  onClose,
}: GameDetailDrawerProps) {
  const { data, isLoading, isError, error, refetch } = useGameSummary(
    league,
    gameId,
  );

  return (
    <Drawer
      anchor="right"
      open={Boolean(gameId)}
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
        <Typography variant="h6">Game Details</Typography>
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
        {data && !isLoading && <GameDetailContent data={data} />}
      </Box>
    </Drawer>
  );
}

interface GameDetailDrawerContainerProps {
  league: LeagueSlug;
  gameId: string | null;
  onClose: () => void;
}

export function GameDetailDrawer({
  league,
  gameId,
  onClose,
}: GameDetailDrawerContainerProps) {
  return (
    <GameDetailDrawerInner league={league} gameId={gameId} onClose={onClose} />
  );
}
