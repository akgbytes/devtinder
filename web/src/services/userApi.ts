import type { ApiResponse, LocationSuggestion, Skill } from "@/types/api";
import { api } from "./api";
import type { User } from "@/types/user";
import * as z from "zod";
import type { completeProfileSchema } from "@/validations";

type CompleteProfilePayload = Omit<
  z.infer<typeof completeProfileSchema>,
  "location" | "skills"
> & {
  location: LocationSuggestion;
  skills: Skill[];
  email: string;
};

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<ApiResponse<User>, void>({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),

    completeProfile: builder.mutation<
      ApiResponse<User>,
      CompleteProfilePayload
    >({
      query: (payload) => ({
        url: "/users/profile/complete",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useCompleteProfileMutation,
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
} = userApi;
