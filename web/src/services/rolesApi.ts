import type { ApiResponse } from "@/types/api";
import { api } from "./api";

export interface Role {
  _id: string;
  name: string;
}

const rolesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query<ApiResponse<Role[]>, void>({
      query: () => "/roles",
      // Cache for 24 hours
      keepUnusedDataFor: 86400,
    }),
  }),
});

export const { useGetAllRolesQuery } = rolesApi;
