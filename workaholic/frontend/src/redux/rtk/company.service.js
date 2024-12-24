import { baseApi } from "./base.service";

export const companyRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCompanyByUserId: build.query({
      query: (companyId) => ({
        url: `/company/getByUser/${companyId}`,
        credentials: "include",
      }),
    }),
    getAllCompanies: build.query({
      query: ({ page = 1, limit = 9, type = "" }) => ({
        url: `/company/`,
        params: {
          page,
          limit,
          type,
        },
      }),
    }),
    getCompanyById: build.query({
      query: (id) => ({
        url: `/company/${id}`,
        credentials: "include",
      }),
    }),
    createCompany: build.mutation({
      query: (newCompany) => ({
        url: `/company/`,
        method: "POST",
        credentials: "include",
        body: newCompany,
      }),
    }),
    updateCompany: build.mutation({
      query: ({ id, updatedCompany }) => ({
        url: `/company/${id}`,
        method: "PUT",
        credentials: "include",
        body: updatedCompany,
      }),
    }),
    deleteCompany: build.mutation({
      query: (id) => ({
        url: `/company/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetCompanyByUserIdQuery,
  useGetAllCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyRTKApi;
