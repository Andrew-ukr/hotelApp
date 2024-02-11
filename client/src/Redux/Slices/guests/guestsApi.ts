import {
  GuestBody,
  GuestResponse,
  GuestsResponse,
} from "../../../Types/guests";
import { apiSlice } from "../../Api/apiSlice";

export const guestsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGuests: builder.query<GuestsResponse, void>({
      query: () => `guests`,
      providesTags: ["Guests"],
    }),
    createGuest: builder.mutation<GuestResponse, Partial<GuestBody>>({
      query: (body) => ({
        url: "guest",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Guests"],
    }),
    deleteGuest: builder.mutation<GuestResponse, Partial<string>>({
      query: (id) => ({
        url: `guest/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Guests"],
    }),
  }),
});

export const { useGetAllGuestsQuery, useCreateGuestMutation, useDeleteGuestMutation } = guestsApi;
