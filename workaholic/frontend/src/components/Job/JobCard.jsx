import { FaBookmark, FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { Button } from "antd";
import Rating from "../Rating/Rating";
import { useState } from "react";

export const JobCard = ({ jobData }) => {
  console.log('job',jobData)
  const [isBookmarked, setIsBookmarked] = useState(false);

  function formatCurrency(amount) {
    return amount.toLocaleString().replace(/\./g, ",");
  }

  // Function to determine background color based on job type (industry/field)
  const getJobCardBackground = (jobType) => {
    if (!jobType || !jobType.name) {
      // console.log("Invalid jobType:", jobType); // Logging invalid jobType values
      return "bg-white"; // Return default if jobType or name is missing
    }

    switch (jobType.name) {
      case "Sales":
        return "bg-yellow-50"; // Yellow for Sales
      case "Technology":
        return "bg-cyan-50"; // Cyan for Technology
      case "Bank":
        return "bg-green-50"; // Green for Bank
      case "Marketing":
        return "bg-pink-50"; // Pink for Marketing
      case "Estate":
        return "bg-gray-50"; // Gray for Estate
      case "Service":
        return "bg-red-50"; // Red for Service
      case "Human Resource":
        return "bg-orange-50"; // Orange for HR
      default:
        return "bg-white"; // Default background if no match
    }
  };
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };
  return (
    <div className={`border-[1px] border-black-50 transition-all duration-500 hover:shadow-xl cursor-pointer overflow-hidden rounded-xl ${getJobCardBackground(jobData.jobType)}`}>
      <div className="overflow-hidden">
        <div className="content flex flex-col  m-3 rounded-xl">
          <div className="top flex justify-between p-5">
            <div className="icon">
              <img
                src={jobData.company.img}
                alt="No image"
                className="mx-auto rounded-xl w-10 h-10 object-cover transition duration-700 hover:skew-x-2 "
              />
            </div>
            <div 
              className={`save bg-white rounded-full w-10 h-10 flex justify-center items-center ${isBookmarked ? "text-yellow-500" : "text-gray-500"}`}
              onClick={handleBookmarkClick}
            >
              <FaBookmark />
            </div>
          </div>
          <div className="main flex flex-col gap-4">
            <p className="text-2xl text-primary-color text-left px-3 font-bold">{jobData.title}</p>
            <div className="rating flex justify-between items-center gap-3 px-5">
              <span className="mb-[2px] text-xl">
                <Rating rating={jobData.rating} />
              </span>
              <h1 className="text-sm text-primary-color"> ( {jobData.number_rating} reviews) </h1>
            </div>
            <div className="location flex gap-2 text-primary-color items-center px-5 text-lg">
              <FaLocationPin />
              <span>{jobData.location}</span>
            </div>
            <div className="pop-ups flex flex-col text-primary-color items-center gap-3 p-2">
              <div className="flex gap-2 items-center">
                <div className="position border border-gray-500 rounded-2xl min-h-10 min-w-20 flex justify-center items-center p-2 hover:scale-105" >
                  <p className="text-center">{jobData.position}</p>
                </div>
                <div className="experience border border-gray-500 rounded-2xl min-h-10 min-w-20 flex justify-center items-center p-2 hover:scale-105">
                  <p className="text-center">{jobData.experience}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="schedule border border-gray-500 rounded-2xl min-h-10 min-w-20 flex justify-center items-center p-2 hover:scale-105">
                  <p className="text-center">{jobData.schedule}</p>
                </div>
                <div className="type border border-gray-500 rounded-2xl min-h-10 min-w-20 flex justify-center items-center p-2 hover:scale-105">
                  <p className="text-center">{jobData.jobType.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment flex flex-col text-primary-color mx-3 px-5 gap-3 my-3">
          <p className="text-lg font-bold">{jobData.salary_from}đ/<span className="text-md font-normal">{jobData.paymentBy}</span></p>
          <Button>Details</Button>
        </div>
      </div>
    </div>
  );
};
