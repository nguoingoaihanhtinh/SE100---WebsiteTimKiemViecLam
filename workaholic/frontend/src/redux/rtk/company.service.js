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
      query: () => ({
        url: `/company/`,
        credentials: "include",
      }),
    }),
    getCompanyById: build.query({
      query: (id) => ({
        url: `/company/${id}`,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetCompanyByUserIdQuery, useGetAllCompaniesQuery, useGetCompanyByIdQuery } = companyRTKApi;
