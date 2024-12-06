import { baseApi } from "./base.service";

export const companyRTKApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCompanyByUserId: build.query({
      query: (companyId) => ({
        url: `/company/getByUser/${companyId}`,
        credentials: "include",
      }),
    }),
  }),
});
export const { useGetCompanyByUserIdQuery } = companyRTKApi;
