import { baseApi } from "./base.service";

export const userRTKApi = baseApi.injectEndpoints({
  reducerPath: "userRTKApi",
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    logout: build.mutation({
      query: (body) => ({
        url: "/user/logout",
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
export const { useLoginMutation, useCheckLoginQuery, useRegisterMutation, useLogoutMutation } = userRTKApi;
