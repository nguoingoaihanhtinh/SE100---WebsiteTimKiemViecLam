// Jobs.js
import React, { useEffect, useState } from 'react'; 
import { JobCard } from './JobCard';
import jobApi from '../../api/jobApi';

export const fakeJobs = [
    {
      id: 1,
      title: "Frontend Developer for Google",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png",  // Replace with actual image URL
      rating: 4.5,
      location: "Ho Chi Minh City",
      position: "Frontend Developer",
      experience: "2+ years",
      schedule: "Full time",
      type: "Remote",
      salary: 15000000,
      paymentBy: "per month",
    },
    {
      id: 2,
      title: "Backend Developer for Twitch.tv",
      img: "https://assets.twitch.tv/assets/mobile_iphone-526a4005c7c0760cb83f.png",  // Replace with actual image URL
      rating: 45,
      location: "Da Nang",
      position: "Backend Developer",
      experience: "3+ years",
      schedule: "Full time",
      type: "On-site",
      salary: 20000000,
      paymentBy: "per month",
    },
    {
      id: 3,
      title: "Designer for youtube",
      img: "https://cdn.pixabay.com/photo/2017/06/23/02/35/youtube-2433301_640.png",  // Replace with actual image URL
      rating: 4.2,
      location: "Hanoi",
      position: "Designer",
      experience: "1+ years",
      schedule: "Freelance",
      type: "Remote",
      salary: 12000000,
      paymentBy: "per month",
    },  
    {
      id: 4,
      title: "Product Manager at Tech Corp",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5e3Q2Y7kgmlwt_I4ah-twm-ltwubD5FZJCQ&s",
      rating: 4.6,
      location: "Ho Chi Minh City",
      position: "Product Manager",
      experience: "5+ years",
      schedule: "Full time",
      type: "On-site",
      salary: 25000000,
      paymentBy: "per month",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdpPbT_OKGrXzCWS-uxgJYZXD23p8LT3_Q_w&s",
      rating: 3,
      location: "Hai Phong",
      position: "Business Analyst",
      experience: "2+ years",
      schedule: "Full time",
      type: "On-site",
      salary: 13000000,
      paymentBy: "per month",
    },
    {
      id: 6,
      title: "Data Analyst at Tech Innovators",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYMrvFtbhCbe4n6Xo_Xqrud96auL7pUTTfRA&s",
      rating: 4.4,
      location: "Da Nang",
      position: "Business Analyst",
      experience: "2+ years",
      schedule: "Part-time",
      type: "Remote",
      salary: 16000000,
      paymentBy: "per month",
    },
  ];
  

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
