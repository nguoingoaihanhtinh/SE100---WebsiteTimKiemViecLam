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
      query: (params) => ({
        url: `/rating/company/${params.companyId}?page=${params.page}&limit=${params.limit}&order=${params.sortBy}`,
      }),
      providesTags: ["ratingcompany"],
    }),
    createRating: build.mutation({
      query: (ratingData) => ({
        url: `/rating/`,
        method: "POST",
        body: ratingData,
        credentials: "include",
      }),
      invalidatesTags: ["ratingcompany"],
    }),
    updateRating: build.mutation({
      query: ({ id, updatedData }) => ({
        url: `/rating/${id}`,
        method: "PUT",
        body: updatedData,
        credentials: "include",
      }),
      invalidatesTags: ["ratingcompany"],
    }),
    deleteRating: build.mutation({
      query: (id) => ({
        url: `/rating/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["ratingcompany"],
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
