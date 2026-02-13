import { Box } from '@mui/material';
import type { ESPNTeam } from '@/types/api';
import { TeamCard } from './TeamCard';

interface TeamsListProps {
  teams: ESPNTeam[];
  onSelectTeam?: (teamId: string) => void;
}

export function TeamsList({ teams, onSelectTeam }: TeamsListProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
      }}
    >
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          onClick={() => onSelectTeam?.(team.id)}
        />
      ))}
    </Box>
  );
}
