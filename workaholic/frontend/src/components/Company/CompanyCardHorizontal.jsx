import React, { useState } from 'react';
import { FaBookmark, FaLocationPin, FaUserTie } from "react-icons/fa6";
import { Button } from "antd";
import Rating from "../Rating/Rating";

export const CompanyCardHorizontal = ({ companyData }) => {
  return (
    <div
      className={`border-[1px] border-gray-300 w-full transition-all duration-500 hover:shadow-md cursor-pointer overflow-hidden rounded-lg flex items-center p-2`}
    >
      {/* Job Image */}
      <div className="flex-shrink-0">
        <img
          src={companyData.img}
          alt="No image"
          className="rounded-xl w-16 h-16 object-cover"
        />
      </div>
      {/* Job Information */}
      <div className="flex flex-col justify-between flex-grow ml-4 gap-1">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary-color">{companyData.name}</h2>
        </div>
        <div className="flex items-center gap-4 text-primary-color text-sm">
          <div className="flex items-center gap-1">
            <span>{companyData.type}</span>
          </div>
        </div>
        {/* Rating and Salary */}
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-semibold text-primary-color bg-sky-300 w-full text-left px-5">

            {companyData.jobs} Việc làm
          </p>
          <div className="ml-auto">
        </div>
        </div>
      </div>
      {/* Action Button */}
    </div>
  );
};
