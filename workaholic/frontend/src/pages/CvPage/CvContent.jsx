import React, { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import CVCard from "./CVCard"; // Reuse the CVCard component we created earlier

const CvContent= () => {
  const [activeTab, setActiveTab] = useState("myCVs");
  const [bookmarkedCV, setBookmarkedCV] = useState("Resume_2024");

  const cvList = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200",
      title: "Marketing_Manager_CV",
      date: "20/04/2024",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200",
      title: "Software_Engineer_CV",
      date: "02/02/2024",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200",
      title: "Resume_2024",
      date: "01/09/2023",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x200",
      title: "Google_Application",
      date: "01/03/2023",
    }, 
    {
      id: 5,
      image: "https://via.placeholder.com/300x200",
      title: "Software_engineer_CV",
      date: "01/03/2023",
    }
  ];

  return(
    <div className="w-full">
      {/* Sticky Header */}
      <header
        className="sticky top-0 z-50 bg-[#171923] p-4 flex justify-between items-center"
        style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
         {/* Right Section -Home Button */}
         <button className="flex items-center space-x-2 hover:text-gray-300">
          <FaHome className="w-5 h-5 text-black" /> {/* Icon with distinct color */}
          <span className="text-lg font-semibold text-black">Home</span> {/* Text remains white */}
        </button>

        {/* Right Section - Search Bar */}
        <div className="flex items-center space-x-3">
          <label htmlFor="search" className="text-white text-sm">
            Search CV by name:
          </label>
          <input
            type="text"
            id="search"
            placeholder="Enter CV name"
            className="p-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            className="p-2 bg-purple-500 rounded-full hover:bg-purple-600 transition"
            aria-label="Search"
          >
            <FaSearch className="text-white" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full p-8">
        {/* Info Line */}
        <div className="mb-6 text-lg text-gray-700 font-semibold">
          You have uploaded{" "}
          <span className="text-purple-500">{cvList.length}</span> CVs. Your
          current default CV is{" "}
          <span className="text-purple-500">{bookmarkedCV}</span>.
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b">
          <button
            className={`px-6 py-2 text-lg font-bold ${
              activeTab === "myCVs"
                ? "border-b-4 border-purple-500 text-purple-500"
                : "text-gray-500 hover:text-purple-500"
            }`}
            onClick={() => setActiveTab("myCVs")}
          >
            My CVs
          </button>
          <button
            className={`px-6 py-2 text-lg font-bold ${
              activeTab === "upload"
                ? "border-b-4 border-purple-500 text-purple-500"
                : "text-gray-500 hover:text-purple-500"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Upload new CV
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "myCVs" && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cvList.map((cv) => (
                <CVCard
                  key={cv.id}
                  image={cv.image}
                  title={cv.title}
                  date={cv.date}
                />
              ))}
            </div>
          )}
          {activeTab === "upload" && (
            <div className="text-center">
              <h2 className="text-xl font-bold">Upload a new CV</h2>
              <p className="text-gray-500">
                Drag and drop your CV here, or click to upload.
              </p>
              <div className="mt-4 p-6 border-2 border-dashed border-gray-300 rounded-lg">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Choose File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CvContent;
