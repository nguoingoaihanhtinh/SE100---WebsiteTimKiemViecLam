import { configureStore } from "@reduxjs/toolkit";
import { userRTKApi } from "./rtk/user.service";

const store = configureStore({
  reducer: {
    // Add the userRTKApi reducer to the store
    [userRTKApi.reducerPath]: userRTKApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userRTKApi.middleware),
});

export default store;
