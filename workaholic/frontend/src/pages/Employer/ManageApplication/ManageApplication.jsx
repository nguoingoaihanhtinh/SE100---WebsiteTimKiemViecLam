import React, { useState } from "react";
import { FaTrash, FaSearch, FaPlus, FaChevronDown, FaUser, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDeleteApplicationMutation, useGetApplicationsByJobIdQuery, useUpdateApplicationMutation } from "../../../redux/rtk/application.service";
import { useParams } from "react-router-dom";

const initialApplications = [
  {
    id: 1,
    userName: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    jobTitle: "Frontend Developer",
    company: "TechCorp Inc.",
    experience: "5 years",
    education: "BS in Computer Science",
    status: "pending"
  },
  {
    id: 2,
    userName: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 987-6543",
    jobTitle: "UX Designer",
    company: "Design Studios",
    experience: "3 years",
    education: "BA in Design",
    status: "pending"
  },
  {
    id: 3,
    userName: "Michael Chen",
    email: "m.chen@email.com",
    phone: "(555) 456-7890",
    jobTitle: "Backend Engineer",
    company: "DataSys Solutions",
    experience: "7 years",
    education: "MS in Software Engineering",
    status: "pending"
  }
];

const ManageApplication = () => {
//   const [applications, setApplications] = useState(initialApplications);
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editApplication, setEditApplication] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);


    const { data: applications = [], refetch } = useGetApplicationsByJobIdQuery(id);
    const [updateApplication] = useUpdateApplicationMutation();
    console.log('app',applications);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        phone: "",
        jobTitle: "",
        company: "",
        experience: "",
        education: "",
        status: "pending"
    });
  const [errors, setErrors] = useState({});
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = "User Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateApplication({ id, applicationData: { status: newStatus } }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update application status", error);
    }
  };




  const filteredApplications = applications.filter(app =>
    app.user?.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.job?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status) => {
    switch(status) {
      case "approved": return "bg-green-500";
      case "rejected": return "bg-red-500";
      default: return "bg-yellow-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Application Listings</h1>
        {/* <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <FaPlus className="mr-2" /> Add New Application
        </button> */}
      </div>
        <div>
          <div className="mb-4 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-500 text-lg">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full divide-y divide-gray-200 mb-30">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                    <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <React.Fragment key={app.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setExpandedRow(expandedRow === app.id ? null : app.id)}
                            className="text-gray-500 hover:text-gray-700 bg-transparent"
                          >
                            {expandedRow === app.id ? <FaAngleUp /> : <FaAngleDown />}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                {app.user?.avatar ? (
                                <img
                                    src={app.user.avatar}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full"
                                />
                                ) : (
                                <div className="text-sm font-medium text-gray-900">
                                    No Avatar
                                </div>
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaUser className="mr-2 text-gray-400" />
                            <div className="text-sm font-medium text-gray-900">{app.user?.user_name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{app.job?.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap w-1/3 text-center">
                            <div className="relative">
                            {app.status === "pending" ? (
                                // Show buttons if status is "pending"
                                <div className="flex space-x-2">
                                <button
                                    onClick={() => handleStatusChange(app.id, "approved")}
                                    className="inline-flex justify-center items-center w-32 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-xl hover:bg-green-600"
                                >
                                    Approved
                                </button>
                                <button
                                    onClick={() => handleStatusChange(app.id, "rejected")}
                                    className="inline-flex justify-center items-center w-32 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-xl hover:bg-red-600"
                                >
                                    Rejected
                                </button>
                                </div>
                            ) : (
                                // Show the selected status as a label
                                <span
                                className={`inline-block w-32 px-4 py-2 text-center text-sm font-medium text-white rounded-xl ${getStatusStyle(
                                    app.status
                                )}`}
                                >
                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                </span>
                            )}
                            </div>
                        </td>
                      </tr>
                      {expandedRow === app.id && (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 bg-gray-50">
                            <div className="flex gap-4">
                              <div className="basis-[30%]">
                                <p className="text-sm font-medium text-gray-500">Email</p>
                                <p className="text-sm text-gray-900">{app.user?.email}</p>
                              </div>
                              <div className="basis-[70%]">
                                <p className="text-sm font-medium text-gray-500">CV:</p>
                                <p className="text-sm text-gray-900">
                                    {app.user?.cv_url ? app.user.cv_url : 'Người dùng chưa có cv'}
                                </p>
                              </div>
                             
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      
    </div>
  );
};

export default ManageApplication;