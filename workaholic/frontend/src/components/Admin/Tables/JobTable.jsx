import React, { useState } from "react";

const JobTable = ({ rowValue }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <tr key={rowValue.img} className="mt-[10px] py-[10px] w-full" onClick={() => setIsExpanded((prev) => !prev)}>
        <td className="truncate overflow-hidden whitespace-nowrap w-40">
          <p className="text-xs text-[#67748e]">{rowValue.id}</p>
        </td>
        <td className="truncate overflow-hidden whitespace-nowrap">
          <p className="text-md font-bold text-[#344767]">{rowValue.title}</p>
        </td>
        <td className="truncate overflow-hidden whitespace-nowrap p-2">
          <p className="text-[#67748e]">{rowValue.jobType.name}</p>
        </td>
        <td className="truncate overflow-hidden whitespace-nowrap w-40">
          <p className="text-xs text-[#67748e]">{rowValue.description}</p>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="5" className="p-4 bg-gray-100 rounded-md">
            <div className="flex flex-col space-y-4">
              <p>
                <strong>Title:</strong> {rowValue.name}
              </p>
              <p>
                <strong>Position:</strong> {rowValue.position}
              </p>
              <p>
                <strong>Experience level:</strong> {rowValue.experience}
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default JobTable;
