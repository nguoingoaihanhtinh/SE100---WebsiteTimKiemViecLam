import React from 'react';
import { JobCard } from '../../components/Job/JobCard';
import { Pagination } from 'antd';


const JobListContent = ({ jobs, totalJobs, page, setPage }) => {
  // Ensure jobs is always an array
  const validJobs = Array.isArray(jobs) ? jobs : [];

  const totalPages = Math.ceil(totalJobs / 10); // Calculate total pages based on total jobs and limit


    const handlePageChange = (newPage) => {
      setPage(newPage); // This will update the page number in SearchPage component
    };
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-18">
        {validJobs.length === 0 ? (
          <div>No jobs found based on the selected filters</div>
        ) : (
          validJobs.map((job) => (
            <JobCard key={job.id} jobData={job} />
          ))
        )}
      </div>
      <div className="flex justify-center p-2">
        <Pagination current={page}
        total={totalJobs}
        pageSize={9}
        onChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default JobListContent;
