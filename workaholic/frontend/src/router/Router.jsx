import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import JobListPage from "../pages/JobListPage/JobListPage";
import CvPage from "../pages/CvPage/CVPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import CompanyDetailPage from "../pages/CompanyDetailPage/CompanyDetailPage";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<UserLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="CvPage" element={<CompanyDetailPage />} />
        <Route path="ProfilePage" element={<CvPage />} />
      </Route>
    </Route>
  )
);
export default Router;
