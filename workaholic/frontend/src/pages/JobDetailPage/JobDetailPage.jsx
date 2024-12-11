import { useGetByIdQuery } from "../../redux/rtk/job.service";
import CommonInfo from "./CommonInfo";
import CompanyInfo from "./CompanyInfo";
import JobDescription from "./JobDescription";
import JobInfo from "./JobInfo";
import { useParams } from "react-router-dom";

export default function JobDetailPage() {
  const { id } = useParams();
  const { data: getJobRes } = useGetByIdQuery(id);
  const job = getJobRes?.data || null;
  if (!job) return;
  return (
    <div className="bg-[#F4F5F5]  text-black py-6">
      <div className="flex px-24 gap-8">
        <div className="basis-[65%]">
          <JobInfo job={job} />
          <JobDescription job={job} />
        </div>
        <div className="basis-[35%]">
          <CompanyInfo job={job} />
          <CommonInfo job={job} />
        </div>
      </div>
    </div>
  );
}
