import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const fetchBaseQueryWithAuth = () =>
  fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  });
export const baseApi = createApi({
  reducerPath: "baseRTKApi",
  baseQuery: fetchBaseQueryWithAuth(),
  tagTypes: [],
  endpoints: () => ({}),
});
