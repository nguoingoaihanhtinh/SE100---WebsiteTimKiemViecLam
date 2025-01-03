import { JobCard } from "../../components/Job/JobCard";
import { Pagination } from "antd";

const JobListContent = ({ jobs, totalJobs, page, setPage }) => {
  const validJobs = Array.isArray(jobs) ? jobs : [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        {validJobs.length === 0 ? (
          <div>No jobs found based on the selected filters</div>
        ) : (
          validJobs.map((job) => <JobCard key={job.id} jobData={job} />)
        )}
      </div>
      <div className="flex justify-center p-2">
        <Pagination current={page} total={totalJobs} pageSize={6} onChange={handlePageChange} />
      </div>
    </div>
  );
};

export default JobListContent;
