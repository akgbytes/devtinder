import type { ApiResponse } from "@/types/api";
import { api } from "./api";
import type { User } from "@/types/user";
import type {
  LoginFormValues,
  RegisterFormValues,
  ResendOtpFormValues,
  VerifyEmailFormValues,
} from "@/validations";

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
        url: "/auth/otp/verify",
        method: "POST",
        body: data,
      }),
    }),

    resendOtp: builder.mutation<ApiResponse<null>, ResendOtpFormValues>({
      query: (data) => ({
        url: "/auth/otp/resend",
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
  useResendOtpMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
