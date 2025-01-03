import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { JobCardHorizontal } from "../../components/Job/JobCarHorizontal";
import { Button } from "antd";
import { CompanyCardHorizontal } from "../../components/Company/CompanyCardHorizontal";
import SmallBanner from "./SmallBanner";
import jobApi from "../../api/jobApi";
import { Link } from "react-router-dom";
import { useGetAllCompaniesQuery } from "../../redux/rtk/company.service";
import CompanyCarousel from "../../components/Company/CompanyCarousel";
import toast from "react-hot-toast";
export const fakeCompany = [
  {
    id: 1,
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",
    name: "Google",
    type: "technology",
    jobs: 2,
  },
  {
    id: 2,
    img: "https://assets.twitch.tv/assets/mobile_iphone-526a4005c7c0760cb83f.png",
    name: "Twitch.tv",
    type: "technology",
    jobs: 1,
  },
  {
    id: 3,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpPbT_OKGrXzCWS-uxgJYZXD23p8LT3_Q_w&s",
    name: "Foodie",
    type: "Sales",
    jobs: 3,
  },
  {
    id: 4,
    img: "https://cdn.pixabay.com/photo/2017/06/23/02/35/youtube-2433301_640.png",
    name: "Youtube",
    type: "construction",
    jobs: 1,
  },
  {
    id: 5,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5e3Q2Y7kgmlwt_I4ah-twm-ltwubD5FZJCQ&s",
    name: "Tech Corp",
    type: "economic",
    jobs: 1,
  },
];
const HomeContent = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [total, setTotal] = useState(4);
  const [page, setPage] = useState(1);

  const getAllJobType = async () => {
    const response = await jobApi.getAllJobTypes();
    setJobTypes(response.data);
  };
  useEffect(() => {
    getAllJobType();
  }, []);
  const getAllJobs = async () => {
    try {
      const response = await jobApi.getAllJobs(page, 9);
      setJobs(response.data);
      setTotal(response.pagination.totalItems);
    } catch (error) {
      toast.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [page]);

  return (
    <div className="mt-12 w-full">
      <div className="flex justify-between items-center w-full">
        <header className="font-serif text-4xl font-medium my-4 text-blue-950">Recommended Jobs</header>
        <Link to={"/jobs"}>
          <div className="group flex items-center gap-4 cursor-pointer">
            <p className="font-semibold group-hover:underline transition-all text-primary-color">View all</p>
            <div className="px-2 py-2 rounded-full cursor-pointer group-hover:bg-orange-600 transition-all bg-primary-color text-white">
              <FaAngleRight className="text-lg" />
            </div>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => <JobCardHorizontal key={job.id} jobData={job} />)
        ) : (
          <p>No jobs available</p>
        )}
      </div>
      <CompanyCarousel />
      <div className="suitable mt-8">
        <div className="flex justify-between items-center w-full">
          <header className="font-serif text-4xl font-medium my-4 text-blue-950">Suitable for you!</header>
          <div className="group flex items-center gap-4 cursor-pointer">
            <p className="font-semibold group-hover:underline transition-all text-primary-color">View all</p>
            <div className="px-2 py-2 rounded-full cursor-pointer group-hover:bg-orange-600 transition-all bg-primary-color text-white">
              <FaAngleRight className="text-lg" />
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-10">
          <div className="grid grid-cols-2 gap-5 w-3/5">
            {jobs.slice(0, 4).map((job, idx) => (
              <div key={idx} className="bg-green-50 rounded-xl">
                <JobCardHorizontal key={job.id} jobData={job} />
              </div>
            ))}
          </div>
          <div className="w-2/5">
            <SmallBanner />
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-center mt-5">
        <Pagination className="items-center" onChange={(page) => {
          setPage(page)
        }} total={total} defaultCurrent={1} pageSize={4}/>
      </div> */}
    </div>
  );
};

export default HomeContent;
