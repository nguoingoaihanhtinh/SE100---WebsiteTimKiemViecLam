import { useEffect, useState } from "react";
import jobApi from "../../api/jobApi"; // Assuming you're fetching jobs from this API
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import SortBar from "../../components/filter/SortBar";
import Banner from "../JobListPage/JobBanner";
import Filter from "../../components/filter/Filter";
import JobListContent from "../JobListPage/JobListContent";

const SearchPage = () => {
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

  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); // For handling loading state
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("jobType_id") || "";
  };
  const getQueryParams2 = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || "";
  };
  const getSearchedJobs = async () => {
    console.log(2);
    const query = searchQuery || getQueryParams2();
    const newFilter = { ...filters, order: sortBy };
    try {
      setLoading(true);
      let response = null;
      response = await jobApi.searchJob(page, 6, query, newFilter);

      setJobs(response.data);
      setTotalJobs(response.pagination.totalJobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getSearchedJobs();
  }, [searchQuery, filters, sortBy, page]); // Trigger when searchQuery or location.search changes

  useEffect(() => {
    const query = getQueryParams();
    const query2 = getQueryParams2();
    if (query2) {
      setSearchQuery(query2);
    }
    if (query) {
      setFilters((prev) => ({ ...prev, selectedJobType: { id: query } }));
    } else {
      setFilters(null);
    }
  }, [location]); // Trigger when the URL query changes

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters });
    setPage(1);
  };
  const handleCancelClick = () => {
    navigate("/category"); // Redirect to /category page
  };
  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
      <div className="banner">
        <Banner />
      </div>
      <div className="bg-primary-color w-full p-3 rounded-[12px]">
        <SortBar onFilterChange={handleFilterChange} />
      </div>
      <div className="w-full flex gap-10">
        <div className="filter w-1/4 items-center">
          <Filter setSortBy={setSortBy} />
        </div>
        <div className="content w-3/4">
          {searchQuery && (
            <div className="search flex justify-between p-3">
              <label className="text-primary-color text-lg">
                Search result for {searchQuery}
                <span className="text-xl font-bold">&quot;{searchQuery}&quot;</span>{" "}
              </label>
              <Button onClick={handleCancelClick}>Cancel</Button> {/* Add onClick handler */}
            </div>
          )}

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
