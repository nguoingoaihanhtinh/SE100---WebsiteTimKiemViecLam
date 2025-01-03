import { FaBookmark, FaLocationPin } from "react-icons/fa6";
import Rating from "../Rating/Rating";
import { useContext, useState } from "react";
import JobApplicationForm from "../../pages/Application/ApplicationForm";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useRemoveSaveJobMutation, useSavedJobMutation } from "../../redux/rtk/job.service";
import { AuthContext } from "../../context/AuthProvider";
import toast from "react-hot-toast";
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
}
export const JobCard = ({ jobData }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);

  const navigate = useNavigate();
  const [isFormVisible, setFormVisible] = useState(false);
  const [saveJob] = useSavedJobMutation();
  const [removeSaveJob] = useRemoveSaveJobMutation();
  const { savedJobs, setSavedJobs } = useContext(AuthContext);
  const savedJobsArr = savedJobs?.map((e) => e.job_id) || [];
  const isSaved = savedJobsArr.includes(jobData.id);
  const showForm = () => {
    if (!isLoggedIn) {
      toast.error("You must be logged in to apply for a job.");
      window.location.href = "/login"; // Redirect to login page
      return;
    }

    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };
  const getJobCardBackground = (jobType) => {
    if (!jobType || !jobType.name) {
      return "bg-white"; // Return default if jobType or name is missing
    }

    switch (jobType.name) {
      case "Sales":
        return "bg-yellow-50"; // Yellow for Sales
      case "Technology":
        return "bg-cyan-50"; // Cyan for Technology
      case "Bank":
        return "bg-green-50"; // Green for Bank
      case "Marketing":
        return "bg-pink-50"; // Pink for Marketing
      case "Estate":
        return "bg-gray-50"; // Gray for Estate
      case "Service":
        return "bg-red-50"; // Red for Service
      case "Human Resource":
        return "bg-orange-50"; // Orange for HR
      default:
        return "bg-white"; // Default background if no match
    }
  };
  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error("You must be logged in to bookmark a job.");
      return;
    }

    if (!isSaved) {
      await saveJob({ job_id: jobData.id });
      setSavedJobs((prev) => [...prev, { job_id: jobData.id }]);
      toast.success("Job bookmarked successfully!");
    } else {
      await removeSaveJob({ job_id: jobData.id });
      setSavedJobs((prev) => prev.filter((job) => job.job_id !== jobData.id));
      toast.success("Job removed from bookmarks!");
    }
  };
  return (
    <>
      <div
        onClick={() => navigate(`/jobs/${jobData.id}`)}
        className={`border-[1px] px-2 border-black-50 transition-all duration-500 hover:shadow-xl cursor-pointer overflow-hidden rounded-xl ${getJobCardBackground(
          jobData.jobType
        )}`}
      >
        <div className="overflow-hidden">
          <div className="content flex flex-col rounded-xl">
            <div className="top flex justify-between p-5 pb-2">
              <div className="icon">
                <img
                  src={jobData.company.img}
                  alt="No image"
                  className="mx-auto rounded-xl w-10 h-10 object-cover transition duration-700 hover:skew-x-2 "
                />
              </div>

              <div
                className={`save bg-white rounded-full w-10 h-10 flex justify-center items-center ${
                  isSaved ? "text-yellow-500" : "text-gray-500"
                }`}
                onClick={handleBookmarkClick}
              >
                <FaBookmark />
              </div>
            </div>
            <div className="main flex flex-col gap-2 px-2">
              <p className="text-lg text-primary-color text-left font-bold">{jobData.title}</p>
              <div className="rating flex justify-between items-center gap-3">
                <span className="mb-[2px] text-xl">
                  <Rating className={"text-lg"} rating={jobData.company.rating} />
                </span>
                <h1 className="text-sm text-primary-color"> ( {jobData.company.number_rating} reviews) </h1>
              </div>
              <div className="location flex gap-2 text-primary-color items-center text-lg">
                <FaLocationPin />
                <span className="text-[15px]">{jobData.company.address}</span>
              </div>
              <div className="pop-ups flex flex-wrap  text-primary-color items-center gap-2 p-1">
                <div className="position border border-gray-500 rounded-[8px] py-1 min-w-20 flex justify-center items-center hover:scale-105">
                  <p className="text-center text-[15px] px-2 font-semibold">{jobData.position}</p>
                </div>
                <div className="experience border border-gray-500 rounded-[8px] py-1 min-w-20 flex justify-center items-center hover:scale-105">
                  <p className="text-center text-[15px] px-2 font-semibold">{jobData.experience} Years+</p>
                </div>
                <div className="schedule border border-gray-500 rounded-[8px] py-1 min-w-20 flex justify-center items-center hover:scale-105">
                  <p className="text-center text-[15px] px-2 font-semibold">{jobData.schedule}</p>
                </div>
                <div className="type border border-gray-500 rounded-[8px] py-1 min-w-20 flex justify-center items-center hover:scale-105">
                  <p className="text-center text-[15px] px-2 font-semibold">{jobData.jobType.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="payment flex flex-col text-primary-color mx-1 gap-3 my-3">
            <p className="text-lg font-bold px-2">
              {formatCurrency(jobData.salary_from)} - {formatCurrency(jobData.salary_to)}
            </p>
            <div className="buttons flex justify-between gap-2">
              <button
                onClick={() => {
                  console.log("Button clicked");
                }}
                className="px-4 py-2 bg-white w-1/3"
              >
                Details
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  showForm();
                }}
                className="px-4 py-2 bg-black text-sm rounded-[4px] inline-flex text-white items-center gap-2 cursor-pointer hover:opacity-90 transition-all"
              >
                <FaPaperPlane className="text-white" />
                <p className="text-white font-md">Ứng tuyển ngay</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isFormVisible && <JobApplicationForm closeForm={closeForm} JobData={jobData} user={userData} />}
    </>
  );
};
