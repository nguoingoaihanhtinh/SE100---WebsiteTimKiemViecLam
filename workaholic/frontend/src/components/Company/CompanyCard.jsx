import React from "react";

export const CompanyCard = ({ companyData }) => {
  // Destructure the company data
  const { img, name, feild, description, rating, number_rating, address } = companyData;

  return (
    <div className="company-card-horizontal flex border p-4 rounded-lg shadow-lg">
      {/* Company Image */}
      <div className="company-img w-1/3 mr-4">
        <img src={img} alt={name} className="w-full h-32  rounded-lg bg-cover bg-no-repeat" />
      </div>

      {/* Company Information */}
      <div className="company-info w-2/3 flex flex-col justify-between">
        <div className="company-header flex justify-between items-center">
          <h3 className="text-xl font-bold text-primary-color">{name}</h3>
          {/* Rating */}
          <div className="rating flex items-center">
            <span className="mr-1">{rating}</span>
            <span className="text-gray-500">({number_rating} ratings)</span>
          </div>
        </div>

        {/* Company Field */}
        <p className="text-sm text-gray-500 mb-2">{feild}</p>

        {/* Description */}
        <p className="text-gray-700 mb-2">{description}</p>

        {/* Address */}
        <p className="text-sm text-gray-400">{address}</p>
      </div>
    </div>
  );
};
