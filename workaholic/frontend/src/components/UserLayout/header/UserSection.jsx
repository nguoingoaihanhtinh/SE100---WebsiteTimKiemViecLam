import { useContext, useState } from "react";
import { FaBars, FaBell, FaLocationDot, FaUser } from "react-icons/fa6";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function UserSection() {
  const { userData, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Add logout functionality here
    console.log("Logged out");
  };

  return (
    <div className="flex gap-2 md:gap-5 items-center justify-between">
      <div className="location flex gap-1 items-center">
        <FaLocationDot />
        <p>Ho Chi Minh City</p>
      </div>
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
          <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-48 z-10">
            <ul className="flex flex-col py-2">
              <li
                onClick={() => navigate("/profile")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </li>
              <li
                onClick={() => navigate("/application")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Application
              </li>
              <li
                onClick={() => navigate("/bookmarked")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Bookmarked
              </li>
              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
        <div className="noti w-8 h-8 border rounded-full flex justify-center items-center">
          <FaBell className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default UserSection;
