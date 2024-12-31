import { useContext, useState } from "react";
import { FaBell, FaLocationDot, FaUser } from "react-icons/fa6";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../redux/rtk/user.service";

import { useGetNotificationsQuery } from "../../../redux/rtk/notification.service";

function UserSection() {
  const { userData, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  const handleBellClick = async () => {
    navigate("/noti");
  };
  const { data: notifications = [] } = useGetNotificationsQuery({
    user_id: userData?.id,
    is_global: false,
  });

  return (
    <div className="flex gap-2 md:gap-5 items-center justify-between">
      <div className="profile relative flex gap-3 items-center">
        {!isLoggedIn && (
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="user w-8 h-8 border cursor-pointer rounded-full flex justify-center items-center"
          >
            <FaUser className="w-4 h-4" />
          </div>
        )}
        {isLoggedIn && userData && (
          <div
            className="cursor-pointer flex gap-2 px-4 py-2 rounded-[4px] border-[1px] border-white items-center"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FaUser className="w-4 h-4" />
            <p>{userData.user_name}</p>
          </div>
        )}
        {dropdownOpen && (
          <div className="absolute right-35 top-12 bg-white shadow-md rounded-[4px] w-48 z-10">
            <ul className="flex flex-col py-2">
              <li
                onClick={() => navigate("/application")}
                className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
              >
                Application
              </li>
              <li
                onClick={() => navigate("/bookmarked")}
                className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
              >
                Bookmarked
              </li>
              <li onClick={() => navigate("/cvs")} className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                My Cv
              </li>
              <li onClick={() => navigate("/noti")} className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer">
                My Notifications
              </li>
              <li
                onClick={() => navigate("/setting")}
                className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
              >
                Settings
              </li>
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
        <div className="location flex gap-1 items-center">
          <FaLocationDot />
          <p>Ho Chi Minh City</p>
        </div>
        {/* Notification Bell with Hover Dropdown */}
        <div className="relative ">
          <div
            onClick={handleBellClick}
            className="noti w-8 h-8 peer border rounded-full flex justify-center items-center cursor-pointer"
          >
            <FaBell className="w-4 h-4" />
          </div>
          <div className="absolute right-0 top-12 text-black bg-white shadow-md rounded-md w-64 z-10 opacity-0 peer-hover:opacity-100 transition-opacity">
            <ul className="flex flex-col py-2 max-h-64 overflow-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                  >
                    <span>{notification.content}</span>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No notifications</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserSection;
