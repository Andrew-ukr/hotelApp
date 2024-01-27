import { apiSlice } from './Api/apiSlice';
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/auth/authSlice";
import modalSlice from "./Slices/modal/modalSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    modal: modalSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch