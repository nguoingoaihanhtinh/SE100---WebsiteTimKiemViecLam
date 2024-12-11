import { baseApi } from "./base.service";

export const jobRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllJobs: build.query({
      query: () => ({
        url: "/job",
        credentials: "include",
      }),
    }),
    createJob: build.mutation({
      query: (payload) => ({
        url: "/job",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
    }),
    updateJob: build.mutation({
      query: ({ payload, id }) => ({
        url: `/job/${id}`,
        method: "PATCH",
        body: payload,
        credentials: "include",
      }),
    }),
    deleteJob: build.mutation({
      query: (id) => ({
        url: `/job/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getById: build.query({
      query: (id) => ({
        url: `/job/getByid/${id}`,
        credentials: "include",
      }),
    }),
    getAllJobsByCompanyId: build.query({
      query: (body) => ({
        url: `/job/company?page=${body.page}&limit=${body.limit}&company_id=${body.company_id}&kw=${body.kw}`,
        credentials: "include",
      }),
    }),
    getAllJobTypes: build.query({
      query: () => ({
        url: `/job/getAllType`,
        credentials: "include",
      }),
    }),
  }),
});
export const {
  useGetAllJobsQuery,
  useGetAllJobsByCompanyIdQuery,
  useLazyGetAllJobsByCompanyIdQuery,
  useGetByIdQuery,
  useUpdateJobMutation,
  useGetAllJobTypesQuery,
  useDeleteJobMutation,
  useCreateJobMutation,
} = jobRTKApi;
