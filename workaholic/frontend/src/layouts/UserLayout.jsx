import { Outlet } from "react-router-dom";
import Header from "../components/UserLayout/header/Header";

const UserLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="mt-50 w-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
