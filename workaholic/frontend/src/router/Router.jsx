import { Route, Routes } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/HomePage/HomePage";
import JobListPage from "../pages/JobListPage/JobListPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import JobDetailPage from "../pages/JobDetailPage/JobDetailPage";
import EmployerLayout from "../layouts/EmployerLayout";
import ManageJobs from "../pages/Employer/ManageJobs";
import ManageApplication from "../pages/Employer/ManageApplication/ManageApplication";
import Dashboard from "../pages/Employer/Dashboard";
import JobApplicationList from "../pages/Application/ApplicationList";
import CompanyDetailPage from "../pages/CompanyDetailPage/CompanyDetailPage";
import CvPage from "../pages/CvPage/CvPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ManageNotification from "../pages/Employer/ManageNotification/ManageNotification";
import NotificationPage from "../pages/Notification/NotificationPage";
import Company from "../pages/Company/Company";
import JobManagementPage from "../pages/Employer/JobPostingPage/JobManagentPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashBoard from "../pages/Admin/DashBoard/DashBoard";
import ManageCompany from "../pages/Admin/ManageCompany/ManageCompany";
import AdminManageJob from "../pages/Admin/ManageCompany/AdminManageJob";
import BookmarkPage from "../pages/Bookmarks/BookmarkPage";
import CompanyListPage from "../pages/CompanyListPage/CompanyListPage";
// import ManageUser from "../pages/Admin/ManageUser/ManageUser";

const Router = () => {
  return (
    <Routes>
      <Route>
        <Route path="*" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobListPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="jobs/:id" element={<JobDetailPage />} />
          <Route path="application" element={<JobApplicationList />} />
          <Route path="cv" element={<CvPage />} />
          <Route path="company" element={<CompanyListPage />} />
          <Route path="companydetail" element={<CompanyDetailPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="noti" element={<NotificationPage />} />
          <Route path="company/:id" element={<Company />} />
          <Route path="bookmarked" element={<BookmarkPage />} />
        </Route>
        <Route path="employer" element={<EmployerLayout />}>
          <Route path="jobs" element={<JobManagementPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="joblist" element={<ManageJobs />} />
          <Route path="joblist/:id" element={<ManageApplication />} />
          <Route path="noti" element={<ManageNotification />} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="companies" element={<ManageCompany />} />
          <Route path="companies/:id" element={<AdminManageJob />} />
          {/* <Route path="users" element={<ManageUser />} /> */}
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};
export default Router;
