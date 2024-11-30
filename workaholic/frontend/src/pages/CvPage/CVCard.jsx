import React from "react";
import { FaRegBookmark, FaTrash, FaDownload } from "react-icons/fa";

const CVCard = ({ image, title, date, onRename, onDelete, onDownload, onBookmark }) => {
  return (
    <div className="max-w-xs p-4 bg-white rounded-lg shadow-lg">
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt="CV Preview"
          className="w-full rounded-t-lg"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center px-4 py-2">
        {/* Bookmark */}
        <button
          className="text-gray-500 hover:text-blue-500"
          onClick={onBookmark}
        >
          <FaRegBookmark size={20} />
        </button>
        {/* Rename */}
        <button
          className="text-gray-500 hover:text-green-500 text-sm"
          onClick={onRename}
        >
          Rename
        </button>
        {/* Delete */}
        <button
          className="text-red-500 hover:text-red-600"
          onClick={onDelete}
        >
          <FaTrash size={20} />
        </button>
        {/* Download */}
        <button
          className="text-blue-500 hover:text-blue-600"
          onClick={onDownload}
        >
          <FaDownload size={20} />
        </button>
      </div>
    </div>
  );
};

export default CVCard;