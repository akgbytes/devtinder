import type { ApiResponse } from "@/types/api";
import { api } from "./api";
import type { User } from "@/types/user";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      ApiResponse<User>,
      {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
      }
    >({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation<
      ApiResponse<User>,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
