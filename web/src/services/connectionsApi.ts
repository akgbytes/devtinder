import type { ApiResponse } from "@/types/api";
import { api } from "./api";

const connectionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createConnection: builder.mutation<
      ApiResponse<null>,
      { userId: string; status: string }
    >({
      query: ({ userId, status }) => ({
        url: `/connections/request/${userId}/${status}`,
        method: "POST",
      }),
    }),

    reviewConnection: builder.mutation<
      ApiResponse<null>,
      { requestId: string; status: string }
    >({
      query: ({ requestId, status }) => ({
        url: `/connections/review/${requestId}/${status}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateConnectionMutation, useReviewConnectionMutation } =
  connectionsApi;
