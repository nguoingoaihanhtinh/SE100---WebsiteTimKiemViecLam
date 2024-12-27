import { baseApi } from "./base.service";

export const ratingRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRatingsByUserId: build.query({
      query: () => ({
        url: `/rating/user`,
        credentials: "include",
      }),
    }),
    getRatingsByCompanyId: build.query({
      query: (companyId) => ({
        url: `/rating/company/${companyId}`,
      }),
    }),
    createRating: build.mutation({
      query: (ratingData) => ({
        url: `/rating/`,
        method: "POST",
        body: ratingData,
        credentials: "include",
      }),
    }),
    updateRating: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/rating/${id}`,
        method: "PUT",
        body: updatedData,
        credentials: "include",
      }),
    }),
    deleteRating: build.mutation({
      query: (id) => ({
        url: `/rating/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetRatingsByUserIdQuery,
  useGetRatingsByCompanyIdQuery,
  useCreateRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
} = ratingRTKApi;
