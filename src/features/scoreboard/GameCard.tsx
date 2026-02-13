import { Typography } from '@mui/material';
import type { ESPNEvent } from '@/types/api';
import { StyledCard } from '@/components/StyledCard';

interface GameCardProps {
  event: ESPNEvent;
  onClick?: () => void;
}

function getCompetitorsAndStatus(event: ESPNEvent) {
  const comp = event.competitions?.[0];

  if (!comp) return { away: null, home: null, status: '' };

  const [away, home] = comp.competitors?.length === 2
    ? [comp.competitors[0], comp.competitors[1]]
    : [null, null];

  const status = comp.status?.type?.name ?? comp.status?.displayClock ?? '';

  return { away, home, status };
}

export function GameCard({ event, onClick }: GameCardProps) {
  const { away, home, status } = getCompetitorsAndStatus(event);

  return (
    <StyledCard
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => (e.key === 'Enter' ? onClick?.() : undefined)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {away && home ? (
        <>
          <Typography variant="body1" fontWeight={600}>
            {away.team.displayName} {away.score != null ? ` ${away.score}` : ''}
          </Typography>
          <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5 }}>
            {home.team.displayName} {home.score != null ? ` ${home.score}` : ''}
          </Typography>
          {status && (
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {status}
            </Typography>
          )}
        </>
      ) : (
        <Typography variant="body2">{event.shortName || event.name}</Typography>
      )}
    </StyledCard>
  );
}
