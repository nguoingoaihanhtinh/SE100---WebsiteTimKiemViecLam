import { useEffect, useState } from "react";
import {
  FaAdversal,
  FaBuilding,
  FaLaptop,
  FaMartiniGlass,
  FaMoneyBillTrendUp,
  FaMoneyCheckDollar,
  FaPenNib,
  FaPeopleGroup,
  FaRegBuilding,
} from "react-icons/fa6";
import jobApi from "../../api/jobApi";
import { useNavigate } from "react-router-dom";

const iconMapping = {
  Sales: <FaMoneyBillTrendUp className="w-20 h-20 text-primary-color" />,
  Marketing: <FaAdversal className="w-20 h-20 text-primary-color" />,
  Service: <FaMartiniGlass className="w-20 h-20 text-primary-color" />,
  "Human Resource": <FaPeopleGroup className="w-20 h-20 text-primary-color" />,
  Bank: <FaMoneyCheckDollar className="w-20 h-20 text-primary-color" />,
  Technology: <FaLaptop className="w-20 h-20 text-primary-color" />,
  Estate: <FaBuilding className="w-20 h-20 text-primary-color" />,
  Accountant: <FaPenNib className="w-20 h-20 text-primary-color" />,
};

const CategorySection = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const getAllJobType = async () => {
    const response = await jobApi.getAllJobTypes();
    setJobTypes(response.data);
  };
  const navigate = useNavigate();

  useEffect(() => {
    getAllJobType();
  }, []);
  return (
    <div className="p-8">
      <p className="text-sky-400 text-3xl font-bold text-left pb-5">Các ngành nghề nổi bật</p>
      <div className="grid grid-cols-4 gap-6">
        {jobTypes.map((job) => (
          <div
            key={job.id}
            onClick={() => navigate(`/search?jobType_id=${job.id}`)}
            className="cursor-pointer p-6 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-200"
          >
            <div className="flex justify-center p-3">
              {/* Render the icon based on job.name */}
              {iconMapping[job.name] || <FaRegBuilding className="w-20 h-20 text-gray-400" />} {/* default icon */}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{job.name}</h3>
            <p className="text-gray-600">Jobs available: {job.numberOfJobs}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
