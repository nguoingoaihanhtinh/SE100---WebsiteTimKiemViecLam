import { useGetAllJobsByCompanyIdQuery } from "../../../redux/rtk/job.service";
import { useGetCompanyByIdQuery } from "../../../redux/rtk/company.service";
import JobTable from "../../../components/Admin/Tables/JobTable";
import { useParams } from "react-router-dom";

const AdminManageJob = () => {
  const tableHeaders = ["Id", "Title", "JobType", "Description"];
  const { id } = useParams();
  const page = 1;
  const limit = 10;
  const kw = "";

  const {
    data: jobsRes,
    isLoading,
    isError,
  } = useGetAllJobsByCompanyIdQuery({
    page,
    limit,
    company_id: id,
    kw,
  });
  const jobs = jobsRes?.data || [];
  console.log("job", jobsRes);
  const { data: CompanyRes } = useGetCompanyByIdQuery(id);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching companies!</div>;

  const companyName = CompanyRes?.data?.name || "Unknown Company"; // Fallback to "Unknown Company" if name is undefined

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-black">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{companyName}</h1>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded-[10px] shadow-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-md font-medium text-[#8392a8] uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {jobs.map((job, index) => (
                <JobTable key={index} rowValue={job} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManageJob;
