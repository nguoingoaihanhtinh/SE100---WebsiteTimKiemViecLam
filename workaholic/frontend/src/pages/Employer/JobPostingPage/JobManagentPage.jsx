// JobPostingPage.jsx
import React, { useState } from "react";
import ActionBar from "./ActionBar";
import EmployerJobCard from "../../../components/Job/EmployerJobCard";
import Sidebar from "./Sidebar";
import AddJobTab from "./AddJobTab"; // Import the AddJobPage component

const JobManagementPage = () => {
  const jobDataList = [
    {
      id: 1,
      title: "Software Engineer",
      jobType: { name: "Technology" },
      position: "Full-time",
      experience: "3+ years",
      schedule: "Flexible",
      location: "Ho Chi Minh City",
      salary_from: "20,000,000",
      paymentBy: "Month",
      status: "active",
    },
    {
      id: 2,
      title: "Marketing Manager",
      jobType: { name: "Marketing" },
      position: "Part-time",
      experience: "5+ years",
      schedule: "Full-time",
      location: "Hanoi",
      salary_from: "15,000,000",
      paymentBy: "Month",
      status: "expired",
    },
    {
      id: 3,
      title: "Graphic Designer",
      jobType: { name: "Design" },
      position: "Full-time",
      experience: "2+ years",
      schedule: "Remote",
      location: "Da Nang",
      salary_from: "12,000,000",
      paymentBy: "Month",
      status: "active",
    },
    {
      id: 4,
      title: "Product Manager",
      jobType: { name: "Product" },
      position: "Full-time",
      experience: "4+ years",
      schedule: "Hybrid",
      location: "Ho Chi Minh City",
      salary_from: "25,000,000",
      paymentBy: "Month",
      status: "draft",
    },
    {
      id: 5,
      title: "HR Specialist",
      jobType: { name: "Human Resources" },
      position: "Part-time",
      experience: "2+ years",
      schedule: "Full-time",
      location: "Remote",
      salary_from: "18,000,000",
      paymentBy: "Month",
      status: "active",
    },
  ];

  const stats = {
    totalJobs: jobDataList.length,
    activeJobs: jobDataList.filter((job) => job.status === "active").length,
    currentApplicants: 120, // Dữ liệu mẫu
  };

  const [isAddingJob, setIsAddingJob] = useState(false); // State to toggle between views

  const handlePostNewJob = () => {
    setIsAddingJob(true); // Switch to "Add New Job" page
  };

  const handleBackToJobList = () => {
    setIsAddingJob(false); // Switch back to Job List
  };

  const handleFilterChange = (filterType, value) => {
    console.log(`Filter Type: ${filterType}, Value: ${value}`);
    // Add filtering logic here
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100 p-6">
      <main className="flex-grow p-4">
        {/* If we are adding a new job, show AddJobPage */}
        {isAddingJob ? (
          <AddJobTab onBack={handleBackToJobList} />
        ) : (
          <>
            {/* Action Bar */}
            <ActionBar onPostNewJob={handlePostNewJob} onFilterChange={handleFilterChange} />

            {/* Job Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {jobDataList.map((job) => (
                <EmployerJobCard key={job.id} jobData={job} />
              ))}
            </div>
          </>
        )}
      </main>

      {/* Sidebar */}
      <Sidebar stats={stats} />
    </div>
  );
};

export default JobManagementPage;