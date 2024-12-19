import React from 'react';
import { FaPencilAlt, FaPause, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
const EmployerJobCard = ({ jobData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-200"; // Green for active
      case "expired":
        return "bg-red-200"; // Red for expired
      case "draft":
        return "bg-yellow-200"; // Yellow for draft
      default:
        return "bg-white"; // Default for undefined status
    }
  };

  return (
    <div
      className={`w-72 h-auto border-[1px] border-black-50 transition-all duration-500 hover:shadow-xl cursor-pointer overflow-hidden rounded-xl ${getStatusColor(jobData.status)}`}
    >
      <div className="overflow-hidden">
        <div className="content flex flex-col m-3 rounded-xl">
          <div className="main flex flex-col gap-4">
            <p className="text-2xl text-primary-color text-left px-3 font-bold">{jobData.title}</p>
            <div className="location flex gap-2 text-primary-color items-center px-3 text-md">
              <FaMapMarkerAlt />
              <span>{jobData.location}</span>
            </div>
            <div className="pop-ups flex flex-col text-primary-color items-center gap-2 p-2">
              <div className="flex gap-2 items-center">
                <div className="position border border-gray-500 rounded-2xl min-h-8 min-w-16 flex justify-center items-center p-1 hover:scale-105">
                  <p className="text-center text-sm">{jobData.position}</p>
                </div>
                <div className="experience border border-gray-500 rounded-2xl min-h-8 min-w-16 flex justify-center items-center p-1 hover:scale-105">
                  <p className="text-center text-sm">{jobData.experience}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="schedule border border-gray-500 rounded-2xl min-h-8 min-w-16 flex justify-center items-center p-1 hover:scale-105">
                  <p className="text-center text-sm">{jobData.schedule}</p>
                </div>
                <div className="type border border-gray-500 rounded-2xl min-h-8 min-w-16 flex justify-center items-center p-1 hover:scale-105">
                  <p className="text-center text-sm">{jobData.jobType.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hiển thị trạng thái */}
        <div className="status flex justify-center text-primary-color text-xl font-semibold p-2">
          <p className={`px-3 py-1 rounded-lg ${jobData.status === 'active' ? 'bg-green-300' : jobData.status === 'expired' ? 'bg-red-300' : 'bg-yellow-300'}`}>
            {jobData.status.charAt(0).toUpperCase() + jobData.status.slice(1)}
          </p>
        </div>

        <div className="payment flex flex-col text-primary-color mx-1 px-2 gap-3 my-3">
          <p className="text-lg font-bold px-2">
            {jobData.salary_from}đ/<span className="text-md font-normal">{jobData.paymentBy}</span>
          </p>
          <div className="buttons flex justify-between gap-2">
            <button
              onClick={() => console.log("Edit button clicked")}
              className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 flex items-center"
            >
              <FaPencilAlt className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={() => console.log("Pause button clicked")}
              className="px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded hover:bg-yellow-600 flex items-center"
            >
              <FaPause className="w-4 h-4 mr-2" />
              Pause
            </button>
            <button
              onClick={() => console.log("Delete button clicked")}
              className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded hover:bg-red-600 flex items-center"
            >
              <FaTrash className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerJobCard;