import type { ApiResponse, LocationSuggestion } from "@/types/api";
import { api } from "./api";

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
