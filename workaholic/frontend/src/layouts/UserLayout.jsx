import { Outlet } from "react-router-dom";
import Header from "../components/UserLayout/header/Header";
import Footer from "../components/UserLayout/Footer";

const UserLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <div className="mt-26 w-full ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
