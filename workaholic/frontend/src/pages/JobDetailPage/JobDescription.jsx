import { useContext, useState } from "react";
import { FaPaperPlane } from "react-icons/fa6";
import { AuthContext } from "../../context/AuthProvider";
import JobApplicationForm from "../Application/ApplicationForm";
import toast from "react-hot-toast";

export default function JobDescription({ job }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const { isLoggedIn, userData } = useContext(AuthContext);
  const closeForm = () => {
    setFormVisible(false);
  };
  return (
    <div className="bg-white px-[24px] py-[16px] rounded-[12px] w-full mt-8">
      <p className="text-[22px] font-bold">Chi tiết tin tuyển dụng</p>

      <div className="mt-4 text-[16px]" dangerouslySetInnerHTML={{ __html: job.description }} />

      <div className="mt-4">
        <div
          onClick={() => {
            if (!isLoggedIn) {
              toast.error("You must be logged in to apply for a job.");
              window.location.href = "/login";
              return;
            }
            setFormVisible(true);
          }}
          className="px-4 py-2 bg-black rounded-[4px] inline-flex text-white items-center gap-4 cursor-pointer hover:opacity-90 transition-all"
        >
          <FaPaperPlane className="text-white" />
          <p className="text-white font-medium">Ứng tuyển ngay</p>
        </div>
      </div>
      {isFormVisible && <JobApplicationForm closeForm={closeForm} JobData={job} user={userData} />}
    </div>
  );
}
