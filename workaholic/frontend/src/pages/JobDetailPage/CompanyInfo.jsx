import { FaBox, FaLocationDot, FaUsers } from "react-icons/fa6";

export default function CompanyInfo({ job }) {
  return (
    <div className="bg-white px-[24px] py-[16px] rounded-[12px] w-full">
      <div className="flex gap-4">
        <div
          className="min-w-[80px] h-[80px] bg-fit border-[1px] rounded-[4px] bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/vnf9H5G5ShqwmE7LgCnTF3W9KazJvewP_1665808733____d8153d937798bb4260b7e33fe09f81d0.png)`,
          }}
        ></div>
        <p className="text-lg font-bold max-w-[200px]">{job.company.name}</p>
      </div>
      <div className="flex mt-4 gap-4">
        <div className="flex items-center gap-2 text-gray-500 min-w-[90px]">
          <FaUsers />
          <p>Quy mô:</p>
        </div>
        <p className="font-medium">100-499 nhân viên</p>
      </div>
      <div className="flex mt-2 gap-4 items-start">
        <div className="flex items-center gap-2 text-gray-500 min-w-[90px]">
          <FaBox />
          <p>Lĩnh vực:</p>
        </div>
        <p className="font-medium line-clamp-2 max-w-[240px]">{job.company.feild}</p>
      </div>
      <div className="flex mt-2 gap-4 items-start">
        <div className="flex items-center gap-2 text-gray-500 min-w-[90px]">
          <FaLocationDot />
          <p>Địa điểm:</p>
        </div>
        <p className="font-medium line-clamp-2 max-w-[240px]">{job.company.address}</p>
      </div>
      <div className="w-full text-center mt-4">
        <p className="underline cursor-pointer font-medium inline-block">Xem trang công ty</p>
      </div>
    </div>
  );
}
