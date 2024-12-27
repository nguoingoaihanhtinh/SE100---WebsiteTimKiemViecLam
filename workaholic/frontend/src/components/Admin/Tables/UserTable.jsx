import { FaTimes } from "react-icons/fa";

const UserTable = ({ rowValue, onDelete }) => {
  console.log(rowValue);
  return (
    <tr key={rowValue.id} className="mt-[10px] py-[10px] w-full ">
      <td className="truncate overflow-hidden whitespace-nowrap">
        <p className="text-md font-bold text-[#344767]">{rowValue.id}</p>
      </td>
      <td className="flex flex-row items-center justify-start p-2">
        <img className="w-[48px] h-[48px] rounded-[8px]" src={rowValue.avatar} alt={rowValue.name} />
      </td>
      <td className="truncate overflow-hidden whitespace-nowrap">
        <p className="text-md font-bold text-[#344767]">{rowValue.user_name}</p>
      </td>
      <td className="truncate overflow-hidden whitespace-nowrap">
        <p className="text-md font-bold text-[#344767]">{rowValue.email}</p>
      </td>
      <td className="flex justify-center items-center">
        <FaTimes
          className="text-red-500 cursor-pointer hover:text-red-700 transition-all"
          size={18}
          onClick={() => onDelete(rowValue.id)}
        />
      </td>
    </tr>
  );
};

export default UserTable;
