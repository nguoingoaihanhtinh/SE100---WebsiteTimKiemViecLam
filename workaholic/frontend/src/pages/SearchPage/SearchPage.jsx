import { useEffect, useState } from "react";
import jobApi from "../../api/jobApi"; // Assuming you're fetching jobs from this API
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import SortBar from "../../components/filter/SortBar";
import Banner from "../JobListPage/JobBanner";
import Filter from "../../components/filter/Filter";
import JobListContent from "../JobListPage/JobListContent";

const SearchPage = () => {
  const [filters, setFilters] = useState({
    salaryRange: [5000000, 200000000],
    selectedJobType: "", // Default to "All" for job type
    selectedLocation: "Location",
    selectedExperience: "Experience",
    selectedPayment: "Payment",
  });

  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // For handling loading state
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || ""; // Get the 'query' parameter
  };
  const getSearchedJobs = async () => {
    const query = searchQuery || getQueryParams();
    if (query) {
      try {
        setLoading(true);
        const response = await jobApi.searchJob(1, 9, query);
        if (response.status === "success") {
          setJobs(response.data);
          setTotalJobs(response.pagination.totalJobs);
          setError(null);
        } else {
          setJobs([]);
          setError("No results found");
        }
      } catch (err) {
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    } else {
      setJobs([]); // No query, reset jobs
      setError(null);
    }
  };
  useEffect(() => {
    const query = searchQuery || getQueryParams();
    if (query !== "") {
      getSearchedJobs();
    } else {
      setJobs([]); // Reset jobs if there's no query
      setError(null);
    }
  }, [searchQuery, location.search]); // Trigger when searchQuery or location.search changes

  useEffect(() => {
    const query = getQueryParams();
    if (query !== searchQuery) {
      setSearchQuery(query); // Update searchQuery with the value from the URL
    }
  }, [location.search]); // Trigger when the URL query changes

  const handleFilterChange = (newFilters) => {
    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
      setPage(1);
    }
  };
  const handleCancelClick = () => {
    navigate("/category"); // Redirect to /category page
  };
  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
      <div className="bg-primary-color w-full p-5">
        <SortBar onFilterChange={handleFilterChange} />
      </div>
      <div className="banner">
        <Banner />
      </div>
      <div className="w-full flex gap-10">
        <div className="filter w-1/4 items-center">
          <Filter />
        </div>
        <div className="content w-3/4">
          <div className="search flex justify-between p-3">
            <label className="text-primary-color text-lg">
              Search result for <span className="text-xl font-bold">"{searchQuery}"</span>{" "}
            </label>
            <Button onClick={handleCancelClick}>Cancel</Button> {/* Add onClick handler */}
          </div>
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

export default SearchPage;
