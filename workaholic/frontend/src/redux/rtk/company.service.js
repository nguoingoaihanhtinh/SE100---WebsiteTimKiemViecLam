
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
  }),
});


export const { useGetCompanyByUserIdQuery, useGetAllCompaniesQuery } = companyRTKApi;
