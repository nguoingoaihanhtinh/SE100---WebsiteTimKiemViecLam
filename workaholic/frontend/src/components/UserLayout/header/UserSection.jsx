import { useContext } from "react";
import { FaBars, FaBell, FaLocationDot, FaUser } from "react-icons/fa6";
import { AuthContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function UserSection() {
  const { userData, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(userData);
  return (
    <div className="flex gap-2 md:gap-5 items-center">
      <div className="location flex gap-1 items-center">
        <FaLocationDot />
        <p>Ho Chi Minh City</p>
      </div>
      <div className="profile flex gap-3 items-center">
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
          <div className="cursor-pointer flex gap-2 px-4  py-2 rounded-[4px] border-[1px] border-white items-center ">
            <FaUser className="w-4 h-4" />
            <p>{userData.user_name}</p>
          </div>
        )}
        <div className="noti w-8 h-8 border rounded-full flex justify-center items-center">
          <FaBell className=" w-4 h-4" />
        </div>
        <div className="bar w-8 h-8 border rounded-full flex justify-center items-center">
          <FaBars className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default UserSection;
