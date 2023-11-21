import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import habitReducer from "./slices/habitSlice";
import gardenReducer from "./slices/gardenSlice";

export const store = configureStore({
  reducer: { userReducer, habitReducer, gardenReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
