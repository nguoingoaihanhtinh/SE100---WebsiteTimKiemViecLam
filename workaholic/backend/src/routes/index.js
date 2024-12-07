import userRouter from "../routes/userRoute.js";
import applicationRoute from "./applicationRoute.js";
import companyRoute from "./companyRoute.js";
import jobRoute from "./jobRoute.js";

export default function routes(server) {
  server.use("/api/v1/job", jobRoute);
  server.use("/api/v1/application", applicationRoute);
  server.use("/api/v1/company", companyRoute);
  server.use("/api/v1/user", userRouter);
}
