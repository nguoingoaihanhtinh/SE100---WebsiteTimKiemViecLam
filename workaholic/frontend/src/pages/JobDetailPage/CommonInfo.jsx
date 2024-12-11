import { FaBriefcase, FaHourglass, FaJxl, FaUser, FaUsers } from "react-icons/fa6";
function experienceRequirement(years) {
  if (typeof years !== "number" || years < 0) {
    throw new Error("Invalid input. Please provide a non-negative number.");
  }
  return years === 0 ? "Không yêu cầu kinh nghiệm" : `Tối thiểu ${years} năm kinh nghiệm`;
}
export default function CommonInfo({ job }) {
  return (
    <div className="bg-white px-[24px] py-[24px] mt-8 rounded-[12px] w-full">
      <p className="text-[22px] font-bold">Thông tin chung</p>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaJxl className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Cấp bậc</p>
          <p className="font-bold">{job.position}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaHourglass className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Kinh nghiệm</p>
          <p className="font-bold">{experienceRequirement(job.experience)}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaUsers className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Số lượng tuyển</p>
          <p className="font-bold">3 người</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaBriefcase className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Hình thức làm việc</p>
          <p className="font-bold">{job.schedule}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaUser className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Giới tính</p>
          <p className="font-bold">Nam</p>
        </div>
      </div>
    </div>
  );
}
