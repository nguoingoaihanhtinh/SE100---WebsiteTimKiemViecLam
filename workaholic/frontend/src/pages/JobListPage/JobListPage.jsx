import { useEffect, useState } from "react";
import Filter from "../../components/filter/Filter";
import JobListContent from "./JobListContent";
import JobBanner from "./JobBanner";
import SortBar from "../../components/filter/SortBar";
import jobApi from "../../api/jobApi";

const JobListPage = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [filters, setFilters] = useState({
    salaryRange: [0, 200000000],
    selectedJobType: {
      id: null,
      name: "",
    },
    selectedLocation: "Location",
    selectedExperience: { label: "Experience", value: 0 },
    selectedPayment: "Payment",
  });

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getFilteredJobs = async () => {
    const newFilter = { ...filters, order: sortBy };
    try {
      setLoading(true);
      let response = null;
      response = await jobApi.getAllJobs(page, 9, newFilter);
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
  }, [filters, sortBy, page]);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters });
    setPage(1);
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
          <Filter setSortBy={setSortBy} />
        </div>
        <div className="content ">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <JobListContent jobs={jobs} totalJobs={totalJobs} page={page} setPage={setPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListPage;
