import { baseApi } from "./base.service";

export const statRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMonthlyUserCreated: build.query({
      query: (year = 2025) => ({
        url: `/stat/monthly-user-change?year=${year}`,
        credentials: "include",
      }),
    }),
    getJobTypeCount: build.query({
      query: () => ({
        url: `/stat/jobtype-count`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetMonthlyUserCreatedQuery, useGetJobTypeCountQuery } = statRTKApi;
