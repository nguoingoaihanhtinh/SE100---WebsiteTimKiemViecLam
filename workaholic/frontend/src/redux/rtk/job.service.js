import { baseApi } from "./base.service";

export const jobRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllJobs: build.query({
      query: () => ({
        url: "/job",
        credentials: "include",
      }),
    }),
    getAllJobsByCompanyId: build.query({
      query: (body) => ({
        url: `/job/company?page=${body.page}&limit=${body.limit}&company_id=${body.company_id}`,
        credentials: "include",
      }),
    }),
  }),
});
export const { useGetAllJobsQuery, useLazyGetAllJobsByCompanyIdQuery } =
  jobRTKApi;
