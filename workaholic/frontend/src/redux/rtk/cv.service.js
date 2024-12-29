import { baseApi } from "./base.service";

export const cvRTKApi = baseApi.injectEndpoints({
  reducerPath: "cvRTKApi",
  endpoints: (build) => ({
    getCVs: build.query({
      query: () => ({
        url: "/cv",
        method: "GET",
        credentials: "include",
      }),
    }),
    createCV: build.mutation({
      query: (body) => ({
        url: "/cv",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    updateCV: build.mutation({
      query: ({ id, body }) => ({
        url: `/cv/${id}`,
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),
    deleteCV: build.mutation({
      query: (id) => ({
        url: `/cv/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getCVByUserId: build.query({
      query: (userId) => ({
        url: `/cv/user/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCVsQuery, useCreateCVMutation, useUpdateCVMutation, useDeleteCVMutation, useGetCVByUserIdQuery } =
  cvRTKApi;
