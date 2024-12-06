import React, { useEffect, useState } from "react";
import Filter from "../../components/filter/Filter";
import JobListContent from "./JobListContent";
import JobBanner from "./JobBanner";
import SortBar from "../../components/filter/SortBar";
import jobApi from "../../api/jobApi"; // Assuming you're fetching jobs from this API

const JobListPage = () => {
  const [filters, setFilters] = useState({
    salaryRange: [5000000, 200000000],
    selectedJobType: "", // Default to "All" for job type
    selectedLocation: "Location",
    selectedExperience: "Experience",
    selectedPayment: "Payment",
  });

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // For handling loading state

  // Fetch jobs when filters or page changes
  const getAllJobs = async () => {
    setLoading(true); // Start loading when the request is made
    const response = await jobApi.getAllJobs(page, 9, filters.selectedJobType);
    if (response.status === "success") {
      setJobs(response.data);
      setTotalJobs(response.pagination.totalItems);
    }
    setLoading(false); // Stop loading after data is fetched
  };

  useEffect(() => {
    getAllJobs();
  }, [filters.selectedJobType, page]); // Fetch jobs when filters or page changes
  // console.log('Selected Job Type:', filters.selectedJobType);
  // Filter jobs based only on the selected job type
  const jobTypeFilteredJobs = jobs.filter((job) => {
    return filters.selectedJobType && filters.selectedJobType !== "" && filters.selectedJobType !== "Job Type"
      ? job.type === filters.selectedJobType
      : true;
  });
  // console.log('jobs',jobTypeFilteredJobs)

  const handleFilterChange = (newFilters) => {
    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
      setPage(1);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
      <div className="bg-primary-color w-full p-5">
        <SortBar onFilterChange={handleFilterChange} />
      </div>
      <div className="banner">
        <JobBanner />
      </div>
      <div className="w-full flex gap-10">
        <div className="filter w-1/4 items-center">
          <Filter />
        </div>
        <div className="content w-3/4">
          {loading ? (
            <div>Loading...</div> // Show loading indicator while fetching
          ) : (
            <JobListContent jobs={jobs} totalJobs={totalJobs} page={page} setPage={setPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListPage;
