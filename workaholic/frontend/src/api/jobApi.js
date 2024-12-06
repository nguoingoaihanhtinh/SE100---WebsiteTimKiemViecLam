import { request } from "./request";


const jobApi = {
    getAllJobs: async (paging,limit,type) => {
        let query = `/job?page=${paging}&limit=${limit}`
        if(type && type != "All"){
            query += `&typeSlt=${type}`
        }
        const response = await request.get(query);
        return response.data;
      },
    getAllJobTypes: async () => {
        let query = `/job/getAllType`;
        const response = await request.get(query);
        return response.data;
    },
    searchJob: async (paging, limit, keyword) => {
        const query = `/job/search?page=${paging}&limit=${limit}&kw=${encodeURIComponent(keyword)}`;
        const response = await request.get(query);
        return response.data;
    },
};
export default jobApi;