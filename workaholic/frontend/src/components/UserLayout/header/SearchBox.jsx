
import { FaMagnifyingGlass } from "react-icons/fa6";
export default function SearchBox() {
  return (
    <div className="w-full md:w-[500px] bg-gray-50 rounded-full  flex items-center relative border ">
      <input
        placeholder="Find job ..."
        className="w-full text-text/md/regular  bg-transparent outline-none px-4 md:px-6 py-3 placeholder-gray-600 placeholder-opacity-100"
      ></input>
      <div className="w-[50px] md:w-[60px] flex items-center justify-center h-full text-gray-500 hover:text-gray-600 rounded-r-full rounded-br-full cursor-pointer transition-all hover:bg-gray-200">
        <FaMagnifyingGlass />
      </div>
    </div>
  );
}