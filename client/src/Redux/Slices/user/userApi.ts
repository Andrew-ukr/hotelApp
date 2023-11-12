import { UserResponse } from "../../../Types/user";
import { apiSlice } from "../../Api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query<UserResponse, void>({
      query: () => `user/current-user`,
    }),
    allUsers: builder.query<UserResponse, void>({
      query: () => `users`,
    }),
  }),
});

export const { useLazyCurrentUserQuery, useCurrentUserQuery , useAllUsersQuery} = userApi;
