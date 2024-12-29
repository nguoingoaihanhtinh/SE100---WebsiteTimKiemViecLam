// Dashboard.jsx
import React from "react";
import { Typography } from "@mui/material";
import StatBox from "../../../components/Admin/Charts/StatBox";
import LineChart from "../../../components/Admin/Charts/LineChart";
import BarChart from "../../../components/Admin/Charts/BarChart";
import { useGetAllUsersQuery } from "../../../redux/rtk/user.service";
import { useGetAllCompaniesQuery } from "../../../redux/rtk/company.service";

const AdminDashBoard = () => {
  // Fetch data from Redux RTK
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery();
  const { data: companiesData, isLoading: isLoadingCompanies } = useGetAllCompaniesQuery();

  // Calculate metrics
  const totalUsers = usersData?.length || 0;
  const totalCompanies = companiesData?.companies?.length || 0;
  const activeJobs =
    companiesData?.companies?.reduce((acc, company) => acc + (company.activeJobs || 0), 0) || 0;
  const applicationSuccessRate = ((activeJobs / (totalUsers || 1)) * 100).toFixed(2) || 0;

  if (isLoadingUsers || isLoadingCompanies) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="p-4">
      <Typography variant="h4" className="font-bold text-gray-800 mb-6">
        Admin Dashboard
      </Typography>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox
          title={totalUsers.toString()}
          subtitle="Total Users"
          progress={0.8}
          increase="+10%"
          icon={<i className="fa fa-users text-green-500 text-3xl" />}
        />
        <StatBox
          title={totalCompanies.toString()}
          subtitle="Verified Companies"
          progress={0.6}
          increase="+15%"
          icon={<i className="fa fa-building text-blue-500 text-3xl" />}
        />
        <StatBox
          title={activeJobs.toString()}
          subtitle="Active Jobs"
          progress={0.7}
          increase="+20%"
          icon={<i className="fa fa-briefcase text-yellow-500 text-3xl" />}
        />
        <StatBox
          title={`${applicationSuccessRate}%`}
          subtitle="Application Success"
          progress={0.9}
          increase="+25%"
          icon={<i className="fa fa-chart-line text-red-500 text-3xl" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow max-h-96">
          <Typography variant="h6" className="text-gray-800 mb-4">
            User Growth
          </Typography>
          <LineChart isDashboard={true} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow max-h-96">
          <Typography variant="h6" className="text-gray-800 mb-4">
            Company Growth
          </Typography>
          <BarChart isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
