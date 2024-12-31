import { Typography } from "@mui/material";
import StatBox from "./Chart/StatBox";
import MonthlyUserChart from "./Chart/MonthlyUserChart";
import { useGetAllUsersQuery } from "../../../redux/rtk/user.service";
import { useGetMonthlyUserCreatedQuery } from "../../../redux/rtk/stat.service";

const AdminDashBoard = () => {
  const { data: users } = useGetAllUsersQuery();
  const totalUsers = users?.users?.length || 0;
  const { data: res } = useGetMonthlyUserCreatedQuery(2024);
  const { data: resCurentYear } = useGetMonthlyUserCreatedQuery(2024);
  const usersMonthly = res?.data || [];
  const usersMonthlyCurrentYear = resCurentYear?.data || [];
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
          title={2}
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
      <div className="flex mt-6">
        <div className="basis-[50%] p-4 flex-col gap-4 border-[1px] rounded-[4px] border-gray-400 flex">
          <p className="text-2xl font-bold">Monthly user register change</p>
          <MonthlyUserChart userMonthlyData={usersMonthly} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
