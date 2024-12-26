import { useState } from "react";

const UserTable = ({ rowValue, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <tr key={rowValue.img} className="mt-[10px] py-[10px] w-full" onClick={() => setIsExpanded((prev) => !prev)}>
        <td className="truncate overflow-hidden whitespace-nowrap">
          <p className="text-md font-bold text-[#344767]">{rowValue.id}</p>
        </td>
        <td className="flex flex-row items-center justify-center p-2">
          <img className="w-[48px] h-[48px] rounded-[8px]" src={rowValue.avatar} alt={rowValue.name} />
        </td>
        <td className="truncate overflow-hidden whitespace-nowrap">
          <p className="text-md font-bold text-[#344767]">{rowValue.user_name}</p>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="5" className="p-4 bg-gray-100 rounded-md">
            <div className="flex flex-col space-y-4">
              <p>
                <strong>Name:</strong> {rowValue.user_name}
              </p>
              <p>
                <strong>Role:</strong> {rowValue.role}
              </p>
              <p>
                <strong>CV:</strong> {rowValue.cv_url}
              </p>
              <div className="flex space-x-4">
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

export default UserTable;
