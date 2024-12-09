import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaBriefcase, FaPaperPlane, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { useGetUserApplicationQuery, useDeleteApplicationMutation } from "../../redux/rtk/application.service";
import { useCheckLoginQuery } from "../../redux/rtk/user.service";
import { Link } from "react-router-dom";

const JobApplicationList = () => {
  const [expandedApplication, setExpandedApplication] = useState(null);
  const { data: applications, error, isLoading } = useGetUserApplicationQuery();
  const [deleteApplication] = useDeleteApplicationMutation();
  const [deleteMessage, setDeleteMessage] = useState(null);
  const { data: loginStatus, isLoading: loginLoading } = useCheckLoginQuery();

  console.log('app', applications);

  useEffect(() => {
    if (isLoading) {
      alert("Loading user status. Please wait.");
      return;
    }

    if (!loginStatus?.user?.id) {
      alert("You must be logged in to apply for a job.");
      window.location.href = "/login"; // Redirect to login page
      return;
    }

  }, [loginLoading, loginStatus]);

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
  if (isLoading || loginLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 items-center text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 8">
            Job Applications List
          </h2>
          <div className="text-red-500 text-center p-5">Error loading applications:  <span className="font-semibold">{error.data.message}</span></div>;
          <Link to={'/jobs'} className="border border-gray-400 p-2 rounded-xl">Find a job now</Link>
        </div>

      </div>
    );
  }



  // Handle deleting an application
  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      setDeleteMessage("Application deleted successfully.");
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      setDeleteMessage("Error deleting application.");
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Job Applications List
        </h2>
        {deleteMessage && (
          <div className="mb-4 text-green-500">
            {deleteMessage}
          </div>
        )}
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
                    {/* Delete Icon */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent expanding/collapsing when deleting
                        handleDelete(application.id);
                      }}
                      className="text-gray-600 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>

                    {/* Status */}
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
