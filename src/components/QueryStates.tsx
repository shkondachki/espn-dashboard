import { Box, Typography, Button, CircularProgress } from "@mui/material";
import type { ReactNode } from "react";

interface QueryStatesProps {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  onRetry?: () => void;
  children: ReactNode;
}

export function QueryStates({
  isLoading,
  isError,
  error,
  isEmpty = false,
  emptyMessage = "No data available.",
  onRetry,
  children,
}: QueryStatesProps) {
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
        p={3}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError && error) {
    return (
      <Box textAlign="center" py={4} px={2}>
        <Typography color="error" gutterBottom>
          {error.message}
        </Typography>
        {onRetry && (
          <Button variant="outlined" onClick={onRetry}>
            Retry
          </Button>
        )}
      </Box>
    );
  }

  if (isEmpty) {
    return (
      <Box textAlign="center" py={4} px={2}>
        <Typography color="text.secondary">{emptyMessage}</Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
