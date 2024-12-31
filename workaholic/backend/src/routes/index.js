import userRouter from "../routes/userRoute.js";
import applicationRoute from "./applicationRoute.js";
import companyRoute from "./companyRoute.js";
import cvRouter from "./cvRoute.js";
import jobRoute from "./jobRoute.js";
import notiRouter from "./notificationRoute.js";
import ratingRouter from "./ratingRoute.js";
import savedRouter from "./savedRoute.js";
import statRouter from "./statRoute.js";

export default function routes(server) {
  server.use("/api/v1/job", jobRoute);
  server.use("/api/v1/application", applicationRoute);
  server.use("/api/v1/company", companyRoute);
  server.use("/api/v1/user", userRouter);
  server.use("/api/v1/notification", notiRouter);
  server.use("/api/v1/save", savedRouter);
  server.use("/api/v1/cv", cvRouter);
  server.use("/api/v1/rating", ratingRouter);
  server.use("/api/v1/stat", statRouter);
}
