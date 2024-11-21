import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userRTKApi = createApi({
  reducerPath: "userRTKApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
  tagTypes: ["user"],
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    checkLogin: build.query({
      query: () => ({
        url: "/user/checkjwt",
        credentials: "include",
      }),
    }),
    register: build.mutation({
      query: (body) => ({
        url: "/user/register",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
  }),
});
export const { useLoginMutation, useCheckLoginQuery, useRegisterMutation } = userRTKApi;
