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
    getAllUsers: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),

    updateUser: build.mutation({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useCheckLoginQuery,
  useRegisterMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userRTKApi;
