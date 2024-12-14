import React, { useState } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaRegClock,
  FaEnvelope,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";

const AddJobTab = ({ onBack }) => {
  const [jobData, setJobData] = useState({
    title: "",
    jobType: "",
    location: "",
    salary_from: "",
    paymentBy: "",
    status: "",
    schedule: "",
    experience: "",
    hiringManager: "",
    hiringManagerEmail: "",
  });

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Job posted:", jobData);
    // Logic for submitting job data
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-3/4 mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Post a New Job
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Job Title */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="title">
            <FaBriefcase className="inline mr-2" />
            Job Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={jobData.title}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job title"
          />
        </div>

        {/* Job Type */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="jobType">
            <FaCheckCircle className="inline mr-2" />
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={jobData.jobType}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Job Type</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Design">Design</option>
            <option value="Product">Product</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="location">
            <FaMapMarkerAlt className="inline mr-2" />
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobData.location}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter job location"
          />
        </div>

        {/* Salary */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="salary_from">
            <FaMoneyBillAlt className="inline mr-2" />
            Salary
          </label>
          <input
            type="number"
            id="salary_from"
            name="salary_from"
            value={jobData.salary_from}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter salary amount"
          />
        </div>

        {/* Payment By */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="paymentBy">
            <FaMoneyBillAlt className="inline mr-2" />
            Payment By
          </label>
          <input
            type="text"
            id="paymentBy"
            name="paymentBy"
            value={jobData.paymentBy}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter payment frequency (e.g., Month)"
          />
        </div>

        {/* Schedule */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="schedule">
            <FaRegClock className="inline mr-2" />
            Schedule
          </label>
          <input
            type="text"
            id="schedule"
            name="schedule"
            value={jobData.schedule}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter work schedule"
          />
        </div>

        {/* Experience */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="experience">
            <FaRegClock className="inline mr-2" />
            Experience Required
          </label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={jobData.experience}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter required experience"
          />
        </div>

        {/* Hiring Manager */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="hiringManager">
            <FaUser className="inline mr-2" />
            Hiring Manager
          </label>
          <input
            type="text"
            id="hiringManager"
            name="hiringManager"
            value={jobData.hiringManager}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hiring manager's name"
          />
        </div>

        {/* Hiring Manager Email */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2" htmlFor="hiringManagerEmail">
            <FaEnvelope className="inline mr-2" />
            Hiring Manager Email
          </label>
          <input
            type="email"
            id="hiringManagerEmail"
            name="hiringManagerEmail"
            value={jobData.hiringManagerEmail}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hiring manager's email"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        {/* Post Job Button */}
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
        >
          Post Job
        </button>

        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-3 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
        >
          Back to Job List
        </button>
      </div>
    </div>
  );
};

export default AddJobTab;