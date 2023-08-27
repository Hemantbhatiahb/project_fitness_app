import { configureStore } from "@reduxjs/toolkit";
import exerciseSlice from "./exerciseSlice";

const store = configureStore({
  reducer: { exSlice: exerciseSlice.reducer },
});

export default store;
