// AdminLayout.jsx
import React, { useState } from "react";
import SidebarAdmin from "../components/Admin/Sidebar";
import NavbarAdmin from "../components/Admin/Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarAdmin collapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <NavbarAdmin />

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
