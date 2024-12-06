import React from "react";

const TableRow = ({ rowValue }) => {
  return (
    <tr key={rowValue.img} className="mt-[10px] py-[10px] w-full">
      <td className="flex flex-row items-center justify-center p-2 ">
        <img
          className=" w-[48px] h-[48px] rounded-[8px]"
          src="https://cdn-i.vtcnews.vn/resize/th/upload/2020/09/25/logotopdevfb-11013170.jpg"
        />
      </td>
      <td className=" flex-row items-center justify-center truncate overflow-hidden whitespace-nowrap">
        <p className="text-md font-bold text-[#344767]">Tech Innovations Inc. </p>
      </td>
      <td className="truncate overflow-hidden whitespace-nowrap p-2">
        <p className=" text-[#67748e]">{rowValue.field}</p>
      </td>
      <td className=" flex-row items-center justify-center w-40">
        <p className="text-xs text-[#67748e] w-64 truncate overflow-hidden whitespace-nowrap">
          {rowValue.description}
        </p>
      </td>
      <td className="p-2 text-yellow-400 ">
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>

      </td>

      {/* <td className="">
        <div className="h-full flex flex-row gap-x-1">
          <button
            onClick={() => {
              // navigate(`/rowValue-detail/${rowValue.id}`);
            }}
            className=" p-3 py-1 hover:cursor-pointer text-[12px] bg-green-200
           text-green-800 font-medium rounded-[4px]"
          >
            VIEW
          </button>
          <button
            onClick={() => {
              // navigate(`/rowValue-edit/${rowValue.id}`);
            }}
            className="click p-3 py-1 hover:cursor-pointer text-[12px] bg-yellow-200 text-yellow-800 font-medium rounded-[4px]"
          >
            EDIT
          </button>
          <button className="click p-3 py-1 hover:cursor-pointer text-[12px] bg-red-200 text-red-800 font-medium rounded-[4px]">
            DELETE
          </button>
        </div>
      </td> */}
    </tr>
  );
};

export default TableRow;
