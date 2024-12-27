import { useState } from "react";

import { useGetAllJobsQuery } from "../../../redux/rtk/job.service";
import { useGetAllCompaniesQuery } from "../../../redux/rtk/company.service";
import CompanyTable from "../../../components/Admin/Tables/CompanyTable";

const AdminDashBoard = () => {
  const tableHeaders = ["Image", "Name", "field", "description", "rating"];
  const [searchQuery, setSearchQuery] = useState("");
  const { data: jobsRes } = useGetAllJobsQuery();
  const { data: companiesRes, isLoading, isError } = useGetAllCompaniesQuery();
  const companies = companiesRes?.companies || [];
  console.log("coma", companies);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching companies!</div>;
  const jobs = jobsRes?.data || [];
  if (!jobs) return <></>;
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">DASH BOARD</h1>
        </div>

        {/* BODY */}
        <div className="overflow-x-auto bg-white rounded-[10px] shadow-lg">
          <table className="min-w-full divide-y divide-gray-700  ">
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-md font-medium text-[#8392a8] uppercase 
                  tracking-wider hover:cursor-pointer"
                  >
                    <div className="flex flex-row">
                      {header}
                      {/* {header != "Actions" && (
                        <div className="flex flex-col gap-y-[6px] mt-1">
                          <i
                            className={`ml-2 fa-solid fa-caret-up fa-xs ${
                              currentCategorySorted &&
                              currentCategorySorted[0] == header &&
                              currentCategorySorted[1] == 0 &&
                              "text-gray-600 fa-sm opacity-80"
                            } 
                           `}
                          />
                          <i
                            className={`ml-2 fa-solid fa-caret-down fa-xs ${
                              currentCategorySorted &&
                              currentCategorySorted[0] == header &&
                              currentCategorySorted[1] == 1 &&
                              "text-gray-600 fa-sm"
                            } 
                           `}
                          />
                        </div>
                      )} */}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700 ">
              {companies.map((company, index) => (
                <CompanyTable key={index} rowValue={company} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
