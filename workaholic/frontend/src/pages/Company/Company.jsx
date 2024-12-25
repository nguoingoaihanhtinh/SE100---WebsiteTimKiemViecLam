import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Adjust the import path accordingly
import { Pagination } from "antd"; // Assuming you're using Ant Design
import { useGetAllJobsByCompanyIdQuery } from "../../redux/rtk/job.service";
import { JobCardHorizontal } from "../../components/Job/JobCarHorizontal";
import { FaBuilding, FaLocationDot } from "react-icons/fa6";
import { useGetCompanyByIdQuery } from "../../redux/rtk/company.service";
import CompanyRating from "../../components/Rating/CompanyRating";

export default function Company() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);
  const { data: companyRes } = useGetCompanyByIdQuery(id);
  const company = companyRes?.data || null;
  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500); // Debounce delay (500ms)

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup or searchTerm change
    };
  }, [searchTerm]);

  // Fetch data with debounced search value
  const { data } = useGetAllJobsByCompanyIdQuery({
    company_id: id,
    page,
    limit: 2,
    kw: debouncedValue, // Use debounced value for the query
  });

  const totalItems = data?.pagination?.totalItems || 1;

  useEffect(() => {
    if (data?.data) {
      setJobs(data.data);
    }
  }, [data]);
  if (!company) return <></>;
  return (
    <div className="px-[200px] mt-[120px] text-black">
      <div
        className="h-[400px] relative w-full bg-no-repeat bg-cover rounded-[12px]"
        style={{
          backgroundImage: `url(https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/cong-ty-trach-nhiem-huu-han-bao-hiem-nhan-tho-mb-ageas-mb-ageas-life-b6207b77b0ddf491ecc2d49848cb04de-6495669cd6e1e.jpg)`,
        }}
      >
        <div className="absolute px-[32px] gap-[50px] flex top-[70%] rounded-b-[12px] bg-blue-900 h-[180px] w-full">
          <div
            className="w-[160px] h-[160px] rounded-full bg-no-repeat bg-cover bg-center mt-[-50px]"
            style={{
              backgroundImage: `url(https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-trach-nhiem-huu-han-bao-hiem-nhan-tho-mb-ageas-mb-ageas-life-63aac9a35aeea.jpg)`,
            }}
          ></div>
          <div className="flex flex-col gap-2 mt-[16px]">
            <div className="text-2xl font-semibold text-white">{company.name}</div>
            <div className="flex items-center gap-2 text-white">
              <FaLocationDot />
              <p className="text-lg font-semibold">{company.address}</p>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FaBuilding />
              <p className="text-lg font-semibold">100-499 nhân viên</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[120px] flex gap-[24px]">
        <div className="basis-[65%]">
          <div className="border-[1px] rounded-[12px] overflow-hidden">
            <div className="w-full py-4 px-4 bg-blue-900 rounded-t-[12px] text-white font-semibold text-[22px]">
              Giới thiệu công ty
            </div>
            <div className="text-[16px] bg-white p-4" dangerouslySetInnerHTML={{ __html: company.description }} />
          </div>

          <div className="border-[1px] mt-[20px] rounded-[12px] overflow-hidden">
            <div className="w-full py-4 px-4 bg-blue-900 rounded-t-[12px] text-white font-semibold text-[22px]">
              Tuyển dụng
            </div>
            <div className="flex flex-col p-4 gap-4">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white p-3 text-black border-[1px] rounded-[8px]"
                placeholder="Search jobs..."
              />
              {jobs.length === 0 && <p>Công ty này chưa có công việc nào</p>}
              {jobs.map((job, idx) => (
                <JobCardHorizontal jobData={job} key={idx} />
              ))}
              <Pagination defaultCurrent={page} total={totalItems} onChange={(e) => setPage(e)} pageSize={2} />
            </div>
          </div>
          <CompanyRating companyId={company.id} />
        </div>
        <div className="basis-[35%]">
          <div className="border-[1px] rounded-[12px] overflow-hidden">
            <div className="w-full py-4 px-4 bg-blue-900 rounded-t-[12px] text-white font-semibold text-[22px]">
              Thông tin liên hệ
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 text-black">
                <FaLocationDot />
                <p className="text-lg font-semibold">Địa chỉ công ty</p>
              </div>
              <p className="my-3">{company.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
