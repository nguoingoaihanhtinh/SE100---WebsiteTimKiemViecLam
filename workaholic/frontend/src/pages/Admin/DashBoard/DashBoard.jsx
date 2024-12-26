import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import StatBox from "../../../components/Admin/Charts/StatBox";
import LineChart from "../../../components/Admin/Charts/LineChart";
import BarChart from "../../../components/Admin/Charts/BarChart";
import { useGetAllUsersQuery } from "../../../redux/rtk/user.service";
import { useGetAllCompaniesQuery } from "../../../redux/rtk/company.service";

const AdminDashBoard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetch data from Redux RTK
  const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery();
  const { data: companiesData, isLoading: isLoadingCompanies } = useGetAllCompaniesQuery();

  // Calculate metrics
  const totalUsers = usersData?.length || 0;
  const totalCompanies = companiesData?.companies?.length || 0;
  const activeJobs = companiesData?.companies
    ?.reduce((acc, company) => acc + (company.activeJobs || 0), 0) || 0;
  const applicationSuccessRate = ((activeJobs / totalUsers) * 100).toFixed(2) || 0;

  if (isLoadingUsers || isLoadingCompanies) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={2}>
      <Typography variant="h4" fontWeight="bold" color={colors.gray[100]}>
        Admin Dashboard
      </Typography>

      {/* Metrics Grid */}
      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox
            title={totalUsers.toString()}
            subtitle="Total Users"
            progress={0.8}
            increase="+10%"
            icon={<i className="fa fa-users text-green-500" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox
            title={totalCompanies.toString()}
            subtitle="Verified Companies"
            progress={0.6}
            increase="+15%"
            icon={<i className="fa fa-building text-blue-500" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox
            title={activeJobs.toString()}
            subtitle="Active Jobs"
            progress={0.7}
            increase="+20%"
            icon={<i className="fa fa-briefcase text-yellow-500" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatBox
            title={`${applicationSuccessRate}%`}
            subtitle="Application Success"
            progress={0.9}
            increase="+25%"
            icon={<i className="fa fa-chart-line text-red-500" />}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} lg={8}>
          <Box height="400px" bgcolor={colors.primary[400]} p={2} borderRadius="8px">
            <Typography variant="h6" color={colors.gray[100]}>
              User Growth
            </Typography>
            <LineChart isDashboard={true} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box height="400px" bgcolor={colors.primary[400]} p={2} borderRadius="8px">
            <Typography variant="h6" color={colors.gray[100]}>
              Company Growth
            </Typography>
            <BarChart isDashboard={true} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashBoard;