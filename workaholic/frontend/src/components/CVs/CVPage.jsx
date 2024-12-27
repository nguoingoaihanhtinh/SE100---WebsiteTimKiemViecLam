import React, { useEffect } from "react";
import { useGetCVsQuery } from "../../redux/rtk/cv.service"; // Import the hook

const CVPage = () => {
  const { cvData, error, isLoading } = useGetCVsQuery(); // Fetch data using the hook

  const data = cvData?.Object;
  console.log("data", data);
  // Check for loading and error states
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading CV data.</p>;
  }

  return (
    <div
      className="relative w-full h-screen bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/picture/Simple Professional CV Resume.png')" }}
    >
      {/* Personal Information Section */}
      <p className="absolute top-[28%] text-xl left-[55%] font-bold transform -translate-x-1/2 -translate-y-[200px] text-gray-800">
        {data?.title || "Full Name"}
      </p>
      <p className="absolute top-[28%] left-[57%] w-[20%] transform -translate-x-1/2 -translate-y-[150px] text-gray-800 border-b border-gray-700">
        {data?.summary || "Job Title"}
      </p>

      {/* Education Section */}
      <div className="absolute top-[20%] left-[47%] transform p-2 bg-transparent border border-gray-700 text-gray-800 w-[20%] h-28 overflow-auto">
        {data?.education?.map((edu, index) => <p key={index}>{`${edu.degree} - ${edu.institution}`}</p>) || "Education"}
      </div>

      {/* Contact Information */}
      <p className="absolute text-sm top-[45.5%] left-[41%] w-[10%] transform -translate-x-1/2 -translate-y-[100px] text-gray-800 border-b border-gray-700">
        {data?.contact?.email || "Email"}
      </p>
      <p className="absolute text-sm top-[37.5%] left-[41%] w-[10%] transform -translate-x-1/2 -translate-y-[50px] text-gray-800 border-b border-gray-700">
        {data?.contact?.phone || "Phone"}
      </p>

      {/* Work Experience Section */}
      <div className="absolute top-1/2 left-[35%] transform p-2 bg-transparent border border-gray-700 text-gray-800 w-[10%] h-36 overflow-auto">
        {data?.experience?.map((exp, index) => (
          <p key={index}>{`${exp.position} at ${exp.company} (${exp.start_date} - ${exp.end_date})`}</p>
        )) || "Work Experience"}
      </div>

      {/* Certifications Section */}
      <div className="absolute top-[69%] left-[35%] transform p-2 bg-transparent border border-gray-700 text-gray-800 w-[10%] h-36 overflow-auto">
        {data?.certifications?.map((cert, index) => <p key={index}>{`${cert.name} - ${cert.date_obtained}`}</p>) ||
          "Certifications"}
      </div>
    </div>
  );
};

export default CVPage;
