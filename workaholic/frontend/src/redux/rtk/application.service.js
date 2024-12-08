import { baseApi } from "./base.service";

// Define the application API using RTK Query
export const applicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create an application
    createApplication: build.mutation({
      query: (applicationData) => ({
        url: "/application",
        method: "POST",
        body: applicationData,
        credentials: "include", // if needed
      }),
    }),
    getUserApplication: build.query({
      query: () => ({
        url: "/application/user",
        credentials: "include",
      }),
    }),
    // Get all applications
    getAllApplications: build.query({
      query: () => ({
        url: "/application",
        credentials: "include", // if needed
      }),
    }),

    // Get a single application by ID
    getApplicationById: build.query({
      query: (id) => ({
        url: `/application/${id}`,
        credentials: "include", // if needed
      }),
    }),

    // Update an application
    updateApplication: build.mutation({
      query: ({ id, applicationData }) => ({
        url: `/application/${id}`,
        method: "PUT",
        body: applicationData,
        credentials: "include", // if needed
      }),
    }),

    // Delete an application
    deleteApplication: build.mutation({
      query: (id) => ({
        url: `/application/${id}`,
        method: "DELETE",
        credentials: "include", // if needed
      }),
    }),

    // Get applications by Job ID with user details
    getApplicationsByJobId: build.query({
      query: (jobId) => ({
        url: `/application/job/${jobId}`,
        credentials: "include", // if needed
      }),
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
