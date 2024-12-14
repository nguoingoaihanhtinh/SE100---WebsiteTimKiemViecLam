import React from 'react';

const ActionBar = ({ onPostNewJob, onFilterChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md mb-6">
      {/* Post New Job Button */}
      <button
        onClick={onPostNewJob}
        className="flex items-center px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
      >
        <span className="mr-2 text-lg">+</span> Post New Job
      </button>

      {/* Filters */}
      <div className="flex flex-wrap items-center space-x-4 mt-4 sm:mt-0">
        {/* Filter by Status */}
        <select
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Draft">Draft</option>
        </select>

        {/* Filter by Time Posted */}
        <select
          onChange={(e) => onFilterChange('time', e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Time Posted</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last Month">Last Month</option>
        </select>

        {/* Filter by Location or Industry */}
        <select
          onChange={(e) => onFilterChange('location', e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Location/Industry</option>
          <option value="Software">Software</option>
          <option value="Finance">Finance</option>
          <option value="Remote">Remote</option>
        </select>
      </div>
    </div>
  );
};

export default ActionBar;