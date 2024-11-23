// Jobs.js
import React, { useEffect, useState } from 'react'; 
import { JobCard } from './JobCard';
import jobApi from '../../api/jobApi';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [typeSlt, setTypeSlt] = useState('All');
  const getAllJobs = async () => {
    try {
      const response = await jobApi.getAllJobs(page, 10, typeSlt);
      console.log(response); // Check the API response
      if (response.status === "success") {
        setJobs(response.data); // Update state with job data
        setTotal(response.pagination.totalItems); // Update total items for pagination
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  useEffect(() => {
    getAllJobs();
  },[typeSlt,page]) 
  return (
    <div className="grid grid-cols-3 gap-18">
      {jobs.map((job) => (
        <JobCard key={job.id} jobData={job} />
      ))}
    </div>
  );
};

export default Jobs;
