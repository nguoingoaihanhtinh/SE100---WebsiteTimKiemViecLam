import { FaPaperPlane } from "react-icons/fa6";

const ApplyButton = () => {
  return (
    <div className="px-4 py-2 bg-black rounded-[4px] inline-flex text-white items-center gap-4 cursor-pointer hover:opacity-90 transition-all">
      <FaPaperPlane className="text-white" />
      <p className="text-white font-medium">Ứng tuyển ngay</p>
    </div>
  );
};

export default ApplyButton;
