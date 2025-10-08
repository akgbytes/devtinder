import type { ApiResponse } from "@/types/api";
import { api } from "./api";

export interface LocationSuggestion {
  placeId: string;
  displayName: string;
  city: string | null | undefined;
  state: string | null | undefined;
  country: string | null;
}

const placesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAutocompleteSuggestions: builder.mutation<
      ApiResponse<LocationSuggestion[]>,
      { input: string }
    >({
      query: (body) => ({
        url: "/places/autocomplete",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAutocompleteSuggestionsMutation } = placesApi;
