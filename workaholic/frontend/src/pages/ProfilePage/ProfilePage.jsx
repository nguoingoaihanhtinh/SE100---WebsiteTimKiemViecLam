import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { FaHome, FaSignInAlt, FaFileAlt, FaBriefcase, FaBookmark, FaCog } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 bg-[#171923] text-white flex justify-between items-center px-6 py-4 shadow-lg">
        {/* Home Button */}
        <button className="flex items-center space-x-2 hover:text-gray-300">
          <FaHome className="w-5 h-5 text-black" /> {/* Icon with distinct color */}
          <span className="text-lg font-semibold text-black">Home</span> {/* Text remains white */}
        </button>

        {/* Login Button */}
        <button className="flex items-center space-x-2 hover:text-gray-300">
          <FaSignInAlt className="w-5 h-5 text-black" /> {/* Icon with distinct color */}
          <span className="text-lg font-semibold text-black">Log out</span> {/* Text remains white */}
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center justify-center space-y-6 bg-gray-100 p-6">
        {/* User Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-full bg-gray-300 overflow-hidden">
            {/* Replace with user image */}
            <img
              src="/picture/Avatar.jpg" // Replace this with the correct path to your image
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl font-semibold mt-4">User Name</p>
          <p className="text-gray-600">user@example.com</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-6 w-64">
          <button
            className="bg-purple-500 flex flex-col items-center text-white py-3 rounded-lg shadow-md hover:bg-purple-600"
            onClick={() => navigate("/cv")}
          >
            <FaFileAlt className="text-yellow-200 mb-1" /> {/* Icon with contrasting color */}
            My CVs
          </button>
          <button
            className="bg-blue-500 flex flex-col items-center text-white py-3 rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => navigate("/application")} // Navigate to JobApplicationList
          >
            <FaBriefcase className="text-yellow-200 mb-1" />
            Applications
          </button>
          <button
            onClick={() => navigate("/bookmarked")}
            className="bg-green-500 flex flex-col items-center text-white py-3 rounded-lg shadow-md hover:bg-green-600"
          >
            <FaBookmark className="text-yellow-200 mb-1" />
            Bookmarks
          </button>
          <button className="bg-yellow-500 flex flex-col items-center text-white py-3 rounded-lg shadow-md hover:bg-yellow-600">
            <FaCog className="text-gray-800 mb-1" />
            Profile Settings
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
