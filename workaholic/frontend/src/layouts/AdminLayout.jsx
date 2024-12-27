import { useState } from "react";
import { FaArrowRightFromBracket, FaBriefcase, FaBuilding } from "react-icons/fa6";
import { FiHome, FiUsers, FiMenu, FiX } from "react-icons/fi";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/rtk/user.service";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  const menuItems = [
    { title: "Dashboard", icon: <FiHome className="w-6 h-6 min-w-[30px]" />, path: "/admin/dashboard" },
    { title: "Manage Companies", icon: <FaBuilding className="w-6 h-6 min-w-[30px]" />, path: "/admin/companies" },
    { title: "Manage Users", icon: <FiUsers className="w-6 h-6 min-w-[30px]" />, path: "/admin/users" },
    { title: "Manage Jobs", icon: <FaBriefcase className="w-6 h-6 min-w-[30px]" />, path: "/admin/jobs" },
    { title: "Logout", icon: <FaArrowRightFromBracket className="w-5 h-5 min-w-[30px]" />, path: "#" },
  ];
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Portal</h1>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden focus:outline-none">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-4 pt-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => {
                if (item.path === "#") {
                  handleLogout();
                }
              }}
              className={`${
                location.pathname.startsWith(item.path) ? "bg-blue-50 text-blue-600" : " text-gray-700"
              } flex items-center px-2 py-3 mb-2  rounded-[8px] hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b lg:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="focus:outline-none">
            <FiMenu className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
