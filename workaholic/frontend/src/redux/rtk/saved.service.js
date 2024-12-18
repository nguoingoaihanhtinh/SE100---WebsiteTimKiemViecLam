import { baseApi } from "./base.service";

export const savedRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSavedJobs: build.query({
      query: () => ({
        url: `/save/`,
        credentials: "include",
      }),
    }),
    saveJob: build.mutation({
      query: (jobData) => ({
        url: `/save/`,
        method: "POST",
        body: jobData,
        credentials: "include",
      }),
    }),
    removeSavedJob: build.mutation({
      query: (id) => ({
        url: `/save/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetSavedJobsQuery,
  useSaveJobMutation,
  useRemoveSavedJobMutation,
} = savedRTKApi;
