import { baseApi } from "./base.service";

// Define the application API using RTK Query
export const applicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createApplication: build.mutation({
      query: (applicationData) => ({
        url: "/application",
        method: "POST",
        body: applicationData,
        credentials: "include",
      }),
      // Trigger cache invalidation after success
      onQueryStarted: async (applicationData, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Invalidate the Application list cache to trigger a refresh
          dispatch(applicationApi.util.invalidateTags([{ type: "Application", id: "LIST" }]));
        } catch (error) {
          console.error("Error while creating application:", error);
        }
      },
    }),

    getUserApplication: build.query({
      query: ({ page = 1, limit = 5, order = "desc" }) => ({
        url: `/application/user/`,
        params: { page, limit, order },
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "Application", id })), { type: "Application", id: "LIST" }]
          : [{ type: "Application", id: "LIST" }],
    }),

    getAllApplications: build.query({
      query: () => ({
        url: "/application",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "Application", id })), { type: "Application", id: "LIST" }]
          : [{ type: "Application", id: "LIST" }],
    }),

    getApplicationById: build.query({
      query: (id) => ({
        url: `/application/${id}`,
        credentials: "include",
      }),
      providesTags: (result) => [{ type: "Application", id: result?.id }],
    }),

    updateApplication: build.mutation({
      query: ({ id, applicationData }) => ({
        url: `/application/${id}`,
        method: "PUT",
        body: applicationData,
        credentials: "include",
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Application", id }],
    }),

    deleteApplication: build.mutation({
      query: (id) => ({
        url: `/application/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Invalidate the specific application cache and the list cache
          dispatch(applicationApi.util.invalidateTags([{ type: "Application", id }]));
          dispatch(applicationApi.util.invalidateTags([{ type: "Application", id: "LIST" }]));
        } catch (error) {
          console.error("Error while deleting application:", error);
        }
      },
    }),

    getApplicationsByJobId: build.query({
      query: ({ jobId, page = 1, limit = 5, order = "desc" }) => ({
        url: `/application/job/${jobId}`,
        params: { page, limit, order },
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [...result.data.map(({ id }) => ({ type: "Application", id })), { type: "Application", id: "LIST" }]
          : [{ type: "Application", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetAllApplicationsQuery,
  useGetApplicationByIdQuery,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
  useGetApplicationsByJobIdQuery,
  useGetUserApplicationQuery,
} = applicationApi;
