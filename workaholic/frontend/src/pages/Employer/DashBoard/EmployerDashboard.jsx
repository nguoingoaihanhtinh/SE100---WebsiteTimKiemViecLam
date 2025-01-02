import { useState, useEffect, useContext } from "react";
import { Pagination } from "antd"; // Assuming you're using Ant Design

import { FaBuilding, FaLocationDot } from "react-icons/fa6";

import { AuthContext } from "../../../context/AuthProvider";
import { useGetCompanyByUserIdQuery, useUpdateCompanyMutation } from "../../../redux/rtk/company.service";
import { useGetAllJobsByCompanyIdQuery } from "../../../redux/rtk/job.service";
import { JobCardHorizontal } from "../../../components/Job/JobCarHorizontal";
import CompanyRatingNoEdit from "../../../components/Rating/CompanyRating(noedit)";
import AddModal from "./AddModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MapCaller from "../../../components/Map/MapCaller";
export default function EmployerDashboard() {
  const { userData } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    description: "",
    address: "",
    img: "",
    coverimg: "",
  });
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);
  const [isAddCompanyModalVisible, setIsAddCompanyModalVisible] = useState(false);
  const { data: companyRes } = useGetCompanyByUserIdQuery(userData?.id || "", {
    skip: !userData,
  });
  const company = companyRes?.data || null;
  const navigate = useNavigate();

  const [updateCompany] = useUpdateCompanyMutation();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data } = useGetAllJobsByCompanyIdQuery({
    company_id: company?.id,
    page,
    limit: 2,
    kw: debouncedValue,
  });

  const totalItems = data?.pagination?.totalItems || 1;

  useEffect(() => {
    if (data?.data) {
      setJobs(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (company) {
      setCompanyInfo({
        name: company.name,
        description: company.description,
        address: company.address,
        coverimg: company.coverimg,
        img: company.img,
      });
    }
  }, [company]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const res = await updateCompany({
      id: company.id,
      updatedCompany: companyInfo,
    });
    if (res) {
      toast.success("Company updated successfully");
    }
  };

  const openAddCompanyModal = () => {
    setIsAddCompanyModalVisible(true);
  };

  const closeAddCompanyModal = () => {
    setIsAddCompanyModalVisible(false);
  };

  const handleManageClick = () => {
    navigate("../joblist");
  };
  if (!userData) {
    return <p>Loading user data...</p>;
  }
  if (!company) {
    return (
      <div className="flex flex-col items-center mt-[120px]">
        <h4 className="text-xl text-gray-500 mb-4">You haven&apos;t added any company yet!</h4>
        <AddModal
          title="Add Company"
          visible={isAddCompanyModalVisible}
          onCancel={closeAddCompanyModal}
          userId={userData.id}
        />
      </div>
    );
  }

  return (
    <div className="px-[20px] mt-[40px] text-black">
      <div
        className="h-[400px] relative w-full bg-no-repeat bg-cover rounded-[12px]"
        style={{
          backgroundImage: `url(${
            company.coverimg ||
            "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/cong-ty-trach-nhiem-huu-han-bao-hiem-nhan-tho-mb-ageas-mb-ageas-life-b6207b77b0ddf491ecc2d49848cb04de-6495669cd6e1e.jpg"
          })`,
        }}
      >
        <div className="absolute px-[32px] gap-[50px] flex top-[70%] rounded-b-[12px] bg-blue-900 h-[180px] w-full">
          <div
            className="w-[160px] h-[160px] rounded-full bg-no-repeat bg-cover bg-center mt-[-50px]"
            style={{
              backgroundImage: `url(${
                company.img ||
                "https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-trach-nhiem-huu-han-bao-hiem-nhan-tho-mb-ageas-mb-ageas-life-63aac9a35aeea.jpg"
              })`,
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
            {/* Rating will only be displayed, not editable */}
          </div>
        </div>
      </div>
      <div className="mt-[120px] flex gap-[24px]">
        <div className="basis-[65%]">
          <div className="border-[1px] rounded-[12px] overflow-hidden">
            <div className="w-full py-4 px-4 bg-blue-900 rounded-t-[12px] text-white font-semibold text-[22px]">
              Giới thiệu công ty
            </div>
            <div className="text-[16px] bg-white p-4">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={companyInfo.name}
                onChange={handleInputChange}
                className="bg-white p-3 text-black border-[1px] rounded-[8px] mb-4 w-full"
              />
              <label>Description</label>
              <textarea
                name="description"
                value={companyInfo.description}
                onChange={handleInputChange}
                className="bg-white p-3 text-black border-[1px] rounded-[8px] mb-4 w-full h-[100px]"
              />
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={companyInfo.address}
                onChange={handleInputChange}
                className="bg-white p-3 text-black border-[1px] rounded-[8px] mb-4 w-full"
              />
              <label>Image Url</label>
              <input
                type="text"
                name="img"
                value={companyInfo.img}
                onChange={handleInputChange}
                className="bg-white p-3 text-black border-[1px] rounded-[8px] mb-4 w-full"
              />
              <label>Cover image Url</label>
              <input
                type="text"
                name="coverimg"
                value={companyInfo.coverimg}
                onChange={handleInputChange}
                className="bg-white p-3 text-black border-[1px] rounded-[8px] mb-4 w-full"
              />
              <div>
                <button
                  onClick={handleSaveChanges}
                  className="w-full rounded-[4px] bg-blue-500 text-white py-2  hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="border-[1px] mt-[20px] rounded-[12px] overflow-hidden">
            <div className="w-full flex justify-between py-4 px-4 bg-blue-900 rounded-t-[12px] text-white font-semibold text-[22px]">
              <h5 className=""> Tuyển dụng</h5>
              <h5 onClick={handleManageClick} className="cursor-pointer hover:underline">
                Quản lý
              </h5>
            </div>
            <div className="flex flex-col p-4 gap-4 bg-white">
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
              <div className="w-full flex justify-center">
                <Pagination defaultCurrent={page} total={totalItems} onChange={(e) => setPage(e)} pageSize={2} />
              </div>
            </div>
          </div>
          <div className="text-lg font-semibold text-white">
            <CompanyRatingNoEdit companyId={company.id} />
          </div>
        </div>
        <div className="basis-[35%]">
          <div className="border-[1px] rounded-[12px] overflow-hidden">
            <div className="w-full py-4 px-4 bg-blue-900 rounded-t-[12px] text-white font-semibold text-[22px]">
              Thông tin liên hệ
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-center gap-2 text-black">
                <FaLocationDot />
                <p className="text-lg font-semibold">Địa chỉ công ty</p>
              </div>
              <p className="my-3">{company.address}</p>
              <MapCaller
                width={"100%"}
                height={"400px"}
                long={Number(company.lattidue)}
                lat={Number(company.longitude)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
