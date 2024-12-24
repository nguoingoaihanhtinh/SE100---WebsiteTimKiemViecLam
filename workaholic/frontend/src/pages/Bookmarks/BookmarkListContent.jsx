import React from "react";
import { JobCard } from "../../components/Job/JobCard";
import { Pagination, Empty } from "antd";

const BookmarkListContent = ({ jobs, totalJobs, page, setPage }) => {
  console.log("content", jobs);
  const validJobs = Array.isArray(jobs) ? jobs : [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-primary-color">Your Bookmarked Jobs ({totalJobs})</h2>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {validJobs.length === 0 ? (
          <Empty description="No bookmarked jobs yet" className="col-span-3" />
        ) : (
          validJobs.map((job) => <JobCard key={job.id} jobData={job} />)
        )}
      </div>
      <div className="flex justify-center p-4">
        <Pagination current={page} total={totalJobs} pageSize={9} onChange={handlePageChange} showSizeChanger={false} />
      </div>
    </div>
  );
};

export default BookmarkListContent;
