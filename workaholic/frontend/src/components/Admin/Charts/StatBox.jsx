// StatBox.jsx
import React from "react";

const StatBox = ({ title, subtitle, progress, increase, icon }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between h-full">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        <div>{icon}</div>
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className={`bg-blue-600 h-2.5 rounded-full`} style={{ width: `${progress * 100}%` }}></div>
        </div>
        <p className="text-gray-500 mt-2 text-sm">{increase} since last month</p>
      </div>
    </div>
  );
};

export default StatBox;
