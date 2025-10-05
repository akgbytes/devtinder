import type { ApiResponse } from "@/types/api";
import { api } from "./api";
import type { User } from "@/types/user";
import type { LoginFormValues, RegisterFormValues } from "@/utils/validations";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ApiResponse<User>, RegisterFormValues>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation<ApiResponse<User>, LoginFormValues>({
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
