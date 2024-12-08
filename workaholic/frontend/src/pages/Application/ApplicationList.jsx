import React, { useState } from "react";
import { FaUser, FaEnvelope, FaBriefcase, FaPaperPlane, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useGetUserApplicationQuery } from "../../redux/rtk/application.service";

const JobApplicationList = () => {
  const [expandedApplication, setExpandedApplication] = useState(null);
  const { data: applications, error, isLoading } = useGetUserApplicationQuery(); // Fetch user applications
  console.log('app',applications)
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const toggleExpand = (id) => {
    setExpandedApplication(expandedApplication === id ? null : id);
  };

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading applications: {error.message}</div>;
  }

  // If applications are not found or empty, show a message
  if (!applications || applications.length === 0) {
    return <div>No applications found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Job Applications List
        </h2>

        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleExpand(application.id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-600 text-xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {application.user.user_name}
                      </h3>
                      <p className="text-gray-600">{application.job.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </span>
                    {expandedApplication === application.id ? (
                      <FaChevronUp className="text-gray-400" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedApplication === application.id && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {application.user.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaBriefcase className="text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        Applied on: {application.date_applied}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-gray-700 font-medium mb-2 flex items-center">
                        <FaPaperPlane className="mr-2" />
                        Cover Letter
                      </h4>
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                        {application.letter}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationList;
