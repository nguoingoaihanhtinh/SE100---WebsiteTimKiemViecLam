import { baseApi } from "./base.service";

export const statRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMonthlyUserCreated: build.query({
      query: (year = 2004) => ({
        url: `/stat/monthly-user-change?year=${year}`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetMonthlyUserCreatedQuery } = statRTKApi;
