import { useState, useEffect, useContext } from "react";
import { FaUser, FaEnvelope, FaBriefcase, FaPaperPlane, FaChevronDown, FaChevronUp, FaTrash } from "react-icons/fa";
import { useGetUserApplicationQuery, useDeleteApplicationMutation } from "../../redux/rtk/application.service";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const JobApplicationList = () => {
  const [expandedApplication, setExpandedApplication] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("desc");
  const itemsPerPage = 5;

  const { data, error, isLoading } = useGetUserApplicationQuery({
    page: currentPage,
    limit: itemsPerPage,
    order: sortOrder,
  });
  const applications = data?.data;
  const pagination = data?.pagination;
  console.log("data", applications);
  const [deleteApplication] = useDeleteApplicationMutation();
  const { isLoggedIn, isAuthLoading } = useContext(AuthContext);
  useEffect(() => {
    if (!isAuthLoading) {
      if (!isLoggedIn) {
        toast.error("You must be logged in to apply for a job.");
        window.location.href = "/login";
      }
    }
  }, [isLoggedIn, isAuthLoading]);

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

  const handleDelete = async (id) => {
    try {
      await deleteApplication(id);
      toast.success("Application deleted successfully.");
      window.location.reload();
    } catch (error) {
      toast.error("Error deleting application.");
      console.error("Error deleting application:", error);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 items-center text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Job Applications List</h2>
          <div className="text-red-500 text-center p-5">
            Error loading applications:
            <span className="font-semibold">{error.data.message}</span>
          </div>
          <Link to={"/jobs"} className="border border-gray-400 p-2 rounded-xl">
            Find a job now
          </Link>
        </div>
      </div>
    );
  }
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => {
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      console.log("New Sort Order:", newOrder);
      return newOrder;
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Job Applications List</h2>
        {/* Button to toggle sort order */}
        <div className="flex justify-start mb-4">
          <p onClick={toggleSortOrder} className="bg-gray-500 text-white flex items-center gap-2 py-2 px-4 rounded">
            Sort by Date
            {sortOrder === "asc" ? (
              <span className="flex items-center">
                <FaAngleUp /> Ascending
              </span>
            ) : (
              <span className="flex items-center">
                <FaAngleDown /> Descending
              </span>
            )}
          </p>
        </div>
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 cursor-pointer" onClick={() => toggleExpand(application.id)}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <FaUser className="text-gray-600 text-xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{application.user.user_name}</h3>
                      <p className="text-gray-600">{application.job.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(application.id);
                      }}
                      className="text-gray-600 hover:text-red-500"
                    >
                      <FaTrash />
                    </button>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
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
                      <span className="text-gray-600">{application.user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBriefcase className="text-gray-400 mr-2" />
                      <span className="text-gray-600">Applied on: {application.date_applied}</span>
                    </div>
                    <div>
                      <h4 className="text-gray-700 font-medium mb-2 flex items-center">
                        <FaPaperPlane className="mr-2" />
                        Cover Letter
                      </h4>
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{application.letter}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={pagination?.totalApplications || 0}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default JobApplicationList;
