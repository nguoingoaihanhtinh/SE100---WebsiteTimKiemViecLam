import { useEffect, useState } from "react";
import Filter from "../../components/filter/Filter";
import JobListContent from "./JobListContent";
import JobBanner from "./JobBanner";
import SortBar from "../../components/filter/SortBar";
import jobApi from "../../api/jobApi"; // Assuming you're fetching jobs from this API

const JobListPage = () => {
  const [filters, setFilters] = useState({
    salaryRange: [0, 200000000],
    selectedJobType: {
      id: null,
      name: "",
    },
    selectedLocation: "Location",
    selectedExperience: "Experience",
    selectedPayment: "Payment",
  });

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // For handling loading state

  const getFilteredJobs = async () => {
    try {
      setLoading(true);
      const response = await jobApi.getAllJobs(page, 9, filters);
      setJobs(response.data);
      setTotalJobs(response.pagination.totalItems);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilteredJobs();
  }, [filters, page]); // Trigger fetch when filters or page changes

  const handleFilterChange = (newFilters) => {
    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
      setPage(1); // Reset to the first page on filter change
    }
  };

  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
      <div className="banner">
        <JobBanner />
      </div>
      <div className="bg-primary-color w-full p-5">
        <SortBar onFilterChange={handleFilterChange} />
      </div>
      <div className="w-full flex gap-6">
        <div className="filter w-1/4 items-center">
          <Filter />
        </div>
        <div className="content ">
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
