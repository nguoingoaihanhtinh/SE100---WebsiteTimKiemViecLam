import { useState } from "react";
import { FiEdit, FiTrash2, FiEye, FiSearch } from "react-icons/fi";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "New York, NY",
      datePosted: "2024-01-15",
      description: "We are seeking an experienced Frontend Developer to join our team.",
      requirements: "5+ years of React experience, Strong TypeScript skills",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "DataFlow Systems",
      location: "San Francisco, CA",
      datePosted: "2024-01-14",
      description: "Looking for a skilled Backend Engineer to develop scalable solutions.",
      requirements: "3+ years of Node.js, Experience with AWS",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requirements: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Job title is required";
    if (!formData.company) errors.company = "Company name is required";
    if (!formData.location) errors.location = "Location is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.requirements) errors.requirements = "Requirements are required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      if (selectedJob) {
        setJobs(
          jobs.map((job) =>
            job.id === selectedJob.id
              ? {
                  ...job,
                  ...formData,
                  datePosted: job.datePosted,
                }
              : job
          )
        );
      } else {
        setJobs([
          ...jobs,
          {
            id: jobs.length + 1,
            ...formData,
            datePosted: new Date().toISOString().split("T")[0],
          },
        ]);
      }
      setShowForm(false);
      setSelectedJob(null);
      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        requirements: "",
      });
    } else {
      setFormErrors(errors);
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      requirements: job.requirements,
    });
    setShowForm(true);
    setShowDetails(false);
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const handleView = (job) => {
    setSelectedJob(job);
    setShowDetails(true);
    setShowForm(false);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Job Listings Management</h1>
          <button
            onClick={() => {
              setShowForm(true);
              setShowDetails(false);
              setSelectedJob(null);
              setFormData({
                title: "",
                company: "",
                location: "",
                description: "",
                requirements: "",
              });
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add New Job
          </button>
        </div>

        {!showForm && !showDetails && (
          <>
            <div className="mb-4 relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full text-black bg-white pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Posted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-black-2">{job.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black-2">{job.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black-2">{job.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black-2">{job.datePosted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-black-2">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleView(job)}
                            className="text-blue-600 bg-gray-200 hover:text-blue-800"
                          >
                            <FiEye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(job)}
                            className="text-green-600 bg-gray-200 hover:text-green-800"
                          >
                            <FiEdit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="text-red-600 bg-gray-200 hover:text-red-800"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 ">
            <h2 className="text-2xl font-bold mb-6">{selectedJob ? "Edit Job" : "Add New Job"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`bg-white px-2 py-2 border-[1px] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.title ? "border-red-500" : ""
                  }`}
                />
                {formErrors.title && <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={` bg-white px-2 py-2 border-[1px] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.company ? "border-red-500" : ""
                  }`}
                />
                {formErrors.company && <p className="mt-1 text-sm text-red-500">{formErrors.company}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`bg-white px-2 py-2 border-[1px] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.location ? "border-red-500" : ""
                  }`}
                />
                {formErrors.location && <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  className={`bg-white px-2 py-2 border-[1px] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.description ? "border-red-500" : ""
                  }`}
                />
                {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Requirements</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows="4"
                  className={` bg-white px-2 py-2 border-[1px] mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    formErrors.requirements ? "border-red-500" : ""
                  }`}
                />
                {formErrors.requirements && <p className="mt-1 text-sm text-red-500">{formErrors.requirements}</p>}
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSelectedJob(null);
                    setFormErrors({});
                  }}
                  className="bg-white px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {selectedJob ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}

        {showDetails && selectedJob && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Job Details</h2>
              <button onClick={() => setShowDetails(false)} className="text-gray-600 hover:text-gray-800 bg-gray-200">
                Close
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Job Title</h3>
                <p className="text-gray-600">{selectedJob.title}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Company</h3>
                <p className="text-gray-600">{selectedJob.company}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Location</h3>
                <p className="text-gray-600">{selectedJob.location}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Date Posted</h3>
                <p className="text-gray-600">{selectedJob.datePosted}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Description</h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Requirements</h3>
                <p className="text-gray-600">{selectedJob.requirements}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
