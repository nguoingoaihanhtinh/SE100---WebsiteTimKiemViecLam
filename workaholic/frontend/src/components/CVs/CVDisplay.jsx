import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CVDisplay = ({ data }) => {
  const { userData } = useContext(AuthContext);
  if (!userData || !data) {
    return null;
  }
  return (
    <div className="flex w-full h-screen bg-yellow-900/40 p-4">
      {/* First Part: Avatar, Contact Info, and Skills */}
      <div className="w-1/3 bg-orange-100/90  shadow-lg rounded-lg p-4 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-full h-1/4 rounded-xl bg-gray-300 overflow-hidden mb-4">
          {data?.user?.avatar ? (
            <img src={data?.user?.avatar} alt="Avatar" className="w-full h-full object-cover" />
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
        {data?.skills?.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Skills</h2>
            <ul className="list-disc pl-4 text-gray-700">
              {data.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Certifications */}
        {data?.certifications?.length > 0 && (
          <div className="w-full">
            <h2 className="text-lg font-bold mb-2 text-gray-800">Certifications</h2>
            <ul className="list-disc pl-4 text-gray-700">
              {data.certifications.map((certi, index) => (
                <li key={index}>{`${certi.name} (${certi.date_obtained})`}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Second Part: Name, Title, Introduction, Education, and Experience */}
      <div className="w-2/3 bg-orange-50 shadow-lg rounded-lg p-4 ml-4">
        <div className="NameAndTitle bg-orange-100 px-5 py-2 rounded-xl border-2 border-amber-900">
          {/* Name and Title */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-700">{userData?.user_name || "Full Name"}</h1>
            <h2 className="text-xl text-primary-color">{data?.title || "Job Title"}</h2>
          </div>

          {/* Introduction */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-400">Introduction</h2>
            <p className="text-black">{data?.summary || "A brief introduction about yourself."}</p>
          </div>
        </div>
        <div className="mainContent border-t-2 mt-5 py-5">
          {/* Education */}
          {data?.education?.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white p-1 bg-amber-950">Education</h2>
              <ul className="list-disc pl-4 text-gray-700">
                {data.education.map((edu, index) => (
                  <li key={index}>{`${edu.degree} at ${edu.institution} (${edu.start_date} - ${edu.end_date})`}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Work Experience */}
          {data?.experience?.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white p-1 bg-amber-950">Work Experience</h2>
              <ul className="list-disc pl-4 text-gray-700">
                {data.experience.map((exp, index) => (
                  <li key={index}>{`${exp.position} at ${exp.company} (${exp.start_date} - ${exp.end_date})`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVDisplay;
