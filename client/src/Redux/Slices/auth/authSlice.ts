import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { User } from "../../../Types/user";

type UserState = {
  user: null | User;
};

const initialState: UserState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
