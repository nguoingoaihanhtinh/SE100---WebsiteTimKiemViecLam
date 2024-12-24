import { request } from "./request";

const jobApi = {
  getAllJobs: async (paging, limit, filters = null) => {
    let query = `/job?page=${paging}&limit=${limit}`;
    if (filters) {
      if (filters.selectedJobType && filters.selectedJobType.id) {
        query += `&jobType_id=${filters.selectedJobType.id}`;
      }
      if (filters.salaryRange) {
        query += `&salary_from=${filters.salaryRange[0]}&salary_to=${filters.salaryRange[1]}`;
      }
      if (filters.selectedExperience) {
        query += `&experience=${filters.selectedExperience.value}`;
      }
      if (filters.selectedLocation && filters.selectedLocation.latitude && filters.selectedLocation.longitude) {
        query += `&longitude=${filters.selectedLocation.longitude}&lattidue=${filters.selectedLocation.latitude}`;
      }
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
      if (filters.salaryRange) {
        query += `&salary_from=${filters.salaryRange[0]}&salary_to=${filters.salaryRange[1]}`;
      }
      if (filters.selectedExperience) {
        query += `&experience=${filters.selectedExperience.value}`;
      }
      if (filters.selectedLocation && filters.selectedLocation.latitude && filters.selectedLocation.longitude) {
        query += `&longitude=${filters.selectedLocation.latitude}&lattidue=${filters.selectedLocation.longitude}`;
      }
    }
    const response = await request.get(query);
    return response.data;
  },
};
export default jobApi;
