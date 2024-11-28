import { FaBriefcase, FaHourglass, FaJxl, FaUser, FaUsers } from "react-icons/fa6";

export default function CommonInfo() {
  return (
    <div className="bg-white px-[24px] py-[24px] mt-8 rounded-[12px] w-full">
      <p className="text-[22px] font-bold">Thông tin chung</p>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaJxl className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Cấp bậc</p>
          <p className="font-bold">Nhân viên</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaHourglass className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Kinh nghiệm</p>
          <p className="font-bold">Không yêu cầu kinh nghiệm</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaUsers className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Số lượng tuyển</p>
          <p className="font-bold">30 người</p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
          <FaBriefcase className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <p>Hình thức làm việc</p>
          <p className="font-bold">Toàn thời gian</p>
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
