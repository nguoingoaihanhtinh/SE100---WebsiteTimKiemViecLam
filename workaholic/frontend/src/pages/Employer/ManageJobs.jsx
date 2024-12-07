import { useContext, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useLazyGetAllJobsByCompanyIdQuery } from "../../redux/rtk/job.service";
import { AuthContext } from "../../context/AuthProvider";
import { useGetCompanyByUserIdQuery } from "../../redux/rtk/company.service";
import { useNavigate } from "react-router";
import AddJobForm from "./AddJobForm";
const ManageJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const { userData } = useContext(AuthContext);
  const { data: company } = useGetCompanyByUserIdQuery(userData?.id, {
    skip: !userData?.id,
  });
  const navigate = useNavigate();
  const [callGetJobs] = useLazyGetAllJobsByCompanyIdQuery();
  const getJobs = async () => {
    const res = await callGetJobs({
      limit: 1000,
      page: 1,
      company_id: company?.data?.id,
    });
    setJobs(res.data?.data);
    setAllJobs(res.data?.data);
  };
  useEffect(() => {
    if (company?.data?.id) {
      getJobs();
    }
  }, [company]);
  useEffect(() => {
    const filteredJobs = allJobs.filter((job) => {
      const lowerSearchQuery = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(lowerSearchQuery) ||
        job.position.toLowerCase().includes(lowerSearchQuery) ||
        job.experience.toLowerCase().includes(lowerSearchQuery) ||
        job.salary_from.toString().includes(lowerSearchQuery) ||
        job.salary_to.toString().includes(lowerSearchQuery) ||
        job.company.name.toLowerCase().includes(lowerSearchQuery) ||
        job.jobType.name.toLowerCase().includes(lowerSearchQuery)
      );
    });
    setJobs(filteredJobs);
  }, [searchQuery]);
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      {!showAddJobForm && (
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Job Listings Management
            </h1>
            <div
              onClick={() => setShowAddJobForm(true)}
              className="px-4 py-2 rounded-[8px] text-white font-semibold cursor-pointer hover:bg-blue-700 transition-all border-[1px] bg-blue-600"
            >
              Add Job
            </div>
          </div>
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
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => navigate(`/employer/joblist/${job.id}`)}
                  className="border border-gray-300 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
                >
                  <h2 className="text-xl font-semibold text-blue-600">
                    {job.title}
                  </h2>
                  <p className="text-gray-700">
                    Company:{" "}
                    <span className="font-bold">{job.company.name}</span>
                  </p>
                  <p className="text-gray-600">Position: {job.position}</p>
                  <p className="text-gray-600">Experience: {job.experience}</p>
                  <p className="text-gray-600">
                    Salary:{" "}
                    <span className="font-bold">
                      ${job.salary_from} - ${job.salary_to}
                    </span>
                  </p>
                  <p className="text-gray-600">Valid Date: {job.valid_date}</p>
                  <p className="text-gray-600">
                    Expired Date: {job.expired_date}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No jobs available.</p>
            )}
          </div>
        </div>
      )}
      {showAddJobForm && <AddJobForm />}
    </div>
  );
};

export default ManageJobs;
