import React from 'react';
import { JobCard } from '../../components/Job/JobCard';


const JobListContent = ({ jobs, totalJobs, page, setPage }) => {
  // Ensure jobs is always an array
  console.log(jobs);
  const validJobs = Array.isArray(jobs) ? jobs : [];

  const totalPages = Math.ceil(totalJobs / 10); // Calculate total pages based on total jobs and limit

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
    </div>
  );
};

export default JobListContent;
