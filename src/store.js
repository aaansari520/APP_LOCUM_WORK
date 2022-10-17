import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Redux/cartSlice";
import patientSlice from "./Redux/patientSlice";
import userSlice from "./Redux/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    patient: patientSlice,
  },
});
