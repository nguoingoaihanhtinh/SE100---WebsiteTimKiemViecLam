// Sidebar.jsx
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  PeopleAltOutlined,
  ContactsOutlined,
  BarChartOutlined,
  ReceiptOutlined,
  TimelineOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import logo from "../../assets/logo.png"; // Đảm bảo đường dẫn chính xác tới logo của bạn
import { useLogoutMutation } from "../../redux/rtk/user.service";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const SidebarAdmin = ({ collapsed, onToggle }) => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", path: "/admin/dashboard", icon: <DashboardOutlined /> },
    { title: "Manage Companies", path: "/admin/companies", icon: <PeopleAltOutlined /> },
    { title: "Manage Users", path: "/admin/users", icon: <ContactsOutlined /> },
    { title: "Manage Jobs", path: "/admin/jobs", icon: <BarChartOutlined /> },
    { title: "Applications", path: "/admin/applications", icon: <ReceiptOutlined /> },
    { title: "Reports", path: "/admin/reports", icon: <TimelineOutlined /> },
    { title: "Logout", path: "#", icon: <FaArrowRightFromBracket /> },
  ];
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
    <div
      className={`flex flex-col bg-gray-800 text-white h-full transition-width duration-300 ${
        collapsed ? "w-20" : "w-60"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center p-4">
        <img
          src={logo}
          alt="Logo"
          className={`transition-transform duration-300 ${collapsed ? "w-10 h-auto" : "w-36 h-auto"}`}
        />
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center p-2 hover:bg-gray-700 transition-colors duration-200"
      >
        <MenuOutlined className={`text-lg ${collapsed ? "text-white" : "text-blue-500"}`} />
      </button>

      {/* Menu Items */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={index}
              className={`flex items-center p-2 my-2 mx-4 rounded hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`}
              onClick={() => {
                if (item.path === "#") {
                  handleLogout();
                }
              }}
            >
              <span className={`text-lg ${isActive ? "text-blue-500" : "text-white hover:text-blue-500"}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className={`ml-4 ${isActive ? "text-blue-500" : "text-white hover:text-blue-500"}`}>
                  {item.title}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SidebarAdmin;
