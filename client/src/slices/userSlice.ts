import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User } from "../types";

export interface UserState {
  currentUserID: string | undefined;
  users: User[];
}

const initialState: UserState = {
  currentUserID: undefined,
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUserID: (state, action: PayloadAction<string>) => {
      state.currentUserID = action.payload;
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setCurrentUserID, setUsers } = userSlice.actions;
export default userSlice.reducer;
