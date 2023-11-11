import { UserCredentials, UserResponse } from "./../../../Types/user";
import { apiSlice } from "../../Api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  // tagTypes: ["User"],
  endpoints: (builder) => ({
    logout: builder.query<{ success: boolean; message: string }, void>({
      query: () => `auth/logout`,
    }),

    login: builder.mutation<UserResponse, Partial<UserCredentials>>({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation<UserResponse, Partial<UserCredentials>>({
      query: (body) => ({
        url: `auth/register`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLogoutQuery,
  useLazyLogoutQuery,
  useLoginMutation,
  useRegisterMutation,
} = authApi;
