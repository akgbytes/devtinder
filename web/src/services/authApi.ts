import type { ApiResponse } from "@/types/api";
import { api } from "./api";
import type { User } from "@/types/user";
import type {
  LoginFormValues,
  RegisterFormValues,
  VerifyEmailFormValues,
} from "@/utils/validations";

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

    verifyEmail: builder.mutation<ApiResponse<null>, VerifyEmailFormValues>({
      query: (data) => ({
        url: "/auth/verify",
        method: "POST",
        body: data,
      }),
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

export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
