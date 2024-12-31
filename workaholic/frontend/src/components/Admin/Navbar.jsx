// Navbar.jsx
import { Badge } from "@mui/material";
import { NotificationsOutlined, SettingsOutlined, PersonOutlined, SearchOutlined } from "@mui/icons-material";

const NavbarAdmin = () => {
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 shadow-md">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <span className="text-xl font-semibold">Admin Portal</span>
        <div className="flex items-center bg-gray-700 rounded-md px-3 py-1">
          <SearchOutlined className="text-gray-300" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-white focus:outline-none ml-2"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="relative hover:text-blue-500 transition-colors duration-200">
          <Badge badgeContent={4} color="error">
            <NotificationsOutlined className="text-white" />
          </Badge>
        </button>
        <button className="hover:text-blue-500 transition-colors duration-200">
          <SettingsOutlined className="text-white" />
        </button>
        <button className="hover:text-blue-500 transition-colors duration-200">
          <PersonOutlined className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default NavbarAdmin;
