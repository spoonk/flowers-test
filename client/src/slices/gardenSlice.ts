import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Garden } from "../types";

export interface GardenState {
  garden: Garden | undefined;
}

const initialState: GardenState = {
  garden: undefined,
};

export const gardenSlice = createSlice({
  name: "garden",
  initialState,
  reducers: {
    setGarden: (state, action: PayloadAction<Garden>) => {
      state.garden = action.payload;
    },
  },
});

export const { setGarden } = gardenSlice.actions;
export default gardenSlice.reducer;
