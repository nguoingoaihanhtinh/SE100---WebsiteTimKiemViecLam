import { baseApi } from "./base.service";

export const savedRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSavedJobs: build.query({
      query: (params) => ({
        url: `/save?page=${params.page}&limit=${params.limit}&order=${params.order}`,
        credentials: "include",
      }),
      providesTags: ["savedJobs"],
    }),
    saveJob: build.mutation({
      query: (jobData) => ({
        url: `/save/`,
        method: "POST",
        body: jobData,
        credentials: "include",
      }),
      onQueryStarted: async (jobData, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(savedRTKApi.util.invalidateTags(["savedJobs"]));
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["savedJobs"],
    }),
    removeSavedJob: build.mutation({
      query: (id) => ({
        url: `/save/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(savedRTKApi.util.invalidateTags(["savedJobs"]));
        } catch (error) {
          console.error(error);
        }
      },
      invalidatesTags: ["savedJobs"],
    }),
  }),
});

export const { useGetSavedJobsQuery, useSaveJobMutation, useRemoveSavedJobMutation } = savedRTKApi;
