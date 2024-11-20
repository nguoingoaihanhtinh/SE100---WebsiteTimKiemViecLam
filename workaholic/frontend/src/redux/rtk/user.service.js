import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userRTKApi = createApi({
  reducerPath: "userRTKApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  tagTypes: ["user"],
  endpoints: (build) => ({
    getResourceRequest: build.query({
      query: (body) => {
        console.log(body);
        /////////
      },
    }),
  }),
});
export const { useGetResourceRequestQuery } = userRTKApi;
