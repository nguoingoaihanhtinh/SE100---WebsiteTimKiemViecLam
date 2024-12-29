import { baseApi } from "./base.service";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNotification: build.mutation({
      query: (notificationData) => ({
        url: "/notification",
        method: "POST",
        body: notificationData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    getNotifications: build.query({
      query: ({ user_id, is_global }) => ({
        url: "/notification",
        params: { user_id, is_global },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    getNotificationById: build.query({
      query: (id) => ({
        url: `/notification/${id}`,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    updateNotification: build.mutation({
      query: ({ id, notificationData }) => ({
        url: `/notification/${id}`,
        method: "PUT",
        body: notificationData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    deleteNotification: build.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    getGlobalNotifications: build.query({
      query: () => ({
        url: "/notification/global",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          if (err.error?.status === 401) {
            alert("Session expired. Please log in again.");
            window.location.href = "/login";
          }
        }
      },
    }),
    getNotificationsByUserId: build.query({
      query: (userId) => ({
        url: `/notification/user/${userId}`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetNotificationsQuery,
  useGetNotificationByIdQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useGetGlobalNotificationsQuery,
  useGetNotificationsByUserIdQuery,
} = notificationApi;
