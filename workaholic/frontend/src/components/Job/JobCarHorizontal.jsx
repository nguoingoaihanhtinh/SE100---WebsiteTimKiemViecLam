import { useContext } from "react";
import { FaBookmark, FaLocationPin, FaUserTie } from "react-icons/fa6";

import { useNavigate } from "react-router-dom";
import { useRemoveSaveJobMutation, useSavedJobMutation } from "../../redux/rtk/job.service";
import { AuthContext } from "../../context/AuthProvider";

export const JobCardHorizontal = ({ jobData }) => {
  const navigate = useNavigate();
  function formatCurrency(amount) {
    return amount.toLocaleString().replace(/\./g, ",");
  }
  const [saveJob] = useSavedJobMutation();
  const [removeSaveJob] = useRemoveSaveJobMutation();
  const { savedJobs, setSavedJobs } = useContext(AuthContext);
  const savedJobsArr = savedJobs?.map((e) => e.job_id) || [];
  const isSaved = savedJobsArr.includes(jobData.id);
  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSaved) {
      saveJob({ job_id: jobData.id });
      setSavedJobs((prev) => [...prev, { job_id: jobData.id }]);
    } else {
      removeSaveJob({ job_id: jobData.id });
      setSavedJobs((prev) => prev.filter((job) => job.job_id !== jobData.id));
    }
  };

  return (
    <div
      onClick={() => navigate(`/jobs/${jobData.id}`)}
      className={`border-[1px] border-gray-300 w-full transition-all duration-500 hover:shadow-md cursor-pointer overflow-hidden h-full flex items-center p-2 rounded-xl`}
    >
      {/* Job Image */}
      <div className="flex-shrink-0">
        <img src={jobData.company?.img} alt="No image" className="rounded-xl w-16 h-16 object-cover" />
      </div>

      {/* Job Information */}
      <div className="flex flex-col justify-between flex-grow ml-4 gap-1">
        {/* Job Title and Bookmark */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary-color">{jobData.title}</h2>
          <div
            className={`cursor-pointer bg-white p-2 rounded-full ${isSaved ? "text-yellow-500" : "text-gray-400"}`}
            onClick={handleBookmarkClick}
          >
            <FaBookmark />
          </div>
        </div>

        {/* Job Details */}
        <div className="flex items-center gap-4 text-primary-color text-sm">
          <div className="flex items-center gap-1">
            <FaLocationPin />
            <span>{jobData.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaUserTie />
            <span>{jobData.position}</span>
          </div>
        </div>

        {/* Rating and Salary */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold text-primary-color">
            {formatCurrency(jobData.salary_from)}đ / <span className="text-sm">{jobData.paymentBy}</span>
          </p>
          <div className="ml-auto"></div>
        </div>
      </div>
      {/* Action Button */}
    </div>
  );
};
