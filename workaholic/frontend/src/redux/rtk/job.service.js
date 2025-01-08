import { baseApi } from "./base.service";

export const jobRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllJobs: build.query({
      query: () => ({
        url: "/job",
        credentials: "include",
      }),
      providesTags: ["jobList"],
    }),
    createJob: build.mutation({
      query: (payload) => ({
        url: "/job",
        method: "POST",
        body: payload,
        credentials: "include",
      }),
      onQueryStarted: async (payload, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(jobRTKApi.util.invalidateTags(["jobList"]));
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["jobList"],
    }),
    updateJob: build.mutation({
      query: ({ payload, id }) => ({
        url: `/job/${id}`,
        method: "PATCH",
        body: payload,
        credentials: "include",
      }),
      onQueryStarted: async ({ payload, id }, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(jobRTKApi.util.invalidateTags(["jobList"]));
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["jobList"],
    }),
    deleteJob: build.mutation({
      query: (id) => ({
        url: `/job/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(jobRTKApi.util.invalidateTags(["jobList"]));
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["jobList"],
    }),
    getById: build.query({
      query: (id) => ({
        url: `/job/getByid/${id}`,
        credentials: "include",
      }),
    }),
    getAllJobsByCompanyId: build.query({
      query: (body) => ({
        url: `/job/company?page=${body.page}&limit=${body.limit}&company_id=${body.company_id}&kw=${body.kw}&order=${body.order}`,
        credentials: "include",
      }),
      providesTags: (result) => (result ? result.data.map(({ id }) => ({ type: "job", id })) : []),
    }),
    getAllJobTypes: build.query({
      query: () => ({
        url: `/job/getAllType`,
        credentials: "include",
      }),
    }),
    getJobsSaved: build.query({
      query: () => ({
        url: `/save?page=1&limit=10000`,
        method: "GET",
        credentials: "include",
      }),
    }),
    savedJob: build.mutation({
      query: ({ job_id }) => ({
        url: `/save`,
        method: "POST",
        body: { job_id },
        credentials: "include",
      }),
    }),
    removeSaveJob: build.mutation({
      query: ({ job_id }) => ({
        url: `/save/${job_id}`,
        method: "DELETE",
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
  useRemoveSaveJobMutation,
  useGetAllJobTypesQuery,
  useLazyGetJobsSavedQuery,
  useDeleteJobMutation,
  useCreateJobMutation,
  useSavedJobMutation,
} = jobRTKApi;
