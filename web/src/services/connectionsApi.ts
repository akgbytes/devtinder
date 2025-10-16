import type { ApiResponse } from "@/types/api";
import { api } from "./api";

interface Params {
  userId: string;
  status: string;
}

const connectionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createConnection: builder.mutation<ApiResponse<null>, Params>({
      query: ({ userId, status }) => ({
        url: `/connections/request/${userId}/${status}`,
        method: "POST",
      }),
    }),

    reviewConnection: builder.mutation<ApiResponse<null>, Params>({
      query: ({ userId, status }) => ({
        url: `/connections/review/${userId}/${status}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateConnectionMutation, useReviewConnectionMutation } =
  connectionsApi;
