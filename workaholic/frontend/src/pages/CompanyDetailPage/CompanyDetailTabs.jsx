import React, { useEffect, useState } from "react";
import { FaHome, FaBookmark } from "react-icons/fa";
import SortBar from "../../components/filter/SortBar";
import Filter from "../../components/filter/Filter";
import JobListContent from "../JobListPage/JobListContent";
import jobApi from "../../api/jobApi";

const CompanyDetailTabs = () => {
  const [activeTab, setActiveTab] = useState("about"); // Default tab is 'About'

  const [filters, setFilters] = useState({
    salaryRange: [5000000, 200000000],
    selectedJobType: "",
    selectedLocation: "Location",
    selectedExperience: "Experience",
    selectedPayment: "Payment",
  });

  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch jobs specific to this company
  const fetchCompanyJobs = async () => {
    setLoading(true);
    const response = await jobApi.getCompanyJobs(page, 9, filters); // Assuming a company-specific endpoint
    if (response.status === "success") {
      setJobs(response.data);
      setTotalJobs(response.pagination.totalItems);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanyJobs();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    if (JSON.stringify(filters) !== JSON.stringify(newFilters)) {
      setFilters(newFilters);
      setPage(1);
    }
  };
  return (
    <div className="h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-[#171923] text-white flex justify-between items-center w-full px-6 py-4 shadow-md">
        {/* Conditionally render header content based on activeTab */}
        {activeTab === "about" && (
          <>
            {/* Home Button */}
            <button className="flex items-center space-x-2 hover:text-gray-300">
              <FaHome className="w-5 h-5 text-black" />{" "}
              {/* Icon with distinct color */}
              <span className="text-lg font-semibold text-black">Home</span>
            </button>

            {/* Bookmark Button */}
            <button className="flex items-center space-x-2 hover:text-gray-300">
              <FaBookmark className="w-5 h-5 text-black" />
              <span className="text-lg font-semibold text-black">
                Bookmark Company
              </span>
            </button>
          </>
        )}

        {activeTab === "jobs" && (
          <div className="w-full">
            {/* SortBar Component */}
            <SortBar onFilterChange={handleFilterChange} />
          </div>
        )}
      </header>
      {/* Tabs */}
      <div className="flex justify-center border-b">
        <button
          className={`px-6 py-2 text-lg font-bold ${
            activeTab === "about"
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>
        <button
          className={`px-6 py-2 text-lg font-bold ${
            activeTab === "jobs"
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "about" && (
          <div className="text-center">
            {/* Company Logo */}
            <div className="w-40 h-40 mx-auto mb-4">
              <img
                src="/picture/google.png"
                alt="Company Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            {/* Company Name */}
            <h2 className="text-2xl font-bold mb-2">
              Company name: Google LLC
            </h2>

            {/* About Section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-700">About:</h3>
              <p className="text-gray-600 mt-1">
                Google is a multinational technology company that provides
                Internet-related products and services, such as search,
                advertising, cloud computing, and software.
              </p>
            </div>

            {/* Contact Section */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-700">Contact:</h3>
              <p className="text-gray-600 mt-1">
                Website:{" "}
                <a href="https://google.com" className="text-blue-500">
                  google.com
                </a>
              </p>
              <p className="text-gray-600">Email: contact@google.com</p>
              <p className="text-gray-600">
                Address: 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
              </p>
            </div>
          </div>
        )}
        {activeTab === "jobs" && (
          <div className="w-full flex flex-col gap-5 px-5 md:px-10 lg:px-20">
            {/* Content Area */}
            <div className="w-full flex gap-5 md:gap-10">
              {/* Filter Section */}
              <div className="filter w-1/4">
                <Filter />
              </div>

              {/* Job List Section */}
              <div className="content w-3/4">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : (
                  <JobListContent
                    jobs={jobs}
                    totalJobs={totalJobs}
                    page={page}
                    setPage={setPage}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetailTabs;
