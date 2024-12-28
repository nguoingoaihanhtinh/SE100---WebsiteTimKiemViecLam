import React, { useState } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import CVForm from "./CVForm";

const CvContent= () => {
  const [activeTab, setActiveTab] = useState("myCV");
  return(
    <div className="w-full">
      {/* Main Content */}
      <div className="w-full p-8">
        {/* Tabs */}
        <div className="flex justify-center border-b">
          <button
            className={`px-6 py-2 text-lg font-bold ${
              activeTab === "myCV"
                ? "border-b-4 border-purple-500 text-purple-500"
                : "text-gray-500 hover:text-purple-500"
            }`}
            onClick={() => setActiveTab("myCV")}
          >
            My CV
          </button>
          <button
            className={`px-6 py-2 text-lg font-bold ${
              activeTab === "upload"
                ? "border-b-4 border-purple-500 text-purple-500"
                : "text-gray-500 hover:text-purple-500"
            }`}
            onClick={() => setActiveTab("upload")}
          >
            Create/Edit CV
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "myCV" && (
              <CVForm  viewOnly={true}/>
          )}
          {activeTab === "upload" && (
            <CVForm  viewOnly={false}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default CvContent;
