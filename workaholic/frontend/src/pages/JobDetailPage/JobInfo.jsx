import { FaClock, FaHourglass, FaLocationDot, FaMoneyBill, FaPaperPlane, FaRegHeart } from "react-icons/fa6";
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
        <div className="basis-[80%] flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all justify-center bg-black py-2 rounded-[4px]">
          <FaPaperPlane className="text-white" />
          <p className="text-white font-medium">Ứng tuyển ngay</p>
        </div>
        <div className="basis-[20%] flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all justify-center border-[1px] border-black py-2 rounded-[4px]">
          <FaRegHeart className="" />
          <p className=" font-medium">Lưu tin</p>
        </div>
      </div>
    </div>
  );
}
