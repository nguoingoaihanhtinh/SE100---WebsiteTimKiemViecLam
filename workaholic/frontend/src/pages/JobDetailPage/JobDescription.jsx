import { FaPaperPlane } from "react-icons/fa6";

export default function JobDescription({ job }) {
  return (
    <div className="bg-white px-[24px] py-[16px] rounded-[12px] w-full mt-8">
      <p className="text-[22px] font-bold">Chi tiết tin tuyển dụng</p>

      <div className="mt-4 text-[16px]" dangerouslySetInnerHTML={{ __html: job.description }} />

      <div className="mt-4">
        <div className="px-4 py-2 bg-black rounded-[4px] inline-flex text-white items-center gap-4 cursor-pointer hover:opacity-90 transition-all">
          <FaPaperPlane className="text-white" />
          <p className="text-white font-medium">Ứng tuyển ngay</p>
        </div>
      </div>
    </div>
  );
}
