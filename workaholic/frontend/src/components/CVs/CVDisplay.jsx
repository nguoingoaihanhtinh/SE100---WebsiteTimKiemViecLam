import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CVDisplay = ({ data }) => {
  console.log("dataDisplay", data);
  const { userData } = useContext(AuthContext);
  if (!userData) {
    return <div>Loading...</div>; // or some other loading indicator
  }
  return (
    <div className="flex w-full h-screen bg-gray-100 p-4">
      {/* First Part: Avatar, Contact Info, and Skills */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden mb-4">
          {data?.avatar ? (
            <img src={userData.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <p className="flex items-center justify-center h-full text-gray-500">Avatar</p>
          )}
        </div>

        {/* Contact Information */}
        <div className="text-gray-800 mb-4">
          <p className="mb-2 font-semibold">Email: {userData.email || "example@example.com"}</p>
          <p className="mb-2 font-semibold">Phone: {data?.contact?.phone || "(123) 456-7890"}</p>
        </div>

        {/* Skills */}
        <div className="w-full">
          <h2 className="text-lg font-bold mb-2 text-gray-800">Skills</h2>
          <ul className="list-disc pl-4 text-gray-700">
            {data?.skills?.length > 0
              ? data.skills.map((skill, index) => <li key={index}>{skill}</li>)
              : "No skills added"}
          </ul>
        </div>
      </div>

      {/* Second Part: Name, Title, Introduction, Education, and Experience */}
      <div className="w-2/3 bg-white shadow-lg rounded-lg p-4 ml-4">
        {/* Name and Title */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{userData?.user_name || "Full Name"}</h1>
          <h2 className="text-xl text-gray-600">{data?.title || "Job Title"}</h2>
        </div>

        {/* Introduction */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">Introduction</h2>
          <p className="text-gray-700">{data?.summary || "A brief introduction about yourself."}</p>
        </div>

        {/* Education */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">Education</h2>
          <ul className="list-disc pl-4 text-gray-700">
            {data?.education?.length > 0
              ? data.education.map((edu, index) => <li key={index}>{`${edu.degree} at ${edu.institution}`}</li>)
              : "No education details provided."}
          </ul>
        </div>

        {/* Work Experience */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">Work Experience</h2>
          <ul className="list-disc pl-4 text-gray-700">
            {data?.experience?.length > 0
              ? data.experience.map((exp, index) => (
                  <li key={index}>{`${exp.position} at ${exp.company} (${exp.start_date} - ${exp.end_date})`}</li>
                ))
              : "No work experience added."}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CVDisplay;
