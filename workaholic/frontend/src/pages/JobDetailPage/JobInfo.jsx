import { useContext, useState } from "react";
import { FaClock, FaHourglass, FaLocationDot, FaMoneyBill, FaPaperPlane, FaRegHeart, FaHeart } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthProvider";
import JobApplicationForm from "../Application/ApplicationForm";
import toast from "react-hot-toast";
import { useRemoveSaveJobMutation, useSavedJobMutation } from "../../redux/rtk/job.service";
function convertToMilions(amountVND) {
  if (typeof amountVND !== "number" || amountVND < 0) {
    throw new Error("Invalid input. Please provide a positive number.");
  }
  return amountVND / 100000;
}
function experienceRequirement(years) {
  if (typeof years !== "number" || years < 0) {
    throw new Error("Invalid input. Please provide a non-negative number.");
  }
  return years === 0 ? "Không yêu cầu kinh nghiệm" : `Tối thiểu ${years} năm kinh nghiệm`;
}
export default function JobInfo({ job }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const { isLoggedIn, userData, savedJobs, setSavedJobs } = useContext(AuthContext);
  const closeForm = () => {
    setFormVisible(false);
  };
  const [saveJob] = useSavedJobMutation();
  const [removeSaveJob] = useRemoveSaveJobMutation();

  const savedJobsArr = savedJobs?.map((e) => e.job_id) || [];
  const isSaved = savedJobsArr.includes(job.id);
  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error("You must be logged in to bookmark a job.");
      return;
    }

    if (!isSaved) {
      await saveJob({ job_id: job.id });
      setSavedJobs((prev) => [...prev, { job_id: job.id }]);
      toast.success("Job bookmarked successfully!");
    } else {
      const newJobs = [];
      for (let i = 0; i < savedJobs.length; i++) {
        if (savedJobs[i].job_id !== job.id) {
          newJobs.push(savedJobs[i]);
        }
      }

      await removeSaveJob({ job_id: job.id });
      setSavedJobs(newJobs);
      toast.success("Job removed from bookmarks!");
    }
  };
  return (
    <div className="bg-white px-[24px] py-[16px] rounded-[12px] w-full">
      <p className="text-[22px] font-bold">{job.title}</p>
      <div className="flex mt-8 gap-4">
        <div className="basis-1/3 flex gap-4 items-center">
          <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
            <div className="">
              <FaMoneyBill className="text-white text-2xl" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="">Mức lương</p>
            <p className="font-semibold ">
              {convertToMilions(job.salary_from)} - {convertToMilions(job.salary_to)} triệu
            </p>
          </div>
        </div>
        <div className="basis-1/3 flex gap-4 items-center">
          <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
            <div className="">
              <FaLocationDot className="text-white text-2xl" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="">Địa điểm</p>
            <p className="font-semibold ">{job.company.address}</p>
          </div>
        </div>
        <div className="basis-1/3 flex gap-4 items-center">
          <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
            <div className="">
              <FaHourglass className="text-white text-2xl" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="">Kinh nghiệm</p>
            <p className="font-semibold ">{experienceRequirement(job.experience)}</p>
          </div>
        </div>
      </div>
      <div className=" items-center gap-2 px-4 py-2 my-4 rounded-[6px] bg-gray-200 inline-flex">
        <FaClock className="text-gray-600" />

        <div className="text-gray-600 text-sm font-bold">Hạn nộp hồ sơ: {job.expired_date}</div>
      </div>
      <div className="flex items-center gap-4">
        <div
          onClick={() => {
            if (!isLoggedIn) {
              toast.error("You must be logged in to apply for a job.");
              window.location.href = "/login";
              return;
            }
            setFormVisible(true);
          }}
          className="basis-[80%] flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all justify-center bg-black py-2 rounded-[4px]"
        >
          <FaPaperPlane className="text-white" />
          <p className="text-white font-medium">Ứng tuyển ngay</p>
        </div>
        <div
          onClick={(e) => handleBookmarkClick(e)}
          className={`${
            isSaved ? "text-yellow-500 border-yellow-500" : ""
          } basis-[20%] flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all justify-center border-[1px] border-black py-2 rounded-[4px]`}
        >
          {!isSaved && <FaRegHeart className="" />}
          {isSaved && <FaHeart className="text-yellow-500" />}
          <p className=" font-medium">Lưu tin</p>
        </div>
      </div>
      {isFormVisible && <JobApplicationForm closeForm={closeForm} JobData={job} user={userData} />}
    </div>
  );
}
