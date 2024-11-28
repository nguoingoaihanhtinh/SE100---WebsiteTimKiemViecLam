import { FaClock, FaHourglass, FaLocationDot, FaMoneyBill, FaPaperPlane, FaRegHeart } from "react-icons/fa6";

export default function JobInfo() {
  return (
    <div className="bg-white px-[24px] py-[16px] rounded-[12px] w-full">
      <p className="text-[22px] font-bold">Nhân Viên Kinh Doanh Xe Tải (Nam) - Không Yêu Cầu Kinh Nghiệm</p>
      <div className="flex mt-8 gap-4">
        <div className="basis-1/3 flex gap-4 items-center">
          <div className="min-w-[50px] h-[50px] bg-black rounded-full flex items-center justify-center">
            <div className="">
              <FaMoneyBill className="text-white text-2xl" />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="">Mức lương</p>
            <p className="font-semibold ">10 - 30 triệu</p>
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
            <p className="font-semibold ">Bình Dương, Hồ Chí Minh</p>
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
            <p className="font-semibold ">Không yêu cầu kinh nghiệm</p>
          </div>
        </div>
      </div>
      <div className=" items-center gap-2 px-4 py-2 my-4 rounded-[6px] bg-gray-200 inline-flex">
        <FaClock className="text-gray-600" />

        <div className="text-gray-600 text-sm font-bold">Hạn nộp hồ sơ: 31/12/2024</div>
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
