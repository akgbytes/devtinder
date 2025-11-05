import type { ApiResponse, Feed, LocationSuggestion, Skill } from "@/types/api";
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

    getConnections: builder.query<ApiResponse<User[]>, void>({
      query: () => "/users/connections",
    }),

    getRequests: builder.query<
      ApiResponse<{ requestId: string; user: User }[]>,
      void
    >({
      query: () => "/users/connections/requests",
    }),

    getFeed: builder.query<
      ApiResponse<Feed>,
      { cursor?: string | null; limit: number }
    >({
      query: ({ cursor, limit }) =>
        `/users/feed/?cursor=${cursor}&limit=${limit}`,
      providesTags: ["Feed"],
    }),

    updateProfilePicture: builder.mutation<
      ApiResponse<User>,
      { profilePicture: string }
    >({
      query: (payload) => ({
        url: "/users/profile/picture",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    updateAbout: builder.mutation<ApiResponse<User>, { about: string }>({
      query: (payload) => ({
        url: "/users/profile/about",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),

    updateSkills: builder.mutation<ApiResponse<User>, { skills: Skill[] }>({
      query: (payload) => ({
        url: "/users/profile/skills",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCompleteProfileMutation,
  useGetUserProfileQuery,
  useLazyGetUserProfileQuery,
  useGetConnectionsQuery,
  useGetRequestsQuery,
  useGetFeedQuery,
  usePrefetch,
  useUpdateAboutMutation,
  useUpdateProfilePictureMutation,
  useUpdateSkillsMutation,
} = userApi;
