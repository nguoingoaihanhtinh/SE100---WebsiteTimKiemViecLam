import { request } from "./request";


const jobApi = {
    getAllJobs: async (paging,limit,type) => {
        let query = `/jobs?page=${paging}&limit=${limit}`
        if(type && type != "All"){
            query += `&typeSlt=${type}`
        }
        const response = await request.get(query);
        return response.data;
      },
    getAllJobTypes: async () => {
        let query = `/jobs/getAllType`;
        const response = await request.get(query);
        return response.data;
    },
    searchJob: async (paging, limit, keyword) => {
        const query = `/jobs/search?page=${paging}&limit=${limit}&kw=${encodeURIComponent(keyword)}`;
        const response = await request.get(query);
        return response.data;
    },
};
export default jobApi;