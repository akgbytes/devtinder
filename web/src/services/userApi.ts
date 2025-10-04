import type { ApiResponse } from "@/types/api";
import { api } from "./api";
import type { User } from "@/types/user";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<ApiResponse<User>, void>({
      query: () => "/users/profile",
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserProfileQuery, useLazyGetUserProfileQuery } = userApi;
