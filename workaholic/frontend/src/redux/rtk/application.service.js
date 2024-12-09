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
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    getUserApplication: build.query({
      query: () => ({
        url: "/application/user",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    getAllApplications: build.query({
      query: () => ({
        url: "/application",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    getApplicationById: build.query({
      query: (id) => ({
        url: `/application/${id}`,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    updateApplication: build.mutation({
      query: ({ id, applicationData }) => ({
        url: `/application/${id}`,
        method: "PUT",
        body: applicationData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    deleteApplication: build.mutation({
      query: (id) => ({
        url: `/application/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    getApplicationsByJobId: build.query({
      query: (jobId) => ({
        url: `/application/job/${jobId}`,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
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
