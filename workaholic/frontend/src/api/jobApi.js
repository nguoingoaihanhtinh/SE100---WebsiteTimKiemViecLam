import { request } from "./request";

const jobApi = {
  getAllJobs: async (paging, limit, type) => {
    let query = `/job?page=${paging}&limit=${limit}`;
    if (type && type != "All") {
      query += `&typeSlt=${type}`;
    }
    const response = await request.get(query);
    return response.data;
  },
  getAllJobTypes: async () => {
    let query = `/job/getAllType`;
    const response = await request.get(query);
    return response.data;
  },
  getJobFilters: async () => {
    const response = await request.get(`/job/getFilters`);
    return response.data;
  },
  searchJob: async (paging, limit, keyword, filters = null) => {
    let query = `/job/search?page=${paging}&limit=${limit}`;
    if (keyword) {
      query += `&kw=${keyword}`;
    }
    if (filters) {
      if (filters.selectedJobType.id) {
        query += `&jobType_id=${filters.selectedJobType.id}`;
      }
      if(filters.salaryRange){
        query += `&salaryFrom=${filters.salaryRange[0]}&salaryTo=${filters.salaryRange[1]}`;
      }
      if(filters.experience){
        query += `&experience=${filters.experience}`;
      }
    }
    const response = await request.get(query);
    return response.data;
  },
};
export default jobApi;
