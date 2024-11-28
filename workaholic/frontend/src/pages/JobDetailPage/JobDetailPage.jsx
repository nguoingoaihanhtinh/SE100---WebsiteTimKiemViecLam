import CommonInfo from "./CommonInfo";
import CompanyInfo from "./CompanyInfo";
import JobDescription from "./JobDescription";
import JobInfo from "./JobInfo";

export default function JobDetailPage() {
  return (
    <div className="bg-[#F4F5F5]  text-black py-6">
      <div className="flex px-24 gap-8">
        <div className="basis-[65%]">
          <JobInfo />
          <JobDescription />
        </div>
        <div className="basis-[35%]">
          <CompanyInfo />
          <CommonInfo />
        </div>
      </div>
    </div>
  );
}
