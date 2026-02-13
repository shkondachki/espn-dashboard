import { createSlice } from "@reduxjs/toolkit";
import type { LeagueSlug } from "@/types/league";

interface LeagueState {
  selectedLeague: LeagueSlug;
}

const initialState: LeagueState = {
  selectedLeague: "nba",
};

const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setLeague(state, action: { payload: LeagueSlug }) {
      state.selectedLeague = action.payload;
    },
  },
});

export const { setLeague } = leagueSlice.actions;
export const leagueReducer = leagueSlice.reducer;
