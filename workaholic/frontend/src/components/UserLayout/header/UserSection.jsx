import React, { useState } from "react";
import { FaBars, FaBell, FaLocationDot, FaUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


function UserSection() {
  return (
    <div className="flex gap-2 md:gap-5 items-center">
       <div className="location flex gap-1 items-center">
            <FaLocationDot/>
            <p>Ho Chi Minh City</p>
       </div>
       <div className="profile flex gap-3">
            <div className="user w-8 h-8 border rounded-full flex justify-center items-center">
                <FaUser className="w-4 h-4"/>
            </div>
            <div className="noti w-8 h-8 border rounded-full flex justify-center items-center">
                <FaBell className=" w-4 h-4"/>
            </div>
            <div className="bar w-8 h-8 border rounded-full flex justify-center items-center">
                <FaBars className="w-4 h-4"/>
            </div>
       </div>
    </div>
  );
}

export default UserSection;
