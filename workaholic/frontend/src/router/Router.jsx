import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/HomePage/HomePage";
import JobListPage from "../pages/JobListPage/JobListPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="category" element={<JobListPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  )
);
export default Router;
