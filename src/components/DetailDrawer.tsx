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
import type { ReactNode } from "react";

interface DetailDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  onRetry?: () => void;
  children: ReactNode;
}

/**
 * Reusable detail drawer with header, loading/error states, and retry.
 * Used for game details and team details.
 */
export function DetailDrawer({
  open,
  onClose,
  title,
  isLoading,
  isError,
  error,
  onRetry,
  children,
}: DetailDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
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
        <Typography variant="h6">{title}</Typography>
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
              action={
                onRetry ? <Button onClick={onRetry}>Retry</Button> : undefined
              }
            >
              {error.message}
            </Alert>
          </Box>
        )}
        {!isLoading && children}
      </Box>
    </Drawer>
  );
}
