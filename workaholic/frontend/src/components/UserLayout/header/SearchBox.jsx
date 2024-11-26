
import { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import useDebounce from "../../../hooks/useDebouce";
import { useNavigate } from "react-router-dom";
import jobApi from "../../../api/jobApi";
import { JobCardHorizontal } from "../../Job/JobCarHorizontal";
import { Spin } from 'antd';
export default function SearchBox() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [jobs, setJob] = useState([]);
  const debounceSearch = useDebounce(searchQuery, 500);
  const searchBoxRef = useRef(null);
  const navigate = useNavigate();

  const getSearchJobs = async () => {
    const response = await jobApi.searchJob(1, 4, debounceSearch);
    // console.log(response.data);
    if (response.status === "success") {
      setJob(response.data);
    }
  };
  useEffect(() => {
    if (debounceSearch.trim() !== "") {
      getSearchJobs();
    }
  }, [debounceSearch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Navigate to the search results page with the search query
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div ref={searchBoxRef} className="w-[400px] relative">
      <div className="bg-gray-100 rounded-full h-[50px] flex items-center">
        <input
          type="text"
          placeholder="Search for jobs..."
          className="w-full bg-transparent outline-none px-6 py-3 text-primary-color"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearching(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit(); // Submit on Enter key press
            }
          }}
        />
        <div className="w-[60px] flex items-center justify-center h-full text-gray-400 hover:text-gray-600 rounded-r-full cursor-pointer transition-all hover:bg-gray-200">
          <FaMagnifyingGlass />
        </div>
      </div>
      {isSearching && (
        <div className="absolute top-[60px] left-[50%] translate-x-[-50%] bg-white shadow-lg rounded-xl p-4 max-h-[300px] flex flex-col gap-3 overflow-y-auto w-[500px] scrollbar-hidden">
              <div>
                {jobs.length > 0 ? (
                  jobs.map((item) => (
                    <JobCardHorizontal key={item.id} jobData={item} />
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No results found</p>
              )}
               </div>
        </div>
      )}
    </div>
  );
}