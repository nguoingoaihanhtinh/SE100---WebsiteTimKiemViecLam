import React, { useState } from "react";

const CompanyTable = ({ rowValue, onEdit, onDelete }) => {
  const MAX_STARS = 5;
  const [isExpanded, setIsExpanded] = useState(false);

  const stars = Array.from({ length: MAX_STARS }, (_, index) =>
    index < rowValue.rating ? "fa-solid fa-star text-yellow-400" : "fa-regular fa-star text-gray-400"
  );

  return (
    <>
      <tr key={rowValue.img} className="mt-[10px] py-[10px] w-full" onClick={() => setIsExpanded((prev) => !prev)}>
        <td className="flex flex-row items-center justify-center p-2">
          <img className="w-[48px] h-[48px] rounded-[8px]" src={rowValue.img} alt={rowValue.name} />
        </td>
        <td className="truncate overflow-hidden whitespace-nowrap">
          <p className="text-md font-bold text-[#344767]">{rowValue.name}</p>
        </td>
        <td className="truncate overflow-hidden whitespace-nowrap p-2">
          <p className="text-[#67748e]">{rowValue.feild}</p>
        </td>
        <td className="truncate overflow-hidden whitespace-nowrap w-40">
          <p className="text-xs text-[#67748e]">{rowValue.description}</p>
        </td>
        <td className="p-2 flex space-x-1">
          {stars.map((starClass, index) => (
            <i key={index} className={starClass}></i>
          ))}
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="5" className="p-4 bg-gray-100 rounded-md">
            <div className="flex flex-col space-y-4">
              <p>
                <strong>Name:</strong> {rowValue.name}
              </p>
              <p>
                <strong>Field:</strong> {rowValue.feild}
              </p>
              <p>
                <strong>Description:</strong> {rowValue.description}
              </p>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                  onClick={onEdit}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                  onClick={onDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default CompanyTable;
