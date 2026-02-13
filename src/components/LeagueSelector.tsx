import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setLeague } from '@/store/leagueSlice';
import type { LeagueSlug } from '@/types/league';
import { LEAGUE_OPTIONS } from '@/types/league';

export function LeagueSelector() {
  const league = useAppSelector((s) => s.league.selectedLeague);
  const dispatch = useAppDispatch();

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="league-select-label">League</InputLabel>
      <Select
        labelId="league-select-label"
        value={league}
        label="League"
        onChange={(e) => dispatch(setLeague(e.target.value as LeagueSlug))}
      >
        {LEAGUE_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
