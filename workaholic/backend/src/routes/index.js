import companyRoute from "./companyRoute.js";
import jobRoute from "./jobRoute.js";

export default function routes(server) {
    server.use('/api', jobRoute);  
    server.use('/api', companyRoute);// This ensures the prefix /api is correctly applied

}
