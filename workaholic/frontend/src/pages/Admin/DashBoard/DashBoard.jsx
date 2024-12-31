import { Typography } from "@mui/material";
import StatBox from "./Chart/StatBox";
import MonthlyUserChart from "./Chart/MonthlyUserChart";
import { useGetAllUsersQuery } from "../../../redux/rtk/user.service";
import { useGetJobTypeCountQuery, useGetMonthlyUserCreatedQuery } from "../../../redux/rtk/stat.service";
import JobTypeChart from "./Chart/JobTypeChart";
import { useState } from "react";
import { Select } from "antd";

const AdminDashBoard = () => {
  const { data: users } = useGetAllUsersQuery();
  const totalUsers = users?.users?.length || 0;
  const [year, setYear] = useState("2025");
  const { data: res } = useGetMonthlyUserCreatedQuery(year);
  const { data: resCurentYear } = useGetMonthlyUserCreatedQuery(2024);
  const { data: resJobType } = useGetJobTypeCountQuery();
  const usersMonthly = res?.data || [];
  const usersMonthlyCurrentYear = resCurentYear?.data || [];
  const jobsTypeCountData = resJobType?.data || [];
  const totalJobCount = jobsTypeCountData.reduce((total, jobType) => {
    return total + jobType.jobCount;
  }, 0);
  function calculatePercentageGrowth() {
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth < 1 || currentMonth > 12) {
      throw new Error("Invalid month. Please provide a month between 1 and 12.");
    }

    const currentMonthData = usersMonthlyCurrentYear.find((d) => d.month === currentMonth);
    const previousMonthData = usersMonthlyCurrentYear.find((d) => d.month === currentMonth - 1);

    const currentCount = currentMonthData ? currentMonthData.userCount : 0;
    const previousCount = previousMonthData ? previousMonthData.userCount : 0;

    if (previousCount === 0) {
      if (currentCount > 0) {
        return `${(currentCount * 100).toFixed(0)}% up`;
      } else {
        return "0% (no change)";
      }
    }
    const growth = ((currentCount - previousCount) / previousCount) * 100;
    return `${growth.toFixed(0)}%`;
  }
  return (
    <div className="p-4 text-black">
      <Typography variant="h4" className="font-bold text-gray-800 mb-6">
        Admin Dashboard
      </Typography>
      <div className="grid mt-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox
          title={totalUsers}
          subtitle="Total Users"
          progress={0.8}
          increase={calculatePercentageGrowth()}
          icon={<i className="fa fa-users text-green-500 text-3xl" />}
        />
        <StatBox
          title={totalJobCount}
          subtitle="Active Jobs"
          progress={0.7}
          increase="+20%"
          icon={<i className="fa fa-briefcase text-yellow-500 text-3xl" />}
        />
        <StatBox
          title={`2%`}
          subtitle="Application Success"
          progress={0.9}
          increase="+25%"
          icon={<i className="fa fa-chart-line text-red-500 text-3xl" />}
        />
      </div>
      <div className="flex mt-6 gap-4">
        <div className="basis-[50%] min-w-[50%] h-[400px] p-4 flex-col gap-4 border-[1px] rounded-[4px] border-gray-400 flex">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">Monthly user register change</p>
            <Select
              defaultValue="2025"
              style={{ width: 120 }}
              onChange={(vl) => setYear(vl)}
              options={[
                { value: "2021", label: "2021" },
                { value: "2022", label: "2022" },
                { value: "2023", label: "2023" },
                { value: "2024", label: "2024" },
                { value: "2025", label: "2025" },
              ]}
            />
          </div>
          <MonthlyUserChart userMonthlyData={usersMonthly} />
        </div>
        <div className="basis-[50%] w-[50%] items-center p-4 flex-col gap-4 border-[1px] rounded-[4px] border-gray-400 flex">
          <p className="text-2xl font-bold">Job base type count</p>
          <JobTypeChart jobTypeDatas={jobsTypeCountData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
