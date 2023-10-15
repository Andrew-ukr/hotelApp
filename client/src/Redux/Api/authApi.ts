import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../Types/user";

type RegisterRes = {
  success: boolean;
  message: string;
  user: User;
};

type RegisterReq = {
  name: string;
  email: string;
  password: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    logout: builder.query<{ success: boolean; message: string }, void>({
      query: () => `auth/logout`,
    }),

    login: builder.mutation<RegisterRes, Partial<RegisterReq>>({
      query: (body) => ({
        url: `auth/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    register: builder.mutation<RegisterRes, Partial<RegisterReq>>({
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
