import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Habit } from "../types";

export interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload;
    },
  },
});

export const { setHabits } = habitSlice.actions;
export default habitSlice.reducer;
