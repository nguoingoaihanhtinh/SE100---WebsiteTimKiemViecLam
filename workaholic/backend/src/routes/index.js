import userRouter from "../routes/userRoute.js";
import companyRoute from "./companyRoute.js";
import jobRoute from "./jobRoute.js";

export default function routes(server) {
  server.use("/api", jobRoute);
  server.use("/api", companyRoute);
  server.use("/api/v1/user", userRouter);
}
