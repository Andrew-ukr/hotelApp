import { GuestResponse } from "../../../Types/guests";
import { apiSlice } from "../../Api/apiSlice";

export const guestsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGuests: builder.query<GuestResponse, void>({
      query: () => `guests`,
    }),
  }),
});

export const { useGetAllGuestsQuery } = guestsApi;
