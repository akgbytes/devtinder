import type { ApiResponse, PaymentData } from "@/types/api";
import { api } from "./api";

const paymentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation<ApiResponse<PaymentData>, void>({
      query: () => ({
        url: "/payment/create",
        method: "POST",
      }),
    }),

    getPaymentStatus: builder.query({
      query: () => "/payment/status",
    }),
  }),
});

export const { useCreateOrderMutation } = paymentsApi;
