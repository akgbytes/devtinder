import type { ApiResponse } from "@/types/api";
import { api } from "./api";

export interface Skill {
  _id: string;
  name: string;
}

const skillsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSkills: builder.query<ApiResponse<Skill[]>, void>({
      query: () => "/skills",
      // Cache for 24 hours
      keepUnusedDataFor: 86400,
    }),
  }),
});

export const { useGetAllSkillsQuery } = skillsApi;
