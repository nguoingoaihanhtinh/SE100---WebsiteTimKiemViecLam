import React from 'react';
import { FaChartBar, FaLightbulb, FaHeadset } from 'react-icons/fa'; // Import icons

const Sidebar = ({ stats, onSupportClick }) => {
  const { totalJobs, activeJobs, currentApplicants } = stats;

  return (
    <div className="w-full sm:w-1/4 bg-white shadow-xl rounded-lg p-6 border border-gray-300">
      {/* Quick Stats */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <FaChartBar className="text-blue-600" /> {/* Icon for Quick Stats */}
          <span>Quick Stats</span>
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-300 p-4 rounded-lg hover:shadow-lg transition-all">
            <p className="text-sm text-gray-600">Total Jobs Posted: <span className="font-medium text-gray-800">{totalJobs}</span></p>
          </div>
          <div className="border border-gray-300 p-4 rounded-lg hover:shadow-lg transition-all">
            <p className="text-sm text-gray-600">Active Jobs: <span className="font-medium text-green-600">{activeJobs}</span></p>
          </div>
          <div className="border border-gray-300 p-4 rounded-lg hover:shadow-lg transition-all">
            <p className="text-sm text-gray-600">Current Applicants: <span className="font-medium text-blue-600">{currentApplicants}</span></p>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <FaLightbulb className="text-yellow-500" /> {/* Icon for Tips */}
          <span>Tips</span>
        </h2>
        <div className="space-y-4">
          <div className="border border-gray-300 p-4 rounded-lg hover:shadow-lg transition-all">
            <p className="text-sm text-gray-600">Optimize your job postings with clear descriptions.</p>
          </div>
          <div className="border border-gray-300 p-4 rounded-lg hover:shadow-lg transition-all">
            <p className="text-sm text-gray-600">Highlight industry trends to attract top talent.</p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <FaHeadset className="text-blue-500" /> {/* Icon for Support */}
          <span>Support</span>
        </h2>
        <button
          onClick={onSupportClick}
          className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default Sidebar;