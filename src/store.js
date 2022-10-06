import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Redux/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});
